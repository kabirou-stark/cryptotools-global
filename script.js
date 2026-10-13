"use strict";

/* =========================================================
   CRYPTOTOOLS GLOBAL
   Script principal
   Convertisseurs • Calculateurs • Marché • Navigation
========================================================= */

const API_URL = "https://api.coingecko.com/api/v3/simple/price";
const EUR_TO_XOF = 655.957;
const REFRESH_INTERVAL = 120000;
const REQUEST_TIMEOUT = 15000;

const VIEW_IDS = [
  "home",
  "converters",
  "calculators",
  "markets",
  "about",
  "disclaimer"
];

const ASSETS = {
  bitcoin: { name: "Bitcoin", symbol: "BTC", icon: "₿" },
  ethereum: { name: "Ethereum", symbol: "ETH", icon: "Ξ" },
  binancecoin: { name: "BNB", symbol: "BNB", icon: "◆" },
  solana: { name: "Solana", symbol: "SOL", icon: "◎" },
  tether: { name: "Tether", symbol: "USDT", icon: "₮" }
};

const translations = {
  fr: {
    navHome: "Accueil",
    navConverters: "Convertisseurs",
    navCalculators: "Calculateurs",
    navMarkets: "Marché",
    heroBadge: "DES OUTILS CRYPTO GRATUITS",
    heroTitle: "La crypto, plus simple.",
    heroDescription: "Convertissez vos cryptomonnaies, estimez vos gains et consultez les prix du marché depuis une plateforme simple et accessible.",
    heroButton: "Commencer gratuitement",
    heroMarketButton: "Voir les prix",
    trustFree: "Outils gratuits",
    trustMobile: "Adapté au mobile",
    trustSimple: "Simple à utiliser",
    marketPreview: "Aperçu du marché",
    indicativePrices: "Prix indicatifs",
    adPlaceholder: "Espace publicitaire — les annonces apparaîtront après configuration d’un fournisseur compatible.",
    toolsEyebrow: "NOS OUTILS",
    convertersTitle: "Convertisseurs crypto",
    convertersDescription: "Obtenez rapidement une estimation de la valeur de vos cryptomonnaies.",
    btcConverterTitle: "Bitcoin vers USDT",
    btcConverterDescription: "Convertissez du BTC en Tether.",
    usdtConverterTitle: "USDT vers FCFA",
    usdtConverterDescription: "Estimez la valeur de vos USDT en francs CFA BCEAO.",
    cryptoConverterTitle: "Crypto vers FCFA",
    cryptoConverterDescription: "Estimez la valeur d’une autre cryptomonnaie en FCFA.",
    amountLabel: "Montant",
    convertButton: "Convertir",
    estimatedResult: "Résultat estimé",
    popularBadge: "Populaire",
    cryptoLabel: "Cryptomonnaie",
    calculatorEyebrow: "CALCULS PRATIQUES",
    calculatorsTitle: "Calculateurs crypto",
    calculatorsDescription: "Préparez vos calculs avant une opération.",
    profitTitle: "Calculateur de profits et pertes",
    profitDescription: "Comparez votre prix d’achat à votre prix de vente.",
    buyPriceLabel: "Prix d’achat (USDT)",
    sellPriceLabel: "Prix de vente (USDT)",
    quantityLabel: "Quantité achetée",
    calculateButton: "Calculer",
    profitResultLabel: "Profit / perte estimé",
    feesTitle: "Frais de transaction",
    feesDescription: "Estimez les frais proportionnels d’une transaction.",
    transactionAmountLabel: "Montant de la transaction (USDT)",
    feeRateLabel: "Taux de frais (%)",
    feesResultLabel: "Frais estimés",
    feesNote: "Les frais réels dépendent de la plateforme et du réseau utilisés.",
    marketEyebrow: "SUIVI DU MARCHÉ",
    marketTitle: "Prix des cryptomonnaies",
    marketDescription: "Consultez les dernières données disponibles. Sélectionnez une cryptomonnaie pour afficher ses informations.",
    refreshButton: "↻ Actualiser",
    coinColumn: "Actif",
    priceColumn: "Prix (USD)",
    fcfaColumn: "Prix (FCFA)",
    loadingPrices: "Chargement des prix…",
    aboutEyebrow: "À PROPOS",
    aboutTitle: "Les outils crypto, accessibles à tous.",
    aboutDescription: "CryptoTools Global rassemble des outils gratuits pour convertir des montants, comprendre les frais et estimer des résultats. Les estimations ne garantissent aucun gain financier.",
    footerDescription: "Des outils crypto simples, gratuits et accessibles.",
    footerNavigation: "Navigation",
    footerInformation: "Informations",
    footerAbout: "À propos",
    footerDisclaimer: "Avertissement",
    rightsReserved: "Tous droits réservés.",
    footerDisclaimerText: "Les informations fournies sont indicatives et ne constituent pas des conseils financiers.",
    netAmountLabel: "Montant après frais",
    lastUpdated: "Dernière mise à jour",
    priceError: "Prix temporairement indisponibles. Vérifie ta connexion et réessaie.",
    invalidAmount: "Saisis un montant valide supérieur ou égal à zéro.",
    enterValues: "Renseigne tous les champs avec des valeurs valides.",
    dataError: "Impossible de charger les prix. Réessaie dans quelques instants.",
    fcfaRateLabel: "Taux indicatif utilisé",
    marketDisclaimer: "Les cours sont indicatifs. Le prix réel peut varier selon la plateforme, le pays, le réseau et les frais appliqués.",
    backButton: "← Retour",
    selectedAsset: "Cryptomonnaie sélectionnée",
    noView: "Cette page n’existe pas."
  },

  en: {
    navHome: "Home",
    navConverters: "Converters",
    navCalculators: "Calculators",
    navMarkets: "Market",
    heroBadge: "FREE CRYPTO TOOLS",
    heroTitle: "Crypto, made simpler.",
    heroDescription: "Convert cryptocurrencies, estimate profits and check market prices with a simple and accessible platform.",
    heroButton: "Get started for free",
    heroMarketButton: "View prices",
    trustFree: "Free tools",
    trustMobile: "Mobile friendly",
    trustSimple: "Easy to use",
    marketPreview: "Market overview",
    indicativePrices: "Indicative prices",
    adPlaceholder: "Advertising space — ads will appear after a compatible provider is configured.",
    toolsEyebrow: "OUR TOOLS",
    convertersTitle: "Crypto converters",
    convertersDescription: "Quickly estimate the value of your cryptocurrencies.",
    btcConverterTitle: "Bitcoin to USDT",
    btcConverterDescription: "Convert BTC to Tether.",
    usdtConverterTitle: "USDT to CFA francs",
    usdtConverterDescription: "Estimate your USDT value in BCEAO CFA francs.",
    cryptoConverterTitle: "Crypto to CFA francs",
    cryptoConverterDescription: "Estimate another cryptocurrency’s value in CFA francs.",
    amountLabel: "Amount",
    convertButton: "Convert",
    estimatedResult: "Estimated result",
    popularBadge: "Popular",
    cryptoLabel: "Cryptocurrency",
    calculatorEyebrow: "PRACTICAL CALCULATIONS",
    calculatorsTitle: "Crypto calculators",
    calculatorsDescription: "Prepare calculations before a transaction.",
    profitTitle: "Profit and loss calculator",
    profitDescription: "Compare your buying and selling prices.",
    buyPriceLabel: "Buy price (USDT)",
    sellPriceLabel: "Sell price (USDT)",
    quantityLabel: "Quantity purchased",
    calculateButton: "Calculate",
    profitResultLabel: "Estimated profit / loss",
    feesTitle: "Transaction fees",
    feesDescription: "Estimate proportional transaction fees.",
    transactionAmountLabel: "Transaction amount (USDT)",
    feeRateLabel: "Fee rate (%)",
    feesResultLabel: "Estimated fees",
    feesNote: "Actual fees depend on the platform and network used.",
    marketEyebrow: "MARKET TRACKER",
    marketTitle: "Cryptocurrency prices",
    marketDescription: "View the latest available data. Select a cryptocurrency to display its information.",
    refreshButton: "↻ Refresh",
    coinColumn: "Asset",
    priceColumn: "Price (USD)",
    fcfaColumn: "Price (CFA)",
    loadingPrices: "Loading prices…",
    aboutEyebrow: "ABOUT",
    aboutTitle: "Crypto tools accessible to everyone.",
    aboutDescription: "CryptoTools Global provides free tools to convert amounts, understand fees and estimate results. Estimates do not guarantee financial gains.",
    footerDescription: "Simple, free and accessible crypto tools.",
    footerNavigation: "Navigation",
    footerInformation: "Information",
    footerAbout: "About",
    footerDisclaimer: "Disclaimer",
    rightsReserved: "All rights reserved.",
    footerDisclaimerText: "Information is indicative and does not constitute financial advice.",
    netAmountLabel: "Amount after fees",
    lastUpdated: "Last updated",
    priceError: "Prices are temporarily unavailable. Check your connection and try again.",
    invalidAmount: "Enter a valid amount greater than or equal to zero.",
    enterValues: "Enter valid values in all fields.",
    dataError: "Unable to load prices. Please try again shortly.",
    fcfaRateLabel: "Indicative rate used",
    marketDisclaimer: "Prices are indicative. Actual prices may vary by platform, country, network and fees.",
    backButton: "← Back",
    selectedAsset: "Selected cryptocurrency",
    noView: "This page does not exist."
  }
};

