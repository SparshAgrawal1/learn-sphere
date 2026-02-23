import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
          <div className="flex min-h-screen items-center justify-center bg-[#0F0D08]">
      <div className="text-center">
        <h1 className="text-6xl font-bold svg-gradient-text mb-4">404</h1>
        <p className="text-lg text-white/40 mb-6">Page not found</p>
        <Link
          to="/"
          className="svg-btn-primary inline-flex items-center gap-2"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
