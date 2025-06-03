const express = require('express');
const router = express.Router();

const professionalPracticeController = require('../controllers/ProfessionalPracticeController');
const authMiddleware = require('../middlewares/AuthMiddleware');
const checkRole = require('../middlewares/CheckRole');
const checkUserType = require('../middlewares/CheckUserType');
const checkUserTypeOrRole = require('../middlewares/CheckUserTypeOrRole');

// ──────── Rutas protegidas (GET) ────────

// Obtener todas las prácticas profesionales (uso administrativo con filtros opcionales)
router.get(
  '/',
  authMiddleware,
  checkRole(['Admin', 'SuperAdmin']),
  professionalPracticeController.getAllPractices
);

// Obtener la práctica profesional del alumno autenticado
router.get(
  '/me',
  authMiddleware,
  checkUserType(['student']),
  professionalPracticeController.getPracticeByLoggedStudent
);

// Obtener el progreso de la práctica del alumno autenticado
router.get(
  '/progress/me',
  authMiddleware,
  checkUserType(['student']),
  professionalPracticeController.getMyPracticeProgress
);

// Obtener el progreso de la práctica de un alumno específico
router.get(
  '/progress/student/:studentID',
  authMiddleware,
  checkUserTypeOrRole(
    ['student', 'internalAssessor', 'externalAssessor', 'company'],
    ['Admin', 'SuperAdmin']
  ),
  professionalPracticeController.getPracticeProgress
);

// Obtener la práctica profesional registrada de un alumno (por Admin o Asesor Interno)
router.get(
  '/student/:studentID',
  authMiddleware,
  checkUserTypeOrRole(['internalAssessor'], ['Admin', 'SuperAdmin']),
  professionalPracticeController.getPracticeByStudentID
);

// Obtener prácticas registradas por una empresa (Admin o Empresa autenticada)
router.get(
  '/company/:companyID',
  authMiddleware,
  checkUserTypeOrRole(['company'], ['Admin', 'SuperAdmin']),
  professionalPracticeController.getPracticesByCompanyID
);

// Obtener estudiantes haciendo prácticas en una empresa específica
router.get(
  '/students/company/:companyID',
  authMiddleware,
  checkUserTypeOrRole(['company'], ['Admin', 'SuperAdmin']),
  professionalPracticeController.getStudentsByCompanyID
);

// Obtener prácticas asignadas a un asesor interno
router.get(
  '/internal-assessor/:internalAssessorID',
  authMiddleware,
  checkUserTypeOrRole(['internalAssessor'], ['Admin', 'SuperAdmin']),
  professionalPracticeController.getPracticesByInternalAssessorID
);

// Obtener una práctica específica de un alumno asignado a un asesor interno
router.get(
  '/internal-assessor/:internalAssessorID/student/:studentID',
  authMiddleware,
  checkUserTypeOrRole(['internalAssessor'], ['Admin', 'SuperAdmin']),
  professionalPracticeController.getStudentPracticeByAssessor
);

// Obtener prácticas asignadas a un asesor externo
router.get(
  '/external-assessor/:externalAssessorID',
  authMiddleware,
  checkUserTypeOrRole(['externalAssessor', 'company'], ['Admin', 'SuperAdmin']),
  professionalPracticeController.getPracticesByExternalAssessorID
);

// Obtener todos los estudiantes asignados a un asesor externo
router.get(
  '/students/external-assessor/:externalAssessorID',
  authMiddleware,
  checkUserTypeOrRole(['externalAssessor', 'company'], ['Admin', 'SuperAdmin']),
  professionalPracticeController.getStudentsByExternalAssessorID
);

// Obtener top 5 empresas más solicitadas por alumnos (para dashboard)
router.get(
  '/stats/top-companies',
  authMiddleware,
  checkRole(['Admin', 'SuperAdmin']),
  professionalPracticeController.getTopCompaniesStats
);

// ──────── Rutas protegidas (PATCH) ────────

// Actualizar datos generales de una práctica
router.patch(
  '/:practiceID',
  authMiddleware,
  checkRole(['Admin', 'SuperAdmin']),
  professionalPracticeController.patchPractice
);

// Actualizar estatus de una práctica (Aceptada, Rechazada, Pendiente)
router.patch(
  '/:practiceID/status',
  authMiddleware,
  checkUserTypeOrRole(['internalAssessor'], ['Admin', 'SuperAdmin']),
  professionalPracticeController.updatePracticeStatus
);

// Actualizar progreso de una práctica profesional
router.patch(
  '/:practiceID/progress',
  authMiddleware,
  checkUserTypeOrRole(['internalAssessor'], ['Admin', 'SuperAdmin']),
  professionalPracticeController.updatePracticeProgress
);

// ──────── Rutas protegidas (DELETE) ────────

// Eliminación lógica de una práctica profesional
router.delete(
  '/:practiceID',
  authMiddleware,
  checkRole(['SuperAdmin']),
  professionalPracticeController.deletePractice
);

module.exports = router;