/* =========================================================
   ÉTAT DE L'APPLICATION
========================================================= */

let currentLanguage = "fr";
let marketPrices = {};
let lastSuccessfulUpdate = null;
let lastPriceError = null;
let isFetchingPrices = false;
let currentView = "home";
let selectedAsset = "bitcoin";
let navigationInitialized = false;
let refreshIntervalId = null;
let toastTimer = null;
let activeRequestController = null;

try {
  const savedLanguage = localStorage.getItem("ctg-language");

  if (savedLanguage && translations[savedLanguage]) {
    currentLanguage = savedLanguage;
  }
} catch (error) {
  console.warn("Stockage local indisponible.", error);
}

const $ = (selector, root = document) =>
  root.querySelector(selector);

const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

/* =========================================================
   TRADUCTIONS
========================================================= */

function getText(key) {
  return (
    translations[currentLanguage]?.[key] ??
    translations.fr[key] ??
    key
  );
}

/* =========================================================
   FORMATAGE DES NOMBRES
========================================================= */

function formatNumber(value, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) return "–";

  return new Intl.NumberFormat(
    currentLanguage === "fr" ? "fr-FR" : "en-US",
    {
      maximumFractionDigits,
      minimumFractionDigits: 0
    }
  ).format(value);
}

function formatMoney(value, currency = "USD") {
  if (!Number.isFinite(value)) return "–";

  try {
    return new Intl.NumberFormat(
      currentLanguage === "fr" ? "fr-FR" : "en-US",
      {
        style: "currency",
        currency,
        maximumFractionDigits: currency === "XOF" ? 0 : 2
      }
    ).format(value);
  } catch {
    return `${formatNumber(
      value,
      currency === "XOF" ? 0 : 2
    )} ${currency}`;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

/* =========================================================
   NOTIFICATIONS
========================================================= */

function showToast(message) {
  const toast = $("#toast");

  if (!toast) {
    console.warn(message);
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  if (toastTimer !== null) {
    clearTimeout(toastTimer);
  }

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
    toastTimer = null;
  }, 3500);
}

/* =========================================================
   LECTURE DES NOMBRES
========================================================= */

function readNumber(selector) {
  const element = $(selector);

  if (!element) return null;

  let raw = String(element.value ?? "").trim();

  if (!raw) return null;

  raw = raw.replace(/\s/g, "");

  if (raw.includes(",") && raw.includes(".")) {
    if (raw.lastIndexOf(",") > raw.lastIndexOf(".")) {
      raw = raw.replace(/\./g, "").replace(",", ".");
    } else {
      raw = raw.replace(/,/g, "");
    }
  } else {
    raw = raw.replace(",", ".");
  }

  if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(raw)) {
    return null;
  }

  const value = Number(raw);

  return Number.isFinite(value) ? value : null;
}

