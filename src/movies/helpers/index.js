import Vue from '@/main'

export function mergeGuestMovies() {
  if (Vue.$store.state.guest.token) {
    let guestSessionToken = Vue.$store.state.guest.token;
    console.log(guestSessionToken);
    console.log(Vue.$store.state.user.apiToken);
    Vue.$http.post('/users/mergeWatchedMovies', {
      token: guestSessionToken
    }).then(response => {
      // I think nothing should be here
      console.log('merged');
    }).catch(error => {
      // todo
      console.log('got some errors');
    })
  }
}