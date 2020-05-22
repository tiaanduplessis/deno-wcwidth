# deno-wcwidth

> Deno port of Node's port of the C port of wcwidth() and wcswidth()

## About

Determine columns needed for a fixed-size wide-character string. Refer to [the original](https://github.com/timoxley/wcwidth) for more info. This was more to try out Deno than anything else  ¯\_(ツ)_/¯.

## Usage

```
'한'.length    // => 1
wcwidth('한');   // => 2

'한글'.length    // => 2
wcwidth('한글'); /
```

## License

MIT
