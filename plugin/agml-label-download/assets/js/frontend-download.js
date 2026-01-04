// ============================================================
// frontend-download.js
// AGML Label Download – AI使用割合＋バー表示版（Smart Display対応）
// ============================================================

(function(){
  const root = document.querySelector('.agml-dl');
  if(!root) return;

  // =============================
  // ステップ要素の取得
  // =============================
  const stepPanels = [
    root.querySelector('#agmlStep1'),
    root.querySelector('#agmlStep2'),
    root.querySelector('#agmlStep3'),
    root.querySelector('#agmlStep4'),
    root.querySelector('#agmlStep5')
  ];
  const navItems = root.querySelectorAll('.steps li');
  let currentStep = 1;

  // =============================
  // ステップ切替
  // =============================
  function changeStep(to){
    stepPanels.forEach((panel,i)=>{
      if(!panel) return;
      panel.style.display = (i === to-1) ? 'block' : 'none';
      panel.classList.toggle('is-active', i===to-1);
    });

    navItems.forEach((li,i)=>{
      li.classList.remove('active','completed');
      if(i < to-1) li.classList.add('completed');
      if(i === to-1) li.classList.add('active');
    });

    currentStep = to;
  }

  // =============================
  // 丸数字クリック対応（過去のみ可能）
  // =============================
  navItems.forEach((li, index)=>{
    if(!li.querySelector('.step-hotspot')){
      const hotspot = document.createElement('div');
      hotspot.className = 'step-hotspot';
      hotspot.dataset.step = index + 1;
      li.appendChild(hotspot);
    }
  });

  root.addEventListener('click', (e)=>{
    const spot = e.target.closest('.step-hotspot');
    if(!spot) return;

    const step = parseInt(spot.dataset.step || "0", 10);
    if(step && step < currentStep){
      changeStep(step);
    }
  });

  // =============================
  // 利用規約スクロール制御
  // =============================
  const termsBox = root.querySelector('#termsBox');
  const agree = root.querySelector('#agreeTerms');
  const pointer = root.querySelector('#agreePointer');
  const nextBtn = root.querySelector('#nextStep');

  if(termsBox && agree){
    termsBox.addEventListener('scroll',()=>{
      const atBottom = termsBox.scrollTop + termsBox.clientHeight >= termsBox.scrollHeight - 10;
      agree.disabled = !atBottom;
      if(pointer) pointer.classList.toggle('active', atBottom && !agree.checked);
    });

    agree.addEventListener('change',()=>{
      if(pointer) pointer.classList.remove('active');
      nextBtn.disabled = !agree.checked;
      nextBtn.classList.toggle('is-ready', agree.checked);
    });
  }
  if(nextBtn) nextBtn.addEventListener('click',()=> changeStep(2));

  // =============================
  // 判定ロジック（詳細診断版）
  // =============================
  const judgeBtn = root.querySelector('#judgeStart');

  // レベル(1〜5) → AI使用割合（％）に変換
  // レベル1=100%, レベル5=20%（AI使用が少ないほど％が小さい）
  function levelToPercent(level){
    return (6 - level) * 20;
  }

  if(judgeBtn){
    judgeBtn.addEventListener('click',()=>{
      if(judgeBtn.disabled) return;

      // スピナー表示
      judgeBtn.innerHTML = `
        <div style="display:inline-flex;align-items:center;gap:6px;">
          <div class="agml-spinner" style="width:18px;height:18px;border:3px solid rgba(255,255,255,0.4);
          border-top-color:#fff;border-radius:50%;animation:agml-spin 0.8s linear infinite;"></div>
          <span>判定中...</span>
        </div>`;
      judgeBtn.disabled = true;

      setTimeout(()=>{

        const lyric = document.querySelector('input[name="lyrics"]:checked');
        const comp  = document.querySelector('input[name="composition"]:checked');

        if(!lyric || !comp){
          alert("すべての質問に回答してください。");
          judgeBtn.innerHTML = "判定開始";
          judgeBtn.disabled = false;
          return;
        }

        const lvLyrics = parseInt(lyric.value,10);
        const lvComp   = parseInt(comp.value,10);
        const overall  = Math.round((lvLyrics + lvComp)/2);

        // --- 作詞解析 ---
        const lyricDetails = {
          1:"AIが自動で生成した曲をそのまま採用した状態です。人間による構成編集や音質調整がほぼなく、AIモデルが持つ生成特性がそのまま反映されています。実験的作品やプロトタイプ段階の仕上がりに近い傾向です。",
          2:"AIが出力した音源をベースに、部分的なカット・ボリューム調整など最小限の処理を行った段階です。AI主導の音楽構成に人間の意図が軽く加わる程度で、全体の音楽的方向性はAIが握っています。",
          3:"AIの生成素材をもとに人間が再構成を行い、曲構成やリズム、展開の調整を施した状態です。AIと人間のクリエイティブが半々に融合しており、AIのインスピレーションを素材として活用した共同制作フェーズです。",
          4:"人間が明確な音楽的ビジョンを持ち、AIへ繰り返しプロンプトや指示を与えながら目的の音像を形成しています。AIはあくまで“楽器的アシスタント”として利用され、作曲全体の主導は人間が行っています。",
          5:"人間が作曲設計・構成・音響処理の全てをコントロールし、AIは音色生成やリファレンス提案などに限定して使用されています。最終的な音楽的決定権は全て人間にあり、AIは創作効率化のためのツールとして活用されています。"
        };

        // --- 作曲解析 ---
        const compositionDetails = {
          1:"AIが自動で生成した曲をそのまま採用した状態です。人間による構成編集や音質調整がほぼなく、AIモデルが持つ生成特性がそのまま反映されています。実験的作品やプロトタイプ段階の仕上がりに近い傾向です。",
          2:"AIが出力した音源をベースに、部分的なカット・ボリューム調整など最小限の処理を行った段階です。AI主導の音楽構成に人間の意図が軽く加わる程度で、全体の音楽的方向性はAIが握っています。",
          3:"AIの生成素材をもとに人間が再構成を行い、曲構成やリズム、展開の調整を施した状態です。AIと人間のクリエイティブが半々に融合しており、AIのインスピレーションを素材として活用した共同制作フェーズです。",
          4:"人間が明確な音楽的ビジョンを持ち、AIへ繰り返しプロンプトや指示を与えながら目的の音像を形成しています。AIはあくまで“楽器的アシスタント”として利用され、作曲全体の主導は人間が行っています。",
          5:"人間が作曲設計・構成・音響処理の全てをコントロールし、AIは音色生成やリファレンス提案などに限定して使用されています。最終的な音楽的決定権は全て人間にあり、AIは創作効率化のためのツールとして活用されています。"
        };

        // --- AI総合 ---
        const overallDefinitions = {
          1:"AIが全自動で生成した成果物であり、人の意図や創作判断がほぼ介在していない状態です。純粋なAI生成データとして扱われ、著作的独自性は限定的です。",
          2:"AIの生成結果をもとに人間が軽微な修正を加えた段階です。人の介入はあるものの、創作的決定はAI主導で行われているため、作品の独創性は限定的と判断されます。",
          3:"AIと人間の貢献度がほぼ同等であり、双方のクリエイティブが融合した作品です。AIの生成力と人の構成力がバランスよく共存し、共同制作型の特徴が見られます。",
          4:"人間が全体設計を担い、AIは音声・文脈生成の補助として利用されています。AIが持つ技術的支援を最大限活かしつつも、最終判断は人間の手に委ねられた成熟した創作形式です。",
          5:"人が作品の構想から完成まで一貫して主導し、AIはあくまで“創作支援技術”として利用されています。人の感性・判断・構成が中心にあり、AIは創造性の補助に留まります。"
        };

        // --- 著作権 ---
        const copyrightLevels = {
          1:"AIが全自動で生成した結果であり、人間による創作的判断がほとんど存在しないため、著作権法上の『創作的表現』には該当しません。作品はデータ出力として扱われる領域に留まります。",
          2:"AIが主体的に生成した成果物に対して、人間がわずかに修正や選択を加えた段階です。創作意図の介入が限定的であるため、著作権主張の余地は極めて狭いと考えられます。",
          3:"AIと人の関与が均衡しており、創作的判断の所在が分散しています。場合によっては人間の寄与部分に限り、著作権的評価を行うことが可能な領域にあたります。",
          4:"人が作品全体の方向性と表現意図を管理しており、AIは補助的役割に留まっています。創作的判断の主導権が人にあるため、一般的には著作権の成立が十分に認められます。",
          5:"作品の創作判断から構成・表現まで人間が主導しており、AIは単なる補助的なツールとして用いられています。人の思想・感情の反映が明確であり、著作権法上の創作物として完全に成立します。"
        };
        const BASE_UI = (typeof agml_download_strings!=="undefined")
          ? agml_download_strings.plugin_url + "assets/ui/"
          : "/wp-content/plugins/agml-label-download/assets/ui/";

        const BASE_IMG = (typeof agml_download_strings!=="undefined")
          ? agml_download_strings.plugin_url + "assets/img/"
          : "/wp-content/plugins/agml-label-download/assets/img/";

        // ここで AI使用割合（％）に変換
        const lyricPercent   = levelToPercent(lvLyrics);
        const compPercent    = levelToPercent(lvComp);
        const overallPercent = levelToPercent(overall);

        // 著作権保有割合（レベルの逆数：5→100, 1→20）
        const copyrightPercent = overall * 20;

        // 著作権用スター画像
        const starMap = {
          1: "1star.png",
          2: "2stars.png",
          3: "3stars.png",
          4: "4stars.png",
          5: "5stars.png"
        };
        const copyrightStarsImg = starMap[overall];

        // =============================
        // Step3 結果HTML出力
        // =============================
        const resultBox = document.querySelector('#judgeResult');
        if(resultBox){
          resultBox.innerHTML = `
            <p class="result-title">
              <strong>作詞AI使用割合：</strong>
              <span class="ai-percent">${lyricPercent}%</span>
              <span class="ai-bar ai-bar-lyrics"
                    style="--agml-bar-img:url('${BASE_UI}bar-blue-${lyricPercent}.png');"></span>
            </p>
            <div class="info-card"><p>${lyricDetails[lvLyrics]}</p></div>

            <p class="result-title">
              <strong>作曲AI使用割合：</strong>
              <span class="ai-percent">${compPercent}%</span>
              <span class="ai-bar ai-bar-composition"
                    style="--agml-bar-img:url('${BASE_UI}bar-orange-${compPercent}.png');"></span>
            </p>
            <div class="info-card"><p>${compositionDetails[lvComp]}</p></div>

            <p class="result-title">
              <strong>総合AI使用割合：</strong>
              <span class="ai-percent">${overallPercent}%</span>
              <span class="ai-bar ai-bar-overall"
                    style="--agml-bar-img:url('${BASE_UI}bar-colorful-${overallPercent}.png');"></span>
            </p>
            <div class="info-card"><p>${overallDefinitions[overall]}</p></div>

            <p class="result-title copyright-title">
              <strong>著作権保有割合：</strong>
              <span class="ai-percent">${copyrightPercent}%</span>
              <span class="copyright-stars-bar"
                    style="background-image:url('${BASE_UI}${copyrightStarsImg}');"></span>
            </p>
            <div class="info-card" style="margin-top:5px;">
              <p>${copyrightLevels[overall]}</p>
            </div>

            <div class="result-media" style="text-align:center;margin-top:30px;">

              <div class="agml-label-wrapper">
                <div class="agml-label-header">AI生成音楽ラベル（AGML）</div>
                <div class="agml-label-body">
                  <img src="${BASE_IMG}level${overall}.png"
                       class="agml-label-img"
                       alt="ラベル画像">
                </div>
              </div>

              <button id="toDownload" type="button" class="agml-btn is-ready">
                ラベルダウンロードへ進む ▶
              </button>

            </div>
          `;
        }

        // =============================
        // Step5 に渡すデータ保存
        // =============================
        agmlSaveResultForSmart(
          lvLyrics,
          lvComp,
          overall,
          lyricDetails[lvLyrics],
          compositionDetails[lvComp],
          overallDefinitions[overall],
          copyrightLevels[overall]
        );

        judgeBtn.innerHTML = "判定開始";
        judgeBtn.disabled = false;
        changeStep(3);
      },1500);
    });
  }

  // =============================
  // ラベル → STEP4
  // =============================
  root.addEventListener('click', e=>{
    if(e.target && e.target.id === "toDownload"){
      changeStep(4);
    }
  });

  // =============================
  // スマート表示 → STEP5
  // =============================
  root.addEventListener('click', e=>{
    if(e.target && e.target.id === "goSmart"){
      changeStep(5);
    }
  });

  // changeStep を外側でも使うために公開
  window.changeStep = changeStep;

})();  // ここまでメイン処理
/* =========================================================
   Step5（スマート表示）用 機能（※ロジックはレベルベースのまま）
========================================================= */

