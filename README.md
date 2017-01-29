# Any Infinite Scroll Userscripts

`any-infinite-scroll-userscripts` is a simple tool to quickly create userscripts that add infinite scroll functionally to any webpage.

The userscripts are generated from a template that only need very few lines of jQuery code to operate on different websites.

The resulting userscripts have been tested on firefox (via [greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)) and chrome (via [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)).

## Usage

Simply clone the project, install dependencies and use the `make.js` script.

```
$ git clone --depth 1 https://github.com/noc7c9/any-infinite-scroll-userscripts
$ cd any-infinite-scroll-userscripts
$ npm install
$ node make.js
Usage:
    node make.js INPUT_FILE [OUTPUT_FILE]
    node make.js --all [INPUT_DIR [OUTPUT_DIR]]
    node make.js -h | --help
```

The script allows building single files or a folder of files via the `--all` flag.

In order to make a build an implementation file is required. An implementation file is a simple javacript file that should contain the necessary details for a website.

An example implementation is provided for [Hacker News](https://news.ycombinator.com/) at [`implementations/hacker-news.js`](implementations/hacker-news.js).

## License

`any-infinite-scroll-userscripts` is licensed under the [MIT license](LICENSE.md).
