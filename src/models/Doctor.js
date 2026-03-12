import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'doctors',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relación
Doctor.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(Doctor, { foreignKey: 'user_id', as: 'doctor' });

export default Doctor;
