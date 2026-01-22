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

## 補足：確定した実装戦略（重要）

### 採用方針

- 円形ゲージは **5段階固定**
- ゲージ状態は **画像そのものに焼き込む**
- JavaScriptは以下のみを担当する
  - AI使用率（％）からレベル（1〜5）を算出
  - 対応するSVGファイルを選択して表示

---

### 採用理由

- SVG内部DOM操作を排除することで、環境差異（local / live）を完全に回避できる
- デバッグが「画像が存在するかどうか」に集約される
- 将来のアニメーション追加も、段階切替で安全に拡張可能
- 本MDの「迷走を止める」という目的に最も合致する

---

### 非採用とする実装（禁止）

- `<object>` / `<embed>` によるSVG操作
- SVG内IDをJSで制御する方式
- base + step SVG をJS/CSSで合成する方式
- opacity や fill をCSS/JSで動的制御する方式

---

### 位置づけ

この方針は **暫定案ではなく確定仕様** とする。  
将来、表現要件が変わった場合は **別フェーズ・別MDで再設計** する。

# AGML｜判定結果ラベル表示 実装方針（更新版）

## 更新概要（2026-01）
本更新は以下を目的とする。
- **●（レベルドット）とラインを完全に分離管理**
- 100%の既存挙動を一切破壊しない
- 80 / 60 / 40 / 20% を安全に横展開できる構造を明文化

---

## 確定前提（変更禁止）
- 100%（safeTarget === 5）の表示・タイミング・CSS・JSは**完全固定**
- HTML構造は既存の agml-label-stage を使用
- JS は animateAgmlLabel() を唯一の制御点とする

---

## 表示シーケンス（全％共通）

1. 円形ゲージ（5段階画像）を段階的に表示
2. 最終ブロック到達
3. **待機時間 500ms（全％共通）**
4. ●（level-dot）表示
5. **さらに待機 500ms（全％共通）**
6. ライン表示（SVG）

※ 100% / 80% / 60% / 40% / 20% すべてこの順序を厳守

---

## ●（Level Dot）仕様（確定）

### JS制御
- 表示トリガー：最終ブロック到達後 + 500ms
- 表示制御：`.level-dot.is-visible`
- JSでは**位置・サイズを一切扱わない**

### CSS制御（％別完全分離）
```css
body[data-level="5"] .level-dot { /* 100% */ }
body[data-level="4"] .level-dot { /* 80% */ }
body[data-level="3"] .level-dot { /* 60% */ }
body[data-level="2"] .level-dot { /* 40% */ }
body[data-level="1"] .level-dot { /* 20% */ }
```

---

## ライン仕様（今回追加・重要）

### SVGファイル
- 100%：100-line.svg（既存・変更禁止）
- 80%：80-line.svg
- 60%：60-line.svg
- 40%：40-line.svg
- 20%：20-line.svg

### 表示ルール
- ● 表示完了後 **500ms 待機**して表示
- SVGは `<object class="level-line">` を使用
- data 属性で SVG を切り替える

---

## ラインCSS（％別完全分離・将来拡張前提）
```css
body[data-level="5"] .level-line { /* 100% */ }
body[data-level="4"] .level-line { /* 80% */ }
body[data-level="3"] .level-line { /* 60% */ }
body[data-level="2"] .level-line { /* 40% */ }
body[data-level="1"] .level-line { /* 20% */ }
```

※ JSで位置やサイズを制御することは禁止

---

## 禁止事項（再確認）
- 100%のJS/CSSを変更すること
- %ごとにif文を乱立させること
- inline styleの使用
- SVG内部DOMの操作

---

## 実装判断フロー
- **仕様確定・構造整理：このMD**
- **差分実装：cursor**
- antigravityは新規設計フェーズのみ使用

---

## このMDは最新版基準
以後、AGMLラベル表示の修正・追加は
**必ず本MDに追記する形で行うこと。**

