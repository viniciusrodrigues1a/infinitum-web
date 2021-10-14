import axios, { AxiosInstance } from "axios";

interface IToastLibrary {
  success(msg: string): void;
  error(msg: string): void;
}

type AccountDTO = {
  email: string;
  password: string;
};

type RegisterAccountDTO = AccountDTO & {
  name: string;
};

export default class APIService {
  axiosInstance: AxiosInstance;

  toastLibrary: IToastLibrary;

  constructor(toastLibrary: IToastLibrary, baseURL: string) {
    this.toastLibrary = toastLibrary;
    this.axiosInstance = axios.create({ baseURL });
  }

  async registerAccount({
    name,
    email,
    password,
  }: RegisterAccountDTO): Promise<void> {
    try {
      await this.axiosInstance.post("/auth/register", {
        name,
        email,
        password,
      });

      this.toastLibrary.success("Conta criada com sucesso");
    } catch (err) {
      if (err.response.status === 500) {
        this.toastLibrary.error("Erro");
      }

      this.toastLibrary.error(err.response.data.error.message);
    }
  }

  async login({ email, password }: AccountDTO): Promise<string | undefined> {
    try {
      const response = await this.axiosInstance.post("/auth/login", {
        email,
        password,
      });

      return (response.data as any).token;
    } catch (err) {
      if (err.response.status === 500) {
        this.toastLibrary.error("Erro");
      }

      this.toastLibrary.error(err.response.data.error.message);
    }
  }
}
