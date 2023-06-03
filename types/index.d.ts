export interface ConvertResult {
  date:    Date;
  info:    Info;
  query:   Query;
  result:  number;
  success: boolean;
}

interface Info {
  rate:      number;
  timestamp: number;
}

interface Query {
  amount: number;
  from:   string;
  to:     string;
}
