import { request } from 'graphql-request'
import {
    deleteTask as deleteTaskAction,
    getTaskList as getTaskListAction
} from "../redux/actions";
import { store } from "../index";

const { REACT_APP_API_URL } = process.env;

export const callAPI = (query, variables) => request(REACT_APP_API_URL, query, variables);

const CREATE_TASK_MUTATION = `mutation CreateTask($data: TaskCreateInput!) {
                                    createTask(data: $data) {
                                        id
                                        name
                                        description
                                        dateEnd
                                    }
                                }`;

const UPDATE_TASK_MUTATION = `mutation updateTask($data: TaskUpdateInput!) {
                                  updateTask(data: $data) {
                                    id
                                        name
                                    description
                                        dateEnd
                                  }
                                }`;

const DELETE_TASK_MUTATION = `mutation deleteTask($data: TaskDeleteInput!) {
                                  deleteTask(data: $data)
                               }`;

const ALL_TASK_QUERY = `query allTasks($sort: SortInput){ 
                            allTasks(sort: $sort) {
                                id
                                name
                                description
                                dateEnd
                            }
                        }`;

const prepareDataHelper = ({ dateEnd, ...rest }) => ({...rest, dateEnd: dateEnd && new Date(dateEnd)});

export const changeSortFormatHelper = value => {
    if (!value) return undefined;
    const [field, order] = value.split(':');
    const sort = { [field]: +order };
    return sort;
};

const getCurrentSort = () => {
    const { sort } = store.getState();
    return changeSortFormatHelper(sort)
};

export const getTasksList = (sort=getCurrentSort()) => dispatch =>
    callAPI(ALL_TASK_QUERY, { sort })
        .then(response => {
            const tasks = response.allTasks.map(prepareDataHelper);
            dispatch(getTaskListAction(tasks));
        });

export const createTask = data => dispatch =>
    callAPI(CREATE_TASK_MUTATION, { data })
        .then(response => { dispatch(getTasksList()) });

export const updateTask = data => dispatch =>
    callAPI(UPDATE_TASK_MUTATION, { data })
        .then(response => { dispatch(getTasksList()) });

export const deleteTask = id => dispatch =>
    callAPI(DELETE_TASK_MUTATION, { data: { id } })
        .then(response => { dispatch(deleteTaskAction(id)) });