function isNonNegative(value) {
  return (
    value !== null &&
    Number.isFinite(value) &&
    value >= 0
  );
}

/* =========================================================
   NAVIGATION
========================================================= */

function normalizeViewName(value) {
  const aliases = {
    "": "home",
    home: "home",
    accueil: "home",

    converters: "converters",
    converter: "converters",
    convertisseurs: "converters",

    calculators: "calculators",
    calculator: "calculators",
    calculateurs: "calculators",

    markets: "markets",
    market: "markets",
    marche: "markets",
    "marché": "markets",

    about: "about",
    apropos: "about",
    "à-propos": "about",

    disclaimer: "disclaimer",
    avertissement: "disclaimer"
  };

  const normalized = String(value || "")
    .replace(/^#/, "")
    .trim()
    .toLowerCase();

  return aliases[normalized] || null;
}

function getViewElement(viewName) {
  const aliases = {
    home: [
      "#homeHero",
      "#hero",
      '[data-view="home"]',
      "#home"
    ],
    converters: [
      "#converters",
      "#convertisseurs",
      '[data-view="converters"]'
    ],
    calculators: [
      "#calculators",
      "#calculateurs",
      '[data-view="calculators"]'
    ],
    markets: [
      "#markets",
      "#market",
      "#marche",
      '[data-view="markets"]'
    ],
    about: [
      "#about",
      "#apropos",
      '[data-view="about"]'
    ],
    disclaimer: [
      "#disclaimer",
      '[data-view="disclaimer"]'
    ]
  };

  for (const selector of aliases[viewName] || []) {
    const element = $(selector);

    if (element) return element;
  }

  return null;
}

function getMainContainer() {
  return (
    $("main") ||
    $("#app") ||
    $(".app-container") ||
    document.body
  );
}

function ensureViewStyles() {
  if ($("#ctg-view-styles")) return;

  const style = document.createElement("style");

  style.id = "ctg-view-styles";

  style.textContent = `
    .ctg-view-hidden {
      display: none !important;
    }

    .ctg-view-visible {
      display: block;
      animation: ctgViewFade .18s ease-out;
    }

    .ctg-market-row {
      cursor: pointer;
    }

    .ctg-market-row:hover {
      filter: brightness(1.12);
    }

    .ctg-market-row:focus-visible {
      outline: 2px solid #1683ff;
      outline-offset: -2px;
    }

    .ctg-back-button {
      display: inline-flex;
      align-items: center;
      gap: .45rem;
      margin: 0 0 1rem;
      padding: .65rem .95rem;
      border: 1px solid rgba(22,131,255,.45);
      border-radius: 10px;
      background: rgba(22,131,255,.09);
      color: inherit;
      font: inherit;
      cursor: pointer;
    }

    .ctg-back-button:hover {
      background: rgba(22,131,255,.18);
    }

    .ctg-selected-asset {
      display: none;
      margin: 0 0 1rem;
      padding: .8rem 1rem;
      border-radius: 12px;
      border: 1px solid rgba(22,131,255,.25);
      background: rgba(22,131,255,.07);
    }

    .ctg-selected-asset.active {
      display: block;
    }

    @keyframes ctgViewFade {
      from {
        opacity: .6;
        transform: translateY(3px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .ctg-view-visible {
        animation: none;
      }
    }
  `;

  document.head.appendChild(style);
}

function getSectionRoot(element) {
  if (!element) return null;

  const selectors = [
    "section[id]",
    "article[id]",
    "[data-view]",
    ".page-view"
  ];

  for (const selector of selectors) {
    const root = element.closest(selector);

    if (
      root &&
      root !== $("main") &&
      root !== $("#app")
    ) {
      return root;
    }
  }

  return element;
}

function collectViewRoots() {
  const roots = {};

  for (const viewName of VIEW_IDS) {
    const element = getViewElement(viewName);

    if (element) {
      roots[viewName] = getSectionRoot(element);
    }
  }

  const main = $("main");
  const app = $("#app");

  if (roots.home === main || roots.home === app) {
    const homeHero = $("#homeHero") || $("#hero");

    if (homeHero) {
      roots.home = getSectionRoot(homeHero);
    } else {
      delete roots.home;
    }
  }

  return roots;
}

function updateActiveNavigation(viewName) {
  const links = $$(
    "#mainNav a, nav a, [data-nav-view], [data-view-link]"
  );

  links.forEach(link => {
    const href = link.getAttribute("href") || "";

    const target = normalizeViewName(
      link.dataset.navView ||
      link.dataset.viewLink ||
      href
    );

    const active = target === viewName;

    link.classList.toggle("active", active);

    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function ensureBackButton() {
  let button = $("#ctgBackButton");

  if (button) return button;

  const main = getMainContainer();

  if (!main || main === document.body) {
    return null;
  }

  button = document.createElement("button");
  button.id = "ctgBackButton";
  button.type = "button";
  button.className = "ctg-back-button";
  button.textContent = getText("backButton");
  button.hidden = true;

  main.insertBefore(button, main.firstElementChild);

  button.addEventListener("click", () => {
    const previousView = normalizeViewName(
      window.history.state?.view
    );

    if (window.history.length > 1 && previousView) {
      window.history.back();
    } else {
      navigateToView("home");
    }
  });

  return button;
}

function updateBackButton() {
  const button = $("#ctgBackButton");

  if (!button) return;

  button.textContent = getText("backButton");
  button.hidden = currentView === "home";
}

function setViewVisibility(viewName) {
  const roots = collectViewRoots();
  const chosenRoot = roots[viewName];

  const distinctRoots = new Set(
    Object.values(roots).filter(Boolean)
  );

  if (distinctRoots.size > 1) {
    for (const [name, root] of Object.entries(roots)) {
      if (!root || root === document.body) continue;

      const visible = name === viewName;

      root.classList.toggle(
        "ctg-view-hidden",
        !visible
      );

      root.classList.toggle(
        "ctg-view-visible",
        visible
      );

      root.setAttribute(
        "aria-hidden",
        String(!visible)
      );
    }
  } else if (chosenRoot) {
    chosenRoot.classList.remove("ctg-view-hidden");
    chosenRoot.classList.add("ctg-view-visible");
    chosenRoot.setAttribute("aria-hidden", "false");
  }

  currentView = viewName;

  updateActiveNavigation(viewName);
  updateBackButton();

  if (viewName === "markets") {
    renderMarketTable();
    updateSelectedAssetDisplay();
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto"
  });
}

function navigateToView(viewName, options = {}) {
  const normalized = normalizeViewName(viewName);

  if (!normalized) {
    showToast(getText("noView"));
    return;
  }

  const target = getViewElement(normalized);

  if (!target && normalized !== "home") {
    console.warn(
      `Vue introuvable : ${normalized}`
    );

    showToast(getText("noView"));
    return;
  }

  const nextHash = `#${normalized}`;

  if (options.fromHistory) {
    setViewVisibility(normalized);
    return;
  }

  if (window.location.hash !== nextHash) {
    if (options.replace) {
      window.history.replaceState(
        {
          ...(window.history.state || {}),
          view: normalized
        },
        "",
        nextHash
      );
    } else {
      window.history.pushState(
        {
          ...(window.history.state || {}),
          view: normalized
        },
        "",
        nextHash
      );
    }
  }

  setViewVisibility(normalized);
}

function handleNavigationClick(event) {
  const target = event.target;

  if (!(target instanceof Element)) return;

  const link = target.closest(
    "#mainNav a, nav a, [data-nav-view], [data-view-link], a[href^='#']"
  );

  if (!link) return;

  const href = link.getAttribute("href") || "";

  if (
    !href.startsWith("#") ||
    href === "#" ||
    link.hasAttribute("data-no-spa") ||
    link.hasAttribute("download") ||
    link.target === "_blank"
  ) {
    return;
  }

  const viewName = normalizeViewName(
    link.dataset.navView ||
    link.dataset.viewLink ||
    href
  );

  if (!viewName) return;

  event.preventDefault();
  navigateToView(viewName);
}

function setupNavigation() {
  if (navigationInitialized) return;

  navigationInitialized = true;

  ensureViewStyles();
  ensureBackButton();

  document.addEventListener(
    "click",
    handleNavigationClick
  );

  window.addEventListener("popstate", event => {
    const stateView = normalizeViewName(
      event.state?.view
    );

    const hashView = normalizeViewName(
      window.location.hash
    );

    const view = stateView || hashView || "home";

    navigateToView(view, {
      fromHistory: true
    });
  });

  window.addEventListener("hashchange", () => {
    const view =
      normalizeViewName(window.location.hash) ||
      "home";

    if (view !== currentView) {
      navigateToView(view, {
        fromHistory: true
      });
    }
  });

  const initialView =
    normalizeViewName(window.location.hash) ||
    "home";

  if (window.history.state?.view !== initialView) {
    window.history.replaceState(
      {
        ...(window.history.state || {}),
        view: initialView
      },
      "",
      `#${initialView}`
    );
  }

  setViewVisibility(initialView);
}

/* =========================================================
   PRIX DU MARCHÉ
========================================================= */

function getUsdPrice(assetId) {
  const value = marketPrices[assetId]?.usd;

  return (
    Number.isFinite(value) && value > 0
      ? value
      : null
  );
}

function getXofPrice(assetId) {
  const asset = marketPrices[assetId];

  if (!asset) return null;

  if (
    Number.isFinite(asset.xof) &&
    asset.xof > 0
  ) {
    return asset.xof;
  }

  if (
    Number.isFinite(asset.eur) &&
    asset.eur > 0
  ) {
    return asset.eur * EUR_TO_XOF;
  }

  if (
    Number.isFinite(asset.usd) &&
    asset.usd > 0 &&
    Number.isFinite(marketPrices.__eurusd) &&
    marketPrices.__eurusd > 0
  ) {
    return (
      asset.usd /
      marketPrices.__eurusd *
      EUR_TO_XOF
    );
  }

  return null;
}

function updateHeroPrices() {
  const prices = {
    "#heroBtcPrice": getUsdPrice("bitcoin"),
    "#heroEthPrice": getUsdPrice("ethereum"),
    "#heroSolPrice": getUsdPrice("solana")
  };

  for (const [selector, price] of Object.entries(prices)) {
    const element = $(selector);

    if (!element) continue;

    element.textContent =
      price === null
        ? "–"
        : formatMoney(price, "USD");
  }

  const changeElement = $("#heroBtcChange");

  if (changeElement) {
    changeElement.textContent =
      getUsdPrice("bitcoin") === null
        ? "–"
        : "USD";
  }
}

/* =========================================================
   CRYPTOMONNAIE SÉLECTIONNÉE
========================================================= */

function ensureSelectedAssetDisplay() {
  if ($("#ctgSelectedAsset")) return;

  const marketRoot = getViewElement("markets");

  if (!marketRoot) return;

  const marketTitle =
    $("#marketTitle") ||
    $("#markets h1") ||
    $("#markets h2") ||
    $("#markets h3");

  const info = document.createElement("div");

  info.id = "ctgSelectedAsset";
  info.className = "ctg-selected-asset";
  info.setAttribute("aria-live", "polite");

  if (marketTitle?.parentElement) {
    marketTitle.parentElement.insertBefore(
      info,
      marketTitle.nextSibling
    );
  } else {
    marketRoot.prepend(info);
  }
}

function updateSelectedAssetDisplay() {
  const box = $("#ctgSelectedAsset");

  if (!box) return;

  const asset = ASSETS[selectedAsset];

  if (!asset) {
    box.classList.remove("active");
    box.textContent = "";
    return;
  }

  const usd = getUsdPrice(selectedAsset);
  const xof = getXofPrice(selectedAsset);

  box.innerHTML = `
    <strong>${escapeHtml(getText("selectedAsset"))} :</strong>
    ${escapeHtml(asset.icon)}
    ${escapeHtml(asset.name)}
    (${escapeHtml(asset.symbol)})
    <span> — ${usd === null ? "--" : escapeHtml(formatMoney(usd, "USD"))}</span>
    <span> — ${xof === null ? "--" : escapeHtml(formatMoney(xof, "XOF"))}</span>
  `;

  box.classList.add("active");
}

function openMarketForAsset(assetId) {
  if (!ASSETS[assetId]) return;

  selectedAsset = assetId;

  navigateToView("markets");

  const select = $("#cryptoSelect");

  if (
    select &&
    Array.from(select.options).some(
      option => option.value === assetId
    )
  ) {
    select.value = assetId;
    updateCryptoUnit();

    if (readNumber("#cryptoAmount") !== null) {
      convertCrypto();
    }
  }

  updateSelectedAssetDisplay();

  $$("#marketTableBody [data-asset-id]").forEach(row => {
    row.removeAttribute("aria-current");
  });

  const row = $(
    `#marketTableBody [data-asset-id="${CSS.escape(assetId)}"]`
  );

  if (row) {
    row.setAttribute("aria-current", "true");
  }
}

function attachMarketRowNavigation() {
  const tbody = $("#marketTableBody");

  if (
    !tbody ||
    tbody.dataset.navigationBound === "true"
  ) {
    return;
  }

  tbody.dataset.navigationBound = "true";

  tbody.addEventListener("click", event => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const row = target.closest("[data-asset-id]");

    if (!row) return;

    openMarketForAsset(row.dataset.assetId);
  });

  tbody.addEventListener("keydown", event => {
    if (
      event.key !== "Enter" &&
      event.key !== " "
    ) {
      return;
    }

    const target = event.target;

    if (!(target instanceof Element)) return;

    const row = target.closest("[data-asset-id]");

    if (!row) return;

    event.preventDefault();
    openMarketForAsset(row.dataset.assetId);
  });
}

/* =========================================================
   TABLEAU DES PRIX
========================================================= */

function renderMarketTable() {
  const tbody = $("#marketTableBody");

  if (!tbody) return;

  const ids = Object.keys(ASSETS);

  const hasPrices = ids.some(
    id =>
      getUsdPrice(id) !== null ||
      getXofPrice(id) !== null
  );

  if (!hasPrices) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="loading-cell">
          ${escapeHtml(
            lastPriceError
              ? getText("dataError")
              : getText("loadingPrices")
          )}
        </td>
      </tr>
    `;

    attachMarketRowNavigation();
    return;
  }

  tbody.innerHTML = ids.map(id => {
    const asset = ASSETS[id];
    const usd = getUsdPrice(id);
    const xof = getXofPrice(id);

    return `
      <tr
        class="ctg-market-row"
        data-asset-id="${escapeHtml(id)}"
        tabindex="0"
        role="button"
        aria-label="${escapeHtml(asset.name)} — ${escapeHtml(getText("marketTitle"))}"
        ${id === selectedAsset ? 'aria-current="true"' : ""}
      >
        <td>
          <div class="market-asset">
            <span class="market-asset-icon">${escapeHtml(asset.icon)}</span>
            <span class="market-asset-info">
              <strong>${escapeHtml(asset.name)}</strong>
              <span>${escapeHtml(asset.symbol)}</span>
            </span>
          </div>
        </td>

        <td class="market-price">
          ${usd === null ? "--" : escapeHtml(formatMoney(usd, "USD"))}
        </td>

        <td class="market-price">
          ${xof === null ? "--" : escapeHtml(formatMoney(xof, "XOF"))}
        </td>
      </tr>
    `;
  }).join("");

  attachMarketRowNavigation();
  updateSelectedAssetDisplay();
}

/* =========================================================
   TAUX USDT / FCFA
========================================================= */

function updateUsdtRateNote() {
  const note = $("#usdtRateNote");

  if (!note) return;

  const rate = getXofPrice("tether");

  note.textContent =
    rate === null
      ? `${getText("fcfaRateLabel")} : --`
      : `${getText("fcfaRateLabel")} : 1 USDT ≈ ${formatMoney(rate, "XOF")}`;
}

/* =========================================================
   CHARGEMENT DES PRIX
========================================================= */

async function fetchPrices() {
  if (isFetchingPrices) return;

  isFetchingPrices = true;

  const button = $("#refreshPricesButton");

  if (button) {
    button.disabled = true;
    button.style.opacity = "0.65";
  }

  const ids = Object.keys(ASSETS).join(",");

  const url = `${API_URL}?${new URLSearchParams({
    ids,
    vs_currencies: "usd,eur"
  })}`;

  const controller = new AbortController();

  activeRequestController = controller;

  const timeoutId = window.setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT
  );

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "no-store",
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(
        `API CoinGecko : HTTP ${response.status}`
      );
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Réponse API invalide.");
    }

    const nextPrices = {};
    let receivedAnyPrice = false;

    for (const id of Object.keys(ASSETS)) {
      const item = data[id];

      if (!item) continue;

      const usd = Number(item.usd);
      const eur = Number(item.eur);

      const validUsd =
        Number.isFinite(usd) && usd > 0
          ? usd
          : null;

      const validEur =
        Number.isFinite(eur) && eur > 0
          ? eur
          : null;

      nextPrices[id] = {
        usd: validUsd,
        eur: validEur,
        xof: null
      };

      if (validUsd !== null || validEur !== null) {
        receivedAnyPrice = true;
      }
    }

    if (!receivedAnyPrice) {
      throw new Error("Aucun prix valide reçu.");
    }

    /*
      Conserver les anciens prix lorsqu'un actif
      n'est temporairement pas renvoyé par l'API.
    */
    for (const [id, price] of Object.entries(nextPrices)) {
      marketPrices[id] = {
        ...(marketPrices[id] || {}),
        ...price
      };
    }

    const btc = marketPrices.bitcoin;

    if (
      btc &&
      Number.isFinite(btc.usd) &&
      btc.usd > 0 &&
      Number.isFinite(btc.eur) &&
      btc.eur > 0
    ) {
      marketPrices.__eurusd = btc.usd / btc.eur;
    }

    lastSuccessfulUpdate = new Date();
    lastPriceError = null;

    updateHeroPrices();
    renderMarketTable();
    updateAllCalculations();
    updateLastUpdatedLabel();
    updateUsdtRateNote();
    updateSelectedAssetDisplay();

  } catch (error) {
    lastPriceError = error;

    console.error(
      "CryptoTools Global : erreur de chargement des prix",
      error
    );

    showToast(getText("priceError"));

    const tbody = $("#marketTableBody");

    if (tbody && !lastSuccessfulUpdate) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" class="loading-cell">
            ${escapeHtml(getText("dataError"))}
          </td>
        </tr>
      `;
    }

    updateLastUpdatedLabel();

  } finally {
    window.clearTimeout(timeoutId);

    isFetchingPrices = false;
    activeRequestController = null;

    if (button) {
      button.disabled = false;
      button.style.opacity = "1";
    }
  }
}

