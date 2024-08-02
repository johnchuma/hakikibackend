const {Router} = require("express")
const { addUser, getUsers, confirmCode, deleteUser } = require("./users.controllers")
const router = Router()

router.post('/',addUser)
router.post('/confirm/:phone',confirmCode)
router.get('/',getUsers)
router.delete('/:uuid',deleteUser)

module.exports = router