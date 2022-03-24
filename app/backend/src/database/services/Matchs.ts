import { IMatch, StatusCode } from '../interfaces';
import Club from '../models/Club';
import Match from '../models/Match';

export default class MatchsService {
  public static getAll = async (inProgress: string): Promise<Match[]> => {
    let where;

    if (inProgress === 'false') where = { inProgress: false };
    if (inProgress === 'true') where = { inProgress: true };

    return Match.findAll({ include: [
      { model: Club, as: 'homeClub', attributes: ['clubName'] },
      { model: Club, as: 'awayClub', attributes: ['clubName'] },
    ],
    where });
  };

  public static create = async (match: IMatch) => {
    const isNotATeam = await this.checkTeam(match);

    if (isNotATeam) {
      return { code: StatusCode.UNAUTHORIZED, message: 'There is no team with such id!' };
    }

    const { id } = await Match.create(match);

    return { id, ...match };
  };

  public static finishMatch = async (id: number): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  private static checkTeam = async ({ awayTeam, homeTeam }: IMatch): Promise<boolean> => {
    const away = await Club.findByPk(awayTeam);
    const home = await Club.findByPk(homeTeam);

    if (!away || !home) return true;

    return false;
  };

  public static updateMatch = async (
    id: number,
    { homeTeamGoals, awayTeamGoals }: IMatch,
  ) => {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    const updated = await Match.findByPk(id);

    return updated;
  };
}
