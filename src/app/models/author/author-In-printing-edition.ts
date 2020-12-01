import { Author } from './author'
import { PrintingEdition } from '../printingEdition/printing-edition'

export class AuthorInPrintingEdition{
  authorId: number
  author?: Author
  printingEditionId: number
  printingEdition?: PrintingEdition
  date?: Date
  isRemoved?: boolean
}
