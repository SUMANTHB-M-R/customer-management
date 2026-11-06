const customerRepository = require("../repositories/customerRepository");

async function getAllCustomers(page, limit, search = "") {
  const result = await customerRepository.findAll(page, limit, search);

  const totalPages = Math.ceil(result.totalRecords / limit);

  return {
    customers: result.customers,
    pagination: {
      currentPage: page,
      totalPages,
      totalRecords: result.totalRecords,
      pageSize: limit,
    },
  };
}

function getCustomerById(id) {
  return customerRepository.findById(id);
}

function createCustomer(data) {
  return customerRepository.create(data);
}

function updateCustomer(id, data) {
  return customerRepository.update(id, data);
}

function deleteCustomer(id) {
  return customerRepository.remove(id);
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};