import { useMemo, useState } from 'react'
import AppHeader from '../../componentes/compartilhado/appHeader'
import { MonthField } from '../../componentes/compartilhado/calendarField'
import Rodape from '../../componentes/compartilhado/rodape'
import DashboardCards from '../../componentes/dashboard/dashboardCards'
import RecentExpenses from '../../componentes/dashboard/recentExpenses'
import SummaryList from '../../componentes/dashboard/summaryList'
import ExpenseFilters from '../../componentes/gastos/expenseFilters'
import ExpenseForm from '../../componentes/gastos/expenseForm'
import ExpenseList from '../../componentes/gastos/expenseList'
import { useControleGastos } from '../../hooks/useControleGastos'
import Configuracoes from '../configuracoes'
import ConfiguracoesBackup from '../configuracoes/backup'
import ConfiguracoesCategorias from '../configuracoes/categorias'
import ConfiguracoesPerfil from '../configuracoes/perfil'
import ConfiguracoesSaibaMais from '../configuracoes/saibaMais'
import ConfiguracoesQuemSomos from '../configuracoes/saibaMais/quemSomos'
import ConfiguracoesTermosDeUso from '../configuracoes/saibaMais/termosDeUso'
import ConfiguracoesSeguranca from '../configuracoes/segurancaEAcesso'
import ConfiguracoesSuporte from '../configuracoes/suporte'
import ConfiguracoesDuvidasFrequentes from '../configuracoes/suporte/duvidasFrequentes'
import ConfiguracoesParticipeDoProjeto from '../configuracoes/suporte/participeDoProjeto'
import Historico from '../historico'
import { getCurrentMonthKey } from '../../utils/dateUtils'
import './styles.css'

const INITIAL_FILTERS = {
  search: '',
  categoryId: 'todos',
  monthKey: '',
}

