const router = require('express').Router()
const personMessages = require('../../protobuffer/addressbook_pb')

router.post('/protobuffer', async (req, res, next) => {
  if (req.raw) {
    try {
      console.log('Raw data: ', req.raw)

      // Decode the Message
      const deserializedData = personMessages.Person.deserializeBinary(req.raw)
      console.log('Deserialized data: ', deserializedData)

      //turn the protocol buffer data into a JS object
      const object = deserializedData.toObject()
      console.log('Data turned into object: ', object)

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
