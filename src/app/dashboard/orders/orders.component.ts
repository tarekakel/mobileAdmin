import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';




export class statusModel {
  id: number;
  status: string;
}

export class OrderModel {
  id: number;
  date: string;
  clientName: string;
  totalPriceKr: number;
  status: string;
  orderStatusId: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderForm: FormGroup;
  NumberOfProducts;
  totalQuanity = 0;
  totalPrice = 0;
  statusM: statusModel[];
  products = [];
  order;
  orders: OrderModel[] = [];
  orderToEdit = new OrderModel();
  displayedColumns: string[] = ['id', 'date', 'clientName', 'totalPriceKr', 'status', 'DetailsButton'];
  dataSource: MatTableDataSource<OrderModel>;
  selection = new SelectionModel<OrderModel>(false, []);

  @ViewChild('closeEditModal') closeEditModal;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private apiService: ApiService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.apiService.GetOrders().subscribe((data: any[]) => {
      this.orders = data;
      console.log(data)
      this.dataSource = new MatTableDataSource<OrderModel>(this.orders);
      this.dataSource.sort = this.sort;
    });
    this.orderForm = this.formBuilder.group({
      orderStatusId: ['', Validators.required],
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  SubmitEditOrderStatus(selectedOrderID) {  
    if (this.orderForm.valid) {
      this.orderToEdit.id = selectedOrderID;
      this.ValidateOrderModel();
      this.apiService.UpdateOrderStatus(this.orderToEdit)
        .subscribe((sucess) => {
          this.toastr.success('Order Status Edited Successfuly', 'Edit Order Status');
          this.closeEditModal.nativeElement.click();
          location.reload();
        },
          (error) => {
            console.log(error);
            this.toastr.error(error, 'Faild');
          }
        );
    }
    else (this.toastr.error('Please check the form before saving'));
  }

  ValidateOrderModel() {
    this.orderToEdit.orderStatusId = Number(this.orderForm.value.orderStatusId);
  }

  Initilize() {
    this.apiService.GetOrderStatus().subscribe((data: any[]) => {
      this.statusM = data;
    });
    console.log(this.selection)
  }

  GetProductsOfOrder(id) {
    this.totalQuanity = 0;
    this.totalPrice = 0;

    this.apiService.GetOrderByOrderID(id).subscribe((Orderdata: any) => {
      this.order = Orderdata;
    });

    this.apiService.ProductsByOrderID(id).subscribe((data: any[]) => {
      this.products = data;
      this.NumberOfProducts = this.products.length;

      this.products.forEach(element => {
        this.totalQuanity += Number(element['quantity']);
        this.totalPrice += Number(element['quantity'] * element['priceKr']);
        console.log(element['quantity'])
      });
    });

    



  }

}



