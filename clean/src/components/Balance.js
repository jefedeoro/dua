import React from 'redux'
import { connect } from 'react-redux'
import { Component, Spinner } from 'react'
import { loadBalances } from '../store/interactions'
import {
    web3Selector,
    exchangeSelector,
    daiSelector,
    aDaiSelector,
    cDaiSelector,
    accountSelector,   
    tokenLoadedSelector,
    exchangeLoadedSelector,
    balancesLoadingSelector,
    daiBalanceSelector
} from '../store/selectors'

const showForm = (props) => {

}
class Balance extends Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const { dispatch, web3, exchange, dai, aDai, cDai, account } = this.props
        await loadBalances(dispatch, web3, exchange, dai, aDai, cDai, account)
    }



    render() {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">
                    Balance
                </div>
                <div className="card-body">
                    {this.props.showForm ? showForm(this.props) : <Spinner />}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const balancesLoading = balancesLoadingSelector(state)

    return {
        account: accountSelector(state),
        exchange: exchangeSelector(state),
        dai: daiSelector(state),
        aDai: aDaiSelector(state),
        cDai: cDaiSelector(state),
        web3: web3Selector(state),
        tokenLoaded: tokenLoadedSelector(state),
        exchangeLoaded: exchangeLoadedSelector(state),
        exchange: exchangeSelector(state),
        dai: daiSelector(state),
        aDai: aDaiSelector(state),
        cDai: cDaiSelector(state),
        daiBalance: daiBalanceSelector(state),
        balancesLoading,
        showForm: !balancesLoading
        
    }
}

export default connect(mapStateToProps)(Balance)