export default {
  app: {
    name: 'My Art Lib',
    shortDescription: 'Collect your own library of watched movies',
  },
  common: {
    close: 'Close',
    search: 'Search',
    searchNoResults: 'Looks like we have not found any movies by your query "{query}"',
    edit: 'Edit',
    save: 'Save',
  },
  validation: {
    required: 'This field is required!',
    minLength: '{fieldName} must be at least {min, plural, =1{1 character} other{# characters}} long',
    maxLength: '{fieldName} is too long, max {max, plural, =1{1 characters} other{# characters}} long!',
    email: 'It is not a valid email address',
    validUsername: 'Username should contain only letters, numbers and symbols like - or _',
    _incorrect: 'Username or Password is incorrect, try again',
    _isUniqueError: 'This {fieldName} already in use'
  },
  fields: {
    username: 'Username',
    password: 'Password',
    email: 'Email',
    usernamePlaceholder: 'Іван_Іванович-95',
    movie: {
      originalTitle: 'Original Title'
    },
  },
  loginPage: {
    authorize: 'Sign In',
  },
  registrationPage: {
    register: 'Sign Up',
  },
  users: {
    logout: 'Logout',
    login: 'Login',
    registration: 'Registration',
    my_library: 'My Library',
    my_recommendations: 'My Recommendations',
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
  },
  rateModal: {
    yourVote: 'Your vote for this movie?',
  }
}