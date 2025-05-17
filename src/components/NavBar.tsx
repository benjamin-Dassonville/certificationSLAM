interface Props {
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

function NavBar({ onThemeToggle, isDarkMode }: Props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Portfolio React</a>
        <button 
          className="btn btn-outline-light ms-auto"
          onClick={onThemeToggle}
        >
          {isDarkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;