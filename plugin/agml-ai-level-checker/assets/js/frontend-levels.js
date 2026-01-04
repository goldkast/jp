/* AGML Level Checker ? LV/CP画像連動 安定版（チカチカ防止） */
(function () {
  console.log("? frontend-levels.js loaded (stable anti-flicker)");

  // プラグインベースURL
  var BASE = (window.agml_strings && agml_strings.plugin_url)
    ? agml_strings.plugin_url + "assets/ui/"
    : "/wp-content/plugins/agml-ai-level-checker/assets/ui/";

  // 挿入関数（既存確認付き）
  function insertBadge(target, imgSrc, className) {
    if (!target) return;

    // すでに同じ画像がある場合はスキップ
    const existing = target.parentNode.querySelector("." + className);
    if (existing && existing.src.includes(imgSrc)) return;

    // 古い画像を削除（異なる場合のみ）
    target.parentNode.querySelectorAll("." + className).forEach(n => n.remove());

    // 新しい画像を生成
    const img = document.createElement("img");
    img.src = imgSrc;
    img.className = className;
    img.alt = className.includes("lv") ? "AI Level Indicator" : "Copyright Indicator";
    img.style.height = "22px";
    img.style.marginLeft = "6px";
    img.style.verticalAlign = "middle";
    img.style.imageRendering = "-webkit-optimize-contrast";
    target.insertAdjacentElement("afterend", img);
  }

  // レンダリング処理
  function render() {
    const overallSpan = document.querySelector("#overall-lv");
    if (!overallSpan || !overallSpan.textContent) return;

    const lv = parseInt(overallSpan.textContent.replace(/[^\d]/g, ""), 10);
    if (!lv || lv < 1 || lv > 5) return;

    // LV画像
    insertBadge(overallSpan, BASE + "LV" + lv + ".png", "agml-lv-img");

    // CP画像
    const cpSpan = document.getElementById("copyright-stars");
    if (cpSpan) insertBadge(cpSpan, BASE + "CP" + lv + ".png", "agml-cp-img");
  }

  // 初回実行
  render();

  // MutationObserver（チカチカ防止用クールダウン付）
  const resultBox = document.querySelector("#result") || document.body;
  if (!resultBox) return;

  let timer = null;
  let lastRender = 0;
  new MutationObserver(() => {
    const now = Date.now();
    if (now - lastRender < 500) return; // 0.5秒以内の再描画を無視
    lastRender = now;
    clearTimeout(timer);
    timer = setTimeout(render, 150);
  }).observe(resultBox, { childList: true, subtree: true });
})();
