# Pixel Art Quiz Game (Pixel 闖關問答遊戲)

這是一個基於 React + Vite 開發的像素風 (Pixel Art) 網頁問答遊戲，後端採用 Google Apps Script (GAS) 與 Google Sheets 進行題目管理與成績紀錄。

![Pixel Game Screenshot](https://api.dicebear.com/9.x/pixel-art/svg?seed=README)

## 🎮 功能特色
- **像素風格 (Pixel Art)**：採用 NES 懷舊風格與 'Press Start 2P' 字體。
- **RWD 響應式設計**：支援電腦與手機遊玩。
- **Google Sheets 連動**：題目與成績皆儲存在雲端試算表中。
- **動態關主**：每一關皆有不同的像素怪物 (透過 DiceBear API)。

## 🚀 快速開始 (Local Setup)

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   瀏覽器打開 `http://localhost:5173` 即可遊玩。

## 🛠️ 後端設定 (Google Sheets & GAS)
本專案需要配合 Google Sheets 才能運作，請依序完成以下步驟：

### 1. 建立 Google Sheet
建立一個新的 Google 試算表，並建立兩個工作表 (Tabs)，名稱與欄位如下：

#### 工作表一：`題目`
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| ID | 題目 | A | B | C | D | 解答 |
| 1 | 什麼是 AI? | 選項A | 選項B | 選項C | 選項D | A |

#### 工作表二：`回答`
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| ID | 闖關次數 | 總分 | 最高分 | 第一次通關分數 | 花了幾次通關 | 最近遊玩時間 |

---

### 2. 部署 Google Apps Script (GAS)
1. 在試算表中，點擊上方選單 **擴充功能 (Extensions)** > **Apps Script**。
2. 將本專案根目錄下的 `Code.gs` 內容完整複製，並覆蓋掉編輯器中的程式碼。
3. 點擊右上角 **部署 (Deploy)** > **新增部署 (New deployment)**。
4. 點擊齒輪圖示 > 選擇 **網頁應用程式 (Web app)**。
   - **說明**：Pixel Game API
   - **執行身分 (Execute as)**：`我 (Me)`
   - **誰可以存取 (Who has access)**：`任何人 (Anyone)` **(重要！)**
5. 點擊 **部署**，授權必要的權限。
6. 複製產生的 **網頁應用程式網址 (Web App URL)**。

---

### 3. 連接前端
1. 將專案根目錄的 `.env.example` 複製並改名為 `.env`。
2. 填入剛剛複製的網址：
   ```properties
   VITE_GOOGLE_APP_SCRIPT_URL=https://script.google.com/macros/s/你的部署ID/exec
   ```
3. (選填) 調整遊戲參數：
   ```properties
   VITE_QUESTION_COUNT=5      # 每次遊玩題數
   VITE_PASS_THRESHOLD=3      # 及格題數
   ```
4. 重新啟動伺服器：`npm run dev`。

## 🚀 部署到 GitHub Pages

本專案已設定好自動部署 GitHub Actions workflow，只需簡單設定即可自動部署。

### 1. 啟用 GitHub Pages
1. 前往你的 GitHub Repository
2. 點擊 **Settings** > **Pages**
3. 在 **Source** 下選擇 **GitHub Actions**

### 2. 設定環境變數

#### Repository Secrets (敏感資訊)
前往 **Settings** > **Secrets and variables** > **Actions** > **Secrets**

點擊 **New repository secret** 新增：
- **Name**: `VITE_GOOGLE_APP_SCRIPT_URL`
- **Value**: `https://script.google.com/macros/s/你的部署ID/exec`

#### Repository Variables (一般設定)
前往 **Settings** > **Secrets and variables** > **Actions** > **Variables**

點擊 **New repository variable** 新增以下兩個變數：

| Name | Value | 說明 |
|------|-------|------|
| `VITE_PASS_THRESHOLD` | `5` | 通關門檻分數 |
| `VITE_QUESTION_COUNT` | `10` | 每局題目數量 |

### 3. 部署

#### 自動部署
推送到 `main` 分支時自動觸發：
```bash
git add .
git commit -m "Update game"
git push origin main
```

#### 手動部署
1. 前往 Repository 的 **Actions** 頁面
2. 選擇 **Deploy to GitHub Pages** workflow
3. 點擊 **Run workflow** > **Run workflow**

### 4. 訪問你的遊戲
部署完成後，訪問：
```
https://你的用戶名.github.io/pixel-game/
```

> **⚠️ 注意**: 
> - 如果你的 Repository 名稱不是 `pixel-game`，請修改 `vite.config.ts` 中的 `base` 路徑
> - 首次部署可能需要幾分鐘時間


## 📝 測試題庫 (生成式 AI 基礎知識)
您可以直接複製下方表格內容貼入您的 `題目` 工作表中進行測試：

| ID | 題目 | A | B | C | D | 解答 |
|----|------|---|---|---|---|------|
| 1 | ChatGPT 主要是基於哪種神經網路架構？ | CNN (卷積神經網路) | RNN (循環神經網路) | Transformer | GAN (生成對抗網路) | C |
| 2 | 在生成式 AI 中，「幻覺 (Hallucination)」是指什麼？ | AI 生成了恐怖的圖片 | AI 自信地回答錯誤或虛構的資訊 | AI 拒絕回答問題 | AI 變得有自我意識 | B |
| 3 | 用來控制模型輸出隨機性與創造力的參數通常是？ | Temperature (溫度) | Pressure (壓力) | Humidity (濕度) | Gravity (重力) | A |
| 4 | 下列何者是知名的「文字生成圖片」模型？ | BERT | Midjourney | AlphaGo | XGBoost | B |
| 5 | LLM 是什麼的縮寫？ | Large Language Model | Long Learning Machine | Local Logic Module | Little Language Map | A |
| 6 | 「Context Window (上下文視窗)」的大小決定了什麼？ | AI 的智商高低 | AI 產生圖片的解析度 | AI 一次能處理的資訊量/記憶長度 | AI 的反應速度 | C |
| 7 | 下列哪個行為屬於「Prompt Engineering (提示工程)」？ | 調整伺服器散熱風扇 | 設計精準的指令引導 AI 輸出 | 重寫 Python 編譯器 | 增加電腦記憶體 | B |
| 8 | 訓練 ChatGPT 這類模型時，主要的資料來源是？ | 僅限維基百科 | 網際網路上的大量文本數據 | 僅限學術論文 | 隨機生成的亂碼 | B |
| 9 | 下列何者不是生成式 AI 的典型應用？ | 撰寫電子郵件草稿 | Excel 自動加總計算 | 生成行銷文案 | 將草圖轉換為精美插圖 | B |
| 10 | 什麼是「Zero-shot Learning (零樣本學習)」？ | 模型在沒有看過範例的情況下完成任務 | 模型需要看一千張圖才能學習 | 模型無法學習新事物 | 模型完全不消耗電力 | A |

## 📦 技術棧
- Frontend: React 19, Vite, TypeScript
- Styling: Tailwind CSS, Framer Motion
- Backend: Google Apps Script

Enjoy your game! 👾
