interface BadgeDividerProps {
  label: string
}

export default function BadgeDivider({ label }: BadgeDividerProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="badge-ring h-8 w-8 border-caramel-dark/60">
        <span className="h-1.5 w-1.5 rounded-full bg-caramel-dark" />
      </span>
      <span className="eyebrow">{label}</span>
      <span className="h-px flex-1 bg-espresso/10" />
    </div>
  )
}
