using API.Dtos;
using API.Errors;
using API.Extentions;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<OrderToReturnDto>> CreateOreder(OrderDto order)
        {
            var email = HttpContext.User.RetriveEmailPrincipal();
            var address = _mapper.Map<AddressDto, Address>(order.ShipToAddress);
            var orderResult = await _orderService.CreateOrderAsync(email, order.DeliveryMethodId, order.BasketId, address);
            if (orderResult == null) return BadRequest(new ApiResponse(400));
            return _mapper.Map<Order,OrderToReturnDto> (orderResult);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> OrdersForUser()
        {
            var email = HttpContext.User.RetriveEmailPrincipal();
            var orders = await _orderService.GetOrdersForUserAsync(email);
            return Ok(_mapper.Map<IReadOnlyList<Order>,IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> OrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetriveEmailPrincipal();
            var order = await _orderService.GetOrderByIdAsync(id, email);
            if (order == null) return NotFound(new ApiResponse(404));
            return Ok(_mapper.Map<Order,OrderToReturnDto>(order));
        }

        [HttpGet("DeliveryMethod")]
        public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> DeliveryMethods()
        {
            return Ok(await _orderService.GetDelieryMethodsAsync());
        } 
    }
}
