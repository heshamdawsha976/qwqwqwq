"use client"

import React, { memo, useMemo } from 'react'
import { useVirtualScroll } from '@/lib/performance'

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  containerHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  onScroll?: (scrollTop: number) => void
}

function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = "",
  onScroll
}: VirtualListProps<T>) {
  const { visibleItems, handleScroll } = useVirtualScroll(items, itemHeight, containerHeight)

  const handleScrollWithCallback = (e: React.UIEvent<HTMLDivElement>) => {
    handleScroll(e)
    onScroll?.(e.currentTarget.scrollTop)
  }

  const visibleNodes = useMemo(() => {
    return visibleItems.items.map((item, index) => (
      <div
        key={visibleItems.startIndex + index}
        style={{
          height: itemHeight,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {renderItem(item, visibleItems.startIndex + index)}
      </div>
    ))
  }, [visibleItems, itemHeight, renderItem])

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScrollWithCallback}
    >
      <div style={{ height: visibleItems.totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${visibleItems.offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleNodes}
        </div>
      </div>
    </div>
  )
}

export default memo(VirtualList) as typeof VirtualList