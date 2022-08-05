import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, { useRef } from 'react'

// The wrapper exports only a default component that at the same time is a
// namespace for the related Props interface (HighchartsReact.Props) and
// RefObject interface (HighchartsReact.RefObject). All other interfaces
// like Options come from the Highcharts module itself.

const options: Highcharts.Options = {
  title: {
    text: 'My chart',
  },
  xAxis: {
    // 横軸
    categories: ['A', 'B', 'C'],
    title: {
      align: 'high',
      text: '年度',
    },
  },
  yAxis: {
    title: {
      align: 'high',
      text: '人口数',
      rotation: 360,
    },
  },
  series: [
    {
      name: '北海道',
      type: 'line',
      data: [1, 2, 3],
    },
    {
      name: '秋田県',
      type: 'line',
      data: [9000, 9000, 7],
    },
  ],
}

// React supports function components as a simple way to write components that
// only contain a render method without any state (the App component in this
// example).

export const App = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null)

  return (
    <>
      <div>
        {props.final.map((d, i) => (
          <label htmlFor='' key={d.prefCode}>
            <input type='checkbox' name='' id='' />
            {d.prefName}
          </label>
        ))}
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} />
    </>
  )
}
