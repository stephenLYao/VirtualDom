import {
  VNode,
  createNode,
  Patch,
  Diff
} from '../VirtualDOM.js'

export const increasing = () => {
  const count = 0
  const renderTree = () => {
    count ++
    const items = []
    const color = (count % 2 === 0)
      ? 'blue'
      : 'red'

    for(let i = 0;i < count; i++){
      items.push(VNode('li',['Item #' + i]))
    }
    return VNode('div',{'id' : 'container'},[
      VNode('h1',{style: 'color: ' + color},['simple virtual dom']),
      VNode('p',['the count is : ' + count]),
      VNode('ul',items)
    ])
  }

  const tree = renderTree()
  const nodes = createNode(tree)
  const root1 = document.getElementById("root1")
  root1.appendChild(nodes)

  setInterval(function(){
    const newTree = renderTree()
    var patches = Diff(tree,newTree)
    console.log(patches)
    Patch(nodes,patches)

    tree = newTree
  },1000)
}
