export default {
  common: {
    close: 'Close'
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
  },
  movie: {
    addToWatchedMovies: 'Add to library',
    addToWatchedMoviesShort: 'Add',
    removeFromWatchedMovies: 'Remove from library',
    removeFromWatchedMoviesShort: 'Remove',
    addedToWatchedMovies: 'Added',
    rate: 'Rate',
  },
  rateModal: {
    yourVote: 'Your vote for this movie?',
  }
}