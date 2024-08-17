import { Outlet } from "react-router-dom";

export function AuthTemplate() {
  return (
    <div>
      <h1>Autenticação</h1>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
