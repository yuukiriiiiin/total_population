import axios from 'axios'
import type { GetStaticProps } from 'next'
import { App } from '../components/pages/index'

export const getStaticProps: GetStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY },
  }
  /* @ts-ignore */
  const res = await axios.get('	https://opendata.resas-portal.go.jp/api/v1/prefectures', key)
  const data: { messages: null; result: { prefCode: number; prefName: string }[] } = await res.data

  const pData = await Promise.all(
    data.result.map(async (d: { prefCode: number; prefName: string }) => {
      const res = await axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${d.prefCode}`,
        /* @ts-ignore */
        key,
      )
      const data2 = await res.data
      const total = data2.result.data.find((d: any) => d.label === '総人口')

      return {
        prefCode: d.prefCode,
        total,
      }
    }),
  )

  const final = pData.reduce((acc, v) => {
    const index = acc.findIndex(({ prefCode }) => prefCode === v.prefCode)
    const value = {
      ...acc[index],
      total: v.total,
    }
    if (index === -1) return [...acc]
    return [...acc.slice(0, index), value, ...acc.slice(index + 1)]
  }, data.result)

  return { props: { final } }
}

export default App
