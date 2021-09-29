export interface IProduct{
    id:number;
    name:string;
    description:string;
    price:number;
    imageUrl:string;
    productType:string;
    productBrand:string;
}

export interface IProductToCreate{
    name:string;
    description:string;
    price:number;
    imageUrl:File;
    productType:string;
    productBrand:string;
}