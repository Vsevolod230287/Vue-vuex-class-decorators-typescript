import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { IDatiCauzione, IDatiCliente, IDatiDocumento } from '@/store/types'
import ApiClient from '@/libs/api-client'
import { indexArray, asyncRequest, IDictionary } from '@/libs/utils'
import Vue from 'vue'
import { IDatiDDT } from '@/libs/demo-data'

export interface IDatiCauzioneGetter {
  (id: number): IDatiCauzione | null;
}

@Module({ namespaced: false })
class MainStore extends VuexModule {
  public loading = 0
  public rifInterno?: string = undefined
  public listaDDT?: IDatiDDT[] = undefined
  public datiCliente?: IDatiCliente = undefined
  public cauzioni?: IDictionary<IDatiCauzione> = undefined
  public datiDocumento?: IDatiDocumento = undefined
  public baseApiUrl?: string = undefined
  public apiClient?: ApiClient = undefined
  public hasError = true
  public errorDetails?: string = undefined

  @Mutation
  setListaDDT (lista: IDatiDDT[] | null): void {
    this.listaDDT = lista || undefined
  }

  @Mutation
  public setBaseApiUrl (baseUrl: string): void {
    this.baseApiUrl = baseUrl
    this.apiClient = new ApiClient(this.baseApiUrl)
  }

  @Mutation
  public setRifInterno (rifInterno: string): void {
    this.rifInterno = rifInterno
    this.datiCliente = undefined
    this.cauzioni = undefined
    this.datiDocumento = undefined
  }

  @Mutation
  public setDatiCauzioni (cauzioni?: IDatiCauzione[]): void {
    if (cauzioni) {
      this.cauzioni = indexArray(cauzioni, 'id')
    } else {
      this.cauzioni = undefined
    }
  }

  @Mutation
  public setDatiCliente (datiCliente?: IDatiCliente): void {
    this.datiCliente = datiCliente
  }

  @Mutation
  public setDatiDocumento (datiDocumento?: IDatiDocumento): void {
    this.datiDocumento = datiDocumento
  }

  @Mutation
  public setCauzione (cauzione: IDatiCauzione): void {
    if (this.cauzioni) {
      Vue.set(this.cauzioni, cauzione.id, cauzione)
    }
  }

  @Mutation
  public setError (errorDetails: string): void {
    this.hasError = true
    this.errorDetails = errorDetails
  }

  @Mutation
  public unsetError (): void {
    this.hasError = false
    this.errorDetails = undefined
  }

  @Mutation
  public setLoading (loading: boolean): void {
    if (loading) {
      this.loading++
    } else if (this.loading > 0) {
      this.loading--
    }
  }

  get isLoading (): boolean {
    return this.loading > 0
  }

  get getListaDDT (): IDatiDDT[] | null {
    return this.listaDDT || null
  }

  get getRifInterno (): string | null {
    
    return this.rifInterno || null
  }

  get getCauzioni (): IDatiCauzione[] | null {
    if (this.cauzioni) {
      return Object.values(this.cauzioni)
    } else {
      return null
    }
  }

  get getDatiCliente (): IDatiCliente | null {
    return this.datiCliente || null
  }

  get getDatiDocumento (): IDatiDocumento | null {
    return this.datiDocumento || null
  }

  get getApiClient (): ApiClient | null {
    return this.apiClient || null
  }

  @Action
  async updateRifInterno (rifInterno?: string): Promise<void> {
    this.context.commit('unsetError')
    this.context.commit('setRifInterno', rifInterno)

    if (!this.rifInterno) {
      return
    }
    if (!this.apiClient) {
      return
    }
    try {
      const datiDDT = await asyncRequest<IDatiDDT|undefined>(this.context, async () => await this.apiClient?.getDatiDDT(this.rifInterno || ''))
      if (datiDDT) {
        this.context.commit('setDatiDocumento', datiDDT.documento)
        this.context.commit('setDatiCliente', datiDDT.cliente)
        this.context.commit('setDatiCauzioni', datiDDT.cauzioni)
      }
    } catch {}
  }

  @Action
  async updateListaDDT (): Promise<void> {
    const apiClient = this.apiClient
    if (!apiClient) return
    try {
      const listaDDT = await asyncRequest<IDatiDDT[]|undefined>(this.context, async () => await this.apiClient?.getListaDDT())
      this.context.commit('setListaDDT', listaDDT)
    } catch {}
  }

  get getCauzione (): IDatiCauzioneGetter {
    return (id: number): IDatiCauzione | null => {
      if (!this.cauzioni) return null
      if (this.cauzioni[id]) {
        return this.cauzioni[id]
      } else {
        return null
      }
    }
  }

  @Action
  setResoCauzione (item: IDatiCauzione): void {
    const id = item.id
    const value = item.resi
    console.log('setResoCauzione', id, value)
    const cauzione = this.getCauzione(id)
    if (!cauzione) return
    cauzione.resi = value
    this.context.commit('setCauzione', cauzione)
  }

  @Action
  clearMainStore (): void {
    this.context.commit('setRifInterno', null)
  }

  @Action
  setErrorAction(msg: string): void {
    this.context.commit('setError', msg)
  }
}

export default MainStore
