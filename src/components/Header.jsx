
import { Fuel, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="px-4 pt-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-[#9fffcb]/10 bg-[#004E64] px-6 py-6 text-white shadow-lg shadow-[#004E64]/15 sm:px-8 sm:py-7">

          {/* Identidade do sistema */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#9fffcb]/10">
                <Fuel className="h-7 w-7 text-[#9fffcb]" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#9fffcb] sm:text-3xl">
                  FuelScan
                </h1>

                <p className="text-xs tracking-widest text-slate-300">
                  ANÁLISE DE COMBUSTÍVEL
                </p>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="mt-6 space-y-2 border-t border-white/15 pt-5">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Monitoramento da qualidade da gasolina
            </h2>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-200">
              Acompanhe as leituras de densidade e condutividade
              e verifique se o combustível está dentro dos
              parâmetros esperados.
            </p>
          </div>

          {/* Identificação */}
          <div className="mt-5 flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#9fffcb]" />

            <span className="text-xs font-medium tracking-wide text-[#9fffcb]">
              ANÁLISE E MONITORAMENTO
            </span>
          </div>

        </div>
      </div>
    </header>
  );
}
