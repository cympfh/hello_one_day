
test_:
	for f in test/*.js; do node $$f; done

git:
	git add -A .
	git commit -m "`date`"
	git push
