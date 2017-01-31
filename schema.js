var {GraphQLObjectType, GraphQLInt, GraphQLString,
	GraphQLList, GraphQLSchema, GraphQLNonNull, GraphQLFloat} = require('graphql');
var Db = require('./db');

const User = new GraphQLObjectType({
	name: 'User',
	description: 'some desc',
	fields: ()=> {
		return {
			id: {
				type: GraphQLInt,
				resolve(user) {
					return user.id;
				}
			},
			firstName: {
				type: GraphQLString,
				resolve(user) {
					return user.firstName;
				}
			},
			lastName: {
				type: GraphQLString,
				resolve(user) {
					return user.lastName;
				}
			},
			email: {
				type: GraphQLString,
				resolve(user) {
					return user.email;
				}
			},
			music: {
				type: new GraphQLList(Music),
				resolve (user) {
					return user.getMusic();
				}
			}
		}
	}
});

const City = new GraphQLObjectType({
	name: 'City',
	description: 'some desc',
	fields() {
		return {
			name: {
				type: GraphQLString,
				resolve(city) {
					return city.name;
				}
			},
			airportCode: {
				type: GraphQLString,
				resolve(city) {
					return city.airportCode;
				}
			},
			latitude: {
				type: GraphQLFloat,
				resolve(city) {
					return city.latitude;
				}
			},
			longitude: {
				type: GraphQLFloat,
				resolve(city) {
					return city.longitude;
				}
			}
		}
	}
});

const Music = new GraphQLObjectType({
	name: 'Music',
	description: 'some desc',
	fields: ()=> {
		return {
			id: {
				type: GraphQLInt,
				resolve(music) {
					return music.id;
				}
			},
			title: {
				type: GraphQLString,
				resolve(music) {
					return music.title;
				}
			},
			content: {
				type: GraphQLString,
				resolve(music) {
					return music.content;
				}
			},
			user: {
				type: User,
				resolve(music) {
					return music.getUser();
				}
			}
		}
	}
});
// root query (public api method)
const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'root query object',
	fields: ()=> {
		return {
			cities: {
				type: new GraphQLList(City),
				args: {
					id: {type: GraphQLInt},
					name:{type: GraphQLString}
				},
				resolve(root, args) {
					return Db.models.cities.findAll({where: args});
				}
			},
			users: {
				type: new GraphQLList(User),
				args: {
					id: {type: GraphQLInt},
					email: {type: GraphQLString}
				},
				resolve(root, args) {
					return Db.models.users.findAll({where: args});
				}
			},
			music: {
				type: new GraphQLList(Music),
				resolve(root, args) {
					return Db.models.music.findAll({where: args});
				}
			}
		}
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutations',
	description: 'function for create stuff',
	fields() {
		return {
			addUser: {
				type: User,
				args: {
					firstName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					lastName: {
						type: new GraphQLNonNull(GraphQLString)
					},
					email: {
						type: new GraphQLNonNull(GraphQLString)
					}
				},
				resolve (source, args) {
					return Db.models.users.create({
						firstName: args.firstName,
						lastName: args.lastName,
						email: args.email.toLowerCase()
					});
				}
			}
		}
	}
});

const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});

module.exports = Schema;