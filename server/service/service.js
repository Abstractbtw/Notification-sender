const User = require("../models/User")
const Task = require("../models/Task")
const Folder = require("../models/Folder")
const History = require("../models/History")

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
        const {name, desc, to, finishDate, offset, offsetTime, status, folder, folderId, active, deleted, startDate, deleteDate, updateDate, lastUpdate} = req
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
            active,
            deleted,
            startDate, 
            deleteDate, 
            updateDate, 
            lastUpdate
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

    changeField: async (field, user, info, ind) => {

      const now = new Date()
      const prev = await Task.findOne({_id: ObjectId(ind)})
      let lastUpdate
      const updateTime = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear()

      if (field === "desc"){
        lastUpdate = "Changed description"
      } else if (field === "deleted"){
        lastUpdate = "Task deleted"
      }else{
        lastUpdate = "Changed " + field + " from: " + prev[field] + " to: " + info 
      }

      const task = await Task.findOneAndUpdate({
        _id: ObjectId(ind)
      }, {
        [field] : info,
        updateDate : updateTime,
        lastUpdate : lastUpdate
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

    updateHistory: async (field, user, info, ind) => {
      const now = new Date()
      const prev = await Task.findOne({_id: ObjectId(ind)})
      const updateTime = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear()

      await History.create({
        taskName: prev.name,
        userEmail: user,
        field: field,
        oldInfo: prev[field],
        newInfo: info,
        updateTime: updateTime
      })
    },

    addTime: async (ind, noteDate, finishDate, time) => {
        const oldTime = await Task.findOne({_id: ObjectId(ind)})
        const newTime = Date.parse(noteDate) - oldTime.offsetTime

        const now = new Date()
        let lastUpdate
        const updateTime = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear()
        lastUpdate = "Changed time from: " + oldTime.finishDate + " to: " + finishDate 

        const task = await Task.findOneAndUpdate({
            _id: ObjectId(ind)
          },{
            to: newTime,
            finishDate: finishDate,
            time: time,
            updateDate : updateTime,
            lastUpdate : lastUpdate
          })
        return task.dataValues
    },

    setTimer: async (ind, offset, offsetTime) => {
        const oldOffset = await Task.findOne({_id: ObjectId(ind)})
        const newOffset = oldOffset.to + oldOffset.offsetTime - offsetTime

        const now = new Date()
        let lastUpdate
        const updateTime = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear()
        lastUpdate = "Changed offset from: " + oldOffset.offset + " to: " + offset 

        const task = await Task.findOneAndUpdate({
            _id: ObjectId(ind)
          },{
            to: newOffset,
            offset: offset,
            offsetTime: offsetTime,
            updateDate : updateTime,
            lastUpdate : lastUpdate
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
            active: 1,
            deleted: 1,
            startDate: 1,
            deleteDate: 1,
            updateDate: 1,
            lastUpdate: 1,
          })
    },

    getHistory: async () => {
      return await History.find({}, {
        taskName: 1,
        userEmail: 1,
        field: 1,
        oldInfo: 1,
        newInfo: 1,
        updateTime: 1
      })
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