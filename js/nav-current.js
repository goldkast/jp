/**
 * Gナビ / フッターナビ current 自動判定
 * file:///・localhost・本番すべて対応
 */
document.addEventListener("DOMContentLoaded", () => {
  let currentPath = location.pathname;

  // file:/// の場合、AGML 以降のパスだけを抽出
  if (location.protocol === "file:") {
    const match = currentPath.match(/\/AGML(\/.*)$/);
    if (match) currentPath = match[1];
  }

  // 正規化
  if (currentPath === "/" || currentPath === "/index.html") {
    currentPath = "/";
  } else {
    currentPath = currentPath
      .replace(/\/index\.html$/, "")
      .replace(/\/$/, "");
  }

  const links = document.querySelectorAll(
    ".global-nav a[href], .footer-menu a[href]"
  );

  links.forEach(link => {
    link.classList.remove("current");

    let linkPath = link.getAttribute("href");
    if (!linkPath) return;

    if (linkPath === "/index.html") {
      linkPath = "/";
    } else {
      linkPath = linkPath
        .replace(/\/index\.html$/, "")
        .replace(/\/$/, "");
    }

    if (linkPath === currentPath) {
      link.classList.add("current");
    }
  });
});
