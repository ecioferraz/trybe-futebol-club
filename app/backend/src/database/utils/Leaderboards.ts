import Match from '../models/Match';
import Club from '../models/Club';
import { ILeaderboard } from '../interfaces';

export default class Leaderboards {
  // ref https://sequelize.org/v5/manual/models-usage.html#-code-count--code----count-the-occurrences-of-elements-in-the-database

  public static getTotalGames = async (club: Club, pathTo?: string): Promise<number> => {
    const awayCount = await Match.count({ where: { awayTeam: club.id, inProgress: false } });
    const homeCount = await Match.count({ where: { homeTeam: club.id, inProgress: false } });

    if (pathTo === 'away') return awayCount;
    if (pathTo === 'home') return homeCount;

    return awayCount + homeCount;
  };

  public static getGoalsFavor = async (club: Club, pathTo?: string): Promise<number> => {
    const awayFavorGoals = await Match.sum('awayTeamGoals', {
      where: { awayTeam: club.id, inProgress: false },
    });
    const homeFavorGoals = await Match.sum('homeTeamGoals', {
      where: { homeTeam: club.id, inProgress: false },
    });

    if (pathTo === 'away') return awayFavorGoals;
    if (pathTo === 'home') return homeFavorGoals;

    return awayFavorGoals + homeFavorGoals;
  };

  public static getGoalsOwn = async (club: Club, pathTo?: string): Promise<number> => {
    const awayOwnGoals = await Match.sum('homeTeamGoals', {
      where: { awayTeam: club.id, inProgress: false },
    });
    const homeOwnGoals = await Match.sum('awayTeamGoals', {
      where: { homeTeam: club.id, inProgress: false },
    });

    if (pathTo === 'away') return awayOwnGoals;
    if (pathTo === 'home') return homeOwnGoals;

    return awayOwnGoals + homeOwnGoals;
  };

  public static getGoalsBalance = async (club: Club, pathTo?: string): Promise<number> =>
    await this.getGoalsFavor(club, pathTo) - await this.getGoalsOwn(club, pathTo);

  private static getMatchGoals = async (club: Club, pathTo?: string) => {
    const awayMatchGoals = await Match.findAll({
      where: { awayTeam: club.id, inProgress: false },
      attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });

    const homeMatchGoals = await Match.findAll({
      where: { homeTeam: club.id, inProgress: false },
      attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });

    if (pathTo === 'away') return awayMatchGoals;
    if (pathTo === 'home') return homeMatchGoals;

    return [...awayMatchGoals, ...homeMatchGoals];
  };

  public static getTotalVictories = async (club: Club, pathTo?: string): Promise<number> => {
    const matchGoals = await this.getMatchGoals(club, pathTo);

    const awayVictories = matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);

    const homeVictories = matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);

    if (pathTo === 'away') return awayVictories;
    if (pathTo === 'home') return homeVictories;
    console.log('awayVictories', awayVictories);

    return awayVictories + homeVictories;
  };

  public static getLosses = async (club: Club, pathTo?: string): Promise<number> => {
    const matchGoals = await this.getMatchGoals(club, pathTo);

    const awayLosses = matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);

    const homeLosses = matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);

    if (pathTo === 'away') return awayLosses;
    if (pathTo === 'home') return homeLosses;

    return awayLosses + homeLosses;
  };

  public static getDraws = async (club: Club, pathTo?: string): Promise<number> => {
    const matchGoals = await this.getMatchGoals(club, pathTo);

    return matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  };

  public static getTotalPoints = async (club: Club, pathTo?: string): Promise<number> =>
    (await this.getTotalVictories(club, pathTo) * 3) + await this.getDraws(club, pathTo);

  public static getEfficiency = async (club: Club, pathTo?: string) =>
    +((await this.getTotalPoints(club, pathTo)
      / (await this.getTotalGames(club, pathTo) * 3))
      * 100).toFixed(2);

  public static sortLeaderboard = (leaderboard: ILeaderboard[]): ILeaderboard[] =>
    leaderboard.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      return 0;
    });
}