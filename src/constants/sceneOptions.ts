import type { Weather, TreeDensity, PedestrianStatus } from '@/types'

// 表单选项顺序的唯一来源：记录页表单与采样概览的统计规则（并列时按此顺序）都以此为准
export const WEATHER_OPTIONS: Weather[] = ['晴', '多云', '阴', '小雨', '大雨', '雪', '雾']
export const TREE_OPTIONS: TreeDensity[] = ['稀疏', '适中', '茂密']
export const PEDESTRIAN_OPTIONS: PedestrianStatus[] = ['稀少', '零星', '密集']
