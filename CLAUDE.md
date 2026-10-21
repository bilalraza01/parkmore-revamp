@.context/CLAUDE.md

## Repo workflow

- This repo is connected to an unpublished Shopify theme through Shopify's GitHub integration (branch `main`). `git push` deploys; never use `shopify theme push` against that theme.
- Shopify commits theme editor changes back to `main`, so always `git pull` before editing.
- Preview locally with `shopify theme dev --store 4c7ims-33`.
- Ignite is on 2.3.0 in this repo (not 2.6.1 as the brief says); the update is deferred.
- Images are always Shopify-hosted (image_picker settings or CDN URLs), never base64.
