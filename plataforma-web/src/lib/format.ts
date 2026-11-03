/**
 * Formatea números enteros de manera determinista (ej. 1,850 o 2,450)
 * idéntica tanto en el servidor SSR (Node.js) como en el cliente (Browser),
 * eliminando por completo los errores de desajuste de hidratación (Hydration Mismatch)
 * causados por toLocaleString().
 */
export function formatNumber(value: number): string {
  if (typeof value !== 'number' || isNaN(value)) return '0';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

