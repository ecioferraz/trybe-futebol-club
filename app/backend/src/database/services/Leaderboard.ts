import { ILeaderboard } from '../interfaces';
import Club from '../models/Club';
import Leaderboards from '../utils/Leaderboards';

export default class LeaderboardService {
  private static sortLeaderboard = (leaderboard: ILeaderboard[]): ILeaderboard[] =>
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

  public static getAll = async (): Promise<ILeaderboard[]> => {
    const clubs = await Club.findAll();

    const leaderboard = await Promise.all(clubs.map(async (club) => ({
      name: club.clubName,
      totalPoints: await Leaderboards.getTotalPoints(club),
      totalGames: await Leaderboards.getTotalGames(club),
      totalVictories: await Leaderboards.getTotalVictories(club),
      totalDraws: await Leaderboards.getDraws(club),
      totalLosses: await Leaderboards.getLosses(club),
      goalsFavor: await Leaderboards.getGoalsFavor(club),
      goalsOwn: await Leaderboards.getGoalsOwn(club),
      goalsBalance: await Leaderboards.getGoalsBalance(club),
      efficiency: await Leaderboards.getEfficiency(club),
    })));

    return this.sortLeaderboard(leaderboard);
  };
}
