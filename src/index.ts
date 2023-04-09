import { HighlightResult, HighlightOptions, HLJSApi } from 'highlight.js'

export = function hljsCodeDiff (hljs: HLJSApi): HLJSApi {
  function highlight (code: string, options: HighlightOptions): HighlightResult {
    if (!options.language.startsWith('diff:')) {
      return hljs.highlight(code, options)
    }

    const actualLanguage = options.language.slice('diff:'.length)
    const diffLines = code.split('\n')
    const codeWithoutDiffMarkers = diffLines.map(line => line.slice(1)).join('\n')

    const result = hljs.highlight(codeWithoutDiffMarkers, { ...options, language: actualLanguage })
    const highlightedLines = result.value.split('\n')

    if (highlightedLines.length !== diffLines.length) {
      // Output lines didn't match input, this is unexpected, fall back to plain diff
      console.warn('[highlightjs-code-diff] failed to highlight because of line count mismatch')
      return hljs.highlight(code, { ...options, language: 'diff' })
    }

    const codeDiff = highlightedLines.map((line, i) => {
      const diffMarker = diffLines[i].slice(0, 1)

      switch (diffMarker) {
        case '+': return `<span class="hljs-addition">+${line}</span>`
        case '-': return `<span class="hljs-deletion">-${line}</span>`
        default: return `${diffMarker}${line}`
      }
    }).join('\n')

    return {
      ...result,
      code,
      value: codeDiff,
      language: options.language
    }
  }

  return {
    ...hljs,
    highlight (codeOrLanguageName: string, optionsOrCode: string | HighlightOptions, ignoreIllegals?: boolean): HighlightResult {
      return typeof optionsOrCode === 'string'
        ? highlight(optionsOrCode, { language: codeOrLanguageName, ignoreIllegals })
        : highlight(codeOrLanguageName, optionsOrCode)
    }
  }
}
