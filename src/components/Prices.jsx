import { useState, useEffect, useRef } from "react";
import { Select, Spin } from "antd";
import { createChart } from "lightweight-charts";

const tokens = [
  {
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    image: "/images/usdc.svg",
  },
  {
    symbol: "USDT",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    image: "/images/tether.svg",
  },
  {
    symbol: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    image: "/images/dai.svg",
  },
  {
    symbol: "FRAX",
    address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
    image: "/images/frax.svg",
  },
  {
    symbol: "PYUSD",
    address: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
    image: "/images/pyusd.svg",
  },
  {
    symbol: "USDE",
    address: "0x4c9EDD5852cd905f086C759E8383e09bff1E68B3",
    image: "/images/usde.svg",
  },
];

const timeframes = ["1H", "1D", "1W", "1M", "1Y", "2Y", "3Y", "All"];

function Prices() {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1H");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartContainerRef = useRef();
  const chartRef = useRef();
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    const fetchPriceData = async () => {
      setLoading(true);
      setError(null);
      try {
        const mockData = generateMockData(
          selectedTimeframe,
          selectedToken.symbol
        );

        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
        }

        const chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: 300,
          layout: {
            background: { type: "solid", color: "white" },
            textColor: "black",
          },
          grid: {
            vertLines: { color: "rgba(197, 203, 206, 0.5)" },
            horzLines: { color: "rgba(197, 203, 206, 0.5)" },
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
          },
          rightPriceScale: {
            scaleMargins: {
              top: 0.1,
              bottom: 0.1,
            },
            borderVisible: false,
          },
        });

        const lineSeries = chart.addLineSeries({
          color: "#008def",
          lineWidth: 2,
          priceFormat: { type: "price", precision: 6, minMove: 0.000001 },
        });
        lineSeries.setData(mockData);

        lineSeries.createPriceLine({
          price: 1,
          color: "rgba(255, 0, 0, 0.5)",
          lineWidth: 1,
          lineStyle: 2,
          axisLabelVisible: true,
          title: "1 USD",
        });

        chartRef.current = chart;

        const resizeObserver = new ResizeObserver((entries) => {
          if (
            entries.length === 0 ||
            entries[0].target !== chartContainerRef.current
          ) {
            return;
          }
          const newRect = entries[0].contentRect;
          chart.applyOptions({ width: newRect.width, height: newRect.height });
        });
        resizeObserver.observe(chartContainerRef.current);
        resizeObserverRef.current = resizeObserver;

        setLoading(false);
      } catch (err) {
        console.error("Error fetching price data:", err);
        setError("Unable to fetch price data. Please try again later.");
        setLoading(false);
      }
    };

    fetchPriceData();

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [selectedToken, selectedTimeframe]);

  const handleTokenChange = (value) => {
    setSelectedToken(tokens.find((token) => token.symbol === value));
  };

  const handleTimeframeChange = (value) => {
    setSelectedTimeframe(value);
  };

  return (
    <>
      <div className='balanceHeading'>Check Prices</div>
      <div className='subtext'>View prices of stablecoins against USD</div>
      <div className='pricesContainer'>
        <div className='controlsContainer'>
          <div className='tokenPriceContainer'>
            <Select
              className='tokenSelect'
              value={selectedToken.symbol}
              onChange={handleTokenChange}
              style={{ minWidth: 120, width: "fit-content" }}
              size='large'
            >
              {tokens.map((token) => (
                <Select.Option key={token.symbol} value={token.symbol}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={token.image}
                      alt={token.symbol}
                      style={{ width: 26, marginRight: 7, marginLeft: 1 }}
                    />
                    {token.symbol}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>
          <Select
            className='timeframeSelect'
            value={selectedTimeframe}
            onChange={handleTimeframeChange}
            style={{ minWidth: 120, width: "fit-content" }}
            size='large'
          >
            {timeframes.map((timeframe) => (
              <Select.Option key={timeframe} value={timeframe}>
                {timeframe}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className='chartContainer' ref={chartContainerRef}>
          {loading && <Spin size='large' />}
          {error && <div className='errorMessage'>{error}</div>}
        </div>
        <div className='priceInfo'>
          1 {selectedToken.symbol} = $
          {generateCurrentPrice(selectedToken.symbol).toFixed(6)} USD
        </div>
      </div>
    </>
  );
}

function generateMockData(timeframe, tokenSymbol) {
  const now = new Date();
  const data = [];
  let numPoints;
  let interval;
  let startDate;

  switch (timeframe) {
    case "1H":
      numPoints = 60;
      interval = 60 * 1000;
      startDate = new Date(now.getTime() - numPoints * interval);
      break;
    case "1D":
      numPoints = 24;
      interval = 60 * 60 * 1000;
      startDate = new Date(now.getTime() - numPoints * interval);
      break;
    case "1W":
      numPoints = 7;
      interval = 24 * 60 * 60 * 1000;
      startDate = new Date(now.getTime() - numPoints * interval);
      break;
    case "1M":
      numPoints = 30;
      interval = 24 * 60 * 60 * 1000;
      startDate = new Date(now.getTime() - numPoints * interval);
      break;
    case "1Y":
      numPoints = 365;
      interval = 24 * 60 * 60 * 1000;
      startDate = new Date(now.getTime() - numPoints * interval);
      break;
    case "2Y":
      numPoints = 730;
      interval = 24 * 60 * 60 * 1000;
      startDate = new Date(now.getTime() - numPoints * interval);
      break;
    case "3Y":
      numPoints = 1095;
      interval = 24 * 60 * 60 * 1000;
      startDate = new Date(now.getTime() - numPoints * interval);
      break;
    case "All":
    default:
      startDate = new Date("2020-01-01");
      numPoints = Math.floor((now - startDate) / (24 * 60 * 60 * 1000));
      interval = 24 * 60 * 60 * 1000;
  }

  if (tokenSymbol === "PYUSD" && startDate < new Date("2023-08-01")) {
    startDate = new Date("2023-08-01");
    numPoints = Math.floor((now - startDate) / interval);
  }

  let lastValue = 1;
  for (let i = 0; i < numPoints; i++) {
    const time = new Date(startDate.getTime() + i * interval);
    if (time > now) break;

    const change = (Math.random() - 0.5) * 0.002;
    lastValue = Math.max(0.95, Math.min(1.05, lastValue + change));

    data.push({
      time: time.getTime() / 1000,
      value: lastValue,
    });
  }

  return data;
}

function generateCurrentPrice(tokenSymbol) {
  return tokenSymbol === "PYUSD"
    ? 1 + (Math.random() - 0.5) * 0.01
    : 1 + (Math.random() - 0.5) * 0.001;
}

export default Prices;
