module.exports.getClient = () => {
  return 'Client'
}

/**
  * @param {string} value - name of client to update
  * @returns {Promise<string>}
  */
module.exports.updateClient = async (value) => {
  return new Promise((resolve) => setTimeout(resolve(`Updated ${value} successfully`), 1000))
}
