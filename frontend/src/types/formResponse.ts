export type FormResponse = FormResponseSuccess | FormResponseError

export type FormResponseSuccess<T = any> = {
  prevState: any
  success: boolean
  validationErrors: null
  backendErrors: null
  data: T
}
export type FormResponseError = {
  prevState: any
  success: boolean
  validationErrors: any
  backendErrors: any
  data: null
}
