module.exports.getAdmin = async () => {
  return new Promise((resolve) => setTimeout(resolve('Admin'), 1000))
}
