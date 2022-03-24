import { IError, StatusCode } from '../interfaces';
import Club from '../models/Club';

export default class ClubsService {
  public static getAll = async (): Promise<Club[]> => Club.findAll();

  public static getById = async (id: number): Promise<Club | IError> => {
    const club = await Club.findByPk(id);

    if (!club) return { code: StatusCode.NOT_FOUND, message: 'Club not found' };

    return club;
  };
}
