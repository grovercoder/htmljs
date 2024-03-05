/*
    This library provides a simple wrapper around the HTML element creation steps.
    This allows for simpler dynamic code in the form of `HTML.div({id: 'myDivID'})`
*/

// List of known HTML tags (sourced from https://www.javatpoint.com/html-tags)
const known_tags = [
    "a",
    "abbr",
    "acronym",
    "address",
    "applet",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "basefont",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "isindex",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "marquee",
    "menu",
    "meta",
    "meter",
    "nav",
    "noframes",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "svg",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "tt",
    "u",
    "ul",
    "var",
    "video",
    "wbr"
]

/**
 * Assigns values to attributes or properties of an HTML tag/node
 * @param tag HTML element / node
 * @param options JS object representing the tag attributes/properties to be set
 */
function assignParams(tag, options = {}) {
    Object.entries(options).forEach(([key, value]) => {
        switch (key.toLowerCase()) {
            case "id":
                tag.id = value;
                break;
            case "class":
                const classes = typeof value === 'string' ? value.split(' ') : value;
                classes.forEach(cls => tag.classList.add(cls));
                break;
            case "content":
                tag.innerHTML = value;
                break;
            case "for":
                tag.setAttribute('for', value);
                break;
            default:
                tag[key] = value;
                break;
        }
    });
}

/**
 * Create an HTML tag
 * @param tagName String name of tag to create
 * @param options JS Object listing attributes/properties for the tag
 * @returns HTML Node
 */
function createTag(tagName, options) {
    const tag = document.createElement(tagName);
    assignParams(tag, options);
    return tag;
}


/**
 * Generates the HTML object
 * @returns JS Object with methods for each known HTML tag
 */
function factory() {
    const output = {}
    known_tags.forEach(tagname => {
        output[tagname] = options => createTag(tagname, options)
    })
    return output
}

export default factory()
