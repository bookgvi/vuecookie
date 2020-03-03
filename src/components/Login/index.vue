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
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style scoped>

</style>
