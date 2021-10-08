using Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Specifications
{
    public class CategoriesWithCountOfProducts : BaseSpecification<ProductType>
    {
        public CategoriesWithCountOfProducts()
        {
            AddInclude(x => x);
        }
    }
}
