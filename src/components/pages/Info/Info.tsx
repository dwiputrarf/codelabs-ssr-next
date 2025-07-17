'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip as ChartTooltip,
  Filler,
  type ChartOptions,
  type ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Loader2, TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';

import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';
import { fetchDashboard } from './action';

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartTooltip,
  Filler
);

// Types
interface DashboardCard {
  title: string;
  value: number;
  percentage: number;
  isPositive: boolean;
  image: string;
}

interface SalesChart {
  labels: string[];
  data: number[];
  borderColor: string;
  backgroundColor: string;
  description: string;
  maxValue: number;
}

interface DashboardData {
  cards: DashboardCard[];
  salesChart: SalesChart;
}

interface ApiResponse {
  users: { thisMonth: number; lastMonth: number };
  products: { thisMonth: number; lastMonth: number };
  sales: { thisMonth: number; lastMonth: number };
  monthlySales: Array<{ month: string; total: number }>;
}

// Constants
const MONTH_NAMES = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

const CHART_COLORS = {
  border: '#4F46E5',
  background: 'rgba(79, 70, 229, 0.2)',
  point: '#fff',
} as const;

const DEFAULT_CARDS: DashboardCard[] = [
  {
    title: 'Total Users',
    value: 0,
    percentage: 0,
    isPositive: true,
    image: '/images/igfx_person.png',
  },
  {
    title: 'Total Products',
    value: 0,
    percentage: 0,
    isPositive: true,
    image: '/images/igfx_cube.png',
  },
  {
    title: 'Total Sales',
    value: 0,
    percentage: 0,
    isPositive: true,
    image: '/images/igfx_chart.png',
  }
];

// Utility functions
const calculatePercentageChange = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

const formatPercentage = (value: number): string => {
  if (typeof value !== 'number') return '0%';
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};

const formatCardValue = (value: number, title: string): string => {
  const isSales = title.toLowerCase().includes('sales');
  
  if (isSales) {
    return formatCurrency(Math.floor(value) || 0);
  }
  
  return (value || 0).toLocaleString('id-ID');
};

// Transform API response
const transformApiResponse = (apiResponse: ApiResponse): DashboardData => {
  const { users, products, sales, monthlySales } = apiResponse;

  const cards: DashboardCard[] = [
    {
      title: 'Total Users',
      value: users.thisMonth,
      percentage: calculatePercentageChange(users.thisMonth, users.lastMonth),
      isPositive: users.thisMonth >= users.lastMonth,
      image: '/images/igfx_person.png',
    },
    {
      title: 'Total Products',
      value: products.thisMonth,
      percentage: calculatePercentageChange(products.thisMonth, products.lastMonth),
      isPositive: products.thisMonth >= products.lastMonth,
      image: '/images/igfx_cube.png',
    },
    {
      title: 'Total Sales',
      value: sales.thisMonth,
      percentage: calculatePercentageChange(sales.thisMonth, sales.lastMonth),
      isPositive: sales.thisMonth >= sales.lastMonth,
      image: '/images/igfx_chart.png',
    }
  ];

  const chartLabels = monthlySales.map(item => {
    const month = new Date(item.month).getMonth();
    return MONTH_NAMES[month];
  });
  
  const chartData = monthlySales.map(item => item.total);
  const maxValue = Math.max(...chartData);

  const salesChart: SalesChart = {
    labels: chartLabels,
    data: chartData,
    borderColor: CHART_COLORS.border,
    backgroundColor: CHART_COLORS.background,
    description: 'Monthly sales performance tracking throughout the year',
    maxValue,
  };

  return { cards, salesChart };
};

// Components
const LoadingState = () => (
  <section className="space-y-6 p-4">
    <h1 className="text-3xl font-bold text-center">Dashboard</h1>
    <div className="flex items-center justify-center h-64 w-full">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-lg">Loading dashboard data...</span>
    </div>
  </section>
);

