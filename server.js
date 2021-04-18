require("dotenv").config();
const { ApolloServer, gql, ApolloError } = require("apollo-server");
const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const userModel = require("./models/user.model");
const { hashPassword } = require("./utils");
const bcrypt = require("bcryptjs");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const users = [
	{
		name: "sachin AK",
		age: 21,
	},
	{
		name: "Rajveer",
		age: 23,
	},
	{
		name: "Shobhit",
		age: 23,
	},
	{
		name: "Sushil",
		age: 23,
	},
	{
		name: "Chahat",
		age: 23,
	},
];

// const resolvers = {
// 	Query: {
// 		helloWorld: () => "Hello from graphql Server",
// 	},
// 	Mutation: {},
// };
const server = new ApolloServer({
	typeDefs,
	resolvers,
    context:(res)=> (res)
});

mongoose
	.connect(process.env.MONGODB_URI + "/graphql", {
		// useCreateIndex: true,
		// useFindAndModify: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("Database Connected");
		return server.listen({ port: 3000 });
	})
	.then((res) => console.log(`server running at ${res.url}`));
