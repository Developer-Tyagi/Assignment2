import { date } from 'quasar';

export function dateToSend(dateString) {
  return dateString
    ? date.formatDate(dateString, 'YYYY-MM-DDTHH:mm:ssZ')
    : null;
}
export function dateToShow(dateString) {
  return dateString ? date.formatDate(dateString, 'MM/DD/YYYY') : '';
}
export function dateWithTime(dateString) {
  return dateString ? date.formatDate(dateString, 'MM/DD/YYYY, hh:mm A') : '';
}
export function dateToTime(dateString) {
  return dateString ? date.formatDate(dateString, 'hh:mm') : '';
}
