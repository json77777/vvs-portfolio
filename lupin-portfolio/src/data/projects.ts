export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "ember-studio",
    title: "EMBER STUDIO",
    subtitle: "Brand Identity",
    category: "Design",
    image: "/images/project-1.png",
    color: "#2a2a2a",
  },
  {
    id: "noir-collective",
    title: "NOIR COLLECTIVE",
    subtitle: "Visual Campaign",
    category: "Creative",
    image: "/images/project-2.png",
    color: "#3d3228",
  },
  {
    id: "azure-dynamics",
    title: "AZURE DYNAMICS",
    subtitle: "Product Film",
    category: "Production",
    image: "/images/project-3.png",
    color: "#1e2d3d",
  },
  {
    id: "velvet-maison",
    title: "VELVET MAISON",
    subtitle: "Art Direction",
    category: "Design",
    image: "/images/project-4.png",
    color: "#3d2a2a",
  },
  {
    id: "prism-digital",
    title: "PRISM DIGITAL",
    subtitle: "Motion Design",
    category: "Post-production",
    image: "/images/project-5.png",
    color: "#2d2a3d",
  },
  {
    id: "solstice-beauty",
    title: "SOLSTICE BEAUTY",
    subtitle: "Commercial",
    category: "Production",
    image: "/images/project-6.png",
    color: "#28352a",
  },
  {
    id: "lunar-forge",
    title: "LUNAR FORGE",
    subtitle: "SaaS Explainer",
    category: "Creative",
    image: "/images/project-1.png",
    color: "#2a3d2d",
  },
  {
    id: "obsidian-media",
    title: "OBSIDIAN MEDIA",
    subtitle: "Music Video",
    category: "Production",
    image: "/images/project-2.png",
    color: "#3d2a38",
  },
  {
    id: "zenith-brands",
    title: "ZENITH BRANDS",
    subtitle: "Reel Package",
    category: "Post-production",
    image: "/images/project-3.png",
    color: "#2d3a3d",
  },
  {
    id: "aurora-labs",
    title: "AURORA LABS",
    subtitle: "Brand Film",
    category: "Design",
    image: "/images/project-4.png",
    color: "#3d352a",
  },
];

export const services = [
  {
    number: "01",
    title: "Design",
    items: ["Subtitles", "Thumbnail Creation", "Custom Posters", "Visual Style Guides", "Branding Packages"],
  },
  {
    number: "02",
    title: "Creative",
    items: ["SaaS Explainer Concepts", "Motion Graphics", "Sound Design", "Creative Concepting", "Storyboarding"],
  },
  {
    number: "03",
    title: "Production",
    items: ["Content Creation", "Videography", "Source File Preparation", "Project Management", "Quality Control"],
  },
  {
    number: "04",
    title: "Post-production",
    items: ["Advanced Editing", "Color Grading", "Sound Mixing", "Revision Cycles", "Final Master Delivery"],
  },
];
