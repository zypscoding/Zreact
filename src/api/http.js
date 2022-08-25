let host = 'http://192.168.1.11:10000'
// if (!IS_DEV) {
//   host = 'http://www.baidu.com'
// }

let url = '/api/v1/getUser'

import axios from 'axios'

export const getUserInfo = () => axios.get(url)
