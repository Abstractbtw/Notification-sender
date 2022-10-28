const {Schema, model} = require("mongoose")

const Task = new Schema({
  name: {type: String, required: true},
  desc: {type: String},
  to: {type: Number},
  finishDate: {type: String},
  offset: {type: String},
  offsetTime: {type: Number},
  time: {type: String},
  status: {type: String},
  folder: {type: String},
  folderId: {type: String},
  active: {type: Boolean}
})

module.exports = model('Task', Task)