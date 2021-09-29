using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BrandsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public BrandsController(IMapper mapper,IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<ActionResult<ProductBrand>> CreateBrand(BrandToCreateDto brandToCreateDto)
        {
            if (ModelState.IsValid && brandToCreateDto != null)
            {
                var Brand = _mapper.Map<BrandToCreateDto, ProductBrand>(brandToCreateDto);
                _unitOfWork.repository<ProductBrand>().Add(Brand);
                var result =await _unitOfWork.Complete();
                if (result > 0)
                    return Ok(Brand);
            }
            return BadRequest("Faild to create brand, Please repeate again!");
        }

        [HttpPut]
        public async Task<ActionResult<ProductBrand>> UpdateBrand(ProductBrand brandToUpdate)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.repository<ProductBrand>().Update(brandToUpdate);
                var result = await _unitOfWork.Complete();
                if (result > 0)
                    return Ok(GetBrandById(brandToUpdate.Id));
            }
            return BadRequest("Please check information and try again");
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductBrand>> GetBrandById(int id)
        {
            if (ModelState.IsValid)
            {
                var brand = await _unitOfWork.repository<ProductBrand>().GetByIdAsync(id);
                return Ok(brand);
            }
            return BadRequest("Please repeate again");
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductBrand>>> ProductBrands()
        {
           var Brands = await _unitOfWork.repository<ProductBrand>().GetListAsync();
            return Ok(Brands);
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteBrand(ProductBrand productBrand)
        {
            if (ModelState.IsValid)
            {
                _unitOfWork.repository<ProductBrand>().Delete(productBrand);
                var result = await _unitOfWork.Complete();
                if (result > 0)
                    return Ok();
            }
            return BadRequest("Failed, Please Try again");
        }
    }
}
