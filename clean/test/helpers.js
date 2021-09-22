export const exchange =  (n) => {
    return new web3AccountLoaded.utils.web3AccountLoaded(
    web3AccountLoaded.utils.toWei(n.toString(), 'ether')
    )
}

export const EVM_REVERT = 'VM Exception while processing transaction: revert';

export const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000'

