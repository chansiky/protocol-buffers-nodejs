import axios from 'axios'

export const postProtoBufferData = async (data) => {
  try{
    //we send over the data but make sure the responseType is an 'arrayBuffer'
    const res = await axios.post('/api/protobuffer', data, {responseType: 'arraybuffer'})
  }catch (err) {
    console.error(err)
  }
}



