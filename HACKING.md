# HACKING

This project includes a `gmake` makefile.  It assumes you will be building
the Asciinema web player from source.  Do do so, you will need to install some
dependencies.

## Dependencies
### Make
It is assumed you have GNU `make` installed on your system.  You'll need it to
use the provided makefile for easy HACKING.

### NodeJS
After that, you'll need to install NodeJS.  You can get it by installing the
`nodejs` package on both Arch and Debian.

### Rust Wasm Toolchain
You will need to install the WebAssembly toolchain for Rust.

#### Arch
Your OS has new enough packages to use for this project!  Yay!  Install them by
running `pacman` like so:
```
# pacman -S rust-wasm
```

#### Debian
Your OS has old packages: figure out how to get
[Rust installed with Rustup](https://www.rust-lang.org/tools/install), then use
the `rustup` command like so:
```
$ rustup target add wasm32-unknown-unknown
```

## Finally, HACKING
Build the Asciinema player with `make`:
```
$ make player
```

If you want to open an instance of the Minitator web UI, you can run:
```
$ make ui
```

## SEE ALSO
* [The Asciinema player NPM page](https://www.npmjs.com/package/asciinema-player)
* [Asciinema's "Quick start" guide](https://docs.asciinema.org/manual/player/quick-start/)
