vagrea2015-bar-qnl
==================

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

access to `http://${machine-IP}/DB`

