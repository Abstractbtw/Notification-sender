const {Schema, model, ObjectId} = require("mongoose")

const Folder = new Schema({
  name: {type: String, required: true},
  user_email: {type: String}
})

module.exports = model('Folder', Folder)