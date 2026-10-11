# AiSeek changelog

[中文](CHANGELOG.zh-CN.md) · [日本語](CHANGELOG.ja.md) · [Project overview](README.md) · [Try AiSeek](https://aiseek.dev/en)

## 2026-10-12 · From P30 to P67

This showcase update collects the product's progress since the 6 October edition: a world map of changes, more meaningful trends, better Chinese and Japanese search and evidence checks, and faster reading.

The date above is the showcase compilation date in Japan, not the release date of every feature. P numbers identify development stages. Descriptions draw on development records and the public site. Screenshots were captured on 2026-10-12; the original READMEs, screenshots and code excerpts remain a historical 6 October showcase. Pending work is listed separately below.

### A map becomes another way to follow change · P45, P54

SeekMap places changes in the countries where they happen. Filter by domain and time, explore connections across borders, zoom, pan and open country details. Public earthquake and fire observations are labelled separately from AiSeek's changes.

P54 corrected two misleading readings. Trends now compare whole days and account for changes in the site's overall information flow. Country heat uses the history actually available, instead of spreading a few days of data over a supposed 30-day baseline. A score of 50 represents an ordinary day for that country; limited history is disclosed. A busy country is no longer automatically an unusual one.

![Current SeekMap world view](screenshots/2026-10-12/seekmap-zh.jpg)

[Open SeekMap](https://aiseek.dev/en/seekmap/jp) · [Read the method](https://aiseek.dev/en/method#seekmap)

### Read a story and check what supports it · P33–P34, P41, P44

Rotating in-depth stories bring the account, relationships, history, implications and next watch points together. Sentences have source entry points; cards distinguish source counts and primary sources. Public method and correction pages explain how the material is handled. Failed sources are detected and followed up.

![Current in-depth story](screenshots/2026-10-12/story-zh.jpg)

[Read the pictured story](https://aiseek.dev/en/stories/bdbb2942-cfa9-4731-951a-8b7a5c26fe18) · [Corrections](https://aiseek.dev/en/corrections)

### More complete everyday use · P31–P32, P35–P43, P46, P49–P50

- More central-bank decisions and official statistics releases in the calendar; headlines, weather, schedules and market information support daily browsing.
- Passkeys, emailed codes and Microsoft sign-in; Discover comments are moderated before publication and can receive team replies.
- Dark mode, fuller phone weather and today's schedule, less continuous repainting, and a view of what changed since the last visit.
- New accounts can choose follows and claim a seven-day Pro pass without a card. Newsletter subscription is off by default; referrals can earn extra trial time. Current entitlements are on the pricing page.
- The five characters and desktop Dot, About, the site's changelog and account administration were also developed in this period.

![Current home page](screenshots/2026-10-12/home-zh.jpg)

<img src="screenshots/2026-10-12/mobile-home-zh.jpg" alt="Current phone home page at 390 pixels wide" width="390">

[Plans](https://aiseek.dev/en/pricing) · [Site changelog](https://aiseek.dev/en/changelog)

### Take the information into other tools · P40, P47–P48

The read-only API extends to every plan. MCP lets compatible AI tools read changes, sources, map heat, calendars and briefs. This period added a Developer plan, email briefs and embeddable maps, heat badges and calendars. Public channels carry map and headline updates, including Japanese Bluesky. Collection gained a backup route while retaining each source's access and publication rules.

[Developer documentation](https://aiseek.dev/en/developers) · [Email briefs](https://aiseek.dev/en/newsletter)

### Separate source changes from changes in the world · P55–P56

Evaluation samples and repeatable scoring cover support checks, entities, places, search and trends. Adding or stopping a source, repeated collection failures or a sudden shift in its volume can alter a trend. If a trend disappears after removing those effects, it is labelled as a source shift rather than recorded as a change in the world. Candidate detectors are compared in the background; they have not replaced the current rules.

### More understanding behind the three languages · P57–P59, P62

Traditional and simplified Chinese, Japanese character forms, punctuation and name variants are more likely to resolve to the same object. Different product model numbers remain distinct; ambiguous merge proposals await review.

Chinese and Japanese full-text search works across character variants. Research evidence is ordered by relevance, and in-depth stories are searchable in all three languages. Facts extracted from Chinese and Japanese passages receive support checks. Ask answers in those languages are also checked against their cited passages; unsupported sentences are marked as hypotheses. These checks have limits and do not catch every error.

### More original material, better place attribution · P60–P61

Thirty Chinese and Japanese sources were added, alongside better local-date and article extraction. Japanese listed-company figures come from original EDINET filings; advanced research can use academic-paper abstracts from OpenAlex.

Map attribution distinguishes the location of an event from its participants and a person's nationality. Place names and public knowledge records help locate cities, regions and facilities. On the labelled place samples in this round, rule accuracy rose from about 64% to 76%. This is a sample result, not a site-wide accuracy figure.

### From relationship maps to relationship analysis · P63, first part

Company pages show a position in the public relationship network, a community and newly added relationships for the week. Readers can look up the path between two objects. Analysis updates daily, uses evidence-backed public relationships and respects the relationship layers available to the reader. Network position is not an investment rating, and a connection does not establish causation.

![Position in the company relationship network](screenshots/2026-10-12/structure-position-zh.jpg)

[Open the company page](https://aiseek.dev/en/companies/anthropic-company)

### Lighter pictures, faster page changes · P65–P66

Pictures are sized for display and cached closer to readers, with attribution and licences retained. Recently visited pages reuse a short-lived cache, links prepare data before a click, and some pages show their main content before supplementary charts. Data-saving mode limits preloading. Public pages can lag the latest content by roughly two minutes; refresh to check again.

### Engineering maintenance and fixes · P51–P53, P62, and this round's maintenance

Crawl rules are read according to the internet standard. Development tools were upgraded: TypeScript 7 runs type checks, TypeScript 6 provides the tool compatibility layer, and Vite 8 builds the frontend. Model backlog alerts were added, and English support-check weight loading was checked against the previous results. A failure in one relationship-matching type no longer stops later types. Backup date handling, release rollback and connection retries were repaired.

These are engineering records rather than new reading features. The original README's stack describes the historical edition.

### Pending activation and future work

| Stage | Status at compilation |
|---|---|
| P67 · X posting | Code complete; activation awaits the owner's review of a test post. The final format is text only, without links; Japanese, Chinese or English is chosen by content. In-depth stories use the whole account, truncated at a paragraph boundary when too long. This showcase update does not enable posting or send posts. |
| P63, second part | Long-term detector comparison waits for 60–90 days of history; planned from December 2026. |
| P64 | Follow-ups needing more samples and data, including labels, entity merges and name readings, are planned for December alongside the rest of P63. |
| P48 launch | The tools are complete; the coordinated promotion launch awaits the owner. |

Screenshots are dated views of public pages; their content and figures will change. Sources, observations and licence notes are in the [capture record](screenshots/2026-10-12/README.md) and [product credits](https://aiseek.dev/en/credits).
