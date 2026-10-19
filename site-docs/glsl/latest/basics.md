# Basics

## Metadata

- **Component**: glsl
- **Version**: latest
- **URL**: /glsl/latest/chapters/basics.html

## Table of Contents

- [Character Set and Phases of Compilation](#character-set)
- [Character_Set_and_Phases_of_Compilation](#character-set)
- [Source Strings](#source-strings)
- [Preprocessor](#preprocessor)
- [Comments](#comments)
- [Tokens](#tokens)
- [Keywords](#keywords)
- [Identifiers](#identifiers)
- [Definitions](#definitions)
- [Static Use](#static-use)
- [Dynamically Uniform Expressions and Uniform Control Flow](#dynamically-uniform-expressions-and-uniform-control-flow)
- [Dynamically_Uniform_Expressions_and_Uniform_Control_Flow](#dynamically-uniform-expressions-and-uniform-control-flow)

## Content

The source character set used for the OpenGL Shading Language is Unicode in the UTF-8
encoding scheme.

After preprocessing, only the following characters are allowed in the
resulting stream of GLSL tokens:

* 
The letters **a-z**, **A-Z**, and the underscore (**_**).

* 
The numbers **0-9**.

* 
The symbols period (**.**), plus (**+**), dash (**-**), slash (**/**), asterisk
(*****), percent (**%**), angled brackets (****), square brackets
(**[** and **]**), parentheses (**(** and **)**), braces (**{** and **}**), caret
(**^**), vertical bar (**|**), ampersand (**&**), tilde (**~**), equals (**=**),
exclamation point (**!**), colon (**:**), semicolon (**;**), comma (**,**), and
question mark (**?**).

A compile-time error will be given if any other character is used in a GLSL
token.

There are no digraphs or trigraphs.
There are no escape sequences or other uses of the backslash beyond use as
the line-continuation character.

Lines are relevant for compiler diagnostic messages and the preprocessor.
They are terminated by carriage-return or line-feed.
If both are used together, it will count as only a single line termination.
For the remainder of this document, any of these combinations is simply
referred to as a new-line.
Lines may be of arbitrary length.

In general, the language’s use of this character set is case sensitive.

There are no character or string data types, so no quoting characters are
included.

There is no end-of-file character.

More formally, compilation happens as if the following logical phases were
executed in order:

Source strings are concatenated to form a single input.
All provided new-lines are retained.

Line numbering is noted, based on all present new-lines, and does not
change when new-lines are later eliminated.

Wherever a backslash ('\') occurs immediately before a new-line, both
are eliminated.
(Note no white space is substituted, allowing a single token to span a
new-line.) Any newly formed backslash followed by a new-line is not
eliminated; only those pairs originally occurring after phase 1 are
eliminated.

All comments are replaced with a single space.
(Note that '//' style comments end before their terminating new-lines
and white space is generally relevant to preprocessing.)

Preprocessing is done, resulting in a sequence of GLSL tokens, formed
from the character set stated above.

GLSL processing is done on the sequence of GLSL tokens.

Details that fully define source strings, comments, line numbering, new-line
elimination, and preprocessing are all discussed in upcoming sections.
Sections beyond those describe GLSL processing.

The source for a single shader is an array of strings of characters from the
character set.
A single shader is made from the concatenation of these strings.
Each string can contain multiple lines, separated by new-lines.
No new-lines need be present in a string; a single line can be formed from
multiple strings.
No new-lines or other characters are inserted by the implementation when it
concatenates the strings to form a single shader.
Multiple shaders can be linked together to form a single program.

Diagnostic messages returned from compiling a shader must identify both the
line number within a string and which source string the message applies to.
Source strings are counted sequentially with the first string being string
0.
Line numbers are one more than the number of new-lines that have been
processed, including counting the new-lines that will be removed by the
line-continuation character (**\**).

Lines separated by the line-continuation character preceding a new-line are
concatenated together before either comment processing or preprocessing.
This means that no white space is substituted for the line-continuation
character.
That is, a single token could be formed by the concatenation by taking the
characters at the end of one line concatenating them with the characters at
the beginning of the next line.

float f\
oo;
// forms a single line equivalent to "float foo;"
// (assuming '\' is the last character before the new-line and "oo" are
// the first two characters of the next line)

There is a preprocessor that processes the source strings as part of the
compilation process.
Except as noted below, it behaves as the C++ standard preprocessor (see
“[Normative References](references.html#references)”).

The complete list of preprocessor directives is as follows.

#

#define

#undef

#if

#ifdef

#ifndef

#else

#elif

#endif

#error

#pragma

#extension

#version

#line

The following
operators are
also available:

defined

##

Each number sign (**#**) can be preceded in its line only by spaces or
horizontal tabs.
It may also be followed by spaces and horizontal tabs, preceding the
directive.
Each directive is terminated by a new-line.
Preprocessing does not change the number or relative location of new-lines
in a source string.
Preprocessing takes places after new-lines have been removed by the
line-continuation character.

The number sign (**#**) on a line by itself is ignored.
Any directive not listed above will cause a compile-time error.

**#define** and **#undef** functionality are defined as is standard for C++
preprocessors for macro definitions both with and without macro parameters.

The following predefined macros are available:

__LINE__

__FILE__

__VERSION__

__LINE__ will substitute a decimal integer constant that is one more than
the number of preceding new-lines in the current source string.

__FILE__ will substitute a decimal integer constant that says which source
string number is currently being processed.

__VERSION__ will substitute a decimal integer reflecting the version
number of the OpenGL Shading Language.
The version of the shading language described in this document will have
__VERSION__ substitute the decimal integer 460.

By convention, all macro names containing two consecutive underscores (__)
are reserved for use by underlying software layers.
Defining
or undefining
such a name in a shader does not itself result in an error, but may
result in unintended behaviors that stem from having multiple definitions of
the same name.
All macro names prefixed with “GL_” (“GL” followed by a single
underscore) are also reserved, and defining
or undefining
such a name results in a compile-time error.

Implementations must support macro-name lengths of up to 1024 characters.
Implementations are allowed to generate an error for a macro name of length
greater than 1024 characters, but are also allowed to support lengths
greater than 1024.

**#if**, **#ifdef**, **#ifndef**, **#else**, **#elif**, and **#endif** are defined to
operate as is standard for C++ preprocessors except for the following:

* 
Expressions following **#if** and **#elif** are
further restricted to
expressions operating on literal integer constants, plus identifiers
consumed by the **defined** operator.

* 
Character constants are not supported.

The operators available are as follows.

| Precedence | Operator class | Operators | Associativity |
| --- | --- | --- | --- |
| 1 (highest) | parenthetical grouping | ( ) | NA |
| 2 | unary | defined

                                         + - ~ ! | Right to Left |
| 3 | multiplicative | * / % | Left to Right |
| 4 | additive | + - | Left to Right |
| 5 | bit-wise shift | xref: [] | Left to Right |
| 6 | relational | = | Left to Right |
| 7 | equality | == != | Left to Right |
| 8 | bit-wise and | & | Left to Right |
| 9 | bit-wise exclusive or | ^ | Left to Right |
| 10 | bit-wise inclusive or | \| | Left to Right |
| 11 | logical and | && | Left to Right |
| 12 (lowest) | logical inclusive or | \|\| | Left to Right |

The **defined** operator can be used in either of the following ways:

defined identifier
defined ( identifier )

Two tokens in a macro can be concatenated into one token using the token
pasting (**##**) operator, as is standard for C++ preprocessors.
The result must be a valid single token, which will then be subject to macro
expansion.
That is, macro expansion happens only after token pasting.
There are no other number sign based operators (e.g. no **#** or **#@**), nor is
there a **sizeof** operator.

The semantics of applying operators to integer literals in the preprocessor
match those standard in the C++ preprocessor, not those in the OpenGL Shading Language.

Preprocessor expressions will be evaluated according to the behavior of the
host processor, not the processor targeted by the shader.

**#error** will cause the implementation to put a compile-time diagnostic message
into the shader object’s information log (see section 7.12 “Shader, Program
and Program Pipeline Queries” of the [OpenGL Specification](references.html#references) for how to
access a shader object’s information log).
The message will be the tokens following the **#error** directive, up to the
first new-line.
The implementation must treat the presence of a **#error** directive as a
compile-time error.

**#pragma** allows implementation-dependent compiler control.
Tokens following **#pragma** are not subject to preprocessor macro expansion.
If an implementation does not recognize the tokens following **#pragma**, then
it will ignore that pragma.
The following pragmas are defined as part of the language.

#pragma STDGL

The **STDGL** pragma is used to reserve pragmas for use by future revisions of
this language.
No implementation may use a pragma whose first token is **STDGL**.

#pragma optimize(on)
#pragma optimize(off)

can be used to turn off optimizations as an aid in developing and debugging
shaders.
It can only be used outside function definitions.
By default, optimization is turned on for all shaders.
The debug pragma

#pragma debug(on)
#pragma debug(off)

can be used to enable compiling and annotating a shader with debug
information, so that it can be used with a debugger.
It can only be used outside function definitions.
By default, debug is turned off.

Shaders should declare the version of the language they are written to.
The language version a shader is written to is specified by

#version number profile_opt

where *number* must be a version of the language, following the same
convention as __VERSION__ above.
The directive “**#version 460**” is required in any shader that
uses version 4.60 of the language.
Any *number* representing a version of the language a compiler does not
support will cause a compile-time error to be generated.
Version 1.10 of the language does not require shaders to include this
directive, and shaders that do not include a **#version** directive will be
treated as targeting version 1.10.
Shaders that specify **#version** 100 will be treated as targeting version
1.00 of the OpenGL ES Shading Language.
Shaders that specify **#version** 300 will be treated as targeting version
3.00 of the OpenGL ES Shading Language.
Shaders that specify **#version** 310 will be treated as targeting version
3.10 of the OpenGL ES Shading Language.

If the optional *profile* argument is provided, it must be the name of an
OpenGL profile.
Currently, there are three choices:

core
compatibility
es

A *profile* argument can only be used with version 150 or greater.
If no profile argument is provided and the version is 150 or greater, the
default is **core**.
If version 300 or 310 is specified, the profile argument is not optional and
must be **es**, or a compile-time error results.
The Language Specification for the **es** profile is specified in The OpenGL
ES Shading Language specification.

Shaders for the **core** or **compatibility** profiles that declare different
versions can be linked together.
However, **es** profile shaders cannot be linked with non-**es** profile shaders
or with **es** profile shaders of a different version, or a link-time error
will result.
When linking shaders of versions allowed by these rules, remaining link-time
errors will be given as per the linking rules in the GLSL version
corresponding to the version of the context the shaders are linked under.
Shader compile-time errors must still be given strictly based on the version
declared (or defaulted to) within each shader.

Unless otherwise specified, this specification is documenting the core
profile, and everything specified for the core profile is also available in
the compatibility profile.
Features specified as belonging specifically to the compatibility profile
are not available in the core profile.
Compatibility-profile features are not available when generating SPIR-V.

There is a built-in macro definition for each profile the implementation
supports.
All implementations provide the following macro:

#define GL_core_profile 1

Implementations providing the **compatibility** profile provide the following
macro:

#define GL_compatibility_profile 1

Implementations providing the **es** profile provide the following macro:

#define GL_es_profile 1

The **#version** directive must occur in a shader before anything else, except
for comments and white space.

By default, compilers of this language must issue compile-time syntactic,
semantic, and grammatical errors for shaders that do not conform to this
specification.
Any extended behavior must first be enabled.
Directives to control the behavior of the compiler with respect to
extensions are declared with the **#extension** directive

#extension extension_name : behavior
#extension all : behavior

where *extension_name* is the name of an extension.
Extension names are not documented in this specification.
The token **all** means the behavior applies to all extensions supported by
the compiler.
The *behavior* can be one of the following:

| Behavior | Effect |
| --- | --- |
| **require** | Behave as specified by the extension *extension_name*.

              Give a compile-time error on the **#extension** if the extension
              *extension_name* is not supported, or if **all** is specified. |
| **enable** | Behave as specified by the extension *extension_name*.

              Warn on the **#extension** if the extension *extension_name* is
              not supported.

              Give a compile-time error on the **#extension** if **all** is
              specified. |
| **warn** | Behave as specified by the extension *extension_name*,
              except issue warnings on any detectable use of that extension,
              unless such use is supported by other enabled or required
              extensions.

              If **all** is specified, then warn on all detectable uses of any
              extension used.

              Warn on the **#extension** if the extension *extension_name* is
              not supported. |
| **disable** | Behave (including issuing errors and warnings) as if the
              extension *extension_name* is not part of the language
              definition.

              If **all** is specified, then behavior must revert back to that
              of the non-extended core version of the language being
              compiled to.

              Warn on the **#extension** if the extension *extension_name* is
              not supported. |

The **extension** directive is a simple, low-level mechanism to set the
behavior for each extension.
It does not define policies such as which combinations are appropriate,
those must be defined elsewhere.
Order of directives matters in setting the behavior for each extension:
Directives that occur later override those seen earlier.
The **all** variant sets the behavior for all extensions, overriding all
previously issued **extension** directives, but only for the *behaviors*
**warn** and **disable**.

The initial state of the compiler is as if the directive

#extension all : disable

was issued, telling the compiler that all error and warning reporting must
be done according to this specification, ignoring any extensions.

Each extension can define its allowed granularity of scope.
If nothing is said, the granularity is a shader (that is, a single
compilation unit), and the extension directives must occur before any
non-preprocessor tokens.
If necessary, the linker can enforce granularities larger than a single
compilation unit, in which case each involved shader will have to contain
the necessary extension directive.

Macro expansion is not done on lines containing **#extension** and **#version**
directives.

**#line** must have, after macro substitution, one of the following forms:

#line line
#line line source-string-number

where *line* and *source-string-number* are
constant integer expressions.
If these constant expressions are not integer literals then behavior is undefined.
After processing this directive (including its new-line), the implementation
will behave as if it is compiling at line number *line* and source string
number *source-string-number*.
Subsequent source strings will be numbered sequentially, until another
**#line** directive overrides that numbering.

|  | Note
| --- | --- |

Some implementations have allowed constant expressions in #line directives and
some have not. Even where expressions are supported the grammar is ambiguous and so
results are implementation dependent. For example,
+ #line +2 +2               // Line number set to 4, or file to 2 and line to 2 |

When shaders are compiled for OpenGL SPIR-V, the following predefined
macro is available:

#define GL_SPIRV 100

When targeting Vulkan, the following predefined macro is available:

#define VULKAN 100

Comments are delimited by **/*** and ***/**, or by **//** and a new-line.
// style comments include the initial // marker and continue up to, but
not including, the terminating newline.
/*...*/ comments include both the start and end marker.
The begin comment delimiters (/* or //) are not recognized as comment
delimiters inside of a comment, hence comments cannot be nested.

Inside comments, any byte values may be used, except a byte whose value is
0.
No errors will be given for the content of comments and no validation on the
content of comments need be done.

Removal of new-lines by the line-continuation character (**\**) logically
occurs before comments are processed.
That is, a single-line comment ending in the line-continuation character
(**\**) includes the next line in the comment.

// a single-line comment containing the next line \
a = b; // this is still in the first comment

The language, after preprocessing, is a sequence of tokens.
A token can be

*token* : 

*keyword*

*identifier*

*integer-constant*

*floating-constant*

*operator*

**;** **{** **}**

The following are the keywords in the language and (after
preprocessing) can only be used as described in this specification,
or a compile-time error results:

**const** **uniform** **buffer** **shared**
**attribute** **varying**

**coherent** **volatile** **restrict** **readonly** **writeonly**

**atomic_uint**

**layout**

**centroid** **flat** **smooth**
**noperspective**

**patch** **sample**

**invariant** **precise**

**break** **continue** **do** **for** **while** **switch** **case** **default**

**if** **else**

**subroutine**

**in** **out** **inout**

**int** **void** **bool** **true** **false** **float**
**double**

**discard** **return**

**vec2** **vec3** **vec4** **ivec2** **ivec3** **ivec4** **bvec2** **bvec3** **bvec4**

**uint** **uvec2** **uvec3** **uvec4**

**dvec2** **dvec3** **dvec4**

**mat2** **mat3** **mat4**

**mat2x2** **mat2x3** **mat2x4**

**mat3x2** **mat3x3** **mat3x4**

**mat4x2** **mat4x3** **mat4x4**

**dmat2** **dmat3** **dmat4**

**dmat2x2** **dmat2x3** **dmat2x4**

**dmat3x2** **dmat3x3** **dmat3x4**

**dmat4x2** **dmat4x3** **dmat4x4**

**lowp** **mediump** **highp** **precision**

**sampler1D** **sampler1DShadow** **sampler1DArray** **sampler1DArrayShadow**

**isampler1D** **isampler1DArray** **usampler1D** **usampler1DArray**

**sampler2D** **sampler2DShadow** **sampler2DArray** **sampler2DArrayShadow**

**isampler2D** **isampler2DArray** **usampler2D** **usampler2DArray**

**sampler2DRect** **sampler2DRectShadow** **isampler2DRect** **usampler2DRect**

**sampler2DMS** **isampler2DMS** **usampler2DMS**

**sampler2DMSArray** **isampler2DMSArray** **usampler2DMSArray**

**sampler3D** **isampler3D** **usampler3D**

**samplerCube** **samplerCubeShadow** **isamplerCube** **usamplerCube**

**samplerCubeArray** **samplerCubeArrayShadow**

**isamplerCubeArray** **usamplerCubeArray**

**samplerBuffer** **isamplerBuffer** **usamplerBuffer**

**image1D** **iimage1D** **uimage1D**

**image1DArray** **iimage1DArray** **uimage1DArray**

**image2D** **iimage2D** **uimage2D**

**image2DArray** **iimage2DArray** **uimage2DArray**

**image2DRect** **iimage2DRect** **uimage2DRect**

**image2DMS** **iimage2DMS** **uimage2DMS**

**image2DMSArray** **iimage2DMSArray** **uimage2DMSArray**

**image3D** **iimage3D** **uimage3D**

**imageCube** **iimageCube** **uimageCube**

**imageCubeArray** **iimageCubeArray** **uimageCubeArray**

**imageBuffer** **iimageBuffer** **uimageBuffer**

**struct**

In addition, when targeting Vulkan, the following keywords also exist:

**texture1D** **texture1DArray**

**itexture1D** **itexture1DArray** **utexture1D** **utexture1DArray**

**texture2D** **texture2DArray**

**itexture2D** **itexture2DArray** **utexture2D** **utexture2DArray**

**texture2DRect** **itexture2DRect** **utexture2DRect**

**texture2DMS** **itexture2DMS** **utexture2DMS**

**texture2DMSArray** **itexture2DMSArray** **utexture2DMSArray**

**texture3D** **itexture3D** **utexture3D**

**textureCube** **itextureCube** **utextureCube**

**textureCubeArray** **itextureCubeArray** **utextureCubeArray**

**textureBuffer** **itextureBuffer** **utextureBuffer**

**sampler** **samplerShadow**

**subpassInput** **isubpassInput** **usubpassInput**

**subpassInputMS** **isubpassInputMS** **usubpassInputMS**

The following are the keywords reserved for future use.
Using them will result in a compile-time error:

**common** **partition** **active**

**asm**

**class** **union** **enum** **typedef** **template** **this**

**resource**

**goto**

**inline** **noinline** **public** **static** **extern** **external** **interface**

**long** **short** **half** **fixed** **unsigned** **superp**

**input** **output**

**hvec2** **hvec3** **hvec4** **fvec2** **fvec3** **fvec4**

**filter**

**sizeof** **cast**

**namespace** **using**

**sampler3DRect**

In addition, all identifiers containing two consecutive underscores (__)
are reserved for use by underlying software layers.
Defining such a name in a shader does not itself result in an error, but may
result in unintended behaviors that stem from having multiple definitions of
the same name.

Identifiers are used for variable names, function names, structure names,
and field selectors (field selectors select components of
`[vectors](operators.html#vector-components)` and `[matrices](operators.html#matrix-components)`,
similarly to structure members).
Identifiers have the form:

*identifier* : 

*nondigit*

*identifier* *nondigit*

*identifier* *digit*

*nondigit* : one of 

**_** **a b c d e f g h i j k l m n o p q r s t u v w x y z**

**A B C D E F G H I J K L M N O P Q R S T U V W X Y Z**

*digit* : one of 

**0 1 2 3 4 5 6 7 8 9**

Identifiers starting with “gl_” are reserved, and
in general, may not be declared in a shader;
this results in a compile-time error.
However, as noted in the specification, there are some cases where
previously declared variables can be redeclared, and predeclared “gl_”
names are allowed to be redeclared in a shader only for these specific
purposes.

Implementations must support identifier lengths of up to 1024 characters.
Implementations are allowed to generate an error for an identifier of length
greater than 1024 characters, but are also allowed to support lengths
greater than 1024.

Some language rules described below depend on the following definitions.

A shader contains a *static use* of a variable *x* if, after preprocessing,
the shader contains a statement that would access any part of *x*,
whether or not flow of control will cause that statement to be executed.
Such a variable is referred to as being *statically used*. If the access is a
write then *x* is further said to be *statically assigned*.

Some operations require an expression to be *dynamically uniform*, or that
it be located in *uniform control flow*.
These requirements are defined by the following set of definitions.

An *invocation* is a single execution of *main()* for a particular stage,
operating only on the amount of data explicitly exposed within that stage’s
shaders.
(Any implicit operation on additional instances of data would comprise
additional invocations.) For example, in compute execution models, a single
invocation operates only on a single work item, or, in a vertex execution
model, a single invocation operates only on a single vertex.

An *invocation group* is the complete set of invocations collectively
processing a particular compute workgroup or graphical operation, where the
scope of a "graphical operation" is implementation-dependent, but at least
as large as a single triangle or patch, and at most as large as a single
rendering command, as defined by the client API.

Within a single invocation, a single shader statement can be executed
multiple times, giving multiple *dynamic instances* of that instruction.
This can happen when the instruction is executed in a loop, or in a function
called from multiple call sites, or combinations of multiple of these.
Different loop iterations and different dynamic function-call-site chains
yield different dynamic instances of such an instruction.
Dynamic instances are distinguished by their control-flow path within an
invocation, not by which invocation executed it.
That is, different invocations of *main()* execute the same dynamic
instances of an instruction when they follow the same control-flow path.

An expression is *dynamically uniform* for a dynamic instance consuming it
when its value is the same for all invocations (in the invocation group)
that execute that dynamic instance.

*Uniform control flow* (or converged control flow) occurs when all
invocations in the invocation group execute the same control-flow path (and
hence the same sequence of dynamic instances of instructions).
Uniform control flow is the initial state at the entry into *main()*, and
lasts until a conditional branch takes different control paths for different
invocations (non-uniform or divergent control flow).
Such divergence can reconverge, with all the invocations once again
executing the same control-flow path, and this re-establishes the existence
of uniform control flow.
If control flow is uniform upon entry into a selection or loop, and all
invocations in the invocation group subsequently leave that selection or
loop, then control flow reconverges to be uniform.

For example:

main()
{
    float a = ...; // this is uniform control flow
    if (a 

Other examples of non-uniform control flow can occur within loops where some
invocations execute iterations that others do not, after conditional breaks,
continues, early returns, and after fragment discards, when the condition is
true for some fragments but not others.

Note that constant expressions are trivially dynamically uniform.
It follows that typical loop counters based on these are also dynamically
uniform.
