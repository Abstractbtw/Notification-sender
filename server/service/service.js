const User = require("../models/User")
const Task = require("../models/Task")
const Folder = require("../models/Folder")

const { ObjectId } = require('mongodb')

const Service = {

    registration: async (email, name, password, hashPassword, telegram) => {
        const user = await User.create({ 
            email,
            name,
            password: hashPassword,
            telegram, 
        })
        return user.dataValues
    },

    login: async (email, password) => {
        const user = await User.findOne({email})
        return user
    },

    AddTask: async (name, desc, to, finishDate, offset, offsetTime, status, folder, folderId, active) => {
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

    AddFolder: async (foldername, email) => {
        const folder = await Folder.create({ 
            name: foldername, 
            user_email: email 
        })
        return folder.dataValues
    },

    ChangeField: async (field, user, info, ind) => {
        if(field === "folder"){
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
        }
        if(field === "status"){
            const task = await Task.findOneAndUpdate({
                _id: ObjectId(ind)
              }, {
                  status: info
              })
            return task.dataValues
        }
        if(field === "active"){
            const task = await Task.findOneAndUpdate({
                _id: ObjectId(ind)
              }, {
                  active: info
              })
            return task.dataValues
        }
        if(field === "desc"){
            const task = await Task.findOneAndUpdate({
                _id: ObjectId(ind)
              }, {
                  desc: info
              })
            return task.dataValues
        }
    },

    AddTime: async (ind, noteDate, finishDate, time) => {
        const task = await Task.findOneAndUpdate({
            _id: ObjectId(ind)
          },{
            to: noteDate,
            finishDate: finishDate,
            time: time
          })
        return task.dataValues
    },

    SetTimer: async (ind, offset, offsetTime) => {
        const task = await Task.findOneAndUpdate({
            _id: ObjectId(ind)
          },{
            offset: offset,
            offsetTime: offsetTime
          })
        return task.dataValues
    },

}

module.exports = Service