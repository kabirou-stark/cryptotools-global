"use strict";

/* ==========================================
   CRYPTOTOOLS GLOBAL
   Conversions, calculateurs et prix crypto
   ========================================== */

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price";

const ASSETS = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿"
  },
  ethereum: {
    name: "Ethereum",
    symbol: "ETH",
    icon: "Ξ"
  },
  binancecoin: {
    name: "BNB",
    symbol: "BNB",
    icon: "◆"
  },
  solana: {
    name: "Solana",
    symbol: "SOL",
    icon: "◎"
  },
  tether: {
    name: "Tether",
    symbol: "USDT",
    icon: "₮"
  }
};

/*
 * Parité officielle de l'euro avec le FCFA BCEAO.
 * 1 EUR = 655,957 XOF.
 */
const EUR_TO_XOF = 655.957;

const translations = {
  fr: {
    navHome: "Accueil",
    navConverters: "Convertisseurs",
    navCalculators: "Calculateurs",
    navMarkets: "Marché",
    heroBadge: "DES OUTILS CRYPTO GRATUITS",
    heroTitle: 'La crypto, <span>plus simple.</span>',
    heroDescription:
      "Convertissez vos cryptomonnaies, estimez vos gains et consultez les prix du marché depuis une plateforme simple et accessible.",
    heroButton: "Commencer gratuitement",
    heroMarketButton: "Voir les prix",
    trustFree: "Outils gratuits",
    trustMobile: "Adapté au mobile",
    trustSimple: "Simple à utiliser",
    marketPreview: "Aperçu du marché",
    indicativePrices: "Prix indicatifs",
    adPlaceholder:
      "Espace publicitaire — les annonces apparaîtront après configuration d'un fournisseur compatible.",
    toolsEyebrow: "NOS OUTILS",
    convertersTitle: "Convertisseurs crypto",
    convertersDescription:
      "Obtenez rapidement une estimation de la valeur de vos cryptomonnaies.",
    btcConverterTitle: "Bitcoin vers USDT",
    btcConverterDescription: "Convertissez du BTC en Tether.",
    usdtConverterTitle: "USDT vers FCFA",
    usdtConverterDescription:
      "Estimez la valeur de vos USDT en francs CFA BCEAO.",
    cryptoConverterTitle: "Crypto vers FCFA",
    cryptoConverterDescription:
      "Estimez la valeur d'une autre cryptomonnaie en FCFA.",
    amountLabel: "Montant",
    convertButton: "Convertir",
    estimatedResult: "Résultat estimé",
    popularBadge: "Populaire",
    cryptoLabel: "Cryptomonnaie",
    calculatorEyebrow: "CALCULS PRATIQUES",
    calculatorsTitle: "Calculateurs crypto",
    calculatorsDescription:
      "Préparez vos calculs avant une opération.",
    profitTitle: "Calculateur de profits et pertes",
    profitDescription:
      "Comparez votre prix d'achat à votre prix de vente.",
    buyPriceLabel: "Prix d'achat (USDT)",
    sellPriceLabel: "Prix de vente (USDT)",
    quantityLabel: "Quantité achetée",
    calculateButton: "Calculer",
    profitResultLabel: "Profit / perte estimé",
    feesTitle: "Frais de transaction",
    feesDescription:
      "Estimez les frais proportionnels d'une transaction.",
    transactionAmountLabel: "Montant de la transaction (USDT)",
    feeRateLabel: "Taux de frais (%)",
    feesResultLabel: "Frais estimés",
    feesNote:
      "Les frais réels dépendent de la plateforme et du réseau utilisés.",
    marketEyebrow: "SUIVI DU MARCHÉ",
    marketTitle: "Prix des cryptomonnaies",
    marketDescription:
      "Consultez les dernières données disponibles.",
    refreshButton: "↻ Actualiser",
    coinColumn: "Actif",
    priceColumn: "Prix (USD)",
    fcfaColumn: "Prix (FCFA)",
    loadingPrices: "Chargement des prix...",
    aboutEyebrow: "À PROPOS",
    aboutTitle: "Les outils crypto, accessibles à tous.",
    aboutDescription:
      "CryptoTools Global rassemble des outils gratuits pour convertir des montants, comprendre les frais et estimer des résultats. Les estimations ne garantissent aucun gain financier.",
    footerDescription:
      "Des outils crypto simples, gratuits et accessibles.",
    footerNavigation: "Navigation",
    footerInformation: "Informations",
    footerAbout: "À propos",
    footerDisclaimer: "Avertissement",
    rightsReserved: "Tous droits réservés.",
    footerDisclaimerText:
      "Les informations fournies sont indicatives et ne constituent pas des conseils financiers.",
    netAmountLabel: "Montant après frais",
    lastUpdated: "Dernière mise à jour",
    priceError: "Prix temporairement indisponibles.",
    invalidAmount:
      "Saisis un montant valide supérieur ou égal à zéro.",
    enterValues:
      "Renseigne tous les champs avec des valeurs valides.",
    dataError:
      "Impossible de charger les prix. Réessaie dans quelques instants.",
    fcfaRateLabel: "Taux indicatif utilisé",
    marketDisclaimer:
      "Les cours sont indicatifs. Le prix réel peut varier selon la plateforme, le pays, le réseau et les frais appliqués."
  },

  en: {
    navHome: "Home",
    navConverters: "Converters",
    navCalculators: "Calculators",
    navMarkets: "Market",
    heroBadge: "FREE CRYPTO TOOLS",
    heroTitle: 'Crypto, <span>made simpler.</span>',
    heroDescription:
      "Convert cryptocurrencies, estimate profits and check market prices with a simple and accessible platform.",
    heroButton: "Get started for free",
    heroMarketButton: "View prices",
    trustFree: "Free tools",
    trustMobile: "Mobile friendly",
    trustSimple: "Easy to use",
    marketPreview: "Market overview",
    indicativePrices: "Indicative prices",
    adPlaceholder:
      "Advertising space — ads will appear after a compatible provider is configured.",
    toolsEyebrow: "OUR TOOLS",
    convertersTitle: "Crypto converters",
    convertersDescription:
      "Quickly estimate the value of your cryptocurrencies.",
    btcConverterTitle: "Bitcoin to USDT",
    btcConverterDescription: "Convert BTC to Tether.",
    usdtConverterTitle: "USDT to CFA francs",
    usdtConverterDescription:
      "Estimate your USDT value in BCEAO CFA francs.",
    cryptoConverterTitle: "Crypto to CFA francs",
    cryptoConverterDescription:
      "Estimate another cryptocurrency's value in CFA francs.",
    amountLabel: "Amount",
    convertButton: "Convert",
    estimatedResult: "Estimated result",
    popularBadge: "Popular",
    cryptoLabel: "Cryptocurrency",
    calculatorEyebrow: "PRACTICAL CALCULATIONS",
    calculatorsTitle: "Crypto calculators",
    calculatorsDescription:
      "Prepare calculations before a transaction.",
    profitTitle: "Profit and loss calculator",
    profitDescription:
      "Compare your buying and selling prices.",
    buyPriceLabel: "Buy price (USDT)",
    sellPriceLabel: "Sell price (USDT)",
    quantityLabel: "Quantity purchased",
    calculateButton: "Calculate",
    profitResultLabel: "Estimated profit / loss",
    feesTitle: "Transaction fees",
    feesDescription:
      "Estimate proportional transaction fees.",
    transactionAmountLabel: "Transaction amount (USDT)",
    feeRateLabel: "Fee rate (%)",
    feesResultLabel: "Estimated fees",
    feesNote:
      "Actual fees depend on the platform and network used.",
    marketEyebrow: "MARKET TRACKER",
    marketTitle: "Cryptocurrency prices",
    marketDescription:
      "View the latest available data.",
    refreshButton: "↻ Refresh",
    coinColumn: "Asset",
    priceColumn: "Price (USD)",
    fcfaColumn: "Price (CFA)",
    loadingPrices: "Loading prices...",
    aboutEyebrow: "ABOUT",
    aboutTitle: "Crypto tools accessible to everyone.",
    aboutDescription:
      "CryptoTools Global provides free tools to convert amounts, understand fees and estimate results. Estimates do not guarantee financial gains.",
    footerDescription:
      "Simple, free and accessible crypto tools.",
    footerNavigation: "Navigation",
    footerInformation: "Information",
    footerAbout: "About",
    footerDisclaimer: "Disclaimer",
    rightsReserved: "All rights reserved.",
    footerDisclaimerText:
      "Information is indicative and does not constitute financial advice.",
    netAmountLabel: "Amount after fees",
    lastUpdated: "Last updated",
    priceError: "Prices are temporarily unavailable.",
    invalidAmount:
      "Enter a valid amount greater than or equal to zero.",
    enterValues: "Enter valid values in all fields.",
    dataError:
      "Unable to load prices. Please try again shortly.",
    fcfaRateLabel: "Indicative rate used",
    marketDisclaimer:
      "Prices are indicative. Actual prices may vary by platform, country, network and fees."
  }
};

