import type {
  WindowScene,
  Weather,
  TreeDensity,
  PedestrianStatus,
} from '@/types'
import {
  WEATHER_OPTIONS,
  TREE_OPTIONS,
  PEDESTRIAN_OPTIONS,
} from '@/constants/sceneOptions'

export interface TopOption<T extends string> {
  value: T
  count: number
}

export interface SceneOverview {
  total: number
  weather: TopOption<Weather>[]
  treeDensity: TopOption<TreeDensity>[]
  pedestrianStatus: TopOption<PedestrianStatus>[]
}

const TOP_LIMIT = 2

// 按出现次数降序取前 TOP_LIMIT 项；并列时按表单选项顺序（order 数组中的先后）
function topOptions<T extends string>(
  values: T[],
  order: readonly T[]
): TopOption<T>[] {
  const counts = new Map<T, number>()
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  return order
    .filter((option) => counts.has(option))
    .map((option) => ({ value: option, count: counts.get(option) ?? 0 }))
    .sort(
      (a, b) =>
        b.count - a.count || order.indexOf(a.value) - order.indexOf(b.value)
    )
    .slice(0, TOP_LIMIT)
}

// 对给定记录集合（通常是一条线路的全部采样）生成概览统计
export function summarizeScenes(scenes: WindowScene[]): SceneOverview {
  return {
    total: scenes.length,
    weather: topOptions(
      scenes.map((s) => s.weather),
      WEATHER_OPTIONS
    ),
    treeDensity: topOptions(
      scenes.map((s) => s.treeDensity),
      TREE_OPTIONS
    ),
    pedestrianStatus: topOptions(
      scenes.map((s) => s.pedestrianStatus),
      PEDESTRIAN_OPTIONS
    ),
  }
}
