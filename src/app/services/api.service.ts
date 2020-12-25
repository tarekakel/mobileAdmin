import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }


  public GetApiURL() {
    return 'http://localhost:5432/api/';
  }

  // Get clients
  public GetClients() {
    return this.httpClient.get(this.GetApiURL() + 'Admin/GetClients');
  }

  // Get Brands
  public GetBrands() {
    return this.httpClient.get(this.GetApiURL() + 'Admin/GetBrands');
  }

  // Get Categories
  public GetCategories() {
    return this.httpClient.get(this.GetApiURL() + 'Admin/GetCategories');
  }

  // Get Categories
  public GetOrders() {
    return this.httpClient.get(this.GetApiURL() + 'Admin/GetOrders');
  }

  // Get Items
  public GetItems() {
    return this.httpClient.get(this.GetApiURL() + 'Admin/GetItems');
  }

  // Get Products
  public GetProducts() {
    return this.httpClient.get(this.GetApiURL() + 'Admin/GetProducts');
  }

  // Get Products By OrderID
  public ProductsByOrderID(id) {
    return this.httpClient.get(this.GetApiURL() + 'Admin/ProductsByOrderID?id=' + id);
  }

  // Get GetOrder By OrderID
  public GetOrderByOrderID(id) {
    return this.httpClient.get(this.GetApiURL() + 'Admin/GetOrderByOrderID?id=' + id);
  }

  // Get ProductTypes
  public GetProductTypes() {
    return this.httpClient.get(this.GetApiURL() + 'Admin/GetProductTypes');
  }

  // Get OrderStatus
  public GetOrderStatus() {
    return this.httpClient.get(this.GetApiURL() + 'Admin/GetOrderStatus');
  }

  // Edit Order Status
  public UpdateOrderStatus(order) {
    return this.httpClient.put(this.GetApiURL() + 'Admin/UpdateOrderStatus', order);
  }

  // Add Item
  public AddItem(item) {
    return this.httpClient.post(this.GetApiURL() + 'Admin/AddItem', item);
  }

  // Edit Item
  public UpdateItem(item) {
    return this.httpClient.put(this.GetApiURL() + 'Admin/UpdateItem', item);
  }

  // Add Product
  public AddProduct(product) {
    return this.httpClient.post(this.GetApiURL() + 'Admin/AddProduct', product);
  }

  // Edit Product
  public UpdateProduct(product) {
    return this.httpClient.put(this.GetApiURL() + 'Admin/UpdateProduct', product);
  }

  // Add Brand
  public AddBrand(brand) {
    return this.httpClient.post(this.GetApiURL() + 'Admin/AddBrand', brand);
  }

  // Edit Brand
  public UpdateBrand(brand) {
    return this.httpClient.put(this.GetApiURL() + 'Admin/UpdateBrand', brand);
  }

  // Add Category
  public AddCategory(categoy) {
    return this.httpClient.post(this.GetApiURL() + 'Admin/AddCategory', categoy);
  }

  // Edit Category
  public UpdateCategory(categoy) {
    return this.httpClient.put(this.GetApiURL() + 'Admin/UpdateCategory', categoy);
  }


}