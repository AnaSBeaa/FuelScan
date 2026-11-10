import { useCallback, useEffect, useState } from 'react'
import { leiturasService } from '../services/leiturasService'

// CUSTOM HOOK 1: concentra o estado e as operações de CRUD.
// Os componentes só recebem os dados e as funções, sem saber como a API funciona.
export function useLeituras() {
  const [leituras, setLeituras] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState(null)

  const carregar = useCallback(async () => {
    setCarregando(true)
    setErro(null)
    try {
      setLeituras(await leiturasService.listar())
    } catch (e) {
      setErro(e.message)
    } finally {
      setCarregando(false)
    }
  }, [])

  // Busca as leituras assim que a tela abre.
  useEffect(() => {
    carregar()
  }, [carregar])

  // Cada operação devolve true/false para o componente saber se pode limpar o formulário.
  async function executar(operacao) {
    setSalvando(true)
    setErro(null)
    try {
      await operacao()
      return true
    } catch (e) {
      setErro(e.message)
      return false
    } finally {
      setSalvando(false)
    }
  }

  const criar = (dados) =>
    executar(async () => {
      const nova = await leiturasService.criar(dados)
      setLeituras((atuais) => [nova, ...atuais])
    })

  const atualizar = (id, dados) =>
    executar(async () => {
      const atualizada = await leiturasService.atualizar(id, dados)
      setLeituras((atuais) => atuais.map((l) => (l.id === id ? atualizada : l)))
    })

  const remover = (id) =>
    executar(async () => {
      await leiturasService.remover(id)
      setLeituras((atuais) => atuais.filter((l) => l.id !== id))
    })

  return { leituras, carregando, salvando, erro, carregar, criar, atualizar, remover }
}
