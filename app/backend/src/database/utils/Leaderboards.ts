import Match from '../models/Match';
import Club from '../models/Club';
import { ILeaderboard } from '../interfaces';

export default class Leaderboards {
  // ref https://sequelize.org/v5/manual/models-usage.html#-code-count--code----count-the-occurrences-of-elements-in-the-database

  public static getTotalGames = async (club: Club, away?: string): Promise<number> => {
    if (away) return Match.count({ where: { awayTeam: club.id, inProgress: false } });

    return Match.count({ where: { homeTeam: club.id, inProgress: false } });
  };

  public static getGoalsFavor = async (club: Club, away?: string): Promise<number> => {
    if (away) {
      return Match.sum('awayTeamGoals', { where: { awayTeam: club.id, inProgress: false } });
    }

    return Match.sum('homeTeamGoals', { where: { homeTeam: club.id, inProgress: false } });
  };

  public static getGoalsOwn = async (club: Club, away?: string): Promise<number> => {
    if (away) {
      return Match.sum('homeTeamGoals', { where: { awayTeam: club.id, inProgress: false } });
    }

    return Match.sum('awayTeamGoals', { where: { homeTeam: club.id, inProgress: false } });
  };

  public static getGoalsBalance = async (club: Club, away?: string): Promise<number> =>
    await this.getGoalsFavor(club, away) - await this.getGoalsOwn(club, away);

  private static getMatchGoals = async (club: Club, away?: string) => {
    if (away) {
      return Match.findAll({
        where: { awayTeam: club.id, inProgress: false },
        attributes: ['homeTeamGoals', 'awayTeamGoals'],
      });
    }

    return Match.findAll({
      where: { homeTeam: club.id, inProgress: false },
      attributes: ['homeTeamGoals', 'awayTeamGoals'],
    });
  };

  public static getTotalVictories = async (club: Club, away?: string): Promise<number> => {
    const matchGoals = await this.getMatchGoals(club, away);

    if (away) {
      return matchGoals.reduce((acc, match) => {
        if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    }

    return matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  };

  public static getLosses = async (club: Club, away?: string): Promise<number> => {
    const matchGoals = await this.getMatchGoals(club, away);

    if (away) {
      return matchGoals.reduce((acc, match) => {
        if (match.homeTeamGoals > match.awayTeamGoals) return acc + 1;
        return acc;
      }, 0);
    }

    return matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  };

  public static getDraws = async (club: Club, away?: string): Promise<number> => {
    const matchGoals = await this.getMatchGoals(club, away);

    return matchGoals.reduce((acc, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
  };

  public static getTotalPoints = async (club: Club, away?: string): Promise<number> =>
    (await this.getTotalVictories(club, away) * 3) + await this.getDraws(club, away);

  public static getEfficiency = async (club: Club, away?: string) =>
    +((await this.getTotalPoints(club, away)
      / (await this.getTotalGames(club, away) * 3))
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
