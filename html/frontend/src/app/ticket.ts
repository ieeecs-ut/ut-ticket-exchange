import { Sports } from './sports';

export interface Ticket {
   id: number;
   sport: Sports;
   day: number;
   month: number;
   year: number;
   price: number;
   collegeOne: string;
   collegeTwo: string;
   time: string;
   location: string;
}