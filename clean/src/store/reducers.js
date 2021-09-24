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
            return { ...state, loaded: true, contract: action.contract }
        case 'DAI_BALANCE_LOADED':
            return { ...state, loaded: true, contract: action.daiBalanceLoaded }
        case 'ADAI_RATE_LOADED':
            return { ...state, loaded: true, contract: action.aDaiRateLoaded }
        case 'CDAI_RATE_LOADED':
            return { ...state, loaded: true, contract: action.cDaiRateLoaded }
        case 'EXCHANGE_DAI_BALANCE_LOADED':
            return { ...state, loaded: true, contract: action.exchangeDaiBalanceLoaded }
        case 'BALANCES_LOADED':
            return { ...state, loaded: true, contract: action.balancesLoaded}
        case 'BALANCES_LOADING':
            return {...state, loaded: true, contract: action.balancesLoaded}    
        default:
            return state
    }
}



const rootReducer = combineReducers({
    web3, dai, exchange
})

export default rootReducer