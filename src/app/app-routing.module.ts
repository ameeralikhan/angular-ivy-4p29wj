import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/posts',
    pathMatch: 'full'
  },
  {
    path: 'posts',
    loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
