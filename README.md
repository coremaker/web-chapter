# web-chapter

A framework for building web applications

# Modules

## UI

A library containing React components built over Material UI with custom theming.

## Lib

A library containing helper JavaScript functions

## Eslint

A library containing a shared eslint config

# Locally testing your changes

To test your changes to any library you need to package the library and import it into an existing project. The steps are:

1. bump the version in the `package.json` to a testing version like: `"version": 0.0.49-beta01`
2. in the project root run `npm run -w packages/[library_name] build` where `library_name` can be any module from the `packages` folder such as "lib" or "ui".
3. `cd` into the `dist` folder of the package you just built and run `npm pack --pack-destination ~`. This command will create in the home directory a `web-chapter-ui-0.0.49-beta01.tar.gz` file containing the built library.
4. go into your project and in the package json put the following under dependencies:

```
 "dependencies": {
    ...
    "@web-chapter/ui": "file:~/web-chapter-ui-0.0.48.tgz",
    ...
 }
```

Then run `npm install` in that project and it should use your local version of the library.
