const axios = require("axios");
const SYMBOL= "BTCUSDT";
const BUY_PRICE= 35850;
const SELL_PRICE=35880;
const QUANTITY= "0.001";
const API_URL = "https://testnet.binance.vision";
                //https://api.binance.com
function calcSMA(data){
    const closes = data.map(candle=>parseFloat(candle[4]));
    const sum = closes.reduce((a,b)=>a+b);
    return sum/data.length;
}
async function start(){
    const {data} = await axios.get(API_URL + "/api/v3/klines?limit=21&interval=15m&symbol=" +SYMBOL);
    const candle = data[data.length-1];
    const price = parseFloat(candle[4]);
    let isOpened = false;
    console.log(candle);
    console.clear;
    console.log("Price:$"+price);
    const sma = calcSMA(data);
    if(price<(sma*0.95) &&isOpened==false){
        console.log("Comprar");
        isOpened=true;
        localStorage.setItem({status:"Comprei", price: price});
    } else if(price>(sma*1.05) &&isOpened==true){
        console.log("Vender");
        isOpened=false;
        localStorage.setItem({status:"Vendi", price: price});
    } else{
        console.log("Aguardar");
        console.log("isOpened:"+isOpened);
    }
    
}

setInterval(start, 3000);
start();