import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';

const Analysis = sequelize.define('Analysis', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  patient_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'patients',
      key: 'id'
    }
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'doctors',
      key: 'id'
    }
  },
  tipo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  resultado: {
    type: DataTypes.TEXT
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  archivo_url: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'analysis',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relaciones
Analysis.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });
Analysis.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

Patient.hasMany(Analysis, { foreignKey: 'patient_id', as: 'analysis' });
Doctor.hasMany(Analysis, { foreignKey: 'doctor_id', as: 'analysis' });

export default Analysis;
