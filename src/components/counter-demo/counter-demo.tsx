"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import type { Act } from '@/stageshow/kit/act'
import { Badge } from '@/stageshow/kit/controls/Badge'
import { Button } from '@/stageshow/kit/controls/Button'
import { Segmented } from '@/stageshow/kit/controls/Segmented'
import type { Rect } from '@/stageshow/kit/measure'
import { Collapse } from '@/stageshow/kit/motion/Collapse'
import { Fly } from '@/stageshow/kit/motion/Fly'
import { Roll } from '@/stageshow/kit/motion/Roll'
import { States } from '@/stageshow/kit/motion/States'
import { Icon } from '@/stageshow/kit/parts/Icon'
import { Row } from '@/stageshow/kit/parts/Row'
import { Spinner } from '@/stageshow/kit/parts/Spinner'
import { Phone } from '@/stageshow/kit/phone'
import { Stage } from '@/stageshow/kit/stage'
import { Bar, Window } from '@/stageshow/kit/window'
import './counter-demo.css'

// Dan's homepage hero. A customer pays on the shop's ordering page; the order
// lands on the counter's board, already paid; staff accept it and the kitchen
// ticket prints. The three lines of the order are the thread: the same words
// on the phone, on the board and on the ticket.
//
// Started from examples/subscriptions (a satellite straddling the window's
// sidebar, a chip flying into a list) with the phone from examples/device-pair.
// REHEARSAL.md beside this file records how it was filmed and checked.

/**
 * Three designs, chosen by the width of the column the demo sits in:
 * wide: the customer's phone, the board, and the kitchen's tickets.
 * mid: the board and the tickets, for a tablet or a small laptop.
 * compact: a crop of the board that runs off the screen's right edge.
 */
type Variant = 'wide' | 'mid' | 'compact'

const DESIGN: Record<Variant, { width: number; height: number; rest: { x: number; y: number } }> = {
  wide: { width: 1240, height: 560, rest: { x: 800, y: 106 } },
  mid: { width: 716, height: 540, rest: { x: 330, y: 84 } },
  compact: { width: 390, height: 350, rest: { x: 112, y: 56 } },
}

const variantFor = (width: number): Variant => (width >= 940 ? 'wide' : width >= 560 ? 'mid' : 'compact')

// Compact has no room beside the board: its ticket prints over the order
// left in New, from just under that order's heading
const UNDER = 'under-new'
const TICKET_DROP = 55

type Pay = 'idle' | 'busy' | 'paid' | 'done'
type Flight = { from: Rect; to: Rect; go: boolean }
type S = {
  pay: Pay
  /** The New column has made room for the order */
  inNew: boolean
  /** The amount has landed on the card */
  landed: boolean
  /** The order is counted in New */
  seen: boolean
  /** The card is in the New column (false once it lifts off) */
  shownNew: boolean
  /** The Preparing column has made room */
  inPrep: boolean
  /** The card has landed in Preparing */
  arrived: boolean
  /** The card's action, changed once it is in its new column */
  ready: boolean
  ticket: 'none' | 'printed' | 'gone'
  /** Where the ticket prints, fixed when it starts so it never follows the board */
  ticketAt: Rect | null
  chip: Flight | null
  move: Flight | null
}

const START: S = { pay: 'idle', inNew: false, landed: false, seen: false, shownNew: true, inPrep: false, arrived: false, ready: false, ticket: 'none', ticketAt: null, chip: null, move: null }
const POSTER: S = { ...START, pay: 'done', landed: true, seen: true, shownNew: false, inPrep: true, arrived: true, ready: true, ticket: 'printed' }

const ORDER = {
  no: '#1857',
  total: '£14.90',
  lines: [
    { qty: 2, name: 'Sausage roll', price: '£7.00' },
    { qty: 1, name: 'Flat white', price: '£3.40' },
    { qty: 1, name: 'Sourdough loaf', price: '£4.50' },
  ],
}

// The amount keeps one line height on the button, in flight and on the card
const LINE = 1.3

/** Where `part` of a card will rest once its closed slot has opened: the
 * slot's own corner plus the part's place inside the card, both as drawn, so
 * the landing is exact to the fraction of a pixel. */
