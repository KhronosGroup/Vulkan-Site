# Statements and Structure

## Metadata

- **Component**: glsl
- **Version**: latest
- **URL**: /glsl/latest/chapters/statements.html

## Table of Contents

- [Function Definitions](#function-definitions)
- [Function Calling Conventions](#function-calling-conventions)
- [Function_Calling_Conventions](#function-calling-conventions)
- [Subroutines](#subroutines)
- [Selection](#selection)
- [Iteration](#iteration)
- [Jumps](#jumps)

## Content

The fundamental building blocks of the OpenGL Shading Language are:

* 
statements and declarations

* 
function definitions

* 
selection (**if**-**else** and **switch**-**case**-**default**)

* 
iteration (**for**, **while**, and **do**-**while**)

* 
jumps (**discard**, **return**, **break**, and **continue**)

The overall structure of a shader is as follows

*translation-unit* : 

*global-declaration*

*translation-unit* *global-declaration*

*global-declaration* : 

*function-definition*

*declaration*

That is, a shader is a sequence of declarations and function bodies.
Function bodies are defined as

*function-definition* : 

*function-prototype* **{** *statement-list* **}**

*statement-list* : 

*statement*

*statement-list* *statement*

*statement* : 

*compound-statement*

*simple-statement*

Curly braces are used to group sequences of statements into compound
statements.

*compound-statement* : 

**{** *statement-list* **}**

*simple-statement* : 

*declaration-statement*

*expression-statement*

*selection-statement*

*iteration-statement*

*jump-statement*

Simple declaration, expression, and jump statements end in a semi-colon.

This above is slightly simplified, and the complete grammar specified in
“[Shading Language Grammar](grammar.html#shading-language-grammar)” should be used as
the definitive specification.

Declarations and expressions have already been discussed.

As indicated by the grammar above, a valid shader is a sequence of global
declarations and function definitions.
A function is declared as the following example shows:

// prototype
returnType functionName (type0 arg0, type1 arg1, ..., typen argn);

and a function is defined like

// definition
returnType functionName (type0 arg0, type1 arg1, ..., typen argn)
{
    // do some computation
    return returnValue;
}

where *returnType* must be present and cannot be void, or:

void functionName (type0 arg0, type1 arg1, ..., typen argn)
{
    // do some computation
    return; // optional
}

If the type of *returnValue* does not match *returnType*, there must be an
implicit conversion in “[Implicit Conversions](variables.html#implicit-conversions)”
that converts the type of *returnValue* to *returnType*, or a compile-time
error will result.

Each of the *typeN* must include a type and can optionally include parameter
qualifiers.
The formal argument names (*args* above) in the declarations are optional
for both the declaration and definition forms.

A function is called by using its name followed by a list of arguments in
parentheses.

Arrays are allowed as arguments and as the return type.
In both cases, the array must be
explicitly
sized.
An array is passed or returned by using just its name, without brackets, and
the size of the array must match the size specified in the function’s
declaration.

Structures are also allowed as argument types.
The return type can also be a structure.

See “[Shading Language Grammar](grammar.html#shading-language-grammar)” for the
definitive reference on the syntax to declare and define functions.

All functions must be either declared with a prototype or defined with a
body before they are called.
For example:

float myfunc (float f,      // f is an input parameter
              out float g); // g is an output parameter

Functions that return no value must be declared as **void**.
A **void** function can only use **return** without a return argument, even if
the return argument has **void** type.
Return statements only accept values:

void func1() { }
void func2() { return func1(); } // illegal return statement

Only a precision qualifier is allowed on the return type of a function.
Formal parameters can have parameter, precision, and memory qualifiers, but
no other qualifiers.

Functions that accept no input arguments need not use **void** in the argument
list because prototypes (or definitions) are required and therefore there is
no ambiguity when an empty argument list “( )” is declared.
The idiom “(**void**)” as a parameter list is provided for convenience.

Function names can be overloaded.
The same function name can be used for multiple functions, as long as the
parameter types differ.
If a function name is declared twice with the same parameter types, then the
return types and all qualifiers must also match, and it is the same function
being declared.

For example,

vec4 f(in vec4 x, out vec4 y);       // (A)
vec4 f(in vec4 x, out uvec4 y);      // (B) okay, different argument type
vec4 f(in ivec4 x, out dvec4 y);     // (C) okay, different argument type
int f(in vec4 x, out vec4 y);        // error, only return type differs
vec4 f(in vec4 x, in vec4 y);        // error, only qualifier differs
vec4 f(const in vec4 x, out vec4 y); // error, only qualifier differs

When function calls are resolved, an exact type match for all the arguments
is sought.
If an exact match is found, all other functions are ignored, and the exact
match is used.
If no exact match is found, then the implicit conversions in section
“[Implicit Conversions](variables.html#implicit-conversions)” will be applied to find a
match.
Mismatched types on input parameters (**in** or **inout** or default) **must**
have a conversion from the calling argument type to the formal parameter
type.
Mismatched types on output parameters (**out** or **inout**) must have a
conversion from the formal parameter type to the calling argument type.

If implicit conversions can be used to find more than one matching function,
a single best-matching function is sought.
To determine a best match, the conversions between calling argument and
formal parameter types are compared for each function argument and pair of
matching functions.
After these comparisons are performed, each pair of matching functions are
compared.
A function declaration *A* is considered a better match than function
declaration *B* if

* 
for at least one function argument, the conversion for that argument in
*A* is better than the corresponding conversion in *B*; and

* 
there is no function argument for which the conversion in *B* is better
than the corresponding conversion in *A*.

If a single function declaration is considered a better match than every
other matching function declaration, it will be used.
Otherwise, a compile-time semantic error for an ambiguous overloaded
function call occurs.

To determine whether the conversion for a single argument in one match is
better than that for another match, the following rules are applied, in
order:

An exact match is better than a match involving any implicit conversion.

A match involving an implicit conversion from **float** to **double** is
better than a match involving any other implicit conversion.

A match involving an implicit conversion from either **int** or **uint** to
**float** is better than a match involving an implicit conversion from
either **int** or **uint** to **double**.

If none of the rules above apply to a particular pair of conversions,
neither conversion is considered better than the other.

For the example function prototypes (A), (B), and (C) above, the following
examples show how the rules apply to different sets of calling argument
types:

f(vec4, vec4)   // exact match of vec4 f(in vec4 x, out vec4 y)
f(vec4, uvec4)  // exact match of vec4 f(in vec4 x, out uvec4 y)
f(vec4, ivec4)  // matched to vec4 f(in vec4 x, out vec4 y)
                // (C) not relevant, can't convert vec4 to
                // ivec4. (A) better than (B) for 2nd
                // argument (rule 3), same on first argument.
f(ivec4, vec4); // NOT matched. All three match by implicit
                // conversion. (C) is better than (A) and (B)
                // on the first argument. (A) is better than
                // (B) and (C).

User-defined functions can have multiple declarations, but only one
definition.

A shader can redefine built-in functions.
If a built-in function is redeclared in a shader (i.e., a prototype is
visible) before a call to it, then the linker will only attempt to resolve
that call within the set of shaders that are linked with it.

The function *main* is used as the entry point to a shader executable.
A shader need not contain a function named *main*, but one shader in a set
of shaders linked together to form a single shader executable must, or a
link-time error results.
This function takes no arguments, returns no value, and must be declared as
type **void**:

void main()
{
    ...
}

The function *main* can contain uses of **return**.
See “[Jumps](#jumps)” for more details.

It is a compile-time or link-time error to declare or define a function
**main** with any other parameters or return type.

Functions are called by value-return.
This means input arguments are copied into the function at call time, and
output arguments are copied back to the caller before function exit.
Because the function works with local copies of parameters, there are no
issues regarding aliasing of variables within a function.
To control what parameters are copied in and/or out through a function
definition or declaration:

* 
The keyword **in** is used as a qualifier to denote a parameter is to be
copied in, but not copied out.

* 
The keyword **out** is used as a qualifier to denote a parameter is to be
copied out, but not copied in.
This should be used whenever possible to avoid unnecessarily copying
parameters in.

* 
The keyword **inout** is used as a qualifier to denote the parameter is to
be both copied in and copied out.
It means the same thing as specifying both **in** and **out**.

* 
A function parameter declared with no such qualifier means the same
thing as specifying **in**.

All arguments are evaluated at call time, exactly once, in order, from left
to right.
Evaluation of an **in** parameter results in a value that is copied to the
formal parameter.
Evaluation of an **out** parameter results in an l-value that is used to copy
out a value when the function returns.
Evaluation of an **inout** parameter results in both a value and an l-value;
the value is copied to the formal parameter at call time and the l-value is
used to copy out a value when the function returns.

|  | Note
| --- | --- |

Because **out** parameters are not copied into a function, they begin the function
uninitialized. At the end of the function, the values are copied out to the
caller unconditionally which, if the value has not been set in the function,
will result in the passed argument becoming uninitialized in the caller. |

The order in which output parameters are copied back to the caller is
undefined.

If the function matching described in the previous section required argument
type conversions, these conversions are applied at copy-in and copy-out
times.

In a function, writing to an input-only parameter is allowed.
Only the function’s copy is modified.
This can be prevented by declaring a parameter with the **const** qualifier.

When calling a function, expressions that do not evaluate to l-values cannot
be passed to parameters declared as **out** or **inout**, or a compile-time error
results.

The syntax for function prototypes can be informally expressed as:

*function-prototype* : 

*return-type* *function-name* **(** *parameter-qualifiers*
*type-specifier* *name* *array-specifier* **,** …​
**)**

*return-type* : 

*type-specifier*

*precision-qualifier* *type-specifier*

*parameter-qualifiers* : 

*empty*

*parameter-qualifiers* *parameter-qualifier*

*parameter-qualifier* : 

**const**

**in**

**out**

**inout**

**precise**

*memory-qualifier*

*precision-qualifier*

*name* : 

empty

*identifier*

*array-specifier* : 

empty

**[** *integral-constant-expression* **]**

The **const** qualifier cannot be used with **out** or **inout**, or
a compile-time error results.
The above is used both for function declarations (i.e., prototypes) and for
function definitions.
Hence, function definitions can have unnamed arguments.

Static, and hence dynamic, recursion is not allowed.
Static recursion is present if the static function-call graph of a program
contains cycles.
This includes all potential function calls through variables declared as
**subroutine** **uniform** (described below).
It is a compile-time or link-time error if a single compilation unit
(shader) contains either static recursion or the potential for recursion
through subroutine variables.
Dynamic recursion occurs if at any time control flow has entered but not
exited a single function more than once.

Subroutines provide a mechanism allowing shaders to be compiled in a manner
where the target of one or more function calls can be changed at run-time
without requiring any shader recompilation.
For example, a single shader may be compiled with support for multiple
illumination algorithms to handle different kinds of lights or surface
materials.
An application using such a shader may switch illumination algorithms by
changing the value of its subroutine uniforms.
To use subroutines, a subroutine type is declared, one or more functions are
associated with that subroutine type, and a subroutine variable of that type
is declared.
The function currently assigned to the variable function is then called by
using function calling syntax replacing a function name with the name of the
subroutine variable.
Subroutine variables are uniforms, and are assigned to specific functions
only through commands (**UniformSubroutinesuiv**) in the OpenGL API.

Subroutine functionality is not available when generating SPIR-V.

Subroutine types are declared using a statement similar to a function
declaration, with the **subroutine** keyword, as follows:

subroutine returnType subroutineTypeName(type0 arg0, type1 arg1,
                                         ..., typen argn);

As with function declarations, the formal argument names (*args* above) are
optional.
Functions are associated with subroutine types of matching declarations by
defining the function with the **subroutine** keyword and a list of subroutine
types the function matches:

subroutine(subroutineTypeName0, ..., subroutineTypeNameN)
returnType functionName(type0 arg0, type1 arg1, ..., typen argn)
{ ... } // function body

It is a compile-time error if arguments and return type don’t match between
the function and each associated subroutine type.

Functions declared with **subroutine** must include a body.
An overloaded function cannot be declared with **subroutine**; a program will
fail to compile or link if any shader or stage contains two or more
functions with the same name if the name is associated with a subroutine
type.

A function declared with **subroutine** can also be called directly with a
static use of *functionName*, as is done with non-subroutine function
declarations and calls.

Subroutine type variables are required to be *subroutine uniforms*, and are
declared with a specific subroutine type in a subroutine uniform variable
declaration:

subroutine uniform subroutineTypeName subroutineVarName;

Subroutine uniform variables are called the same way functions are called.
When a subroutine variable (or an element of a subroutine variable array) is
associated with a particular function, all function calls through that
variable will call that particular function.

Unlike other uniform variables, subroutine uniform variables are scoped to
the shader execution stage the variable is declared in.

Subroutine variables may be declared as explicitly-sized arrays, which can
be indexed only with dynamically uniform expressions.

It is a compile-time error to use the **subroutine** keyword in any places
other than (as shown above) to

* 
declare a subroutine type at global scope,

* 
declare a function as a subroutine, or

* 
declare a subroutine variable at global scope.

Conditional control flow in the shading language is done by either **if**,
**if**-**else**, or **switch** statements:

*selection-statement* : 

**if** **(** *bool-expression* **)** *statement*

**if** **(** *bool-expression* **)** *statement* **else** *statement*

**switch** **(** *init-expression* **)** **{** *switch-statement-listopt* **}**

Where *switch-statement-list* is a nested scope containing a list of zero or
more *switch-statement* and other statements defined by the language, where
*switch-statement* adds some forms of labels.
That is

*switch-statement-list* : 

*switch-statement*

*switch-statement-list* *switch-statement*

*switch-statement* : 

**case** *constant-expression* **:**

**default** **:** *statement*

Note the above grammar’s purpose is to aid discussion in this section; the
normative grammar is in “[Shading Language Grammar](grammar.html#shading-language-grammar)”.

If an **if**-expression evaluates to **true**, then the first *statement* is
executed.
If it evaluates to **false** and there is an **else** part then the second
*statement* is executed.

Any expression whose type evaluates to a Boolean can be used as the
conditional expression *bool-expression*.
Vector types are not accepted as the expression to **if**.

Conditionals can be nested.

The type of *init-expression* in a **switch** statement must be a scalar
integer.
The type of the *constant-expression* value in a case label also must be a
scalar integer.
When any pair of these values is tested for “equal value” and the types do
not match, an implicit conversion will be done to convert the **int** to a
**uint** (see “[Implicit Conversions](variables.html#implicit-conversions)”) before the
compare is done.
If a **case** label has a *constant-expression* of equal value to
*init-expression*, execution will continue after that label.
Otherwise, if there is a **default** label, execution will continue after that
label.
Otherwise, execution skips the rest of the switch statement.
It is a compile-time error to have more than one **default** or a replicated
*constant-expression*.
A **break** statement not nested in a loop or other switch statement (either
not nested or nested only in **if** or **if**-**else** statements) will also skip
the rest of the switch statement.
Fall through labels are allowed, but it is a compile-time error to have no
statement between a label and the end of the switch statement.
No statements are allowed in a switch statement before the first **case**
statement.

The **case** and **default** labels can only appear within a **switch** statement.
No **case** or **default** labels can be nested inside other statements or
compound statements within their corresponding **switch**.

For, while, and do loops are allowed as follows:

for (init-expression; condition-expression; loop-expression)
    sub-statement
while (condition-expression)
    sub-statement
do
    statement
while (condition-expression)

See “[Shading Language Grammar](grammar.html#shading-language-grammar)” for the
definitive specification of loops.

The **for** loop first evaluates the *init-expression*, then the
*condition-expression*.
If the *condition-expression* evaluates to **true**, then the body of the loop
is executed.
After the body is executed, a **for** loop will then evaluate the
*loop-expression*, and then loop back to evaluate the
*condition-expression*, repeating until the *condition-expression* evaluates
to **false**.
The loop is then exited, skipping its body and skipping its
*loop-expression*.
Variables modified by the *loop-expression* maintain their value after the
loop is exited, provided they are still in scope.
Variables declared in *init-expression* or *condition-expression* are only
in scope until the end of the sub-statement of the **for** loop.

The **while** loop first evaluates the *condition-expression*.
If **true**, then the body is executed.
This is then repeated, until the *condition-expression* evaluates to
**false**, exiting the loop and skipping its body.
Variables declared in the *condition-expression* are only in scope until the
end of the sub-statement of the **while** loop.

The **do**-**while** loop first executes the body, then executes the
*condition-expression*.
This is repeated until *condition-expression* evaluates to **false**, and then
the loop is exited.

Expressions for *condition-expression* must evaluate to a Boolean.

Both the *condition-expression* and the *init-expression* can declare and
initialize a variable, except in the **do**-**while** loop, which cannot declare
a variable in its *condition-expression*.
The variable’s scope lasts only until the end of the sub-statement that
forms the body of the loop.

Loops can be nested.

Non-terminating loops are allowed.
The consequences of very long or non-terminating loops are platform
dependent.

These are the jumps:

*jump_statement* : 

**continue** **;**

**break** **;**

**return** **;**

**return** *expression* **;**

**discard** **;** // in the fragment shader language only

There is no “goto” or other non-structured flow of control.

The **continue** jump is used only in loops.
It skips the remainder of the body of the inner-most loop of which it is
inside.
For **while** and **do**-**while** loops, this jump is to the next evaluation of
the loop *condition-expression* from which the loop continues as previously
defined.
For **for** loops, the jump is to the *loop-expression*, followed by the
*condition-expression*.

The **break** jump can also be used only in loops and **switch** statements.
It is simply an immediate exit of the inner-most loop or **switch** statements
containing the **break**.
No further execution of *condition-expression*, *loop-expression*, or
*switch-statement* is done.

The **discard** keyword is only allowed within fragment shaders.
It can be used within a fragment shader to abandon the operation on the
current fragment.
This keyword causes the fragment to be discarded and no updates to any
buffers will occur.
Any prior writes to other buffers such as shader storage buffers are
unaffected.
Control flow exits the shader, and subsequent implicit or explicit
derivatives are undefined when this control flow is non-uniform (meaning
different fragments within the primitive take different control paths).
It would typically be used within a conditional statement, for example:

if (intensity 

A fragment shader may test a fragment’s alpha value and discard the fragment
based on that test.
However, it should be noted that coverage testing occurs after the fragment
shader runs, and the coverage test can change the alpha value.

The **return** jump causes immediate exit of the current function.
If it has *expression* then that is the return value for the function.

The function *main* can use **return**.
This simply causes *main* to exit in the same way as when the end of the
function had been reached.
It does not imply a use of **discard** in a fragment shader.
Using **return** in *main* before defining outputs will have the same behavior
as reaching the end of *main* before defining outputs.
