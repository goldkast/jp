# AGML｜判定結果ラベル表示 実装方針（MINIMAL・更新版）

## 更新目的（2026-01 / MINIMAL）
本更新では、**SVG画像ベースのラベル表示方式を完全に廃止**し、
**CSS + JavaScript による円形ゲージアニメーション方式（MINIMAL）へ統一**する。

- 旧SVG（agml-gauge-*.svg / line / dot / number系）はすべて非推奨
- 表示ロジックを単純化し、再現性・保守性を最優先
- 「判定結果＝背景 + 円ゲージ + 数値」という最小構成に戻す

---

## 現在の正しい前提状態（ここから作業）
- 判定結果表示時、**背景ラベル画像のみが表示される状態に復旧済み**
- agml-label.css は存在しない（新規に作らない）
- home.css / layout.css / base.css は**原則触らない**
- 対象は **Step3（判定結果表示）専用ロジックのみ**

---

## 廃止・削除対象（重要）
以下は **すべて削除・使用禁止** とする。

### 画像・SVG
- agml-gauge-1.svg ～ agml-gauge-5.svg
- agml-gauge-5step.svg
- agml-gauge-base.svg
- 20-line.svg ～ 100-line.svg
- level-dot.svg
- num-0.svg ～ num-8.svg
- num-percent.svg

### 実装方式
- `<object>` / `<embed>` によるSVG読み込み
- SVG内部DOM操作（opacity / fill / id制御）
- 画像レイヤー切替によるレベル表現

---

## 新・最終ゴール（MINIMAL）

判定結果確定後、**Step3 に以下のみを表示**する。

1. 背景ラベル画像（既存）
2. 円形ゲージ（CSS + JS）
3. 中央に数値（XX%）

※ ライン・ドット・装飾・カードUIは一切出さない

---

## 表示構造（HTML｜Step3 専用）

```html
<div class="agml-label-stage" id="agmlLabelStage">
  <img
    class="agml-label-bg"
    src="../img/level/label-display-back.png"
    alt=""
  >

  <div class="agml-circle" data-percent="0">
    <span class="agml-percent">0%</span>
  </div>
</div>
```

---

## CSS（円ゲージ・MINIMAL）

```css
.agml-label-stage {
  position: relative;
  width: 320px;
  height: 320px;
  margin: 40px auto;
}

.agml-label-bg {
  width: 100%;
  height: 100%;
}

.agml-circle {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(#00CCFF 0deg, #e6e6e6 0deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.agml-circle::before {
  content: "";
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: #0b0f14;
}

.agml-percent {
  position: relative;
  color: #00CCFF;
  font-size: 1.6rem;
  font-weight: 600;
}
```

---

## JS（唯一の制御関数）

