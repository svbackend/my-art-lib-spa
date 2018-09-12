export default {
  app: {
    name: 'MyKino.TOP',
    shortDescription: 'Колекціонуй переглянуті фільми та отримуй рекомендації від інших глядачів',
  },
  common: {
    home: 'Головна',
    close: 'Закрити',
    search: 'Пошук',
    searchNoResults: 'Схоже ми не знайшли жодного фільму по вашому запиту: "{query}"',
    edit: 'Редагувати',
    save: 'Зберегти',
    more: 'Більше...',
  },
  validation: {
    required: 'Це поле є обов\'язковим!',
    minLength: 'Поле "{fieldName}" занадто коротке, мінімум {min, plural, =0{# символів} =1{1 символ} few{# символи} other{# символів}}!',
    maxLength: 'Поле "{fieldName}" занадто довге, максимум {max, plural, =0{# символів} =1{1 символ} few{# символи} other{# символів}}!',
    email: 'Введіть коректний емейл адрес',
    validUsername: 'Логін повинен складатись лише з букв, цифр та символів: -, _',
    _incorrect: 'Невірний Логін або Пароль, попробуйте ще раз',
    _isUniqueError: 'Такий {fieldName} вже зареєстрований',
    validDate: 'Дата повинна бути в YYYY-MM-DD форматі',
  },
  fields: {
    username: 'Логін',
    password: 'Пароль',
    email: 'Email',
    usernamePlaceholder: 'Іван_Іванович-95',
    movie: {
      originalTitle: 'Оригінальна назва'
    },
  },
  loginPage: {
    authorize: 'Авторизуватись',
  },
  registrationPage: {
    register: 'Зареєструватись',
  },
  pagination: {
    prev: 'Попередня',
    next: 'Наступна сторінка'
  },
  users: {
    logout: 'Вийти',
    login: 'Авторизація',
    registration: 'Реєстрація',
    my_library: 'Моя Колекція',
    my_recommendations: 'Мої рекомендації',
    my_profile: 'Мій Профіль',
    my_wishlist: 'Мій список бажань',
    profile: '{username}',
  },
  movie: {
    addToWatchedMovies: 'Додати в колекцію',
    removeFromWatchedMovies: 'Видалити з колекції',
    removeFromWatchedMoviesShort: 'Видалити',
    addedToWatchedMovies: 'Переглянуто',
    rate: 'Оціни',
    addRecommendation: 'Рекомендую',
    removeRecommendation: 'Видалити рекомендацію',
    recommendations: 'Рекомендації',
    recommendations_description: 'Хочете порекомендувати іншим подібний фільм до цього? Скористайтесь пошуком нижче',
    actors: 'Актори',
    recommendations_loading: 'Ми наразі шукаємо рекомендації до цього фільму, зачекайте трішки, або добавте свою рекомендацію',
    addToInterestedMovies: 'Хочу переглянути',
    removeFromInterestedMovies: 'Не буду дивитись',
  },
  rateModal: {
    yourVote: 'Ваша оцінка цьому фільму?',
  },
  userRecommendationsPage: {
    empty: 'Наразі тут немає рекомендацій. Щоб їх отримати - додайте будь ласка кілька фільмів до вашої колекції з оцінкою не менше ніж 7',
  },
  profilePage: {
    watchedMovies: 'Переглянуті фільми',
    recommendations: 'Рекомендовані фільми',
  },
  actorPage: {
    movies: 'Фільми',
  }
}