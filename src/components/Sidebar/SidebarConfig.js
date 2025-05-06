import {
    FaHome,
    FaUser,
    FaBuilding,
    FaFileAlt,
    FaChalkboardTeacher,
    FaChartLine,
    FaClipboardList,
    FaUsers,
  } from 'react-icons/fa';
  
  export const menuByUserType = {
    student: [
      { path: '/userStudent/dashboard', icon: FaHome, label: 'Inicio' },
      { path: '/userStudent/profile', icon: FaUser, label: 'Perfil' },
      { path: '/userStudent/practice', icon: FaChartLine, label: 'Práctica' },
      { path: '/userStudent/documents', icon: FaFileAlt, label: 'Documentos' },
    ],
  
    internalAssessor: [
      { path: '/userInternalAssessor/dashboard', icon: FaHome, label: 'Inicio' },
      { path: '/userInternalAssessor/students', icon: FaUsers, label: 'Alumnos' },
      { path: '/userInternalAssessor/documents', icon: FaFileAlt, label: 'Documentos' },
      { path: '/userInternalAssessor/reports', icon: FaClipboardList, label: 'Reportes' },
    ],
  
    externalAssessor: [
      { path: '/userExternalAssessor/dashboard', icon: FaHome, label: 'Inicio' },
      { path: '/userExternalAssessor/students', icon: FaUsers, label: 'Alumnos' },
      { path: '/userExternalAssessor/documents', icon: FaFileAlt, label: 'Documentos' },
    ],
  
    company: [
      { path: '/userCompany/dashboard', icon: FaHome, label: 'Inicio' },
      { path: '/userCompany/vacancies', icon: FaBuilding, label: 'Vacantes' },
      { path: '/userCompany/students', icon: FaUsers, label: 'Alumnos' },
    ],
  
    admin: [
      { path: '/admin/dashboard', icon: FaHome, label: 'Inicio' },
      { path: '/admin/users', icon: FaUsers, label: 'Usuarios' },
      { path: '/admin/formats', icon: FaFileAlt, label: 'Formatos' },
      { path: '/admin/assessors', icon: FaChalkboardTeacher, label: 'Asesores' },
      { path: '/admin/reports', icon: FaClipboardList, label: 'Reportes' },
    ]
  };
  