

// midelware  de proteccion 
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // Simulación: Si mandas un header "Authorization: ok", te deja pasar
  if (authHeader === 'ok') {
    req.user = { id: 1, nombre: "Admin Simulado" }; // Datos ficticios
    next();
  } else {
    res.status(401).json({ error: "No autorizado. Envía Authorization: ok" });
  }
};