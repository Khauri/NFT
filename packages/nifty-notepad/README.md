# Nifty Notepad

Like a code editor, but for simplistic music notation.

## Running

Although the project is built and managed with bun, this particular library currently requires node >=18 to run

This is because the framework used, @marko/run, uses some (very basic) stuff not available in bun yet.

Feel free to run this command to see what those things are and whether or not they're still relevant

```sh
bun run --bun dev
```

Otherwise I would suggest installing `volta`. You can still run the project with

```sh
bun run dev
```

But just note that it will run with `nodejs` and not `bun` and so you need to have node installed.