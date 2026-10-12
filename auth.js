"use strict";

/* ==========================================
   CRYPTOTOOLS GLOBAL
   Authentification Supabase
========================================== */

const SUPABASE_URL = "https://vdbvubphmzpumnckarmd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_1bU4eu9GG6mUaBePx1swJg_GGJZOxk9";

(() => {
  const $ = (id) => document.getElementById(id);

  const $$ = (selector, root = document) =>
    [...root.querySelectorAll(selector)];

  const authScreen = $("authScreen");
  const protectedApp = $("protectedApp");
  const authForm = $("authForm");

  if (!authScreen || !protectedApp || !authForm) {
    console.error(
      "CryptoTools Global : éléments d'authentification introuvables."
    );
    return;
  }

  /* ==========================================
     VÉRIFICATION DES DÉPENDANCES
  ========================================== */

  if (
    !window.supabase ||
    typeof window.supabase.createClient !== "function"
  ) {
    authScreen.hidden = false;
    protectedApp.hidden = true;

    const messageElement = $("authMessage");

    if (messageElement) {
      messageElement.textContent =
        "Impossible de charger le service de connexion. Vérifiez votre connexion Internet et actualisez la page.";
      messageElement.hidden = false;
      messageElement.classList.add("is-error");
    }

    console.error(
      "CryptoTools Global : la bibliothèque Supabase n'est pas chargée."
    );

    return;
  }

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );

  let mode = "login";
  let isBusy = false;
  let isCheckingSession = true;
  let authSubscription = null;
  let isResettingPassword = false;

  /* ==========================================
     AFFICHAGE DES MESSAGES
  ========================================== */

  function showMessage(message = "", isError = false) {
    const element = $("authMessage");

    if (!element) return;

    element.textContent = message;
    element.hidden = !message;

    element.classList.toggle("is-error", Boolean(isError));
    element.classList.toggle(
      "is-success",
      Boolean(message) && !isError
    );

    element.setAttribute("role", isError ? "alert" : "status");
    element.setAttribute("aria-live", "polite");
  }

  function setButtonLoading(
    button,
    loading,
    loadingText = "Veuillez patienter…"
  ) {
    if (!button) return;

    if (loading) {
      if (!button.dataset.originalText) {
        button.dataset.originalText = button.textContent;
      }

      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.textContent = loadingText;
    } else {
      button.disabled = false;
      button.removeAttribute("aria-busy");

      if (button.dataset.originalText) {
        button.textContent = button.dataset.originalText;
        delete button.dataset.originalText;
      }
    }
  }

  function getErrorMessage(error) {
    const message = String(error?.message || "").toLowerCase();

    if (
      message.includes("invalid login credentials") ||
      message.includes("invalid_credentials")
    ) {
      return "Adresse e-mail ou mot de passe incorrect.";
    }

    if (message.includes("email not confirmed")) {
      return "Veuillez confirmer votre adresse e-mail avant de vous connecter.";
    }

    if (
      message.includes("user already registered") ||
      message.includes("already registered")
    ) {
      return "Cette adresse e-mail possède déjà un compte. Connectez-vous plutôt.";
    }

    if (
      message.includes("password should be at least") ||
      message.includes("password must be at least")
    ) {
      return "Le mot de passe doit contenir au moins 8 caractères.";
    }

    if (
      message.includes("rate limit") ||
      message.includes("too many requests")
    ) {
      return "Trop de tentatives. Attendez quelques minutes avant de réessayer.";
    }

    if (
      message.includes("failed to fetch") ||
      message.includes("network request failed") ||
      message.includes("fetch failed")
    ) {
      return "Connexion Internet indisponible. Vérifiez votre réseau et réessayez.";
    }

    return error?.message || "Une erreur est survenue. Réessayez.";
  }

  /* ==========================================
     MODE CONNEXION / INSCRIPTION
  ========================================== */

  function setMode(newMode) {
    mode = newMode === "signup" ? "signup" : "login";

    const isSignup = mode === "signup";

    const title = $("authTitle");
    const subtitle = $("authSubtitle");
    const nameLabel = $("authNameLabel");
    const nameInput = $("authName");
    const confirmLabel = $("authConfirmLabel");
    const confirmInput = $("authPasswordConfirm");
    const forgotButton = $("forgotPasswordButton");
    const submitButton = $("authSubmit");
    const loginTab = $("showLoginTab");
    const signupTab = $("showSignupTab");

    if (title) {
      title.textContent = isSignup
        ? "Créer un compte"
        : "Connexion";
    }

    if (subtitle) {
      subtitle.textContent = isSignup
        ? "Créez votre compte pour accéder aux outils CryptoTools Global."
        : "Connectez-vous pour accéder à vos outils crypto.";
    }

    if (nameLabel) {
      nameLabel.hidden = !isSignup;
    }

    if (nameInput) {
      nameInput.hidden = !isSignup;
      nameInput.required = isSignup;
    }

    if (confirmLabel) {
      confirmLabel.hidden = !isSignup;
    }

    if (confirmInput) {
      confirmInput.hidden = !isSignup;
      confirmInput.required = isSignup;
    }

    if (forgotButton) {
      forgotButton.hidden = isSignup;
    }

    if (submitButton) {
      submitButton.textContent = isSignup
        ? "Créer mon compte"
        : "Se connecter";
    }

    if (loginTab) {
      loginTab.classList.toggle("is-active", !isSignup);
      loginTab.setAttribute("aria-pressed", String(!isSignup));
    }

    if (signupTab) {
      signupTab.classList.toggle("is-active", isSignup);
      signupTab.setAttribute("aria-pressed", String(isSignup));
    }

    authForm.setAttribute("data-auth-mode", mode);

    showMessage();
  }

  /* ==========================================
     AFFICHAGE DE LA SESSION
  ========================================== */

  function renderSession(session) {
    const isLoggedIn = Boolean(session?.user);

    authScreen.hidden = isLoggedIn;
    protectedApp.hidden = !isLoggedIn;

    if (!isLoggedIn) {
      delete protectedApp.dataset.userEmail;
      delete protectedApp.dataset.userId;

      const existingLogoutButton = $("logoutButton");

      if (existingLogoutButton) {
        existingLogoutButton.remove();
      }

      return;
    }

    const user = session.user;

    protectedApp.dataset.userEmail = user.email || "";
    protectedApp.dataset.userId = user.id || "";

    const emailElements = $$(
      "[data-user-email], #userEmail, #connectedUserEmail"
    );

    emailElements.forEach((element) => {
      element.textContent = user.email || "";
    });

    const name =
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      "";

    const nameElements = $$(
      "[data-user-name], #userName, #connectedUserName"
    );

    nameElements.forEach((element) => {
      element.textContent = name || user.email || "";
    });

    ensureLogoutButton();
  }

  /* ==========================================
     BOUTON DE DÉCONNEXION
  ========================================== */

  function ensureLogoutButton() {
    const existingLogoutButton = $("logoutButton");

    if (existingLogoutButton) {
      return;
    }

    const headerActions =
      protectedApp.querySelector(".header-actions");

    if (!headerActions) {
      console.warn(
        "CryptoTools Global : conteneur .header-actions introuvable."
      );
      return;
    }

    const logoutButton = document.createElement("button");

    logoutButton.id = "logoutButton";
    logoutButton.type = "button";
    logoutButton.className =
      "button button-secondary logout-button";
    logoutButton.textContent = "Déconnexion";

    logoutButton.addEventListener("click", async () => {
      if (isBusy) return;

      isBusy = true;

      setButtonLoading(
        logoutButton,
        true,
        "Déconnexion…"
      );

      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        }

        renderSession(null);
        setMode("login");

        showMessage(
          "Vous avez été déconnecté avec succès."
        );
      } catch (error) {
        console.error(
          "CryptoTools Global : erreur de déconnexion",
          error
        );

        showMessage(
          "Déconnexion impossible : " + getErrorMessage(error),
          true
        );

        setButtonLoading(logoutButton, false);
      } finally {
        isBusy = false;
      }
    });

    headerActions.appendChild(logoutButton);
  }

  /* ==========================================
     VALIDATION DES CHAMPS
  ========================================== */

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateCredentials(email, password) {
    if (!email) {
      showMessage(
        "Saisissez votre adresse e-mail.",
        true
      );

      $("authEmail")?.focus();
      return false;
    }

    if (!validateEmail(email)) {
      showMessage(
        "Saisissez une adresse e-mail valide.",
        true
      );

      $("authEmail")?.focus();
      return false;
    }

    if (!password) {
      showMessage(
        "Saisissez votre mot de passe.",
        true
      );

      $("authPassword")?.focus();
      return false;
    }

    return true;
  }

  /* ==========================================
     BOUTONS CONNEXION / INSCRIPTION
  ========================================== */

  const loginTab = $("showLoginTab");
  const signupTab = $("showSignupTab");

  if (loginTab) {
    loginTab.addEventListener("click", () => {
      if (isBusy) return;
      setMode("login");
    });
  }

  if (signupTab) {
    signupTab.addEventListener("click", () => {
      if (isBusy) return;
      setMode("signup");
    });
  }

  /* ==========================================
     TRAITEMENT DU FORMULAIRE
  ========================================== */

  authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isBusy || isCheckingSession) {
      return;
    }

    showMessage();

    const email = $("authEmail")?.value.trim() || "";
    const password = $("authPassword")?.value || "";
    const submitButton = $("authSubmit");

    if (!validateCredentials(email, password)) {
      return;
    }

    isBusy = true;

    setButtonLoading(
      submitButton,
      true,
      mode === "signup"
        ? "Création du compte…"
        : "Connexion…"
    );

    try {
      /* ======================================
         INSCRIPTION
      ====================================== */

      if (mode === "signup") {
        const name = $("authName")?.value.trim() || "";
        const confirmation =
          $("authPasswordConfirm")?.value || "";

        if (!name) {
          showMessage(
            "Saisissez votre nom.",
            true
          );

          $("authName")?.focus();
          return;
        }

        if (password.length < 8) {
          showMessage(
            "Le mot de passe doit contenir au moins 8 caractères.",
            true
          );

          $("authPassword")?.focus();
          return;
        }

        if (password !== confirmation) {
          showMessage(
            "Les deux mots de passe ne correspondent pas.",
            true
          );

          $("authPasswordConfirm")?.focus();
          return;
        }

        const { data, error } =
          await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name
              },
              emailRedirectTo:
                window.location.origin +
                window.location.pathname
            }
          });

        if (error) {
          throw error;
        }

        if (data?.session) {
          renderSession(data.session);

          showMessage(
            "Votre compte a été créé avec succès."
          );
        } else {
          showMessage(
            "Compte créé ! Consultez votre boîte e-mail pour confirmer votre adresse avant de vous connecter."
          );

          authForm.reset();
          setMode("login");
        }

        return;
      }

      /* ======================================
         CONNEXION
      ====================================== */

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        });

      if (error) {
        throw error;
      }

      if (!data?.session) {
        throw new Error(
          "Connexion effectuée, mais aucune session n'a été reçue."
        );
      }

      renderSession(data.session);
      showMessage();
    } catch (error) {
      console.error(
        "CryptoTools Global : erreur d'authentification",
        error
      );

      showMessage(
        getErrorMessage(error),
        true
      );
    } finally {
      isBusy = false;

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-busy");

        submitButton.textContent =
          mode === "signup"
            ? "Créer mon compte"
            : "Se connecter";
      }
    }
  });

  /* ==========================================
     MOT DE PASSE OUBLIÉ
  ========================================== */

  const forgotPasswordButton = $("forgotPasswordButton");

  if (forgotPasswordButton) {
    forgotPasswordButton.addEventListener(
      "click",
      async () => {
        if (isBusy || isResettingPassword) {
          return;
        }

        const email = $("authEmail")?.value.trim() || "";

        if (!email) {
          showMessage(
            "Saisissez votre adresse e-mail avant de demander un lien.",
            true
          );

          $("authEmail")?.focus();
          return;
        }

        if (!validateEmail(email)) {
          showMessage(
            "Saisissez une adresse e-mail valide.",
            true
          );

          $("authEmail")?.focus();
          return;
        }

        isResettingPassword = true;

        setButtonLoading(
          forgotPasswordButton,
          true,
          "Envoi en cours…"
        );

        showMessage();

        try {
          const { error } =
            await supabase.auth.resetPasswordForEmail(
              email,
              {
                redirectTo:
                  window.location.origin +
                  window.location.pathname
              }
            );

          if (error) {
            throw error;
          }

          showMessage(
            "Si cette adresse est enregistrée, un e-mail de réinitialisation sera envoyé."
          );
        } catch (error) {
          console.error(
            "CryptoTools Global : erreur de réinitialisation",
            error
          );

          showMessage(
            getErrorMessage(error),
            true
          );
        } finally {
          isResettingPassword = false;

          setButtonLoading(
            forgotPasswordButton,
            false
          );
        }
      }
    );
  }

  /* ==========================================
     RESTAURATION ET SURVEILLANCE DE SESSION
  ========================================== */

  async function initializeAuth() {
    try {
      const { data, error } =
        await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      renderSession(data?.session || null);
    } catch (error) {
      console.error(
        "CryptoTools Global : impossible de restaurer la session",
        error
      );

      renderSession(null);

      showMessage(
        "Impossible de vérifier votre session. Vérifiez votre connexion Internet et actualisez la page.",
        true
      );
    } finally {
      isCheckingSession = false;

      const submitButton = $("authSubmit");

      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  }

  const { data: authListener } =
    supabase.auth.onAuthStateChange(
      (event, session) => {
        if (
          event === "INITIAL_SESSION" ||
          event === "SIGNED_IN" ||
          event === "SIGNED_OUT" ||
          event === "TOKEN_REFRESHED" ||
          event === "USER_UPDATED" ||
          event === "PASSWORD_RECOVERY"
        ) {
          renderSession(session);
        }
      }
    );

  authSubscription =
    authListener?.subscription || null;

  /* ==========================================
     ÉCRAN INITIAL
  ========================================== */

  setMode("login");

  authScreen.hidden = false;
  protectedApp.hidden = true;

  const initialSubmitButton = $("authSubmit");

  if (initialSubmitButton) {
    initialSubmitButton.disabled = true;
  }

  initializeAuth();

  /* ==========================================
     NETTOYAGE LORSQUE LA PAGE EST QUITTÉE
  ========================================== */

  window.addEventListener("pagehide", () => {
    if (authSubscription) {
      authSubscription.unsubscribe();
      authSubscription = null;
    }
  });
})();
