using Core.Entities;
using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class Seed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            if (!context.ProductBrands.Any())
            {
                var BrandsFile = File.ReadAllText("../Infrastructure/Data/SeedData/Brands.json");
                var Brands = JsonSerializer.Deserialize<List<ProductBrand>>(BrandsFile);
                foreach (var Brand in Brands)
                {
                    await context.ProductBrands.AddAsync(Brand);
                }
                await context.SaveChangesAsync();
                
            }
            if (!context.ProductTypes.Any())
            {
                var TypesFile = File.ReadAllText("../Infrastructure/Data/SeedData/Types.json");
                var Types = JsonSerializer.Deserialize<List<ProductType>>(TypesFile);
                foreach (var Type in Types)
                {
                    context.ProductTypes.Add(Type);
                }
                await context.SaveChangesAsync();
            }
            if (!context.Products.Any())
            {
                var ProductsFile = File.ReadAllText("../Infrastructure/Data/SeedData/Products.json");
                var Products = JsonSerializer.Deserialize<List<Product>>(ProductsFile);
                foreach (var product in Products)
                {
                    context.Products.Add(product);
                }
                await context.SaveChangesAsync();
            }
            if (!context.DeliveryMethods.Any())
            {
                var DeliveryFile = File.ReadAllText("../Infrastructure/Data/SeedData/Delivery.json");
                var Methodes = JsonSerializer.Deserialize<List<DeliveryMethod>>(DeliveryFile);
                foreach (var method in Methodes)
                {
                    context.DeliveryMethods.Add(method);
                }
                await context.SaveChangesAsync();
            }
        } 
    }
}
