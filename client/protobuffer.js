import axios from 'axios'

const personMessages = require('../protobuffer/addressbook_pb')

export const postProtoBufferData = async (data) => {
  try{
    console.log('data is', data)
    const res = await axios.post('/api/pb/send', data, {responseType: 'arraybuffer'})
    console.log('res mime type is: ', res)
  }catch (err) {
    console.error(err)
  }
}

export default function protobufferTest(){
  var message = new personMessages.Person()
  
  message.setName("John Doe");
  message.setId(25);
  
  // Serializes to a UInt8Array.
  var bytes = message.serializeBinary();
  
/*
  var message2 = personMessages.Person.deserializeBinary(bytes);
  const data = {message: "hello"}

  
  console.log("bytes:" , bytes)
  console.log("message2:" , message2)
*/

  postProtoBufferData(bytes)
}
