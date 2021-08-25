using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string bayerEmail, int deliveryMethod, string basketId,Address address);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string bayerEmail);
        Task<Order> GetOrderByIdAsync(int id,string bayerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDelieryMethodsAsync();
    }
}
