graphql的文档https://www.apollographql.com/docs/react/data/mutations



# {
#   book(id:2){
#   name,
#   genre,
#     id,
#     author{
#       id,
#       name,
#       age
#     }
#   },
#   author(id:1){
#     name,
#     age,
#     id,
#     books{
#       name,
#       genre
#     }
#   }
# }

# { 
#   books{
#   name,
#   id,
#     genre,
#     author{
#       name,
#       age,
#       books{
#         name
#       }
#     }
#   },
 
# },

# {
#    authors{
#     name,
#     id,
#     age
#   }
# }


  # mutation{
  #   addAuthor(name:"zyl",age:12){
  #     name,
  #     age
  #   }
  # }

  # {
  #   author(id:"6249ac97cc13369f8f8551f2"){
  #   name,
  #   age,
  #   id,
  #   books{
  #     name,
  #     genre
  #   }
  # }
# }


mutation addBookMutation{
   addBook(name:"react",genre:"计算机学科",authorId:"6249aca1cc13369f8f8551f4"){
    name,
    genre,
    id
  }