/* =========================================================
   CONVERTISSEUR BTC -> USDT
========================================================= */

function convertBtc() {
  const amount = readNumber("#btcAmount");
  const btcPrice = getUsdPrice("bitcoin");
  const usdtPrice = getUsdPrice("tether");

  if (!isNonNegative(amount)) {
    showToast(getText("invalidAmount"));
    return;
  }

  if (
    btcPrice === null ||
    usdtPrice === null ||
    usdtPrice <= 0
  ) {
    showToast(getText("priceError"));
    return;
  }

  const result = (amount * btcPrice) / usdtPrice;
  const output = $("#btcResult");

  if (output) {
    output.textContent =
      `${formatNumber(result, 8)} USDT`;
  }
}

/* =========================================================
   CONVERTISSEUR USDT -> FCFA
========================================================= */

function convertUsdt() {
  const amount = readNumber("#usdtAmount");
  const rate = getXofPrice("tether");

  if (!isNonNegative(amount)) {
    showToast(getText("invalidAmount"));
    return;
  }

  if (rate === null) {
    showToast(getText("priceError"));
    return;
  }

  const output = $("#usdtResult");

  if (output) {
    output.textContent =
      `${formatNumber(amount * rate, 0)} FCFA`;
  }
}

/* =========================================================
   CONVERTISSEUR CRYPTO -> FCFA
========================================================= */

