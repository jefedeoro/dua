import Web3 from "web3"
import { DAI_ABI, DAI_address } from "../scripts/library"
import {
    web3Loaded,
    web3AccountLoaded,
    daiLoaded,
    exchangeLoaded,
    daiBalanceLoaded,
    aDaiRateLoaded,
    cDaiRateLoaded,
    exchangeDaiBalanceLoaded,
    balancesLoaded
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
        const dai = new web3.utils.fromWei(await DAI.methods.balanceOf(accounts[0]).call())

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
    
    const daiBalance = await web3.methods.balanceOf(account).call()
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



// export const deposit = async (callback, dispatch) => {
//     // fetch all price scans 
//     const depositDai = callback(send: )
//     console.log(depositDai)
//     // fetch all transfers

    // fetch all tranascations 
// } 