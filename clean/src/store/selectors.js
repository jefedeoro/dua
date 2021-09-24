import { get } from 'lodash'
import { createSelector } from "reselect"


export const formatBalance = (balance) => {
    const precision = 100 // 2 decimal places
  
    balance = dai(balance)
    balance = Math.round(balance * precision) / precision // Use 2 decimal places
  
    return balance
}


const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, w => w)

const tokenLoaded = state=> get(state, 'token,loaded', false)
export const tokenLoadedSelector = createSelector(tokenLoaded, tl => tl)

const exchangeLoaded = state => get(state, 'exchange.loaded', false)
export const exchangeLoadedSelector = createSelector(exchangeLoaded, el => el)

const exchange = state => get(state, 'exchange.contract')
export const exchangeSelector = createSelector(exchange, e => e)

const dai = state => get(state, 'dai.contract')
export const daiSelector = createSelector(dai, d => d)

const aDai = state => get(state, 'aDai.contract')
export const aDaiSelector = createSelector(aDai, ad => ad)

const cDai = state => get(state, 'cDai.contract')
export const cDaiSelector = createSelector(cDai, cd => cd)

export const contractsLoadedSelector = createSelector(
    tokenLoaded,
    exchangeLoaded,
    (tl, el) => (tl && el)
)

const balancesLoading = state => get(state, 'exchange.balancesLoading', true)
export const balancesLoadingSelector = createSelector(balancesLoading, status => status)

const daiBalance = state => get(state, 'token.balance', 0)
export const daiBalanceSelector = createSelector(
    daiBalance, 
    (balance) => {
        return formatBalance(balance)
    }
)