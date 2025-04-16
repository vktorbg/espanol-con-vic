// /src/pages/about.js (Spanish Version)
import React from "react";
import { Link } from "gatsby";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar"; // Asumiendo traducción o manejo de idioma
import Footer from "../components/Footer"; // Asumiendo traducción o manejo de idioma

// Datos del Equipo (Usando info de index.js y traducido)
const equipo = [ // team -> equipo
  {
    nombre: "Victor Briceño", // name -> nombre
    cargo: "Especialista en gramática y fluidez", // title -> cargo
    imagen: "/images/profile.png", // image -> imagen
    bio: "Profesor de Español y Literatura con un enfoque multicultural de enseñanza, con más de 7 años de práctica enseñando a personas de distintos países. Apasionado por enseñar lo más difícil de forma divertida.", // bio -> bio (traducido)
    cita: "Hacemos del español una parte vibrante de tu vida", // quote -> cita (traducido)
  },
  {
    nombre: "Elizabeth García", // name -> nombre
    cargo: "Lingüista y programadora educativa", // title -> cargo
    imagen: "/images/profile2.jpg", // image -> imagen
    bio: "Doctora en Educación y Magister en Lingüística aplicada a la enseñanza y aprendizaje de la lengua española e inglesa, con más de 25 años de experiencia como docente y programadora educativa", // bio -> bio (traducido)
    cita: "Conectando la teoría lingüística con la comunicación práctica", // quote -> cita (traducido)
  },
];

// Datos de Valores (Usando info de index.js y traducido)
const valores = [ // values -> valores
  {
    icono: "💬", // icon -> icono
    titulo: "Comunicación Auténtica", // title -> titulo
    desc: "Priorizamos interacciones reales sobre la gramática perfecta.", // desc -> desc
  },
  {
    icono: "🌈", // icon -> icono
    titulo: "Espacios Inclusivos", // title -> titulo
    desc: "Enseñanza culturalmente sensible y que afirma a la comunidad LGBTQ+.", // desc -> desc
  },
  {
    icono: "🔗", // icon -> icono
    titulo: "Conexión Comunitaria", // title -> titulo
    desc: "Vinculamos el aprendizaje de idiomas con la defensa de los derechos humanos.", // desc -> desc
  },
];

