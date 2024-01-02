import Spacer from 'src/components/Spacer'

export default function ButtonBlock() {
  return (
    <div className="flex flex-row justify-start py-5">
      <button className="btn btn-sm btn-primary text-white" type="button">
        Explore
      </button>
      <Spacer />
      <button className="btn btn-sm btn-secondary text-white" type="button">
        Contact
      </button>
    </div>
  )
}
