export interface CadastroRequest {
  email: string;
  name: string;
  password: string;
}

export interface CadastroResponse {
  id: number;
  name: string;
  email: string;
}
