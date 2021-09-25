export function web3Loaded(connection) {
    return {
        type: 'WEB3_LOADED',
        connection
    }
}

export function web3AccountLoaded(account) {
    return {
        type: 'WEB3_ACCOUNT_LOADED',
        account
    }
}

export function daiLoaded(contract) {
    return {
        type: 'DAI_LOADED',
        contract
    }
}

export function exchangeLoaded(contract) {
    return {
        type: 'EXCHANGE_LOADED',
        contract
    }
}

export function daiBalanceLoaded(balance) {
    return {
        type: 'DAI_BALANCE_LOADED',
        balance
    }
}

export function aDaiRateLoaded(amount) {
    return {
        type: 'ADAI_RATE_LOADED',
        amount
    }
}

export function cDaiRateLoaded(amount) {
    return {
        type: 'CDAI_RATE_LOADED',
        amount
    }
}


export function exchangeDaiBalanceLoaded(balance) {
    return {
        type: 'EXCHANGE_DAI_BALANCE_LOADED',
        balance
    }
}

export function balancesLoaded() {
    return {
        type: 'BALANCES_LOADED'
    }
}

export function balancesLoading() {
    return {
        type: 'BALANCES_LOADING'
    }
}

export function daiDepositAmountChanged() {
    return {
        type: 'DAI_DEPOSIT_AMOUNT_CHANGED'
    }
}

export function daiWithdrawAmountChanged() {
    return {
        type: 'DAI_WITHDRAW_AMOUNT_CHANGED'
    }
}

