export const API_HOST = process.env.API_HOST as string
export const API_USER = process.env.API_USER as string
export const API_PASSWORD = process.env.API_PASSWORD as string
export const API_PORT = process.env.API_PORT as string
export const API_DATABASE = process.env.API_DATABASE as string
export const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export const FORM_ERRORS_MSGS = {
  EMAIL: 'Correo invalido',
  FIELDS_REQUIRED: 'Los campos deben ser diligenciados para continuar*',
  INVALID_NUMBER: 'Valor invalido',
  ONLY_LETTERS: 'Solo puede ingresar letras',
  ONLY_NUMBER: 'Solo puede ingresar números',
  PASSWORD_NO_MATCH: 'Las contraseñas no coinciden',
  PASSWORD_CANNOT_BE_SAME_AS_CURRENT: 'La contraseña no puede ser igual a la actual',
  REQUIRED: 'El campo es obligatorio',
  UNSELECT: 'Seleccione una opción'
}
