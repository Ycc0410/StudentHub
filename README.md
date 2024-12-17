學生名單管理系統
專案簡介
本專案是一個基於 React 前端、Node.js/Express 後端，並使用 MongoDB 作為資料庫的全端應用程式。
目前實作了 刪除學生資料 的功能，透過 API 串接後端資料庫完成資料操作。

主要技術棧

前端: React
後端: Node.js + Express
資料庫: MongoDB
資料格式: JSON
工具: Axios, Mongoose, Postman（API測試）
系統功能（目前支援）

1. 刪除學生資料 (Delete)
前端操作: 使用者介面提供「刪除」按鈕，點擊後發送請求至後端 API，刪除指定學生。
後端 API: 接收刪除請求，透過 MongoDB 刪除對應的學生資料。
範例畫面:

專案結構

project/
│
├── backend/                         # 後端專案
│   ├── Service/                     # 服務邏輯
│   │   └── UserService.js           # 主要刪除功能實作
│   ├── routes/                      # 路由設定
│   │   └── UserRoute.js             # 設定刪除 API 路由
│   ├── orm/                         # 資料模型
│   │   └── studentSchemas.js        # 學生資料 Schema 定義
│   ├── app.js                       # 後端主程式 (Express 啟動)
│
├── frontend/                        # 前端專案
│   ├── src/
│   │   ├── view/                    # 使用者介面
│   │   │   └── App.tsx              # React 刪除按鈕功能實作
│   │   ├── interface/               # 資料型別定義
│   │   │   └── Student.ts           # 學生資料介面
│   │   ├── utils/
│   │   │   └── fetch.ts             # API 請求工具 (Axios)
│   │   ├── style/                   # 樣式設定
│   │   │   └── App.css              # CSS 樣式檔
│   └── package.json                 # 前端套件依賴
│
└── README.md                        # 專案文件
安裝與執行指引

1. 啟動後端
進入 backend 目錄，安裝依賴套件:
npm install
啟動後端伺服器:
npm run dev
預設伺服器運行在: http://localhost:7777
後端 API 規格:
刪除學生資料
Method: DELETE
URL: http://localhost:7777/api/v1/user/deleteById?id=<學生ID>
範例回應:
{
  "code": 200,
  "message": "success",
  "body": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
2. 啟動前端
進入 frontend 目錄，安裝依賴套件:
npm install
啟動前端專案:
npm run dev
預設前端運行在: http://localhost:5173
操作說明:
學生資料會顯示在網頁中，每筆資料旁有「刪除」按鈕。
點擊「刪除」按鈕後，該筆學生資料會被移除。
架構圖

前端 (React)  <->  後端 API (Node.js/Express)  <->  資料庫 (MongoDB)
API 測試指南 (Postman)

測試 刪除學生資料 功能:
URL: http://localhost:7777/api/v1/user/deleteById?id=<學生ID>
Method: DELETE
成功回應:
{
  "code": 200,
  "message": "success",
  "body": {
    "acknowledged": true,
    "deletedCount": 1
  }
}
失敗回應:
{
  "code": 500,
  "message": "server error"
}