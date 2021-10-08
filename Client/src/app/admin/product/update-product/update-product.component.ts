import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { IBrand } from 'src/app/shared/models/brand';
import { IProductType } from 'src/app/shared/models/productType';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
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
    private toastr:ToastrService,
    private actRoute:ActivatedRoute) { 
    this.getBrands();
    this.getTypes();
  }

  ngOnInit(): void {
    this.CreateForm();
    this.GetProductDetails();
  }

  GetProductDetails(){
    this.productServie.GetProduct(this.actRoute.snapshot.params.id).subscribe(
      res=>{
        if(res){
          this.CreateProductForm?.patchValue(res);
        }
      },err=>{
        console.log(err);
      }
    )
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

    this.productServie.UpdateProduct(formData).subscribe(
      res =>{
        this.toastr.success("Success update product")
      },err=>{
        this.toastr.warning("Failed to update product")
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
