const {Schema, model, ObjectId} = require("mongoose")

const Task = new Schema({
  name: {type: String, required: true},
  desc: {type: String},
  to: {type: Date},
  finishDate: {type: String},
  offset: {type: String},
  offsetTime: {type: String},
  time: {type: String},
  status: {type: String},
  folder: {type: String},
  folderId: {type: String},
  active: {type: String}
})

module.exports = model('Task', Task)