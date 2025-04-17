// --- START OF FILE index.js (Spanish Version) ---

import React from "react"; // Se eliminó useState ya que no se necesita aquí
import { Link, navigate } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // Asumiendo que Navbar también se traducirá o manejará el idioma
import Footer from "../components/Footer"; // Asumiendo que Footer también se traducirá o manejará el idioma

// Imágenes de la carpeta estática (Se eliminaron imágenes de estudiantes no usadas)
const ProfileImage = "/images/profile.png"; // La ruta de la imagen permanece igual
const ProfileImage2 = "/images/profile2.jpg"; // La ruta de la imagen permanece igual
const HeroBackground = "/images/hero-background.jpeg"; // La ruta de la imagen permanece igual

const planes = [
  {
    titulo: "Clases Individuales", // title -> titulo
    nuevoPrecio: "20", // newPrice -> nuevoPrecio
    frecuencia: "clase", // frequency -> frecuencia
    descripcion: "Clases de español con pago flexible por sesión y total adaptabilidad.", // Actualizado desde /plans
    imagen: "/images/plan3.jpg", // image -> imagen
    personalizado: true, // custom -> personalizado
    sesionesPorSemana: "Horario flexible", // Agregado directamente
    caracteristicas: [ // Agregado desde /plans
      "Sesiones personalizadas de 1 hora",
      "Horario flexible",
      "Sin compromiso a largo plazo",
      "Adaptado a tus necesidades inmediatas",
    ],
  },
  {
    titulo: "Plan Confianza", // title -> titulo
    nuevoPrecio: 120, // newPrice -> nuevoPrecio
    frecuencia: "mes (25% desc.)", // frequency -> frecuencia
    descripcion: "Impulsa tu confianza con constancia.", // Actualizado desde /plans
    imagen: "/images/plan1.jpg", // image -> imagen
    sesionesPorSemana: "2 sesiones por semana", // Agregado directamente
    caracteristicas: [ // Agregado desde /plans
      "2 clases por semana (8/mes)",
      "Enfoque conversacional",
      "$15 por clase (25% de ahorro)",
      "Feedback y correcciones personalizadas",
    ],
  },
  {
    titulo: "Plan Fluidez", // title -> titulo
    nuevoPrecio: 220, // newPrice -> nuevoPrecio
    frecuencia: "mes (30% desc.)", // frequency -> frecuencia
    descripcion: "Práctica intensiva para un progreso rápido.", // Actualizado desde /plans
    imagen: "/images/plan2.jpg", // image -> imagen
    sesionesPorSemana: "4 sesiones por semana", // Agregado directamente
    caracteristicas: [ // Agregado desde /plans
      "4 clases por semana (16/mes)",
      "Enfoque inmersivo",
      "$13.75 por clase (30% de ahorro)",
      "Reportes de progreso mensuales",
      "Feedback y correcciones personalizadas",
    ],
  },
];

const equipo = [
  {
    nombre: "Victor Briceño", // name -> nombre
    cargo: "Especialista en Gramática y Fluidez", // Actualizado desde /about
    cita: "Hacemos del español una parte vibrante de tu vida", // Sin cambios
    bio: "Profesor de Español y Literatura con un enfoque multicultural de enseñanza, con más de 7 años de práctica enseñando a personas de distintos países. Apasionado por enseñar lo más difícil de forma divertida.", // Actualizado desde /about
    imagen: "/images/profile.png", // Sin cambios
  },
  {
    nombre: "Elizabeth García", // name -> nombre
    cargo: "Lingüista y Programadora Educativa", // Actualizado desde /about
    cita: "Conectando la teoría lingüística con la comunicación práctica", // Sin cambios
    bio: "Doctora en Educación y Magister en Lingüística aplicada a la enseñanza y aprendizaje de la lengua española e inglesa, con más de 25 años de experiencia como docente y programadora educativa.", // Actualizado desde /about
    imagen: "/images/profile2.jpg", // Sin cambios
  },
];

// Función auxiliar traducida
const obtenerSesionesPorSemana = (plan) => { // getSessionsPerWeek -> obtenerSesionesPorSemana
  const mapeoSesiones = { // sessionsMapping -> mapeoSesiones
    Confianza: 2,
    "Plan Fluidez": 4, // Key uses the translated title
  };
  return mapeoSesiones[plan.titulo] // Use plan.titulo
    ? `${mapeoSesiones[plan.titulo]} sesiones por semana`
    : plan.personalizado // Use plan.personalizado
    ? "Horario flexible"
    : "";
};

