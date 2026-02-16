# Stellar Burgers

Stellar Burgers — это SPA-приложение для космической бургерной, в котором пользователь может собрать собственный бургер из ингредиентов, оформить заказ, зарегистрироваться, авторизоваться и отслеживать историю заказов в реальном времени.

Проект демонстрирует работу с современной frontend-архитектурой,
централизованным управлением состоянием, защищённой маршрутизацией,
асинхронными REST API запросами и тестированием.


## Демо

GitHub Pages: https://nickkoltcov.github.io/stellar-burgers/

## Основной функционал

- Конструктор бургеров
- Формирование и оформление заказа
- Регистрация и авторизация пользователей
- Восстановление пароля
- Просмотр истории заказов
- Получение и отображение ленты заказов через REST API
- Модальные окна с поддержкой прямых URL
- Protected Routes (доступ по авторизации)
- Unit и E2E тестирование

## Технологический стек

- React
- TypeScript
- Redux Toolkit
- React Router
- Jest
- Cypress
- Webpack
- CSS Modules

## Архитектура

Проект реализован как Single Page Application (SPA).

### Централизованное управление состоянием приложения через Redux Toolkit:

- createSlice — для создания domain-слайсов
- createAsyncThunk — для асинхронных запросов
- extraReducers — для обработки состояний pending / fulfilled / rejected
- Селекторы для получения данных из store

### Асинхронные запросы

Получение данных реализовано через REST API с использованием createAsyncThunk.

#### Пример архитектурного потока:
```
React Component
      ↓
dispatch(asyncThunk)
      ↓
API request
      ↓
extraReducers
      ↓
Redux store update
      ↓
UI re-render
```
### Структура состояния

Каждый slice хранит:

- данные
- состояние загрузки (loading)
- состояние ошибки (error)

#### Пример:
```
type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
};
```

## Структура проекта
```
stellar-burgers/
│
├── public/                    # Статические файлы
├── src/
│   ├── components/            # UI компоненты
│   ├── pages/                 # Страницы приложения
│   ├── services/
│   │   ├── slices/            # Redux slices
│   │   │   ├── burgerConstructorSlice.ts
│   │   │   ├── feedSlice.ts
│   │   │   ├── ingredientsSlice.ts
│   │   │   ├── orderSlice.ts
│   │   │   ├── userSlice.ts
│   │   │   └── rootReducer.ts
│   │   └── store.ts           # Конфигурация store
│   └── utils/                 # Утилиты
├── cypress/                   # E2E тесты
├── jest.config.ts
├── webpack.config.js
└── tsconfig.json
```

## Установка и запуск

#### Клонирование репозитория
```
git clone https://github.com/nickkoltcov/stellar-burgers.git
cd stellar-burgers
```

#### Установка зависимостей
```
npm install
```

#### Запуск проекта
```
npm run start
```

#### Сборка продакшен-версии
```
npm run build
```

## Тестирование

#### Unit-тесты (Jest):
```
npm run test
```

#### E2E-тесты (Cypress):
```
npm run cypress:open
```

#### Проект покрыт тестами:

- Redux-слайсы
- Асинхронные действия (pending / fulfilled / rejected)
- Работа модальных окон
- Добавление ингредиентов
- Оформление заказа

## Навыки, продемонстрированные в проекте

- SPA архитектура
- Feature-based структура проекта
- Redux Toolkit
- Асинхронные запросы через createAsyncThunk
- Управление состояниями загрузки и ошибок
- Защищённая маршрутизация (ProtectedRoute)
- Типизация сложного UI на TypeScript
- Тестирование (Jest + Cypress)

## Ключевые технические решения

- Архитектура построена по принципу разделения бизнес-логики и UI
- Каждый домен приложения вынесен в отдельный Redux slice
- Асинхронные операции реализованы через createAsyncThunk
- Используется строгая типизация TypeScript
- Реализована защищённая маршрутизация
- Покрытие бизнес-логики unit-тестами