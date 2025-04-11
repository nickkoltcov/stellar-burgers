import { feedReducer, initialState, getFeed } from './feedSlice';
import { TOrder } from '@utils-types';

describe('тестирование слайса feed', () => {

    const mockOrders: TOrder[] = [
        {
        _id: '1',
        ingredients: ['1', '2'],
        status: 'done',
        name: 'Бургер',
        createdAt: '2025-01-01T12:00:00Z',
        updatedAt: '2025-01-01T12:00:00Z',
        number: 1000
        }
    ];

    it('тест на обработку pending', () => {

        const state = feedReducer(initialState, getFeed.pending(''));
        expect(state).toEqual({...initialState, loading: true, error: null});
    });

    it('тест на обработку fulfilled', () => {

        const payload = {success: true, orders: mockOrders, total: 500, totalToday: 50};
        const state = feedReducer(initialState, getFeed.fulfilled(payload, ''));
        expect(state).toEqual({...initialState, orders: mockOrders, total: 500, totalToday: 50, loading: false, error: null});
    });

    it('тест на обработку rejected', () => {
        
        const action = {type: getFeed.rejected.type, error: { message: 'Ошибка' }};
        const state = feedReducer(initialState, action);
        expect(state).toEqual({...initialState, loading: false, error: 'Ошибка'});
    });
});
