import messageReducer from '../../reducers/message-reducer';
import * as a from '../../actions/index.js'

describe('messageReducer', () => {
  let action;

  test('Should return default state if no action type is recognized', () => {
    expect(messageReducer(null, {type: null})).toEqual(null);
  });

  test('Should return set new message when message passed into it', () => {
    action = a.editMessage("Success!")
    expect(messageReducer(null, action)).toEqual("Success!");
  });

})