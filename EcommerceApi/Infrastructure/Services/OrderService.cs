using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IBasketRepository _basket;
        private readonly IPaymentService _paymentService;

        public OrderService(IUnitOfWork unitOfWork,
            IBasketRepository basket,
            StoreContext context,
            IPaymentService paymentService)
        {
            _unitOfWork = unitOfWork;
            _basket = basket;
            _paymentService = paymentService;
        }

        public async Task<Order> CreateOrderAsync(string bayerEmail, int deliveryMethodId, string basketId, Address address)
        {
            // basket
            var basket = await _basket.GetBasketAsync(basketId);

            if (basket == null) return null;
            // products
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.ImageUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
      
                items.Add(orderItem);
            }

            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // deliveryMethod
            var deliveryMethod = await _unitOfWork.repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            var spec = new OrderByPaymentWithItemsSpecification(basket.PaymentIntentId);

            var existingOrder = await _unitOfWork.repository<Order>().GetEntityWithSpec(spec);


            if(existingOrder != null)
            {
                _unitOfWork.repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }


            var order = new Order(items, bayerEmail, address, deliveryMethod, subtotal, basket.PaymentIntentId);

            _unitOfWork.repository<Order>().Add(order);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDelieryMethodsAsync()
        {
            return await _unitOfWork.repository<DeliveryMethod>().GetListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string bayerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id,bayerEmail);
            return await _unitOfWork.repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string bayerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(bayerEmail);
            return await _unitOfWork.repository<Order>().ListAsync(spec);
        }
    }
}
