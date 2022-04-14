export type Action = {type: "ADD_TOKEN" | "ADD_ID"; payload: string}; //Actions é um objeto type que indica a ação a ser realizada

export const addToken = (token: string): Action => ({
    type: "ADD_TOKEN",
    payload: token, //introdução do dado associado a ação
})

export const addId = (id: string): Action => ({
    type: "ADD_ID",
    payload: id, //introdução do dado associado a ação
})
