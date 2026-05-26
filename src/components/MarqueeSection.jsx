function MarqueeSection() {
  const items = ['Luxury Craftsmanship', 'Sustainable Materials', 'Timeless Design', 'Italian Atelier', 'Limited Editions', 'Free Returns'];
  return (
    <div className="overflow-hidden py-5 bg-[#c9a96e]">
      <div className="marquee-track flex gap-12 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white text-xs tracking-[0.3em] uppercase font-medium flex items-center gap-12">
            {item} <span className="text-white/50">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default MarqueeSection
