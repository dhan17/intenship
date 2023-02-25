const express = require("express");
const {
  getAllItems,
  createItem,
  updateItem,
  deleteitem,
  getItemDetails,
  getAdminItems,
} = require("../controllers/foodController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/fooditems").get(getAllItems);

router
  .route("/admin/fooditems")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminItems);

router
  .route("/admin/fooditem/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createItem);

router
  .route("/admin/fooditem/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateItem)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteitem);

router.route("/Menu/fooditem/:id").get(getItemDetails);

module.exports = router;
