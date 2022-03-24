import { ILeaderboard } from '../interfaces';
import Club from '../models/Club';
import Leaderboards from '../utils/Leaderboards';

export default class LeaderboardService {
  public static getAll = async (away?: string): Promise<ILeaderboard[]> => {
    const clubs = await Club.findAll();

    const leaderboard = await Promise.all(clubs.map(async (club) => ({
      name: club.clubName,
      totalPoints: await Leaderboards.getTotalPoints(club, away),
      totalGames: await Leaderboards.getTotalGames(club, away),
      totalVictories: await Leaderboards.getTotalVictories(club, away),
      totalDraws: await Leaderboards.getDraws(club, away),
      totalLosses: await Leaderboards.getLosses(club, away),
      goalsFavor: await Leaderboards.getGoalsFavor(club, away),
      goalsOwn: await Leaderboards.getGoalsOwn(club, away),
      goalsBalance: await Leaderboards.getGoalsBalance(club, away),
      efficiency: await Leaderboards.getEfficiency(club, away),
    })));

    return Leaderboards.sortLeaderboard(leaderboard);
  };
}
