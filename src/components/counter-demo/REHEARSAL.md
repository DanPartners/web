# Rehearsal: counter-demo

The homepage hero (DAN-39). Built with the StageShow skill (`benjitaylor/skills`, `stageshow` 1.1.1); the kit parts it uses are vendored in `src/stageshow/kit`.

Gold: `examples/subscriptions`. Kept: a satellite straddling the window's sidebar, the amount leaving a pay button as a chip and landing as the new row's value, the row opening its space under it, the checkout going back to idle for the next customer. Changed: the product, the look (Dan's dashboard tokens, torn order slips, the status colours of its board) and every word; the checkout card became the customer's phone from `examples/device-pair`; a cursor accepts the order; the payoff is a second satellite, the kitchen's tickets, gathered as in `examples/tilted-stack`.

Beats: 1 the customer's Pay button goes busy, then paid, and the amount flies to the board and lands as the new order's total in New. 2 the cursor presses Accept; the card crosses to Preparing as that column opens; its button becomes Ready. 3 the kitchen ticket prints on the pile. Payoff holds 3.9s. Exit: the ticket goes back through the foot, the order leaves Preparing, the phone's button returns to Pay. Loop about 11s.

Designs: three, chosen by the width of the demo's column (`variantFor`). wide 1240 × 560 from a 940px column (the phone, the board, the tickets); mid 716 × 540 from 560px (New and Preparing beside the tickets, the order arrives on its own); compact 390 × 350 below that (a crop of the board that runs off the screen's right edge through the Ready column; the ticket prints over the order left in New).

Captured, on the final cut: on the real page (`next build`, `next start`) at 1440, 820 and 390 wide, the loop as a contact sheet (`--every 700 --count 18`), `--states` and `--reduced --still`; a still at 1280, 1100, 1024, 768 and 600. In the kit's playground (the same two files, with the kit import swapped) at 1440, 900 and 390: the same three. `scripts/jumps.mjs` for 30s on the real page. `scripts/layout.mjs` on the real page at 1440 and 390. The card's two hand-offs, measured every frame in the browser. On earlier cuts, before the tickets moved beside the board: `--at pay`, `--at accept`, `--at print` and the exit, at 45 to 90ms. Chrome 157 headless on Linux.

Gate: `rehearsal passed (necessary, not sufficient: references/verify.md and the fresh eye in review.md still stand)` in the playground, for all nine runs (loop, `--states` and `--reduced --still`, each at 1440, 900 and 390). On the real page every run ends `rehearsal failed: 6 never-intentional line(s) above`, and the six lines are the same in every run: see the first row below.

Film:

- `kit override: .ss-row`, `.ss-row__dot`, `.ss-row__body`, `.ss-row:has(…) .ss-row__body`, `.ss-row__head`, `.ss-row__title` (real page only, every frame) → these are the kit's own rules in `kit/parts/Row.css`. `film-checks.mjs` tells the kit's stylesheets from the scene's by `/kit/` in their URL, and Next bundles all CSS into hashed chunks, so it reads the kit's rules as the scene's. `counter-demo.css` has no `.ss-row` selector. The playground does not report them. Stands; it is the reason the gate cannot pass on the real page.
- `appears with no entrance` / `vanishes with no exit` for `div.ss-fly.dc-carry` and `div.dc-gap` → the card's two hand-offs between the column and the flyer, on a frame where both are identical (measured: the flyer and the card are at the same x, y, width and height to 0.02px at take-off and at landing). The gold prints the same lines for its own hand-offs. Stands.
- `inconclusive` coverage on every screenshot run → the screenshots stall frames on this machine (the gold films the same way here). The 30s `jumps.mjs` scan, which takes no screenshots, is `complete` and reports nothing.
- `scale: 0.81 (wide design)` at a 1024px viewport, `scale: 0.82` for the mid design at 600px, `grown past the design size` up to 1.38 in the mid design and 1.54 in the compact one → see Unresolved.

