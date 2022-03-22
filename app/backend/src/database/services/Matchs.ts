// import { IError, StatusCode } from '../interfaces';
import { IMatch, StatusCode } from '../interfaces';
import Club from '../models/Club';
import Match from '../models/Match';

export default class MatchsService {
  public static async getAll(inProgress: string): Promise<Match[]> {
    let where;

    if (inProgress === 'false') where = { inProgress: false };
    if (inProgress === 'true') where = { inProgress: true };

    return Match.findAll({ include: [
      { model: Club, as: 'homeClub', attributes: ['clubName'] },
      { model: Club, as: 'awayClub', attributes: ['clubName'] },
    ],
    where });
  }

  public static async create(match: IMatch) {
    if (match.awayTeam === match.homeTeam) {
      return {
        code: StatusCode.UNAUTHORIZED,
        message: 'It is not possible to create a match with two equal teams',
      };
    }

    const isNotATeam = await this.checkTeam(match);

    if (isNotATeam) {
      return { code: StatusCode.UNAUTHORIZED, message: 'There is no team with such id!' };
    }

    const { id } = await Match.create(match);

    return { id, ...match };
  }

  public static async finishMatch(id: number): Promise<void> {
    await Match.update({ inProgress: false }, { where: { id } });
  }

  private static async checkTeam({ awayTeam, homeTeam }: IMatch): Promise<boolean> {
    const away = await Club.findByPk(awayTeam);
    const home = await Club.findByPk(homeTeam);

    if (!away || !home) return true;

    return false;
  }

  public static async updateMatch(
    id: number,
    { homeTeamGoals, awayTeamGoals }: IMatch,
  ) {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    const updated = await Match.findByPk(id);
    console.log(updated);
    return updated;
  }
}
