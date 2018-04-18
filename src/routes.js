import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

// Código da autenticação
function estaAutenticado() {
    if(localStorage.getItem('TOKEN')) {
        return true
    } else {
        return false
    }
}

class PrivateRoute extends React.Component {
    render() {
        const Component = this.props.component
        const props = this.props
        if(estaAutenticado()) {
            return ( <Route render={() => <Component {...props} />}/> )
        } else {
            return ( <Redirect to="/login"/> )
        }
    }
}

const Routes = () => {
    return (
        <Switch>
            <PrivateRoute path="/" component={Home} exact />
            <Route path="/login" component={LoginPage} />
            <Route path="*" component={ () => (<div>Página 404</div>) } />
        </Switch>
    )
}

export default Routes

// export default class Routes extends Component {
//     render() {
//         return (
//             <Switch>
//                 <Route path="/" exact component={Home} />
//                 <Route path="/login" component={LoginPage} />
//                 <Route path="*" component={ () => (<div>Página 404</div>) } />
//             </Switch>
//         )
//     }
// }