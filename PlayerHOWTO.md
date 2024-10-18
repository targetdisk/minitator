# Minitator Web Player HOWTO

![Minitator's web UI viewing a shell session running the Minitator Vim plugin](https://sqt.wtf/~targetdisk/blob/minitator-yo-dawg.png)

The Minitator web player UI is a simple self-contained page (or web "app," if
you prefer) that hosts the Asciinema WASM web player for ease-of-annotating
while using one of the supported editor plugins (see the [README](README.md) for
a list of supported editor plugins).

The web player UI is very simple with only the features it needs to have to help
you to annotate as quickly as possible!

## USING
### 1: Open Minitator
Before you can use the player UI, you'll need to ensure that you've followed the
initial setup steps in the [README](README.md).  Assuming that is all done, load
up the `index.html` page contained in this repository in your web browser.  You
can open it from your Finder/Explorer/filer, the `Open` command of your web
browser, or use the `open`/`start`/`xdg-open` command from your command-line.
It makes no difference.

### 2: Load an Asciinema file
Load an Asciinema file by pressing the `Choose File` button in the web UI.
Browse using the file selection dialog for the shell session you want to
annotate.  Unless you're streaming off of a *really slow* network filesystem
most files should load in under a second.

### 3: Scrub around and get annotating!
As soon as you click the player it should be focused and begin playing.  See
the `KEY SHORTCUTS` section below to efficiently control the player widget.  If
ever the shortcuts stop working, try clicking on the player widget to give it
back focus.  If that doesn't work, please
[file an issue on GitHub](https://github.com/targetdisk/minitator/issues).

## KEY SHORTCUTS
[Here](https://docs.asciinema.org/manual/player/shortcuts/) is a list of
built-in shortcuts included with the Asciinema web player.

There is one additional keyboard shortcut included with Minitator:

| Key | Description | Function |
| --- | ----------- | -------- |
| `Any` | Any key mapped by the [core Asciinema keyboard shortcuts](https://docs.asciinema.org/manual/player/shortcuts/) | Refreshes timestamp table |

--------------------------

### Browser-specific notes
| Qutebrowser |
| ----------- |
| If the keyboard shortcuts don't work, make sure you are in `INSERT` mode by pressing the `i` key on your keyboard. |
