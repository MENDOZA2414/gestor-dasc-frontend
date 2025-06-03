import { useState, useEffect, useRef } from 'react';

import ModalContext from '@shared/ModalContext';
import Modal from "./Modal"
import { Search, Filters } from '@shared/components/filters';
import Carousel from "@shared/components/Carousel"
import JobCard from "@shared/components/cards/JobCard"

const jobData = [
  {
    title: "Administrador de Base de Datos",
    availableSpots: 17,
    description:
      "Se necesita un estudiante capacitado en Arquitectura de Base de Datos con conocimientos en SQL, NoSQL y optimización de consultas.",
    requiredKnowledge:
      "Desarrollador con experiencia en Node.js, Python o Java, bases de datos y arquitecturas de microservicios.",
      modalidad: "Prescencial",
      razonSocial: "PROMATICSOFT",
      RFC: "PROOIWERIEOWE",
      sector: "Sector Privado",
      sitioWeb: "www.fortnite.com",
      beca: "No",
  },
  {
    title: "Desarrollador Frontend",
    availableSpots: 12,
    description:
      "Buscamos desarrollador con experiencia en React, TypeScript y Tailwind CSS para proyectos web modernos.",
    requiredKnowledge:
      "Desarrollador con experiencia en Node.js, Python o Java, bases de datos y arquitecturas de microservicios.",
      modalidad: "Prescencial",
      razonSocial: "PROMATICSOFT",
      RFC: "PROOIWERIEOWE",
      sector: "Sector Privado",
      sitioWeb: "www.fortnite.com",
      beca: "No",
  },
  {
    title: "Analista de Datos",
    availableSpots: 8,
    description:
      "Posición para analista con conocimientos en Python, R y herramientas de visualización de datos como Tableau.",
    requiredKnowledge:
      "Desarrollador con experiencia en Node.js, Python o Java, bases de datos y arquitecturas de microservicios.",
      modalidad: "Prescencial",
      razonSocial: "PROMATICSOFT",
      RFC: "PROOIWERIEOWE",
      sector: "Sector Privado",
      sitioWeb: "www.fortnite.com",
      beca: "No",
  },
  {
    title: "Diseñador UX/UI",
    availableSpots: 5,
    description:
      "Diseñador creativo con experiencia en Figma, Adobe Creative Suite y metodologías de diseño centrado en el usuario.",
    requiredKnowledge:
      "Desarrollador con experiencia en Node.js, Python o Java, bases de datos y arquitecturas de microservicios.",
      modalidad: "Prescencial",
      razonSocial: "PROMATICSOFT",
      RFC: "PROOIWERIEOWE",
      sector: "Sector Privado",
      sitioWeb: "www.fortnite.com",
      beca: "No",
  },
  {
    title: "Ingeniero DevOps",
    availableSpots: 3,
    description: "Especialista en automatización, CI/CD, Docker, Kubernetes y plataformas cloud como AWS o Azure.",
    requiredKnowledge:
      "Desarrollador con experiencia en Node.js, Python o Java, bases de datos y arquitecturas de microservicios.",
      modalidad: "Prescencial",
      razonSocial: "PROMATICSOFT",
      RFC: "PROOIWERIEOWE",
      sector: "Sector Privado",
      sitioWeb: "www.fortnite.com",
      beca: "No",
  },
  {
    title: "Desarrollador Backend",
    availableSpots: 15,
    description:
      "Desarrollador con experiencia en Node.js, Python o Java, bases de datos y arquitecturas de microservicios.",
    requiredKnowledge:
      "Desarrollador con experiencia en Node.js, Python o Java, bases de datos y arquitecturas de microservicios.",
      modalidad: "Prescencial",
      razonSocial: "PROMATICSOFT",
      RFC: "PROOIWERIEOWE",
      sector: "Sector Privado",
      sitioWeb: "www.fortnite.com",
      beca: "No",
  },
]

/**
 * Modal especializado para mostrar información de estudiante.
 *
 * @param {boolean} isOpen
 * @param {function} onClose
 * @param {object} user - Información del usuario: firstName, firstLastName, logo
 * @param {ReactNode} children - Contenido adicional si es necesario
 */
const ModalCarruselVacantes = ({ isOpen, onClose }) => {

  const handleViewDetails = (job) => {
    setModal({
      name: "practiceSlot",
      props: { vacante: job },
    });
  };

  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const [modal, setModal] = useState({ name: null, props: {} });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Vacantes activas de ' + "empresita de prueba"} >
      <ModalContext modal={modal} setModal={setModal} />

      {/* Encabezado de búsqueda y filtros */}
      <div className="flex gap-3 items-center">
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <Filters onFilterChange={setActiveFilters} />
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          <Carousel itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }} gap="gap-3" className="max-w-4xl mx-auto">
            {jobData.map((job, index) => (
              <JobCard
                key={index}
                title={job.title}
                availableSpots={job.availableSpots}
                description={job.description}
                requiredKnowledge={job.requiredKnowledge}
                onViewDetails={() => handleViewDetails(job)}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </Modal>
  )
}

export default ModalCarruselVacantes