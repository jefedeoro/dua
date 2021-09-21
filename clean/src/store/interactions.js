import Web3 from "web3"
import { DAI_ABI, DAI_address } from "../scripts/library"
import { 
    web3Loaded,
    web3AccountLoaded,
    tokenLoaded,
    callbackLoaded,
    exchangeLoaded
} from "./actions"
import callback from '../scripts/0_get_dai'


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

export const loadToken = async (web3, networkId, dispatch) => {
    try {
        const dai = web3.eth.Contract(dai.abi, dai.network[networkId].address);
        dispatch(tokenLoaded(dai))
        return dai
    } catch (error) {
        // window.alert('Contract not deployed to the current network. Please select another network with Metamask.')
        return null
    }
}  

export const loadExchange = async (web3, networkId, dispatch) => {
    try {
        const exchange = web3.eth.Contract(exchange.abi, exchange.networks[networkId].address );
        dispatch(exchangeLoaded(exchange))
        return exchange
    } catch (error) {
        console.log('Contract not deployed to the current network. Please select another network with Metamask.')
        return null
    }
}  

export const deposit = async (callback, dispatch) => {
    // fetch all price scans 
    const depositDai = callback(send: )
    console.log(depositDai)
    // fetch all transfers

    // fetch all tranascations 
} 