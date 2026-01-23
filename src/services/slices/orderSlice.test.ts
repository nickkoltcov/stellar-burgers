import { orderReducer, initialState, getOrders, getOrderNumber, postOrderBurger} from './orderSlice';
import { TOrder } from '@utils-types';
 

describe('тестирование слайса order', () => {

    const mockOrder: TOrder = {
        _id: '1',
        number: 1234,
        name: 'Бургер',
        ingredients: ['1'],
        status: 'done',
        createdAt: '2025-01-01T12:00:00Z',
        updatedAt: '2025-01-01T12:00:00Z'
    };
    
    const mockOrders: TOrder[] = [mockOrder];

    it('тест на getOrders.pending', () => {

        const state = orderReducer(initialState, getOrders.pending(''));
        expect(state).toEqual({orderList: [], order: null, orderState: false, loading: true, error: null});
    });

    it('тест на getOrders.fulfilled', () => {

        const state = orderReducer(initialState, getOrders.fulfilled(mockOrders, ''));
        expect(state).toEqual({orderList: mockOrders, order: null, orderState: false, loading: false, error: null});
    });

    it('тест на getOrders.rejected', () => {

        const action = { type: getOrders.rejected.type, error: { message: 'Ошибка' } };
        const state = orderReducer(initialState, action);
        expect(state).toEqual({orderList:[], order: null, orderState: false, loading: false, error: 'Ошибка'});
    });

    it('тест на getOrderNumber.pending', () => {

        const state = orderReducer(initialState, getOrderNumber.pending('', 1234));
        expect(state).toEqual({orderList: [], order: null, orderState: false, loading: true, error: null});
    });

    it('тест на getOrderNumber.fulfilled', () => {

        const payload = { success: true, orders: mockOrders };
        const state = orderReducer(initialState, getOrderNumber.fulfilled(payload, '', 1234));
        expect(state).toEqual({orderList: [], order: mockOrders[0], orderState: false, loading: false, error: null});
    });

    it('тест на getOrderNumber.rejected', () => {

        const action = { type: getOrderNumber.rejected.type, error: { message: 'Ошибка' } };
        const state = orderReducer(initialState, action);
        expect(state).toEqual({orderList:[], order: null, orderState: false, loading: false, error: 'Ошибка'});
    });

    it('тест на postOrderBurger.pending', () => {

        const state = orderReducer(initialState, postOrderBurger.pending('', []));
        expect(state).toEqual({orderList: [], order: null, orderState: true, loading: true, error: null});
    });

    it('тест на postOrderBurger.fulfilled', () => {

        const payload = {name: 'Заказ принят', success: true, order: mockOrder };
        const state = orderReducer(initialState, postOrderBurger.fulfilled(payload, '', ['ingredient1']));
        expect(state).toEqual({orderList: [mockOrder], order: mockOrder, orderState: false, loading: false, error: null});
    });

    it('тест на postOrderBurger.rejected', () => {
        
        const action = { type: postOrderBurger.rejected.type, error: { message: 'Ошибка' }};
        const state = orderReducer(initialState, action);
        expect(state).toEqual({orderList:[], order: null, orderState: false, loading: false, error: 'Ошибка'});
    });

});
