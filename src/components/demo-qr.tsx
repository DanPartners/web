import QRCode from "qrcode";

/**
 * A QR code for the demo shop's ordering page, drawn as an SVG when the site
 * is built: nothing runs in the browser and no QR service is called.
 */
export async function DemoQr({ url, label }: { url: string; label: string }) {
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark: "#1B1916", light: "#FFFFFF" },
  });
  return (
    <div
      role="img"
      aria-label={label}
      className="qr block size-36 shrink-0 rounded-xl border border-line bg-white p-1.5 sm:size-40 [&_svg]:block [&_svg]:size-full"
      // The SVG is made at build time from our own URL, not from user input.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
