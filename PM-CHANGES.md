# Edits to Ignite's own files

All Parkmore work lives in `pm-*` files. This list is every change made to an Ignite file, so it can be re-applied after a theme update.

| File | Change | Why |
|---|---|---|
| `layout/theme.liquid` | Added `{%- render 'pm-head' -%}` on the line after `{{ 'base.css' \| asset_url \| stylesheet_tag: preload: true }}` | Loads Parkmore fonts, `pm-base.css` and `pm-base.js` after Ignite's base styles |
