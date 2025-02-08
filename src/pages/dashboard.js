import React, { useEffect, useState } from 'react';
import { navigate, graphql, useStaticQuery } from 'gatsby';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import ProtectedRoute from '../components/ProtectedRoute';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [progress, setProgress] = useState([]);

  const data = useStaticQuery(graphql`
    query {
      allContentfulResource {
        nodes {
          title
          description {
            description
          }
          url
        }
      }
    }
  `);

  useEffect(() => {
    if (!user) return;
    const fetchProgress = async () => {
      try {
        const progressSnapshot = await db
          .collection('students')
          .doc(user.uid)
          .collection('progress')
          .orderBy('date', 'desc')
          .get();

        setProgress(progressSnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error('❌ Error obteniendo progreso:', error);
      }
    };

    fetchProgress();
  }, [user]);

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800">Bienvenido, {user?.displayName || 'Estudiante'}</h1>
        <p className="text-gray-600">{user.email}</p>

        <h2 className="text-2xl font-semibold mt-6">📚 Recursos de Aprendizaje</h2>
        <ul className="mt-4 space-y-2">
          {data.allContentfulResource.nodes.map((resource, index) => (
            <li key={index} className="border p-3 rounded-md shadow-sm hover:bg-gray-100 transition">
              <strong>{resource.title}</strong> - {resource.description.description}
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary ml-2">
                Ver recurso
              </a>
            </li>
          ))}
        </ul>

        <button onClick={logout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
          Cerrar sesión
        </button>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
