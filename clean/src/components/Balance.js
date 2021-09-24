import React  from 'redux'
import {connect} from 'react-redux'
import { Component } from 'react'
import { loadBalances } from '../store/interactions'
import {
    web3Selector, 
    exchangeSelector, 
    daiSelector, 
    aDaiSelector, 
    cDaiSelector, 
    accountSelector
} from '../store/selectors'

class Balance extends Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData(props) {
        const {dispatch, web3, exchange, dai, aDai, cDai, account}= props
        await loadBalances(dispatch, web3, exchange, dai, aDai, cDai, account)
    }



    render() {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">
                    Balance
                </div>
                <div className="card-body">
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
     account: accountSelector(state),
     exchange: exchangeSelector(state),
     dai: daiSelector(state),
     aDai: aDaiSelector(state),
     cDai: cDaiSelector(state),
     web3: web3Selector(state),
    }
}

export default connect(mapStateToProps)(Balance)