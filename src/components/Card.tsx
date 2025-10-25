import React from 'react'

type CardProps = {
  title?: string
  actions?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export default function Card({ title, actions, className, children }: CardProps) {
  return (
    <section className={`card${className ? ` ${className}` : ''}`}>
      {(title || actions) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </section>
  )
}
