<template>
  <b-row class="my-1 text-white" >
    <b-col cols="10">
      {{ ddt.cliente.ragioneSociale }} - N.
      {{ ddt.documento.numeroDocumento }} del {{ ddt.documento.dataDocumento }}
    </b-col>
    <b-col cols="2">
      <b-button size="sm" @click="vediDdt(ddt)">Vedi</b-button>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IDatiDDT } from "@/libs/demo-data";

@Component
export default class DDTRow extends Vue {
  @Prop() private ddt!: IDatiDDT;

mounted(){
  console.log(this.ddt,'eeeeeei')
}
  vediDdt(ddt?: IDatiDDT): void {
    if (!ddt) return;
    if (ddt.documento.modificabile) {
      this.$router.push({
        name: "DettaglioCauzioni",
        params: { rifInterno: ddt.documento.rifInterno },
      });
    } else {
      this.$bvModal.msgBoxOk("DDT già fatturato");
    }
  }
}
Vue.component("ddt-row", DDTRow);
</script>
