import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import ApiClient, { IGenericResponse } from '@/libs/api-client'
import { ILoginData } from '@/store/types'
import { asyncPromise } from '@/libs/utils'

@Module({ namespaced: false })
class LoginStore extends VuexModule {
  public loginSuccess = false
  public loginUsername: null | string = null
  public loginError: string | null = null

  @Mutation
  setLoginSuccess (username: null | string): void {
    this.loginSuccess = true
    this.loginUsername = username
    this.loginError = null
  }

  @Mutation
  setLoginError (reason: string): void {
    this.loginSuccess = false
    this.loginUsername = null
    this.loginError = reason
  }

  @Mutation
  unsetLoginError (): void {
    this.loginError = null
  }

  @Action
  async login (data: ILoginData): Promise<void> {
    const apiClient: ApiClient | null = this.context.rootGetters.getApiClient
    
    if (!apiClient) {
      this.context.commit('setLoginError', 'Errore interno: applicazione non inizializzata correttamente')
      return
    }
    try {
      const response = await asyncPromise<IGenericResponse>(this.context, apiClient.login(data))
      if (response.success) {
        this.context.commit('setLoginSuccess', data.username)
      } else {
        this.context.commit('setLoginError', response.message || 'login fallito')
      }
    } catch (error) {
      this.context.commit('setLoginError', error || 'login fallito')
    }
  }

  @Action
  logout (): void {
    // TODO: clear main store
    this.context.commit('setLoginError', '')
  }

  get isLoggedIn (): boolean {
    return this.loginSuccess
  }

  get getLoginError (): string | null {
    return this.loginError
  }
}

export default LoginStore
