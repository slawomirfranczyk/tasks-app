export const GET_TASK_LIST = "GET_TASK_LIST";
export const GET_TASK_FOR_EDIT = "GET_TASK_FOR_EDIT";
export const DELETE_TASK = "DELETE_TASK";
export const SORT_TASKS = "SORT_TASKS";
export const SET_ERROR = "SET_ERROR";

export const getTaskList = (tasks=[]) => ({ type: GET_TASK_LIST, tasks });
export const getTaskForEdit = (taskId) => ({ type: GET_TASK_FOR_EDIT, taskId });
export const deleteTask = (taskId) => ({ type: DELETE_TASK, taskId });
export const sortTasks = (sort) => ({ type: SORT_TASKS, sort });
export const setError = (error) => ({ type: SET_ERROR, error });