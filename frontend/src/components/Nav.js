import React from "react";
import appRoutes from "../appRoutes";
import {Box, Button, Heading, Level, Form} from "react-bulma-components";
import {TasksCounter} from "./TasksCounter";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {sortTasks} from "../redux/actions";
import {getTasksList} from "../services";
import { changeSortFormatHelper } from "../services";


export const Nav = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const { tasksCount, sort } = useSelector(state => ({
        tasksCount: state.tasks.length,
        sort: state.sort
    }));

    const handleSort = (e) => {
        const { target: { value } } = e;
        dispatch(sortTasks(value));
        dispatch(getTasksList(changeSortFormatHelper(value)));
    };

    return (
        <Box>
            <Level renderAs='nav'>
                <Level.Side align='left'>
                    <Level.Item>
                        <Heading size={5} subtitle>
                            <TasksCounter />
                        </Heading>
                    </Level.Item>
                </Level.Side>

                <Level.Side align='right'>
                    {
                        !!tasksCount &&
                        <Level.Item>
                            <Form.Label style={{ fontWeight: 'normal', marginRight: 15 }}>Sortuj wg </Form.Label>
                            <Form.Select value={sort} onChange={handleSort}>
                                <option value="">Domyślne</option>
                                <option value="name:1">Nazwa rosnąco</option>
                                <option value="name:-1">Nazwa malejąco</option>
                                <option value="dateEnd:1">Czas zakończenia rosnąco</option>
                                <option value="dateEnd:-1">Czas zakończenia malejąco</option>
                            </Form.Select>
                        </Level.Item>
                    }
                    <Level.Item>
                        <Button
                            onClick={() => history.push(appRoutes.addNewTask)}
                            renderAs='a'
                            color='success'
                        >
                            Dodaj
                        </Button>
                    </Level.Item>
                </Level.Side>
            </Level>
        </Box>
    );
};