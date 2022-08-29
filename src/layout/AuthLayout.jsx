import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
        <main className="container mx-auto p-5 mt-12 md:grid md:grid-cols-2 gap-10 items-center">
          <Outlet/>
        </main>
    </>
  )
}

export default AuthLayout;