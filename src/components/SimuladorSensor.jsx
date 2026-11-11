import { gerarLeituraSimulada } from '../utils/simulador'

export default function SimuladorSensor({ onGerar }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-400 bg-slate-50 p-4">
      <p className="text-sm text-slate-700">
        Sem o sensor por perto? Simule a leitura que o ESP32 enviaria e preencha o formulário
        automaticamente.
      </p>
      <button
        type="button"
        onClick={() => onGerar(gerarLeituraSimulada())}
        className="mt-3 rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-200"
      >
        Simular leitura do sensor
      </button>
    </div>
  )
}
