import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-[100dvh] bg-black flex justify-center">
      <main className="w-full max-w-[375px] bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
