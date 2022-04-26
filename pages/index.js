import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect,useState } from 'react'

export default function Home() {
  const [testApi, setTestApi] = useState();
  useEffect(() => {
    fetch('api/hi')
    .then(response => response.json())
    .then(data =>{
      console.log(data)
      setTestApi(data)
    })
    .catch(error => console.log(error));
  }, [])
  
  return (
    <div className={styles.container}>
test

api:{testApi&&testApi.hi}
    </div>
  )
}
