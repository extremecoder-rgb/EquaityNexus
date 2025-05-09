import type React from "react"

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  layout?: "vertical" | "horizontal"
  stack?: boolean
}

export const BarChart: React.FC<ChartProps> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend,
  showXAxis,
  showYAxis,
  showGridLines,
  layout,
  stack,
}) => {
  return (
    <div>
      {/* Mock BarChart implementation */}
      <div>
        BarChart: {index} - {categories.join(", ")}
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export const LineChart: React.FC<ChartProps> = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  showLegend,
  showXAxis,
  showYAxis,
  showGridLines,
}) => {
  return (
    <div>
      {/* Mock LineChart implementation */}
      <div>
        LineChart: {index} - {categories.join(", ")}
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export const PieChart: React.FC<ChartProps> = ({ data, index, categories, colors, valueFormatter, showLegend }) => {
  return (
    <div>
      {/* Mock PieChart implementation */}
      <div>
        PieChart: {index} - {categories.join(", ")}
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export const ChartContainer: React.FC<{ children: React.ReactNode; height?: number; className?: string }> = ({
  children,
  height,
  className,
}) => {
  return (
    <div className={className} style={{ height: height }}>
      {children}
    </div>
  )
}

export const ChartTooltip: React.FC = () => {
  return <div>Tooltip</div>
}

export const ChartLegend: React.FC = () => {
  return <div>Legend</div>
}
