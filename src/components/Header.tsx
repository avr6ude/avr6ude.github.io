import DiscoverButton from 'src/components/DiscoverButton'
import LandingDate from 'src/components/LandingDate'
import ProfilePicture from 'src/components/ProfilePicture'

export default function Header() {
  return (
    <div className="flex flex-col justify-center p-10 bg-secondary w-full">
      <LandingDate />
      <h1 className="text-center text-10xl font-secondary">FUTURIST</h1>
      <div className="flex justify-center p-5">
        <p className="text-center max-w-lg font-primary uppercase text-xl">
          Welcome to the digital home of a modern day Da Vinci of code. Cracking
          lines of JavaScript, I venture between startup enthusiasm and big bank
          bureaucracy, leaving extraordinary digital solutions in my wake.
        </p>
      </div>
      <DiscoverButton />
      <ProfilePicture />
    </div>
  )
}
