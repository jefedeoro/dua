// deposit withdraw
// check apy on comp and aave 
// moves funds to best pool 

// to do:
// [x] deposit dai\
// [ ] check comp and aave apy 
// [ ] move funds to best pool 
//        [ ] withdraw from pool A
//        [ ] deposit funds in pool B
// [x] withdraw funds 


pragma solidity ^0.5.0;

import "openseppelin-solidity/contracts/math.SafeMath.sol";

// Compound Interface
import "./compound/Comptroller.sol";
import "./compound/CErc20.sol";
import "./compound/CEther.sol";
import "./compound/Oracle.sol";
// Aave interface
import "./IAToken.sol";
import "./IERC20.sol";
import "./IScaledBalanceToken.sol";


contract Exchange {
    using SafeMath for uint;
    
    address public feeAccount; // account for site fees
    uint256 public feePercent; // fee % amount

    address constant ETHER = address(0); 
    address constant dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;

    // address constant cDai = 0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643;
    address constant comptroller_address = 0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B;
    address constant COMP_address = 0xc00e94Cb662C3520282E6f5717214004A7f26888;
 
    address constant aDAI_address = 0x028171bCA77440897B824Ca71D1c56caC55b68A3;
    address constant UniswapV2_address = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    
    mapping(address => mapping(address => uint256 )) public tokens;
    mapping(uint256 => _Order) public orders;

    // events 
    event 

    struct _Order {
        address _feeAccount, 
        uint256 _feePercent, 
        address dai, 
        address cDai, 
        address aDai, 
        uint32 exchangeRateMantissa,
        address comptroller_address,
        address compToken,
        address uniswapV2_address;
    }

    // get compound rate fro cDai
    CErc20 cDai = CDai(0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643);
    uint exchangeRateMantissa = cDai.exchangeRateCurrent();
    
    // mapping(address => mapping(address => uint256)) public dai;

    // events 
    event Deposit(address dai, address user, uint256 amount, uint256 balance) async() => {
    
   
            constructor (address _feeAccount, uint256 _feePercent) public {
            feeAccount = _feeAccount;
            feePercent = _feePercent;
            dai = _dai;
            cDai = _cDai;
            aDai = _aDai;
            exchangeRateMantissa = compRate;
            comptroller_address = Comptroller;
            compToken = COMP_address;
            uniswapV2_address = uni
        }

    // deposit Dai 
        function daiDeposit(address _Dai, uint _amount) public {
        require(_token != ETHER);
        require(tokens(_dai).transferFrom(msg.sender, address(this), _amount);
        tokens[_dai][msg.sender] = tokens[_dai][msg.sender].add(_amount);
        emit Deposit(_dai, msg.sender, _amount, tokens[_dai][msg.sender]);
        // Dai 
        // how much 
        // track balance 
        // send tokens to contract 
        // emit event 
    }

    // withdraw Dai
    function daiWithdraw(address, _Dai, uint _amount) public {
        require(_dai != address(0));
        require(token[_dai][msg.sender] >= _amount);
        tokens[_dai][msg.sender] = tokens[_dai][msg.sender].sub(_amount);
        require(Token(_dai).transfer(msg.sender, _amount));
        emit Withdraw(_dai, msg.sender, _amount, tokens[_dai][msg.sender];

    // Dai balance    
    function balanceOf(address _dai, address _user) public view returns (uint256) {
        return tokens[_dai][_user];
    }

    // functiondepositEther() payable public {
    //     tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
    //     emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    // }

    // Fallback: reverts if ether is sent to this smart contract 
    function() external (
        revert();
    )

    // check aave 
    function getAssetPrice(address _aDaiRate) public view returns(uint256){
        return uint256 = aDaiRate;
        }

    uint256 exchangeRateMantissa = cDAI.exchangeRateCurrent();
        emit MyLog("Exchange Rate (scaled up): ", exchangeRateMantissa);
        constant exchangeRateMantissa = cDaiRate; 
    // Compare aave and comp apy 
    // TO DO 
    // Amount of current exchange rate from cToken to underlying
    function compareRate( 
        uint256 _cDaiRate, 
        uint256 _aDaiRate,
        ) public return (uint) {
            // check compound 

         if (_cDaiRate >= _aDaiRate) {
            //get aave permissions 
            function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s);
            
            // check aave balance 

            function scaledBalanceOf(address user);
            function getScaledUserBalanceAndSupply(address user);
            function isTransferAllowed(address user, uint256 amount);
             // withdraw any aDai there
            function transfer(address recipient, uint256 amount) external returns (bool);
  
            function supplyErc20ToCompound(
                address _erc20Contract,
                address _cErc20Contract,
                uint256 _numTokensToSupply
            ) public returns (uint) {
                // Create a reference to the underlying asset contract, like DAI.
                Erc20 underlying = Erc20(_erc20Contract);
                // Create a reference to the corresponding cToken contract, like cDAI
                CErc20 cToken = CErc20(_cErc20Contract);
                // Amount of current exchange rate from cToken to underlying
                uint256 exchangeRateMantissa = cToken.exchangeRateCurrent();
                emit MyLog("Exchange Rate (scaled up): ", exchangeRateMantissa);
                // Amount added to you supply balance this block
                uint256 supplyRateMantissa = cToken.supplyRatePerBlock();
                emit MyLog("Supply Rate: (scaled up)", supplyRateMantissa);
                // Approve transfer on the ERC20 contract
                underlying.approve(_cErc20Contract, _numTokensToSupply);
                // Mint cTokens
                uint mintResult = cToken.mint(_numTokensToSupply);
                return mintResult;
            }
                } else if {(_cDaiRate <= _aDaiRate) {
                    // Retrieve your asset based on an amount of the asset
                    redeemResult = cToken.redeemUnderlying(amount);
                }
   
            }

            // Deposit in compound 

            function supplyErc20ToCompound(
                address _erc20Contract,
                address _cErc20Contract,
                uint256 _numTokensToSupply
            ) public returns (uint) {
                // Create a reference to the underlying asset contract, like DAI.
                Dai = Erc20(_erc20Contract);

                // Create a reference to the corresponding cToken contract, like cDAI
                CErc20 cDai = CErc20(_cErc20Contract);



             // Amount added to you supply balance this block
                uint256 supplyRateMantissa = cToken.supplyRatePerBlock();
                emit MyLog("Supply Rate: (scaled up)", supplyRateMantissa);

                // Approve transfer on the ERC20 contract
                underlying.approve(_cErc20Contract, _numTokensToSupply);

             // Mint cTokens
             uint mintResult = cToken.mint(_numTokensToSupply);
                return mintResult;
            }
        }
        // remove from compound
        function redeemCErc20Tokens(
            uint256 amount,
            bool redeemType,
            address _cErc20Contract
        ) public returns (bool) {
            // Create a reference to the corresponding cToken contract, like cDAI
            CErc20 cToken = CErc20(_cErc20Contract);
            require(cToken.redeem(7) == 0, "something went wrong");
            // `amount` is scaled up by 1e18 to avoid decimals

            uint256 redeemResult;

            if (redeemType == true) {
                // Retrieve your asset based on a cToken amount
                redeemResult = cToken.redeem(amount);
            } else {
                // Retrieve your asset based on an amount of the asset
                redeemResult = cToken.redeemUnderlying(amount);
            }

            // Error codes are listed here:
            // https://compound.finance/developers/ctokens#ctoken-error-codes
            emit MyLog("If this is not 0, there was an error", redeemResult);
            require(redeemResult == 0, "redeemResult error");

            return true;
            interface IAToken is IERC20, IScaledBalanceToken {
                event Mint(address indexed from, uint256 value, uint256 index);
            }
        }
    }
    // enter aave

    // exit 
    function exitAll(address aDai, address cDai, address dai, msg.sender, uint256 _amunt) public returns (bool) {
        // exit compound 
        redeemResult = cToken.redeemUnderlying(amount);
        // check aave balance 
        function scaledBalanceOf(address user);
        function getScaledUserBalanceAndSupply(address user);
        function isTransferAllowed(address user, uint256 amount);
             // withdraw any aDai there
        function transfer(address recipient, uint256 amount) external returns (bool);
    // withdraw Dai
        function withdrawDai(address, _Dai, uint _amount) public {
            require(_dai != address(0));
            require(token[_dai][msg.sender] >= _amount);
            tokens[_dai][msg.sender] = tokens[_dai][msg.sender].sub(_amount);
            require(Token(_dai).transfer(msg.sender, _amount));
            emit Withdraw(_dai, msg.sender, _amount, tokens[_dai][msg.sender];
        }
    }
}


