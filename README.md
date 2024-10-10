## What is this?
Possibly the silliest thing I have ever created...  I needed something to power
me through annotating Asciinema sessions in Vim.

## How do I use?
1. Go [here](https://github.com/asciinema/asciinema-player/releases/latest) and
   grab the latest `asciinema-player.css` and `asciinema-player.min.js`.  Place
   them in the root of this repository.

2. `xdg-open index.html` (or `open index.html` if you're on a Mac).

3. PROFIT!!!!

## Bonus: Vim Macros!
### Step 1: Register plugin in your vimrc
Add the following lines to your `~/.vimrc`:

* For Vundle:
```vim
" My Librecode helpers
Plugin 'targetdisk/minitator'
au BufRead,BufNewFile *.annotated.head.json call minitator#macros()
```

* For Vim plug:
```vim
" My Librecode helpers
Plug 'targetdisk/minitator'
au BufRead,BufNewFile *.annotated.head.json call minitator#macros()
```

### Step 2: Install the plugin
Run the `:VundleInstall` command or the `:PlugInstall` command (for Vundle or
Vim Plug, respectively).

### Step 3: PROFIT!
There is no step three!!!
