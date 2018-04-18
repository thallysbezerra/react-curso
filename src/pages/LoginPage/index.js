import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {

    fazerLogin = (event) => {
        event.preventDefault()

        //console.log(this.inputLogin.value)
        //console.log(this.inputSenha.value)
        const dadosDeLogin = {
            login: this.inputLogin.value,
            senha: this.inputSenha.value
        }

        fetch('http://localhost:3001/login', {
            method: 'POST',
            body: JSON.stringify(dadosDeLogin),
        })
        // .then(dados => console.log(dados))
        .then((response) => {
            if (!response.ok)
                throw response;
            return response.json()
        })
        .then((responseEmJSON) => {
            localStorage.setItem( 'TOKEN', responseEmJSON.token)
            this.props.history.push('/')
        })
        .catch((responseError) => {
            responseError.json().then((response) => {
                console.log(response)
            })
        })
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form className="loginPage__form" action="/" onSubmit={this.fazerLogin}>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label> 
                                <input ref={ (inputLogin) => this.inputLogin = inputLogin }
                                    className="loginPage__input"
                                    type="text"
                                    id="login"
                                    name="login" />
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input ref={ (inputSenha) => this.inputSenha = inputSenha }
                                    className="loginPage__input"
                                    type="password"
                                    id="senha"
                                    name="senha" />
                            </div>
                            {/* <div className="loginPage__errorBox">
                                Mensagem de erro!
                            </div> */}
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }
}


export default LoginPage