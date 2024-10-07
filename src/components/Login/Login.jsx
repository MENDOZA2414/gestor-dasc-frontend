import React from 'react';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm}>
        <h1 className={styles.title}>Iniciar sesión</h1>
        <h2 className={styles.subtitle}>Accede a tu cuenta</h2>

        <div className={styles.inputField}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Ingresa tu email" />
        </div>

        <div className={styles.inputField}>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" placeholder="Ingresa tu contraseña" />
        </div>

        <div className={styles.checkboxField}>
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Mantener sesión abierta</label>
        </div>

        <button type="submit" className={styles.loginButton}>Acceder</button>

        <div className={styles.loginFooter}>
          <a href="/">¿Olvidaste tu contraseña?</a>
          <p>¿No tienes cuenta? <a href="/">Regístrate</a></p>
        </div>
      </form>

      <footer className={styles.footer}>
        2024 Universidad Autónoma de Baja California Sur
      </footer>
    </div>
  );
}

export default Login;
