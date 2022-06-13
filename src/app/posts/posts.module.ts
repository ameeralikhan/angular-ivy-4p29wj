import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

// modules
import { PostsRoutingModule } from './posts-routing.module';

// components
import { SearchComponent } from './search/search.component';
import { PostsComponent } from './posts.component';
import { PostsDetailsComponent } from './posts-details/posts-details.component';

// services
import { PostsService } from './posts.service';

@NgModule({
  declarations: [
    PostsComponent,
    PostsDetailsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    PostsRoutingModule
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
