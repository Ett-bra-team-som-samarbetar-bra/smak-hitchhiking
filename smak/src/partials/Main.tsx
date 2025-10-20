import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="p-3">
      <Outlet />
    </main>
  );
}
