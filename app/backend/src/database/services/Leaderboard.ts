import { ILeaderboard } from '../interfaces';
import Club from '../models/Club';
import Leaderboards from '../utils/Leaderboards';

export default class LeaderboardService {
  public static getAll = async (): Promise<ILeaderboard[]> => {
    const clubs = await Club.findAll();

    const leaderboards = await Promise.all(clubs.map(async (club) => ({
      name: club.clubName,
      totalPoints: 0,
      totalGames: await Leaderboards.getTotalGames(club),
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: await Leaderboards.getGoalsFavor(club),
      goalsOwn: await Leaderboards.getGoalsOwn(club),
      goalsBalance: await Leaderboards.getGoalsBalance(club),
      efficiency: 0,
    })));

    return leaderboards;
  };
}
