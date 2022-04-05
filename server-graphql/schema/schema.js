const graphql = require('graphql');
const _ = require('lodash');
const Author=require('../models/author')
const Book=require('../models/book')


const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

//因为一个作者会有很多书，一本书对应着一个作者
const books = [
    { name: 'javascript', genre: '计算机', id: '1', authorId:'1'},
    { name: 'java', genre: '计算机', id: '2',authorId:'1' },
    { name: 'c', genre: '计算机', id: '3',authorId:'3' },
    { name: 'c++', genre: '计算机', id: '4',authorId:'2' }
]

const authors = [
    {
        name: 'zyl', age: 12, id: "1"
    },
    {
        name: 'yw', age: 16, id: '2'
    },
    {
        name: 'yrx', age: 1, id: '3'
    }
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => (
        {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            genre: { type: GraphQLString },
            author:{//因为一本书对应的是一个作者，所以这里是对象
                type:AuthorsType,
                resolve(parent,args){
                    const {authorId} =parent;
                    console.log(authorId)
                    // return _.find(authors,{id:authorId})
                    return Author.findById(authorId)
                }
            }
        }
    )
})


const AuthorsType = new GraphQLObjectType({
    name: 'Author',
    fields: () => (
        {
        name:{type:GraphQLString},
        age: {type:GraphQLInt},
        id: {type:GraphQLID},
        books:{//一个作者有很多本书，这里对应的是数组
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorId:parent.id})
                return Book.find({authorId:parent.id})
            }
        }
    })
})

//一个root的type
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                //从哪里得到数据
                // console.log(parent, args)//id即使是Int类型，但是在这里也被转换成string类型了
                // return _.find(books, { id: args.id })
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorsType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return books
                return Book.find({})
            }
        },
        authors:{
            type:new GraphQLList(AuthorsType),
            resolve(parent,args){
                // return authors
                return Author.find({})
            }
        }
    }
})

// book(id:11){
//     id,
//     genre
// }


const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorsType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                const {name,age}=args;
                let author=new Author({
                    name,
                    age
                });
               return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:GraphQLID}
            },
            resolve(parent,args){
                const {name,genre,authorId}=args;
                let book=new Book({
                    name,
                    genre,
                    authorId
                })
                return book.save();
            }
        }
    }
})
module.exports = new graphql.GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
})
