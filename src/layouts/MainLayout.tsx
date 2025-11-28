import LoadingSpinner from "@/components/common/LoadingSpinner";
import useGoogleAnalytics from "@/hooks/googleAnalytics/useGoogleAnalytics";
import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  useGoogleAnalytics();
  const { pathname } = useLocation();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div
      ref={scrollRef}
      className="h-[100dvh] bg-white flex justify-center overflow-y-auto"
    >
      <main className="w-full max-w-[375px] bg-white">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
