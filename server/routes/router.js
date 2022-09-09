const Router = require("express")
const User = require("../models/User")
const Task = require("../models/Task")
const Folder = require("../models/Folder")
const bcrypt = require("bcryptjs")
const router = new Router()
const { ObjectId } = require('mongodb')


router.post('/registration',
  async (req, res) => {
  try {

    const {email, name, password, telegram} = req.body

    const hashPassword = await bcrypt.hash(password, 4)

    const user = new User({
      email,
      name,
      password: hashPassword,
      telegram,
    })

    const folder = new Folder({
      user_email: email,
      name: "default"
    })

    await user.save()
    await folder.save()
    return res.json()

  } catch (e) {
    return next()
  }
})



router.post('/login', async (req, res) => {

  try {

    const {email, password} = req.body
    const user = await User.findOne({email})

    const isPassValid = bcrypt.compareSync(password, user.password)
    if (isPassValid) {
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          telegram: user.telegram
        }
      })
    }


  } catch (e) {
    return next()
  }
})



router.post('/addtask',
  async (req, res) => {

  try {

    const {name, user, desc, to, finishDate, offset, offsetTime, status, folder, active} = req.body

    const task = new Task({
      user_email: user,
      name, 
      desc, 
      to, 
      finishDate,
      offset,
      offsetTime, 
      status, 
      folder, 
      active
    })

    await task.save()

    return res.json()

  } catch (e) {
    return next()
  }
})



router.post('/addfolder',
  async (req, res) => {

  try {

    const {name, user} = req.body

    const folder = new Folder({
      name: name,
      user_email: user
    })

    await folder.save()
    return res.json()

  } catch (e) {
    return next()
  }
})



router.post('/changefolder',
  async (req, res) => {

  try {

    const {info, ind} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    }, {
        folder: info
    })


    return res.json()

  } catch (e) {
    return next()
  }
})



router.post('/changestatus',
  async (req, res) => {

  try {

    const {info, ind} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    }, {
      status: info
    })


    return res.json()

  } catch (e) {
    return next()
  }
})



router.post('/changeactive',
  async (req, res) => {

  try {

    const {info, ind} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    }, {
      active: info
    })


    return res.json()

  } catch (e) {
    return next()
  }
})



router.post('/changedesc',
  async (req, res) => {

  try {

    const {info, ind} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    },{
      desc: info
    })


    return res.json()

  } catch (e) {
    return next()
  }
})



router.post('/addtime', async (req, res) => {

  try {

    const {ind, noteDate, finishDate, time} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    },{
      to: noteDate,
      finishDate: finishDate,
      time: time
    })

    return res.json()

  } catch (e) {
    return next()
  }
})



router.post('/setoffset', async (req, res) => {

  try {

    const {ind, offset, offsetTime} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    },{
      offset: offset,
      offsetTime: offsetTime
    })

    return res.json()

  } catch (e) {
    return next()
  }
})



router.post('/changeactive',
  async (req, res) => {

  try {

    const {ind, active} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    },{
      active: active
    })


    return res.json()

  } catch (e) {
    return next()
  }
})



router.use((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
});



module.exports = router