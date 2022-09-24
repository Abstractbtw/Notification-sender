const Router = require("express")
const router = new Router()
const Service = require("../service/service")
const apiMiddleware = require("../middleware/api.middleware")


router.post('/registration', apiMiddleware.registration, async (req, res, next) => {

    const {email, name, password, hashPassword, telegram} = req.body
    Service.registration(email, name, password, hashPassword, telegram).then((user) => {res.json(user)})

})



router.post('/login', apiMiddleware.login, async (req, res, next) => {

      const {email, password} = req.body
      Service.login(email, password).then((user) => {res.json(user)})

})



router.post('/addtask', async (req, res) => {

    const {name, desc, to, finishDate, offset, offsetTime, status, folder, folderId, active} = req.body
    Service.AddTask(name, desc, to, finishDate, offset, offsetTime, status, folder, folderId, active).then((task) => {res.json(task)})

})



router.post('/addfolder', async (req, res) => {

    const {foldername, email} = req.body
    Service.AddFolder(foldername, email).then((folder) => {res.json(folder)})

})



router.put('/changefield/:_id', async (req, res) => {

    const {field, user, info, ind} = req.body
    Service.ChangeField(field, user, info, ind).then((task) => {res.json(task)})

})



router.post('/addtime', async (req, res) => {

    const {ind, noteDate, finishDate, time} = req.body
    Service.AddTime(ind, noteDate, finishDate, time).then((task) => {res.json(task)})

})



router.post('/settimer', async (req, res) => {

    const {ind, offset, offsetTime} = req.body
    Service.SetTimer(ind, offset, offsetTime).then((task) => {res.json(task)})

})



module.exports = router