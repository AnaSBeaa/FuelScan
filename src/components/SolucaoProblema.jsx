import { ArrowRight } from 'lucide-react'
import CardProblema from './CardProblema'
import CardSolucao from './CardSolucao'

export default function SolucaoProblema() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-green-600">
          Nosso propósito
        </p>

        <h2 className="text-3xl font-bold text-slate-900">
          Do problema à solução
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Entenda o desafio que motivou a criação do Sentinela
          Combustível e como nossa proposta busca enfrentá-lo.
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
        <CardProblema />

        <div className="flex justify-center">
          <ArrowRight
            className="rotate-90 text-green-600 md:rotate-0"
            size={32}
          />
        </div>

        <CardSolucao />
      </div>
    </section>
  )
}
