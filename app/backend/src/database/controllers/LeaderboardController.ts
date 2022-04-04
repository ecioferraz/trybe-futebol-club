import { Request, Response, NextFunction } from 'express';
import { StatusCode } from '../interfaces';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    const { path } = req;
    const awayOrHome: boolean = ['away', 'home'].includes(path.slice(-4));
    const pathTo = (awayOrHome && path.slice(-4) === 'away') ? 'away' : 'home';

    try {
      const leaderboard = awayOrHome ? await LeaderboardService.getAll(pathTo)
        : await LeaderboardService.getAll();

      return res.status(StatusCode.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  }
}
