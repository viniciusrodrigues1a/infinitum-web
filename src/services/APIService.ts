import axios, { AxiosInstance } from "axios";

interface IToastLibrary {
  success(msg: string): void;
  error(msg: string): void;
}

type RegisterAccountDTO = {
  name: string;
  email: string;
  password: string;
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
      this.toastLibrary.error(err.response.data.error.message);
    }
  }
}