```js
function renderAgmlLabel(percent) {
  const circle = document.querySelector('.agml-circle');
  const text = document.querySelector('.agml-percent');
  if (!circle || !text) return;

  const safe = Math.max(0, Math.min(100, percent));
  const deg = safe * 3.6;

  circle.style.background = `conic-gradient(#00CCFF ${deg}deg, #e6e6e6 ${deg}deg)`;
  text.textContent = `${safe}%`;
}
```

### 呼び出し位置（必須）

```js
// 判定結果確定後
renderAgmlLabel(overallPct);
```

---

## 合格ライン（この状態になればOK）
- 背景のみ → 円ゲージが出現
- 10% → 10% 分だけ円が塗られる
- 60% → 約6割の円が塗られる
- SVG・画像依存ゼロ
- home.css を一切触らず成立

---

## 今後の拡張（別フェーズ）
- カウントアップアニメーション
- フェードイン
- Step3 → Step4 遷移

※ 本MDでは実装しない

---

## 位置づけ
このMDは **MINIMAL方式の確定仕様**。
以後、円ゲージ表現はこの方式を基準とする。

作詞AI使用割合（Color: Orange）
### 作詞AI使用割合（表示色：オレンジ）

本指標は、歌詞制作においてAIがどの程度関与したかを示す割合である。  
言語表現・語彙選択・フレーズ生成など、歌詞の内容そのものに対するAIの使用度合いを評価対象とする。

オレンジは、創作エネルギーや表現への介入度を示す色として採用しており、  
AIが言語表現にどの程度踏み込んだかを直感的に把握できるよう設計されている。

作曲AI使用割合（Color: Green）
### 作曲AI使用割合（表示色：グリーン）

本指標は、メロディ・コード進行・リズム構造など、音楽的構成要素に対するAIの使用割合を示す。  
人間が明確な音楽的意図を持ちつつ、生成や補助の手段としてAIを用いた場合も本項目に含まれる。

グリーンは「生成」「構築」「プロセス」を象徴する色であり、  
音楽構造におけるAIの関与度を冷静に示すために選定されている。

総合AI使用割合（Color: Purple）
### 総合AI使用割合（表示色：パープル）

本指標は、作詞・作曲・制作補助など複数工程を含めた、  
制作全体におけるAI関与度を総合的に評価した割合である。

パープルは複合・統合を意味する色として位置づけられており、  
個別項目を単純に強調するのではなく、制作プロセス全体を俯瞰したAI使用状況を示す役割を担う。

著作権主張割合（Color: Yellow）
### 著作権主張割合（表示色：イエロー）

本指標は、創作における著作権の主体がどの程度人間側に帰属すると判断されるかを示す割合である。  
AI使用の有無ではなく、最終的な創作判断・責任の所在を評価対象とする。

イエローは注意喚起や判断を象徴する色であり、  
法的・社会的観点からの「権利の位置」を冷静に示すために用いられている。

オリジナリティー評価（Color: Blue / 固定）
### オリジナリティー評価（表示色：ブルー）

本指標は、制作全体を通じた創作物の独自性を総合的に評価したものである。  
個別のAI使用割合とは切り離し、人間の意図・判断・表現の一貫性を重視して算出される。

ブルーは客観性・冷静さを象徴する色であり、  
AGMLラベル全体の最終判断を示す基準色として固定されている。

---

## 2026-01-XX 円ゲージUI最終調整・確定

### 作業内容
- AGMLラベルの円ゲージ表示をCSS（conic-gradient）方式に一本化
- SVGゲージ（objectタグ）を完全廃止
- レイヤー構成を以下に確定
  1. label-back.png（背景）
  2. CSS円ゲージ（主役）
  3. label-display-back.png（最前面フレーム）
  4. 評価ドット・評価ライン

### 仕様確定ポイント
- 円ゲージは1つのみ（分割しない）
- 5段階表現は構造ではなく視覚表現で担保
- 未達成部分は #00CCFF の 20% 透過で表示
- 背景がうっすら見えることで段階差を直感的に伝える

### 判断
- 切り抜き／マスク表現は採用しない
- 表示安定性・保守性・将来拡張性を優先
- 現在の構成を AGML ラベルUIの完成形として確定

### 結果
- 全％（20 / 40 / 60 / 80 / 100）が正しく表示
- アニメーション・ドット・ライン表示ともに問題なし
- UI構造・見た目・意味が完全に一致した状態で調整完了

---

## 円ゲージ表示仕様（最終確定）

AGMLラベルにおける評価表示は、CSSによる円ゲージ表現を唯一の正規仕様とする。

### レイヤー構成
1. 背景画像：label-back.png  
   - 世界観・情報量を担う装飾背景
2. 円ゲージ（CSS / conic-gradient）  
   - オリジナリティ評価の主表示
3. フレーム画像：label-display-back.png  
   - UI全体を引き締める最前面フレーム
4. 補助要素  
   - 評価確定ドット
   - 評価確定ライン

### 円ゲージ配色ルール
- 達成部分：#00CCFF（不透明）
- 未達成部分：#00CCFF（20% 透過）
- 未達成側から背景がうっすら見えることで段階差を表現

### 設計方針
- 円ゲージは1つのみとし、構造的な分割は行わない
- 5段階表現は視覚的表現で担保する
- SVGマスク・切り抜き・objectタグは使用しない
- 表示安定性・再現性・将来の自動生成を最優先とする

本仕様は、AGMLラベルUIの最終確定仕様として扱う。

