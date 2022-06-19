import {Epic, ofType} from "redux-observable";
import {categoryActions} from "../../store/actions";
import {RootState} from "../../store/store";
import {GET_ALL_CATEGORIES_QUERY} from "../tasks-management/categoriesQueries";
import {from, mergeMap} from "rxjs";
import { ICategory } from "../../models/ICategory";
// @ts-ignore
export const getCategoriesEpic: Epic<ReturnType<categoryActions.getAllCategories>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('GET_ALL_CATEGORIES'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: GET_ALL_CATEGORIES_QUERY
                    }),
                }).then((res) => res.json())
                    .then(result => categoryActions.setCategories(result.data.categories.categories as ICategory []))
                    .catch(error => console.log(error))
            )
        ))
}

// @ts-ignore
export const deleteCategoryEpic: Epic<ReturnType<categoryActions.fetchDeleteCategory>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('FETCH_DELETE_CATEGORY'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        mutation DeleteCategory{
                                   categoriesMutations{
                                   deleteCategory(categoryId: ${action.payload})
                             }
                        }
                        `
                    }),
                }).then((res) => res.json())
                    .then(result => categoryActions.deleteCategory(action.payload))
                    .catch(error => console.log(error))
            )
        )
    )
}

// @ts-ignore
export const editCategoryEpic: Epic<ReturnType<categoryActions.fetchEditCategory>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('FETCH_EDIT_CATEGORY'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation EditCategory{
                                   categoriesMutations{
                                   editCategory(category: {categoryId: ${action.payload.categoryId}, categoryName:"${action.payload.categoryName}"}){
                                          categoryId,
                                          categoryName
                                   }
                             }
                        }
                        `
                }),
            }).then(res => res.json())
                .then(result => categoryActions.editCategory(result.data.categoriesMutations.editCategory as ICategory)))
        )
    )
}
    // @ts-ignore
export const addCategoryEpic: Epic<ReturnType<categoryActions.fetchAddCategory>, any, RootState> = (action$, state$) => {
        return action$.pipe(
            ofType('FETCH_ADD_CATEGORY'),
            mergeMap(action =>
                from(fetch('https://localhost:44303/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
                        mutation AddCategory{
                                   categoriesMutations{
                                   createCategory(category: {categoryName: "${action.payload.categoryName}"}){
                                          categoryId,
                                          categoryName
                                   }
                             }
                        }
                        `
                    }),
                }).then(res => res.json())
                    .then(result => categoryActions.addCategory(result.data.categoriesMutations.createCategory as ICategory))
                    )))
}