import Vue from '@/main'

export function mergeGuestMovies() {
  if (Vue.$store.state.guest.token) {
    let guestSessionToken = Vue.$store.state.guest.token;
    Vue.$http.post('/users/mergeWatchedMovies', {
      token: guestSessionToken
    }).then(response => {
      // I think nothing should be here
    }).catch(error => {
      // if error status 404 it mean that guest session already expired and we cant find movies to merge
    })
  }
}

export function getUserVoteForMovie(movie) {
  let vote = 0;

  if (Vue.$store.state.isUserLoggedIn === true) {
    if (movie.userWatchedMovie) {
      vote = movie.userWatchedMovie.vote
    }
    return vote;
  }

  if (movie.guestWatchedMovie) {
    vote = movie.guestWatchedMovie.vote
  }

  return vote;
}

export function setUserVoteForMovie(movie, vote) {
  if (Vue.$store.state.isUserLoggedIn === true && movie.userWatchedMovie) {
    let watchedAt = null

    let patchData = {
      movie: {
        vote: vote,
        watchedAt: movie.userWatchedMovie.hasOwnProperty('watchedAt') ? movie.userWatchedMovie.watchedAt : watchedAt
      }
    }
    let endpoint = '/users/{userId}/watchedMovies/'
    endpoint = endpoint.replace('{userId}', Vue.$store.state.user.id)
    if (movie.userWatchedMovie.id) {
      Vue.$http.patch(endpoint + movie.userWatchedMovie.id, patchData)
      return;
    }
    endpoint = endpoint + 'movie/' + movie.id
    Vue.$http.patch(endpoint, patchData)
    return;
  }

  //todo guest vote
}

export function addToLibrary(movie) {
  let movieId = movie.id

  let endpoint = '';

  if (Vue.$store.state.isUserLoggedIn === true) {
    endpoint = '/users/watchedMovies';
  } else {
    endpoint = '/guests/{token}/watchedMovies';
    endpoint = endpoint.replace('{token}', Vue.$store.state.guest.token);
  }
  Vue.$http.post(endpoint, {
    movie: {
      id: movieId,
      tmdbId: null,
      vote: null,
      watchedAt: null,
    }
  })
    .then(response => {
      movie.isWatched = true
    })
}

export function removeFromLibrary(movie, event) {
  console.log(movie)
  let movieId = movie.id

  if (movie.userWatchedMovie && typeof movie.userWatchedMovie.id !== 'undefined') {
    movieId = movie.userWatchedMovie.id;
  }

  let endpoint = '';

  if (Vue.$store.state.isUserLoggedIn === true) {
    endpoint = '/users/{user}/watchedMovies/{movie}';
    endpoint = endpoint.replace('{user}', Vue.$store.state.user.id);
  } else {
    endpoint = '/guests/{token}/watchedMovies/{movie}';
    endpoint = endpoint.replace('{token}', Vue.$store.state.guest.token);
  }
  endpoint = endpoint.replace('{movie}', movieId);

  Vue.$http.delete(endpoint)
    .then(response => {
      movie.isWatched = false
    })
    .catch(error => {
      console.log('-----error-------');
      console.log(error);
    })
}