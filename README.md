# Eggsy

A simple and uniform programming language written in JavaScript

> Eggsy is based on the Egg programming language project from [Eloquent JavaScript](https://github.com/marijnh/Eloquent-JavaScript), 3rd Edition

## Syntax

Everything in Eggsy is an expression - the name of a variable, a number, a string, or an application (applications are used for function calls as well as for if or while statements).

### Strings, Numbers and Variable Names

A **string** is a sequence of characters wrapped in double quotes, where characters in that sequence are anything but double quotes. Examples: `"A string"`, `"Mulan (1998)"`

A **number** is a sequence of digits. Examples: `01`, `114`

Parentheses are not valid in a variable name. Neither are commas (`,`) or hashes (`#`). Other than these, **variable** names can consist of any non-whitespace characters that do not have a special meaning in the syntax. Examples: `total`, `4get`

### Applications

Applications are written by putting parentheses after an expression and having comma-separated arguments between those parentheses. (The number of arguments allowed depends on the construct being used.) Examples: 

```
# define a variable named total and assign it a value of 10
define(total, 10)

if (==(exp, 0),
  1,
  *(base, pow(base, -(exp, 1))))
```

#### do

The `do` construct is used to represent doing multiple things in sequence.

```
do(define(total, 0),
  print("This is a string."),

  define(count, 1),

  # This is a comment

  while(<(count, 11),
    do(define(total, +(total, count)),
      define(count, +(count, 1)))),

  print(total)
)
```

#### Functions
A function construct treats its last argument as the function’s body and all arguments before that as the function’s parameters.

```
# create a function named subtractOne which subtracts one from the argument it is called with
do(define(subtractOne, fun(a, -(a, 1))),
    # print the result of calling subtractOne with an argument of 12
    print(subtractOne(12)))
```

### Comments

As you must have guessed from the code examples above, comments are preceded with the `#` character. Everything from the `#` character to the end of a line is considered a comment and will be ignored.

```
# One more comment for the road
print("There's a comment above me.") # Another comment here 
```

## Usage

Call the `run` function in `main.js` on a valid piece of code to evaluate it.

```
run(`
  do( print(element(array(0, 1, 2, 3, 4), 2)),
    print("Done."))
`);
```
