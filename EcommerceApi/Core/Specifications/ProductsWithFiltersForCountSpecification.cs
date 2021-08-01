using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParameter productParam)
            : base(x =>
             (string.IsNullOrEmpty(productParam.Search) || x.Name.Contains(productParam.Search)) &&
             (!productParam.BrandId.HasValue || x.ProductBrandId == productParam.BrandId) &&
             (!productParam.TypeId.HasValue || x.ProductTypeId == productParam.TypeId))
        {


        }

    }
}
