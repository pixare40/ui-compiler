# ui-compiler

This is a small library that converts a markup language to mustache template files.

It can be used to build out a page builder for Vesper.

# The Markup Language

The markup language is not well thought out by any means it was an experiment to understand compiler design. It's basis is a Node. 

A node is represented by an identifier and curly braces to delineate it. Example below:

``` 
hero(zone: 'A'){}
```

hero is the component node that will be created with an attribute of zone: A

You can then compose the render tree accordingly Example:

```
hero(zone: 'A'){
    actions {
        button(text: 'Continue', label: 'continue')
    }
}
```

That's all there is to it.

# Known Issues
- Attribute values that are URLs must start with `http` or `https`
- Tell me others found