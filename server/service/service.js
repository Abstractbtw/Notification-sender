const User = require("../models/User")
const Task = require("../models/Task")
const Folder = require("../models/Folder")

const { ObjectId } = require('mongodb')

const Service = {

    registration: async (req) => {
        const {email, name, password, hashPassword, telegram} = req
        const user = await User.create({ 
            email,
            name,
            password: hashPassword,
            telegram, 
        })
        return user.dataValues
    },

    login: async (req) => {
        const {email} = req
        const user = await User.findOne({email})
        return user
    },

    addTask: async (req) => {
        const {name, desc, to, finishDate, offset, offsetTime, status, folder, folderId, active} = req
        const task = await Task.create({ 
            name, 
            desc, 
            to, 
            finishDate,
            offset,
            offsetTime, 
            status,
            folder, 
            folderId, 
            active
        })
        return task.dataValues
    },

    addFolder: async (req) => {
        const {foldername, email} = req
        const folder = await Folder.create({ 
            name: foldername, 
            user_email: email 
        })
        return folder.dataValues
    },

    changeField: async (field, info, ind) => {
      const task = await Task.findOneAndUpdate({
        _id: ObjectId(ind)
      }, {
        [field] : info
      })
      return task.dataValues
    },
  
    changeFolder: async (user, info, ind) => {
      const folder = await Folder.findOne({
        name: info,
        user_email: user
      })
      const task = await Task.findOneAndUpdate({
        _id: ObjectId(ind)
      }, {
        folder: info,
        folderId: folder.id
      })
      return task.dataValues
    },

    addTime: async (req) => {
        const {ind, noteDate, finishDate, time} = req
        const oldTime = await Task.findOne({_id: ObjectId(ind)})
        const newTime = Date.parse(noteDate) - oldTime.offsetTime
        const task = await Task.findOneAndUpdate({
            _id: ObjectId(ind)
          },{
            to: newTime,
            finishDate: finishDate,
            time: time
          })
        return task.dataValues
    },

    setTimer: async (req) => {
        const {ind, offset, offsetTime} = req
        const oldOffset = await Task.findOne({_id: ObjectId(ind)})
        const newOffset = oldOffset.to + oldOffset.offsetTime - offsetTime
        const task = await Task.findOneAndUpdate({
            _id: ObjectId(ind)
          },{
            to: newOffset,
            offset: offset,
            offsetTime: offsetTime
          })
        return task.dataValues
    },

    getUsers: async () => {
        return await User.find({}, {_id: 1, email: 1, name: 1, telegram: 1, password: 1})
    },

    getFolders: async () => {
        return await Folder.find({}, {_id: 1, name: 1, user_email: 1})
    },

    getTasks: async () => {
        return await Task.find({}, {
            _id: 1, 
            name: 1, 
            desc: 1, 
            to: 1, 
            finishDate: 1, 
            offset: 1, 
            offsetTime: 1, 
            time: 1,
            status: 1,
            folder: 1,
            folderId: 1,
            active: 1})
    },

    getActiveNotes: async () => {
      const now = Date.parse(new Date())
      const notes = await Task.find({
        active: true,
        to: {$lte : now}
      })
      if(notes){
        notes.map(async note => {
          const folder = await Folder.findOne({_id: ObjectId(note.folderId)})
          const user = await User.findOne({email: folder.user_email})
        })
      }
      return notes
    },

    getFolderByNote: async (ind) => {
      return await Folder.findOne({_id: ObjectId(ind)})
    },

    getUserByFolder: async (email) => {
      return await User.findOne({email: email})
    },

}

module.exports = Service