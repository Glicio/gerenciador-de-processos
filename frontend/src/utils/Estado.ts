import { AxiosResponse } from "axios"
import { toast } from "react-toastify";
import api from "../Api"
interface EstadosInterface {
  _id: string
  descricao: string
}

export const getAllEstados = async (): Promise<EstadosInterface[]> => {
  const list = await api.post("/status/get/")
  return list.data
}

export const deleteEstado = async (id: string): Promise<AxiosResponse> => {
  const statusToDelete = await api.post("/status/delete/", {id: id})
  toast("Estado Deletado com sucesso!", {type: "success"})
  return statusToDelete
}
