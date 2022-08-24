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
    console.log(e)
    res.send({message: "Server error"})
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
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/addtask',
  async (req, res) => {

  try {

    const {name, user} = req.body
    const desc = ""
    const to = ""
    const finishDate = ""
    const offset = 0
    const offsetTime = 0
    const status = "todo"
    const folder = "default"
    const active = "inactive"

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
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/addfolder',
  async (req, res) => {

  try {

    const {name, user} = req.body

    console.log(name)

    const folder = new Folder({
      name: name,
      user_email: user
    })

    await folder.save()
    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/changefolder',
  async (req, res) => {

  try {

    const {folder, ind} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    }, {
        folder: folder
    })


    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/changestatus',
  async (req, res) => {

  try {

    const {status, ind} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    }, {
      status: status
    })


    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/changeactive',
  async (req, res) => {

  try {

    const {active, ind} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    }, {
      active: active
    })


    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/updatetext',
  async (req, res) => {

  try {

    const {text, ind} = req.body

    await Task.findOneAndUpdate({
      _id: ObjectId(ind)
    },{
      desc: text
    })


    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
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
    console.log(e)
    res.send({message: "Server error"})
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
    console.log(e)
    res.send({message: "Server error"})
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
    console.log(e)
    res.send({message: "Server error"})
  }
})



module.exports = router