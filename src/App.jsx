
import { useState } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'
import SolucaoProblema from './components/SolucaoProblema'
import LeituraForm from './components/LeituraForm'
import Filtros from './components/Filtros'
import LeituraLista from './components/LeituraLista'

import { useFiltros } from './hooks/useFiltros'
import { useLeituras } from './hooks/useLeituras'
import { apiConfigurada } from './services/api'

export default function App() {
  const {
    leituras,
    carregando,
    salvando,
    erro,
    carregar,
    criar,
    atualizar,
    remover,
  } = useLeituras()

  const filtros = useFiltros(leituras)

  const [emEdicao, setEmEdicao] = useState(null)

  async function salvar(dados) {
    const ok = emEdicao
      ? await atualizar(emEdicao.id, dados)
      : await criar(dados)

    if (ok) {
      setEmEdicao(null)
    }

    return ok
  }

  function iniciarEdicao(leitura) {
    setEmEdicao(leitura)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function excluirLeitura(leitura) {
    if (!window.confirm(
      `Deseja excluir a leitura do posto "${leitura.posto}"?`
    )) return

    await remover(leitura.id)

    if (emEdicao?.id === leitura.id) {
      setEmEdicao(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F8F6]">
      <Header apiConfigurada={apiConfigurada} />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <SolucaoProblema />

        {erro && (
          <div className="rounded-lg bg-red-100 p-4 text-red-800">
            <p>{erro}</p>
            <button onClick={carregar} className="mt-2 underline">
              Tentar novamente
            </button>
          </div>
        )}

        <LeituraForm
          leituraEmEdicao={emEdicao}
          salvando={salvando}
          onSalvar={salvar}
          onCancelar={() => setEmEdicao(null)}
        />

        <section className="space-y-4">
          <h2 className="text-xl font-bold">
            Histórico de leituras
          </h2>

          <Filtros
            busca={filtros.busca}
            onBusca={filtros.setBusca}
            statusFiltro={filtros.statusFiltro}
            onStatus={filtros.setStatusFiltro}
            quantidade={filtros.filtradas.length}
          />

          {carregando ? (
            <p>Carregando leituras...</p>
          ) : (
            <LeituraLista
              leituras={filtros.filtradas}
              onEditar={iniciarEdicao}
              onExcluir={excluirLeitura}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
