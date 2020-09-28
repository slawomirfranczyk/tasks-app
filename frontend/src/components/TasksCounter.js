import React from "react";
import { useSelector } from 'react-redux';

export const TasksCounter = () => {

    const { length: tasksCount } =  useSelector(state => state.tasks) || {};
    return (
        <>Twoje zadania: <strong>{tasksCount}</strong></>
    )
};