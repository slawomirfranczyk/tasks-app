const Task = require('./models/Task');
const { prepareDataBeforeResponse } = require('./utils');
const { Types: { ObjectId } } = require('mongoose');

const resolvers = {
    Query: {
        allTasks: (_, { sort={ _id:1 } }) => {
            return Task.find({}).sort(sort).then(tasks => {
                return tasks.map(t => prepareDataBeforeResponse(t.toObject()))
            })
        }
    },
    Mutation: {
        createTask: async (_, {data}) => {

            const task = await Task.create(data).then(item => item.toObject());
            return prepareDataBeforeResponse(task);

        },
        updateTask: async (_, {data: { id, ...toUpdate }}={}) => {

            const { ok } = await Task.updateOne({_id: ObjectId(id)}, toUpdate);
            return ok && { id, ...toUpdate };

        },
        deleteTask: async (_, {data: { id }}={}) => {

            await Task.deleteOne({_id: ObjectId(id)});
            return id;

        },
    }
};

module.exports = resolvers;