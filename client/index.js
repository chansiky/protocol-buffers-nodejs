import {postProtoBufferData} from './protobuffer'
const personMessages = require('../protobuffer/addressbook_pb')

function createExamplePBMessage(){
  //first you instantiate the message
  var message = new personMessages.Person()
  
  //then you can set the individual variables for the message
  message.setName("John Doe");
  message.setId(25);
  
  return message
}

function sendMessage(event){
  //make an example protocol buffer message
  const pBMessage = createExamplePBMessage()
  console.log('PBMessage: ', pBMessage)

  //serialize the message we want to send
  const serializedMessage = pBMessage.serializeBinary();
  console.log('Serialized Message: ', serializedMessage)
  console.log('Serialized Message data type is: ', typeof(serializedMessage))
  
  //send the data to the server
  postProtoBufferData(serializedMessage)
}


const button = document.getElementById("protobuffer-button")
button.onclick = sendMessage
