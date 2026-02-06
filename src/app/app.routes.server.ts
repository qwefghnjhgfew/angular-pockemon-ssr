import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
   {
    path: 'pockemons/:id',
    renderMode: RenderMode.Server   // ← dinámica
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
