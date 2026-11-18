import { useState } from 'react'
import ConfigLimites from './components/ConfigLimites'
import ConfirmDialog from './components/ConfirmDialog'
import EstadoCarregando from './components/EstadoCarregando'
import Filtros from './components/Filtros'
import Footer from './components/Footer'
import GraficoDispersao from './components/GraficoDispersao'
import Header from './components/Header'
import LeituraForm from './components/LeituraForm'
import LeituraLista from './components/LeituraLista'
import MensagemErro from './components/MensagemError'
import ResumoCards from './components/ResumoCards'
import SimuladorSensor from './components/SimuladorSensor'
import { useFiltros } from './hooks/useFiltros'
import { useLeituras } from './hooks/useLeituras'
import { useLocalStorage } from './hooks/useLocalStorage'
import { apiConfigurada } from './services/api'
import { LIMITES_PADRAO } from './utils/constantes'
import SolucaoProblema from './components/SolucaoProblema'


export default function App() {
  const { leituras, carregando, salvando, erro, carregar, criar, atualizar, remover } =
    useLeituras()
  const [limites, setLimites] = useLocalStorage('sentinela:limites', LIMITES_PADRAO)
  const filtros = useFiltros(leituras, limites)

  const [emEdicao, setEmEdicao] = useState(null)
  const [rascunho, setRascunho] = useState(null)
  const [paraExcluir, setParaExcluir] = useState(null)

  async function salvar(dados) {
    const ok = emEdicao ? await atualizar(emEdicao.id, dados) : await criar(dados)
    if (ok) {
      setEmEdicao(null)
      setRascunho(null)
    }
    return ok
  }

  function iniciarEdicao(leitura) {
    setEmEdicao(leitura)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function confirmarExclusao() {
    const alvo = paraExcluir
    setParaExcluir(null)
    if (alvo) {
      await remover(alvo.id)
      if (emEdicao?.id === alvo.id) setEmEdicao(null)
    }
  }

  return (
    <>
      <Header apiConfigurada={apiConfigurada} />

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <SolucaoProblema />
        {erro && <MensagemErro mensagem={erro} onTentarNovamente={carregar} />}

        <ResumoCards contagem={filtros.contagem} />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <LeituraForm
              leituraEmEdicao={emEdicao}
              rascunho={rascunho}
              salvando={salvando}
              onSalvar={salvar}
              onCancelar={() => setEmEdicao(null)}
            />
            <SimuladorSensor onGerar={setRascunho} />
          </div>
          <GraficoDispersao leituras={filtros.classificadas} limites={limites} />
        </div>

        <ConfigLimites limites={limites} onChange={setLimites} />

        <section aria-labelledby="titulo-historico" className="space-y-4">
          <h2 id="titulo-historico" className="text-xl font-bold">
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
            <EstadoCarregando />
          ) : (
            <LeituraLista
              leituras={filtros.filtradas}
              onEditar={iniciarEdicao}
              onExcluir={setParaExcluir}
            />
          )}
        </section>
      </main>

      <Footer />

      <ConfirmDialog
        aberto={Boolean(paraExcluir)}
        titulo="Excluir leitura?"
        mensagem={
          paraExcluir
            ? `A leitura do posto "${paraExcluir.posto}" será removida. Essa ação não pode ser desfeita.`
            : ''
        }
        onConfirmar={confirmarExclusao}
        onCancelar={() => setParaExcluir(null)}
      />
    </>
  )
}