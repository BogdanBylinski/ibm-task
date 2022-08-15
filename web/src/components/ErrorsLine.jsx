import React from 'react'

function ErrorsLine({error}) {
  return (
    <div className="row errors">
          {error === 1 ? (
            <div className="col-12   error">{`You can use only [a-z / A-Z] and spaces " "`}</div>
          ) : (
            ""
          )}
          {error === 2 ? (
            <div className="col-12  error">{`Max input length 35 characters`}</div>
          ) : (
            ""
          )}
        </div>
  )
}

export default ErrorsLine