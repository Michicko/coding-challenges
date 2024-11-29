# Wc Tool

This is a clone of the Unix command line tool wc.

The ccwc command counts the number of lines, words, and bytes in the files specified by the File parameter.

When you use the File parameter, the ccwc command displays the file names as well as the requested counts. If you do not specify a file name for the File parameter, the wc command uses standard input.

## Syntax

ccwc [ Option ] [ File ]

ccwc [ -c | -m ] [ -l ] [ -w ] [ File ... ]

To display the line, word, and byte counts of a file, enter:

```bat
  ccwc [ File ]
```

To display filesize in byte enter:

```bat
  ccwc -c [ File ]
```

To display lines count enter:

```bat
  ccwc -l [ File ]
```

To display words count enter:

```bat
  ccwc -w [ File ]
```

To display character counts enter:

```bat
  ccwc -m [ File ]
```

To read from standard input if no filename is specified enter:

 cat [ File ] | ccwc [ Option ]

The code below displays lines count of the input

```bat
  cat [ File ] | ccwc -l
```
