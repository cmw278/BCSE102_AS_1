/* global globalShortNames */
class Team { // eslint-disable-line no-unused-vars
  constructor (newName = `someTeam`) {
    this.name = newName
    this.matchesPlayed = 0
    this.matchesWon = 0
    this.matchesLost = 0
    this.matchesDrawn = 0
    this.pointsFor = 0
    this.pointsAgainst = 0
    this.shortName = globalShortNames[newName.replace(/ /g, `_`)]
  }
  wins (newPointsFor, newPointsAgainst) {
    this.matchesWon += 1
    this.matchesPlayed += 1
    this.pointsFor += newPointsFor
    this.pointsAgainst += newPointsAgainst
  }
  loses (newPointsFor, newPointsAgainst) {
    this.matchesLost += 1
    this.matchesPlayed += 1
    this.pointsFor += newPointsFor
    this.pointsAgainst += newPointsAgainst
  }
  draws (newPointsFor, newPointsAgainst) {
    this.matchesDrawn += 1
    this.matchesPlayed += 1
    this.pointsFor += newPointsFor
    this.pointsAgainst += newPointsAgainst
  }
  pointSummary (rank) {
    return [rank, this.getPoints(), this.matchesPlayed, this.matchesWon, this.matchesDrawn, this.matchesLost, this.pointsFor, this.pointsAgainst]
  }
  getPoints () {
    return this.matchesWon * 3 + this.matchesDrawn * 2 + this.matchesLost
  }
  difference () {
    return this.pointsFor - this.pointsAgainst
  }
  toString () {
    return this.name
  }
}
