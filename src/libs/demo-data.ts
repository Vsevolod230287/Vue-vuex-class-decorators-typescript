import { IDatiCauzione, IDatiCliente, IDatiDocumento } from '@/store/types'

export interface IDatiDDT {
  cliente: IDatiCliente,
  cauzioni: IDatiCauzione[],
  documento: IDatiDocumento 
}

const cauzioni1: IDatiCauzione[] = [
  {
    id: 1,
    descrizione: 'F. speciali belghe birre',
    valoreUnitario: 2.55,
    consegnato: 5,
    saldoInziale: 10,
    resi: 0
  },
  {
    id: 2,
    descrizione: 'F. Lipton ice tea cauz',
    valoreUnitario: 15,
    consegnato: 2,
    saldoInziale: 8,
    resi: 0
  },
  {
    id: 23,
    descrizione: 'F. birra Brat cauz.',
    valoreUnitario: 3.87,
    consegnato: 1,
    saldoInziale: 2,
    resi: 0
  },
  {
    id: 24,
    descrizione: 'F. Seltz Maniva plastica lt.20',
    valoreUnitario: 3.87,
    consegnato: 1,
    saldoInziale: 2,
    resi: 0
  },
  {
    id: 35,
    descrizione: 'Cs. birra Wernesgr cauz',
    valoreUnitario: 3.87,
    consegnato: 1,
    saldoInziale: 2,
    resi: 0
  }
]
const cauzioni2: IDatiCauzione[] = [
  {
    id: 1,
    descrizione: 'F. speciali belghe birre',
    valoreUnitario: 2.55,
    consegnato: 5,
    saldoInziale: 10,
    resi: 5
  },
  {
    id: 2,
    descrizione: 'F. Lipton ice tea cauz',
    valoreUnitario: 15,
    consegnato: 2,
    saldoInziale: 8,
    resi: 10
  },
  {
    id: 23,
    descrizione: 'F. birra Brat cauz.',
    valoreUnitario: 3.87,
    consegnato: 1,
    saldoInziale: 2,
    resi: 0
  },
  {
    id: 24,
    descrizione: 'F. Seltz Maniva plastica lt.20',
    valoreUnitario: 3.87,
    consegnato: 1,
    saldoInziale: 2,
    resi: 0
  },
  {
    id: 35,
    descrizione: 'Cs. birra Wernesgr cauz',
    valoreUnitario: 3.87,
    consegnato: 1,
    saldoInziale: 2,
    resi: 0
  }
]

export const dati: { [id: string]: IDatiDDT } = {
  default: {

    cliente: { 
      ragioneSociale: 'Bar di Tizio',
      indirizzoFatturazione: 'via Roma 32, 12344 San Patrizio AB',
      indirizzoConsegna: 'via Bergamo 12, 12344 San Patrizio AB',
      email: 'bar-di-tizio@email.com'
    },

    cauzioni: cauzioni1,

    documento: {
      dataDocumento: '02/12/2021',
      numeroDocumento: '133',
      rifInterno: '123',
      modificabile: false
    }
  },

  abc1: {

    cliente: {
      ragioneSociale: 'Bar H',
      indirizzoFatturazione: 'via Roma 32, 12344 San Patrizio AB',
      indirizzoConsegna: 'via Bergamo 12, 12344 San Patrizio AB',
      email: 'bar-h@email.com'
    },

    cauzioni: cauzioni2,

    documento: {
      dataDocumento: '02/12/2021',
      numeroDocumento: '4',
      rifInterno: 'abc1',
      modificabile: true
    }

  },
  abc2: {
    cliente: {
      ragioneSociale: 'Bar di Caio',
      indirizzoFatturazione: 'via Roma 32, 12344 San Patrizio AB',
      indirizzoConsegna: 'via Bergamo 12, 12344 San Patrizio AB',
      email: 'bar-h@email.com'
    },
    cauzioni: cauzioni2,
    documento: {
      dataDocumento: '04/12/2021',
      numeroDocumento: '88',
      rifInterno: 'abc2',
      modificabile: true
    }
  },
  abc3: {
    cliente: {
      ragioneSociale: 'Bar Sampi',
      indirizzoFatturazione: 'via Roma 32, 12344 San Patrizio AB',
      indirizzoConsegna: 'via Bergamo 12, 12344 San Patrizio AB',
      email: 'bar-sampi@email.com'
    },
    cauzioni: cauzioni2,
    documento: {
      dataDocumento: '01/12/2021',
      numeroDocumento: '23',
      rifInterno: 'abc3',
      modificabile: true
    }
  },
  abc4: {

    cliente: {
      ragioneSociale: 'Bar One',
      indirizzoFatturazione: 'via Roma 32, 12344 San Patrizio AB',
      indirizzoConsegna: 'via Bergamo 12, 12344 San Patrizio AB',
      email: 'bar-one@email.com'
    },

    cauzioni: cauzioni2,

    documento: {
      dataDocumento: '01/11/2021',
      numeroDocumento: '12',
      rifInterno: 'abc4',
      modificabile: true
    }

  },

  abc5: {

    cliente: {
      ragioneSociale: 'Bar Uccio',
      indirizzoFatturazione: 'via Roma 32, 12344 San Patrizio AB',
      indirizzoConsegna: 'via Bergamo 12, 12344 San Patrizio AB',
      email: 'bar-one@email.com'
    },

    cauzioni: cauzioni2,

    documento: {
      dataDocumento: '01/11/2021',
      numeroDocumento: '12',
      rifInterno: 'abc5',
      modificabile: true
    }
  },

  abc6: {

    cliente: {
      ragioneSociale: 'Bar di Caio',
      indirizzoFatturazione: 'via Roma 32, 12344 San Patrizio AB',
      indirizzoConsegna: 'via Bergamo 12, 12344 San Patrizio AB',
      email: 'bar-di-caio@email.com'
    },

    cauzioni: cauzioni2,
    
    documento: {
      dataDocumento: '03/11/2021',
      numeroDocumento: '77',
      rifInterno: 'abc6',
      modificabile: true
    }
  }
}
