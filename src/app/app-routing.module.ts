import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { LoginComponent } from './login/login.component';
import { ProduitsComponent } from './produits/produits.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:"products/:urlProds", component:ProduitsComponent},
  {path:"login", component:LoginComponent},
  {path:"adminCategories", component:AdminCategoriesComponent},
  {path:"adminUsers", component:AdminUsersComponent},
  {path:"adminProducts", component:AdminProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
