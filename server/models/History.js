const {Schema, model} = require("mongoose")

const History = new Schema({
  taskName: {type: String},
  userEmail: {type: String},
  field: {type: String},
  oldInfo: {type: String},
  newInfo: {type: String},
  updateTime: {type: String}
})

module.exports = model('History', History)