import PlaceholderImage from 'src/components/PlaceholderImage'

export default function ImageBlock() {
  return (
    <div className="flex flex-col justify-center">
      <PlaceholderImage big />
      <div className="flex flex-row justify-between py-5">
        <PlaceholderImage />
        <PlaceholderImage />
      </div>
    </div>
  )
}
