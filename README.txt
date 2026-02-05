# Give縁 UI Mock

## セットアップ

### 1. MySQL 初期化

`database/init.sql` にスキーマとテストデータを用意しています。先にデータベースを作成してからインポートしてください。

```bash
mysql -u root -p -e "CREATE DATABASE give_en DEFAULT CHARACTER SET utf8mb4;"
mysql -u root -p give_en < database/init.sql
```

テストアカウント:

- 会員: `member@example.com` / `MemberPass123`
- 管理者: `admin@example.com` / `AdminPass123`

### 2. 環境変数 (DB / Stripe)

`api/config.php` でデフォルト値を設定しています。環境変数で上書きも可能です。

- `DB_HOST`
- `DB_NAME`
- `DB_USER`
- `DB_PASS`
- `STRIPE_PUBLIC_KEY`
- `STRIPE_SECRET_KEY`

### 3. 起動

PHP のビルトインサーバーを利用してください。

```bash
php -S localhost:8000
```

`http://localhost:8000/index.html` を開きます。

## 自動ログイン/リンク遷移

- URL に `status` が含まれる場合は、ログインに遷移せず、指定の画面へ直接遷移します。
  - `status` に `reset` が含まれる → 新パスワード入力
  - `status` に `expired` が含まれる → リンク期限切れ
  - `status` に `signup` / `verify` が含まれる → 詳細情報入力
- `token_giveen20260205` に Expo 通知トークン (`ExponentPushToken[...]` の中身) を渡すと、ログイン時に DB に保存し、セッション無しでも自動ログインに使用します。

例:

```
http://localhost:8000/index.html?token_giveen20260205=TESTEXPO123456
```
