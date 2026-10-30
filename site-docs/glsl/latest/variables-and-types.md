# Variables and Types

## Metadata

- **Component**: glsl
- **Version**: latest
- **URL**: /glsl/latest/chapters/variables.html

## Table of Contents

- [Basic Types](#basic-types)
- [Void](#void)
- [Booleans](#booleans)
- [Integers](#integers)
- [Floats](#floats)
- [Vectors](#vectors)
- [Matrices](#matrices)
- [Opaque Types](#opaque-types)
- [Texture-Combined Samplers](#samplers)
- [Images](#images)
- [Atomic Counters](#atomic-counters)
- [Texture, sampler, and samplerShadow Types](#_texture_sampler_and_samplershadow_types)
- [Texture,_sampler,_and_samplerShadow_Types](#_texture_sampler_and_samplershadow_types)
- [Subpass Inputs](#_subpass_inputs)
- [Structures](#structures)
- [Arrays](#arrays)
- [The length() Method](#_the_length_method)
- [The_length()_Method](#_the_length_method)
- [Implicit Conversions](#implicit-conversions)
- [Initializers](#initializers)
- [Scoping](#scoping)
- [Storage Qualifiers](#storage-qualifiers)
- [Default Storage Qualifier](#default-storage-qualifier)
- [Default_Storage_Qualifier](#default-storage-qualifier)
- [Constant Qualifier](#constant-qualifier)
- [Constant Expressions](#constant-expressions)
- [Input Variables](#input-variables)
- [Uniform Variables](#uniform-variables)
- [Output Variables](#output-variables)
- [Buffer Variables](#buffer-variables)
- [Shared Variables](#shared-variables)
- [Interface Blocks](#interface-blocks)
- [Layout Qualifiers](#layout-qualifiers)
- [Input Layout Qualifiers](#input-layout-qualifiers)
- [Input_Layout_Qualifiers](#input-layout-qualifiers)
- [Tessellation Evaluation Inputs](#tessellation-evaluation-inputs)
- [Tessellation_Evaluation_Inputs](#tessellation-evaluation-inputs)
- [Geometry Shader Inputs](#geometry-shader-inputs)
- [Geometry_Shader_Inputs](#geometry-shader-inputs)
- [Fragment Shader Inputs](#fragment-shader-inputs)
- [Fragment_Shader_Inputs](#fragment-shader-inputs)
- [Compute Shader Inputs](#compute-shader-inputs)
- [Compute_Shader_Inputs](#compute-shader-inputs)
- [Output Layout Qualifiers](#output-layout-qualifiers)
- [Output_Layout_Qualifiers](#output-layout-qualifiers)
- [Transform Feedback Layout Qualifiers](#transform-feedback-layout-qualifiers)
- [Transform_Feedback_Layout_Qualifiers](#transform-feedback-layout-qualifiers)
- [Tessellation Control Outputs](#tessellation-control-outputs)
- [Tessellation_Control_Outputs](#tessellation-control-outputs)
- [Geometry Outputs](#geometry-outputs)
- [Fragment Outputs](#fragment-outputs)
- [Uniform Variable Layout Qualifiers](#uniform-variable-layout-qualifiers)
- [Uniform_Variable_Layout_Qualifiers](#uniform-variable-layout-qualifiers)
- [Subroutine Function Layout Qualifiers](#subroutine-function-layout-qualifiers)
- [Subroutine_Function_Layout_Qualifiers](#subroutine-function-layout-qualifiers)
- [Uniform and Shader Storage Block Layout Qualifiers](#uniform-and-shader-storage-block-layout-qualifiers)
- [Uniform_and_Shader_Storage_Block_Layout_Qualifiers](#uniform-and-shader-storage-block-layout-qualifiers)
- [Opaque Uniform Layout Qualifiers](#opaque-uniform-layout-qualifiers)
- [Opaque_Uniform_Layout_Qualifiers](#opaque-uniform-layout-qualifiers)
- [Atomic Counter Layout Qualifiers](#atomic-counter-layout-qualifiers)
- [Atomic_Counter_Layout_Qualifiers](#atomic-counter-layout-qualifiers)
- [Format Layout Qualifiers](#format-layout-qualifiers)
- [Format_Layout_Qualifiers](#format-layout-qualifiers)
- [Subpass Input Qualifier](#_subpass_input_qualifier)
- [Subpass_Input_Qualifier](#_subpass_input_qualifier)
- [Interpolation Qualifiers](#interpolation-qualifiers)
- [Redeclaring Built-In Interpolation Variables in the Compatibility Profile](#redeclaring-built-in-interpolation-variables-in-the-compatibility-profile)
- [Redeclaring_Built-In_Interpolation_Variables_in_the_Compatibility_Profile](#redeclaring-built-in-interpolation-variables-in-the-compatibility-profile)
- [Parameter Qualifiers](#parameter-qualifiers)
- [Precision and Precision Qualifiers](#precision-and-precision-qualifiers)
- [Precision_and_Precision_Qualifiers](#precision-and-precision-qualifiers)
- [Range and Precision](#range-and-precision)
- [Range_and_Precision](#range-and-precision)
- [Conversion between precisions](#conversion-between-precisions)
- [Conversion_between_precisions](#conversion-between-precisions)
- [Precision Qualifiers](#precision-qualifiers)
- [Default Precision Qualifiers](#default-precision-qualifiers)
- [Default_Precision_Qualifiers](#default-precision-qualifiers)
- [Available Precision Qualifiers](#available-precision-qualifiers)
- [Available_Precision_Qualifiers](#available-precision-qualifiers)
- [Variance and the Invariant Qualifier](#variance-and-the-invariant-qualifier)
- [Variance_and_the_Invariant_Qualifier](#variance-and-the-invariant-qualifier)
- [The Invariant Qualifier](#the-invariant-qualifier)
- [The_Invariant_Qualifier](#the-invariant-qualifier)
- [Invariance of Constant Expressions](#invariance-of-constant-expressions)
- [Invariance_of_Constant_Expressions](#invariance-of-constant-expressions)
- [The Precise Qualifier](#the-precise-qualifier)
- [The_Precise_Qualifier](#the-precise-qualifier)
- [Memory Qualifiers](#memory-qualifiers)
- [Specialization-Constant Qualifier](#specialization-constant-qualifier)
- [Order and Repetition of Qualification](#order-of-qualification)
- [Order_and_Repetition_of_Qualification](#order-of-qualification)
- [Empty Declarations](#empty-declarations)

## Content

All variables and functions must be declared before being used.
Variable and function names are identifiers.

There are no default types.
All variable and function declarations must have a declared type, and
optionally qualifiers.
A variable is declared by specifying its type followed by one or more names
separated by commas.
In many cases, a variable can be initialized as part of its declaration by
using the assignment operator (**=**).

User-defined types may be defined using **struct** to aggregate a list of
existing types into a single name.

The OpenGL Shading Language is type safe.
There are some implicit conversions between types.
Exactly how and when this can occur is described in section
“[Implicit Conversions](#implicit-conversions)” and as referenced by other
sections in this specification.

Definition

A *basic type* is a type defined by a keyword in the language.

The OpenGL Shading Language supports the following basic data types, grouped as follows.

**Transparent Types**

| Type | Meaning |
| --- | --- |
| **void** | for functions that do not return a value |
| **bool** | a conditional type, taking on values of true or false |
| **int** | a signed integer |
| **uint** | an unsigned integer |
| **float** | a single-precision floating-point scalar |
| **double** | a double-precision floating-point scalar |
| **vec2** | a two-component single-precision floating-point vector |
| **vec3** | a three-component single-precision floating-point vector |
| **vec4** | a four-component single-precision floating-point vector |
| **dvec2** | a two-component double-precision floating-point vector |
| **dvec3** | a three-component double-precision floating-point vector |
| **dvec4** | a four-component double-precision floating-point vector |
| **bvec2** | a two-component Boolean vector |
| **bvec3** | a three-component Boolean vector |
| **bvec4** | a four-component Boolean vector |
| **ivec2** | a two-component signed integer vector |
| **ivec3** | a three-component signed integer vector |
| **ivec4** | a four-component signed integer vector |
| **uvec2** | a two-component unsigned integer vector |
| **uvec3** | a three-component unsigned integer vector |
| **uvec4** | a four-component unsigned integer vector |
| **mat2** | a 2 × 2 single-precision floating-point matrix |
| **mat3** | a 3 × 3 single-precision floating-point matrix |
| **mat4** | a 4 × 4 single-precision floating-point matrix |
| **mat2x2** | same as a **mat2** |
| **mat2x3** | a single-precision floating-point matrix with 2 columns and 3 rows |
| **mat2x4** | a single-precision floating-point matrix with 2 columns and 4 rows |
| **mat3x2** | a single-precision floating-point matrix with 3 columns and 2 rows |
| **mat3x3** | same as a **mat3** |
| **mat3x4** | a single-precision floating-point matrix with 3 columns and 4 rows |
| **mat4x2** | a single-precision floating-point matrix with 4 columns and 2 rows |
| **mat4x3** | a single-precision floating-point matrix with 4 columns and 3 rows |
| **mat4x4** | same as a **mat4** |
| **dmat2** | a 2 × 2 double-precision floating-point matrix |
| **dmat3** | a 3 × 3 double-precision floating-point matrix |
| **dmat4** | a 4 × 4 double-precision floating-point matrix |
| **dmat2x2** | same as a **dmat2** |
| **dmat2x3** | a double-precision floating-point matrix with 2 columns and 3 rows |
| **dmat2x4** | a double-precision floating-point matrix with 2 columns and 4 rows |
| **dmat3x2** | a double-precision floating-point matrix with 3 columns and 2 rows |
| **dmat3x3** | same as a **dmat3** |
| **dmat3x4** | a double-precision floating-point matrix with 3 columns and 4 rows |
| **dmat4x2** | a double-precision floating-point matrix with 4 columns and 2 rows |
| **dmat4x3** | a double-precision floating-point matrix with 4 columns and 3 rows |
| **dmat4x4** | same as a **dmat4** |

Note that where the following tables say “accessing a texture”, the
**sampler*** opaque types access textures, and the **image*** opaque types
access images, of a specified type.

**Floating-Point Opaque Types**

| Type | Meaning |
| --- | --- |
| **sampler1D**

  **texture1D**

  **image1D** | a handle for accessing a 1D texture |
| **sampler1DShadow** | a handle for accessing a 1D depth texture with comparison |
| **sampler1DArray**

  **texture1DArray**

  **image1DArray** | a handle for accessing a 1D array texture |
| **sampler1DArrayShadow** | a handle for accessing a 1D array depth texture with comparison |
| **sampler2D**

  **texture2D**

  **image2D** | a handle for accessing a 2D texture |
| **sampler2DShadow** | a handle for accessing a 2D depth texture with comparison |
| **sampler2DArray**

  **texture2DArray**

  **image2DArray** | a handle for accessing a 2D array texture |
| **sampler2DArrayShadow** | a handle for accessing a 2D array depth texture with comparison |
| **sampler2DMS**

  **texture2DMS**

  **image2DMS** | a handle for accessing a 2D multisample texture |
| **sampler2DMSArray**

  **texture2DMSArray**

  **image2DMSArray** | a handle for accessing a 2D multisample array texture |
| **sampler2DRect**

  **texture2DRect**

  **image2DRect** | a handle for accessing a rectangle texture |
| **sampler2DRectShadow** | a handle for accessing a rectangle texture with comparison |
| **sampler3D**

  **texture3D**

  **image3D** | a handle for accessing a 3D texture |
| **samplerCube**

  **textureCube**

  **imageCube** | a handle for accessing a cube mapped texture |
| **samplerCubeShadow** | a handle for accessing a cube map depth texture with comparison |
| **samplerCubeArray**

  **textureCubeArray**

  **imageCubeArray** | a handle for accessing a cube map array texture |
| **samplerCubeArrayShadow** | a handle for accessing a cube map array depth texture with comparison |
| **samplerBuffer**

  **textureBuffer**

  **imageBuffer** | a handle for accessing a buffer texture |
| **subpassInput** | a handle for accessing a floating-point subpass input |
| **subpassInputMS** | a handle for accessing a multi-sampled floating-point subpass input |

**Signed Integer Opaque Types**

| Type | Meaning |
| --- | --- |
| **isampler1D**

  **itexture1D**

  **iimage1D** | a handle for accessing an integer 1D texture |
| **isampler1DArray**

  **itexture1DArray**

  **iimage1DArray** | a handle for accessing an integer 1D array texture |
| **isampler2D**

  **itexture2D**

  **iimage2D** | a handle for accessing an integer 2D texture |
| **isampler2DArray**

  **itexture2DArray**

  **iimage2DArray** | a handle for accessing an integer 2D array texture |
| **isampler2DMS**

  **itexture2DMS**

  **iimage2DMS** | a handle for accessing an integer 2D multisample texture |
| **isampler2DMSArray**

  **itexture2DMSArray**

  **iimage2DMSArray** | a handle for accessing an integer 2D multisample array texture |
| **isampler2DRect**

  **itexture2DRect**

  **iimage2DRect** | a handle for accessing an integer 2D rectangle texture |
| **isampler3D**

  **itexture3D**

  **iimage3D** | a handle for accessing an integer 3D texture |
| **isamplerCube**

  **itextureCube**

  **iimageCube** | a handle for accessing an integer cube mapped texture |
| **isamplerCubeArray**

  **itextureCubeArray**

  **iimageCubeArray** | a handle for accessing an integer cube map array texture |
| **isamplerBuffer**

  **itextureBuffer**

  **iimageBuffer** | a handle for accessing an integer buffer texture |
| **isubpassInput** | a handle for accessing an integer subpass input |
| **isubpassInputMS** | a handle for accessing a multi-sampled integer subpass input |

**Unsigned Integer Opaque Types**

| Type | Meaning |
| --- | --- |
| **usampler1D**

  **utexture1D**

  **uimage1D** | a handle for accessing an unsigned integer 1D texture |
| **usampler1DArray**

  **utexture1DArray**

  **uimage1DArray** | a handle for accessing an unsigned integer 1D array texture |
| **usampler2D**

  **utexture2D**

  **uimage2D** | a handle for accessing an unsigned integer 2D texture |
| **usampler2DArray**

  **utexture2DArray**

  **uimage2DArray** | a handle for accessing an unsigned integer 2D array texture |
| **usampler2DMS**

  **utexture2DMS**

  **uimage2DMS** | a handle for accessing an unsigned integer 2D multisample texture |
| **usampler2DMSArray**

  **utexture2DMSArray**

  **uimage2DMSArray** | a handle for accessing an unsigned integer 2D multisample array texture |
| **usampler2DRect**

  **utexture2DRect**

  **uimage2DRect** | a handle for accessing an unsigned integer rectangle texture |
| **usampler3D**

  **utexture3D**

  **uimage3D** | a handle for accessing an unsigned integer 3D texture |
| **usamplerCube**

  **utextureCube**

  **uimageCube** | a handle for accessing an unsigned integer cube mapped texture |
| **usamplerCubeArray**

  **utextureCubeArray**

  **uimageCubeArray** | a handle for accessing an unsigned integer cube map array texture |
| **usamplerBuffer**

  **utextureBuffer**

  **uimageBuffer** | a handle for accessing an unsigned integer buffer texture |
| **atomic_uint** | a handle for accessing an unsigned integer atomic counter |
| **usubpassInput** | a handle for accessing an unsigned-integer subpass input |
| **usubpassInputMS** | a handle for accessing a multi-sampled unsigned-integer subpass input |

**Sampler Opaque Types**

| Type | Meaning |
| --- | --- |
| **sampler** | a handle for accessing state describing how to sample a texture |
| **samplerShadow** | a handle for accessing state describing how to sample a depth
                            texture with comparison |

In addition, a shader can aggregate these basic types using arrays and
structures to build more complex types.

There are no pointer types.

In this specification, an *aggregate* will mean a structure or array.
(Matrices and vectors are not by themselves aggregates.) Aggregates,
matrices, and vectors will collectively be referred to as *composites*.

Functions that do not return a value must be declared as **void**.
There is no default function return type.
The keyword **void** cannot be used in any other declarations (except for
empty formal or actual parameter lists), or a compile-time error results.

Definition

A *boolean type* is any boolean scalar or vector type (**bool**, **bvec2**,
**bvec3**, **bvec4**)

To make conditional execution of code easier to express, the type **bool** is
supported.
There is no expectation that hardware directly supports variables of this
type.
It is a genuine Boolean type, holding only one of two values meaning either
true or false.
Two keywords **true** and **false** can be used as literal Boolean constants.
Booleans are declared and optionally initialized as in the follow example:

bool success;      // declare "success" to be a Boolean
bool done = false; // declare and initialize "done"

Expressions used for conditional jumps (**if**, **for**, **?:**, **while**,
**do**-**while**) must evaluate to the type **bool**.

Definitions

An *integral type* is any signed or unsigned, scalar or vector integer type.
It excludes arrays and structures.

A *scalar integral type* is a scalar signed or unsigned integer type:

A *vector integral type* is a vector of signed or unsigned integers:

Signed and unsigned integer variables are fully supported.
In this document, the term *integer* is meant to generally include both
signed and unsigned integers.

For OpenGL, unsigned integers have exactly 32 bits of precision.
When targeting Vulkan, **highp**
unsigned integers have exactly 32 bits of precision.

For OpenGL, signed integers use 32 bits, including a sign bit, in two’s complement form.
When targeting Vulkan, **highp**
signed integers use 32 bits, including a sign bit, in two’s complement form.

When targeting Vulkan, **mediump** and **lowp** integers are as defined by the
SPIR-V **RelaxedPrecision** decoration.

Addition,
subtraction and multiplication resulting in overflow or
underflow will result in the low-order
32
bits of the correct result R, where
R is computed with enough precision to avoid overflow or underflow.
Division resulting in overflow will result in an undefined value.

Integers are declared and optionally initialized with integer expressions,
as in the following example:

int i, j = 42; // default integer literal type is int
uint k = 3u;   // "u" establishes the type as uint

Literal integer constants can be expressed in decimal (base 10), octal (base
8), or hexadecimal (base 16) as follows.

*integer-constant* : 

*decimal-constant* *integer-suffixopt*

*octal-constant* *integer-suffixopt*

*hexadecimal-constant* *integer-suffixopt*

*integer-suffix* : one of 

**u** **U**

*decimal-constant* : 

*nonzero-digit*

*decimal-constant* *digit*

*octal-constant* : 

**0**

*octal-constant* *octal-digit*

*hexadecimal-constant* : 

**0x** *hexadecimal-digit*

**0X** *hexadecimal-digit*

*hexadecimal-constant* *hexadecimal-digit*

*digit* : 

**0**

*nonzero-digit*

*nonzero-digit* : one of 

**1 2 3 4 5 6 7 8 9**

*octal-digit* : one of 

**0 1 2 3 4 5 6 7**

*hexadecimal-digit* : one of 

**0 1 2 3 4 5 6 7 8 9

a b c d e f

A B C D E F**

No white space is allowed between the digits of an integer constant,
including after the leading **0** or after the leading **0x** or **0X** of a
constant, or before the suffix **u** or **U**.
When tokenizing, the maximal token matching the above will be recognized
before a new token is started.
When the suffix **u** or **U** is present, the literal has type **uint**,
otherwise the type is **int**.
A leading unary minus sign (-) is interpreted as an arithmetic unary
negation, not as part of the constant.
Hence, literals themselves are always expressed with non-negative syntax,
though they could result in a negative value.

It is a compile-time error to provide a literal integer whose bit pattern
cannot fit in 32 bits.
The bit pattern of the literal is always used unmodified.
So a signed literal whose bit pattern includes a set sign bit creates a
negative value.

For example,

1             // OK. Signed integer, value 1
1u            // OK. Unsigned integer, value 1
-1            // OK. Unary minus applied to signed integer.
              // result is a signed integer, value -1
-1u           // OK. Unary minus applies to unsigned integer.
              // Result is an unsigned integer, value 0xffffffff
0xA0000000    // OK. 32-bit signed hexadecimal
0xABcdEF00u   // OK. 32-bit unsigned hexadecimal
0xffffffff    // OK. Signed integer, value -1
0x80000000    // OK. Evaluates to -2147483648
0xffffffffu   // OK. Unsigned integer, value 0xffffffff
0xfffffffff   // Error: needs more than 32 bits
3000000000    // OK. A signed decimal literal taking 32 bits.
              // It evaluates to -1294967296
2147483648    // OK. Evaluates to -2147483648 (the literal set the sign bit)
5000000000    // Error: needs more than 32 bits

Single-precision and double-precision floating-point variables are available
for use in a variety of scalar calculations.
Generally, the term *floating-point* will refer to both single- and
double-precision floating-point.
Floating-point variables are defined as in the following examples:

float a, b = 1.5;    // single-precision floating-point
double c, d = 2.0LF; // double-precision floating-point

As an input value to one of the processing units, a single-precision or
double-precision floating-point variable is expected to match the
corresponding IEEE 754 floating-point definition for precision and dynamic
range.
Floating-point variables within a shader are also encoded according to the
IEEE 754 specification for single-precision floating-point values
(logically, not necessarily physically).
While encodings are logically IEEE 754, operations (addition,
multiplication, etc.) are not necessarily performed as required by IEEE 754.
See “[Range and Precision](#range-and-precision)” for more details on
precision and usage of NaNs (Not a Number) and Infs (positive or negative
infinities).

Floating-point constants are defined as follows.

*floating-constant* : 

*fractional-constant* *exponent-partopt* *floating-suffixopt*

*digit-sequence* *exponent-part* *floating-suffixopt*

*fractional-constant* : 

*digit-sequence* **.** *digit-sequence*

*digit-sequence* **.**

**.** *digit-sequence*

*exponent-part* : 

**e** *signopt* *digit-sequence*

**E** *signopt* *digit-sequence*

*sign* : one of 

**+** **-**

*digit-sequence* : 

*digit*

*digit-sequence* *digit*

*floating-suffix* : one of 

    **f** **F**
**lf** **LF**

A decimal point (**.**) is not needed if the exponent part is present.
No white space may appear anywhere within a floating-point constant,
including before a suffix.
When tokenizing, the maximal token matching the above will be recognized
before a new token is started.
When the suffix "lf" or "LF" is present, the literal has type **double**.
Otherwise, the literal has type **float**.
A leading unary minus sign (**-**) is interpreted as a unary operator and is
not part of the floating-point constant.

The OpenGL Shading Language includes data types for generic 2-, 3-, and 4-component vectors
of floating-point values, integers, and Booleans.
Floating-point vector variables can be used to store colors, normals,
positions, texture coordinates, texture lookup results and the like.
Boolean vectors can be used for component-wise comparisons of numeric
vectors.
Some examples of vector declarations are:

vec2 texcoord1, texcoord2;
vec3 position;
vec4 myRGBA;
ivec2 textureLookup;
bvec3 less;

Initialization of vectors can be done with constructors.
See “[Vector and Matrix Constructors](operators.html#vector-and-matrix-constructors)”.

The OpenGL Shading Language has built-in types for 2 × 2, 2 × 3, 2 × 4, 3
× 2, 3 × 3, 3 × 4, 4 × 2, 4 × 3, and 4 ×
4 matrices of floating-point numbers.
Matrix types beginning with "**mat**" have single-precision components while
matrix types beginning with "**dmat**" have double-precision components.
The first number in the type is the number of columns, the second is the
number of rows.
If there is only one number, the matrix is square.
Example matrix declarations:

mat2 mat2D;
mat3 optMatrix;
mat4 view, projection;
mat4x4 view; // an alternate way of declaring a mat4
mat3x2 m;    // a matrix with 3 columns and 2 rows
dmat4 highPrecisionMVP;
dmat2x4 dm;

Initialization of matrix values is done with constructors (described in
“[Vector and Matrix Constructors](operators.html#vector-and-matrix-constructors)”) in
column-major order.

Definition

An *opaque type* is a type where the internal structure of the type is
hidden from the language.

The opaque types, as listed in the following sections, declare variables
that are effectively opaque handles to other objects.
These objects are accessed through built-in functions, not through direct
reading or writing of the declared variable.
They can only be declared as function parameters or in **uniform**-qualified
variables (see “[Uniform Variables](#uniform-variables)”).
The only opaque types that take memory qualifiers are the image types.
Except for array indexing, structure member selection, and parentheses,
opaque variables are not allowed to be operands in expressions; such use
results in a compile-time error.

When aggregated into arrays within a shader, opaque types can only be
indexed with a dynamically uniform integral expression (see “Dynamically
Uniform Expressions”) unless otherwise noted; otherwise, results are
undefined.

Opaque variables cannot be treated as l-values; hence cannot be used as
**out** or **inout** function parameters, nor can they be assigned into.
Any such use results in a compile-time error.
However, they can be passed as **in** parameters with matching types and
memory qualifiers.
They cannot be declared with an initializer.

Because a single opaque type declaration effectively declares two objects,
the opaque handle itself and the object it is a handle to, there is room for
both a storage qualifier and a memory qualifier.
The storage qualifier will qualify the opaque handle, while the memory
qualifier will qualify the object it is a handle to.

Texture-combined sampler types (e.g. **sampler2D**) are the sampler types
described in the Basic Types tables as handles for accessing textures.
(They do not include **sampler** and **samplerShadow**.)
There are distinct texture-combined sampler types for each texture target,
and for each of float, integer, and unsigned integer data types.
Texture accesses are done through built-in texture functions (described in
“[Texture Functions](builtinfunctions.html#texture-functions)”) and texture-combined samplers
are used to specify which texture to access and how it is to be filtered.

Texture-combined sampler types are opaque types,
declared and behaving as described above for opaque types.

Image types are opaque types, declared and behaving as described above for
opaque types.
They can be further qualified with memory qualifiers.

Image variables are handles to
one-,
two-, or three-dimensional images
corresponding to all or a portion of a single level of a texture image bound
to an image unit.
There are distinct image variable types for each texture target, and for
each of float, integer, and unsigned integer data types.
Image accesses should use an image type that matches the target of the
texture whose level is bound to the image unit, or for non-layered bindings
of 3D or array images should use the image type that matches the
dimensionality of the layer of the image (i.e., a layer of 3D, 2DArray,
Cube, or CubeArray should use
**image2D**, a layer of 1DArray should use **image1D**, and a layer of 2DMSArray
should use **image2DMS**).
If the image target type does not match the bound image in this manner, if
the data type does not match the bound image, or if the format layout
qualifier does not match the image unit format as described in section
8.25
“Texture Image Loads and Stores” of the [OpenGL Specification](references.html#references), the
results of image accesses are undefined but cannot include program
termination.

Image variables are used in the image load, store, and atomic functions
described in “[Image Functions](builtinfunctions.html#image-functions)” to specify an image to
access.

Atomic counter types (e.g. **atomic_uint**) are opaque handles to counters,
declared and behaving as described above for opaque types.
The variables they declare specify which counter to access when using the
built-in atomic counter functions as described in
“[Atomic Counter Functions](builtinfunctions.html#atomic-counter-functions)”.
They are bound to buffers as described in
“[Atomic Counter Layout Qualifiers](#atomic-counter-layout-qualifiers)”.

Members of structures cannot be declared as atomic counter types.

Atomic counter types are not available when targeting Vulkan.

Texture (e.g., **texture2D**), **sampler**, and **samplerShadow** types are opaque
types, declared and behaving as described above for opaque types.
These types are only available when targeting Vulkan.
Texture variables are handles to one-, two-, and three-dimensional textures,
cube maps, etc., as enumerated in the basic types tables.
There are distinct texture types for each texture target, and for each of
float, integer, and unsigned integer data types.
Textures can be combined with a variable of type **sampler** or **samplerShadow**
to create a texture-combined sampler type (e.g., sampler2D, or sampler2DShadow).
This is done with a constructor, e.g., `sampler2D(texture2D, sampler)`,
`sampler2DShadow(texture2D, sampler)`, `sampler2DShadow(texture2D, samplerShadow)`,
or `sampler2D(texture2D, samplerShadow)` and is described in more detail
in section 5.4 "Constructors".

Subpass-input types are only available when targeting Vulkan.

Subpass-input types (e.g., **subpassInput**) are opaque types, declared
and behaving as described above for opaque types.

Subpass-input types are handles to two-dimensional single sampled or
multi-sampled images, with distinct types for each of float, integer,
and unsigned integer data types.

Subpass-input types are only available in fragment shaders.  It is
a compile-time error to use them in any other stage.

User-defined types can be created by aggregating other already defined types
into a structure using the **struct** keyword.
For example,

struct light {
    float intensity;
    vec3 position;
} lightVar;

In this example, *light* becomes the name of the new type, and *lightVar*
becomes a variable of type *light*.
To declare variables of the new type, use its name (without the keyword
**struct**).

light lightVar2;

More formally, structures are declared as follows.
However, the definitive grammar is as given in
“[Shading Language Grammar](grammar.html#shading-language-grammar)”.

*struct-definition* : 

*qualifieropt* **struct** nameopt_ **{** *member-list* **}**
*declaratorsopt* **;**

*member-list* : 

*member-declaration* **;**

*member-declaration* *member-list* **;**

*member-declaration* : 

*basic-type* *declarators* **;**

where *name* becomes the user-defined type, and can be used to declare
variables to be of this new type.
The *name* shares the same name space as other variables, types, and
functions.
All previously visible variables, types, constructors, or functions with
that name are hidden.
The optional *qualifier* only applies to any *declarators*, and is not part
of the type being defined for *name*.

Structures must have at least one member declaration.
Bit fields are not supported.
Member types must be already defined (there are no forward references).

Member declarations may contain precision qualifiers, but use of any other
qualifier results in a compile-time error. Where a member declaration does not
include a precision qualifier the member’s precision is inferred as described
in [Default Precision Qualifiers](#default-precision-qualifiers) at the point
of the struct type’s declaration.

A compile-time error results if a member declaration contains an
initializer.
Member declarators can contain arrays.
Such arrays must have a size specified, and the size must be a constant
integral expression that’s greater than zero (see
“[Constant Expressions](#constant-expressions)”).
Each level of structure has its own name space for names given in member
declarators; such names need only be unique within that name space.

Anonymous structures are not supported.
Embedded structure definitions are not supported.
These result in compile-time errors.

struct S { float f; }; // Allowed: S is defined as a structure.

struct T {
    S;              // Error: anonymous structures disallowed
    struct { ... }; // Error: embedded structures disallowed
    S s;            // Allowed: nested structure with a name.
};

Structures can be initialized at declaration time using constructors, as
discussed in “[Structure Constructors](operators.html#structure-constructors)”.

Any restrictions on the usage of a type or qualifier also apply to any
structure that contains a member of that type or qualifier.
This also applies to structure members that are structures, recursively.

Variables of the same type can be aggregated into arrays by declaring a name
followed by brackets (**[ ]**) enclosing an optional size.
When present, the array size must be a constant integral expression (see
“[Constant Expressions](#constant-expressions)”) greater than zero.
The type of the size parameter can be a signed or unsigned integer and the
choice of type does not affect the type of the resulting array.
Arrays only have a single dimension (a single number within “[ ]”),
however, arrays of arrays can be declared.
Any type can be formed into an array.

There are 3 types of array objects:

Explicitly Sized

The number of elements in the array is explicitly given.

Runtime Sized

The number of elements is not given and the array is the
outermost dimension of the last declared member of a shader
storage block (see section “[Interface                  Blocks](#interface-blocks)”). The array size is inferred at run-time from the
size of the data store backing the shader storage block.

Unsized

The number of array elements is not given and the array
is not runtime sized.

Unsized arrays may become explicitly sized following either an explicitly-sized
initializer or a redeclaration with an explicit size (Explicitly-sized and
runtime-sized arrays may not be redeclared).
It is a compile-time error to redeclare an array with a different underlying
member type.

Note, however, unless noted otherwise, blocks cannot be redeclared; so an unsized
array member in a user-declared block cannot be sized by a block redeclaration.

It is a compile-time error if, following any initializer, an array contains any type that
is or includes an unsized array.

It is a compile-time error if:

* 
an unsized array is indexed with anything other than a constant integral expression.

* 
an unsized array is declared as a formal parameter to a function.

* 
an unsized array is declared as the return type of a function.

* 
a runtime-sized or unsized array is passed as a function argument.

* 
any array is indexed using a negative constant expression.

* 
an explicitly sized array is indexed with a constant expression greater than
or equal to the declared size.

* 
an unsized array is redeclared with a size less than or equal to any
constant index used earlier in the shader to index the array.

Undefined behavior results from indexing an array with a non-constant
expression that’s greater than or equal to the array’s size or less than 0.

|  | Note
| --- | --- |

Some features outside the scope of GLSL, for example OpenGL or Vulkan’s "Robust
Buffer Access" features, may further constrain what behaviors are valid here.
Typically these features will prevent out-of-bounds indexing causing program
termination and may determine which values must be returned. |

|  | Note
| --- | --- |

All arrays are inherently homogeneous; made of elements all having the same
type and size, with one exception.
An array of shader storage blocks whose last member is a runtime-sized array
allows the individual blocks to have different sizes and hence a different
number of elements in the trailing array. |

Some examples of array declarations are:

float frequencies[3];
uniform vec4 lightPosition[4u];
light lights[];            // Unsized. Valid in GLSL, illegal in ESSL.
const int numLights = 2;
light lights[numLights];
vec4 a[3][2];

// a shader storage block, introduced in section 4.3.7 "Buffer Variables"
buffer b {
    float u[]; // an error, unless u gets statically sized by link time
    vec4 v[];  // okay, v will be sized dynamically, if not statically
} name[3];     // when the block is arrayed, all u will be the same size,
               // but not necessarily all v, if sized dynamically

An array type can be formed by specifying a non-array type
([type_specifier_nonarray :](grammar.html#type_specifier_nonarray)) followed by an [array_specifier :](grammar.html#array_specifier).
Note that in this context the construct *type [size]* does not always result in
an array of length *size* of type *type*.
For example,

float[5]    // an array of size [5] of float
float[2][3] // an array of size [2] of array of size [3] of float,
            // not size [3] of float[2]

Such an array type can be used anywhere any other type can be used, including
as the return value from a function, as a constructor of an array and in
declarations.

// As a function return type
float[5] foo() { }
// As an array constructor
float[5](3.4, 4.2, 5.0, 5.2, 1.1)
// In declaring an unnamed parameter
void foo(float[5])
// In normal declarations
float[5] a;

// The following 3 declarations are equivalent:
vec4 a[3][2]; // size-3 array of size-2 array of vec4
vec4[2] a[3];
vec4[3][2] a;

If such an array type is unsized and used as a constructor then the size of the
array is inferred from the constructor arguments. For example,

float a[5] = float[5](3.4, 4.2, 5.0, 5.2, 1.1);
float a[5] = float[](3.4, 4.2, 5.0, 5.2, 1.1);  // Constructor also of type float[5]

It is a compile-time error to assign either to or from a runtime-sized or unsized
array (rather than specific elements).
Note, this is a rare case that initializers and assignments appear to have
different semantics.
An initializer for an unsized array is valid and will size the array, but the
equivalent assigment is not valid.
For example,

float a[5];
float b[];
// An initializer sizes an array ...
float c[] = a;  // c is explicitly size 5
// ... but the equivalent assignment is not valid
float d[];
d = a;          // Error. Assignment to an unsized array
// It is never valid to assign from an unsized array
float e[] = b;  // Error. b is unsized so cannot be assigned

Alternatively, the initializer-list syntax can be used to initialize an
array of arrays:

vec4 a[3][2] = { vec4[2](vec4(0.0), vec4(1.0)),
                 vec4[2](vec4(0.0), vec4(1.0)),
                 vec4[2](vec4(0.0), vec4(1.0)) };

For arrays of arrays, any unsized dimension is explicitly sized by the
initializer:

vec4 a[][] = { vec4[2](vec4(0.0), vec4(1.0)), // okay, size to a[3][2]
               vec4[2](vec4(0.0), vec4(1.0)),
               vec4[2](vec4(0.0), vec4(1.0)) };

When in transparent memory (like in a uniform block), the layout is that the
inner-most (right-most in declaration) dimensions iterate faster than the
outer dimensions.
That is, for the above, the order in memory would be:

Low address : a[0][0] : a[0][1] : a[1][0] : a[1][1] : a[2][0] : a[2][1]
: High address

The number of elements in an array can be obtained by using the **length**()
method:

float a[5];
a.length(); // returns 5

vec4 a[3][2];
a.length()    // returns 3
a[x].length() // returns 2

The return value has type **int**.

It is a compile-time error to use the **length**() method on an unsized array.
The return value is a constant expression if and only if the array is
explicitly-sized.

When the **length**() method returns a compile-time constant, the expression the
**length**() method is applied to will be parsed and is subject to the normal
language rules but any arrays will not be dereferenced.
This means that the value returned is well-defined even if the indices are out
of bounds at runtime.
Note, however, that because indices which are constant expressions are still
checked, an error will still be generated for constant indexing out-of-bounds.

When the **length**() method returns a compile-time constant and the expression the
**length**() method is applied to contains any side effects (such as writes
to l-values within the expression, or function calls that themselves have side
effects), behavior is undefined.
A compile- or link-time error may be given by the implementation but this is
not required.

float a, b;
float[2](a=3.0, ++b).length(); // Behavior undefined. Illegal side effects

float c[5][3];
c[7].length(); // Error. Static indexing out of bounds.
c[i].length(); // Valid, returns 3 even if i = 5 at runtime.

struct S {
    float a[3];
} s[5];
s[i+3].a.length(); // Valid. Returns 3 for all inputs i.
s[i++].a.length(); // Behavior undefined. Illegal side-effects.

buffer B {
    float x[3];
    float y[];
} b[5];
b[i++].x.length(); // Behaviour undefined. Illegal side-effects.
b[i++].y.length(); // Valid. i is incremented and b dereferenced. The runtime size
                   // of y is returned if 0 

The precision is determined using the same rules as for other cases where
there is no intrinsic precision.
See “[Precision Qualifiers](#precision-qualifiers)”.

In some situations, an expression and its type will be implicitly converted
to a different type.
The following table shows all allowed implicit conversions:

| Type of expression | Can be implicitly converted to |
| --- | --- |
| **int** | **uint** |
| **int**

  **uint** | **float** |
| **int**

  **uint**

  **float** | **double** |
| **ivec2** | **uvec2** |
| **ivec3** | **uvec3** |
| **ivec4** | **uvec4** |
| **ivec2**

  **uvec2** | **vec2** |
| **ivec3**

  **uvec3** | **vec3** |
| **ivec4**

  **uvec4** | **vec4** |
| **ivec2**

  **uvec2**

  **vec2** | **dvec2** |
| **ivec3**

  **uvec3**

  **vec3** | **dvec3** |
| **ivec4**

  **uvec4**

  **vec4** | **dvec4** |
| **mat2** | **dmat2** |
| **mat3** | **dmat3** |
| **mat4** | **dmat4** |
| **mat2x3** | **dmat2x3** |
| **mat2x4** | **dmat2x4** |
| **mat3x2** | **dmat3x2** |
| **mat3x4** | **dmat3x4** |
| **mat4x2** | **dmat4x2** |
| **mat4x3** | **dmat4x3** |

There are no implicit array or structure conversions.
For example, an array of **int** cannot be implicitly converted to an array of
**float**.

When an implicit conversion is done, it is the same conversion that would be
done under explicit conversion, using a constructor.
The explicit conversions via constructors are described in
[Conversion and Scalar Constructors](operators.html#conversion-and-scalar-constructors).

When performing implicit conversion for binary operators, there may be
multiple data types to which the two operands can be converted.
For example, when adding an **int** value to a **uint** value, both values can
be implicitly converted to **uint**, **float**, and **double**.
In such cases, a floating-point type is chosen if either operand has a
floating-point type.
Otherwise, an unsigned integer type is chosen if either operand has an
unsigned integer type.
Otherwise, a signed integer type is chosen.
If operands can be implicitly converted to multiple data types deriving from
the same base data type, the type with the smallest component size is used.

The conversions in the table above are done only as indicated by other
sections of this specification.

At declaration, an initial value for a variable may be provided, specified
as an equals (=) followed by an initializer.
The initializer is either an *assignment-expression* or a list of
initializers enclosed in curly braces.
The grammar for the initializer is:

*initializer* : 

*assignment-expression*

**{** *initializer-list* **}**

**{** *initializer-list* **,** **}**

*initializer-list* : 

*initializer*

*initializer-list* , *initializer*

The *assignment-expression* is a normal expression except that a comma (**,**)
outside parentheses is interpreted as the end of the initializer, not as the
sequence operator.
As explained in more detail below, this allows creation of nested
initializers: The variable type and its initializer must exactly match in
terms of nesting, number of components/elements/members present at each
level, and types of components/elements/members.
An *assignment-expression* at global scope can include calls to user-defined
functions.

An *assignment-expression* in an initializer must be either the same type as
the object it initializes or be a type that can be converted to the object’s
type according to “[Implicit Conversions](#implicit-conversions)”.
Since these include constructors, a composite variable can be initialized by
either a constructor or an initializer list; and an element in an
initializer list can be a constructor.

If an initializer is a list of initializers enclosed in curly braces, the
variable being declared must be a vector, a matrix, an array, or a
structure.

int i = { 1 }; // illegal, i is not a composite

A list of initializers enclosed in a matching set of curly braces is applied
to one composite.
This may be the variable being declared or a composite contained in the
variable being declared.
Individual initializers from the initializer list are applied to the
elements/members of the composite, in order.

If the composite has a vector type, initializers from the list are applied
to the components of the vector, in order, starting with component 0.
The number of initializers must match the number of components.

If the composite has a matrix type, initializers from the list must be
vector initializers and are applied to the columns of the matrix, in order,
starting with column 0.
The number of initializers must match the number of columns.

If the composite has a structure type, initializers from the list are
applied to the members of the structure, in the order declared in the
structure, starting with the first member.
The number of initializers must match the number of members.

Applying these rules, the following matrix declarations are equivalent:

mat2x2 a = mat2(  vec2( 1.0, 0.0 ), vec2( 0.0, 1.0 ) );
mat2x2 b =      { vec2( 1.0, 0.0 ), vec2( 0.0, 1.0 ) };
mat2x2 c =      {     { 1.0, 0.0 },     { 0.0, 1.0 } };

All of the following declarations result in a compile-time error.

float a[2] = { 3.4, 4.2, 5.0 };         // illegal
vec2 b = { 1.0, 2.0, 3.0 };             // illegal
mat3x3 c = { vec3(0.0), vec3(1.0), vec3(2.0), vec3(3.0) }; // illegal
mat2x2 d = { 1.0, 0.0, 0.0, 1.0 };      // illegal, can't flatten nesting
struct {
    float a;
    int b;
} e = { 1.2, 2, 3 };                    // illegal

In all cases, the inner-most initializer (i.e., not a list of initializers
enclosed in curly braces) applied to an object must have the same type as
the object being initialized or be a type that can be converted to the
object’s type according to “[Implicit Conversions](#implicit-conversions)”.
In the latter case, an implicit conversion will be done on the initializer
before the assignment is done.

struct {
    float a;
    int b;
} e = { 1.2, 2 }; // legal, all types match
struct {
    float a;
    int b;
} e = { 1, 3 };   // legal, first initializer is converted

All of the following declarations result in a compile-time error.

int a = true;                         // illegal
vec4 b[2] = { vec4(0.0), 1.0 };       // illegal
mat4x2 c = { vec3(0.0), vec3(1.0) };  // illegal

struct S1 {
    vec4 a;
    vec4 b;
};

struct {
    float s;
    float t;
} d[] = { S1(vec4(0.0), vec4(1.1)) }; // illegal

If an initializer (of either form) is provided for an unsized array, the
size of the array is determined by the number of top-level (non-nested)
initializers within the initializer.
All of the following declarations create arrays explicitly sized with five
elements:

float a[] = float[](3.4, 4.2, 5.0, 5.2, 1.1);
float b[] = { 3.4, 4.2, 5.0, 5.2, 1.1 };
float c[] = a;                          // c is explicitly size 5
float d[5] = b;                         // means the same thing

It is a compile-time error to have too few or too many initializers in an
initializer list for the composite being initialized.
That is, all elements of an array, all members of a structure, all columns
of a matrix, and all components of a vector must have exactly one
initializer expression present, with no unconsumed initializers.

The scope of a variable is determined by where it is declared.
If it is declared outside all function definitions, it has global scope,
which starts from where it is declared and persists to the end of the shader
it is declared in.
If it is declared in a **while** test or a **for** statement, then it is scoped
to the end of the following sub-statement.
If it is declared in an **if** or **else** statement, it is scoped to the end of
that statement.
(See “[Selection](statements.html#selection)” and “[Iteration](statements.html#iteration)” for the
location of statements and sub-statements.) Otherwise, if it is declared as
a statement within a compound statement, it is scoped to the end of that
compound statement.
If it is declared as a parameter in a function definition, it is scoped
until the end of that function definition.
A function’s parameter declarations and body together form a single scope
nested in the global scope.
The **if** statement’s expression does not allow new variables to be declared,
hence does not form a new scope.

Within a declaration, the scope of a name starts immediately after the
initializer if present or immediately after the name being declared if not.
Several examples:

int x = 1;
{
    int x = 2, y = x; // y is initialized to 2
}

struct S
{
    int x;
};

{
    S S = S(0); // 'S' is only visible as a struct and constructor
    S;          // 'S' is now visible as a variable
}

int x = x; // Error if x has not been previously defined.
           // If the previous definition of x was in this
           // same scope, this causes a redeclaration error.

int f( /* nested scope begins here */ int k)
{
    int k = k + 3; // redeclaration error of the name k
    ...
}

int f(int k)
{
    {
        int k = k + 3; // 2nd k is parameter, initializing nested first k
        int m = k;     // use of new k, which is hiding the parameter
    }
}

For both **for** and **while** loops, the sub-statement itself does not
introduce a new scope for variable names, so the following has a
redeclaration compile-time error:

for ( /* nested scope begins here */ int i = 0; i 

The body of a **do**-**while** loop introduces a new scope lasting only between
the **do** and **while** (not including the while test expression), whether or
not the body is simple or compound:

int i = 17;
do
    int i = 4;  // okay, in nested scope_
while (i == 0); // i is 17, scoped outside the do-while body

The statement following a **switch** (…​) forms a nested scope.

All variable names, structure type names, and function names in a given
scope share the same name space.
Function names can be redeclared in the same scope, with the same or
different parameters, without error.
An implicitly-sized array can be redeclared in the same scope as an array of
the same base type.
Otherwise, within one compilation unit, a declared name cannot be redeclared
in the same scope; doing so results in a redeclaration compile-time error.
If a nested scope redeclares a name used in an outer scope, it hides all
existing uses of that name.
There is no way to access the hidden name or make it unhidden, without
exiting the scope that hid it.

The built-in functions are scoped in a scope outside the global scope that
users declare global variables in.
That is, a shader’s global scope, available for user-defined functions and
global variables, is nested inside the scope containing the built-in
functions.
When a function name is redeclared in a nested scope, it hides all functions
declared with that name in the outer scope.
Function declarations (prototypes) cannot occur inside of functions; they
must be at global scope, or for the built-in functions, outside the global
scope, otherwise a compile-time error results.

Shared globals are global variables declared with the same name in
independently compiled units (shaders) within the same language (i.e., same
stage, e.g. vertex) that are linked together when making a single program.
(Globals forming the interface between two different shader languages are
discussed in other sections.) Shared globals share the same name space, and
must be declared with the same type.
They will share the same storage.

Shared global arrays must have the same base type and the same explicit
size.
An array implicitly sized in one shader can be explicitly sized by another
shader in the same stage.
If no shader in a stage has an explicit size for the array, the largest
implicit size (one more than the largest index used) in that stage is used.
There is no cross-stage array sizing.
If there is no static access to an implicitly sized array within the stage
declaring it, then the array is given a size of 1, which is relevant when
the array is declared within an interface block that is shared with other
stages or the application (other unused arrays might be eliminated by the
optimizer).

Shared global scalars must have exactly the same type name and type
definition.
Structures must have the same name, sequence of type names, and type
definitions, and member names to be considered the same type.
This rule applies recursively for nested or embedded types.
If a shared global has multiple initializers, the initializers must all be
constant expressions, and they must all have the same value.
Otherwise, a link-time error will result.
(A shared global having only one initializer does not require that
initializer to be a constant expression.)

Variable declarations may have at most one storage qualifier specified in
front of the type.
These are summarized as

| Storage Qualifier | Meaning |
| --- | --- |
|  | local read/write memory, or an input parameter to a
                      function |
| **const** | a variable whose value cannot be changed |
| **in** | linkage into a shader from a previous stage, variable
                      is copied in |
| **out** | linkage out of a shader to a subsequent stage,
                      variable is copied out |
| **attribute** | compatibility profile only and vertex language only;
                      same as **in** when in a vertex shader |
| **uniform** | value does not change across the primitive being
                      processed, uniforms form the linkage between a shader,
                      API, and the application |
| **varying** | compatibility profile only and vertex and fragment
                      languages only; same as **out** when in a vertex shader
                      and same as **in** when in a fragment shader |
| **buffer** | value is stored in a buffer object, and can be read or
                      written both by shader invocations and the API |
| **shared** | compute shader only; variable storage is shared across
                      all work items in a workgroup |

Some input and output qualified variables can be qualified with at most one
additional auxiliary storage qualifier:

| Auxiliary Storage Qualifier | Meaning |
| --- | --- |
| **centroid** | centroid-based interpolation |
| **sample** | per-sample interpolation |
| **patch** | per-tessellation-patch attributes |

Not all combinations of qualification are allowed.
Auxiliary storage qualifiers can only be used with the **in** or **out** storage
qualifiers.
Additional qualifier rules are defined in upcoming sections.

Local variables can only use the **const** storage qualifier (or use no
storage qualifier).

Note that function parameters can use **const**, **in**, and **out** qualifiers,
but as *parameter qualifiers*.
Parameter qualifiers are discussed in
“[Function Calling Conventions](statements.html#function-calling-conventions)”.

Function return types and structure members do not use storage qualifiers.

Initializers in global declarations may only be used in declarations of
global variables with no storage qualifier, with a **const** qualifier, or
with a **uniform** qualifier.
Global variables without storage qualifiers that are not initialized in
their declaration or by the application will not be initialized,
but rather will enter *main()* with undefined values.

When comparing an output from one shader stage to an input of a subsequent
shader stage, the input and output don’t match if their auxiliary qualifiers
(or lack thereof) are not the same.

If no qualifier is present on a global variable, then the variable has no
linkage to the application or shaders running on other pipeline stages.
For either global or local unqualified variables, the declaration will
appear to allocate memory associated with the processor it targets.
This variable will provide read/write access to this allocated memory.

Named compile-time constants
or read-only variables
can be declared using
the **const** qualifier.
The **const** qualifier can be used with any of the non-void transparent basic
data types, as well as with structures and arrays of these.
It is a compile-time error to write to a **const** variable outside of its
declaration, so they must be initialized when declared.
For example,

const vec3 zAxis = vec3 (0.0, 0.0, 1.0);
const float ceiling = a + b; // a and b not necessarily constants

Structure members may not be qualified with **const**.
Structure variables can be declared as **const**, and initialized with a
structure
constructor or initializer.

Initializers for **const** declarations
at global scope
must be constant expressions, as defined in
“[Constant Expressions](#constant-expressions)”.

SPIR-V specialization constants are expressed in GLSL as **const** with the
layout qualifier **constant_id**, as described in
“[Specialization-Constant Qualifier.](#specialization-constant-qualifier)”

A *constant expression* is one of

* 
A literal value (e.g. **5** or **true**).

* 
A variable declared with the **const** qualifier and an initializer, where
the initializer is a constant expression.
This includes both **const** declared with a specialization-constant
layout qualifier, e.g. **layout**(**constant_id** = …​), and those declared
without a specialization-constant layout qualifier.

* 
Built-in variables qualified as **const**.

* 
An expression formed by an operator on operands that are all constant
expressions, including getting an element of a constant array, or a
member of a constant structure, or components of a constant vector.
However, the lowest precedence operators of the sequence operator (**,**)
and the assignment operators (**=**, **+=**, **…​**) are not included in the
operators that can create a constant expression.
Also, an array access with a specialization constant as an index does
not result in a constant expression.

* 
Valid use of the **length**() method on an explicitly sized object,
whether or not the object itself is constant (implicitly sized or
run-time sized arrays do not return a constant expression).

* 
A constructor whose arguments are all constant expressions.

* 
For non-specialization constants only: The value returned by certain
built-in function calls whose arguments are all constant expressions,
including at least the list below.
Any other built-in function that does not access memory (not the texture
lookup functions, image access, atomic counter, etc.), that has a
non-**void** return type, that has no **out** parameter, and is not a noise
function might also be considered a constant.
When a function is called with an argument that is a specialization
constant, the result is not a constant expression.

Angle and Trigonometric Functions

**radians**

* 
**degrees**

* 
**sin**

* 
**cos**

* 
**asin**

* 
**acos**

Exponential Functions

* 
**pow**

* 
**exp**

* 
**log**

* 
**exp2**

* 
**log2**

* 
**sqrt**

* 
**inversesqrt**

Common Functions

* 
**abs**

* 
**sign**

* 
**floor**

* 
**trunc**

* 
**round**

* 
**ceil**

* 
**mod**

* 
**min**

* 
**max**

* 
**clamp**

Geometric Functions

* 
**length**

* 
**dot**

* 
**normalize**

Function calls to user-defined functions (non-built-in functions) cannot
be used to form constant expressions.

A *constant integral expression* is a constant expression that evaluates to
a scalar signed or unsigned integer.

Constant expressions will be evaluated in an invariant way so as to create
the same value in multiple shaders when the same constant expressions appear
in those shaders.
See “[The Invariant Qualifier](#the-invariant-qualifier)” for more details
on how to create invariant expressions and
“[Precision Qualifiers](#precision-qualifiers)” for detail on how
expressions are evaluated.

Constant expressions respect the **precise** and **invariant** qualifiers but
will be always be evaluated in an invariant way, independent of the use of
such qualification, so as to create the same value in multiple shaders when
the same constant expressions appear in those shaders.
See “[The Invariant Qualifier](#the-invariant-qualifier)” and
“[The Precise Qualifier](#the-precise-qualifier)” for more details on how
to create invariant expressions.

Constant-expressions may be evaluated by a
host platform, and are therefore not required to compute the same value that
the same expression would evaluate to on the shader execution target.
However, the host must use the same or greater precision than the target
would use.
When the precision qualification cannot be determined, the expression is
evaluated at **highp**.
See “[Default Precision Qualifiers](#default-precision-qualifiers)”.

Specialization-constant expressions are never evaluated by the compiler
front end, but instead retain the expression’s operations needed to evaluate
them later on the host.

Shader input variables are declared with the **in** storage qualifier.
They form the input interface between previous stages of the API
pipeline and the declaring shader.
Input variables must be declared at global scope.
Values from the previous pipeline stage are copied into input variables at
the beginning of shader execution.
It is a compile-time error to write to a variable declared as an input.

Only the input variables that are
statically
read need to be written by the
previous stage; it is allowed to have superfluous declarations of input
variables.
This is shown in the following table.

| Treatment of Mismatched Input Variables | Consuming Shader (input variables) |
| --- | --- | --- | --- | --- |
| No Declaration | Declared but no Static Use | Declared and Static Use |
| Generating Shader (output variables) | No Declaration | Allowed | Allowed | Link-Time Error |
| Declared but no Static Use | Allowed | Allowed | Allowed (values are undefined) |
| Declared and Static Use | Allowed | Allowed | Allowed (values are potentially undefined) |

Consumption errors are based on static use only.
Compilation may generate a warning, but not an error, for any dynamic use
the compiler can deduce that might cause consumption of undefined values.

See “[Built-In Variables](builtins.html#built-in-variables)” for a list of the built-in
input names.

Vertex shader input variables (or attributes) receive per-vertex data.
It is a compile-time error to use auxiliary storage or interpolation qualifiers
on a vertex shader input.
The values copied in are established by the API or through the use
of the layout identifier **location**.

It is a compile-time error to declare a vertex shader input with, or that
contains, any of the following types:

* 
A [boolean type](#booleans)

* 
An [opaque type](#opaque-types)

* 
A structure

Example declarations in a vertex shader:

in vec4 position;
in vec3 normal;
in vec2 texCoord[4];

It is expected that graphics hardware will have a small number of fixed
vector locations for passing vertex inputs.
Therefore, the OpenGL Shading Language defines each non-matrix input variable as taking up
one such vector location.
There is an implementation-dependent limit on the number of locations that
can be used, and if this is exceeded it will cause a link-time error.
(Declared input variables that are not statically used do not count against
this limit.) A scalar input counts the same amount against this limit as a
**vec4**, so applications may want to consider packing groups of four
unrelated float inputs together into a vector to better utilize the
capabilities of the underlying hardware.
A matrix input will use up multiple locations.
The number of locations used will equal the number of columns in the matrix.

Tessellation control, evaluation, and geometry shader input variables get
the per-vertex values written out by output variables of the same names in
the previous active shader stage.
For these inputs, **centroid** and interpolation qualifiers are allowed, but
have no effect.
Since tessellation control, tessellation evaluation, and geometry shaders
operate on a set of vertices, each input variable (or input block, see
[Interface Blocks](#interface-blocks) below) needs to be declared as an array.
For example,

in float foo[]; // geometry shader input for vertex "out float foo"

Each element of such an array corresponds to one vertex of the primitive
being processed.
Each array can optionally have a size declared.
For geometry shaders, the array size will be set by, (or if provided must be
consistent with) the input **layout** declaration(s) establishing the type of
input primitive, as described later in “[Input Layout Qualifiers](#input-layout-qualifiers)”.

Some inputs and outputs are *arrayed*, meaning that for an interface between
two shader stages either the input or output declaration requires an extra
level of array indexing for the declarations to match.
For example, with the interface between a vertex shader and a geometry
shader, vertex shader output variables and geometry shader input variables
of the same name must have matching types, except that the geometry shader
will have one more array dimension than the vertex shader, to allow for
vertex indexing.
If such an arrayed interface variable is not declared with the necessary
additional input or output array dimension, a link-time error will result.
Geometry shader inputs, tessellation control shader inputs and outputs, and
tessellation evaluation inputs all have an additional level of arrayness
relative to other shader inputs and outputs.
These inputs and outputs are known as *per-vertex-arrayed* inputs and
outputs.
Component limits for arrayed interfaces (e.g.
*gl_MaxTessControlInputComponents*) are limits per vertex, not limits for
the entire interface.

For non-arrayed interfaces (meaning array dimensionally stays the same
between stages), it is a link-time error if the input variable is not
declared with the same type, including array dimensionality, as the matching
output variable.

The link-time type-matching rules apply to all declared input and output
variables, whether or not they are used.

Additionally, tessellation evaluation shaders support per-patch input
variables declared with the **patch** and **in** qualifiers.
Per-patch input variables are filled with the values of per-patch output
variables written by the tessellation control shader.
Per-patch inputs may be declared as one-dimensional arrays, but are not
indexed by vertex number.
Applying the **patch** qualifier to inputs can only be done in tessellation
evaluation shaders.
As with other input variables, per-patch inputs must be declared using the
same type and qualification as per-patch outputs from the previous
(tessellation control) shader stage.
It is a compile-time error to use **patch** with inputs in any other stage.

It is a compile-time error to declare a tessellation control, tessellation
evaluation or geometry shader input with, or that contains, any of the
following types:

* 
A [boolean type](#booleans)

* 
An [opaque type](#opaque-types)

Fragment shader inputs get per-fragment values, typically interpolated from
a previous stage’s outputs.
The auxiliary storage qualifiers **centroid** and **sample** can also be
applied, as well as the interpolation qualifiers **flat**, **noperspective**,
and **smooth.**

It is a compile-time error to declare a fragment shader input with, or that
contains, any of the following types:

* 
A [boolean type](#booleans)

* 
An [opaque type](#opaque-types)

Fragment shader inputs that are, or contain, integral
or double-precision floating-point
types must be
qualified with the interpolation qualifier **flat**.

Fragment inputs are declared as in the following examples:

in vec3 normal;
centroid in vec2 TexCoord;
noperspective in float temperature;
flat in vec3 myColor;
noperspective centroid in vec2 myTexCoord;

The fragment shader inputs form an interface with the last active shader in
the vertex processing pipeline.
For this interface, the last active shader stage output variables and
fragment shader input variables of the same name must match in type and
qualification, with a few exceptions: The storage qualifiers must, of
course, differ (one is **in** and one is **out**).
Also,
interpolation qualification (e.g. **flat**) and
auxiliary qualification (e.g. **centroid**) may differ.
These mismatches are allowed between any pair of stages.
When
interpolation or
auxiliary qualifiers do not match, those provided in
the fragment shader supersede those provided in previous stages.
If any such qualifiers are completely missing in the fragment shaders, then
the default is used, rather than any qualifiers that may have been declared
in previous stages.
That is, what matters is what is declared in the fragment shaders, not what
is declared in shaders in previous stages.

When an interface between shader stages is formed using shaders from two
separate program objects, it is not possible to detect mismatches between
inputs and outputs when the programs are linked.
When there are mismatches between inputs and outputs on such interfaces,
the values passed across the interface will be partially or completely
undefined.

Shaders can ensure matches across such interfaces either by using input and
output layout qualifiers (sections “[Input Layout Qualifiers](#input-layout-qualifiers)” and “[Output Layout Qualifiers](#output-layout-qualifiers)”) or by using identical input and output declarations of
blocks or variables.
Complete rules for interface matching are found in section 7.4.1 “Shader
Interface Matching” of the [OpenGL Specification](references.html#references).

Compute shaders do not permit user-defined input variables and do not form a
formal interface with any other shader stage.
See “[Compute Shader Special Variables](builtins.html#compute-shader-special-variables)” for a description of built-in compute shader input variables.
All other input to a compute shader is retrieved explicitly through image
loads, texture fetches, loads from uniforms or uniform buffers, or other
user supplied code.
Redeclaration of built-in input variables in compute shaders is not
permitted.

The **uniform** qualifier is used to declare global variables whose values are
the same across the entire primitive being processed.
All **uniform** variables are read-only and are initialized externally either
at link time or through the API.
The link-time initial value is either the value of the variable’s
initializer, if present, or 0 if no initializer is present.
Opaque types cannot have initializers, or a compile-time error results.
When targeting Vulkan, it is a compile-time error to declare **uniform**
variables outside a block.

Example declarations are:

uniform vec4 lightPosition;
uniform vec3 color = vec3(0.7, 0.7, 0.2); // value assigned at link time

The **uniform** qualifier can be used with any of the basic data types, or
when declaring a variable whose type is a structure, or an array of any of
these.

There is an implementation-dependent limit on the amount of storage for
uniforms that can be used for each type of shader and if this is exceeded it
will cause a compile-time or link-time error.
Uniform variables that are declared but not
used do not count against this limit.
The number of user-defined uniform variables and the number of built-in
uniform variables that are used within a shader are added together to
determine whether available uniform storage has been exceeded.

Uniforms in shaders all share a single global name space when linked into a
program or separable program.
Hence, the types,
initializers,
and any location specifiers of all statically used uniform variables with the
same name must match across all shaders that are linked into a single program.
However it is not required to repeat the
initializer or
location specifier in all the linked shaders.
While this single uniform name space is cross stage, a uniform variable
name’s scope is per stage: If a uniform variable name is declared in one
stage (e.g. a vertex shader) but not in another (e.g. a fragment shader),
then that name is still available in the other stage for a different use.

Shader output variables are declared with the **out** storage qualifier.
They form the output interface between the declaring shader and the
subsequent stages of the API pipeline.
Output variables must be declared at global scope.
During shader execution they will behave as normal unqualified global
variables.
Their values are copied out to the subsequent pipeline stage on shader exit.
Only output variables that are read by the subsequent pipeline stage need to
be written; it is allowed to have superfluous declarations of output
variables.

There is *not* an **inout** storage qualifier for declaring a single variable
name as both input and output to a shader.
Also, a variable cannot be declared with both the **in** and the **out**
qualifiers, this will result in a compile-time or link-time error.
Output variables must be declared with different names than input variables.
However, nesting an input or output inside an interface block with an
instance name allows the same names with one referenced through a block
instance name.

Vertex, tessellation evaluation, and geometry output variables output
per-vertex data and are declared using the **out** storage qualifier.
Applying **patch** to an output can only be done in a tessellation control
shader.
It is a compile-time error to use **patch** on outputs in any other stage.

It is a compile-time error to declare a vertex, tessellation evaluation,
tessellation control, or geometry shader output with, or that contains, any
of the following types:

* 
A [boolean type](#booleans)

* 
An [opaque type](#opaque-types)

Individual outputs are declared as in the following examples:

out vec3 normal;
centroid out vec2 TexCoord;
invariant centroid out vec4 Color;
flat out vec3 myColor;
sample out vec4 perSampleColor;

These can also appear in interface blocks, as described in
“[Interface Blocks](#interface-blocks)”.
Interface blocks allow simpler addition of arrays to the interface from
vertex to geometry shader.
They also allow a fragment shader to have the same input interface as a
geometry shader for a given vertex shader.

Tessellation control shader output variables are used to output
per-vertex and per-patch data.
Per-vertex output variables are arrayed (see *arrayed* under
“[Input Variables](#input-variables)”) and declared using the **out**
qualifier without the **patch** qualifier.
Per-patch output variables are declared using the **patch** and **out**
qualifiers.

Since tessellation control shaders produce an arrayed primitive comprising
multiple vertices, each per-vertex output variable (or output block, see
[Interface Blocks](#interface-blocks) below) needs to be declared as an array.
For example,

out float foo[]; // feeds next stage input "in float foo[]"

Each element of such an array corresponds to one vertex of the primitive
being produced.
Each array can optionally have a size declared.
The array size will be set by (or if provided must be consistent with) the
output layout declaration(s) establishing the number of vertices in the
output patch, as described later in
“[Tessellation Control Outputs](#tessellation-control-outputs)”.

Each tessellation control shader invocation has a corresponding output patch
vertex, and may assign values to per-vertex outputs only if they belong to
that corresponding vertex.
If a per-vertex output variable is used as an l-value, it is a compile-time
or link-time error if the expression indicating the vertex index is not the
identifier *gl_InvocationID*.

The order of execution of a tessellation control shader invocation relative
to the other invocations for the same input patch is undefined unless the
built-in function **barrier**() is used.
This provides some control over relative execution order.
When a shader invocation calls **barrier**(), its execution pauses until all
other invocations have reached the same point of execution.
Output variable assignments performed by any invocation executed prior to
calling **barrier**() will be visible to any other invocation after the call
to **barrier**() returns.

Because tessellation control shader invocations execute in undefined order
between barriers, the values of per-vertex or per-patch output variables
will sometimes be undefined.
Consider the beginning and end of shader execution and each call to
**barrier**() as synchronization points.
The value of an output variable will be undefined in any of the three
following cases:

At the beginning of execution.

At each synchronization point, unless

* 
the value was well-defined after the previous synchronization point and
was not written by any invocation since, or

* 
the value was written by exactly one shader invocation since the previous
synchronization point, or

* 
the value was written by multiple shader invocations since the previous
synchronization point, and the last write performed by all such
invocations wrote the same value.

When read by a shader invocation, if

* 
the value was undefined at the previous synchronization point and has not
been written by the same shader invocation since, or

* 
the output variable is written to by any other shader invocation between
the previous and next synchronization points, even if that assignment
occurs in code following the read.

Fragment outputs output per-fragment data and are declared using the **out**
storage qualifier.
It is a compile-time error to use auxiliary storage qualifiers or
interpolation qualifiers in a fragment shader output declaration.
It is a compile-time error to declare a fragment shader output with, or that
contains, any of the following types:

* 
A [boolean type](#booleans)

* 
A double-precision scalar or vector (**double**, **dvec2**, **dvec3**,
**dvec4**)

* 
An [opaque type](#opaque-types)

* 
A matrix type

* 
A structure

Fragment outputs are declared as in the following examples:

out vec4 FragmentColor;
out uint Luminosity;

Compute shaders have no built-in output variables, do not support
user-defined output variables and do not form a formal interface with any
other shader stage.
All outputs from a compute shader take the form of the side effects such as
image stores and operations on atomic counters.

The **buffer** qualifier is used to declare global variables whose values are
stored in the data store of a buffer object bound through the API.
Buffer variables can be read and written, with the underlying storage shared
among all active shader invocations.
Buffer variable memory reads and writes within a single shader invocation
are processed in order.
However, the order of reads and writes performed in one invocation relative
to those performed by another invocation is largely undefined.
Buffer variables may be qualified with memory qualifiers affecting how the
underlying memory is accessed, as described in “[Memory Qualifiers](#memory-qualifiers)”.

The **buffer** qualifier can be used to declare interface blocks (see
“[Interface Blocks](#interface-blocks)”), which are then referred to as
shader storage blocks.
It is a compile-time error to declare buffer variables outside a block.

// use buffer to create a buffer block (shader storage block)
buffer BufferName { // externally visible name of buffer
    int count;      // typed, shared memory...
    ...             // ...
    vec4 v[];       // last member may be an array that is not sized
                    // until after link time (dynamically sized)
} Name;             // name of block within the shader

There are implementation-dependent limits on the number of shader storage
blocks used for each type of shader, the combined number of shader storage
blocks used for a program, and the amount of storage required by each
individual shader storage block.
If any of these limits are exceeded, it will cause a compile-time or
link-time error.

If multiple shaders are linked together, then they will share a single
global buffer variable name space.
Hence, the types of all declared buffer variables with the same name must
match across all shaders that are linked into a single program.

The **shared** qualifier is used to declare global variables that have storage
shared between all work items in a compute shader workgroup.
Variables declared as **shared** may only be used in compute shaders (see
“[Compute Processor](overview.html#compute-processor)”).
Any other declaration of a **shared** variable is a compile-time error.
Shared variables are implicitly coherent (see
“[Memory Qualifiers](#memory-qualifiers)”).

Variables declared as **shared** may not have initializers and their contents
are undefined at the beginning of shader execution.
Any data written to **shared** variables will be visible to other work items
(executing the same shader) within the same workgroup.

In the absence of synchronization, the order of reads and writes to the same
**shared** variable by different invocations of a shader is not defined.

In order to achieve ordering with respect to reads and writes to **shared**
variables, control flow barriers must be employed using the **barrier**() function
(see “[Shader Invocation Control Functions](builtinfunctions.html#shader-invocation-control-functions)”).

There is a limit to the total size of all variables declared as **shared** in a
single program.
This limit, expressed in units of basic machine units may be determined by
using the OpenGL API to query the value of
MAX_COMPUTE_SHARED_MEMORY_SIZE.

Input, output, uniform, and buffer variable declarations can be grouped into
named interface blocks to provide coarser granularity backing than is
achievable with individual declarations.
They can have an optional instance name, used in the shader to reference
their members.
An output block of one programmable stage is backed by a corresponding input
block in the subsequent programmable stage.
A *uniform block* is backed by the application with a buffer object.
A *buffer block*, also known as a *shader storage block*, is also backed
by the application with a buffer object.
It is a compile-time error to have an input block in a vertex shader or an
output block in a fragment shader.
These uses are reserved for future use.

An interface block declaration is defined in the grammar as follows:

*interface-block* : 

*type_qualifier* *block-name* **{** *member-list* **}** *instance-nameopt* **;**

*block-name* : 

*identifier*

*member-list* : 

*member-declaration*

*member-declaration* *member-list*

*member-declaration* : 

*layout-qualifieropt* *qualifiersopt* *type* *declarators* **;**

*instance-name* : 

*identifier*

*identifier* *array-specifier*

Each of the above elements is discussed below.

First, an example,

uniform Transform {
    mat4 ModelViewMatrix;
    mat4 ModelViewProjectionMatrix;
    uniform mat3 NormalMatrix;      // allowed restatement of qualifier
    float Deformation;
};

The above establishes a uniform block named “Transform” with four uniforms
grouped inside it.

*type-qualifier* determines the interface of which the block will be a part
and, optionally, additional qualifiers that are applied to the block.
It is a compile-time error if it does not include one of the storage qualifiers
**in**, **out**, **uniform** or **buffer**.
It may optionally include [layout qualifiers](#layout-qualifiers), the
[auxiliary storage qualifier](#storage-qualifiers) **patch**, and the
[precise qualifier](#the-precise-qualifier).
**buffer** blocks may additionally include [Memory Qualifiers](#memory-qualifiers).
It is a compile-time error to include any other qualifiers.

*member-list* declares the variables that are to be grouped into the block.
Types and declarators are the same as for other input, output, uniform, and
buffer variable declarations outside blocks, with these exceptions:

* 
Initializers are not allowed

* 
Opaque types are not allowed

* 
Structure definitions cannot be nested inside a block

Any of these would result in a compile-time error.

If no optional qualifier is used in a member-declaration, the qualification
of the member includes all **in**, **out**, **patch**, **uniform**, or **buffer** as
determined by *interface-qualifier*.
If optional qualifiers are used, they can include interpolation qualifiers,
auxiliary storage qualifiers, precision qualifiers,
and storage qualifiers and they must declare
an input, output, or uniform member consistent with the interface qualifier
of the block: Input variables, output variables, uniform variables, and
**buffer** members can only be in **in** blocks, **out** blocks, **uniform** blocks,
and shader storage blocks, respectively.

Repeating the **in**, **out**, **patch**, **uniform**, or **buffer** interface
qualifier for a member’s storage qualifier is optional.
For example,

in Material {
    smooth in vec4 Color1; // legal, input inside in block
    smooth vec4 Color2;    // legal, 'in' inherited from 'in Material'
    vec2 TexCoord;         // legal, TexCoord is an input
    uniform float Atten;   // illegal, mismatched storage qualifier
};

Members of **uniform** or **buffer** storage blocks are
always represented in memory as **highp**, regardless of any precision
qualifier associated with the declaration. When values are read from
or written to such variables they are converted to or from the declared
precision as described in
[Conversion Between Precisions](#conversion-between-precisions).
Operations on the values within the shader will take place using the declared
precision as normal.

A *shader interface* is defined to be one of these:

* 
All the uniform variables and uniform blocks declared in a program.
This spans all compilation units linked together within one program.

* 
All the **buffer** blocks declared in a program.

* 
The boundary between adjacent programmable pipeline stages: This spans
all the outputs declared in all compilation units of the first stage and
all the inputs declared in all compilation units of the second stage.
Note that for the purposes of this definition, the fragment shader and
the preceding shader are considered to have a shared boundary even
though in practice, all values passed to the fragment shader first pass
through the rasterizer and interpolator.

The block name (*block-name*) is used to match within shader interfaces: an
output block of one pipeline stage will be matched to an input block with
the same name in the subsequent pipeline stage.
For uniform or shader storage blocks, the application uses the block name to
identify the block.
Block names have no other use within a shader beyond interface matching; it
is a compile-time error
to use a block name at global scope for anything other than as a
block name (e.g. use of a block name for a global variable name or function
name is currently reserved).
It is a compile-time error to use the same block name for more than one
block declaration in the same shader interface (as defined above) within one
shader, even if the block contents are identical.

Matched block names within a shader interface (as defined above) must match
in terms of having the same number of declarations with the same sequence of
types and the same sequence of member names, as well as having matching
member-wise layout qualification
(see next section).
Matched uniform or shader storage block names (but not input or output block
names) must also either all be lacking an instance name or all having an
instance name, putting their members at the same scoping level.
When instance names are present on matched block names, it is allowed for
the instance names to differ; they need not match for the blocks to match.
Furthermore, if a matching block is declared as an array, then the array
sizes must also match (or follow array matching rules for the shader
interface between consecutive shader stages).
Any mismatch will generate a link-time error.
A block name is allowed to have different definitions in different shader
interfaces within the same shader, allowing, for example, an input block and
output block to have the same name.

If an instance name (*instance-name*) is not used, the names declared inside
the block are scoped at the global level and accessed as if they were
declared outside the block.
If an instance name (*instance-name*) is used, then it puts all the members
inside a scope within its own name space, accessed with the field selector
(**.**) operator (analogously to structures).
For example,

in Light {
    vec4 LightPos;
    vec3 LightColor;
};
in ColoredTexture {
    vec4 Color;
    vec2 TexCoord;
} Material;           // instance name
vec3 Color;           // different Color than Material.Color
vec4 LightPos;        // illegal, already defined
...
... = LightPos;       // accessing LightPos
... = Material.Color; // accessing Color in ColoredTexture block

Outside the shading language (i.e., in the API), members are similarly
identified except the block name is always used in place of the instance
name (API accesses are to shader interfaces, not to shaders).
If there is no instance name, then the API does not use the block name to
access a member, just the member name.

Within a shader interface, all declarations of the same global name must be
for the same object and must match in type and in whether they declare a
variable or member of a block with no instance name.
The API also needs this name to uniquely identify an object in the shader
interface.
It is a link-time error if any particular shader interface contains

* 
two different blocks, each having no instance name, and each having a
member of the same name, or

* 
a variable outside a block, and a block with no instance name, where the
variable has the same name as a member in the block.

out Vertex {
    vec4 Position;  // API transform/feedback will use "Vertex.Position"
    vec2 Texture;
} Coords;           // shader will use "Coords.Position"
out Vertex2 {
    vec4 Color;     // API will use "Color"
    float Color2;
};

// in same program as Vertex2 above:
out Vertex3 {
    float Intensity;
    vec4 Color;     // ERROR, name collision with Color in Vertex2
};
float Color2;       // ERROR, collides with Color2 in Vertex2

For blocks declared as arrays, the array index must also be included when
accessing members, as in this example

uniform Transform { // API uses "Transform[2]" to refer to instance 2
    mat4 ModelViewMatrix;
    mat4 ModelViewProjectionMatrix;
    vec4 a[]; // array will get implicitly sized
    float Deformation;
} transforms[4];
...
... = transforms[2].ModelViewMatrix; // shader access of instance 2
// API uses "Transform.ModelViewMatrix" to query an offset or other query
transforms[x].a.length(); // same length for 'a' for all x
Transform[x];             // illegal, must use 'transforms'
Transform.a.length();     // illegal, must use 'transforms'
...transforms[2].a[3]...  // if these are the only two dereferences of 'a',
...transforms[3].a[7]...  // then 'a' must be size 8, for all
transforms[x]

For uniform or shader storage blocks declared as an array, each individual
array element corresponds to a separate buffer object bind range, backing
one instance of the block.
As the array size indicates the number of buffer objects needed, uniform and
shader storage block array declarations must specify an array size.
A uniform
or shader storage
block array can only be indexed with a
dynamically uniform integral expression, otherwise results are undefined.

When using OpenGL API entry points to identify the name of an individual
block in an array of blocks, the name string may include an array index
(e.g. *Transform[2]*).
When using OpenGL API entry points to refer to offsets or other
characteristics of a block member, an array index must not be specified
(e.g. *Transform.ModelViewMatrix*).

Tessellation control, tessellation evaluation and geometry shader input
blocks must be declared as arrays and follow the array declaration and
linking rules for all shader inputs for the respective stages.
All other input and output block arrays must specify an array size.

There are implementation-dependent limits on the number of uniform blocks
and the number of shader storage blocks that can be used per stage.
If either limit is exceeded, it will cause a link-time error.

Layout qualifiers can appear in several forms of declaration.
They can appear as part of an interface block definition or block member, as
shown in the grammar in the previous section.
They can also appear with just an *interface-qualifier* to establish layouts
of other declarations made with that qualifier:

*layout-qualifier* *interface-qualifier* **;**

Or, they can appear with an individual variable declared with an interface
qualifier:

*layout-qualifier* *interface-qualifier* *declaration* **;**

Declarations of layouts can only be made at global scope or block members,
and only where indicated in the following subsections; their details are
specific to what the interface qualifier is, and are discussed individually.

The *layout-qualifier* expands to:

*layout-qualifier* : 

**layout** **(** *layout-qualifier-id-list* **)**

*layout-qualifier-id-list* : 

*layout-qualifier-id*

*layout-qualifier-id* **,** *layout-qualifier-id-list*

*layout-qualifier-id* : 

*layout-qualifier-name*

*layout-qualifier-name* **=** *layout-qualifier-value*

**shared**

*layout-qualifier-value* : 

*integer-constant-expression*

The tokens used for *layout-qualifier-name* are identifiers, not keywords,
however, the **shared** keyword is allowed as a *layout-qualifier-id*.
Generally, they can be listed in any order.
Order-dependent meanings exist only if explicitly called out below.
Similarly, these identifiers are not case sensitive, unless explicitly noted
otherwise.

More than one layout qualifier may appear in a single declaration.
Additionally, the same *layout-qualifier-name* can occur multiple times
within a layout qualifier or across multiple layout qualifiers in the same
declaration.
When the same *layout-qualifier-name* occurs multiple times, in a single
declaration, the last occurrence overrides the former occurrence(s).
Further, if such a *layout-qualifier-name* will affect subsequent
declarations or other observable behavior, it is only the last occurrence
that will have any effect, behaving as if the earlier occurrence(s) within
the declaration are not present.
This is also true for overriding *layout-qualifier-name*, where one
overrides the other (e.g. **row_major** vs.
**column_major**); only the last occurrence has any effect.

*integer-constant-expression* is defined in
“[Constant Expressions](#constant-expressions)” as *constant integral
expression*, with it being a compile-time error for
*integer-constant-expression* to be a specialization constant.

The following table summarizes the use of layout qualifiers.
It shows for each one what kinds of declarations it may be applied to.
These are all discussed in detail in the following sections.

| Layout Qualifier | Qualifier Only | Individual Variable | Block | Block Member | Allowed Interfaces |
| --- | --- | --- | --- | --- | --- |
| **shared**

  **packed**

  **std140**

  **std430** | X |  | X |  | **uniform** / **buffer** |
| **row_major**

  **column_major** | X |  | X | X |
| **binding** = |  | opaque types only | X |  |
| **offset** = |  | atomic counters only |  | X |
| **align** = |  |  | X | X |
| **set** = |  | opaque types only | X |  | **uniform** / **buffer** (Vulkan only) |
| **push_constant** |  |  | X |  | **uniform** (Vulkan only) |
| **input_attachment_index** = |  | subpass types only |  |  | **uniform** (Vulkan only) |
| **location** = |  | X |  |  | **uniform** / **buffer** and subroutine variables |
| **location** = |  | X | X | X1 | all **in** / **out**, except for compute |
| **component** = |  | X |  | X |
| **index** = |  | X |  |  | fragment **out** and subroutine functions |
| **triangles**

  **quads**

  **isolines** | X |  |  |  | tessellation evaluation **in** |
| **equal_spacing**

  **fractional_even_spacing**

  **fractional_odd_spacing** | X |  |  |  | tessellation evaluation **in** |
| **cw**

  **ccw** | X |  |  |  | tessellation evaluation **in** |
| **point_mode** | X |  |  |  | tessellation evaluation **in** |
| **points** | X |  |  |  | geometry **in**/**out** |
| [ **points** ]

  **lines**

  **lines_adjacency**

  **triangles**

  **triangles_adjacency** | X |  |  |  | geometry **in** |
| **invocations** = | X |  |  |  | geometry **in** |
| **origin_upper_left**

  **pixel_center_integer** |  | *gl_FragCoord* only |  |  | fragment **in** |
| **early_fragment_tests** | X |  |  |  |
| **local_size_x** =

  **local_size_y** =

  **local_size_z** = | X |  |  |  | compute **in** |
| **local_size_x_id** =

  **local_size_y_id** =

  **local_size_z_id** = | X |  |  |  | compute **in** (SPIR-V only) |
| **xfb_buffer** =

  **xfb_stride** = | X | X | X | X | vertex, tessellation, and geometry **out** |
| **xfb_offset** = |  | X | X | X |
| **vertices** = | X |  |  |  | tessellation control **out** |
| [ **points** ]

  **line_strip**

  **triangle_strip** | X |  |  |  | geometry **out** |
| **max_vertices** = | X |  |  |  |
| **stream** = | X | X | X | X |
| **depth_any**

  **depth_greater**

  **depth_less**

  **depth_unchanged** |  | *gl_FragDepth* only |  |  | fragment **out** |
| **constant_id** = |  | scalar only |  |  | **const** (SPIR-V only) |
| **rgba32f**

  **rgba16f**

  **rg32f**

  **rg16f**

  **r11f_g11f_b10f**

  **r32f**

  **r16f**

  **rgba16**

  **rgb10_a2**

  **rgba8**

  **rg16**

  **rg8**

  **r16**

  **r8**

  **rgba16_snorm**

  **rgba8_snorm**

  **rg16_snorm**

  **rg8_snorm**

  **r16_snorm**

  **r8_snorm**

  **rgba32i**

  **rgba16i**

  **rgba8i**

  **rg32i**

  **rg16i**

  **rg8i**

  **r32i**

  **r16i**

  **r8i**

  **rgba32ui**

  **rgba16ui**

**rgb10_a2ui**

  **rgba8ui**

  **rg32ui**

  **rg16ui**

  **rg8ui**

  **r32ui**

  **r16ui**

  **r8ui** |  | image types only |  |  | **uniform** |

1

Location qualifiers are not allowed for members of an arrayed block,
except for per-vertex-arrays (see “[Interface    Blocks](#interface-blocks)”).

Layout qualifiers specific to a particular shader language are discussed in
separate sections below.

All shaders except compute shaders allow **location** layout qualifiers on
input variable declarations, input block declarations, and input block
member declarations.
Of these, variables and block members (but not blocks) additionally allow
the **component** layout qualifier.

*layout-qualifier-id* : 

**location** **=** *layout-qualifier-value*

**component** **=** *layout-qualifier-value*

For example,

layout(location = 3) in vec4 normal;
const int start = 6;
layout(location = start + 2) in vec4 v;

will establish that the shader input *normal* is assigned to vector location
number
3 and *v* is assigned location number 8.
For vertex shader inputs, the location specifies the number of the
vertex attribute from which input values are taken.
For inputs of all other shader types, the location specifies a vector number
that can be used to match against outputs from a previous shader stage, even
if that shader is in a different program object.

The following language describes how many locations are consumed by a given
type.
However, geometry shader inputs, tessellation control shader inputs and
outputs, and tessellation evaluation inputs all have an additional level of
arrayness relative to other shader inputs and outputs.
This outer array level is removed from the type before considering how many
locations the type consumes.

Except when targeting Vulkan,
if a vertex shader input is any scalar or vector type, it will consume a
single location.
If a non-vertex shader input, or any stage input when targeting Vulkan,
is a scalar or vector type other than **dvec3**
or **dvec4**, it will consume a single location, while types **dvec3** or
**dvec4** will consume two consecutive locations.

If the declared input (after potentially removing an outer array level as
just described above) is an array of size *n* and each of the elements takes
*m* locations, it will be assigned *m* * *n* consecutive locations starting
with the location specified.
For example,

layout(location = 6) in vec4 colors[3];

will establish that the shader input *colors* is assigned to vector location
numbers 6, 7, and 8.

If the declared input is an *n* × *m*
matrix, it will be assigned multiple locations starting with the location
specified.
The number of locations assigned for each matrix will be the same as for an
*n*-element array of *m*-component vectors.
For example,

layout(location = 9) in mat4 transforms[2];

will establish that shader input *transforms* is assigned to vector
locations 9-16, with *transforms[0]* being assigned to locations 9-12, and
*transforms[1]* being assigned to locations 13-16.

If the declared input is a structure or block, its members will be assigned
consecutive locations in their order of declaration, with the first member
assigned the location provided in the layout qualifier.
For a structure, this process applies to the entire structure.
It is a compile-time error to use a **location** qualifier on a member of a
structure.
For a block, this process applies to the entire block, or until the first
member is reached that has a **location** layout qualifier.

When a block member is declared with a **location** qualifier, its location
comes from that qualifier; the member’s **location** qualifier overrides the
block-level declaration.
Subsequent members are again assigned consecutive locations, based on the
newest location, until the next member declared with a **location** qualifier.
The values used for locations do not have to be declared in increasing
order.

If a block has no block-level **location** layout qualifier, it is required
that either all or none of its members have a **location** layout qualifier,
or a compile-time error results.
For some blocks declared as arrays, the **location** can only be applied at
the block level: When a block is declared as an array where additional
locations are needed for each member for each block array element, it is a
compile-time error to specify locations on the block members.
For *arrayed* interfaces (those generally having an extra level of arrayness
due to interface expansion), the outer array is stripped before applying
this rule.

When generating SPIR-V, all **in** and **out** qualified user-declared (non
built-in) variables and blocks (or all their members) must have a
shader-specified **location**.
Otherwise, a compile-time error is generated.

The locations consumed by block and structure members are determined by
applying the rules above recursively as though the structure member were
declared as an input variable of the same type.
For example:

layout(location = 3) in struct S
{
    vec3 a;                      // gets location 3
    mat2 b;                      // gets locations 4 and 5
    vec4 c[2];                   // gets locations 6 and 7
    layout(location = 8) vec2 A; // ERROR, can't use on struct member
} s;
layout(location = 4) in block
{
    vec4 d;                      // gets location 4
    vec4 e;                      // gets location 5
    layout(location = 7) vec4 f; // gets location 7
    vec4 g;                      // gets location 8
    layout(location = 1) vec4 h; // gets location 1
    vec4 i;                      // gets location 2
    vec4 j;                      // gets location 3
    vec4 k;                      // ERROR, location 4 already used
};

The number of input locations available to a shader is limited.
For vertex shaders, the limit is the advertised number of vertex attributes.
For all other shaders, the limit is implementation-dependent and must be no
less than one fourth of the advertised maximum input component count.

A program will fail to link if any attached shader uses a location greater
than or equal to the number of supported locations, unless device-dependent
optimizations are able to make the program fit within available hardware
resources.

A program will fail to link if explicit location assignments leave the
linker unable to find space for other variables without explicit
assignments.

For the purposes of determining if a non-vertex input matches an output from
a previous shader stage, the **location** layout qualifier (if any) must
match.

If a vertex shader input variable with no location assigned in the shader
text has a location specified through the OpenGL API, the API-assigned
location will be used.
Otherwise, such variables will be assigned a location by the linker.
See section 11.1.1 “Vertex Attributes” of the [OpenGL Specification](references.html#references) for
more details.
A link-time error will occur if an input variable is declared in multiple
shaders of the same language with conflicting locations.

The **component** qualifier allows the location to be more finely specified
for scalars and vectors, down to the individual components within a location
that are consumed.
It is a compile-time error to use **component** without also specifying the
**location** qualifier (order does not matter).
The components within a location are 0, 1, 2, and 3.
A variable or block member starting at component *N* will consume components
*N*, *N+1*, *N+2*, …​
up through its size.
It is a compile-time error if this sequence of components gets larger than
3.
A scalar **double** will consume two of these components, and a **dvec2** will
consume all four components available within a location.
A **dvec3** or **dvec4** can only be declared without specifying a **component**.
A **dvec3** will consume all four components of the first location and
components 0 and 1 of the second location.
This leaves components 2 and 3 available for other component-qualified
declarations.

For example:

// a consumes components 2 and 3 of location 4
layout(location = 4, component = 2) in vec2 a;

// b consumes component 1 of location 4
layout(location = 4, component = 1) in float b;

// ERROR: c overflows component 3
layout(location = 3, component = 2) in vec3 c;

// d consumes components 2 and 3 of location 5
layout(location = 5, component = 2) in double d;

// ERROR: e overflows component 3 of location 6
layout(location = 6, component = 2) in dvec2 e;

// ERROR: f overlaps with g
layout(location = 7, component = 0) in vec2 f;
layout(location = 7, component = 1) in float g;

layout(location = 8) in dvec3 h; // components 0,1,2 and 3 of location 8
                                 // and components 0 and 1 of location 9
layout(location = 9, component = 2) in double i; // okay, compts 2 and 3

If the variable is an array, each element of the array, in order, is
assigned to consecutive locations, but all at the same specified component
within each location.
For example:

// component 3 is consumed in each of 6 locations
layout(location = 2, component = 3) in float d[6];

That is, location 2 component 3 will hold *d[0]*, location 3 component 3
will hold *d[1]*, …​, up through location 7 component 3 holding *d[5]*.

This allows packing of two arrays into the same set of locations:

// e consumes beginning (components 0, 1 and 2) of each of 6 slots
layout(location = 0, component = 0) in vec3 e[6];

// f consumes last component of the same 6 slots
layout(location = 0, component = 3) in float f[6];

If applying this to an array of arrays, all levels of arrayness are removed
to get to the elements that are assigned per location to the specified
component.
These non-arrayed elements will fill the locations in the order specified
for arrays of arrays in “[Arrays](#arrays)”.

It is a compile-time error to apply the **component** qualifier to a matrix, a
structure, a block, or an array containing any of these.
It is a compile-time error to use **component** 1 or 3 as the beginning of a
**double** or **dvec2**.
It is a link-time error to specify different components for the same
variable within a program.

*Location aliasing* is causing two variables or block members to have the
same location number.
*Component aliasing* is assigning the same (or overlapping) component
numbers for two location aliases.
(Recall if **component** is not used, components are assigned starting with
0.)
With one exception, location aliasing is allowed only if it does not
cause component aliasing; it is a compile-time or link-time error to cause
component aliasing.
Further, when location aliasing, the aliases sharing the location must have
the same underlying numerical type and bit width  (floating-point or integer,
32-bit versus 64-bit, etc.) and the same
auxiliary storage and interpolation qualification.
The one exception where component aliasing is permitted is
when targeting OpenGL for two input
variables (not block members) to a vertex shader, which are allowed to have
component aliasing.
This vertex-variable component aliasing is intended only to support vertex
shaders where each execution path accesses at most one input per
aliased component.
Implementations are permitted, but not required, to generate link-time
errors if they detect that every path through the vertex shader executable
accesses multiple inputs aliased to any single component.

Additional input layout qualifier identifiers allowed for tessellation
evaluation shaders are described below.

*layout-qualifier-id* : 

*primitive_mode*

*vertex_spacing*

*ordering*

*point_mode*

The **primitive-mode** is used to specify a tessellation primitive mode to be
used by the tessellation primitive generator.

*primitive-mode*: 

**triangles**

**quads**

**isolines**

If present, the *primitive-mode* specifies that the tessellation primitive
generator should subdivide a triangle into smaller triangles, a quad into
triangles, or a quad into a collection of lines, respectively.

A second group of layout identifiers, *vertex spacing*, is used to specify
the spacing used by the tessellation primitive generator when subdividing an
edge.

*vertex-spacing*: 

**equal_spacing**

**fractional_even_spacing**

**fractional_odd_spacing**

**equal_spacing** specifies that edges should be divided into a collection of
equal-sized segments;

**fractional_even_spacing** specifies that edges should be divided into an
even number of equal-length segments plus two additional shorter
“fractional” segments; or

**fractional_odd_spacing** specifies that edges should be divided into an odd
number of equal-length segments plus two additional shorter “fractional”
segments.

A third group of layout identifiers, *ordering*, specifies whether the
tessellation primitive generator produces triangles in clockwise or
counter-clockwise order, according to the coordinate system depicted in the
[OpenGL Specification](references.html#references).

*ordering*: 

**cw**

**ccw**

The identifiers **cw** and **ccw** indicate clockwise and counter-clockwise
triangles, respectively.
If the tessellation primitive generator does not produce triangles, the
order is ignored.

Finally, *point mode* indicates that the tessellation primitive generator
should produce one point for each distinct vertex in the subdivided
primitive, rather than generating lines or triangles.

*point-mode*: 

**point_mode**

Any or all of these identifiers may be specified one or more times in a
single input layout declaration.
If primitive mode, vertex spacing, or ordering is declared more than once in
the tessellation evaluation shaders of a program, all such declarations must
use the same identifier.

At least one tessellation evaluation shader (compilation unit) in a program
must declare a primitive mode in its input layout.
Declaring vertex spacing, ordering, or point mode identifiers is optional.
It is not required that all tessellation evaluation shaders in a program
declare a primitive mode.
If spacing or vertex ordering declarations are omitted, the tessellation
primitive generator will use equal spacing or counter-clockwise vertex
ordering, respectively.
If a point mode declaration is omitted, the tessellation primitive generator
will produce lines or triangles according to the primitive mode.

Additional layout qualifier identifiers for geometry shader inputs include
*primitive* identifiers and an *invocation count* identifier:

*layout-qualifier-id* : 

**points**

**lines**

**lines_adjacency**

**triangles**

**triangles_adjacency**

**invocations** **=** *layout-qualifier-value*

The identifiers **points**, **lines**, **lines_adjacency**, **triangles**, and
**triangles_adjacency** are used to specify the type of input primitive
accepted by the geometry shader, and only one of these is accepted.
At least one geometry shader (compilation unit) in a program must declare
this input primitive layout, and all geometry shader input layout
declarations in a program must declare the same layout.
It is not required that all geometry shaders in a program declare an input
primitive layout.

The identifier **invocations** is used to specify the number of times the
geometry shader executable is invoked for each input primitive received.
Invocation count declarations are optional.
If no invocation count is declared in any geometry shader in a program, the
geometry shader will be run once for each input primitive.
If an invocation count is declared, all such declarations must specify the
same count.
If a shader specifies an invocation count greater than the
implementation-dependent maximum, or less than or equal to zero,
a compile-time error results.

For example,

layout(triangles, invocations = 6) in;

will establish that all inputs to the geometry shader are triangles and that
the geometry shader executable is run six times for each triangle processed.

All geometry shader input unsized array declarations will be sized by an
earlier input primitive layout qualifier, when present, as per the following
table.

| Layout | Size of Input Arrays |
| --- | --- |
| **points** | 1 |
| **lines** | 2 |
| **lines_adjacency** | 4 |
| **triangles** | 3 |
| **triangles_adjacency** | 6 |

The intrinsically declared input array *gl_in[]* will also be sized by any
input primitive-layout declaration.
Hence, the expression

gl_in.length()

will return the value from the table above.

For inputs declared without an array size, including intrinsically declared
inputs (i.e., *gl_in*), a layout must be declared before any use of the
method **length**() or other any array use that requires the array size to be
known.

It is a compile-time error if a layout declaration’s array size (from the
table above) does not match all the explicit array sizes specified in
declarations of an input variables in the same shader.
The following includes examples of compile-time errors:

// code sequence within one shader...
in vec4 Color1[];     // legal, size still unknown
in vec4 Color2[2];    // legal, size is 2
in vec4 Color3[3];    // illegal, input sizes are inconsistent
layout(lines) in;     // legal for Color2, input size is 2, matching Color2
in vec4 Color4[3];    // illegal, contradicts layout of lines
layout(lines) in;     // legal, matches other layout() declaration
layout(triangles) in; // illegal, does not match earlier layout() declaration

It is a link-time error if not all provided sizes (sized input arrays and
layout size) match across all geometry shaders in a program.

Additional fragment layout qualifier identifiers include the following for
*gl_FragCoord* :

*layout-qualifier-id* : 

**origin_upper_left**

**pixel_center_integer**

By default, *gl_FragCoord* in OpenGL assumes a lower-left origin for window
coordinates and assumes pixel centers are located at half-pixel coordinates.
For example, the (*x, y*) location (0.5, 0.5) is returned for the
lower-left-most pixel in a window.
The origin can be changed by redeclaring *gl_FragCoord* with the
**origin_upper_left** qualifier, moving the origin of *gl_FragCoord* to the
upper left of the window, with *y* increasing in value toward the bottom of
the window.
The values returned can also be shifted by half a pixel in both *x* and *y*
by **pixel_center_integer** so it appears the pixels are centered at whole
number pixel offsets.
This moves the (*x*, *y*) value returned by *gl_FragCoord* of (0.5, 0.5) by
default, to (0.0, 0.0) with **pixel_center_integer**.

Targeting Vulkan will assume and require an upper-left origin for *gl_FragCoord*
with pixel centers located at half-pixel coordinates.
This origin can be explicitly set by redeclaring *gl_FragCoord* with the
**origin_upper_left** identifier.

Redeclarations are done as follows

in vec4 gl_FragCoord; // redeclaration that changes nothing is allowed

// All the following are allowed redeclaration that change behavior
layout(origin_upper_left) in vec4 gl_FragCoord;
layout(pixel_center_integer) in vec4 gl_FragCoord;
layout(origin_upper_left, pixel_center_integer) in vec4 gl_FragCoord;

If *gl_FragCoord* is redeclared in any fragment shader in a program, it must
be redeclared in all the fragment shaders in that program that have a static
use *gl_FragCoord*.
All redeclarations of *gl_FragCoord* in all fragment shaders in a single
program must have the same set of qualifiers.
Within any shader, the first redeclarations of *gl_FragCoord* must appear
before any use of *gl_FragCoord*.
The built-in *gl_FragCoord* is only predeclared in fragment shaders, so
redeclaring it in any other shader language results in a compile-time error.

Redeclaring *glFragCoord* with **origin_upper_left** and/or
**pixel_center_integer** qualifiers only affects *gl_FragCoord.x* and
*gl_FragCoord.y*.
It has no effect on rasterization, transformation, or any other part of the
API pipeline or language features.

Fragment shaders allow the following layout qualifier on **in** only (not with
variable declarations):

*layout-qualifier-id* : 

**early_fragment_tests**

to request that fragment tests be performed before fragment shader
execution, as described in section 15.2.4 “Early Fragment Tests” of the
[OpenGL Specification](references.html#references).

For example,

layout(early_fragment_tests) in;

Specifying this will make per-fragment tests be performed before fragment
shader execution.
If this is not declared, per-fragment tests will be performed after fragment
shader execution.
Only one fragment shader (compilation unit) need declare this, though more
than one can.
If at least one declares this, then it is enabled.

There are no layout location qualifiers for compute shader inputs.

Layout qualifier identifiers for compute shader inputs are the workgroup
size qualifiers:

*layout-qualifier-id* : 

**local_size_x** **=** *layout-qualifier-value*

**local_size_y** **=** *layout-qualifier-value*

**local_size_z** **=** *layout-qualifier-value*

The **local_size_x**, **local_size_y**, and **local_size_z** qualifiers are used
to declare a fixed workgroup size by the compute shader in the first,
second, and third dimension, respectively.
If a shader does not specify a size for one of the dimensions, that
dimension will have a size of 1.

For example, the following declaration in a compute shader

layout(local_size_x = 32, local_size_y = 32) in;

is used to declare a two-dimensional compute shader with a workgroup size of 32
X 32 elements, which is equivalent to a three-dimensional compute shader
where the third dimension has size one.

As another example, the declaration

layout(local_size_x = 8) in;

effectively specifies that a one-dimensional compute shader is being
compiled, and its size is 8 elements.

If the fixed workgroup size of the shader in any dimension is less than
or equal to zero or greater than the maximum size supported by the
implementation for that dimension, a compile-time error results.
Also, if such a layout qualifier is declared more than once in the same
shader, all those declarations must set the same set of workgroup
sizes and set them to the same values; otherwise a compile-time error
results.
If multiple compute shaders attached to a single program object declare a
fixed workgroup size, the declarations must be identical; otherwise a
link-time error results.

Furthermore, if a program object contains any compute shaders, at least one
must contain an input layout qualifier specifying a fixed workgroup size
for the program, or a link-time error will occur.

Some output layout qualifiers apply to all shader stages and some apply only
to specific stages.
The latter are discussed in separate sections below.

As with input layout qualifiers, all shaders except compute shaders allow
**location** layout qualifiers on output variable declarations, output block
declarations, and output block member declarations.
Of these, variables and block members (but not blocks) additionally allow
the **component** layout qualifier.

*layout-qualifier-id* : 

**location** **=** *layout-qualifier-value*

**component** **=** *layout-qualifier-value*

The usage and rules for applying the **location** qualifier
and the **component** qualifier
to blocks and structures are exactly as described in
“[Input Layout Qualifiers](#input-layout-qualifiers)”.
No component aliasing of output variables or members is allowed.

Fragment shaders allow an additional **index** output layout qualifier:

*layout-qualifier-id* : 

**index** **=** *layout-qualifier-value*

Each of these qualifiers may appear at most once.
If **index** is specified, **location** must also be specified.
If **index** is not specified, the value 0 is used.
For example, in a fragment shader,

layout(location = 3) out vec4 color;

will establish that the fragment shader output *color* is assigned to
fragment color 3 as the first (index zero) input to the blend equation.
And,

layout(location = 3, index = 1) out vec4 factor;

will establish that the fragment shader output *factor* is assigned to
fragment color 3 as the second (index one) input to the blend equation.

For fragment shader outputs, the location
and index specify
the color output number
and index
receiving the values of the output.
For outputs of all other shader stages, the location specifies a vector
number that can be used to match against inputs in a subsequent shader
stage, even if that shader is in a different program object.

If a declared output is a scalar or vector type other than **dvec3** or
**dvec4**, it will consume a single location.
Outputs of type **dvec3** or **dvec4** will consume two consecutive locations.
Outputs of type **double** and **dvec2** will consume only a single location, in
all stages.

If the declared output is an array, it will be assigned consecutive
locations starting with the location specified.
For example,

layout(location = 2) out vec4 colors[3];

will establish that *colors* is assigned to vector location numbers 2, 3,
and 4.

If the declared output is an *n* × *m*
matrix, it will be assigned multiple locations starting with the location
specified.
The number of locations assigned will be the same as for an *n*-element
array of *m*-component vectors.

If the declared output is a structure, its members will be assigned
consecutive locations in the order of declaration, with the first member
assigned the location specified for the structure.
The number of locations consumed by a structure member is determined by
applying the rules above recursively as though the structure member were
declared as an output variable of the same type.

**location** layout qualifiers may be used on output variables declared as
structures.
However, it is a compile-time error to use a **location** qualifier on a
structure member.
Location layout qualifiers may be used on output blocks and output block
members.

The number of output locations available to a shader is limited.
For fragment shaders, the limit is the advertised number of draw buffers.

For all other shaders, the limit is implementation-dependent and must be no
less than one fourth of the advertised maximum output component count
(compute shaders have no outputs).
A program will fail to link if any attached shader uses a location greater
than or equal to the number of supported locations, unless device-dependent
optimizations are able to make the program fit within available hardware
resources.

Compile-time errors may also be given if at compile time it is known the
link will fail.
A negative output location will result in a compile-time error.
It is also a compile-time error if a fragment shader sets a layout index to
less than 0 or greater than 1.

It is a compile-time or link-time error if any of the following occur:

* 
any two fragment shader output variables are assigned to the same
location and index.

* 
if any two output variables from the same vertex, tessellation or
geometry shader stage are assigned to the same location.

For fragment shader outputs, locations can be assigned using either a
**layout** qualifier or via the OpenGL API.

For all shader types, a program will fail to link if explicit location
assignments leave the linker unable to find space for other variables
without explicit assignments.

If an output variable with no location or index assigned in the shader text
has a location specified through the OpenGL API, the API-assigned
location will be used.
Otherwise, such variables will be assigned a location by the linker.
All such assignments will have a color index of zero.
See section 15.2 “Shader Execution” of the [OpenGL Specification](references.html#references) for
more details.
A link-time error will occur if an output variable is declared in multiple
shaders of the same language with conflicting location or index values.

For the purposes of determining if a non-fragment output matches an input
from a subsequent shader stage, the **location** layout qualifier (if any)
must match.

The vertex, tessellation, and geometry stages allow shaders to control
transform feedback.
When doing this, shaders will dictate which transform feedback buffers are
in use, which output variables will be written to which buffers, and how
each buffer is laid out.
To accomplish this, shaders allow the following layout qualifier identifiers
on output declarations:

*layout-qualifier-id* : 

**xfb_buffer** **=** *layout-qualifier-value*

**xfb_offset** **=** *layout-qualifier-value*

**xfb_stride** **=** *layout-qualifier-value*

Any shader making any static use (after preprocessing) of any of these
**xfb_** qualifiers will cause the shader to be in a transform feedback
capturing mode and hence responsible for describing the transform feedback
setup.
This mode will capture any output selected by **xfb_offset**, directly or
indirectly, to a transform feedback buffer.

The **xfb_buffer** qualifier specifies which transform feedback buffer will
capture outputs selected with **xfb_offset**.
The **xfb_buffer** qualifier can be applied to the qualifier **out**, to output
variables, to output blocks, and to output block members.
Shaders in the transform feedback capturing mode have an initial global
default of

layout(xfb_buffer = 0) out;

This default can be changed by declaring a different buffer with
**xfb_buffer** on the interface qualifier **out**.
This is the only way the global default can be changed.
When a variable or output block is declared without an **xfb_buffer**
qualifier, it inherits the global default buffer.
When a variable or output block is declared with an **xfb_buffer** qualifier,
it has that declared buffer.
All members of a block inherit the block’s buffer.
A member is allowed to declare an **xfb_buffer**, but it must match the buffer
inherited from its block, or a compile-time error results.

layout(xfb_buffer=2, xfb_offset=0) out block { // block's buffer is 2
    layout(xfb_buffer = 2) vec4 v; // okay, matches the inherited 2
    layout(xfb_buffer = 3) vec4 u; // ERROR, mismatched buffer
    vec4 w; // inherited
};
layout(xfb_offset=16) out vec4 t;  // initial default is buffer 0
layout(xfb_buffer=1) out;          // new global default of 1
out block {                        // block has buffer 1
    vec4 x;                        // x has buffer 1 (not captured)
    layout(xfb_buffer = 1) vec4 y; // okay (not captured)
    layout(xfb_buffer = 0) vec4 z; // ERROR, mismatched buffer
};
layout(xfb_offset=0) out vec4 g;   // g has buffer 1
layout(xfb_buffer=2) out vec4 h;   // does not change global default
layout(xfb_offset=16) out vec4 j;  // j has buffer 1

Note this means all members of a block that go to a transform feedback
buffer will go to the same buffer.

When a block is declared as an array, all members of block array-element 0
are captured, as previously described, by the declared or inherited
**xfb_buffer**.
Generally, an array of size *N* of blocks is captured by *N* consecutive
buffers, with all members of block array-element *E* captured by buffer *B*,
where *B* equals the declared or inherited **xfb_buffer** plus *E*.

It is a compile-time or link-time error to specify an **xfb_buffer**,
including any additional buffers needed to capture an arrays of blocks, that
is less than zero or greater than or equal to the implementation-dependent
constant *gl_MaxTransformFeedbackBuffers*.

The **xfb_offset** qualifier assigns a byte offset within a transform feedback
buffer.
Only variables, block members, or blocks can be qualified with **xfb_offset**.
If a block is qualified with **xfb_offset**, all its members are assigned
transform feedback buffer offsets.
If a block is not qualified with **xfb_offset**, any members of that block not
qualified with an **xfb_offset** will not be assigned transform feedback
buffer offsets.
Only variables and block members that are assigned offsets will be captured
(thus, a proper subset of a block can be captured).
Each time such a variable or block member is written in a shader, the
written value is captured at the assigned offset.
If such a block member or variable is not written during a shader
invocation, the buffer contents at the assigned offset will be undefined.
Even if there are no static writes to a variable or member that is assigned
a transform feedback offset, the space is still allocated in the buffer and
still affects the stride.

Variables and block members qualified with **xfb_offset** can be scalars,
vectors, matrices, structures, and (sized) arrays of these.
The offset must be a multiple of the size of the first component of the
first qualified variable or block member, or a compile-time error results.
Further, if applied to an aggregate containing a **double**, the offset must
also be a multiple of 8, and the space taken in the buffer will be a
multiple of 8.
The given offset applies to the first component of the first member of the
qualified entity.
Then, within the qualified entity, subsequent components are each assigned,
in order, to the next available offset aligned to a multiple of that
component’s size.
Aggregate types are flattened down to the component level to get this
sequence of components.
It is a compile-time error to apply **xfb_offset** to the declaration of an
unsized array.

No aliasing in output buffers is allowed: It is a compile-time or link-time
error to specify variables with overlapping transform feedback offsets.

The **xfb_stride** qualifier specifies how many bytes are consumed by each
captured vertex.
It applies to the transform feedback buffer for that declaration, whether it
is inherited or explicitly declared.
It can be applied to variables, blocks, block members, or just the qualifier
**out**.
If the buffer is capturing any outputs with double-precision components, the
stride must be a multiple of 8, otherwise it must be a multiple of 4, or a
compile-time or link-time error results.
It is a compile-time or link-time error to have any **xfb_offset** that
overflows **xfb_stride**, whether stated on declarations before or after the
**xfb_stride**, or in different compilation units.
While **xfb_stride** can be declared multiple times for the same buffer, it is
a compile-time or link-time error to have different values specified for the
stride for the same buffer.

For example:

// buffer 1 has 32-byte stride
layout(xfb_buffer = 1, xfb_stride = 32) out;

// same as previous example; order within layout does not matter
layout(xfb_stride = 32, xfb_buffer = 1) out;

// everything in this block goes to buffer 0
layout(xfb_buffer = 0, xfb_stride = 32) out block1 {
    layout(xfb_offset = 0) vec4 a;  // a goes to byte offset 0 of buffer 0
    layout(xfb_offset = 16) vec4 b; // b goes to offset 16 of buffer 0
};

layout(xfb_buffer = 3, xfb_offset = 12) out block2 {
    vec4 v;  // v will be written to byte offsets 12 through 27 of buffer
    float u; // u will be written to offset 28
    layout(xfb_offset = 40) vec4 w;
    vec4 x;  // x will be written to offset 56, the next available offset
};

layout(xfb_buffer = 2, xfb_stride = 32) out block3 {
    layout(xfb_offset = 12) vec3 c;
    layout(xfb_offset = 24) vec3 d; // ERROR, requires stride of 36
    layout(xfb_offset = 0) vec3 g;  // okay, increasing order not required
};

When no **xfb_stride** is specified for a buffer, the stride of the buffer
will be the smallest needed to hold the variable placed at the highest
offset, including any required padding.
For example:

// if there no other declarations for buffer 3, it has stride 32
layout(xfb_buffer = 3) out block4 {
    layout(xfb_offset = 0) vec4 e;
    layout(xfb_offset = 16) vec4 f;
};

The resulting stride (implicit or explicit), when divided by 4, must be less
than or equal to the implementation-dependent constant
*gl_MaxTransformFeedbackInterleavedComponents*.

Other than for the transform feedback layout qualifiers, tessellation
control shaders allow output layout qualifiers only on the interface
qualifier **out**, not on an output block, block member, or variable
declaration.
The output layout qualifier identifiers allowed for tessellation control
shaders are:

*layout-qualifier-id* : 

**vertices** **=** *layout-qualifier-value*

The identifier **vertices** specifies the number of vertices in the output
patch produced by the tessellation control shader, which also specifies the
number of times the tessellation control shader is invoked.
It is a compile- or link-time error for the output vertex count to be less
than or equal to zero, or greater than the implementation-dependent maximum
patch size.

The intrinsically declared tessellation control output array *gl_out[]* will
also be sized by any output layout declaration.
Hence, the expression

gl_out.length()

will return the output patch vertex count specified in a previous output
layout qualifier.
For outputs declared without an array size, including intrinsically declared
outputs (i.e., *gl_out*), a layout must be declared before any use of the
method **length**() or other array use that requires its size to be known.

It is a compile-time error if the output patch vertex count specified in an
output layout qualifier does not match the array size specified in any
output variable declaration in the same shader.

All tessellation control shader layout declarations in a program must
specify the same output patch vertex count.
There must be at least one layout qualifier specifying an output patch
vertex count in any program containing tessellation control shaders;
however, such a declaration is not required in all tessellation control
shaders.

Geometry shaders can have three additional types of output layout
identifiers: an output *primitive type*, a maximum output *vertex count*,
and per-output *stream* numbers.
The primitive type and vertex count identifiers are allowed only on the
interface qualifier **out**, not on an output block, block member, or variable
declaration.
The stream identifier is allowed on the interface qualifier **out**, on output
blocks, and on variable declarations.

The layout qualifier identifiers for geometry shader outputs are

*layout-qualifier-id* : 

**points**

**line_strip**

**triangle_strip**

**max_vertices** **=** *layout-qualifier-value*

**stream** **=** *layout-qualifier-value*

The primitive type identifiers **points**, **line_strip**, and **triangle_strip**
are used to specify the type of output primitive produced by the geometry
shader, and only one of these is accepted.
At least one geometry shader (compilation unit) in a program must declare an
output primitive type, and all geometry shader output primitive type
declarations in a program must declare the same primitive type.
It is not required that all geometry shaders in a program declare an output
primitive type.

The vertex count identifier **max_vertices** is used to specify the maximum
number of vertices the shader will ever emit in a single invocation.
At least one geometry shader (compilation unit) in a program must declare a
maximum output vertex count, and all geometry shader output vertex count
declarations in a program must declare the same count.
It is not required that all geometry shaders in a program declare a count.

In this example,

layout(triangle_strip, max_vertices = 60) out; // order does not matter
layout(max_vertices = 60) out;  // redeclaration okay
layout(triangle_strip) out;     // redeclaration okay
layout(points) out;             // error, contradicts triangle_strip
layout(max_vertices = 30) out;  // error, contradicts 60

all outputs from the geometry shader are triangles and at most 60 vertices
will be emitted by the shader.
It is an error for the maximum number of vertices to be greater than
*gl_MaxGeometryOutputVertices*.

The identifier **stream** is used to specify that a geometry shader output
variable or block is associated with a particular vertex stream (numbered
beginning with zero).
A default stream number may be declared at global scope by qualifying
interface qualifier **out** as in this example:

layout(stream = 1) out;

The stream number specified in such a declaration replaces any previous
default and applies to all subsequent block and variable declarations until
a new default is established.
The initial default stream number is zero.

Each output block or non-block output variable is associated with a vertex
stream.
If the block or variable is declared with the stream identifier, it is
associated with the specified stream; otherwise, it is associated with the
current default stream.
A block member may be declared with a stream identifier, but the specified
stream must match the stream associated with the containing block.
One example:

layout(stream=1) out;           // default is now stream 1
out vec4 var1;                  // var1 gets default stream (1)
layout(stream=2) out Block1 {   // "Block1" belongs to stream 2
    layout(stream=2) vec4 var2; // redundant block member stream decl
    layout(stream=3) vec2 var3; // ILLEGAL (must match block stream)
    vec3 var4;                  // belongs to stream 2
};
layout(stream=0) out;           // default is now stream 0
out vec4 var5;                  // var5 gets default stream (0)
out Block2 {                    // "Block2" gets default stream (0)
    vec4 var6;
};
layout(stream=3) out vec4 var7; // var7 belongs to stream 3

Each vertex emitted by the geometry shader is assigned to a specific stream,
and the attributes of the emitted vertex are taken from the set of output
blocks and variables assigned to the targeted stream.
After each vertex is emitted, the values of all output variables become
undefined.
Additionally, the output variables associated with each vertex stream may
share storage.
Writing to an output variable associated with one stream may overwrite
output variables associated with any other stream.
When emitting each vertex, a geometry shader should write to all outputs
associated with the stream to which the vertex will be emitted and to no
outputs associated with any other stream.

If a geometry shader output block or variable is declared more than once,
all such declarations must associate the variable with the same vertex
stream.
If any stream declaration specifies a non-existent stream number, the shader
will fail to compile.

Built-in geometry shader outputs are always associated with vertex stream
zero.

All geometry shader output layout declarations in a program must declare the
same layout and same value for **max_vertices**.
If geometry shaders are in a program, there must be at least one geometry
output layout declaration somewhere in that
program, but not all geometry
shaders (compilation units) are required to declare it.

The built-in fragment shader variable *gl_FragDepth* may be redeclared using
one of the following layout qualifiers.

*layout-qualifier-id* : 

**depth_any**

**depth_greater**

**depth_less**

**depth_unchanged**

The layout qualifier for *gl_FragDepth* constrains intentions of the final
value of *gl_FragDepth* written by any shader invocation.
GL implementations are allowed to perform optimizations assuming that the
depth test fails (or passes) for a given fragment if all values of
*gl_FragDepth* consistent with the layout qualifier would fail (or pass).
This potentially includes skipping shader execution if the fragment is
discarded because it is occluded and the shader has no side effects.
If the final value of *gl_FragDepth* is inconsistent with its layout
qualifier, the result of the depth test for the corresponding fragment is
undefined.
However, no error will be generated in this case.
If the depth test passes and depth writes are enabled, the value written to
the depth buffer is always the value of *gl_FragDepth*, whether or not it is
consistent with the layout qualifier.

By default, *gl_FragDepth* is qualified as *depth_any*.
When the layout qualifier for *gl_FragDepth* is *depth_any*, the shader
compiler will note any assignment to *gl_FragDepth* modifying it in an
unknown way, and depth testing will always be performed after the shader has
executed.
When the layout qualifier is *depth_greater*, the GL can assume that the
final value of *gl_FragDepth* is greater than or equal to the fragment’s
interpolated depth value, as given by the *z* component of *gl_FragCoord*.
When the layout qualifier is *depth_less*, the GL can assume that any
modification of *gl_FragDepth* will only decrease its value.
When the layout qualifier is *depth_unchanged*, the shader compiler will
honor any modification to *gl_FragDepth*, but the rest of the GL can assume
that *gl_FragDepth* is not assigned a new value.

Redeclarations of *gl_FragDepth* are performed as follows:

// redeclaration that changes nothing is allowed
out float gl_FragDepth;

// assume it may be modified in any way
layout(depth_any) out float gl_FragDepth;

// assume it may be modified such that its value will only increase
layout(depth_greater) out float gl_FragDepth;

// assume it may be modified such that its value will only decrease
layout(depth_less) out float gl_FragDepth;

// assume it will not be modified
layout(depth_unchanged) out float gl_FragDepth;

If *gl_FragDepth* is redeclared in any fragment shader in a program, it must
be redeclared in all fragment shaders in that program that have static
assignments to *gl_FragDepth*.
All redeclarations of *gl_FragDepth* in all fragment shaders in a single
program must have the same set of qualifiers.
Within any shader, the first redeclarations of *gl_FragDepth* must appear
before any use of *gl_FragDepth*.
The built-in *gl_FragDepth* is only predeclared in fragment shaders, so
redeclaring it in any other shader language results in a compile-time error.

Layout qualifiers can be used for uniform variables and subroutine uniforms.
The layout qualifier identifiers for uniform variables and subroutine
uniforms are:

*layout-qualifier-id* : 

**location** **=** *layout-qualifier-value*

The location identifier can be used with default-block uniform variables and
subroutine uniforms.
The location specifies the location by which the API can reference
the uniform and update its value.
Individual elements of a uniform array are assigned consecutive locations
with the first element taking location **location**.
Default-block uniform variable declarations sharing the same location
linked in the program have to match by name, type, qualifiers and arrayness.
For arrays their array dimensionality and array sizes must match.
For structs this rule applies recursively to all members.
No two subroutine uniform variables can have the same location in the same
shader stage, otherwise a compile-time or link-time error will be generated.
Valid locations for default-block uniform variable locations are in the
range of 0 to the implementation-defined maximum number of uniform locations
minus one.
Valid locations for subroutine uniforms are in the range of 0 to the
implementation-defined per-stage maximum number of subroutine uniform
locations minus one.

Locations can be assigned to default-block uniform arrays and structures.
The first inner-most scalar, vector or matrix member or element takes the
specified **location** and the compiler assigns the next inner-most member or
element the next incremental location value.
Each subsequent inner-most member or element gets incremental locations for
the entire structure or array.
This rule applies to nested structures and arrays and gives each inner-most
scalar, vector, or matrix member a unique location.
For arrays without an explicit size, the size is calculated based on its
static usage.
When the linker generates locations for uniforms without an explicit
location, it assumes for all uniforms with an explicit location all their
array elements and structure members are used and the linker will not
generate a conflicting location, even if that element or member is deemed
unused.

When generating SPIR-V for API’s that accept individual (default block)
non-opaque uniform variables, it is a compile-time error to not
include a location when declaring them.

When targeting Vulkan, the **push_constant** qualifier is used to
declare an entire block, and represents a set of *push constants*, as defined
by the Vulkan API.
It is a compile-time error to apply this to anything other than a uniform block
declaration, or when not targeting Vulkan.
The values in the block will be initialized as per the Vulkan API specification.
A block declared with `layout(push_constant)` may optionally include an
*instance-name*.
There can be only one **push_constant** block per stage, or a compile-time or
link-time error will result.
A push-constant array can only be indexed with dynamically uniform indices.
Uniform blocks declared with **push_constant** use different resources
than those without; and are accounted for separately.

Layout qualifiers can be used for subroutine functions.
The layout qualifier identifiers for subroutine functions are:

*layout-qualifier-id* : 

**index** **=** *layout-qualifier-value*

Each subroutine with an index qualifier in the shader must be given a unique
index, otherwise a compile- or link-time error will be generated.
The indices must be in the range of 0 to the implementation defined maximum
number of subroutines minus one.
It is recommended, but not required, that the shader assigns a range of
tightly packed *index* values starting from zero so that the OpenGL
subroutine function enumeration API returns a non-empty name for all active
indices.

Layout qualifiers can be used for uniform and shader storage blocks, but not
for non-block uniform declarations.
The layout qualifier identifiers (and **shared** keyword) for uniform and
shader storage blocks are:

*layout-qualifier-id* : 

**shared**

**packed**

**std140**

**std430**

**row_major**

**column_major**

**binding** **=** *layout-qualifier-value*

**offset** **=** *layout-qualifier-value*

**align** **=** *layout-qualifier-value*

None of these have any semantic effect at all on the usage of the variables
being declared; they only describe how data is laid out in memory.
For example, matrix semantics are always column-based, as described in the
rest of this specification, no matter what layout qualifiers are being used.

Uniform and shader storage block layout qualifiers can be declared for
global scope, on a single uniform or shader storage block, or on a single
block member declaration.

Default layouts are established at global scope for uniform blocks as:

layout(layout-qualifier-id-list) uniform;

and for shader storage blocks as:

layout(layout-qualifier-id-list) buffer;

When this is done, the previous default qualification is first inherited and
then overridden as per the override rules listed below for each qualifier
listed in the declaration.
The result becomes the new default qualification scoped to subsequent
uniform or shader storage block definitions.

The initial state of compilation when generating SPIR-V is as if the
following were declared:

layout(std140, column_major) uniform;
layout(std430, column_major) buffer;

However, when **push_constant** is declared, the default layout of the
buffer will be **std430**. There is no method to globally set this default.

The initial state of compilation when not generating SPIR-V is as if the
following were declared:

layout(shared, column_major) uniform;
layout(shared, column_major) buffer;

Uniform and shader storage blocks can be declared with optional layout
qualifiers, and so can their individual member declarations.
Such block layout qualification is scoped only to the content of the block.
As with global layout declarations, block layout qualification first
inherits from the current default qualification and then overrides it.
Similarly, individual member layout qualification is scoped just to the
member declaration, and inherits from and overrides the block’s
qualification.

The **shared** qualifier overrides only the **std140**, **std430**, and **packed**
qualifiers; other qualifiers are inherited.
The compiler/linker will ensure that multiple programs and programmable
stages containing this definition will share the same memory layout for this
block, as long as all arrays are declared with explicit sizes and all
matrices have matching **row_major** and/or **column_major** qualifications
(which may come from a declaration outside the block definition).
This allows use of the same buffer to back the same block definition across
different programs.
It is a compile-time error to use the **shared** qualifier when generating
SPIR-V.

The **packed** qualifier overrides only **std140**, **std430**, and **shared**;
other qualifiers are inherited.
When **packed** is used, no shareable layout is guaranteed.
The compiler and linker can optimize memory use based on what variables
actively get used and on other criteria.
Offsets must be queried, as there is no other way of guaranteeing where (and
which) variables reside within the block.

It is a link-time error to access the same packed uniform or shader storage
block in multiple stages within a program.
Attempts to access the same packed uniform or shader storage block across
programs can result in conflicting member offsets and in undefined values
being read.
However, implementations may aid application management of packed blocks by
using canonical layouts for packed blocks.
It is a compile-time error to use the **packed** qualifier when generating
SPIR-V.

The **std140** and **std430** qualifiers override only the **packed**, **shared**,
**std140**, and **std430** qualifiers; other qualifiers are inherited.
The **std430** qualifier is supported only for shader storage blocks; a shader
using the **std430** qualifier on a uniform block will result in
a compile-time error, unless it is also declared with **push_constant**.

The layout is explicitly determined by this, as described in section 7.6.2.2
“Standard Uniform Block Layout” of the [OpenGL Specification](references.html#references).
Hence, as in **shared** above, the resulting layout is shareable across
programs.

Layout qualifiers on member declarations cannot use the **shared**, **packed**,
**std140**, or **std430** qualifiers.
These can only be used at global scope (without an object) or on a block
declaration, or a compile-time error results.

The **row_major** and **column_major** qualifiers only affect the layout of
matrices, including all matrices contained in structures and arrays they are
applied to, to all depths of nesting.
These qualifiers can be applied to other types, but will have no effect.

The **row_major** qualifier overrides only the **column_major** qualifier; other
qualifiers are inherited.
Elements within a matrix row will be contiguous in memory.

The **column_major** qualifier overrides only the **row_major** qualifier; other
qualifiers are inherited.
Elements within a matrix column will be contiguous in memory.

The **binding** qualifier specifies the uniform buffer binding point
corresponding to the uniform or shader storage block, which will be used to
obtain the values of the member variables of the block.
It is a compile-time error to specify the **binding** qualifier for the global
scope or for block member declarations.
Any uniform or shader storage block declared without a **binding** qualifier
is initially assigned to block binding point zero.
After a program is linked, the binding points used for uniform
and shader storage blocks
declared with or without a **binding** qualifier can be updated
by the API.

When used with OpenGL,
if the **binding** qualifier is used with a uniform block or shader storage
block instanced as an array, the first element of the array takes the
specified block binding and each subsequent element takes the next
consecutive binding point.
For an array of arrays, each element (e.g. 6 elements for a[2][3]) gets a
binding point, and they are ordered per the array of array ordering
described in “[Arrays.](#arrays)”

When targeting Vulkan,
if the **binding** qualifier is used with a uniform block or buffer block
instanced as an array, the entire array takes only the provided binding
number.
The next consecutive binding number is available for a different
object.
For an array of arrays, descriptor set array element numbers used
in descriptor set accesses are ordered per the array-of-array ordering
described in “[Arrays.](#arrays)”

If the binding point for any uniform or shader storage block instance is
less than zero, or greater than or equal to the corresponding
implementation-dependent maximum number of buffer bindings, a compile-time
error will occur.
When the **binding** qualifier is used with a uniform or shader storage block
instanced as an array of size *N*, all elements of the array from **binding**
through *binding + N - 1* must be within this range.
It is a compile-time or link-time error to use the same binding number for
more than one uniform block or for more than one buffer block.

The **set** qualifier is only available when targeting Vulkan.
It specifies the descriptor set this object belongs to.
It is a compile-time error to apply **set** to a standalone qualifier, to
a member of a block, or when not targeting an API that supports descriptor sets.
It is a compile-time error to apply **set** to a block qualified as **push_constant**.
By default, any non-push-constant uniform or shader storage block declared
without a **set** identifier is assigned to descriptor set 0.
Similarly, any sampler, texture, or subpass-input type declared as a uniform
without a **set** identifier is also assigned to descriptor set 0.

If applied to an object declared as an array, all elements of the array
belong to the specified **set**.

When generating SPIR-V, it is a compile-time error for either the **set** or
**binding** value to exceed a front-end-configuration supplied maximum value.

When multiple arguments are listed in a **layout** declaration, the effect
will be the same as if they were declared one at a time, in order from left
to right, each in turn inheriting from and overriding the result from the
previous qualification.

For example

layout(row_major, column_major)

results in the qualification being **column_major**.
Other examples:

layout(shared, row_major) uniform; // default is now shared and row_major

layout(std140) uniform Transform { // layout of this block is std140
    mat4 M1;                       // row major
    layout(column_major) mat4 M2;  // column major
    mat3 N1;                       // row major
};

uniform T2 {                       // layout of this block is shared
    ...
};

layout(column_major) uniform T3 {  // shared and column major
    mat4 M3;                       // column major
    layout(row_major) mat4 m4;     // row major
    mat3 N2;                       // column major
};

When targeting Vulkan, the **offset** and **align** qualifiers for blocks and
block members can only be used with **uniform** and **buffer** blocks.
When not targeting Vulkan, they can only be used with blocks declared with
**std140** or **std430** layouts.

The **offset** qualifier can only be used on block members.
The **offset** qualifier forces the qualified member to start at or after the
specified *layout-qualifier-value*, which will be its byte offset from
the beginning of the buffer.
It is a compile-time error to have any offset, explicit or assigned, that
lies within another member of the block.
When not generating SPIR-V, it is a compile-time error to specify an offset
that is smaller than the offset of the previous member in the block.
Two blocks linked together in the same program with the same block name must
have the exact same set of members qualified with **offset** and their
*layout-qualifier-value* values must be the same, or a link-time error
results.
The specified offset must be a multiple of the base alignment of the type of
the block member it qualifies, or a compile-time error results.

The **align** qualifier makes the start of each block member have a minimum
byte alignment.
It does not affect the internal layout within each member, which will still
follow the **std140** or **std430** rules.
The specified alignment must be greater than 0 and a power of 2, or a
compile-time error results.

The *actual alignment* of a member will be the greater of the specified
**align** alignment and the standard (e.g. **std140**) base alignment for the
member’s type.
The *actual offset* of a member is computed as follows: If **offset** was
declared, start with that offset, otherwise start with the offset immediately
following the preceding member (in declaration order).
If the resulting offset is not a multiple of the *actual alignment*,
increase it to the first offset that is a multiple of the *actual
alignment*.
This results in the *actual offset* the member will have.

When **align** is applied to an array, it affects only the start of the array,
not the array’s internal stride.
Both an **offset** and an **align** qualifier can be specified on a declaration.

The **align** qualifier, when used on a block, has the same effect as
qualifying each member with the same **align** value as declared on the block,
and gets the same compile-time results and errors as if this had been done.
As described in general earlier, an individual member can specify its own
**align**, which overrides the block-level **align**, but just for that member.

Examples:

layout(std140) uniform block {
 vec4 a;                         // a takes offsets 0-15
 layout(offset = 32) vec3 b;     // b takes offsets 32-43
 layout(offset = 40) vec2 c;     // ERROR, lies within previous member
 layout(offset = 48) vec2 d;     // d takes offsets 48-55
 layout(align = 16) float e;     // e takes offsets 64-67
 layout(align = 2) double f;     // f takes offsets 72-79
 layout(align = 6) double g;     // ERROR, 6 is not a power of 2
 layout(offset = 80) float h;    // h takes offsets 80-83
 layout(align = 64) dvec3 i;     // i takes offsets 128-151
 layout(offset = 164, align = 8)
 float j;                        // j takes offsets 168-171
};

Opaque uniform variables can take the uniform layout qualifier for binding:

*layout-qualifier-id* : 

**binding** **=** *layout-qualifier-value*

The **binding** qualifier specifies the point where the variable will be bound.
Any opaque variable declared without a binding qualifier has a default binding
of zero.

When used with OpenGL,
if the **binding** qualifier is used with an array, the first element of the
array takes the specified binding point and each subsequent element takes the
next consecutive binding point.
For an array of arrays, each element (e.g. 6 elements for a[2][3]) gets a
binding point, and they are ordered per the array of array ordering
described in “[Arrays.](#arrays)”

When targeting Vulkan,
if the **binding** qualifier is used with an array, the entire array
takes only the provided binding number. The next consecutive binding
number is available for a different object.

If the **binding** is less than zero, or greater than or equal to the
implementation-dependent maximum supported number of binding points,
a compile-time error will occur.
When the **binding** qualifier is used with an array of size *N*, all elements
of the array from **binding** through *binding + N - 1* must be within this
range.
It is a compile-time or link-time error to use the same **binding** number for
more than one atomic counter, unless the *offset* for the atomic counters
sharing the same binding are all different.

A link-time error will result if two shaders in a program specify different
*layout-qualifier-value* bindings for the same opaque-uniform name.
However, it is not an error to specify a binding on some but not all
declarations for the same name, as shown in the examples below.

// in one shader...
layout(binding=3) uniform sampler2D s; // s bound to point 3

// in another shader...
uniform sampler2D s;                   // okay, s still bound at 3

// in another shader...
layout(binding=4) uniform sampler2D s; // ERROR: contradictory bindings

Atomic counters are not available when targeting Vulkan.

Atomic counter layout qualifiers can be used on atomic counter declarations or
at global scope to establish defaults.
The atomic counter qualifiers are:

*layout-qualifier-id* : 

**binding** **=** *layout-qualifier-value*

**offset** **=** *layout-qualifier-value*

Each binding has a default offset that is initially 0 and is updated following
each declaration containing the type **atomic_uint**. If such a declaration does
not declare a variable then it establishes a default for the named binding. It
is a compile-time error if any such declaration does not include a *binding*
layout qualifier.

If a declaration contains an *offset* qualifier then that offset is used in the
declaration, otherwise the default offset for the named binding is used. Each
atomic counter that is declared is assigned to the named buffer binding point,
at the current offset, and then the offset is increased by 4. Arrays of atomic
counters assign one such offset to each member, and if multiple variables are
declared in the same statement then they will have offsets assigned in order
from left to right. Having assigned offsets to variables, if any, the
binding’s default offset will be set to the current offset value.

For example,

layout(binding = 2, offset = 4) uniform atomic_uint a;

will establish that the opaque handle to the atomic counter *a* will be
bound to atomic counter buffer binding point 2 at an offset of 4 basic
machine units into that buffer.
The default *offset* for binding point 2 will be post incremented by 4 (the
size of an atomic counter).

It is a compile-time error to bind an atomic counter with a binding value
greater than or equal to *gl_MaxAtomicCounterBindings*.
It is a compile-time error to declare an atomic counter whose offset is such
that the buffer containing it would be larger than *gl_MaxAtomicCounterBufferSize*.
It is a compile-time error to declare an atomic counter whose offset is not
aligned to a multiple of 4.
It is a compile-time error to declare an unsized array of **atomic_uint**.
It is a compile- or link-time error to declare two atomic counters with the same
binding and the same offset.

Examples of atomic declarations:

layout(binding = 2, offset = 4)  uniform atomic_uint;      // Sets binding's default
                                                           // offset = 4
layout(binding = 2)              uniform atomic_uint a;    // offset 4
layout(binding = 2)              uniform atomic_uint b;    // offset 8
layout(binding = 3)              uniform atomic_uint c[2]; // offsets 0, 4
layout(binding = 2)              uniform atomic_uint d;    // offset 12
layout(binding = 4, offset = 16) uniform atomic_uint e;    // offset 16
layout(binding = 4)              uniform atomic_uint f;    // offset 20

layout(offset = 8)              uniform atomic_uint ea;  // error, no binding
                                                         // specified
layout(binding = 2, offset = 6) uniform atomic_uint eb;  // error, offset not aligned
layout(binding = 3, offset = 4) uniform atomic_uint ec;  // error, overlaps c[1]
layout(binding = 3, offset = 4) uniform atomic_uint;     // OK, no counter declared
layout(binding = 3)             uniform atomic_uint ed;  // error, overlaps c[1]

Format layout qualifiers can be used on image variable declarations (those
declared with a basic type having “**image**” in its keyword).
The format layout qualifier identifiers for image variable declarations are:

*layout-qualifier-id* : 

*float-image-format-qualifier*

*int-image-format-qualifier*

*uint-image-format-qualifier*

**binding** **=** *layout-qualifier-value*

*float-image-format-qualifier* : 

**rgba32f**

**rgba16f**

**rg32f**

**rg16f**

**r11f_g11f_b10f**

**r32f**

**r16f**

**rgba16**

**rgb10_a2**

**rgba8**

**rg16**

**rg8**

**r16**

**r8**

**rgba16_snorm**

**rgba8_snorm**

**rg16_snorm**

**rg8_snorm**

**r16_snorm**

**r8_snorm**

*int-image-format-qualifier* : 

**rgba32i**

**rgba16i**

**rgba8i**

**rg32i**

**rg16i**

**rg8i**

**r32i**

**r16i**

**r8i**

*uint-image-format-qualifier* : 

**rgba32ui**

**rgba16ui**

**rgb10_a2ui**

**rgba8ui**

**rg32ui**

**rg16ui**

**rg8ui**

**r32ui**

**r16ui**

**r8ui**

A format layout qualifier specifies the image format associated with a
declared image variable.
Only one format qualifier may be specified for any image variable
declaration.
For image variables with floating-point component types (keywords starting
with “**image**”), signed integer component types (keywords starting with
“**iimage**”), or unsigned integer component types (keywords starting with
“**uimage**”), the format qualifier used must match the
*float-image-format-qualifier*, *int-image-format-qualifier*, or
*uint-image-format-qualifier* grammar rules, respectively.
It is a compile-time error to declare an image variable where the format
qualifier does not match the image variable type.

Any image variable used for image loads or atomic operations must specify a
format layout qualifier; it is a compile-time error to pass an image uniform
variable or function parameter declared without a format layout qualifier to
an image load or atomic function.

Uniforms not qualified with **writeonly** must have a format layout qualifier.
Note that an image variable passed to a function for read access cannot be
declared as **writeonly** and hence must have been declared with a format
layout qualifier.

The **binding** qualifier was described in
“[Opaque Uniform Layout Qualifiers](#opaque-uniform-layout-qualifiers)”.

Subpass inputs are only available when targeting Vulkan.

Subpass inputs are declared with the basic **subpassInput** types.
They must be declared with the layout qualifier
**input_attachment_index**, or a compile-time error results.
For example:

layout(input_attachment_index = 2) uniform subpassInput t;

This selects which subpass input is being read from. The value assigned
to **input_attachment_index**, say *i* (`input_attachment_index = i`), selects
that entry (*i* th entry) in the input list for the pass.  See the API
documentation for more detail about passes and the input list.

If an array of size *N* is declared, it consumes *N* consecutive
**input_attachment_index** values, starting with the one provided.

It is a compile-time or link-time error to have different variables
declared with the same **input_attachment_index**.
This includes any overlap in the implicit **input_attachment_index** consumed by
array declarations.

It is a compile-time error if the value assigned to an **input_attachment_index**
is greater than or equal to *gl_MaxInputAttachments*.

Inputs and outputs that could be interpolated can be further qualified by at
most one of the following interpolation qualifiers:

| Qualifier | Meaning |
| --- | --- |
| **smooth** | perspective correct interpolation |
| **flat** | no interpolation |
| **noperspective** | linear interpolation |

The presence of and type of interpolation is controlled by the above
interpolation qualifiers as well as the auxiliary storage qualifiers
**centroid** and **sample**.
When no interpolation qualifier is present, smooth interpolation is used.
It is a compile-time error to use more than one interpolation qualifier.
The auxiliary storage qualifier **patch** is not used for interpolation; it is
a compile-time error to use interpolation qualifiers with **patch**.

A variable qualified as **flat** will not be interpolated.
Instead, it will have the same value for every fragment within a primitive.
This value will come from a single provoking vertex, as described by the
[API](references.html#references).
A variable qualified as **flat** may also be qualified as **centroid** or
**sample**, which will mean the same thing as qualifying it only as **flat**.

A variable qualified as **smooth** will be interpolated in a
perspective-correct manner over the primitive being rendered.
Interpolation in a perspective correct manner is specified in equation 14.7
of the [OpenGL Specification](references.html#references), section 14.5 “Line Segments”.

A variable qualified as **noperspective** must be interpolated linearly in
screen space, as described in equation 3.7 of the [OpenGL Specification](references.html#references),
section 3.5 “Line Segments”.

When multisample rasterization is disabled, or for fragment shader input
variables qualified with neither **centroid** nor **sample**, the value of the
assigned variable may be interpolated anywhere within the pixel and a single
value may be assigned to each sample within the pixel, to the extent
permitted by the [OpenGL Specification](references.html#references).

When multisample rasterization is enabled, **centroid** and **sample** may be
used to control the location and frequency of the sampling of the qualified
fragment shader input.
If a fragment shader input is qualified with **centroid**, a single value may
be assigned to that variable for all samples in the pixel, but that value
must be interpolated at a location that lies in both the pixel and in the
primitive being rendered, including any of the pixel’s samples covered by
the primitive.
Because the location at which the variable is interpolated may be different
in neighboring pixels, and derivatives may be computed by computing
differences between neighboring pixels, derivatives of centroid-sampled
inputs may be less accurate than those for non-centroid interpolated
variables.
If a fragment shader input is qualified with **sample**, a separate value must
be assigned to that variable for each covered sample in the pixel, and that
value must be sampled at the location of the individual sample.

It is a link-time error if, within the same stage, the interpolation
qualifiers of variables of the same name do not match.

The following predeclared variables can be redeclared with an interpolation
qualifier when using the compatibility profile:

Vertex, tessellation control, tessellation evaluation, and geometry
languages:

gl_FrontColor
gl_BackColor
gl_FrontSecondaryColor
gl_BackSecondaryColor

Fragment language:

gl_Color
gl_SecondaryColor

For example,

in vec4 gl_Color;            // predeclared by the fragment language
flat in vec4 gl_Color;       // redeclared by user to be flat
flat in vec4 gl_FrontColor;  // input to geometry shader, no "gl_in[]"
flat out vec4 gl_FrontColor; // output from geometry shader

Ideally, these are redeclared as part of the redeclaration of an interface
block, as described in
“[Compatibility Profile Built-In Language Variables](builtins.html#compatibility-profile-built-in-language-variables)”.
However, for the above purpose, they can be redeclared as individual
variables at global scope, outside an interface block.
Such redeclarations also allow adding the transform-feedback qualifiers
**xfb_buffer**, **xfb_stride**, and **xfb_offset** to output variables.
(Using **xfb_buffer** on a variable does not change the global default
buffer.) A compile-time error will result if a shader has both an interface
block redeclaration and a separate redeclaration of a member of that
interface block outside the interface block redeclaration.

If *gl_Color* is redeclared with an interpolation qualifier, then
*gl_FrontColor* and *gl_BackColor* (if they are written to) must also be
redeclared with the same interpolation qualifier, and vice versa.
If *gl_SecondaryColor* is redeclared with an interpolation qualifier, then
*gl_FrontSecondaryColor* and _gl_BackSecondaryColor _(if they are written
to) must also be redeclared with the same interpolation qualifier, and vice
versa.
This qualifier matching on predeclared variables is only required for
variables that are statically used within the shaders in a program.

In addition to precision qualifiers and memory qualifiers, parameters can
have these parameter qualifiers.

| Qualifier | Meaning |
| --- | --- |
|  | same as **in** |
| **const** | for function parameters that cannot be written to |
| **in** | for function parameters passed into a function |
| **out** | for function parameters passed back out of a function,
                   but not initialized for use when passed in |
| **inout** | for function parameters passed both into and out of a
                   function |

Parameter qualifiers are discussed in more detail in
“[Function Calling Conventions](statements.html#function-calling-conventions)”.

When not targeting Vulkan:
Precision qualifiers are added for code portability with OpenGL ES, not for
functionality.
They have the same syntax as in OpenGL ES, as described below, but they have
no semantic meaning, which includes no effect on the precision used to store
or operate on variables.
If an extension adds in the same semantics and functionality in the OpenGL
ES 2.0 specification for precision qualifiers, then the extension is allowed
to reuse the keywords below for that purpose.

When targeting Vulkan:
For interface matching, uniform variables and uniform and buffer block
members must have the same precision qualification.
Global variables declared in different compilation units linked into the
same shader stage must be declared with the same precision qualification.

For the purposes of determining if an output from one shader stage matches
an input of the next stage, the precision qualifier need not match.

This specification only governs the minimum required precision for storage and
operations on values.
Implementations are free to calculate and/or store any results at higher
precisions.
If necessary, this variance can be controlled using the invariance qualifier.

The precision of **highp**
single- and double-precision
floating-point variables is defined by the IEEE 754 standard for
32-bit
and 64-bit
floating-point numbers.

This includes support for NaNs (Not a Number) and Infs (positive or negative
infinities) and positive and negative zeros.

The following rules apply to **highp**
for both single and double-precision
operations:
Signed infinities and zeros are generated as dictated by IEEE, but subject
to the precisions allowed in the following table.
Any subnormal (denormalized) value input into a shader or potentially
generated by any operation in a shader can be flushed to 0.
The rounding mode cannot be set and is undefined but must not affect the
result by more than 1 ULP.
NaNs are not required to be generated.
Support for signaling NaNs is not required and exceptions are never raised.
Operations including built-in functions that operate on a NaN are not
required to return a NaN as the result.
However if NaNs are generated, **isnan**() must return the correct value.

Precisions are expressed in terms of maximum relative error in units of ULP
(units in the last place), unless otherwise noted.

For single precision operations, precisions are required as follows:

| Operation | Precision |
| --- | --- |
| *a* + *b*, *a* - *b*, *a* * *b* | Correctly rounded. |
| , >= | Correct result. |
| *a* / *b*, 1.0 / *b* | 2.5 ULP for \|b\| in the range [2-126, 2126]. |
| *a* * *b* + *c* | Correctly rounded single operation or
                                    sequence of two correctly rounded operations. |
| **fma**() | Inherited from *a* * *b* + *c*. |
| **pow**(*x*, *y*) | Inherited from **exp2**(*y* * **log2**(*x*)). |
| **exp**(*x*), **exp2**(*x*) | (3 + 2 ⋅ \|x\|) ULP. |
| **log**(), **log2**() | 3 ULP outside the range [0.5,2.0].

                                    Absolute error -21 inside the range
                                    [0.5,2.0]. |
| **sqrt**() | Inherited from 1.0 / **inversesqrt**(). |
| **inversesqrt**() | 2 ULP. |
| implicit and explicit
  conversions between types | Correctly rounded. |

Built-in functions defined in the specification with an equation built from
the above operations inherit the above errors.
These include, for example, the geometric functions, the common functions,
and many of the matrix functions.
Built-in functions not listed above and not defined as equations of the
above have undefined precision.
These include, for example, the trigonometric functions and determinant.

The precision of double-precision operations is at least that of single
precision.

Within the same type, conversion from a lower to a higher precision must be
exact.
When converting from a higher precision to a lower precision, if the value
is representable by the implementation of the target precision, the
conversion must also be exact.
If the value is not representable, the behavior is dependent on the type:

* 
For signed and unsigned integers, the value is truncated; bits in
positions not present in the target precision are set to zero.
(Positions start at zero and the least significant bit is considered to
be position zero for this purpose.)

* 
For floating-point values, the value should either clamp to +Inf or
-Inf, or to the maximum or minimum value that the implementation
supports.
While this behavior is implementation-dependent, it should be consistent
for a given implementation.

Any
single-precision
floating-point, integer, or opaque-type declaration can have the type
preceded by one of these precision qualifiers:

| Qualifier | Meaning |
| --- | --- |
| **highp** | 32-bit two’s complement for integers,
              32-bit IEEE 754 floating-point for **float** |
| **mediump** | SPIR-V **RelaxedPrecision** when targeting Vulkan, otherwise none. |
| **lowp** | SPIR-V **RelaxedPrecision** when targeting Vulkan, otherwise none. |

For example:

lowp float color;
out mediump vec2 P;
lowp ivec2 foo(lowp mat3);
highp mat4 m;

Literal constants do not have precision qualifiers.
Neither do Boolean variables.

For this paragraph, “operation” includes operators, built-in functions,
and constructors, and “operand” includes function arguments and
constructor arguments.
The precision qualification associated with any operation is the highest
precision qualification of the operands consumed by the operation, if any
operand has an associated precision.
In cases where no operand has a precision qualifier, the precision
qualifications of the operands of the next consuming operation in the
expression will be used.
This rule can be applied recursively until a precision qualified operand is
found.
If necessary, it will also include the precision qualification of l-values
for assignments, of the declared variable for initializers, of formal
parameters for function call arguments, or of function return types for
function return values.
If the precision cannot be determined by this method e.g. if an entire
expression is composed only of operands with no precision qualifier, and the
result is not assigned or passed as an argument, then it is evaluated at the
default precision of the type or greater.
When this occurs in the fragment shader, the default precision must be
defined.

For example, consider the statements:

uniform highp float h1;
highp float h2 = 2.3 * 4.7; // operation and result are highp
precision
mediump float m;
m = 3.7 * h1 * h2; // all operations are highp precision
h2 = m * h1; // operation is highp precision
m = h2 - h1; // operation is highp precision
h2 = m + m; // addition and result at mediump precision
void f(highp float p);
f(3.3); // 3.3 will be passed in at highp precision

Precision qualifiers, as with other qualifiers, do not affect the basic type
of the variable.
In particular, there are no constructors for precision conversions;
constructors only convert types.
Similarly, precision qualifiers, as with other qualifiers, do not contribute
to function overloading based on parameter types.
As discussed in “[Function Calling Conventions](statements.html#function-calling-conventions)”, function input and output is done through copies, and
therefore qualifiers do not have to match.

The precision of a variable is determined when the variable is declared and
cannot be subsequently changed.

Where the precision of a constant integral or constant floating-point
expression is not specified, evaluation is performed at **highp**.
This rule does not affect the precision qualification of the expression.

The evaluation of constant expressions must be invariant and will usually be
performed at compile time.

The precision statement

precision precision-qualifier type;

can be used to establish a default precision qualifier.
The *type* field can be either **int**, **float**, or any of the opaque types,
and the *precision-qualifier* can be **lowp**, **mediump**, or **highp**.

Any other types or qualifiers will result in a compile-time error.
If *type* is **float**, the directive applies to non-precision-qualified
single-precision
floating-point type (scalar, vector, and matrix) declarations.
If *type* is **int**, the directive applies to all non-precision-qualified
integer type (scalar, vector, signed, and unsigned) declarations.
This includes global variable declarations, function return declarations,
function parameter declarations, and local variable declarations.

Non-precision qualified declarations will use the precision qualifier
specified in the most recent **precision** statement that is still in scope.
The **precision** statement has the same scoping rules as variable
declarations.
If it is declared inside a compound statement, its effect stops at the end
of the inner-most statement it was declared in.
Precision statements in nested scopes override precision statements in outer
scopes.
Multiple precision statements for the same basic type can appear inside the
same scope, with later statements overriding earlier statements within that
scope.

For any type that accepts a precision qualifier,
the default precision qualification will be **highp**.
Because all types requiring a precision qualifier have a default precision,
there are no errors for omission of a precision qualifier.

The built-in macro GL_FRAGMENT_PRECISION_HIGH is defined to one:

#define GL_FRAGMENT_PRECISION_HIGH 1

This macro is available in all languages except compute.

In this section, *variance* refers to the possibility of getting different
values from the same expression in different programs.
For example, consider the situation where two vertex shaders, in different
programs, each set *gl_Position* with the same expression, and the input
values into that expression are the same when both shaders run.
It is possible, due to independent compilation of the two shaders, that the
values assigned to *gl_Position* are not exactly the same when the two
shaders run.
In this example, this can cause problems with alignment of geometry in a
multi-pass algorithm.

In general, such variance between shaders is allowed.
When such variance does not exist for a particular output variable, that
variable is said to be *invariant*.

To ensure that a particular output variable is invariant, it is necessary to
use the **invariant** qualifier.
It can either be used to qualify a previously declared variable as being
invariant:

invariant gl_Position; // make existing gl_Position be invariant
out vec3 Color;
invariant Color;       // make existing Color be invariant

or as part of a declaration when a variable is declared:

invariant centroid out vec3 Color;

Only variables output from a shader can be candidates for invariance.
This includes user-defined output variables and the built-in output
variables.
As only outputs can be declared as invariant, an output from one shader
stage will still match an input of a subsequent stage without the input
being declared as invariant.

Input or output instance names on blocks are not used when redeclaring
built-in variables.

The **invariant** keyword can be followed by a comma separated list of
previously declared identifiers.
All uses of **invariant** must be at global scope or on block
members, and before any use of the variables being declared as invariant.

To guarantee invariance of a particular output variable across two programs,
the following must also be true:

* 
The output variable is declared as invariant in both programs.

* 
The same values must be input to all shader input variables consumed by
expressions and control flow contributing to the value assigned to the
output variable.

* 
The texture formats, texel values, and texture filtering are set the
same way for any texture function calls contributing to the value of the
output variable.

* 
All input values are all operated on in the same way.
    All operations in the consuming expressions and any intermediate
    expressions must be the same, with the same order of operands and same
    associativity, to give the same order of evaluation.
    Intermediate variables and functions must be declared as the same type
    with the same explicit or implicit precision
qualifiers.
    Any control flow affecting the output value must be the same, and any
    expressions consumed to determine this control flow must also follow
    these invariance rules.

* 
All the data flow and control flow leading to setting the invariant
output variable reside in a single compilation unit.

Essentially, all the data flow and control flow leading to an invariant
output must match.

Initially, by default, all output variables are allowed to be variant.
To force all output variables to be invariant, use the pragma

#pragma STDGL invariant(all)

before all declarations in a shader.
If this pragma is used after the declaration of any variables or functions,
then the set of outputs that behave as invariant is undefined.

Generally, invariance is ensured at the cost of flexibility in optimization,
so performance can be degraded by use of invariance.
Hence, use of this pragma is intended as a debug aid, to avoid individually
declaring all output variables as invariant.

Invariance must be guaranteed for constant expressions.
A particular constant expression must evaluate to the same result if it
appears again in the same shader or a different shader.
This includes the same expression appearing in two shaders of the same
language or shaders of two different languages.

Constant expressions must evaluate to the same result when operated on as
already described above for invariant variables.

Some algorithms require floating-point computations to exactly follow the
order of operations specified in the source code and to treat all operations
consistently, even if the implementation supports optimizations that could
produce nearly equivalent results with higher performance.
For example, many GL implementations support a “multiply-add” instruction
that can compute a floating-point expression such as

result = (a * b) + (c * d);

in two operations instead of three operations; one multiply and one
multiply-add instead of two multiplies and one add.
The result of a floating-point multiply-add might not always be identical to
first doing a multiply yielding a floating-point result and then doing a
floating-point add.
Hence, in this example, the two multiply operations would not be treated
consistently; the two multiplies could effectively appear to have differing
precisions.

The key computation that needs to be made consistent appears when
tessellating, where intermediate points for subdivision are synthesized in
different directions, yet need to yield the same result, as shown in the
diagram below.

![precise](../_images/precise.svg)

Without any qualifiers, implementations are permitted to perform
optimizations that effectively modify the order or number of operations used
to evaluate an expression, even if those optimizations may produce slightly
different results relative to unoptimized code.

The **precise** qualifier ensures that operations contributing to a
variable’s value are done in their stated order and with operator consistency.
The order is determined by operator precedence and parentheses, as described in
“[Operators](operators.html#operators)”.
Operator consistency means that for each operator, its result is always
computed with the same precision.
Specifically, values computed by compiler-generated code must adhere to the
following identities:

a + b = b + a

a * b = b * a

a * b + c * d = b * a + c* d = d * c + b * a = 

While the following are prevented:

a + (b + c) is not allowed to become (a + b) + c

a * (b * c) is not allowed to become (a * b) * c

a * b + c is not allowed to become a single operation **fma**(a, b, c)

Where *a*, *b*, *c*, and *d*, are scalars or vectors, not matrices.
(Matrix multiplication generally does not commute.) It is the shader
writer’s responsibility to express the computation in terms of these rules
and the compiler’s responsibility to follow these rules.
See the description of *gl_TessCoord* for the rules the tessellation stages
are responsible for following, which in conjunction with the above allow
avoiding cracking when subdividing.

For example,

precise out vec4 position;

declares that operations used to produce the value of *position* must be
performed in exactly the order specified in the source code and with all
operators being treated consistently.
As with the **invariant** qualifier (see “[The Invariant Qualifier](#the-invariant-qualifier)”), the **precise** qualifier may be used to qualify a
built-in or previously declared user-defined variable as being precise:

out vec3 Color;
precise Color; // make existing Color be precise

When applied to a block or a variable of structure type,
**precise** applies to each contained member, recursively.

This qualifier will affect the evaluation of an r-value in a particular
function if and only if the result is eventually consumed in the same
function by an l-value qualified as **precise**.
Any other expressions within a function are not affected, including return
values and output parameters not declared as **precise** but that are
eventually consumed outside the function by a variable qualified as
**precise**. Unaffected expressions also include the controlling expressions
in selection and iteration statements and the condition in ternary
operators (**?:**).

Some examples of the use of **precise**:

in vec4 a, b, c, d;
precise out vec4 v;

float func(float e, float f, float g, float h)
{
    return (e*f) + (g*h); // no constraint on order or operator consistency
}

float func2(float e, float f, float g, float h)
{
    precise float result = (e*f) + (g*h); // ensures same precision for the two multiplies
    return result;
}

float func3(float i, float j, precise out float k)
{
    k = i * i + j;        // precise, due to  declaration
}

void main()
{
    vec3 r = vec3(a * b);             // precise, used to compute v.xyz
    vec3 s = vec3(c * d);             // precise, used to compute v.xyz
    v.xyz = r + s;                    // precise
    v.w = (a.w * b.w) + (c.w * d.w);  // precise
    v.x = func(a.x, b.x, c.x, d.x);   // values computed in func() are NOT precise
    v.x = func2(a.x, b.x, c.x, d.x);  // precise!
    func3(a.x * b.x, c.x * d.x, v.x); // precise!
}

For the purposes of determining if an output from one shader stage matches
an input of the next stage, the **precise** qualifier need not match between
the input and the output.

All constant expressions are evaluated as if **precise** was present, whether
or not it is present.
However, as described in “[Constant Expressions](#constant-expressions)”,
there is no requirement that a compile-time constant expression evaluates to
the same value as a corresponding non-constant expression.

Shader storage blocks, variables declared within shader storage blocks and
variables declared as image types (the basic opaque types with “**image**”
in their keyword), can be further qualified with one or more of the
following memory qualifiers:

| Qualifier | Meaning |
| --- | --- |
| **coherent** | memory variable where reads and writes are coherent with
                reads and writes from other shader invocations |
| **volatile** | memory variable whose underlying value may be changed at any
                point during shader execution by some source other than the
                current shader invocation |
| **restrict** | memory variable where use of that variable is the only way
                to read and write the underlying memory in the relevant
                shader stage |
| **readonly** | memory variable that can be used to read the underlying
                memory, but cannot be used to write the underlying memory |
| **writeonly** | memory variable that can be used to write the underlying
                memory, but cannot be used to read the underlying memory |

Memory accesses to image variables declared using the **coherent** qualifier
are performed coherently with accesses to the same location from other
shader invocations.
In particular, when reading a variable declared as **coherent**, the values
returned will reflect the results of previously completed writes performed
by other shader invocations.
When writing a variable declared as **coherent**, the values written will be
reflected in subsequent coherent reads performed by other shader
invocations.

As described in section
7.12
“Shader Memory Access” of the
[OpenGL Specification](references.html#references), shader memory reads and writes complete in a
largely undefined order.
The built-in function **memoryBarrier**() can be used if needed to guarantee
the completion and relative ordering of memory accesses performed by a
single shader invocation.

When accessing memory using variables not declared as **coherent**, the memory
accessed by a shader may be cached by the implementation to service future
accesses to the same address.
Memory stores may be cached in such a way that the values written may not be
visible to other shader invocations accessing the same memory.
The implementation may cache the values fetched by memory reads and return
the same values to any shader invocation accessing the same memory, even if
the underlying memory has been modified since the first memory read.
While variables not declared as **coherent** may not be useful for
communicating between shader invocations, using non-coherent accesses may
result in higher performance.

Memory accesses to image variables declared using the **volatile** qualifier
must treat the underlying memory as though it could be read or written at
any point during shader execution by some source other than the executing
shader invocation.
When a volatile variable is read, its value must be re-fetched from the
underlying memory, even if the shader invocation performing the read had
previously fetched its value from the same memory.
When a volatile variable is written, its value must be written to the
underlying memory, even if the compiler can conclusively determine that its
value will be overwritten by a subsequent write.
Since the external source reading or writing a **volatile** variable may be
another shader invocation, variables declared as **volatile** are
automatically treated as coherent.

Memory accesses to image variables declared using the **restrict** qualifier
may be compiled assuming that the variable used to perform the memory access
is the only way to access the underlying memory using the shader stage in
question.
This allows the compiler to coalesce or reorder loads and stores using
**restrict**-qualified image variables in ways that wouldn’t be permitted
for image variables not so qualified, because the compiler can assume that
the underlying image won’t be read or written by other code.
Applications are responsible for ensuring that image memory referenced by
variables qualified with **restrict** will not be referenced using other
variables in the same scope; otherwise, accesses to **restrict**-qualified
variables will have undefined results.

Memory accesses to image variables declared using the **readonly** qualifier
may only read the underlying memory, which is treated as read-only memory
and cannot be written to.
It is a compile-time error to pass an image variable qualified with
**readonly** to **imageStore**() or other built-in functions that modify image
memory.

Memory accesses to image variables declared using the **writeonly** qualifier
may only write the underlying memory; the underlying memory cannot be read.
It is a compile-time error to pass an image variable qualified with
**writeonly** to **imageLoad**() or other built-in functions that read image
memory.

A variable could be qualified as both **readonly** and **writeonly**, disallowing
both read and write. Such variables can still be used with some queries, for
example **imageSize**() and **.length**().

The memory qualifiers **coherent**, **volatile**, **restrict**, **readonly**, and
**writeonly** may be used in the declaration of buffer variables (i.e.,
members of shader storage blocks).
When a buffer variable is declared with a memory qualifier, the behavior
specified for memory accesses involving image variables described above
applies identically to memory accesses involving that buffer variable.
It is a compile-time error to assign to a buffer variable qualified with
**readonly** or to read from a buffer variable qualified with **writeonly**.
The combination **readonly** **writeonly** is allowed.

Additionally, memory qualifiers may be used at the block-level declaration
of a shader storage block, including the combination **readonly** **writeonly**.
When a block declaration is qualified with a memory qualifier, it is as if
all of its members were declared with the same memory qualifier.
For example, the block declaration

coherent buffer Block {
    readonly vec4 member1;
    vec4 member2;
};

is equivalent to

buffer Block {
    coherent readonly vec4 member1;
    coherent vec4 member2;
};

Memory qualifiers are only supported in the declarations of image variables,
buffer variables, and shader storage blocks; it is an error to use such
qualifiers in any other declarations.

When calling user-defined functions, opaque-type variables qualified with
**coherent**, **volatile**, **readonly**, or **writeonly** may not be passed to
functions whose formal parameters lack such qualifiers.
(See “[Function Definitions](statements.html#function-definitions)” for more detail on
function calling.) It is legal to have any additional memory qualifiers on a
formal parameter, but only **restrict** can be taken away from an opaque-type
calling argument, by a formal parameter that lacks the **restrict** qualifier.
For non-opaque argument types, where the values operated on by the called
function are copied-in/copied-out, memory qualifiers are not required match.

When a built-in function is called, the code generated is to be based on the
actual qualification of the calling argument, not on the list of memory
qualifiers specified on the formal parameter in the prototype.

vec4 funcA(restrict image2D a) { ... }
vec4 funcB(image2D a) { ... }
layout(rgba32f) uniform image2D img1;
layout(rgba32f) coherent uniform image2D img2;

funcA(img1);        // OK, adding "restrict" is allowed
funcB(img2);        // illegal, stripping "coherent" is not

Layout qualifiers cannot be used on formal function parameters, and layout
qualification is not included in parameter matching.

Note that the use of **const** in an image variable declaration is qualifying
the const-ness of the variable being declared, not the image it refers to.
The qualifier **readonly** qualifies the image memory (as accessed through
that variable) while **const** qualifies the variable itself.

Specialization constants are used only for SPIR-V and declared using the
**constant_id** layout qualifier.
For example:

layout(constant_id = 17) const int arraySize = 12;

The above makes a specialization constant with a default value of 12.
The number 17 is an example author-chosen id by which the API or other tools
can later refer to this specific specialization constant.
If it is never changed before final lowering, it will retain the value of
12.
It is a compile-time error to use the **constant_id** qualifier on anything
but SPIR-V generation of a scalar **bool**, **int**, **uint**, **float**, or
**double**.

Built-in constants can be declared to be specialization constants.
For example:

layout(constant_id = 31) gl_MaxClipDistances; // add specialization_id

The declaration uses just the name of the previously declared built-in
variable, with a **constant_id** layout-qualifier declaration.
It is a compile-time error to do this after the constant has been used:
Constants are strictly either non-specialization constants or specialization
constants, not both.

The built-in constant vector *gl_WorkGroupSize* can be specialized using the
**local_size_{xyz}_id** qualifiers, to individually give the components an id.
For example:

layout(local_size_x_id = 18, local_size_z_id = 19) in;

This leaves *gl_WorkGroupSize.y* as a non-specialization constant, with
*gl_WorkGroupSize* being a partially specialized vector.
Its *x* and *z* components can be later specialized, after generating
SPIR-V, using the ids 18 and 19.
These ids are declared independently from declaring the workgroup size:

layout(local_size_x = 32, local_size_y = 32) in;   // size is (32,32,1)
layout(local_size_x_id = 18) in;                   // constant_id for x
layout(local_size_z_id = 19) in;                   // constant_id for z

Existing rules for declaring **local_size_x**, **local_size_y**, and
**local_size_z** are not changed.
For the local-size ids, it is a compile-time error to provide different id
values for the same local-size id, or to provide them after any use.
Otherwise, order, placement, number of statements, and replication do not
cause errors.

Two arrays sized with specialization constants are the same type only if
sized with the same symbol, and involving no operations.
For example:

layout(constant_id = 51) const int aSize = 20;
const int pad = 2;
const int total = aSize + pad; // specialization constant
int a[total], b[total];        // a and b have the same type
int c[22];                     // different type than a or b
int d[aSize + pad];            // different type than a, b, or c
int e[aSize + 2];              // different type than a, b, c, or d

Types containing arrays sized with a specialization constant cannot be
compared, assigned as aggregates, declared with an initializer, or used as
an initializer.
They can, however, be passed as arguments to functions having formal
parameters of the same type.
Only the outer-most dimension of a variable declared as an array of arrays
can be a specialization constant, otherwise a compile-time error results.

Arrays inside a block may be sized with a specialization constant, but the
block will have a static layout.
Changing the specialized size will not re-layout the block.
In the absence of explicit offsets, the layout will be based on the default
size of the array.

When multiple qualifiers are present in a declaration, they may appear in
any order, but they must all appear before the type.
The **layout** qualifier is the only qualifier that can appear more than once.
Further, a declaration can have at most one storage qualifier, at most one
auxiliary storage qualifier, and at most one interpolation qualifier.
If **inout** is used, neither **in** nor **out** may be used.
Multiple memory qualifiers can be used.
Any violation of these rules will cause a compile-time error.

*Empty declarations* are declarations without a variable name, meaning no
object is instantiated by the declaration.
Generally, empty declarations are allowed.
Some are useful when declaring structures, while many others have no effect.
For example:

int;               // No effect
struct S {int x;}; // Defines a struct S

The combinations of qualifiers that cause compile-time or link-time errors
are the same whether or not the declaration is empty, for example:

invariant in float x; // Error. An input cannot be invariant.
invariant in float;   // Error even though no variable is declared.
