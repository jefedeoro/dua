// deposit withdraw
// check apy on comp and aave 
// moves funds to best pool 

// to do:
// [x] deposit dai\
// [ ] check comp and aave apy 
// [ ] move funds to best pool 
//        [ ] withdraw from pool A
//        [ ] deposit funds in pool B
// [ ] withdraw funds 


pragma solidity ^0.5.0;

import "openseppelin-solidity/contracts/math.SafeMath.sol";



contract Exchange {
    using SafeMath for uint;
    
    address public feeAccount; // account for site fees
    uint256 public feePercent;
    address constant ETHER = address(0); 
    address constant dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    
    mapping(address => mapping(address => uint256)) public dai;

    // events 
    event Deposit(address dai, address user, uint256 amount, uint256 balance);
    
    constructor (address _feeAccount, uint256 _feePercent) public {
        feeAccount = _feeAccount;
        feePercent =_feePercent;
    }

    // functiondepositEther() payable public {
    //     tokens[ETHER][msg.sender] = tokens[ETHER][msg.sender].add(msg.value);
    //     emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
    // }

    // Fallback: reverts if ether is sent to this smart contract 
    function() external (
        revert();
    )

    function depositDai(address _Dai, uint _amount) public {
        require(_token != ETHER);
        require(Dai(_dai).transferFrom(msg.sender, address(this), _amount);
        tokens[_dai][msg.sender] = tokens[_dai][msg.sender].add(_amount);
        emit Deposit(_dai, msg.sender, _amount, tokens[_dai][msg.sender]);
        // Dai 
        // how much 
        // track balance 
        // send tokens to contract 
        // emit event 
    }
}


