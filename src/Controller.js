/* global Tournament */
class Controller { // eslint-disable-line no-unused-vars
  static setup () {
    let the2018Games = new Tournament('Gold Coast 2018 Commonwealth Games')
    /* CREATE FIRST DATA REQUEST */
    let payload = new FormData()
    payload.append('option', 'sports')
    this.sendRequest(url, payload, the2018Games, 'addSports')
    return the2018Games
  }
  /* I learned to pass an object variable, and the name of it's method to perform as
  seperate arguments so that the resulting handler would map to the right object */
  static sendRequest (requestUrl, payload, handlerObject, handlerMethodAsString) {
    let fetchRequest = {
      method: 'POST',
      body: payload
    }
    fetch(requestUrl, fetchRequest).then(this.parseJSON).then(this.test).then(json => handlerObject[handlerMethodAsString](json))
  }
  static parseJSON (promise) {
    return promise.json()
  }
  static test (json) {
    try {
      if (json.error) {
        throw json
      }
      return json
    } catch (json) {
      console.log(json.error)
      console.log(json.received)
      console.log(json.advice)
      return
    }
  }
}
