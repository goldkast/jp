# AGML｜判定結果ラベル表示 実装方針（ChatGPT用・統合MD）

## 目的（このMDだけを見る）
- 迷走を止めるための**唯一の正解ルート**を定義する
- 以後の実装・修正は**必ずこのMDに準拠**
- 無駄なコード・仮実装・構造変更を禁止する

---

## 前提状態（ここから開始）
- 背景は**正常表示**に復旧済み
- Step構造（step-content-1〜5）は**既存のまま**
- ナビ／フッター／共通CSSは**触らない**
- 対象は **判定結果表示（Step2〜Step3）だけ**

---

## 最終ゴール（完成形）
判定結果が確定したら **Step3** に以下を **順番に重ねて表示**する。

1. 背景ラベル画像  
2. 5分割レベルゲージ（円形・画像）  
3. テキスト表示  
   ●─────〇 60%

※ 余計なカード・枠・角丸・タイトル文字は**一切出さない**

---

## 絶対ルール（破壊防止）
- HTML / CSS / JS は**最小変更**
- 新規表示領域は**1つのみ**
- 既存クラスを**上書きしない**
- SVGをJSで分解・加工しない
- 仮コード・検証コードを残さない

---

## 表示レイヤー構造（固定）
**1つのステージ**に重ねる。

### レイヤー順
1. 背景画像  
   img/level/label-display-back.png
2. レベルゲージ画像  
   img/level/agml-gauge-X.svg（X=1〜5）
3. テキスト  
   ●─────〇 xx%

---

## HTML（これだけ・1回だけ）
Step3に **このブロックのみ**を配置。

```html
<div class="agml-label-stage" id="agmlLabelStage">
  <img
    class="agml-label-bg"
    src="../img/level/label-display-back.png"
    alt=""
  >

  <img
    class="agml-label-gauge"
    src="../img/level/agml-gauge-1.svg"
    alt=""
  >

  <div class="agml-label-indicator">
    <span class="dot">●</span>
    <span class="line">─────</span>
    <span class="percent">0%</span>
  </div>
</div>
```

---

## CSS（サイズ暴走を防ぐ）

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

.agml-label-gauge {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 200px;
  height: 200px;
}

.agml-label-indicator {
  position: absolute;
  top: 24px;
  right: 24px;
  color: #00CCFF;
  font-weight: 600;
}
```

---

## レベル判定（5段階・固定）
| 利用率 | ゲージ |
|------|------|
| 0–20% | 1 |
| 21–40% | 2 |
| 41–60% | 3 |
| 61–80% | 4 |
| 81–100% | 5 |

---

## JS（関数は1つだけ）

```js
function renderAgmlLabel(percent) {
  const stage = document.getElementById('agmlLabelStage');
  const gauge = stage.querySelector('.agml-label-gauge');
  const percentEl = stage.querySelector('.percent');

  const level = Math.min(5, Math.max(1, Math.ceil(percent / 20)));

  gauge.src = `../img/level/agml-gauge-${level}.svg`;
  percentEl.textContent = `${percent}%`;
}
```

---

## 中間ゴール（合格ライン）
- 背景画像が表示される
- ゲージ画像が中央に表示される
- renderAgmlLabel(60) で  
  agml-gauge-3.svg / 60% が表示される

---

## 禁止事項
- SVG内部をJSで操作
- DOMを複数生成
- % / vw サイズ指定
- 仮実装の放置

---

## 次のステップ
1. %カウントアップアニメーション
2. ゲージ点灯アニメーション
3. Step3 → Step4 連動

---

このMDが唯一の基準。
