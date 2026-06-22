# Controle de Gastos Pessoais

## Ideia do Projeto

Criar um sistema web de controle de gastos pessoais para substituir uma planilha
de Excel. A proposta é permitir que o usuário registre seus gastos de forma
simples, sem precisar preencher manualmente uma tabela por mês e categoria.

O sistema deve ter uma interface limpa, profissional e responsiva, com foco em
praticidade para uso diário. A primeira versão será um MVP funcional, sem
back-end, autenticação ou banco de dados.

## Objetivo do MVP

Entregar um sistema web funcional onde o usuário consiga:

- Cadastrar gastos pessoais.
- Gerenciar categorias.
- Pesquisar lançamentos.
- Visualizar o histórico completo.
- Acompanhar um dashboard mensal atualizado automaticamente.
- Persistir os dados localmente no navegador usando `localStorage`.

O objetivo visual é parecer um pequeno sistema financeiro pessoal, e não apenas
uma planilha digital.

## Tecnologias Desejadas

- React + Vite no front-end.
- CSS modular ou CSS organizado por componentes.
- `localStorage` para persistência inicial.
- Sem back-end na primeira versão.
- Sem banco de dados na primeira versão.
- Sem autenticação na primeira versão.

## Funcionalidades Principais

### Dashboard Mensal

A tela inicial deve apresentar um resumo financeiro do mês atual.

Deve exibir:

- Total gasto no mês.
- Quantidade de gastos cadastrados.
- Categoria com maior gasto.
- Lista dos gastos mais recentes.
- Resumo de gastos por categoria.
- Resumo de gastos por mês.

O dashboard deve ser atualizado automaticamente conforme novos gastos forem
cadastrados, editados ou excluídos.

### Cadastro de Gastos

O sistema deve ter uma área ou modal para cadastrar um novo gasto.

Campos obrigatórios:

- Data.
- Categoria.
- Valor.

Campo opcional:

- Descrição.

Ao cadastrar um gasto, ele deve ser salvo no `localStorage` e aparecer
automaticamente no histórico e no dashboard.

### Histórico de Gastos

Criar uma tela ou seção com todos os gastos cadastrados.

Cada gasto deve exibir:

- Data.
- Categoria.
- Valor.
- Descrição, se houver.

O usuário deve poder:

- Editar um gasto.
- Excluir um gasto.
- Pesquisar gastos por descrição.
- Filtrar por categoria.
- Filtrar por mês e ano.

### Gerenciamento de Categorias

Criar uma área para gerenciar categorias de gastos.

O sistema deve permitir:

- Criar nova categoria.
- Editar categoria existente.
- Excluir ou inativar categoria.

Categorias iniciais sugeridas:

- Cartão de Crédito.
- Alimentação.
- Transporte.
- Corrida/Esportes.
- Lazer.
- Dízimo.
- Presentes.
- Itens.
- Outros.

As categorias devem ser salvas no `localStorage`.

### Barra de Pesquisa

Criar uma barra de pesquisa simples para localizar gastos pelo texto da
descrição, categoria ou valor.

A pesquisa deve funcionar de forma dinâmica, atualizando a lista de gastos
conforme o usuário digita.

## Design e Experiência

A interface deve ter aparência profissional, moderna e simples.

Preferências visuais:

- Cores sóbrias.
- Boa hierarquia visual.
- Cards para resumos.
- Tabelas ou listas bem organizadas.
- Botões claros para cadastrar, editar e excluir.
- Layout responsivo para computador e celular.

## Estrutura Sugerida do Projeto

Organizar o projeto em componentes, telas, serviços e utilitários.

Exemplo de estrutura:

```txt
src/
  componentes/
    compartilhado/
      header/
      searchBar/
    dashboard/
      dashboardCards/
      resumoCategorias/
      resumoMensal/
    gastos/
      expenseForm/
      expenseList/
    categorias/
      categoryManager/
  telas/
    dashboard/
    gastos/
    categorias/
  servicos/
    storageService.js
  utils/
    formatCurrency.js
    dateUtils.js
```

Observação: a estrutura real deve seguir o padrão adotado no projeto, mantendo
telas finas, hooks para regras de estado e componentes visuais em pastas
próprias.

## Regras Importantes

- Usar `localStorage` para persistência dos dados.
- Não usar banco de dados ainda.
- Não usar autenticação nesta versão.
- Manter o código limpo.
- Comentar apenas quando necessário.
- Separar bem componentes, funções utilitárias e estilos.
- Evitar concentrar toda a aplicação em um único arquivo.
- Criar uma base fácil de evoluir depois para back-end com Node.js, Express e
  MySQL ou PostgreSQL.

## Direção de Evolução

A primeira versão deve resolver o uso pessoal diário com armazenamento local.
Depois, o projeto pode evoluir para:

- Sincronização com back-end.
- Autenticação de usuários.
- API com Node.js e Express.
- Banco de dados MySQL ou PostgreSQL.
- Relatórios exportáveis.
- Dashboard com gráficos mais completos.
