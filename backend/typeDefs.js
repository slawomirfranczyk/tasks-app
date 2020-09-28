const { gql } = require('apollo-server-express');

const typeDefs = gql`

    input TaskCreateInput {
        name: String!
        description: String
        dateEnd: String!
    }
    
   input TaskUpdateInput {
        id: ID!
        name: String!
        description: String
        dateEnd: String!
    }
    
   input TaskDeleteInput {
        id: ID!
   }
   
   input SortInput {
        name: Int
        dateEnd: Int
   }

    type Task {
        id: ID!
        name: String!
        description: String
        dateEnd: String!
    }

    type Query {
        allTasks(sort: SortInput): [Task!]
    }
    
    type Mutation {
        createTask(data: TaskCreateInput!):  Task!
        updateTask(data: TaskUpdateInput!):  Task!
        deleteTask(data: TaskDeleteInput!):  ID
    }
`;

module.exports = typeDefs;