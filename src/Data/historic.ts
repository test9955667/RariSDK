import axios from 'axios';
import * as db from './dbEnv';

// TODO: //

// 1) figure out env for each chain (blocksIn30)

type cTokenData = {
    timestamp: bigint,
    
}

// gets history of cToken
async function TokenHistory(
    address: string,
    chain: number,
    from: number, 
    to: number,
    ) {
        
        // cToken historic data and underlying address
        const tokenUrl = `${db.ip}/api/ctoken/history/${chain}-${address}-${from}-${to}`;
        let cTokenData: any;

        const underUrl = `${db.ip}/api/ctoken/metadata/${chain}-${address}`;
        let underlying: any;

        await axios.get(tokenUrl)
        .then(function(res) { cTokenData = res; })
        .catch(function(err) { throw new Error(err); });

        await axios.get(underUrl)
        .then(function(res) { underlying = res.data.underlying; })
        .catch(function(err) { throw new Error(err); }); 


        // Price data for underlying
        const priceUrl = `${db.ip}/api/underlying/price/${chain}-${underlying}-${from}-${to}`;
        let priceData: any;

        await axios.get(priceUrl)
        .then(function(res){ priceData = res; })
        .catch(function(err){ priceData = undefined; });



        

        // db.getCTokenMetadata
        // if undefined db.getUnderlyingMetadata
        // get underlying price (under, to from)
        // get cToken entries (addr, to, from)

        // start = 0
        // index = 0
        // for underlying prices 
        // if price.timestamp > entries[index].timestamp
        // currSupply 
}

TokenHistory("test", 1, 12, 1334);