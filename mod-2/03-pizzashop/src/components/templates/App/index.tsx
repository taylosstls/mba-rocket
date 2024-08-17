import { Outlet } from "react-router-dom";

export function AppTemplate() {
  return (
    <div>
      <h1>Cabeçalho</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
