function sendRequest (form) {
  let fetchReq = {
    method: 'POST',
    body: new FormData(form)
  }
  console.log('Sending...')
  let obj = fetchReq.body
  let key = obj.keys()
  obj.forEach(val => console.log(key.next().value + ':  ' + val))
  fetch(url, fetchReq).then(parse).then(test).then(out)
}
function parse (response) {
  console.log('Receiving...')
  return response.json()
}
function test (json) {
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
function out (json = 'output usually goes here...') {
  let out = json
  console.log(out)
}
function checkTime (i) {
  if (i < 10) { i = '0' + i }
  return i
}
