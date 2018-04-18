export const carrega = () => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,) 
        .then(respostaDoServidor => respostaDoServidor.json())
        .then((tweetsDoServidor) => {
            console.log(tweetsDoServidor)
            dispatch({ type: 'CARREGA_TWEETS', tweets: tweetsDoServidor })
            // this.setState ({
            //     tweets
            // })
        })
    }
}

export const remove = (idDoTweet) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE',
        })
        .then((data) => data.json())
        .then((response) => {
            dispatch({ type: 'REMOVE_TWEET', idDoTweet: idDoTweet })
            // console.log('response')
            // const listaDeTweetsAtualizada = this.state.tweets.filter( (tweet) => tweet._id !== idTweetQueVaiSerRemovido )
            // this.setState ({
            //     tweets: listaDeTweetsAtualizada
            // })
        })
    }
}