export function formatarNumero(valor, casas = 2) {
  return Number(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  })
}

export function formatarData(iso) {
  if (!iso) return '—'
  const data = new Date(iso)
  if (Number.isNaN(data.getTime())) return '—'
  return data.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
}

// Aceita "0,745" ou "0.745" digitado pelo usuário.
export function paraNumero(texto) {
  if (typeof texto === 'number') return texto
  return Number(String(texto).trim().replace(',', '.'))
}
