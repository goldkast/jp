<div id="agml-app">
  <!-- 歌詞の質問 -->
  <fieldset>
    <legend><?php _e('1. 歌詞の制作プロセス', 'agml-ai-level-checker'); ?></legend>
    <label><input type="radio" name="lyrics" value="1"> <strong>ほぼAIが生成：</strong>AIが自動で全て作詞を作成し、修正など手を加えず使用</label><br>
    <label><input type="radio" name="lyrics" value="2"> <strong>主にAIが生成 ：</strong>AIが作成した歌詞を一部語尾や単語のみ修正</label><br>
    <label><input type="radio" name="lyrics" value="3"> <strong>AI原案+部分改変：</strong>AIで作成した歌詞の原案をもとに、内容や構成を修正</label><br>
    <label><input type="radio" name="lyrics" value="4"> <strong>AIを補助的に使用：</strong>自分で歌詞を構成し、AIに言葉や韻・翻訳を提案させた</label><br>
    <label><input type="radio" name="lyrics" value="5"> <strong>創作主導：</strong>自分が歌詞を構想し、AIは表現調整・自然さ補強のみで使用</label>
  </fieldset>

  <!-- 作曲の質問 -->
  <fieldset>
    <legend><?php _e('2. 作曲の制作プロセス', 'agml-ai-level-checker'); ?></legend>
    <label><input type="radio" name="composition" value="1"> <strong>ほぼAIが生成：</strong>AIが全自動で曲を生成し、出力された曲をそのまま使用</label><br>
    <label><input type="radio" name="composition" value="2"> <strong>主にAIが生成：</strong>AIが生成した曲を一部カットや音量調整を行った</label><br>
    <label><input type="radio" name="composition" value="3"> <strong>AI素材中心で構成：</strong>AIが生成した曲をベースに曲の再構成や調整を行った</label><br>
    <label><input type="radio" name="composition" value="4"> <strong>AIを使いこなす：</strong>自分の構想をAIに詳細指示し何度も生成を繰り返した</label><br>
    <label><input type="radio" name="composition" value="5"> <strong>創作主導：</strong>自分の構成を設計し、AIで繰り返し曲の修正指示・編集を行い完成</label>
  </fieldset>

  <!-- 判定ボタン＆スピナー -->
  <div class="judge-wrapper">
    <button id="generate-result"><?php _e('判定開始', 'agml-ai-level-checker'); ?></button>

    <!-- スピナー -->
    <div id="spinner" class="hidden" role="status" aria-live="polite">
      <div class="agml-spinner" aria-hidden="true"></div>
      <span>判定中...</span>
    </div>
  </div>

  <!-- 判定結果 -->
  <div id="result" class="hidden">
    <h3><?php _e('判定結果', 'agml-ai-level-checker'); ?></h3>

    <p><strong><?php _e('作詞：', 'agml-ai-level-checker'); ?></strong> <span id="lyrics-lv"></span></p>
    <p><strong><?php _e('作曲：', 'agml-ai-level-checker'); ?></strong> <span id="composition-lv"></span></p>

    <!-- AI使用総合レベル -->
    <p>
      <strong><?php _e('AI使用総合レベル：', 'agml-ai-level-checker'); ?></strong>
      <span id="overall-lv"></span>
      <span id="overall-icons" class="lv-icons" aria-hidden="true"></span>
    </p>

    <!-- 制作物の著作権主張 -->
    <p>
      <strong><?php _e('制作物の著作権主張について：', 'agml-ai-level-checker'); ?></strong>
      <span id="copyright-stars" class="cp-stars" aria-hidden="true"></span>
    </p>

    <div id="definition-text"></div>

    <div class="result-media">
      <img id="label-image" src="" alt="レベル画像" width="250">
      <button id="download-btn"><?php _e('ダウンロード', 'agml-ai-level-checker'); ?></button>
    </div>
  </div>
</div>
