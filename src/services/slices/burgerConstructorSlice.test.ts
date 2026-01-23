import {burgerConstructorReducer, addIngredient, removeIngredient, ingredientUp, ingredientDown} from './burgerConstructorSlice';
import { TIngredient } from '@utils-types';
  
  
describe('тестирование слайса constructor', () => {

    const ingredientСutlet: TIngredient = {
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
        
    };
      
    const ingredientSauce: TIngredient = {
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
    
    };

    it('тест на добавления ингредиента', () => {
        
        const action = addIngredient(ingredientСutlet);
        const state = burgerConstructorReducer(undefined, action);
        expect(state.ingredients).toHaveLength(1);
        expect(state.ingredients[0]).toMatchObject(ingredientСutlet);
        expect(state.ingredients[0]).toHaveProperty('id');
    });
  
    it('тест на удаление ингредиента', () => {

        const ingredient = addIngredient(ingredientСutlet).payload;
        const initialState = { bun: null, ingredients: [ingredient] };
        const state = burgerConstructorReducer(initialState, removeIngredient(ingredient.id));
        expect(state.ingredients).toHaveLength(0);
    });
  
    it('тест на перемешения ингредиента вверх', () => {

        const ingredient1 = addIngredient(ingredientСutlet).payload;
        const ingredient2 = addIngredient(ingredientSauce).payload;
        const initialState = { bun: null, ingredients: [ingredient1, ingredient2] };
        const state = burgerConstructorReducer(initialState, ingredientUp(ingredient2.id));
        expect(state.ingredients[0].id).toBe(ingredient2.id);
        expect(state.ingredients[1].id).toBe(ingredient1.id);
    });
  
    it('тест на перемешения ингредиента вниз', () => {

        const ingredient1 = addIngredient(ingredientСutlet).payload;
        const ingredient2 = addIngredient(ingredientSauce).payload;
        const initialState = { bun: null, ingredients: [ingredient1, ingredient2] };
        const state = burgerConstructorReducer(initialState, ingredientDown(ingredient1.id));
        expect(state.ingredients[0].id).toBe(ingredient2.id);
        expect(state.ingredients[1].id).toBe(ingredient1.id);
    });

});
  