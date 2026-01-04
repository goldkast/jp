/**
 * file:/// 環境専用
 * すべての /xxx/index.html を
 * AGML/xxx/index.html に強制補正する
 */
document.addEventListener("DOMContentLoaded", () => {
  if (location.protocol !== "file:") return;

  // AGML の物理パスを取得
  const match = location.pathname.match(/^(.*\/AGML)(\/.*)?$/);
  if (!match) return;

  const agmlRoot = match[1]; // C:/Users/.../AGML

  document.querySelectorAll("a[href^='/']").forEach(link => {
    const href = link.getAttribute("href");

    // "/" → AGML/index.html
    if (href === "/") {
      link.href = agmlRoot + "/index.html";
      return;
    }

    // "/terms_of_condition/index.html" など
    link.href = agmlRoot + href;
  });
});
