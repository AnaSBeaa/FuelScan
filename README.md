# FuelScan

> Painel web para registrar, classificar e acompanhar leituras de um sensor que detecta **adulteração de gasolina**.

🔗 **Aplicação publicada:** <https://fuel-scan.vercel.app/>


---

## Sumário

- [Integrantes](#integrantes)
- [Problema e solução](#problema-e-solução)
- [Funcionalidades](#funcionalidades)
- [Regra de classificação](#regra-de-classificação)
- [Tecnologias](#tecnologias)
- [Como executar](#como-executar)
- [Configuração da API](#configuração-da-api)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Sensor e integração com IoT](#sensor-e-integração-com-iot)
- [Acessibilidade](#acessibilidade)
- [Uso de IA](#uso-de-ia)

---

## Integrantes

| Nome | RM |
| ---- | -- |
| Ana Beatriz Santos | 569087 |
| Paloma Cordeiro | 571460 |
| Yasmin Paiva | 572363 |

## Problema e solução

A adulteração de combustível **lesa o consumidor, prejudica o motor e aumenta a poluição**. Na bomba, o cidadão não tem como saber se o que abasteceu está dentro do padrão.

O FuelScan recebe leituras de **densidade (g/cm³)** e **condutividade elétrica (µS/cm)** e devolve uma classificação simples de entender, com os motivos que levaram a ela:

| Status | Significado |
| ------ | ----------- |
| ✅ **Normal** | Densidade e condutividade dentro dos limites |
| ⚠️ **Suspeita** | Um dos sinais está fora do limite, dentro da margem de atenção |
| ⛔ **Fora do padrão** | Algum sinal crítico, ou os dois sinais de atenção ao mesmo tempo |

Os limites padrão (densidade de 0,725 a 0,765 g/cm³ a 20 °C e condutividade máxima de 2 µS/cm) podem ser ajustados na própria tela.

## Funcionalidades

**Gestão de leituras**
- Cadastro, edição, exclusão e listagem (CRUD) consumindo uma API externa
- Busca por posto ou bairro e filtro por status
- Confirmação antes de excluir

**Análise**
- Classificação automática de cada leitura, com os motivos
- Cards de resumo com a contagem por status e o percentual de leituras fora do padrão
- Gráfico de dispersão (densidade × condutividade) com todas as leituras

**Configuração e apoio**
- Limites de classificação configuráveis, salvos no navegador
- Simulador de sensor que gera uma leitura de exemplo para preencher o formulário

**Experiência de uso**
- Estados de carregamento e de erro, com botão "tentar novamente"
- Status com texto, ícone e cor (não depende só da cor)

## Regra de classificação

Implementada em `src/utils/classificador.js` como **função pura** (sem React e sem chamadas à API), o que facilita testar e reaproveitar.

1. A **densidade** é `ok` dentro da faixa, `atenção` se o desvio for até a margem configurada e `crítico` acima disso.
2. A **condutividade** é `ok` até o limite, `atenção` até 5× o limite e `crítico` acima disso.
3. Resultado final:
   - qualquer sinal `crítico` → **Fora do padrão**
   - dois sinais de `atenção` → **Fora do padrão**
   - um sinal de `atenção` → **Suspeita**
   - nenhum sinal → **Normal**

**Exemplos com os limites padrão** (condutividade máxima de 2 µS/cm):

| Densidade (g/cm³) | Condutividade (µS/cm) | Resultado | Motivo |
| ----------------- | --------------------- | --------- | ------ |
| 0,745 | 1,2 | Normal | Os dois sinais dentro dos limites |
| 0,745 | 4,0 | Suspeita | Condutividade acima de 2, mas até 5× o limite (10 µS/cm) |
| 0,745 | 15,0 | Fora do padrão | Condutividade acima de 5× o limite (sinal crítico) |

> O `status` e os `motivos` **não** são salvos na API: são calculados no front-end a cada renderização, a partir dos limites atuais. Assim, mudar um limite reclassifica todas as leituras na hora.

## Tecnologias

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Fetch API para comunicação com a API externa
- JavaScript (JSX)

## Como executar

**Pré-requisito:** [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# 1. clonar o repositório
git clone https://github.com/AnaSBeaa/FuelScan
cd <PASTA-DO-PROJETO>

# 2. instalar as dependências
npm install

# 3. configurar a API (ver seção abaixo)
cp .env.example .env

# 4. iniciar em modo de desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`.

```

## Configuração da API

A aplicação consome uma API REST externa para as leituras. Defina a URL base no arquivo `.env`:

```env
VITE_API_URL=<URL-DA-API>
```

Se a variável não estiver configurada, o cabeçalho da aplicação avisa que a API não está configurada.

**Formato de uma leitura:**

```json
{
  "id": "1",
  "posto": "Posto Exemplo",
  "bairro": "Centro",
  "combustivel": "Gasolina comum",
  "densidade": 0.745,
  "condutividade": 1.2,
  "observacao": "",
  "criadoEm": "2026-11-10T22:00:00.000Z"
}
```

## Sensor e integração com IoT

O projeto completo prevê um **sensor de densidade** e um **sensor de condutividade elétrica** medindo a gasolina. Nesta aplicação, as leituras são **digitadas no formulário** ou **geradas pelo simulador de sensor**; não há comunicação direta com o dispositivo.


## Acessibilidade

- Status comunicados por **texto + ícone + cor**
- Campos com rótulos associados
- Regiões semânticas (`header`, `main`, etc.) para leitores de tela

## Uso de IA

O uso de ferramentas de IA durante o desenvolvimento está documentado em [`AI.md`](./AI.md).