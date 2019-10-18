/**
 * Contains the ContractService
 */

/**
 * The HD Wallet-enabled Web3 provider
 */
import HDWalletProvider = require('truffle-hdwallet-provider');
import { Injectable } from '@nestjs/common';
import * as logger from '../shared/logger';
require('dotenv').config();

/**
 * The Web3 library is our gateway to Ethereum
 */
const Web3 = require('web3');

/**
 * The main purpose of this service is to provide a function [[createContract]] to create a new Contract.
 * It also contains the gernerated interface and bytecode of the Selenium contract code.
 */
@Injectable()
export class ContractService {
  /**
   * the generated interface of the Selenium contract (../contract/Document.api.json)
   */
  private interface;

  /**
   * the generated bytecode of the Selenium contract (../contract/Document.bytecode)
   */
  private bytecode;

  /**
   * will set interface and bytecode
   */
  constructor() {
    /**
     * the generated interface
     */
    this.interface = [
      {
        constant: true,
        inputs: [],
        name: 'data',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        name: 'links',
        outputs: [
          {
            name: '',
            type: 'address',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            name: 'newData',
            type: 'string',
          },
          {
            name: 'newLinks',
            type: 'address[]',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
    ];

    /**
     * the generated ethereum VM bytecode
     */
    // tslint:disable-next-line:max-line-length
    this.bytecode =
      '608060405234801561001057600080fd5b5060405161039d38038061039d8339810160405280516020808301519183018051909392909201916100489160009190850190610064565b50805161005c9060019060208401906100e2565b505050610184565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a557805160ff19168380011785556100d2565b828001600101855582156100d2579182015b828111156100d25782518255916020019190600101906100b7565b506100de929150610143565b5090565b828054828255906000526020600020908101928215610137579160200282015b828111156101375782518254600160a060020a031916600160a060020a03909116178255602090920191600190910190610102565b506100de929150610160565b61015d91905b808211156100de5760008155600101610149565b90565b61015d91905b808211156100de578054600160a060020a0319168155600101610166565b61020a806101936000396000f30060806040526004361061004b5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166373d4a13a8114610050578063881d8a40146100da575b600080fd5b34801561005c57600080fd5b5061006561011b565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561009f578181015183820152602001610087565b50505050905090810190601f1680156100cc5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156100e657600080fd5b506100f26004356101a9565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156101a15780601f10610176576101008083540402835291602001916101a1565b820191906000526020600020905b81548152906001019060200180831161018457829003601f168201915b505050505081565b60018054829081106101b757fe5b60009182526020909120015473ffffffffffffffffffffffffffffffffffffffff169050815600a165627a7a72305820be20c034a60cde2c3315f868dce7b9afb2b1b3f7a6789e3617dec1f44941ba670029';
  }

  /**
   * create an instance of the smart contract (async)
   * @param hashedData the (hashed) data the contract should store
   * @param addressesOfLinkedDocs a list of linked documents
   * @returns the address of the contract
   */
  async createContract(
    hashedData: string,
    addressesOfLinkedDocs: Array<string>,
  ): Promise<string> {
    logger.log(
      'ContractService.createContract - interface vorhanden? ',
      !!this.interface,
    );
    logger.log(
      'ContractService.createContract - bytecode vorhanden?  ',
      !!this.bytecode,
    );
    logger.log(
      'ContractService.createContract - MEMONIC vorhanden?   ',
      !!process.env.MEMONIC,
    );
    logger.log(
      'ContractService.createContract - INFURA_URL vorhanden?',
      !!process.env.INFURA_URL,
    );

    const provider = new HDWalletProvider(
      process.env.MEMONIC,
      process.env.INFURA_URL,
    );

    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();

    logger.log(
      'ContractService.createContract - Attempting to deploy from account',
      accounts[0],
    );

    const resultFromEthereum = await new web3.eth.Contract(
      // JSON.parse(this.interface),
      this.interface,
    )
      .deploy({
        data: this.bytecode,
        arguments: [hashedData, addressesOfLinkedDocs || []],
      })
      .send({ gas: '1000000', from: accounts[0] });

    logger.log(
      'ContractService.createContract - resultFromEthereum = ',
      resultFromEthereum,
    );

    const result =
      resultFromEthereum &&
      resultFromEthereum.options &&
      resultFromEthereum.options.address
        ? resultFromEthereum.options.address
        : 'UNKNOWN';

    logger.log('ContractService.createContract - Contract deployed to', result);

    return result;
  }
}