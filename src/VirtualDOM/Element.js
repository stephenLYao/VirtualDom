"use strict"

const Element = (
  tagName,
  props,
  children
) => {
  // render element
  const element = document.createElement(tagName)
  // set props
  Object.keys(props).forEach(prop => {
    element.setAttribute(prop,props[prop])
  })
  // set children
  if(children === null) return
  children.forEach(child => {
    const childElement = (child instanceof Element)
          ? Element(child)
          : document.createTextNode(child)

    element.appendChild(childElement)
  })

  return element
}

export Element