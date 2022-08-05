import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'

export type Props = {
  options: Highcharts.Options
}

export const Chart: React.FC<Props> = ({ options }, chartComponentRef) => {
  return <HighchartsReact highcharts={Highcharts} options={options} ref={chartComponentRef} />
}
