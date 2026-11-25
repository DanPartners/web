/**
 * The only place to set links. Nothing else in the site holds a URL.
 *
 * - loginUrl: where "Log in" in the header goes.
 * - demoUrl: where "Try the demo" goes (opens the demo on the orders board).
 * - orderDemoUrl: the demo shop's ordering page, as a customer at a table. The
 *   QR code in the demo section points here (the Dan cloud's demo shop).
 * - slashieUrl: Slashie Ltd's site, linked from the footer.
 * - whatsapp: a full link, for example "https://wa.me/44XXXXXXXXXX". Empty hides the button.
 * - email: an address, for example "hello@example.com". Empty hides the button.
 */
export const site = {
  loginUrl: "https://my.dan.partners",
  demoUrl: "https://my.dan.partners/shop/orders?demo=1",
  orderDemoUrl: "https://order.dan.partners/?table=5",
  slashieUrl: "https://slashie.ltd",
  whatsapp: "",
  email: "",
};
