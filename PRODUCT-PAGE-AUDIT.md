# Product page audit: can every product fit the new design?

Scan of all 16 live products (15 public + the hidden K9 bundle) against `.context/parkmore-product-mockup.html`, 21 Oct 2026.

**Verdict:** all 16 can be presented in the new design. None need content rewritten to display. The template has to adapt in 10 places (rules below), because content shapes vary from product to product.

## Product by product

| Product | Label (from finder) | One-liner | Options | Subscriptions | Photos | Reviews | Panels | Description |
|---|---|---|---|---|---|---|---|---|
| SVMS | Daily foundation | ✓ | Size: 10lb $72 / 50lb $270 | Barn Essentials 4/8/12/16 wk, 5% | 8 | 18 | 7 (Key Benefits is a list; Analysis 27 rows) | 367w, long |
| GLF Immune Support | Immune support | ✓ | none | Barn Essentials, 5% | 4 | 15 | 7, all standard | 419w, long |
| Devil's Own Detox | Gut and digestion | ✓ | none | Barn Essentials, 5% | 7 | 14 | 7 (Key Benefits list; Analysis 1 row) | 393w, long |
| H.I. Gut Herbs | Gut and digestion | ✓ | none | Subscribe & Save 4/6/8 wk 5%, 4 month 0% | 3 | 5 | 7 (What's Inside uses headings; Analysis is a list) | 204w |
| H.I. Original Wellness Herbs | Daily foundation | ✓ | none | **Both groups (8 plans)** | **1** | 2 | 3 | 162w |
| H.I. Breathe Herbs | **none (not in finder)** | **✗** | none | Subscribe & Save, 5% / 0% | 2 | 4 | **none** | 149w |
| Golden Guard | **none** | **✗** | none | none | 2 | **0** | 5 (lists) | 152w, 6 headings |
| Magnetic Crown | Calm and focus | ✓ | **Colour: 13** ($280 / $320; 3 colours have no photo) | none | 14 | 17 | **none** | 197w |
| Skin Defense | Coat, skin and hooves | ✓ | Size: 2 oz $22 / 4 oz $38 | none | 10 | 2 | none | **49w, short** |
| Skin Creme | Coat, skin and hooves | ✓ | none | none | 3 | 2 | none | **40w, short** |
| No-Rinse Cleanser, Unscented | Coat, skin and hooves | ✓ | Size: 4 oz $24 / 8 oz $34 | none | 3 | 2 | none | **83w, short** |
| No-Rinse Cleanser, Scented | **none** | **✗** | Size: 4 oz / 8 oz | none | 3 | **0** | none | **92w, short** |
| K9 Immune Support | Immune support (dog) | ✓ | none | Subscribe & Save 2/4/6 wk, 5% | 5 | 4 | 7 (Analysis as plain lines) | 354w, long |
| K9 Doggy Detox | Digestion (dog) | ✓ | none | Subscribe & Save 2/4/6 wk, 5% | 7 | 1 | 6 + Fred's Recipe | 363w, long |
| K9 Daily Coat Spray | Skin and coat (dog) | ✓ | Size: 4 oz only (1 value) | none | **1** | **0** | 5 + Fred's Recipe | 205w |
| K9 Smart Bundle (hidden) | **none** | **✗** | none | none | 4 | 2 | none | **89w, short** |

"Pairs well with": Shopify's complementary products are **not set up for any product**. Shopify's automatic related products work for all 16.

## Rules the template needs

1. **Label line** ("Immune support · For horses"): use the product's finder need label + animal. Fallback for the 4 products not in the finder: audience from the `AUDIENCE-*` tags ("For horses", or "For horses and dogs" for the skin range).
2. **One-liner under the title:** use the finder item's "why". Fallback: hide the line (Breathe, Golden Guard, Scented Cleanser, bundle). Better: add these 4 to a `finder_item` entry even if they are not in a need.
3. **Display name:** finder item name if set, else product title.
4. **Options:** pill buttons for Size; colour pills for the Crown's 13 colours, swapping to the variant photo when there is one (Blue, Distressed Brown, Hot Pink have none). Hide an option with a single value (Coat Spray "4 oz").
5. **Subscriptions:** build the two cards from the product's selling plans, not a fixed list. Some products have two plan groups (H.I. Wellness: 8 plans), and "4 month subscription" has 0% discount, so the "Save 5%" badge and subscribe price must follow the selected plan and hide when the discount is 0. Products with no plans show only "Add to cart" (no cards).
6. **Photos:** hide the thumbnail row when there is 1 photo (H.I. Wellness, Coat Spray).
7. **Reviews:** hide the rating line and show a "Be the first to review" state when there are 0 reviews (Golden Guard, Scented Cleanser, Coat Spray).
8. **"Inside the bag" panels:** show only filled panels; hide the whole band when a product has none (Crown, skin range, Breathe, bundle). Lay each panel out by its content shape:
   - `<p><strong>Title</strong><br>text</p>` blocks → numbered cards (standard)
   - `<h5>Title</h5><p>text</p>` → numbered cards (H.I. Gut "What's Inside")
   - bullet list → ticked tiles (Key Benefits on SVMS, Devil's, K9 Detox, Golden Guard; most How to Use)
   - Guaranteed Analysis in any of three forms (`Name — value`, list `Name, minimum: value`, lines `Name (min) value`) → table; fall back to text
   - How to Use: big-number feeding cards only where the text starts with an amount (GLF, SVMS, Devil's); otherwise the list/text
   - Ingredients, Additional Info, Fred's Recipe → text card
9. **The story section:** use it only for long descriptions (roughly 150+ words with headings). Short descriptions (skin range, bundle) sit in the product top under the one-liner instead, so there is no near-empty section.
10. **Vet line:** show on supplements (product type "Equine/Canine Supplements"); hide on the Crown and skin care. Golden Guard and the skin range have no product type set, so key this off a tag or set the types.

## Content worth fixing (not blocking)

- **Em dashes** in descriptions and panels (brief copy rule): SVMS 29, GLF 8, Devil's 4, K9 Coat Spray 4, K9 Detox 3, K9 Immune 2.
- **Subscription plan names** are inconsistent ("4 weeks" vs "4 week subscription", a trailing space in "4 weeks "), and H.I. Wellness is in both plan groups. Tidy in Seal.
- **"4 month subscription" at 0%** on the H.I. herbs: intended?
- **Product type** is blank on Golden Guard and the skin range.
- **Complementary products** ("Pairs well with") need setting up in Search & Discovery, or we use automatic related products.
- **Reviews naming conditions** (anhidrosis, Cushing's, allergies) on GLF; check other products in Judge.me before launch.
- **H.I. Breathe Herbs:** brief says never call it competition safe; its content does not, keep it that way.
