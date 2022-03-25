import Match from '../models/Match';
import Club from '../models/Club';
import { ILeaderboard } from '../interfaces';

export default class Leaderboards {
  // ref https://sequelize.org/v5/manual/models-usage.html#-code-count--code----count-the-occurrences-of-elements-in-the-database

  public static async getTotalGames(club: Club, pathTo?: string): Promise<number> {
    const awayCount = await Match.count({ where: { awayTeam: club.id, inProgress: false } });
    const homeCount = await Match.count({ where: { homeTeam: club.id, inProgress: false } });

    if (pathTo === 'away') return awayCount;
    if (pathTo === 'home') return homeCount;

    return awayCount + homeCount;
  }

  public static async getGoalsFavor(club: Club, pathTo?: string): Promise<number> {
    const awayFavorGoals = await Match.sum('awayTeamGoals', {
      where: { awayTeam: club.id, inProgress: false },
    });
    const homeFavorGoals = await Match.sum('homeTeamGoals', {
      where: { homeTeam: club.id, inProgress: false },
    });

    if (pathTo === 'away') return awayFavorGoals;
    if (pathTo === 'home') return homeFavorGoals;

    return awayFavorGoals + homeFavorGoals;
  }

  public static async getGoalsOwn(club: Club, pathTo?: string): Promise<number> {
    const awayOwnGoals = await Match.sum('homeTeamGoals', {
      where: { awayTeam: club.id, inProgress: false },
    });
    const homeOwnGoals = await Match.sum('awayTeamGoals', {
      where: { homeTeam: club.id, inProgress: false },
    });

    if (pathTo === 'away') return awayOwnGoals;
    if (pathTo === 'home') return homeOwnGoals;

    return awayOwnGoals + homeOwnGoals;
  }

  public static async getGoalsBalance(club: Club, pathTo?: string): Promise<number> {
    return await this.getGoalsFavor(club, pathTo) - await this.getGoalsOwn(club, pathTo);
  }

  private static async getAwayMatchGoals(club: Club): Promise<Match[]> {
    return Match.findAll({
      where: { awayTeam: club.id, inProgress: false },
      attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
  }

  private static async getHomeMatchGoals(club: Club): Promise<Match[]> {
    return Match.findAll({
      where: { homeTeam: club.id, inProgress: false },
      attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
  }

  private static async getAwayVictories(club: Club): Promise<number> {
    const awayMatchGoals = await this.getAwayMatchGoals(club);

    return awayMatchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  private static async getHomeVictories(club: Club): Promise<number> {
    const homeMatchGoals = await this.getHomeMatchGoals(club);

    return homeMatchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  public static async getVictories(club: Club, pathTo?: string): Promise<number> {
    if (pathTo === 'away') return this.getAwayVictories(club);
    if (pathTo === 'home') return this.getHomeVictories(club);

    return (await this.getAwayVictories(club) + await this.getHomeVictories(club));
  }

  private static async getAwayLosses(club: Club): Promise<number> {
    const awayMatchGoals = await this.getAwayMatchGoals(club);

    return awayMatchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  private static async getHomeLosses(club: Club): Promise<number> {
    const homeMatchGoals = await this.getHomeMatchGoals(club);

    return homeMatchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  public static async getLosses(club: Club, pathTo?: string): Promise<number> {
    if (pathTo === 'away') return this.getAwayLosses(club);
    if (pathTo === 'home') return this.getHomeLosses(club);

    return (await this.getAwayLosses(club) + await this.getHomeLosses(club));
  }

  private static async getAwayDraws(club: Club): Promise<number> {
    const awayMatchGoals = await this.getAwayMatchGoals(club);

    return awayMatchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  private static async getHomeDraws(club: Club): Promise<number> {
    const homeMatchGoals = await this.getHomeMatchGoals(club);

    return homeMatchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  }

  public static async getDraws(club: Club, pathTo?: string): Promise<number> {
    if (pathTo === 'away') return this.getAwayDraws(club);
    if (pathTo === 'home') return this.getHomeDraws(club);

    return (await this.getAwayDraws(club) + await this.getHomeDraws(club));
  }

  public static async getTotalPoints(club: Club, pathTo?: string): Promise<number> {
    return (await this.getVictories(club, pathTo) * 3) + await this.getDraws(club, pathTo);
  }

  public static async getEfficiency(club: Club, pathTo?: string): Promise<number> {
    return +((await this.getTotalPoints(club, pathTo)
      / (await this.getTotalGames(club, pathTo) * 3))
      * 100).toFixed(2);
  }

  public static sortLeaderboard(leaderboard: ILeaderboard[]): ILeaderboard[] {
    return leaderboard.sort((a, b) => {
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
}
