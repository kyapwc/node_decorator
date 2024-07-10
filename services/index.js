const admin = require('./admin')
const client = require('./client')

/**
 * @callback GeneralFunction
 * @param {...amy} args
 * @returns {Promise<any> | any}
 */


/**
 * Wraps an object's functions with logging and timing functionality.
 * @param {Object} obj - The object whose functions need to be wrapped.
 * @returns {Object} A new object with the same keys as `obj`, where functions are decorated.
 */
const decoratorWrapper = (obj) => {
  const decoratedObj = {}
  for (let key in obj) {
    if (typeof obj[key] === 'function') {
      /**
        * Decorated asynchronous function.
        * @type {GeneralFunction}
        */
      const decoratedFunction = async (...args) => {
        const startTime = new Date().getTime()
        console.log(`Calling ${key} with arguments: `, args)
        try {
          const result = await obj[key].apply(null, args)
          console.log(`Finished calling ${key}. Result: `, result)
          return result
        } catch (error) {
          console.error(`Error calling ${key}: `, error)
          throw error // rethrow the error to propagate it
        } finally {
          const endTime = new Date().getTime()
          const duration = endTime - startTime

          console.log(`method ${key} took: ${duration}ms`)
        }
      }
      decoratedObj[key] = decoratedFunction
    } else {
      decoratedObj[key] = obj[key]
    }
  }
  return decoratedObj
}

/**
 * @type {{
 * admin: Object.<string, GeneralFunction>;
 * client: Object.<string, GeneralFunction>;
 * }}
 */
const decoratedServices = {
  admin: decoratorWrapper(admin),
  client: decoratorWrapper(client),
}

module.exports = decoratedServices
