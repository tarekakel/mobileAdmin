import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/main-dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { ClientsComponent } from './dashboard/clients/clients.component';
import { ItemsComponent } from './dashboard/items/items.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { BrandsCategoriesComponent } from './dashboard/brands-categories/brands-categories.component';
import { MobileRepairComponent } from './dashboard/mobile-repair/mobile-repair.component';
import { LaptopRepairComponent } from './dashboard/laptop-repair/laptop-repair.component';




const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'itemsform', component: ItemsComponent },
  { path: 'productsform', component: ProductsComponent },
  { path: 'BrandsCategoriesform', component: BrandsCategoriesComponent },
  { path: 'MobileRepair', component: MobileRepairComponent },
  { path: 'LaptopRepair', component: LaptopRepairComponent },


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
