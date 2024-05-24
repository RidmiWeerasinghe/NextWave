import React, { useEffect } from 'react'

function About() {
    useEffect(()=>{
        console.log("use effect running")
    },[])
    return (
        <div>help and support
        </div>
    )
}

export default About
