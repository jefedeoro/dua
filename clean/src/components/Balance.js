import React from 'redux'
import Spinner from './Spinner'
import { connect } from 'react-redux'
import { Component } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import {
    loadBalances,
    daiDeposit,
    daiWithdraw,
} from '../store/interactions'
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
    daiBalanceSelector,
    daiDepositAmountSelector,
    daiWithdrawAmountSelector
} from '../store/selectors'
import {
    daiDepositAmountChanged,
    daiWithdrawAmountChanged
} from '../store/actions'


const showForm = (props) => {
    const {
        daiBalance,
        exchangeDaiBalance,
        dispatch,
        daiDepositAmount,
        exchange,
        token,
        account,
        web3,
        daiWithdrawAmount
    } = props

    return (
        <Tabs defaultActivityKey="deposit" className="bg-dark text-white">

            <Tab eventKey="deposit" title="deposit" className="bg-dark">

                <table className="table table-dark table-sm small">
                    <thread>
                        <tr>
                            <tr>Token</tr>
                            <tr>Wallet</tr>
                            <tr>Swap</tr>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td>DIA</td>
                            <td>{daiBalance}</td>
                            <td>{exchangeDaiBalance}</td>
                        </tr>
                    </tbody>
                </table>
                <form className="row" onSubmit={(event) => {
                    event.preventDefault()
                    daiDeposit(dispatch, exchange, web3, daiDepositAmount, account)
                    console.log("form submitting...")
                }}>
                    <div className="col-12 col-sm pr-sm-2">
                        <input
                            type="text"
                            placeholder="DAI Amount"
                            onChange={(e) => dispatch(daiDepositAmountChanged(e.target.value))}
                            className="form-control form-control-sm bg-dark text-white"
                            required />
                    </div>
                </form>

            </Tab>

            <Tab eventKey="withdraw" title="withdraw" className="bg-dark">

                <table className="table table-dark table-sm small">
                    <thread>
                        <tr>
                            <tr>DIA</tr>
                            <tr>Wallet</tr>
                            <tr>In Use</tr>
                        </tr>
                    </thread>
                </table>

                <form className="row" onSubmit={(event) => {
                    event.preventDefault()
                    daiWithdraw(dispatch, exchange, web3, daiWithdrawAmount, account)
                    console.log("form submitting...")
                }}>
                    <div className="col-12 col-sm pr-sm-2">
                        <input
                            type="text"
                            placeholder="DAI Amount"
                            onChange={(e) => dispatch(daiWithdrawAmountChanged(e.target.value))}
                            className="form-control form-control-sm bg-dark text-white"
                            required />
                    </div>
                </form>

                <table>
                    <tbody>
                        <tr>
                            <td>Dai</td>
                            <td>{daiBalance}</td>
                            <td>{exchangeDaiBalance}</td>
                        </tr>
                    </tbody>
                </table>






            </Tab>

        </Tabs>
    )

}
class Balance extends Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const { dispatch, web3, exchange, dai, aDai, cDai, account } = this.props
        await loadBalances(dispatch, web3, exchange, dai, aDai, cDai, account)
    }



    render(Balance) {
        return (
            <div className="card bg-dark text-white">
                <div className="card-header">
                    Balance
                </div>
                <div className="card-body">
                    {/* {this.props.showForm ? showForm(this.props) : <Spinner />} */}
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
        showForm: !balancesLoading,
        daiDepositAmount: daiDepositAmountSelector(state),
        daiWithdrawAmount: daiWithdrawAmountSelector(state),

    }
}

export default connect(mapStateToProps)(Balance)