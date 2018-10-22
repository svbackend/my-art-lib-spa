export default {
  app: {
    name: 'MyKino.TOP',
    shortDescription: 'Zbierz obejrzane filmy i uzyskaj rekomendacje od innych widzów',
  },
  common: {
    home: 'Główna',
    close: 'Zamknij',
    search: 'Wyszukaj',
    searchNoResults: 'Wyszukiwanie "{query}" nie przyniosło rezultatów',
    edit: 'Edytuj',
    save: 'Zapisz',
    more: 'Więcej...',
  },
  validation: {
    required: 'To pole jest wymagane!',
    minLength: 'Pole "{fieldName}" jest zbyt krótki, minimum {min, plural, =0{# znaków} =1{1 znak} few{# znaka} other{# znaków}}!',
    maxLength: 'Pole "{fieldName}" jest zbyt długie {max, plural, =0{# znaków} =1{1 znak} few{# znaka} other{# znaków}}!',
    email: 'Proszę podać poprawny adres e-mail',
    validUsername: 'Login może składać się wyłącznie z liter, cyfr i znaków: -, _',
    _incorrect: 'Nieprawidłowy login lub hasło, spróbuj ponownie',
    _isUniqueError: 'Ten {fieldName} jest już zajęty',
    validDate: 'Data urodzenia musi być w formacie YYYY-MM-DD',
  },
  fields: {
    username: 'Login',
    password: 'Hasło',
    email: 'Email',
    usernamePlaceholder: 'Grzegorz_Brzęczyszczykiewicz-95',
    movie: {
      originalTitle: 'Oryginalny tytuł'
    },
  },
  loginPage: {
    authorize: 'Autoryzacja',
  },
  registrationPage: {
    register: 'Zarejestruj się',
  },
  pagination: {
    prev: 'Poprzednia',
    next: 'Następna strona'
  },
  users: {
    logout: 'Wyloguj się',
    login: 'Autoryzacja',
    registration: 'Zarejestruj się',
    my_library: 'Moja kolekcja',
    my_recommendations: 'Moje rekomendacje',
    my_profile: 'Mój profil',
    my_wishlist: 'Moja lista życzeń',
    profile: '{username}',
    forgot_password: 'Zapomniales haslo?',
  },
  movie: {
    addToWatchedMovies: 'Dodaj do kolekcji',
    removeFromWatchedMovies: 'Usuń z kolekcji',
    removeFromWatchedMoviesShort: 'Usuń',
    addedToWatchedMovies: 'Oglądane',
    rate: 'Oceń to',
    addRecommendation: 'Polecam',
    removeRecommendation: 'Usuń rekomendację',
    recommendations: 'Zalecenia',
    recommendations_description: 'Czy chcesz polecić coś podobnego do innych? Użyj wyszukiwania poniżej',
    actors: 'Aktorzy',
    recommendations_loading: 'Szukamy rekomendacji dla tego filmu, czekaj chwilę lub dodaj swoją rekomendację',
    addToInterestedMovies: 'Obejrzę ten film później',
    removeFromInterestedMovies: 'Nie będę oglądać',
    recommended_times: 'polecan',
  },
  rateModal: {
    yourVote: 'Twoja ocena tego filmu?',
  },
  userRecommendationsPage: {
    empty: 'Jak dotąd nie ma zaleceń. Aby je otrzymać, dodaj kilka filmów do swojej kolekcji z oceną co najmniej 7',
  },
  userWishlistPage: {
    empty: 'Jak dotąd nie ma filmów. W tej sekcji znajdziesz filmy, które chcesz obejrzeć',
  },
  userLibraryPage: {
    empty: 'Jak dotąd nie ma filmów. Ta sekcja zawiera filmy, które już oglądałeś.',
  },
  profilePage: {
    watchedMovies: 'Oglądane filmy',
    recommendations: 'Polecane filmy',
    wishlist: 'Wishlist',
    emptyAbout: 'Użytkownik {username} nie podał żadnych dalszych informacji',
  },
  actorPage: {
    movies: 'Filmy',
  }
}
