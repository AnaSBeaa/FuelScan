import { STATUS } from '../utils/constantes'

// Gráfico em SVG puro (sem biblioteca): cada ponto é uma leitura.
// Eixo X = densidade, eixo Y = condutividade. A área verde é a faixa considerada normal.
const L = 400
const A = 260
const MARGEM = { esq: 44, dir: 12, topo: 12, base: 36 }
const X_MIN = 0.68
const X_MAX = 0.86
const Y_MAX = 20

const escalaX = (d) =>
  MARGEM.esq + ((Math.min(Math.max(d, X_MIN), X_MAX) - X_MIN) / (X_MAX - X_MIN)) * (L - MARGEM.esq - MARGEM.dir)
const escalaY = (c) =>
  A - MARGEM.base - (Math.min(Math.max(c, 0), Y_MAX) / Y_MAX) * (A - MARGEM.base - MARGEM.topo)

// Formas diferentes por status: quem não distingue cores ainda diferencia os pontos.
function Ponto({ x, y, status }) {
  const cor = STATUS[status]?.cor ?? '#004E64'

  if (status === 'normal') {
    return <circle cx={x} cy={y} r="5" fill={cor} stroke="#fff" />
  }

  if (status === 'suspeita') {
    return (
      <polygon
        points={`${x},${y - 6} ${x + 6},${y + 5} ${x - 6},${y + 5}`}
        fill={cor}
        stroke="#fff"
      />
    )
  }

  return (
    <rect
      x={x - 5}
      y={y - 5}
      width="10"
      height="10"
      fill={cor}
      stroke="#fff"
    />
  )
}

export default function GraficoDispersao({ leituras, limites }) {
  const xs = [0.7, 0.74, 0.78, 0.82, 0.86]
  const ys = [0, 5, 10, 15, 20]
  const zonaX = escalaX(limites.densidadeMin)
  const zonaLargura = escalaX(limites.densidadeMax) - zonaX
  const zonaY = escalaY(limites.condutividadeMax)

  return (
    <section className="rounded-xl bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold">Mapa das leituras</h2>
      <p className="text-sm text-slate-600">
        Quanto mais perto da área verde, mais dentro do esperado.
      </p>

      <svg
        viewBox={`0 0 ${L} ${A}`}
        role="img"
        aria-label={`Gráfico de dispersão com ${leituras.length} leituras de densidade e condutividade`}
        className="mt-3 w-full"
      >
        <rect
          x={zonaX}
          y={zonaY}
          width={zonaLargura}
          height={A - MARGEM.base - zonaY}
          fill="#bbf7d0"
          opacity="0.7"
        />
        {xs.map((v) => (
          <g key={v}>
            <line x1={escalaX(v)} x2={escalaX(v)} y1={MARGEM.topo} y2={A - MARGEM.base} stroke="#e2e8f0" />
            <text x={escalaX(v)} y={A - MARGEM.base + 14} textAnchor="middle" fontSize="10" fill="#475569">
              {v.toFixed(2).replace('.', ',')}
            </text>
          </g>
        ))}
        {ys.map((v) => (
          <g key={v}>
            <line x1={MARGEM.esq} x2={L - MARGEM.dir} y1={escalaY(v)} y2={escalaY(v)} stroke="#e2e8f0" />
            <text x={MARGEM.esq - 6} y={escalaY(v) + 3} textAnchor="end" fontSize="10" fill="#475569">
              {v}
            </text>
          </g>
        ))}
        <text x={L / 2} y={A - 4} textAnchor="middle" fontSize="11" fill="#334155">
          Densidade (g/cm³)
        </text>
        <text
          x="12"
          y={A / 2}
          textAnchor="middle"
          fontSize="11"
          fill="#334155"
          transform={`rotate(-90 12 ${A / 2})`}
        >
          Condutividade (µS/cm)
        </text>

        {leituras.map((l) => (
          <Ponto key={l.id} x={escalaX(l.densidade)} y={escalaY(l.condutividade)} status={l.status} />
        ))}
      </svg>

      <ul className="mt-2 flex flex-wrap gap-4 text-sm">
        {Object.entries(STATUS).map(([chave, info]) => (
          <li key={chave} className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="-8 -8 16 16" aria-hidden="true">
              <Ponto x={0} y={0} status={chave} />
            </svg>
            {info.rotulo}
          </li>
        ))}
        <li className="flex items-center gap-1">
          <span aria-hidden="true" className="inline-block h-3 w-4 bg-green-200" />
          Faixa normal
        </li>
      </ul>
      <p className="mt-2 text-xs text-slate-500">
        Valores acima de {Y_MAX} µS/cm ou fora do intervalo de densidade aparecem na borda do gráfico.
      </p>
    </section>
  )
}
