export class LikeAlreadyExists extends Error {
  constructor() {
    super('Like already exists')
    this.name = 'LikeAlreadyExists'
  }
}
