import axios from "axios";
const BASE_URL = "http://localhost:3000/api/v1/";
import {IDepth} from "./types";

async function getDepth(market: string) : Promise<IDepth> {
  const response = await axios.get(`${BASE_URL}depth?symbol=${market}`);
  return response.data;
}

//http://localhost:3000/api/v1/depth?symbol=SOL_USDC_PERP

export { getDepth };
