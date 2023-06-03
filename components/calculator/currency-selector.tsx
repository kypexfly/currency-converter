"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { CURRENCIES } from "../../lib/constants";

const currencies = Object.entries(CURRENCIES).map((currency) => ({
  value: currency[0],
  label: `${currency[0]} - ${currency[1]}`,
}));

interface CurrencySelectorProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function CurrencySelector({ value, setValue }: CurrencySelectorProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {value ? currencies.find((currency) => currency.value === value)?.label : "Select currency"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-full p-0">
        <Command>
          <CommandInput placeholder="Search currency" />
          <CommandEmpty>No currency found.</CommandEmpty>
          <CommandGroup className="h-48 overflow-y-auto">
            {currencies.map((currency) => (
              <CommandItem
                key={currency.value}
                onSelect={() => {
                  setValue(currency.value);
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", value === currency.value ? "opacity-100" : "opacity-0")} />
                {currency.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
