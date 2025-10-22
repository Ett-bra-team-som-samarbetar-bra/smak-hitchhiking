import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="py-3 whole-app-horizontal-padding whole-app-horizontal-width m-auto w-100">
      <Outlet />
    </main>
  );
}
