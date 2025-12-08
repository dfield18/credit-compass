import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const BasicQuestion = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Redirect to recommendations page
    const query = searchParams.get('q');
    if (query) {
      navigate(`/recommendations?q=${encodeURIComponent(query)}`, { replace: true });
    } else {
      navigate('/recommendations', { replace: true });
    }
  }, [navigate, searchParams]);

  return null; // This component just redirects
};

export default BasicQuestion;