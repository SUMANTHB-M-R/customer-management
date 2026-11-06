const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function getAllCustomers(page = 1, limit = 10, search = "") {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/customers?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch customers");
  }

  return data;
}

export async function getCustomerById(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to fetch customer");
  }

  return data;
}

export async function createCustomer(customer) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to create customer");
  }

  return data;
}

export async function updateCustomer(id, customer) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(customer),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to update customer");
  }

  return data;
}

export async function deleteCustomer(id) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to delete customer");
  }

  return data;
}