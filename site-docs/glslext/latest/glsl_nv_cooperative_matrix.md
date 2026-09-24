# GLSL_NV_cooperative_matrix

## Metadata

- **Component**: glslext
- **Version**: latest
- **URL**: /glslext/latest/glslext/nv/GLSL_NV_cooperative_matrix.html

## Content

The original text file describing this extension as a set of diffs to the
OpenGL Shading Language Specification follows.

Name

    NV_cooperative_matrix

Name Strings

    GL_NV_cooperative_matrix
    GL_NV_integer_cooperative_matrix

Contact

    Jeff Bolz, NVIDIA (jbolz 'at' nvidia.com)

Contributors

    Ashwin Lele, NVIDIA

Status

    Complete.

Version

    Last Modified:      July 12, 2019
    Revision:           2

Dependencies

    This extension can be applied to OpenGL GLSL versions 4.50
    (#version 450) and higher.

    This extension can be applied to OpenGL ES ESSL versions 3.20
    (#version 320) and higher.

    This extension is written against the OpenGL Shading Language
    Specification, version 4.60, dated July 23, 2017.

    This extension requires GL_KHR_memory_scope_semantics.

    This extension interacts with
    GL_EXT_shader_explicit_arithmetic_types_float16,
    GL_EXT_shader_explicit_arithmetic_types_float64,
    GL_EXT_shader_explicit_arithmetic_types_int8,
    GL_EXT_shader_explicit_arithmetic_types_int16,
    GL_EXT_shader_explicit_arithmetic_types_int64.

Overview

    This extension adds a new set of types known as "cooperative matrix" types,
    where the storage for and computations performed on the matrix are spread
    across a set of invocations such as a subgroup. These types give the
    implementation freedom in how to optimize matrix multiplies.

    This extension introduces the types and built-in functions, but does not
    specify rules about what sizes/combinations are valid. This is left to
    the Vulkan extension specifications, and it is expected that different
    implementations may support different sizes. To help accommodate this,
    the dimensions of the cooperative types are parameterized and can be
    specialized via specialization constants.

    This extension introduces limited support for parameterized types, with
    the parameters specified as in C template syntax. The new built-in types
    fcoopmatNV/icoopmatNV/ucoopmatNV are the only types that can be
    parameterized, and their parameters are all integer values that control
    the component type, scope of the type, and number of rows and columns of
    the matrix.

    Cooperative matrix types are only supported in certain shader stages, and
    the supported stages can be queried from the API. There are no compile-time
    checks to disallow cooperative matrix types in any shader stage.

    Mapping to SPIR-V
    -----------------

    For informational purposes (non-normative), the following is an
    expected way for an implementation to map GLSL constructs to SPIR-V
    constructs:

      *coopmatNV -> OpTypeCooperativeMatrixNV
      *coopmatNV constructor from scalar value -> OpConstantComposite/OpCompositeConstruct
      *coopmatNV constructor from *coopmatNV -> Op*Convert
      *coopmatNV.length() -> OpCooperativeMatrixLengthNV
      *coopmatNV[i] -> OpCompositeExtract/OpCompositeInsert/OpAccessChain

      +, -, *, / -> OpFAdd, OpFNegate/OpFSub, OpMatrixTimesScalar, OpFDiv
                    OpIAdd, OpSNegate/OpISub, OpMatrixTimesScalar, OpUDiv/OpSDiv

      coopMatLoadNV -> OpCooperativeMatrixLoadNV
      coopMatStoreNV -> OpCooperativeMatrixStoreNV
      coopMatMulAddNV -> OpCooperativeMatrixMulAddNV

Modifications to the OpenGL Shading Language Specification, Version 4.60

    Including the following lines in a shader can be used to control the
    language features described in this extension:

      #extension GL_NV_cooperative_matrix : 
      #extension GL_NV_integer_cooperative_matrix : 

    where  is as specified in section 3.3.
    GL_NV_integer_cooperative_matrix must be enabled to use the icoopmatNV
    and ucoopmatNV types and any built-in functions that use them. If
    GL_NV_integer_cooperative_matrix is enabled, then
    GL_NV_cooperative_matrix is implicitly enabled.

    New preprocessor #defines are added to the OpenGL Shading Language:

      #define GL_NV_cooperative_matrix              1
      #define GL_NV_integer_cooperative_matrix      1

    Modify Section 3.6, Keywords

    (add to list of keywords)

      fcoopmatNV
      icoopmatNV
      ucoopmatNV

    Add a new Section 4.1.X, Cooperative Matrix Types

    Cooperative matrix types are matrix types where the storage for and
    computations performed on the matrix are spread across a set of
    invocations such as a subgroup. These types give the implementation
    freedom in how to optimize matrix multiplies.

    Floating-point cooperative matrices (fcoopmatNV) and integer cooperative
    matrices (icoopmatNV/ucoopmatNV) are supported in the language, and are
    parameterized by four type parameters: bits per component, scope, rows,
    and columns. The parameters are specified in order between angle brackets
    ('') and comma-separated. The scope, rows, and columns
    parameters can be constant expressions or specialization constant
    expressions, and no error checking is performed on their values at
    compile time. It is left to the Vulkan specification to define what
    combinations of values are valid post-specialization.

    Example cooperative matrix declarations:

      fcoopmatNV mat1;  // fp32, subgroup, 8 rows, 8 columns
      fcoopmatNV mat2; // fp16, subgroup, 16 rows, 8 columns
      layout(constant_id = 0) const int scope = 0;
      layout(constant_id = 1) const int rows = 0;
      layout(constant_id = 2) const int cols = 0;
      fcoopmatNV mat3;       // scope/rows/columns specified at pipeline creation time

    Cooperative matrix types can be used as global variables, local
    variables, function parameters, and function return values. They must not
    be used in uniform, buffer, or shared memory, or in input/output storage
    classes.

    There are no implicit type conversions between cooperative matrix types.

    Add a new Section 5.4.X, Cooperative Matrix Type Constructors

    Cooperative matrices can be constructed from a single scalar value whose
    type matches the matrix's component type (or any value that can be
    implicitly converted to that type). This initializes all components of the
    matrix to that same value.

    Cooperative matrices can be constructed from another cooperative matrix
    type with the same scope, number of rows, and number of columns, i.e.
    only (optionally) changing the number of bits per component and type of
    the component. This performs a component-wise type conversion to
    initialize the new cooperative matrix.

    Add a new Section 5.X, Cooperative Matrix Components

    The components of a cooperative matrix are spread across the invocations
    in its scope, in an implementation-dependent manner. The components owned
    by a given invocation can be accessed using array subscripting syntax,
    and the number of components owned by each invocation can be queried
    using the *length* method. The type returned by *length* is an int, and
    the value returned is a constant expression. There is no compile-time
    bounds checking of array indices.

    This can be used, for example, to perform component-wise operations on
    all components of a cooperative matrix:

      fcoopmatNV m;
      ...
      for (int i = 0; i ' is a greater-than operator or the end
      of the type parameter list. This means it's hard to parse something
      like

        fcoopmatNVB?16:8>

      because it's unclear that the last parameter is a ternary expression
      without looking ahead. The obvious way to make this example more clear
      is to add parentheses:

        fcoopmatNVB?16:8)>

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
    Revision 2
    - Added integer types, under GL_NV_integer_cooperative_matrix.
