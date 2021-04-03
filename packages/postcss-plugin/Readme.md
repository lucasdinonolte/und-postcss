# (WIP) @und-css/postcss-plugin 💅

---
**:fire: Note this is early WIP! There might be breaking changes on our way to a stable 1.0.0 release. It is not recommended to use this for anything serious yet.**
---

The und-css postcss plugin allows to quickly scaffold design systems. Think of
it as a meta-design-system, that just provides infrastructure to manage your
design system. It works sort of approach-agnostic and allows you to work with
whatever CSS methodology you prefer (component-based vs. utility-only).

## What's included?
- und-css-core: Token and Utility Management
- postcss-nested: SCSS-like nesting in your CSS
- postcss-custom-media: Custom Media Queries (as per CSS WG Working Draft) in your CSS today

## Technical Details
At its core und-css is only a container for registering style generators that
will implement token management and build utility classes from a given config.
und-css comes with built-in generators for colors, spaces, widths and
typography, but you can easily extend und-css by providing your own generators.

## Config
See `src/config.js` for an example config. To pass your own config, you can add
it as a parameter in your postcss.config

See `../demo/postcss.config.js` for more details.

```js
plugins: [
  undCss({
    // Your config goes here
  })
]
```

## Breaking changes from `und-css`
- Changed custom property naming scheme (might change again on the way to 1.0.0)
- No `@include respond-to` helper for your breakpoints. Use `@media (--sm)` instead
