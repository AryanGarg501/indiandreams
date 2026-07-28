import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// All quiz questions have been removed — users go straight to the offer.
const QuizSteps = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/offer", { replace: true });
  }, [navigate]);

  return <Navigate to="/offer" replace />;
};

export default QuizSteps;
