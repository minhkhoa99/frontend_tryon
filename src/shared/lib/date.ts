/**
 * Format a date/timestamp string hoặc Date object theo múi giờ và locale
 * của thiết bị người dùng — tự động linh động theo khu vực.
 *
 * @param value   - ISO string, timestamp (ms), hoặc Date object
 * @param style   - 'date' | 'time' | 'datetime' (mặc định: 'datetime')
 * @returns       Chuỗi đã format theo locale + timezone của browser
 *
 * @example
 * convertTimeZone('2026-04-14T16:22:41Z')
 * // VN  → "14/04/2026, 23:22"
 * // US  → "4/14/2026, 11:22 PM"
 *
 * convertTimeZone('2026-04-14T16:22:41Z', 'date')
 * // VN  → "14/04/2026"
 *
 * convertTimeZone('2026-04-14T16:22:41Z', 'time')
 * // VN  → "23:22"
 */
export function convertTimeZone(
  value: string | number | Date,
  style: 'date' | 'time' | 'datetime' = 'datetime',
): string {
  const date = value instanceof Date ? value : new Date(value)

  if (isNaN(date.getTime())) return '—'

  const options: Intl.DateTimeFormatOptions =
    style === 'date'
      ? { dateStyle: 'short' }
      : style === 'time'
        ? { timeStyle: 'short' }
        : { dateStyle: 'short', timeStyle: 'short' }

  // undefined locale → dùng locale của thiết bị người dùng
  // không chỉ định timeZone → dùng timezone của thiết bị người dùng
  return date.toLocaleString(undefined, options)
}
