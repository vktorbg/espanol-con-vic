// --- START OF FILE index.js (Spanish Version - Responsiveness Improved) ---

import React from "react";
import { Link, navigate } from "gatsby";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Images
const ProfileImage = "/images/profile.png";
const ProfileImage2 = "/images/profile2.jpg";
const HeroBackground = "/images/hero-background.jpeg";

const planes = [
  // ... (planes data remains the same)
  {
    titulo: "Clases Individuales",
    nuevoPrecio: "20",
    frecuencia: "clase",
    descripcion: "Clases de español con pago flexible por sesión y total adaptabilidad.",
    imagen: "/images/plan3.jpg",
    personalizado: true,
    sesionesPorSemana: "Horario flexible",
    caracteristicas: [
      "Sesiones personalizadas de 1 hora",
      "Horario flexible",
      "Sin compromiso a largo plazo",
      "Adaptado a tus necesidades inmediatas",
    ],
  },
  {
    titulo: "Plan Confianza",
    nuevoPrecio: 120,
    frecuencia: "mes (25% desc.)",
    descripcion: "Impulsa tu confianza con constancia.",
    imagen: "/images/plan1.jpg",
    sesionesPorSemana: "2 sesiones por semana",
    caracteristicas: [
      "2 clases por semana (8/mes)",
      "Enfoque conversacional",
      "$15 por clase (25% de ahorro)",
      "Feedback y correcciones personalizadas",
    ],
  },
  {
    titulo: "Plan Fluidez",
    nuevoPrecio: 220,
    frecuencia: "mes (30% desc.)",
    descripcion: "Práctica intensiva para un progreso rápido.",
    imagen: "/images/plan2.jpg",
    sesionesPorSemana: "4 sesiones por semana",
    caracteristicas: [
      "4 clases por semana (16/mes)",
      "Enfoque inmersivo",
      "$13.75 por clase (30% de ahorro)",
      "Reportes de progreso mensuales",
      "Feedback y correcciones personalizadas",
    ],
  },
];

const equipo = [
  // ... (equipo data remains the same)
  {
    nombre: "Victor Briceño",
    cargo: "Especialista en Gramática y Fluidez",
    cita: "Hacemos del español una parte vibrante de tu vida",
    bio: "Profesor de Español y Literatura con un enfoque multicultural de enseñanza, con más de 7 años de práctica enseñando a personas de distintos países. Apasionado por enseñar lo más difícil de forma divertida.",
    imagen: "/images/profile.png",
  },
  {
    nombre: "Elizabeth García",
    cargo: "Lingüista y Programadora Educativa",
    cita: "Conectando la teoría lingüística con la comunicación práctica",
    bio: "Doctora en Educación y Magister en Lingüística aplicada a la enseñanza y aprendizaje de la lengua española e inglesa, con más de 25 años de experiencia como docente y programadora educativa.",
    imagen: "/images/profile2.jpg",
  },
];

// Function remains the same
const obtenerSesionesPorSemana = (plan) => {
  const mapeoSesiones = {
    Confianza: 2,
    "Plan Fluidez": 4,
  };
  return mapeoSesiones[plan.titulo]
    ? `${mapeoSesiones[plan.titulo]} sesiones por semana`
    : plan.personalizado
    ? "Horario flexible"
    : "";
};

// Animation variants remain the same
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

