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

