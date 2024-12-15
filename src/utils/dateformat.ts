import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export function formatDate(inputDate: string) {
  return dayjs(inputDate).format('MM.DD');
}

export function formateYearDate(inputDate: string) {
  return dayjs(inputDate).format('YYYY.MM.DD');
}

export default function koreanFormatDate(date: string): string {
  return dayjs(date).format('M월 D일');
}

export function formatKoreanDate(inputDate: string): string {
  return dayjs(inputDate).format('YYYY년 M월 D일 dddd');
}

export function formatKoreanTime(date: string | Date): string {
  return dayjs(date).format('A hh:mm');
}
