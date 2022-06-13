import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsDetailsComponent } from './posts-details/posts-details.component';

// components
import { PostsComponent } from './posts.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: ':id',
    component: PostsDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule { }
