using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Services
{
    public class AccountService : IAccountRepository
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly AppIdentityDbContext _appIdentityDbContext;
        public AccountService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public int AccountsCount()
        {
            return 0;
        }
    }
}
