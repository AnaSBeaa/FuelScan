import { api } from './api'

// CRUD de leituras de combustível. Aqui só existe conversão de dados e chamadas à API.
// Campos de uma leitura: id, posto, bairro, combustivel, densidade, condutividade,
// observacao, criadoEm.

function normalizar(item) {
  return {
    ...item,
    densidade: Number(item.densidade),
    condutividade: Number(item.condutividade),
  }
}

export const leiturasService = {
  // READ (lista)
  async listar() {
    const dados = await api.get('')
    return dados.map(normalizar).sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
  },

  // CREATE
  async criar(dados) {
    const nova = await api.post('', { ...dados, criadoEm: new Date().toISOString() })
    return normalizar(nova)
  },

  // UPDATE
  async atualizar(id, dados) {
    const atualizada = await api.put(`/${id}`, dados)
    return normalizar(atualizada)
  },

  // DELETE
  async remover(id) {
    await api.delete(`/${id}`)
  },
}
