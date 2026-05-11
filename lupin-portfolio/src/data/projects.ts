export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  color: string;
  videoHover?: string;
  youtubeId?: string;
}

export const projects: Project[] = [
  {
    id: "tasm",
    title: "TASM",
    subtitle: "Movie Edit",
    category: "Design",
    image: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778427031/TASM_Once_Again_prob3_zvfh12.jpg",
    color: "#2a2a2a",
    videoHover: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778427031/TASM_Once_Again_prob3_zvfh12.mp4",
  },
  {
    id: "alice-borderland-rei",
    title: "ALICE IN BORDERLAND",
    subtitle: "Anime Edit",
    category: "Creative",
    image: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778441272/Rei_n4bw7t.jpg",
    color: "#2a2a3d",
    videoHover: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778441272/Rei_n4bw7t.mp4",
  },
  {
    id: "memelander",
    title: "MEMELANDER",
    subtitle: "Meme Edit",
    category: "Creative",
    image: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778441695/Memelander_eaxs5a.jpg",
    color: "#3d3228",
    videoHover: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778441695/Memelander_eaxs5a.mp4",
  },
  {
    id: "ready-player-one",
    title: "READY PLAYER ONE",
    subtitle: "Movie Edit",
    category: "Creative",
    image: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778442270/Ready_Player_One_cvhrpw.jpg",
    color: "#2a2a3d",
    videoHover: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778442270/Ready_Player_One_cvhrpw.mp4",
  },
  {
    id: "sadie-sink",
    title: "SADIE SINK",
    subtitle: "Celebrity Edit",
    category: "Creative",
    image: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778481661/Sadie_Sink_pn3oj6.jpg",
    color: "#2a3d2d",
    videoHover: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778481661/Sadie_Sink_pn3oj6.mp4",
  },
  {
    id: "se7en",
    title: "SE7EN",
    subtitle: "Movie Edit",
    category: "Creative",
    image: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778484866/se7en_tppk8u.jpg",
    color: "#3d352a",
    videoHover: "https://res.cloudinary.com/dxvpm6xhq/video/upload/v1778484866/se7en_tppk8u.mp4",
  },
];

/* Works page projects — separate from the homepage carousel */
export const worksProjects: Project[] = [
  {
    id: "berserk-poster",
    title: "BERSERK POSTER",
    subtitle: "Poster Design",
    category: "Design",
    image: "https://res.cloudinary.com/dxvpm6xhq/image/upload/v1778493775/Berserk_Poster_mpkpit.png",
    color: "#2a2a2a",
  },
  {
    id: "woodland-poster",
    title: "WOODLAND POSTER",
    subtitle: "Poster Design",
    category: "Design",
    image: "https://res.cloudinary.com/dxvpm6xhq/image/upload/v1778496117/Woodland_poster_d9zwfo.png",
    color: "#2a3d2a",
  },
  {
    id: "camping-poster",
    title: "CAMPING POSTER",
    subtitle: "Poster Design",
    category: "Design",
    image: "https://res.cloudinary.com/dxvpm6xhq/image/upload/v1778497222/Camping_Poster_n2p3vl.png",
    color: "#2a2a3d",
  },
  {
    id: "food-poster",
    title: "FOOD POSTER",
    subtitle: "Poster Design",
    category: "Design",
    image: "https://res.cloudinary.com/dxvpm6xhq/image/upload/v1778497282/Food_poster_box_bfga6i.png",
    color: "#3d2a2a",
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
