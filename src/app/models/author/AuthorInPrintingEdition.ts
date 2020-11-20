import { Author } from './Author'
import { PrintingEdition } from '../printingEdition/PrintingEdition'

export class AuthorInPrintingEdition{
  authorId: number
  author?: Author
  printingEditionId: number
  printingEdition?: PrintingEdition
  date?: Date
  isRemoved?: boolean
}
