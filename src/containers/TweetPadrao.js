import Tweet from '../components/Tweet'
import { connect } from 'react-redux'
import * as TweetsAPI from '../apis/TweetsAPI'

// class TweetPadrao extends Component {
//     removeHandler () { store.dispatch(TweetsAP.remove()) }
//     render() {
//         return (
//             <Tweet removeHandle={ removeHandler } />
//         )
//     }
// }

const mapDispatchToProps = (dispatch, propsRecebidas) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id))
        },
        handleLike: () => {
            //console.log('Teste maroto')
            dispatch(TweetsAPI.like(propsRecebidas.tweetInfo._id))
        }
    }
}

const TweetPadraoContainer = connect(null, mapDispatchToProps)(Tweet)

export default TweetPadraoContainer