type SectionHeaderProps = {
  index: string
  label: string
  title: string
  description?: string
}

export function SectionHeader({ index, label, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="reveal flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.2em] text-signal">
          {index} <span className="text-muted-foreground">/</span> {label.toUpperCase()}
        </span>
        <span data-line className="h-px flex-1 origin-left bg-gradient-to-r from-signal/60 to-transparent" />
      </div>
      <h2 className="reveal mt-5 text-balance text-3xl font-medium tracking-tight md:text-5xl">{title}</h2>
      {description && (
        <p className="reveal mt-4 max-w-2xl text-pretty text-muted-foreground md:text-lg">{description}</p>
      )}
    </div>
  )
}
