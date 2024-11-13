import React, { useEffect, useState } from "react";
import axios from 'axios'

const About = () => {
  const [desc, setDesc] = useState('')
  const getList = () => {
    axios.post('api/data', {name: '1111'}).then(({ data }) => {
      setDesc(data?.desc)
      console.log('%c [ res ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    }).catch(err => {
      console.log('%c [ err ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', err)
    })
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <h1>About</h1>
      <div>{desc}</div>
    </div>
  )
}

export default About;