const router = require('express').Router()
const personMessages = require('../../protobuffer/addressbook_pb')

router.post('/pb/send', async (req, res, next) => {
  if (req.raw) {
    try {
        // Decode the Message
      console.log('req.raw is: ', req.raw)
      const deserializedData = personMessages.Person.deserializeBinary(req.raw)
      console.log('deserialized', deserializedData)
      const object = deserializedData.toObject()
      console.log('object', object)
    } catch (err) {
      console.log('Processing failed:', err)
      next(err)
    }
  }
  else {
    console.log("Not binary data")
  }

})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
