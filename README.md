# FuelScan

Aplicação web do projeto **Global Solution FIAP 2026.2 – Desafio CitizenTech**: um painel para registrar, classificar e acompanhar leituras de um sensor que detecta **adulteração de gasolina** a partir de duas medidas, **densidade** e **condutividade elétrica**.


## Integrantes

| Nome | RM |
| ---- | -- |
| Ana Beatriz Santos | 569087 |
| Paloma Cordeiro | 571460 |
| Yasmin Paiva | 572363 |

## Problema e solução

A adulteração de combustível lesa o consumidor, prejudica o motor e aumenta a poluição. O cidadão normalmente não tem como saber se o que abasteceu está dentro do padrão.

O FuelScan recebe leituras de densidade (g/cm³) e condutividade (µS/cm) de um posto e devolve uma classificação simples de entender:

| Status | Significado |
| ------ | ----------- |
| **Normal** | Densidade e condutividade dentro dos limites |
| **Suspeita** | Um dos sinais está fora do limite, dentro da margem de atenção |
| **Fora do padrão** | Algum sinal crítico, ou os dois sinais de atenção ao mesmo tempo |

Os limites padrão (densidade de 0,725 a 0,765 g/cm³ a 20 °C, condutividade máxima de 2 µS/cm) podem ser ajustados na própria tela.

## Funcionalidades

- Cadastro, edição, exclusão e listagem de leituras (CRUD) consumindo uma API externa
- Classificação automática de cada leitura (normal, suspeita ou fora do padrão) com os motivos
- Cards de resumo com a contagem por status e o percentual de leituras fora do padrão
- Gráfico de dispersão (densidade × condutividade) com todas as leituras
- Busca por posto ou bairro e filtro por status
- Limites de classificação configuráveis, salvos no navegador
- Simulador de sensor que gera uma leitura de exemplo para preencher o formulário
- Estados de carregamento, erro com "tentar novamente" e confirmação antes de excluir
- Acessibilidade: status com texto + ícone + cor (não depende só da cor), rótulos e regiões semânticas

## Tecnologias

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- Fetch API para comunicação com a API externa
- JavaScript (JSX)

## Como executar

Pré-requisito: [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# 1. clonar o repositório
git clone <URL-DO-REPOSITORIO>
cd <PASTA-DO-PROJETO>

# 2. instalar as dependências
npm install

# 3. configurar a API (ver seção abaixo)
cp .env.example .env

# 4. iniciar em modo de desenvolvimento
npm run dev
```

A aplicação abre em `http://localhost:5173`.


## Configuração da API

A aplicação consome uma API REST externa para as leituras. Defina a URL base no arquivo `.env`:

```env
VITE_API_URL=<URL-DA-API>
```

Se a variável não estiver configurada, o cabeçalho avisa que a API não está configurada.

Formato de uma leitura:

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

O `status` e os `motivos` **não** são salvos na API: são calculados no front-end a cada renderização, a partir dos limites atuais.


## Regra de classificação

Implementada em `src/utils/classificador.js` como função pura (sem React e sem API):

1. A **densidade** é `ok` dentro da faixa, `atenção` se o desvio for até a margem configurada e `crítico` acima disso.
2. A **condutividade** é `ok` até o limite, `atenção` até 5× o limite e `crítico` acima disso.
3. Resultado final:
   - qualquer sinal `crítico` → **Fora do padrão**
   - dois sinais de `atenção` → **Fora do padrão**
   - um sinal de `atenção` → **Suspeita**
   - nenhum sinal → **Normal**

## Sensor

O projeto completo prevê um sensor de densidade e um sensor de condutividade elétrica para medir a gasolina. Nesta aplicação, as leituras são digitadas no formulário ou geradas pelo simulador de sensor.

## Uso de IA

O uso de ferramentas de IA durante o desenvolvimento está documentado em [`AI.md`](./AI.md).

## Deploy

_Link da aplicação publicada:_ <https://fuel-scan.vercel.app/>

