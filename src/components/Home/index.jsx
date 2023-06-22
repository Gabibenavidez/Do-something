import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/home.scss";
import { UserContext } from "../../context/userContext";
import { useActivities } from "../../hooks/useActivities";
import { ActivityContext } from "../../context/activityContext";
import { filters } from "../../utils/filters.jsx";
import { useRequireLogin } from "../../hooks/useRequireLogin";
import { ErrorContext } from "../../context/errorContext";



const Home = () => {
  const { user } = useContext(UserContext);
  const { randomActivity } = useContext(ActivityContext);
  const { loading, setLoading } = useContext(ErrorContext);

  const {
    getRandomActivity,
    getByTypeActivivty,
    getActivivtyByParticipants,
    addToDoActivity,
    getInitialActivity
  } = useActivities();
  const [added, setIsAdded] = useState(false);
  
  const requireLogin = useRequireLogin();

  useEffect(() => {
    setLoading(true);
    requireLogin
    if (randomActivity) {
      getInitialActivity();
      setLoading(false);
    }
  }, []);


  // refresh activity 
  const handleRefresh = () => {
    getRandomActivity();
  };

  // filter
  const handleTypes = (e) => {
    const value = e.target.value;
    getByTypeActivivty(value);
  };

  const handleParticipants = (e) => {
    const value = e.target.value;
    getActivivtyByParticipants(value);
  };

  // add an activity
  const handleToDoActivty = () => {
    addToDoActivity(randomActivity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
    getRandomActivity();
  };

  return (
<section className="home">
  {user && (
    <div className="user-info">
      <h2 className="user-name">Hi {user?.name}!</h2>
      <p className="user-age">Age: {user?.age}</p>
    </div>
  )}
  {randomActivity && (
    <div className="activity">
      <div className="activity-image-container">
        <div className="activity-image">
          <img
            src={filters.types.find((item) => item.name === randomActivity.type)?.image}
            alt={`"${randomActivity.type} activity image"`}
            loading="lazy"
          />
        </div>
        <button
          className={`refresh-button ${loading ? 'spin' : ''}`}
          onClick={handleRefresh}
          aria-label="Refresh"
        >
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      <h3>{randomActivity?.activity}</h3>
    </div>
  )}
  <div className="filter-controls">
    <div className="select-wrapper">
      <label htmlFor="type-select">Type   </label>
      <select
        id="type-select"
        value={randomActivity.type}
        onChange={handleTypes}
        aria-label="Filter by Type"
      >
        {filters.types.map((type) => (
          <option value={type.name} key={type.name}>
            {type.name}
          </option>
        ))}
      </select>
    </div>

    <div className="select-wrapper">
      <label htmlFor="participant-select">Participants   </label>
      <select
        id="participant-select"
        value={randomActivity.participant}
        onChange={handleParticipants}
        aria-label="Filter by Participants"
      >
        {filters.participants.map((participant) => (
          <option value={participant} key={participant}>
            {participant}
          </option>
        ))}
      </select>
    </div>
  </div>

  <div className="button-group">
    <button
      className="add-button"
      onClick={handleToDoActivty}
      aria-label={added ? "Added" : "Add to List"}
    >
      {added ? "✓" : "Add to List"}
    </button>
    <button className="activities-button">
      <Link to="/activities" className="button-link" aria-label="View Activities">
        Activities to Do
      </Link>
    </button>
  </div>
</section>

  );
};

export default Home;
