const {Router} = require("express")
const { validateJWT } = require("../../utils/validateJWT")
const { addProduct, deleteProduct, getProducts, getSupplierProducts, getProduct } = require("./products.controllers")
const upload = require("../../utils/upload")
const router = Router()

router.post('/',validateJWT, upload.single('file'), addProduct)
router.get('/',validateJWT, getProducts)
router.get('/supplier',validateJWT, getSupplierProducts)
router.get('/:uuid',validateJWT, getProduct)
router.delete('/:uuid',deleteProduct)

module.exports = router