export const LIMITES_PADRAO = {
  densidadeMin: 0.725, // g/cm³ a 20 °C
  densidadeMax: 0.765, // g/cm³ a 20 °C
  margemDensidade: 0.015, // tolerância além da faixa antes de virar "crítico"
  condutividadeMax: 2, // µS/cm: acima disso a leitura já merece atenção
  fatorCondutividadeCritica: 5, // acima de condutividadeMax * fator => crítico
}

export const COMBUSTIVEIS = ['Gasolina comum', 'Gasolina aditivada', 'Gasolina premium']

// Cada status tem texto + ícone + cor, para não depender só da cor (acessibilidade).
export const STATUS = {
  normal: {
    rotulo: 'Normal',
    icone: '✔',
    classes: 'bg-emerald-100 text-emerald-900 border-emerald-400',
    cor: '#059669',
  },
  suspeita: {
    rotulo: 'Suspeita',
    icone: '!',
    classes: 'bg-amber-100 text-amber-900 border-amber-400',
    cor: '#d97706',
  },
  adulterada: {
    rotulo: 'Adulterada',
    icone: '✖',
    classes: 'bg-red-100 text-red-900 border-red-400',
    cor: '#dc2626',
  },
}

export const FILTROS_STATUS = [
  { valor: 'todos', rotulo: 'Todas' },
  { valor: 'normal', rotulo: 'Normais' },
  { valor: 'suspeita', rotulo: 'Suspeitas' },
  { valor: 'adulterada', rotulo: 'Adulteradas' },
]
