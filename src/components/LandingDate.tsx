import getFormattedDate from 'src/helpers/getFormattedDate'

export default function LandingDate() {
  const currentDate = getFormattedDate()

  return (
    <div className="flex justify-center p-5">
      <p className="text-center uppercase font-primary tracking-full mr-tracking">
        {currentDate}
      </p>
    </div>
  )
}