let currentLanguage = "fr";
let marketPrices = {};
let lastSuccessfulUpdate = null;
let toastTimer = null;
let isFetchingPrices = false;

const $ = (selector) => document.querySelector(selector);

function getText(key) {
  return translations[currentLanguage][key] ||
    translations.fr[key] ||
    key;
}

function formatNumber(value, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) return "--";

  return new Intl.NumberFormat(
    currentLanguage === "fr" ? "fr-FR" : "en-US",
    {
      maximumFractionDigits,
      minimumFractionDigits: 0
    }
  ).format(value);
}

function formatMoney(value, currency = "USD") {
  if (!Number.isFinite(value)) return "--";

  return new Intl.NumberFormat(
    currentLanguage === "fr" ? "fr-FR" : "en-US",
    {
      style: "currency",
      currency,
      maximumFractionDigits:
        currency === "XOF" ? 0 : 2
    }
  ).format(value);
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function readNumber(selector) {
  const element = $(selector);

  if (!element || element.value.trim() === "") {
    return null;
  }

  const value = Number(element.value);

  return Number.isFinite(value) ? value : null;
}

function isNonNegative(value) {
  return value !== null && value >= 0;
}

function getUsdPrice(assetId) {
  const value = marketPrices[assetId]?.usd;

  return Number.isFinite(value) && value > 0
    ? value
    : null;
}

/*
 * Prix en FCFA :
 * 1. utiliser le prix XOF direct s'il est disponible ;
 * 2. sinon, convertir le prix EUR en XOF ;
 * 3. sinon, retourner null.
 *
 * 1 EUR = 655,957 XOF.
 */
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

  return null;
}

