# GL_EXT_shader_explicit_arithmetic_types

## Metadata

- **Component**: glslext
- **Version**: latest
- **URL**: /glslext/latest/glslext/ext/GL_EXT_shader_explicit_arithmetic_types.html

## Content

The original text file describing this extension as a set of diffs to the
OpenGL Shading Language Specification follows.

Name

    EXT_shader_explicit_arithmetic_types

Name Strings

    GL_EXT_shader_explicit_arithmetic_types
    GL_EXT_shader_explicit_arithmetic_types_int8
    GL_EXT_shader_explicit_arithmetic_types_int16
    GL_EXT_shader_explicit_arithmetic_types_int32
    GL_EXT_shader_explicit_arithmetic_types_int64
    GL_EXT_shader_explicit_arithmetic_types_float16
    GL_EXT_shader_explicit_arithmetic_types_float32
    GL_EXT_shader_explicit_arithmetic_types_float64

Contact

     Alexander Galazin (alexander.galazin 'at' arm.com)

Contributors

     Alexander Galazin, Arm
     Jan-Harald Fredriksen, Arm
     Hans-Kristian Arntzen, Arm
     Neil Henning, AMD
     Contributors to ARB_gpu_shader_int64
     Contributors to AMD_gpu_shader_half_float
     Contributors to NV_gpu_shader5
     Contributors to AMD_gpu_shader_int16

