<template>
  <div>
    <b-nav-form @submit.prevent="onSubmitShowCauzioni" v-if="navBar">
      <b-form-input
        v-model="inputRif"
        size="sm"
        class="mr-sm-2"
        placeholder="Rif. interno"
        autocomplete="off"
      />
   <div>{{validationError}}</div>
      <p style="color: red">{{ errorDetails }}</p>

      <b-button size="sm" class="m-2" type="submit">
        <b-icon-download />
      </b-button>
    </b-nav-form>

    <b-form @submit="onSubmitShowCauzioni" v-else>
      <b-form-group
        label="ID Documento"
        description="Riferimento interno del documento"
        label-for="input-rif"
      >
        <b-form-input
          id="iput-rif"
          v-model="inputRif"
          type="text"
          placeholder="Rif. interno"
          autocomplete="off"
        />
     
      </b-form-group>

      <b-button class="my-2" @click="toggleReader">
        <b-icon-camera />
      </b-button>

      <b-button class="m-2" type="submit">
        <b-icon-download />
      </b-button>
    </b-form>

    <div class="reader" v-if="showReader">
      <qrcode-scanner :on-scan-sucess="onScanSuccess" ref="qrcodeScanner" />
    </div>
  </div>
</template>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
</style>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { State, Getter, Action } from "vuex-class";
import QrcodeScanner from "@/components/QrcodeScanner.vue";
import { Html5QrcodeResult } from "html5-qrcode/esm/core";

@Component({ components: { QrcodeScanner } })
export default class RicercaDocumentoInputForm extends Vue {
  @Prop() private navBar!: boolean;

  inputRif = "";

  validationError: string = "";

  showReader = false;

  @State
  hasError!: boolean;

  @State
  errroDetails!: string;

  async onSubmitShowCauzioni(event: Event | null): Promise<void> {
    if (event) {
      event.preventDefault();
    }
    await this.updateRifInterno(this.inputRif); 
    if (!this.getRifInterno) {
      this.validationError = "Inserire un rif. interno coretto.";
      return; // TODO: visualizzare messaggio di errore
    }
    this.$router.push({
      name: "DettaglioCauzioni",
      params: { rifInterno: this.getRifInterno },
    });
  }

  toggleReader(): void {
    this.showReader = !this.showReader;

    /*
    // inutile stoppare la fotocamera. viene fermata nella funzione destroyed del componente
    if (this.$refs.qrcodeScanner) {
      const qrcodeScanner: QrcodeScanner = this.$refs.qrcodeScanner as QrcodeScanner
      if (!this.showReader) {
        qrcodeScanner.stop()
      }
    } */
  }


  

  @Action
  updateRifInterno!: (rifInterno?: string) => Promise<void>;

  @Getter
  getRifInterno!: string | null;

  @Getter
  isLoading!: boolean;

  onScanSuccess(decodedText: string, result: Html5QrcodeResult): void {
    console.log("onScanSuccess", decodedText, result);
    this.inputRif = decodedText;
    this.onSubmitShowCauzioni(null);
  }
}
</script>
