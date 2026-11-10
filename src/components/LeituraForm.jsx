import { useEffect, useState } from 'react'
import { COMBUSTIVEIS } from '../utils/constantes'
import { paraNumero } from '../utils/formatadores'
import { validarLeitura } from '../utils/validacao'

const FORM_VAZIO = {
  posto: '',
  bairro: '',
  combustivel: COMBUSTIVEIS[0],
  densidade: '',
  condutividade: '',
  observacao: '',
}

function Campo({ id, rotulo, erro, ajuda, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold">
        {rotulo}
      </label>
      {children}
      {ajuda && !erro && <p className="mt-1 text-xs text-slate-500">{ajuda}</p>}
      {erro && (
        <p id={`${id}-erro`} role="alert" className="mt-1 text-sm font-medium text-red-700">
          {erro}
        </p>
      )}
    </div>
  )
}

const estiloInput =
  'mt-1 w-full rounded-lg border border-slate-400 bg-white px-3 py-2 text-base focus:border-blue-700'

export default function LeituraForm({ leituraEmEdicao, rascunho, salvando, onSalvar, onCancelar }) {
  const [form, setForm] = useState(FORM_VAZIO)
  const [erros, setErros] = useState({})

  // Quando o usuário clica em "Editar", carrega os dados no formulário.
  useEffect(() => {
    if (leituraEmEdicao) {
      setForm({
        posto: leituraEmEdicao.posto,
        bairro: leituraEmEdicao.bairro,
        combustivel: leituraEmEdicao.combustivel,
        densidade: String(leituraEmEdicao.densidade).replace('.', ','),
        condutividade: String(leituraEmEdicao.condutividade).replace('.', ','),
        observacao: leituraEmEdicao.observacao || '',
      })
      setErros({})
    }
  }, [leituraEmEdicao])

  // Quando o simulador gera valores, preenche só os campos do sensor.
  useEffect(() => {
    if (rascunho) {
      setForm((atual) => ({
        ...atual,
        densidade: String(rascunho.densidade).replace('.', ','),
        condutividade: String(rascunho.condutividade).replace('.', ','),
      }))
      setErros({})
    }
  }, [rascunho])

  function alterar(e) {
    setForm((atual) => ({ ...atual, [e.target.name]: e.target.value }))
  }

  async function enviar(e) {
    e.preventDefault()
    const encontrados = validarLeitura(form)
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) return

    const ok = await onSalvar({
      posto: form.posto.trim(),
      bairro: form.bairro.trim(),
      combustivel: form.combustivel,
      densidade: paraNumero(form.densidade),
      condutividade: paraNumero(form.condutividade),
      observacao: form.observacao.trim(),
    })
    if (ok) setForm(FORM_VAZIO)
  }

  function cancelar() {
    setForm(FORM_VAZIO)
    setErros({})
    onCancelar()
  }

  const propsInput = (nome) => ({
    id: nome,
    name: nome,
    value: form[nome],
    onChange: alterar,
    className: estiloInput,
    'aria-invalid': Boolean(erros[nome]),
    'aria-describedby': erros[nome] ? `${nome}-erro` : undefined,
  })

  return (
    <form onSubmit={enviar} noValidate className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">
        {leituraEmEdicao ? 'Editar leitura' : 'Registrar nova leitura'}
      </h2>

      <Campo id="posto" rotulo="Posto" erro={erros.posto}>
        <input type="text" placeholder="Ex.: Posto Central" {...propsInput('posto')} />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="bairro" rotulo="Bairro" erro={erros.bairro}>
          <input type="text" placeholder="Ex.: Paulista" {...propsInput('bairro')} />
        </Campo>
        <Campo id="combustivel" rotulo="Combustível">
          <select {...propsInput('combustivel')}>
            {COMBUSTIVEIS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Campo>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="densidade" rotulo="Densidade (g/cm³)" erro={erros.densidade} ajuda="Ex.: 0,745">
          <input type="text" inputMode="decimal" {...propsInput('densidade')} />
        </Campo>
        <Campo
          id="condutividade"
          rotulo="Condutividade (µS/cm)"
          erro={erros.condutividade}
          ajuda="Ex.: 0,8"
        >
          <input type="text" inputMode="decimal" {...propsInput('condutividade')} />
        </Campo>
      </div>

      <Campo id="observacao" rotulo="Observação (opcional)" erro={erros.observacao}>
        <textarea rows={2} {...propsInput('observacao')} />
      </Campo>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={salvando}
          className="rounded-lg bg-brand-600 px-5 py-2 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {salvando ? 'Salvando…' : leituraEmEdicao ? 'Salvar alterações' : 'Registrar leitura'}
        </button>
        {leituraEmEdicao && (
          <button
            type="button"
            onClick={cancelar}
            className="rounded-lg border border-slate-500 px-5 py-2 font-semibold hover:bg-slate-100"
          >
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  )
}
