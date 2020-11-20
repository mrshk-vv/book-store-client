import { Currency } from '../../enums/CurrencyType'
import { Edition } from '../../enums/EditionType'
import { AuthorInPrintingEdition } from '../author/AuthorInPrintingEdition'

export class PrintingEdition{
  id?: number
  title: string
  description: string
  price: number
  editionType: Edition
  editionCurrency: Currency
  isRemoved?: boolean
  authorInPrintingEditions?: AuthorInPrintingEdition[]
}
