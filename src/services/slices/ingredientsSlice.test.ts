import { ingredientsReducer, initialState, getIngredients } from './IngredientsSlice';
import { TIngredient } from '@utils-types';

describe('тестирование слайса ingredients', () => {

    const mock: TIngredient[] = [
        {
            _id: "2",
            name: "Биокотлета из марсианской Магнолии",
            type: "main",
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: "https://code.s3.yandex.net/react/code/meat-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png"
        },
        {
            _id: "4",
            name: "Соус Spicy-X",
            type: "sauce",
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png"
        },
    ];

    it('тест на обработку pending', () => {

        const state = ingredientsReducer(initialState, getIngredients.pending(''));
        expect(state).toEqual({ingredients: [], loading: true, error: null});
    });

    it('тест на обработку fulfilled', () => {

        const state = ingredientsReducer(initialState, getIngredients.fulfilled(mock, ''));
        expect(state).toEqual({ingredients: mock, loading: false, error: null});
    });

    it('тест на обработку rejected', () => {
        
        const action = {type: getIngredients.rejected.type, error: { message: 'Ошибка' } };
        const state = ingredientsReducer(initialState, action);
        expect(state).toEqual({ingredients: [], loading: false, error: 'Ошибка'});
    });
});