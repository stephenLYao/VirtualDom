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

// set diffprops
const diffProps = (
  prevNode,
  nextNode
) => {
  const count = 0
  const prevProps = prevNode.props
  const nextProps = nextNode.props
  const propsPatches = {}

  Object.keys(prevProps).forEach(key => {
    if(nextProps[key] !== prevProps[key]){
      count++
      propsPatches[key] = nextProps[key]
    }
  })

  Object.keys(nextProps).forEach(key => {
    if(!prevProps.hasOwnProperty(key)){
      count++
      propsPatches[key] = nextProps[key]
    }
  })

  if(count === 0) return null

  return propsPatches

}

// set diffChildren
const diffChildren = (
  prevNode,
  nextNode,
  index,
  patches,
  currentPatches
) => {
  const diffs = ListDiff(prevNode,nextNode,'key')
  nextNode = diffs.children
}
