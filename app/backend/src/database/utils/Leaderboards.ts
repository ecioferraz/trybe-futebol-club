import Match from '../models/Match';
import Club from '../models/Club';

export default class Leaderboards {
  // ref https://sequelize.org/v5/manual/models-usage.html#-code-count--code----count-the-occurrences-of-elements-in-the-database

  public static getTotalGames = async (club: Club): Promise<number> =>
    Match.count({ where: { homeTeam: club.id, inProgress: false } });

  public static getGoalsFavor = async (club: Club): Promise<number> =>
    Match.sum('homeTeamGoals', { where: { homeTeam: club.id, inProgress: false } });

  public static getGoalsOwn = async (club: Club): Promise<number> =>
    Match.sum('awayTeamGoals', { where: { homeTeam: club.id, inProgress: false } });

  public static getGoalsBalance = async (club: Club): Promise<number> =>
    await this.getGoalsFavor(club) - await this.getGoalsOwn(club);

  private static getMatchGoals = async (club: Club) => Match.findAll({
    where: { homeTeam: club.id, inProgress: false },
    attributes: ['homeTeamGoals', 'awayTeamGoals'],
  });

  public static getTotalVictories = async (club: Club): Promise<number> => {
    const matchGoals = await this.getMatchGoals(club);

    return matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  };

  public static getLosses = async (club: Club): Promise<number> => {
    const matchGoals = await this.getMatchGoals(club);

    return matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  };

  public static getDraws = async (club: Club): Promise<number> => {
    const matchGoals = await this.getMatchGoals(club);

    return matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  };

  public static getTotalPoints = async (club: Club): Promise<number> =>
    (await this.getTotalVictories(club) * 3) + await this.getDraws(club);

  public static getEfficiency = async (club: Club) =>
    +((await this.getTotalPoints(club)
      / (await this.getTotalGames(club) * 3))
      * 100).toFixed(2);
}
