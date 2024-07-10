/**
  * Just a simple mapPromise method that allows users to loop through a list of items and run async operations through the parameters
  * @template T,U
  * @param {T[]} list
  * @param {(t: T) => Promise<U>} cb
  */
module.exports.mapPromise = async (list, cb) => {
  /** @type U[] */
  const init = []

  return list.reduce((p, item) => p.then(async (res) => {
    return res.concat(await cb(item))
  }), Promise.resolve(init))
}

const main = async () => {
  const items = [1, 2, 3, 4, 5]
  const temp = await this.mapPromise(items, async (item) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return `${item} resolved`
  })
  console.log('temp: ', temp)
}

main()
