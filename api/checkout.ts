import { products } from "../src/data/products.ts";

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.STRIPE_SECRET_KEY;
  const origin = process.env.CHECKOUT_ORIGIN;
  if (!secret?.startsWith("sk_test_") || !origin || !URL.canParse(origin)) {
    return Response.json(
      { error: "El pago de prueba no está configurado." },
      { status: 503 },
    );
  }

  const cartUrl = new URL("/carrito", origin);
  if (request.headers.get("origin") !== cartUrl.origin) {
    return Response.json({ error: "Origen no autorizado." }, { status: 403 });
  }

  const payload: unknown = await request.json().catch(() => null);
  if (
    !Array.isArray(payload) ||
    !payload.length ||
    payload.length > products.length
  ) {
    return Response.json(
      { error: "El carrito no es válido." },
      { status: 400 },
    );
  }

  const seen = new Set<string>();
  const params = new URLSearchParams({
    mode: "payment",
    success_url: new URL("/carrito?checkout=returned", cartUrl).href,
    cancel_url: cartUrl.href,
  });

  for (const [index, line] of payload.entries()) {
    const product = products.find(({ id }) => id === line?.productId);
    const quantity = line?.quantity;
    if (
      !product ||
      seen.has(product.id) ||
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > product.stock
    ) {
      return Response.json(
        { error: "Revisa los productos y las cantidades del carrito." },
        { status: 400 },
      );
    }
    seen.add(product.id);

    const prefix = `line_items[${index}]`;
    params.set(`${prefix}[quantity]`, String(quantity));
    params.set(`${prefix}[price_data][currency]`, "eur");
    params.set(
      `${prefix}[price_data][unit_amount]`,
      String(product.priceCents),
    );
    params.set(`${prefix}[price_data][product_data][name]`, product.name);
  }

  try {
    const response = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${secret}` },
        body: params,
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (response.ok) {
      const session = await response.json();
      if (
        session !== null &&
        typeof session === "object" &&
        "livemode" in session &&
        session.livemode === false &&
        "url" in session &&
        typeof session.url === "string" &&
        new URL(session.url).origin === "https://checkout.stripe.com"
      ) {
        return Response.json({ url: session.url });
      }
    }
  } catch {
    // Report a checkout failure without exposing provider or credential details.
  }

  return Response.json(
    { error: "No se pudo iniciar el pago de prueba. Inténtalo de nuevo." },
    { status: 502 },
  );
}
