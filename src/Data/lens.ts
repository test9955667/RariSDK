const lensAbi = require('../Fuse/contracts/abi/FusePoolLens.json');
const dirAbi  = require('../Fuse/contracts/abi/FusePoolDirectory.json');

///////// TODO: /////////

// 1) finish skeleton 

// 2) finish logic

// 3) make types/typefile for params and objects
    // 3a) can the comptroller type just be its address instead?

/////// ON-CHAIN DATA /////////

// Gets pools from contract storage, may break evm in future, fast and tried first
async function getPoolsUnsafe() {

}

// Gets pools from contract events, safe for long term calling, used as fallback
async function getPoolsSafe() {

}


const getPools = async() => {
    try{ return await getPoolsUnsafe();
    } catch (e) { return await getPoolsSafe(); }
}

/*/////////   OG LENS export async functionS     //////*/

export async function getPublicPoolsWithData() {

}

export async function getPoolsByAccountWithData(account: string) {

}

export async function getPoolsWithData(indexes: bigint[], pools: any[]) { 

}

export async function getPoolSummary(comptroller: any) { 

}

export async function getPoolAssetsWithData(
    comptroller: any, 
    cTokens: any[] | undefined, 
    user: string | undefined) 
    {

}

// use db fallback on chain 
export async function getTokenNameAndSymbol(token: string) {

}

export async function getPoolUsersWithData(
    comptroller: any[] | any, 
    maxHealth: bigint | undefined) 
    { 
    let health = maxHealth == undefined ? 0 : maxHealth;

}


export async function getPublicPoolUsersWithData(maxHealth: bigint | undefined) {
    let health = maxHealth == undefined ? 0 : maxHealth;
}


export async function getPoolsBysupplier(account: string) {

}


export async function getPoolsBySupplierWithData(account: string) {

}


export async function getUserSummary(account: string) {

}

export async function getPoolUserSummary(comptroller: any, account: string) {

}

export async function getWhitelistedPoolsByAccount(account: string) {

}

export async function getWhitelistedPoolsByAccountWithData(account: string) {

}