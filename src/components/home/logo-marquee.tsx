'use client'

import type { CSSProperties } from 'react'
import { useLocale } from 'next-intl'

const LOGOS = [
  { name: 'TechStart', cls: 'font-playfair font-bold text-lg' },
  { name: 'BLOOM', cls: 'font-inter font-light text-sm tracking-[0.35em] uppercase' },
  { name: 'Nova', cls: 'font-playfair italic font-semibold text-xl' },
  { name: 'ZENITH', cls: 'font-inter font-black text-xs tracking-[0.4em] uppercase' },
  { name: 'Pulse', cls: 'font-playfair font-bold text-lg' },
  { name: 'Apex', cls: 'font-inter font-semibold text-base tracking-wider' },
  { name: 'VORTEX', cls: 'font-inter font-light text-sm tracking-[0.3em] uppercase' },
  { name: 'Nexus', cls: 'font-playfair italic text-xl' },
  { name: 'ORBIT', cls: 'font-inter font-black text-xs tracking-[0.35em] uppercase' },
  { name: 'Fusion', cls: 'font-playfair font-bold text-lg' },
]

export default function LogoMarquee() {
  const locale = useLocale()
  const isTr = locale === 'tr'
  const doubled = [...LOGOS, ...LOGOS]

  return (
    <div className="relative bg-[#0A0A0F] border-t border-white/5 pt-8 pb-10 overflow-hidden">
      <p className="text-center text-[10px] text-white/20 uppercase tracking-[0.4em] mb-7 select-none">
        {isTr ? 'Güvendikleri Markalar' : 'Trusted By Leading Brands'}
      </p>

      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
        <div
          className="flex items-center gap-14 whitespace-nowrap home-marquee"
          style={{ '--home-marquee-duration': '42s' } as CSSProperties}
        >
          {doubled.map((logo, i) => (
            <span
              key={i}
              className={`${logo.cls} text-white/18 hover:text-white/38 transition-colors duration-300 cursor-default select-none`}
              style={{ color: 'rgba(255,255,255,0.18)' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.38)')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.18)')}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
