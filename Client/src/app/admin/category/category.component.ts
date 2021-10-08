import { IProductType } from './../../shared/models/productType';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories:IProductType[];
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.GetCategories().subscribe(
      res =>{
        this.categories = res;
      },err=>{
        console.log(err);
      }
    )
  }

}
