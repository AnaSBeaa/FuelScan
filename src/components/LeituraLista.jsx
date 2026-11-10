import EstadoVazio from './EstadoVazio'
import LeituraItem from './LeituraItem'

export default function LeituraLista({ leituras, onEditar, onExcluir }) {
  if (leituras.length === 0) {
    return <EstadoVazio texto="Nenhuma leitura encontrada. Registre uma nova ou mude os filtros." />
  }

  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {leituras.map((l) => (
        <LeituraItem key={l.id} leitura={l} onEditar={onEditar} onExcluir={onExcluir} />
      ))}
    </ul>
  )
}
