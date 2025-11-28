import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      return;
    }

    if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
      ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
      ReactGA.send({
        hitType: "pageview",
        page: location.pathname + location.search,
      });
    }
  }, [location]);
};

export default useGoogleAnalytics;
