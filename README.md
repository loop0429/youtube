# 環境構築
1. `yarn install`
2. `yarn watch`で開発  
最初、CSSが反映されないので、`style.scss`をテキトウに保存しなおす

# APIキーの取得
1. [Google API Console](https://console.developers.google.com/) にて、プロジェクトの作成
2. サイドバーの「ライブラリ」から「YouTube Data API v3」を検索して有効にする
3. サイドバーの「認証情報」から「認証情報を作成」→「APIキー」を選択
4. 表示されたAPIキーをLine3: `const API_KEY = 'YOUR_API_KEY'`の `YOUR_API_KEY` 部分に貼り付け