export default function PlaceholderImage({ big }: { big?: boolean }) {
  return big ? (
    <img className="rounded-2xl" src="https://placehold.co/1000x400/" />
  ) : (
    <img className="rounded-2xl" src="https://placehold.co/500x400/" />
  )
}
