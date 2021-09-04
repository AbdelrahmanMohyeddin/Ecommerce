using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Data.config
{
    class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(i => i.Price).HasColumnType("decimal(18,2)");
            builder.HasOne(i => i.ProductBrand).WithMany()
                .HasForeignKey(x => x.ProductBrandId);
            builder.HasOne(i => i.ProductType).WithMany()
                .HasForeignKey(x => x.ProductTypeId);
        }
    }
}
