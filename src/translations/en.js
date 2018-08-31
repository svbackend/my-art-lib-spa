export default {
  app: {
    name: 'MyKino.TOP',
    shortDescription: 'Collect your own library of watched movies and get recommendation from other people',
  },
  common: {
    home: 'Home',
    close: 'Close',
    search: 'Search',
    searchNoResults: 'Looks like we have not found any movies by your query "{query}"',
    edit: 'Edit',
    save: 'Save',
    more: 'More...',
  },
  validation: {
    required: 'This field is required!',
    minLength: '{fieldName} must be at least {min, plural, =1{1 character} other{# characters}} long',
    maxLength: '{fieldName} is too long, max {max, plural, =1{1 characters} other{# characters}} long!',
    email: 'It is not a valid email address',
    validUsername: 'Username should contain only letters, numbers and symbols like - or _',
    validDate: 'Date mast be in YYYY-MM-DD format',
    _incorrect: 'Username or Password is incorrect, try again',
    _isUniqueError: 'This {fieldName} already in use'
  },
  fields: {
    username: 'Username',
    password: 'Password',
    email: 'Email',
    usernamePlaceholder: 'John_Doe-95',
    movie: {
      originalTitle: 'Original Title'
    },
    user: {
      first_name: 'First name',
      last_name: 'Last name',
      birth_date: 'Birthday',
      public_email: 'Public email',
      about: 'About',
    },
  },
  loginPage: {
    authorize: 'Sign In',
  },
  registrationPage: {
    register: 'Sign Up',
  },
  pagination: {
    prev: 'Previous',
    next: 'Next page'
  },
  users: {
    logout: 'Logout',
    login: 'Login',
    registration: 'Registration',
    my_library: 'My Library',
    my_recommendations: 'My Recommendations',
    my_profile: 'My Profile',
    profile: '{username}\'s profile',
  },
  movie: {
    addToWatchedMovies: 'Add to library',
    addToWatchedMoviesShort: 'Add',
    removeFromWatchedMovies: 'Remove from library',
    removeFromWatchedMoviesShort: 'Remove',
    addedToWatchedMovies: 'Added',
    rate: 'Rate',
    addRecommendation: 'Recommend',
    removeRecommendation: 'Remove recommendation',
    recommendations: 'Recommendations',
    recommendations_description: 'Want to recommend another movie similar to this? Use search field below',
    actors: 'Actors',
    recommendations_loading: 'We are currently looking for a recommendations for this movie, wait a bit or recommend movie for other people by yourself',
  },
  rateModal: {
    yourVote: 'Your vote for this movie?',
  },
  userRecommendationsPage: {
    empty: 'There\'s no recommendations at the moment. To get some - please add a few movies to your library with a score of no lower than 7',
  },
  profilePage: {
    watchedMovies: 'Watched movies',
    recommendations: 'Recommendations',
  },
}