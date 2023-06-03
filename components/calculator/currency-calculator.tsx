"use client";

import { CurrencySelector } from "@/components/calculator/currency-selector";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { Label } from "../ui/label";

import { ConvertResult } from "../../types";
import Loading from "../loader";

const FormGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-4 mb-4 w-full flex flex-col">{children}</div>;
};

export function CurrencyCalculator() {
  const [from, setFrom] = useState(useSearchParams().get("from") ?? "USD");
  const [to, setTo] = useState(useSearchParams().get("to") ?? "EUR");
  const [amount, setAmount] = useState<number | null>(null);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [error, setError] = useState<ErrorEvent | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  const convertCurrencies = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    const searchParams = new URLSearchParams({
      from,
      to,
    });

    setLoading(true);

    try {
      const res = await fetch(`/api/convert/?from=${from}&to=${to}&amount=${amount}`);
      
      if (!res.ok) {
        throw new Error("Response error from server");
      }
      router.push(`/?${searchParams.toString()}`);
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError(e as ErrorEvent);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-2 py-4">
      <form className="rounded-xl px-4 py-8 border bg-slate-800" onSubmit={convertCurrencies}>
        <FormGroup>
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" onChange={(e) => setAmount(+e.target.value)} placeholder="Insert amount" type="number" />
        </FormGroup>

        <FormGroup>
          <Label>From</Label>
          <CurrencySelector value={from} setValue={setFrom} />
        </FormGroup>

        <div className="flex justify-center">
          <Button
            variant={"outline"}
            type="button"
            className="rounded-full p-2 aspect-square "
            onClick={swapCurrencies}
          >
            <Icons.swap />
          </Button>
        </div>

        <FormGroup>
          <Label>To</Label>
          <CurrencySelector value={to} setValue={setTo} />
        </FormGroup>

        <div className="flex justify-center">
          <Button type="submit" disabled={!amount || isLoading} className="flex disabled:cursor-not-allowed">
            {isLoading ? <Loading /> : "Convert"}
          </Button>
        </div>

        <AnimatePresence mode="popLayout">
          {result ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {result?.query.amount} <strong>{result?.query.from}</strong> = <br />
              <div className="text-4xl my-2">
                {result?.result} <strong>{result?.query.to}</strong>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-500 font-bold"
            >
              {error.message}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </form>
    </div>
  );
}
