import {
  TEXT,
  PROPS,
  REORDER,
  REPLACE
} from './PatchType'
import { createNode } from '../VNode/VNode'

// define walker
let walker = 0

// export Patch
export const Patch = (
  node,
  patches,
  index = 0
) => {
  walker = index

  const currentPatches = patched[walker++]

  if(currentPatches){
    currentPatches.forEach(currentPatch => {
      applyPatch(node,currentPatch)
    })
  }

  if(node.childNodes.length === 0) return

  [...node.childNodes].forEach(child => {
    Patch(child,patches,walker)
  })
}

// define applyPatch
const applyPatch = (
  node,
  currentPatch
) => {
  switch (currentPatch.type) {
    case TEXT:
      node.textContent = currentPatch.content
      break
    case PROPS:
      setProps(node,currentPatch.props)
      break
    case REPLACE:
      setReplace(node,currentPatch.node)
      break
    case REORDER:
      setReorder(node,currentPatch.moves)
      break
    default:
      throw new Error('Unknown patch type ' + currentPatch.type)
  }
}
// setProps
const setProps = (
  node,
  props
) => {
  Object.keys(props).forEach(key => {
    const value = props[key]
    if(value){
      node.setAttribute(key,value)
    }else{
      node.removeAttribute(key)
    }
  })
}

// setReorder
const setReorder = (
  node,
  moves
) => {

}
// setPeplace
const setReplace = (
  node,
  patchNode
) => {
  const newNode = (typeof patchNode === 'string')
    ? document.createTextNode(patchNode)
    : createNode(node)
  node.parentNode.replaceChild(newNode,node)
}