const DashboardCard = ({ card }: { card: DashboardCard }) => (
  <Card className="w-96 h-fit">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-foreground">{card.title}</CardTitle>
      <div className="w-14 h-14 flex justify-center items-center">
        {card.image ? (
          <Image
            alt={`${card.title} Icon`}
            className="w-14 h-14"
            height={56}
            src={card.image}
            width={56}
            priority
          />
        ) : (
          <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center">
            <span className="text-muted-foreground text-xs">No Icon</span>
          </div>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-foreground">
        {formatCardValue(card.value, card.title)}
      </div>
      <div className="flex items-center gap-2 text-base font-semibold">
        <CardDescription className={`text-md font-bold inline-flex items-center ${
          card.isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {formatPercentage(card.percentage)}
        </CardDescription>
        {card.isPositive ? (
          <TrendingUp className="w-6 h-6 text-green-500" />
        ) : (
          <TrendingDown className="w-6 h-6 text-red-500" />
        )}
        <CardDescription className="text-muted-foreground">
          {card.isPositive ? 'Up from last month' : 'Down from last month'}
        </CardDescription>
      </div>
    </CardContent>
  </Card>
);

export default function Info() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  // Memoized values
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());
  }, []);

  const handleError = useCallback(
    (error: Error, action: string) => {
      toast(`Error: ${error} while ${action}`)
    },
    []
  );

  const { mutate: fetchData, isPending } = useMutation({
    mutationFn: async () => await fetchDashboard(selectedYear),
    onSuccess: (response: { data: ApiResponse }) => {
      const transformedData = transformApiResponse(response.data);
      setDashboardData(transformedData);
    },
    onError: (error: Error) => {
      handleError(error, 'Fetch dashboard data');
    },
  });

  useEffect(() => {
    fetchData();
  }, [selectedYear, fetchData]);

  const handleYearChange = useCallback((year: string) => {
    setSelectedYear(year);
  }, []);

  // Chart configuration
  const chartData: ChartData<'line', number[]> = useMemo(() => {
    const defaultData: ChartData<'line', number[]> = {
      labels: MONTH_NAMES as string[],
      datasets: [
        {
          label: 'Sales',
          data: new Array(12).fill(0),
          borderColor: CHART_COLORS.border,
          backgroundColor: CHART_COLORS.background,
          tension: 0.3,
          pointBorderColor: CHART_COLORS.border,
          pointBackgroundColor: CHART_COLORS.point,
          fill: true,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };

    if (!dashboardData?.salesChart) return defaultData;

    return {
      labels: dashboardData.salesChart.labels as string[],
      datasets: [
        {
          label: 'Sales',
          data: dashboardData.salesChart.data,
          borderColor: dashboardData.salesChart.borderColor,
          backgroundColor: dashboardData.salesChart.backgroundColor,
          tension: 0.3,
          pointBorderColor: dashboardData.salesChart.borderColor,
          pointBackgroundColor: CHART_COLORS.point,
          fill: true,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    };
  }, [dashboardData]);

  const chartOptions: ChartOptions<'line'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
        border: { display: false },
      },
      y: {
        type: 'linear',
        min: 0,
        beginAtZero: true,
        ticks: {
          font: { size: 11 },
          callback: (value) => {
            if (value === 0) return '0';
            return Intl.NumberFormat('id-ID').format(value as number);
          },
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#111827',
        bodyColor: '#111827',
        bodyFont: { size: 12 },
        titleFont: { size: 13, weight: 'bold' },
        padding: 10,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
          label: (context) => `Sales: ${formatCurrency(Math.floor(context.raw as number))}`,
        },
      },
      legend: { display: false },
    },
  }), []);

  const dashboardCards = dashboardData?.cards || DEFAULT_CARDS;

  if (isPending) {
    return <LoadingState />;
  }

  return (
    <section className="space-y-6 p-4">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                {dashboardData?.salesChart?.description || 'Track total sales performance and growth trend over time.'}
              </CardDescription>
            </div>
            <Select onValueChange={handleYearChange} value={selectedYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <Line data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Cards */}
      <div className="flex flex-row w-full items-center justify-center gap-4 pt-8">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={`${card.title}-${index}`} card={card} />
        ))}
      </div>
    </section>
  );
}
