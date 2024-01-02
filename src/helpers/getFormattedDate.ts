import { format } from 'date-fns'

export default function getFormattedDate() {
  const now = new Date()
  const dateFormat = 'eeee, MMMM d, yyyy'

  return format(now, dateFormat)
}
