using API.Dtos;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> productRepository;
        private readonly IGenericRepository<ProductBrand> productBrandsRepository;
        private readonly IGenericRepository<ProductType> productTypesRepository;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> ProductRepository,
            IGenericRepository<ProductBrand> ProductBrandRepository,
            IGenericRepository<ProductType> ProductTypesRepository,
            IMapper mapper)
        {
            productRepository = ProductRepository;
            productBrandsRepository = ProductBrandRepository;
            productTypesRepository = ProductTypesRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> Products([FromQuery]ProductSpecParameter productSpecParam)
        {
            var Spec = new ProductsWithTypesAndBrandsSpecification(productSpecParam);
            var CountSpec = new ProductsWithFiltersForCountSpecification(productSpecParam);

            var products = await productRepository.ListAsync(Spec);
            var TotaleItems = await productRepository.CountAsync(CountSpec);
            var Data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(productSpecParam.PageIndex,productSpecParam.PageSize,TotaleItems,Data));
        }

        [HttpGet("product/{id}")]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> Product(int id)
        {
            var Spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await productRepository.GetEntityWithSpec(Spec);
            return Ok(_mapper.Map<Product, ProductToReturnDto>(product));
        }


        [HttpGet("brands")]
        public async Task<ActionResult<List<Product>>> ProductBrands()
        {
            return Ok(await productBrandsRepository.GetListAsync());
        }


        [HttpGet("types")]
        public async Task<ActionResult<List<Product>>> ProductTypes()
        {
            return Ok(await productTypesRepository.GetListAsync());
        }


    }
}
