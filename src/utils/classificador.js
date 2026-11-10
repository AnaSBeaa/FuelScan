import { LIMITES_PADRAO } from './constantes'
import { formatarNumero } from './formatadores'

// REGRA DE NEGÓCIO PRINCIPAL: transforma duas medidas (densidade e condutividade)
// em uma decisão que o cidadão entende: normal, suspeita ou adulterada.
// É uma função pura (sem React, sem API), por isso fácil de testar e de explicar.

function nivelDensidade(densidade, limites) {
  if (densidade >= limites.densidadeMin && densidade <= limites.densidadeMax) return 'ok'
  const desvio =
    densidade < limites.densidadeMin
      ? limites.densidadeMin - densidade
      : densidade - limites.densidadeMax
  return desvio <= limites.margemDensidade ? 'atencao' : 'critico'
}

function nivelCondutividade(condutividade, limites) {
  if (condutividade <= limites.condutividadeMax) return 'ok'
  const limiteCritico = limites.condutividadeMax * limites.fatorCondutividadeCritica
  return condutividade <= limiteCritico ? 'atencao' : 'critico'
}

export function classificarLeitura(leitura, limites = LIMITES_PADRAO) {
  const nDens = nivelDensidade(leitura.densidade, limites)
  const nCond = nivelCondutividade(leitura.condutividade, limites)
  const motivos = []

  if (nDens !== 'ok') {
    motivos.push(
      `Densidade de ${formatarNumero(leitura.densidade, 3)} g/cm³ fora da faixa esperada ` +
        `(${formatarNumero(limites.densidadeMin, 3)} a ${formatarNumero(limites.densidadeMax, 3)}).`,
    )
  }
  if (nCond !== 'ok') {
    motivos.push(
      `Condutividade de ${formatarNumero(leitura.condutividade, 1)} µS/cm acima do limite ` +
        `de ${formatarNumero(limites.condutividadeMax, 1)}.`,
    )
  }

  let status = 'normal'
  if (nDens === 'critico' || nCond === 'critico') status = 'adulterada'
  else if (nDens === 'atencao' && nCond === 'atencao') status = 'adulterada' // dois sinais juntos
  else if (nDens === 'atencao' || nCond === 'atencao') status = 'suspeita'

  return { status, motivos }
}
