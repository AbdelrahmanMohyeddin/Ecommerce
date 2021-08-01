using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParameter productParam)
            :base(x =>
            (string.IsNullOrEmpty(productParam.Search) || x.Name.Contains(productParam.Search))&&
            (!productParam.BrandId.HasValue || x.ProductBrandId == productParam.BrandId) &&
            (!productParam.TypeId.HasValue || x.ProductTypeId == productParam.TypeId))
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            ApplyPaging(productParam.PageSize * (productParam.PageIndex - 1) , productParam.PageSize);

            if (!String.IsNullOrEmpty(productParam.Sort))
            {
                switch (productParam.Sort)
                {
                    case "PriceAsc":
                        AddOrderBy(x => x.Price);
                        break;
                    case "PriceDesc":
                        AddOrderByDescending(x => x.Price);
                        break;
                    default:
                        AddOrderBy(x => x.Name);
                        break;
                }
            }
        }

        public ProductsWithTypesAndBrandsSpecification(int Id)
            :base(x => x.id == Id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}
