const app = getApp()
const request = require('../../utils/request')
import {index} from '../../service/index'

Page({
  data: {

  },
  onLoad() {
    // request.request('api/index').then( res => {
    //   console.log(res)
    // })

    index().then( res => {
      console.log(res);
    })
  }
})
