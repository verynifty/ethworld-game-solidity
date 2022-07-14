// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NameUtils {

    string[] public first = [
        "Friso",
        "Nitedan",
        "Slandspia",
        "Frenchle",
        "Niatar",
        "Republic of",
        "Ferael",
        "Neczechking",
        "Rymal",
        "Sobiet",
        "United States of",
        "Territory of",
        "Southern",
        "Dimensional",
        "Future of",
        "The great",
        "The low",
        "The bottom",
        "The top",
        "Desertic",
        "Arid",
        "Acid",
        "Icy",
        "Ministry of",
        "Iced",
        "Remainings of",
        "The",
        "Fren",
        "Elon",
        "South",
        "North",
        "East",
        "West",
        "Upper",
        "Lower",
        "Distinct",
        "Major",
        "Colony of"
    ];
    
    string[] public second = [
        "Name",
        "Nifty",
        "Kush",
        "Pol",
        "Ger",
        "Fran",
        "Pleb",
        "Chad",
        "Ja",
        "Sau",
        "Jupi",
        "Kirgi",
        "Costa",
        "Su",
        "Zhu",
        "Gro",
        "U",
        "A",
        "I",
        "O",
        "E",
        "Y",
        "Bel",
        "Mu",
        "Ro",
        "Shi",
        "Mi",
        "Lee",
        "Oo",
        "Aloa",
        "Ma",
        "Sha",
        "To",
        "So",
        "Ju",
        "Ada",
        "Bra",
        "Du",
        "Mo",
        "Ala",
        "Gu",
        "Vi",
        "Ama",
        "Uru",
        "Opo",
        "Colo",
        "Ame",
        "Somu",
        "Equa",
        "Divi",
        "Fa"
    ];

    string[] public third = [
        "cly",
        "zea",
        "stan",
        "dia",
        "istan",
        "distan",
        "dor",
        "bistan",
        "pro",
        "ko",
        "tua",
        "ktor",
        "many",
        "mania",
        "bo",
        "thua",
        "ce",
        "Gium",
        "snia",
        "rusa",
        "khee",
        "quein",
        "keeling",
        "sk",
        "tish",
        "co",
        "rica",
        "mocan",
        "droon",
        "bang",
        "gan",
        "stinerue",
        "tesco",
        "wanme",
        "dimenbru",
        "luke",
        "debe",
        "dran",
        "bar",
        "bo",
        "lo",
        "sa",
        "zonia",
        "stu"
    ];

    string[] public fourth = [
        "Kingdom",
        "Democracy",
        "DAO",
        "of the montains",
        "of the seas",
        "lands",
        "peak",
        "moon",
        "sun"
    ];

    string[] public fifth = [
        "I",
        "1",
        "II",
        "III",
        "2",
        "3",
        "the second",
        "the first"
    ];

    function getName(uint256 _seed) public view returns (
        string memory name
    ) {
        uint256 a = uint256(sha256(abi.encode(_seed, 1))) % first.length;
        uint256 b = uint256(sha256(abi.encode(_seed, 2))) % second.length;
        uint256 c = uint256(sha256(abi.encode(_seed, 3))) % third.length;
        uint256 d = uint256(sha256(abi.encode(_seed, 4))) % fourth.length;
        uint256 e = uint256(sha256(abi.encode(_seed, 5))) % fifth.length;
         name = string(abi.encodePacked(first[a], second[b], third[c], fourth[d], fifth[e]));
    }
}