import { initialState, userReducer, registration, logIn, getUser, updateUserData, logout} from './userSlice';
import { TUser } from '@utils-types';


describe('тестирование слайса user', () => {

    const mockUser: TUser = {
        email: 'test@example.com',
        name: 'Test User'
    };

    describe('registration', () => {

        it('тест на registration.pending', () => {
            
            const state = userReducer(initialState, { type: registration.pending.type });
            expect(state).toEqual({...initialState, loading: true, error: null});
        });

        it('тест на registration.fulfilled', () => {

            const state = userReducer(initialState, { type: registration.fulfilled.type, payload: mockUser });
            expect(state).toEqual({...initialState, loading: false, user: mockUser, isAuthChecked: true, isAuthenticated: true, error: null });
        });

        it('тест на registration.rejected', () => {

            const state = userReducer(initialState, { type: registration.rejected.type, error: { message: 'Ошибка регистрации' } });
            expect(state).toEqual({...initialState, loading: false, error: 'Ошибка регистрации', user: null, isAuthChecked: false, isAuthenticated: false });
        });
    });

    describe('logIn', () => {

        it('тест на logIn.pending', () => {

            const state = userReducer(initialState, { type: logIn.pending.type });
            expect(state).toEqual({...initialState, loading: true, error: null});
        });

        it('тест на logIn.fulfilled', () => {

            const state = userReducer(initialState, { type: logIn.fulfilled.type, payload: mockUser });
            expect(state).toEqual({...initialState, loading: false, user: mockUser, isAuthChecked: true, isAuthenticated: true, error: null });
        });

        it('тест на logIn.rejected', () => {

            const state = userReducer(initialState, { type: logIn.rejected.type, error: { message: 'Ошибка авторизации' } });
            expect(state).toEqual({...initialState, loading: false, error: 'Ошибка авторизации', user: null, isAuthChecked: false, isAuthenticated: false });
        });
    });

    describe('getUser', () => {

        it('тест на getUser.pending', () => {

            const state = userReducer(initialState, { type: getUser.pending.type });
            expect(state).toEqual({...initialState, loading: true, error: null});
        });

        it('тест на getUser.fulfilled', () => {

            const state = userReducer(initialState, { type: getUser.fulfilled.type, payload: { user: mockUser } });
            expect(state).toEqual({...initialState, loading: false, user: mockUser, isAuthChecked: true, isAuthenticated: true, error: null });
        });

        it('тест на getUser.rejected', () => {

            const state = userReducer(initialState, { type: getUser.rejected.type, error: { message: 'Ошибка' } });
            expect(state).toEqual({...initialState, loading: false, error: 'Ошибка', user: null, isAuthChecked: false, isAuthenticated: false });
        });
    });

    describe('updateUserData', () => {

        it('тест на updateUserData.pending', () => {

            const state = userReducer(initialState, { type: updateUserData.pending.type });
            expect(state).toEqual({...initialState, loading: true, error: null});
        });

        it('тест на updateUserData.fulfilled', () => {

            const state = userReducer(initialState, { type: updateUserData.fulfilled.type, payload: mockUser });
            expect(state).toEqual({...initialState, user: mockUser, loading: false, error: null, isAuthChecked: false, isAuthenticated: false });
        });

        it('тест на updateUserData.rejected', () => {

            const state = userReducer(initialState, { type: updateUserData.rejected.type, error: { message: 'Ошибка' } });
            expect(state).toEqual({...initialState, loading: false, error: 'Ошибка', user: null, isAuthChecked: false, isAuthenticated: false });
        });
    });

    describe('logout', () => {

        it('тест на logout.pending', () => {

            const state = userReducer(initialState, { type: logout.pending.type });
            expect(state).toEqual({...initialState, loading: true, error: null});
        });

        it('тест на logout.fulfilled', () => {

            const state = userReducer(initialState, { type: logout.fulfilled.type });
            expect(state).toEqual({...initialState, loading: false, user: null, isAuthChecked: false, isAuthenticated: false, error: null });
        });

        it('тест на logout.rejected', () => {

            const state = userReducer(initialState, { type: logout.rejected.type, error: { message: 'Ошибка' } });
            expect(state).toEqual({...initialState, loading: false, error: 'Ошибка', user: null, isAuthChecked: false, isAuthenticated: false });
        });
    });
});