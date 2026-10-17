---
name: "Ink Language Server"
tagline: "An implementation of the Language Server Protocol for ink"
parent: "ink"
order: 3
technologies:
  - "c-sharp"
  - "typescript"
links:
  - kind: "website"
    href: "https://github.com/ephread/ink/tree/language-server/inklecate/LanguageServerProtocol"
    label: "Language Server on Github"
  - kind: "website"
    href: "https://github.com/ephread/ink-vscode"
    label: "VSCode extension on Github"
---

In 2018, I initially attempted to implement a language server using TypeScript.
However, I decided to abandon that early attempt and opted instead to build
the language server directly into inklecate, ink's compiler.

The current version is still a work in progress, but I'm excited about this
opportunity to learn and have fun while working on a Language Server
Protocol implementation.
