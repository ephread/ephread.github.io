---
name: "ink language server"
tagline: "An implementation of the Language Server Protocol for ink"
parent: "ink"
order: 3
technologies:
  - "c-sharp"
  - "typescript"
links:
  - kind: "website"
    href: "https://github.com/ephread/ink/tree/language-server/inklecate/LanguageServerProtocol"
    label: "Language server"
  - kind: "website"
    href: "https://github.com/ephread/ink-vscode"
    label: "VS Code extension"
---

In 2018, I started writing a language server for ink in TypeScript. I later dropped that first attempt and built the language server directly into inklecate, ink’s compiler, along with a VS Code extension that uses it.

It never got past the work-in-progress stage, but it was a great way to learn how the Language Server Protocol works.
