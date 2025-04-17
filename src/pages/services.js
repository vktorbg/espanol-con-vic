// /src/pages/services.js (Spanish Version)
import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // Asumiendo traducción o manejo de idioma
import Footer from "../components/Footer"; // Asumiendo traducción o manejo de idioma

// Datos de servicios enfocados en beneficios (traducido)
const servicios = [ // services -> servicios
  {
    titulo: "Habla Español con Confianza", // title -> titulo
    descripcion: "Ve más allá del español de libro. Nos enfocamos en práctica de conversación real, adaptada a tus necesidades, para que chatees naturalmente sobre viajes, trabajo o lo que te apasione.", // description -> descripcion
    // Icono SVG (mantenido igual)
    icono: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
  },
  {
    titulo: "Entiende la Gramática Intuitivamente", // title -> titulo
    descripcion: "Olvida reglas confusas. Desglosamos la gramática española en pasos simples y prácticos, directamente vinculados a cómo la usarás realmente en conversaciones.", // description -> descripcion
    // Icono SVG (mantenido igual)
    icono: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    titulo: "Feedback y Ruta Personalizada", // title -> titulo
    descripcion: "Recibe feedback específico y útil con informes mensuales. Seguimos tu progreso y ajustamos tu plan de aprendizaje personalizado para asegurar que siempre avances eficazmente.", // description -> descripcion
     // Icono SVG (mantenido igual)
    icono: (
        <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    ),
  },
  {
    titulo: "Aprendizaje Flexible a Tu Medida", // title -> titulo
    descripcion: "Tu vida está ocupada. Aprende a tu propio ritmo con horarios flexibles para lecciones online. Nos adaptamos a tu disponibilidad y estilo de aprendizaje.", // description -> descripcion
    // Icono SVG (mantenido igual)
    icono: (
      <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];


// Renombrado componente
const PaginaServicios = () => { // ServicesPage -> PaginaServicios
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Sección Hero */}
      <section
        className="relative bg-cover bg-center py-24 md:py-32 text-white"
        style={{ backgroundImage: "url('/images/hero-background.jpeg')" }} // Mantener imagen o cambiar por una relevante en español
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Desbloque tu fluidez con conversaciones cotidianas en español. {/* Translated Heading */}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Nuestro enfoque personalizado se centra en habilidades de habla del mundo real y las perspectivas culturales que necesitas para conectar auténticamente. Aprende online, cuando quieras. {/* Translated Paragraph */}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link to="/plans"> {/* Ruta probablemente igual */}
              <motion.button
                className="bg-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold shadow-md w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explora Nuestros Planes {/* Translated Button */}
              </motion.button>
            </Link>
            <Link to="/signupTrial"> {/* Ruta probablemente igual */}
              <motion.button
                className="bg-white text-primary border border-primary px-6 py-3 md:px-8 md:py-4 rounded-lg font-bold shadow-md w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reserva tu Clase de Prueba de $5 {/* Translated Button */}
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sección Servicios - "Tu Camino Hacia la Fluidez" */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
            Tu Camino Hacia la Fluidez {/* Translated Heading */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {servicios.map((servicio, index) => ( // services -> servicios, service -> servicio
              <motion.div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row items-center text-center sm:text-left gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  {servicio.icono} {/* service.icon -> servicio.icono */}
                </div>
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">{servicio.titulo}</h3> {/* service.title -> servicio.titulo */}
                  <p className="text-gray-600 leading-relaxed">{servicio.descripcion}</p> {/* service.description -> servicio.descripcion */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Llamada a la Acción Final - Estilo Consistente */}
      <section className="py-16 lg:py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo/a para Empezar a Hablar Español?</h2> {/* Translated Heading */}
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Da el primer paso con una clase de prueba personalizada de $5. Descubre tu potencial y ve cómo nuestro enfoque funciona para ti. {/* Translated Paragraph */}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signupTrial"> {/* Ruta probablemente igual */}
              <motion.button
                className="bg-white text-primary px-8 py-3 rounded-lg font-bold shadow-md hover:bg-gray-100 transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Obtén Tu Prueba de $5 {/* Translated Button */}
              </motion.button>
            </Link>
            <Link to="/plans"> {/* Ruta probablemente igual */}
              <motion.button
                className="bg-secondary border border-white text-primary px-8 py-3 rounded-lg font-bold shadow-md hover:bg-white hover:text-primary transition w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Todos los Planes {/* Translated Button */}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaginaServicios; // Export with the Spanish name