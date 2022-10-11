module.exports = (name, folder, status, desc) => {
  let message = `${name}\n\n`
  message += `Folder: ${folder}\n`
  message += `Status: ${status}\n\n`
  message += `Description: ${desc}`
  return message
}