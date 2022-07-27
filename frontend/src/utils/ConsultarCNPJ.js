import api from "../Api";


export default async function consultarCNPJ(cnpj, setLoading) {



    const regex = /([_./-])/g
    let formattedCnpj = cnpj.replace(regex, "")
    if(formattedCnpj.length < 14 ) return "CNPJ INVÁLIDO"
    setLoading(true)

    const consulta = await api.get(`https://publica.cnpj.ws/cnpj/${formattedCnpj}`)

    setLoading(false)

    return consulta
}