import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { BrandModel, CategoryModel } from '../brands-categories/brands-categories.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


export class ItemModel {
  id: number;
  name: string;
  description: string;
  releaseYear: number;
  mainImageUrl: string;
  categoryId: number;
  brandId: number;

  categoryName: string;
  brandName: string;
}


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  itemForm: FormGroup;
  brands: BrandModel[];
  categories: CategoryModel[];
  items: ItemModel[];
  itemToAdd = new ItemModel();
  displayedColumns: string[] = ['id', 'categoryName', 'brandName', 'name', 'description', 'releaseYear', 'mainImageUrl'];
  dataSource: MatTableDataSource<ItemModel>;
  selection = new SelectionModel<ItemModel>(false, []);

  @ViewChild('closeAddModal') closeAddModal;
  @ViewChild('closeEditModal') closeEditModal;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.apiService.GetItems().subscribe((data: any[]) => {
      this.items = data;
      this.dataSource = new MatTableDataSource<ItemModel>(this.items);
      this.dataSource.sort = this.sort;
    });

    this.itemForm = this.formBuilder.group({
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
      name: ['', Validators.required],
      description: [],
      releaseYear: [],
      mainImageUrl: [],
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  SubmitAddItem() {
    if (this.itemForm.valid) {
      this.ValidateItemModel();
      this.apiService.AddItem(this.itemToAdd)
        .subscribe((sucess) => {
          this.toastr.success('Item Added Successfuly', 'Add Item');
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

  SubmitEditItem(selectedItemID) {  
    if (this.itemForm.get('name').value != '') {
      this.itemToAdd.id = selectedItemID;
      this.ValidateItemModel();
      this.apiService.UpdateItem(this.itemToAdd)
        .subscribe((sucess) => {
          this.toastr.success('Item Edited Successfuly', 'Edit Item');
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

  ValidateItemModel() {
    this.itemToAdd.brandId = Number(this.itemForm.value.brandId);
    this.itemToAdd.categoryId = Number(this.itemForm.value.categoryId);
    this.itemToAdd.name = this.itemForm.value.name;
    this.itemToAdd.releaseYear = this.itemForm.value.releaseYear;
    this.itemToAdd.mainImageUrl = this.itemForm.value.mainImageUrl;
    this.itemToAdd.description = this.itemForm.value.description;
  }

  Initilize() {
    this.apiService.GetBrands().subscribe((data: any[]) => {
      this.brands = data;
    });

    this.apiService.GetCategories().subscribe((data: any[]) => {
      this.categories = data;
    });
  }

}

