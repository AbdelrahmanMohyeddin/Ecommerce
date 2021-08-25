using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepository<Order> _orderRepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<DeliveryMethod> _deliveryMethodRepo;
        private readonly IBasketRepository _basket;

        public OrderService(IGenericRepository<Order> orderRepo,
            IGenericRepository<Product> productRepo,
            IGenericRepository<DeliveryMethod> deliveryMethodRepo, 
            IBasketRepository basket)
        {
            _orderRepo = orderRepo;
            _productRepo = productRepo;
            _deliveryMethodRepo = deliveryMethodRepo;
            _basket = basket;
        }

        public async Task<Order> CreateOrderAsync(string bayerEmail, int deliveryMethodId, string basketId, Address address)
        {
            // basket
            var basket = await _basket.GetBasketAsync(basketId);
            // products
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _productRepo.GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.id, productItem.Name, productItem.ImageUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // deliveryMethod
            var deliveryMethod = await _deliveryMethodRepo.GetByIdAsync(deliveryMethodId);

            var order = new Order(items,bayerEmail,address,deliveryMethod,subtotal);

            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDelieryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string bayerEmail)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string bayerEmail)
        {
            throw new NotImplementedException();
        }
    }
}
