import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, Patient, Doctor, Payment, Appointment, MedicalRecord, Analysis } from '../models/index.js';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_llave_super_secreta';

// REGISTRO DE PACIENTE (POST /)
export const register = async (req, res) => {
  const { nombre, apellido, email, password, telefono, edad } = req.body;
  
  try {
    // Verificar si el email ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear usuario
    const user = await User.create({
      email,
      password: hashedPassword,
      role: 'paciente'
    });

    // Crear perfil de paciente
    const patient = await Patient.create({
      user_id: user.id,
      nombre,
      apellido,
      telefono,
      edad
    });

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        patient: {
          id: patient.id,
          nombre: patient.nombre,
          apellido: patient.apellido
        }
      }
    });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// LOGIN (POST /login)
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Buscar usuario con su perfil (paciente o doctor)
    const user = await User.findOne({ 
      where: { email },
      include: [
        { model: Patient, as: 'patient' },
        { model: Doctor, as: 'doctor' }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar Token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      SECRET_KEY, 
      { expiresIn: '1d' }
    );

    res.json({ 
      token, 
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        patient: user.patient,
        doctor: user.doctor
      }
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// GET ALL USERS (GET /)
export const getAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'role', 'created_at'],
      include: [
        { model: Patient, as: 'patient', attributes: ['id', 'nombre', 'apellido'] },
        { model: Doctor, as: 'doctor', attributes: ['id', 'nombre', 'apellido', 'especialidad'] }
      ]
    });
    
    res.json(users);
  } catch (err) {
    console.error('Error obteniendo usuarios:', err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// GET PERFIL COMPLETO (GET /profile)
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Del JWT

    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'role', 'created_at'],
      include: [
        { 
          model: Patient, 
          as: 'patient',
          include: [
            { model: Appointment, as: 'appointments', limit: 10, order: [['fecha_hora', 'DESC']] },
            { model: MedicalRecord, as: 'medical_records', limit: 10, order: [['created_at', 'DESC']] },
            { model: Analysis, as: 'analysis', limit: 10, order: [['fecha', 'DESC']] }
          ]
        },
        { 
          model: Doctor, 
          as: 'doctor',
          include: [
            { model: Appointment, as: 'appointments', limit: 10, order: [['fecha_hora', 'DESC']] }
          ]
        },
        { model: Payment, as: 'payments', limit: 10, order: [['created_at', 'DESC']] }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error obteniendo perfil:', err);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};
