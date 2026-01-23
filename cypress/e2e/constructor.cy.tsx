describe('Конструктор бургера', () => {
    const ingredients = '[data-cy="ingredients"]';
    const modal = '[data-cy="modal"]';

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');
        cy.setCookie('token', 'Bearer token');
        window.localStorage.setItem('token', 'Bearer token');
        window.localStorage.setItem('refreshToken', 'mocked-refresh-token');
        cy.visit('http://localhost:4000');
    });

    it('Тест на добавление булки', () => {
        cy.contains('li', 'Краторная булка N-200i').contains('Добавить').click();
        cy.get('[data-cy="bun"]').contains('Краторная булка N-200i').should('exist');
    });

    it('Тест на добавление начинок', () => {
        cy.contains('li', 'Биокотлета из марсианской Магнолии').contains('Добавить').click();
        cy.get(ingredients).contains('Биокотлета из марсианской Магнолии').should('exist');

        cy.contains('li', 'Филе Люминесцентного тетраодонтимформа').contains('Добавить').click();
        cy.get(ingredients).contains('Филе Люминесцентного тетраодонтимформа').should('exist');

        cy.contains('li', 'Соус фирменный Space Sauce').contains('Добавить').click();
        cy.get(ingredients).contains('Соус фирменный Space Sauce').should('exist');
    });

    it('Тест на открытие модального окна ингредиента', () => {
        cy.contains('li', 'Соус фирменный Space Sauce').click();
        cy.get(modal).contains('Соус фирменный Space Sauce').should('exist');
    });

    it('Тест на закрытие по клику на крестик', () => {
        cy.contains('li', 'Соус фирменный Space Sauce').click();
        cy.get(modal).find('button').click();
        cy.get(modal).should('not.exist');
    });

    it('Тест на закрытие по клику на оверлей', () => {
        cy.contains('li', 'Соус фирменный Space Sauce').click();
        cy.get('[data-cy="overlay"]').click({ force: true });
        cy.get(modal).should('not.exist');
    });

    it('Тест сборки бургера, оформления заказа, открытия модального окна с номером заказа и проверка, что конструктор пуст', () => {
        cy.contains('li', 'Краторная булка N-200i').contains('Добавить').click();
        cy.contains('li', 'Биокотлета из марсианской Магнолии').contains('Добавить').click();
        cy.contains('li', 'Соус фирменный Space Sauce').contains('Добавить').click();
        cy.contains('button', 'Оформить заказ').click();
        cy.wait('@postOrder');
        cy.get(modal).contains('223344').should('exist');
        cy.get(modal).find('button').click();
        cy.get(modal).should('not.exist');
        cy.get('[data-cy="bun-constructor"]').contains('Выберите булки').should('exist');
        cy.get('[data-cy="constructor-ingredients"]').contains('Выберите начинку').should('exist');
    });
});