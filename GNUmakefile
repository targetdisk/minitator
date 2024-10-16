PLAYER_SRC ?= modules/asciinema-player

UNAME := $(shell uname)
ifeq ($(UNAME),Darwin)
	OPEN=open
else ifeq ($(OS),Windows_NT)
	OPEN=start
else
	OPEN=xdg-open
endif

ui: player
	$(OPEN) index.html

$(PLAYER_SRC)/package.json: .gitmodules
	git submodule update --init --recursive -- $(PLAYER_SRC)

$(PLAYER_SRC)/node_modules: $(PLAYER_SRC)/package.json
	cd $(PLAYER_SRC) && npm install

$(PLAYER_SRC)/dist/index.js: $(PLAYER_SRC)/node_modules
	cd $(PLAYER_SRC) && npm run build

$(PLAYER_SRC)/dist/bundle/asciinema-player.js: $(PLAYER_SRC)/dist/index.js
	cd $(PLAYER_SRC) && npm run bundle

$(PLAYER_SRC)/dist/bundle/asciinema-player.min.js: $(PLAYER_SRC)/dist/bundle/asciinema-player.js

$(PLAYER_SRC)/dist/bundle/asciinema-player.css: $(PLAYER_SRC)/dist/bundle/asciinema-player.js

asciinema-player.css: $(PLAYER_SRC)/dist/bundle/asciinema-player.css
	cp $< $@

asciinema-player.min.js: $(PLAYER_SRC)/dist/bundle/asciinema-player.min.js
	cp $< $@

player: asciinema-player.css asciinema-player.min.js

clean:
	git submodule deinit -f $(PLAYER_SRC)
	rm -fr asciinema-player.css asciinema-player.min.js README.html HACKING.html

.PHONY: player clean README HACKING

### README #####################################################################

pandoc.css:
	wget https://sqt.wtf/~targetdisk/pandoc.css

# Requires Pandoc to be installed
README.html: README.md pandoc.css
	pandoc $< -s -c pandoc.css -o $@

README: README.html
	$(OPEN) $<

HACKING.html: HACKING.md pandoc.css
	pandoc $< -s -c pandoc.css -o $@

HACKING: HACKING.html
	$(OPEN) $<
