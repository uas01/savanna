export type ShippingZone = "peninsula" | "baleares" | "canarias";
export const SHIPPING_ZONES: Record<
  ShippingZone,
  { label: string; description: string }
> = {
  peninsula: {
    label: "España peninsular",
    description:
      "Tarifa pendiente de configurar según volumen, peso y código postal",
  },
  baleares: {
    label: "Islas Baleares",
    description: "Tarifa pendiente de configurar según isla, volumen y peso",
  },
  canarias: {
    label: "Islas Canarias",
    description:
      "Tarifa y fiscalidad específicas; confirmar transporte, IGIC y trámites aduaneros",
  },
};
// No calcular importes ficticios: se cotizan en backend según dirección y artículos.
export function shippingQuoteStatus(zone: ShippingZone) {
  return SHIPPING_ZONES[zone].description;
}
