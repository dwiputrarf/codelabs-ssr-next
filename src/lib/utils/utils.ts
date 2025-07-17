import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return '-';
  }

  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return dateString;
    }

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };

    const formatter = new Intl.DateTimeFormat('en-GB', options);
    const formatted = formatter.format(date);
    
    return `${formatted} WIB`;
  } catch (error) {
    console.log(error);
    return dateString;
  }
};

export const formatCurrency = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numericValue)) {
    return '-';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericValue);
};

export const formatNumber = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numericValue)) {
    return '-';
  }

  return new Intl.NumberFormat('id-ID').format(numericValue);
};

export const formatPercentage = (value: number | string | null | undefined): string => {
  if (value === null || value === undefined || value === '') {
    return '-';
  }

  const numericValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numericValue)) {
    return '-';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numericValue / 100);
};
