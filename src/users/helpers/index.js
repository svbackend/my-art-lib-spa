import Vue from '@/main'
import {apiHost} from './../../config.js'

export function getUserByUsername(username) {
  return Vue.$http.get('/users/byUsername/' + username)
}

export function getUserById(id) {
  return Vue.$http.get('/users/' + id)
}