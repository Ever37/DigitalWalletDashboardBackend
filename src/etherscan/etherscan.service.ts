import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

interface ApiResponse {
  status: string;
  message: string;
  result: number;
}

interface AccountBalance {
  account: string;
  balance: string;
}

export enum SortOption {
  ASC = 'asc',
  DESC = 'desc',
}

@Injectable()
export class EtherscanService {
  private readonly etherscanUrl = 'https://api.etherscan.io/api';
  private readonly apiKey = 'NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY';

  async getWalletInfo(walletAddress: string): Promise<ApiResponse> {
    const endpoint = `${this.etherscanUrl}?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${this.apiKey}`;
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(endpoint);
      console.log('response :', response);
      return response.data;
    } catch (error) {
      console.error('error :', error.statusText);
      throw new Error('Error getting wallet information from Etherscan');
    }
  }

  async getMultipleWalletInfo(
    walletAddresses: string[],
  ): Promise<AccountBalance> {
    const stringAddresses = walletAddresses.join(',');
    const endpoint = `${this.etherscanUrl}?module=account&action=balancemulti&address=${stringAddresses}&tag=latest&apikey=${this.apiKey}`;
    try {
      const response: AxiosResponse<AccountBalance> = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('error :', error.statusText);
      throw new Error('Error getting wallet information from Etherscan');
    }
  }

  async getTransactionsByAddress(
    walletAddress: string,
    sort: SortOption,
  ): Promise<any> {
    const endpoint = `${this.etherscanUrl}?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=1000000&page=1&offset=10&sort=${sort}&apikey=${this.apiKey}`;
    try {
      const response: AxiosResponse<any> = await axios.get(endpoint);
      return response.data.result;
    } catch (error) {
      console.error('error :', error.statusText);
      throw new Error('Error getting transactions information from Etherscan');
    }
  }
}
