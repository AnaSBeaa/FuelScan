import { STATUS } from '../utils/constantes'

export default function StatusBadge({ status }) {
  const info = STATUS[status]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-bold ${info.classes}`}
    >
      <span aria-hidden="true">{info.icone}</span>
      {info.rotulo}
    </span>
  )
}