function updateCryptoUnit() {
  const select = $("#cryptoSelect");

  if (!select) return;

  const asset = ASSETS[select.value];
  const unit = $("#cryptoUnit");

  if (unit) {
    unit.textContent = asset
      ? asset.symbol
      : "CRYPTO";
  }

  if (asset) {
    selectedAsset = select.value;
  }

  updateSelectedAssetDisplay();
}

function convertCrypto() {
  const amount = readNumber("#cryptoAmount");
  const select = $("#cryptoSelect");

  if (!select) return;

  if (!ASSETS[select.value]) {
    showToast(getText("priceError"));
    return;
  }

  if (!isNonNegative(amount)) {
    showToast(getText("invalidAmount"));
    return;
  }

  const price = getXofPrice(select.value);

  if (price === null) {
    showToast(getText("priceError"));
    return;
  }

  const output = $("#cryptoResult");

  if (output) {
    output.textContent =
      `${formatNumber(amount * price, 0)} FCFA`;
  }
}

/* =========================================================
   CALCULATEUR DE PROFITS / PERTES
========================================================= */

function calculateProfit() {
  const buy = readNumber("#buyPrice");
  const sell = readNumber("#sellPrice");
  const quantity = readNumber("#assetQuantity");

  if (
    !isNonNegative(buy) ||
    !isNonNegative(sell) ||
    !isNonNegative(quantity)
  ) {
    showToast(getText("enterValues"));
    return;
  }

  const profit = (sell - buy) * quantity;
  const invested = buy * quantity;

  const percentage =
    invested > 0
      ? (profit / invested) * 100
      : null;

  const result = $("#profitResult");

  if (result) {
    result.textContent =
      `${formatNumber(profit, 6)} USDT`;

    result.classList.remove(
      "positive-result",
      "negative-result"
    );

    if (profit > 0) {
      result.classList.add("positive-result");
    } else if (profit < 0) {
      result.classList.add("negative-result");
    }
  }

  const percentageElement = $("#profitPercentage");

  if (percentageElement) {
    percentageElement.textContent =
      percentage === null
        ? "– %"
        : `${formatNumber(percentage, 2)} %`;
  }
}

