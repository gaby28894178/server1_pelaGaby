import sequelize from '../config/database.js';
import User from './User.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';
import Payment from './Payment.js';
import Appointment from './Appointment.js';
import MedicalRecord from './MedicalRecord.js';
import Analysis from './Analysis.js';

// Sincronizar todos los modelos con la base de datos
export const syncDatabase = async () => {
  try {
    // force: true borra y recrea todas las tablas (CUIDADO: borra datos)
    // alter: true intenta modificar las tablas existentes
    await sequelize.sync({ force: true }); 
    console.log('✅ Modelos sincronizados con la base de datos');
  } catch (error) {
    console.error('❌ Error sincronizando modelos:', error.message);
  }
};

export {
  sequelize,
  User,
  Patient,
  Doctor,
  Payment,
  Appointment,
  MedicalRecord,
  Analysis
};
