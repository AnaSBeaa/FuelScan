import { useMemo, useState } from 'react'
import { classificarLeitura } from '../utils/classificador'

// CUSTOM HOOK 2: classifica as leituras com os limites atuais e aplica busca + filtro de status.
export function useFiltros(leituras, limites) {
  const [busca, setBusca] = useState('')
  const [statusFiltro, setStatusFiltro] = useState('todos')

  // Recalcula só quando as leituras ou os limites mudam.
  const classificadas = useMemo(
    () => leituras.map((l) => ({ ...l, ...classificarLeitura(l, limites) })),
    [leituras, limites],
  )

  const contagem = useMemo(() => {
    const base = { total: classificadas.length, normal: 0, suspeita: 0, adulterada: 0 }
    classificadas.forEach((l) => {
      base[l.status] += 1
    })
    return base
  }, [classificadas])

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return classificadas.filter((l) => {
      const passaStatus = statusFiltro === 'todos' || l.status === statusFiltro
      const passaBusca =
        termo === '' ||
        l.posto.toLowerCase().includes(termo) ||
        l.bairro.toLowerCase().includes(termo)
      return passaStatus && passaBusca
    })
  }, [classificadas, busca, statusFiltro])

  return { busca, setBusca, statusFiltro, setStatusFiltro, classificadas, filtradas, contagem }
}