// Renombrado el componente para claridad en español
const PaginaSobreNosotros = () => { // AboutUsPage -> PaginaSobreNosotros
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Sección Hero - Título Actualizado */}
      <section
        className="relative bg-cover bg-center py-24 md:py-32 text-white"
        style={{ backgroundImage: "url('/images/hero-about.jpeg')" }} // Mantener ruta de imagen
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nuestra Historia: La Escuela de Fluidez {/* Translated Heading */}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Conoce a los profesores detrás de Español con Vic y descubre nuestro enfoque único para lograr la fluidez real en español. {/* Translated Paragraph */}
          </motion.p>
        </div>
      </section>

      {/* Sección Nuestra Misión */}
      <section className="py-16 lg:py-20 bg-white">
         <div className="max-w-4xl mx-auto px-6 text-center">
             <motion.h2
                className="text-3xl md:text-4xl font-bold text-primary mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
             >
                Más Que Solo Clases, Es un Viaje Hacia la Fluidez {/* Translated Heading */}
             </motion.h2>
             <motion.p
                className="text-lg text-gray-700 leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
             >
                Bienvenidos a Español con Vic, tu Escuela de Fluidez. Somos Victor y Elizabeth, un equipo unido por la pasión por el lenguaje y la creencia de que la verdadera fluidez proviene de la <span className="font-semibold text-gray-800">comunicación con confianza</span>, no solo de memorizar reglas. Combinamos décadas de experiencia educativa con vivencias multiculturales reales para crear un ambiente de aprendizaje donde te sientas empoderado/a para hablar español de forma natural y auténtica. {/* Translated Paragraph */}
             </motion.p>
         </div>
      </section>

      {/* Sección Conoce al Equipo */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Conoce a Tus Guías para la Fluidez {/* Translated Heading (Consistent with index.js) */}
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
                    loading="lazy" // Added lazy loading for below-the-fold images
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

       {/* Sección Nuestra Filosofía - Adaptada y Traducida */}
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
                  src="/images/group-talking-fluently.jpg" // Reutilizando imagen
                  alt="Aprendizaje interactivo de español" // Translated alt text
                  className="rounded-xl shadow-xl w-full h-auto group-hover:opacity-95 transition-opacity"
                  loading="lazy" // Added lazy loading
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
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Nuestra Filosofía de Fluidez</h2> {/* Translated Heading */}
                <p className="text-lg text-gray-700">
                  Creemos que la fluidez florece cuando conectas el idioma con la vida real. Nuestra metodología única no se trata de perfección; se trata de progreso y la valentía para comunicarte. {/* Translated Paragraph */}
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span><span className="font-semibold">Base académica:</span> Combinamos teorías pedagógicas probadas con conversaciones auténticas y adaptadas a contextos culturales reales para un aprendizaje completo y efectivo..</span> {/* Translated List Item */}
                  </li>
                  <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span><span className="font-semibold">Práctica inmersiva:</span> Incorporando la experiencia real de Vic en Latinoamérica para conversaciones auténticas.</span> {/* Translated List Item */}
                  </li>
                  <li className="flex items-start">
                      <span className="text-primary font-bold mr-2">✓</span>
                      <span><span className="font-semibold">Enfoque centrado en la persona:</span> Creando un espacio de apoyo donde los errores se convierten en oportunidades de aprendizaje.</span> {/* Translated List Item */}
                  </li>
                </ul>
            </motion.div>
         </div>
       </section>

      {/* Sección Nuestros Valores */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">Nuestro Compromiso Compartido</h2> {/* Translated Heading */}
          <div className="grid sm:grid-cols-3 gap-6">
            {valores.map((item, i) => ( // values -> valores
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, amount: 0.5 }}
                 transition={{ duration: 0.5, delay: i * 0.1 }}
                 whileHover={{ scale: 1.03, boxShadow: 'lg' }} // Changed shadow property name
              >
                <div className="text-4xl mb-4">{item.icono}</div> {/* item.icon -> item.icono */}
                <h4 className="font-bold text-lg mb-2 text-gray-800">{item.titulo}</h4> {/* item.title -> item.titulo */}
                <p className="text-gray-600 text-sm">{item.desc}</p> {/* item.desc -> item.desc */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Apoya Nuestra Visión */}
      {/* Using primary and secondary colors from tailwind config assumed */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-orange-500"> {/* Adjusted gradient to match index.js */}
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="relative bg-white bg-opacity-95 backdrop-blur-sm p-8 md:p-10 rounded-xl shadow-xl border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            {/* Elementos decorativos opcionales */}
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white rounded-full opacity-10 hidden md:block"></div> {/* Adjusted color */}
            <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white rounded-full opacity-5 hidden md:block"></div> {/* Adjusted color and assumed accent color */}

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 z-10">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  Ayuda a Crecer a Nuestra Escuela de Fluidez {/* Translated Heading */}
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mb-4 md:mb-0">
                  Español con Vic es un proyecto apasionado y autofinanciado construido por nosotros, Victor y Elizabeth. Tu apoyo nos ayuda directamente a mejorar nuestros recursos, llegar a más estudiantes y continuar ofreciendo educación de español personalizada y de alta calidad. {/* Translated Paragraph */}
                </p>
              </div>
              <Link
                to="/supportUs" // La ruta probablemente permanece igual
                className="whitespace-nowrap shrink-0 bg-primary hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Apoya Nuestra Visión {/* Translated Button */}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaginaSobreNosotros; // Export with the Spanish name