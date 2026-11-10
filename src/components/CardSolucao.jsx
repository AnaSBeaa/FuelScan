
import { ShieldCheck } from 'lucide-react'

export default function CardSolucao() {
  return (
    <section className="flex-1 rounded-2xl border border-green-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-green-100 p-3">
          <ShieldCheck className="text-green-600" size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          A solução
        </h3>
      </div>

      <h4 className="mb-3 text-lg font-semibold text-slate-800">
        Análise e acompanhamento
      </h4>

      <p className="leading-relaxed text-slate-600">
        O Sentinela Combustível permite registrar análises simuladas
        de densidade e condutividade, visualizar seus estados de
        referência e consultar o histórico de registros.
      </p>
    </section>
  )
}
