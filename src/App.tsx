import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Alert from "./components/Alert";
import ProjectModal from "./components/ProjectModal";
import ListGroup from "./components/ListGroup";
import { projects } from "./data/projects";
import './index.css';

function App() {
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Ajouter la classe de transition
    document.body.classList.add('theme-transition');
    
    // Retirer la classe après la transition
    const timeout = setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 300); // Correspond à --transition-duration

    return () => clearTimeout(timeout);
  }, [isDarkMode]);

  const competencesReact = [
    "Composants Fonctionnels",
    "Hooks (useState, useEffect)",
    "Props et State",
    "Gestion des événements",
    "Intégration Bootstrap",
    "Routing (React Router)",
    "Formulaires contrôlés"
  ];

  return (
    <div className="app-container">
      <NavBar onThemeToggle={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
      <div className="container mt-3">
        <section id="presentation" className="mb-5">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3>Benjamin Dassonville</h3>
              <p className="lead">Développeur en formation</p>
              <p>
                En formation pour l'obtention du BTS SIO SLAM, je me spécialise dans le
                développement d'applications web modernes avec React et TypeScript.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="/profile.jpg"
                alt="Photo de profil"
                className="img-fluid rounded-circle"
                style={{ maxWidth: "200px" }}
              />
            </div>
          </div>
        </section>

        <section id="competences" className="mb-5">
          <h2>Compétences acquises</h2>
          <ListGroup
            items={competencesReact}
            heading="Compétences React.js"
            onSelectItem={(item) => setActiveAlert(`Compétence sélectionnée : ${item}`)}
          />
        </section>

        <section id="projects" className="mb-5">
          <h2>Projets</h2>
          <div className="row g-4">
            {projects.map(project => (
              <div key={project.id} className="col-md-6 col-lg-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">{project.description}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      Voir le projet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedProject && (
          <ProjectModal
            isOpen={selectedProject !== null}
            onClose={() => setSelectedProject(null)}
            project={projects.find(p => p.id === selectedProject) || null}
            isDarkMode={isDarkMode}
          />
        )}

        {activeAlert && (
          <Alert onClose={() => setActiveAlert(null)}>
            {activeAlert}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default App;
