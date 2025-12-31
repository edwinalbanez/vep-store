import {
  BookOpen,
  Folder,
  LayoutGrid,
  List,
  Star
} from "lucide-react";

const navGroups = [
  {
    title: "Plataforma",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutGrid,
      },
      {
        title: "Marcas",
        href: "/brands",
        icon: Star,
      },
      {
        title: "Categorías",
        href: "/categories",
        icon: List,
      },
    ],
  }
];

export { navGroups };