function landing(a: Act<S>, slot: string, card: string, part: string): Rect {
  const at = a.rect(slot)
  const c = a.rect(card)
  const p = a.rect(part)
  return { x: at.x + (p.x - c.x), y: at.y + (p.y - c.y), width: p.width, height: p.height }
}

const scriptFor = (variant: Variant) =>
  async function script(a: Act<S>) {
    await a.wait(750)

    // 1. The customer pays. The amount leaves the button and becomes the new
    // order's total on the board, while the New column opens under it.
    a.mark('pay')
    if (variant === 'wide') {
      await a.set({ pay: 'busy' })
      await a.wait(650)
      // The chip is the amount's own words, at their size, budding off the
      // middle of the button and growing to the card's total as it travels
      const b = a.rect('pay')
      const words = a.rect('pay-amount')
      const from = { x: b.x + (b.width - words.width) / 2, y: b.y + (b.height - words.height) / 2, width: words.width, height: words.height }
      const to = landing(a, 'new-slot', 'card-new', 'total-new')
      await a.set({ pay: 'paid', chip: { from, to, go: false } })
      await a.wait(240)
      await a.set((s) => ({ inNew: true, chip: { ...s.chip!, go: true } }))
      // Once the amount has left the button, the button says what happened
      await a.wait(380)
      await a.set({ pay: 'done' })
      await a.wait(520)
      await a.set({ chip: null, landed: true, seen: true })
    } else {
      // No phone in view: the order arrives on its own, paid
      await a.set({ inNew: true, landed: true })
      await a.wait(620)
      await a.set({ seen: true })
    }
    await a.wait(900)

    // 2. Staff accept it. The card crosses to Preparing as that column opens.
    a.mark('accept')
    await a.move({ at: 'accept', x: 0.9, y: 0.72 })
    await a.wait(260)
    await a.set({ move: { from: a.rect('card-new'), to: landing(a, 'prep-slot', 'card-prep', 'card-prep'), go: false } })
    await a.click()
    // The button lets go before the card lifts, so the card leaves at rest
    await a.wait(170)
    await a.set((s) => ({ shownNew: false, inPrep: true, move: { ...s.move!, go: true } }))
    await a.set({ inNew: false })
    // The hand leaves once the card has: it is not left resting on another order
    await a.wait(360)
    void a.move('rest')
    await a.wait(540)
    await a.set({ move: null, arrived: true })
    // Its action changes on the card itself once it is in its new column
    await a.wait(120)
    await a.set({ ready: true })
    await a.wait(260)

    // 3. The kitchen ticket prints.
    a.mark('print')
    await a.set({ ticket: 'printed', ticketAt: variant === 'compact' ? a.rect(UNDER) : null })
    await a.wait(3900)

    // What the story added leaves in one short stagger, last thing first: the
    // ticket goes back the way it came, the order moves on, and the next
    // customer is at the checkout.
    a.mark('exit')
    await a.set({ ticket: 'gone' })
    await a.wait(90)
    await a.set({ inPrep: false })
    await a.wait(90)
    await a.set({ pay: 'idle' })
    await a.wait(500)
    await a.snap({ ...START })
  }

type Tone = 'new' | 'prep' | 'ready'

/** A quantity in a fixed track, so the × signs line up whatever the figure. */
function Qty({ n }: { n: number }) {
  return (
    <span className="dc-qty">
      <span>{n}</span>×
    </span>
  )
}

/** The order the story is about, as it is drawn in a column and in flight. */
function OrderCard({ tone, ready = false, total = true, names }: { tone: Tone; ready?: boolean; total?: boolean; names?: { card?: string; total?: string; accept?: string } }) {
  return (
    <div className="dc-slip" data-target={names?.card}>
      <div className="dc-card" data-tone={tone}>
        <div className="dc-card__top">
          <span className="dc-card__no">{ORDER.no}</span>
          <span className="dc-card__age">now</span>
        </div>
        <div className="dc-card__meta">Online · Collection</div>
        <Badge className="dc-paid">Paid by card</Badge>
        {ORDER.lines.map((l) => (
          <div key={l.name} className="dc-card__line">
            <Qty n={l.qty} />
            <span>{l.name}</span>
          </div>
        ))}
        <div className="dc-card__total">
          <span className="dc-amount" data-target={names?.total} data-shown={total || undefined}>
            {ORDER.total}
          </span>
        </div>
        <div className="dc-card__actions">
          {/* One button whose words change on it, in a box that holds the longer */}
          <Button variant="primary" data-target={names?.accept}>
            <States value={ready ? 'ready' : 'accept'} states={{ accept: 'Accept', ready: 'Ready' }} />
          </Button>
          <Button variant="ghost">Edit</Button>
        </div>
      </div>
    </div>
  )
}

