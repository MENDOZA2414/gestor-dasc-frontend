import { useState, useEffect, useRef } from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

import ModalContext from "@shared/ModalContext"
import { Card } from "@shared/components/cards"
import { DataTable } from "@shared/components/datatable"
import IconButton from "@shared/components/buttons/IconButton"
import { getAllInternalAssessors } from "@modules/admin/services/assessorsService"
import { getAllStudents } from "@modules/admin/services/studentsService"

import {
  StudentsPerEntityChart,
  PracticeStatusChart,
  RecentActivityTable,
  GeneratedReportsTable,
  ActivityChartCard,
} from "@modules/admin/components/dashboard"

const Reports = () => {
  const [search, setSearch] = useState("")
  const [activeFilters, setActiveFilters] = useState([])
  const [internalAssessors, setInternalAssessors] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [generatingPDF, setGeneratingPDF] = useState(false)
  const [headerImage, setHeaderImage] = useState(null)
  const [footerImage, setFooterImage] = useState(null)

  const tableRef = useRef(null)
  const cardRef = useRef(null)
  const chartsContainerRef = useRef(null)
  const assessorsTableRef = useRef(null)
  const studentsTableRef = useRef(null)
  const [modal, setModal] = useState({ name: null, props: {} })

  // Cargar las imágenes del encabezado y pie de página
  useEffect(() => {
    const loadImages = async () => {
      try {
        const headerImg = new Image()
        headerImg.src = "/pdf_header.png"
        headerImg.crossOrigin = "anonymous"
        headerImg.onload = () => setHeaderImage(headerImg)

        const footerImg = new Image()
        footerImg.src = "/pdf_footer.png"
        footerImg.crossOrigin = "anonymous"
        footerImg.onload = () => setFooterImage(footerImg)
      } catch (error) {
        console.error("Error al cargar imágenes:", error)
      }
    }

    loadImages()
  }, [])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents()
        setStudents(data)
      } catch (error) {
        console.error("Error al cargar estudiantes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStudents()
  }, [])

  useEffect(() => {
    const fetchInternalAssessors = async () => {
      try {
        const data = await getAllInternalAssessors()
        setInternalAssessors(data)
      } catch (error) {
        console.error("Error al cargar asesores internos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInternalAssessors()
  }, [])

  const generatePDF = async () => {
    if (!headerImage || !footerImage) {
      alert("Esperando a que se carguen las imágenes. Por favor, inténtalo de nuevo en unos segundos.")
      return
    }

    setGeneratingPDF(true)

    try {
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 10

      // Función para agregar encabezado y pie de página a cada página
      const addHeaderAndFooter = () => {
        // Agregar encabezado
        const headerWidth = pageWidth / 1.1
        const headerHeight = (headerImage.height * headerWidth) / headerImage.width
        const headerCanvas = document.createElement("canvas")
        headerCanvas.width = headerImage.width
        headerCanvas.height = headerImage.height
        const headerCtx = headerCanvas.getContext("2d")
        headerCtx.drawImage(headerImage, 0, 0)
        const headerDataUrl = headerCanvas.toDataURL("image/png")
        pdf.addImage(headerDataUrl, "PNG", pageWidth * 0.05, pageHeight * 0.02, headerWidth, headerHeight)

        // Agregar pie de página
        const footerWidth = pageWidth / 1.15
        const footerHeight = (footerImage.height * footerWidth) / footerImage.width
        const footerCanvas = document.createElement("canvas")
        footerCanvas.width = footerImage.width
        footerCanvas.height = footerImage.height
        const footerCtx = footerCanvas.getContext("2d")
        footerCtx.drawImage(footerImage, 0, 0)
        const footerDataUrl = footerCanvas.toDataURL("image/png")
        pdf.addImage(footerDataUrl, "PNG", pageWidth * 0.06, (pageHeight - footerHeight) - (pageHeight * 0.02), footerWidth, footerHeight)

        return { headerHeight, footerHeight }
      }

      // Agregar primera página con encabezado, información del reporte y pie de página
      const { headerHeight, footerHeight } = addHeaderAndFooter()

      // Posición inicial después del encabezado
      let yPosition = headerHeight + 20

      // Información del reporte (similar a la imagen proporcionada)
      const currentDate = new Date()
      const formattedDate = currentDate
        .toLocaleDateString("es-MX", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
        .toUpperCase()

      // Número de oficio
      pdf.setFontSize(11)
      pdf.setFont("helvetica", "bold")
      pdf.text(`OFICIO DASC-001/${currentDate.getFullYear()}`, pageWidth - margin - 60, yPosition)
      yPosition += 5
      pdf.text(`${formattedDate}`, pageWidth - margin - 60, yPosition)
      yPosition += 15

      // Información del solicitante
      pdf.setFont("helvetica", "bold")
      pdf.text("REPORTE SOLICITADO POR", margin, yPosition)
      yPosition += 5
      pdf.text("DDC. JESÚS ANDRÉS SANDOVAL BRINGAS", margin, yPosition)
      yPosition += 5
      pdf.text("JEFE DEL DEPTO. ACADÉMICO DE SISTEMAS COMPUTACIONALES", margin, yPosition)
      yPosition += 15

      // Descripción del reporte
      pdf.setFont("helvetica", "normal")
      pdf.text(
        "A continuación se muestra un reporte de estadísticas, gráficas, tablas y valores solicitados:",
        margin,
        yPosition,
      )
      yPosition += 15

      // Función para verificar si hay espacio suficiente en la página actual
      const checkPageBreak = (elementHeight) => {
        if (yPosition + elementHeight > pageHeight - footerHeight - margin) {
          pdf.addPage()
          yPosition = headerHeight + 10
          addHeaderAndFooter()
          return true
        }
        return false
      }

      // Capturar las gráficas del dashboard
      if (chartsContainerRef.current) {
        checkPageBreak(80)

        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        //pdf.text("GRÁFICAS DEL DASHBOARD", margin, yPosition)
        yPosition += 10

        const canvas = await html2canvas(chartsContainerRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        })

        const imgData = canvas.toDataURL("image/png")
        const imgWidth = pageWidth - margin * 2
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        // Si la imagen es muy alta, dividirla en múltiples páginas
        if (imgHeight > pageHeight - yPosition - footerHeight - margin) {
          const ratio = (pageHeight - yPosition - footerHeight - margin) / imgHeight
          const adjustedHeight = imgHeight * ratio
          const adjustedWidth = imgWidth * ratio

          pdf.addImage(imgData, "PNG", margin, yPosition, adjustedWidth, adjustedHeight)
          pdf.addPage()
          yPosition = headerHeight + 10
          addHeaderAndFooter()

          // Continuar con la parte restante de la imagen en la siguiente página
          const remainingHeight = imgHeight - adjustedHeight
          pdf.addImage(
            imgData,
            "PNG",
            margin,
            yPosition,
            imgWidth,
            remainingHeight,
            null,
            null,
            null,
            adjustedHeight / imgHeight,
          )
          yPosition += remainingHeight + 10
        } else {
          pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight)
          yPosition += imgHeight + 10
        }
      }

      // Capturar tabla de asesores
      if (assessorsTableRef.current) {
        checkPageBreak(60)

        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text("TABLA DE ASESORES", margin, yPosition)
        yPosition += 10

        const canvas = await html2canvas(assessorsTableRef.current, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        })

        const imgData = canvas.toDataURL("image/png")
        const imgWidth = pageWidth - margin * 2
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        if (checkPageBreak(imgHeight)) {
          yPosition = headerHeight + 10
        }

        pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight)
        yPosition += imgHeight + 10
      }

      // Capturar tabla de estudiantes
      if (studentsTableRef.current) {
        checkPageBreak(60)

        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text("TABLA DE ESTUDIANTES", margin, yPosition)
        yPosition += 10

        const canvas = await html2canvas(studentsTableRef.current, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        })

        const imgData = canvas.toDataURL("image/png")
        const imgWidth = pageWidth - margin * 2
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        if (checkPageBreak(imgHeight)) {
          yPosition = headerHeight + 10
        }

        pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight)
      }

      // Guardar el PDF
      pdf.save(`reporte-DASC-${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("Error al generar PDF:", error)
      alert("Error al generar el PDF. Por favor, inténtalo de nuevo.")
    } finally {
      setGeneratingPDF(false)
    }
  }

  const getFilteredInternalAssessors = () => {
    return internalAssessors.filter((student) => {
      const matchSearch = (student.name || "").toLowerCase().includes(search.toLowerCase())

      const matchFilters =
        activeFilters.length === 0 ||
        activeFilters.includes(student.career) ||
        activeFilters.includes(student.semester) ||
        activeFilters.includes(student.shift) ||
        activeFilters.includes(student.internalAssessor)

      return matchSearch && matchFilters
    })
  }

  const filtered = getFilteredInternalAssessors()
  const minRows = 5
  const filledData = [...filtered]

  if (filtered.length < minRows) {
    const emptyRows = Array(minRows - filtered.length)
      .fill()
      .map((_, index) => {
        const isLastRow = index === minRows - filtered.length - 1
        return {
          id: `empty-${index}`,
          name: "",
          tipo: "",
          contacto: "",
          alumnosAsignados: "",
          isEmpty: true,
          isLastRow,
        }
      })

    filledData.push(...emptyRows)
  }

  useEffect(() => {
    if (tableRef.current) {
      const lastRow = tableRef.current.querySelector("tbody tr:last-child")
      if (lastRow) {
        lastRow.style.borderBottom = "none"
      }
    }
  }, [filledData])

  const columns = [
    {
      label: "Nombre",
      key: "name",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.fullName}</span>),
    },
    {
      label: "Tipo",
      key: "tipo",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{"row.tipo"}</span>),
    },
    {
      label: "Contacto",
      key: "contacto",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{"row.contacto"}</span>),
    },
    {
      label: "Alumnos Asignados",
      key: "alumnosAsignados",
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>
        return (
          <div className="flex gap-2 justify-center">
            <span className="truncate">{row.semester}</span>
            <IconButton
              icon="eye"
              title="Ver"
              onClick={() =>
                setModal({
                  name: "assignedStudents",
                  props: {
                    internalAssessorID: row.internalAssessorID,
                  },
                })
              }
            />
            <IconButton
              icon="add"
              title="Agregar Estudiante"
              onClick={() =>
                setModal({
                  name: "addStudents",
                  props: {
                    internalAssessorID: row.internalAssessorID,
                  },
                })
              }
            />
          </div>
        )
      },
    },
    {
      label: "Acciones",
      key: "actions",
      center: true,
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>
        return (
          <div className="flex gap-2 justify-center">
            <IconButton
              icon="eye"
              title="Ver"
              onClick={() =>
                setModal({
                  name: "assessor",
                  props: {
                    internalAssessorID: row.internalAssessorID,
                  },
                })
              }
            />
            <IconButton
              icon="edit"
              title="Editar"
              onClick={() =>
                setModal({
                  name: "assessorEdit",
                  props: {
                    internalAssessorID: row.internalAssessorID,
                  },
                })
              }
            />
          </div>
        )
      },
    },
  ]

  const getFilteredStudents = () => {
    return students.filter((student) => {
      const lowerSearch = search.toLowerCase()
      const matchSearch =
        (student.name || "").toLowerCase().includes(lowerSearch) ||
        (student.matricula || "").toLowerCase().includes(lowerSearch)

      const filters = activeFilters
      const matchCareer = !filters.Carrera || filters.Carrera.includes(student.career)
      const matchSemester = !filters.Semestre || filters.Semestre.includes(student.semester)
      const matchShift = !filters.Turno || filters.Turno.includes(student.shift)

      const allAssessorFilters = [...(filters.Asesor?.Interno || []), ...(filters.Asesor?.Externo || [])]
      const matchAssessor = allAssessorFilters.length === 0 || allAssessorFilters.includes(student.internalAssessor)

      return matchSearch && matchCareer && matchSemester && matchShift && matchAssessor
    })
  }

  const studentFiltered = getFilteredStudents()
  const studentFilledData = [...studentFiltered]

  if (filtered.length < minRows) {
    const emptyRows = Array(minRows - filtered.length)
      .fill()
      .map((_, index) => {
        const isLastRow = index === minRows - filtered.length - 1
        return {
          id: `empty-${index}`,
          name: "",
          matricula: "",
          career: "",
          semester: "",
          shift: "",
          internalAssessor: "",
          isEmpty: true,
          isLastRow,
        }
      })

    studentFilledData.push(...emptyRows)
  }

  useEffect(() => {
    if (tableRef.current) {
      const lastRow = tableRef.current.querySelector("tbody tr:last-child")
      if (lastRow) {
        lastRow.style.borderBottom = "none"
      }
    }
  }, [studentFilledData])

  const studentColumns = [
    {
      label: "Nombre",
      key: "name",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.name}</span>),
    },
    {
      label: "Matrícula",
      key: "matricula",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.matricula}</span>),
    },
    {
      label: "Carrera",
      key: "career",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.career}</span>),
    },
    {
      label: "Semestre",
      key: "semester",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.semester}</span>),
    },
    {
      label: "Turno",
      key: "shift",
      render: (row) => (row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.shift}</span>),
    },
    {
      label: "Asesor Asignado",
      key: "internalAssessor",
      render: (row) =>
        row.isEmpty ? <div className="h-9"></div> : <span className="truncate">{row.internalAssessor}</span>,
    },
    {
      label: "Acciones",
      key: "actions",
      center: true,
      render: (row) => {
        if (row.isEmpty) return <div className="h-9"></div>
        return (
          <div className="flex gap-2 justify-center">
            <IconButton
              icon="eye"
              title="Ver"
              onClick={() =>
                setModal({
                  name: "student",
                  props: {
                    matricula: row.matricula,
                    userID: row.userID,
                  },
                })
              }
            />
            <IconButton
              icon="edit"
              title="Editar"
              onClick={() =>
                setModal({
                  name: "studentEdit",
                  props: {
                    matricula: row.matricula,
                    userID: row.userID,
                  },
                })
              }
            />
          </div>
        )
      },
    },
  ]

  return (
    <>
      <ModalContext modal={modal} setModal={setModal} />

      {/* Botón para generar PDF */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={generatePDF}
          disabled={generatingPDF}
          className={`
                        px-6 py-3 rounded-lg font-medium text-white transition-all duration-200
                        ${
                          generatingPDF
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:transform active:scale-95"
                        }
                        flex items-center gap-2
                    `}
        >
          {generatingPDF ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generando PDF...
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Generar PDF Completo
            </>
          )}
        </button>
      </div>

      {/* Container de las gráficas para captura */}
      <div ref={chartsContainerRef} className="grid grid-cols-12 sm:grid-cols-12 gap-4">
        <ActivityChartCard />
        <StudentsPerEntityChart />
        <PracticeStatusChart />
        <RecentActivityTable />
        <GeneratedReportsTable />
      </div>

      <div className="mt-4"></div>

      {/* Card fija con tabla expandida visualmente */}
      <Card title="Asesores" className="flex flex-col justify-between" ref={assessorsTableRef}>
        <div className="flex-grow overflow-hidden">
          <div className="h-full flex flex-col">
            <DataTable
              columns={columns}
              data={filledData}
              emptyMessage={loading ? "Cargando asesores..." : "No hay asesores para mostrar."}
              ref={tableRef}
            />
          </div>
        </div>
        <div className="px-4 py-3 text-sm text-gray-500 flex justify-between items-center">
          <span>Página 1 de 51</span>
        </div>
      </Card>

      <div className="mt-4"></div>

      {/* Card fija con tabla expandida visualmente */}
      <Card title="Estudiantes" className="min-h-[540px] flex flex-col justify-between" ref={studentsTableRef}>
        <div className="flex-grow overflow-hidden">
          <div className="h-full flex flex-col">
            <DataTable
              columns={studentColumns}
              data={studentFilledData}
              emptyMessage={loading ? "Cargando estudiantes..." : "No hay estudiantes para mostrar."}
              ref={tableRef}
            />
          </div>
        </div>
        <div className="px-4 py-3 text-sm text-gray-500 flex justify-between items-center">
          <span>Página 1 de 51</span>
        </div>
      </Card>
    </>
  )
}

export default Reports