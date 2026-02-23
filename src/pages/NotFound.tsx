import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <h1 className="text-6xl font-bold pioneer-gradient-text mb-4">404</h1>
        <p className="text-lg mb-6" style={{ color: '#64748B' }}>Page not found</p>
        <Link
          to="/"
          className="pioneer-btn-primary inline-flex items-center gap-2"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