/* =========================================================
   CALCULATEUR DE FRAIS
========================================================= */

function calculateFees() {
  const amount = readNumber("#transactionAmount");
  const rate = readNumber("#feeRate");

  if (
    !isNonNegative(amount) ||
    !isNonNegative(rate) ||
    rate > 100
  ) {
    showToast(getText("enterValues"));
    return;
  }

  const fees = amount * rate / 100;
  const net = amount - fees;

  const feesOutput = $("#feesResult");
  const netOutput = $("#netAmountResult");

  if (feesOutput) {
    feesOutput.textContent =
      `${formatNumber(fees, 6)} USDT`;
  }

  if (netOutput) {
    netOutput.textContent =
      `${getText("netAmountLabel")} : ${formatNumber(net, 6)} USDT`;
  }
}

/* =========================================================
   MISE À JOUR AUTOMATIQUE DES CALCULS
========================================================= */

function updateAllCalculations() {
  if (readNumber("#btcAmount") !== null) {
    convertBtc();
  }

  if (readNumber("#usdtAmount") !== null) {
    convertUsdt();
  }

  if (readNumber("#cryptoAmount") !== null) {
    convertCrypto();
  }

  const buy = readNumber("#buyPrice");
  const sell = readNumber("#sellPrice");
  const quantity = readNumber("#assetQuantity");

  if (
    buy !== null &&
    sell !== null &&
    quantity !== null
  ) {
    calculateProfit();
  }

  const amount = readNumber("#transactionAmount");
  const rate = readNumber("#feeRate");

  if (amount !== null && rate !== null) {
    calculateFees();
  }
}

