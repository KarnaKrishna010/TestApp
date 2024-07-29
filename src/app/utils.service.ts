import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  formatSalary(value: any): string {
    if (value == null) {
      return ''; // Return an empty string or some default value if value is null or undefined
    }
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        return parsedValue.toLocaleString('en-US');
      }
    } else if (typeof value === 'number') {
      return value.toLocaleString('en-US');
    }
    return value.toString();
  }

  formatDate(date: any): string {
    if (date == null) {
      return ''; // Return an empty string or some default value if date is null or undefined
    }
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}