// Simula o que o ESP32 (Wokwi) enviaria. Os dados são fictícios: nenhum dado pessoal real.
const entre = (min, max, casas) => Number((min + Math.random() * (max - min)).toFixed(casas))

export function gerarLeituraSimulada() {
  const sorteio = Math.random()

  if (sorteio < 0.55) {
    // cenário normal
    return { densidade: entre(0.735, 0.755, 3), condutividade: entre(0.2, 1.5, 1) }
  }
  if (sorteio < 0.8) {
    // cenário suspeito: um dos sinais levemente alterado
    const densidade = Math.random() < 0.5 ? entre(0.77, 0.78, 3) : entre(0.71, 0.72, 3)
    return { densidade, condutividade: entre(2.5, 8, 1) }
  }
  // cenário adulterado: sinais fortes
  return { densidade: entre(0.79, 0.83, 3), condutividade: entre(12, 60, 1) }
}
