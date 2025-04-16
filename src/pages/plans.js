// /src/pages/plans.js (Spanish Version)

import React, { useState, useEffect } from "react"; // Se agregó useEffect
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // Asumiendo traducción o manejo de idioma
import Footer from "../components/Footer"; // Asumiendo traducción o manejo de idioma

// Datos de planes actualizados y traducidos
const todosLosPlanes = [ // allPlans -> todosLosPlanes
  {
    titulo: "Clases Individuales", // title -> titulo
    nuevoPrecio: "20", // newPrice -> nuevoPrecio
    frecuencia: "clase", // frequency -> frecuencia
    descripcion: "Clases de español con pago flexible por sesión y total adaptabilidad.", // description -> descripcion
    caracteristicas: [ // features -> caracteristicas
      "Sesiones personalizadas de 1 hora",
      "Horario flexible",
      "Sin compromiso a largo plazo",
      "Adaptado a tus necesidades inmediatas",
    ],
  },
  {
    titulo: "Plan Confianza", // title -> titulo
    nuevoPrecio: "120", // newPrice -> nuevoPrecio
    frecuencia: "mes", // frequency -> frecuencia
    descripcion: "Impulsa tu confianza con constancia.", // description -> descripcion
    caracteristicas: [ // features -> caracteristicas
      "2 clases por semana (8/mes)",
      "Enfoque en hablar y escuchar",
      "$15 por clase (25% de ahorro)",
      "Feedback y correcciones personalizadas",
    ],
  },
  {
    titulo: "Plan Fluidez", // title -> titulo
    nuevoPrecio: "220", // newPrice -> nuevoPrecio
    frecuencia: "mes", // frequency -> frecuencia
    descripcion: "Práctica intensiva para un progreso rápido.", // description -> descripcion
    caracteristicas: [ // features -> caracteristicas
      "4 clases por semana (16/mes)",
      "Currículum completo",
      "$13.75 por clase (30% de ahorro)",
      "Reportes de progreso mensuales",
      "Feedback y correcciones personalizadas",
    ],
  },
];

