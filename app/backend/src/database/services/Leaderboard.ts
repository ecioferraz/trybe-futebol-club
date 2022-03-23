import { ILeaderboard } from '../interfaces';
import Club from '../models/Club';
import Leaderboards from '../utils/Leaderboards';

export default class LeaderboardService {
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

    return Leaderboards.sortLeaderboard(leaderboard);
  };
}
