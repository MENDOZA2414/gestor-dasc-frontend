import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineChartBar,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineClipboardDocumentList,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineIdentification,
  HiOutlineDocumentDuplicate,
} from 'react-icons/hi2';

export const menuByUserType = {
  student: [
    { path: '/userStudent/dashboard', icon: HiOutlineHome, label: 'Inicio' },
    { path: '/userStudent/profile', icon: HiOutlineUser, label: 'Perfil' },
    { path: '/userStudent/practice', icon: HiOutlineChartBar, label: 'Práctica' },
    { path: '/userStudent/documents', icon: HiOutlineDocumentText, label: 'Documentos' },
  ],

  internalAssessor: [
    { path: '/userInternalAssessor/dashboard', icon: HiOutlineHome, label: 'Inicio' },
    { path: '/userInternalAssessor/students', icon: HiOutlineUsers, label: 'Alumnos' },
    { path: '/userInternalAssessor/documents', icon: HiOutlineDocumentText, label: 'Documentos' },
    { path: '/userInternalAssessor/reports', icon: HiOutlineClipboardDocumentList, label: 'Reportes' },
  ],

  externalAssessor: [
    { path: '/userExternalAssessor/dashboard', icon: HiOutlineHome, label: 'Inicio' },
    { path: '/userExternalAssessor/students', icon: HiOutlineUsers, label: 'Alumnos' },
    { path: '/userExternalAssessor/documents', icon: HiOutlineDocumentText, label: 'Documentos' },
  ],

  company: [
    { path: '/userCompany/dashboard', icon: HiOutlineHome, label: 'Inicio' },
    { path: '/userCompany/vacancies', icon: HiOutlineBriefcase, label: 'Vacantes' },
    { path: '/userCompany/students', icon: HiOutlineUsers, label: 'Alumnos' },
  ],

  admin: [
    { path: '/admin/dashboard', icon: HiOutlineHome, label: 'Inicio' },
    { path: '/admin/users', icon: HiOutlineUserGroup, label: 'Usuarios' },
    { path: '/admin/formats', icon: HiOutlineDocumentDuplicate, label: 'Formatos' },
    { path: '/admin/assessors', icon: HiOutlineIdentification, label: 'Asesores' },
    { path: '/admin/reports', icon: HiOutlineClipboardDocumentList, label: 'Reportes' },
  ]
};