// Componente HeroSplitScreen con mejoras de responsividad
const HeroSplitScreen = () => {
  return (
    <header className="relative text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HeroBackground}
          alt="Escena Callejera de Medellín"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Adjusted padding: px-4 base, px-6 sm+, py-16 base, py-20 md+, py-24 lg+ */}
      <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 py-16 md:py-20 lg:py-24">
        {/* Left Side: Text Content */}
        <motion.div
          // Removed md:mr-8, gap handled by parent container or use gap class if needed
          className="md:w-1/2 flex flex-col items-center text-center md:items-start md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Adjusted heading size: text-4xl base, text-5xl md+ */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Escuela Online de Fluidez en Español
          </h1>
          {/* Adjusted tagline size: text-base base, text-lg sm+ */}
          <p className="text-secondary text-base sm:text-lg font-regular mb-8">
            Desarrolla habilidades de conversación y la confianza para usar tu Español en cualquier lugar.
          </p>

          {/* Buttons: Stack vertically on mobile, row on sm+. Adjusted text size and padding. */}
          <div className="w-full flex flex-col sm:flex-row justify-center md:justify-start items-center sm:space-x-4 space-y-4 sm:space-y-0">
            <Link to="#plans" className="w-full sm:w-auto">
              <motion.button
                // Adjusted text size and padding
                className="w-full sm:w-auto bg-primary text-white text-base md:text-lg px-6 py-3 rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explora nuestros planes
              </motion.button>
            </Link>
            <Link to="/signupTrial" className="w-full sm:w-auto">
              <motion.button
                 // Adjusted text size and padding
                className="w-full sm:w-auto bg-white text-primary border border-primary text-base md:text-lg px-6 py-3 rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ¡Obtén tu clase de prueba!
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Side: Profile Image */}
        <motion.div
          // Added pl-0 md:pl-8 to create space on larger screens
          className="md:w-1/2 flex justify-center mb-8 md:mb-0 md:pl-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={ProfileImage}
            alt="Perfil de Vic"
             // Adjusted image size: w-64/h-64 base, w-72/h-72 sm+, w-80/h-80 md+
            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-primary"
            variants={auraVariants}
            animate="idle"
            whileHover="hover"
            loading="eager"
          />
        </motion.div>
      </div>
    </header>
  );
};


