
import { AlertTriangle } from 'lucide-react'

export default function CardProblema() {
  return (
    <section className="flex-1 rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-red-100 p-3">
          <AlertTriangle className="text-red-500" size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          A dor
        </h3>
      </div>

      <h4 className="mb-3 text-lg font-semibold text-slate-800">
        Falta de informação acessível
      </h4>

      <p className="leading-relaxed text-slate-600">
        A ausência de ferramentas simples para visualizar e registrar
        alterações nas propriedades do combustível dificulta o
        acompanhamento dessas informações.
      </p>
    </section>
  )
}
