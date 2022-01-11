<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="secondary">
      <b-navbar-brand href="#/">
        <img src="img/logo-anesa-small.png" style="max-height: 45px" alt="logo Anesa">
      </b-navbar-brand>
      <b-navbar-brand href="#/">aResi</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <!-- <ricerca-documento-input-form :nav-bar="true"/> -->
      </b-navbar-nav>
    </b-navbar>
    <b-container fluid>
      <router-view class="my-3"/>
    </b-container>
    <div id="spinner" v-if="isLoading">
      <div class="spinner-container">
        <b-spinner label="Caricamento ..." class="mx-auto"></b-spinner>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
#spinner {
  position: absolute;
  top:0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255,255,255, 0.5);
}

.spinner-container {
  position: absolute;
  z-index: 15;
  top: 50%;
  left: 50%;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RicercaDocumentoInputForm from '@/components/RicercaDocumentoInputForm.vue'

import {
  Getter,
  Mutation
} from 'vuex-class'

// import { namespace } from 'vuex-class'
// const MainStore = namespace('MainStore')

@Component({
  components: { RicercaDocumentoInputForm }
})
export default class Home extends Vue {
  mounted (): void {
    this.setBaseApiUrl('/api')
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'Login' })
    }
  }

  @Mutation
  public setBaseApiUrl!: (baseApiUrl: string) => void

  @Getter
  isLoading!: boolean

  @Getter
  isLoggedIn!: boolean
}
</script>
