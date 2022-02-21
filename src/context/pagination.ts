import { createContext } from 'react'

interface Pagination {
  currentPage: number
  setCurrentPage: (value: number) => void
}

const pagination = {
  currentPage: 0,
  setCurrentPage: () => null
}

const PaginationContext = createContext<Pagination>(pagination)

export default PaginationContext
