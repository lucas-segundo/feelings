export interface DeleteLikePortParams {
  id?: string
  messageID?: string
  userID?: string
}

export interface DeleteLikePort {
  delete(params: DeleteLikePortParams): Promise<void>
}
