
export default function formatCurrency(valor) {
    return "R$ "+Intl.NumberFormat("pt-br",{ minimumFractionDigits: 2,  maximumFractionDigits: 2}).format(valor)
}