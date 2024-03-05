# HTML Library

This library provides a simple wrapper for creating HTML elements.  It is used where dynamic HTML needs to be generated at run time.

The native `document.createElement(...)` methods are effective but lead to many reptitive lines of code.  This library allows for a more natural conversation in code.

```js
// Native code
const myobj = document.createElement('div')
myobj.id = "someID"
myobj.innerText = "Hello World"
myobj.classList.add('myclass')
document.body.append(myobj)

// vs
import HTML from './html.js'
const myobj = HTML.div({id: "someID", content: "Hello World", class: "myclass"})
document.body.append(myobj)
```

Both approaches accomplish the same thing.  The native approach though becomes much more work when you need to build complex structures dynamically, and more prone to mistakes/typos.

# USAGE

Include the `html.js` library in your web page or JS module.  Then call "HTML.*tagname*(*options*)" in your code.  Append the resulting HTML node element to your web page or container as needed.

```html
<script type="module">
    import HTML from './html.js'

    const mydiv = HTML.div({id: "mydiv", content: "Hello World", "class": "some-class"})
    document.body.append(mydiv)
</script>
```

# Why not just use React/Vue/....

Using this library does not require a `HTML.js` vs `<framework>` discussion.  It can be used in conjunction with other frameworks if desired.  

`HTML.js` was developed for small projects that will likely only ever see a single developer.  It was developed for projects where using a framework like `React` or `Vue` may not be the best choice.  

Using a framework ensures all the developers have a common usage pattern for the project and can converse accordingly.  However the frameworks add overhead that is sometimes just not needed.  The file size of the framework libraries should be considered, the size of the development team, etc.  

For small projects with a single developer, using a tool like `HTML.js` may result in a much smaller set of code / files being delivered to the browser.

# More Details

## HTML Tags

Known HTML tags can be used out of the box.  Call the tag as a function and pass an options object.  The options of course depend highly on what tag is being used - an href doesn't normally make sense for a paragraph tag.

```js
// const mytag = HTML.tagname(<options>)

const link = HTML.a({href: 'http://google.com', content: 'Google', target: '_blank'})
document.body.append(link)
```

## Tag Attributes

Tags attributes can be set by specifying the attribute in the options object.  The options object is optional and does not *need* to be set.  However it is the handling of the options that separate this library from using the native `document.createElement(...)` approach.

For instance, if you need to specify the `src` attribute for an `img` tag, you can do so like this:

```js
const myimg = HTML.img({src="http://somedomain/image.jpg"})
```

Any property on the option tag that is not explicitly handled (see further notes below) are passed to the generated tag as a property.  If the tag has a property of that name, then the value is set accordingly.  If the tag does not have a property of that name, the property would be created and set.  We allow this to support the edge cases where adding unknown attributes makes sense for your specific project.  (Example you may want to set a "data-source_id" property for later use.)

Some attributes like "class" are already special cases.  These are handled within the library.

## Tag Content

Where tags have content, that content can be set by specifying the "content" property of the options object.

It should be noted the uderlying code is `tag.innerHTML = <content>`.  So strings and child nodes can be both be used.

```js
const p1 = HTML.p({content: "Hello World"})
const div1 = HTML.div({content: p1})
```

Of course, you can still set `innerHTML` or `innerText` directly if you prefer:

```js
const p1 = HTML.p()
p1.innerText = "Hello World"
```


## CSS Classes

CSS Classes can be assigned to a tag by setting a "class" property in the passed options object.

The value of the "class" property can be a simple string, an space delimited list, or an array of strings.

```js
const p1 = HTML.p({class: 'myclass'})
const p2 = HTML.p({class: 'myclass yourclass all-classes'})
const p3 = HTML.p({class: ['myclass', 'yourclass', 'all-classes']})
```


# A more complete example

Using this library to build a static HTML page can be done, but it would be faster to just create the HTML page.  Instead, this library is intended where the content to be displayed is not known at development time, but is expected to conform to a certain structure.

Consider where a list of comments may need to be generated for a page dynamically:

```js
import HTML from './html'

function comment(comment_id, author, create_date, body) {
    const comment_div = HTML.div({id: comment_id, class: 'comment'})
    const author_div = HTML.div({content: author, class: 'author'})
    const date_div = HTML.div({content: create_date, class: 'comment-date'})
    const body_div = HTML.div({content: body, class: 'body'})
    comment_div.append(author_div, date_div, body_div)
    return comment_div
}

fetch('/get_comments?id=123')
    .then(results => {
        if (results.status == 200) {
            return results.json()
        }
    })
    .then(data => {
        if (data) {
            const container = document.getElementById("comments-wrapper")
            // assuming data is an array
            for (const entry of data)
                container.append(comment(entry.id, entry.author, entry.created, entry.body))
        }
    })
    .catch(err => {
        console.error("Error while retrieving or handling comments:")
        consle.error(err)
    })

```

This code would handle zero, 300, or more comments - depending on what was returned from the `fetch`.  Validating the retrieved data should be done of course, but this example demonstrates the use of the library. 

The CSS to make this look good would be an exercise left to the reader.