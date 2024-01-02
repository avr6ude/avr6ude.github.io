import ButtonBlock from 'src/components/ButtonBlock'
import ImageBlock from 'src/components/ImageBlock'
import Spacer from 'src/components/Spacer'

export default function Projects() {
  return (
    <div className="flex flex-col justify-center p-10">
      <p className="font-secondary text-white text-start text-3xl uppercase">
        Hungry to learn about the magic happening behind the screens? Dive in!
      </p>
      <ButtonBlock />
      <Spacer horizontal />
      <Spacer horizontal />
      <p className="font-secondary text-white text-start text-3xl uppercase">
        My Projects:
      </p>
      <ImageBlock />
    </div>
  )
}
