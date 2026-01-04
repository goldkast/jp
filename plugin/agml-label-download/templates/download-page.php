<?php /** ダウンロードページ本体テンプレート */ ?>
<div class="agml-dl">

  <!-- ステップナビ -->
  <ul class="steps">
    <li class="active"><span>利用規約</span></li>
    <li><span>AIレベル判定</span></li>
    <li><span>判定結果</span></li>
    <li><span>ラベルDL</span></li>
    <li><span>スマート表示</span></li>
  </ul>

  <!-- STEP 1: 利用規約 -->
  <section id="agmlStep1" class="step-panel is-active">
    <h3 id="step_title" class="designbar3">● 利用規約について</h3>

    <p class="lead-text">
      以下の利用規約をよくお読みいただき、内容にご同意のうえご利用ください。<br>
      本ラベルは、AI生成音楽を識別するために無償でご利用いただけますが、趣旨に反する使用はご遠慮ください。
    </p>

    <div class="terms-box" id="termsBox" tabindex="0">
      <p>
        <strong>第1条（目的・利用範囲）</strong><br>
        当サイトが配布する「AI生成音楽認ラベル」（以下「本ラベル」）は、
        AI生成音楽であることを識別・表示する目的で、YouTubeサムネイルその他オンライン上の画像・動画に
        無償でご利用いただけます。営利・非営利を問いません。本ラベルの利用は任意であり、利用を強制するものではありません。
      </p><br>

      <strong>第2条（禁止事項）</strong>
      <ul>
        <li>趣旨に反する改変・利用（例：誤認を与える表記、差別・中傷・違法行為の助長等）</li>
        <li>商標・ロゴ等としての登録・独占的使用</li>
        <li>出所の偽装や虚偽表示</li>
        <li>法令・公序良俗に反する利用</li>
      </ul><br>

      <strong>第3条（著作権等）</strong>
      <p>
        本ラベルに関する著作権その他一切の知的財産権は当サイトまたは権利者に帰属します。
        本ラベルの利用により、権利が移転・譲渡されることはありません。
      </p><br>

      <strong>第4条（改変・二次配布）</strong>
      <p>
        本ラベルのサイズ変更や色反転などの軽微な調整は、識別目的に合理的な範囲で許容されます。
        ただし、デザインの本質を損なう大幅な改変や、改変版の再配布はご遠慮ください。
      </p><br>

      <strong>第5条（免責）</strong>
      <p>
        本ラベルの利用に関連して利用者に生じた損害について、当サイトは一切の責任を負いません。
        利用者の責任においてご利用ください。
      </p><br>

      <strong>第6条（規約の変更）</strong>
      <p>
        当サイトは、必要に応じて本規約を変更できます。変更後の規約は、当サイトに掲示した時点で効力を生じます。
      </p><br>

      <strong>第7条（準拠法）</strong>
      <p>
        本規約は日本の法令を基準として解釈されます。
      </p><br>

      <div class="terms-meta">最終更新日：2025年09月19日</div>
    </div>

    <div class="terms-check-area">
      <label class="agree-box">
        <input type="checkbox" id="agreeTerms" disabled>
        <span>利用規約に同意します</span>
        <img id="agreePointer"
             src="https://aigenmusiclabel.com/jp/wp-content/uploads/2025/11/pointer.png"
             alt="指示画像" class="pointer-hand">
      </label>
    </div>

    <div class="next-page-btn-wrap">
      <button id="nextStep" type="button" class="agml-btn" disabled>
        AIレベル判定を実施する
      </button>
    </div>
  </section>
  <!-- STEP 2: フォーム -->
  <section id="agmlStep2" class="step-panel" style="display:none;">
    <h3 id="step_title" class="designbar3">● AI使用割合判定フォーム</h3>

    <?php include __DIR__ . '/form.php'; ?>

    <div class="next-page-btn-wrap">
      <button id="judgeStart" type="button" class="agml-btn is-ready">判定開始</button>

      <div id="judgeSpinner" class="hidden" role="status">
        <div class="agml-spinner"></div>
        <span>判定中...</span>
      </div>
    </div>
  </section>

  <!-- STEP 3: 判定結果 -->
  <section id="agmlStep3" class="step-panel" style="display:none;">
    <h3 id="step_title" class="designbar3">● AI使用割合判定結果</h3>

    <div id="judgeResult" class="result-box">
      <!-- JSで動的に結果が挿入 -->
    </div>

    <div class="next-page-btn-wrap">
      <!-- ボタンは JS が挿入 -->
    </div>
  </section>

  <!-- STEP 4: ラベルDL -->
  <section id="agmlStep4" class="step-panel" style="display:none;">
    <h3 id="step_title" class="designbar3">● ラベルダウンロード</h3>

    <p>以下のボタンからラベルデータをダウンロードできます。</p>

    <div class="next-page-btn-wrap">
      <a href="https://aigenmusiclabel.com/jp/wp-content/uploads/2025/11/agml-label-sample.zip"
         class="agml-btn is-ready" download>ダウンロード</a>
    </div>

    <div class="next-page-btn-wrap">
      <button id="goSmart" type="button" class="agml-btn is-ready">
        スマート表示へ進む
      </button>
    </div>
  </section>

  <!-- STEP 5: スマート表示 -->
  <section id="agmlStep5" class="step-panel" style="display:none;">

    <div class="smart-wrapper">

      <!-- ▼ 証明書タイトル -->
      <div class="smart-header">
        <h2>AI 使用レベル証明書（Smart Display）</h2>
        <p class="smart-desc">
          YouTube・SNS 説明欄に貼るだけで、判定内容をスマートに公開できます。
        </p>
      </div>

      <!-- ▼ 公開URL -->
      <div class="smart-url-box">
        <p class="label">公開URL：</p>
        <p class="value" id="smartPublicURL">https://aigenmusiclabel.com/xxxxxx</p>
      </div>

      <!-- ▼ ラベル画像 -->
      <div class="smart-label-img-box" id="smartLabelImgBox">
        <!-- JSで画像を挿入 -->
      </div>

      <!-- ▼ メインの証明書ボックス -->
      <div class="smart-certificate">

        <!-- 🟦 作詞AI使用割合 -->
        <div class="smart-row">
          <div class="smart-label">
            作詞AI使用割合：
            <span id="smartLyricPercent"></span>

            <!-- ▽ バー画像（330×23px） -->
            <div class="smart-bar">
              <img id="smartLyricBar" src="" alt="">
            </div>
          </div>

          <div class="smart-value"></div>
        </div>
        <div class="smart-comment" id="smartLyricComment">コメント</div>


        <!-- 🟧 作曲AI使用割合 -->
        <div class="smart-row">
          <div class="smart-label">
            作曲AI使用割合：
            <span id="smartCompPercent"></span>

            <div class="smart-bar">
              <img id="smartCompBar" src="" alt="">
            </div>
          </div>

          <div class="smart-value"></div>
        </div>
        <div class="smart-comment" id="smartCompComment">コメント</div>


        <!-- 🟩 総合AI使用割合 -->
        <div class="smart-row">
          <div class="smart-label">
            総合AI使用割合：
            <span id="smartOverallPercent"></span>

            <div class="smart-bar">
              <img id="smartOverallBar" src="" alt="">
            </div>
          </div>

          <div class="smart-value"></div>
        </div>
        <div class="smart-comment" id="smartOverallComment">コメント</div>


        <!-- 著作権（バー不要） -->
        <div class="smart-row">
          <div class="smart-label">著作権保有割合：</div>
          <div class="smart-value" id="smartCopyrightLevel">
            <span id="smartCPImg"></span>
          </div>
        </div>
        <div class="smart-comment" id="smartCopyrightComment">コメント</div>

      </div>

      <!-- ▼ QRコード -->
      <div class="smart-qr-wrapper">
        <p class="qr-label">スマート表示ページを共有</p>
        <div id="smartQR" class="qr-box"></div>
      </div>

    </div>

  </section>
