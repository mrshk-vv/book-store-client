import { PrintingEdition } from '../printingEdition/printing-edition'

export class AuthorItem{
  id: number
  name: string
  printingEditions: Array<number>
  isRemoved: boolean
}
