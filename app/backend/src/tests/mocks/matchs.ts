export const matchsMocks = {
  matchs: [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeClub: {
        clubName: 'São Paulo'
      },
      awayClub: {
        clubName: 'Grêmio'
      }
    },
    {
      id: 2,
      homeTeam: 9,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 1,
      inProgress: true,
      homeClub: {
        clubName: 'Internacional'
      },
      awayClub: {
        clubName: 'Santos'
      }
    },
    {
      id: 3,
      homeTeam: 4,
      homeTeamGoals: 3,
      awayTeam: 11,
      awayTeamGoals: 0,
      inProgress: false,
      homeClub: {
        clubName: 'Corinthians'
      },
      awayClub: {
        clubName: 'Napoli-SC'
      }
    },
  ],
  newMatch: {
    homeTeam: 16,
    awayTeam: 8,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  }
}