Deno.serve({
  port: 8080,
  handler: () => {
    return new Response(`
      <html>
      <body style="padding: 50px" />
      <script type="module">

      // import * as yjs from "https://esm.sh/yjs@13.6.8?deps=lib0@0.2.72" // works
      import * as yjs from "https://esm.sh/yjs@13.6.8?deps=lib0@0.2.73" // broken

      const doc = new yjs.Doc()
      const echo = { clientID: doc.clientID, guid: doc.guid }
      console.log(echo)
      document.body.innerHTML = "<pre>YDoc: " + JSON.stringify(echo, null, 2) + "</pre>"
      </script>
    `,
    { headers: { "content-type": "text/html" }})
  },
})
