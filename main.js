const express = require('express')
const path = require('path')
const app = express()
const port = 3000

const bodyParser = require('body-parser')


//set up a separate middleware function to intercept 
//raw streams and combine it into data
app.use (function(req, res, next) {
  console.log('converting raw stream into data object')
  console.log('mime type is: ', req.is('*/*'))
  
  //create a list of all the incomgin data
  var data = [] 
  req.on('data', function(chunk) {
    // Append Buffer object
    console.log('receiving data: appending Buffer object with the following chunk:', chunk)
    data.push(chunk) 
  })
  req.on('end', function() {
    if (data.length <= 0 ) return next()
    //create on large buffer
    console.log('finished receiving data.')
    data = Buffer.concat(data) 
    console.log('Received buffer: ', data)

    //append the data to 'request' 
    req.raw = data
    next()
  })
})


app.use(bodyParser.json())

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
