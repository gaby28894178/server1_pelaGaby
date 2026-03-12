import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';

const Appointment = sequelize.define('Appointment', {
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
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  motivo: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.ENUM('programada', 'confirmada', 'completada', 'cancelada', 'no_asistio'),
    allowNull: false,
    defaultValue: 'programada'
  },
  notas: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'appointments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relaciones
Appointment.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctor_id', as: 'doctor' });

Patient.hasMany(Appointment, { foreignKey: 'patient_id', as: 'appointments' });
Doctor.hasMany(Appointment, { foreignKey: 'doctor_id', as: 'appointments' });

export default Appointment;
