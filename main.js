const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

/*
//////////////////////////////////////////////////
console.log("testing")
const personMessages = require('./protobuffer/addressbook_pb')

console.log("personMessages", personMessages)
var message = new personMessages.Person()

console.log("message:" , message)

message.setName("John Doe");
message.setId(25);

// Serializes to a UInt8Array.
var bytes = message.serializeBinary();

var message2 = personMessages.Person.deserializeBinary(bytes);

console.log("bytes:" , bytes)
console.log("message2:" , message2)

//////////////////////////////////////////////////
*/

/*
app.use(
  function( req, res, next ) {
    var data = ''
    req.on('data', function( chunk ) {
      data += chunk
      console.log('on data: ', chunk)
    })
    req.on('end', function() {
      req.rawBody = data
      console.log( 'on end: ', data )
      if (data && data.indexOf('{') > -1 ) {
        req.body = JSON.parse(data)
      }
      else{
        req.body = data
        console.log('rawData',req.body)
      }
      next()
    })
  }
)
*/

app.use (function(req, res, next) {
  console.log('using middleware for raw stream')
  console.log('mime type is: ', req.is('*/*'))
  //if (!req.is('application/octet-stream')) return next()
  var data = [] // List of Buffer objects
  req.on('data', function(chunk) {
    console.log('received data: appending Buffer object:', chunk)
      data.push(chunk) // Append Buffer object
    console.log('current data is: ', data)
  })
  req.on('end', function() {
    if (data.length <= 0 ) return next()
    data = Buffer.concat(data) // Make one large Buffer of it
    console.log('Received buffer', data)
    req.raw = data
    next()
  })
})

/*
app.use(bodyParser.urlencoded({extended: true}))

const options = {
  inflate: true,
  limit: '100kb',
  type: 'application/octet-stream'
};

app.use(bodyParser.raw(options))
*/


app.use('/api', require('./server/api'))

// static file-serving middleware
app.use('/',express.static(path.join(__dirname, 'public')))

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
