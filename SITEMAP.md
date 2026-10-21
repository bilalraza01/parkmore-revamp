# parkmoresupplements.com sitemap

Every public URL on the live store, grouped by the theme template that renders it, with revamp status.
Source: the store's `sitemap.xml`, plus links found in the live header and footer, crawled 21 Oct 2026.

**Totals:** 1 homepage · 16 products · 4 collections · 9 pages · 1 blog + 25 articles · 5 policies · system pages (search, cart, 404, account).

Status key: ✅ revamped on the draft · ⬜ not started · ⚠️ problem to fix

---

## How to read this

Shopify pages share templates. Revamping one template revamps every URL that uses it, so the real work list is the **template list** below, not the URL count.

| Template | Used by | URLs | Status |
|---|---|---|---|
| `index` | Homepage | 1 | ✅ Mockup 3 (formula finder still to build) |
| `blog` | Blog index, tag pages | 1 + 6 tag views | ✅ |
| `product` (default) | All products | 16 | ⬜ |
| `collection` (default) | All collections | 4 | ⬜ |
| `article` (default) | All blog posts | 25 | ⬜ |
| `page` (default) | Plain content pages | 4 | ⬜ |
| `page.contact` | Contact | 1 | ⬜ |
| `page.help-center` | Help | 1 | ⬜ (copied from live) |
| `page.faq-orders` | Orders FAQ | 1 | ⬜ (copied from live) |
| `page.faq-products` | Products FAQ | 1 | ⬜ |
| `page.general-help` | Subscriptions help | 1 | ⬜ (copied from live) |
| Policies (Shopify built-in) | 5 policy pages | 5 | ⬜ styled by the theme's base CSS only |
| `search`, `cart`, `404` | System pages | 3 | ⬜ |
| Header and footer | Every page | all | ✅ header · ⬜ footer |

---

## Homepage

| URL | Title | Status |
|---|---|---|
| `/` | Natural Horse Supplements \| Parkmore Supplements | ✅ |

## Collections (template: `collection`)

| URL | Title | Notes |
|---|---|---|
| `/collections/horse-products` | Horse Products | |
| `/collections/dog-products` | Dog Products | |
| `/collections/all-products` | All Products | |
| `/collections/all` | Products | Shopify's automatic "all" collection; linked from the live site |
| `/collections/dog-immune-support` | (404) | ⚠️ Linked from the live header's "K9 Page". Does not exist. Point to `/collections/dog-products` |

## Products (template: `product`, default, all 16)

**Horse**

| URL | Product |
|---|---|
| `/products/parkmore-s-special-vitamin-mineral-supplement-10lb` | SVMS Vitamin & Mineral Supplement |
| `/products/glf-immune-support` | GLF Immune Support |
| `/products/devils-own-detox` | Devil's Own Detox (Black Gold) |
| `/products/eq9-parkmore-h-i-infusion-overall-health` | H.I. Original Wellness Herbs |
| `/products/eq9-parkmore-h-i-infusion-gut-formula` | H.I. Gut Herbs |
| `/products/eq9-parkmore-h-i-infusion-breathing-formula` | H.I. Breathe Herbs |
| `/products/parkmore-magnetic-crownpiece` | Magnetic Crownpiece |
| `/products/eq9-gold` | Golden Guard |

**Skin care (horses and dogs)**

| URL | Product |
|---|---|
| `/products/skin-defense` | Skin Defense |
| `/products/parkmore-skin-creme-daily-conditioning` | Skin Creme, Daily Conditioning |
| `/products/no-rinse-skin-cleanser` | No-Rinse Skin Cleanser, Scented |
| `/products/parkmore-no-rinse-skin-cleanser-unscented` | No-Rinse Skin Cleanser, Unscented |

**Dog**

| URL | Product | Notes |
|---|---|---|
| `/products/k9-parkmore-immune-support` | K9 Immune Support | |
| `/products/k9-devils-own-detox` | K9 Doggy Detox | |
| `/products/k9-daily-coat-spray` | K9 Daily Coat Spray | |
| `/products/k9-smart-bundle` | K9 Detox & Immune Support Bundle | Live, but not in the sitemap (hidden from search engines). The Canine Support Teams offer sits on this page |

## Pages

| URL | Title | Template | Notes |
|---|---|---|---|
| `/pages/help` | Parkmore Help Center | `page.help-center` | |
| `/pages/faq-orders` | Orders, Shipping & Returns | `page.faq-orders` | Brief: "Get in touch" links point to the homepage, should go to `/pages/contact` |
| `/pages/faq-products` | FAQ - Products | `page.faq-products` | Brief: GLF "Ask a Question" email subject says EQ9 Devil's Own Detox |
| `/pages/faq-additional` | General Help & Subscriptions | `page.general-help` | Brief: subscription help text is cut off mid-sentence |
| `/pages/contact` | Contact | `page.contact` | |
| `/pages/how-to-feed-eq9-detox` | How To Feed EQ9 Detox | `page` | |
| `/pages/my-products` | my products | `page` | Brief: orphan page duplicating subscription help. Candidate to remove or redirect |
| `/pages/update-coming-soon-watch-this-space` | Update Coming Soon - Watch this space | `page` | ⚠️ Live "Shop by Need" links here. Brief: point to `/#finder` |
| `/pages/data-sharing-opt-out` | Your Privacy Choices | `page` | Shopify privacy page. Keep; restyle only |

## Blog (template: `blog`) ✅

