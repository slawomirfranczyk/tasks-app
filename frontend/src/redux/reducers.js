import {
    GET_TASK_LIST,
    GET_TASK_FOR_EDIT,
    DELETE_TASK,
    SORT_TASKS,
    SET_ERROR,
} from "./actions";

const initState = {
    taskForEdit: undefined,
    tasks: [],
    sort: "",
    error: ""
};

export const tasks = (state=initState, { type, ...payload }) => {

    switch (type) {
        case GET_TASK_LIST:
            return {
                ...state,
                tasks: payload.tasks
            };
        case GET_TASK_FOR_EDIT:
            return {
                ...state,
                taskForEdit: state.tasks.find(({id}) => id === payload.taskId)
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(({id}) => id !== payload.taskId)
            };
        case SORT_TASKS:
            return {
                ...state,
                sort: payload.sort
            };
        case SET_ERROR:
            return {
                ...state,
                sort: payload.error
            };
        default:
            return state
    }

};