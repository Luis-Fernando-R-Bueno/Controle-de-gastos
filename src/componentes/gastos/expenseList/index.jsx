import { Pencil, ReceiptText, Trash2 } from 'lucide-react'
import { formatDate } from '../../../utils/dateUtils'
import { formatCurrency } from '../../../utils/formatCurrency'
import './styles.css'

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
  function handleDelete(expense) {
    const confirmed = window.confirm('Excluir este gasto?')

    if (confirmed) {
      onDeleteExpense(expense.id)
    }
  }

  if (expenses.length === 0) {
    return (
      <section className="expense-list expense-list--empty">
        <div className="empty-state">
          <ReceiptText size={28} aria-hidden="true" />
          <p>Nenhum gasto encontrado.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="expense-list">
      <div className="expense-list__header">
        <div>
          <span>Histórico completo</span>
          <h2>Gastos cadastrados</h2>
        </div>
        <strong>{expenses.length}</strong>
      </div>

      <div className="expense-list__table-wrap">
        <table className="expense-list__table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Categoria</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th aria-label="Ações" />
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{formatDate(expense.date)}</td>
                <td>
                  <span
                    className="expense-list__badge"
                    style={{ '--category-color': expense.category.cor }}
                  >
                    {expense.category.nome}
                  </span>
                </td>
                <td>{expense.description || '-'}</td>
                <td>
                  <strong>{formatCurrency(expense.value)}</strong>
                </td>
                <td>
                  <div className="expense-list__actions">
                    <button
                      className="icon-button"
                      type="button"
                      title="Editar gasto"
                      aria-label="Editar gasto"
                      onClick={() => onEditExpense(expense)}
                    >
                      <Pencil size={17} aria-hidden="true" />
                    </button>
                    <button
                      className="icon-button icon-button--danger"
                      type="button"
                      title="Excluir gasto"
                      aria-label="Excluir gasto"
                      onClick={() => handleDelete(expense)}
                    >
                      <Trash2 size={17} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ExpenseList
