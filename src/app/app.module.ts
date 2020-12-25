import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/main-dashboard/dashboard.component';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './dashboard/orders/orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ClientsComponent } from './dashboard/clients/clients.component';
import { ItemsComponent } from './dashboard/items/items.component';
import { ProductsComponent } from './dashboard/products/products.component';
import { BrandsCategoriesComponent } from './dashboard/brands-categories/brands-categories.component';
import { MobileRepairComponent } from './dashboard/mobile-repair/mobile-repair.component';
import { LaptopRepairComponent } from './dashboard/laptop-repair/laptop-repair.component';
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    OrdersComponent,
    ClientsComponent,
    ItemsComponent,
    ProductsComponent,
    BrandsCategoriesComponent,
    MobileRepairComponent,
    LaptopRepairComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
