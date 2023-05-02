export class OrgNotFound extends Error {
  constructor() {
    super('Organization not found.')
  }
}
