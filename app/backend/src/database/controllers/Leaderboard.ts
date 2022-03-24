import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../interfaces';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  public static getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { path } = req;
    const away: boolean = path.slice(-4) === 'away';
    try {
      const leaderboard = away ? await LeaderboardService.getAll('away')
        : await LeaderboardService.getAll();

      return res.status(StatusCode.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };
}
