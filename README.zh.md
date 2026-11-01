![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)
![npm Version](https://img.shields.io/npm/v/wikitext2html)

# wikitext2html

`wikitext2html` 是一个简单，无依赖的MediaWiki Wikitext转HTML库。它可在浏览器或Node.js上使用。

## 安装

通过下列命令安装本库：

```shell
npm install wikitext2html
```

或

```shell
pnpm add wikitext2html
```

## 使用

### 基础

使用`wikitextToHtml()`API来渲染:

```javascript
import { wikitextToHtml } from "wikitext2html";

document.body.innerHTML = wikitextToHtml(`
== '''''标题 (粗斜体)''''' ==
* 列表
*# '''高级列表 (嵌套并附带斜体)'''
[https://example.com '''粗体外链''']
`);
```

### 选项

你可以通过在`wikitextToHtml()`的第二个参数提供选项对象来自定义本库的行为，关于选项的细节，参见[index.d.ts](/dist/index.d.ts)。

## 目前支持的语法

- 粗体
- 斜体
- 粗斜体
- 标题 (1-6级)
- 列表
- 高级列表
- 外链

### 下一代（预计在3个版本内实现）

- 内链 (可配置的基础地址)
- 表格

### 未来

- 语法高亮
- 模板
- 解析器函数