Fixed on the way, each from a film line or a frame: labels cut short by a late font (the stage now waits for its faces); a 3px lurch as the card lifted (the kit's chip-sized lift on a card: now 1.03); the flyer landing 0.4px low (a rounded layout rect: the landing is now measured as drawn); the Accept press still held as the card left; the chip's surface as padding (`fly size`: its box is now the words' own); `empty pane`, `near-tangent` and `loose list` at the foot (a third order in every column, the order's lines as rows of the card); words cut by the crop in the compact design (orders the crop cuts are all filler, and the gap under the story's card is the margin); the window's shadow cut by the stage's edge (shadows now fall inside the gutter); the ticket's amount left behind for a frame as its card lifted.

Review: two fresh-eye reviews (`references/review.md`), each by an agent that saw only the frames, the page and the references.

First review → response:

1. The ticket has no place: inside the window, over a column, reading as a third Ready card → it is now a satellite of its own: the kitchen's tickets, half over the window's right margin and half on the page, there from the first frame; the story prints the top one.
2. Compact: the ticket replaces the New column → it prints from under the heading of the order left in New, so New still reads as New.
3. Compact window cut in mid-air, 20px inside the screen; a 520px cap on tablets → the compact stage now runs to the screen's edge, and tablets have a design of their own.
4. The stage's edge slices the window's shadow → tighter shadows, inside the gutter in each design.
5. 901 to 1075px: the wide design shrunk too far → the mid design covers tablets; see Unresolved for 1020 to 1066.
6. Columns meet the foot at three distances → a third order in each column; every column runs off the foot.
7. Blank paper on the ticket's lower third → the ticket sits lower; 30 to 40px of paper under its last line.
8. Label and value mismatched on the filler orders → orders the story is not about are a real heading over filler, throughout.
9. The heaviest marks are off the story → the column rules are hairlines; "Paid by card" is ink only on the story's order.
10. "Fennel & Rye" twice in the top left → the phone covers the sidebar; the name is only on the phone.
11. The reset rewinds in view with no cause → part fixed: the ticket leaves whole, the way it came; the button's colour change is quicker. The rest stands: see Unresolved.
12. Compact exit slices the ticket mid-word → it leaves through the foot.
13. The new order fades into an open hole; the count rolls early → the count rolls when the order has landed; the order now shows only once its space is open. The space still opens before the card: that is the kit's `Collapse reveal="drop"`.
14. Pay presses itself → no press: the button goes busy, then paid, as the gold's checkout does.
15. The chip's surface over the card's edge as it lands → its surface has lowered before it reaches the card.
16. The flying card changes colour at take-off → it takes the new column's colour as it arrives.
17. Loop under 10s, stillness at the seam, the compact cursor resting by a label → payoff held longer, the seam shorter, the rest point moved.
18. Ragged × column → the figure has a track of its own.
19. The ticket's two rules at different weights → both on whole pixels.

Second review → response:

1. The story is below the fold on laptops → the stage is 56px shorter, the phone sits higher, the head is tighter (and tighter again on a screen under 800px tall). At 1440 × 900 Pay, Accept and the ticket's lines are in view. At 1280 × 720 and 1024 × 768 the cards' headings are; Accept and Pay are at or just under the fold.
2. Breakpoints pick the wrong design for the width → the mid design now fills its column (no cap) and starts at 560px. Still open at the joins: see Unresolved.
3. The ticket reads as a crooked fourth card → as 1 above.
4. Compact's bleed cuts nothing → the Ready column now runs off the screen's edge through its filler.
5. Compact ticket's edges 0 to 5px from the card's → the ticket is 2px wider than the card each side and starts under its heading, 8px clear of Preparing.
6. Ink badges on filler → as 9 above.
7. The Ready column is red → stands: green, blue and red are the product's own colours for New, Preparing and Ready.
8. The loop rewinds, resets without a cause → see Unresolved.
9. The button goes blank between Accept and Ready → its two labels are stacked in one box and crossfade (`States`); the box holds the longer.
10. The new order arrives as a ghost in a hole → as 13 above.
11. A ghost "£14.9" left in New as the card lifts → fixed (a `visibility: visible` on the amount outlived its hidden card).
12. The stage fades up at load → it no longer fades.
13. The ticket's torn top on a card's torn foot → the ticket is no longer over a card in the wide and mid designs.
14. Compact ticket 6 to 9px under the badge → it covers the badge.
15. The pay spinner is faint for its first 0.3s → stands; it is the kit's `States` crossfade.

Assumptions:

- The board's look follows the demonstration at `my.dan.partners/shop/orders?demo=1` on 27 Nov 2026: the four columns and their colours, the torn slip, "Paid by card", Accept then Ready. That accepting an order is what prints its kitchen ticket is assumed.
- The shop, the order and its prices are invented: Fennel & Rye, order #1857.
- The demo's words are English in both languages of the page; the page gives it a description in each.

Unresolved:

- The exit is an exit around an anchor (what the story added leaves in one short stagger), not a seen cause. Both reviewers asked for one: Ready pressed, the card moving on, the next order arriving under a new number. That is a conveyor across three designs and was not built.
- At viewports from 1020 to about 1066px the wide design is drawn at 0.81 to 0.85, and its smallest type (11.5px) at about 9.5px. From 932 to 1019px the mid design is drawn at 1.3 to 1.38. From about 470 to 607px the compact design is drawn at 1.25 to 1.54. No common device sits in the last two ranges; a 1024px tablet sits in the first.
- On a screen under about 800px tall, Accept and Pay are at or under the fold at load.

Not checked:

- A real phone or tablet, touch, Safari and Firefox. Everything above is Chrome on Linux.
- Frame rate on real hardware; the stage paused off screen and in a hidden tab; a resize across a design boundary mid-loop (the stage remounts on it); reduced motion switched during playback.
- The Traditional Chinese page beyond one screenshot of the hero.
- Dark mode: the site has none.

To film it again: `npx skills add benjitaylor/skills --skill stageshow`, `npm install` in `.agents/skills/stageshow`, run the site, then from that folder `node scripts/film.mjs "http://localhost:3000/" --select '.dc-host' --gate` (add `--width 390`, `--states`, `--reduced --still`). For a gate that can pass, copy `counter-demo.tsx` and `counter-demo.css` to `examples/dan-counter/index.tsx` and `dan.css` there, import the parts from `'../../kit'`, export the component as default, run `npm run dev` and film `?capture=dan-counter`.
