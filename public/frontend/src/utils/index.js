import moment from "jalali-moment"

export const e2p = s => s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])

export const e2a = s => s.replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])

export const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

export const a2e = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))

export const p2a = s => s.replace(/[۰-۹]/g, d => '٠١٢٣٤٥٦٧٨٩'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)])

export const a2p = s => s.replace(/[٠-٩]/g, d => '۰۱۲۳۴۵۶۷۸۹'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])

export const p2eDateTime = s => moment.from(p2e(s), 'fa', 'YYYY/MM/DD HH:mm:00').format('YYYY-MM-DD HH:mm:00')

export const e2pDateTime = s => moment(s, "YYYY-MM-DD HH:mm:00").locale("fa").format("YYYY-MM-DD HH:mm:00")

export const sq2jsDateTime = s => new Date(Date.parse(s.replace(/-/g, '/')));

export const DateDiff = (d1, d2) => {

  const inMinutes = (d1, d2) => {
    const m2 = d2.getTime();
    const m1 = d1.getTime();
    if (m2 - m1 > 0)
      return Math.floor(((m2 - m1) / (60 * 1000)) - inHours(d1, d2) * 60);
    else return 0
  }

  const inHours = (d1, d2) => {
    const h2 = d2.getTime();
    const h1 = d1.getTime();

    return Math.floor((h2 - h1) / (3600 * 1000));
  }

  const inDays = (d1, d2) => {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    return Math.floor((t2 - t1) / (24 * 3600 * 1000));
  }

  const inWeeks = (d1, d2) => {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
  }

  const inMonths = (d1, d2) => {
    const d1Y = d1.getFullYear();
    const d2Y = d2.getFullYear();
    const d1M = d1.getMonth();
    const d2M = d2.getMonth();

    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
  }

  const inYears = (d1, d2) => {
    return d2.getFullYear() - d1.getFullYear();
  }

  // return {
  //   time: ' year:' + inYears(d1, d2) +
  //     ' month:' + inMonths(d1, d2) +
  //     ' week:' + inWeeks(d1, d2) +
  //     ' day:' + inDays(d1, d2) +
  //     ' hour:' + inHours(d1, d2) +
  //     ' minute:' + inMinutes(d1, d2)
  // };


  const year = inYears(d1, d2) > 0 ? (inYears(d1, d2) + ', سال ') : '';
  const month = inMonths(d1, d2) > 0 ? (inMonths(d1, d2) + ', ماه ') : '';
  const week = inWeeks(d1, d2) > 0 ? (inWeeks(d1, d2) + ', هفته ') : '';
  const day = inDays(d1, d2) > 0 ? (inDays(d1, d2) + ' روز و ') : '';
  const hour = inHours(d1, d2) > 0 ? (inHours(d1, d2) + ' ساعت و') : '';
  const minute = inMinutes(d1, d2) > 0 ? (inMinutes(d1, d2) + ' دقیقه') : '';
  const remainTime = year + month + week + day + hour + minute
  let time = ''
  let isFinite = false
  if (remainTime.length > 0) {
    time = 'زمان ' + year + month + week + day + hour + minute + ' باقی‌مانده'
    isFinite = false
  } else {
    time = 'زمان گذشته است'
    isFinite = true
  }

  return {
    time,
    isFinite
  }
}
