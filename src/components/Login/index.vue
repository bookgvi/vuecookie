<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div style="margin: 2rem 0;">
        <label for="name">
          Login: <input type="text" id="name" v-model="form.name">
        </label>
        <label for="pass">
          Password: <input type="password" id="pass" v-model="form.password">
        </label>
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'loginComponent',
  data () {
    return {
      loginURL: '/api/auth/login',
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await this.$http.post(this.loginURL, {
        login: this.form.name,
        password: this.form.password
      })
      console.log(data.access_token)
      // eslint-disable-next-line camelcase
      if (data.access_token) {
        this.$cookie.set('token', data.access_token)
      }
    }
  }
}
</script>

<style scoped>

</style>
