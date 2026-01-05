/**
 * グローバルナビゲーションとフッターメニューのリンクパス自動調整
 * どのページのディレクトリで使用しても、リンクが正しく動作するように調整
 */

(function() {
  'use strict';

  // ページパスから現在のページを判定
  function getCurrentPagePath() {
    const path = window.location.pathname;
    // パスを正規化（末尾の/やindex.htmlを除去）
    let normalizedPath = path.replace(/\/index\.html$/, '').replace(/\/$/, '') || '/';
    return normalizedPath;
  }

  // 現在のページのディレクトリレベルを取得
  function getDirectoryLevel(path) {
    if (path === '/') return 0;
    const segments = path.split('/').filter(s => s);
    return segments.length;
  }

  // 相対パスを生成（現在のディレクトリレベルに基づく）
  function getRelativePath(targetPath, currentLevel) {
    // パスを正規化（末尾のスラッシュを除去）
    targetPath = targetPath.replace(/\/$/, '') || '/';
    
    // ルート（/）へのパス
    if (targetPath === '/') {
      if (currentLevel === 0) return './index.html';
      return '../'.repeat(currentLevel) + 'index.html';
    }

    // サブディレクトリへのパス
    const targetSegments = targetPath.split('/').filter(s => s);
    const relativePath = '../'.repeat(currentLevel) + targetSegments.join('/') + '/index.html';
    return relativePath;
  }
  
  // パスを正規化して比較する関数
  function normalizePath(path) {
    return path.replace(/\/$/, '') || '/';
  }

  // メニューアイテムのマッピング（パス → テキスト）
  const menuMapping = {
    '/': 'ホーム',
    '/label': 'ラベルについて',
    '/download': 'ダウンロード',
    '/user': 'ご利用者様へ',
    '/mission': 'ミッション'
  };

  // フッターメニューのマッピング
  const footerMenuMapping = {
    '/terms': '利用規約',
    '/privacy': 'プライバシーポリシー',
    '/cookie': 'Cookieポリシー',
    '/faq': 'FAQ（質問と回答）',
    '/contact': 'お問い合わせ'
  };

  // 現在のページパスを取得
  const currentPath = getCurrentPagePath();
  const currentLevel = getDirectoryLevel(currentPath);

  // グローバルナビメニューのリンクを更新
  function updateGlobalNavLinks() {
    const navLinks = document.querySelectorAll('.nav-menu a[data-original-path]');
    
    navLinks.forEach(link => {
      const originalPath = link.getAttribute('data-original-path');
      if (!originalPath) return;

      // 言語メニューやその他の特殊リンクはスキップ
      if (link.closest('.lang-menu')) {
        return;
      }

      // パスを正規化
      let targetPath = normalizePath(originalPath);
      
      // 相対パスを生成
      const relativePath = getRelativePath(targetPath, currentLevel);
      link.setAttribute('href', relativePath);

      // currentクラスの設定（既存のcurrentクラスを一度削除）
      link.classList.remove('current');
      
      // 現在のパスと一致する場合のみcurrentクラスを追加
      const normalizedCurrentPath = normalizePath(currentPath);
      if (targetPath === normalizedCurrentPath) {
        link.classList.add('current');
      }
    });
  }

  // モバイルメニューのリンクを更新
  function updateMobileMenuLinks() {
    const mobileLinks = document.querySelectorAll('.mobile-menu-list a[data-original-path]');
    
    mobileLinks.forEach(link => {
      const originalPath = link.getAttribute('data-original-path');
      if (!originalPath) return;

      let targetPath = normalizePath(originalPath);
      const relativePath = getRelativePath(targetPath, currentLevel);
      link.setAttribute('href', relativePath);

      // currentクラスの設定
      link.classList.remove('current');
      const normalizedCurrentPath = normalizePath(currentPath);
      if (targetPath === normalizedCurrentPath) {
        link.classList.add('current');
      }
    });
  }

  // フッターメニューのリンクを更新
  function updateFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-menu a[data-original-path]');
    
    footerLinks.forEach(link => {
      const originalPath = link.getAttribute('data-original-path');
      if (!originalPath) return;

      let targetPath = normalizePath(originalPath);
      const relativePath = getRelativePath(targetPath, currentLevel);
      link.setAttribute('href', relativePath);
    });
  }

  // モバイルサブメニュー（利用規約など）のリンクを更新
  function updateMobileSubmenuLinks() {
    const submenuLinks = document.querySelectorAll('.mobile-submenu a[data-original-path]');
    
    submenuLinks.forEach(link => {
      const originalPath = link.getAttribute('data-original-path');
      if (!originalPath) return;

      let targetPath = normalizePath(originalPath);
      const relativePath = getRelativePath(targetPath, currentLevel);
      link.setAttribute('href', relativePath);
    });
  }

  // ロゴのリンクを更新
  function updateLogoLinks() {
    const logoLinks = document.querySelectorAll('.nav-logo a, .logo-center a');
    
    logoLinks.forEach(link => {
      if (currentLevel === 0) {
        link.setAttribute('href', './index.html');
      } else {
        link.setAttribute('href', '../'.repeat(currentLevel) + 'index.html');
      }
    });
  }

  // CSSパスを調整
  function updateCSSPaths() {
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"][href*="css/style.css"]');
    cssLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes('./css/style.css')) {
        if (currentLevel === 0) {
          link.setAttribute('href', './css/style.css');
        } else {
          link.setAttribute('href', '../'.repeat(currentLevel) + 'css/style.css');
        }
      }
    });
  }

  // 画像パスも調整（必要に応じて）
  function updateImagePaths() {
    // 画像パスは通常相対パスで書かれているため、ここでは特別な処理は不要
    // 必要に応じて追加可能
  }

  // DOMContentLoadedで実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      updateGlobalNavLinks();
      updateMobileMenuLinks();
      updateFooterLinks();
      updateMobileSubmenuLinks();
      updateLogoLinks();
    });
  } else {
    // すでにロード済みの場合
    updateGlobalNavLinks();
    updateMobileMenuLinks();
    updateFooterLinks();
    updateMobileSubmenuLinks();
    updateLogoLinks();
  }

})();
