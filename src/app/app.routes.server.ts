import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
    path: 'pockemons/page/:page',
    renderMode: RenderMode.Server   // ← ESTA FALTABA
  },
   {
    path: 'pockemons/:id',
    renderMode: RenderMode.Server   // ← dinámica
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
