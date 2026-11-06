const express = require("express");
const customerController = require("../controllers/customerController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, customerController.getAllCustomers);

router.get("/:id", authMiddleware, customerController.getCustomerById);

router.post("/", authMiddleware, customerController.createCustomer);

router.put("/:id", authMiddleware, customerController.updateCustomer);

router.delete("/:id", authMiddleware, customerController.deleteCustomer);

module.exports = router;