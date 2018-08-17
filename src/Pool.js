/* global Team */
class Pool { // eslint-disable-line no-unused-vars
  constructor (newName, mySport) {
    this.name = newName
    this.mySport = mySport
    this.allMyTeams = []
  }
  addTeam (newTeam) {
    if (!this.allMyTeams.find(aTeam => aTeam.name === newTeam)) {
      this.allMyTeams.unshift(new Team(newTeam))
      return this.allMyTeams[0]
    }
    return 0
  }
  getTeams () {
    this.sort(`allMyTeams`)
    return this.allMyTeams.map(function (aTeam) { return aTeam })
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
  toString () {
    return `${this.name}`
  }
  buildResultsTable () {
    this.sort(`allMyTeams`, `pointsAgainst`)
    this.sort(`allMyTeams`, `matchesLost`)
    let result = [[``]]
    for (let aTeam of this.allMyTeams) {
      result.push([aTeam.shortName])
      result[0].push(aTeam.shortName)
    }
    for (let i = 1; i < result.length; i++) {
      for (let j = 1; j < result[0].length; j++) {
        result[i][j] = `${this.getMatchScore(result[i][0], result[0][j])}`
      }
    }
    let poolResults = this.getPoolRanking()
    for (let i = 0; i < result.length; i++) {
      for (let cellValue of poolResults[i]) {
        result[i].push(cellValue)
      }
    }
    return result
  }
  getPoolRanking () {
    this.sort(`allMyTeams`, `pointsAgainst`)
    this.sort(`allMyTeams`, `matchesLost`)
    let result = [[`Rank`, `Points`, `Played`, `Won`, `Drawn`, `Lost`, `For`, `Against`]]
    let i = 1
    for (let aTeam of this.allMyTeams) {
      result.push(aTeam.pointSummary(i))
      i++
    }
    return result
  }
  getMatchScore (team1, team2) {
    let result = ``
    let thisMatch = this.mySport.allMyMatches.find(aMatch => aMatch.hasTeam(team1) && aMatch.hasTeam(team2) && team1 !== team2)
    if (thisMatch) {
      result = thisMatch.getScore(team1, team2)
    }
    return result
  }
  getTopTeams (numberOfTeams) {
    let result = []
    this.sort(`allMyTeams`, `pointsAgainst`)
    this.sort(`allMyTeams`, `matchesLost`)
    for (let i = 0; i < numberOfTeams; i++) {
      result.push(this.allMyTeams[i])
    }
    return result
  }
}
