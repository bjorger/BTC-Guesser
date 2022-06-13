build-createUserFunction:
	npm install
	npm rebuild
	npm run lint
	npm run fast-compile
	npm run fast-test
	npm prune --production
ifeq ($(OS),Windows_NT)
	Xcopy /E * $(ARTIFACTS_DIR)
else
	cp -R * $(ARTIFACTS_DIR)
endif

build-loginUserFunction:
	npm install
	npm rebuild
	npm run lint
	npm run fast-compile
	npm run fast-test
	npm prune --production
ifeq ($(OS),Windows_NT)
	Xcopy /E * $(ARTIFACTS_DIR)
else
	cp -R * $(ARTIFACTS_DIR)
endif

build-placeGuessFunction:
	npm install
	npm rebuild
	npm run lint
	npm run fast-compile
	npm run fast-test
	npm prune --production
ifeq ($(OS),Windows_NT)
	Xcopy /E * $(ARTIFACTS_DIR)
else
	cp -R * $(ARTIFACTS_DIR)
endif

build-evaluateGuessFunction:
	npm install
	npm rebuild
	npm run lint
	npm run fast-compile
	npm run fast-test
	npm prune --production
ifeq ($(OS),Windows_NT)
	Xcopy /E * $(ARTIFACTS_DIR)
else
	cp -R * $(ARTIFACTS_DIR)
endif