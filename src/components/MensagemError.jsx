export default function MensagemErro({ mensagem, onTentarNovamente }) {
  return (
    <div role="alert" className="rounded-xl border border-red-400 bg-red-50 p-4 text-red-900">
      <p className="font-semibold">Algo deu errado</p>
      <p className="text-sm">{mensagem}</p>
      <button
        type="button"
        onClick={onTentarNovamente}
        className="mt-3 rounded-lg border border-red-700 px-3 py-1 text-sm font-semibold hover:bg-red-100"
      >
        Tentar novamente
      </button>
    </div>
  )
}
