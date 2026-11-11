const CARTOES = [
  { chave: 'total', rotulo: 'Leituras', classes: 'border-slate-400' },
  { chave: 'normal', rotulo: 'Normais', classes: 'border-emerald-500' },
  { chave: 'suspeita', rotulo: 'Suspeitas', classes: 'border-amber-500' },
  { chave: 'adulterada', rotulo: 'Fora do Padrão', classes: 'border-red-500' },
]

export default function ResumoCards({ contagem }) {
  const percentual = contagem.total
    ? Math.round((contagem.adulterada / contagem.total) * 100)
    : 0

  return (
    <section aria-label="Resumo das leituras">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {CARTOES.map((c) => (
          <li key={c.chave} className={`rounded-xl border-l-8 bg-white p-4 shadow-sm ${c.classes}`}>
            <p className="text-3xl font-bold">{contagem[c.chave]}</p>
            <p className="text-sm text-slate-600">{c.rotulo}</p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-slate-600">
        Indicador de impacto: <strong>{percentual}%</strong> das leituras registradas foram
        classificadas como fora do padrão.
      </p>
    </section>
  )
}