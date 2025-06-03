// src/config/filterSchema.js

const filterSchema = {
  students: {
    Carrera: {
      type: "multi",
      options: ["LATI", "IDS", "ITC", "LITI", "IC"],
    },
    Semestre: {
      type: "multi",
      options: ["7mo", "8vo", "9no"],
    },
    Turno: {
      type: "multi",
      options: ["TM", "TV"],
    },
    Asesor: {
      type: "multi-step",
      steps: {
        typeOptions: ["Interno", "Externo"],
        Interno: {
          searchable: true,
          options: [
            "Dr. Italia Estrada C.",
            "MT. Alejandro Leyva",
            "MT. Roberto Sánchez",
            "MT. Carmen Vázquez",
          ],
        },
        Externo: {
          searchable: true,
          options: [
            "Ing. Luis Ramírez",
            "Lic. María Gómez",
            "Dr. Jorge Mendoza",
          ],
        },
      },
    },
    Matrícula: {
      type: "searchOnly",
    },
  },

  assessors: {
    Tipo: {
      type: "multi",
      options: ["Interno", "Externo"],
    },
  },

  entities: {
    Vacantes: {
      type: "number",
    },
    Alumnos: {
      type: "number",
    },
  },

  reports: {
    Usuario: {
      type: "switch",
      options: ["Alumnos", "Asesores", "Entidades"],
    },
    alumnos: {
      Carrera: { type: "multi", options: ["LATI", "IDS", "ITC", "LITI", "IC"] },
      Semestre: { type: "multi", options: ["7mo", "8vo", "9no"] },
      Turno: { type: "multi", options: ["TM", "TV"] },
      Asesor: {
        type: "multi-step",
        steps: {
          typeOptions: ["Interno", "Externo"],
          Interno: {
            searchable: true,
            options: [
              "Dr. Italia Estrada C.",
              "MT. Alejandro Leyva",
              "MT. Roberto Sánchez",
              "MT. Carmen Vázquez",
            ],
          },
          Externo: {
            searchable: true,
            options: [
              "Ing. Luis Ramírez",
              "Lic. María Gómez",
              "Dr. Jorge Mendoza",
            ],
          },
        },
      },
      Matrícula: { type: "searchOnly" },
    },
    asesores: {
      Tipo: { type: "multi", options: ["Interno", "Externo"] },
    },
    entidades: {
      Vacantes: { type: "number" },
      Alumnos: { type: "number" },
    },
    auditoria: {
      Rol: {
        type: "multi",
        options: ["A. Interno", "A. Externo", "Alumno"],
      },
      Acción: {
        type: "multi",
        options: ["Aceptado", "Rechazado", "Subido"],
      },
      Fecha: {
        type: "date",
      },
    },
    reportes: {
      Fecha: { type: "date" },
    },
  },

  modals: {
    documentosAlumno: {
      Estado: {
        type: "multi",
        options: ["Pendiente", "Aceptado", "Rechazado"],
      },
      Fecha: {
        type: "date",
      },
    },
    alumnosAsesor: {
      Carrera: { type: "multi", options: ["LATI", "IDS", "ITC", "LITI", "IC"] },
      Semestre: { type: "multi", options: ["7mo", "8vo", "9no"] },
      Turno: { type: "multi", options: ["TM", "TV"] },
      Matrícula: { type: "searchOnly" },
    },
    asignarAlumno: {
      Carrera: { type: "multi", options: ["LATI", "IDS", "ITC", "LITI", "IC"] },
      Semestre: { type: "multi", options: ["7mo", "8vo", "9no"] },
      Turno: { type: "multi", options: ["TM", "TV"] },
      Matrícula: { type: "searchOnly" },
    },
    alumnosEntidad: {
      Carrera: { type: "multi", options: ["LATI", "IDS", "ITC", "LITI", "IC"] },
      Semestre: { type: "multi", options: ["7mo", "8vo", "9no"] },
      Turno: { type: "multi", options: ["TM", "TV"] },
      Matrícula: { type: "searchOnly" },
    },
    vacantesEntidad: {
      Cupos: { type: "number" },
    },
  },
};

export default filterSchema;
