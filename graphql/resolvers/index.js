const userResolver = require('./userResolver');

module.exports = {
    User:{
        parent:(parent)=>{
            console.log("parent",parent);
            return 1
        }
    },
    Query:{
        ...userResolver.Query
    },
    Mutation:{
        ...userResolver.Mutation
    }
}