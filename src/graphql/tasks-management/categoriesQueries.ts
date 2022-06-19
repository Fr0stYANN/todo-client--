import {gql} from '@apollo/client'


export const GET_ALL_CATEGORIES_QUERY = `
query GetCategories{
  categories{
    categories{
      categoryId
      categoryName
    }
  }
}
`

export const GET_CATEGORY_BY_ID_QUERY = `
query GetCategoryById($categoryId: Int!){
  categories{
    category(categoryId: $categoryId){
      categoryId
      categoryName
    }
  }
}
`