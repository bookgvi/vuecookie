import axios from 'axios'
import Vue from 'vue'

const options = {
  baseURL: ''
}

const instance = axios.create(options)

instance.interceptors.request.use(config => {
  const token = this.$cookie.get('token')
  if (token) {
    // eslint-disable-next-line
    config.headers.common['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => Promise.reject(error))
instance.interceptors.response.use(response => response, error => {
  const { response } = error
  if (response) {
    switch (response.status) {
      case 401:
      case 403:
        this.$cookie.delete('token')
      // TODO переход на страницу /login
    }
  }
  return Promise.reject(error)
})

Plugin.install = Vue => {
  Vue.$http = instance
  Object.defineProperty(Vue.prototype, '$http', {
    get () {
      return instance
    }
  })
}

Vue.use(Plugin)

export default Plugin

