const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizationMiddleware")

const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories
} = require("../controllers/categoryController");

/**
 * @description To create categories
 * @api /api/category/create
 * @access Private
 * @type POST 
 * @return response
 */

router.post("/create", auth, authorizeRole("admin"), createCategory);

/**
 * @description To get all categories
 * @api /api/category/all
 * @access Public
 * @type GET
 * @return response
 */
router.get("/all", getCategories);

/**
 * @description To update categories by id
 * @api /api/category/update/:id
 * @access Private
 * @type PUT
 * @return response
 */
router.patch("/update/:id", auth, authorizeRole("admin"), updateCategory);

/**
 * @description To delete categories by id
 * @api /api/category/delete/:id
 * @access Private
 * @type DELETE
 * @return response
 */
router.delete("/delete/:id", auth, authorizeRole("admin"), deleteCategory);

module.exports = router;


// patch only some field update, patch says only this data updated
// put says all data udpated, and it can update all

