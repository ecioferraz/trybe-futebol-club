// import { IError, StatusCode } from '../interfaces';
import { IError, IMatch, StatusCode } from '../interfaces';
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

  public static async create(match: IMatch): Promise<IMatch | IError> {
    console.log(match.awayTeam, match.homeTeam);
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

    const createdMatch = await Match.create(match);

    return createdMatch;
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

  // public static async getById(id: number): Promise<Club | IError> {
  //   const club = await Club.findByPk(id);

  //   if (!club) return { code: StatusCode.NOT_FOUND, message: 'Club not found' };

  //   return club;
  // }
}
