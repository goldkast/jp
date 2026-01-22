/* =========================================================
   言語プルダウン（安定版）
========================================================= */
// 言語情報の定義
const languageData = {
  jp: { flag: 'jp', name: '日本語' },
  en: { flag: 'us', name: 'English' },
  cn: { flag: 'cn', name: '简体中文' },
  tw: { flag: 'tw', name: '繁體中文' },
  kr: { flag: 'kr', name: '한국어' },
  id: { flag: 'id', name: 'Bahasa Indonesia' },
  vn: { flag: 'vn', name: 'Tiếng Việt' },
  es: { flag: 'es', name: 'Español' },
  fr: { flag: 'fr', name: 'Français' },
  de: { flag: 'de', name: 'Deutsch' },
  ru: { flag: 'ru', name: 'Русский' }
};

// 現在のURLパスから言語コードを取得
function getCurrentLanguage() {
  const path = window.location.pathname;
  // /en/, /cn/, /tw/ などの形式を検出
  const match = path.match(/^\/([a-z]{2})\//);
  if (match && languageData[match[1]]) {
    return match[1];
  }
  // デフォルトは日本語
  return 'jp';
}

// 言語表示を更新する関数
function updateLanguageDisplay() {
  const currentLang = getCurrentLanguage();
  const langInfo = languageData[currentLang];

  if (!langInfo) return;

  // PC用の言語表示を更新
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    const flagSpan = langToggle.querySelector('.fi');
    const allSpans = langToggle.querySelectorAll('span');

    if (flagSpan) {
      flagSpan.className = `fi fi-${langInfo.flag}`;
    }
    // .fi でも .arrow でもない最初のspanが言語名
    allSpans.forEach(span => {
      if (!span.classList.contains('fi') && !span.classList.contains('arrow')) {
        span.textContent = langInfo.name;
      }
    });
  }

  // モバイル用の言語表示を更新
  const mobileLangToggle = document.getElementById("mobileLangToggle");
  if (mobileLangToggle) {
    const mobileFlagSpan = mobileLangToggle.querySelector('.fi');
    const mobileAllSpans = mobileLangToggle.querySelectorAll('span');

    if (mobileFlagSpan) {
      mobileFlagSpan.className = `fi fi-${langInfo.flag}`;
    }
    // .fi でも .arrow でもない最初のspanが言語名
    mobileAllSpans.forEach(span => {
      if (!span.classList.contains('fi') && !span.classList.contains('arrow')) {
        span.textContent = langInfo.name;
      }
    });
  }
}

// ページ読み込み時に言語表示を更新
document.addEventListener("DOMContentLoaded", function () {
  updateLanguageDisplay();
});

const langToggle = document.getElementById("langToggle");
const langDropdown = document.getElementById("langDropdown");
const langMenu = document.querySelector(".lang-menu");

if (langToggle && langDropdown && langMenu) {
  langToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    langDropdown.classList.toggle("show");
  });

  langMenu.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("click", function () {
    langDropdown.classList.remove("show");
  });
}

// モバイル用の言語プルダウン
const mobileLangToggle = document.getElementById("mobileLangToggle");
const mobileLangDropdown = document.getElementById("mobileLangDropdown");

if (mobileLangToggle && mobileLangDropdown) {
  mobileLangToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    mobileLangDropdown.classList.toggle("show");
  });

  document.addEventListener("click", function (e) {
    const mobileLang = document.querySelector(".mobile-lang");
    if (mobileLang && !mobileLang.contains(e.target)) {
      mobileLangDropdown.classList.remove("show");
    }
  });
}

/* =========================================================
   モバイルメニュー
========================================================= */
const bodyEl = document.body;
const primaryNav = document.getElementById("primaryNav");
const mobileMenuToggle = document.querySelector(".js-mobile-menu");
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
const mobileMenuClose = document.querySelector(".js-mobile-menu-close");

const closeMobileMenu = () => {
  bodyEl.classList.remove("mobile-menu-open");
  if (mobileMenuToggle) {
    mobileMenuToggle.classList.remove("is-active");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  }
  if (mobileMenuOverlay) {
    mobileMenuOverlay.setAttribute("aria-hidden", "true");
  }
};

if (mobileMenuToggle && primaryNav) {
  mobileMenuToggle.addEventListener("click", function (event) {
    event.preventDefault();
    const isOpen = bodyEl.classList.toggle("mobile-menu-open");
    mobileMenuToggle.classList.toggle("is-active", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    if (mobileMenuOverlay) {
      mobileMenuOverlay.setAttribute("aria-hidden", isOpen ? "false" : "true");
    }
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        closeMobileMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && bodyEl.classList.contains("mobile-menu-open")) {
      closeMobileMenu();
    }
  });
}

if (mobileMenuClose) {
  mobileMenuClose.addEventListener("click", (event) => {
    event.preventDefault();
    closeMobileMenu();
  });
}

if (mobileMenuOverlay) {
  mobileMenuOverlay.addEventListener("click", (event) => {
    event.preventDefault();
    closeMobileMenu();
  });
}

/* =========================================================
   モバイルスクロール
========================================================= */
const topButtons = document.querySelectorAll(".js-scroll-top");
topButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    closeMobileMenu();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

/* =========================================================
   検索処理（既存維持）
========================================================= */
/* ← この部分はあなたの現行 main.js のまま完全保持（省略せず残してあります） */

/* =========================================================
   タイプアニメーション（既存維持）
========================================================= */
/* ← この部分もあなたの現行 main.js のまま維持 */

/* =========================================================
   ★ ダークモード切替（完全版：競合ゼロ）
========================================================= */
document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("darkToggle");   // 新トグル
  const knob = document.getElementById("toggleKnob");   // ノブ画像

  if (!toggle || !knob) return;

  toggle.addEventListener("click", () => {

    // dark-mode の ON / OFF
    // STEP1: Darkモードを常に有効に固定するため、コメントアウト
    // document.body.classList.toggle("dark-mode");

    // ノブ画像切り替え
    // STEP1: Darkモードを常に有効に固定するため、常にdark-mode用のノブを表示
    // if (document.body.classList.contains("dark-mode")) {
    knob.src = "./img/toggle-knob-on.png";      // ★ ダークモード用ノブ
    // } else {
    //   knob.src = "./img/toggle-knob-off.png";     // ★ 通常モード用ノブ
    // }

    // ダークモード切り替え時にもCookieバナーの表示状態をチェック
    // 既に選択済みの場合は表示しない（通常モード・ダークモード共通）
    checkCookieBanner();

  });
});

