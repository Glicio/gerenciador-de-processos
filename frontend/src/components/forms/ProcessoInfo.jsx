import React from 'react'
import formatCurrency from '../../utils/FormatCurrency'
import getData from '../../utils/GetData'
import "../static/ProcessoInfo.css"

export default function ProcessoInfo({processo, setProcesso}) {
    return <div className="modal-container" onMouseDown={(e) => {e.target.className === "modal-container" && setProcesso(undefined)}}>
        <div className="processo-info" >
            <h3 style={{margin: "0"}}>Informações do Processo</h3>
            <div className="divisor"></div>
            <span>Credor: <span className="info">{processo.credor.nome}</span></span>
            {processo.credor.tipo === "pf" ? <span>CPF: <span className="info">{processo.credor.cpf}</span></span> : <span>CNPJ: <span className="info">{processo.credor.cnpj}</span></span>}
            <span>Tipo do Empenho: <span className="info">{processo.tipo}</span></span>
            {processo.tipo === "global" && <span>Ultimo Mês Pago: <span className="info">{processo.ultimoMesPago}</span></span> }
            <span>Data: <span className='info'>{getData(processo.dataEmpenho)}</span></span>
            <span>Valor do Empenho: <span className="info">{formatCurrency(processo.valorEmpenho)}</span></span>
            <span>Valor do Liquido: <span className="info">{ processo.valorLiquido ? formatCurrency(processo.valorEmpenho) : " -- "}</span></span>
            <span>Valor Pago: <span className="info">{ processo.valorPago ? formatCurrency(processo.valorPago) : " -- "}</span></span>
            <span>Descrição:<p className='info'> {processo.descricao}</p></span>
            <span>Observações: <p className='info'>{processo.obs}</p></span>
        </div>
    </div>
}