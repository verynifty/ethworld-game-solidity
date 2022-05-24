contract MapUtils {
    function isValidPlanet(
        bytes memory _data,
        uint128 _difficulty,
        uint128 _universe
    )
        public
        pure
        returns (
            bool isValid,
            int256 x,
            int256 y,
            uint256 size
        )
    {
        uint256 universe;
        (universe, x, y, size) = abi.decode(
            _data,
            (uint256, int256, int256, uint256)
        );
        uint256 encoded = uint256(keccak256(_data));
        isValid = encoded % _difficulty == 0;
        isValid = isValid && universe == _universe;
    }

    function sqrt(uint256 x) private pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function getDistance(
        int256 _x1,
        int256 _y1,
        int256 _x2,
        int256 _y2
    ) public pure returns (uint256) {
        int256 res = ((_x2 - _x1)**2) + ((_y2 - _y1)**2);
        return sqrt((res >= 0 ? uint256(res) : uint256(-res)));
    }
}
