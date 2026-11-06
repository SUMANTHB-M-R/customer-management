
import { useCallback, useEffect, useState } from "react";

import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService";

import Header from "../components/Header";

const PAGE_SIZE = 10;

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0,
    pageSize: PAGE_SIZE,
  });

  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [dialogError, setDialogError] = useState("");

  const loadCustomers = useCallback(async (page, searchText) => {
    try {
      setErrorMessage("");

      const result = await getAllCustomers(
        page,
        PAGE_SIZE,
        searchText
      );

      setCustomers(result.data);
      setPagination(result.pagination);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  useEffect(() => {
    loadCustomers(currentPage, search);
  }, [currentPage, search, loadCustomers]);

  function handleAddClick() {
    setEditingCustomer(null);
    setName("");
    setEmail("");
    setDialogError("");
    setShowDialog(true);
  }

  function handleEditClick(customer) {
    setEditingCustomer(customer);
    setName(customer.name);
    setEmail(customer.email);
    setDialogError("");
    setShowDialog(true);
  }

  async function handleSaveCustomer(event) {
    event.preventDefault();

    try {
      setDialogError("");

      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, {
          name,
          email,
        });

        setShowDialog(false);
        setEditingCustomer(null);
        setName("");
        setEmail("");

        await loadCustomers(currentPage, search);
      } else {
        await createCustomer({ name, email });

        setShowDialog(false);
        setName("");
        setEmail("");

        if (currentPage !== 1) {
          setCurrentPage(1);
        } else {
          await loadCustomers(1, search);
        }
      }
    } catch (error) {
      setDialogError(error.message);
    }
  }

  async function handleDeleteCustomer() {
    if (!customerToDelete) return;

    try {
      setErrorMessage("");

      await deleteCustomer(customerToDelete.id);

      setCustomerToDelete(null);

      if (customers.length === 1 && currentPage > 1) {
        setCurrentPage((page) => page - 1);
      } else {
        await loadCustomers(currentPage, search);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setCurrentPage(1);
  }

  function handleClearSearch() {
    setSearch("");
    setCurrentPage(1);
  }

  function handleCloseDialog() {
    setShowDialog(false);
    setEditingCustomer(null);
    setName("");
    setEmail("");
    setDialogError("");
  }

  const totalPages = Math.max(1, pagination.totalPages || 1);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="customers-page">
      <Header />

      <main className="customers-content">
        <div className="customers-title-row">
          <div className="customers-heading">
            <h2>Customers</h2>
            <p>Manage your customer information</p>
          </div>

          <div className="customer-search">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={handleSearchChange}
            />

            {search && (
              <button
                type="button"
                className="clear-search-button"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <button onClick={handleAddClick}>
            + Add Customer
          </button>
        </div>

        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-message">
                    {search
                      ? "No matching customers found."
                      : "No customers found."}
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>
                      <button
                        onClick={() => handleEditClick(customer)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => setCustomerToDelete(customer)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <span className="pagination-info">
            Total customers: {pagination.totalRecords}
          </span>

          <div className="pagination-controls">
            <button
              className="pagination-button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((page) => page - 1)}
            >
              Previous
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                className={`pagination-button ${
                  currentPage === page ? "active-page" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="pagination-button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
            >
              Next
            </button>
          </div>

          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </main>

      {/* Add / Edit Customer Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <form onSubmit={handleSaveCustomer}>
            <h3>
              {editingCustomer ? "Edit Customer" : "Add New Customer"}
            </h3>

            {dialogError && (
              <div className="error-message">
                {dialogError}
              </div>
            )}

            <label>
              Name <span className="required-star">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />

            <label>
              Email <span className="required-star">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter customer email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <div className="dialog-actions">
              <button type="submit">
                Save Customer
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {customerToDelete && (
        <div className="dialog-overlay">
          <div className="confirm-dialog">
            <h3>Confirm Delete</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>{customerToDelete.name}</strong>?
            </p>

            <div className="dialog-actions">
              <button
                className="delete-button"
                onClick={handleDeleteCustomer}
              >
                Confirm Delete
              </button>

              <button
                className="cancel-button"
                onClick={() => setCustomerToDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomersPage;