/* =========================================================
   DERNIÈRE MISE À JOUR
========================================================= */

function updateLastUpdatedLabel() {
  const element = $("#lastUpdated");

  if (!element) return;

  if (!lastSuccessfulUpdate) {
    element.textContent = getText("loadingPrices");
    return;
  }

  const formatted = new Intl.DateTimeFormat(
    currentLanguage === "fr" ? "fr-FR" : "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short"
    }
  ).format(lastSuccessfulUpdate);

  element.textContent =
    `${getText("lastUpdated")} : ${formatted}`;
}

/* =========================================================
   TRADUCTION DE LA PAGE
========================================================= */

function translatePage() {
  document.documentElement.lang = currentLanguage;

  $$("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const translated = getText(key);

    if (
      element.tagName === "INPUT" ||
      element.tagName === "TEXTAREA"
    ) {
      if (element.hasAttribute("data-i18n-placeholder")) {
        element.placeholder = translated;
      }
    } else {
      element.textContent = translated;
    }
  });

  const languageSelect = $("#languageSelect");

  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }

  try {
    localStorage.setItem(
      "ctg-language",
      currentLanguage
    );
  } catch (error) {
    console.warn(
      "Impossible d’enregistrer la langue :",
      error
    );
  }

  const backButton = $("#ctgBackButton");

  if (backButton) {
    backButton.textContent = getText("backButton");
  }

  renderMarketTable();
  updateHeroPrices();
  updateAllCalculations();
  updateLastUpdatedLabel();
  updateUsdtRateNote();
  updateSelectedAssetDisplay();
}

