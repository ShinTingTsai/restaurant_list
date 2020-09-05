# 我的餐廳清單
一個使用Express 與 Node.js + Express-Handlebars 開發的餐廳推薦網站

![image](https://github.com/ShinTingTsai/restaurant_list/blob/master/images/snapshot_login.png)

![image](https://github.com/ShinTingTsai/restaurant_list/blob/master/images/snapshot_home.png)

## 功能

- 在首頁看到所有餐廳與簡單資料
- 點擊餐廳可以再查看餐廳的詳細資訊
- 提供搜尋功能，可以依照餐廳名稱或餐廳類別來找到特定餐廳
- 使用者可以新增、修改、刪除餐廳資訊
- 新增必填欄位: 地址、電話、簡介、評價 (NEW)
- 評價可以輸入小數下一位，限定數字 (NEW)
- 修改頁面，類別的下拉式選單以及評價可以顯示原設定值 (NEW)

## 環境建置與需求
- Node.js v10.15.0
- Express v4.17.1
- Express-Handlebars v4.0.4
- Body-parser: v1.19.0
- mongoose: v5.9.14
- method-override: v3.0.0


## 安裝與執行步驟
- 下載專案到本機 (Clone repository to your local computer)
```
git clone https://github.com/ShinTingTsai/restaurant_list.git
```
- 切至專案資料夾
```
cd restaurant_list
```
- 建立環境變數檔案(.env)
```
參考.env.example，裡面有需要的環境變數。
建立自己的.env
```
- 安裝套件 (Install by npm)
```
npm install
```
- 產生種子資料 (Generate seed data)
```
npm run seed
```
- 開啟程式 (Execute application)
```
npm run dev
```
- 請至http://localhost:3000開始使用程式 ( Access application by browser)
```
http://localhost:3000
```


## 開發人員
Shin-Ting Tsai
