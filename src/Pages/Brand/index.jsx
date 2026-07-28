import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Brand() {
  return (
    <div>
        <h2>Brands</h2>
        <button>Create Brand</button>
        <div>
            <Outlet/>
        </div>
      
    </div>
  )
}
