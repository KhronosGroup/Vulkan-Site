# GLSL_KHR_cooperative_matrix

## Metadata

- **Component**: glslext
- **Version**: latest
- **URL**: /glslext/latest/glslext/khr/GLSL_KHR_cooperative_matrix.html

## Content

The original text file describing this extension as a set of diffs to the
OpenGL Shading Language Specification follows.

Name
GL_KHR_cooperative_matrix

Contact
Jeff Bolz, NVIDIA (jbolz 'at' nvidia.com)

Contributors
Kevin Petit, Arm (kevin.petit 'at' arm.com)
Neil Hickey, Arm (neil.hickey 'at' arm.com)

Notice
Copyright (c) 2022-2023 The Khronos Group Inc. Copyright terms at [http://www.khronos.org/registry/speccopyright.html](http://www.khronos.org/registry/speccopyright.html)

Status
Complete.

Version
Last Modified: July 21, 2023
Revision: 1

Dependencies
This extension can be applied to OpenGL GLSL versions 4.50
(#version 450) and higher.
This extension can be applied to OpenGL ES ESSL versions 3.20
(#version 320) and higher.
All these versions map GLSL/ESSL semantics to the same SPIR-V 1.5 semantics (approximating the most recent versions of GLSL/ESSL).

This extension interacts with physical_storage_buffer,EXT_shader_explicit_arithmetic_types

Overview

This extension adds a new set of types known as "cooperative matrix" types,
where the storage for and computations performed on the matrix are spread
across a set of invocations such as a subgroup. These types give the
implementation freedom in how to optimize matrix multiply operations.

This extension introduces the types and built-in functions, but does not
specify rules about what sizes/combinations are valid. This is left to
the Vulkan extension specifications, and it is expected that different
implementations may support different sizes. To help accommodate this,
the dimensions of the cooperative types are parameterized and can be
specialized via specialization constants.

This extension introduces limited support for parameterized types, with
the parameters specified as in C template syntax. The new built-in type
"coopmat" is the only type that can be parameterized, and its parameters
are a scalar type for the component type, an integer value that controls
the scope of the type, the number of rows and columns in the matrix, and
which matrix accumulation argument the matrix can be.

Cooperative matrix types are only supported in certain shader stages, and
the supported stages can be queried from the API. There are no compile-time
checks to disallow cooperative matrix types in any shader stage.

Mapping to SPIR-V
-----------------

For informational purposes (non-normative), the following is an
expected way for an implementation to map GLSL constructs to SPIR-V
constructs:

coopmat -> OpTypeCooperativeMatrixKHR
coopmat constructor from scalar value -> OpConstantComposite
coopmat constructor from coopmat -> Op*Convert, OpConvert*To*
coopmat.length() -> OpCooperativeMatrixLength
coopmat[i] -> OpCompositeExtract/OpCompositeInsert/OpAccessChain
+, -, *, / -> OpFAdd, OpFNegate/OpFSub, OpFMul/OpMatrixTimesScalar, OpFDiv
              (similarly for integer types)
coopmatLoad -> OpCooperativeMatrixLoadKHR
coopmatStore -> OpCooperativeMatrixStoreKHR
coopmatMulAdd -> OpCooperativeMatrixMulAddKHR

Modifications to the OpenGL Shading Language Specification, Version 4.60

Including the following line in a shader can be used to control the
language features described in this extension:
#extension GL_KHR_cooperative_matrix : 
where  is as specified in section 3.3.
New preprocessor #defines are added to the OpenGL Shading Language:

#define GL_KHR_cooperative_matrix 1

Modify Section 3.6, Keywords
(add to list of keywords)
coopmat

Add a new Section 4.1.X, Cooperative Matrix Types

Cooperative matrix types are matrix types where the storage for, and
computations performed on, the matrix are spread across a set of
invocations such as a subgroup. These types give the implementation
freedom in how to optimize matrix multiply operations.

Cooperative matrices (coopmat) are supported in
the language, and are parameterized by five type parameters: type
per component, scope, rows, columns, and use. The parameters are specified
in order between angle brackets ('') and are comma-separated.
The scope, rows, and columns parameters can be constant expressions or
specialization constant expressions, and no error checking is performed
on their values at compile time. It is left to the Vulkan specification
to define what combinations of values are valid post-specialization.
The type per component must be a scalar numerical type.

Example cooperative matrix declarations:

coopmat mat1; // float32, subgroup scope, 8 rows, 8 columns, Accumulator operand
coopmat mat2; // float16, subgroup scope, 16 rows, 8 columns, A operand
layout(constant_id = 0) const int scope = 0;
layout(constant_id = 1) const int rows = 0;
layout(constant_id = 2) const int cols = 0;
coopmat mat3; // scope/rows/columns specified at pipeline creation time

Cooperative matrix types can be used as global variables, local
variables, function parameters, and function return values. They must not
be used in uniform, buffer, or shared memory, or in input/output storage
classes.

There are no implicit type conversions between cooperative matrix types.

gl_MatrixUse* are constant integer values which can be used for the MatrixUse template
parameter in cooperative matrix types. These control which operand of coopMatMulAdd the
type can be used as.

    const int gl_MatrixUseA             = 0;
    const int gl_MatrixUseB             = 1;
    const int gl_MatrixUseAccumulator   = 2;

Add a new Section 5.4.X, Cooperative Matrix Type Constructors

Cooperative matrices can be constructed from a single scalar value whose
type matches the matrix's component type (or any value that can be
implicitly converted to that type). This initializes all components of the
matrix to that same value.

Cooperative matrices can be constructed from another cooperative matrix
type with the same scope, number of rows, number of columns, and use.
This performs a component-wise type conversion to initialize the new cooperative matrix.

Add a new Section 5.X, Cooperative Matrix Components

The components of a cooperative matrix are spread across the invocations
in its scope, in an implementation-dependent manner. The components owned
by a given invocation can be accessed using array subscripting syntax,
and the number of components owned by each invocation can be queried
using the *length* method. The type returned by *length* is an int.
There is no compile-time bounds checking of array indices.

This can be used, for example, to perform component-wise operations on
all components of a cooperative matrix:

coopmat m;
...
for (int i = 0; i ' is a greater-than operator or the end
of the type parameter list. This means it's hard to parse something
like

coopmatB?16:8, gl_MatrixUseAccumulator>

because it's unclear that the columns parameter is a ternary expression
without looking ahead. The obvious way to make this example more clear
is to add parentheses:

coopmatB?16:8), gl_MatrixUseAccumulator>

This can be parsed as a "unary_expression" rather than
"conditional_expression", and doesn't really lose any flexibility
because unary_expression indirectly includes the pretty general

"LEFT_PAREN expression RIGHT_PAREN" rule.

RESOLVED: We diverge from the C grammar and use unary_expression
for type parameters rather than conditional_expression.

(2) What alignment rules should we have for buf/element/stride parameters
in the load/store built-in functions?

RESOLVED: The Vulkan SPIR-V environment appendix is responsible for
documenting this. To summarize, the start of the matrix and the stride
must be at least as aligned as the smaller of 16B or the size of a
row/column of the matrix.

(3) For the load/store functions, can the component type mismatch the array
element type?

RESOLVED: Yes, this makes it easier to efficiently load matrix data into
shared memory. The stride parameter is interpreted in units of the
pointed-to type, not in units of the matrix's component type. This
extension includes overloads for 8 through 64-bit integers, and
uvec2/uvec4.

Revision History

Revision 1

- Internal revisions.
