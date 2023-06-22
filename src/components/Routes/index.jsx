import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { ErrorContext } from '../../context/errorContext';
import  Home from '../Home';
import LoginForm from '../Auth/LoginForm'
import Navbar from '../Navbar';
import Loading from "../../components/Loading";
import SignUpForm from "../Auth/SignUpForm";
import ActivitiesToDo from "../ActivitiesToDo";
import Welcome from "../Welcome";
import MatrixRain from '../Matrix';
import ErrorComponent from "../../components/Error";

const RoutesComponent = () => {

  const { loading, error } = useContext(ErrorContext);

  return (
    <>
    <div className="matrix-rain-container">
      <MatrixRain />
      </div>
      <Router>

            <Navbar />
            {loading && <Loading />}
            {error && <ErrorComponent />}
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route exact path="/" element={<Welcome />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path="/activities" element={<ActivitiesToDo />} />
            </Routes>
          
      </Router>
    </>
  );
};

export default RoutesComponent;