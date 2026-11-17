export type Product = {
  id: string;
  name: string;
  category: string;
  priceCents: number;
  description: string;
  stock: number;
  outlet?: boolean;
  image?: string;
};
// Datos DEMO: reemplazar por productos reales obtenidos desde Supabase.
export const products: Product[] = [
  {
    id: "demo-mesa",
    name: "Mesa de comedor Nogal",
    category: "comedor",
    priceCents: 42900,
    description: "Mesa de líneas naturales. Producto de demostración.",
    stock: 6,
  },
  {
    id: "demo-lampara",
    name: "Lámpara de sobremesa",
    category: "salon",
    priceCents: 8900,
    description: "Iluminación cálida para el hogar. Producto de demostración.",
    stock: 12,
  },
  {
    id: "demo-sillon",
    name: "Sillón de lectura",
    category: "salon",
    priceCents: 27900,
    description: "Asiento de estilo contemporáneo. Producto de demostración.",
    stock: 3,
  },
  {
    id: "demo-espejo",
    name: "Espejo decorativo",
    category: "dormitorio",
    priceCents: 11900,
    description: "Espejo de diseño minimalista. Producto de demostración.",
    stock: 8,
    outlet: true,
  },
];
export const euros = (cents: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
