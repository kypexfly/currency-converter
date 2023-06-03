import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);

  const amount = searchParams.get("amount");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  if (!amount || !from || !to) return undefined;

  const url = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${from}&to=${to}&amount=${amount}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
      "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
