const Task = require('./models/Task');
const { prepareDataBeforeResponse } = require('./utils');

const resolvers = {
    Query: {
        allTasks: () => {
            return Task.find({}).then(tasks => {
                return tasks.map(t => prepareDataBeforeResponse(t.toObject()))
            })
        }
    },
    Mutation: {
        createTask: async (_, {data}) => {

            const task = await Task.create(data).then(item => item.toObject());
            return prepareDataBeforeResponse(task);

        }
    }
};

module.exports = resolvers;