import {dataProviderActionTypes} from "../actions";
import {Reducer} from "react";


interface DataProviderState {
    dataProvider: string;
}

const initialState: DataProviderState = {
    dataProvider: ''
}

export const dataProviderReducer: Reducer<typeof initialState, dataProviderActionTypes> = (state = initialState, action): DataProviderState => {
    switch (action.type) {
        case "SET_DATA_PROVIDER":
            return {dataProvider: action.payload};
        default:
            return state;
    }
}