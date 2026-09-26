import type { Weather, TreeDensity, PedestrianStatus } from '@/types'

export const WEATHER_OPTIONS: readonly Weather[] = ['晴', '多云', '阴', '小雨', '大雨', '雪', '雾']

export const TREE_OPTIONS: readonly TreeDensity[] = ['稀疏', '适中', '茂密']

export const PEDESTRIAN_OPTIONS: readonly PedestrianStatus[] = ['稀少', '零星', '密集']
