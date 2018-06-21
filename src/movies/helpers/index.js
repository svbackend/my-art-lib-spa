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