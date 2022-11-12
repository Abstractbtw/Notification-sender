const Router = require("express")
const router = new Router()
const Service = require("../service/service")
const apiMiddleware = require("../middleware/api.middleware")


router.post('/registration', apiMiddleware.registration, async (req, res) => {
  Service.registration(req.body).then((user) => {res.json(user)})
})



router.post('/login', apiMiddleware.login, async (req, res) => {
  Service.login(req.body).then((user) => {res.json(user)})
})



router.post('/addtask', async (req, res) => {
  Service.addTask(req.body).then((task) => {res.json(task)})
})



router.post('/addfolder', async (req, res) => {
  Service.addFolder(req.body).then((folder) => {res.json(folder)})
})



router.put('/changefield/:_id', async (req, res) => {
  const {field, user, info, ind} = req.body
  if(field === "folder"){
    Service.changeFolder(user, info, ind).then((task) => {res.json(task)})
  } else {
    Service.changeField(field, user, info, ind).then((task) => {res.json(task)})
  }
  Service.updateHistory(field, user, info, ind).then((task) => {res.json(task)})
})



router.post('/addtime', async (req, res) => {
  const {user, ind, noteDate, finishDate, time} = req.body
  Service.addTime(ind, noteDate, finishDate, time).then((task) => {res.json(task)})
  Service.updateHistory("finishDate", user, finishDate, ind).then((task) => {res.json(task)})
})



router.post('/settimer', async (req, res) => {
  const {user, ind, offset, offsetTime} = req.body
  Service.setTimer(ind, offset, offsetTime).then((task) => {res.json(task)})
  Service.updateHistory("offset", user, offset, ind).then((task) => {res.json(task)})
})



module.exports = router