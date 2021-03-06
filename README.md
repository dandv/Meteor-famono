raix:famono
===========

### What is it?

In short you can load libraries from `bower`, `github`, `http`, locally from `path` or as in memory `alias` libraries.

It currently supports `umd`/`commonjs`/`requirejs`/`amd` libraries.

__You get:__ [famous](https://github.com/Famous/famous) libraries pr. default along with [meteor integration library](https://github.com/raix/library).

It was built to support Famo.us in Meteor (examples below)
But target has become finegrained reuse of javascript code in general from the web.

If you want a "pure" app without the meteor libraries just remove `meteor-platform` package.

### Installing it

__Meteor package__
```bash
$ meteor add raix:famono
```
*Requires: `Meteor-0.9.0` and of course `git`*

### Use it

__How:__
When you install famono it will add a `lib/smart.require` file to your main app folder:

```js
{
  "famous": {
    "git": "https://github.com/Famous/famous.git",
    "root": "src" // From version 3 of famous
  },
  "famous.polyfills": {
    "git": "https://github.com/Famous/polyfills.git"
  }
}
```

The `lib/smart.require` library registry comes with references to `famous` and `famous.polyfills` repos by default.

This enables you to do:
```js
if (Meteor.isClient) {

  // Rig some famo.us deps
  famous.polyfills;
  famous.core.famous;

  // Make sure dom got a body...
  Meteor.startup(function() {
    var mainContext = famous.core.Engine.createContext();
    var renderController = new famous.views.RenderController();
    var surfaces = [];
    var counter = 0;

    for (var i = 0; i < 10; i++) {
        surfaces.push(new famous.core.Surface({
             content: "Surface: " + (i + 1),
             size: [200, 200],
             properties: {
                 backgroundColor: "hsl(" + (i * 360 / 10) + ", 100%, 50%)",
                 lineHeight: "200px",
                 textAlign: 'center'
             }
        }));
    }

    renderController.show(surfaces[0]);

    famous.core.Engine.on("click", function() {
        var next = (counter++ + 1) % surfaces.length;
        this.show(surfaces[next]);
    }.bind(renderController));

    mainContext.add(new famous.core.Modifier({align: [.5, .5], origin: [.5, .5]})).add(renderController);

  });

}
```

> NOTE: You can still do regular `var Surface = require('famous/core/Surface');`

### Will the entire repo be loaded to the client??

__Nope!!__ - the package scans your code and figure outs dependencies based on your calls to `require`.

### Adding additional libraries
You can add additional libraries like `moment`/`underscore` etc

By editing `lib/smart.require` manually:

```js
  "underscore": {
    "bower": "underscore"
  },
  "moment": {
    "git": "https://github.com/moment/moment.git"
  },
  "numeral": {
    "git": "https://github.com/adamwdraper/Numeral-js"
  },
  "jquery": {
    "alias": "$"
  },
  "foo": {
    "bower": "foo",
    "root": "src/path"
  },
  "jqueryui": {
    "http": "http://code.jquery.com/ui/jquery-ui-git.js"
  },
  "localDevLib": {
    "path": "/just/something/I/m/working/on",
  },
  "localLib": {
    "path": "/some/where/over/the/rainbow"
    "watch": "false" // default is true
  }
```

> Famono will add/download or removal of the changed namespace LIVE - Note that you can use bower and github as source


### Advanced stuff
I've moved documentation for more advanced features / usage into [Advanced.md](ADVANCED.md)


Kind regards Morten (aka raix)