/* =========================================================
   MENU MOBILE
========================================================= */

function setupMobileMenu() {
  const button = $("#menuToggle");
  const nav = $("#mainNav");

  if (!button || !nav) return;

  if (button.dataset.menuBound === "true") {
    return;
  }

  button.dataset.menuBound = "true";
  button.setAttribute("aria-expanded", "false");

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");

    button.setAttribute(
      "aria-expanded",
      String(open)
    );

    button.textContent = open ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");

      button.setAttribute(
        "aria-expanded",
        "false"
      );

      button.textContent = "☰";
    });
  });
}

/* =========================================================
   LIENS D'ACCÈS RAPIDE
========================================================= */

function setupQuickNavigation() {
  const quickLinks = [
    {
      selectors: [
        "#heroButton",
        "#getStartedButton",
        '[data-go-view="converters"]'
      ],
      view: "converters"
    },
    {
      selectors: [
        "#heroMarketButton",
        '[data-go-view="markets"]'
      ],
      view: "markets"
    },
    {
      selectors: ["#marketPreview"],
      view: "markets"
    }
  ];

  for (const item of quickLinks) {
    for (const selector of item.selectors) {
      $$(selector).forEach(element => {
        if (
          element.dataset.quickNavigationBound === "true"
        ) {
          return;
        }

        element.dataset.quickNavigationBound = "true";

        element.addEventListener("click", event => {
          if (element.tagName === "A") {
            event.preventDefault();
          }

          navigateToView(item.view);
        });
      });
    }
  }
}

/* =========================================================
   ÉVÉNEMENTS DES OUTILS
========================================================= */

function setupEvents() {
  const bindClick = (selector, callback) => {
    const element = $(selector);

    if (
      !element ||
      element.dataset.eventBound === "true"
    ) {
      return;
    }

    element.dataset.eventBound = "true";

    element.addEventListener("click", event => {
      event.preventDefault();
      callback();
    });
  };

  bindClick("#convertBtcButton", convertBtc);
  bindClick("#convertUsdtButton", convertUsdt);
  bindClick("#convertCryptoButton", convertCrypto);

  bindClick(
    "#calculateProfitButton",
    calculateProfit
  );

  bindClick(
    "#calculateFeesButton",
    calculateFees
  );

  bindClick(
    "#refreshPricesButton",
    fetchPrices
  );

  const cryptoSelect = $("#cryptoSelect");

  if (
    cryptoSelect &&
    cryptoSelect.dataset.eventBound !== "true"
  ) {
    cryptoSelect.dataset.eventBound = "true";

    cryptoSelect.addEventListener("change", () => {
      updateCryptoUnit();

      if (readNumber("#cryptoAmount") !== null) {
        convertCrypto();
      }
    });
  }

  const languageSelect = $("#languageSelect");

  if (
    languageSelect &&
    languageSelect.dataset.eventBound !== "true"
  ) {
    languageSelect.dataset.eventBound = "true";

    languageSelect.addEventListener("change", event => {
      currentLanguage =
        event.target.value === "en" ? "en" : "fr";

      translatePage();
    });
  }

  const yearElement = $("#currentYear");

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }

  const inputSelectors = [
    "#btcAmount",
    "#usdtAmount",
    "#cryptoAmount",
    "#buyPrice",
    "#sellPrice",
    "#assetQuantity",
    "#transactionAmount",
    "#feeRate"
  ];

  inputSelectors.forEach(selector => {
    const input = $(selector);

    if (
      !input ||
      input.dataset.eventBound === "true"
    ) {
      return;
    }

    input.dataset.eventBound = "true";

    input.addEventListener(
      "input",
      updateAllCalculations
    );
  });

  setupMobileMenu();
  setupQuickNavigation();
}

/* =========================================================
   INITIALISATION
========================================================= */

function initializeSite() {
  setupNavigation();
  setupEvents();

  ensureSelectedAssetDisplay();

  updateCryptoUnit();
  translatePage();

  fetchPrices();

  if (refreshIntervalId !== null) {
    window.clearInterval(refreshIntervalId);
  }

  refreshIntervalId = window.setInterval(
    fetchPrices,
    REFRESH_INTERVAL
  );
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeSite,
    { once: true }
  );
} else {
  initializeSite();
}
