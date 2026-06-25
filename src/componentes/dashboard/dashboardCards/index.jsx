import { BarChart3, CircleDollarSign, ReceiptText, Tags } from 'lucide-react'
import { formatCurrency } from '../../../utils/formatCurrency'
import './styles.css'

function DashboardCards({ dashboard }) {
  const hasMonthlySalary = dashboard.monthlySalary > 0

  const cards = [
    {
      id: 'total',
      label: 'Total do mês',
      value: formatCurrency(dashboard.totalMonth),
      detail: 'Somatório do mês atual',
      Icon: CircleDollarSign,
      tone: 'blue',
    },
    {
      id: 'count',
      label: hasMonthlySalary ? 'Sobra do salário' : 'Lançamentos',
      value: hasMonthlySalary
        ? formatCurrency(dashboard.salaryRemaining)
        : dashboard.countMonth,
      detail: hasMonthlySalary
        ? `${dashboard.countMonth} lançamentos no mês`
        : 'Gastos cadastrados no mês',
      Icon: ReceiptText,
      tone: hasMonthlySalary && dashboard.salaryRemaining < 0 ? 'danger' : 'green',
    },
    {
      id: 'top',
      label: 'Maior categoria',
      value: dashboard.topCategory?.label ?? 'Sem dados',
      detail: dashboard.topCategory
        ? formatCurrency(dashboard.topCategory.total)
        : 'Cadastre um gasto para ver',
      Icon: Tags,
      categoryColor: dashboard.topCategory?.color,
      tone: dashboard.topCategory ? 'category' : 'amber',
    },
    {
      id: 'average',
      label: 'Média mensal',
      value: formatCurrency(dashboard.averageMonthlyTotal),
      detail: 'Média dos meses com gastos',
      Icon: BarChart3,
      tone: 'purple',
    },
  ]

  return (
    <section className="dashboard-cards" aria-label="Resumo financeiro">
      {cards.map(({ id, label, value, detail, Icon, tone, categoryColor }) => (
        <article
          className={`dashboard-card dashboard-card--${tone}`}
          key={id}
          style={categoryColor ? { '--category-color': categoryColor } : undefined}
        >
          <div className="dashboard-card__icon">
            <Icon size={20} aria-hidden="true" />
          </div>
          <div>
            <span>{label}</span>
            {categoryColor ? (
              <strong className="category-badge dashboard-card__category">
                {value}
              </strong>
            ) : (
              <strong>{value}</strong>
            )}
            <small>{detail}</small>
          </div>
        </article>
      ))}
    </section>
  )
}

export default DashboardCards
