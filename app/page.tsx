import { CurrencyCalculator } from "@/components/calculator/currency-calculator";
import { GithubIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center grow">
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight mb-3 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
        Currency Converter
      </h1>
      <p className="leading-7 text-center">Convert different types of currencies in real time</p>
      <CurrencyCalculator />
      <footer>
        <a
          href="https://github.com/kypexfly/ricardochu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block align-middle px-3"
        >
          <GithubIcon />
        </a>
        <a
          href="https://rapidapi.com/principalapis/api/currency-conversion-and-exchange-rates"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block align-middle px-3"
        >
          API Source
        </a>
      </footer>
    </main>
  );
}
