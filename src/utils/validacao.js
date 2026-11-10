import { paraNumero } from './formatadores'

// Valida os dados do formulário e devolve um objeto { campo: 'mensagem' }.
// Objeto vazio = tudo certo.
export function validarLeitura(form) {
  const erros = {}

  if (form.posto.trim().length < 3) erros.posto = 'Informe o nome do posto (mínimo 3 letras).'
  if (form.bairro.trim().length < 2) erros.bairro = 'Informe o bairro.'

  const densidade = paraNumero(form.densidade)
  if (form.densidade === '' || Number.isNaN(densidade)) {
    erros.densidade = 'Informe a densidade em g/cm³ (ex.: 0,745).'
  } else if (densidade < 0.5 || densidade > 1.2) {
    erros.densidade = 'Valor fora do possível para um líquido: use entre 0,5 e 1,2.'
  }

  const condutividade = paraNumero(form.condutividade)
  if (form.condutividade === '' || Number.isNaN(condutividade)) {
    erros.condutividade = 'Informe a condutividade em µS/cm (ex.: 0,8).'
  } else if (condutividade < 0 || condutividade > 5000) {
    erros.condutividade = 'Use um valor entre 0 e 5000 µS/cm.'
  }

  if (form.observacao.length > 140) erros.observacao = 'Máximo de 140 caracteres.'

  return erros
}
