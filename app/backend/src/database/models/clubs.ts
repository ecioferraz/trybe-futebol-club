import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class Club extends Model {
  constructor(private _clubName: string) {
    super();
  }

  public get clubName(): string {
    return this._clubName;
  }

  public set clubName(value: string) {
    this._clubName = value;
  }
}

Club.init({
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
});
