// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "./PerlinNoise.sol";

contract Contract {

    function sampleNoise() public pure {
        int256 n2d = PerlinNoise.noise2d(32768, 32768);
        int256 n3d = PerlinNoise.noise3d(32768, 32768, 32768);
    }

}