// Las variantes de animación permanecen igual - no necesitan traducción
const auraVariants = {
  idle: {
    boxShadow: [
      "0 0 0 0 rgba(217,119,6,0.6)",
      "0 0 40px 10px rgba(217,119,6,0)",
      "0 0 0 0 rgba(217,119,6,0.6)"
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },
  hover: { scale: 1.05, transition: { duration: 0.3 } }
};

// Componente HeroSplitScreen traducido
const HeroSplitScreen = () => {
  return (
    <header className="relative text-white overflow-hidden">
      {/* Imagen de Fondo */}
      <div className="absolute inset-0">
        <img
          src={HeroBackground}
          alt="Escena Callejera de Medellín" // Translated alt text
          className="w-full h-full object-cover"
          loading="eager" // Mantenido eager para rendimiento LCP
        />
      </div>

      {/* Superposición Oscura para Contraste */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center px-6 py-24">
        {/* Lado Izquierdo: Contenido de Texto */}
        <motion.div
          className="md:w-1/2 flex flex-col items-start mb-8 md:mb-0 md:mr-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold leading-tight mb-4 text-left">
            Escuela Online de Fluidez en Español {/* Translated Heading */}
          </h1>
          <p className="text-secondary text-lg font-regular mb-8 text-left">
            Desarrolla habilidades de conversación y la confianza para usar tu Español en cualquier lugar. {/* Translated Tagline */}
          </p>

          {/* Botones */}
          <div className="w-full flex justify-center md:justify-start space-x-4">
            <Link to="#plans">
              <motion.button
                className="bg-primary text-white text-xl px-8 py-3 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explora nuestros planes {/* Translated Button */}
              </motion.button>
            </Link>
            <Link to="/signupTrial">
              <motion.button
                className="bg-white text-primary border border-primary text-xl px-8 py-3 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ¡Obtén tu clase de prueba! {/* Translated Button */}
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Lado Derecho: Imagen de Perfil con Aura */}
        <motion.div
          className="md:w-1/2 flex justify-center mb-8 md:mb-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={ProfileImage}
            alt="Perfil de Vic" // Translated alt text
            className="w-80 h-80 object-cover rounded-full shadow-2xl border-4 border-primary"
            variants={auraVariants}
            animate="idle"
            whileHover="hover"
            loading="eager" // Mantenido eager para rendimiento LCP
          />
        </motion.div>
      </div>
    </header>
  );
};


const IndexPage = () => {
  return (
    <>
      <Navbar />
      <HeroSplitScreen />

      {/* Sección: ¿Por Qué Aprender Con Nosotros? */}
      <section id="whylearnwithus" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            ¿Por qué aprender español con nosotros? {/* Translated Heading */}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Característica 1 */}
            <motion.div
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {/* Icono */}
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enfoque Personalizado</h3> {/* Translated Feature Title */}
              <p className="text-gray-600">Lecciones adaptadas a tus metas, intereses y estilo de aprendizaje.</p> {/* Translated Feature Description */}
            </motion.div>
            {/* Característica 2 */}
            <motion.div
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                 {/* Icono */}
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Horario Flexible</h3> {/* Translated Feature Title */}
              <p className="text-gray-600">Reserva clases cuando te funcione: mañanas, tardes o fines de semana.</p> {/* Translated Feature Description */}
            </motion.div>
            {/* Característica 3 */}
             <motion.div
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                 {/* Icono */}
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Inmersión Cultural</h3> {/* Translated Feature Title */}
              <p className="text-gray-600">Aprende español auténtico con perspectivas culturales de Sudamérica.</p> {/* Translated Feature Description */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección: Conoce al Equipo */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Conoce a tus guías para la Fluidez {/* Translated Heading */}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {equipo.map((miembro, index) => ( // team -> equipo, member -> miembro
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-4">
                  <img
                    src={miembro.imagen} // member.image -> miembro.imagen
                    alt={miembro.nombre} // member.name -> miembro.nombre
                    className="w-36 h-36 object-cover rounded-full border-4 border-primary/30 mx-auto"
                    loading="lazy" // Mantenido lazy loading
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-primary/40 transition-all"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{miembro.nombre}</h3> {/* member.name -> miembro.nombre */}
                <p className="text-primary font-semibold mb-3">{miembro.cargo}</p> {/* member.title -> miembro.cargo */}
                <p className="text-gray-600 mb-4 italic">"{miembro.cita}"</p> {/* member.quote -> miembro.cita */}
                <p className="text-gray-600 text-sm">{miembro.bio}</p> {/* member.bio -> miembro.bio */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Nuestra Filosofía */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/images/group-talking-fluently.jpg"
              alt="Aprendizaje interactivo de español" // Sin cambios
              className="rounded-xl shadow-xl w-full h-auto group-hover:opacity-95 transition-opacity"
              loading="lazy" // Sin cambios
            />
            <div className="absolute -inset-3 border-2 border-primary/20 rounded-xl pointer-events-none group-hover:border-primary/40 transition-all duration-300"></div>
          </motion.div>
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Nuestra Filosofía de Fluidez</h2> {/* Sin cambios */}
            <p className="text-lg text-gray-700">
              Creemos que la fluidez florece cuando conectas el idioma con la vida real. Nuestra metodología única no se trata de perfección; se trata de progreso y la valentía para comunicarte. {/* Sin cambios */}
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span><span className="font-semibold">Base académica:</span> Combinamos teorías pedagógicas probadas con conversaciones auténticas y adaptadas a contextos culturales reales para un aprendizaje completo y efectivo.</span> {/* Actualizado desde /about */}
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span><span className="font-semibold">Práctica inmersiva:</span> Incorporando la experiencia real de Vic en Latinoamérica para conversaciones auténticas.</span> {/* Sin cambios */}
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">✓</span>
                <span><span className="font-semibold">Enfoque centrado en la persona:</span> Creando un espacio de apoyo donde los errores se convierten en oportunidades de aprendizaje.</span> {/* Sin cambios */}
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Sección: Planes */}
      <section id="plans" className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Planes Pensados Para Ti {/* Translated Heading */}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {planes.map((plan, index) => ( // plans -> planes
              <motion.div
                key={index}
                onClick={() =>
                  navigate(`/plans?plan=${encodeURIComponent(plan.titulo)}`) // Use translated title in URL if the target page expects it
                }
                className="bg-white border rounded-md p-6 shadow-md hover:shadow-lg transition cursor-pointer flex flex-col"
                whileHover={{ y: -5 }}
              >
                <img
                  src={plan.imagen} // plan.image -> plan.imagen
                  alt={plan.titulo} // plan.title -> plan.titulo
                  className="w-full h-48 object-cover rounded-md mb-4"
                  loading="lazy" // Mantenido lazy loading
                />
                <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{plan.titulo}</h3> {/* plan.title -> plan.titulo */}
                    {plan.nuevoPrecio ? ( // plan.newPrice -> plan.nuevoPrecio
                    <p className="text-primary font-bold mb-2">
                        ${plan.nuevoPrecio} <span className="text-sm">/{plan.frecuencia}</span> <br /> {/* plan.frequency -> plan.frecuencia */}
                        <span className="text-sm text-gray-600">{plan.sesionesPorSemana}</span> {/* Usamos directamente sesionesPorSemana */}
                    </p>
                    ) : (
                    <p className="text-primary font-bold mb-2">Precio Personalizado</p> // Custom Pricing
                    )}
                    <p className="text-gray-600 mb-4">{plan.descripcion}</p> {/* plan.description -> plan.descripcion */}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/plans?plan=${encodeURIComponent(plan.titulo)}`); // Use translated title in URL
                  }}
                  className="w-full mt-auto bg-primary text-white px-6 py-2 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                >
                  Ver Detalles {/* Translated Button */}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Sección: Cómo Funciona */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            Cómo Funciona {/* Translated Heading */}
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* Paso 1 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-4 md:p-6"
              whileHover={{ scale: 1.03 }}
            >
              <div className="bg-primary-lightest rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reserva Tu Prueba</h3> {/* Translated Step Title */}
              <p className="text-gray-600">Empieza con una clase de prueba por solo $5: una lección de muestra para que conozcas nuestro estilo.</p> {/* Translated Step Description */}
            </motion.div>
            {/* Separador Flecha */}
            <div className="hidden md:block self-center mx-4">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
             {/* Separador Flecha para Móvil */}
            <div className="block md:hidden self-center my-4 transform rotate-90">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Paso 2 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-4 md:p-6"
              whileHover={{ scale: 1.03 }}
            >
               <div className="bg-primary-lightest rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Obtén Tu Plan</h3> {/* Translated Step Title */}
              <p className="text-gray-600">Define tus metas, crearemos un plan y horario personalizados.</p> {/* Translated Step Description */}
            </motion.div>
             {/* Separador Flecha */}
            <div className="hidden md:block self-center mx-4">
               <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Separador Flecha para Móvil */}
            <div className="block md:hidden self-center my-4 transform rotate-90">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            {/* Paso 3 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-4 md:p-6"
              whileHover={{ scale: 1.03 }}
            >
               <div className="bg-primary-lightest rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Empieza a Aprender</h3> {/* Translated Step Title */}
              <p className="text-gray-600">Comienza tu camino hacia la fluidez.</p> {/* Translated Step Description */}
            </motion.div>
          </div>
        </div>
      </section>


      {/* Sección de Apoyo */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-500">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {/* Elementos decorativos */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white rounded-full opacity-10"></div>
            <div className="absolute -left-5 -bottom-5 w-40 h-40 bg-white rounded-full opacity-5"></div>

            {/* Contenedor de contenido */}
            <div className="relative bg-white bg-opacity-95 backdrop-blur-sm p-8 md:p-10 border border-white border-opacity-60 rounded-xl shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Parte de texto */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    ¿Deseas apoyar este proyecto? {/* Translated Heading */}
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    Apoya nuestra escuela y ayúdanos a continuar brindando educación de idiomas de calidad. {/* Translated Paragraph */}
                  </p>
                </div>

                {/* Botón CTA */}
                <Link
                  to="/supportUs" // La ruta probablemente permanece igual
                  className="whitespace-nowrap flex-shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  ¿Cómo apoyar? {/* Translated Button */}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sección: Preguntas Frecuentes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Preguntas Frecuentes {/* Translated Heading */}
          </h2>
          <div className="space-y-4">
            {/* FAQ Items */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">¿Qué incluye la clase de prueba?</h3> {/* Translated Question */}
              <p className="text-gray-600 mt-2">La prueba incluye una evaluación de nivel, definición de objetivos y una lección de muestra para experimentar mi estilo de enseñanza. Es una excelente manera de ver si encajamos bien antes de comprometerte con un plan.</p> {/* Translated Answer */}
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">¿Qué materiales necesito?</h3> {/* Translated Question */}
              <p className="text-gray-600 mt-2">Solo una computadora con Zoom y un cuaderno. Proporciono todos los materiales de aprendizaje digitalmente, incluidos ejercicios, listas de vocabulario y recursos culturales.</p> {/* Translated Answer */}
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">¿Puedo cambiar mi plan más adelante?</h3> {/* Translated Question */}
              <p className="text-gray-600 mt-2">¡Sí! Los planes se pueden ajustar mensualmente según tu progreso y objetivos cambiantes.</p> {/* Translated Answer */}
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-lg text-gray-800">¿Cómo agendo las clases?</h3> {/* Translated Question */}
              <p className="text-gray-600 mt-2">Después de inscribirte, tendrás acceso a mi calendario en línea donde puedes reservar clases en los horarios que te funcionen, con la flexibilidad de reprogramar cuando sea necesario.</p> {/* Translated Answer */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección: Inicia Tu Viaje */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo/a para agendar tu primera sesión?</h2> {/* Translated Heading */}
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Da el primer paso hacia la fluidez con una clase de prueba personalizada por solo $5. {/* Translated Paragraph */}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signupTrial"> {/* La ruta probablemente permanece igual */}
              <motion.button
                className="bg-white text-primary px-8 py-3 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                RESERVA TU CLASE DE PRUEBA {/* Translated Button */}
              </motion.button>
            </Link>
            <Link to="/plans"> {/* La ruta probablemente permanece igual */}
              <motion.button
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-bold shadow-sm hover:bg-white hover:text-primary transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Todos los Planes {/* Translated Button */}
              </motion.button>
            </Link>
          </div>
        </div>
      </section>


    <Footer /> {/* Asumiendo que Footer se traduce o maneja el idioma */}
    </>
  );
};

export default IndexPage;

// --- END OF FILE index.js (Spanish Version) ---