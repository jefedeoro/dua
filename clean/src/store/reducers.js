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

function token(state = {}, action) {
    switch (action.type) {
        case 'DAI_LOADED':
            return { ...state, loaded: true, contract: action.contract }
        case 'DAI_BALANCE_LOADED':
            return { ...state, daiBalanceLoaded: action.amount }
        case 'ADAI_RATE_LOADED':
            return { ...state, aDaiRateLoaded: action.amount }
        case 'CDAI_RATE_LOADED':
            return { ...state, cDaiRateLoaded: action.amount }
        case 'EXCHANGE_DAI_BALANCE_LOADED':
            return { ...state, exchangeDaiBalanceLoaded: action.amount }    
        default:
            return state
    }
}

function exchange(state = {}, action) {
    switch (action.type) {
        case 'EXCHANGE_LOADED':
            return { ...state, exchangeLoaded: true }

        case 'BALANCES_LOADED':
            return { ...state, balancesLoaded: true }
        case 'BALANCES_LOADING':
            return {...state, balancesLoaded: true }  
        case 'DAI_DEPOSIT_AMOUNT_CHANGED':
            return { ...state, daiDepositAmount: action.amount} 
        case 'DAI_DEPOSIT':
            return {...state, daiDeposit: action.amount}
        case 'DAI_WITHDRAW':
            return {...state, daiWithdraw: action.amount}
        default:
            return state
    }
}





const rootReducer = combineReducers({
    web3, token, exchange
})

export default rootReducer