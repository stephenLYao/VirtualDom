// element.js

//constructor
function Element(tagName,props,children){
  this.tagName = tagName
  this.props = props
  this.children = children
}

Element.prototype.render = function(){
  var element = document.createElement(this.tagName)
  var props = this.props

  for ( var propName in props){
    propValue = props[propName]
    element.setAttribute(propName,propValue)
  }

  var children = this.children || []

  children.forEach(function(child){
    var childElement = (child instanceof Element) ? child.render() : document.createTextNode(child)
    element.appendChild(childElement)
  })

  return element
}

module.exports = function(tagName,props,children){
  return new Element(tagName,props,children)
}
