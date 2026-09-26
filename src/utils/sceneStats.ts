import type { WindowScene } from '@/types'
import {
  WEATHER_OPTIONS,
  TREE_OPTIONS,
  PEDESTRIAN_OPTIONS,
} from '@/constants/sceneOptions'

export interface OverviewItem {
  value: string
  count: number
}

export interface CategoryOverview {
  key: 'weather' | 'treeDensity' | 'pedestrianStatus'
  label: string
  items: OverviewItem[]
}

export interface SceneOverview {
  total: number
  categories: CategoryOverview[]
}

function topTwoByOptionOrder(
  values: Array<string | undefined>,
  options: readonly string[],
): OverviewItem[] {
  const counts = new Map<string, number>()
  for (const value of values) {
    if (!value) continue
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  const optionOrder = new Map(options.map((option, index) => [option, index]))
  return options
    .filter((option) => counts.has(option))
    .map((option) => ({ value: option, count: counts.get(option) ?? 0 }))
    // 次数相同按表单选项顺序
    .sort(
      (a, b) =>
        b.count - a.count ||
        (optionOrder.get(a.value) ?? 0) - (optionOrder.get(b.value) ?? 0),
    )
    .slice(0, 2)
}

export function computeSceneOverview(
  scenes: readonly WindowScene[],
): SceneOverview {
  const allCategories: CategoryOverview[] = [
    {
      key: 'weather',
      label: '天气',
      items: topTwoByOptionOrder(scenes.map((s) => s.weather), WEATHER_OPTIONS),
    },
    {
      key: 'treeDensity',
      label: '树木',
      items: topTwoByOptionOrder(
        scenes.map((s) => s.treeDensity),
        TREE_OPTIONS,
      ),
    },
    {
      key: 'pedestrianStatus',
      label: '行人',
      items: topTwoByOptionOrder(
        scenes.map((s) => s.pedestrianStatus),
        PEDESTRIAN_OPTIONS,
      ),
    },
  ]
  const categories = allCategories.filter(
    (category) => category.items.length > 0,
  )

  return { total: scenes.length, categories }
}
