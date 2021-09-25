
import { DAI_ABI, DAI_address } from "../helpers"
import Web3 from "web3"
import {
    web3Loaded,
    web3AccountLoaded,
    daiLoaded,
    exchangeLoaded,
    daiBalanceLoaded,
    aDaiRateLoaded,
    cDaiRateLoaded,
    exchangeDaiBalanceLoaded,
    balancesLoading,
    balancesLoaded,
} from "./actions"



export const loadWeb3 = async (dispatch) => {
    const web3 = new Web3(window.ethereum)
    dispatch(web3Loaded(web3))
    return web3
}

export const loadAccount = async (web3, dispatch) => {
    const accounts = await web3.eth.getAccounts()
    const account = await accounts[0]
    await window.ethereum.enable()
    if (typeof account !== 'undefined') {
        dispatch(web3AccountLoaded(account))
        return account
    } else {
        window.alert('Please login with MetaMask')
        return null
    }
}


export const loadToken = async (web3, accounts, dispatch) => {
    try {
        const DAI = new web3.eth.Contract(DAI_ABI, DAI_address);
        const dai = new web3.utils.fromWei(await DAI.methods.amount(accounts[0]).call())

        dispatch(daiLoaded(dai))
        return dai
    } catch (error) {
        // window.alert('Contract not deployed to the current network. Please select another network with Metamask.')
        return null
    }
}

export const loadExchange = async (web3, networkId, dispatch) => {
    try {
        const exchange = web3.eth.Contract(exchange.abi, exchange.networks[networkId].address);
        dispatch(exchangeLoaded(exchange))
        return exchange
    } catch (error) {
        console.log('Contract not deployed to the current network. Please select another network with Metamask.')
        return null
    }
}

export const loadBalances = async (dispatch, web3, dai, exchange, account) => {
    // dai balance in wallet 

    const daiBalance = await web3.methods.amount(account).call()
    dispatch(daiBalanceLoaded(daiBalance))

    // aDai rate 
    const aDaiRate = await web3.methods.getAssetPrice(aDaiRate)
    dispatch(aDaiRateLoaded(aDaiRate))

    // cDai rate 
    const cDaiRate = await web3.methods.exchangeRateMantissa(cDaiRate).call()
    dispatch(cDaiRateLoaded(cDaiRate))

    // dai balance in exchange 
    const exchangeDaiBalance = await exchange.methods.balanceOf(dai.options.address, account).call()
    dispatch(exchangeDaiBalanceLoaded(exchangeDaiBalance))

    // trigger all balances loaded
    dispatch(balancesLoaded())

}

export const subscribeToEvents = async (exchange, dispatch) => {
    exchange.subscribeToEvents.depositDai({}, (error, event) => {
        dispatch(balancesLoaded())
    })
    exchange.events.Withdraw({}, (error, event) => {
        dispatch(balancesLoaded())
    })
}

export const daiDeposit = (dispatch, exchange, web3, amount, account) => {
    exchange.methods.daiDeposit.send({ from: account, value: web3.utils.toWei(amount, 'dai') })
        .on('transactionHash', (hash) => {
            dispatch(balancesLoading())
        })
        .on('error', (error) => {
            console.error(error)
            window.alert(`There was an error!`)
        })
}

export const daiWithdraw = (dispatch, exchange, web3, amount, account) => {
    exchange.methods.daiWithdraw(web3.utils.toWei(amount, 'dai')).send({ from: account })
        .on('transactionHash', (hash) => {
            dispatch(balancesLoading())
        })
        .on('error', (error) => {
            console.error(error)
            window.alert(`There was an error!`)
        })
    }