const IndexPage = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" href="/images/Logo-libro.png" type="image/png" />
        <title>Spanish Fluency School</title>
      </Helmet>
      <Navbar />
      <HeroSplitScreen />

      {/* Section: Why Learn With Us */}
      {/* Adjusted padding: py-12 base, py-16 md+ */}
      <section id="whylearnwithus" className="py-12 md:py-16 bg-white">
         {/* Adjusted padding: px-4 base, px-6 sm+ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Adjusted heading size and margin */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12 text-center">
            ¿Por qué aprender español con nosotros?
          </h2>
           {/* Adjusted gap: gap-6 base, gap-8 md+ */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Feature 1 */}
            <motion.div
              // Adjusted padding: p-4 base, p-6 sm+
              className="text-center p-4 sm:p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              {/* Icon size adjusted slightly if needed, w-14 h-14 base? Keeping w-16 h-16 for now */}
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
               {/* Title size adjusted: text-lg base, text-xl md+ */}
              <h3 className="text-lg md:text-xl font-semibold mb-2">Enfoque Personalizado</h3>
               {/* Text size adjusted: text-sm base, text-base sm+ */}
              <p className="text-gray-600 text-sm sm:text-base">Lecciones adaptadas a tus metas, intereses y estilo de aprendizaje.</p>
            </motion.div>
            {/* Feature 2 */}
            <motion.div
              className="text-center p-4 sm:p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Horario Flexible</h3>
              <p className="text-gray-600 text-sm sm:text-base">Reserva clases cuando te funcione: mañanas, tardes o fines de semana.</p>
            </motion.div>
            {/* Feature 3 */}
             <motion.div
              className="text-center p-4 sm:p-6 hover:bg-gray-50 rounded-lg transition"
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Inmersión Cultural</h3>
              <p className="text-gray-600 text-sm sm:text-base">Aprende español auténtico con perspectivas culturales de Sudamérica.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Meet the Team */}
      {/* Adjusted padding */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
         {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Adjusted heading size and margin */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-primary mb-8 md:mb-12">
            Conoce a tus guías para la Fluidez
          </h2>
          {/* Adjusted gap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {equipo.map((miembro, index) => (
              <motion.div
                key={index}
                // Adjusted padding
                className="bg-white p-4 sm:p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative mb-4">
                   {/* Image size adjusted slightly if needed: w-32 h-32 base? Keeping w-36 h-36 */}
                  <img
                    src={miembro.imagen}
                    alt={miembro.nombre}
                    className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full border-4 border-primary/30 mx-auto"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent hover:border-primary/40 transition-all"></div>
                </div>
                {/* Text sizes adjusted slightly */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{miembro.nombre}</h3>
                <p className="text-primary font-semibold mb-3 text-sm sm:text-base">{miembro.cargo}</p>
                <p className="text-gray-600 mb-4 italic text-sm sm:text-base">"{miembro.cita}"</p>
                <p className="text-gray-600 text-xs sm:text-sm">{miembro.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Our Philosophy */}
      {/* Adjusted padding */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Div */}
           <motion.div
            className="relative group order-1 md:order-1" // Ensure image is first on mobile if desired
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
             {/* Added max-h-[...] to prevent image getting too tall on some aspect ratios */}
            <img
              src="/images/group-talking-fluently.jpg"
              alt="Aprendizaje interactivo de español"
              className="rounded-xl shadow-xl w-full h-auto max-h-[400px] md:max-h-none object-cover group-hover:opacity-95 transition-opacity"
              loading="lazy"
            />
            <div className="absolute -inset-2 sm:-inset-3 border-2 border-primary/20 rounded-xl pointer-events-none group-hover:border-primary/40 transition-all duration-300"></div>
          </motion.div>
           {/* Text Div */}
          <motion.div
            className="space-y-4 md:space-y-5 order-2 md:order-2" // Ensure text is second on mobile if desired
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            {/* Adjusted heading size */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">Nuestra Filosofía de Fluidez</h2>
            {/* Adjusted text size */}
            <p className="text-base md:text-lg text-gray-700">
              Creemos que la fluidez florece cuando conectas el idioma con la vida real. Nuestra metodología única no se trata de perfección; se trata de progreso y la valentía para comunicarte.
            </p>
             {/* Adjusted list text size */}
            <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1">✓</span> {/* Added mt-1 for alignment */}
                <span><span className="font-semibold">Base académica:</span> Combinamos teorías pedagógicas probadas con conversaciones auténticas y adaptadas a contextos culturales reales para un aprendizaje completo y efectivo.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1">✓</span>
                <span><span className="font-semibold">Práctica inmersiva:</span> Incorporando la experiencia real de Vic en Latinoamérica para conversaciones auténticas.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2 mt-1">✓</span>
                <span><span className="font-semibold">Enfoque centrado en la persona:</span> Creando un espacio de apoyo donde los errores se convierten en oportunidades de aprendizaje.</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Section: Plans */}
      {/* Adjusted padding */}
      <section id="plans" className="py-12 md:py-16 bg-gray-100">
        {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
           {/* Adjusted heading size */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center">
            Planes Pensados Para Ti
          </h2>
           {/* Adjusted gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Changed md:grid-cols-3 to lg:grid-cols-3 for better spacing on medium tablets */}
            {planes.map((plan, index) => (
              <motion.div
                key={index}
                onClick={() =>
                  navigate(`/plans?plan=${encodeURIComponent(plan.titulo)}`)
                }
                // Adjusted padding
                className="bg-white border rounded-md p-4 sm:p-6 shadow-md hover:shadow-lg transition cursor-pointer flex flex-col"
                whileHover={{ y: -5 }}
              >
                <img
                  src={plan.imagen}
                  alt={plan.titulo}
                   // Fixed height for consistency, object-cover handles aspect ratio
                  className="w-full h-40 sm:h-48 object-cover rounded-md mb-4"
                  loading="lazy"
                />
                <div className="flex-grow mb-4"> {/* Added mb-4 to ensure space before button */}
                    {/* Adjusted title size */}
                    <h3 className="text-lg md:text-xl font-semibold mb-2">{plan.titulo}</h3>
                    {plan.nuevoPrecio ? (
                    // Adjusted pricing text size
                    <p className="text-primary font-bold mb-2 text-base md:text-lg">
                        ${plan.nuevoPrecio} <span className="text-xs sm:text-sm">/{plan.frecuencia}</span> <br />
                        <span className="text-xs sm:text-sm text-gray-600">{plan.sesionesPorSemana}</span>
                    </p>
                    ) : (
                    <p className="text-primary font-bold mb-2 text-base md:text-lg">Precio Personalizado</p>
                    )}
                    {/* Adjusted description text size */}
                    <p className="text-gray-600 text-sm sm:text-base">{plan.descripcion}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/plans?plan=${encodeURIComponent(plan.titulo)}`);
                  }}
                   // Adjusted button padding and text size
                  className="w-full mt-auto bg-primary text-white px-5 py-2 text-sm md:text-base rounded-md font-bold shadow-md hover:bg-orange-600 transition"
                >
                  Ver Detalles
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Section: How It Works */}
      {/* Adjusted padding */}
      <section className="py-12 md:py-16 bg-white">
        {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
           {/* Adjusted heading size and margin */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 md:mb-12 text-center">
            Cómo Funciona
          </h2>
          {/* Adjusted items-center for better vertical alignment on mobile */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            {/* Step 1 */}
            <motion.div
              // Adjusted padding
              className="flex-1 flex flex-col items-center text-center p-3 md:p-4"
              whileHover={{ scale: 1.03 }}
            >
               {/* Adjusted circle size */}
              <div className="bg-primary-lightest rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-xl md:text-2xl">1</span>
              </div>
               {/* Adjusted title size */}
              <h3 className="text-lg md:text-xl font-semibold mb-2">Reserva Tu Prueba</h3>
               {/* Adjusted description size */}
              <p className="text-gray-600 text-sm sm:text-base">Empieza con una clase de prueba por solo $5: una lección de muestra para que conozcas nuestro estilo.</p>
            </motion.div>

             {/* Arrow Separators */}
            <div className="hidden md:block self-center mx-4 shrink-0"> {/* Added shrink-0 */}
              <svg className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
            <div className="block md:hidden self-center my-4 sm:my-6 shrink-0"> {/* Added shrink-0 */}
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /> {/* Changed to down arrow */}
              </svg>
            </div>

            {/* Step 2 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-3 md:p-4"
              whileHover={{ scale: 1.03 }}
            >
               <div className="bg-primary-lightest rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-xl md:text-2xl">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Obtén Tu Plan</h3>
              <p className="text-gray-600 text-sm sm:text-base">Define tus metas, crearemos un plan y horario personalizados.</p>
            </motion.div>

             {/* Arrow Separators */}
            <div className="hidden md:block self-center mx-4 shrink-0"> {/* Added shrink-0 */}
               <svg className="w-10 h-10 lg:w-12 lg:h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
             <div className="block md:hidden self-center my-4 sm:my-6 shrink-0"> {/* Added shrink-0 */}
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /> {/* Changed to down arrow */}
              </svg>
            </div>

            {/* Step 3 */}
            <motion.div
              className="flex-1 flex flex-col items-center text-center p-3 md:p-4"
              whileHover={{ scale: 1.03 }}
            >
               <div className="bg-primary-lightest rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center mb-3 md:mb-4 shadow-md border-2 border-primary/20">
                <span className="text-primary font-bold text-xl md:text-2xl">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Empieza a Aprender</h3>
              <p className="text-gray-600 text-sm sm:text-base">Comienza tu camino hacia la fluidez.</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Section: Support Us */}
      {/* Adjusted padding */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-orange-500">
         {/* Adjusted padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="relative overflow-hidden rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-10"></div>
            <div className="absolute -left-5 -bottom-5 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full opacity-5"></div>

            {/* Content Container */}
             {/* Adjusted padding */}
            <div className="relative bg-white bg-opacity-95 backdrop-blur-sm p-6 md:p-8 lg:p-10 border border-white border-opacity-60 rounded-xl shadow-lg">
               {/* Adjusted gap */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                {/* Text Part */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                   {/* Adjusted heading size */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    ¿Deseas apoyar este proyecto?
                  </h3>
                  {/* Adjusted text size */}
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                    Apoya nuestra escuela y ayúdanos a continuar brindando educación de idiomas de calidad.
                  </p>
                </div>

                {/* CTA Button */}
                <Link
                  to="/supportUs"
                  // Added w-full sm:w-auto for mobile stacking, adjusted padding/text size
                  className="w-full sm:w-auto whitespace-nowrap flex-shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-6 py-3 text-base md:text-lg rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  ¿Cómo apoyar?
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section: FAQ */}
      {/* Adjusted padding */}
      <section className="py-12 md:py-16 bg-gray-50">
        {/* Adjusted padding */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Adjusted heading size and margin */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8 text-center">
            Preguntas Frecuentes
          </h2>
           {/* Adjusted spacing */}
          <div className="space-y-3 sm:space-y-4">
            {/* FAQ Items */}
            <motion.div
              // Adjusted padding
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Adjusted text size */}
              <h3 className="font-semibold text-base md:text-lg text-gray-800">¿Qué incluye la clase de prueba?</h3>
              {/* Adjusted text size */}
              <p className="text-gray-600 mt-2 text-sm sm:text-base">La prueba incluye una evaluación de nivel, definición de objetivos y una lección de muestra para experimentar mi estilo de enseñanza. Es una excelente manera de ver si encajamos bien antes de comprometerte con un plan.</p>
            </motion.div>
             {/* Repeat adjustments for other FAQ items */}
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-base md:text-lg text-gray-800">¿Qué materiales necesito?</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Solo una computadora con Zoom y un cuaderno. Proporciono todos los materiales de aprendizaje digitalmente, incluidos ejercicios, listas de vocabulario y recursos culturales.</p>
            </motion.div>
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-base md:text-lg text-gray-800">¿Puedo cambiar mi plan más adelante?</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">¡Sí! Los planes se pueden ajustar mensualmente según tu progreso y objetivos cambiantes.</p>
            </motion.div>
            <motion.div
              className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200"
              whileHover={{ scale: 1.01, boxShadow: "0 4px 10px rgba(0,0,0, 0.08)"}}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="font-semibold text-base md:text-lg text-gray-800">¿Cómo agendo las clases?</h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Después de inscribirte, tendrás acceso a mi calendario en línea donde puedes reservar clases en los horarios que te funcionen, con la flexibilidad de reprogramar cuando sea necesario.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Start Your Journey CTA */}
      {/* Adjusted padding */}
      <section className="py-12 md:py-16 bg-primary text-white">
         {/* Adjusted padding */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
           {/* Adjusted heading size */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">¿Listo/a para agendar tu primera sesión?</h2>
           {/* Adjusted text size and margin */}
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Da el primer paso hacia la fluidez con una clase de prueba personalizada por solo $5.
          </p>
           {/* Layout stacks vertically by default, sm:flex-row added */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4"> {/* Added items-center */}
            <Link to="/signupTrial" className="w-full sm:w-auto"> {/* Added w-full sm:w-auto */}
              <motion.button
                 // Adjusted padding and text size
                className="w-full sm:w-auto bg-white text-primary px-6 py-3 text-base md:text-lg rounded-md font-bold shadow-md hover:bg-gray-100 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                RESERVA TU CLASE DE PRUEBA
              </motion.button>
            </Link>
            <Link to="/plans" className="w-full sm:w-auto"> {/* Added w-full sm:w-auto */}
              <motion.button
                 // Adjusted padding and text size
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 py-3 text-base md:text-lg rounded-md font-bold shadow-sm hover:bg-white hover:text-primary transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Todos los Planes
              </motion.button>
            </Link>
          </div>
        </div>
      </section>


    <Footer />
    </>
  );
};

export default IndexPage;

// --- END OF FILE index.js (Spanish Version - Responsiveness Improved) ---