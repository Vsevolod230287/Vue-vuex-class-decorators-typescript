<template>
  <b-container>
    <b-row>
      <div class="mx-auto"><img src="img/logo-anesa-small.png" alt="anesa logo"></div>
    </b-row>

    <b-row class="my-5">
      <b-col>
        <ricerca-documento-input-form :nav-bar="true"/>
      </b-col>
    </b-row>
    <div>
      <h4 class="my-4 text-white">DDT scansionati</h4>
      <ddt-row v-for="ddt in listaDDT" :key="ddt.documento.rifInterno" :ddt="ddt"></ddt-row>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { IDatiDDT } from '@/libs/demo-data'

const RicercaDocumentoInputForm = () => import('@/components/RicercaDocumentoInputForm.vue')
const DDTRow = () => import('@/components/DDTRow.vue')

@Component({
  components: {
    RicercaDocumentoInputForm,
    'ddt-row': DDTRow
  }
})
export default class Home extends Vue {
  async mounted (): Promise<void> {
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'Login' })
    }
    await this.updateListaDDT()
  }

  @Getter
  isLoggedIn!: boolean

  @Getter('getListaDDT')
  listaDDT!: IDatiDDT[]

  @Action
  updateListaDDT!: () => Promise<void>

  fakeError (): void {
    this.$bvModal.msgBoxOk('DDT già fatturato')
  }

  vediDdt (ddt?: IDatiDDT): void {
    if (!ddt) return
    if (ddt.documento.modificabile) {
      this.$router.push({
        name: 'DettaglioCauzioni',
        params: { rifInterno: ddt.documento.rifInterno }
      })
    } else {
      this.$bvModal.msgBoxOk('DDT già fatturato')
    }
  }
}
</script>
