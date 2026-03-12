import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';

const MedicalRecord = sequelize.define('MedicalRecord', {
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
  diagnostico: {
    type: DataTypes.TEXT
  },
  tratamiento: {
    type: DataTypes.TEXT
  },
  notas: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'medical_records',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relaciones
MedicalRecord.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

Patient.hasMany(MedicalRecord, { foreignKey: 'patient_id', as: 'medical_records' });
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctor_id', as: 'medical_records' });

export default MedicalRecord;
