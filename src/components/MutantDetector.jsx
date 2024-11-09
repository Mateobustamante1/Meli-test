import React, { useState } from 'react';
import { isMutant } from '../utils/dnaChecker';
import '../styles/App.css';

const MutantDetector = () => {
  const [dna, setDna] = useState(""); // Un solo campo de texto para la secuencia de ADN
  const [isMutantResult, setIsMutantResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Para el spinner de carga
  const [showErrorModal, setShowErrorModal] = useState(false); // Para controlar la visibilidad del popup de error
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Para controlar la visibilidad del popup de éxito
  const [email, setEmail] = useState(""); // Para almacenar el email ingresado
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false); // Para saber si el email fue enviado

  const handleCheckDna = () => {
    setLoading(true); // Inicia el spinner
    setError(null);  // Limpiamos cualquier error previo
    setShowErrorModal(false); // Aseguramos que el modal de error se cierre antes de verificar ADN
    setShowSuccessModal(false); // Cierra el modal de éxito si estaba abierto

    // Simula la validación con un setTimeout
    setTimeout(() => {
      // Validación de caracteres permitidos
      const isValidDna = /^[ATCG]+$/.test(dna);

      if (!isValidDna) {
        setError("Eres un humano, no podes formar parte del clan de Magneto.");
        setIsMutantResult(null);  // Reseteamos el resultado si hay un error
        setShowErrorModal(true); // Mostrar el modal de error
      } else {
        const result = isMutant(dna);
        setIsMutantResult(result);

        if (result) {
          setShowSuccessModal(true); // Mostrar el modal verde si es mutante
        } else {
          setShowErrorModal(true); // Mostrar el modal rojo si no es mutante
        }
      }

      setLoading(false); // Detiene el spinner después de la validación
    }, 3000); // Simula un retraso de 3 segundos en la validación
  };

  const handleChangeDna = (e) => {
    setDna(e.target.value.toUpperCase()); // Convertir a mayúsculas para uniformidad
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value); // Guardar el email ingresado
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setIsEmailSubmitted(true);
    setShowSuccessModal(false); // Cierra el modal de éxito después de enviar el email
    console.log("Email enviado: ", email); // Simulación del envío
  };

  const closeErrorModal = () => {
    setShowErrorModal(false); // Cierra el modal de error
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false); // Cierra el modal de éxito
    setIsEmailSubmitted(false); // Cierra el modal de éxito confirmado
  };

  return (
    <div className="mutant-detector-container">
      <h2>Detector ADN</h2>
      <p>Ingresá tu código de ADN</p>
      <input
        type="text"
        value={dna}
        onChange={handleChangeDna}
        maxLength={6} // Asumimos que la secuencia tiene longitud 6
        placeholder="Ingrese la secuencia"
      />
      <button onClick={handleCheckDna} disabled={loading}>
        {loading ? 'Validando...' : 'Verificar ADN'}
      </button>
      {loading && <div className="spinner"></div>} {/* Spinner de carga */}
      {error && <p className="error">{error}</p>}
      {isMutantResult !== null && !error && (
        <p>{isMutantResult ? "Felicitaciones, eres un mutante. Completa tu email y Magneto te reclutará en breve." : "No se detectó mutante."}</p>
      )}

      {/* Modal de error (popup rojo) */}
      {showErrorModal && (
        <div className="error-modal">
          <div className="error-modal-content">
            <span className="close-btn" onClick={closeErrorModal}>×</span>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Modal de éxito (popup verde) */}
      {showSuccessModal && !isEmailSubmitted && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span className="close-btn" onClick={closeSuccessModal}>×</span>
            <p>Felicitaciones, eres un mutante. Completa tu email y Magneto te reclutará en breve.</p>
            <form onSubmit={handleSubmitEmail}>
              <input
                type="email"
                value={email}
                onChange={handleChangeEmail}
                placeholder="Ingresa tu email"
                required
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de éxito (popup verde confirmado) */}
      {isEmailSubmitted && !showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <span className="close-btn" onClick={closeSuccessModal}>×</span> {/* Cierra al confirmar el envío */}
            <p>Email enviado exitosamente. ¡Te esperamos, mutante!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MutantDetector;
