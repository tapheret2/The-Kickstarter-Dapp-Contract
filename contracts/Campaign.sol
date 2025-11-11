pragma solidity ^0.4.17;

contract Campaign
{
    struct Request
    {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    address public manager;
    uint public minimumContribution;
    address[] public approvers;

    function Campaign(uint minimum) public
    {
        manager=msg.sender;
        minimumContribution=minimum;
    }
}