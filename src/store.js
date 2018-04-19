import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(state = { lista: [], tweetAtivo: { }}, action = {}) {
    if(action.type === 'CARREGA_TWEETS') {
        //console.log('Dentro da action', action.tweets)
        const novoEstado = {
            ...state,
            lista: action.tweets
        }
        return novoEstado
    }

    if(action.type === 'ADICIONA_TWEET') {
        //console.warn('Ação que está acontecendo agora:', action.type, state)
        const novoEstado = {
            ...state,
            lista: [action.tweet, ...state.lista]
        }
        return novoEstado
    }

    if(action.type === 'REMOVE_TWEET') {
        //console.warn(state,action)
        const listaDeTweets = state.lista.filter((tweetAtual) => tweetAtual._id !== action.idDoTweet)
        const novoEstado = {
            ...state,
            lista: listaDeTweets,
            tweetAtivo: {}
        }
        return novoEstado
    }

    if(action.type === 'ADD_TWEET_ATIVO') {
        const tweetAtivo = state.lista
        .find((tweetAtual) => tweetAtual._id === action.idDoTweetQueVaiNoModal )
        //console.log(tweetAtivo)
        const novoEstado = {
            ...state,
            tweetAtivo: tweetAtivo
        }

        return novoEstado
    }

    if(action.type === 'REMOVE_TWEET_ATIVO') {
        return {
            ...state,
            tweetAtivo: {}
        }
    }

    if(action.type === 'LIKE') {
        console.log('Dentro da action', action)
        const tweetsAtualizados = state.lista.map((tweetAtual) => {

            if(tweetAtual._id === action.idDoTweet) {
                const { likeado, totalLikes } = tweetAtual
                tweetAtual.likeado = !likeado
                tweetAtual.totalLikes = likeado ? totalLikes - 1 : totalLikes + 1
            }

            return tweetAtual
        })

        // const tweetAtivoAtualizado = state
        // .lista.find((tweetAtual) => tweetAtual._id === action.idDoTweet)

        let tweetAtivoAtualizado
        if(state.tweetAtivo._id) {
            tweetAtivoAtualizado = state
                .lista.find((tweetAtual) => tweetAtual._id === action.idDoTweet)
        }

        return {
            ...state,
            lista: tweetsAtualizados,
            tweetAtivo: {...tweetAtivoAtualizado}
        }
    }

    return state
}

function notificacoesReducer(state = '', action = {}) {
    if(action.type === 'ADD_NOTIFICACAO') {
        const novoEstado = action.msg
        return novoEstado
    }

    if(action.type === 'REMOVE_NOTIFICACAO') {
        const novoEstado = ''
        return novoEstado
    }

    return state
}

const store = createStore(
    combineReducers({
        tweets: tweetsReducer,
        notificacao: notificacoesReducer
    }),
    applyMiddleware(
        thunk
    )
)

export default store