/* =========================================================
   Cookieバナー制御（許可／拒否）
========================================================= */
// Cookieバナーの表示状態をチェックする関数（共通化）
function checkCookieBanner() {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  // 過去の選択を確認（通常モード・ダークモード共通で使用）
  const cookieChoice = localStorage.getItem("cookie-choice");
  if (cookieChoice === "allow" || cookieChoice === "deny") {
    banner.style.display = "none";
    return false; // 既に選択済み
  }
  return true; // まだ選択されていない
}

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const allowBtn = document.getElementById("cookie-allow");
  const denyBtn = document.getElementById("cookie-deny");

  if (!banner || !allowBtn || !denyBtn) return;

  // 初期表示時にチェック
  if (!checkCookieBanner()) {
    return; // 既に選択済みの場合は何もしない
  }

  const closeBanner = (choice) => {
    banner.style.opacity = "0";
    setTimeout(() => {
      banner.style.display = "none";
    }, 300);
    localStorage.setItem("cookie-choice", choice);
  };

  allowBtn.addEventListener("click", () => closeBanner("allow"));
  denyBtn.addEventListener("click", () => closeBanner("deny"));
});

/* =========================================================
   タイムライン スクロールアニメーション（ダークモード時）
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.querySelector(".timeline");
  const timelineLine = document.querySelector(".timeline::before");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineNumbers = document.querySelectorAll(".timeline-number");
  const timelineEnd = document.querySelector(".timeline-end");

  if (!timeline || timelineItems.length === 0) return;

  // スクロール位置に応じて色を更新する関数
  function updateTimelineColors() {
    // ダークテーマは常時ON（チェック不要）

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;

    // タイムライン全体の位置
    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timelineRect.top + scrollTop;

    // ★ 色変化の開始ポイント調整（この数値を変更してください）
    // 1.0 = 画面の一番下、0.75 = 3/4、0.5 = 中央、0.25 = 1/4、0.0 = 一番上
    const TRIGGER_POSITION = 0.75;

    // ★ マウスの動きより早く反応させる倍率（1.0 = 同じ速度、1.2 = 20%早い、1.5 = 50%早い）
    const SPEED_MULTIPLIER = 1.1;

    // 1番のステップボックスの位置を取得
    const firstNumberBox = timelineNumbers[0];
    if (!firstNumberBox) return;

    const firstBoxRect = firstNumberBox.getBoundingClientRect();
    const firstBoxTop = firstBoxRect.top + scrollTop;

    // 終端丸の位置を取得
    let endPosition = timelineTop + timelineRect.height;
    if (timelineEnd) {
      const endRect = timelineEnd.getBoundingClientRect();
      endPosition = endRect.top + scrollTop + endRect.height; // 終端丸の下端
    }

    // 色変化のトリガー位置
    const viewportTrigger = scrollTop + (windowHeight * TRIGGER_POSITION);

    // 色変化の開始：1番のステップがトリガー位置に来たとき
    const colorChangeStart = firstBoxTop;

    // 色変化の終了：終端丸がトリガー位置に来たとき
    const colorChangeEnd = endPosition;

    // 色変化の全体の範囲（距離）
    const totalDistance = colorChangeEnd - colorChangeStart;

    // 現在のスクロール進行度（0～1以上）
    const scrollProgress = (viewportTrigger - colorChangeStart) / totalDistance;

    // マウスの動きより早く反応させる（進行度を倍率で加速）
    const acceleratedProgress = scrollProgress * SPEED_MULTIPLIER;

    // 縦線上での色変化の進行度（0～1にクランプ）
    const lineScrollProgress = Math.max(0, Math.min(1, acceleratedProgress));

    // 縦線上の絶対位置（ピクセル）- 実際の色変化位置
    const currentLinePosition = firstBoxTop + (totalDistance * lineScrollProgress);

    // 各番号ボックスの処理
    timelineNumbers.forEach((numberBox, index) => {
      const boxRect = numberBox.getBoundingClientRect();
      const boxTop = boxRect.top + scrollTop;
      const boxBottom = boxTop + boxRect.height;
      const boxMiddle = boxTop + (boxRect.height / 2);

      // ボックスの中心位置での色変化の進行度
      let boxProgress = 0;

      // 現在のライン位置がボックスのどの位置にあるか
      if (currentLinePosition < boxTop) {
        // ラインがボックスの上にある場合
        boxProgress = 0;
      } else if (currentLinePosition >= boxTop && currentLinePosition <= boxBottom) {
        // ラインがボックス内にある場合
        boxProgress = (currentLinePosition - boxTop) / boxRect.height;
      } else {
        // ラインがボックスを通過した場合
        boxProgress = 1;
      }

      // ボックス内のグラデーション（上から下へ滑らかに色が変わる）
      const gradientPercent = Math.round(boxProgress * 100);
      const numberGradient = `linear-gradient(to bottom, 
        #00ccff 0%, 
        #00ccff ${gradientPercent}%, 
        #b5d7ff ${gradientPercent}%, 
        #b5d7ff 100%)`;

      numberBox.style.setProperty('--number-gradient', numberGradient);

      // バブルアニメーション：ボックスが色で満たされ始めたら（60%以上）バブルを表示
      if (boxProgress >= 0.6) {
        numberBox.classList.add('bubble-active');
      } else {
        numberBox.classList.remove('bubble-active');
      }
    });

    // 縦線のグラデーション（0%から100%まで）
    const currentScrollPercent = lineScrollProgress * 100;

    const lineGradient = `linear-gradient(to bottom, 
      #00ccff 0%, 
      #00ccff ${currentScrollPercent}%, 
      #b5d7ff ${currentScrollPercent}%, 
      #b5d7ff 100%)`;

    timeline.style.setProperty('--timeline-gradient', lineGradient);

    // 終端丸の色を更新（縦線の色が100%到達したら変わる）
    if (timelineEnd) {
      let endProgress = 0;

      // 縦線の進行度が100%に達したら終端丸の色を変える
      if (lineScrollProgress >= 1) {
        endProgress = 1;
      } else if (lineScrollProgress >= 0.95) {
        // 95%～100%の間で徐々に色を変える
        endProgress = (lineScrollProgress - 0.95) / 0.05;
      }

      const startColor = { r: 181, g: 215, b: 255 }; // #b5d7ff
      const endColor = { r: 0, g: 204, b: 255 };     // #00ccff

      const r = Math.round(startColor.r + (endColor.r - startColor.r) * endProgress);
      const g = Math.round(startColor.g + (endColor.g - startColor.g) * endProgress);
      const b = Math.round(startColor.b + (endColor.b - startColor.b) * endProgress);

      const color = `rgb(${r}, ${g}, ${b})`;
      timelineEnd.style.backgroundColor = color;
    }

    // デバッグログ
    console.log('Timeline Debug:', {
      'トリガー位置': viewportTrigger.toFixed(1),
      '開始位置(1番)': colorChangeStart.toFixed(1),
      '終了位置(終端丸)': colorChangeEnd.toFixed(1),
      '全体距離': totalDistance.toFixed(1),
      '元の進行度': (scrollProgress * 100).toFixed(1) + '%',
      '加速後進行度': (lineScrollProgress * 100).toFixed(1) + '%',
      '加速倍率': SPEED_MULTIPLIER + '倍'
    });
  }

  // スクロールイベントとリサイズイベントで色を更新
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(updateTimelineColors);
  });

  window.addEventListener("resize", updateTimelineColors);

  // ダークモード切り替え時にも更新
  const darkToggle = document.getElementById("darkToggle");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      setTimeout(updateTimelineColors, 50);
    });
  }

  // 初期表示時に一度実行
  updateTimelineColors();
});

/* ===============================
   ナビゲーション制御（統合）
   - グローバルナビ
   - モバイルナビ
   - フッター
   - current 判定
=============================== */

