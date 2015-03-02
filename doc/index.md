# README

../README.md

# 環境

`node.js (version 0.10.x)` を今回、サーバの環境とした。
そのモジュールとして、 `express4` を主に用いて、構築されている。

# url と idとの対応付け

任意の文字列 `url`
に対して、文字を、[0-9a-z] に制限したような文字列 `id`
を紐付ける。
この `id` を用いて、短縮url として、
`http://54.65.80.167/id`
が有効な url となり、
これを、`id` に紐付けられた `url` に、リダイレクトする。

## id の生成

shorten のリクエストが来た順に、
`url`に、0-indexedで自然数を与えることによって、
`url`と `index` との対応付けがなされる。
`index` は、node環境で63-bit 整数である。
これを、36進数で表現したものを、`id`と呼ぶ。
したがって、`id` は、`/[0-9a-z]+/` によって表現される言語である。

# データベース

適切なデータベースとして、node.js と親和性の高い MongoDBが検討されるところであったが、
限られた時間で動かせなかったので、
今回は、jsonファイル一つをデータベースとして用いることにした。

jsonは、一つの配列になっており、その要素は、短縮がなされる前のurlを表現するオブジェクトである。
urlと対応附く index が、配列のアクセスインデックスになる。

```javascript
[{"url":"http://go-talks.appspot.com/github.com/kuma-san/slides/intern-2015-winter/main.slide#12","timestamp":1418456660075},
 {"url":"http://go-talks.appspot.com/github.com/kuma-san/slides/intern-2015-winter/main.slide#13","timestamp":1418456670605}]
```

shortenリクエストが来るタイミングで、
データベースの更新がなされる。
擬似的なSTMによって、
更新の衝突、
また、更新前の参照 (リダイレクト時) を防ぐ。

この性質は、同時なアクセスを処理することと共に、
配列の順序がurlと対応付いてることから必要である。

