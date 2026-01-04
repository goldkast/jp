// ============================= 
// AGML AI Level Checker
// frontend.js（判定結果コメント完全統一版）
// =============================

document.addEventListener("DOMContentLoaded", function () {

  // =============================
  // 1️⃣ AGMLレベル判定フォーム機能
  // =============================
  const btn = document.getElementById("generate-result");
  const spinner = document.getElementById("spinner");
  const result = document.getElementById("result");
  const lyricLvEl = document.getElementById("lyrics-lv");
  const compLvEl = document.getElementById("composition-lv");
  const overallLvEl = document.getElementById("overall-lv");
  const labelImg = document.getElementById("label-image");
  const downloadBtn = document.getElementById("download-btn");

  // --- 作詞（AI使用度別詳細解析） → frontend-download.js と完全一致 ---
  const lyricDetails = {
    1:"AIが全自動で作詞を行い、人間による構成修正や表現調整を一切行っていない状態です。人間の介入がないため、言葉の構成・ストーリー性は限定的であり、アルゴリズムの出力傾向がそのまま反映されています。",
    2:"AIが作成した歌詞を基に、人間が語尾や単語の微調整のみ行ったケースです。AI主導のアウトプットを保持しつつ、最低限の自然さや文脈修正を加えています。全体構成は依然としてAI出力に依存しています。",
    3:"AIが生成した原案をベースに、人間が構成や語彙、リズムの一部を再構築した状態です。AIが提示するアイデアを素材として活用しつつ、作者の意図が部分的に反映されています。AIと人の共同編集段階と言えます。",
    4:"人間が作品のテーマやストーリーラインを設計し、AIは比喩表現や語彙提案、韻調整などの補助を担当しています。AIを“共同作詞アシスタント”として活用しながら、人間の創造的判断が主導する形です。",
    5:"人が作品全体のストーリー・構成・言葉選びを主導し、AIは文体の滑らかさや自然さの補強のみを担っています。完全な作家主導のプロセスであり、AIはあくまで創作支援ツールの一部として機能しています。"
  };

  // --- 作曲（AI使用度別詳細解析） → 完全一致 ---
  const compositionDetails = {
    1:"AIが自動で生成した曲をそのまま採用した状態です。人間による構成編集や音質調整がほぼなく、AIモデルが持つ生成特性がそのまま反映されています。実験的作品やプロトタイプ段階の仕上がりに近い傾向です。",
    2:"AIが出力した音源をベースに、部分的なカット・ボリューム調整など最小限の処理を行った段階です。AI主導の音楽構成に人間の意図が軽く加わる程度で、全体の音楽的方向性はAIが握っています。",
    3:"AIの生成素材をもとに人間が再構成を行い、曲構成やリズム、展開の調整を施した状態です。AIと人間のクリエイティブが半々に融合しており、AIのインスピレーションを素材として活用した共同制作フェーズです。",
    4:"人間が明確な音楽的ビジョンを持ち、AIへ繰り返しプロンプトや指示を与えながら目的の音像を形成しています。AIはあくまで“楽器的アシスタント”として利用され、作曲全体の主導は人間が行っています。",
    5:"人間が作曲設計・構成・音響処理の全てをコントロールし、AIは音色生成やリファレンス提案などに限定して使用されています。最終的な音楽的決定権は全て人間にあり、AIは創作効率化のためのツールとして活用されています。"
  };

  // --- AI使用総合レベル → 完全一致 ---
  const overallDefinitions = {
    1:"AIが全自動で生成した成果物であり、人の意図や創作判断がほぼ介在していない状態です。純粋なAI生成データとして扱われ、著作的独自性は限定的です。",
    2:"AIの生成結果をもとに人間が軽微な修正を加えた段階です。人の介入はあるものの、創作的決定はAI主導で行われているため、作品の独創性は限定的と判断されます。",
    3:"AIと人間の貢献度がほぼ同等であり、双方のクリエイティブが融合した作品です。AIの生成力と人の構成力がバランスよく共存し、共同制作型の特徴が見られます。",
    4:"人間が全体設計を担い、AIは音声・文脈生成の補助として利用されています。AIが持つ技術的支援を最大限活かしつつも、最終判断は人間の手に委ねられた成熟した創作形式です。",
    5:"人が作品の構想から完成まで一貫して主導し、AIはあくまで“創作支援技術”として利用されています。人の感性・判断・構成が中心にあり、AIは創造性の補助に留まります。"
  };

  // --- 著作権解析コメント → 完全一致（※ホーム版から置換） ---
  const copyrightLevels = {
    1:"AIが全自動で生成した結果であり、人間による創作的判断がほとんど存在しないため、著作権法上の『創作的表現』には該当しません。作品はデータ出力として扱われる領域に留まります。",
    2:"AIが主体的に生成した成果物に対して、人間がわずかに修正や選択を加えた段階です。創作意図の介入が限定的であるため、著作権主張の余地は極めて狭いと考えられます。",
    3:"AIと人の関与が均衡しており、創作的判断の所在が分散しています。場合によっては人間の寄与部分に限り、著作権的評価を行うことが可能な領域にあたります。",
    4:"人が作品全体の方向性と表現意図を管理しており、AIは補助的役割に留まっています。創作的判断の主導権が人にあるため、一般的には著作権の成立が十分に認められます。",
    5:"作品の創作判断から構成・表現まで人間が主導しており、AIは単なる補助的なツールとして用いられています。人の思想・感情の反映が明確であり、著作権法上の創作物として完全に成立します。"
  };

  // =============================
  // 判定ボタン制御
  // =============================
  if (btn && spinner && result) {
    btn.addEventListener("click", () => {
      const lyrics = document.querySelector('input[name="lyrics"]:checked');
      const composition = document.querySelector('input[name="composition"]:checked');

      if (!lyrics || !composition) {
        alert("すべての質問に回答してください。");
        return;
      }

      // スピナー表示
      btn.innerHTML = `
        <div style="display:inline-flex;align-items:center;gap:6px;">
          <div class="agml-spinner" style="
            width:18px;height:18px;
            border:3px solid rgba(255,255,255,0.4);
            border-top-color:#fff;
            border-radius:50%;
            animation:agml-spin 0.8s linear infinite;
          "></div>
          <span>判定中...</span>
        </div>`;
      btn.disabled = true;

      // --- 判定処理 ---
      setTimeout(() => {
        result.classList.remove("hidden");

        const lvLyrics = parseInt(lyrics.value, 10);
        const lvComposition = parseInt(composition.value, 10);
        const overall = Math.round((lvLyrics + lvComposition) / 2);

        lyricLvEl.textContent = "レベル" + lvLyrics;
        compLvEl.textContent = "レベル" + lvComposition;
        overallLvEl.textContent = "レベル" + overall;

        // ⭐ 判定後のボタンを変更（再判定不可）
        btn.innerHTML = "▼ 判定結果は以下の通り ▼";
        btn.disabled = true;
        btn.style.cursor = "default";

        // 古いカード削除
        document.querySelectorAll(".info-card").forEach(el => el.remove());

        const insertCard = (afterNode, text) => {
          const card = document.createElement("div");
          card.className = "info-card";
          card.innerHTML = `<p class="info-card__text">${text}</p>`;
          afterNode.insertAdjacentElement("afterend", card);
        };

        insertCard(lyricLvEl.parentElement, lyricDetails[lvLyrics]);
        insertCard(compLvEl.parentElement, compositionDetails[lvComposition]);

        const overallRow = overallLvEl.parentElement;
        const overallCard = document.createElement("div");
        overallCard.className = "info-card";
        overallCard.innerHTML = `<p class="info-card__text">${overallDefinitions[overall]}</p>`;
        overallRow.insertAdjacentElement("afterend", overallCard);

        // 著作権
        const targetList = Array.from(document.querySelectorAll("#result p strong"))
          .filter(st => st.textContent.includes("制作物の著作権主張"));
        if (targetList.length > 0) {
          const target = targetList[0];
          const next = target.parentElement.nextElementSibling;
          if (next && next.classList.contains("info-card")) next.remove();

          const box = document.createElement("div");
          box.className = "info-card";
          box.innerHTML = `<p class="info-card__text">${copyrightLevels[overall]}</p>`;
          target.parentElement.insertAdjacentElement("afterend", box);
        }

        // ラベル画像
// ラベル画像（独立サイト用にローカルパスを使用）
const cacheBuster = "?v=" + Date.now();
labelImg.src = "./img/level" + overall + ".png" + cacheBuster;

        // ダウンロードボタン
        downloadBtn.onclick = () => {
          const link = document.createElement("a");
          link.href = labelImg.src;
          link.download = "AGML_Level" + overall + ".png";
          link.click();
        };

        // 再判定防止
        document.querySelectorAll('input[name="lyrics"], input[name="composition"]').forEach(el => {
          el.disabled = true;
          el.parentElement.style.opacity = "0.6";
          el.parentElement.style.pointerEvents = "none";
        });

      }, 3000);
    });
  }

  // =============================
  // 2️⃣ 利用規約スクロール＋フォーム開閉
  // =============================
  const termsBox = document.getElementById("termsBox");
  const agreeCheckbox = document.getElementById("agreeTerms");
  const agreementBar = document.getElementById("agreementBar");
  const barProgress = agreementBar ? agreementBar.querySelector(".bar-progress") : null;
  const barText = agreementBar ? agreementBar.querySelector(".bar-text") : null;
  const formContainer = document.getElementById("formContainer");
  const pointerHand = document.getElementById("agreePointer");

  if (termsBox && agreeCheckbox && agreementBar && barProgress && barText && formContainer) {

    barProgress.style.width = "0%";
    agreeCheckbox.disabled = true;
    barText.textContent = "利用規約を最後まで確認し、同意してください";
    if (pointerHand) pointerHand.classList.remove("active");

    // スクロール（※メッセージは変えない）
    termsBox.addEventListener("scroll", function () {
      const scrollTop = termsBox.scrollTop;
      const visibleHeight = termsBox.clientHeight;
      const scrollHeight = termsBox.scrollHeight;

      let progress = ((scrollTop + visibleHeight) / scrollHeight) * 100;
      progress = Math.max(0, Math.min(progress, 100));
      barProgress.style.width = progress + "%";

      const atBottom = scrollTop + visibleHeight >= scrollHeight - 5;

      if (atBottom) {
        agreeCheckbox.disabled = false;
        if (pointerHand) pointerHand.classList.add("active");
      } else {
        agreeCheckbox.disabled = true;
        if (pointerHand) pointerHand.classList.remove("active");
      }

      if (scrollTop <= 0) barProgress.style.width = "0%";
    });

    // 同意チェック時（ここでのみメッセージ変更）
    agreeCheckbox.addEventListener("change", function () {
      formContainer.classList.toggle("form-unlocked", agreeCheckbox.checked);
      formContainer.classList.toggle("form-lock", !agreeCheckbox.checked);

      if (agreeCheckbox.checked) {
        formContainer.style.animation = "fadeInUp 0.8s ease";

        if (pointerHand) pointerHand.classList.remove("active");

        // ⭐ チェックした瞬間だけメッセージ変更
        barText.textContent = "▼ AIレベル判定の質問にお答えください ▼";
      }
    });
  }
});
