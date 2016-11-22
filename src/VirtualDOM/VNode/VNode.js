//Vnode CreateNode
export const createNode = ({
  tagName ,
  props,
  children
}) => {
  const element = document.createElement(tagName)
  // if props is Array
  if(Array.isArray(props)){
    children = props
    props = {}
  }
  // set props
  Object.keys(props).forEach(prop => {
    element.setAttribute(prop,props[prop])
  })
  // set children
  if(children === null) return
  children.forEach(child => {
    let childElement
    if(typeof child === 'string'){
      childElement = document.createTextNode(child)
    }else{
      childElement = createNode(child)
    }

    element.appendChild(childElement)
  })
  return element
}

export const VNode = (
  tagName = '',
  props = {},
  children = []
) => {
  return { tagName,props,children }
}
