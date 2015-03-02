intern2015-one-day
==================

課題
===
1. URL短縮サービスを作る
    - 短縮するAPI
    - リダイレクト機能 (短縮されたurlへのアクセス) (308でやる)
2. テストコード、速度、とかとか
3. ドキュメントの作成

[詳細スライド](http://go-talks.appspot.com/github.com/kuma-san/slides/intern-2015-winter/main.slide)

# server

```
IP: 54.65.80.167
PORT: 80
```

# dependency

- node (v0.10+)
- node modules

## node modules

npm command resolves all modules

```bash
$ pwd
/home/ubuntu/RHDDB7
$ npm install
```

## test

```bash
$ npm test
```

## start server

```bash
$ pwd
/home/ubuntu/RHDDB7
$ sudo npm start
```

SIGINT (C-c) kills this.

# API usage

This service has two functions.

- shorten
- expand (redirect)

## shorten

POST to shorten

```bash
curl http://54.65.80.167/api/v1/shortenurl \
  -H 'Content-Type: application/json' \
  -d '{"LongUrl": "http://none.jp/"}'
```

sample response

```bash
{"ShortUrl":"http://54.65.80.167/rt","Created":1418455295391,"LongUrl":"http://none.jp/"}%
```

## expand (redirect)

```
$ curl http://54.65.80.167/rt
<html><body>redirect to http://none.jp/

$ curl -w "%{http_code} " http://54.65.80.167/rt
<html><body>redirect to http://none.jp/308 
```

Try on your browser.

# /DB (debug command)

`http://54.65.80.167/DB`
