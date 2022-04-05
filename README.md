graphql的文档https://www.apollographql.com/docs/react/data/mutations

1.
{
  book(id:2){
  name,
  genre,
    id,
    author{
      id,
      name,
      age
    }
  },
  author(id:1){
    name,
    age,
    id,
    books{
      name,
      genre
    }
  }
}

2.
{ 
  books{
  name,
  id,
    genre,
    author{
      name,
      age,
      books{
        name
      }
    }
  },
 
}

3.
{
   authors{
    name,
    id,
    age
  }
}

4.
  mutation{
    addAuthor(name:"zyl",age:12){
      name,
      age
    }
  }
  
5.
  {
    author(id:"6249ac97cc13369f8f8551f2"){
    name,
    age,
    id,
    books{
      name,
      genre
    }
  }
}


6.
mutation addBookMutation{
   addBook(name:"react",genre:"计算机学科",authorId:"6249aca1cc13369f8f8551f4"){
    name,
    genre,
    id
  }
}
