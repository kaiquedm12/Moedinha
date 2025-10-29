# 💰 Moedinha

Sistema completo de controle financeiro pessoal desenvolvido em React + TypeScript + Vite.

## 🎨 Visual

Interface moderna com paleta de cores **verde e amarelo** sobre fundo branco, oferecendo uma experiência visual limpa e intuitiva.

## ✨ Funcionalidades

### 🏠 Dashboard (Home)
- Visão geral do saldo, receitas e despesas totais
- Formulário rápido para adicionar novas transações
- Lista das transações mais recentes
- Cards informativos com estatísticas em tempo real

### 💵 Receitas
- Cadastro de receitas com valor, categoria e nota opcional
- Lista completa de todas as receitas registradas
- Total consolidado de receitas
- Exclusão individual de registros

### 💸 Despesas
- Cadastro de despesas com valor, categoria e nota opcional
- Lista completa de todas as despesas registradas
- Total consolidado de despesas
- Exclusão individual de registros

### 🎯 Metas
- Criação de metas financeiras com nome e valor alvo
- Barra de progresso visual para cada meta
- Incremento e decremento rápido de valores (+50/-50)
- Persistência automática no localStorage

### 📊 Relatórios
- **Gráfico de barras**: Comparativo de receitas vs despesas por categoria
- **Gráfico de pizza**: Proporção entre receitas e despesas totais
- **Tabela detalhada**: Breakdown por categoria com saldos individuais
- Cores temáticas: verde para receitas, amarelo para despesas

### ⚙️ Configurações
- Visualização do total de transações armazenadas
- Função de limpar todas as transações (com confirmação)
- Gerenciamento de dados locais

## 🛠️ Tecnologias

- **React 18.3** - Biblioteca UI com hooks modernos
- **TypeScript 5.6** - Tipagem estática e segurança de tipos
- **Vite 5.4** - Build tool ultrarrápido
- **React Router 6.26** - Navegação SPA com lazy loading
- **Recharts 3.3** - Biblioteca de gráficos responsivos
- **CSS Modules** - Estilização modular e escopada
- **LocalStorage API** - Persistência de dados no navegador

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/kaiquedm12/Moedinha.git

# Entre no diretório
cd Moedinha

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:5173`

## 🚀 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build de produção
npm run build

# Preview da build de produção
npm run preview

# Verificação de tipos TypeScript
npm run typecheck
```

## 📁 Estrutura do Projeto

```
src/
├── assets/              # Recursos estáticos (imagens, fontes, etc)
├── components/          # Componentes reutilizáveis
│   ├── Card.tsx
│   └── Sidebar/
│       ├── Sidebar.tsx
│       └── Sidebar.css
├── context/             # Contextos React (estado global)
│   └── FinanceContext.tsx
├── pages/               # Páginas da aplicação
│   ├── Home/
│   ├── Receitas/
│   ├── Despesas/
│   ├── Metas/
│   ├── Relatorios/
│   └── Configuracoes/
├── services/            # Serviços e APIs
│   └── api.ts
├── utils/               # Funções utilitárias
├── App.tsx              # Componente raiz com layout
├── router.tsx           # Configuração de rotas
├── main.tsx             # Entry point da aplicação
└── index.css            # Estilos globais e variáveis CSS

```

## 🎯 Funcionalidades Técnicas

### Context API
- `FinanceContext` gerencia todo o estado financeiro
- Funções: `addTransaction`, `removeTransaction`, `clear`
- Cálculos automáticos de totais e saldos
- Persistência automática no localStorage

### Lazy Loading
- Todas as páginas são carregadas sob demanda
- Redução do bundle inicial
- Fallback de loading durante carregamento assíncrono

### Responsividade
- Layout adaptável para desktop, tablet e mobile
- Grid system flexível com media queries
- Sidebar sticky em telas grandes

### TypeScript
- Tipagem completa em toda a aplicação
- Interfaces para Transaction, Meta, Row
- Type safety para props e estados
- Auto-complete e IntelliSense

## 💾 Armazenamento de Dados

Os dados são armazenados localmente no navegador usando `localStorage`:
- **Transações**: `moedinha:transactions`
- **Metas**: `moedinha:metas`

> ⚠️ Os dados são específicos do navegador. Limpar o cache remove todos os registros.

## 🎨 Customização de Cores

As cores principais podem ser ajustadas no arquivo `src/index.css`:

```css
:root {
  --bg: #ffffff;           /* Fundo branco */
  --fg: #0f172a;           /* Texto escuro */
  --muted: #64748b;        /* Texto secundário */
  --border: #e5e7eb;       /* Bordas */
  --accent: #16a34a;       /* Verde (principal) */
  --positive: #16a34a;     /* Verde (receitas) */
  --warning: #f59e0b;      /* Amarelo (avisos) */
  --negative: #f59e0b;     /* Amarelo (despesas) */
}
```

## 📝 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

**Kaique DM**
- GitHub: [@kaiquedm12](https://github.com/kaiquedm12)

---

Desenvolvido com ❤️ usando React + TypeScript