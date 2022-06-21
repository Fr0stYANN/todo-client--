
import {Epic, ofType} from "redux-observable";
import {dataProviderActions} from "../../store/actions";
import {RootState} from "../../store/store";
import {from, mergeMap} from "rxjs";

export const changeDataProviderEpic: Epic<ReturnType<typeof dataProviderActions.fetchChangeDataProvider>, any, RootState> = (action$, state$) => {
    console.log('I`m Here');
    return action$.pipe(
        ofType('FETCH_CHANGE_DATA_PROVIDER'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                       query ChangeDataPromutationvider{
                           tasks{
                                  notCompletedTasks{
                                     taskId
                                  }
                              }
                       }
                    `
                })
            }).then(res => res.json())
                .then(result => console.log(result)))))
}

export const fetchDataProviderEpic: Epic<ReturnType<typeof dataProviderActions.fetchDataProvider>, any, RootState> = (action$, state$) => {
    return action$.pipe(
        ofType('FETCH_DATA_PROVIDER'),
        mergeMap(action =>
            from(fetch('https://localhost:44303/graphql',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                      query FetchDataProvider{
                               tasks{
                                 getCurrentDataProvider
                                   }
                               }
                    `
                })
            }).then(res => res.json())
                .then(result => dataProviderActions.setDataProvider(result.data.tasks.getCurrentDataProvider)))))
}