import React from 'react'

const Titulo = ({label}) => {


    return (
        <h4 className="rounded-r-lg bg-red-500  font-bold py-2 w-2/5 uppercase border-red-500 border-2 text-md text-center">
        {label}
      </h4>
    )
}

export default Titulo
