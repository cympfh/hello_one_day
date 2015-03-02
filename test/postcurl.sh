#!/bin/bash

URL=http://54.65.80.167

curl ${URL}/api/v1/shortenurl -H 'Content-Type: application/json' -d '{"LongUrl": "http://go-talks.appspot.com/github.com/kuma-san/slides/intern-2015-winter/main.slide#13"}'
