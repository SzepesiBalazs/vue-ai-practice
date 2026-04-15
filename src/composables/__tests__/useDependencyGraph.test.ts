import { describe, it, expect } from 'vitest'
import { useDependencyGraph } from '@/composables/useDependencyGraph'

describe('useDependencyGraph', () => {
  it('returns all nodes from sample graph by default', () => {
    const { filteredNodes } = useDependencyGraph()
    expect(filteredNodes.value.length).toBeGreaterThan(0)
  })

  it('hides dev deps when showDevDeps is false', () => {
    const { filteredNodes, showDevDeps } = useDependencyGraph()
    showDevDeps.value = false
    expect(filteredNodes.value.every((n) => n.kind !== 'dev')).toBe(true)
  })

  it('limits nodes by maxDepth', () => {
    const { filteredNodes, maxDepth } = useDependencyGraph()
    maxDepth.value = 1
    expect(filteredNodes.value.every((n) => n.depth <= 1)).toBe(true)
  })

  it('filters nodes by search query', () => {
    const { filteredNodes, searchQuery } = useDependencyGraph()
    searchQuery.value = 'react'
    expect(filteredNodes.value.every((n) => n.name.includes('react'))).toBe(true)
  })

  it('selects and deselects a node', () => {
    const { selectedNode, selectNode } = useDependencyGraph()
    expect(selectedNode.value).toBeNull()
    selectNode('react@18.2.0')
    expect(selectedNode.value?.name).toBe('react')
    selectNode(null)
    expect(selectedNode.value).toBeNull()
  })

  it('generates a safe npm URL', () => {
    const { npmUrl } = useDependencyGraph()
    expect(npmUrl('react')).toBe('https://www.npmjs.com/package/react')
  })

  it('strips dangerous characters from npm URL', () => {
    const { npmUrl } = useDependencyGraph()
    expect(npmUrl('react<script>')).not.toContain('<script>')
  })
})
