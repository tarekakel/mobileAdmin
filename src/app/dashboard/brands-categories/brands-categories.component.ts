import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


export class BrandModel {
  id: number;
  name: string;
  priority: number;
  iconName: string;
  mainImageUrl: string;
}

export class CategoryModel {
  id: number;
  name: string;
}

@Component({
  selector: 'app-brands-categories',
  templateUrl: './brands-categories.component.html',
  styleUrls: ['./brands-categories.component.scss']
})
export class BrandsCategoriesComponent implements OnInit {

  brandForm: FormGroup;
  categoryForm: FormGroup;

  brandToAdd = new BrandModel();
  categoryToAdd = new CategoryModel();

  brands: BrandModel[];
  categories: CategoryModel[];

  displayedColumnsC: string[] = ['id', 'name'];
  displayedColumnsB: string[] = ['id', 'name', 'priority', 'iconName', 'mainImageUrl'];

  dataSourceB: MatTableDataSource<BrandModel>;
  dataSourceC: MatTableDataSource<CategoryModel>;
  selectionB = new SelectionModel<BrandModel>(false, []);
  selectionC = new SelectionModel<CategoryModel>(false, []);

  @ViewChild('closeAddBrandModal') closeAddBrandModal;
  @ViewChild('closeEditBrandModal') closeEditBrandModal;

  @ViewChild('closeAddCategoryModal') closeAddCategoryModal;
  @ViewChild('closeEditCategoryModal') closeEditCategoryModal;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiService, private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.apiService.GetBrands().subscribe((data: any[]) => {
      this.brands = data;
      this.dataSourceB = new MatTableDataSource<BrandModel>(this.brands);
      this.dataSourceB.sort = this.sort;
    });

    this.apiService.GetCategories().subscribe((data: any[]) => {
      this.categories = data;
      this.dataSourceC = new MatTableDataSource<CategoryModel>(this.categories);
    });

    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required],
      priority: [],
      iconName: [],
      mainImageUrl: [],
    });

    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  SubmitAddBrand() {
    if (this.brandForm.valid) {
      this.ValidateBrandModel();
      this.apiService.AddBrand(this.brandToAdd)
        .subscribe((sucess) => {
          this.closeAddBrandModal.nativeElement.click();
          location.reload();
        },
          (error) => {
            console.log(error);
            this.toastr.error(error, 'Faild');
          }
        );
    }
  }

  SubmitEditBrand(selectedBrandID) {
    if (this.brandForm.get('name').value != '') {
      this.brandToAdd.id = selectedBrandID;
      this.ValidateBrandModel();
      this.apiService.UpdateBrand(this.brandToAdd)
        .subscribe((sucess) => {
          this.toastr.success('Brand Edited Successfuly', 'Edit Brand');
          this.closeEditBrandModal.nativeElement.click();
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


  SubmitAddCategory() {
    if (this.categoryForm.valid) {
      this.ValidateCategoryModel();
      this.apiService.AddCategory(this.categoryToAdd)
        .subscribe((sucess) => {
          this.closeAddCategoryModal.nativeElement.click();
          location.reload();
        },
          (error) => {
            console.log(error);
            this.toastr.error(error, 'Faild');
          }
        );
    }
  }

  SubmitEditCategory(selectedCategoryID) {
    if (this.categoryForm.get('name').value != '') {
      console.log('sss')
      this.categoryToAdd.id = selectedCategoryID;
      this.ValidateCategoryModel();
      this.apiService.UpdateCategory(this.categoryToAdd)
        .subscribe((sucess) => {
          this.toastr.success('Category Edited Successfuly', 'Edit Category');
          this.closeEditCategoryModal.nativeElement.click();
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


  ValidateBrandModel() {
    this.brandToAdd.name = this.brandForm.value.name;
    this.brandToAdd.priority = Number(this.brandForm.value.priority);
    this.brandToAdd.iconName = this.brandForm.value.iconName;
    this.brandToAdd.mainImageUrl = this.brandForm.value.mainImageUrl;

  }

  ValidateCategoryModel() {
    this.categoryToAdd.name = this.categoryForm.value.name;
  }




}
