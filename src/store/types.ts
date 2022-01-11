export interface IDatiCliente {
  ragioneSociale: string,
  indirizzoFatturazione: string,
  indirizzoConsegna: string,
  email: string,
}

export interface IDatiCauzione {
  id: number,
  descrizione: string,
  valoreUnitario: number,
  saldoInziale: number, // <- limite max
  consegnato: number,
  // totale = saldoIniziale + consegnato  
  resi: number // <- editable
}

export interface ILoginData {
  username: string
  password: string
}

export interface IDatiDocumento {
  numeroDocumento: string,
  dataDocumento: string,
  rifInterno: string,
  modificabile: boolean
}
