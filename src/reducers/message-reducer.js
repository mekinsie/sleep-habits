import * as c from './../actions/ActionTypes';

export default (state = null, action) => {
  switch(action.type){
    case c.EDIT_MESSAGE:
      return action.message
    default:
      return state;
  }
}