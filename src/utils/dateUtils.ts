import {
  format,
  formatDistanceToNow,
  intervalToDuration,
  parseISO,
} from "date-fns";
import { ko } from "date-fns/locale";

export const formatTimeLeft = (dateStr: string) => {
  if (!dateStr) return;

  const endDate = new Date(dateStr);
  const now = new Date();

  if (endDate.getTime() <= now.getTime()) return "";

  const duration = intervalToDuration({ start: now, end: endDate });

  const days = duration.days ?? 0;
  const hours = duration.hours ?? 0;
  const minutes = duration.minutes ?? 0;
  const seconds = duration.seconds ?? 0;

  if (days > 0) {
    return `${days}일 ${hours}시간 ${minutes}분`;
  }

  return `${hours}시간 ${minutes}분 ${seconds}초`;
};

export const formatTimeLeftSimple = (dateStr: string) => {
  if (!dateStr) return;

  const endDate = parseISO(dateStr);
  const now = new Date();

  if (endDate.getTime() <= now.getTime()) return "";

  const duration = intervalToDuration({ start: now, end: endDate });

  const days = duration.days ?? 0;
  const hours = duration.hours ?? 0;
  const minutes = duration.minutes ?? 0;

  if (days > 0) {
    return `${days}일 남음`;
  }

  if (hours > 0) {
    return `${hours}시간 남음`;
  }

  if (minutes > 0) {
    return `${minutes}분 남음`;
  }

  return "1분 미만 남음";
};

export const formatTimeAgo = (dateStr: string) => {
  if (!dateStr) return "";

  const date = parseISO(dateStr);
  const now = new Date();

  if (isNaN(date.getTime())) return "";

  const diff = now.getTime() - date.getTime();
  if (diff < 60 * 1000) return "방금 전"; // 1분 미만

  const formatted = formatDistanceToNow(date, { locale: ko });
  return formatted.replace(/^약\s*/, "") + " 전";
};

export const formatTimeStamp = (dateStr: string) => {
  if (!dateStr) return;

  const date = new Date(dateStr);

  return format(date, "a h:mm", { locale: ko });
};

export const formatDateSimple = (dateStr: string) => {
  if (!dateStr) return;

  const date = parseISO(dateStr);

  return format(date, "yyyy-MM-dd HH:mm");
};
