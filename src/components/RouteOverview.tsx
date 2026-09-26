import { Link } from 'react-router-dom'
import { BarChart3, CloudSun, TreePine, Users, PenLine } from 'lucide-react'
import type { SceneOverview, CategoryOverview } from '@/utils/sceneStats'
import {
  getWeatherIcon,
  getTreeIcon,
  getPedestrianIcon,
} from '@/utils/sceneHelpers'
import type { Weather, TreeDensity, PedestrianStatus } from '@/types'

function getCategoryIcon(key: CategoryOverview['key']) {
  if (key === 'weather') return <CloudSun className="w-3.5 h-3.5" />
  if (key === 'treeDensity') return <TreePine className="w-3.5 h-3.5" />
  return <Users className="w-3.5 h-3.5" />
}

function getItemIcon(key: CategoryOverview['key'], value: string) {
  if (key === 'weather') return getWeatherIcon(value as Weather)
  if (key === 'treeDensity') return getTreeIcon(value as TreeDensity)
  return getPedestrianIcon(value as PedestrianStatus)
}

interface RouteOverviewProps {
  overview: SceneOverview
  routeName: string
}

export default function RouteOverview({ overview, routeName }: RouteOverviewProps) {
  return (
    <section className="mb-6 rounded-xl border border-teal-800 bg-teal-900/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-dusk-400">
          <BarChart3 className="w-4 h-4" />
          采样概览
        </h2>
        <span className="text-xs text-mist-400">记录数 {overview.total}</span>
      </div>

      {overview.total === 0 ? (
        <div className="flex flex-col items-center gap-3 py-4">
          <p className="text-xs text-mist-400">
            「{routeName}」还没有采样记录，先采一段窗景吧
          </p>
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-full bg-dusk-400 px-3.5 py-1.5 text-xs text-teal-950 transition-colors hover:bg-dusk-300"
          >
            <PenLine className="w-3 h-3" />
            去采样
          </Link>
        </div>
      ) : (
        <div className="space-y-2.5">
          {overview.categories.map((category) => (
            <div key={category.key} className="flex items-center gap-3">
              <span className="flex w-14 shrink-0 items-center gap-1 text-xs text-mist-400">
                {getCategoryIcon(category.key)}
                {category.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item.value}
                    className="flex items-center gap-1.5 rounded-full bg-teal-800/60 px-2.5 py-1 text-xs text-mist-200"
                  >
                    {getItemIcon(category.key, item.value)}
                    {item.value}
                    <span className="text-dusk-300">×{item.count}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
