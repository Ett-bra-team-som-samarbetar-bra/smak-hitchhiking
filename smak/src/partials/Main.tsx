import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="py-3 whole-app-horizontal-padding">
      <Outlet />
    </main>
  );
}
