import { type Project } from '../data/projects';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  isDarkMode: boolean;
}

function ProjectModal({ isOpen, onClose, project, isDarkMode }: Props) {
  if (!isOpen || !project) return null;

  const ProjectComponent = project.component;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className={`modal-content ${isDarkMode ? 'bg-dark text-light' : ''}`}>
          <div className="modal-header">
            <h5 className="modal-title">{project.title}</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-4">
              <h6>Technologies utilisées :</h6>
              <div className="d-flex gap-2 flex-wrap">
                {project.technologies.map(tech => (
                  <span key={tech} className="badge bg-primary">{tech}</span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h6>Fonctionnalités :</h6>
              <ul>
                {project.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="border rounded p-3">
              <ProjectComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;