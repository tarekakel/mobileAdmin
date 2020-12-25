import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any[];
  items: any[];
  brands: any[];
  NumberOfProducts;
  NumberOfClients;
  NumberOfOrders;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.GetProducts().subscribe((data: any[]) => {
      this.products = data;
      this.NumberOfProducts = this.products.length;
    });

    this.apiService.GetItems().subscribe((data: any[]) => {
      this.items = data;
    });

    this.apiService.GetBrands().subscribe((data: any[]) => {
      this.brands = data;
    });

    this.apiService.GetClients().subscribe((data: any[]) => {
      this.NumberOfClients = data.length;
    });

    this.apiService.GetOrders().subscribe((data: any[]) => {
      this.NumberOfOrders = data.length;
    });

  }
}
