import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = [], action = {}) {
    if(action.type === 'CARREGA_TWEETS') {
        console.log('Dentro da action', action.tweets)
        const novoEstado = action.tweets
        return novoEstado
    }

    if(action.type === 'ADICIONA_TWEET') {
        console.warn('Ação que está acontecendo agora:', action.type, state)
        const novoEstado = [action.tweet, ...state]
        return novoEstado
    }

    if(action.type === 'REMOVE_TWEET') {

        console.log(state)
    }

    return state
}

const store = createStore(
    tweetsReducer,
    applyMiddleware(
        thunk
    )
)

export default store