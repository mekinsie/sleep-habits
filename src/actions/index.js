import * as c from './ActionTypes'

export const editMessage = (message) => {
  return {
    type: c.EDIT_MESSAGE,
    message: message
  }
}