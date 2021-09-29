using Core.Entities.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Core.Specifications
{
    public class OrderByPaymentWithItemsSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentWithItemsSpecification(string paymentIntentId)
            :base(e => e.PaymentIntentId == paymentIntentId)
        {

        }
    }
}