// ▼ Step5 DOM
const smartLyric        = document.getElementById("smartLyricLevel");
const smartLyricComment = document.getElementById("smartLyricComment");
const smartComp         = document.getElementById("smartCompLevel");
const smartCompComment  = document.getElementById("smartCompComment");
const smartOverall      = document.getElementById("smartOverallLevel");
const smartOverallComment = document.getElementById("smartOverallComment");
const smartOverallImg   = document.getElementById("smartOverallImg");
const smartCPImg        = document.getElementById("smartCPImg");
const smartCopyrightComment = document.getElementById("smartCopyrightComment");
const smartPublicURL    = document.getElementById("smartPublicURL");
const smartQRBox        = document.getElementById("smartQR");
const smartLabelImgBox  = document.getElementById("smartLabelImgBox");

const goSmartBtn = document.getElementById("goSmart");

// 結果キャッシュ
let RESULT_CACHE = {
  lyric:null,
  comp:null,
  overall:null,
  lyricComment:"",
  compComment:"",
  overallComment:"",
  copyrightComment:""
};

// 保存関数（Step3 で呼ぶ）
function agmlSaveResultForSmart(lyric, comp, overall, lyricText, compText, overallText, copyrightText){
  RESULT_CACHE.lyric            = lyric;
  RESULT_CACHE.comp             = comp;
  RESULT_CACHE.overall          = overall;
  RESULT_CACHE.lyricComment     = lyricText;
  RESULT_CACHE.compComment      = compText;
  RESULT_CACHE.overallComment   = overallText;
  RESULT_CACHE.copyrightComment = copyrightText;
}

