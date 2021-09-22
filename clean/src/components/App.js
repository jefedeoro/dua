// import Web3 from 'web3';
import './App.css'
import React, { Component } from 'react'
import { callback } from '../scripts/0_get_dai'
import {
  // DAI_ABI, 
  // DAI_address,
  // UniswapV2_ABI, 
  // UniswapV2_address,
  //DEADLINE
} from '../scripts/library'
import { loadWeb3, loadAccount, loadToken, loadExchange } from '../store/interactions'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import Content from './Content'
import { contractsLoadedSelector } from '../store/selectors'



class App extends Component {
  componentWillMount() {
    this.loadBloackChainData(this.props.dispatch)   
  }

  async loadBloackChainData(dispatch) {
    const web3 = await loadWeb3(dispatch)
    const network = await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    const accounts = await loadAccount(web3, dispatch)
    // const DAI = loadToken(web3, networkId, dispatch)

    // if(!token) {
    // console.log('token smart contract is not located on the current network. Please select another network with Metamask.')
    //   return
    //}
    // loadExchange(web3, networkId, dispatch)
        // if(!exchange) {
    // console.log('exchange smart contract is not located on the current network. Please select another network with Metamask.')
    //   return
    //}
    // const exchange = await loadExchange(web3, networkId, dispatch)

    
    // const UniswapV2 = new web3.eth.Contract(UniswapV2_ABI, UniswapV2_address)

    //get accounts
    
    

    //get WETH address
    // const WETH_ADDRESS = await UniswapV2.methods.WETH().call()

    //get pair of swaps
    // const pairArray = [WETH_ADDRESS, DAI_address]

    //get tokenAmount to swap
    // const tokenAmount = await UniswapV2.methods.getAmountsOut(web3.utils.toWei('1', 'Ether'), pairArray).call()

    // const accounts = await web3.eth.getAccounts()

    // const dai = new web3.eth.Contract(dai.abi, dai.network[networkId].address);



    console.log("network data", (callback, network))

  }

  render() {

    return (
      <div className="App">
        <Navbar/>
        {/* live below hides the content if contracts are not loaded, 
        after testing uncomment and comment out the line below `<Content/>` */}
        {/* { this.props.contractsLoaded ? <Content/> : <div className="content"></div> } */}
        <Content/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contractsLoaded: contractsLoadedSelector(state)
  }
} 
export default connect(mapStateToProps)(App);

