import { rootReducer } from './rootReducer';
import { initialState as ingredientsInitial } from './slices/IngredientsSlice';
import { initialState as constructorInitial } from './slices/burgerConstructorSlice';
import { initialState as orderInitial } from './slices/orderSlice';
import { initialState as feedInitial } from './slices/feedSlice';
import { initialState as userInitial } from './slices/userSlice';



describe('Тестирование rootReducer', () => {
    
    it('Тест инициализации rootReducer', () => {

        const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
        expect(state).toEqual({ ingredients:ingredientsInitial, constructorBurger:constructorInitial, order:orderInitial, feed:feedInitial, user: userInitial});
    });
});