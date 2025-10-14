import { useLocation } from "react-router-dom";

export default function Footer() {


  // jeppa joggs skit dont touch
  const allowedPaths = ["/", "/products", "/about-us", "/login"];
  const pathName = useLocation().pathname;
  const isActive = (path: string) => pathName === path;


  return (
    <footer >
      kalv.png
    </footer>
  );
}
