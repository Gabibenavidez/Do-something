import React, { useContext, useState, useEffect } from "react";
import "./styles/activities.scss";
import { useActivities } from "../../hooks/useActivities";
import { ActivityContext } from "../../context/activityContext";
import { filters } from "../../utils/filters";
import { useRequireLogin } from "../../hooks/useRequireLogin";


const ActivitiesToDo = () => {
  const { removeActivity } = useActivities();
  const { activitiesToDo } = useContext(ActivityContext);
  const [ deletedItems, setDeletedItems ] = useState([]);

  const requireLogin = useRequireLogin();

  useEffect(() => {
    requireLogin;
  }, []);

  const handleDelete = (key) => {
    setDeletedItems((prevItems) => [...prevItems, key]);
    setTimeout(() => {
      removeActivity(key);
    }, 500);
  };

  return (
    <section className="activities-container">
      <h2>Activities to Do</h2>
      {activitiesToDo.length === 0 ? (
        <p>No activities to show.</p>
      ) : (
        <ul className="activity-list">
          {activitiesToDo.map((activity) => {
            const isDeleted = deletedItems.includes(activity.key);
            const itemClass = isDeleted ? "activity-item deleted" : "activity-item";

            return (
              <li key={activity.key} className={itemClass}>
                <div className="activity-details">
                  <div className="activity-image">
                    <img
                      src={
                        filters.types.find((item) => item.name === activity.type)?.image
                      }
                      alt={`"${activity.type} activity image"`}
                      loading="lazy"
                    />
                  </div>
                  <div className="activity-text">
                    <div className="activity-title">
                      <h3>{activity.activity}</h3>
                    </div>
                    <div className="activity-info">
                      <p>Type: {activity.type}</p>
                      <p>Participants: {activity.participants}</p>
                    </div>
                  </div>
                </div>
                <button className="delete-button" onClick={() => handleDelete(activity.key)}>
                <i className="fa fa-trash-alt"></i>
              </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default ActivitiesToDo;
