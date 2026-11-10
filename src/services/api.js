// Cliente HTTP genérico (camada de ACESSO A DADOS). Os componentes nunca chamam fetch direto.
const BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export const apiConfigurada = BASE_URL !== ''

export class ApiError extends Error {
  constructor(mensagem, status) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
  }
}

async function requisicao(caminho = '', opcoes = {}) {
  if (!apiConfigurada) {
    throw new ApiError(
      'A API ainda não foi configurada. Defina VITE_API_URL no arquivo .env (veja o README).',
    )
  }

  let resposta
  try {
    resposta = await fetch(`${BASE_URL}${caminho}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes,
    })
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor. Verifique sua internet.')
  }

  if (!resposta.ok) {
    throw new ApiError(`O servidor respondeu com erro (${resposta.status}).`, resposta.status)
  }
  return resposta.status === 204 ? null : resposta.json()
}

export const api = {
  get: (caminho) => requisicao(caminho),
  post: (caminho, corpo) => requisicao(caminho, { method: 'POST', body: JSON.stringify(corpo) }),
  put: (caminho, corpo) => requisicao(caminho, { method: 'PUT', body: JSON.stringify(corpo) }),
  delete: (caminho) => requisicao(caminho, { method: 'DELETE' }),
}
