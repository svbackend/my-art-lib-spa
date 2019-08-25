export default {
  seo: {
    name: 'Мой КиноТоп',
    title: 'Каталог фильмов с рекоммендациями от зрителей',
    description: 'Каталог фильмов на русском с рекоммендациями от других зрителей',
    keywords: 'База данных, онлайн кинотеатр, фильмы, кино, на русском, информация, отзывы, рецензии, обсуждения',
    lang: 'ru',
    movie: {
      title: '{t} {y} смотреть онлайн',
      description: '{t} {y} / {ot} {y} смотреть онлайн на русском или {t} {y} скачать торент в хорошем качестве, рецензии, актёры, рекоммендации, похожие фильмы',
      keywords: 'Перегляд, завантаження, рецензії, {t} ({y}), {ot} ({y}), рекомендації, подібні фільми, актори',
    },
    actor: {
      title: '{n} биография на русском, фильмография',
      description: '{n} биография на русском, фильмография, фотографии, лучшие роли, лучшие фильмы',
      keywords: 'Биография, фильмография, информация, фильмы',
    },
  },
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
    translations: 'Переводы',
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
    select_country: 'Select country',
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
    my_wishlist: 'Мой список желаний',
    profile: '{username}',
    forgot_password: 'Забыли пароль?',
  },
  movie: {
    addToWatchedMovies: 'К просмотренным',
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
    addToInterestedMovies: 'Хочу посмотреть',
    removeFromInterestedMovies: 'Не буду смотреть',
    recommended_times: 'рекомендаций',
    releaseDate: 'Дата выпуска в {country}',
  },
  rateModal: {
    yourVote: 'Ваша оценка этому фильму?',
  },
  userRecommendationsPage: {
    empty: 'Пока что тут нету рекомендаций. Что бы их получить - добавьте, пожалуйста, несколько фильмов в вашу коллекцию с оценкой не ниже 7',
  },
  userWishlistPage: {
    empty: 'Пока что тут нету фильмов. Этот раздел будет содержать фильмы которые вы собираетесь посмотреть',
  },
  userLibraryPage: {
    empty: 'Пока что тут нету фильмов. Этот раздел будет содержать фильмы которые вы уже посмотрели',
  },
  profilePage: {
    watchedMovies: 'Просмотренные фильмы',
    recommendations: 'Рекомендованные фильмы',
    wishlist: 'Список желаний',
    emptyAbout: 'Пользователь {username} не предоставил дополнительной информации',
  },
  actorPage: {
    movies: 'Фильмы',
  },
  forgotPasswordPage: {
    success: 'Готово!',
    error: 'Не удалось найти пользователя с таким емейлом',
    sendRecoveryEmail: 'Отправить',
    emailSent: 'Письмо с инструкциями успешно отправлено вам на почту, пожалуйста, проверьте входящие сообщения',
    tokenAlreadySent: 'Письмо с инструкциями уже было отправлено, пожалуйста, проверьте входящие сообщения',
  },
  recoverPasswordPage: {
    success: 'Ваш пароль успешно изменён!',
    error: 'Ваш токен похоже устарел либо уже не активный',
  },
  homePage: {
    empty: "Мы не нашли ни одного фильма за указанными фильтрами.",
    emptySuggestion: "Вы можете сами изменить параметры поиска либо",
    emptyResetFilter: "сбросить фильтр",
  },
  filters: {
    from: 'От',
    to: 'До',
    movieYear: 'Год выпуска (от - до)',
    movieRating: 'Рейтинг (от - до)',
    movieActors: 'Актёры',
    movieGenres: 'Жанры',
    everyInList: 'Каждый из списка',
    atLeastOneInList: 'Любой из списка',
    andMore: 'И ещё {n}',
    typeToSearch: 'Пишите для поиска',
    showAllFilters: 'Все фильтры',
    noResult: 'Ничего не найдено, попробуйте изменить запрос',
    noOptions: 'Список пустой.',
  }
}
