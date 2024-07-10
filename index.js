const services = require('./services')
const cache = new Map()

// Below commented code is more for typescript's decorator pattern
// const cacheDecorator = (target, name, descriptor) => {
//   const originalMethod = descriptor.value
//   const cache = new Map()
//
//   descriptor.value = function(args) {
//     if (cache.has(arg)) {
//       return cache.get(args)
//     }
//
//     const result = originalMethod.call(this, arg)
//     cache.set(arg, result)
//     return result
//   }
//   return descriptor
// }

const cacheDecorator = (obj) => {
  const decoratedFunction = async (cacheKey, value) => {
    const [cacheKey, value] = args
    if (!cacheKey?.length) return null

    try {
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey)
      }

      const result = await obj.apply(null, args)
      cache.set(cacheKey, value)

      console.log(`Finished calling ${obj?.name}. Result: `, result)
      return result
    } catch (error) {
      console.error(`Error calling ${obj?.name}: `, error)
      throw error // rethrow the error to propagate it
    }
  }
  return decoratedFunction
}

const getSomething = () => {
  return 'Something'
}

const temp = {
  getSomethingCached: cacheDecorator(getSomething)
}

const main = async () => {
  console.log('started bro')
  await services.admin.getAdmin()
  services.client.getClient()
  services.client.updateClient('something')

  const a = await temp.getSomethingCached('something', 'cool')

  const b = await temp.getSomethingCached('something', 'cool')

  console.log('a, b: ', a, b)
}

main()
