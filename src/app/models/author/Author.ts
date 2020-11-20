import { AuthorInPrintingEdition } from './AuthorInPrintingEdition'

export class Author{
  id: number
  name: string
  isRemoved?: boolean
  authorInPrintingEditions?: AuthorInPrintingEdition[]
}
