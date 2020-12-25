import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ItemModel } from '../items/items.component';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


export class productTypeModel {
  id: number;
  type: string;
}

export class ProductModel {
  id: number;
  name: string;
  brand: string;
  productTypeName: string;
  description: string;
  priceKr: number;
  itemName: string;
  onSale: boolean;
  isTrending: boolean;
  youtubeUrl: string;

  productImages: string[];
  productTypeId: number;
  itemId: number;
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm: FormGroup;
  productType: productTypeModel[];
  items: ItemModel[];
  products: ProductModel[] = [];
  ProductToAdd = new ProductModel();
  displayedColumns: string[] = ['id', 'name', 'brand', 'productTypeName', 'description', 'priceKr', 'itemName', 'onSale', 'isTrending', 'youtubeUrl'];
  dataSource: MatTableDataSource<ProductModel>;
  selection = new SelectionModel<ProductModel>(false, []);


  @ViewChild('closeAddModal') closeAddModal;
  @ViewChild('closeEditModal') closeEditModal;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private apiService: ApiService, private toastr: ToastrService, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.apiService.GetProducts().subscribe((data: any[]) => {
      this.products = data;
      console.log(data)
      this.dataSource = new MatTableDataSource<ProductModel>(this.products);
      this.dataSource.sort = this.sort;
    });

    this.productForm = this.formBuilder.group({
      itemId: ['', Validators.required],
      productTypeId: ['', Validators.required],
      name: ['', Validators.required],
      brand: [],
      priceKr: [],
      youtubeUrl: [],
      description: [],
      onSale: [],
      isTrending: [],
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  SubmitAddProduct() {
    console.log(this.productForm);
    if (this.productForm.valid) {
      this.ValidateProductModel();
      this.apiService.AddProduct(this.ProductToAdd)
        .subscribe((sucess) => {
          this.toastr.success('Product Added Successfuly', 'Add Product');
          this.closeAddModal.nativeElement.click();
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

  SubmitEditProduct(selectedProductID) {  
    console.log(this.productForm);

    if (this.productForm.get('name').value != '') {
      this.ProductToAdd.id = selectedProductID;
      this.ValidateProductModel();
      this.apiService.UpdateProduct(this.ProductToAdd)
        .subscribe((sucess) => {
          this.toastr.success('Product Edited Successfuly', 'Edit Product');
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

  ValidateProductModel() {
    this.ProductToAdd.itemId = Number(this.productForm.value.itemId);
    this.ProductToAdd.productTypeId = Number(this.productForm.value.productTypeId);
    this.ProductToAdd.name = this.productForm.value.name;
    this.ProductToAdd.brand = this.productForm.value.brand;
    this.ProductToAdd.priceKr = Number(this.productForm.value.priceKr);
    this.ProductToAdd.youtubeUrl = this.productForm.value.youtubeUrl;
    this.ProductToAdd.description = this.productForm.value.description;
    this.ProductToAdd.onSale = this.productForm.value.onSale;
    this.ProductToAdd.isTrending = this.productForm.value.isTrending;
  }

  Initilize() {
    this.apiService.GetItems().subscribe((data: any[]) => {
      this.items = data;
    });

    this.apiService.GetProductTypes().subscribe((data: any[]) => {
      this.productType = data;
    });
    console.log(this.selection)
  }
}

