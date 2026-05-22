import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  change?: number
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  suffix?: string
}

export default function StatCard({ title, value, change, icon: Icon, iconColor = 'text-[#F5A623]', iconBg = 'bg-[#F5A623]/10', suffix }: StatCardProps) {
  const isPositive = !change || change >= 0
  return (
    <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="font-playfair text-3xl font-bold text-white mb-1">
        {value}{suffix && <span className="text-xl text-white/40 ml-0.5">{suffix}</span>}
      </div>
      <div className="text-sm text-white/40">{title}</div>
    </div>
  )
}
