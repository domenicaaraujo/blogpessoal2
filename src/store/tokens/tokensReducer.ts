import { Action } from "./actions";


//Parametros
export interface UserState {
    tokens: string,
    id: string,
}

//condição inicial
const initialState = {
    tokens: "",
    id: ""
}

//Estrutura de função
export const userReducer = (state: UserState = initialState, action: Action) => {
    switch (action.type){
        case "ADD_TOKEN" : {
            return {tokens: action.payload, id: state.id}//acttion recebe e atualiza, state mantem
        }
        case "ADD_ID": {
            return {id: action.payload, tokens: state.tokens}
        }
        default:
            return state
    }
}
