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
    let patchData = {
      movie: {
        vote: vote,
        watchedAt: movie.userWatchedMovie.watchedAt
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