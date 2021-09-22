// import { dai, ether } from '../src/scripts/library'
// import { exchangeLoaded, web3AccountLoaded } from '../src/store/actions'
import { exchange, EVM_REVERT, ETHER_ADDRESS } from './helpers'


const Exchange = artifacts.require('./Echange')
const dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F

require('chai')
    .use(require('chai-as-promised'))
    .should()



contract('Exchange', ([deployer, feeAccount]) => {

    const Exchange = artifacts.require('./Echange')
    const dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F
    let dai
    let Exchange
    const feePercent = (10)

    beforeEach(async () => {
        //transfer tokens to user1
        depositToken.transfer(user1, dai(100), { from: deployer })
        // // deploy exchange
        exchange = await Exchange.new(feeAccount, feePercent)

    })


    describe('deployment', () => {
        it('tracks the fee account', async () => {
            const result = await exchange.feeAccount()
            result.toString().should.equal(feeAccount.toString())
        })

        it('tracks the fee percetage', async () => {
            const result = await exchange.feePercent()
            result.toString().should.equal(feePercent)
        })
    })

    describe('fallback', async () => {
        it('reverts when Erther is sent', async () => {
            await exchange.sendTransaction({ value: 1, from: user1 }).should.be.rejectedWith(EVM_REVERT)
        })
    })

    describe('depositing dai', () => {
        let result
        let amount


        describe('success', () => {

            beforeEach(async () => {
                amount = dai(10)
                await dai.approve(exchange.address, amount, { from: user1 })
                result = await exchange.depositToken(dai.address, amount, { from: user1 })
            })

            it('tracks the dai deposit', async () => {
                //check balance 
                let balance
                balance = await dai.balanceOf(exchange.address)
                balance.toString().should.equal(amount.toString())
                balance = await exchange.dai(dai.address, user1)
                balance.toString().should.equal(amount.toString())
            })

            it('emits a Deposit event', () => {
                const log = result.logs[0]
                log.event.should.eq('Deposit')
                const event = log.args
                event.dai.should.equal(dai.address, 'Dai address is correct')
                event.user.should.equal(user1, 'user address is correct')
                event.amount.toString().should.equal(dai(10).toString(), 'amount is correct')
                event.balance.toString().should.equal(dai(10).toString(), 'balance is correct')
            })
        })

        decribe('failure', () => {
            it('rejects Ether deposits', async () => {
                await exchange.depositToken(ETHER_ADDRESS, tokens(10), { from: user1 }).should.be.rejectedWith(EVM_REVERT)
            })
            it('fails when no tokens are approved', async () => {
                // didn't approve any tokends before depositing 
                await exchange.depositDai(dai.address, dai(10), { from: user1 }).should.be.rejectedWith(EVM_REVERT)
            })
        })
    })

    describe('withdrawing Dai', async () => {
        let result
        let amount

        describe('success', async () => {
            beforeEach(async () => {

                amount = dai(1)
                await token.approve(exchange.address, amount, { from: user1 })
                await exchange.depositDai({ dai, amount, from: user1 })

                // withdraw tokens 
                result = await exchange.withdrawDai(amount, { from: user1 })
            })

            it('withdraws Dai funds', async () => {
                const balance = await exchange.tokens(dai, user1)
                balance.toString().should.equal('0')
            })

            it('emits a "Withdraw" event', async () => {
                const log = result.logs[0]
                log.event.should.eq('Withdraw')
                const event = log.arg
                event.tokens.should.equal(dai)
                event.user.should.equal(user1)
                event.amount.toString().should.equal(amount.toString())
                event.balance.toString().should.equal('0')
            })
        })

        describe('failure', async () => {
            it('rejects withdrawls for insufficient balances', async () => {
                await exchange.withdrawDai(dai(100), { from: user1 }).should.be.rejectedWith(EVM_REVERT)
            })
        })
    })
})