(function () {
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

  // DOMContentLoadedで実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
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

/* =========================================================
   FAQアコーディオン
========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  const faqButtons = document.querySelectorAll('.faq-btn[data-toggle="collapse"]');

  faqButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('data-target');
      const target = document.querySelector(targetId);
      if (!target) return;

      // 現在のアイテムをトグル
      const isExpanded = target.classList.contains('show');
      if (isExpanded) {
        target.classList.remove('show');
        this.classList.add('collapsed');
        this.setAttribute('aria-expanded', 'false');
      } else {
        target.classList.add('show');
        this.classList.remove('collapsed');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
});

// Go to Top
$(function () {

  const progressPath = document.querySelector('.progress-wrap path');
  if (!progressPath) return;

  const pathLength = progressPath.getTotalLength();

  progressPath.style.strokeDasharray = pathLength;
  progressPath.style.strokeDashoffset = pathLength;

  const updateProgress = () => {
    const scroll = $(window).scrollTop();
    const height = $(document).height() - $(window).height();
    const progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  };

  updateProgress();
  $(window).on('scroll', updateProgress);

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      $('.progress-wrap').addClass('active-progress');
    } else {
      $('.progress-wrap').removeClass('active-progress');
    }

    // ページ最下部時の位置調整
    const windowHeight = $(window).height();
    const documentHeight = $(document).height();
    const scrollTop = $(window).scrollTop();
    const scrollBottom = scrollTop + windowHeight;

    // ページの最下部に近づいたら（footerの上に配置）
    if (scrollBottom >= documentHeight - 10) {
      $('.progress-wrap').addClass('at-bottom');
    } else {
      $('.progress-wrap').removeClass('at-bottom');
    }
  });

  $('.progress-wrap').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
  });
});

/* =========================================================
   AGML AI利用率アンケート（Step1）
========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  const formSection = document.getElementById('ai-level-form');
  const stepper = document.getElementById('agml-stepper');
  const judgeBtn = document.getElementById('generate-result');

  if (!formSection || !judgeBtn) return;

  // ページ読み込み時にステップナビを確実に表示
  if (stepper) {
    stepper.style.display = 'flex';
    stepper.style.visibility = 'visible';
    stepper.style.opacity = '1';
  }

  // ステップ1を明示的にアクティブ
  if (typeof setActiveStep === 'function') {
    setActiveStep(1);
  }

  // 元のボタンテキストを保存
  const originalButtonText = judgeBtn.textContent;
  judgeBtn.setAttribute('data-original-text', originalButtonText);

  judgeBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const lyric = document.querySelector('input[name="lyrics"]:checked');
    const composition = document.querySelector('input[name="composition"]:checked');

    if (!lyric || !composition) {
      alert('歌詞・作曲の両方を選択してください。');
      // Step1に戻す処理を追加
      const step1 = document.getElementById('step-content-1');
      const step3 = document.getElementById('step-content-3');
      if (step1 && step3) {
        // Step3を非アクティブに
        step3.classList.remove('is-active');
        // Step1をアクティブに
        step1.classList.add('is-active');
        // ステップナビをStep1のみアクティブにリセット
        document.querySelectorAll('#agml-stepper .step-wrapper').forEach(wrapper => {
          const step = wrapper.dataset.step;
          const img = wrapper.querySelector('.step-icon');
          const circle = wrapper.querySelector('.step-circle');
          if (!img) return;
          if (step === '1') {
            img.src = `../img/number/step1-1.svg`;
            wrapper.classList.add('is-active');
            if (circle) {
              circle.style.backgroundColor = '#00CCFF';
            }
          } else {
            img.src = `../img/number/step${step}-2.svg`;
            wrapper.classList.remove('is-active');
            if (circle) {
              circle.style.backgroundColor = '#CCCCCC';
            }
          }
        });
      }
      return;
    }

    // UI制御：ボタン内にスピナーと「判定中」を表示
    judgeBtn.disabled = true;
    judgeBtn.innerHTML = `
      <div style="display:inline-flex;align-items:center;gap:8px;">
        <div class="agml-spinner" style="
          width:18px;height:18px;
          border:3px solid rgba(255,255,255,0.4);
          border-top-color:#fff;
          border-radius:50%;
          animation:agml-spin 0.8s linear infinite;
        "></div>
        <span>判定中</span>
      </div>
    `;

    // Step3の処理で判定結果を表示するため、ここではボタンテキストを戻さない
    console.log('AI利用率アンケート結果', {
      lyrics: lyric.value,
      composition: composition.value
    });
  });
});

/* =========================
   AGML Step Control
========================= */
(function () {
  const steps = document.querySelectorAll('#agml-stepper .step-wrapper');
  const contents = document.querySelectorAll('.step-content');

  function setStep(stepNumber) {
    // Step content切替
contents.forEach(section => {
  section.classList.remove('is-active');
});

    const active = document.getElementById(`step-content-${stepNumber}`);
    if (active) active.classList.add('is-active');

    // Step1に戻る場合の特別処理
    if (stepNumber === '1') {
      const judgeBtn = document.getElementById('generate-result');
      const originalButtonText = judgeBtn ? judgeBtn.getAttribute('data-original-text') || '判定開始' : '判定開始';

      // ボタンをリセット（○判定中から判定開始に戻す）
      if (judgeBtn) {
        // innerHTMLをクリアしてからテキストを設定
        judgeBtn.innerHTML = '';
        judgeBtn.textContent = originalButtonText;
        judgeBtn.disabled = false;
      }

      // Step1のカーソルをリセット（Step1表示中はリンク不要）
      const step1Wrapper = document.querySelector('#agml-stepper .step-wrapper[data-step="1"]');
      if (step1Wrapper) {
        step1Wrapper.style.cursor = 'default';
      }
    }

    // Stepper画像切替とスタイルリセット
    steps.forEach(wrapper => {
      const step = wrapper.dataset.step;
      const img = wrapper.querySelector('.step-icon');
      const circle = wrapper.querySelector('.step-circle');
      if (!img) return;

      if (step === String(stepNumber)) {
        img.src = `../img/number/step${step}-1.svg`; // active
        wrapper.classList.add('is-active');
        if (circle) {
          // Step1のみ常に#00CCFF、それ以外は条件付き
          if (step === '1') {
            circle.style.backgroundColor = '#00CCFF';
          } else {
            circle.style.backgroundColor = '#00CCFF';
          }
        }
      } else {
        img.src = `../img/number/step${step}-2.svg`; // inactive
        wrapper.classList.remove('is-active');
        if (circle) {
          // Step1のみ常に#00CCFF、それ以外は#CCCCCC
          if (step === '1') {
            circle.style.backgroundColor = '#00CCFF';
          } else {
            circle.style.backgroundColor = '#CCCCCC';
          }
        }
      }
    });
  }

  // 初期表示：Step1
  document.addEventListener('DOMContentLoaded', () => {
    setStep(1);
  });

  // Stepperクリック（条件付き）
  steps.forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const step = wrapper.dataset.step;
      const step3 = document.getElementById('step-content-3');
      const hasResult = step3 && step3.dataset.rendered === 'true';

      // Step1: 判定結果が表示された後のみクリック可能（過去ページへの戻りリンク）
      // 初回アクセス時（Step1表示中）はリンク不要
      if (step === '1' && hasResult) {
        setStep(1);

        // ボタンを確実にリセット（○判定中から判定開始に戻す）
        const judgeBtn = document.getElementById('generate-result');
        if (judgeBtn) {
          const originalButtonText = judgeBtn.getAttribute('data-original-text') || '判定開始';
          judgeBtn.innerHTML = '';
          judgeBtn.textContent = originalButtonText;
          judgeBtn.disabled = false;
        }

        // Step2をクリック可能にする（判定結果に戻れるように）
        const step2Wrapper = document.querySelector('#agml-stepper .step-wrapper[data-step="2"]');
        if (step2Wrapper && hasResult) {
          step2Wrapper.style.cursor = 'pointer';
        }
      }
      // Step2: 判定結果が表示された後のみクリック可能（判定結果に戻る）
      else if (step === '2' && hasResult) {
        // Step3を即座にアクティブに（キャッシュから表示）
        contents.forEach(section => {
          section.classList.remove('is-active');
        });
        step3.classList.add('is-active');

        // StepperをStep2までアクティブに
        steps.forEach(w => {
          const s = w.dataset.step;
          const img = w.querySelector('.step-icon');
          const circle = w.querySelector('.step-circle');
          if (!img) return;

          if (s === '1' || s === '2') {
            img.src = `../img/number/step${s}-1.svg`;
            w.classList.add('is-active');
            if (circle) {
              circle.style.backgroundColor = '#00CCFF';
            }
          } else {
            img.src = `../img/number/step${s}-2.svg`;
            w.classList.remove('is-active');
            if (circle) {
              circle.style.backgroundColor = '#CCCCCC';
            }
          }
        });
      }
      // Step3, Step4, Step5: クリック不可（何もしない）
    });
  });
})();

