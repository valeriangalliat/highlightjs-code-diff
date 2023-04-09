# 🐠 highlightjs-code-diff [![npm version](https://img.shields.io/npm/v/highlightjs-code-diff?style=flat-square)](https://www.npmjs.org/package/highlightjs-code-diff)

> Highlight both diff and code syntax with [highlight.js]!

[highlight.js]: https://highlightjs.org/

## Overview

Do you use [highlight.js]? Did you ever [wish you could](https://github.com/highlightjs/highlight.js/issues/480)
highlight a diff together with its underlying language?

E.g. if the following example had actual JavaScript syntax highlighting
on top of the diff red/green lines?

```diff
 function helloWorld () {
-  return 'Hello'
+  return 'Hello, world!'
 }
```

This is now possible with **highlightjs-code-diff**! This module wraps
highlight.js to add support for language-specific diffs. Simply prefix
your `language` parameter with `diff:`, e.g. `diiff:js` and you're good
to go!

## Things to know

* It currently only works for basic diffs where the first column is
  either a space, a `+` or a `-`. It doesn't support diff headers and
  markers yet.
* It only works for `hljs.highlight` with an explicit `diff:` language.
  There's no autodetection of the diffs inner language in
  `hljs.highlightAuto`.
* I didn't test how it behaves when the diff boundaries cut the
  underlying language in places that makes it syntactically broken, e.g.
  cutting the start or end of a function, loop, unmatched braces,
  parens tags, etc. I assume this is why most highlighting tools don't
  typically highlight the underlying language of diffs, because they
  would need access to the syntactically correct context of both sides
  of the diff in order to highlight properly.

## Usage

```sh
npm install highlightjs-code-diff
```

```js
import hljsOrig from 'highlight.js'
import hljsCodeDiff from 'highlightjs-code-diff'

const hljs = hljsCodeDiff(hljsOrig)
```

Then use `hljs` as you normally would. It will pick up `diff:` syntaxes!

```js
const code = ` function helloWorld () {
-  return 'Hello'
+  return 'Hello, world!'
 }
`

const { value } = hljs.highlight(code, { language: 'diff:js' })
```
