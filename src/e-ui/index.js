import Vue from 'vue'
import * as EUI from 'e-ui/lib/management.js'
EUI.ImgUpload.props.action = {
  type: String,
  default: '/v1/comm/upload-img'
}
Vue.use(EUI)
