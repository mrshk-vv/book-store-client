import { AuthorInPrintingEdition } from './author-In-printing-edition'

export class Author{
  id: number
  name: string
  isRemoved?: boolean
  authorInPrintingEditions?: AuthorInPrintingEdition[]
}
