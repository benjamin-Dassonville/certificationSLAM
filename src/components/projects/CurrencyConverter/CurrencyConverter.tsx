import { useState, useEffect } from 'react';
import './CurrencyConverter.css';

interface ExchangeRates {
  [key: string]: number;
}

const CURRENCIES = ['EUR', 'USD', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF'];
const API_KEY = import.meta.env.VITE_API_KEY;

export function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('EUR');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();
        setRates(data.rates);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des taux de change");
        setLoading(false);
      }
    };

    fetchRates();
  }, [fromCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const convertCurrency = (): string => {
    if (!rates[toCurrency]) return '0';
    const result = (parseFloat(amount) || 0) * rates[toCurrency];
    return result.toFixed(2);
  };

  if (loading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="converter-container">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title mb-4">Convertisseur de Devises</h3>
          
          <div className="mb-3">
            <label className="form-label">Montant</label>
            <input
              type="text"
              className="form-control"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Entrez un montant"
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">De</label>
              <select
                className="form-select"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {CURRENCIES.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Vers</label>
              <select
                className="form-select"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {CURRENCIES.map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="result mt-4">
            <h4>
              {amount} {fromCurrency} = {convertCurrency()} {toCurrency}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;