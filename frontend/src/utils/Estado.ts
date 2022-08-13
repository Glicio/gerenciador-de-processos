import api from "../Api"
interface EstadosInterface {
  _id: string
  descricao: string
}

export const getAllEstados = async (): Promise<EstadosInterface[]> => {
  const list = await api.post("/status/get")
  return list.data
}
