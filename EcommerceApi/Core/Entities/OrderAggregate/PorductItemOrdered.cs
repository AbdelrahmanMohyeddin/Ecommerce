using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Core.Entities.OrderAggregate
{
    public class ProductItemOrdered
    {
        [Key]
        public int ProductItemId { get; set; }
        public string ProducyName { get; set; }
        public string ImageUrl { get; set; }
        public ProductItemOrdered()
        {
        }
        public ProductItemOrdered(int productItemId, string producyName, string imageUrl)
        {
            ProductItemId = productItemId;
            ProducyName = producyName;
            ImageUrl = imageUrl;
        }
    }
}
