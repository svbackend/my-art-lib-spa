export default {
  app: {
    name: 'MyKino.TOP',
    shortDescription: 'Сохраняй просмотренные фильмы и получай рекомендации от других зрителей',
  },
  common: {
    home: 'Главная',
    close: 'Закрыть',
    search: 'Поиск',
    searchNoResults: 'Поиск по запросу "{query}" не дал результатов',
    edit: 'Редактировать',
    save: 'Сохранить',
    more: 'Больше...',
  },
  validation: {
    required: 'Это поле является обязательным!',
    minLength: 'Поле "{fieldName}" слишком краткое, минимум {min, plural, =0{# символов} =1{1 символ} few{# символа} other{# символов}}!',
    maxLength: 'Поле "{fieldName}" слишком длинное, максимум {max, plural, =0{# символов} =1{1 символ} few{# символа} other{# символов}}!',
    email: 'Введите корректный емейл адресс',
    validUsername: 'Логин должен состоять только из букв, цифр та символов: -, _',
    _incorrect: 'Неверный логин или пароль, попробуйте ещё раз',
    _isUniqueError: 'Такой {fieldName} уже существует',
    validDate: 'Дата должна быть в YYYY-MM-DD формате',
  },
  fields: {
    username: 'Логин',
    password: 'Пароль',
    email: 'Email',
    usernamePlaceholder: 'Иван_Иванович-95',
    movie: {
      originalTitle: 'Оригинальное название'
    },
  },
  loginPage: {
    authorize: 'Авторизация',
  },
  registrationPage: {
    register: 'Зарегистрироваться',
  },
  pagination: {
    prev: 'Предыдущая',
    next: 'Следующая страница'
  },
  users: {
    logout: 'Выйти',
    login: 'Авторизация',
    registration: 'Регистрация',
    my_library: 'Моя Коллекция',
    my_recommendations: 'Мои Рекомендации',
    my_profile: 'Мой Профиль',
    profile: '{username}',
  },
  movie: {
    addToWatchedMovies: 'Добавить в коллекцию',
    removeFromWatchedMovies: 'Удалить с колекции',
    removeFromWatchedMoviesShort: 'Удалить',
    addedToWatchedMovies: 'Просмотрено',
    rate: 'Оцени',
    addRecommendation: 'Рекомендую',
    removeRecommendation: 'Удалить рекомендацию',
    recommendations: 'Рекомендации',
    recommendations_description: 'Хотите порекомендовать другим что-то похожее? Используйте поиск ниже',
    actors: 'Актёры',
    recommendations_loading: 'Мы ищем рекомендации к этому фильму, подождите минутку, или добавьте свою рекомендацию',
  },
  rateModal: {
    yourVote: 'Ваша оценка этому фильму?',
  },
  userRecommendationsPage: {
    empty: 'Пока что тут нету рекомендаций. Что бы их получить - добавьте, пожалуйста, несколько фильмов в вашу коллекцию с оценкой не ниже 7',
  },
  profilePage: {
    watchedMovies: 'Просмотренные фильмы',
    recommendations: 'Рекомендованные фильмы',
  },
}