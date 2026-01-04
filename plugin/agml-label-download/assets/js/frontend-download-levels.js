/* AGML Label Download – LV/CP画像描画安定化版 */
(function () {
  console.log("✅ frontend-download-levels.js loaded (anti-flicker)");

  var BASE = (window.agml_download_strings && agml_download_strings.plugin_url)
    ? agml_download_strings.plugin_url + "assets/ui/"
    : "/wp-content/plugins/agml-label-download/assets/ui/";

  function insertBadge(target, imgSrc, className) {
    if (!target) return;
    const existing = target.parentNode.querySelector("." + className);
    if (existing && existing.src.includes(imgSrc)) return;

    target.parentNode.querySelectorAll("." + className).forEach(n => n.remove());
    const img = document.createElement("img");
    img.src = imgSrc;
    img.className = className;
    img.alt = className.includes("lv") ? "AI Level" : "Copyright Indicator";
    img.style.height = "22px";
    img.style.marginLeft = "6px";
    img.style.verticalAlign = "middle";
    img.style.imageRendering = "-webkit-optimize-contrast";
    target.insertAdjacentElement("afterend", img);
  }

  function renderResult() {
    const overallSpan = document.querySelector("#overall-lv");
    if (!overallSpan || !overallSpan.textContent) return;
    const lv = parseInt(overallSpan.textContent.replace(/[^\d]/g, ""), 10);
    if (!lv || lv < 1 || lv > 5) return;

    insertBadge(overallSpan, BASE + "LV" + lv + ".png", "agml-lv-img");
    const cpSpan = document.getElementById("copyright-stars");
    if (cpSpan) insertBadge(cpSpan, BASE + "CP" + lv + ".png", "agml-cp-img");
  }

  renderResult();

  // MutationObserverで変化を監視して再描画
  const resultBox = document.querySelector("#result") || document.body;
  if (resultBox) {
    let timer = null;
    let lastRender = 0;
    new MutationObserver(() => {
      const now = Date.now();
      if (now - lastRender < 500) return;
      lastRender = now;
      clearTimeout(timer);
      timer = setTimeout(renderResult, 150);
    }).observe(resultBox, { childList: true, subtree: true });
  }

  window.addEventListener("beforeunload", () => {
    const spinner = document.querySelector("#judgeSpinner");
    if (spinner) spinner.classList.add("hidden");
  });
})();
