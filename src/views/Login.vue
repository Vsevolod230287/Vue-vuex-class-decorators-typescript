<template>
  <b-container>
    <b-row>
      <div class="mx-auto"><img src="img/logo-anesa-small.png" alt="anesa logo"></div>
    </b-row>

    <b-row>
      <b-col>

        <b-form @submit="onSubmit">

          <b-form-group
            label="Username:"
            label-for="input-username"> 

            <b-form-input
              v-model="username"
              type="text"
              placeholder="Username"
              id="input-username"
              autocomplete="off"
              required/>
          </b-form-group>

          <b-form-group
            label="Password:"
            label-for="input-password">

            <b-form-input
              v-model="password"
              type="password"
              placeholder="Password"
              id="input-password"
              required/>

          </b-form-group>
          
          <p class="text-danger" v-if="getLoginError">{{ getLoginError }}</p>
          <b-button type="submit" variant="success">Invia</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { ILoginData } from '@/store/types'

@Component
export default class Login extends Vue {
  username = ''
  password = ''

  mounted (): void {
    this.logout()
  }

  async onSubmit (event: Event): Promise<void> {
    event.preventDefault()

    console.log('submit', event, this.username, this.password)

    await this.login({
      username: this.username,
      password: this.password
    })
    if (this.isLoggedIn) {
      this.$router.push({ name: 'Home' })
    }
  }

  @Action
  login!: (data: ILoginData) => Promise<void>

  @Action
  logout!: () => void

  @Getter
  isLoggedIn!: boolean

  @Getter
  getLoginError!: string | null
}
</script>
