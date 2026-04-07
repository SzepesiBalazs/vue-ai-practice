export interface CssPreset {
  name: string
  description: string
  html: string
  css: string
  /** Which property panel to show: 'flex' | 'grid' | 'responsive' | 'none' */
  panelType: 'flex' | 'grid' | 'responsive' | 'none'
}

export interface BreakpointOption {
  name: string
  label: string
  width: number
}
