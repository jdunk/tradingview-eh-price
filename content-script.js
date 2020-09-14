let lastPriceObserver;
let putLastPriceInPageTitle = () => {
  if (!lastPriceObserver) {
    let nodeToObserve = document.querySelector('[data-name="legend-series-item"] [class*="valueItem"]:nth-child(4) [class*="valueValue"]');

    if (!nodeToObserve) {
      setTimeout(() => {
        putLastPriceInPageTitle();
      }, 1500);

      return;
    }

    lastPriceObserver = new MutationObserver((mutations) => {
      document.title = `${document.title.split(' ')[0]} ${mutations[0].target.textContent}`;
    });
    lastPriceObserver.observe(
      nodeToObserve,
      { childList: true, subtree: true, characterData: true }
    );
  }
};

putLastPriceInPageTitle();
