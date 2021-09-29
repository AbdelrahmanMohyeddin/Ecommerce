import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../../shared/models/brand';
import { ProductServiceService } from '../../../services/product-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IProductType } from 'src/app/shared/models/productType';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @ViewChild('labelImport')
  labelImport: ElementRef;
  CreateProductForm:FormGroup;
  errors : string[];
  image:File;
  Types:IProductType[];
  Brands:IBrand[];
  constructor(private productServie:ProductServiceService,
    private router : Router,
    private brandService:BrandService,
    private categoryService:CategoryService,
    private toastr:ToastrService) { 
    this.getBrands();
    this.getTypes();
  }

  ngOnInit(): void {
    this.CreateForm();
  }

  get f(){
    return this.CreateProductForm.controls;
  }

  CreateForm(){
    this.CreateProductForm = new FormGroup({
      name:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      imageUrl:new FormControl('',Validators.required),
      productBrand:new FormControl('',Validators.required),
      productType:new FormControl('',Validators.required)
    });
  }

  onSubmit(){
    var formData = new FormData();
    formData.append("name",this.CreateProductForm.get('name').value);
    formData.append("description",this.CreateProductForm.get('description').value);
    formData.append("price",this.CreateProductForm.get('price').value);
    formData.append("imageUrl",this.image);
    formData.append("productBrand",this.CreateProductForm.get('productBrand').value);
    formData.append("productType",this.CreateProductForm.get('productType').value);

    this.productServie.CreateProduct(formData).subscribe(
      res =>{
        this.toastr.success("Success adding product")
      },err=>{
        this.toastr.warning("Failed to add product")
      }
    );
  }

  formImport: FormGroup;
  fileToUpload: File = null;

  onFileChange(files: FileList) {
    this.image = files[0];
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
    this.preview(files);
    this.import();
  }

  import(): void {
    console.log(this.fileToUpload);
  }

  /* Preview Image before uploading */
  public imagePath;
  imgURL: any;
  public message: string;
 
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  getBrands(){
    this.brandService.GetBrands().subscribe(res => {
      this.Brands = res;
    });
  }
  getTypes(){
    this.categoryService.GetCategories().subscribe(res => {
      this.Types = res;
    })
  }

}
