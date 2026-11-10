
export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#25A18E]/20 bg-[#004E64] px-4 py-6 text-center">
      <p className="text-sm text-white">
        © {new Date().getFullYear()} FuelScan. Todos os direitos reservados.
      </p>

      <p className="mt-1 text-xs text-[#9FFFCB]">
        Monitoramento e análise da qualidade de combustíveis.
      </p>
    </footer>
  )
}
