const STORAGE_KEYS = {
  categories: 'controle-gastos:categories',
  expenses: 'controle-gastos:expenses',
}

export const CATEGORY_COLORS = [
  '#2563eb',
  '#0f766e',
  '#ca8a04',
  '#9333ea',
  '#dc2626',
  '#0891b2',
  '#ea580c',
  '#475569',
  '#16a34a',
]

export const DEFAULT_CATEGORIES = [
  'Cartão de Crédito',
  'Alimentação',
  'Transporte',
  'Corrida/Esportes',
  'Lazer',
  'Dízimo',
  'Presentes',
  'Itens',
  'Outros',
].map((name, index) => ({
  id: `categoria-${index + 1}`,
  nome: name,
  cor: CATEGORY_COLORS[index],
  ativa: true,
  createdAt: new Date().toISOString(),
}))

function readStorage(key, fallback) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function normalizeCategoryName(name) {
  const names = {
    Alimentacao: 'Alimentação',
    'Cartao de Credito': 'Cartão de Crédito',
    Dizimo: 'Dízimo',
  }

  return names[name] ?? name
}

export function loadCategories() {
  const storedCategories = readStorage(STORAGE_KEYS.categories, DEFAULT_CATEGORIES)

  if (!Array.isArray(storedCategories) || storedCategories.length === 0) {
    return DEFAULT_CATEGORIES
  }

  return storedCategories.map((category, index) => ({
    id: category.id ?? `categoria-${index + 1}`,
    nome: normalizeCategoryName(category.nome ?? 'Categoria'),
    cor: category.cor ?? CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    ativa: category.ativa !== false,
    createdAt: category.createdAt ?? new Date().toISOString(),
  }))
}

export function saveCategories(categories) {
  writeStorage(STORAGE_KEYS.categories, categories)
}

export function loadExpenses() {
  const storedExpenses = readStorage(STORAGE_KEYS.expenses, [])

  if (!Array.isArray(storedExpenses)) {
    return []
  }

  return storedExpenses.map((expense) => ({
    id: expense.id,
    date: expense.date,
    categoryId: expense.categoryId,
    value: Number(expense.value) || 0,
    description: expense.description ?? '',
    createdAt: expense.createdAt ?? new Date().toISOString(),
    updatedAt: expense.updatedAt ?? expense.createdAt ?? new Date().toISOString(),
  }))
}

export function saveExpenses(expenses) {
  writeStorage(STORAGE_KEYS.expenses, expenses)
}
