import axios from 'axios'
import Vue from 'vue'

const options = {
  baseURL: 'https://pre.ugoloc.ucann.ru'
}

const instance = axios.create(options)

instance.interceptors.request.use(config => {
  try {
    const token = Vue.$cookie.get('token')
    if (token) {
      // eslint-disable-next-line
      config.headers.common['Authorization'] = `Bearer ${token}`
    }
  } catch (err) {
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return config
  }
}, error => Promise.reject(error))
instance.interceptors.response.use(response => response.data, error => {
  const { response } = error
  if (response) {
    switch (response.status) {
      case 401:
      case 403:
        try {
          this.$cookie.delete('token')
        } catch (err) {
        } finally {
        // eslint-disable-next-line no-unsafe-finally
        break
      }
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
