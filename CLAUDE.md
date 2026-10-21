@.context/CLAUDE.md

## Repo workflow

- This repo is connected to an unpublished Shopify theme through Shopify's GitHub integration (branch `main`). `git push` deploys; never use `shopify theme push` against that theme.
- Shopify commits theme editor changes back to `main`, so always `git pull` before editing.
- Preview locally with `shopify theme dev --store 4c7ims-33`.
- Ignite is on 2.6.1 (same as the live theme), upgraded in git on 21 Oct 2026; revert point is tag `pre-ignite-2.6.1`. To upgrade again: replace Ignite's code dirs with the new version, keep `pm-*` files, templates, `settings_data.json` and section groups, re-apply `PM-CHANGES.md`, then validate templates against the new section schemas.
- Images are always Shopify-hosted (image_picker settings or CDN URLs), never base64.
- `pm-header` replaces Ignite's header (disabled in `sections/header-group.json`). Ignite's header also loaded site-wide assets (cart drawer/cart items/notification/search/menu-drawer CSS, `cart-drawer.js`) and homepage JSON-LD; `pm-header` must keep loading all of them. Before disabling any other Ignite section, check what assets and scripts it loads.
