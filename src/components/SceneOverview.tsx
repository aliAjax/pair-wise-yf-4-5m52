import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, PenLine } from 'lucide-react'
import type { WindowScene } from '@/types'
import { summarizeScenes, type TopOption } from '@/services/sceneStats'
import {
  getWeatherIcon,
  getTreeIcon,
  getPedestrianIcon,
} from '@/utils/sceneHelpers'

interface SceneOverviewProps {
  routeName: string
  scenes: WindowScene[]
}

interface CategoryRowProps<T extends string> {
  label: string
  items: TopOption<T>[]
  getIcon: (value: T) => React.ReactNode
}

function CategoryRow<T extends string>({
  label,
  items,
  getIcon,
}: CategoryRowProps<T>) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 shrink-0 text-xs text-mist-500">{label}</span>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item.value}
            className="inline-flex items-center gap-1.5 rounded-full bg-teal-800/60 px-2.5 py-1 text-xs text-mist-200"
          >
            {getIcon(item.value)}
            {item.value}
            <span className="text-dusk-300">×{item.count}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SceneOverview({ routeName, scenes }: SceneOverviewProps) {
  const overview = useMemo(() => summarizeScenes(scenes), [scenes])

  if (overview.total === 0) {
    return (
      <div className="mb-6 flex flex-col items-center gap-2 rounded-xl border border-dashed border-teal-800 bg-teal-900/40 px-4 py-5">
        <p className="text-sm text-mist-400">
          「{routeName}」还没有采样记录
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-dusk-400 transition-colors hover:text-dusk-300"
        >
          <PenLine className="w-3 h-3" />
          先去记录一段窗景
        </Link>
      </div>
    )
  }

  return (
    <section className="mb-6 rounded-xl border border-teal-800 bg-teal-900/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-dusk-400">
          <BarChart3 className="w-4 h-4" />
          采样概览
        </h2>
        <span className="text-xs text-mist-400">
          共 {overview.total} 次采样
        </span>
      </div>
      <div className="space-y-2.5">
        {overview.weather.length > 0 && (
          <CategoryRow label="天气" items={overview.weather} getIcon={getWeatherIcon} />
        )}
        {overview.treeDensity.length > 0 && (
          <CategoryRow label="树木" items={overview.treeDensity} getIcon={getTreeIcon} />
        )}
        {overview.pedestrianStatus.length > 0 && (
          <CategoryRow label="行人" items={overview.pedestrianStatus} getIcon={getPedestrianIcon} />
        )}
      </div>
    </section>
  )
}
