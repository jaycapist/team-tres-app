'use client';

import { useEffect, useRef, useState } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import { Chart } from 'chart.js/auto';
import './page.css';
import zoomPlugin from 'chartjs-plugin-zoom';

const Forecast = () => {
  interface ForecastData {
    year: number;
    revenue: number;
    netSales: number;
    costOfContracting: number;
    overhead: number;
    costOfGoodsSold: number;
    grossProfit: number;
    grossMarginPercentage: number;
    salariesAndBenefits: number;
    rentAndOverhead: number;
    depreciationAndAmortization: number;
    interest: number;
    totalOperatingExpenses: number;
    operatingExpensesPercentage: number;
    profitFromOperations: number;
    profitFromOperationsPercentage: number;
    interestIncome: number;
    interestExpense: number;
    gainOnDisposalOfAssets: number;
    otherIncome: number;
    totalOtherIncome: number;
    totalOtherIncomePercentage: number;
    incomeBeforeIncomeTaxes: number;
    pretaxIncomePercentage: number;
    incomeTaxes: number;
    netIncome: number;
    netIncomePercentage: number;
    cashAndCashEquivalents: number;
    accountsReceivable: number;
    inventory: number;
    totalCurrentAssets: number;
    propertyPlantAndEquipment: number;
    investment: number;
    totalLongTermAssets: number;
    totalAssets: number;
    accountsPayable: number;
    currentDebtService: number;
    taxesPayable: number;
    totalCurrentLiabilities: number;
    longDebtService: number;
    loansPayable: number;
    totalLongTermLiabilities: number;
    totalLiabilities: number;
    equityCapital: number;
    retainedEarnings: number;
    totalStockholdersEquity: number;
    totalLiabilitiesAndEquity: number;
  }

  interface ForecastResponse {
    forecast: ForecastData[];
  }

  const [forecast, setForecast] = useState<ForecastData[]>([]);

  const [loading, setLoading] = useState(true);

  const [multipliers] = useState({
    revenue: 0.015,
    costOfContracting: 0.015,
    overhead: 0.015,
    salariesAndBenefits: 0.015,
    rentAndOverhead: 0.015,
    depreciationAndAmortization: 0.015,
    interest: 0.015,
    profitFromOperations: 0.015,
    interestIncome: 0.015,
    interestExpense: 0.015,
    gainOnDisposalOfAssets: 0.015,
    otherIncome: 0.015,
    incomeTaxes: 0.015,
    cashAndCashEquivalents: 0.015,
    accountsReceivable: 0.015,
    inventory: 0.015,
    propertyPlantAndEquipment: 0.015,
    investment: 0.015,
    accountsPayable: 0.015,
    taxesPayable: 0.015,
    currentDebtService: 0.015,
    loansPayable: 0.015,
    longDebtService: 0.015,
    equityCapital: 0.015,
    retainedEarnings: 0.015,
  });

  const [settings] = useState<Record<string, 'average' | 'multiplier'>>({
    revenue: 'multiplier',
    costOfContracting: 'average',
    overhead: 'average',
    salariesAndBenefits: 'average',
    rentAndOverhead: 'average',
    depreciationAndAmortization: 'average',
    interest: 'average',
    profitFromOperations: 'average',
    interestIncome: 'average',
    interestExpense: 'average',
    gainOnDisposalOfAssets: 'average',
    otherIncome: 'average',
    incomeTaxes: 'average',
    cashAndCashEquivalents: 'average',
    accountsReceivable: 'average',
    inventory: 'average',
    propertyPlantAndEquipment: 'average',
    investment: 'average',
    accountsPayable: 'average',
    taxesPayable: 'average',
    currentDebtService: 'average',
    loansPayable: 'average',
    longDebtService: 'average',
    equityCapital: 'average',
    retainedEarnings: 'average',
  });

  Chart.register(zoomPlugin);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch('/api/forecast-generation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyId: '1',
            settings,
            multipliers,
          }),
        });

        const data: ForecastResponse = await response.json();
        console.log('Fetched data:', data);
        if (data.forecast) {
          setForecast(data.forecast);
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForecastData();
  }, [settings, multipliers]);

  const chartRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const chartInstances = useRef<Array<Chart | null>>([null, null, null, null, null, null, null]);

  useEffect(() => {
    const data1 = {
      labels: forecast.map((item) => item.year),
      datasets: [
        {
          label: 'Revenue',
          data: forecast.map((item) => item.revenue),
          fill: false,
          borderColor: '#B01E8C',
          tension: 0.1,
          pointHoverBackgroundColor: '#B01E8C',
        },
        {
          label: 'Net Sales',
          data: forecast.map((item) => item.netSales),
          fill: false,
          borderColor: '#FFAF00',
          tension: 0.1,
          pointHoverBackgroundColor: '#FFAF00',
        },
      ],
    };

    const data2 = {
      labels: forecast.map((item) => item.year),
      datasets: [
        {
          label: 'Salaries and Benefits',
          data: forecast.map((item) => item.salariesAndBenefits),
          backgroundColor: '#F6861E',
        },
        {
          label: 'Rent and Overhead',
          data: forecast.map((item) => item.rentAndOverhead),
          backgroundColor: '#B01E8C',
        },
        {
          label: 'Depreciation and Amortization',
          data: forecast.map((item) => item.depreciationAndAmortization),
          backgroundColor: '#6360AA',
        },
        {
          label: 'Interest',
          data: forecast.map((item) => item.interest),
          backgroundColor: '#2252FE',
        },
      ],
    };

    const data3 = {
      labels: forecast.map((item) => item.year),
      datasets: [
        {
          label: 'Net Income',
          data: forecast.map((item) => item.netIncome),
          fill: false,
          borderColor: '#2252FE',
          tension: 0.1,
          pointHoverBackgroundColor: '#05AFCA',
        },
      ],
    };

    const data4 = {
      labels: forecast.map((item) => item.year),
      datasets: [
        {
          label: 'Costs of Contracting',
          data: forecast.map((item) => item.costOfContracting),
          backgroundColor: '#F6861E',
        },
        {
          label: 'Overhead',
          data: forecast.map((item) => item.overhead),
          backgroundColor: '#B01E8C',
        },
        {
          label: 'Costs of Goods Sold',
          data: forecast.map((item) => item.inventory),
          backgroundColor: '#6360AA',
        },
      ],
    };

    const data5 = {
      labels: forecast.map((item) => item.year),
      datasets: [
        {
          label: 'Total Current Assets',
          data: forecast.map((item) => item.totalCurrentAssets),
          fill: false,
          borderColor: '#B01E8C',
          tension: 0.1,
          pointHoverBackgroundColor: '#B01E8C',
        },
        {
          label: 'Total Long-term Assets',
          data: forecast.map((item) => item.totalLongTermAssets),
          fill: false,
          borderColor: '#FFAF00',
          tension: 0.1,
          pointHoverBackgroundColor: '#FFAF00',
        },
      ],
    };

    const data6 = {
      labels: forecast.map((item) => item.year),
      datasets: [
        {
          label: 'Accounts Payable',
          data: forecast.map((item) => item.accountsPayable),
          backgroundColor: '#F6861E',
        },
        {
          label: 'Debt Service',
          data: forecast.map((item) => item.currentDebtService),
          backgroundColor: '#B01E8C',
        },
        {
          label: 'Taxes Payable',
          data: forecast.map((item) => item.taxesPayable),
          backgroundColor: '#6360AA',
        },
      ],
    };

    const data7 = {
      labels: forecast.map((item) => item.year),
      datasets: [
        {
          label: 'Debt Service',
          data: forecast.map((item) => item.longDebtService),
          backgroundColor: '#F6861E',
        },
        {
          label: 'Loans Payable',
          data: forecast.map((item) => item.loansPayable),
          backgroundColor: '#B01E8C',
        },
      ],
    };

    const chartConfigs = [
      {
        type: 'line' as const,
        data: data1,
        options: {
          responsive: true,
          interaction: {
            mode: 'index' as const,
            intersect: false,
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'y' as const,
              },
            },
            title: {
              display: true,
              text: 'Revenue vs. Net Sales',
              font: { size: 25, weight: 700 },
              color: 'white',
            },
            legend: {
              display: true,
              position: 'bottom' as 'bottom',
              labels: {
                color: 'white',
                font: { size: 18 },
              },
            },
            tooltip: {
              bodyColor: 'white',
              titleColor: 'white',
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
                font: { size: 16 },
              },
              title: {
                display: true,
                text: 'Year',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              ticks: {
                color: 'white',
                font: { size: 16 },
              },
              beginAtZero: true,
              title: {
                display: true,
                text: 'Dollars ($)',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
        },
      },
      {
        type: 'bar' as const,
        data: data2,
        options: {
          responsive: true,
          interaction: {
            mode: 'index' as const,
            intersect: false,
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'y' as const,
              },
            },
            title: {
              display: true,
              text: 'Operating Expenses Over Time',
              font: { size: 25, weight: 700 },
              color: 'white',
            },
            legend: {
              display: true,
              position: 'bottom' as 'bottom',
              labels: {
                color: 'white',
                font: {
                  size: 18,
                },
              },
            },
            tooltip: {
              bodyColor: 'white',
              titleColor: 'white',
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                color: 'white',
              },
              title: {
                display: true,
                text: 'Year',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              stacked: true,
              ticks: {
                color: 'white',
              },
              beginAtZero: true,
              title: {
                display: true,
                text: 'Dollars ($)',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
        },
      },
      {
        type: 'line' as const,
        data: data3,
        options: {
          responsive: true,
          interaction: {
            mode: 'index' as const,
            intersect: false,
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'y' as const,
              },
            },
            title: {
              display: true,
              text: 'Net Income Over Time',
              font: { size: 25, weight: 700 },
              color: 'white',
            },
            legend: {
              display: true,
              position: 'bottom' as 'bottom',
              labels: {
                color: 'white',
                font: {
                  size: 18,
                },
              },
            },
            tooltip: {
              bodyColor: 'white',
              titleColor: 'white',
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
              },
              title: {
                display: true,
                text: 'Year',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              ticks: {
                color: 'white',
              },
              beginAtZero: true,
              title: {
                display: true,
                text: 'Dollars ($)',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
        },
      },
      {
        type: 'bar' as const,
        data: data4,
        options: {
          responsive: true,
          interaction: {
            mode: 'index' as const,
            intersect: false,
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'y' as const,
              },
            },
            title: {
              display: true,
              text: 'Costs of Goods Sold',
              font: { size: 25, weight: 700 },
              color: 'white',
            },
            legend: {
              display: true,
              position: 'bottom' as 'bottom',
              labels: {
                color: 'white',
                font: {
                  size: 18,
                },
              },
            },
            tooltip: {
              bodyColor: 'white',
              titleColor: 'white',
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                color: 'white',
              },
              title: {
                display: true,
                text: 'Year',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              stacked: true,
              ticks: {
                color: 'white',
              },
              beginAtZero: true,
              title: {
                display: true,
                text: 'Dollars ($)',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
        },
      },
      {
        type: 'line' as const,
        data: data5,
        options: {
          responsive: true,
          interaction: {
            mode: 'index' as const,
            intersect: false,
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'y' as const,
              },
            },
            title: {
              display: true,
              text: 'Current vs. Long-term Assets',
              font: { size: 25, weight: 700 },
              color: 'white',
            },
            legend: {
              display: true,
              position: 'bottom' as 'bottom',
              labels: {
                color: 'white',
                font: { size: 18 },
              },
            },
            tooltip: {
              bodyColor: 'white',
              titleColor: 'white',
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
                font: { size: 16 },
              },
              title: {
                display: true,
                text: 'Year',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              ticks: {
                color: 'white',
                font: { size: 16 },
              },
              beginAtZero: true,
              title: {
                display: true,
                text: 'Dollars ($)',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
        },
      },
      {
        type: 'bar' as const,
        data: data6,
        options: {
          responsive: true,
          interaction: {
            mode: 'index' as const,
            intersect: false,
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'y' as const,
              },
            },
            title: {
              display: true,
              text: 'Current Liabilities',
              font: { size: 25, weight: 700 },
              color: 'white',
            },
            legend: {
              display: true,
              position: 'bottom' as 'bottom',
              labels: {
                color: 'white',
                font: {
                  size: 18,
                },
              },
            },
            tooltip: {
              bodyColor: 'white',
              titleColor: 'white',
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                color: 'white',
              },
              title: {
                display: true,
                text: 'Year',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              stacked: true,
              ticks: {
                color: 'white',
              },
              beginAtZero: true,
              title: {
                display: true,
                text: 'Dollars ($)',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
        },
      },
      {
        type: 'bar' as const,
        data: data7,
        options: {
          responsive: true,
          interaction: {
            mode: 'index' as const,
            intersect: false,
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'y' as const,
              },
            },
            title: {
              display: true,
              text: 'Long-term Liabilities',
              font: { size: 25, weight: 700 },
              color: 'white',
            },
            legend: {
              display: true,
              position: 'bottom' as 'bottom',
              labels: {
                color: 'white',
                font: {
                  size: 18,
                },
              },
            },
            tooltip: {
              bodyColor: 'white',
              titleColor: 'white',
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                color: 'white',
              },
              title: {
                display: true,
                text: 'Year',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
            y: {
              stacked: true,
              ticks: {
                color: 'white',
              },
              beginAtZero: true,
              title: {
                display: true,
                text: 'Dollars ($)',
                font: { size: 20 },
                color: 'white',
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.2)',
              },
            },
          },
        },
      },
    ];

    chartRefs.forEach((ref, chartIndex) => {
      if (ref.current) {
        if (chartInstances.current[chartIndex]) {
          chartInstances.current[chartIndex]?.destroy();
        }
        chartInstances.current[chartIndex] = new Chart(ref.current, chartConfigs[chartIndex]);
      }
    });

    return () => {
      chartInstances.current.forEach((chart) => chart?.destroy());
    };
  }, [forecast]);

  return (
    <main>
      <Container id="dashboard" fluid className="text-center">
        <h1>12-YEAR FINANCIAL FORECAST</h1>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" bordered responsive hover className="financial-table rounded w-85">
            <thead>
              {loading && (
                <tr>
                  <td colSpan={forecast.length + 1} className="text-center px-4">
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </td>
                </tr>
              )}
              <tr className="table-primary">
                <th colSpan={forecast.length + 1} className="company left text-uppercase text-center">
                  Company Name
                </th>
              </tr>
            </thead>

            <tbody className="font">
              <tr className="table-secondary">
                <td className="bold px-4">Financial Compilation</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
            </tbody>

            <thead>
              <tr className="table-success">
                <th colSpan={forecast.length + 1} className="income-statement left text-uppercase text-center">
                  Income Statement
                </th>
              </tr>
            </thead>

            <colgroup>
              <col style={{ width: '30%' }} />
              {forecast.map(() => (
                <col style={{ width: `${70 / forecast.length}%` }} />
              ))}
            </colgroup>

            <tbody className="font">
              <tr className="table-light">
                <td className="px-4 left">Revenue</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.revenue
                      ? data.revenue.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>

              <tr className="table-striped bold">
                <td className="px-4 left">Net Sales</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.netSales
                      ? data.netSales.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="dark-background">
          <canvas ref={chartRefs[0]} />
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr />
            </thead>
            <tbody>
              <tr className="table-dark">
                <td className="bold px-4">Cost of goods sold:</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Cost of Contracting</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.costOfContracting
                      ? data.costOfContracting.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Overhead</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.overhead
                      ? data.overhead.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Cost of Goods Sold:</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.costOfGoodsSold
                      ? data.costOfGoodsSold.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Gross Profit:</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.grossProfit
                      ? data.grossProfit.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Gross Margin %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.grossMarginPercentage
                      ? data.grossMarginPercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="dark-background">
          <canvas ref={chartRefs[3]} />
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr />
            </thead>
            <tbody>
              <tr className="table-dark">
                <td className="bold px-4">Operating Expenses:</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Salaries and Benefits</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.salariesAndBenefits
                      ? data.salariesAndBenefits.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Rent and Overhead</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.rentAndOverhead
                      ? data.rentAndOverhead.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Deprecation and Amortization</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.depreciationAndAmortization
                      ? data.depreciationAndAmortization.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Interest</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.interest
                      ? data.interest.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Operating Expenses:</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalOperatingExpenses
                      ? data.totalOperatingExpenses.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Operating Expense %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.operatingExpensesPercentage
                      ? data.operatingExpensesPercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Profit (loss) from Operations</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.profitFromOperations
                      ? data.profitFromOperations.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Profit (loss) from Operations %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.profitFromOperationsPercentage
                      ? data.profitFromOperationsPercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="dark-background">
          <canvas ref={chartRefs[1]} />
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr />
            </thead>
            <tbody>
              <tr className="table-dark">
                <td className="bold px-4">Other Income (Expense):</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Interest Income</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.interestIncome
                      ? data.interestIncome.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Interest Expense</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.interestExpense
                      ? data.interestExpense.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Gain (loss) on Disposal of Assets</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.gainOnDisposalOfAssets
                      ? data.gainOnDisposalOfAssets.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Other Income (expense)</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.otherIncome
                      ? data.otherIncome.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Other Income (expense)</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalOtherIncome
                      ? data.totalOtherIncome.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Total Other Income (expense) %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalOtherIncomePercentage
                      ? data.totalOtherIncomePercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Income (loss) Before Income Taxes</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.incomeBeforeIncomeTaxes
                      ? data.incomeBeforeIncomeTaxes.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Pre-tax income %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.pretaxIncomePercentage
                      ? data.pretaxIncomePercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Income Taxes</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.incomeTaxes
                      ? data.incomeTaxes.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Net Income (loss)</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.netIncome
                      ? data.netIncome.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 right">Net Income (loss) %</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.netIncomePercentage
                      ? data.netIncomePercentage.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="dark-background">
          <canvas ref={chartRefs[2]} />
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr className="table-primary">
                <th colSpan={forecast.length + 1} className="balance-sheet left text-uppercase text-center">
                  Balance Sheet
                </th>
              </tr>
            </thead>
            <tbody className="font">
              <tr className="table-dark">
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="bold font">
                  Current Assets
                </th>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Cash and Cash Equivalents</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.cashAndCashEquivalents
                      ? data.cashAndCashEquivalents.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Account Receivable</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.accountsReceivable
                      ? data.accountsReceivable.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Inventory</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.inventory
                      ? data.inventory.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Current Assets</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalCurrentAssets
                      ? data.totalCurrentAssets.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr>
                <th className="bold font">
                  Long-term Assets
                </th>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Property, Plant, and Equiptment</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.propertyPlantAndEquipment
                      ? data.propertyPlantAndEquipment.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Investment</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.investment
                      ? data.investment.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Long-term Asset</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalLongTermAssets
                      ? data.totalLongTermAssets.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="bold">
                <td className="px-4 center">TOTAL ASSETS</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalAssets
                      ? data.totalAssets.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="dark-background">
          <canvas ref={chartRefs[4]} />
        </div>
        <div className="d-flex justify-content-center py-4 grey-bg">
          <Table striped="columns" responsive hover bordered className="financial-table rounded w-85">
            <thead>
              <tr />
            </thead>
            <tbody>
              <tr className="table-dark">
                <td className="bold underline px-4">LIABILITIES AND EQUITY</td>
                {forecast.map((data) => (
                  <td className="bold px-4 text-center">
                    {data.year}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="bold left">Current Liabilities (due within 1 year)</td>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Accounts Payable</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.accountsPayable
                      ? data.accountsPayable.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Debt Service</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.currentDebtService
                      ? data.currentDebtService.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Taxes Payable</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.taxesPayable
                      ? data.taxesPayable.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Current Liabilities</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalCurrentLiabilities
                      ? data.totalCurrentLiabilities.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="bold left">
                <td>Long-term Liabilities (due after one year)</td>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Debt Service</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.longDebtService
                      ? data.longDebtService.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Loans Payable</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.loansPayable
                      ? data.loansPayable.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Long-term Liabilities</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalLongTermLiabilities
                      ? data.totalLongTermLiabilities.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Liabilities</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalLiabilities
                      ? data.totalLiabilities.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="bold left">
                <td>Stockholder&apos;s Equity</td>
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Equity Capital</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.equityCapital
                      ? data.equityCapital.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light">
                <td className="px-4 left">Retained Earnings</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.retainedEarnings
                      ? data.retainedEarnings.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="table-light bold">
                <td className="px-4 left">Total Stockholder&apos;s Equity</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalStockholdersEquity
                      ? data.totalStockholdersEquity.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
              <tr className="bold underline">
                <td className="px-4 left">TOTAL LIABILITIES AND EQUITY</td>
                {forecast.map((data) => (
                  <td key={data.year} className="px-4 grey-bg text-end">
                    {data.totalLiabilitiesAndEquity
                      ? data.totalLiabilitiesAndEquity.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })
                      : '-'}
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="dark-background">
          <canvas ref={chartRefs[5]} />
        </div>
        <div className="dark-background">
          <canvas ref={chartRefs[6]} />
        </div>
      </Container>
    </main>
  );
};

export default Forecast;
