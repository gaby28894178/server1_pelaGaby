import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Patient = sequelize.define('Patient', {
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
  telefono: {
    type: DataTypes.STRING(20)
  },
  edad: {
    type: DataTypes.INTEGER
  },
  peso: {
    type: DataTypes.DECIMAL(5, 2)
  },
  altura: {
    type: DataTypes.DECIMAL(3, 2)
  }
}, {
  tableName: 'patients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relación
Patient.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(Patient, { foreignKey: 'user_id', as: 'patient' });

export default Patient;
