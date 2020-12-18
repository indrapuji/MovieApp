const { Wishlist } = require("../models");

class WishlistController {
  static getWishlist(req, res) {
    let option = { where: { userId: req.user.id } };
    Wishlist.findAll(option)
      .then((wishlist) => {
        res.status(200).json(wishlist);
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server Error",
        });
      });
  }

  static getWishlistId(req, res) {
    const option = { where: { id: req.params.id } };
    Wishlist.findOne(option)
      .then((wishlist) => {
        if (wishlist) {
          res.status(200).json(wishlist);
        } else {
          res.status(404).json({
            message: "wishlist not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server Error",
        });
      });
  }

  static addWishlist(req, res) {
    const { movieId } = req.body;
    Wishlist.create({
      movieId,
      userId: req.user.id,
    })
      .then((wishlist) => {
        res.status(201).json(wishlist);
      })
      .catch((err) => {
        if (err.errors) {
          let errData = [];
          for (let i = 0; i < err.errors.length; i++) {
            errData.push({ message: err.errors[i].message });
          }
          res.status(400).json(errData);
        } else {
          res.status(500).json({
            message: "Internal server Error",
          });
        }
      });
  }

  static deleteWishlist(req, res) {
    const option = { where: { id: req.params.id } };
    let deleteData = null;
    Wishlist.findOne(option)
      .then((data) => {
        if (!data) {
          res.status(404).json({
            message: "wishlist Not Found",
          });
        } else {
          deleteData = data;
          return Wishlist.destroy(option);
        }
      })
      .then(() => {
        res.status(200).json({
          deleteData,
          message: "Has been Deleted",
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal server Error",
        });
      });
  }
}

module.exports = WishlistController;
