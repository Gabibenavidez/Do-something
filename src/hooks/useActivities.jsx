import React, { useContext, useEffect, useState } from "react";
import { ActivityContext } from '../context/activityContext'
import { getByParticipants, getByType, getRandom } from "../Services/getActivity";
import { ErrorContext } from '../context/errorContext';


export const useActivities = () => {
    // this is with the intencions of creating a loading component
    const { setLoading, setError, setErrorMessage } = useContext(ErrorContext);

    const { activitiesToDo, 
            setActivitiesToDo, 
            setRandomActivity
    } = useContext(ActivityContext);

    // adding activities to the list, duplicated item validation
    const addToDoActivity = (activity) => {
        setLoading(true);
        const duplicated = activitiesToDo.find((i) => i.key === activity.key);
        if (duplicated) {
          setErrorMessage('Activity already added, please choose another');
          setError(true);
          setLoading(false);
          return;
        }
        const updatedActivities = [...activitiesToDo, activity];
        setActivitiesToDo(updatedActivities);
        setErrorMessage('Activity successfully added');
        setError(true);
        localStorage.setItem('activitiestodo', JSON.stringify(updatedActivities));
        setLoading(false);
    };
      
    

    // request of random activity
    const getInitialActivity = async () => {
        setLoading(true);
        try {
          const storedRandomActivity = localStorage.getItem("randomActivity");
          if (storedRandomActivity) {
            setRandomActivity(JSON.parse(storedRandomActivity));
          } else {
            const response = await getRandom();
            setRandomActivity(response);
            localStorage.setItem("randomActivity", JSON.stringify(response));
          }
        } catch (error) {
          setErrorMessage(error.message);
          setError(true);
        }
        setLoading(false);
        setError(false);
    };
      
    const getRandomActivity = async () => {
        setLoading(true);
        try {
            const response = await getRandom();
            setRandomActivity(response);
            setLoading(false);
        } catch (error) {
            setErrorMessage(error);
            setLoading(false);
        }
    }

    // request of an activity filter by his type 
    const getByTypeActivivty = async (value) => {
        setLoading(true);
        try {
            const response = await getByType(value);
            setRandomActivity(response);
            setLoading(false);
        } catch (error) {
            setErrorMessage(error);
            setLoading(false);
        }
    }

    // request of an activity filter by the number of participants
    const getActivivtyByParticipants = async (value) => {
        setLoading(true);
        try {
            const response = await getByParticipants(value);
            setRandomActivity(response);
            setLoading(false);
        } catch (error) {
            setErrorMessage(error);
            setLoading(false);
        }
    }

    // delete activity from state, update the state again
    const removeActivity = (id) => {
        const updatedActivities = activitiesToDo.filter((activity) => id !== activity.key);
        setActivitiesToDo(updatedActivities);
        localStorage.setItem('activitiestodo', JSON.stringify(updatedActivities));
    }

    useEffect(() => {
        const storedActivities = localStorage.getItem('activitiestodo');
        if (storedActivities) {
            setActivitiesToDo(JSON.parse(storedActivities));
        }
    }, []);

    return {
        addToDoActivity,
        getRandomActivity,
        removeActivity,
        getByTypeActivivty,
        getActivivtyByParticipants,
        getInitialActivity
    };
};
