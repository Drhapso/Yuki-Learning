export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold">Página no encontrada (404)</h2>
      <p className="text-sm text-slate-400 mt-2">La ruta solicitada no existe.</p>
    </div>
  );
}

