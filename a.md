
## Use c.header with append before c.body

```
c.header(Set-Cookie, hoge-session=hoge-session-value, {"append":true})
After c.header():
this.#headers Headers { 'Set-Cookie': 'hoge-session=hoge-session-value' }
this.#preparedHeaders {}
this.res.headers Headers { 'content-type': 'text/plain;charset=UTF-8' }
----------------------------------------------------------------------------------------------------
c.header(X-Debug, true, undefined)
After c.header():
this.#headers Headers { 'Set-Cookie': 'hoge-session=hoge-session-value', 'X-Debug': 'true' }
this.#preparedHeaders {}
this.res.headers Headers { 'content-type': 'text/plain;charset=UTF-8' }
----------------------------------------------------------------------------------------------------
c.header(Content-Type, text/html, undefined)
After c.header():
this.#headers Headers {
  'Set-Cookie': 'hoge-session=hoge-session-value',
  'X-Debug': 'true',
  'Content-Type': 'text/html'
}
this.#preparedHeaders {}
this.res.headers Headers { 'content-type': 'text/plain;charset=UTF-8' }
----------------------------------------------------------------------------------------------------
c.#newResponse("<html><body><h1>Hello World</h1></body></html>", undefined, undefined)
Merging headers from this.#res.headers to this.#headers
this.#headers Headers {
  'Set-Cookie': 'hoge-session=hoge-session-value',
  'X-Debug': 'true',
  'Content-Type': 'text/html'
}
this.#res.headers Headers { 'content-type': 'text/plain;charset=UTF-8' }
this.#preparedHeaders {}
After merging headers from this.#res.headers to this.#headers:
this.#headers Headers {
  'Set-Cookie': 'hoge-session=hoge-session-value',
  'X-Debug': 'true',
  'content-type': 'text/plain;charset=UTF-8'
}
this.#res.headers Headers { 'content-type': 'text/plain;charset=UTF-8' }
this.#preparedHeaders {}
----------------------------------------------------------------------------------------------------
c.res.headers after c.body():
Headers {
  'Set-Cookie': 'hoge-session=hoge-session-value',
  'X-Debug': 'true',
  'content-type': 'text/plain;charset=UTF-8'
}
----------------------------------------------------------------------------------------------------
```

## do not call c.header append true

```
c.header(X-Debug, true, undefined)
After c.header():
this.#headers undefined
this.#preparedHeaders { 'x-debug': 'true' }
this.res.headers Headers { 'content-type': 'text/plain;charset=UTF-8' }
----------------------------------------------------------------------------------------------------
c.header(Content-Type, text/html, undefined)
After c.header():
this.#headers undefined
this.#preparedHeaders { 'x-debug': 'true', 'content-type': 'text/html' }
this.res.headers Headers { 'content-type': 'text/plain;charset=UTF-8' }
----------------------------------------------------------------------------------------------------
c.#newResponse("<html><body><h1>Hello World</h1></body></html>", undefined, undefined)
Merging headers from this.#res.headers to this.#headers
this.#headers Headers { 'x-debug': 'true', 'content-type': 'text/html' }
this.#res.headers Headers { 'content-type': 'text/plain;charset=UTF-8' }
this.#preparedHeaders { 'x-debug': 'true', 'content-type': 'text/html' }
After merging headers from this.#res.headers to this.#headers:
this.#headers Headers { 'x-debug': 'true', 'content-type': 'text/plain;charset=UTF-8' }
this.#res.headers Headers { 'content-type': 'text/plain;charset=UTF-8' }
this.#preparedHeaders { 'x-debug': 'true', 'content-type': 'text/html' }
----------------------------------------------------------------------------------------------------
c.res.headers after c.body():
Headers { 'x-debug': 'true', 'content-type': 'text/html' }
----------------------------------------------------------------------------------------------------
```
