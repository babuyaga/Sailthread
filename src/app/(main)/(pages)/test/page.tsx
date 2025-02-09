'use client'
import React, { useEffect, useState } from 'react'
import { addToNodeTemplate } from '../workflows/_actions/workflow-connections';
import { NodeTemplate } from '@prisma/client';

type Props = {}



const Page = (props: Props) => {
    const [response, setResponse] = useState<NodeTemplate | null>(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await addToNodeTemplate();
            setResponse(response);
        };
        fetchData();
    }, []);





  return (
    <div>{response?.id}</div>
  )

}

export default Page