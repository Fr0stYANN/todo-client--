import {gql} from '@apollo/client'

export const CREATE_CATEGORY_MUTATION = gql`
mutation CreateCategory($category: categoryInput!){
  categoriesMutations{
    createCategory(category: $category){
      categoryId
      categoryName
    }
  }
}
`
export const DELETE_CATEGORY_MUTATION = gql`
mutation DeleteCategory($categoryId: Int!){
  categoriesMutations{
    deleteCategory(categoryId: $categoryId)
  }
}
`