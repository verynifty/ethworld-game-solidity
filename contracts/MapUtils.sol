contract MapUtils {

    function isValidPlanet(bytes memory _data, uint128 _difficulty, uint128 _universe)
        public
        pure
        returns (
            bool isValid,
            uint256 x,
            uint256 y,
            uint256 size
        )
    {
        uint256 universe;
        (universe, x, y, size) = abi.decode(
            _data,
            (uint256, uint256, uint256, uint256)
        );
        uint256 encoded = uint256(keccak256(_data));
        isValid = encoded % _difficulty == 0;
        isValid = isValid && universe == _universe;
    }
    
}
