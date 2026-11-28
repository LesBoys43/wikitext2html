![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)
![npm Version](https://img.shields.io/npm/v/wikitext2html)

# wikitext2html

`wikitext2html` is a simple, dependency-free MediaWiki Wikitext to HTML renderer. It can be used in a browser or Node.js.

## Install

Install this package with the following command:

```shell
npm install wikitext2html
```

OR

```shell
pnpm add wikitext2html
```

## Usage

### Basics

Use the `wikitextToHtml()` API to render:

```javascript
import { wikitextToHtml } from "wikitext2html";

document.body.innerHTML = wikitextToHtml(`
== '''''Title (both bold and italic)''''' ==
* List
*# '''Advanced list (italic & nested)'''
[https://example.com '''bold url''']
`);
```

### Options

You can provide an option object to the second argument of `wikitextToHtml()` to customize library behavior. Check details about options at [index.d.ts](/dist/index.d.ts).

## Currently supported syntaxes

- Bold
- Italic
- Bold & Italic
- Titles (Level 1 to 6)
- Lists
- Advanced lists
- External URL
- Internal link (configurable template)

### Next (Expected to be implemented within 3 versions)

- Tables

### Future

- Syntax highlights
- Templates
- Parser functions
