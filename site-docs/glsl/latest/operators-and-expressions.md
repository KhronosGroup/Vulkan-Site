# Operators and Expressions

## Metadata

- **Component**: glsl
- **Version**: latest
- **URL**: /glsl/latest/chapters/operators.html

## Table of Contents

- [Operators](#operators)
- [Array Operations](#array-operations)
- [Function Calls](#function-calls)
- [Constructors](#constructors)
- [Conversion and Scalar Constructors](#conversion-and-scalar-constructors)
- [Conversion_and_Scalar_Constructors](#conversion-and-scalar-constructors)
- [Vector and Matrix Constructors](#vector-and-matrix-constructors)
- [Vector_and_Matrix_Constructors](#vector-and-matrix-constructors)
- [Structure Constructors](#structure-constructors)
- [Array Constructors](#array-constructors)
- [Texture-Combined Sampler Constructors](#_texture_combined_sampler_constructors)
- [Texture-Combined_Sampler_Constructors](#_texture_combined_sampler_constructors)
- [Vector and Scalar Components and Length](#vector-components)
- [Vector_and_Scalar_Components_and_Length](#vector-components)
- [Matrix Components](#matrix-components)
- [Structure and Array Operations](#structure-and-array-operations)
- [Structure_and_Array_Operations](#structure-and-array-operations)
- [Assignments](#assignments)
- [Expressions](#expressions)
- [Vector and Matrix Operations](#vector-and-matrix-operations)
- [Vector_and_Matrix_Operations](#vector-and-matrix-operations)
- [Out-of-Bounds Accesses](#out-of-bounds-accesses)
- [Specialization-Constant Operations](#specialization-constant-operations)

## Content

The OpenGL Shading Language has the following operators.

| Precedence | Operator Class | Operators | Associativity |
| --- | --- | --- | --- |
| 1 (highest) | parenthetical grouping | ( ) | NA |
| 2 | array subscript

                 function call and constructor structure

                 field or method selector, swizzle

                 post fix increment and decrement | [ ]

                                                  ( )

                                                  .

                                                  ++ -- | Left to Right |
| 3 | prefix increment and decrement

                 unary | ++ --

                                                  + - ~ ! | Right to Left |
| 4 | multiplicative | * / % | Left to Right |
| 5 | additive | + - | Left to Right |
| 6 | bit-wise shift | xref: [] | Left to Right |
| 7 | relational | = | Left to Right |
| 8 | equality | == != | Left to Right |
| 9 | bit-wise and | & | Left to Right |
| 10 | bit-wise exclusive or | ^ | Left to Right |
| 11 | bit-wise inclusive or | \| | Left to Right |
| 12 | logical and | && | Left to Right |
| 13 | logical exclusive or | ^^ | Left to Right |
| 14 | logical inclusive or | \|\| | Left to Right |
| 15 | selection | ? : | Right to Left |
| 16 | Assignment

                 arithmetic assignments | =

                                                  += -=

                                                  *= /=

                                                  %= >=

                                                  &= ^= \|= | Right to Left |
| 17 (lowest) | sequence | , | Left to Right |

There is no address-of operator nor a dereference operator.
There is no typecast operator; constructors are used instead.

These are now described in “[Structure and Array Operations](#structure-and-array-operations)”.

If a function returns a value, then a call to that function may be used as
an expression, whose type will be the type that was used to declare or
define the function.

Function definitions and calling conventions are discussed in
“[Function Definitions](statements.html#function-definitions)”.

Constructors use the function call syntax, where the function name is a
type, and the call makes an object of that type.
Constructors are used the same way in both initializers and expressions.
(See “[Shading Language Grammar](grammar.html#shading-language-grammar)” for details.)
The parameters are used to initialize the constructed value.
Constructors can be used to request a data type conversion to change from
one scalar type to another scalar type, or to build larger types out of
smaller types, or to reduce a larger type to a smaller type.

In general, constructors are not built-in functions with predetermined
prototypes.
For arrays and structures, there must be exactly one argument in the
constructor for each element or member.
For the other types, the arguments must provide a sufficient number of
components to perform the initialization, and it is a compile-time error to
include so many arguments that they cannot all be used.
Detailed rules follow.
The prototypes actually listed below are merely a subset of examples.

Converting between scalar types is done as the following prototypes
indicate:

int(uint)     // converts an unsigned integer to a signed integer
int(bool)     // converts a Boolean value to an int
int(float)    // converts a float value to an int
int(double)   // converts a double value to a signed integer
uint(int)     // converts a signed integer value to an unsigned integer
uint(bool)    // converts a Boolean value to an unsigned integer
uint(float)   // converts a float value to an unsigned integer
uint(double)  // converts a double value to an unsigned integer
bool(int)     // converts a signed integer value to a Boolean
bool(uint)    // converts an unsigned integer value to a Boolean value
bool(float)   // converts a float value to a Boolean
bool(double)  // converts a double value to a Boolean
float(int)    // converts a signed integer value to a float
float(uint)   // converts an unsigned integer value to a float value
float(bool)   // converts a Boolean value to a float
float(double) // converts a double value to a float
double(int)   // converts a signed integer value to a double
double(uint)  // converts an unsigned integer value to a double
double(bool)  // converts a Boolean value to a double
double(float) // converts a float value to a double

When constructors are used to convert a floating-point type to an integer
type, the fractional part of the floating-point value is dropped.
It is undefined to convert a negative floating-point value to an **uint**.

Integer values having more bits of precision than a single-precision
floating-point mantissa will lose precision when converted to **float**.

When a constructor is used to convert any integer or floating-point type to
a **bool**, 0 and 0.0 are converted to **false**, and non-zero values are
converted to **true**.
When a constructor is used to convert a **bool** to any integer or
floating-point type, **false** is converted to 0 or 0.0, and **true** is
converted to 1 or 1.0.

The constructor **int**(**uint**) preserves the bit pattern in the argument,
which will change the argument’s value if its sign bit is set.
The constructor **uint**(**int**) preserves the bit pattern in the argument,
which will change its value if it is negative.

Identity constructors, like **float**(**float**) are also legal, but of little
use.

Scalar constructors with non-scalar parameters can be used to take the first
element from a non-scalar.
For example, the constructor **float**(**vec3**) will select the first component
of the **vec3** parameter.

Constructors can be used to create vectors or matrices from a set of
scalars, vectors, or matrices.
This includes the ability to shorten vectors.

If there is a single scalar parameter to a vector constructor, it is used to
initialize all components of the constructed vector to that scalar’s value.
If there is a single scalar parameter to a matrix constructor, it is used to
initialize all the components on the matrix’s diagonal, with the remaining
components initialized to 0.0.

If a vector is constructed from multiple scalars, one or more vectors, or
one or more matrices, or a mixture of these, the vector’s components will be
constructed in order from the components of the arguments.
The arguments will be consumed left to right, and each argument will have
all its components consumed, in order, before any components from the next
argument are consumed.
Similarly for constructing a matrix from multiple scalars or vectors, or a
mixture of these.
Matrix components will be constructed and consumed in column major order.
In these cases, there must be enough components provided in the arguments to
provide an initializer for every component in the constructed value.
It is a compile-time error to provide extra arguments beyond this last used
argument.

If a matrix is constructed from a matrix, then each component (column *i*,
row *j*) in the result that has a corresponding component (column *i*, row
*j*) in the argument will be initialized from there.
All other components will be initialized to the identity matrix.
If a matrix argument is given to a matrix constructor, it is
a compile-time error to have any other arguments.

If the basic type (**bool**, **int**,
**float**, or **double**)
of a parameter to a
constructor does not match the basic type of the object being constructed,
the scalar construction rules (above) are used to convert the parameters.

Some useful vector constructors are as follows:

vec3(float)          // initializes each component of the vec3 with the float
vec4(ivec4)          // makes a vec4 with component-wise conversion
vec4(mat2)           // the vec4 is column 0 followed by column 1
vec2(float, float)   // initializes a vec2 with 2 floats
ivec3(int, int, int) // initializes an ivec3 with 3 ints
bvec4(int, int, float, float) // uses 4 Boolean conversions
vec2(vec3)           // drops the third component of a vec3
vec3(vec4)           // drops the fourth component of a vec4
vec3(vec2, float)    // vec3.x = vec2.x, vec3.y = vec2.y, vec3.z = float
vec3(float, vec2)    // vec3.x = float, vec3.y = vec2.x, vec3.z = vec2.y
vec4(vec3, float)
vec4(float, vec3)
vec4(vec2, vec2)

Some examples of these are:

vec4 color = vec4(0.0, 1.0, 0.0, 1.0);
vec4 rgba = vec4(1.0);      // sets each component to 1.0
vec3 rgb = vec3(color);     // drop the 4th component

To initialize the diagonal of a matrix with all other elements set to zero:

mat2(float)
mat3(float)
mat4(float)

That is, *result[i][j]* is set to the *float* argument for all \(i
= j\) and set to 0 for all   .

To initialize a matrix by specifying vectors or scalars, the components are
assigned to the matrix elements in column-major order.

mat2(vec2, vec2);                 // one column per argument
mat3(vec3, vec3, vec3);           // one column per argument
mat4(vec4, vec4, vec4, vec4);     // one column per argument
mat3x2(vec2, vec2, vec2);         // one column per argument
dmat2(dvec2, dvec2);
dmat3(dvec3, dvec3, dvec3);
dmat4(dvec4, dvec4, dvec4, dvec4);
mat2(float, float,                // first column
     float, float);               // second column
mat3(float, float, float,         // first column
     float, float, float,         // second column
     float, float, float);        // third column
mat4(float, float, float, float,  // first column
     float, float, float, float,  // second column
     float, float, float, float,  // third column
     float, float, float, float); // fourth column
mat2x3(vec2, float,               // first column
       vec2, float);              // second column
dmat2x4(dvec3, double,            // first column
        double, dvec3);           // second column

A wide range of other possibilities exist, to construct a matrix from
vectors and scalars, as long as enough components are present to initialize
the matrix.
To construct a matrix from a matrix:

mat3x3(mat4x4); // takes the upper-left 3x3 of the mat4x4
mat2x3(mat4x2); // takes the upper-left 2x2 of the mat4x4, last row is 0,0
mat4x4(mat3x3); // puts the mat3x3 in the upper-left, sets the lower right
                // component to 1, and the rest to 0

Once a structure is defined, and its type is given a name, a constructor is
available with the same name to construct instances of that structure.
For example:

struct light {
    float intensity;
    vec3 position;
};

light lightVar = light(3.0, vec3(1.0, 2.0, 3.0));

The arguments to the constructor will be used to set the structure’s
members, in order, using one argument per member.
Each argument must be the same type as the member it
sets, or be a type that can be converted to the member’s type according to
section “[Implicit Conversions](variables.html#implicit-conversions)”.

Structure constructors can be used as initializers or in expressions.

Array types can also be used as constructor names, which can then be used in
expressions or initializers.
For example,

const float c[3] = float[3](5.0, 7.2, 1.1);
const float d[3] = float[](5.0, 7.2, 1.1);

float g;
...
float a[5] = float[5](g, 1, g, 2.3, g);
float b[3];

b = float[3](g, g + 1.0, g + 2.0);

There must be exactly the same number of arguments as the size of the array
being constructed.
If no size is present in the constructor, then the array is explicitly sized
to the number of arguments provided.
The arguments are assigned in order, starting at element 0, to the elements
of the constructed array.
Each argument must be the same type as the element type of the
array, or be
a type that can be converted to the element type of the array according to
“[Implicit Conversions](variables.html#implicit-conversions)”.

Arrays of arrays are similarly constructed, and the size for any dimension
is **optional**

vec4 b[2] = ...;
vec4[3][2](b, b, b);    // constructor
vec4[][2](b, b, b);     // constructor, valid, size deduced
vec4[3][](b, b, b);     // constructor, valid, size deduced
vec4[][](b, b, b);      // constructor, valid, both sizes deduced

Texture-combined sampler constructors are only available when targeting Vulkan.

Texture-combined sampler types, like **sampler2D**, can be declared with an
initializer
that is a constructor of the same type, and consuming a texture and a
**sampler** or **samplerShadow**.
For example:

    layout(...) uniform sampler s;   // handle to filtering information
    layout(...) uniform texture2D t; // handle to a texture
    layout(...) in vec2 tCoord;
    ...
    texture(sampler2D(t, s), tCoord);

The result of a texture-combined sampler constructor cannot be assigned to a
variable:

    ... sampler2D sConstruct = sampler2D(t, s);  // ERROR

Texture-combined sampler constructors can only be consumed by a function parameter.

Texture-combined sampler constructors of arrays are illegal:

    layout(...) uniform texture2D tArray[6];
    ...
    ... sampler2D[](tArray, s) ...  // ERROR

Formally:

* 
every texture-combined sampler type can be used as a constructor

* 
the type of the constructor must match the type of the variable being declared

* 
the constructor’s first argument must be a texture type

* 
the constructor’s second argument must be a scalar of type **sampler**
or **samplerShadow**

* 
the dimensionality (1D, 2D, 3D, Cube, Rect, Buffer, MS, and Array)
of the texture type must match that of the constructed type
(that is, the suffixes of the type of the first argument and the
type of the constructor will be spelled the same way)

* 
there is no control flow construct (e.g., `?:`) that consumes any sampler type

Note: Shadow mismatches are allowed between constructors and the second argument.
Texture-combined non-shadow samplers can be constructed from **samplerShadow** and
texture-combined shadow samplers can be constructed from **sampler**.

The names of the components of a vector
or scalar
are denoted by a single letter.
As a notational convenience, several letters are associated with each
component based on common usage of position, color or texture coordinate
vectors.
The individual components can be selected by following the variable name
with period (**.**) and then the component name.

The component names supported are:

| *{ x, y, z, w }* | Useful when accessing vectors that represent points or normals |
| --- | --- |
| *{ r, g, b, a }* | Useful when accessing vectors that represent colors |
| *{ s, t, p, q }* | Useful when accessing vectors that represent texture coordinates |

The component names *x*, *r*, and *s* are, for example, synonyms for the
same (first) component in a vector.
They are also the names of the only component in a scalar.

Note that the third component of the texture coordinate set
has been renamed *p* so as to avoid the confusion with *r* (for
red) in a color.

Accessing components beyond those declared for the type is
a compile-time error so, for example:

vec2 pos;
float height;
pos.x       // is legal
pos.z       // is illegal
height.x    // is legal
height.y    // is illegal

The component selection syntax allows multiple components to be selected by
appending their names (from the same name set) after the period (**.**).

vec4 v4;
v4.rgba;    // is a vec4 and the same as just using v4,
v4.rgb;     // is a vec3,
v4.b;       // is a float,
v4.xy;      // is a vec2,
v4.xgba;    // is illegal - the component names do not come from the same set

No more than 4 components can be selected.

vec4 v4;
v4.xyzwxy;      // is illegal since it has 6 components
(v4.xyzwxy).xy; // is illegal since the intermediate value has 6
components

The order of the components can be different to swizzle them, or replicated:

vec4 pos = vec4(1.0, 2.0, 3.0, 4.0);
vec4 swiz = pos.wzyx;   // swiz = (4.0, 3.0, 2.0, 1.0)
vec4 dup = pos.xxyy;    // dup = (1.0, 1.0, 2.0, 2.0)

This notation is more concise than the constructor syntax.
To form an r-value, it can be applied to any expression that results in a
vector or scalar r-value.

The component group notation can occur on the left hand side of an
expression.

vec4 pos = vec4(1.0, 2.0, 3.0, 4.0);
pos.xw = vec2(5.0, 6.0);        // pos = (5.0, 2.0, 3.0, 6.0)
pos.wx = vec2(7.0, 8.0);        // pos = (8.0, 2.0, 3.0, 7.0)
pos.xx = vec2(3.0, 4.0);        // illegal - 'x' used twice
pos.xy = vec3(1.0, 2.0, 3.0);   // illegal - mismatch between vec2 and vec3

To form an l-value, swizzling must further be applied to an l-value and
contain no duplicate components. It results in an l-value of scalar or
vector type, depending on number of components specified.

Array subscripting syntax can also be applied to vectors (but not to
scalars) to provide numeric indexing.
So in

vec4 pos;

*pos[2]* refers to the third element of *pos* and is equivalent to *pos.z*.
This allows variable indexing into a vector, as well as a generic way of
accessing components.
Any integer expression can be used as the subscript.
The first component is at index zero.
Reading from or writing to a vector using a constant integral expression
with a value that is negative or greater than or equal to the size of the
vector results in a compile-time error.
When indexing with non-constant expressions, behavior is undefined if the
index is negative, or greater than or equal to the size of the vector.

The **length**() method may be applied to vectors (but not scalars).
The result is the number of components in the vector.
For example,

vec3 v;
const int L = v.length();

sets the constant *L* to 3.
The type returned by **.length**() on a vector is **int**, and the value
returned is a constant expression.

The components of a matrix can be accessed using array subscripting syntax.
Applying a single subscript to a matrix treats the matrix as an array of
column vectors, and selects a single column, whose type is a vector of the
same size as the (column size of the) matrix.
The leftmost column is column 0.
A second subscript would then operate on the resulting vector, as defined
earlier for vectors.
Hence, two subscripts select a column and then a row.

mat4 m;
m[1] = vec4(2.0);   // sets the second column to all 2.0
m[0][0] = 1.0;      // sets the upper left element to 1.0
m[2][3] = 2.0;      // sets the 4th element of the third column to 2.0

Behavior is undefined when accessing a component outside the bounds of a
matrix with a non-constant expression.
It is a compile-time error to access a matrix with a constant expression
that is outside the bounds of the matrix.

The **length**() method may be applied to matrices.
The result is the number of columns of the matrix.
For example,

mat3x4 v;
const int L = v.length();

sets the constant *L* to 3.
The type returned by **.length**() on a matrix is **int**, and the value
returned is a constant expression.

The members of a structure and the **length**() method of an array are
selected using the period (**.**).

In total, only the following operators are allowed to operate on arrays and
structures as whole entities:

| field selector | **.** |
| --- | --- |
| equality | **==** **!=** |
| assignment | **=** |
| Ternary operator | **?:** |
| Sequence operator | **,** |
| indexing (arrays only) | **[** **]** |

The equality operators and assignment operator are only allowed if the two
operands are same size and type.
The operands cannot contain any opaque types.
Structure types must be of the same declared structure.
Both array operands must be
explicitly
sized.
When using the equality operators, two structures are equal if and only if
all the members are component-wise equal, and two arrays are equal if and
only if all the elements are element-wise equal.

Array elements are accessed using the array subscript operator (**[ ]**).
An example of accessing an array element is

diffuseColor += lightIntensity[3] * NdotL;

Array indices start at zero.
Array elements are accessed using an expression whose type is **int** or
**uint**.

Behavior is undefined if a shader subscripts an array with an index less
than 0 or greater than or equal to the size the array was declared with.

Arrays can also be accessed with the method operator (**.**) and the **length**
method to query the size of the array:

lightIntensity.length() // return the size of the array

Assignments of values to variable names are done with the assignment
operator (**=**):

*lvalue-expression* = *rvalue-expression*

The *lvalue-expression* evaluates to an l-value.
The assignment operator stores the value of *rvalue-expression* into the
l-value and returns an r-value with the type and precision of
*lvalue-expression*.
The *lvalue-expression* and *rvalue-expression* must have the same
type, or the expression must have a type in the table in section
“[Implicit Conversions](variables.html#implicit-conversions)” that converts to the type
of *lvalue-expression*, in which case an implicit conversion will be done on
the *rvalue-expression* before the assignment is done.
Any other desired type-conversions must be specified explicitly via a
constructor.
It is a compile-time error if the l-value is not writable.
Variables that are built-in types, entire structures or arrays, structure
members, l-values with the field selector (**.**) applied to select components
or swizzles without repeated fields, l-values within parentheses, and
l-values dereferenced with the array subscript operator (**[ ]**) are all
l-values.
Other binary or unary expressions, function names, swizzles with repeated
fields, and constants cannot be l-values.
The ternary operator (**?:**) is also not allowed as an l-value.
Using an incorrect expression as an l-value results in a compile-time error.

Expressions on the left of an assignment are evaluated before expressions on
the right of the assignment.

The other assignment operators are

* 
add into (**+=**)

* 
subtract from (**-=**)

* 
multiply into (***=**)

* 
divide into (**/=**)

* 
modulus into (**%=**)

* 
left shift by (**>=**)

* 
and into (**&=**)

* 
inclusive-or into (**|=**)

* 
exclusive-or into (**^=**)

where the general expression

*lvalue* *op*= *expression*

is equivalent to

*lvalue* = *lvalue* *op* *expression*

where *lvalue* is the value returned by *lvalue-expression*, *op* is as
described below, and the *lvalue-expression* and *expression* must satisfy
the semantic requirements of both *op* and equals (**=**).

Reading a variable before writing (or initializing) it is legal, however the
value is undefined.

Expressions in the shading language are built from the following:

* 
Constants of type **bool**, all integral types, all floating-point types,
all vector types, and all matrix types.

* 
Constructors of all types.

* 
Variable names of all types.

* 
An array, vector, or matrix expression with the **length**() method
applied.

* 
Subscripted arrays.

* 
Function calls that return values.
In some cases, function calls returning **void** are also allowed in
expressions as specified below.

* 
Component field selectors and array subscript results.

* 
Parenthesized expressions.
Any expression, including expressions with void type can be
parenthesized.
Parentheses can be used to group operations.
Operations within parentheses are done before operations across
parentheses.

* 
The arithmetic binary operators add (**+**), subtract (**-**), multiply
(*****), and divide (**/**) operate on integer and floating-point scalars,
vectors, and matrices.
If the fundamental types in the operands do not match, then the
conversions from “[Implicit Conversions](variables.html#implicit-conversions)” are
applied to create matching types.
All arithmetic binary operators result in the same fundamental type
(signed integer, unsigned integer, single-precision floating-point, or
double-precision floating-point) as the operands they operate on, after
operand type conversion.
After conversion, the following cases are valid

The two operands are scalars.
In this case the operation is applied, resulting in a scalar.

* 
One operand is a scalar, and the other is a vector or matrix.
In this case, the scalar operation is applied independently to each
component of the vector or matrix, resulting in the same size vector or
matrix.

* 
The two operands are vectors of the same size.
In this case, the operation is done component-wise resulting in the
same size vector.

* 
The operator is add (**+**), subtract (**-**), or divide (**/**), and the
operands are matrices with the same number of rows and the same number
of columns.
In this case, the operation is done component-wise resulting in the
same size matrix.

* 
The operator is multiply (*****), where both operands are matrices or one
operand is a vector and the other a matrix.
A right vector operand is treated as a column vector and a left vector
operand as a row vector.
In all these cases, it is required that the number of columns of the
left operand is equal to the number of rows of the right operand.
Then, the multiply (*****) operation does a linear algebraic multiply,
yielding an object that has the same number of rows as the left operand
and the same number of columns as the right operand.
“[Vector and Matrix Operations](#vector-and-matrix-operations)”
explains in more detail how vectors and matrices are operated on.

All other cases result in a compile-time error.

Use the built-in functions **dot**, **cross**, **matrixCompMult**, and
**outerProduct**, to get, respectively, vector dot product, vector cross
product, matrix component-wise multiplication, and the matrix product of a
column vector times a row vector.

The operator modulus (**%**) operates on signed or unsigned integers or
integer vectors.
If the fundamental types in the operands do not match, then the
conversions from “[Implicit Conversions](variables.html#implicit-conversions)” are
applied to create matching types.
The operands cannot be vectors of differing size; this is
a compile-time error.
If one operand is a scalar and the other vector, then the scalar is
applied component-wise to the vector, resulting in the same type as the
vector.
If both are vectors of the same size, the result is computed
component-wise.
The resulting value is undefined for any component computed with a
second operand that is zero, while results for other components with
non-zero second operands remain defined.
If both operands are non-negative, then the remainder is non-negative.
Results are undefined if one or both operands are negative.
The operator modulus (**%**) is not defined for any other data types
(non-integer types).

The arithmetic unary operators plus (**+**), negate (**-**), post-
and pre-increment and decrement (**--** and **++**) operate on
integer or floating-point values (including vectors and matrices).
All unary operators work component-wise on their operands.
These result with the same type they operated on.
For post- and pre-increment and decrement, the expression must be a writable
l-value.
Pre-increment and pre-decrement add or subtract 1 or 1.0 to the contents
of the expression they operate on, and the value of the pre-increment or
pre-decrement expression is the resulting value of that modification.
Post-increment and post-decrement expressions add or subtract 1 or 1.0
to the contents of the expression they operate on, but the resulting
expression has the expression’s value before the post-increment or
post-decrement was executed.

The relational operators greater than (**>**), less than (**=**), and less than or equal (**

The equality operators equal (**==**), and not equal (**!=**) operate on
all types except opaque types, aggregates that contain opaque types,
subroutine uniforms, and aggregates that contain subroutine uniforms.
They result in a scalar Boolean.
If the operand types do not match, then there must be a conversion from
“[Implicit Conversions](variables.html#implicit-conversions)” applied to one operand
that can make them match, in which case this conversion is done.
For vectors, matrices, structures, and arrays, all components, members,
or elements of one operand must equal the corresponding components,
members, or elements in the other operand for the operands to be
considered equal.
To get a vector of component-wise equality results for vectors, use the
built-in functions **equal** and **notEqual**.

The logical binary operators and (**&&**), or (**||**), and exclusive or
(**^^**) operate only on two scalar Boolean expressions. The result is a
scalar Boolean.
And (**&&**) will only evaluate the right hand operand if the left hand
operand evaluated to **true**.
Or (**||**) will only evaluate the right hand operand if the left hand
operand evaluated to **false**.
Exclusive or (**^^**) will always evaluate both operands.

The logical unary operator not (**!**).
It operates only on a scalar Boolean expression. The result is a scalar
Boolean.
To operate on a vector, use the built-in function **not**.

The sequence (**,**) operator that operates on expressions by returning
the type and value of the right-most expression in a comma separated
list of expressions.
All expressions are evaluated, in order, from left to right.
The operands to the sequence operator may have **void** type.
Opaque types cannot be used with the sequence (,) operator.

The ternary selection operator (**?:**).
It operates on three expressions (*exp1* **?** *exp2* **:** *exp3*).
This operator evaluates the first expression, which must result in a
scalar Boolean.
If the result is true, it selects to evaluate the second expression,
otherwise it selects to evaluate the third expression.
Only one of the second and third expressions is evaluated.
The second and third expressions cannot be opaque types,
or there will be a compile-time error.
Otherwise,
the second and third expressions can be any type, including **void**, as
long their types match, or there is a conversion in section
“[Implicit Conversions](variables.html#implicit-conversions)” that can be applied to
one of the expressions to make their types match.
This resulting matching type is the type of the entire expression.

The one’s complement operator (**~**).
The operand must be of type signed or unsigned integer or integer
vector, and the result is the one’s complement of its operand; each bit
of each component is complemented, including any sign bits.

The shift operators (**xref:**) and (**[]**).
For both operators, the operands must be signed or unsigned integers or
integer vectors.
One operand can be signed while the other is unsigned.
In all cases, the resulting type will be the same type as the left
operand.
If the first operand is a scalar, the second operand has to be a scalar
as well.
If the first operand is a vector, the second operand must be a scalar or
a vector with the same size as the first operand, and the result is
computed component-wise.
The result is undefined if the right operand is negative, or greater
than or equal to the number of bits in the left expression’s base type.
The value of E1 > E2 is E1 right-shifted by E2 bit positions.
If E1 is a signed integer, the right-shift will extend the sign bit.
If E1 is an unsigned integer, the right-shift will zero-extend.

The bitwise operators and (**&**), exclusive-or (**^**), and inclusive-or
(**|**).
The operands must be of type signed or unsigned integers or integer
vectors.
The operands cannot be vectors of differing size; this is a compile-time error.
If one operand is a scalar and the other a vector, the scalar is applied
component-wise to the vector, resulting in the same type as the vector.
If the fundamental types in the operands do not match, then the
conversions from “[Implicit Conversions](variables.html#implicit-conversions)” are
applied to create matching types, and this will be the resulting
fundamental type.
For and (**&**), the result is the bitwise-and function of the operands.
For exclusive-or (**^**), the result is the bitwise exclusive-or function
of the operands.
For inclusive-or (**|**), the result is the bitwise inclusive-or function
of the operands.

For a complete specification of the syntax of expressions, see
“[Shading Language Grammar](grammar.html#shading-language-grammar)”.

With a few exceptions, operations are component-wise.
Usually, when an operator operates on a vector or matrix, it is operating
independently on each component of the vector or matrix, in a component-wise
fashion.
For example,

vec3 v, u;
float f;
v = u + f;

will be equivalent to

v.x = u.x + f;
v.y = u.y + f;
v.z = u.z + f;

And

vec3 v, u, w;
w = v + u;

will be equivalent to

w.x = v.x + u.x;
w.y = v.y + u.y;
w.z = v.z + u.z;

and likewise for most operators and all integer and floating-point vector
and matrix types.
The exceptions are matrix multiplied by vector, vector multiplied by matrix,
and matrix multiplied by matrix.
These do not operate component-wise, but rather perform the correct linear
algebraic multiply.

vec3 v, u;
mat3 m;
u = v * m;

is equivalent to

u.x = dot(v, m[0]); // m[0] is the left column of m
u.y = dot(v, m[1]); // dot(a,b) is the inner (dot) product of a and b
u.z = dot(v, m[2]);

And

u = m * v;

is equivalent to

u.x = m[0].x * v.x + m[1].x * v.y + m[2].x * v.z;
u.y = m[0].y * v.x + m[1].y * v.y + m[2].y * v.z;
u.z = m[0].z * v.x + m[1].z * v.y + m[2].z * v.z;

And

mat3 m, n, r;
r = m * n;

is equivalent to

r[0].x = m[0].x * n[0].x + m[1].x * n[0].y + m[2].x * n[0].z;
r[1].x = m[0].x * n[1].x + m[1].x * n[1].y + m[2].x * n[1].z;
r[2].x = m[0].x * n[2].x + m[1].x * n[2].y + m[2].x * n[2].z;
r[0].y = m[0].y * n[0].x + m[1].y * n[0].y + m[2].y * n[0].z;
r[1].y = m[0].y * n[1].x + m[1].y * n[1].y + m[2].y * n[1].z;
r[2].y = m[0].y * n[2].x + m[1].y * n[2].y + m[2].y * n[2].z;
r[0].z = m[0].z * n[0].x + m[1].z * n[0].y + m[2].z * n[0].z;
r[1].z = m[0].z * n[1].x + m[1].z * n[1].y + m[2].z * n[1].z;
r[2].z = m[0].z * n[2].x + m[1].z * n[2].y + m[2].z * n[2].z;

and similarly for other sizes of vectors and matrices.

In the subsections described above for array, vector, matrix and structure
accesses, any out-of-bounds access produced undefined behavior.
However, if robust buffer access is enabled via the API, such
accesses will be bound within the memory extent of the active program.
It will not be possible to access memory from other programs, and accesses
will not result in abnormal program termination.
Out-of-bounds reads return undefined values, which include values from other
variables of the active program or zero.
Out-of-bounds writes may be discarded or overwrite other variables of the
active program, depending on the value of the computed index and how this
relates to the extent of the active program’s memory.
Applications that require defined behavior for out-of-bounds accesses should
range check all computed indices before dereferencing an array.

Specialization-constant operations are only available when targeting SPIR-V.

Only some operations discussed in this section may be applied to a
specialization constant and still yield a result that is a specialization
constant.
The operations that do so are listed below.
When a specialization constant is operated on with one of these operators
and with another constant or specialization constant, the result is
implicitly a specialization constant.

* 
**int**(), **uint**(), and **bool**() constructors for type conversions from
any of the following types to any of the following types:

**int**

* 
**uint**

* 
**bool**

vector versions of the above conversion constructors

allowed implicit conversions of the above

swizzles (e.g. `foo.yx`)

the following when applied to integer or unsigned integer types:

* 
unary negative (**-**)

* 
binary operations (**+**, **-**, *****, **/**, **%**)

* 
shift (**xref:**[**]**)

* 
bitwise operations (**&**, **|**, **^**)

the following when applied to integer or unsigned integer scalar types:

* 
comparison (**==**, **!=**, **>**, **>=**, **

The following when applied to the Boolean scalar type:

* 
not (**!**)

* 
logical operations (**&&**, **||**, **^^**)

* 
comparison (**==**, **!=**)

the ternary operator (**?:**)
