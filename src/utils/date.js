import { date } from 'quasar';

export function dateToSend(dateString) {
  return dateString
    ? date.formatDate(dateString, 'YYYY-MM-DDTHH:mm:ssZ')
    : null;
}
export function dateToShow(dateString) {
  return dateString ? date.formatDate(dateString, 'MM/DD/YYYY') : '';
}
