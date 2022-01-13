import { useEffect, useState } from 'react'
import { parse } from './cif-tools/Text/Parser'
import { parseCifText } from './molstar/mol-io/reader/cif/text/parser'
import { CIFLoader } from  'cifloader3'
import {Object3D} from './viewer/Object3D'
import {demoGeometry} from './viewer/StructureGeometry'
import Viewer from './viewer'
import './App.css'

const loader = new CIFLoader();

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Viewer.init()
    Object3D.init()
    Object3D.add(demoGeometry)
    return () => {
      // Viewer.dispose()
    }
  }, [])

  return (
    <div className="App">
      <input type="file" onChange={(e) => {
        const { files } = e.target
        const file = files![0]
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          const result = reader.result
          console.log('cif-tools', parse(result as string))
          parseCifText(result as string).run().then((res) => {
            console.log('parseCifText', res)
          })
          
          console.log('CIFLoader', loader.parse(result as string))
        }
      }} />
    </div>
  )
}

export default App
