# Minitator Vim Plugin HOWTO
Minitator includes a Vim plugin for helping you power through annotating
Asciinema shell sessions in Vim!  It is assumed that this plugin will also
work in Neovim, but I do not use Neovim...

If you are new to Vim I'd recommend taking a look at at least the first few
sections of [vimtutor](https://vimschool.netlify.app/introduction/vimtutor/),
then perusing [this guide on window management in Vim](https://jitesh117.github.io/vim_stuff/buffers-windows-and-tabs-in-vim/).

## INSTALLING
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

## USING
### A word on macros
The bulk of the Vim plugin's functionality is implemented using
[macros](https://vim.fandom.com/wiki/Macro).  Many of them require the cursor
to be in a specific position to use them.  To make this document easier to
understand, the following symbols are used throughout this guide:

| Symbol | Meaning |
| ------ | ------- |
| ←      | The cursor must be *exactly* where the arrow is. |
| 🔛     | The cursor can be *anywhere* on the same line as this symbol. |

The remainder of this guide will describe the workflow.  Sections that use
macros will make use of symbols in the table above.

### 1: Beginning an annotation
First, open the Asciinema recording you wish to edit in your editor.  With the
file open, `:call` the `minitator#headdy()` function:

```
:call minitator#headdy()
```

The pretty-printed JSON should now open in a new `:vsplit` buffer.  See
[this page](https://jitesh117.github.io/vim_stuff/buffers-windows-and-tabs-in-vim/)
for instructions on how to move back and forth between the new buffer and the
Asciinema recording buffer.  From this point on in the guide you are expected to
know how to move back and forth between buffers on your own.

In the new pretty-printed buffer, you'll need to use the `@b` macro to insert
the `librecode_annotations` block:

<table>
    <thead>
        <th scope="col">Before</th>
        <th scope="col">After</th>
    </thead>
    <tbody>
<td>
```json
{
   "env" : {
      "SHELL" : "/bin/bash",
      "TERM" : "xterm"
   },
   "height" : 92, 🔛
   "timestamp" : 1727116219,
   "version" : 2,
   "width" : 319
}
```
</td>
<td>
```json
{
   "env" : {
      "SHELL" : "/bin/bash",
      "TERM" : "xterm"
   },
   "height" : 92,
   "librecode_annotations" : {
       "note": "librecode annotations",
       "version": 1,
       "layers": [
           {
               "annotations": [
               ]
           }
       ]
   },
   "timestamp" : 1727116219,
   "version" : 2,
   "width" : 319
}
```
</td>
</tbody>
</table>

Now that your editor is ready to start annotating, it's time to open the
Minitator web player UI.  Open the `index.html` file in your web browser of
choice (I like Qutebrowser, but Chromium/Firefox with the *optional* Vimium
plugin work well, as well).  See [this document](PlayerHOWTO.md) for more
information on using the Minitator web player UI.

### 2: Making your first annotation
Great! You're now ready to annotate! 🎉  You begin to play the shell session
in the web UI player and encounter something that you need to jot down. You
pause the player, go back before the place where the event occurs by rewinding
to before the event you want to annotate occurs using the `←` key, and go
Asciinema "frame" by "frame" using the `.` key to approximately when
the event you want to annotate occurs.  Press the `Any` key in the web player to
refresh the timestamp in its table.  (See [the PlayerHOWTO](PlayerHOWTO.md) for
more information.)

With the approximate timestamp in the web player table, shift your focus to your
Vim editor.  Move to your cursor to the layer where you'd like to add an
annotation and use the `@a` like so:
<table>
    <thead>
        <th scope="col">Before</th>
        <th scope="col">After</th>
    </thead>
    <tbody>
<td>
```json
{
   "env" : {
      "SHELL" : "/bin/bash",
      "TERM" : "xterm"
   },
   "height" : 92,
   "librecode_annotations" : {
       "note": "librecode annotations",
       "version": 1,
       "layers": [
           {
               "annotations": [ 🔛
               ]
           }
       ]
   },
   "timestamp" : 1727116219,
   "version" : 2,
   "width" : 319
}
```
</td>
<td>
```json
{
   "env" : {
      "SHELL" : "/bin/bash",
      "TERM" : "xterm"
   },
   "height" : 92,
   "librecode_annotations" : {
       "note": "librecode annotations",
       "version": 1,
       "layers": [
           {
               "annotations": [
                   {
                       "beginning": ,
                       "end": ,
                       "text": ""
                   }
               ]
           }
       ]
   },
   "timestamp" : 1727116219,
   "version" : 2,
   "width" : 319
}
```
</td>
</tbody>
</table>

Move to the initial buffer with the full Asciinema output and search for the
approximate timestamp in `SECONDS` you found by going frame-by-frame in the
player:
```
/^\[SECONDS
```
