interface Props {
  total: number
  current: number
  onSelect: (index: number) => void
}

export default function HeroDots({ total, current, onSelect }: Props) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`w-[1px] h-[1px] rounded-full transition-colors ${
            current === i ? "bg-[#0C4DA2]" : "bg-white/60 hover:bg-white"
          }`}
        />
      ))}
    </div>
  )
}