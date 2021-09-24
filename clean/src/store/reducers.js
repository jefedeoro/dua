import { combineReducers } from 'redux';


function web3(state = {}, action) {
    switch (action.type) {
        case 'WEB3_LOADED':
            return { ...state, connection: action.connection }
        case 'WEB3_ACCOUNT_LOADED':
            return { ...state, account: action.account }
        default:
            return state
    }
}

function dai(state = {}, action) {
    switch (action.type) {
        case 'DAI_LOADED':
            return { ...state, loaded: true, contract: action.contract }
        default:
            return state
    }
}

function exchange(state = {}, action) {
    switch (action.type) {
        case 'EXCHANGE_LOADED':
            return { ...state, contract: action.contract: true }
        case 'DAI_BALANCE_LOADED':
            return { ...state, daiBalanceLoaded: action.balance }
        case 'ADAI_RATE_LOADED':
            return { ...state, aDaiRateLoaded: action.amount }
        case 'CDAI_RATE_LOADED':
            return { ...state, cDaiRateLoaded: action.amount }
        case 'EXCHANGE_DAI_BALANCE_LOADED':
            return { ...state, exchangeDaiBalanceLoaded: true }
        case 'BALANCES_LOADED':
            return { ...state, contract: action.balancesLoaded: true }
        case 'BALANCES_LOADING':
            return {...state, contract: action.balancesLoaded: true }    
        default:
            return state
    }
}



const rootReducer = combineReducers({
    web3, dai, exchange
})

export default rootReducer