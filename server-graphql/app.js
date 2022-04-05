const express=require('express');
const graphqlhttp=require('express-graphql')
const schema=require('./schema/schema');
const mongoose=require('mongoose')
const cors=require('cors')//防止出现跨域的问题

const  app=express();
app.use(cors())


// mongoose.connect('mongodb://test:test123@ds131914.mlab.com:31914/graphql');
mongoose.connect('mongodb://192.168.0.104:27017/test');
mongoose.connection.once('open',()=>{
    console.log('connected to database')
})


app.use('/graphql',graphqlhttp.graphqlHTTP({
    schema,
    graphiql:true
}));






app.listen(4000,()=>{
    console.log('启动成功4000端口');
})
