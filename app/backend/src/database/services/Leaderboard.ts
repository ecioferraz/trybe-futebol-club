import { ILeaderboard } from '../interfaces';
import Club from '../models/Club';
import Leaderboards from '../utils/Leaderboards';

export default class LeaderboardService {
  public static getAll = async (pathTo?: string): Promise<ILeaderboard[]> => {
    const clubs = await Club.findAll();

    const leaderboard = await Promise.all(clubs.map(async (club) => ({
      name: club.clubName,
      totalPoints: await Leaderboards.getTotalPoints(club, pathTo),
      totalGames: await Leaderboards.getTotalGames(club, pathTo),
      totalVictories: await Leaderboards.getTotalVictories(club, pathTo),
      totalDraws: await Leaderboards.getDraws(club, pathTo),
      totalLosses: await Leaderboards.getLosses(club, pathTo),
      goalsFavor: await Leaderboards.getGoalsFavor(club, pathTo),
      goalsOwn: await Leaderboards.getGoalsOwn(club, pathTo),
      goalsBalance: await Leaderboards.getGoalsBalance(club, pathTo),
      efficiency: await Leaderboards.getEfficiency(club, pathTo),
    })));

    return Leaderboards.sortLeaderboard(leaderboard);
  };
}
