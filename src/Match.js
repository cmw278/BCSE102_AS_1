class Match { // eslint-disable-line no-unused-vars
  constructor (newDate, newPool, newTeamA, newTeamB) {
    this.when = newDate
    this.pool = newPool
    this.teamA = newTeamA
    this.teamB = newTeamB
    this.scoreA = 0
    this.scoreB = 0
    this.isADraw = false
  }
  array () {
    return [`${this.teamA.shortName} vs ${this.teamB.shortName}`, this.pool, this.when.toDateString(), this.getTime()]
  }
  getTime () {
    return this.when.toLocaleString().split(`, `).pop()
  }
  hasTeam (targetTeam) {
    return this.teamA.name === targetTeam || this.teamB.name === targetTeam || this.teamA.shortName === targetTeam || this.teamB.shortName === targetTeam
  }
  isSemiFinal () {
    return this.pool.name === `Semi-Finals`
  }
  addResults (team1Name, team2Name, ...score) {
    if (this.teamA.name !== team1Name) {
      score.reverse()
    }
    this.scoreA = score[0]
    this.scoreB = score[1]
    if (this.scoreA === this.scoreB) {
      this.isADraw = true
      this.teamA.draws(this.scoreA, this.scoreB)
      this.teamB.draws(this.scoreB, this.scoreA)
    } else if (this.scoreA > this.scoreB) {
      this.teamA.wins(this.scoreA, this.scoreB)
      this.teamB.loses(this.scoreB, this.scoreA)
    } else {
      this.teamB.wins(this.scoreB, this.scoreA)
      this.teamA.loses(this.scoreA, this.scoreB)
    }
  }
  getScore (team1ShortName, team2ShortName) {
    let result = [this.scoreA, this.scoreB]
    if (this.teamA.shortName !== team1ShortName) {
      result.reverse()
    }
    return `${result[0]}-${result[1]}`
  }
}