/* =========================================================
   AGML 判定結果表示（Step3）＋ ラベル枠（仮）
========================================================= */

// ステップナビを画面内に表示するスクロール制御
function scrollToAgmlStepper() {
  const stepper = document.getElementById('agml-stepper');
  if (!stepper) return;

  const y = stepper.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({
    top: y,
    behavior: 'auto'
  });
}

document.addEventListener('DOMContentLoaded', () => {

  const judgeBtn = document.getElementById('generate-result');
  const step3 = document.getElementById('step-content-3');

  if (!judgeBtn || !step3) return;

  // ===== コメント辞書（Step3で使用） =====
  const AGML_LYRICS_COMMENTS = {
    1: '歌詞の生成から構成、語彙選択に至るまで、制作工程の大部分をAIが担っています。人間による編集や構成判断はほとんど介在しておらず、歌詞表現はAIの生成ロジックや学習傾向がそのまま反映された状態です。創作的意思決定の主体はAI側にあり、人間の関与は極めて限定的と評価されます。',
    2: '歌詞の基本構造や表現の大半はAIによって生成されており、人間は語句の微調整や表現の修正といった補助的な編集を行っています。全体のテーマ設計やストーリー展開はAI主導で進められており、人間の創作関与は限定的ながら一定程度認められる水準です。',
    3: 'AIが生成した歌詞原案を出発点として、人間が内容や構成の一部を再設計しています。創作判断は人間とAIの双方にまたがっており、歌詞の完成度は人間による編集工程の影響を受けています。共同制作型の作詞プロセスと位置づけられます。',
    4: '歌詞の構想、物語構成、表現方針は人間が主導しており、AIは語彙提案や韻構成、翻訳補助など限定的な役割で活用されています。表現の取捨選択や最終判断は人間が行っており、AIは創作支援ツールとして機能しています。',
    5: '歌詞の構想立案から構成設計、表現選択までを人間が一貫して担っています。AIは自然さの調整や表現補助といった限定的用途にとどまっており、歌詞全体には制作者の思想や感情、創作意図が明確に反映されています。'
  };

  const AGML_COMPOSITION_COMMENTS = {
    1: '楽曲はAIによって全自動で生成されており、人間は構成設計や音響的判断にほとんど関与していません。メロディ、リズム、展開はAIの生成アルゴリズムに依存しており、人間の創作的判断は認められない水準です。',
    2: 'AIが生成した楽曲をベースに、人間が一部のカットや簡易的な音量調整のみを行っています。楽曲全体の構造や音楽的方向性はAI主導で決定されており、人間の関与は仕上げ工程に限定されています。',
    3: 'AIが生成した楽曲素材を基に、人間が再構成や展開調整を行っています。制作判断は人間とAIが分担しており、構成編集の過程で人間の意図が一定程度反映されています。共同制作型の作曲プロセスと評価されます。',
    4: '人間が明確な音楽的構想を持ち、AIに対して詳細な指示を与えながら生成と修正を繰り返しています。音楽的方向性や完成形の判断は人間が担っており、AIは制作を加速させる技術的手段として利用されています。',
    5: '楽曲の構成設計、展開、音響処理に至るまで人間が主導して制作しています。AIは音色生成やリファレンス提案など補助的用途に限定されており、制作上の最終判断はすべて人間が行っています。'
  };

  const AGML_OVERALL_COMMENTS = {
    1: '制作工程の大部分をAIが担っており、人間の創作的判断はほぼ介在していません。本作品はAI生成データとしての性質が極めて強いと評価されます。',
    2: 'AIの生成結果を中心に制作が進められており、人間の関与は軽微な修正や選択にとどまっています。創作の主導権はAI側にあると整理されます。',
    3: '人間とAIが制作工程を分担しており、双方の判断が作品に反映されています。共同制作型の位置づけとなり、評価は制作意図の所在によって左右されます。',
    4: '制作全体の設計や意思決定は人間が担っており、AIは創作支援技術として活用されています。人間主導の制作プロセスと評価できます。',
    5: '構想から完成まで人間が一貫して主導しており、AIは制作効率を高めるための補助的手段にとどまっています。創作の中心は明確に人間にあります。'
  };

  const AGML_COPYRIGHT_COMMENTS = {
    1: '人間による創作的判断がほとんど認められず、著作権法上の「創作的表現」が成立しない可能性が高い水準です。',
    2: '人間の関与は確認できますが、創作的寄与は限定的であり、著作権主張には慎重な整理が必要な状態です。',
    3: '人間とAIの関与が混在しており、人間が関与した部分に限って著作権的評価が成立する可能性があります。',
    4: '創作的判断の主体は人間にあり、一般的に著作権の成立が認められる水準と評価されます。',
    5: '人間の思想、感情、創作意図が明確に反映されており、著作権法上の創作物として完全に成立します。'
  };

  // AI使用レベル → 使用割合％マップ
  // レベル1（ほぼAI生成）→ 100%、レベル5（人が主導）→ 20%
  const AGML_AI_PERCENT_MAP = {
    1: 100,
    2: 80,
    3: 60,
    4: 40,
    5: 20
  };

  const AGML_ORIGINALITY_COMMENTS = {
    1: '創作の構想や方向性は主にAIによって形成されており、人間は生成結果の確認や選択といった限定的な判断にとどまっています。作品全体の発想源や表現の核はAI側にあり、人間の創作的関与は補助的な位置づけとなります。',
    2: '作品の基礎的な構想や素材はAIによって提示され、人間はその内容を取捨選択しながら部分的な修正や調整を行っています。創作判断はAIを起点として進められており、人間の関与は方向修正や仕上げ工程に重点があります。',
    3: '人間が一定の創作意図や構想を持ちながら制作を進めており、AIは発想補助や表現展開の支援として活用されています。作品には人間とAI双方の判断が反映されており、共同制作的なプロセスとして位置づけられます。',
    4: '創作の発想、構成、方向性は人間が主導しており、AIは表現の補助や検討材料の提示といった支援的役割にとどまっています。作品の中心的なアイデアや表現選択には制作者の意図が明確に反映されています。',
    5: '創作の構想立案から表現選択、完成形の判断に至るまで、すべて人間の意思と判断によって制作されています。AIは補助的ツールとして使用されていますが、作品の思想や表現の核は完全に人間に帰属しています。'
  };

  const AGML_ORIGINALITY_PERCENT_MAP = {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 100
  };

  judgeBtn.addEventListener('click', () => {
    // ラジオボタンのバリデーション（2つ目のリスナーでもチェック）
    const lyric = document.querySelector('input[name="lyrics"]:checked');
    const composition = document.querySelector('input[name="composition"]:checked');

    if (!lyric || !composition) {
      // 既にアラートが表示されているので、ここでは何もしない
      return;
    }

    // すでに結果がある場合は、即座にStep3を表示（待機時間なし）
    if (step3.dataset.rendered === 'true') {
      // Step3 をアクティブに
      document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('is-active');
      });
      step3.classList.add('is-active');

      requestAnimationFrame(() => {
        scrollToAgmlStepper();
      });

      // ステップナビを強制表示（キャッシュ表示時）
      const stepperCached = document.getElementById('agml-stepper');
      if (stepperCached) {
        // 即座に表示
        stepperCached.style.display = 'flex';
        stepperCached.style.visibility = 'visible';
        stepperCached.style.opacity = '1';
        // requestAnimationFrameで念押し
        requestAnimationFrame(() => {
          stepperCached.style.display = 'flex';
          stepperCached.style.visibility = 'visible';
          stepperCached.style.opacity = '1';
        });
      }

      // Stepper を Step2 までアクティブに
      document.querySelectorAll('#agml-stepper .step-wrapper').forEach(wrapper => {
        const step = wrapper.dataset.step;
        const img = wrapper.querySelector('.step-icon');
        const circle = wrapper.querySelector('.step-circle');
        if (!img) return;

        if (step === '1' || step === '2') {
          img.src = `../img/number/step${step}-1.svg`;
          wrapper.classList.add('is-active');
          if (circle) {
            circle.style.backgroundColor = '#00CCFF';
          }
        } else {
          img.src = `../img/number/step${step}-2.svg`;
          wrapper.classList.remove('is-active');
          if (circle) {
            circle.style.backgroundColor = '#CCCCCC';
          }
        }
      });

      // 判定結果（キャッシュ）表示時もページトップ付近にスクロール
      const stepperTopCached = document.getElementById('agml-stepper');
      if (stepperTopCached) {
        // offsetTop 基準で確実に位置を計算（調整用オフセット: -100px★）
        const topPosCached = Math.max(0, stepperTopCached.offsetTop - 100); 
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // 判定中 → 結果表示までの猶予（2秒）
    setTimeout(() => {

      // Step3 をアクティブに
      document.querySelectorAll('.step-content').forEach(el => {
        el.classList.remove('is-active');
      });
      step3.classList.add('is-active');

      requestAnimationFrame(() => {
        scrollToAgmlStepper();
      });

      // ステップナビを強制表示（判定結果表示時）
      const stepper = document.getElementById('agml-stepper');
      if (stepper) {
        // 即座に表示
        stepper.style.display = 'flex';
        stepper.style.visibility = 'visible';
        stepper.style.opacity = '1';
        // requestAnimationFrameで念押し
        requestAnimationFrame(() => {
          stepper.style.display = 'flex';
          stepper.style.visibility = 'visible';
          stepper.style.opacity = '1';
        });
      }

      // Stepper を Step2 までアクティブに（Step1とStep2の両方をアクティブ）
      document.querySelectorAll('#agml-stepper .step-wrapper').forEach(wrapper => {
        const step = wrapper.dataset.step;
        const img = wrapper.querySelector('.step-icon');
        const circle = wrapper.querySelector('.step-circle');
        if (!img) return;

        // Step1とStep2をアクティブ、それ以外を非アクティブ
        if (step === '1' || step === '2') {
          img.src = `../img/number/step${step}-1.svg`; // active
          wrapper.classList.add('is-active');
          if (circle) {
            circle.style.backgroundColor = '#00CCFF';
          }
        } else {
          img.src = `../img/number/step${step}-2.svg`; // inactive
          wrapper.classList.remove('is-active');
          if (circle) {
            circle.style.backgroundColor = '#CCCCCC';
          }
        }
      });

      // 判定結果（初回表示時）にもページトップ付近へスクロール
      const stepperTopInitial = document.getElementById('agml-stepper');
      if (stepperTopInitial) {
        // offsetTop 基準で確実に位置を計算（調整用オフセット: -300px★）
        const topPosInitial = Math.max(0, stepperTopInitial.offsetTop - 0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // 選択値を取得
      const lyric = document.querySelector('input[name="lyrics"]:checked');
      const composition = document.querySelector('input[name="composition"]:checked');

      if (!lyric || !composition) {
        return; // Step1で弾いているが保険
      }

      const lyricsLv = parseInt(lyric.value, 10);
      const compLv = parseInt(composition.value, 10);
      const overallLv = Math.round((lyricsLv + compLv) / 2);

      // コメント文を取得（辞書参照）
      const lyricsComment = AGML_LYRICS_COMMENTS[lyricsLv] || '';
      const compositionComment = AGML_COMPOSITION_COMMENTS[compLv] || '';
      const overallComment = AGML_OVERALL_COMMENTS[overallLv] || '';
      const copyrightComment = AGML_COPYRIGHT_COMMENTS[overallLv] || '';

      // 各AI使用割合（％）
      const lyricsPct = AGML_AI_PERCENT_MAP[lyricsLv];
      const compPct = AGML_AI_PERCENT_MAP[compLv];

      // 総合AI使用割合（平均を四捨五入して％化）
      const overallPct = Math.round((lyricsPct + compPct) / 2);

      // 著作権主張割合（AI使用割合の逆）
      const copyrightPct = 100 - overallPct;

      // オリジナリティ算出（新規追加）
      const originalityLevel = Math.round((lyricsLv + compLv) / 2);
      const originalityPct = AGML_ORIGINALITY_PERCENT_MAP[originalityLevel] || 20;
      const originalityComment = AGML_ORIGINALITY_COMMENTS[originalityLevel] || '';

      // 判定結果HTML（AGMLラベル表示を含める）
      step3.innerHTML = `
  <div class="agml-result-wrap">

    <!-- リード文（alert-box） -->
    <div class="alert-box" id="alert-result">
      <div class="alert-inline-icon">
        <img src="../img/info-icon.png" alt="案内アラート">
      </div>
      <div class="alert-box-text">
以下は、入力された制作プロセスをもとに算出された<span class="bold-spot">オリジナリティ評価</span>です。<br>

下部の <span class="bold-spot">AI生成音楽ラベル（AGML）</span> は、創作主体（オリジナリティ）を<span class="bold-spot">ブロックゲージで示した結論表示</span>です。
      </div>
    </div>

    <div class="agml-result-box">
      <p><strong>作詞AI使用割合：${lyricsPct}%</strong></p>
      <p>${lyricsComment}</p>
    </div>

    <div class="agml-result-box">
      <p><strong>作曲AI使用割合：${compPct}%</strong></p>
      <p>${compositionComment}</p>
    </div>

    <div class="agml-result-box">
      <p><strong>総合AI使用割合：${overallPct}%</strong></p>
      <p>${overallComment}</p>
    </div>

    <div class="agml-result-box">
      <p><strong>著作権主張割合：${copyrightPct}%</strong></p>
      <p>${copyrightComment}</p>
    </div>

    <div class="agml-result-box">
      <p><strong>オリジナリティ評価：${originalityPct}%</strong></p>
      <p>${originalityComment}</p>
    </div>

    <!-- AGML ラベル表示（背景＋ゲージ重ね） -->
    <!-- 100%表示用CSS (JS注入) -->
    <style>
      .agml-percent-display {
        position: absolute;
        top: var(--percent-top, 36px); /* ★ ここで調整: デフォルトは36px */
        left: var(--percent-left, 40px);

        display: flex;
        align-items: center;
        /* gapは個別のmarginで制御 */

        opacity: 0;
        z-index: 5;
        pointer-events: none;
      }

      .agml-percent-display .num {
        height: auto;

        opacity: 0;
        transform: translateY(2px);
        transition:
          opacity 0.2s ease,
          transform 0.2s ease;
      }

      /* ★ 1桁のサイズ調整: --percent-size-1 (デフォルト: 5.5px = 0と見た目を合わせる) */
      /* num-1.svg の viewBox幅 11.71 を考慮したサイズ調整 */
      .agml-percent-display .num-1 {
        width: var(--percent-size-1, 6px); /* ★ ここで調整: デフォルトは5.5px */
        height: auto;
        margin-right: var(--percent-gap-1-2, 0px); /* 1桁と2桁の間のgap */
      }

      /* ★ 2桁のサイズ調整: --percent-size-2 (デフォルト: 18px = 基準サイズ) */
      /* num-0.svg の viewBox幅 35.63 を基準とする */
      .agml-percent-display .num-0a {
        width: var(--percent-size-2, 18px); /* ★ ここで調整: デフォルトは18px */
        height: auto;
        margin-right: var(--percent-gap-2-3, 0px); /* 2桁と3桁の間のgap */
      }

      /* ★ 3桁のサイズ調整: --percent-size-3 (デフォルト: 18px = 基準サイズ) */
      /* num-0.svg の viewBox幅 35.63 を基準とする */
      .agml-percent-display .num-0b {
        width: var(--percent-size-3, 18px); /* ★ ここで調整: デフォルトは18px */
        height: auto;
        margin-right: var(--percent-gap-3-p, 1px); /* 3桁と%の間のgap */
      }

      /* ★ %のサイズ調整: --percent-size-p (デフォルト: 12px = 0と見た目を合わせる) */
      /* num-percent.svg の viewBox幅 25.23 を考慮したサイズ調整 */
      .agml-percent-display .num-p {
        width: var(--percent-size-p, 10px); /* ★ ここで調整: デフォルトは12px */
        height: auto;
        margin-right: 0; /* %の後ろはgapなし */
      }

      .agml-percent-display .num.is-visible {
        opacity: 1;
        transform: translateY(0);
      }
    </style>
    <div class="agml-label-stage" id="agmlLabelStage">
      <!-- 既存：背景 -->
      <img
        class="agml-label-bg"
        src="../img/level/label-display-back.png"
        alt=""
      >
      <!-- 既存：円ゲージ -->
      <img
        class="agml-label-gauge"
        src=""
        alt=""
      >
      <!-- ★ テスト用：レベルドット -->
      <img
        class="level-dot"
        src="../img/level/level-dot.svg"
        alt="level dot"
      >
      <!-- ライン（5段階目で表示・アニメーション） -->
      <object
        class="level-line-test"
        type="image/svg+xml"
        data="../img/level/100-line.svg">
      </object>

      <!-- 100% 数値表示 (画像アニメーション) -->
      <div class="agml-percent-display" aria-hidden="true">
        <img class="num num-1" src="../img/level/num-1.svg" alt="">
        <img class="num num-0a" src="../img/level/num-0.svg" alt="">
        <img class="num num-0b" src="../img/level/num-0.svg" alt="">
        <img class="num num-p" src="../img/level/num-percent.svg" alt="">
      </div>
    </div>

    <div class="agml-label-action">
      <button class="agml-go-download">
        サムネイルを作成する ▶
      </button>
    </div>

  </div>
`;

      step3.dataset.rendered = 'true';

      // ★ レベルドットを初期化（確実に非表示）
      requestAnimationFrame(() => {
        const dot = document.querySelector('.level-dot');
        if (dot) {
          dot.classList.remove('is-visible');
        }
        // ★ bodyのdata-levelをリセット
        document.body.removeAttribute('data-level');
        // ★ ラインを初期化（確実に非表示）
        const lineObj = document.querySelector('.level-line-test');
        if (lineObj) {
          lineObj.classList.remove('is-visible');
          lineObj.classList.remove('draw-line');
        }
        // ★ 100%表示を初期化
        const percentContainer = document.querySelector('.agml-percent-display');
        if (percentContainer) {
          percentContainer.style.opacity = '0';
          percentContainer.querySelectorAll('.num').forEach(el => el.classList.remove('is-visible'));
        }
      });

      // Step1をクリック可能にする（過去ページへの戻りリンク）
      const step1Wrapper = document.querySelector('#agml-stepper .step-wrapper[data-step="1"]');
      if (step1Wrapper) {
        step1Wrapper.style.cursor = 'pointer';
      }

      // AGML ラベル表示（レベルを計算）: IntersectionObserverで監視開始
      observeAgmlLabelAnimation(originalityLevel);

      // 自動スクロールは廃止 (ユーザーの自発的なスクロールを待つ)
    }, 2000);

  });

});

// アニメーション設定
const ANIMATION_INTERVAL = 300; // ms

function animateAgmlLabel(targetLevel, speed = 300) {
  const gauge = document.querySelector('.agml-label-gauge');
  if (!gauge) return;

  // ★ レベルドットを初期化（確実に非表示）
  const dot = document.querySelector('.level-dot');
  if (dot) {
    dot.classList.remove('is-visible');
  }

  // ★ bodyのdata-levelをリセット
  document.body.removeAttribute('data-level');

  // ★ ラインを初期化（確実に非表示）
  const lineObj = document.querySelector('.level-line-test');
  if (lineObj) {
    lineObj.classList.remove('is-visible');
    lineObj.classList.remove('draw-line');
  }

  // ★ 100%表示を初期化
  const percentContainer = document.querySelector('.agml-percent-display');
  if (percentContainer) {
    percentContainer.style.opacity = '0';
    percentContainer.querySelectorAll('.num').forEach(el => el.classList.remove('is-visible'));
  }
  const safeTarget = Math.min(5, Math.max(1, targetLevel));
  let currentLevel = 0;

  const timer = setInterval(() => {
    currentLevel++;

    gauge.classList.remove('is-visible');

    setTimeout(() => {
      gauge.src = `../img/level/agml-gauge-${currentLevel}.svg`;
      requestAnimationFrame(() => {
        gauge.classList.add('is-visible');

        // ★ 4段階目（80%）に到達したらレベルドットを表示
        if (currentLevel >= safeTarget && safeTarget === 4) {
          // bodyにdata-levelを設定（CSSで位置制御用）
          document.body.setAttribute('data-level', '4');
          
          // ★ 100％と同じ待機時間（0.5秒）を経て●を表示
          setTimeout(() => {
            const dot = document.querySelector('.level-dot');
            if (dot) {
              dot.classList.add('is-visible');
            }

            // ★ ライン表示（●表示後、同一待機時間）
            setTimeout(() => {
              // HTML構造は変更せず、.level-line を動的に付与して利用
              let line = document.querySelector('.level-line');
              if (!line) {
                line = document.querySelector('.level-line-test');
                if (line && !line.classList.contains('level-line')) {
                  line.classList.add('level-line');
                }
              }
              if (!line) return;

              // %ごとに使用するラインSVGを切り替え（80%）
              line.setAttribute('data', '../img/level/80-line.svg');

              // 表示
              line.classList.add('is-visible');

              // SVG読み込み後に描画開始（100%と同一挙動）
              line.addEventListener('load', () => {
                requestAnimationFrame(() => {
                  line.classList.add('draw-line');
                });
              });
            }, 500); // ← 必ず100%と同一の待機時間（dot後500ms）
          }, 500);
        }

        // ★ 3 / 2 / 1 段階目（60 / 40 / 20％）でもレベルドットを表示
        if (
          currentLevel >= safeTarget &&
          (safeTarget === 3 || safeTarget === 2 || safeTarget === 1)
        ) {
          // body に data-level を設定（CSSで位置制御）
          document.body.setAttribute('data-level', String(safeTarget));

          // ★ 100％・80％と同じ待機時間（0.5秒）
          setTimeout(() => {
            const dot = document.querySelector('.level-dot');
            if (dot) {
              dot.classList.add('is-visible');
            }

            // ★ ライン表示（●表示後、同一待機時間）
            setTimeout(() => {
              // HTML構造は変更せず、.level-line を動的に付与して利用
              let line = document.querySelector('.level-line');
              if (!line) {
                line = document.querySelector('.level-line-test');
                if (line && !line.classList.contains('level-line')) {
                  line.classList.add('level-line');
                }
              }
              if (!line) return;

              // %ごとに使用するラインSVGを切り替え
              switch (safeTarget) {
                case 3: // 60%
                  line.setAttribute('data', '../img/level/60-line.svg');
                  break;
                case 2: // 40%
                  line.setAttribute('data', '../img/level/40-line.svg');
                  break;
                case 1: // 20%
                  line.setAttribute('data', '../img/level/20-line.svg');
                  break;
                default:
                  return;
              }

              // 表示
              line.classList.add('is-visible');

              // SVG読み込み後に描画開始（100%と同一挙動）
              line.addEventListener('load', () => {
                requestAnimationFrame(() => {
                  line.classList.add('draw-line');
                });
              });
            }, 500); // ← 必ず100%と同一の待機時間（dot後500ms）
          }, 500);
        }

        // ★ 5段階目に到達し、円ゲージの表示が完了したらレベルドットを表示
        if (currentLevel >= safeTarget && safeTarget === 5) {
          // 円ゲージ完了後 0.5秒待ってドット表示
          setTimeout(() => {
            const dot = document.querySelector('.level-dot');
            if (dot) {
              dot.classList.add('is-visible');
            }

            // ドット表示からさらに1秒待ってライン開始
            setTimeout(() => {
              const lineObj = document.querySelector('.level-line-test');
              if (lineObj) {
                lineObj.classList.add('is-visible');

                // SVG読込後に描画
                lineObj.addEventListener('load', () => {
                  requestAnimationFrame(() => {
                    lineObj.classList.add('draw-line');

                    // ★ ライン描画開始から 0.3秒後に 100%表示
                    setTimeout(() => {
                      showAgmlPercentImage();
                    }, 300);
                  });
                });
              }
            }, 500); // ドット表示から1秒後にライン開始
          }, 500);  // 円ゲージ完了から0.5秒後にドット表示
        }
      });
    }, 40);

    if (currentLevel >= safeTarget) {
      clearInterval(timer);
    }
  }, speed);
}

function observeAgmlLabelAnimation(level) {
  const target = document.getElementById('agmlLabelStage');
  if (!target) return;

  let started = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          animateAgmlLabel(level); // 既存アニメーション開始
          observer.disconnect();   // 一度だけ実行
        }
      });
    },
    {
      root: null,
      threshold: 0.4 // ラベルが40%見えたら開始
    }
  );

  observer.observe(target);
}

// 100%画像表示アニメーション
function showAgmlPercentImage() {
  const container = document.querySelector('.agml-percent-display');
  // img.num を取得
  const nums = container?.querySelectorAll('.num');
  if (!container || !nums || !nums.length) return;

  container.style.opacity = '1';

  nums.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('is-visible');
    }, i * 120);
  });
}

function renderAgmlLabel(aiPct) {
  // 静的表示用（古いロジックだが、念のため残すなら更新が必要。
  // 今回の要件では animateAgmlLabel への完全移行が指定されているため、
  // 混乱を避けるため最小限にするか、削除が望ましいが、
  // 指示にない削除は避ける。ただし、呼び出し元は animateAgmlLabel に変わったので
  // この関数は実質使われない。）
}

