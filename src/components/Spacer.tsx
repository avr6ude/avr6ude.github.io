export default function Spacer({ horizontal }: { horizontal?: boolean }) {
  return horizontal ? <div className="py-2" /> : <div className="px-2" />
}
