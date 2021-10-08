using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> productRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;


        public ProductsController(IGenericRepository<Product> ProductRepository,
            IMapper mapper,
            IUnitOfWork unitOfWork)
        {
            productRepository = ProductRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> Products([FromQuery] ProductSpecParameter productSpecParam)
        {
            var Spec = new ProductsWithTypesAndBrandsSpecification(productSpecParam);
            var CountSpec = new ProductsWithFiltersForCountSpecification(productSpecParam);

            var products = await productRepository.ListAsync(Spec);
            var TotaleItems = await productRepository.CountAsync(CountSpec);
            var Data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(new Pagination<ProductToReturnDto>(productSpecParam.PageIndex, productSpecParam.PageSize, TotaleItems, Data));
        }

        [HttpPost]
        public ActionResult<ProductToReturnDto> CreateProduct([FromForm] ProductToCreateDto productToCreate)
        {
            if (productToCreate != null)
            {
                UploadFile uploadFile = new UploadFile();
                List<string> Path = new List<string> { "images", "products" };
                string imageUrl = uploadFile.UploadedFile(productToCreate.ImageUrl, Path);

                var product = new Product()
                {
                    Name = productToCreate.Name,
                    Description = productToCreate.Description,
                    Price = productToCreate.Price,
                    ImageUrl = imageUrl,
                    ProductBrandId = productToCreate.ProductBrand,
                    ProductTypeId = productToCreate.ProductType
                };

                productRepository.Add(product);

                return Ok(_mapper.Map<Product, ProductToReturnDto>(product));
            }
            return BadRequest(new ApiResponse(400, "Product details can not be null"));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateProduct(ProductToUpdateDto productToUpdate)
        {
            if (ModelState.IsValid && productToUpdate != null)
            {
                if(await _unitOfWork.repository<Product>().GetByIdAsync(productToUpdate.Id) != null)
                {
                    var product = _mapper.Map<ProductToUpdateDto, Product>(productToUpdate);
                    _unitOfWork.repository<Product>().Update(product);
                    if (await _unitOfWork.Complete() > 0)
                        return Ok(_mapper.Map<Product,ProductToReturnDto>(product));
                }
            }
            return BadRequest("Faild update, Please try again");
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> Product(int id)
        {
            var Spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await productRepository.GetEntityWithSpec(Spec);
            return Ok(_mapper.Map<Product, ProductToReturnDto>(product));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            if (ModelState.IsValid)
            {
                var product = await productRepository.GetByIdAsync(id);
                if (product != null)
                {
                    _unitOfWork.repository<Product>().Delete(product);
                    if (await _unitOfWork.Complete() > 0)
                        return Ok();
                }
            }
            return BadRequest();
        }
    }
}
