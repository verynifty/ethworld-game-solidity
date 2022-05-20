// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./baseERC20Ressource.sol";

contract Metal is baseERC20Ressource {
    constructor() baseERC20Ressource("Metal", "MTL") {
    }
}