// =============================
// Step5 遷移時処理（修正版）
// =============================
if (goSmartBtn) {
  goSmartBtn.addEventListener("click", ()=>{

    if (RESULT_CACHE.overall === null){
      alert("判定データがありません。");
      return;
    }

    changeStep(5);

    // --- テキスト反映 ---
    smartLyric.textContent        = "レベル " + RESULT_CACHE.lyric;
    smartComp.textContent         = "レベル " + RESULT_CACHE.comp;
    smartOverall.textContent      = "レベル " + RESULT_CACHE.overall;

    smartLyricComment.textContent     = RESULT_CACHE.lyricComment;
    smartCompComment.textContent      = RESULT_CACHE.compComment;
    smartOverallComment.textContent   = RESULT_CACHE.overallComment;
    smartCopyrightComment.textContent = RESULT_CACHE.copyrightComment;

    // パス
    const pluginUrlValue = (typeof agml_download_strings !== "undefined")
      ? agml_download_strings.plugin_url
      : "";
    let pluginPath = "/wp-content/plugins/agml-label-download/";
    if (pluginUrlValue){
      try {
        const pluginUrl = new URL(pluginUrlValue, window.location.origin);
        pluginPath = pluginUrl.pathname.replace(/\/+$/, "/");
      } catch (e) {}
    }
    const pluginBase = window.location.origin.replace(/\/+$/, "") + pluginPath;
    const BASE_UI_SMART  = pluginBase + "assets/ui/";
    const BASE_IMG_SMART = pluginBase + "assets/img/";

    // --- AIレベル画像 ---
    if (smartOverallImg){
      smartOverallImg.innerHTML =
        `<img src="${BASE_UI_SMART}LV${RESULT_CACHE.overall}.png"
              style="height:20px;" alt="AIレベル">`;
    }

    // --- 著作権レベル画像 ---
    if (smartCPImg){
      smartCPImg.innerHTML =
        `<img src="${BASE_UI_SMART}CP${RESULT_CACHE.overall}.png"
              style="height:20px;" alt="著作権レベル">`;
    }

    // --- ラベル画像 ---
    if (smartLabelImgBox){
      smartLabelImgBox.innerHTML = `
          <img src="${BASE_IMG_SMART}level${RESULT_CACHE.overall}.png"
               class="smart-label-img"
               alt="判定ラベル level${RESULT_CACHE.overall}">`;
    }

    // --- 公開URL生成 ---
    const rand = Math.random().toString(36).substring(2, 10);
    const url  = "https://aigenmusiclabel.com/" + rand;

    const urlBox = smartPublicURL ? smartPublicURL.parentElement : null;
    if (urlBox){
      urlBox.innerHTML = `
        <span class="smart-url-label" style="font-weight:bold;margin-right:8px;">公開URL：</span>
        <span id="smartPublicURL" class="smart-url-value"
              style="font-size:18px;font-weight:700;color:#3399ff;">
          ${url}
        </span>
      `;
    } else if (smartPublicURL){
      smartPublicURL.textContent = url;
    }

    // --- QR生成 ---
    if (smartQRBox){
      smartQRBox.innerHTML =
        `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}"
              alt="QRコード">`;
    }

    // =========================================
    // Smart Display % & Bar（ここが正しい位置）
    // =========================================

    const lyricPercent = levelToPercent(RESULT_CACHE.lyric);
    const compPercent  = levelToPercent(RESULT_CACHE.comp);
    const overallPercent = levelToPercent(RESULT_CACHE.overall);

    // ％表示
    document.getElementById("smartLyricPercent").textContent   = lyricPercent + "%";
    document.getElementById("smartCompPercent").textContent    = compPercent + "%";
    document.getElementById("smartOverallPercent").textContent = overallPercent + "%";

    // バー画像
    document.getElementById("smartLyricBar").src =
        BASE_UI_SMART + "bar-blue-" + lyricPercent + ".png";

    document.getElementById("smartCompBar").src =
        BASE_UI_SMART + "bar-orange-" + compPercent + ".png";

    document.getElementById("smartOverallBar").src =
        BASE_UI_SMART + "bar-colorful-" + overallPercent + ".png";

  });
}
