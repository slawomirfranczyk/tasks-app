const { gql } = require('apollo-server-express');

const typeDefs = gql`

    input TaskCreateInput {
        name: String!
        description: String
        dateEnd: String!
    }

    type Task {
        id: ID!
        name: String!
        description: String
        dateEnd: String!
    }

    type Query {
        allTasks: [Task!]
    }
    
    type Mutation {
        createTask(data: TaskCreateInput):  Task!
    }
`;

module.exports = typeDefs;