export interface ErrorType {
  type: number
  message: string
}

export interface IResult<ICustomDoc> {
  count: number
  results: ICustomDoc[]
}