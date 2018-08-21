/* global Sport View */
class Tournament { // eslint-disable-line no-unused-vars
  constructor (newName = `undefined`) {
    this.name = newName
    this.allMySports = []
  }
  addSports (allSports) {
    for (let aSport of allSports) {
      this.allMySports.unshift(new Sport(aSport.Name, aSport.Venue))
      this.allMySports[0].requestMatches()
    }
  }
  getAll () {
    console.log('Getting All...')
    let result = document.createElement(`main`)
    let header = document.createElement(`h1`)
    header.innerHTML = this.name
    result.appendChild(header)
    result.appendChild(this.getTeams())
    result.appendChild(this.getPools())
    result.appendChild(this.getMatches())
    result.appendChild(this.getTeamMatches())
    result.appendChild(this.getPoolResults())
    this.addSemiFinals('Netball', new Date(2018, 3, 14, 15, 0), new Date(2018, 3, 14, 17, 0))
    this.addSemiFinals(`Men's Rugby Sevens`, new Date(2018, 3, 15, 11, 45), new Date(2018, 3, 15, 12, 0))
    this.addSemiFinals(`Women's Rugby Sevens`, new Date(2018, 3, 15, 11, 0), new Date(2018, 3, 15, 11, 20))
    result.appendChild(this.getSemiFinalsMatches())
    console.log('Got All?...')
    return result
  }
  getTeams () {
    let result = document.createElement(`section`)
    this.sort(`allMySports`)
    for (let aSport of this.allMySports) {
      let sport = document.createElement(`article`)
      sport.setAttribute(`id`, `teams-display`)
      let elem = document.createElement(`h3`)
      elem.innerHTML = `The ${aSport.name} is played at the ${aSport.venue}`
      sport.appendChild(elem)
      elem = document.createElement(`h4`)
      elem.innerHTML = `The Teams Are:`
      sport.appendChild(elem)
      sport.appendChild(View.makeList(aSport.getTeams()))
      result.appendChild(sport)
    }
    return result
  }
  getPools () {
    let result = document.createElement(`section`)
    this.sort(`allMySports`)
    for (let aSport of this.allMySports) {
      result.appendChild(aSport.getPools())
    }
    return result
  }
  getMatches () {
    let result = document.createElement(`section`)
    this.sort(`allMySports`)
    for (let aSport of this.allMySports) {
      let sport = document.createElement(`article`)
      sport.setAttribute(`id`, `matches-display`)
      let elem = document.createElement(`h3`)
      elem.innerHTML = `${aSport.name} Matches`
      sport.appendChild(elem)
      sport.appendChild(View.makeTable(aSport.getMatches()))
      result.appendChild(sport)
    }
    return result
  }
  getTeamMatches (targetTeam = `New Zealand`) {
    let result = document.createElement(`section`)
    this.sort(`allMySports`)
    for (let aSport of this.allMySports) {
      let sport = document.createElement(`article`)
      sport.setAttribute(`id`, `team-matches-display`)
      let elem = document.createElement(`h3`)
      elem.innerHTML = `${targetTeam} in ${aSport.name}`
      sport.appendChild(elem)
      sport.appendChild(View.makeTable(aSport.teamMatches(targetTeam)))
      result.appendChild(sport)
    }
    return result
  }
  sort (dataBase, sortByValue = `name`) {
    this[dataBase].sort(function (a, b) {
      if (a[sortByValue] < b[sortByValue]) {
        return -1
      }
      if (a[sortByValue] > b[sortByValue]) {
        return 1
      }
      return 0
    })
  }
  findSport (targetSport) {
    return this.allMySports.find(aSport => aSport.name === targetSport)
  }
  getPoolResults () {
    let result = document.createElement(`section`)
    this.sort(`allMySports`)
    for (let aSport of this.allMySports) {
      result.appendChild(aSport.getResultsTables())
    }
    return result
  }
  getPoolRanking () {
    let result = ``
    this.sort(`allMySports`)
    this.allMySports.map(function (aSport) { result += `<h3>${aSport.name} Pool Ranking</h3>${aSport.getPoolRanking()}` })
    return result
  }
  addSemiFinals (aSport, ...dates) {
    aSport = this.allMySports.find(thatSport => thatSport.name === aSport)
    switch (aSport.allMyPools.length) {
      case 2:
        aSport.addSemiFinals2Pool(dates)
        console.log(`The ${aSport.name} has 2 Pools... I am happy :)`)
        break
      case 4:
        aSport.addSemiFinals4Pool(dates)
        console.log(`The ${aSport.name} has 4 Pools... I am happy :)`)
        break
      default:
        console.log(`Help!! The ${aSport.name} has something other than 2 or 4 pools!! I am sad :(`)
    }
  }
  getSemiFinalsMatches () {
    let result = document.createElement(`section`)
    this.sort(`allMySports`)
    for (let aSport of this.allMySports) {
      let sport = document.createElement(`article`)
      sport.setAttribute(`id`, `semi-finals-display`)
      let elem = document.createElement(`h3`)
      elem.innerHTML = `${aSport.name} Semi Finals`
      sport.appendChild(elem)
      sport.appendChild(View.makeTable(aSport.getSemiFinalsMatches()))
      result.appendChild(sport)
    }
    return result
  }
}
