let s:bindir = expand('<sfile>:p:h:h') . '/bin/'

function minitator#fourspace()
    set expandtab tabstop=4 shiftwidth=4
endfunction

function minitator#headdy()
  let l:exe = s:bindir . 'headdy'

  let l:cmdout = systemlist(exe . " " . @%)

  for l:line in l:cmdout
    echom "headdy:" l:line
  endfor
  if v:shell_error == 0
    echom "headdy: success"

    execute 'vsplit ' . l:cmdout[-1]
  else
    echom "headdy: failed with code" v:shell_error
  endif
endfunction

function minitator#conjoin()
  let l:exe = s:bindir . 'conjoin'

  let l:cmdout = systemlist(exe . " " . @%)

  for l:line in l:cmdout
    echom "conjoin:" l:line
  endfor
  if v:shell_error == 0
    echom "conjoin: success"

    execute 'vsplit ' . l:cmdout[-1]
  else
    echom "conjoin: failed with code" v:shell_error
  endif
endfunction

function! minitator#macros()
  call minitator#fourspace()

  let @b = 'o"librecode_annotations" : {"note" : "librecode annotations","version" : 1,"layers" : [{"annotations" : []}]},'
  let @l = 'A,{"annotations": []}€ý5'
  let @t = 'A,"title": ""€ý5'
  let @a = 'o{"beginning": ,"end": ,"text": ""}€ý5'
  let @s = 'A,{"beginning": ,"end": ,"text": ""}€ý5'
endfunction
