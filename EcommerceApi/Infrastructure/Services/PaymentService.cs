using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Product = Core.Entities.Product;

namespace Infrastructure.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _config;
        private readonly IBasketRepository _basket;
        private readonly IUnitOfWork _unitOfWork;

        public PaymentService(IConfiguration config, IBasketRepository basketRepository,IUnitOfWork unitOfWork)
        {

            _config = config;
            _basket = basketRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var basket = await _basket.GetBasketAsync(basketId);

            foreach (var item in basket.Items)
            {
                var product = await _unitOfWork.repository<Product>().GetByIdAsync(item.Id);
                if(item.Price != product.Price)
                {
                    item.Price = product.Price;
                }
            }

            var shippingPrice = 0m;
            if(basket.DeliveryMethodId.HasValue)
            {
                var deliveryMethod = await _unitOfWork.repository<DeliveryMethod>()
                    .GetByIdAsync((int)basket.DeliveryMethodId);
                shippingPrice = deliveryMethod.Price;
            }

            var service = new PaymentIntentService();
            var intent = new PaymentIntent();


            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions()
                {
                    Amount =(long) basket.Items.Sum(i => i.Quantity * (i.Price * 100)) +
                            (long) shippingPrice * 100,
                    Currency = "usd",
                    PaymentMethodTypes =new List<string>{"card"}

                };
                intent = await service.CreateAsync(options);
                basket.ClientSecret = intent.ClientSecret;
                basket.PaymentIntentId = intent.Id;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions()
                {
                    Amount = (long)basket.Items.Sum(i => i.Quantity * (i.Price * 100)) +
                            (long)shippingPrice * 100
                };
                intent = await service.UpdateAsync(basket.PaymentIntentId, options);
            }
            await _basket.UpdateBasketAsync(basket);
            return basket;
        }
    }
}
