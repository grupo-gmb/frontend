import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Esquema de validação Yup
export const schema = yup.object().shape({
  nome: yup.string().required("Nome obrigatório"),
  endereco: yup.string().required("Endereço obrigatório"),
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ inválido")
    .required("CNPJ obrigatório"),
  // ...outros campos e validações
});
