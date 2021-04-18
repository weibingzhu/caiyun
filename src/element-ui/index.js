import ElementUI from 'e-ui/lib/element-ui'

ElementUI.Upload.props.action = {
  type: String,
  default: '/api_admin/v1/comm/upload-img'
}

export default ElementUI
