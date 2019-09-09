import axios from '../../src/index'
// axios({
//   url: '/extends/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })
// axios.request({
//   url: '/extends/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })
// axios.get('/extends/get')
// axios.options('/extends/options')
// axios.delete('/extends/delete')
// axios.head('/extends/head')
// axios.post('/extends/post', { msg: 'post' })
// axios.put('/extends/put', { msg: 'put' })
// axios.patch('/extends/patch', { msg: 'patch' })
// 参数扩展
// axios({
//   url: '/extends/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })
// axios('/extends/post', {
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })
interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}
interface user {
  name: string
  age: number
}
function getUser<T>() {
  return axios<ResponseData<T>>('/extends/user')
    .then(res => res.data)
    .catch(err => {
      console.log(err)
    })
}
async function test() {
  const user = await getUser<user>()
  if (user) {
    console.log(user.result.name)
  }
}
test()
