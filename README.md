# React(vite) + LaravelでTwitterみたいなの作った

**投稿日:** 2024年11月22日

**著者:** [@daichi2007](https://qiita.com/daichi2007)

**タグ:** `Laravel`, `React`

---

## Biography

* **URL:** [http://choishoi.site](http://choishoi.site)
* **ログイン情報:**
* **email:** `demo@example.com`
* **password:** `password`


* **GitHub:**
* **バックエンド:** [https://github.com/yamaneko05/server](https://github.com/yamaneko05/server)
* **フロントエンド:** [https://github.com/yamaneko05/client](https://github.com/yamaneko05/client)



## 概要

誰でも登録可能で短文の投稿、いいね、コメントができるSNSサービスです。
いいね、コメント、フォロー、通知など基本的なSNSとしての機能を実装しました。

## 使用技術

### フロントエンド

* Tailwindcss, Shadcn-ui, lucide
* axios, react-query, react-router-dom, react-hook-form, zod, laravel-echo

### バックエンド

* Laravel
* Sanctum (SPAに対する認証, セッション管理ライブラリ)
* Breeze (認証周りの機能を自動生成してくれるライブラリ)
* Pusher (プッシュ配信)

### その他

* MySQL, XServer VPS, Git, htaccess, Ubuntu

## 経緯

Reactなどフロントエンド周りの学習の成果物として何かWebサービスを開発したいと思い、より身近に感じるもので多くの機能を実装できる拡張性のあるものとして考えたときにTwitterのようなSNSが良いと思い、開発に至りました。

## 苦労したこと

### VPSでの本番環境構築, プッシュ配信

メッセージ機能にてリアルタイムでのプッシュ配信を実装したいと思い、Laravelのbroadcast, Pusherを用いて実装しました。
しかし、レンタルサーバーではプッシュ配信を処理するプロセスを常時実行することができなかったため、VPSにて環境の構築をしました。
VPSの環境構築ではUbuntuにPHP, Apache, FTPサーバーのインストールなどの工程をすべてCGI上で行わなければならなかったので大変でした。

### ディレクトリ構成のパターン選定

Laravelと比べてディレクトリ構成の自由度が高かったので、自分にとってしっくりくる方法を探すのが大変でした。
最終的には、[bulletproof-react](https://github.com/alan2207/bulletproof-react) で採用されている `features` というフォルダで機能ごとに `hooks`, `components`, `api` などのフォルダを作る方法を採用しました。コードの管理がしやすく、依存関係の宣言文が揃いやすく美しいと感じました。

### 状態管理・APIデータの再フェッチ・APIデータのキャッシュ

ログイン状態やログイン中のユーザー情報などの状態管理や、APIから取得したデータとフロントエンド側のstoreとの連携に苦戦しました。
当初はRecoilを導入してみましたが、`react-query` のキャッシュ機能や `invalidate` を使うことで無駄なフェッチングやレンダリングを防げることがわかり、最終的に `react-query` のみで解決しました。`react-query` の機能には非常に感動しました。

### CORS

HTTPヘッダーに `with-credentials` を設定したり、APIサーバー側でクライアントのURLを指定したりなど、LaravelのみでのMPA開発では不要な工程について学習する際、最初は少し戸惑いました。