| URL | Notes |
|---|---|
| `/blogs/news` | The Parkmore Journal. Redesigned on the draft |
| `/blogs/news/tagged/equine-health-nutrition` | 2 posts |
| `/blogs/news/tagged/canine-health-nutrition` | 2 posts |
| `/blogs/news/tagged/customer-stories` | 3 posts |
| `/blogs/news/tagged/horsemanship-horse-life` | 4 posts |
| `/blogs/news/tagged/inside-parkmore` | 11 posts |
| `/blogs/news/tagged/community-partners` | 5 posts |

## Blog posts (template: `article`, all 25)

All under `/blogs/news/`. Newest first.

| Published | Handle | Title |
|---|---|---|
| 2026-09-29 | `jaysus-hindsight-really-is-20-20-😂` | Jaysus… Hindsight Really Is 20/20 😂 |
| 2026-09-20 | `the-first-thing-i-do-is` | The First Thing I Do Is..... |
| 2026-09-16 | `what-formulas-you-can-trust-really-means` | What "Formulas You Can Trust" Really Means |
| 2026-09-14 | `enzos-whole-horse-nutrition-reset` | Enzo's Reset: A Whole-Horse Approach to Nutrition, Gut Health and Recovery |
| 2026-09-14 | `how-erika-supported-apollo-through-a-difficult-hoof-recovery` | How Erika Supported Apollo Through a Difficult Hoof Recovery |
| 2026-09-13 | `when-did-feeding-a-horse-get-so-bloody-complicated` | When Did Feeding a Horse Get So Bloody Complicated? |
| 2026-09-11 | `linda-plummer-parkmore-affiliate-southern-pines-nc` | Meet Linda Plummer: Parkmore Affiliate & Equestrian in Southern Pines, North Carolina |
| 2026-09-08 | `jennifer-ginger-wright-parkmore-affiliate-howell-mi` | Meet Jennifer "Ginger" Wright: Parkmore Affiliate & Farm Owner in Howell, Michigan |
| 2026-09-06 | `heather-lawson-parkmore-affiliate-michigan` | Meet Heather Lawson: Parkmore Affiliate & Eventing Trainer in Romeo, Michigan |
| 2026-09-04 | `aecs-fred-scruffy-and-the-parkmore-review-reward` | AECs, Fred, Scruffy, a Bee… and the Day Off That Wasn't |
| 2026-08-23 | `riding-the-parkmore-rollercoaster-to-aecs` | Riding the Parkmore Rollercoaster to AECs |
| 2026-08-23 | `two-great-danes-one-parkmore-story` | Two Great Danes, One Parkmore Story |
| 2026-08-05 | `tatum-gray-parkmore-affiliate-florida` | Meet Tatum Gray: Parkmore Affiliate & Equine Professional in Williston, Florida |
| 2026-08-04 | `when-life-reminds-you-what-really-matters` | When Life Reminds You What Really Matters |
| 2026-07-24 | `why-parkmore-exists` | Why Parkmore Exists |
| 2026-07-22 | `meet-laurie-m-interwebbist-and-major-pain` | Meet Laurie M... Interwebbist and Major Pain. |
| 2026-07-19 | `when-they-cant-tell-us-where-it-hurts` | When They Can't Tell Us Where It Hurts |
| 2026-07-13 | `the-miles-you-never-see` | The Miles You Never See |
| 2026-07-06 | `how-the-horse-world-is-changing` | How the horse world is changing. |
| 2026-06-28 | `the-best-horsemen-never-stop-learning` | The Best Horsemen Never Stop Learning |
| 2026-06-23 | `the-mad-scientist-behind-parkmore` | The Mad Scientist Behind Parkmore |
| 2026-06-16 | `how-parkmore-came-to-be` | How Parkmore Came To Be |
| 2026-06-10 | `fred-the-dog-that-was-never-supposed-to-be-mine` | Fred – The Dog That Was Never Supposed To Be Mine |
| 2026-06-07 | `ive-spent-my-entire-life-with-horses` | "I've spent my entire life with horses." |
| 2025-07-12 | `parkmore-supplements-partners-with-canine-support-teams` | Parkmore Supplements Partners with Canine Support Teams |

## Policies (Shopify built-in)

`/policies/shipping-policy` · `/policies/refund-policy` · `/policies/privacy-policy` · `/policies/terms-of-service` · `/policies/contact-information`

Content is edited in Settings → Policies, not the theme. The theme only controls how they look.

## System pages

| URL | Template | Notes |
|---|---|---|
| `/search` | `search` | Header search icon lands here |
| `/cart` | `cart` | Cart drawer is the main cart; this is the fallback page |
| any missing URL | `404` | |
| `/account/login` | Shopify customer accounts | Hosted by Shopify (redirects off the theme). Branding is set in Settings → Customer accounts |

---

## Draft theme vs live theme

**Resolved 21 Oct 2026.** The draft was upgraded from Ignite 2.3.0 to **2.6.1**, the same version as the live theme, and the live-only templates were added (`page.help-center`, `page.general-help`, `page.icons`, `product.enquire`, `product.high-converting`, `product.context.parkmore-wholesale-test`, `collection.filters`). `page.faq-orders` and `collection` were copied from live.

Checked page by page against live after the upgrade: every product page, blog post, collection, content page, policy, cart, search and 404 shows the same content on the draft as on live. Only the homepage and blog index differ, because they are redesigned. Collection and search product order varies on live itself between loads.

Still to do: `templates/index.context.us.json` (US-market homepage override) only overrides two old homepage sections that the new homepage removed. Harmless dead config; delete it.
