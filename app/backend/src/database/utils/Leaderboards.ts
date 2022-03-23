import Match from '../models/Match';
import Club from '../models/Club';

export default class Leaderboards {
  public static getTotalGames = async (club: Club): Promise<number> =>
    Match.count({ where: { homeTeam: club.id, inProgress: false } });

  public static getGoalsFavor = async (club: Club): Promise<number> =>
    Match.sum('homeTeamGoals', { where: { homeTeam: club.id, inProgress: false } });

  public static getGoalsOwn = async (club: Club): Promise<number> =>
    Match.sum('awayTeamGoals', { where: { homeTeam: club.id, inProgress: false } });

  public static getGoalsBalance = async (club: Club): Promise<number> =>
    await this.getGoalsFavor(club) - await this.getGoalsOwn(club);

  // public static getVictories = async (club: Club): Promise<number> => {
  //   const goalsFavor = this.getGoalsFavor(club);
  //   const goalsOwn = this.getGoalsOwn(club);
  // }

  // public static getEfficiency = async (club: Club) =>
}
