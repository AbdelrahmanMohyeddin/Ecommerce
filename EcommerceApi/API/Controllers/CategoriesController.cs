using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CategoriesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IGenericRepository<ProductType> categoryRepo;
        private readonly IUnitOfWork _unitOfWork;
        public CategoriesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult<ProductType>> CreateCategory(CategoryToCreateDto categoryToCreateDto)
        {
            if (ModelState.IsValid && categoryToCreateDto != null)
            {
                var Category = _mapper.Map<CategoryToCreateDto, ProductType>(categoryToCreateDto);
                _unitOfWork.repository<ProductType>().Add(Category);
                var result = await _unitOfWork.Complete();
                if (result > 0)
                    return Ok(Category);
            }
            return BadRequest("Faild to create Category, Please repeate again!");
        }

        [HttpPut]
        public async Task<ActionResult<ProductType>> UpdateCategory(ProductType categoryToUpdate)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.repository<ProductType>().Update(categoryToUpdate);
                var result = await _unitOfWork.Complete();
                if (result > 0)
                    return Ok(GetCategoryById(categoryToUpdate.Id));
            }
            return BadRequest("Please check information and try again");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductType>> GetCategoryById(int id)
        {
            if (ModelState.IsValid)
            {
                var brand = await _unitOfWork.repository<ProductBrand>().GetByIdAsync(id);
                return Ok(brand);
            }
            return BadRequest("Please repeate again");
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductType>>> ProductCategory()
        {
            var Categories = await _unitOfWork.repository<ProductType>().GetListAsync();
            return Ok(Categories);
        }

        [HttpGet("categories")]
        public async Task<ActionResult> categoriesWithCountProduct()
        {
            v
            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCategory(ProductType productCategory)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.repository<ProductType>().Delete(productCategory);
                var result = await _unitOfWork.Complete();
                if (result > 0)
                    return Ok();
            }
            return BadRequest("Failed, Please Try again");
        }


    }
}
