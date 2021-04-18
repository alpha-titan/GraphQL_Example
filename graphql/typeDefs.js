const {gql} = require("apollo-server")
const typeDefs = gql`
	type User {
		id: ID!
		username: String!
		age: Int!
		email: String!
		password: String!
        createdAt:String!
        updatedAt:String!
        parent:Int
	}
	type Query {
		helloWorld: String!
		listOfUsers: [User!]
	}

	input UserInput {
		username: String!
		age: Int!
		password: String!
		email: String!
	}

	input LoginInput {
		username: String!
		password: String!
	}

	type Login {
		token: String!
		user: User
	}

	type Mutation {
		createUser(user: UserInput): User!
		loginUser(login: LoginInput): Login!
	}
`;

module.exports = typeDefs;