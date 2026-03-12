import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  metodo_pago: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  concepto: {
    type: DataTypes.TEXT
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'completado', 'cancelado', 'reembolsado'),
    allowNull: false,
    defaultValue: 'pendiente'
  },
  fecha_pago: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'payments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relación
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });

export default Payment;
