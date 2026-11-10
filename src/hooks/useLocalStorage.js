import { useEffect, useState } from 'react'

// CUSTOM HOOK 3: igual ao useState, mas guarda o valor no navegador (localStorage).
// Usado para lembrar os limites configurados mesmo depois de fechar a página.
export function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave)
      return salvo ? JSON.parse(salvo) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      // armazenamento indisponível (modo privado, por exemplo): segue sem salvar
    }
  }, [chave, valor])

  return [valor, setValor]
}
