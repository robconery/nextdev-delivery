build:
	npm run build -- --preset=firebase

deploy:
	firebase deploy 

go: build deploy

.PHONY: build deploy go