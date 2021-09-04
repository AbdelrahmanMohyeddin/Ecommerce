using API.Dtos;
using API.Errors;
using API.Extentions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper map)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = map;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginData)
        {
            var user = await _userManager.FindByEmailAsync(loginData?.Email);
            if (user == null) return BadRequest("Email Or Password Not Correct");
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginData.Password, false);
            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerData)
        {
            var user = new AppUser
            {
                DisplayName = registerData.DisplayName,
                Email = registerData.Email,
                UserName = registerData.Email
            };

            var result = await _userManager.CreateAsync(user, registerData.Password);
            if (!result.Succeeded) return BadRequest(new ApiResponse(400));
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }


        [HttpGet]
        public async Task<ActionResult<UserDto>> CurrentUser()
        {
            var user = await _userManager.GetUserByClaimsPrincipalAsync(HttpContext.User);
            if (user == null) return Unauthorized(new ApiResponse(401));
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetAddress()
        {
            var user = await _userManager.GetUserByClaimPrincleWithAddressAsync(HttpContext.User);
            return _mapper.Map<Address,AddressDto>(user.Address);
        }

        
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateAddress([FromBody]AddressDto address)
        {
            var user = await _userManager.GetUserByClaimPrincleWithAddressAsync(HttpContext.User);
            user.Address = _mapper.Map<AddressDto, Address>(address);
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded) return _mapper.Map<Address,AddressDto>(user.Address);
            return BadRequest("Problem During Updating!Repeat Again");
        }

        [HttpGet("emailexist")]
        public async Task<ActionResult<bool>> CheckExistEmail([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        

        
    }
}
