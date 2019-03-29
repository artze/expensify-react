import authReducer from '../../reducers/auth';

test('should set uid with login action', () => {
    const uid = 'abcde';
    const action = {
        type: 'LOGIN',
        uid
    }
    const state = authReducer({}, action);
    expect(state).toEqual({ uid })
})

test('should remove uid with logout action', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({ uid: 'abcde' }, action);
    expect(state).toEqual({})
})