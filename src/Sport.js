/* global Match Pool View */
class Sport { // eslint-disable-line no-unused-vars
  constructor (newName = `someSport`, newVenue = `somePlace`) {
    this.name = newName
    this.venue = newVenue
    this.allMyMatches = []
    this.allMyTeams = []
    this.allMyPools = []
  }
  addMatch (newYear, newMonth, newDay, newHour, newMinute, newPool, newTeamA, newTeamB) {
    newPool = this.addTeam(newPool, newTeamA, newTeamB)
    newTeamA = this.findTeam(newTeamA)
    newTeamB = this.findTeam(newTeamB)
    this.allMyMatches.push(new Match(new Date(newYear, newMonth, newDay, newHour, newMinute), newPool, newTeamA, newTeamB))
  }
  addTeam (newPool, ...newTeams) {
    let thisPool = this.addPool(newPool)
    for (let aNewTeam of newTeams) {
      let thisTeam = thisPool.addTeam(aNewTeam)
      if (thisTeam) {
        this.allMyTeams.unshift(thisTeam)
      }
    }
    return thisPool
  }
  addPool (newPool) {
    for (let aPool of this.allMyPools) {
      if (aPool.name === newPool) {
        return aPool
      }
    }
    this.allMyPools.unshift(new Pool(newPool, this))
    return this.allMyPools[0]
  }
  getTeams () {
    this.sort(`allMyTeams`)
    return this.allMyTeams.map(function (aTeam) { return aTeam })
  }
  getPools () {
    let result = document.createElement(`article`)
    this.sort(`allMyPools`)
    let elem = document.createElement(`h3`)
    elem.innerHTML = `The ${this.name} Pools Are:`
    result.appendChild(elem)
    for (let aPool of this.allMyPools) {
      let pool = document.createElement(`div`)
      pool.setAttribute(`class`, `pool-display`)
      pool.setAttribute(`id`, `pool-${aPool.name.toLowerCase()}`)
      elem = document.createElement(`h4`)
      elem.innerHTML = `Pool ${aPool.name}`
      pool.appendChild(elem)
      pool.appendChild(View.makeList(aPool.getTeams()))
      result.appendChild(pool)
    }
    return result
  }
  getMatches () {
    if (!this.allMyMatches) {
      return [[``, `None Scheduled`, ``, ``]]
    }
    this.sort(`allMyMatches`, `when`)
    let result = [[`Match`, `Pool`, `Date`, `Time`]]
    this.allMyMatches.map(function (aMatch) { result.push(aMatch.array()) })
    return result
  }
  teamMatches (targetTeam) {
    this.sort(`allMyMatches`, `when`)
    let result = [[`Match`, `Pool`, `Date`, `Time`]]
    this.allMyMatches.map(function (aMatch) { if (aMatch.hasTeam(targetTeam)) { result.push(aMatch.array()) } })
    return result
  }
  findTeam (targetTeam) {
    return this.allMyTeams.find(aTeam => aTeam.name === targetTeam)
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
  addPoolResult (teamAName, teamBName, teamAScore, teamBScore) {
    this.findMatch(teamAName, teamBName).addResults(teamAName, teamBName, teamAScore, teamBScore)
  }
  findMatch (team1, team2) {
    return this.allMyMatches.find(aMatch => aMatch.hasTeam(team1) && aMatch.hasTeam(team2) && team1 !== team2)
  }
  addShortName (fullTeamName, newShortName) {
    let theTeam = this.findTeam(fullTeamName)
    theTeam.shortName = newShortName
  }
  getPoolRanking () {
    let result = ``
    this.sort(`allMyPools`)
    for (let aPool of this.allMyPools) {
      result += `<h3>Pool ${aPool.name}</h3>${View.makeTable(aPool.getPoolRanking())}`
    }
    return result
  }
  getResultsTables () {
    let result = document.createElement(`article`)
    this.sort(`allMyPools`)
    let elem = document.createElement(`h3`)
    elem.innerHTML = `${this.name} Pool Play Results`
    result.appendChild(elem)
    for (let aPool of this.allMyPools) {
      let pool = document.createElement(`div`)
      pool.setAttribute(`class`, `pool-display`)
      pool.setAttribute(`id`, `pool-${aPool.name.toLowerCase()}`)
      elem = document.createElement(`h4`)
      elem.innerHTML = `Pool ${aPool.name}`
      pool.appendChild(elem)
      pool.appendChild(View.makeTable(aPool.buildResultsTable()))
      result.appendChild(pool)
    }
    return result
  }
  addSemiFinals2Pool (dates) {
    let topRankingTeams = []
    for (let aPool of this.allMyPools) {
      aPool.getTopTeams(2).map(function (aTeam) { topRankingTeams.push(aTeam) })
    }
    let aNewPool = this.addPool(`Semi-Finals`)
    topRankingTeams.map(function (aTeam) { aNewPool.allMyTeams.push(aTeam) })
    for (let aDate of dates) {
      this.allMyMatches.push(new Match(aDate, aNewPool, topRankingTeams.pop(), topRankingTeams.shift()))
    }
  }
  addSemiFinals4Pool (dates) {
    console.log(`nope.`)
    let topRankingTeams = []
    for (let aPool of this.allMyPools) {
      aPool.getTopTeams(1).map(function (aTeam) { topRankingTeams.push(aTeam) })
    }
    let aNewPool = this.addPool(`Semi-Finals`)
    topRankingTeams.map(function (aTeam) { aNewPool.allMyTeams.push(aTeam) })
    for (let aDate of dates) {
      this.allMyMatches.push(new Match(aDate, aNewPool, topRankingTeams.pop(), topRankingTeams.shift()))
    }
  }
  getSemiFinalsMatches () {
    this.sort(`allMyMatches`, `date`)
    let result = [[`Match`, `Pool`, `Date`, `Time`]]
    this.allMyMatches.map(function (aMatch) { if (aMatch.isSemiFinal()) { result.push(aMatch.array()) } })
    return result
  }
}
