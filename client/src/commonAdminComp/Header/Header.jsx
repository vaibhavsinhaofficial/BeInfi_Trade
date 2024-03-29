import React from 'react'
import {Link} from 'react-router-dom'
import { useStateContext } from "../../context/ContextProvider";
function Header({title,path}) {
  const { role } = useStateContext();
  return (
    <div className="row justify-content-between align-items-center">
    <div className="col-sm-8"><h4 className='headingAll'>{title}</h4></div>
    {
      role === "1" || role === "-1" ? (
        <>
          <div className="col-sm-4 text-end"><Link to={path} className="btn btn" style={{background: "#ff6600", borderRadius: "20px", color: "#fff"}}>Back</Link> </div>
        </>
      ) : (
        <div className="col-sm-4 text-end"><Link to={path} className="btn btn" style={{background: "#008000", borderRadius: "20px", color: "#fff"}}>Back</Link> </div>
      )
    }
  </div>
  )
}

export default Header