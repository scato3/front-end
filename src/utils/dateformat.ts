import dayjs from 'dayjs';

export function formatDate(inputDate: string) {
  return dayjs(inputDate).format('MM.DD');
}

export function formateYearDate(inputDate: string) {
  return dayjs(inputDate).format('YYYY.MM.DD');
}

export default function koreanFormatDate(date: string): string {
  return dayjs(date).format('M월 D일');
}
