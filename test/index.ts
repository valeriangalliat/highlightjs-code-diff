// Need to disable this rule for `test` calls that return a promise
// but apparently are not supposed to be `await`ed in `node --test`?
/* eslint-disable @typescript-eslint/no-floating-promises */

import test from 'node:test'
import assert from 'node:assert'
import hljsOrig from 'highlight.js'
import hljsCodeDiff from '../src'

const hljs = hljsCodeDiff(hljsOrig)

test('Works', () => {
  const { value } = hljs.highlight(` function helloWorld () {
-  return 'Hello'
+  return 'Hello, world!'
 }
`, { language: 'diff:js' })

  assert.strictEqual(value, ` <span class="hljs-keyword">function</span> <span class="hljs-title function_">helloWorld</span> () {
<span class="hljs-deletion">-  <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Hello&#x27;</span></span>
<span class="hljs-addition">+  <span class="hljs-keyword">return</span> <span class="hljs-string">&#x27;Hello, world!&#x27;</span></span>
 }
`)
})
