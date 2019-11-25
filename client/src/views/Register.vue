<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-8">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Запит на отримання прав адміністратора</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form ref="registerForm">
                  <v-text-field
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="email"
                  />

                  <v-text-field
                    v-model="password"
                    :rules="[rules.required]"
                    id="password"
                    label="Пароль"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                  <v-alert type="error" v-if="error">
                    <div v-html="error"></div>
                  </v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn class="font-regular" type="submit" @click="register" color="primary">Надіслати</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      error: '',
      rules: {
        required: value => !!value || 'Обов\'язкове поле.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некоректний e-mail.'
        }
      }
    }
  },
  methods: {
    async register () {
      if (this.$refs.registerForm.validate()) {
        try {
          const response = await AuthenticationService.register({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
        } catch (error) {
          this.error = error.response.data.error
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
