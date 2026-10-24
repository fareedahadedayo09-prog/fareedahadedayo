import type { ProcessNode } from '../data/audit'

type Box = { x: number; y: number; w: number; h: number }

const NODE_W = 200
const NODE_H = 56
const GAP_X = 70
const ROW_GAP = 92
const PAD = 20

function layout(nodes: ProcessNode[]): { boxes: Box[]; width: number; height: number } {
  const cols = Math.min(nodes.length, 3)
  const rows = Math.ceil(nodes.length / cols)

  const boxes: Box[] = nodes.map((_, i) => {
    const row = Math.floor(i / cols)
    const colInRow = i % cols
    // Snake layout: even rows left-to-right, odd rows right-to-left.
    const col = row % 2 === 0 ? colInRow : cols - 1 - colInRow
    return {
      x: PAD + col * (NODE_W + GAP_X),
      y: PAD + row * (NODE_H + ROW_GAP),
      w: NODE_W,
      h: NODE_H,
    }
  })

  const width = PAD * 2 + cols * NODE_W + (cols - 1) * GAP_X
  const height = PAD * 2 + rows * NODE_H + (rows - 1) * ROW_GAP
  return { boxes, width, height }
}

/**
 * A readable current-state process map rendered as inline SVG.
 * No external library, no layout shift, scales to its container.
 */
export function ProcessMap({ nodes }: { nodes: ProcessNode[] }) {
  const { boxes, width, height } = layout(nodes)

  const connect = (from: Box, to: Box) => {
    const sameRow = from.y === to.y
    if (sameRow) {
      return (
        <line
          key="l"
          className="process-arrow"
          x1={from.x + from.w}
          y1={from.y + from.h / 2}
          x2={to.x}
          y2={to.y + to.h / 2}
        />
      )
    }
    return (
      <line
        key="l"
        className="process-arrow"
        x1={from.x + from.w / 2}
        y1={from.y + from.h}
        x2={to.x + to.w / 2}
        y2={to.y}
      />
    )
  }

  return (
    <div className="process-map">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        role="img"
        aria-label="Diagram of the enquiry handling process, from customer enquiry through manual review, question identification, response, outcome recording and follow-up."
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" className="process-arrow" />
          </marker>
        </defs>

        {boxes.map((box, i) => {
          const node = nodes[i]
          const decision = node?.shape === 'diamond'
          return (
            <g key={node?.id ?? i}>
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx={8}
                className="process-step"
                style={decision ? { stroke: 'var(--accent-line)' } : undefined}
              />
              <text
                x={box.x + 10}
                y={box.y - 8}
                className="mono"
                style={{ fill: 'var(--text-faint)', fontSize: '10px', letterSpacing: '0.1em' }}
              >
                {String(i + 1).padStart(2, '0')}
              </text>
              <text
                x={box.x + box.w / 2}
                y={box.y + box.h / 2}
                textAnchor="middle"
                dominantBaseline="central"
                className="process-step-text"
                style={{ fontSize: '11.5px', fill: 'var(--text)' }}
              >
                {node?.label ?? ''}
              </text>
            </g>
          )
        })}

        {boxes.slice(0, -1).map((box, i) => connect(box, boxes[i + 1]))}
      </svg>
    </div>
  )
}
