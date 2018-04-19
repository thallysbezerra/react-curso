import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../containers/TweetPadrao'
import Modal from '../../components/Modal'
import PropTypes from 'prop-types'
import * as TweetsAPI from '../../apis/TweetsAPI'

class Home extends Component {

    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: [],
            tweetAtivo: {}
        }
        this.adicionaTweet = this.adicionaTweet.bind(this)
    }

    componentWillMount() {
        this.context.store.subscribe(() => {
            //console.log('Roda sempre que tiver um dispatch')
            this.setState({
                tweets: this.context.store.getState().tweets.lista,
                tweetAtivo: this.context.store.getState().tweets.tweetAtivo
            })
        })
    }

    componentDidMount() {
        //console.log('DidMount', this)
        this.context.store.dispatch(TweetsAPI.carrega())
    }

    adicionaTweet(event) {
        event.preventDefault()
        const novoTweet = this.state.novoTweet
        //const tweetsAntigos = this.state.tweets
        if(novoTweet) {
            fetch(`http://localhost:3001/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, 
            {
                method: 'POST',
                body: JSON.stringify({ conteudo: novoTweet })
            })
            .then(respostaDoServidor => respostaDoServidor.json())
            .then((novoTweetRegistradoNoServer) => {
                //console.log(novoTweetRegistradoNoServer)
                this.context
                    .store.dispatch({ type: 'ADICIONA_TWEET', tweet: novoTweetRegistradoNoServer })
                
                    this.setState({
                        // tweets: [novoTweetRegistradoNoServer, ...tweetsAntigos],
                        // novoTweet: ''
                    })
            })
        }
    }

    removeTweet(idTweetQueVaiSerRemovido) {
        this.context.store.dispatch(TweetsAPI.remove(idTweetQueVaiSerRemovido))

        this.setState({
            tweetAtivo: {}
        })
    }
    
    abreModalParaTweet = (event, idDoTweetQueVaiNoModal) => {
        //console.log('idDoTweetQueVaiNoModal', idDoTweetQueVaiNoModal )
        //Fazer alguma operação no array de tweets
        const ignoraModal = event.target.closest('.ignoraModal')
        if(!ignoraModal) {
            this.context.store.dispatch({ type: 'ADD_TWEET_ATIVO', idDoTweetQueVaiNoModal })
        }
    }

    fechaModal = (event) => {
        const isModal = event.target.classList.contains('modal')
        if(isModal) {
            this.context.store.dispatch({ type: 'REMOVE_TWEET_ATIVO' })
            //   this.setState({
            //     tweetAtivo: {}
            //   })
        }
    }

    render() {
        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@omariosouto" />
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={ this.adicionaTweet }>
                                <div className="novoTweet__editorArea">
                                    <span 
                                        className={ `
                                        novoTweet__status
                                        ${ this.state.novoTweet.length > 140
                                            ? 'novoTweet__status--invalido' : '' }
                                        `}>
                                        { this.state.novoTweet.length }/140
                                    </span>
                                    <textarea 
                                        className="novoTweet__editor"
                                        value={ this.state.novoTweet }
                                        onInput={ (event) => this.setState({ novoTweet: event.target.value}) }
                                        placeholder="O que está acontecendo?">
                                    </textarea>
                                </div>
                                <button className="novoTweet__envia"
                                    disabled={ this.state.novoTweet.length > 140 ? true : false }
                                    type="submit" >
                                    Tweetar
                                </button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                { this.state.tweets.length === 0
                                ? <div>Mensagem avisando</div> : ''
                                }
                                {
                                this.state.tweets.map((tweet, index) =>
                                    <Tweet key={tweet + index} tweetInfo={tweet}
                                            handleAbreModalParaTweet={ (event) => this.abreModalParaTweet(event, tweet._id) }
                                            texto={tweet.conteudo} />
                                )
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>

                <Modal fechaModal={this.fechaModal} isAberto={!!this.state.tweetAtivo._id}>
                    <Widget>
                        <Tweet 
                            texto={this.state.tweetAtivo.conteudo || ''}
                            tweetInModal={true}
                            tweetInfo={this.state.tweetAtivo} />
                    </Widget>
                </Modal>

                {
                    this.context.store.getState().notificacao &&
                    <div className="notificacaoMsg">
                        { this.context.store.getState().notificacao }
                    </div>
                }
            </Fragment>
        );
    }
}

Home.contextTypes = {
    store: PropTypes.object.isRequired
}

export default Home;