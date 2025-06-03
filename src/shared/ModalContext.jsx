import React from 'react';

import ModalEstudiante from '@shared/components/modals/ModalEstudiante';
import ModalArchivosEstudiante from '@shared/components/modals/ModalArchivosEstudiante';
import ModalPracticaEstudiante from '@shared/components/modals/ModalPracticaEstudiante';
import ModalEditarEstudiante from '@shared/components/modals/ModalEditarEstudiante';

import ModalEstudiantesAsignadosA from '@shared/components/modals/ModalEstudiantesAsignadosA';
import ModalAsesor from '@shared/components/modals/ModalAsesor';

import ModalEstudiantesEnVacante from '@shared/components/modals/ModalEstudiantesEnVacante';

import ModalCarruselVacantes from '@shared/components/modals/ModalCarruselVacantes';
import ModalVacante from '@shared/components/modals/ModalVacante';

const ModalContext = ({ modal, setModal }) => {
    switch (modal.name) {
        case 'student':
            return (
                <ModalEstudiante
                    isOpen={true}
                    onClose={() => setModal({ name: null, props: {} })}
                    {...modal.props}
                />
            );
        case 'studentEdit':
            return (
                <ModalEditarEstudiante
                    isOpen={true}
                    onClose={() => setModal({ name: null, props: {} })}
                    {...modal.props}
                />
            );
        case 'studentFiles':
            return (
                <ModalArchivosEstudiante
                    isOpen={true}
                    onClose={() => setModal({ name: null, props: {} })}
                    {...modal.props}
                />
            );
        case 'studentPractice':
            return (
                <ModalPracticaEstudiante
                    isOpen={true}
                    onClose={() => setModal({ name: null, props: {} })}
                    {...modal.props}
                />
            );
        case 'assignedStudents':
            return (
                <ModalEstudiantesAsignadosA
                    isOpen={true}
                    onClose={() => setModal({ name: null, props: {} })}
                    {...modal.props}
                />
            );
        case 'studentsInPractice':
            return (
                <ModalEstudiantesEnVacante
                    isOpen={true}
                    onClose={() => setModal({ name: null, props: {} })}
                    {...modal.props}
                />
            );
        case 'practiceCarousel':
            return (
                <ModalCarruselVacantes
                    isOpen={true}
                    onClose={() => setModal({ name: null, props: {} })}
                    {...modal.props}
                />
            );
        case 'practiceSlot':
            return (
                <ModalVacante
                    isOpen={true}
                    onClose={() => setModal({ name: null, props: {} })}
                    {...modal.props}
                />
            );
        case 'assessor':
            return (
                <ModalAsesor
                    isOpen={true}
                    onClose={() => setModal({ name: null, props: {} })}
                    {...modal.props}
                />
            );
        default:
            return null;
    }
};

export default ModalContext;