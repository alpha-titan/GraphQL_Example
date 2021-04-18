const userModel = require('../../models/user.model')
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
module.exports = {
	Query: {
		helloWorld: () => "Heloo From GraphQL",
		listOfUsers: async (parent, args, context, info) => {
            // console.log("Context", context);
			const allUser = await userModel.find();
			return allUser;
		},
	},
	Mutation: {
		createUser: async (parent, args, context, info) => {
            console.log("Parent",parent);
            console.log("Context",context);
            console.log("Info",info);
			const { age, username, email, password } = args.user;
			const existUser = await userModel.findOne({ username });
			if (existUser) {
				return new ApolloError("User already exists");
			}
			const newUser = new userModel({
				age,
				username,
				email: email.toLowerCase(),
				password: await hashPassword(password),
			});
			const user = await newUser.save();
			return user._doc;
		},
		loginUser: async (parent, args, context, info) => {
            console.log("Parent", parent);
			console.log("Context", context);
			console.log("Info", info);
			const { username, password } = args.login;
			const user = await userModel.findOne({ username });
			console.log(user);
			if (!user) {
				return new ApolloError("Username or Password is wrong");
			}
			const comparePass = await bcrypt.compare(password, user.password);
			if (!comparePass) {
				return new ApolloError("Username or Password is wrong");
			}
			const token = JWT.sign(
				{ userId: user.id },
				process.env.JWT_SECRET,
				{ expiresIn: "1h" }
			);
			return {
				token,
				user,
			};
		},
	},
};