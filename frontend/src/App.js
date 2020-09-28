import React, { useEffect } from 'react';
import {
    Container,
    Columns,
} from 'react-bulma-components';
import { EditTaskModal } from './components/EditTaskModal';
import { Route, useHistory } from 'react-router-dom';
import appRoutes from './appRoutes';
import { useSelector } from 'react-redux';
import {TaskCard} from './components/TaskCard';
import {RemoveTaskModal} from './components/RemoveTaskModal';
import {getTasksList} from './services';
import { useDispatch } from 'react-redux';
import {Nav} from "./components/Nav";

const App = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleModalClose = () => {
        history.push('');
    };

    const tasks = useSelector(state => state.tasks);

    useEffect(() => {
        dispatch(getTasksList())
    }, [dispatch]);

    return (
        <div className='App'>
            <Container className='is-fluid'>

                <Nav/>
                <Columns>
                    <Columns.Column className='is-two-thirds is-offset-2'>
                        { tasks.map(task => <TaskCard {...task} key={task.id}/>) }
                    </Columns.Column>
                </Columns>

            </Container>

            <Route
                path={appRoutes.addNewTask}
                render={props => (
                    <EditTaskModal
                        onClose={handleModalClose}
                        {...props}
                    />
                )}
            />
            <Route
                path={appRoutes.editTask}
                render={props => (
                    <EditTaskModal
                        onClose={handleModalClose}
                        {...props}
                    />
                )}
            />
            <Route
                path={appRoutes.removeTask}
                render={props => (
                    <RemoveTaskModal
                        onClose={handleModalClose}
                        {...props}
                    />
                )}
            />

        </div>
    );
};

export default App;

