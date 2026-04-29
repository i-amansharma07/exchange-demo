import axios from "axios";
const BASE_URL = "http://localhost:3000/api/v1/";
import { IDepth,  ITrade} from "./types";

async function getDepth(market: string): Promise<IDepth> {
  const response = await axios.get(`${BASE_URL}depth?symbol=${market}`);
  return response.data;
}

async function getTicker(market: string) {
  const response = await axios.get(`${BASE_URL}ticker?symbol=${market}`);
  return response.data;
}

async function getTrades(market: string): Promise<ITrade[]> {
  const response = await axios.get(`${BASE_URL}/trades?symbol=${market}`);
  return response.data;
}



//http://localhost:3000/api/v1/depth?symbol=SOL_USDC_PERP

export { getDepth, getTicker, getTrades };
