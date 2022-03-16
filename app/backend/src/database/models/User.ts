import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  public username!: string;

  public role!: string;

  public email!: string;

  public password!: string;
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});
