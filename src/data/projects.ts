import { ReactNode } from "react";
import TodoList from "../components/projects/TodoList";
import Counter from "../components/projects/Counter";
import QuoteGenerator from "../components/projects/QuoteGenerator";
import Clock from "../components/projects/Clock";
import CurrencyConverter from "../components/projects/CurrencyConverter";
import ContactForm from "../components/projects/ContactForm";
import ThemeSwitcher from "../components/projects/ThemeSwitcher";
import Weather from "../components/projects/Weather";
import Calculator from "../components/projects/Calculator";
import Timer from "../components/projects/Timer";
import Games from '../components/projects/Games';

export interface Project {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType;
  technologies: string[];
  features: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "To-Do List",
    description: "Gestionnaire de tâches avec persistance locale",
    component: TodoList,
    technologies: ["React", "TypeScript", "LocalStorage", "Bootstrap"],
    features: [
      "Ajout de tâches",
      "Suppression de tâches",
      "Marquage comme complété",
      "Persistance dans localStorage",
    ],
  },
  {
    id: 2,
    title: "Compteur",
    description: "Compteur interactif avec animations",
    component: Counter,
    technologies: ["React", "TypeScript", "CSS Animations", "LocalStorage"],
    features: [
      "Incrémentation/Décrémentation",
      "Remise à zéro",
      "Animations fluides",
      "Persistance du compteur",
    ],
  },
  {
    id: 3,
    title: "Générateur de Citations",
    description: "Générateur de citations aléatoires avec API",
    component: QuoteGenerator,
    technologies: [
      "React",
      "TypeScript",
      "Fetch API",
      "Async/Await",
      "Error Handling"
    ],
    features: [
      "Citations aléatoires",
      "Chargement asynchrone",
      "Gestion des erreurs",
      "Animations fluides",
      "Design responsive"
    ]
  },
  {
    id: 4,
    title: "Horloge en Temps Réel",
    description: "Horloge digitale avec format 12/24h configurable",
    component: Clock,
    technologies: [
      "React",
      "TypeScript",
      "CSS Animations",
      "LocalStorage",
      "Date API"
    ],
    features: [
      "Affichage en temps réel",
      "Format 12h/24h configurable",
      "Design moderne",
      "Animations fluides",
      "Persistance des préférences"
    ]
  },
  {
    id: 5,
    title: "Convertisseur de Devises",
    description: "Convertisseur de devises en temps réel avec API",
    component: CurrencyConverter,
    technologies: [
      "React",
      "TypeScript",
      "API Rest",
      "Async/Await",
      "Bootstrap"
    ],
    features: [
      "Conversion en temps réel",
      "Multiple devises supportées",
      "Interface intuitive",
      "Gestion des erreurs",
      "Validation des entrées"
    ]
  },
  {
    id: 6,
    title: "Formulaire de Contact",
    description: "Formulaire avec validation TypeScript et retour visuel",
    component: ContactForm,
    technologies: [
      "React",
      "TypeScript",
      "Form Validation",
      "Bootstrap",
      "Regex"
    ],
    features: [
      "Validation des champs en temps réel",
      "Messages d'erreur personnalisés",
      "Gestion des états du formulaire",
      "Design responsive",
      "Retour visuel des actions"
    ]
  },
  {
    id: 7,
    title: "Theme Switcher",
    description: "Sélecteur de thème avec prévisualisation et persistance",
    component: ThemeSwitcher,
    technologies: [
      "React",
      "TypeScript",
      "CSS Variables",
      "LocalStorage",
      "CSS Grid"
    ],
    features: [
      "Thèmes multiples",
      "Prévisualisation en direct",
      "Persistance des préférences",
      "Transitions fluides",
      "Interface responsive"
    ]
  },
  {
    id: 8,
    title: "Météo par Ville",
    description: "Application météo utilisant l'API OpenWeather",
    component: Weather,
    technologies: [
      "React",
      "TypeScript",
      "API OpenWeather",
      "Axios",
      "Bootstrap"
    ],
    features: [
      "Recherche par ville",
      "Affichage détaillé de la météo",
      "Gestion des erreurs",
      "Interface responsive",
      "Animations fluides"
    ]
  },
  {
    id: 9,
    title: "Calculatrice",
    description: "Calculatrice interactive avec historique",
    component: Calculator,
    technologies: [
      "React",
      "TypeScript",
      "CSS Grid",
      "State Management",
      "Event Handling"
    ],
    features: [
      "Opérations de base",
      "Historique des calculs",
      "Design responsive",
      "Support thème sombre",
      "Animations des touches"
    ]
  },
  {
    id: 10,
    title: "Chronomètre/Minuteur",
    description: "Chronomètre et minuteur avec alertes sonores",
    component: Timer,
    technologies: [
      "React",
      "TypeScript",
      "useEffect Hook",
      "Interval Management",
      "Audio API"
    ],
    features: [
      "Mode chronomètre",
      "Mode minuteur",
      "Pause/Reprise",
      "Alerte sonore",
      "Design responsive"
    ]
  },
  {
    id: 11,
    title: "Mini-Jeux",
    description: "Collection de jeux classiques",
    component: Games,
    technologies: [
      "React",
      "TypeScript",
      "State Management",
      "CSS Grid",
      "LocalStorage"
    ],
    features: [
      "Memory",
      "Morpion",
      "Snake",
      "Scores",
      "Interface intuitive"
    ]
  }
].filter(Boolean);