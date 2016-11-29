import './VirtualDOM/Example/increasing'



const VTree = VNode('ul', {id: 'list'},[
          VNode('h1', {style: 'color:red'}, ['Title']),
          VNode('li', {class: 'item'}, ['Item 1']),
          VNode('li', {class: 'item'}, ['Item 2']),
          VNode('li', {class: 'item'}, ['Item 3'])
        ])
const VDom = createNode(VTree)
const root = document.getElementById("root")
root.appendChild(VDom)
