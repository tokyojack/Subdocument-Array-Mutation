<h1>Subdocument Array Mutation</h1>
<p>Jack Clarke - tokyojack2001@gmail.com</p>

<h1>Installation</h1>

1. <code>npm install</code> (or yarn)

2. Run <code>npm run test</code> to run the jest tests in <code>/tests</code>

3. Modify the <code>/src/index.ts</code> and run <code>npm run start</code> if you wanna test yourself

<h1>Commands</h1>

| npm run {cmd} | Description |
| ----------- | ----------- |
| start       | Runs a index.ts once |
| watch       | Runs a nodemon instance of <code>index.ts</code> for simple testing |
| test        | Runs all the jest tests in <code>/tests</code> |
| lint        | Runs some simple linting |

<h1>Design notes</h1>

- The methods I used depends on the <code>_id</code>'s being unique. Assuming in a production 
  scenario they would be something like UUID where it's <i>pretty much</i> guaranteed not to generate duplicates.

- For the operations I get the deepest ID, match it to the document, and work myself up. This has 
  has the advantages of not relying on the previous <code>_id</code>s, but does require them to be unique.

- Going deep first may cost a bit more performance, but it most likely would be negliable
and might possibly make it up by only needing to get the exact ID path once from the document.

- Not a big fan of all the <code>any</code> usage. If the objects were clear and set in stone
  I'd make types for them for sure.

- This only supports only single extra fields because that's what the specifications gave. Ex: can't do updating like this: <br/>
<code>{"posts": [{"_id": 2, "value": "too", "second_value": "cats"}];</code>
<br/>
But this could easily be updated to support it by modify <code>fromPathBuildAdjecentKey</code> and adding
the rest of the <code>Object.entries(parent)</code> values instead of only the first.

- Jest tests are pretty simple, could for sure be more thorough.