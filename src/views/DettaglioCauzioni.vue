

<template>
  <div>
    <b-form @submit="invia" class="text-white">
      <div v-if="datiCliente" class="dati-cliente">
        <b-row>
          <b-col cols="4" class="title">Cliente:</b-col>
          <b-col class="val">{{ datiCliente.ragioneSociale }}</b-col>
        </b-row>
        <b-row>
          <b-col cols="4" class="title">Indirizzo fatturazione:</b-col>
          <b-col class="val"> {{ datiCliente.indirizzoFatturazione }}</b-col>
        </b-row>
        <b-row>
          <b-col cols="4" class="title">Indirizzo consegna:</b-col>
          <b-col class="val">{{ datiCliente.indirizzoConsegna }}</b-col>
        </b-row>
        <b-row>
          <b-col cols="4" class="title">Email:</b-col>
          <b-col class="val">
            <b-input
              type="email"
              v-model="datiCliente.email"
              placeholder="email del cliente"
              required
            />
            <small v-if="emailValidationError" class="text-danger">{{
              emailValidationError
            }}</small>
          </b-col>
        </b-row>
      </div>
      <b-table
        striped
        :items="cauzioni"
        :fields="tableFields"
        bordered
        ref="table"
        primary-key="id"
        class="text-white"
      >
        <template #cell(resi)="data">

          <p class="text-danger m-0" v-if="getRowErrors(data)">
            {{ getRowErrors(data) }}
          </p>
          
          <b-form-input
            type="number"
            :value="data.value"
            @focus="$event.target.select()"
            @change="onChange(data, data.field.key, $event)"
            @blur="onBlur(data, data.field.key)"
            step="1"
            min="0"
          >
          </b-form-input>
        </template>
      </b-table>
      <b-row>
        <b-button class="mx-auto" variant="secondary" @click="annulla" size="lg"
          >Annulla</b-button
        >
        <b-button class="mx-auto" type="submit" variant="warning" size="lg"
          >Conferma ed invia</b-button
        >
      </b-row>
    </b-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { State, Getter, Action } from "vuex-class";
import { IDatiCauzione, IDatiCliente, IDatiDocumento } from "@/store/types";
import VueRouter from "vue-router";
import { IDatiCauzioneGetter } from "@/store/main-store";

@Component
export default class DettaglioCauzioni extends Vue {
  async mounted(): Promise<void> {
    await this.updateRifInterno(this.rifInterno);
  }

  destroyed(): void {
    console.log("DettaglioCauzioni destroyed");
    this.clearMainStore();
  }

  @Prop({
    required: true,
    type: String,
  })
  readonly rifInterno: string | undefined;

  @State((state) => state.MainStore.hasError)
  hasError!: boolean;

  @State((state) => state.MainStore.errorDetails)
  errorDetails!: string;

  emailValidationError: string | null = null;

  @Getter("getCauzioni")
  cauzioni?: IDatiCauzione[];

  @Getter("getDatiCliente")
  datiCliente!: IDatiCliente;

  @Getter("getDatiDocumento")
  datiDocumento!: IDatiDocumento;

  @Getter("getRifInterno")
  getRifInterno!: string | null;

  @Getter("getCauzione")
  getCauzione!: IDatiCauzioneGetter;

  @Action
  updateRifInterno!: (rifInterno?: string) => Promise<void>;

  @Action
  setResoCauzione!: (cauzione: IDatiCauzione) => void;

  @Action
  clearMainStore!: () => void;

  rowErrors: Array<string | null> = [];

  @Watch("$route")
  onRouteChange(to: any, from_: any): void {
    window.console.log("route change", to, from_, "=>", this.$props.rifInterno);
    this.updateRifInterno(this.$props.rifInterno);
  }

  getRowErrors(row: any): string | null {
    const item: IDatiCauzione = row.item;
    if (this.rowErrors[item.id]) {
      return this.rowErrors[item.id];
    }
    return null;
  }

  onBlur(row: any, name: string): void {
    console.log("onBlur", row, name);
    this.$refs.table.clearSelected();
  }


  onChange(row: any, name: string, value: string , event: Event): void {
    console.log(event, 'event on change');
    
    const resi = parseInt(value);
    const item: IDatiCauzione = row.item;

    if (!resi || resi < 0) {
      Vue.set(this.rowErrors, item.id, "valore non valido");
      return;
    }
    if (resi > item.saldoInziale) {
      Vue.set(
        this.rowErrors,
        item.id,
        "il reso non può essere maggiore del valore iniziale"
      );
      return;
    }
    Vue.set(this.rowErrors, item.id, null);
    this.setResoCauzione(item);
  }

  invia(event: Event | null): void {
    if (event) {
      event.preventDefault();
    }
    if (!this.datiCliente.email) {
      this.emailValidationError = "Compilare il campo email per l'invio";
      return;
    }
    this.emailValidationError = null;
    // invio dati ...
    console.log("todo...");

    // invio terminato
    const router: VueRouter = this.$router;
    this.$bvModal
      .msgBoxOk("Invio completato")
      .then(() => router.push({ name: "Home" }))
      .catch(() => router.push({ name: "Home" }));
  }

  annulla(): void {
    this.$router.push({ name: "Home" });
  }

  tableFields: Array<any> = [
    {
      key: "descrizione",
      label: "Descrizione",
      sortable: true,
      tdClass: "title",
    },
    /*
    {
      key: 'valoreUnitario',
      label: 'Valore unitario',
      sortable: true,
      tdClass: 'number'
    },
    */
    {
      key: "saldoInziale",
      label: "Saldo iniziale",
      sortable: true,
      tdClass: "number",
    },
    {
      key: "consegnato",
      label: "Dati",
      sortable: true,
      tdClass: "number",
    },
    {
      key: "resi",
      label: "Resi",
      sortable: false,
      tdClass: "l-5",
      /*
      tdClass (value: string, key: string, item: DatiCauzione): string | string[] {
        console.log('tdClass this', this)
        if (this.rowErrors && this.rowErrors[item.id]) {
          return 'has-error'
        }
        return []
      }
      */
    },
  ];

  $refs!: {
    table: HTMLFormElement;
  };
}
</script>
<style scoped src="./DettaglioCauzioni.css" />

<style scoped lang="sass">
.dati-cliente
  font-size: large
  margin-bottom: 2em
  margin-top: 2em

  .val
    font-weight: bold
</style>

<style lang="sass">
table tbody tr
  td.number
    text-align: right

  td.title
    font-weight: bold

  td.l-5
    min-width: 5em
</style>


