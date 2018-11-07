//bundle maker
import example from './example'
example()

import protobufferTest, {postProtoBufferData} from './protobuffer'


function sendMessage(event){
  if(event){
    console.log(event)

    protobufferTest()
    
  }else{
    console.log('there was no message')
  }
}

const button = document.getElementById("button")

button.onclick = sendMessage

let testDiv = document.getElementById("test")
console.log('testDiv is',testDiv)