function Inicial({ onLogout, session }) {
  const [dashboardMonthKey, setDashboardMonthKey] = useState(getCurrentMonthKey)
  const {
    addCategory,
    addExpense,
    categories,
    dashboard,
    deleteExpense,
    exportRecords,
    expenses,
    filterExpenses,
    historicalMonths,
    importRecords,
    removeCategory,
    toggleCategoryStatus,
    updateCategory,
    updateExpense,
  } = useControleGastos(dashboardMonthKey)
  const [activeView, setActiveView] = useState('dashboard')
  const [settingsView, setSettingsView] = useState('inicio')
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [editingExpense, setEditingExpense] = useState(null)
  const [formFocusKey, setFormFocusKey] = useState(0)

  const filteredExpenses = useMemo(
    () => filterExpenses(filters),
    [filterExpenses, filters],
  )

  function handleFilterChange(field, value) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: value,
    }))
  }

  function handleEditExpense(expense) {
    setActiveView('gastos')
    setEditingExpense(expense)
    setFormFocusKey((currentKey) => currentKey + 1)
  }

  function handleDeleteExpense(expenseId) {
    deleteExpense(expenseId)

    if (editingExpense?.id === expenseId) {
      setEditingExpense(null)
    }
  }

  function handleAddExpense(expenseData) {
    addExpense(expenseData)
    setEditingExpense(null)
  }

  function handleUpdateExpense(expenseId, expenseData) {
    updateExpense(expenseId, expenseData)
    setEditingExpense(null)
  }

  function openDashboardMonth(monthKey) {
    setDashboardMonthKey(monthKey)
    setActiveView('dashboard')
  }

  function handleChangeView(view) {
    setActiveView(view)

    if (view === 'configuracoes') {
      setSettingsView('inicio')
    }
  }

  function openSettingsView(view) {
    setSettingsView(view)
    setActiveView('configuracoes')
  }

  function closeSettingsSubpage() {
    setSettingsView('inicio')
  }

  function renderSettingsContent() {
    switch (settingsView) {
      case 'perfil':
        return <ConfiguracoesPerfil onBack={closeSettingsSubpage} session={session} />

      case 'categorias':
        return (
          <ConfiguracoesCategorias
            categories={categories}
            expenses={expenses}
            onAddCategory={addCategory}
            onBack={closeSettingsSubpage}
            onRemoveCategory={removeCategory}
            onToggleCategory={toggleCategoryStatus}
            onUpdateCategory={updateCategory}
          />
        )

      case 'backup':
        return (
          <ConfiguracoesBackup
            onBack={closeSettingsSubpage}
            onExportRecords={exportRecords}
            onImportRecords={importRecords}
          />
        )

      case 'seguranca':
        return <ConfiguracoesSeguranca onBack={closeSettingsSubpage} onLogout={onLogout} />

      case 'saibaMais':
        return (
          <ConfiguracoesSaibaMais
            onAbrirQuemSomos={() => openSettingsView('quemSomos')}
            onAbrirTermos={() => openSettingsView('termos')}
            onBack={closeSettingsSubpage}
          />
        )

      case 'quemSomos':
        return <ConfiguracoesQuemSomos onBack={() => openSettingsView('saibaMais')} />

      case 'suporte':
        return (
          <ConfiguracoesSuporte
            onAbrirDuvidas={() => openSettingsView('duvidasFrequentes')}
            onAbrirParticipe={() => openSettingsView('participeDoProjeto')}
            onBack={closeSettingsSubpage}
          />
        )

      case 'duvidasFrequentes':
        return <ConfiguracoesDuvidasFrequentes onBack={() => openSettingsView('suporte')} />

      case 'participeDoProjeto':
        return <ConfiguracoesParticipeDoProjeto onBack={() => openSettingsView('suporte')} />

      case 'termos':
        return <ConfiguracoesTermosDeUso onBack={() => openSettingsView('saibaMais')} />

      default:
        return (
          <Configuracoes
            onAbrirBackup={() => openSettingsView('backup')}
            onAbrirCategorias={() => openSettingsView('categorias')}
            onAbrirPerfil={() => openSettingsView('perfil')}
            onAbrirSaibaMais={() => openSettingsView('saibaMais')}
            onAbrirSeguranca={() => openSettingsView('seguranca')}
            onAbrirSuporte={() => openSettingsView('suporte')}
          />
        )
    }
  }

  return (
    <div className="pagina-inicial">
      <AppHeader
        activeView={activeView}
        onChangeView={handleChangeView}
      />

      <main className="pagina-inicial__main">
        {activeView === 'dashboard' ? (
          <section className="pagina-inicial__view" aria-label="Painel mensal">
            <div className="pagina-inicial__dashboard-toolbar">
              <MonthField
                label=""
                value={dashboardMonthKey}
                onChange={setDashboardMonthKey}
              />
            </div>

            <DashboardCards dashboard={dashboard} />

            <RecentExpenses expenses={dashboard.recentExpenses} />

            <div className="pagina-inicial__summary-grid">
              <SummaryList
                emptyText="Nenhum gasto no mês selecionado."
                items={dashboard.categorySummary}
                title="Resumo por categoria"
                type="category"
              />
              <SummaryList
                emptyText="Nenhum histórico mensal ainda."
                items={dashboard.monthSummary}
                title="Resumo por mês"
                type="month"
              />
            </div>
          </section>
        ) : null}

        {activeView === 'gastos' ? (
          <section className="pagina-inicial__view" aria-label="Histórico de gastos">
            <div className="pagina-inicial__expense-layout">
              <ExpenseForm
                key={`${editingExpense?.id ?? 'novo-gasto'}-${formFocusKey}`}
                categories={categories}
                editingExpense={editingExpense}
                focusKey={formFocusKey}
                onAddExpense={handleAddExpense}
                onCancelEdit={() => setEditingExpense(null)}
                onUpdateExpense={handleUpdateExpense}
              />

              <div className="pagina-inicial__expense-list">
                <ExpenseFilters
                  categories={categories}
                  filters={filters}
                  onChange={handleFilterChange}
                  onClear={() => setFilters(INITIAL_FILTERS)}
                />
                <ExpenseList
                  expenses={filteredExpenses}
                  onDeleteExpense={handleDeleteExpense}
                  onEditExpense={handleEditExpense}
                />
              </div>
            </div>
          </section>
        ) : null}

        {activeView === 'historico' ? (
          <Historico
            months={historicalMonths}
            onOpenMonth={openDashboardMonth}
          />
        ) : null}

        {activeView === 'configuracoes' ? renderSettingsContent() : null}

        <Rodape />
      </main>
    </div>
  )
}

export default Inicial
