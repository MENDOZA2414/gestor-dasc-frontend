const express = require('express');
const router = express.Router();

const uploadProfile = require('../middlewares/ProfileUpload');
const authMiddleware = require('../middlewares/AuthMiddleware');
const checkRole = require('../middlewares/CheckRole');
const checkOwnershipOrAdmin = require('../middlewares/CheckOwnershipOrAdmin');
const { getUserOwnerID } = require('../utils/ownershipResolvers');
const loginLimiter = require('../middlewares/LoginLimiter');
const { uploadProfilePhoto } = require('../controllers/ProfileController');

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  getUserByIDController,
  patchUserController,
  patchUserStatusController,
  patchUserActivationStatusController,
  changePasswordController,
  requestPasswordResetController,
  resetPasswordController,
  deleteUserController,
  getUserProfileAndRoles,
  patchOwnPhoneController,

} = require('../controllers/UserController');

// ──────── Rutas públicas ────────

// Registro de usuario
router.post('/register', registerUserController);

// Iniciar sesión (limite de intentos)
router.post('/login', loginLimiter, (req, res, next) => {
  req.remainingAttempts = req.loginTracking?.remaining;
  req.retryAfter = req.loginTracking?.retryAfter;
  next();
}, loginUserController);

// Restablecimiento de contraseña
router.post('/request-password-reset', requestPasswordResetController);
router.post('/reset-password', resetPasswordController);

// ──────── Rutas protegidas ────────

// Validación de token
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Token válido', user: req.user });
});

// Obtener perfil autenticado
router.get('/me', authMiddleware, getUserProfileAndRoles);

// Subir foto de perfil
router.patch('/me/photo', authMiddleware, uploadProfile, uploadProfilePhoto);

// Ruta para que Admin/SuperAdmin actualicen la foto de otro usuario
router.patch('/:userID/photo', authMiddleware, checkRole(['Admin', 'SuperAdmin']), uploadProfile, uploadProfilePhoto);

// Cerrar sesión
router.post('/logout', authMiddleware, logoutUserController);

// Cambiar contraseña propia
router.patch('/change-password', authMiddleware, changePasswordController);

// Obtener usuario por ID
router.get('/:userID', authMiddleware, checkRole(['Admin', 'SuperAdmin']), getUserByIDController);

// Actualizar parcialmente (correo o teléfono)
router.patch('/:userID', authMiddleware, checkOwnershipOrAdmin(getUserOwnerID), patchUserController);

// Cambiar estatus de usuario (solo SuperAdmin) Reactiva un usuario eliminado
router.patch('/:userID/status', authMiddleware, checkRole(['SuperAdmin']), patchUserStatusController);

// Activar o desactivar usuario (Admin y SuperAdmin) 
router.patch('/:userID/activation', authMiddleware, checkRole(['Admin', 'SuperAdmin']), patchUserActivationStatusController);

// Eliminar lógicamente
router.delete('/:userID', authMiddleware, checkRole(['SuperAdmin']), deleteUserController);

// Editar el teléfono del propio usuario
router.patch('/me/phone', authMiddleware, patchOwnPhoneController);

module.exports = router;