const PlansPage = () => {
  const location = useLocation();
  const [indicePlanSeleccionado, setIndicePlanSeleccionado] = useState(1); // Default to "Plan Confianza" (index 1) // selectedPlanIndex -> indicePlanSeleccionado, setSelectedPlanIndex -> setIndicePlanSeleccionado

  // Establecer plan inicial basado en el parámetro "plan"
  useEffect(() => { // Changed React.useEffect to useEffect
    const params = new URLSearchParams(location.search);
    const planParametro = params.get("plan"); // planQuery -> planParametro
    if (planParametro) {
      // Buscar por título traducido (case-insensitive)
      const idx = todosLosPlanes.findIndex(
        (plan) => plan.titulo.toLowerCase() === planParametro.toLowerCase()
      );
      if (idx !== -1) {
        setIndicePlanSeleccionado(idx);
      } else {
        // Opcional: intentar buscar por el título original si la URL viene de una versión no traducida
        const originalIdx = todosLosPlanes.findIndex(
            (plan) => {
                // Mapeo inverso simple si es necesario (esto es un ejemplo, ajustar según los títulos originales)
                const originalTitles = ["Individual Classes", "Confidence Plan", "Fluency Plan"];
                return originalTitles[idx]?.toLowerCase() === planParametro.toLowerCase();
            }
        );
         if (originalIdx !== -1) {
            setIndicePlanSeleccionado(originalIdx);
         }
      }
    }
  }, [location.search, setIndicePlanSeleccionado]); // Added dependency

  const manejarSeleccionPlan = () => { // handleSelectPlan -> manejarSeleccionPlan
    const planSeleccionado = todosLosPlanes[indicePlanSeleccionado]; // selectedPlan -> planSeleccionado
    // Navegar usando el título traducido en la URL
    navigate(`/signupTrial?plan=${encodeURIComponent(planSeleccionado.titulo)}&trial=true`);
  };

  const preguntasFrecuentes = [ // faqs -> preguntasFrecuentes
    {
      pregunta: "¿Qué plataforma usan para las clases?", // question -> pregunta
      respuesta: "Todas las lecciones son online a través de Zoom.", // answer -> respuesta
    },
    {
      pregunta: "¿Puedo encontrarme contigo en persona?", // question -> pregunta
      respuesta: "Si estás en Medellín, ¡claro! De lo contrario, todas las clases son online.", // answer -> respuesta
    },
    {
      pregunta: "¿Qué pasa después de reservar una clase de prueba?", // question -> pregunta
      respuesta: "Recibirás un plan personalizado y podrás elegir la mejor suscripción para continuar.", // answer -> respuesta
    },
    {
      pregunta: "¿Puedo reprogramar o cancelar una clase?", // question -> pregunta
      respuesta: "¡Sí! Solo avisa con 24 horas de anticipación.", // answer -> respuesta
    },
    {
      pregunta: "¿Puedo obtener un plan personalizado?", // question -> pregunta
      respuesta: "Absolutamente. Podemos crear una ruta de aprendizaje que se ajuste a tus metas y disponibilidad.", // answer -> respuesta
    },
  ];

  const testimonios = [ // reviews -> testimonios
    {
      texto: "¡Vic es un profesor increíble! En solo unas pocas semanas, empecé a hablar con más confianza.", // text -> texto
      autor: "Sarah, EEUU", // author -> autor
    },
    {
      texto: "Las lecciones son súper prácticas y personalizadas. ¡Altamente recomendado!", // text -> texto
      autor: "Lucas, Alemania", // author -> autor
    },
    {
      texto: "He probado muchos profesores de español, pero el enfoque de Vic realmente me ayudó a pensar en español.", // text -> texto
      autor: "Maria, Canadá", // author -> autor
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Sección Hero */}
      <section
              className="relative bg-cover bg-center"
              style={{ backgroundImage: "url('/images/hero-about.jpeg')" }} // Mantener ruta de imagen
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="relative max-w-4xl mx-auto px-4 py-20 text-center text-white">
                <motion.h1
                  className="text-5xl font-bold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Nuestros Planes {/* Translated Heading */}
                </motion.h1>
                <motion.p
                  className="mt-4 text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Aprende español online desde cualquier lugar — ¡o encuéntrame en Medellín! Todos los planes incluyen estrategias de aprendizaje personalizadas, práctica de conversación y horarios flexibles para adaptarse a tus necesidades. {/* Translated Paragraph */}
                </motion.p>
              </div>
            </section>

      {/* Cuadrícula de Planes */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {todosLosPlanes.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all cursor-pointer ${ // Added cursor-pointer
                indicePlanSeleccionado === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setIndicePlanSeleccionado(index)} // Allow clicking the card to select
            >
              <div className={`p-6 ${indicePlanSeleccionado === index ? "bg-primary text-white" : "bg-gray-100"}`}>
                <h3 className="text-2xl font-bold">{plan.titulo}</h3> {/* Use translated title */}
                {plan.nuevoPrecio && ( // Use translated price key
                  <p className="text-xl font-semibold mt-2">
                    ${plan.nuevoPrecio} <span className="text-sm font-light">/{plan.frecuencia}</span> {/* Use translated frequency */}
                  </p>
                )}
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{plan.descripcion}</p> {/* Use translated description */}

                <ul className="space-y-2 mb-6">
                  {plan.caracteristicas.map((caracteristica, idx) => ( // Use translated features key and variable
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* Added flex-shrink-0 */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{caracteristica}</span> {/* Wrap text in span for better control if needed */}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sección CTA Debajo de los Planes */}
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-4">
            ¿Listo/a para Empezar Tu Viaje con el Español? {/* Translated Heading */}
          </h3>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={manejarSeleccionPlan} // Use translated handler name
            // Consider adding a specific primary-dark color in tailwind.config.js if needed
            className="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition" // Adjusted hover color
          >
            Reserva Tu Clase de Prueba de $5 Ahora {/* Translated Button */}
          </motion.button>
          <p className="text-sm text-gray-500 mt-4">
            Después de tu prueba, elige el plan que mejor se adapte a tus necesidades de aprendizaje. {/* Translated Paragraph */}
          </p>
        </div>
      </section>

      {/* Info de Pago */}
      <section className="max-w-4xl mx-auto py-8 px-4 text-center text-sm text-gray-500">
        <p>Los pagos se procesan de forma segura a través de PayPal. Cancelaciones y reprogramaciones requieren 24 horas de aviso.</p> {/* Translated Text */}
      </section>

      {/* Mantener secciones existentes traducidas */}
      <section className="bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">Cómo Funciona</h2> {/* Translated Heading */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Reserva una clase de prueba de $5.",
              "Conoce a tu profesor/a y discute tus metas.",
              "Obtén un plan de aprendizaje personalizado.",
              "¡Elige tu suscripción ideal y empieza a practicar!",
            ].map((paso, index) => ( // step -> paso
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {index + 1}
                </div>
                <p>{paso}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-8">Preguntas Frecuentes</h2> {/* Translated Heading */}
        <div className="space-y-4">
          {preguntasFrecuentes.map((faq, index) => ( // faqs -> preguntasFrecuentes
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.pregunta}</h3> {/* Use translated question key */}
              <p className="text-gray-600">{faq.respuesta}</p> {/* Use translated answer key */}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary/10 py-12 px-4"> {/* bg-primary/10 might need adjustment if primary isn't defined with opacity support */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">Lo Que Dicen Nuestros Estudiantes</h2> {/* Translated Heading */}
          <div className="grid md:grid-cols-3 gap-6">
            {testimonios.map((testimonio, index) => ( // reviews -> testimonios, review -> testimonio
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-700 italic mb-4">"{testimonio.texto}"</p> {/* Use translated text key */}
                <p className="text-gray-600 font-semibold">— {testimonio.autor}</p> {/* Use translated author key */}
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default PlansPage;