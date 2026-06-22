interface Props {
  onPrev: () => void
  onNext: () => void
}

export default function HeroNavigation({ onPrev, onNext }: Props) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-6xl leading-none"
      >
        ‹
      </button>

      <button
        onClick={onNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors text-6xl leading-none"
      >
        ›
      </button>
    </>
  )
}