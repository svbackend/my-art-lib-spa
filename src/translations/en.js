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
    loading: 'Loading...',
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
      old_password: 'Old password',
      new_password: 'New password',
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
    my_wishlist: 'My Wishlist',
    profile: '{username}\'s profile',
    forgot_password: 'Forgot password?',
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
    addToInterestedMovies: 'I\'ll watch this movie later',
    removeFromInterestedMovies: 'I\'ll not watch this movie',
    recommended_times: 'recommendations',
  },
  rateModal: {
    yourVote: 'Your vote for this movie?',
  },
  userRecommendationsPage: {
    empty: 'There\'s no recommendations at the moment. To get some - please add a few movies to your library with a score of no lower than 7',
  },
  userWishlistPage: {
    empty: 'There\'s no movies at the moment. This section will contain the movies you are want to watch',
  },
  userLibraryPage: {
    empty: 'There\'s no movies at the moment. This section will contain movies that you have already watched.',
  },
  editProfilePage: {
    title: 'Edit profile information',
  },
  editPasswordPage: {
    title: 'Change password',
    success: 'Password successfully changed!',
    error: 'Check is your old password correct?',
  },
  profilePage: {
    watchedMovies: 'Watched movies',
    recommendations: 'Recommendations',
    wishlist: 'Wishlist',
    emptyAbout: 'User {username} did not provide any further information',
  },
  actorPage: {
    movies: 'Movies',
  },
  forgotPasswordPage: {
    success: 'Done!',
    error: 'We can\'t send recovery token, looks like this email is not connected to any of our users',
    sendRecoveryEmail: 'Send recovery email',
    emailSent: 'Your password recovery email sent successfully. Please check your inbox',
    tokenAlreadySent: 'Your password recovery email was sent early. Please check your inbox',
  },
  recoverPasswordPage: {
    success: 'Your password successfully changed!',
    error: 'Something went wrong.. Try again later please',
  },
}