/** An order that was there before the story. Its number and channel are real
 * and the rest is filler; `bare` is all filler, for an order the crop or the
 * ticket covers. */
function QuietCard({ tone, no, channel, age, lines, paid, action = 56, name, bare }: { tone: Tone; no?: string; channel?: string; age?: string; lines: number[]; paid?: boolean; action?: number; name?: string; bare?: boolean }) {
  return (
    <div className="dc-slip" data-target={name}>
      <div className="dc-card" data-tone={tone}>
        {bare ? (
          <>
            <div className="dc-card__top">
              <Bar w={52} h={11} r={3} tone={4} />
              <Bar w={18} h={6} tone={2} />
            </div>
            <div className="dc-card__meta">
              <Bar w={96} h={6} tone={2} />
            </div>
          </>
        ) : (
          <>
            <div className="dc-card__top">
              <span className="dc-card__no">{no}</span>
              <span className="dc-card__age">{age}</span>
            </div>
            <div className="dc-card__meta">{channel}</div>
          </>
        )}
        {paid && !bare && <Badge className="dc-paid dc-paid--quiet">Paid by card</Badge>}
        {lines.map((w, i) => (
          <div key={i} className="dc-card__line">
            <Bar w={14} h={6} tone={3} />
            <Bar w={w} h={6} tone={3} />
          </div>
        ))}
        <div className="dc-card__total">
          <Bar w={46} h={9} r={3} tone={4} />
        </div>
        <div className="dc-card__actions">
          <Bar w={action} h={28} r={6} tone={2} />
        </div>
      </div>
    </div>
  )
}

function Column({ tone, label, count, children }: { tone: Tone; label: string; count: number; children: ReactNode }) {
  return (
    <section className="dc-col" data-tone={tone}>
      <header className="dc-col__head">
        <span className="dc-col__label">{label}</span>
        <span className="dc-col__count">
          <Roll>{String(count)}</Roll>
        </span>
      </header>
      <div className="dc-col__list">{children}</div>
    </section>
  )
}

function Shop({ s }: { s: S }) {
  return (
    <div className="dc-shop">
      <header className="dc-shop__head">
        <span className="dc-shop__name">Fennel &amp; Rye</span>
        <Segmented className="dc-shop__mode" items={['Collection', 'Delivery']} value={0} />
        <span className="dc-shop__when">Collect today at 12:55</span>
      </header>
      <div className="dc-shop__label">Your order</div>
      <div className="dc-shop__lines">
        {ORDER.lines.map((l) => (
          <div key={l.name} className="dc-shop__line">
            <Row pad={0} lead={<span className="dc-shop__qty">{l.qty}</span>} title={l.name} meta={<span className="dc-shop__price">{l.price}</span>} />
          </div>
        ))}
      </div>
      <div className="dc-shop__total">
        <span>Total</span>
        <span>{ORDER.total}</span>
      </div>
      <div className="dc-pay" data-target="pay" data-state={s.pay}>
        <States
          value={s.pay}
          states={{
            idle: (
              <span className="dc-pay__label">
                Pay{' '}
                <span className="dc-pay__amount" data-target="pay-amount">
                  {ORDER.total}
                </span>
              </span>
            ),
            busy: <Spinner size={20} />,
            // The amount is the feedback while it leaves the button
            paid: null,
            done: (
              <span className="dc-pay__done">
                <Icon name="check" size={20} stroke={2.4} />
                Paid
              </span>
            ),
          }}
        />
      </div>
      <div className="dc-shop__foot">
        <Bar w={196} h={8} r={4} tone={2} />
        <Bar w={128} h={8} r={4} tone={2} />
      </div>
      <div className="dc-shop__more">
        <Bar w={88} h={9} r={4} tone={3} />
        <Bar w="100%" h={46} r={12} tone={1} />
      </div>
    </div>
  )
}

