import { ILoginData } from "@/store/types";
import { dati, IDatiDDT } from "./demo-data";

export interface IGenericResponse {
  success: boolean;
  message: string;
}

async function fakeResponse<T>(data: T, success: boolean): Promise<T> {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject(data);
      }
    }, 500)
  );
}

class ApiClient {
  constructor(public baseUrl: string) {}

  async login(data: ILoginData): Promise<IGenericResponse> {
    if (data.username === "error" || !data.password) {
      return await fakeResponse(
        {
          success: false,
          message: "credenziali non valide",
        },
        true
      );
    } else {
      return await fakeResponse(
        {
          success: true,
          message: "ok",
        },
        true
      );
    }
  }

  async getDatiDDT(rifInterno: string): Promise<IDatiDDT> {
    // fake simulazione errore
    if (rifInterno === "error") {
      throw await fakeResponse(
        new Error("codice riferimento non valido"),
        false
      );
    }
    const response: IDatiDDT = dati[rifInterno] || dati.default;
    return await fakeResponse(response, true);
  }

  async getListaDDT(): Promise<IDatiDDT[]> {
    return await fakeResponse<IDatiDDT[]>(Object.values(dati), true);
  }
}

export default ApiClient;
