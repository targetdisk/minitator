# Minitator Vim Plugin HOWTO
Minitator includes a Vim plugin for helping you power through annotating
Asciinema shell sessions in Vim!  It is assumed that this plugin will also
work in Neovim, but I do not use Neovim...

If you are new to Vim I'd recommend taking a look at at least the first few
sections of [vimtutor](https://vimschool.netlify.app/introduction/vimtutor/),
then perusing [this guide on window management in Vim](https://jitesh117.github.io/vim_stuff/buffers-windows-and-tabs-in-vim/).

## INSTALLING
### Step 1: Register plugin in your vimrc
Add the following lines to your `~/.vimrc` or into your Neovim configuration:

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

* For Lazy (Neovim-Only):
```lua
{
    -- My Librecode helpers
    'targetdisk/minitator',
    config = function ()
        vim.api.nvim_create_autocmd({"BufRead", "BufNewFile"}, {
                pattern = {"*.annotated.head.json"},
                command = "call minitator#macros()",
                })
    end
},
```

### Step 2: Install the plugin
Run the `:VundleInstall`, `:PlugInstall` commands or the `:Lazy` command (for
Vundle, Vim Plug, or Lazy, respectively).

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

Find the first input (`"i"` after the timestamp in the `[]`) where the user
starts typing the command that you want to annotate.  Note the timestamp, and
convert it from seconds to milliseconds by **truncating** it to the nearest
millisecond (move the decimal point to the right three places and discard
everything after the decimal place):

<table>
    <thead>
        <th scope="col">Annotation in your editor buffer</th>
        <th scope="col">Asciinema buffer</th>
    </thead>
    <tbody>
<td>
```json
{
    "beginning": 2329,
    "end": ,
    "text": ""
}
```
</td>
<td>
```
{"version": 2, "width": ... }
[0.016466, "o", "stonkbad:minitator anon$ "]
[2.329086, "i", "e"]
[2.329252, "o", "e"]
[2.649085, "i", "c"]
[2.649257, "o", "c"]
[2.809009, "i", "h"]
[2.809164, "o", "h"]
[2.976932, "i", "o"]
[2.977057, "o", "o"]
...
```
</td>
</tbody>
</table>

For the `end` timestamp, you want the time immediately after the shell is handed
back to the user.  The easiest way to do this is to just to round the
timestamp of the next shell prompt's "output" up to the next millisecond:

<table>
    <thead>
        <th scope="col">Annotation in your editor buffer</th>
        <th scope="col">Asciinema buffer</th>
    </thead>
    <tbody>
<td>
```json
{
    "beginning": 2329,
    "end": 5058,
    "text": ""
}
```
</td>
<td>
```
...
[5.057055, "i", "\r"]
[5.057205, "o", "\r\n"]
[5.057243, "o", "\u001b[?2004l\rhello\r\n"]
[5.057361, "o", "stonkbad:minitator anon$ "]
...
```
</td>
</tbody>
</table>

Fill in the `text` field according to the
[annotation procedures document](Annotation-Procedures-indev.md).  Be sure to
escape newlines as `\n` and quotes as `\"`.  For instance, if the user typed
`echo hello` and the shell returned `hello`, you might annotate it like so:

```json
{
    "beginning": 2329,
    "end": 5058,
    "text": "Goal: Print \"hello\" to the terminal.\nTool: The \"echo\" shell builtin.\nResult: successResult"
}
```

This would store the following as `text`:
```
Goal: Print the string "hello" to the terminal.
Tool: The "echo" shell builtin.
Result: successResult
```

> <h4>NOTE:</h4>
> In the near future, Minitator's Vim plugin will include an easier to use
> `text` editor that won't require escaping things for JSON!

### 3: Adding Timeline Layers
Over the course of annotating, you'll often encounter sessions within sessions,
subtools used by tools, or secrets (see the
[annotation procedures document](Annotation-Procedures-indev.md) for more on
this).  These necessitate additional timeline layers.  For instance, if the
session invokes SSH and runs commands interactively in the remote shell, you'll
want to use another timeline.  You can accomplish this simply with the `@l`
macro:

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
               "annotations": [
                   {
                       "beginning": 1954,
                       "end": 14284448,
                       "text": "Goal: Log into..."
                   }
               ]
           } 🔛
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
                       "beginning": 1954,
                       "end": 14284448,
                       "text": "Goal: Log into..."
                   }
               ]
           },
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

To help distinguish between layers in your annotation, you can give them
`title`s with the `@t` macro:

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
               "annotations": [
                   {
                       "beginning": 1954,
                       "end": 14284448,
                       "text": "Goal: Log into..."
                   }
               ] 🔛
           },
           {
               "annotations": [
                   {
                       "beginning": 18475,
                       "end": 123377,
                       "text": "Goal: Update..."
                   }
               ] 🔛
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
                       "beginning": 1954,
                       "end": 14284448,
                       "text": "Goal: Log into..."
                   }
               ],
               "title": "Recording system shell"
           },
           {
               "annotations": [
                   {
                       "beginning": 18475,
                       "end": 123377,
                       "text": "Goal: Update..."
                   }
               ],
               "title": "demo@10.0.7.138 shell"
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

### 4: Making your second annotation
You can use the `@s` macro to add subsequent macros after the first without
having to type the comma after the first annotation's `{}` block:
<table>
    <thead>
        <th scope="col">Before</th>
        <th scope="col">After</th>
    </thead>
    <tbody>
<td>
```json
...
       "layers": [
           {
               "annotations": [
                   {
                       "beginning": 1954,
                       "end": 14284448,
                       "text": "Goal: Log into..."
                   } 🔛
               ],
               "title": "Recording system shell"
           },
...
```
</td>
<td>
```json
...
       "layers": [
           {
               "annotations": [
                   {
                       "beginning": 1954,
                       "end": 14284448,
                       "text": "Goal: Log into..."
                   },
                   {
                       "beginning": ,
                       "end": ,
                       "text": ""
                   }
               ],
               "title": "Recording system shell"
           },
...
```
</td>
</tbody>
</table>

### 5: Conjoining your annotations to the Asciinema input
Once you're finished writing your annotations, you'll need to combine your
annotated JSON metadata with the original Asciinema input to form one final
annotated output file.  You do this by calling `minitator#conjoin()`:
```
:call minitator#conjoin()
```

The final combined output will open in a `vsplit` buffer for final review.  If
it looks good, send it in and move on to annotating the next shell session!
