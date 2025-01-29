import React, { useState } from 'react'
import { Button } from '../ui/button'
import axios from 'axios'
type OutputTerminalProps = {
    code:string,
    version:string,
    language:string
}
const OutputTerminal = ({code,language,version}:OutputTerminalProps) => {

    const [data,setData] = useState<{ output?: string, code?: number } | null>(null)

    const runCode =async()=> {
        // if(!code || !language) return

        try {
            const response = await axios.post('https://emkc.org/api/v2/piston/execute',{
                language,
                version,
                "files":[{
                    "content":code
                }]
            })
            // const response2 = await axios.get('https://emkc.org/api/v2/piston/runtimes')
            console.log("response",response.data);
            // console.log("response2",response2);
            setData(response.data?.run)
        } catch (error) {
            console.log(error);
        }

    }

  return (
    <div className='w-full h-[40%] relative bg-black rounded-md  my-2 overflow-y-scroll'>
        <Button size='sm' className='absolute right-0 m-2' onClick={runCode}>Run code</Button>
        <div className="m-2">
        <p className={data?.code === 1 ? 'text-red-600': ''}>
            {data?.output}
        </p>
        </div>
    </div>
  )
}


export default OutputTerminal