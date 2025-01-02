# ui-compiler

This is an experiment on compiler design and using it to build out a usable interface for the Vesper Pagebuilder

It is a small library that converts a markup language to render tree for consumption on a specific platform.

# The Markup Language

The markup language is not well thought out by any means, it was an experiment to rehash uni concepts on compiler design. It's foundations are based on JSX. 

A Node is represented by an identifier and curly braces to delineate it. Example below:

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
- Tell me others found.