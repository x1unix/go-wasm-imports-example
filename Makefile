GO ?= go
NODE ?= node
NPM ?= npm
GOROOT ?= $(shell $(GO) env GOROOT)

.PHONY: run
run:
	$(NODE) ./main.mjs

.PHONY: build
build: deps wasm-exec.js textflag.h
	GOOS=js GOARCH=wasm $(GO) build -o main.wasm .

.PHONY: deps
deps:
	@if ! [ -d node_modules ]; then $(NPM) install; fi

.PHONY: wasm-exec.js
wasm-exec.js:
	@cp -f -v $(GOROOT)/misc/wasm/wasm_exec.js .

.PHONY: textflag.h
textflag.h:
	@cp -f -v $(GOROOT)/src/runtime/textflag.h .

