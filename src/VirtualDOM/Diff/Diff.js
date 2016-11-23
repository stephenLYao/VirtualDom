"use strict"
import {
  TEXT,
  PROPS,
  REORDER,
  REPLACE
} from './PatchType'
import ListDiff from './ListDiff'

export const Diff = (
  prevNode,
  nextNode,
  index = 0,
  patches = []
) => {
  const currentPatches = []

  if(prevNode === null && nextNode === null) return
  if(prevNode === 'string' && nextNode === 'string'){
    if(prevNode !== nextNode){
      currentPatches.push({
        type: TEXT,
        content: nextNode
      })
    }
  } else if(prevNode.tagName === nextNode.tagName && prevNode.key === nextNode.key){
    // diff props
    const propsPatches = diffProps(prevNode,nextNode)
    if(propsPatches){
      currentPatches.push({
        type: PROPS,
        props: propsPatches
      })
    }
    //diff children
    diffChildren(prevNode,nextNode,index,patches,currentPatches)
  }else{
    currentPatches.push({
      type: REPLACE,
      node: nextNode
    })
  }

  if(currentPatches.length){
    patches[index] = currentPatches
  }

  return patches
}

const diffProps = (
  prevNode,
  nextNode
) => {

}
