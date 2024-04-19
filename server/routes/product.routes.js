const express = require("express");
const auth = require("../middleware/auth.middleware")
const Product = require("../models/Product");
const router = express.Router({mergeParams: true})

// router.get("/", async (req, res) => {
//     try {
//         const list = await Product.find();
//         res.status(200).send(list)
//     } catch (e) {
//         res.status(500).json({
//             message: "На сервере произошла ошибка. Попробуйте позже"
//         })
//     }
// })

router
    .route("/")
    .get(auth, async (req, res) => {
        try {
            const {orderBy, equalTo} = req.query
            const list = await Product.find({[orderBy]: equalTo })
            res.status(200).send(list)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
              });
        }
    })
    .post(auth, async (req, res) => {
        try {
            const newProduct = await Product.create({
                ...req.body,
                _id: req._id // ?
            })
            res.status(201).send(newProduct)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
router.patch("/:prodId", auth, async (req, res) => {
        try {
            const {prodId} = req.params
            console.log(prodId)

            if (prodId === req._id) {
                const updateProduct = await Product.findByIdAndUpdate(prodId, req.body, {new: true})
                res.status(201).send(updateProduct)
            } else {
                res.status(401).json({ message: "NOT_FOUND"})
            }
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })

    router.delete("/:prodId", auth, async (req, res) => {
        try {
            const {prodId} = req.params

            console.log("prodId", prodId)

            const removedProduct = await Product.findById(prodId)
            // const removedProduct = await Product.find({_id: prodId})

            if (removedProduct.prodId.toString() === req._id) {
                await removedProduct.remove()
                return res.send(null)
            } else {
                return res.status(401).json({ message: "Unauthorized delete" });
            }

        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже. delete",
            });
        }
    })

module.exports = router