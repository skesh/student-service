import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/main.module').then((m) => m.MainModule) },
  {
    path: 'programs',
    loadChildren: () => import('./programs/programs.module').then((m) => m.ProgramsModule),
  },
  {
    path: 'learning',
    loadChildren: () => import('./learning/learning.module').then((m) => m.LearningModule),
  },
  {
    path: 'vacations',
    loadChildren: () => import('./vacations/vacations.module').then((m) => m.VacationsModule),
  },
  {
    path: 'internship',
    loadChildren: () => import('./internship/internship.module').then((m) => m.InternshipModule),
  },
  { path: 'visa', loadChildren: () => import('./visa/visa.module').then((m) => m.VisaModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
