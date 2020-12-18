const express = require("express");
const router = express.Router();
const WishlistController = require("../controllers/WishlistController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.get("/", authentication, WishlistController.getWishlist);
router.post("/", authentication, WishlistController.addWishlist);
router.get("/:id", authentication, authorization, WishlistController.getWishlistId);
router.delete("/:id", authentication, authorization, WishlistController.deleteWishlist);

module.exports = router;
