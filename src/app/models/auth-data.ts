export class AuthData{
  id: string
  email: string
  firstName: string
  lastName: string
  role: string = 'none'
  nbf: number
  exp: number
  iss: string
  aud: string
}
