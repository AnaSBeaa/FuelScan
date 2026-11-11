export const LIMITES_PADRAO = {
  densidadeMin: 0.725, // g/cm³ a 20 °C
  densidadeMax: 0.765, // g/cm³ a 20 °C
  margemDensidade: 0.015, // tolerância além da faixa antes de virar "crítico"
  condutividadeMax: 2, // µS/cm: acima disso a leitura já merece atenção
  fatorCondutividadeCritica: 5, // acima de condutividadeMax * fator => crítico
}

export const COMBUSTIVEIS = ['Gasolina comum', 'Gasolina aditivada', 'Gasolina premium']

// A chave precisa ser igual ao valor que classificarLeitura() devolve em `status`.
// Cada status tem texto + ícone + cor, para não depender só da cor (acessibilidade).
export const STATUS = {
  normal: {
    rotulo: 'Normal',
    icone: '✔',
    classes: 'bg-[#9FFFCB] text-[#004E64] border-[#25A18E]',
    cor: '#25A18E',
  },
  suspeita: {
    rotulo: 'Suspeita',
    icone: '!',
    classes: 'bg-[#00A5CF]/15 text-[#004E64] border-[#00A5CF]',
    cor: '#EAB308',
  },
  adulterada: {
    rotulo: 'Fora do padrão',
    icone: '✖',
    classes: 'bg-[#004E64]/10 text-[#004E64] border-[#004E64]',
    cor: '#EF4444',
  },
}

export const FILTROS_STATUS = [
  { valor: 'todos', rotulo: 'Todas' },
  { valor: 'normal', rotulo: 'Normais' },
  { valor: 'suspeita', rotulo: 'Suspeitas' },
  { valor: 'adulterada', rotulo: 'Fora do padrão' },
]