Notice

    Copyright (c) 2018 The Khronos Group Inc. Copyright terms at
        [http://www.khronos.org/registry/speccopyright.html](http://www.khronos.org/registry/speccopyright.html)

Status

Number

    TBD

Dependencies

    This extension can be applied to OpenGL GLSL versions 1.40
    (#version 140) and higher.

    This extension can be applied to OpenGL ES ESSL versions 3.10
    (#version 310) and higher.

    All these versions map GLSL/ESSL semantics to the same SPIR-V 1.0
    semantics (approximating the most recent versions of GLSL/ESSL).

    This extension is written against the OpenGL Shading Language
    specification, Language Version 4.50, Document Revision 6.

    This extension interacts with ARB_gpu_shader_int64.

    This extension interacts with AMD_gpu_shader_half_float.

    This extension interacts with AMD_gpu_shader_int16.

Overview

    This extension modifies GLSL to expose explicit 8-bit integer, and 16-bit
    integer and floating-point types. It also aliases existing float, double,
    int, and uint types with more explicit type names.

    This extension can be used together with GL_KHR_vulkan_glsl extension to
    enable these types to be used in a high-level language for the Vulkan API.

    This extension document adds support for the following extensions to be used
    within GLSL:

    - GL_EXT_shader_explicit_arithmetic_types_int8 - enables explicit 8-bit
      signed and unsigned integer types.
    - GL_EXT_shader_explicit_arithmetic_types_int16 - enables explicit 16-bit
      signed and unsigned integer types
    - GL_EXT_shader_explicit_arithmetic_types_int32 - enables explicit 32-bit
      signed and unsigned integer types.
    - GL_EXT_shader_explicit_arithmetic_types_int64 - enables explicit 64-bit
      signed and unsigned integer types.
    - GL_EXT_shader_explicit_arithmetic_types_float16 - enables explicit 16-bit
      floating-point types.
    - GL_EXT_shader_explicit_arithmetic_types_float32 - enables explicit 32-bit
      floating-point types.
    - GL_EXT_shader_explicit_arithmetic_types_float64 - enables explicit 64-bit
      floating-point types.

Modifications to the OpenGL Shading Language Specification, Version 4.50

Including the following line in a shader can be used to control the language
features described in this extension:

    #extension GL_EXT_shader_explicit_arithmetic_types         : 
    #extension GL_EXT_shader_explicit_arithmetic_types_int8    : 
    #extension GL_EXT_shader_explicit_arithmetic_types_int16   : 
    #extension GL_EXT_shader_explicit_arithmetic_types_int32   : 
    #extension GL_EXT_shader_explicit_arithmetic_types_int64   : 
    #extension GL_EXT_shader_explicit_arithmetic_types_float16 : 
    #extension GL_EXT_shader_explicit_arithmetic_types_float32 : 
    #extension GL_EXT_shader_explicit_arithmetic_types_float64 : 

where  is as specified in section 3.3.  If any of
 - GL_EXT_shader_explicit_arithmetic_types_int8
 - GL_EXT_shader_explicit_arithmetic_types_int16
 - GL_EXT_shader_explicit_arithmetic_types_int32
 - GL_EXT_shader_explicit_arithmetic_types_int64
 - GL_EXT_shader_explicit_arithmetic_types_float16
 - GL_EXT_shader_explicit_arithmetic_types_float32
 - GL_EXT_shader_explicit_arithmetic_types_float64
extension are enabled, the GL_EXT_shader_explicit_arithmetic_types extension is
also implicitly enabled.

New preprocessor #defines are added:

    #define GL_EXT_shader_explicit_arithmetic_types_int8             1
    #define GL_EXT_shader_explicit_arithmetic_types_int16            1
    #define GL_EXT_shader_explicit_arithmetic_types_int32            1
    #define GL_EXT_shader_explicit_arithmetic_types_int64            1
    #define GL_EXT_shader_explicit_arithmetic_types_float16          1
    #define GL_EXT_shader_explicit_arithmetic_types_float32          1
    #define GL_EXT_shader_explicit_arithmetic_types_float64          1

Such that if using a GL_EXT_shader_explicit_arithmetic_types_* extension is
supported, the corresponding
GL_EXT_shader_explicit_arithmetic_types_* #define is defined.

Changes to Chapter 3 of the OpenGL Shading Language Specification

    If the extension GL_EXT_shader_explicit_arithmetic_types_float64 is supported,
    add the following keywords to section 3.6 Keywords:

    float64_t   f64vec2     f64vec3    f64vec4
    f64mat2     f64mat3     f64mat4
    f64mat2x2   f64mat2x3   f64mat2x4
    f64mat3x2   f64mat3x3   f64mat3x4
    f64mat4x2   f64mat4x3   f64mat4x4

    If the extension GL_EXT_shader_explicit_arithmetic_types_float32 is supported,
    add the following keywords to section 3.6 Keywords:

    float32_t   f32vec2     f32vec3    f32vec4
    f32mat2     f32mat3     f32mat4
    f32mat2x2   f32mat2x3   f32mat2x4
    f32mat3x2   f32mat3x3   f32mat3x4
    f32mat4x2   f32mat4x3   f32mat4x4

    If the extension GL_EXT_shader_explicit_arithmetic_types_float16 is supported,
    add the following keywords to section 3.6 Keywords:

    float16_t   f16vec2     f16vec3    f16vec4
    f16mat2     f16mat3     f16mat4
    f16mat2x2   f16mat2x3   f16mat2x4
    f16mat3x2   f16mat3x3   f16mat3x4
    f16mat4x2   f16mat4x3   f16mat4x4

    If the extension GL_EXT_shader_explicit_arithmetic_types_int64 is supported,
    add the following keywords to section 3.6 Keywords:

    int64_t     i64vec2     i64vec3    i64vec4
    uint64_t    u64vec2     u64vec3    u64vec4

    If the extension GL_EXT_shader_explicit_arithmetic_types_int32 is supported,
    add the following keywords to section 3.6 Keywords:

    int32_t     i32vec2     i32vec3    i32vec4
    uint32_t    u32vec2     u32vec3    u32vec4

    If the extension GL_EXT_shader_explicit_arithmetic_types_int16 is supported,
    add the following keywords to section 3.6 Keywords:

    int16_t     i16vec2     i16vec3    i16vec4
    uint16_t    u16vec2     u16vec3    u16vec4

    If the extension GL_EXT_shader_explicit_arithmetic_types_int8 is supported,
    add the following keywords to section 3.6 Keywords:

    int8_t      i8vec2      i8vec3     i8vec4
    uint8_t     u8vec2      u8vec3     u8vec4

Changes to Chapter 4 of the OpenGL Shading Language Specification

    Add into the tables in section 4.1 a new table interleaved with the existing
    tables:

    Transparent types with explicit bit size
    --------------------------------------------------------------------------
    | Type        | Meaning                                                  |
    |             |                                                          |
    --------------------------------------------------------------------------
    (if GL_EXT_shader_explicit_arithmetic_types_float64 is supported)
    | float64_t   | a 64-bit floating-point scalar                           |
    | f64vec2     | a two-component 64-bit floating-point vector             |
    | f64vec3     | a three-component 64-bit floating-point vector           |
    | f64vec4     | a four-component 64-bit floating-point vector            |
    | f64mat2     | a 2x2 64-bit floating-point matrix                       |
    | f64mat3     | a 3x3 64-bit floating-point matrix                       |
    | f64mat4     | a 4x4 64-bit floating-point matrix                       |
    | f64mat2x2   | same as f64mat2                                          |
    | f64mat2x3   | a 64-bit floating point matrix with 2 columns and 3 rows |
    | f64mat2x4   | a 64-bit floating point matrix with 2 columns and 4 rows |
    | f64mat3x2   | a 64-bit floating point matrix with 3 columns and 2 rows |
    | f64mat3x3   | same as f64mat3                                          |
    | f64mat3x4   | a 64-bit floating point matrix with 3 columns and 4 rows |
    | f64mat4x2   | a 64-bit floating point matrix with 4 columns and 2 rows |
    | f64mat4x3   | a 64-bit floating point matrix with 2 columns and 3 rows |
    | f64mat4x4   | same as f64mat4                                          |
    (if GL_EXT_shader_explicit_arithmetic_types_float32 is supported)
    | float32_t   | a 32-bit floating-point scalar                           |
    | f32vec2     | a two-component 32-bit floating-point vector             |
    | f32vec3     | a three-component 32-bit floating-point vector           |
    | f32vec4     | a four-component 32-bit floating-point vector            |
    | f32mat2     | a 2x2 32-bit floating-point matrix                       |
    | f32mat3     | a 3x3 32-bit floating-point matrix                       |
    | f32mat4     | a 4x4 32-bit floating-point matrix                       |
    | f32mat2x2   | same as f32mat2                                          |
    | f32mat2x3   | a 32-bit floating point matrix with 2 columns and 3 rows |
    | f32mat2x4   | a 32-bit floating point matrix with 2 columns and 4 rows |
    | f32mat3x2   | a 32-bit floating point matrix with 3 columns and 2 rows |
    | f32mat3x3   | same as f32mat3                                          |
    | f32mat3x4   | a 32-bit floating point matrix with 3 columns and 4 rows |
    | f32mat4x2   | a 32-bit floating point matrix with 4 columns and 2 rows |
    | f32mat4x3   | a 32-bit floating point matrix with 2 columns and 3 rows |
    | f32mat4x4   | same as f32mat4                                          |
    (if GL_EXT_shader_explicit_arithmetic_types_float16 is supported)
    | float16_t   | a 16-bit floating-point scalar                           |
    | f16vec2     | a two-component 16-bit floating-point vector             |
    | f16vec3     | a three-component 16-bit floating-point vector           |
    | f16vec4     | a four-component 16-bit floating-point vector            |
    | f16mat2     | a 2x2 16-bit floating-point matrix                       |
    | f16mat3     | a 3x3 16-bit floating-point matrix                       |
    | f16mat4     | a 4x4 16-bit floating-point matrix                       |
    | f16mat2x2   | same as f16mat2                                          |
    | f16mat2x3   | a 16-bit floating point matrix with 2 columns and 3 rows |
    | f16mat2x4   | a 16-bit floating point matrix with 2 columns and 4 rows |
    | f16mat3x2   | a 16-bit floating point matrix with 3 columns and 2 rows |
    | f16mat3x3   | same as f16mat3                                          |
    | f16mat3x4   | a 16-bit floating point matrix with 3 columns and 4 rows |
    | f16mat4x2   | a 16-bit floating point matrix with 4 columns and 2 rows |
    | f16mat4x3   | a 16-bit floating point matrix with 2 columns and 3 rows |
    | f16mat4x4   | same as f16mat4                                          |
    (if GL_EXT_shader_explicit_arithmetic_types_int64 is supported)
    | int64_t     | a 64-bit signed integer scalar                           |
    | uint64_t    | a 64-bit unsigned integer scalar                         |
    | i64vec2     | a two-component 64-bit signed integer vector             |
    | i64vec3     | a three-component 64-bit signed integer vector           |
    | i64vec4     | a four-component 64-bit signed integer vector            |
    | u64vec2     | a two-component 64-bit unsigned integer vector           |
    | u64vec3     | a three-component 64bit unsigned integer vector          |
    | u64vec4     | a four-component 64-bit unsigned integer vector          |
    (if GL_EXT_shader_explicit_arithmetic_types_int32 is supported)
    | int32_t     | a 32-bit signed integer scalar                           |
    | uint32_t    | a 32-bit unsigned integer scalar                         |
    | i32vec2     | a two-component 32-bit signed integer vector             |
    | i32vec3     | a three-component 32-bit signed integer vector           |
    | i32vec4     | a four-component 32-bit signed integer vector            |
    | u32vec2     | a two-component 32-bit unsigned integer vector           |
    | u32vec3     | a three-component 32-bit unsigned integer vector         |
    | u32vec4     | a four-component 32-bit unsigned integer vector          |
    (if GL_EXT_shader_explicit_arithmetic_types_int16 is supported)
    | int16_t     | a 16-bit signed integer scalar                           |
    | uint16_t    | a 16-bit unsigned integer scalar                         |
    | i16vec2     | a two-component 16-bit signed integer vector             |
    | i16vec3     | a three-component 16-bit signed integer vector           |
    | i16vec4     | a four-component 16-bit signed integer vector            |
    | u16vec2     | a two-component 16-bit unsigned integer vector           |
    | u16vec3     | a three-component 16-bit unsigned integer vector         |
    | u16vec4     | a four-component 16-bit unsigned integer vector          |
    (if GL_EXT_shader_explicit_arithmetic_types_int8 is supported)
    | int8_t      | a 8-bit signed integer scalar                            |
    | uint8_t     | a 8-bit unsigned integer scalar                          |
    | i8vec2      | a two-component 8-bit signed integer vector              |
    | i8vec3      | a three-component 8-bit signed integer vector            |
    | i8vec4      | a four-component 8-bit signed integer vector             |
    | u8vec2      | a two-component 8-bit unsigned integer vector            |
    | u8vec3      | a three-component 8-bit unsigned integer vector          |
    | u8vec4      | a four-component 8-bit unsigned integer vector           |
    --------------------------------------------------------------------------

    Modify subsection 4.1.3 Integers

    Modify the first paragraph to say:
     "Signed and unsigned integer variables are fully supported. In this
      document, the term integer is meant to generally include both signed
      and unsigned integers. Variables with the types "int8_t", "int16_t",
      "int32_t", and "int64_t" represent signed integer values with exactly
      8, 16, 32, or 64 bits, respectively, including a sign bit, in two's
      complement form. Variables with the type "uint8_t", "uint16_t",
      "uint32_t", and "uint64_t" represent unsigned integer values with
      exactly 8, 16, 32, or 64 bits, respectively. Variables with the type
      "int32_t" and "uint32_t" are equivalent to "int" and "uint" types,
      respectively. Addition, subtraction, and shift operations resulting in
      overflow or underflow will not cause any exception, nor will they
      saturate, rather they will "wrap" to yield the low-order 8, 16 32, or 64
      bits (for respective types) the result.
      Division and multiplication operations resulting in overflow or underflow
      will not cause any exception but will result in an undefined value."

    Change "integer-suffix" definition:

     "integer-suffix:
         unsigned-suffix long-suffixopt
         unsigned-suffix short-suffixopt
         long-suffix
         short-suffix

      unsigned-suffix: one of
          u U
      long-suffix: one of
          l L
      short-suffix: one of
          s S"

    Modify the next paragraph to say:
     "No white space is allowed between the digits of an integer constant,
     including after the leading 0 or after the leading 0x or 0X of a constant,
     or before the integer-suffix. When tokenizing, the maximal token matching
     the above will be recognized before a new token is started.
     When the suffix is present, the literal type is determined as follows:
     -------------------------------------
     | suffix           | type           |
     -------------------------------------
     | no suffix        | int, int32_t   |
     | u or U           | uint, uint32_t |
     | s or S           | int16_t        |
     | both u/U and s/S | uint16_t       |
     | l or L           | int64_t        |
     | both u/U and l/L | uint64_t       |
     -------------------------------------
     A leading unary minus sign (-) is interpreted as an arithmetic
     unary negation, not as part of the constant. Hence, literals themselves
     are always expressed with non-negative syntax, though they could result
     in a negative value. A suffix corresponding to a particular type must be
     supported only if the extension enabling this type is supported."

    Modify subsection 4.1.4 Floating-Point Variables:

    Modify the first four sentences of the first paragraph to say:
     "Half-precision, single-precision, and double-precision floating-point
      variables are available for use in a variety of scalar calculations.
      Generally, the term floating-point will refer to half-, single-,
      and double-precision floating point. Floating-point variables are
      defined as in the following examples:

        float a, b = 1.5; // single-precision floating-point
        double c, d = 2.0LF; // double-precision floating-point
        float16_t e, f = 0.5HF; // half-precision floating-point

      As an input value to one of the processing units, a half-precision,
      single-precision, or double-precision floating-point variable is expected
      to match the corresponding IEEE 754-2008 floating-point definition for
      precision and dynamic range."

    Modify the second paragraph to say:
     "floating-suffix:
          half-suffix single-suffix
          double-suffix single-suffix
          single-suffix

      single-suffix: one of
          f F
      half-suffix: one of
          h H
      double-suffix: one of
          L L"

    (insert after second paragraph)
     "Variables of type "float16_t" represent floating-point using
      exactly 16 bits and are stored using the 16-bit floating-point
      representation described in IEEE 754-2008.
      Variables of type "float32_t" and "float" are equivalent and represent
      floating-point with 32-bits floating-point representation
      described in IEEE 754-2008.
      Variables of type "float64_t" and "double" are equivalent and represent
      floating-point with 64-bits floating-point representation
      described in IEEE 754-2008.

    Add the following sentences to the third paragraph:
     "When the suffix is present, the literal type is determined as follows:
     ----------------------------------------
     | suffix            | type             |
     ----------------------------------------
     | no suffix         | float32_t, float |
     | f or F            | float32_t, float |
     | both l/L and f/F  | float64_t, double|
     | both h/H and f/F  | float16_t        |
     ----------------------------------------
     A suffix corresponding to a particular type must be
     supported only if the extension enabling this type is supported."

    Modify the second sentence of subsection 4.1.6 Matrices to say:
     "Matrix types beginning with "mat" or "f32mat" have single-precision
     components, with "f16mat" have half-precision components, while matrix
     types beginning with "dmat" of "f64mat" have double-precision components"

     Modify subsection 4.1.10 Implicit Conversions to say:
     "In some situations, an expression and its type will be implicitly
      converted to a different type. Such conversion are classified into the
      following types: integral promotions, floating point promotion,
      integral conversions, floating point conversions, and
      floating-integral conversions.

      (Note: Expressions of type "int32_t", "uint32_t", "float32_t",
      and "float64_t" are treated as identical to those of type "int", "uint",
      "float", and "double" respectively. Implicit conversions to and from
      these explicitly-sized types are allowed whenever conversions involving
      the equivalent base type are allowed.)

      The following table shows allowed integral promotions:
      --------------------------------------------------------
      | Type of    |     Can be implicitly promoted to       |
      | expression |                                         |
      --------------------------------------------------------
      | int8_t     | int32_t                                 |
      | int16_t    |                                         |
      | uint8_t    |                                         |
      | uint16_t   |                                         |
      --------------------------------------------------------
      | i8vec2     | i32vec2                                 |
      | i16vec2    |                                         |
      | u8vec2     |                                         |
      | u16vec2    |                                         |
      --------------------------------------------------------
      | i8vec3     | i32vec3                                 |
      | i16vec3    |                                         |
      | u8vec3     |                                         |
      | u16vec3    |                                         |
      --------------------------------------------------------
      | i8vec4     | i32vec4                                 |
      | i16vec4    |                                         |
      | u8vec4     |                                         |
      | u16vec4    |                                         |
      --------------------------------------------------------

      The following table shows allowed floating-point promotions:
      --------------------------------------------------------
      | Type of    |     Can be implicitly promoted to       |
      | expression |                                         |
      --------------------------------------------------------
      | float16_t  | float64_t                               |
      | float32_t  |                                         |
      --------------------------------------------------------
      | f16vec2    | f64vec2                                 |
      | f32vec2    |                                         |
      --------------------------------------------------------
      | f16vec3    | f64vec3                                 |
      | f32vec3    |                                         |
      --------------------------------------------------------
      | f16vec4    | f64vec4                                 |
      | f32vec4    |                                         |
      --------------------------------------------------------
      | f16mat2    | f64mat2                                 |
      | f32mat2    |                                         |
      --------------------------------------------------------
      | f16mat3    | f64mat3                                 |
      | f32mat3    |                                         |
      --------------------------------------------------------
      | f16mat4    | f64mat4                                 |
      | f32mat4    |                                         |
      --------------------------------------------------------
      | f16mat2x3  | f64mat2x3                               |
      | f32mat2x3  |                                         |
      --------------------------------------------------------
      | f16mat2x4  | f64mat2x4                               |
      | f32mat2x4  |                                         |
      --------------------------------------------------------
      | f16mat3x2  | f64mat3x2                               |
      | f32mat3x2  |                                         |
      --------------------------------------------------------
      | f16mat3x4  | f64mat3x4                               |
      | f32mat3x4  |                                         |
      --------------------------------------------------------
      | f16mat4x2  | f64mat4x2                               |
      | f32mat4x2  |                                         |
      --------------------------------------------------------
      | f16mat4x3  | f64mat4x3                               |
      | f32mat4x3  |                                         |
      --------------------------------------------------------

       The following table shows allowed integral conversions:
      -------------------------------------------------------------------------
      | Type of    |     Can be implicitly converted to                       |
      | expression |                                                          |
      -------------------------------------------------------------------------
      | int8_t     | uint8_t, int16_t, uint16_t, uint32_t, int64_t, uint64_t  |
      | i8vec2     | u8vec2, i16vec2, u16vec2, u32vec2, i64vec2, u64vec2      |
      | i8vec3     | u8vec3, i16vec3, u16vec3, u32vec3, i64vec3, u64vec3      |
      | i8vec4     | u8vec4, i16vec4, u16vec4, u32vec4, i64vec4, u64vec4      |
      | int16_t    | uint16_t, uint32_t, int64_t, uint64_t                    |
      | i16vec2    | u16vec2, u32vec2, i64vec2, u64vec2                       |
      | i16vec3    | u16vec3, u32vec3, i64vec3, u64vec3,                      |
      | i16vec4    | u16vec4, u32vec4, i64vec4, u64vec4,                      |
      | uint8_t    | int16_t, uint16_t, uint32_t, int64_t, uint64_t           |
      | u8vec2     | i16vec2, u16vec2, u32vec2, i64vec2, u64vec2              |
      | u8vec3     | i16vec3, u16vec3, u32vec3, i64vec3, u64vec3              |
      | u8vec4     | i16vec4, u16vec4, u32vec4, i64vec4, u64vec4              |
      | uint16_t   | uint32_t, int64_t, uint64_t                              |
      | u16vec2    | u32vec2, i64vec2, u64vec2                                |
      | u16vec3    | u32vec3, i64vec3, u64vec3                                |
      | u16vec4    | u32vec4, i64vec4, u64vec4                                |
      | int32_t    | uint32_t, int64_t, uint64_t                              |
      | i32vec2    | u32vec2, i64vec2, u64vec2                                |
      | i32vec3    | u32vec3, i64vec3, u64vec3                                |
      | i32vec4    | u32vec4, i64vec4, u64vec4                                |
      | uint32_t   | int64_t, uint64_t                                        |
      | u32vec2    | i64vec2, u64vec2                                         |
      | u32vec3    | i64vec3, u64vec3                                         |
      | u32vec4    | i64vec4, u64vec4                                         |
      | int64_t    | uint64_t                                                 |
      | i64vec2    | u64vec2                                                  |
      | i64vec3    | u64vec3                                                  |
      | i64vec4    | u64vec4                                                  |
      -------------------------------------------------------------------------

      The following table shows allowed floating-point conversions:
      --------------------------------------------------------
      | Type of    |     Can be implicitly converted to      |
      | expression |                                         |
      --------------------------------------------------------
      | float16_t  | float32_t                               |
      | f16vec2    | f32vec2                                 |
      | f16vec3    | f32vec3                                 |
      | f16vec4    | f32vec4                                 |
      | f16mat2    | f32mat2                                 |
      | f16mat3    | f32mat3                                 |
      | f16mat4    | f32mat4                                 |
      | f16mat2x3  | f32mat2x3                               |
      | f16mat2x4  | f32mat2x4                               |
      | f16mat3x2  | f32mat3x2                               |
      | f16mat3x4  | f32mat3x4                               |
      | f16mat4x2  | f32mat4x2                               |
      | f16mat4x3  | f32mat4x3                               |
      --------------------------------------------------------

      The following table shows allowed floating-integral conversions:
      --------------------------------------------------------
      | Type of    |     Can be implicitly converted to      |
      | expression |                                         |
      --------------------------------------------------------
      | int8_t     | float16_t, float32_t, float64_t         |
      | i8vec2     | f16vec2, f32vec2, f64vec2               |
      | i8vec3     | f16vec3, f32vec3, f64vec3               |
      | i8vec4     | f16vec4, f32vec4, f64vecv4              |
      | int16_t    | float16_t, float32_t, float64_t         |
      | i16vec2    | f16vec2, f32vec2, f64vec2               |
      | i16vec3    | f16vec3, f32vec3, f64vec3               |
      | i16vec4    | f16vec4, f32vec4, f64vec4               |
      | uint8_t    | float16_t, float32_t, float64_t         |
      | u8vec2     | f16vec2, f32vec2, f64vec2               |
      | u8vec3     | f16vec3, f32vec3, f64vec3               |
      | u8vec4     | f16vec4, f32vec4, f64vec4               |
      | uint16_t   | float16_t, float32_t, float64_t         |
      | u16vec2    | f16vec2, f32vec2, f64vec2               |
      | u16vec3    | f16vec3, f32vec3, f64vec3               |
      | u16vec4    | f16vec4, f32vec4, f64vec4               |
      | int32_t    | float32_t, float64_t                    |
      | i32vec2    | f32vec2, f64vec2                        |
      | i32vec3    | f32vec3, f64vec3                        |
      | i32vec4    | f32vec4, f64vec4                        |
      | uint32_t   | float32_t, float64_t                    |
      | u32vec2    | f32vec2, f64vec2                        |
      | u32vec3    | f32vec3, f64vec3                        |
      | u32vec4    | f32vec4, f64vec4                        |
      | int64_t    | float64_t                               |
      | i64vec2    | f64vec2                                 |
      | i64vec3    | f64vec3                                 |
      | i64vec4    | f64vec4                                 |
      | uint64_t   | float64_t                               |
      | u64vec2    | f64vec2                                 |
      | u64vec3    | f64vec3                                 |
      | u64vec4    | f64vec4                                 |
      --------------------------------------------------------

      No implicit conversions are provided to convert from unsigned to signed
      integer types of the same rank, from floating-point to integer types,
      from higher-precision to lower-precision types, from larger types to
      smaller types, from scalars to vectors, from vectors to scalars, or
      between matrix types with non-matching number of columns and rows. There
      are no implicit array or structure conversions. For example, an array of
      int32_t cannot be implicitly converted to an array of float32_t.

      When an implicit conversion is done, it is not a re-interpretation of the
      expression's bit pattern, but a conversion of its value to an equivalent
      value in the new type. For example, the integer value -5 will be
      converted to the floating-point value -5.0.

      When converting integer values to floating-point values the result is
      exact if possible. If the value being converted is in the range of
      values that can be represented but the value cannot be represented
      exactly, then choice of either the next lower or higher representable
      value:
          * is determined by the rounding mode requested through the API, or
          * is implementation-defined if no rounding mode is requested.
      Integer values having more bits of precision than a floating-point
      mantissa will lose precision when converted to float. If the value being
      converted is outside the range of values that can be represented,
      the behavior is undefined.

      When performing implicit conversion for binary operators, there may be
      multiple data types to which the two operands can be converted. For
      example, when adding an int32_t value to a uint32_t value, both values
      can be implicitly converted to uint32_t, float32_t, and float64_t. In
      such cases conversion happens as defined as follows:
      (Note: In this paragraph vector and matrix types are referred to as
      types derived from scalar types with the same bit width and bit
      interpretation)
        - If either operand has type float64_t or derived from float64_t,
          the other shall be converted to float64_t or derived type.
        - Otherwise, if either operand has type float32_t or derived from
          float32_t, the other shall be converted to float32_t or derived type.
        - Otherwise, if either operand has type float16_t or derived from
          float16_t, the other shall be converted to float16_t or derived type.
        - Otherwise, if both operands have integer types the following rules
          shall be applied to the operands:
          - If both operands have the same type, no further conversion
            is needed.
          - If both operands have signed integer types or both
            have unsigned integer types, the operand with the type of lesser
            integer conversion rank shall be converted to the type of the
            operand with greater rank.
          - Otherwise, if the operand that has unsigned integer type has rank
            greater than to the rank of the type of the other
            operand, the operand with signed integer type shall be converted
            to the type of the operand with unsigned integer type.
          - Otherwise, if the type of the operand with signed integer type can
            represent all of the values of the type of the operand with
            unsigned integer type, the operand with unsigned integer type
            shall be converted to the type of the operand with signed
            integer type.
          - Otherwise, both operands shall be converted to the unsigned
            integer type corresponding to the type of the operand with signed
            integer type.

      (Note: Unlike C+, in case both operands have integer types the above
      rules do not require to perform integral promotions before any other
      conversion is considered)

      The conversions listed in the following subsections are done only as
      indicated by other sections of this specification.

      Every integer type has an integer conversion rank defined as follows:
       - No two signed integer types have the same rank.
       - The rank of a scalar signed integer type shall be greater than the rank
         of any scalar signed integer type with a smaller size.
       - The rank of int64_t shall be greater than the rank of int32_t, which
         shall be greater than the rank of int16_t, which shall be greater
         than the rank of int8_t.
       - The rank of any vector signed integer type is equal to the rank of the
         base scalar signed integer type.
       - The rank of any scalar unsigned integer type shall equal the rank of
         the corresponding scalar signed integer type.
       - The rank of any vector unsigned integer type is equal to the rank of
         the respective scalar unsigned integer type.

   Modify Section 4.3.6, Output Variables
   (add new bullet to the list in the second paragraph on p. 51)

    "It is a compile-time error to declare a fragment shader output that
     contains any of the following:
       ...
       * A 64-bit integer scalar or vector (int64_t, uint64_t, i64vec2, i64vec3,
         i64vec4, u64vec2, u64vec3, u64vec4)"

    Modify subsection 4.4.2.1 Transform Feedback Layout Qualifiers
    (insert after the fourth paragraph in the section on p. 70)
     "... will be a multiple of 8; if applied to an aggregrate containing a
      float16_t, the offset must also be a multiple of 2, and the space taken in
      he buffer will be a multiple of 2.""

    Modify subsection 4.7.1 Range and Precision.

    Modify the first sentence of the first paragraph to say:
     "The precision of stored half-, single-, and double-precision
     floating-point variables is defined by the IEEE 754-2008 standard for
     16-bit, 32-bit, and 64-bit floating-point numbers."

    Modify the first sentence of the second paragraph to say:
    "The following rules apply to half, single and double-precision operations:
     Positive and negative Infs and positive and negative zeros are generated as
     dictated by IEEE 754-2008, but subject to the precisions
     allowed in the following table."

     For half precision operations, precisions are required as follows:
     -----------------------------------------------------------------------
     | Operation           | Precision                                     |
     -----------------------------------------------------------------------
     | a + b, a - b, a * b | Correctly rounded.                            |
     | , >=    | Correct result.                               |
     | a / b, 1.0 / b      | 2.5 ULP for b in the range [2^(-14), 2^(14)]. |
     | a * b + c           | Correctly rounded single operation or         |
     |                     | sequence of two correctly rounded operations. |
     | fma()               | Inherited from a * b + c.                     |
     | pow(x, y)           | Inherited from exp2 (y * log2 (x)).           |
     | exp (x), exp2 (x)   | (1 + 2 * |x|) ULP.                            |
     | log (), log2()      | 3 ULP outside the range [0.5, 2.0].           |
     |                     | Absolute error
