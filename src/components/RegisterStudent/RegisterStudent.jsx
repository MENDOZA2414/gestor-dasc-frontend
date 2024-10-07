import React, { useState } from 'react';
import styles from './RegisterStudent.module.css'; // Importar los estilos del archivo CSS modular

const RegisterStudent = () => {
    const [foto, setFoto] = useState(null);
    const [fotoUrl, setFotoUrl] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [celular, setCelular] = useState('');
    const [controlNumber, setControlNumber] = useState('');
    const [career, setCareer] = useState('');
    const [semester, setSemester] = useState('');
    const [shift, setShift] = useState('');
    const [studentStatus, setStudentStatus] = useState('Activo'); // Estado por defecto "Activo"
    const [step, setStep] = useState(1);

    const prevFoto = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const lector = new FileReader();
        lector.readAsDataURL(file);
        lector.onload = () => {
            setFotoUrl(lector.result);
            setFoto(file);
        };
    };

    const limpiarCampos = () => {
        setNombre('');
        setApellidoPaterno('');
        setApellidoMaterno('');
        setFechaNacimiento('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setCelular('');
        setControlNumber('');
        setCareer('');
        setSemester('');
        setShift('');
        setFoto(null);
        setFotoUrl(null);
    };

    const handleNumericInput = (e, setter, maxLength) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= maxLength) {
            setter(value);
        }
    };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.formContainer}>
                <div className={styles.card}>
                    <div className={styles.cardBody}>
                        <h5 className={styles.title}>Registro de Alumno</h5>
                        <div className={styles.imagePreview}>
                            {fotoUrl ? (
                                <img className={styles.profileImage} src={fotoUrl} alt="Foto del alumno" />
                            ) : (
                                <div className={styles.placeholderImage}></div>
                            )}
                        </div>
                        {step === 1 && (
                            <>
                                <div className={styles.inputFileGroup}>
                                    <label htmlFor="fileUpload" className={styles.inputFileLabel}>Seleccionar archivo</label>
                                    <input
                                        id="fileUpload"
                                        type="file"
                                        accept=".jpg,.jpeg,.png"
                                        onChange={prevFoto}
                                        style={{ display: 'none' }}
                                    />
                                    <input
                                        type="text"
                                        className={styles.inputFile}
                                        value={foto ? foto.name : "Sin archivos seleccionados"}
                                        readOnly
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Nombre</label>
                                    <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Apellido Paterno</label>
                                    <input type="text" onChange={(e) => setApellidoPaterno(e.target.value)} value={apellidoPaterno} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Apellido Materno</label>
                                    <input type="text" onChange={(e) => setApellidoMaterno(e.target.value)} value={apellidoMaterno} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Fecha de Nacimiento</label>
                                    <input type="date" onChange={(e) => setFechaNacimiento(e.target.value)} value={fechaNacimiento} />
                                </div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label>Correo Electrónico</label>
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Contraseña</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Confirmar Contraseña</label>
                                    <input type="password" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Número Celular</label>
                                    <input
                                        type="tel"
                                        onChange={(e) => handleNumericInput(e, setCelular, 10)}
                                        value={celular}
                                    />
                                </div>
                            </>
                        )}
                        {step === 3 && (
                            <>
                                <div className={styles.inputGroup}>
                                    <label>Número de Control</label>
                                    <input type="text" onChange={(e) => setControlNumber(e.target.value)} value={controlNumber} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Carrera</label>
                                    <select onChange={(e) => setCareer(e.target.value)} value={career}>
                                        <option value="">Seleccione</option>
                                        <option value="IDS">IDS</option>
                                        <option value="ITC">ITC</option>
                                        <option value="IC">IC</option>
                                        <option value="LATI">LATI</option>
                                        <option value="LITI">LITI</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Semestre</label>
                                    <select onChange={(e) => setSemester(e.target.value)} value={semester}>
                                        <option value="">Seleccione</option>
                                        <option value="0">0</option>
                                        <option value="9">9</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Turno</label>
                                    <select onChange={(e) => setShift(e.target.value)} value={shift}>
                                        <option value="">Seleccione</option>
                                        <option value="TM">TM</option>
                                        <option value="TV">TV</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Seleccione su asesor</label>
                                    <select onChange={(e) => setStudentStatus(e.target.value)} value={studentStatus}>
                                        <option value="Activo">Asesor1</option>
                                        <option value="Inactivo">Asesor2</option>
                                    </select>
                                </div>
                            </>
                        )}
                        <div className={styles.buttonsContainer}>
                            {step > 1 && <button type="button" className={styles.secondaryButton} onClick={() => setStep(step - 1)}>Anterior</button>}
                            {step < 3 && (
                                <button
                                    type="button"
                                    className={`${styles.primaryButton} ${step === 1 ? styles.fullWidth : ''}`}
                                    onClick={() => setStep(step + 1)}
                                >
                                    Siguiente
                                </button>
                            )}
                            {step === 3 && (
                                <button type="submit" className={`${styles.primaryButton} ${styles.registerButton}`}>
                                    Registrar Alumno
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
                </div>
            </form>
        </div>
    );
};

export default RegisterStudent;
