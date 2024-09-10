import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  today = new Date();  // Date actuelle
  displayedMonth: string = '';
  days: Date[] = [];

  ngOnInit(): void {
    this.updateCalendar();
  }

  updateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    this.displayedMonth = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    this.days = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Fill days of the previous month
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
    for (let i = daysInPreviousMonth - firstDayOfMonth.getDay() + 1; i <= daysInPreviousMonth; i++) {
      this.days.push(new Date(year, month - 1, i));
    }

    // Fill days of the current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      this.days.push(new Date(year, month, i));
    }

    // Fill days of the next month
    const remainingDays = 42 - this.days.length;
    for (let i = 1; i <= remainingDays; i++) {
      this.days.push(new Date(year, month + 1, i));
    }
  }

  goToPreviousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  goToNextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  isToday(date: Date): boolean {
    return date.toDateString() === this.today.toDateString();
  }
}
