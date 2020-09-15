let lastPriceObserver;
let putLastPriceInPageTitle = () => {
  if (!lastPriceObserver) {
    let ohlcTitleNodes = document.querySelectorAll('[data-name="legend-series-item"] [class*="valueItem"] [class*="valueTitle"]');

    if (!ohlcTitleNodes) {
      setTimeout(() => {
        putLastPriceInPageTitle();
      }, 1500);

      return;
    }

    const cTitleNode = [...ohlcTitleNodes].find((elem) => elem.textContent === 'C');

    if (!cTitleNode) {
      setTimeout(() => {
        putLastPriceInPageTitle();
      }, 800);

      return;
    }

    lastPriceObserver = new MutationObserver((mutations) => {
      document.title = `${document.title.split(' ')[0]} ${mutations[0].target.textContent}`;
    });
    lastPriceObserver.observe(
      cTitleNode.nextElementSibling,
      { childList: true, subtree: true, characterData: true }
    );
  }
};

putLastPriceInPageTitle();