/** A ticket that printed earlier: paper and filler, under the one the story prints. */
function OldTicket({ i }: { i: number }) {
  return (
    <div className="dc-ticket dc-ticket--old" data-i={i} aria-hidden>
      <div className="dc-ticket__paper">
        <div className="dc-ticket__head">
          <Bar w={58} h={9} r={3} tone={4} />
          <Bar w={40} h={9} r={3} tone={4} />
        </div>
        <div className="dc-ticket__sub">
          <Bar w={104} h={6} tone={3} />
        </div>
        <div className="dc-ticket__rule" />
        {[92, 70].map((w) => (
          <div key={w} className="dc-ticket__line">
            <Bar w={12} h={6} tone={3} />
            <Bar w={w} h={6} tone={3} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** The kitchen ticket the story prints. `over` places it in the compact
 * design, from the card it prints over; the wider designs give it a place of
 * its own, on the pile beside the board. */
function KitchenTicket({ state, over }: { state: S['ticket']; over?: Rect }) {
  const place = over ? { ['--dc-tx' as string]: `${over.x - 2}px`, ['--dc-ty' as string]: `${over.y + TICKET_DROP}px`, ['--dc-tw' as string]: `${over.width + 4}px` } : undefined
  return (
    <div className="dc-ticket" data-state={state} aria-hidden={state !== 'printed' || undefined} style={place}>
      <div className="dc-ticket__paper">
        <div className="dc-ticket__head">
          <span>Kitchen</span>
          <span>{ORDER.no}</span>
        </div>
        <div className="dc-ticket__sub">Collection · 12:55</div>
        <div className="dc-ticket__rule" />
        {ORDER.lines.map((l) => (
          <div key={l.name} className="dc-ticket__line">
            <span>{l.qty} ×</span>
            <span>{l.name}</span>
          </div>
        ))}
        <div className="dc-ticket__rule" />
        <div className="dc-ticket__foot">Paid by card</div>
      </div>
    </div>
  )
}

/** Holds the stage back until its own faces have loaded: Roll and Button
 * measure their labels once, so a face that arrives late leaves them cut short. */
function useFaces(host: RefObject<HTMLDivElement | null>) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let live = true
    let frame = 0
    const done = () => live && setReady(true)
    const fonts = document.fonts
    const probes = [...(host.current?.querySelectorAll<HTMLElement>('.dc-faces > *') ?? [])]
    if (!fonts || !probes.length) return void done()
    const bare = (name: string) => name.trim().replace(/^["']|["']$/g, '')
    const wanted = probes.map((el) => {
      const cs = getComputedStyle(el)
      return { family: bare(cs.fontFamily.split(',')[0]), font: `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}` }
    })
    const declared = () => wanted.every((w) => [...fonts].some((f) => bare(f.family) === w.family))
    const started = performance.now()
    // A stylesheet that declares the faces may still be on its way
    const poll = () => {
      if (declared() || performance.now() - started > 1200) return void Promise.all(wanted.map((w) => fonts.load(w.font))).then(done, done)
      frame = requestAnimationFrame(poll)
    }
    poll()
    const late = setTimeout(done, 3000)
    return () => {
      live = false
      cancelAnimationFrame(frame)
      clearTimeout(late)
    }
  }, [host])
  return ready
}

/** Which design fits the column the demo sits in. Null until it is measured. */
function useVariant(frame: RefObject<HTMLDivElement | null>) {
  const [variant, setVariant] = useState<Variant | null>(null)
  useEffect(() => {
    const el = frame.current
    if (!el) return
    const measure = () => setVariant(variantFor(el.clientWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [frame])
  return variant
}

export function CounterDemo() {
  const frame = useRef<HTMLDivElement>(null)
  const host = useRef<HTMLDivElement>(null)
  const faces = useFaces(host)
  const variant = useVariant(frame)
  const script = useMemo(() => (variant ? scriptFor(variant) : undefined), [variant])
  const ready = faces && variant !== null
  return (
    <div ref={frame} className="dc-frame">
      <div ref={host} className="dc-host">
        <span className="dc-faces" aria-hidden>
          <span>0</span>
          <b>0</b>
          <i>0</i>
          <em>0</em>
        </span>
        {ready && variant ? (
          <Stage<S>
            key={variant}
            width={DESIGN[variant].width}
            height={DESIGN[variant].height}
            fill
            initial={START}
            poster={POSTER}
            script={script}
            cursor={{ at: DESIGN[variant].rest }}
            className={`dc dc--${variant}`}
          >
            {(s, rect) => {
              const wide = variant === 'wide'
              const compact = variant === 'compact'
              return (
                <>
                  <Window url="my.dan.partners/orders" className="dc-window">
                    <aside className="dc-side">
                      {[64, 78, 52, 70, 58, 84, 62].map((w, i) => (
                        <div key={i} className="dc-nav" data-on={i === 0 || undefined}>
                          <Bar w={12} h={12} r={3} tone={i === 0 ? 4 : 3} />
                          <Bar w={w} h={6} tone={i === 0 ? 4 : 2} />
                        </div>
                      ))}
                    </aside>
                    <main className="dc-main">
                      <div className="dc-head">
                        <span className="dc-title">Orders</span>
                        <Segmented className="dc-view" items={['Board', 'List']} value={0} />
                      </div>
                      <div className="dc-board">
                        <Column tone="new" label="New" count={2 + (s.seen && s.shownNew ? 1 : 0)}>
                          <Collapse open={s.inNew} reveal="drop" data-target="new-slot">
                            <div className="dc-gap" data-hidden={!s.shownNew || undefined}>
                              <OrderCard tone="new" total={s.landed} names={{ card: 'card-new', total: 'total-new', accept: 'accept' }} />
                            </div>
                          </Collapse>
                          <QuietCard tone="new" no="#1856" channel="Table 5 · Eat in" age="2m" lines={[92, 70]} paid name={UNDER} />
                          <QuietCard tone="new" no="#1855" channel="Online · Delivery" age="4m" lines={[84, 92, 66]} bare={compact} />
                          <QuietCard tone="new" lines={[76, 90]} bare />
                        </Column>
                        <Column tone="prep" label="Preparing" count={2 + (s.arrived && s.inPrep ? 1 : 0)}>
                          <Collapse open={s.inPrep} reveal="drop" data-target="prep-slot">
                            <div className="dc-gap" data-hidden={!s.arrived || undefined}>
                              <OrderCard tone="prep" ready={s.ready} names={{ card: 'card-prep' }} />
                            </div>
                          </Collapse>
                          <QuietCard tone="prep" no="#1854" channel="Counter · Takeaway" age="9m" lines={[92, 76, 88]} />
                          <QuietCard tone="prep" no="#1853" channel="Table 2 · Eat in" age="12m" lines={[72, 96]} bare={compact} />
                          <QuietCard tone="prep" lines={[90, 64, 80]} bare />
                        </Column>
                        <Column tone="ready" label="Ready" count={2}>
                          <QuietCard tone="ready" no="#1852" channel="Online · Collection" age="18m" lines={[92, 64, 82]} paid action={72} bare={compact} />
                          <QuietCard tone="ready" no="#1851" channel="Counter · Takeaway" age="21m" lines={[80, 92]} bare={compact} />
                          <QuietCard tone="ready" lines={[70, 92, 60]} bare />
                        </Column>
                      </div>
                    </main>
                  </Window>

                  {wide && (
                    <Phone width={340} frame="pro" time="12:41" className="dc-phone">
                      <Shop s={s} />
                    </Phone>
                  )}

                  {compact ? (
                    <KitchenTicket state={s.ticket} over={s.ticketAt ?? rect(UNDER)} />
                  ) : (
                    // One satellite: the tickets gathered where they print
                    <div className="dc-pile">
                      <OldTicket i={0} />
                      <OldTicket i={1} />
                      <KitchenTicket state={s.ticket} />
                    </div>
                  )}

                  {s.chip && (
                    <Fly from={s.chip.from} to={s.chip.to} go={s.chip.go} held duration={900}>
                      <span className="dc-chip" style={{ fontSize: s.chip.from.height / LINE }}>
                        {ORDER.total}
                      </span>
                    </Fly>
                  )}
                  {s.move && (
                    <Fly from={s.move.from} to={s.move.to} go={s.move.go} duration={900} className="dc-carry">
                      <OrderCard tone={s.move.go ? 'prep' : 'new'} />
                    </Fly>
                  )}
                  <span data-target="rest" className="dc-rest" style={{ left: DESIGN[variant].rest.x, top: DESIGN[variant].rest.y }} />
                </>
              )
            }}
          </Stage>
        ) : (
          <div className="dc-hold" />
        )}
      </div>
    </div>
  )
}
