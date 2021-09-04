using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(p => p.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(p => p.ProductType, o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(p => p.ImageUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();

            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>().ReverseMap();

            CreateMap<Order, OrderToReturnDto>()
                .ForMember(p => p.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.Id))
                .ForMember(p => p.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));

            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(p => p.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(p => p.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProducyName))
                .ForMember(p => p.ImageUrl, o => o.MapFrom(s => s.ItemOrdered.ImageUrl))
                .ForMember(p => p.ImageUrl, o => o.MapFrom<OrderItemResolver>());
        }
    }
}
