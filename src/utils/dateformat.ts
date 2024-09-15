import dayjs from 'dayjs';

export function formatDate(inputDate: string) {
  return dayjs(inputDate).format('MM.DD');
}
