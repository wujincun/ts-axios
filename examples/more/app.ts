import axios from '../../src'

document.cookie = 'a=b'

axios.get('more/get').then(res => {
  console.log(res)
})

axios
  .post('http://127.0.0.1:8080/more/server2', {
    data: {},
    config: {
      withCredentials: false
    }
  })
  .then(res => {
    console.log(res)
  })
