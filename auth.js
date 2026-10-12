"use strict";

/* ==========================================
   CRYPTOTOOLS GLOBAL
   Authentification Supabase
   ========================================== */

const SUPABASE_URL =
  "https://vdbvubphmzpumnckarmd.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_1bU4eu9GG6mUaBePx1swJg_GGJZOxk9";

(() => {
  const $ = (id) => document.getElementById(id);

  const authScreen = $("authScreen");
  const protectedApp = $("protectedApp");
  const authForm = $("authForm");

  if (!authScreen || !protectedApp || !authForm) {
    return;
  }

  if (!window.supabase || !window.supabase.createClient) {
    showMessage(
      "Impossible de charger le service de connexion. Actualisez la page.",
      true
    );
    return;
  }

  const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

  let mode = "login";
  let isBusy = false;

  /* ==========================================
     MESSAGES
     ========================================== */

  function showMessage(message = "", isError = false) {
    const element = $("authMessage");

    element.textContent = message;
    element.hidden = !message;

    element.classList.toggle("is-error", isError);
  }

  /* ==========================================
     CONNEXION / INSCRIPTION
     ========================================== */

  function setMode(newMode) {
    mode = newMode;

    const isSignup = mode === "signup";

    $("authTitle").textContent = isSignup
      ? "Créer un compte"
      : "Connexion";

    $("authSubtitle").textContent = isSignup
      ? "Créez votre compte pour accéder aux outils CryptoTools Global."
      : "Connectez-vous pour accéder à vos outils crypto.";

    $("authNameLabel").hidden = !isSignup;
    $("authName").hidden = !isSignup;

    $("authConfirmLabel").hidden = !isSignup;
    $("authPasswordConfirm").hidden = !isSignup;

    $("authName").required = isSignup;
    $("authPasswordConfirm").required = isSignup;

    $("forgotPasswordButton").hidden = isSignup;

    $("authSubmit").textContent = isSignup
      ? "Créer mon compte"
      : "Se connecter";

    $("showLoginTab").classList.toggle(
      "is-active",
      !isSignup
    );

    $("showSignupTab").classList.toggle(
      "is-active",
      isSignup
    );

    showMessage();
  }

  /* ==========================================
     AFFICHAGE SELON LA SESSION
     ========================================== */

  function renderSession(session) {
    const isLoggedIn = Boolean(session);

    authScreen.hidden = isLoggedIn;
    protectedApp.hidden = !isLoggedIn;

    const existingLogoutButton = $("logoutButton");

    if (!isLoggedIn) {
      if (existingLogoutButton) {
        existingLogoutButton.remove();
      }

      delete protectedApp.dataset.userEmail;

      return;
    }

    protectedApp.dataset.userEmail =
      session.user.email || "";

    const headerActions =
      protectedApp.querySelector(".header-actions");

    if (
      headerActions &&
      !existingLogoutButton
    ) {
      const logoutButton =
        document.createElement("button");

      logoutButton.id = "logoutButton";
      logoutButton.type = "button";

      logoutButton.className =
        "button button-secondary logout-button";

      logoutButton.textContent = "Déconnexion";

      logoutButton.addEventListener(
        "click",
        async () => {
          logoutButton.disabled = true;

          const { error } =
            await supabase.auth.signOut();

          if (error) {
            logoutButton.disabled = false;

            showMessage(
              "Déconnexion impossible : " + error.message,
              true
            );
          }
        }
      );

      headerActions.appendChild(logoutButton);
    }
  }

  /* ==========================================
     BOUTONS D'AUTHENTIFICATION
     ========================================== */

  $("showLoginTab").addEventListener(
    "click",
    () => setMode("login")
  );

  $("showSignupTab").addEventListener(
    "click",
    () => setMode("signup")
  );

  /* ==========================================
     TRAITEMENT DU FORMULAIRE
     ========================================== */

  authForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      if (isBusy) {
        return;
      }

      showMessage();

      const email =
        $("authEmail").value.trim();

      const password =
        $("authPassword").value;

      isBusy = true;

      $("authSubmit").disabled = true;

      try {
        /* INSCRIPTION */

        if (mode === "signup") {
          const name =
            $("authName").value.trim();

          const confirmation =
            $("authPasswordConfirm").value;

          if (password.length < 8) {
            showMessage(
              "Le mot de passe doit contenir au moins 8 caractères.",
              true
            );

            return;
          }

          if (password !== confirmation) {
            showMessage(
              "Les deux mots de passe ne correspondent pas.",
              true
            );

            return;
          }

          const { data, error } =
            await supabase.auth.signUp({
              email: email,
              password: password,

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

          if (data.session) {
            renderSession(data.session);
          } else {
            showMessage(
              "Compte créé ! Consultez votre boîte e-mail pour confirmer votre adresse avant de vous connecter."
            );
          }
        }

        /* CONNEXION */

        else {
          const { data, error } =
            await supabase.auth.signInWithPassword({
              email: email,
              password: password
            });

          if (error) {
            throw error;
          }

          renderSession(data.session);
        }
      } catch (error) {
        showMessage(
          error.message ||
            "Une erreur est survenue. Réessayez.",
          true
        );
      } finally {
        isBusy = false;

        $("authSubmit").disabled = false;

        $("authSubmit").textContent =
          mode === "signup"
            ? "Créer mon compte"
            : "Se connecter";
      }
    }
  );

  /* ==========================================
     MOT DE PASSE OUBLIÉ
     ========================================== */

  $("forgotPasswordButton").addEventListener(
    "click",
    async () => {
      const email =
        $("authEmail").value.trim();

      if (!email) {
        showMessage(
          "Saisissez votre adresse e-mail avant de demander un lien.",
          true
        );

        return;
      }

      showMessage();

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
        showMessage(error.message, true);
      } else {
        showMessage(
          "Si cette adresse est enregistrée, un e-mail de réinitialisation sera envoyé."
        );
      }
    }
  );

  /* ==========================================
     RESTAURATION DE SESSION
     ========================================== */

  supabase.auth.onAuthStateChange(
    (_event, session) => {
      renderSession(session);
    }
  );

  supabase.auth.getSession().then(
    ({ data, error }) => {
      if (error) {
        showMessage(
          "Impossible de vérifier votre session. Actualisez la page.",
          true
        );
      }

      renderSession(data?.session || null);
    }
  );

  /* ÉCRAN INITIAL */

  setMode("login");
})();