function translatePage() {
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translated = getText(key);

    if (element.tagName === "INPUT") {
      return;
    }

    element.innerHTML = translated;
  });

  const languageSelect = $("#languageSelect");

  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }

  renderMarketTable();
  updateAllCalculations();
  updateLastUpdatedLabel();
  updateUsdtRateNote();
}

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

function updateHeroPrices() {
  const btc = getUsdPrice("bitcoin");
  const eth = getUsdPrice("ethereum");
  const sol = getUsdPrice("solana");

  const btcElement = $("#heroBtcPrice");
  const ethElement = $("#heroEthPrice");
  const solElement = $("#heroSolPrice");
  const changeElement = $("#heroBtcChange");

  if (btcElement) {
    btcElement.textContent =
      btc === null ? "--" : formatMoney(btc, "USD");
  }

  if (ethElement) {
    ethElement.textContent =
      eth === null ? "--" : formatMoney(eth, "USD");
  }

  if (solElement) {
    solElement.textContent =
      sol === null ? "--" : formatMoney(sol, "USD");
  }

  if (changeElement) {
    changeElement.textContent = "USD";
  }
}

function renderMarketTable() {
  const tbody = $("#marketTableBody");

  if (!tbody) return;

  const ids = Object.keys(ASSETS);

  if (!ids.some((id) => getUsdPrice(id) !== null)) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="loading-cell">
          ${escapeHtml(getText("loadingPrices"))}
        </td>
      </tr>
    `;

    return;
  }

  tbody.innerHTML = ids.map((id) => {
    const asset = ASSETS[id];
    const usd = getUsdPrice(id);
    const xof = getXofPrice(id);

    return `
      <tr>
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
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function updateUsdtRateNote() {
  const note = $("#usdtRateNote");

  if (!note) return;

  const rate = getXofPrice("tether");

  note.textContent =
    rate === null
      ? `${getText("fcfaRateLabel")} : --`
      : `${getText("fcfaRateLabel")} : 1 USDT ≈ ${formatMoney(rate, "XOF")}`;
}

/* ==========================================
   CHARGEMENT DES PRIX
   ========================================== */

async function fetchPrices() {
  if (isFetchingPrices) return;

  isFetchingPrices = true;

  const button = $("#refreshPricesButton");

  if (button) {
    button.disabled = true;
    button.style.opacity = "0.65";
  }

  try {
    const params = new URLSearchParams({
      ids: Object.keys(ASSETS).join(","),
      vs_currencies: "usd,eur,xof"
    });

    const response = await fetch(
      `${API_URL}?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        },
        cache: "no-store"
      }
    );

    if (!response.ok) {
      throw new Error(`API response: ${response.status}`);
    }

    const data = await response.json();

    let receivedAnyPrice = false;

    for (const id of Object.keys(ASSETS)) {
      const item = data[id];

      if (!item) continue;

      const usd = Number(item.usd);
      const eur = Number(item.eur);
      const xof = Number(item.xof);

      marketPrices[id] = {
        usd: Number.isFinite(usd) && usd > 0
          ? usd
          : null,

        eur: Number.isFinite(eur) && eur > 0
          ? eur
          : null,

        xof: Number.isFinite(xof) && xof > 0
          ? xof
          : null
      };

      if (
        marketPrices[id].usd !== null ||
        marketPrices[id].eur !== null ||
        marketPrices[id].xof !== null
      ) {
        receivedAnyPrice = true;
      }
    }

    if (!receivedAnyPrice) {
      throw new Error("No usable price data returned by API");
    }

    lastSuccessfulUpdate = new Date();

    updateHeroPrices();
    renderMarketTable();
    updateAllCalculations();
    updateLastUpdatedLabel();
    updateUsdtRateNote();

  } catch (error) {
    console.error(
      "CryptoTools Global price error:",
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
    isFetchingPrices = false;

    if (button) {
      button.disabled = false;
      button.style.opacity = "1";
    }
  }
}

/* ==========================================
   BTC -> USDT
   ========================================== */

function convertBtc() {
  const amount = readNumber("#btcAmount");
  const price = getUsdPrice("bitcoin");
  const usdtPrice = getUsdPrice("tether");

  if (!isNonNegative(amount)) {
    showToast(getText("invalidAmount"));
    return;
  }

  if (
    price === null ||
    usdtPrice === null ||
    usdtPrice <= 0
  ) {
    showToast(getText("priceError"));
    return;
  }

  const result = amount * price / usdtPrice;
  const output = $("#btcResult");

  if (output) {
    output.textContent =
      `${formatNumber(result, 6)} USDT`;
  }
}

/* ==========================================
   USDT -> FCFA
   ========================================== */

function convertUsdt() {
  const amount = readNumber("#usdtAmount");
  const price = getXofPrice("tether");

  if (!isNonNegative(amount)) {
    showToast(getText("invalidAmount"));
    return;
  }

  if (price === null) {
    showToast(getText("priceError"));
    return;
  }

  const output = $("#usdtResult");

  if (output) {
    output.textContent =
      `${formatNumber(amount * price, 0)} FCFA`;
  }
}

/* ==========================================
   CRYPTO SELECTION -> FCFA
   ========================================== */

function updateCryptoUnit() {
  const select = $("#cryptoSelect");

  if (!select) return;

  const asset = ASSETS[select.value];
  const unit = $("#cryptoUnit");

  if (unit) {
    unit.textContent = asset ? asset.symbol : "CRYPTO";
  }
}

function convertCrypto() {
  const amount = readNumber("#cryptoAmount");
  const select = $("#cryptoSelect");

  if (!select) return;

  const id = select.value;
  const price = getXofPrice(id);

  if (!isNonNegative(amount)) {
    showToast(getText("invalidAmount"));
    return;
  }

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

/* ==========================================
   CALCULATEUR DE PROFITS / PERTES
   ========================================== */

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
      `${formatNumber(profit, 4)} USDT`;

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
        ? "-- %"
        : `${formatNumber(percentage, 2)} %`;
  }
}

/* ==========================================
   CALCULATEUR DE FRAIS
   ========================================== */

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

/* ==========================================
   ACTUALISATION DES CALCULS
   ========================================== */

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

/* ==========================================
   MENU MOBILE
   ========================================== */

function setupMobileMenu() {
  const button = $("#menuToggle");
  const nav = $("#mainNav");

  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const open = nav.classList.toggle("open");

    button.setAttribute(
      "aria-expanded",
      String(open)
    );

    button.textContent = open ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
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

/* ==========================================
   ÉVÉNEMENTS
   ========================================== */

function setupEvents() {
  const bindClick = (selector, callback) => {
    const element = $(selector);

    if (element) {
      element.addEventListener("click", callback);
    }
  };

  bindClick("#convertBtcButton", convertBtc);
  bindClick("#convertUsdtButton", convertUsdt);
  bindClick("#convertCryptoButton", convertCrypto);
  bindClick("#calculateProfitButton", calculateProfit);
  bindClick("#calculateFeesButton", calculateFees);
  bindClick("#refreshPricesButton", fetchPrices);

  const cryptoSelect = $("#cryptoSelect");

  if (cryptoSelect) {
    cryptoSelect.addEventListener("change", () => {
      updateCryptoUnit();

      if (readNumber("#cryptoAmount") !== null) {
        convertCrypto();
      }
    });
  }

  const languageSelect = $("#languageSelect");

  if (languageSelect) {
    languageSelect.addEventListener("change", (event) => {
      currentLanguage =
        event.target.value === "en" ? "en" : "fr";

      translatePage();
    });
  }

  const yearElement = $("#currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /*
   * Recalculer les résultats quand les champs changent.
   */
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

  inputSelectors.forEach((selector) => {
    const input = $(selector);

    if (!input) return;

    input.addEventListener("input", () => {
      updateAllCalculations();
    });
  });

  setupMobileMenu();
}

/* ==========================================
   INITIALISATION
   ========================================== */

function initializeSite() {
  setupEvents();
  updateCryptoUnit();
  translatePage();
  fetchPrices();

  // Actualisation périodique des cours.
  window.setInterval(fetchPrices, 120000);
}

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeSite
  );
} else {
  initializeSite();
}
