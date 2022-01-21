import { useEffect, useState } from 'react'
import { parseCifText } from './molstar/mol-io/reader/cif/text/parser'
import {Object3D} from './viewer/Object3D'
import {H4C_mp, BeCN2_mp, FeCl4_mp, Mg149Ti_mp} from './demo-file'
import './App.css'

function App() {
  const [name, setName] = useState('')

  const parseCifFile = (str: string) => {
    parseCifText(str as string).run().then((res) => {
      if (res.isError) {
        return alert('文件解析失败')
      }
      try {
        const {blocks} = res.result
        const cifBlock = blocks[0]
        if (!cifBlock) {
          return alert('文件解析失败')
        }
        setName(cifBlock.header)
        Object3D.readCif(cifBlock)
      } catch (e) {
        alert('文件解析失败')
      }
    })
  }

  useEffect(() => {
    Object3D.init()
    parseCifFile(H4C_mp)
    // return () => {
    //   // Viewer.dispose()
    // }
  }, [])

  return (
    <div className="App">
      <input type="file" accept='.cif' onChange={(e) => {
        const { files } = e.target
        const file = files![0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          const result = reader.result
          parseCifFile(result as string)
        }
      }} />
      <div className='demo-tit'>{name}</div>
      <div className='demo-file'>
        <h2>Demo File</h2>
        <button onClick={() => parseCifFile(H4C_mp)}>H4C_mp-1021328</button>
        <button onClick={() => parseCifFile(BeCN2_mp)}>BeCN2_mp-1189451</button>
        <button onClick={() => parseCifFile(FeCl4_mp)}>FeCl4_mp-1225059</button>
        <button onClick={() => parseCifFile(Mg149Ti_mp)}>Mg149Ti_mp-1185639</button>
      </div>
    </div>
  )
}

export default App
