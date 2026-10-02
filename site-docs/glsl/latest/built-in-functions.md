# Built-In Functions

## Metadata

- **Component**: glsl
- **Version**: latest
- **URL**: /glsl/latest/chapters/builtinfunctions.html

## Table of Contents

- [Angle and Trigonometry Functions](#angle-and-trigonometry-functions)
- [Angle_and_Trigonometry_Functions](#angle-and-trigonometry-functions)
- [Radians](#_radians)
- [Degrees](#_degrees)
- [Sin](#_sin)
- [Cos](#_cos)
- [Tan](#_tan)
- [Asin](#_asin)
- [Acos](#_acos)
- [Atan](#_atan)
- [Sinh](#_sinh)
- [Cosh](#_cosh)
- [Tanh](#_tanh)
- [Asinh](#_asinh)
- [Acosh](#_acosh)
- [Atanh](#_atanh)
- [Exponential Functions](#exponential-functions)
- [Pow](#_pow)
- [Exp](#_exp)
- [Log](#_log)
- [Exp2](#_exp2)
- [Log2](#_log2)
- [Sqrt](#_sqrt)
- [Inverse Sqrt](#_inverse_sqrt)
- [Common Functions](#common-functions)
- [Abs](#_abs)
- [Sign](#_sign)
- [Floor](#_floor)
- [Trunc](#_trunc)
- [Round](#_round)
- [Round Even](#_round_even)
- [Ceil](#_ceil)
- [Fract](#_fract)
- [Mod](#_mod)
- [Modf](#_modf)
- [Min](#_min)
- [Max](#_max)
- [Clamp](#_clamp)
- [Mix](#_mix)
- [Step](#_step)
- [Smoothstep](#_smoothstep)
- [Is NaN](#_is_nan)
- [Is Inf](#_is_inf)
- [Float Bits to Int](#_float_bits_to_int)
- [Float_Bits_to_Int](#_float_bits_to_int)
- [Int Bits to Float](#_int_bits_to_float)
- [Int_Bits_to_Float](#_int_bits_to_float)
- [Fma](#_fma)
- [Frexp](#_frexp)
- [Ldexp](#_ldexp)
- [Floating-Point Pack and Unpack Functions](#floating-point-pack-and-unpack-functions)
- [Floating-Point_Pack_and_Unpack_Functions](#floating-point-pack-and-unpack-functions)
- [Pack Unorm](#_pack_unorm)
- [Unpack Unorm](#_unpack_unorm)
- [Pack Half 2x16](#_pack_half_2x16)
- [Pack_Half_2x16](#_pack_half_2x16)
- [Unpack Half 2x16](#_unpack_half_2x16)
- [Unpack_Half_2x16](#_unpack_half_2x16)
- [Pack Double 2x32](#_pack_double_2x32)
- [Pack_Double_2x32](#_pack_double_2x32)
- [Unpack Double 2x32](#_unpack_double_2x32)
- [Unpack_Double_2x32](#_unpack_double_2x32)
- [Geometric Functions](#geometric-functions)
- [Length](#_length)
- [Distance](#_distance)
- [Dot](#_dot)
- [Cross](#_cross)
- [Normalize](#_normalize)
- [FTransform](#_ftransform)
- [Face Forward](#_face_forward)
- [Reflect](#_reflect)
- [Refract](#_refract)
- [Matrix Functions](#matrix-functions)
- [MatrixCompMult](#_matrixcompmult)
- [OuterProduct](#_outerproduct)
- [Transpose](#_transpose)
- [Determinant](#_determinant)
- [Inverse](#_inverse)
- [Vector Relational Functions](#vector-relational-functions)
- [Vector_Relational_Functions](#vector-relational-functions)
- [LessThan](#_lessthan)
- [LessThanEqual](#_lessthanequal)
- [GreaterThan](#_greaterthan)
- [GreaterThanEqual](#_greaterthanequal)
- [Equal](#_equal)
- [NotEqual](#_notequal)
- [Any](#_any)
- [All](#_all)
- [Not](#_not)
- [Integer Functions](#integer-functions)
- [UAddCarry](#_uaddcarry)
- [USubBorrow](#_usubborrow)
- [Mul Extended](#_mul_extended)
- [BitfieldExtract](#_bitfieldextract)
- [BitfieldInsert](#_bitfieldinsert)
- [BitfieldReverse](#_bitfieldreverse)
- [BitCount](#_bitcount)
- [FindLSB](#_findlsb)
- [FindMSB](#_findmsb)
- [Texture Functions](#texture-functions)
- [Texture Query Functions](#texture-query-functions)
- [Texture_Query_Functions](#texture-query-functions)
- [TextureSize](#_texturesize)
- [TextureQueryLod](#_texturequerylod)
- [TextureQueryLevels](#_texturequerylevels)
- [TextureSamples](#_texturesamples)
- [Texel Lookup Functions](#texel-lookup-functions)
- [Texel_Lookup_Functions](#texel-lookup-functions)
- [Texture](#_texture)
- [TextureProj](#_textureproj)
- [TextureLod](#_texturelod)
- [TextureOffset](#_textureoffset)
- [TexelFetch](#_texelfetch)
- [TexelFetchOffset](#_texelfetchoffset)
- [TextureProjOffset](#_textureprojoffset)
- [TextureLodOffset](#_texturelodoffset)
- [TextureProjLod](#_textureprojlod)
- [TextureProdLodOffset](#_textureprodlodoffset)
- [TextureGrad](#_texturegrad)
- [Explicit Gradients](#explicit-gradients)
- [TextureGradOffset](#_texturegradoffset)
- [TextureProjGrad](#_textureprojgrad)
- [TextureProjGradOffset](#_textureprojgradoffset)
- [Texture Gather Functions](#texture-gather-functions)
- [Texture_Gather_Functions](#texture-gather-functions)
- [TextureGather](#_texturegather)
- [TextureGatherOffset](#_texturegatheroffset)
- [TextureGatherOffsets](#_texturegatheroffsets)
- [Compatibility Profile Texture Functions](#compatibility-profile-texture-functions)
- [Compatibility_Profile_Texture_Functions](#compatibility-profile-texture-functions)
- [Texture1D](#_texture1d)
- [Texture2D](#_texture2d)
- [Texture3D](#_texture3d)
- [TextureCube](#_texturecube)
- [Shadow](#_shadow)
- [Atomic Counter Functions](#atomic-counter-functions)
- [Atomic_Counter_Functions](#atomic-counter-functions)
- [AtomicCounterIncrement](#_atomiccounterincrement)
- [AtomicCounterDecrement](#_atomiccounterdecrement)
- [AtomicCounter](#_atomiccounter)
- [AtomicCounterAdd](#_atomiccounteradd)
- [AtomicCounterSubtract](#_atomiccountersubtract)
- [AtomicCounterMin](#_atomiccountermin)
- [AtomicCounterMax](#_atomiccountermax)
- [AtomicCounterAnd](#_atomiccounterand)
- [AtomicCounterOr](#_atomiccounteror)
- [AtomicCounterXor](#_atomiccounterxor)
- [AtomicCounterExchange](#_atomiccounterexchange)
- [AtomicCounterCompSwap](#_atomiccountercompswap)
- [Atomic Memory Functions](#atomic-memory-functions)
- [Atomic_Memory_Functions](#atomic-memory-functions)
- [AtomicAdd](#_atomicadd)
- [AtomicMin](#_atomicmin)
- [AtomicMax](#_atomicmax)
- [AtomicAnd](#_atomicand)
- [AtomicOr](#_atomicor)
- [AtomicXor](#_atomicxor)
- [AtomicExchange](#_atomicexchange)
- [AtomicCompSwap](#_atomiccompswap)
- [Image Functions](#image-functions)
- [ImageSize](#_imagesize)
- [ImageSamples](#_imagesamples)
- [ImageLoad](#_imageload)
- [ImageStore](#_imagestore)
- [ImageAtomicAdd](#_imageatomicadd)
- [ImageAtomicMin](#_imageatomicmin)
- [ImageAtomicMax](#_imageatomicmax)
- [ImageAtomicAnd](#_imageatomicand)
- [ImageAtomicOr](#_imageatomicor)
- [ImageAtomicXor](#_imageatomicxor)
- [ImageAtomicExchange](#_imageatomicexchange)
- [ImageAtomicCompSwap](#_imageatomiccompswap)
- [Geometry Shader Functions](#geometry-shader-functions)
- [Geometry_Shader_Functions](#geometry-shader-functions)
- [EmitStreamVertex](#_emitstreamvertex)
- [EndStreamPrimitive](#_endstreamprimitive)
- [EmitVertex](#_emitvertex)
- [EndPrimitive](#_endprimitive)
- [Fragment Processing Functions](#fragment-processing-functions)
- [Fragment_Processing_Functions](#fragment-processing-functions)
- [Derivative Functions](#derivative-functions)
- [DFdx](#_dfdx)
- [DFdy](#_dfdy)
- [DFdxFine](#_dfdxfine)
- [DFdyFine](#_dfdyfine)
- [DFdxCoarse](#_dfdxcoarse)
- [DFdyCoarse](#_dfdycoarse)
- [Fwidth](#_fwidth)
- [FwidthFine](#_fwidthfine)
- [FwidthCoarse](#_fwidthcoarse)
- [Interpolation Functions](#interpolation-functions)
- [InterpolateAtCentroid](#_interpolateatcentroid)
- [InterpolateAtSample](#_interpolateatsample)
- [InterpolateAtOffset](#_interpolateatoffset)
- [Noise Functions](#noise-functions)
- [Noise1](#_noise1)
- [Noise2](#_noise2)
- [Noise3](#_noise3)
- [Noise4](#_noise4)
- [Shader Invocation Control Functions](#shader-invocation-control-functions)
- [Shader_Invocation_Control_Functions](#shader-invocation-control-functions)
- [Barrier](#_barrier)
- [Shader Memory Control Functions](#shader-memory-control-functions)
- [Shader_Memory_Control_Functions](#shader-memory-control-functions)
- [MemoryBarrier](#_memorybarrier)
- [MemoryBarrierAtomicCounter](#_memorybarrieratomiccounter)
- [MemoryBarrierBuffer](#_memorybarrierbuffer)
- [MemoryBarrierShared](#_memorybarriershared)
- [MemoryBarrierImage](#_memorybarrierimage)
- [GroupMemoryBarrier](#_groupmemorybarrier)
- [Subpass-Input Functions](#_subpass_input_functions)
- [SubpassLoad](#_subpassload)
- [Shader Invocation Group Functions](#shader-invocation-group-functions)
- [Shader_Invocation_Group_Functions](#shader-invocation-group-functions)
- [AnyInvocation](#_anyinvocation)
- [AllInvocations](#_allinvocations)
- [AllInvocationsEqual](#_allinvocationsequal)

## Content

The OpenGL Shading Language defines an assortment of built-in convenience functions for
scalar and vector operations.
Many of these built-in functions can be used in more than one type of
shader, but some are intended to provide a direct mapping to hardware and so
are available only for a specific type of shader.

The built-in functions basically fall into three categories:

* 
They expose some necessary hardware functionality in a convenient way
such as accessing a texture map.
There is no way in the language for these functions to be emulated by a
shader.

* 
They represent a trivial operation (clamp, mix, etc.) that is very
simple for the user to write, but they are very common and may have
direct hardware support.
It is a very hard problem for the compiler to map expressions to complex
assembler instructions.

* 
They represent an operation graphics hardware is likely to accelerate at
some point.
The trigonometry functions fall into this category.

Many of the functions are similar to the same named ones in common C
libraries, but they support vector input as well as the more traditional
scalar input.

Applications should be encouraged to use the built-in functions rather than
do the equivalent computations in their own shader code since the built-in
functions are assumed to be optimal (e.g. perhaps supported directly in
hardware).

User code can replace built-in functions with their own if they choose, by
simply redeclaring and defining the same name and argument list.
Because built-in functions are in a more outer scope than user built-in
functions, doing this will hide all built-in functions with the same name as
the redeclared function.

When the built-in functions are specified below, where the input arguments
(and corresponding output) can be **float**, **vec2**, **vec3**, or **vec4**,
*genFType* is used as the argument.
Where the input arguments (and corresponding output) can be **int**, **ivec2**,
**ivec3**, or **ivec4**, *genIType* is used as the argument.
Where the input arguments (and corresponding output) can be **uint**, **uvec2**,
**uvec3**, or **uvec4**, *genUType* is used as the argument.
Where the input arguments (or corresponding output) can be **bool**, **bvec2**,
**bvec3**, or **bvec4**, *genBType* is used as the argument.
Where the input arguments (and corresponding output) can be **double**,
**dvec2**, **dvec3**, **dvec4**, *genDType* is used as the argument.
For any specific use of a function, the actual types substituted for
*genFType*, *genIType*, *genUType*, or *genBType* have to have the same
number of components for all arguments and for the return type.
Similarly, *mat* is used for any matrix basic
type with single-precision
components and *dmat* is used for any matrix basic type with
double-precision components.

Built-in functions have an effective precision qualification.
This qualification cannot be set explicitly and may be different from the
precision qualification of the result.

|  | In general, as has been noted, precision qualification is ignored
| --- | --- |
unless targeting Vulkan. |

The precision qualification of the operation of a built-in function is based
on the precision qualification of its formal parameters and actual
parameters (input arguments): When a formal parameter specifies a precision
qualifier, that is used, otherwise, the precision qualification of the
actual (calling) argument is used.
The highest precision of these will be the precision of the operation of the
built-in function.
Generally, this is applied across all arguments to a built-in function, with
the exceptions being:

* 
**bitfieldExtract** and **bitfieldInsert** ignore the *offset* and *bits*
arguments.

* 
**interpolateAt** functions only look at the *interpolant* argument.

The precision qualification of the result of a built-in function is
determined in one of the following ways:

For the texture sampling and image load functions, the
precision of the return type matches the precision of the
image or texture-combined sampler type:

uniform lowp sampler2D texSampler;
highp vec2 coord;
...
lowp vec4 col = texture (texSampler, coord); // texture() returns lowp

Otherwise:

* 
For prototypes that do not specify a resulting precision qualifier, the
precision will be the same as the precision of the operation (as defined
earlier).

* 
For prototypes that do specify a resulting precision qualifier, the
specified precision qualifier is the precision qualification of the
result.

Where the built-in functions in the following sections specify an equation,
the entire equation will be evaluated at the operation’s precision.
This may lead to underflow or overflow in the result, even when the correct
result could be represented in the operation precision.

Function parameters specified as *angle* are assumed to be in units of
radians.
In no case will any of these functions result in a divide by zero error.
If the divisor of a ratio is 0, then results will be undefined.

These all operate component-wise.
The description is per component.

genFType radians(genFType degrees)

Converts *degrees* to radians, i.e., (π / 180) ⋅ degrees.

genFType degrees(genFType radians)

Converts *radians* to degrees, i.e., (180 / π) ⋅ radians.

genFType sin(genFType angle)

The standard trigonometric sine function.

genFType cos(genFType angle)

The standard trigonometric cosine function.

genFType tan(genFType angle)

The standard trigonometric tangent.

genFType asin(genFType x)

Arc sine. Returns an angle whose sine is *x*.

The range of values returned by this function is [-π / 2, π / 2].
Results are undefined if |x| > 1.

genFType acos(genFType x)

Arc cosine. Returns an angle whose cosine is *x*.

The range of values returned by this function is [0,π].
Results are undefined if |x| > 1.

genFType atan(genFType y, genFType x)

Arc tangent. Returns an angle whose tangent is y / x.

The signs of *x* and *y* are used to determine what quadrant the angle is in.
The range of values returned by this function is [-π, π].
Results are undefined if *x* and *y* are both 0.

genFType atan(genFType y_over_x)

Arc tangent. Returns an angle whose tangent is *y_over_x*.

The range of values returned by this function is [-π / 2, π / 2].

genFType sinh(genFType x)

Returns the hyperbolic sine function (ex - e-x) / 2.

genFType cosh(genFType x)

Returns the hyperbolic cosine function (ex + e-x) / 2.

genFType tanh(genFType x)

Returns the hyperbolic tangent function sinh(x) / cosh(x).

genFType asinh(genFType x)

Arc hyperbolic sine; returns the inverse of **sinh**.

genFType acosh(genFType x)

Arc hyperbolic cosine. Returns the non-negative inverse of **cosh**.

Results are undefined if x .

genFType atanh(genFType x)

Arc hyperbolic tangent. Returns the inverse of **tanh**.

Results are undefined if |x| ≥ 1.

These all operate component-wise.
The description is per component.

genFType pow(genFType x, genFType y)

Returns *x* raised to the *y* power, i.e., xy.

Results are undefined if x .
Results are undefined if x = 0 and y ≤ 0.

genFType exp(genFType x)

Returns the natural exponentiation of *x*, i.e., ex.

genFType log(genFType x)

Returns the natural logarithm of *x*, i.e., returns the value *y*
which satisfies the equation x = ey.

Results are undefined if x ≤ 0.

genFType exp2(genFType x)

Returns 2 raised to the *x* power, i.e., 2x.

genFType log2(genFType x)

Returns the base 2 logarithm of *x*, i.e., returns the value *y* which
satisfies the equation x = 2y.

Results are undefined if x ≤ 0.

genFType sqrt(genFType x)
genDType sqrt(genDType x)

Returns sqrt(x).

Results are undefined if x .

genFType inversesqrt(genFType x)
genDType inversesqrt(genDType x)

Returns 1 / sqrt(x).

Results are undefined if x ≤ 0.

These all operate component-wise.
The description is per component.

genFType abs(genFType x)
genIType abs(genIType x)
genDType abs(genDType x)

Returns *x* if x ≥ 0; otherwise it returns -*x*.

genFType sign(genFType x)
genIType sign(genIType x)
genDType sign(genDType x)

Returns 1.0 if *x* > 0, 0.0 if *x* = 0, or -1.0 if *x* 

genFType floor(genFType x)
genDType floor(genDType x)

Returns a value equal to the nearest integer that is less than or equal to *x*.

genFType trunc(genFType x)
genDType trunc(genDType x)

Returns a value equal to the nearest integer to *x* whose absolute
value is not larger than the absolute value of *x*.

genFType round(genFType x)
genDType round(genDType x)

Returns a value equal to the nearest integer to *x*.

The fraction 0.5 will round in a direction chosen by the
implementation, presumably the direction that is fastest.
This includes the possibility that **round**(*x*) returns the same value
as **roundEven**(*x*) for all values of *x*.

genFType roundEven(genFType x)
genDType roundEven(genDType x)

Returns a value equal to the nearest integer to *x*.

A fractional part of 0.5 will round toward the nearest even integer.
(Both 3.5 and 4.5 for x will return 4.0.)

genFType ceil(genFType x)
genDType ceil(genDType x)

Returns a value equal to the nearest integer that is greater than or equal to *x*.

genFType fract(genFType x)
genDType fract(genDType x)

Returns *x* - **floor**(*x*).

genFType mod(genFType x, float y)
genFType mod(genFType x, genFType y)
genDType mod(genDType x, double y)
genDType mod(genDType x, genDType y)

Modulus. Returns x - y ⋅ **floor**(x / y).

Note that implementations may use a cheap approximation to the remainder,
and the error can be large due to the discontinuity in **floor**. This can
produce mathematically unexpected results in some cases, such as
**mod**(*x*,*x*) computing *x* rather than 0, and can also cause the result
to have a different sign than the infinitely precise result.

genFType modf(genFType x, out genFType i)
genDType modf(genDType x, out genDType i)

Returns the fractional part of *x* and sets *i* to the integer part (as
a whole number floating-point value).

Both the return value and the output parameter will have the same sign as *x*.

genFType min(genFType x, genFType y)
genFType min(genFType x, float y)
genDType min(genDType x, genDType y)
genDType min(genDType x, double y)
genIType min(genIType x, genIType y)
genIType min(genIType x, int y)
genUType min(genUType x, genUType y)
genUType min(genUType x, uint y)

Returns *y* if *y* 

Which operand is the result is undefined if one of the operands is a NaN.

genFType max(genFType x, genFType y)
genFType max(genFType x, float y)
genDType max(genDType x, genDType y)
genDType max(genDType x, double y)
genIType max(genIType x, genIType y)
genIType max(genIType x, int y)
genUType max(genUType x, genUType y)
genUType max(genUType x, uint y)

Returns *y* if *x* 

Which operand is the result is undefined if one of the operands is a NaN.

genFType clamp(genFType x, genFType minVal, genFType maxVal)
genFType clamp(genFType x, float minVal, float maxVal)
genDType clamp(genDType x, genDType minVal, genDType maxVal)
genDType clamp(genDType x, double minVal, double maxVal)
genIType clamp(genIType x, genIType minVal, genIType maxVal)
genIType clamp(genIType x, int minVal, int maxVal)
genUType clamp(genUType x, genUType minVal, genUType maxVal)
genUType clamp(genUType x, uint minVal, uint maxVal)

Returns **min**(**max**(*x*, *minVal*), *maxVal*).

Results are undefined if *minVal* > *maxVal*.

genFType mix(genFType x, genFType y, genFType a)
genFType mix(genFType x, genFType y, float a)
genDType mix(genDType x, genDType y, genDType a)
genDType mix(genDType x, genDType y, double a)

Returns the linear blend of *x* and *y*, i.e., x ⋅ (1 - a) + y ⋅ a.

genFType mix(genFType x, genFType y, genBType a)
genDType mix(genDType x, genDType y, genBType a)
genIType mix(genIType x, genIType y, genBType a)
genUType mix(genUType x, genUType y, genBType a)
genBType mix(genBType x, genBType y, genBType a)

Selects which vector each returned component comes from.

For a component of *a* that is **false**, the corresponding component of *x* is returned.

For a component of *a* that is **true**, the corresponding component of *y* is returned.

Components of *x* and *y* that are not selected are allowed to be
invalid floating-point values and will have no effect on the results.
Thus, this provides different functionality than, for example,

genFType **mix**(genFType *x*, genFType *y*, genFType(*a*))

where *a* is a Boolean vector.

genFType step(genFType edge, genFType x)
genFType step(float edge, genFType x)
genDType step(genDType edge, genDType x)
genDType step(double edge, genDType x)

Returns 0.0 if *x* 

genFType smoothstep(genFType edge0, genFType edge1, genFType x)
genFType smoothstep(float edge0, float edge1, genFType x)
genDType smoothstep(genDType edge0, genDType edge1, genDType x)
genDType smoothstep(double edge0, double edge1, genDType x)

Returns 0.0 if x ≤ edge0 and 1.0 if x ≥ edge1, and
performs smooth Hermite interpolation between 0 and 1 when edge0 .

This is useful in cases where you would want a threshold function with a smooth transition.

This is equivalent to:

genFType t;
t = clamp ((x - edge0) / (edge1 - edge0), 0, 1);
return t * t * (3 - 2 * t);

(And similarly for doubles.) Results are undefined if edge0 ≥ edge1.

genBType isnan(genFType x)
genBType isnan(genDType x)

Returns **true** if *x* holds a NaN. Returns **false** otherwise.

Always returns **false** if NaNs are not implemented.

genBType isinf(genFType x)
genBType isinf(genDType x)

Returns **true** if *x* holds a positive infinity or negative infinity. Returns **false** otherwise.

genIType floatBitsToInt(highp genFType value)
genUType floatBitsToUint(highp genFType value)

Returns a signed or unsigned integer value representing the encoding of a floating-point value.

The **float** value’s bit-level representation is preserved.

genFType intBitsToFloat(highp genIType value)
genFType uintBitsToFloat(highp genUType value)

Returns a floating-point value corresponding to a signed or unsigned integer encoding of a
floating-point value.

If a NaN is passed in, it will not signal, and the resulting value is unspecified.

If an Inf is passed in, the resulting value is the corresponding Inf.

If a subnormal number is passed in, the result might be flushed to 0.
Otherwise, the bit-level representation is preserved.

genFType fma(genFType a, genFType b, genFType c)
genDType fma(genDType a, genDType b, genDType c)

Computes and returns `a * b + c`.

In uses where the return value is eventually consumed by a variable declared as **precise**:

* 
**fma**() is considered a single operation, whereas the expression `a * b
+ c` consumed by a variable declared **precise** is considered two
operations.

* 
The precision of **fma**() can differ from the precision of the expression
`a * b + c`.

* 
**fma**() will be computed with the same precision as any other **fma**()
consumed by a precise variable, giving invariant results for the same
input values of *a*, *b*, and *c*.

Otherwise, in the absence of **precise** consumption, there are no special
constraints on the number of operations or difference in precision between
**fma**() and the expression `a * b + c`.

genFType frexp(highp genFType x, out highp genIType exp)
genDType frexp(genDType x, out genIType exp)

Splits *x* into a floating-point significand in the range
[0.5,1.0], and an integral exponent of two, such that

x = significand ⋅ 2exponent

The significand is returned by the function and the exponent is
returned in the parameter *exp*. For a floating-point value of zero, the
significand and exponent are both zero.

If an implementation supports signed zero, an input value of minus
zero should return a significand of minus zero. For a floating-point value that
is an infinity or is not a number, the results are undefined.

If the input *x* is a vector, this operation is performed in a
component-wise manner; the value returned by the function and the
value written to *exp* are vectors with the same number of components as *x*.

genFType ldexp(highp genFType x, highp genIType exp)
genDType ldexp(genDType x, genIType exp)

Builds a floating-point number from *x* and the corresponding integral
exponent of two in *exp*, returning:

significand ⋅ 2exponent

If this product is too large to be represented in the floating-point
type, the result is undefined.

If *exp* is greater than +128 (single-precision) or +1024
(double-precision), the value returned is undefined.

If *exp* is less than -126 (single-precision) or -1022
(double-precision), the value returned may be flushed to zero.

Additionally, splitting the value into a significand and exponent
using **frexp**() and then reconstructing a floating-point value using
**ldexp**() should yield the original input for zero and all finite
non-subnormal values.

If the input *x* is a vector, this operation is performed in a
component-wise manner; the value passed in *exp* and returned by the
function are vectors with the same number of components as *x*.

These functions do not operate component-wise, rather, as described in each
case.

highp uint packUnorm2x16(vec2 v)
highp uint packSnorm2x16(vec2 v)
uint packUnorm4x8(vec4 v)
uint packSnorm4x8(vec4 v)

First, converts each component of the normalized floating-point value
*v* into 16-bit (**2x16**) or 8-bit (**4x8**) integer values.

Then, the results are packed into the returned 32-bit unsigned
integer.

The conversion for component *c* of *v* to fixed point is done as
follows:

**packUnorm2x16**: `round(clamp(c, 0, +1) * 65535.0)`

**packSnorm2x16:** `round(clamp(c, -1, +1) * 32767.0)`

**packUnorm4x8**: `round(clamp(c, 0, +1) * 255.0)`

**packSnorm4x8**: `round(clamp(c, -1, +1) * 127.0)`

The first component of the vector will be written to the least
significant bits of the output; the last component will be written to
the most significant bits.

vec2 unpackUnorm2x16(highp uint p)
vec2 unpackSnorm2x16(highp uint p)
vec4 unpackUnorm4x8(highp uint p)
vec4 unpackSnorm4x8(highp uint p)

First, unpacks a single 32-bit unsigned integer *p* into a pair of
16-bit unsigned integers, a pair of 16-bit signed integers, four 8-bit
unsigned integers, or four 8-bit signed integers, respectively.

Then, each component is converted to a normalized floating-point value
to generate the returned two- or four-component vector.

The conversion for unpacked fixed-point value *f* to floating-point is
done as follows:

**unpackUnorm2x16**: `*f* / 65535.0`

**unpackSnorm2x16**: `clamp(*f* / 32767.0, -1, +1)`

**unpackUnorm4x8**: `*f* / 255.0`

**unpackSnorm4x8**: `clamp(*f* / 127.0, -1, +1)`

The first component of the returned vector will be extracted from the
least significant bits of the input; the last component will be
extracted from the most significant bits.

uint packHalf2x16(vec2 v)

Returns an unsigned integer obtained by converting the components of a
two-component floating-point vector to the 16-bit floating-point
representation of the [API](references.html#references), and
then packing these two 16-bit integers into a 32-bit unsigned integer.

The first vector component specifies the 16 least-significant bits of
the result; the second component specifies the 16 most-significant
bits.

vec2 unpackHalf2x16(uint v)

Returns a two-component floating-point vector with components obtained
by unpacking a 32-bit unsigned integer into a pair of 16-bit values,
interpreting those values as 16-bit floating-point numbers according
to the [API](references.html#references), and converting them to
32-bit floating-point values.

The first component of the vector is obtained from the 16
least-significant bits of *v*; the second component is obtained from
the 16 most-significant bits of *v*.

double packDouble2x32(uvec2 v)

Returns a double-precision value obtained by packing the components of
*v* into a 64-bit value.

If an IEEE 754 Inf or NaN is created, it will not signal, and the
resulting floating-point value is unspecified.

Otherwise, the bit-level representation of *v* is preserved.
The first vector component specifies the 32 least significant bits;
the second component specifies the 32 most significant bits.

uvec2 unpackDouble2x32(double v)

Returns a two-component unsigned integer vector representation of *v*.

The bit-level representation of *v* is preserved.

The first component of the vector contains the 32 least significant
bits of the double; the second component consists of the 32 most
significant bits.

These operate on vectors as vectors, not component-wise.

float length(genFType x)
double length(genDType x)

Returns the length of vector *x*, i.e., sqrt( x02 + x12 + …​ ).

float distance(genFType p0, genFType p1)
double distance(genDType p0, genDType p1)

Returns the distance between *p0* and *p1*, i.e., **length**(*p0* - *p1*)

float dot(genFType x, genFType y)
double dot(genDType x, genDType y)

Returns the dot product of *x* and *y*, i.e., x0 ⋅ y0 + x1 ⋅ y1 + …​

vec3 cross(vec3 x, vec3 y)
dvec3 cross(dvec3 x, dvec3 y)

Returns the cross product of *x* and *y*, i.e.,
      (x1 ⋅ y2 - y1 ⋅ x2,
            x2 ⋅ y0 - y2 ⋅ x0,
            x0 ⋅ y1 - y0 ⋅ x1).

genFType normalize(genFType x)
genDType normalize(genDType x)

Returns a vector in the same direction as *x* but with a length of 1, i.e. *x* / **length**(x).

Compatibility profile only

vec4 ftransform()

Available only when using the compatibility profile. For core OpenGL, use **invariant**.

For vertex shaders only. This function will ensure that the incoming vertex value will be
transformed in a way that produces exactly the same result as would be produced by OpenGL’s
fixed functionality transform. It is intended to be used to compute *gl_Position*, e.g.

gl_Position = ftransform()

This function should be used, for example, when an application is rendering the same geometry in
separate passes, and one pass uses the fixed functionality path to render and another pass uses
programmable shaders.

genFType faceforward(genFType N, genFType I, genFType Nref)
genDType faceforward(genDType N, genDType I, genDType Nref)

If **dot**(*Nref*, *I*) 

genFType reflect(genFType I, genFType N)
genDType reflect(genDType I, genDType N)

For the incident vector *I* and surface orientation *N*, returns the reflection direction:
I - 2 ⋅ **dot**(N, I) ⋅ N. *N* must already be normalized in order to achieve
the desired result.

genFType refract(genFType I, genFType N, float eta)
genDType refract(genDType I, genDType N, double eta)

For the incident vector *I* and surface normal *N*, and the ratio of indices of refraction
*eta*, return the refraction vector. The result is computed by the refraction equation shown below.

  

  

  

  

The input parameters for the incident vector *I* and the surface normal *N* must already be
normalized to get the desired results.

For each of the following built-in matrix functions, there is both a
single-precision floating-point version, where all arguments and return
values are single precision, and a double-precision floating-point version,
where all arguments and return values are double precision.
Only the single-precision floating-point version is shown.

mat matrixCompMult(mat x, mat y)

Multiply matrix *x* by matrix *y* component-wise, i.e., `result[i][j]`
is the scalar product of `*x*[i][j]` and `*y*[i][j]`.

|  | To get linear algebraic matrix multiplication, use the multiply operator (*****). |
| --- | --- |

mat2 outerProduct(vec2 c, vec2 r)
mat3 outerProduct(vec3 c, vec3 r)
mat4 outerProduct(vec4 c, vec4 r)
mat2x3 outerProduct(vec3 c, vec2 r)
mat3x2 outerProduct(vec2 c, vec3 r)
mat2x4 outerProduct(vec4 c, vec2 r)
mat4x2 outerProduct(vec2 c, vec4 r)
mat3x4 outerProduct(vec4 c, vec3 r)
mat4x3 outerProduct(vec3 c, vec4 r)

Treats the first parameter *c* as a column vector (matrix with one
column) and the second parameter *r* as a row vector (matrix with one
row) and does a linear algebraic matrix multiply *c* * *r*, yielding a
matrix whose number of rows is the number of components in *c* and
whose number of columns is the number of components in *r*.

mat2 transpose(mat2 m)
mat3 transpose(mat3 m)
mat4 transpose(mat4 m)
mat2x3 transpose(mat3x2 m)

mat3x2 transpose(mat2x3 m)
mat2x4 transpose(mat4x2 m)
mat4x2 transpose(mat2x4 m)
mat3x4 transpose(mat4x3 m)
mat4x3 transpose(mat3x4 m)

Returns a matrix that is the transpose of *m*.

The input matrix *m* is not modified.

float determinant(mat2 m)
float determinant(mat3 m)
float determinant(mat4 m)

Returns the determinant of *m*.

mat2 inverse(mat2 m)
mat3 inverse(mat3 m)
mat4 inverse(mat4 m)

Returns a matrix that is the inverse of *m*.

The input matrix *m* is not modified.

The values in the returned matrix are undefined if *m* is singular or
poorly-conditioned (nearly singular).

Relational and equality operators (****, **>=**, **==**, **!=**) are
defined to operate on scalars and produce scalar Boolean results.
For vector results, use the following built-in functions.
Below, the following placeholders are used for the listed specific types:

| Placeholder | Specific Types Allowed |
| --- | --- |
| bvec | bvec2, bvec3, bvec4 |
| ivec | ivec2, ivec3, ivec4 |
| uvec | uvec2, uvec3, uvec4 |
| vec | vec2, vec3, vec4, dvec2, dvec3, dvec4 |

In all cases, the sizes of all the input and return vectors for any
particular call must match.

bvec lessThan(vec x, vec y)
bvec lessThan(ivec x, ivec y)
bvec lessThan(uvec x, uvec y)

Returns the component-wise compare of x .

bvec lessThanEqual(vec x, vec y)
bvec lessThanEqual(ivec x, ivec y)
bvec lessThanEqual(uvec x, uvec y)

Returns the component-wise compare of x ≤ y.

bvec greaterThan(vec x, vec y)
bvec greaterThan(ivec x, ivec y)
bvec greaterThan(uvec x, uvec y)

Returns the component-wise compare of x > y.

bvec greaterThanEqual(vec x, vec y)
bvec greaterThanEqual(ivec x, ivec y)
bvec greaterThanEqual(uvec x, uvec y)

Returns the component-wise compare of x ≥ y.

bvec equal(vec x, vec y)
bvec equal(ivec x, ivec y)
bvec equal(uvec x, uvec y)
bvec equal(bvec x, bvec y)

Returns the component-wise compare of x == y.

bvec notEqual(vec x, vec y)
bvec notEqual(ivec x, ivec y)
bvec notEqual(uvec x, uvec y)
bvec notEqual(bvec x, bvec y)

Returns the component-wise compare of x ≠ y.

bool any(bvec x)

Returns **true** if any component of *x* is **true**.

bool all(bvec x)

Returns **true** only if all components of *x* are **true**.

bvec not(bvec x)

Returns the component-wise logical complement of *x*.

These all operate component-wise.
The description is per component.
The notation [*a*, *b*] means the set of bits from bit-number *a* through
bit-number *b*, inclusive.
The lowest-order bit is bit 0.
“Bit number” will always refer to counting up from the lowest-order bit as
bit 0.

genUType uaddCarry(highp genUType x, highp genUType y, out lowp genUType carry)

Adds 32-bit unsigned integers *x* and *y*, returning the sum modulo 232.

The value *carry* is set to zero if the sum was less than 232, or one otherwise.

genUType usubBorrow(highp genUType x, highp genUType y, out lowp genUType borrow)

Subtracts the 32-bit unsigned integer *y* from *x*, returning the difference if non-negative, or
232 plus the difference otherwise.

The value *borrow* is set to zero if x ≥ y, or one otherwise.

void umulExtended(highp genUType x,
                  highp genUType y,
                  out highp genUType msb,
                  out highp genUType lsb)
void imulExtended(highp genIType x,
                  highp genIType y,
                  out highp genIType msb,
                  out highp genIType lsb)

Multiplies 32-bit unsigned or signed integers *x* and *y*, producing a 64-bit result.

* 
The 32 least-significant bits are returned in *lsb*.

* 
The 32 most-significant bits are returned in *msb*.

genIType bitfieldExtract(genIType value, int offset, int bits)
genUType bitfieldExtract(genUType value, int offset, int bits)

Extracts bits [offset, offset + bits - 1] from *value*, returning them in the least
significant bits of the result.

For unsigned data types, the most significant bits of the result will be set to zero.
For signed data types, the most significant bits will be set to the value of bit
offset + bits - 1.

If *bits* is zero, the result will be zero. The result will be undefined if *offset* or *bits* is
negative, or if the sum of *offset* and *bits* is greater than the number of bits used to store the
operand.

Note that for vector versions of **bitfieldExtract**(), a single pair of *offset* and *bits* values
is shared for all components.

genIType bitfieldInsert(genIType base, genIType insert, int offset, int bits)
genUType bitfieldInsert(genUType base, genUType insert, int offset, int bits)

Inserts the *bits* least significant bits of *insert* into *base*.

The result will have bits [offset, offset + bits - 1] taken from bits [0, bits - 1] of
*insert*, and all other bits taken directly from the corresponding bits of *base*.
If *bits* is zero, the result will simply be *base*. The result will be undefined if *offset* or
*bits* is negative, or if the sum of *offset* and *bits* is greater than the number of bits used
to store the operand.

Note that for vector versions of **bitfieldInsert**(), a single pair of *offset* and *bits* values is
shared for all components.

genIType bitfieldReverse(highp genIType value)
genUType bitfieldReverse(highp genUType value)

Reverses the bits of *value*.

The bit numbered *n* of the result will be taken from bit (bits -1) - n of *value*, where
*bits* is the total number of bits used to represent *value*.

genIType bitCount(genIType value)
genIType bitCount(genUType value)

Returns the number of one bits in the binary representation of *value*.

genIType findLSB(genIType value)
genIType findLSB(genUType value)

Returns the bit number of the least significant one bit in the binary representation of *value*.

If *value* is zero, -1 will be returned.

genIType findMSB(highp genIType value)
genIType findMSB(highp genUType value)

Returns the bit number of the most significant bit in the binary representation of *value*.

For positive integers, the result will be the bit number of the most significant one bit.
For negative integers, the result will be the bit number of the most significant zero bit.
For a *value* of zero or negative one, -1 will be returned.

Texture lookup functions are available in all shading stages.
However, level-of-detail is implicitly computed only for fragment shaders.
Other shaders operate as though the base level-of-detail were computed as
zero.
The functions in the table below provide access to textures through
texture-combined samplers, as set up through the API.
Texture properties such as size, pixel format, number of dimensions,
filtering method, number of mipmap levels, depth comparison, and so on are
also defined by API calls.
Such properties are taken into account as the texture is accessed via the
built-in functions defined below.

Texture data can be stored by the GL as single-precision floating-point,
normalized integer, unsigned integer or signed integer data.
This is determined by the type of the internal format of the texture.

Texture lookup functions are provided that can return their result as
floating-point, unsigned integer or signed integer, depending on the sampler
type passed to the lookup function.
Care must be taken to use the right sampler type for texture access.
The following table lists the supported combinations of sampler types and
texture internal formats.
Blank entries are unsupported.
Doing a texture lookup will return undefined values for unsupported
combinations.

For depth/stencil textures, the internal texture format is determined by the
component being accessed as set through the API.
When the depth/stencil texture mode is set to DEPTH_COMPONENT, the internal
format of the depth component should be used.
When the depth/stencil texture mode is set to STENCIL_INDEX, the internal format
of the stencil component should be used.

| Internal Texture Format | Floating-Point Sampler Types | Signed Integer Sampler Types | Unsigned Integer Sampler Types |
| --- | --- | --- | --- |
| Floating-point | Supported |  |  |
| Normalized Integer | Supported |  |  |
| Signed Integer |  | Supported |  |
| Unsigned Integer |  |  | Supported |

If an integer sampler type is used, the result of a texture lookup is an
**ivec4**.
If an unsigned integer sampler type is used, the result of a texture lookup
is a **uvec4**.
If a floating-point sampler type is used, the result of a texture lookup is
a **vec4**.

In the prototypes below, the `g` in the return type `gvec4` is used
as a placeholder for either nothing, `i`, or `u` making a return type of
**vec4**, **ivec4**, or **uvec4**.
In these cases, the sampler argument type also starts with `g`,
indicating the same substitution done on the return type; it is either a
single-precision
floating-point, signed integer, or unsigned integer sampler, matching the
basic type of the return type, as described above.

For shadow forms (the sampler parameter is a shadow-type), a depth
comparison lookup on the depth texture bound to *sampler* is done as
described in section
8.23
“Texture Comparison Modes” of the
[OpenGL Specification](references.html#references).
See the table below for which component specifies *Dref*.
The texture bound to *sampler* must be a depth texture, or results are
undefined.
If a non-shadow texture call is made to a sampler that represents a depth
texture with depth comparisons turned on, then results are undefined.
If a shadow texture call is made to a sampler that represents a depth
texture with depth comparisons turned off, then results are undefined.
If a shadow texture call is made to a sampler that does not represent a
depth texture, then results are undefined.

In all functions below, the *bias* parameter is optional for fragment
shaders.
The *bias* parameter is not accepted in any other shader stage.
For a fragment shader, if *bias* is present, it is added to the implicit
level-of-detail prior to performing the texture access operation.
No *bias* or *lod* parameters for
rectangle textures,
multisample textures, or texture buffers
are supported because mipmaps are not allowed for these types of textures.

The implicit level-of-detail is selected as follows: For a texture that is
not mipmapped, the texture is used directly.
If it is mipmapped and running in a fragment shader, the level-of-detail
computed by the implementation is used to do the texture lookup.
If it is mipmapped and running in a non-fragment shader, then the base
texture is used.

Some texture functions (non-“**Lod**” and non-“**Grad**” versions) may
require implicit derivatives.
Implicit derivatives are undefined within non-uniform control flow and for
non-fragment shader texture fetches.

For **Cube** forms, the direction of *P* is used to select which face to do a
2-dimensional texture lookup in, as described in section 8.13 “Cube Map
Texture Selection” of the [OpenGL Specification](references.html#references).

For **Array** forms, the array layer used will be

  

where *d* is the depth of the texture array and *layer* comes from the
component indicated in the tables below.

The **textureSize** functions query the dimensions of a specific texture level
for a texture-combined sampler.

The **textureQueryLod** functions are available only in a fragment shader.
They take the components of *P* and compute the level-of-detail information
that the texture pipe would use to access that texture through a normal
texture lookup.
The level-of-detail    (equation 3.18 of the
[OpenGL Specification](references.html#references)) is obtained after any level-of-detail bias, but
prior to clamping to [TEXTURE_MIN_LOD, TEXTURE_MAX_LOD].
The mipmap array(s) that would be accessed are also computed.
If a single level-of-detail would be accessed, the level-of-detail number
relative to the base level is returned.
If multiple levels-of-detail would be accessed, a floating-point number
between the two levels is returned, with the fractional part equal to the
fractional part of the computed and clamped level-of-detail.

The algorithm used is given by the following pseudo-code:

float ComputeAccessedLod(float computedLod)
{
    // Clamp the computed LOD according to the texture LOD clamps.
    if (computedLod  TEXTURE_MAX_LOD) computedLod = TEXTURE_MAX_LOD;

    // Clamp the computed LOD to the range of accessible levels.
    if (computedLod  (float) maxAccessibleLevel)
        computedLod = (float) maxAccessibleLevel;

    // Return a value according to the min filter.
    if (TEXTURE_MIN_FILTER is LINEAR or NEAREST) {
        return 0.0;
    } else if (TEXTURE_MIN_FILTER is NEAREST_MIPMAP_NEAREST
               or LINEAR_MIPMAP_NEAREST) {
        return ceil(computedLod + 0.5) - 1.0;
    } else {
        return computedLod;
    }
}

The value *maxAccessibleLevel* is the level number of the smallest
accessible level of the mipmap array (the value *q* in section 8.14.3
“Mipmapping” of the [OpenGL Specification](references.html#references)) minus the base level.

int textureSize(gsampler1D sampler, int lod)
ivec2 textureSize(gsampler2D sampler, int lod)
ivec3 textureSize(gsampler3D sampler, int lod)
ivec2 textureSize(gsamplerCube sampler, int lod)
int textureSize(sampler1DShadow sampler, int lod)
ivec2 textureSize(sampler2DShadow sampler, int lod)
ivec2 textureSize(samplerCubeShadow sampler, in lod)
ivec3 textureSize(gsamplerCubeArray sampler, int lod)
ivec3 textureSize(samplerCubeArrayShadow sampler, int lod)
ivec2 textureSize(gsampler1DArray sampler, int lod)
ivec2 textureSize(sampler1DArrayShadow sampler, int lod)
ivec3 textureSize(gsampler2DArray sampler, int lod)
ivec3 textureSize(sampler2DArrayShadow sampler, int lod)
ivec2 textureSize(gsamler2DRect sampler)
ivec2 textureSize(sampler2DRectShadow sampler)
int textureSize(gsamplerBuffer sampler)
ivec2 textureSize(gsampler2DMS sampler)
ivec3 textureSize(gsampler2DMSArray sampler)

Returns the dimensions of level *lod* (if present) for the texture bound to *sampler*, as described
in section 11.1.3.4 “Texture Queries” of the [OpenGL Specification](references.html#references).

The components in the return value are filled in, in order, with the width, height, and depth of
the texture.

For the array forms, the last component of the return value is the number of layers in the texture
array, or the number of cubes in the texture cube map array.

vec2 textureQueryLod(gsampler1D sampler, float P)
vec2 textureQueryLod(gsampler2D sampler, vec2 P)
vec2 textureQueryLod(gsampler3D sampler, vec3 P)
vec2 textureQueryLod(gsamplerCube sampler, vec3 P)
vec2 textureQueryLod(gsampler1DArray sampler, float P)
vec2 textureQueryLod(gsampler2DArray sampler, vec2 P)
vec2 textureQueryLod(gsamplerCubeArray sampler, vec3 P)
vec2 textureQueryLod(sampler1DShadow sampler, float P)
vec2 textureQueryLod(sampler2DShadow sampler, vec2 P)
vec2 textureQueryLod(samplerCubeShadow sampler, vec3 P)
vec2 textureQueryLod(sampler1DArrayShadow sampler, float P)
vec2 textureQueryLod(sampler2DArrayShadow sampler, vec2 P)
vec2 textureQueryLod(samplerCubeArrayShadow sampler, vec P)

Returns the mipmap array(s) that would be accessed in the *x* component of the return value.

Returns the computed level-of-detail relative to the base level in the *y* component of the return
value.

If called on an incomplete texture, the results are undefined.

int textureQueryLevels(gsampler1D sampler)
int textureQueryLevels(gsampler2D sampler)
int textureQueryLevels(gsampler3D sampler)
int textureQueryLevels(gsamplerCube sampler)
int textureQueryLevels(gsampler1DArray sampler)
int textureQueryLevels(gsampler2DArray sampler)
int textureQueryLevels(gsamplerCubeArray sampler)
int textureQueryLevels(sampler1DShadow sampler)
int textureQueryLevels(sampler2DShadow sampler)
int textureQueryLevels(samplerCubeShadow sampler)
int textureQueryLevels(sampler1DArrayShadow sampler)
int textureQueryLevels(sampler2DArrayShadow sampler)
int textureQueryLevels(samplerCubeArrayShadow sampler)

Returns the number of mipmap levels accessible in the texture associated with *sampler*, as defined
in the [OpenGL Specification.](references.html#references)

The value zero will be returned if no texture or an incomplete texture is associated with *sampler*.

Available in all shader stages.

int textureSamples(gsampler2DMS sampler)
int textureSamples(gsampler2DMSArray sampler)

Returns the number of samples of the texture bound to *sampler*.

gvec4 texture(gsampler1D sampler, float P [, float bias])
gvec4 texture(gsampler2D sampler, vec2 P [, float bias])
gvec4 texture(gsampler3D sampler, vec3 P [, float bias])
gvec4 texture(gsamplerCube sampler, vec3 P [, float bias])
float texture(sampler1DShadow sampler, vec3 P [, float bias])
float texture(sampler2DShadow sampler, vec3 P [, float bias])
float texture(samplerCubeShadow sampler, vec4 P [, float bias])
gvec4 texture(gsampler2DArray sampler, vec3 P [, float bias])
gvec4 texture(gsamplerCubeArray sampler, vec4 P [, float bias])
gvec4 texture(gsampler1DArray sampler, vec2 P [, float bias])
float texture(sampler1DArrayShadow sampler, vec3 P [, float bias])
float texture(sampler2DArrayShadow sampler, vec4 P)
gvec4 texture(gsampler2DRect sampler, vec2 P)
float texture(sampler2DRectShadow sampler, vec3 P)
float texture(samplerCubeArrayShadow sampler, vec4 P, float compare)

Use the texture coordinate *P* to do a texture lookup in the texture currently bound to *sampler*.

For shadow forms: When *compare* is present, it is used as *Dref* and the array layer comes from
the last component of *P*. When *compare* is not present, the last component of *P* is used as
*Dref* and the array layer comes from the second to last component of *P*.
(The second component of *P* is unused for **1D** shadow lookups.)

For non-shadow forms: the array layer comes from the last component of *P*.

gvec4 textureProj(gsampler1D sampler, vec2 P [, float bias])
gvec4 textureProj(gsampler1D sampler, vec4 P [, float bias])
gvec4 textureProj(gsampler2D sampler, vec3 P [, float bias])
gvec4 textureProj(gsampler2D sampler, vec4 P [, float bias])
gvec4 textureProj(gsampler3D sampler, vec4 P [, float bias])
float textureProj(sampler1DShadow sampler, vec4 P [, float bias])
float textureProj(sampler2DShadow sampler, vec4 P [, float bias])
gvec4 textureProj(gsampler2DRect sampler, vec3 P)
gvec4 textureProj(gsampler2DRect sampler, vec4 P)
float textureProj(sampler2DRectShadow sampler, vec4 P)

Do a texture lookup with projection.

The texture coordinates consumed from *P*, not including the last component of *P*, are divided by
the last component of *P* to form projected coordinates *P'*. The resulting third component of *P*
in the shadow forms is used as *Dref*. The third component of *P* is ignored when *sampler* has
type **gsampler2D** and *P* has type **vec4**. After these values are computed, texture lookup proceeds
as in **texture**.

gvec4 textureLod(gsampler1D sampler, float P float lod)
gvec4 textureLod(gsampler2D sampler, vec2 P, float lod)
gvec4 textureLod(gsampler3D sampler, vec3 P, float lod)
gvec4 textureLod(gsamplerCube sampler, vec3 P, float lod)
float textureLod(sampler2DShadow sampler, vec3 P, float lod)
float textureLod(sampler1DShadow sampler, vec3 P, float lod)
gvec4 textureLod(gsampler1DArray sampler, vec2 P, float lod)
float textureLod(sampler1DArrayShadow sampler, vec3 P, float lod)
gvec4 textureLod(gsampler2DArray sampler, vec3 P, float lod)
gvec4 textureLod(gsamplerCubeArray sampler, vec4 P, float lod)

Do a texture lookup as in **texture** but with explicit level-of-detail; *lod* specifies
λbase] and sets the partial derivatives as follows:

(See section 8.14 “Texture Minification” and equations 8.4-8.6 of the [OpenGL Specification](references.html#references).)

∂u / ∂x =
      ∂v / ∂x =
      ∂w / ∂x = 0

∂u / ∂y =
      ∂v / ∂y =
      ∂w / ∂y = 0

gvec4 textureOffset(gsampler1D sampler, float P, int offset [, float bias])
gvec4 textureOffset(gsampler2D sampler, vec2 P, ivec2 offset [, float bias])
gvec4 textureOffset(gsampler3D sampler, vec3 P, ivec3 offset [, float bias])
float textureOffset(sampler2DShadow sampler, vec3 P, ivec2 offset [, float bias])
gvec4 textureOffset(gsampler2DRect sampler, vec2 P, ivec2 offset)
float textureOffset(sampler2DRectShadow sampler, vec3 P, ivec2 offset)
float textureOffset(sampler1DShadow sampler, vec3 P, int offset [, float bias])
gvec4 textureOffset(gsampler1DArray sampler, vec2 P, int offset [, float bias])
gvec4 textureOffset(gsampler2DArray sampler, vec3 P, ivec2 offset [, float bias])
float textureOffset(sampler1DArrayShadow sampler, vec3 P, int offset [, float bias])
float textureOffset(sampler2DArrayShadow sampler, vec4 P, ivec2 offset)

Do a texture lookup as in **texture** but with *offset* added to the (u,v,w) texel coordinates
before looking up each texel. The offset value must be a constant expression. A limited range of
offset values are supported; the minimum and maximum offset values are implementation-dependent and
given by *gl_MinProgramTexelOffset* and *gl_MaxProgramTexelOffset*, respectively.

Note that *offset* does not apply to the layer coordinate for texture arrays.

This is explained in detail in section 8.14.2 “Coordinate Wrapping and Texel Selection” of the
[OpenGL Specification](references.html#references), where *offset* is (δu, δv, δw).

Note that texel offsets are also not supported for cube maps.

gvec4 texelFetch(gsampler1D sampler, int P, int lod)
gvec4 texelFetch(gsampler2D sampler, ivec2 P, int lod)
gvec4 texelFetch(gsampler3D sampler, ivec3 P, int lod)
gvec4 texelFetch(gsampler2DRect sampler, ivec2 P)
gvec4 texelFetch(gsampler1DArray sampler, ivec2 P, int lod)
gvec4 texelFetch(gsampler2DArray sampler, ivec3 P, int lod)
gvec4 texelFetch(gsamplerBuffer sampler, int P)
gvec4 texelFetch(gsampler2DMS sampler, ivec2 P, int sample)
gvec4 texelFetch(gsampler2DMSArray sampler, ivec3 P, int sample)

Use integer texture coordinate *P* to lookup a single texel from *sampler*. The array layer comes
from the last component of *P* for the array forms. The level-of-detail *lod* (if present) is as
described in sections 11.1.3.2 “Texel Fetches” and 8.14.1 “Scale Factor and Level of Detail” of
the [OpenGL Specification](references.html#references).

gvec4 texelFetchOffset(gsampler1D sampler, int P, int lod, int offset)
gvec4 texelFetchOffset(gsampler2D sampler, ivec2 P, int lod, ivec2 offset)
gvec4 texelFetchOffset(gsampler3D sampler, ivec3 P, int lod, ivec3 offset)
gvec4 texelFetchOffset(gsampler2DRect sampler, ivec2 P, ivec2 offset)
gvec4 texelFetchOffset(gsampler1DArray sampler, ivec2 P, int lod, int offset)
gvec4 texelFetchOffset(gsampler2DArray sampler, ivec3 P, int lod, ivec2 offset)

Fetch a single texel as in **texelFetch**, offset by *offset* as described in **textureOffset**.

gvec4 textureProjOffset(gsampler1D sampler, vec2 P, int offset [, float bias])
gvec4 textureProjOffset(gsampler1D sampler, vec4 P, int offset [, float bias])
gvec4 textureProjOffset(gsampler2D sampler, vec3 P, ivec2 offset [, float bias])
gvec4 textureProjOffset(gsampler2D sampler, vec4 P, ivec2 offset [, float bias])
gvec4 textureProjOffset(gsampler3D sampler, vec4 P, ivec3 offset [, float bias])
gvec4 textureProjOffset(gsampler2DRect sampler, vec3 P, ivec2 offset)
gvec4 textureProjOffset(gsampler2DRect sampler, vec4 P, ivec2 offset)
float textureProjOffset(sampler2DRectShadow sampler, vec4 P, ivec2 offset)
float textureProjOffset(sampler1DShadow sampler, vec4 P, int offset [, float bias])
float textureProjOffset(sampler2DShadow sampler, vec4 P, ivec2 offset [, float bias])

Do a projective texture lookup as described in **textureProj**, offset by *offset* as described in
**textureOffset**.

gvec4 textureLodOffset(gsampler1D sampler, float P, float lod, int offset)
gvec4 textureLodOffset(gsampler2D sampler, vec2 P, float lod, ivec2 offset)
gvec4 textureLodOffset(gsampler3D sampler, vec3 P, float lod, ivec3 offset)
float textureLodOffset(sampler1DShadow sampler, vec3 P, float lod, int offset)
float textureLodOffset(sampler2DShadow sampler, vec3 P, float lod, ivec2 offset)
gvec4 textureLodOffset(gsampler1DArray sampler, vec2 P, float lod, int offset)
gvec4 textureLodOffset(gsampler2DArray sampler, vec3 P, float lod, ivec2 offset)
float textureLodOffset(sampler1DArrayShadow sampler, vec3 P, float lod, int offset)

Do an offset texture lookup with explicit level-of-detail. See **textureLod** and **textureOffset**.

gvec4 textureProjLod(gsampler1D sampler, vec2 P, float lod)
gvec4 textureProjLod(gsampler1D sampler, vec4 P, float lod)
gvec4 textureProjLod(gsampler2D sampler, vec3 P, float lod)
gvec4 textureProjLod(gsampler2D sampler, vec4 P, float lod)
gvec4 textureProjLod(gsampler3D sampler, vec4 P, float lod)
float textureProjLod(sampler1DShadow sampler, vec4 P, float lod)
float textureProjLod(sampler2DShadow sampler, vec4 P, float lod)

Do a projective texture lookup with explicit level-of-detail. See **textureProj** and **textureLod**.

gvec4 textureProjLodOffset(gsampler1D sampler, vec2 P, float lod, int offset)
gvec4 textureProjLodOffset(gsampler1D sampler, vec4 P, float lod, int offset)
gvec4 textureProjLodOffset(gsampler2D sampler, vec3 P, float lod, ivec2 offset)
gvec4 textureProjLodOffset(gsampler2D sampler, vec4 P, float lod, ivec2 offset)
gvec4 textureProjLodOffset(gsampler3D sampler, vec4 P, float lod, ivec3 offset)
float textureProjLodOffset(sampler1DShadow sampler, vec4 P, float lod, int offset)
float textureProjLodOffset(sampler2DShadow sampler, vec4 P, float lod, ivec2 offset)

Do an offset projective texture lookup with explicit level-of-detail. See **textureProj**,
**textureLod**, and **textureOffset**.

gvec4 textureGrad(gsampler1D sampler, float P, float dPdx, float dPdy)
gvec4 textureGrad(gsampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy)
gvec4 textureGrad(gsampler3D sampler, vec3 P, vec3 dPdx, vec3 dPdy)
gvec4 textureGrad(gsamplerCube sampler, vec3 P, vec3 dPdx, vec3 dPdy)
gvec4 textureGrad(gsampler2DRect sampler, vec2 P, vec2 dPdx, vec2 dPdy)
float textureGrad(sampler2DRectShadow sampler, vec3 P, vec2 dPdx, vec2 dPdy)
float textureGrad(sampler1DShadow sampler, vec3 P, float dPdx, float dPdy)
gvec4 textureGrad(gsampler1DArray sampler, vec2 P, float dPdx, float dPdy)
float textureGrad(sampler1DArrayShadow sampler, vec3 P, float dPdx, float dPdy)
float textureGrad(sampler2DShadow sampler, vec3 P, vec2 dPdx, vec2 dPdy)
float textureGrad(samplerCubeShadow sampler, vec4 P, vec3 dPdx, vec3 dPdy)
gvec4 textureGrad(gsampler2DArray sampler, vec3 P, vec2 dPdx, vec2 dPdy)
float textureGrad(sampler2DArrayShadow sampler, vec4 P, vec2 dPdx, vec2 dPdy)
gvec4 textureGrad(gsamplerCubeArray sampler, vec4 P, vec3 dPdx, vec3 dPdy)

Do a texture lookup as in **texture** but with [explicit gradients](#explicit-gradients) as shown
below. The partial derivatives of *P* are with respect to window *x* and window *y*.

For the cube version, the partial derivatives of *P* are assumed to be in the coordinate system
used before texture coordinates are projected onto the appropriate cube face.

  

  

gvec4 textureGradOffset(gsampler1D sampler, float P, float dPdx, float dPdy, int offset)
gvec4 textureGradOffset(gsampler2D sampler, vec2 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
gvec4 textureGradOffset(gsampler3D sampler, vec3 P, vec3 dPdx, vec3 dPdy, ivec3 offset)
gvec4 textureGradOffset(gsampler2DRect sampler, vec2 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
float textureGradOffset(sampler2DRectShadow sampler, vec3 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
float textureGradOffset(sampler1DShadow sampler, vec3 P, float dPdx, float dPdy, int offset)
float textureGradOffset(sampler2DShadow sampler, vec3 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
gvec4 textureGradOffset(gsampler2DArray sampler, vec3 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
gvec4 textureGradOffset(gsampler1DArray sampler, vec2 P, float dPdx, float dPdy, int offset)
float textureGradOffset(sampler1DArrayShadow sampler, vec3 P, float dPdx, float dPdy, int offset)
float textureGradOffset(sampler2DArrayShadow sampler, vec4 P, vec2 dPdx, vec2 dPdy, ivec2 offset)

Do a texture lookup with both explicit gradient and offset, as described in **textureGrad** and
**textureOffset**.

gvec4 textureProjGrad(gsampler1D sampler, vec2 P, float dPdx, float dPdy)
gvec4 textureProjGrad(gsampler1D sampler, vec4 P, float dPdx, float dPdy)
gvec4 textureProjGrad(gsampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy)
gvec4 textureProjGrad(gsampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy)
gvec4 textureProjGrad(gsampler3D sampler, vec4 P, vec3 dPdx, vec3 dPdy)
gvec4 textureProjGrad(gsampler2DRect sampler, vec3 P, vec2 dPdx, vec2 dPdy)
gvec4 textureProjGrad(gsampler2DRect sampler, vec4 P, vec2 dPdx, vec2 dPdy)
float textureProjGrad(sampler2DRectShadow sampler, vec4 P, vec2 dPdx, vec2 dPdy)
float textureProjGrad(sampler1DShadow sampler, vec4 P, float dPdx, float dPdy)
float textureProjGrad(sampler2DShadow sampler, vec4 P, vec2 dPdx, vec2 dPdy)

Do a texture lookup both projectively, as described in **textureProj**, and with explicit gradient as
described in **textureGrad**. The partial derivatives *dPdx* and *dPdy* are assumed to be already
projected.

gvec4 textureProjGradOffset(gsampler1D sampler, vec2 P, float dPdx, float dPdy, int offset)
gvec4 textureProjGradOffset(gsampler1D sampler, vec4 P, float dPdx, float dPdy, int offset)
gvec4 textureProjGradOffset(gsampler2D sampler, vec3 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
gvec4 textureProjGradOffset(gsampler2D sampler, vec4 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
gvec4 textureProjGradOffset(gsampler3D sampler, vec4 P, vec3 dPdx, vec3 dPdy, ivec3 offset)
gvec4 textureProjGradOffset(gsampler2DRect sampler, vec3 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
gvec4 textureProjGradOffset(gsampler2DRect sampler, vec4 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
float textureProjGradOffset(sampler2DRectShadow sampler, vec4 P, vec2 dPdx, vec2 dPdy, ivec2 offset)
float textureProjGradOffset(sampler1DShadow sampler, vec4 P, float dPdx, float dPdy, int offset)
float textureProjGradOffset(sampler2DShadow sampler, vec4 P, vec2 dPdx, vec2 dPdy, ivec2 offset)

Do a texture lookup projectively and with explicit gradient as described in **textureProjGrad**, as
well as with offset, as described in **textureOffset**.

The texture gather functions take components of a single floating-point
vector operand as a texture coordinate, determine a set of four texels to
sample from the base level-of-detail of the specified texture image, and
return one component from each texel in a four-component result vector.

When performing a texture gather operation, the minification and
magnification filters are ignored, and the rules for LINEAR filtering in the
[OpenGL Specification](references.html#references) are applied to the base level of the texture image
to identify the four texels *i0 j1*, *i1 j1*, *i1 j0*, and *i0
j0*.
The texels are then converted to texture base colors (*Rs*, *Gs*,
*Bs*, *As*) according to table 15.1, followed by application of the
texture swizzle as described in section 15.2.1 “Texture Access” of the
[OpenGL Specification](references.html#references).
A four-component vector is assembled by taking the selected component from
each of the post-swizzled texture source colors in the order (*i0 j1*,
*i1 j1*, *i1 j0*, *i0 j0*).

For texture gather functions using a texture-combined shadow sampler type,
each of the four
texel lookups perform a depth comparison against the depth reference value
passed in (*refZ*), and returns the result of that comparison in the
appropriate component of the result vector.

As with other texture lookup functions, the results of a texture gather are
undefined for shadow samplers if the texture referenced is not a depth
texture or has depth comparisons disabled; or for non-shadow samplers if the
texture referenced is a depth texture with depth comparisons enabled.

gvec4 textureGather(gsampler2D sampler, vec2 P [, int comp])
gvec4 textureGather(gsampler2DArray sampler, vec3 P [, int comp])
gvec4 textureGather(gsamplerCube sampler, vec3 P [, int comp])
gvec4 textureGather(gsamplerCubeArray sampler, vec4 P [, int comp])
gvec4 textureGather(gsampler2DRect sampler, vec2 P [, int comp])
vec4 textureGather(sampler2DShadow sampler, vec2 P, float refZ)
vec4 textureGather(sampler2DArrayShadow sampler, vec3 P, float refZ)
vec4 textureGather(samplerCubeShadow sampler, vec3 P, float refZ)
vec4 textureGather(samplerCubeArrayShadow sampler, vec4 P, float refZ)
vec4 textureGather(sampler2DRectShadow sampler, vec2 P, float refZ)

Returns the value

vec4(Sample_i0_j1(P, base).comp,
     Sample_i1_j1(P, base).comp,
     Sample_i1_j0(P, base).comp,
     Sample_i0_j0(P, base).comp)

If specified, the value of *comp* must be a constant integer expression with
a value of 0, 1, 2, or 3, identifying the *x*, *y*, *z*, or *w*
post-swizzled component of the four-component vector lookup result for each
texel, respectively.

If *comp* is not specified, it is treated as 0, selecting the *x* component
of each texel to generate the result.

gvec4 textureGatherOffset(gsampler2D sampler, vec2 P, ivec2 offset [, int comp])
gvec4 textureGatherOffset(gsampler2DArray sampler, vec3 P, ivec2 offset [, int comp])
vec4 textureGatherOffset(sampler2DShadow sampler, vec2 P, float refZ, ivec2 offset)
vec4 textureGatherOffset(sampler2DArrayShadow sampler, vec3 P, float refZ, ivec2 offset)
gvec4 textureGatherOffset(gsampler2DRect sampler, vec2 P, ivec2 offset [, int comp])
vec4 textureGatherOffset(sampler2DRectShadow sampler, vec2 P, float refZ, ivec2 offset)

Perform a texture gather operation as in **textureGather** by *offset* as described in
**textureOffset** except that the *offset* can be variable (non constant) and the
implementation-dependent minimum and maximum offset values are given by
MIN_PROGRAM_TEXTURE_GATHER_OFFSET and MAX_PROGRAM_TEXTURE_GATHER_OFFSET, respectively.

gvec4 textureGatherOffsets(gsampler2D sampler, vec2 P, ivec2 offsets[4] [, int comp])
gvec4 textureGatherOffsets(gsampler2DArray sampler, vec3 P, ivec2 offsets[4] [, int comp])
vec4 textureGatherOffsets(sampler2DShadow sampler, vec2 P, float refZ, ivec2 offsets[4])
vec4 textureGatherOffsets(sampler2DArrayShadow sampler, vec3 P, float refZ, ivec2 offsets[4])
gvec4 textureGatherOffsets(gsampler2DRect sampler, vec2 P, ivec2 offsets[4] [, int comp])
vec4 textureGatherOffsets(sampler2DRectShadow sampler, vec2 P, float refZ, ivec2 offsets[4])

Operate identically to **textureGatherOffset** except that *offsets* is used to determine the
location of the four texels to sample. Each of the four texels is obtained by applying the
corresponding offset in *offsets* as a (*u*, *v*) coordinate offset to *P*, identifying the
four-texel LINEAR footprint, and then selecting the texel *i0 j0* of that footprint. The
specified values in *offsets* must be constant integral expressions.

The following texture functions are only in the compatibility profile.

vec4 texture1D(sampler1D sampler, float coord [, float bias])
vec4 texture1DProj(sampler1D sampler, vec2 coord [, float bias])
vec4 texture1DProj(sampler1D sampler, vec4 coord [, float bias])
vec4 texture1DLod(sampler1D sampler, float coord, float lod)
vec4 texture1DProjLod(sampler1D sampler, vec2 coord, float lod)
vec4 texture1DProjLod(sampler1D sampler, vec4 coord, float lod)

See corresponding signature above without “1D” in the name.

vec4 texture2D(sampler2D sampler, vec2 coord [, float bias])
vec4 texture2DProj(sampler2D sampler, vec3 coord [, float bias])
vec4 texture2DProj(sampler2D sampler, vec4 coord [, float bias])
vec4 texture2DLod(sampler2D sampler, vec2 coord, float lod)
vec4 texture2DProjLod(sampler2D sampler, vec3 coord, float lod)
vec4 texture2DProjLod(sampler2D sampler, vec4 coord, float lod)

See corresponding signature above without “2D” in the name.

vec4 texture3D(sampler3D sampler, vec3 coord [, float bias])
vec4 texture3DProj(sampler3D sampler, vec4 coord [, float bias])
vec4 texture3DLod(sampler3D sampler, vec3 coord, float lod)
vec4 texture3DProjLod(sampler3D sampler, vec4 coord, float lod)

See corresponding signature above without “3D” in the name. Use the texture coordinate *coord*
to do a texture lookup in the 3D texture currently bound to *sampler*. For the projective
(“**Proj**”) versions, the texture coordinate is divided by *coord.q*.

vec4 textureCube(samplerCube sampler, vec3 coord [, float bias])
vec4 textureCubeLod(samplerCube sampler, vec3 coord, float lod)

See corresponding signature above without “Cube” in the name.

vec4 shadow1D(sampler1DShadow sampler, vec3 coord [, float bias])
vec4 shadow2D(sampler2DShadow sampler, vec3 coord [, float bias])
vec4 shadow1DProj(sampler1DShadow sampler, vec4 coord [, float bias])
vec4 shadow2DProj(sampler2DShadow sampler, vec4 coord [, float bias])
vec4 shadow1DLod(sampler1DShadow sampler, vec3 coord, float lod)
vec4 shadow2DLod(sampler2DShadow sampler, vec3 coord, float lod)
vec4 shadow1DProjLod(sampler1DShadow sampler, vec4 coord, float lod)
vec4 shadow2DProjLod(sampler2DShadow sampler, vec4 coord, float lod)

Same functionality as the “**texture**” based names above with the same signature.

The atomic-counter operations in this section operate atomically with
respect to each other.
They are atomic for any single counter, meaning any of these operations on a
specific counter in one shader instantiation will be indivisible by any of
these operations on the same counter from another shader instantiation.
There is no guarantee that these operations are atomic with respect to other
forms of access to the counter or that they are serialized when applied to
separate counters.
Such cases would require additional use of fences, barriers, or other forms
of synchronization, if atomicity or serialization is desired.

The underlying counter is a 32-bit unsigned integer.
The result of operations will wrap to [0, 232-1].

uint atomicCounterIncrement(atomic_uint c)

Atomically

increments the counter for *c*, and

returns its value prior to the increment operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounterDecrement(atomic_uint c)

Atomically

decrements the counter for *c*, and

returns the value resulting from the decrement operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounter(atomic_uint c)

Returns the counter value for *c*.

uint atomicCounterAdd(atomic_uint c, uint data)

Atomically

adds the value of *data* to the counter for *c*, and

returns its value prior to the operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounterSubtract(atomic_uint c, uint data)

Atomically

subtracts the value of *data* from the counter for *c*, and

returns its value prior to the operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounterMin(atomic_uint c, uint data)

Atomically

sets the counter for *c* to the minimum of the value of the counter and
the value of *data*, and

returns the value prior to the operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounterMax(atomic_uint c, uint data)

Atomically

sets the counter for *c* to the maximum of the value of the counter and
the value of *data*, and

returns the value prior to the operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounterAnd(atomic_uint c, uint data)

Atomically

sets the counter for *c* to the bitwise AND of the value of the counter
and the value of *data*, and

returns the value prior to the operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounterOr(atomic_uint c, uint data)

Atomically

sets the counter for *c* to the bitwise OR of the value of the counter
and the value of *data*, and

returns the value prior to the operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounterXor(atomic_uint c, uint data)

Atomically

sets the counter for *c* to the bitwise XOR of the value of the counter
and the value of *data*, and

returns the value prior to the operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounterExchange(atomic_uint c, uint data)

Atomically

sets the counter value for *c* to the value of *data*, and

returns its value prior to the operation.

These two steps are done atomically with respect to the atomic counter
functions in this table.

uint atomicCounterCompSwap(atomic_uint c, uint compare, uint data)

Atomically

compares the value of *compare* and the counter value for *c*

if the values are equal, sets the counter value for *c* to the value of
*data*, and

returns its value prior to the operation.

These three steps are done atomically with respect to the atomic counter
functions in this table.

Atomic memory functions perform atomic operations on an individual signed or
unsigned integer stored in buffer object or shared variable storage.  All of
the atomic memory operations read a value from memory, compute a new value
using one of the operations described below, write the new value to memory, and
return the original value read, converted to the precision declared in the
shader. Note that the operations are performed at the in-memory precision of
the storage, which may differ from the precision declared in the shader.

The contents of the memory being updated by the atomic operation are
guaranteed not to be modified by any other assignment or atomic memory
function in any shader invocation between the time the original value is
read and the time the new value is written.

Atomic memory functions are supported only for a limited set of variables.
A shader will fail to compile if the value passed to the *mem* argument of
an atomic memory function does not correspond to a buffer or shared
variable.
It is acceptable to pass an element of an array or a single component of a
vector to the *mem* argument of an atomic memory function, as long as the
underlying array or vector is a buffer or shared variable.

All the built-in functions in this section accept arguments with
combinations of **restrict**, **coherent**, and **volatile** memory qualification,
despite not having them listed in the prototypes.
The atomic operation will operate as required by the calling argument’s
memory qualification, not by the built-in function’s formal parameter memory
qualification.

uint atomicAdd(inout uint mem, uint data)
int atomicAdd(inout int mem, int data)

Computes a new value by adding the value of *data* to the contents *mem*.

uint atomicMin(inout uint mem, uint data)
int atomicMin(inout int mem, int data)

Computes a new value by taking the minimum of the value of *data* and the contents of *mem*.

uint atomicMax(inout uint mem, uint data)
int atomicMax(inout int mem, int data)

Computes a new value by taking the maximum of the value of *data* and the contents of *mem*.

uint atomicAnd(inout uint mem, uint data)
int atomicAnd(inout int mem, int data)

Computes a new value by performing a bit-wise AND of the value of *data* and the contents of *mem*.

uint atomicOr(inout uint mem, uint data)
int atomicOr(inout int mem, int data)

Computes a new value by performing a bit-wise OR of the value of *data* and the contents of *mem*.

uint atomicXor(inout uint mem, uint data)
int atomicXor(inout int mem, int data)

Computes a new value by performing a bit-wise EXCLUSIVE OR of the value of *data* and the contents
of *mem*.

uint atomicExchange(inout uint mem, uint data)
int atomicExchange(inout int mem, int data)

Computes a new value by simply copying the value of *data*.

uint atomicCompSwap(inout uint mem, uint compare, uint data)
int atomicCompSwap(inout int mem, int compare, int data)

Compares the value of *compare* and the contents of *mem*. If the values are equal, the new value
is given by *data*; otherwise, it is taken from the original contents of *mem*.

Variables using one of the image basic types may be used by the built-in
shader image memory functions defined in this section to read and write
individual texels of a texture.
Each image variable references an image unit, which has a texture image
attached.

When image memory functions below access memory, an individual texel in the
image is identified using an (*i*), (*i, j*), or (*i, j, k*) coordinate
corresponding to the values of *P*.
For **image2DMS** and **image2DMSArray** variables (and the corresponding
int/unsigned int types) corresponding to multisample textures, each texel
may have multiple samples and an individual sample is identified using the
integer *sample* parameter.
The coordinates
and sample number
are used to select an individual texel in the manner described in section
8.26
“Texture Image Loads and Stores” of the [OpenGL Specification](references.html#references).

Loads and stores support float, integer, and unsigned integer types.
The data types below starting `gimage` serve as placeholders meaning
types starting either “**image**”, “**iimage**”, or “**uimage**” in the same
way as "**gvec**" or "**gsampler**" in earlier sections.

The *IMAGE_PARAMS* in the prototypes below is a placeholder representing
33
separate functions, each for a different type of image variable.
The *IMAGE_PARAMS* placeholder is replaced by one of the following parameter
lists:

gimage2D *image*, ivec2 *P*

gimage3D *image*, ivec3 *P*

gimageCube *image*, ivec3 *P*

gimageBuffer *image*, int *P*

gimage2DArray *image*, ivec3 *P*

gimageCubeArray *image*, ivec3 *P*

gimage1D *image*, int *P*

gimage1DArray *image*, ivec2 *P*

gimage2DRect *image*, ivec2 *P*

gimage2DMS *image*, ivec2 *P*, int *sample*

gimage2DMSArray *image*, ivec3 *P*, int *sample*

where each of the lines represents one of three different image variable
types, and *image*,
*P*, and *sample*
specify the individual texel to operate on.
The method for identifying the individual texel operated on from *image*,
*P*,
and *sample*,
and the method for reading and writing the texel are specified in section
8.26
“Texture Image Loads and Stores” of the [OpenGL Specification](references.html#references).

The atomic functions perform operations on individual texels or samples of
an image variable.
Atomic memory operations read a value from the selected texel, compute a new
value using one of the operations described below, write the new value to
the selected texel, and return the original value read.
The contents of the texel being updated by the atomic operation are
guaranteed not to be modified by any other image store or atomic function
between the time the original value is read and the time the new value is
written.

Atomic memory operations are supported on only a subset of all image
variable types; *image* must be either:

* 
a signed integer image variable (type starts “**iimage**”) and a format
qualifier of **r32i**, used with a *data* argument of type **int**, or

* 
an unsigned integer image variable (type starts “**uimage**”) and a
format qualifier of **r32ui**, used with a *data* argument of type **uint**,
or

* 
a float image variable (type starts “**image**”) and a format qualifier
of **r32f**, used with a *data* argument of type **float**
(**imageAtomicExchange** only).

All the built-in functions in this section accept arguments with
combinations of **restrict**, **coherent**, and **volatile** memory qualification,
despite not having them listed in the prototypes.
The image operation will operate as required by the calling argument’s
memory qualification, not by the built-in function’s formal parameter memory
qualification.

int imageSize(readonly writeonly gimage1D image)
ivec2 imageSize(readonly writeonly gimage2D image)
ivec3 imageSize(readonly writeonly gimage3D image)
ivec2 imageSize(readonly writeonly gimageCube image)
ivec3 imageSize(readonly writeonly gimageCubeArray image)
ivec3 imageSize(readonly writeonly gimage2DArray image)
ivec2 imageSize(readonly writeonly gimage2DRect image)
ivec2 imageSize(readonly writeonly gimage1DArray image)
ivec2 imageSize(readonly writeonly gimage2DMS image)
ivec3 imageSize(readonly writeonly gimage2DMSArray image)
int imageSize(readonly writeonly gimageBuffer image)

Returns the dimensions of the image bound to *image*. For arrayed images, the last component of the
return value will hold the size of the array. Cube images only return the dimensions of one face,
and the number of cubes in the cube map array, if arrayed.

|  | The qualification **readonly writeonly** accepts a variable qualified with **readonly**,
| --- | --- |
      **writeonly**, both, or neither. It means the formal argument will be used for neither reading
      nor writing to the underlying memory. |

int imageSamples(readonly writeonly gimage2DMS image)
int imageSamples(readonly writeonly gimage2DMSArray image)

Returns the number of samples of the image bound to *image*.

gvec4 imageLoad(readonly IMAGE_PARAMS)

Loads the texel at the coordinate *P* from the image unit *image* (in *IMAGE_PARAMS*).

For multisample loads, the sample number is given by *sample*. When *image*, *P*, and *sample*
identify a valid texel, the bits used to represent the selected texel in memory are converted to a
**vec4**, **ivec4**, or **uvec4** in the manner described in section
8.26
“Texture Image Loads and Stores” of the [OpenGL Specification](references.html#references) and returned.

void imageStore(writeonly IMAGE_PARAMS, gvec4 data)

Stores *data* into the texel at the coordinate *P* from the image specified by *image*.
For multisample stores, the sample number is given by *sample*. When *image*, *P*, and *sample*
identify a valid texel, the bits used to represent *data* are converted to the format of the image
unit in the manner described in section
8.26
“Texture Image Loads and Stores” of the [OpenGL Specification](references.html#references) and stored to the specified
texel.

uint imageAtomicAdd(IMAGE_PARAMS, uint data)
int imageAtomicAdd(IMAGE_PARAMS, int data)

Computes a new value by adding the value of *data* to the contents of the selected texel.

uint imageAtomicMin(IMAGE_PARAMS, uint data)
int imageAtomicMin(IMAGE_PARAMS, int data)

Computes a new value by taking the minimum of the value of *data* and the contents of the selected
texel.

uint imageAtomicMax(IMAGE_PARAMS, uint data)
int imageAtomicMax(IMAGE_PARAMS, int data)

Computes a new value by taking the maximum of the value *data* and the contents of the selected
texel.

uint imageAtomicAnd(IMAGE_PARAMS, uint data)
int imageAtomicAnd(IMAGE_PARAMS, int data)

Computes a new value by performing a bit-wise AND of the value of *data* and the contents of the
selected texel.

uint imageAtomicOr(IMAGE_PARAMS, uint data)
int imageAtomicOr(IMAGE_PARAMS, int data)

Computes a new value by performing a bit-wise OR of the value of *data* and the contents of the
selected texel.

uint imageAtomicXor(IMAGE_PARAMS, uint data)
int imageAtomicXor(IMAGE_PARAMS, int data)

Computes a new value by performing a bit-wise EXCLUSIVE OR of the value of *data* and the contents
of the selected texel.

uint imageAtomicExchange(IMAGE_PARAMS, uint data)
int imageAtomicExchange(IMAGE_PARAMS, int data)
float imageAtomicExchange(IMAGE_PARAMS, float data)

Computes a new value by simply copying the value of *data*.

uint imageAtomicCompSwap(IMAGE_PARAMS, uint compare, uint data)
int imageAtomicCompSwap(IMAGE_PARAMS, int compare, int data)

Compares the value of *compare* and the contents of the selected texel. If the values are equal,
the new value is given by *data*; otherwise, it is taken from the original value loaded from the
texel.

These functions are only available in geometry shaders.

The function **EmitStreamVertex**() specifies that a vertex is completed.
A vertex is added to the current output primitive in vertex stream *stream*
using the current values of all built-in and user-defined output variables
associated with *stream*.
The values of all output variables for all output streams are undefined
after a call to **EmitStreamVertex**().
If a geometry shader invocation has emitted more vertices than permitted by
the output layout qualifier **max_vertices**, the results of calling
**EmitStreamVertex**() are undefined.

The function **EndStreamPrimitive**() specifies that the current output
primitive for vertex stream *stream* is completed and a new output primitive
(of the same type) will be started by any subsequent **EmitStreamVertex**().
This function does not emit a vertex.
If the output layout is declared to be **points**, calling
**EndStreamPrimitive**() is optional.

A geometry shader starts with an output primitive containing no vertices for
each stream.
When a geometry shader terminates, the current output primitive for each
stream is automatically completed.
It is not necessary to call **EndStreamPrimitive**() if the geometry shader
writes only a single primitive.

Multiple output streams are supported only if the output primitive type is
declared to be **points**.
It is a compile-time or link-time error if a program contains a geometry
shader calling **EmitStreamVertex**() or **EndStreamPrimitive**() if its output
primitive type is not **points**.

void EmitStreamVertex(int stream)

Emits the current values of output variables to the current output primitive on stream *stream*.
The argument to *stream* must be a constant integral expression. On return from this call, the
values of all output variables are undefined.

Can only be used if multiple output streams are supported.

void EndStreamPrimitive(int stream)

Completes the current output primitive on stream *stream* and starts a new one. The argument to
*stream* must be a constant integral expression. No vertex is emitted.

Can only be used if multiple output streams are supported.

void EmitVertex()

Emits the current values of output variables to the current output primitive.
When multiple output streams are supported, this is equivalent to calling **EmitStreamVertex**(0).

On return from this call, the values of output variables are undefined.

void EndPrimitive()

Completes the current output primitive and starts a new one.
When multiple output streams are supported, this is equivalent to calling **EndStreamPrimitive**(0).

No vertex is emitted.

Fragment processing functions are only available in fragment shaders.

Derivatives may be computationally expensive and/or numerically unstable.
Therefore, an implementation may approximate the true derivatives
by using a fast but not entirely accurate derivative computation.
Derivatives are undefined within non-uniform control flow.

The expected behavior of a derivative is specified using forward/backward
differencing.

Forward differencing:

  

  

Backward differencing:

  

  

With single-sample rasterization,    in equations 1b
and 2b.
For multisample rasterization,    in equations 1b and 2b.

   is approximated similarly, with *y* replacing *x*.

With multisample rasterization, for any given fragment or sample, either
neighboring fragments or samples may be considered.

It is typical to consider a 2x2 square of fragments or samples, and compute
independent **dFdxFine** per row and independent **dFdyFine** per column, while
computing only a single **dFdxCoarse** and a single **dFdyCoarse** for the
entire 2x2 square.
Thus, all second-order coarse derivatives, e.g.
**dFdxCoarse**(**dFdxCoarse**(*x*)), may be 0, even for non-linear arguments.
However, second-order fine derivatives, e.g. **dFdxFine**(**dFdyFine**(*x*))
will properly reflect the difference between the independent fine
derivatives computed within the 2x2 square.

The method may differ per fragment, subject to the constraint that the
method may vary by window coordinates, not screen coordinates.
The invariance requirement described in section 14.2 “Invariance” of the
[OpenGL Specification](references.html#references), is relaxed for derivative calculations, because
the method may be a function of fragment location.

In some implementations, varying degrees of derivative accuracy for **dFdx**
and **dFdy** may be obtained by providing GL hints (see section 21.4 “Hints”
of the [OpenGL Specification](references.html#references)), allowing a user to make an image quality
versus speed trade off.
These hints have no effect on **dFdxCoarse**, **dFdyCoarse**, **dFdxFine** and
**dFdyFine**.

genFType dFdx(genFType p)

Returns either **dFdxFine**(*p*) or **dFdxCoarse**(*p*), based on implementation choice, presumably
whichever is the faster, or by whichever is selected in the API through quality-versus-speed hints.

genFType dFdy(genFType p)

Returns either **dFdyFine**(*p*) or **dFdyCoarse**(*p*), based on implementation choice, presumably
whichever is the faster, or by whichever is selected in the API through quality-versus-speed hints.

genFType dFdxFine(genFType p)

Returns the partial derivative of *p* with respect to the window x coordinate. Will use local
differencing based on the value of *p* for the current fragment and its immediate neighbor(s).

genFType dFdyFine(genFType p)

Returns the partial derivative of *p* with respect to the window y coordinate. Will use local
differencing based on the value of *p* for the current fragment and its immediate neighbor(s).

genFType dFdxCoarse(genFType p)

Returns the partial derivative of *p* with respect to the window x coordinate. Will use local
differencing based on the value of *p* for the current fragment’s neighbors, and will possibly, but
not necessarily, include the value of *p* for the current fragment.

That is, over a given area, the implementation can x compute derivatives in fewer unique locations
than would be allowed for **dFdxFine**(*p*).

genFType dFdyCoarse(genFType p)

Returns the partial derivative of *p* with respect to the window y coordinate. Will use local
differencing based on the value of *p* for the current fragment’s neighbors, and will possibly, but
not necessarily, include the value of *p* for the current fragment.

That is, over a given area, the implementation can compute y derivatives in fewer unique locations
than would be allowed for **dFdyFine**(*p*).

genFType fwidth(genFType p)

Returns **abs**(**dFdx**(*p*)) + **abs**(**dFdy**(*p*)).

genFType fwidthFine(genFType p)

Returns **abs**(**dFdxFine**(*p*)) + **abs**(**dFdyFine**(*p*)).

genFType fwidthCoarse(genFType p)

Returns **abs**(**dFdxCoarse**(*p*)) + **abs**(**dFdyCoarse**(*p*)).

Built-in interpolation functions are available to compute an interpolated
value of a fragment shader input variable at a shader-specified (*x*, *y*)
location.
A separate (*x*, *y*) location may be used for each invocation of the
built-in function, and those locations may differ from the default (*x*,
*y*) location used to produce the default value of the input.

For all of the interpolation functions, *interpolant* must be an l-value
from an **in** declaration;
this can include a variable,
a block or structure member,
an array element, or some combination of these.
Additionally, component selection operators (e.g. **.xy**, **.xxz**) may be applied
to *interpolant*, in which case the interpolation function will return the
result of applying the component selection operator to the interpolated value
of *interpolant* (for example, interpolateAt(v.xxz) is defined to return
interpolateAt(v).xxz).
Arrayed inputs can be indexed with general (nonuniform) integer expressions.

If *interpolant* is declared with the **flat** qualifier, the interpolated
value will have the same value everywhere for a single primitive, so the
location used for interpolation has no effect and the functions just return
that same value.
If *interpolant* is declared with the **centroid** qualifier, the value
returned by **interpolateAtSample**() and **interpolateAtOffset**() will be
evaluated at the specified location, ignoring the location normally used
with the **centroid** qualifier.
If *interpolant* is declared with the **noperspective** qualifier, the
interpolated value will be computed without perspective correction.

float interpolateAtCentroid(float interpolant)
vec2 interpolateAtCentroid(vec2 interpolant)
vec3 interpolateAtCentroid(vec3 interpolant)
vec4 interpolateAtCentroid(vec4 interpolant)

Returns the value of the input *interpolant* sampled at a location inside both the pixel and the
primitive being processed. The value obtained would be the same value assigned to the input
variable if declared with the **centroid** qualifier.

float interpolateAtSample(float interpolant, int sample)
vec2 interpolateAtSample(vec2 interpolant, int sample)
vec3 interpolateAtSample(vec3 interpolant, int sample)
vec4 interpolateAtSample(vec4 interpolant, int sample)

Returns the value of the input *interpolant* variable at the location of sample number *sample*.
If multisample buffers are not available, the input variable will be evaluated at the center of the
pixel. If sample *sample* does not exist, the position used to interpolate the input variable is undefined.

float interpolateAtOffset(float interpolant, vec2 offset)
vec2 interpolateAtOffset(vec2 interpolant, vec2 offset)
vec3 interpolateAtOffset(vec3 interpolant, vec2 offset)
vec4 interpolateAtOffset(vec4 interpolant, vec2 offset)

Returns the value of the input *interpolant* variable sampled at an offset from the center of the
pixel specified by *offset*. The two floating-point components of *offset*, give the offset in
pixels in the *x* and *y* directions, respectively.

An offset of (0, 0) identifies the center of the pixel. The range and granularity of offsets
supported by this function is implementation-dependent.

The noise functions **noise1**, **noise2**, **noise3**, and **noise4** have been
deprecated starting with version 4.4 of GLSL.
When not generating SPIR-V they are defined to return the value 0.0 or a vector
whose components are all 0.0. When generating SPIR-V the noise functions are
not declared and may not be used.

As in previous releases, the noise functions are not semantically considered to
be compile-time constant expressions.

float noise1(genFType x)

Returns a 1D noise value based on the input value *x*.

vec2 noise2(genFType x)

Returns a 2D noise value based on the input value *x*.

vec3 noise3(genFType x)

Returns a 3D noise value based on the input value *x*.

vec4 noise4(genFType x)

Returns a 4D noise value based on the input value *x*.

The shader invocation control function is only available in tessellation
control and compute shaders.
It is used to control the relative execution order of multiple shader
invocations used to process a patch (in the case of tessellation control
shaders) or a workgroup (in the case of compute shaders), which are
otherwise executed with an undefined relative order.

void barrier()

For any given static instance of **barrier**(), all tessellation control shader invocations for a
single input patch must enter it before any will be allowed to continue beyond it, or all compute
shader invocations for a single workgroup must enter it before any will continue beyond it.

The function **barrier**() provides a partially defined order of execution
between shader invocations.
The ensures that, for some types of memory accesses, values written by one
invocation prior to a given static instance of **barrier**() can be safely read
by other invocations after their call to the same static instance **barrier**().
Because invocations may execute in an undefined order between these barrier
calls, the values of a per-vertex or per-patch output variable for tessellation
control shaders, or the values of **shared** variables for compute shaders will be
undefined in a number of cases enumerated in
“[Output Variables](variables.html#output-variables)” (for tessellation control shaders)
and “[Shared Variables](variables.html#shared-variables)” (for compute shaders).

For tessellation control shaders, the **barrier**() function may only be
placed inside the function **main**() of the shader and may not be called
within any control flow.
Barriers are also disallowed after a return statement in the function
**main**().
Any such misplaced barriers result in a compile-time error.

A **barrier**() affects control flow but only synchronizes memory accesses
to **shared** variables and tessellation control output variables.
For other memory accesses, it does not ensure that values written by one invocation
prior to a given static instance of **barrier**() can be safely read by other
invocations after their call to the same static instance of **barrier**().
To achieve this requires the use of both **barrier**() and a memory barrier.

For compute shaders, the **barrier**() function may be placed within control
flow, but that control flow must be uniform control flow.
That is, all the controlling expressions that lead to execution of the
barrier must be dynamically uniform expressions.
This ensures that if any shader invocation enters a conditional statement,
then all invocations will enter it.
While compilers are encouraged to give warnings if they can detect this
might not happen, compilers cannot completely determine this.
Hence, it is the author’s responsibility to ensure **barrier**() only exists
inside uniform control flow.
Otherwise, some shader invocations will stall indefinitely, waiting for a
barrier that is never reached by other invocations.

Within a single shader invocation, the visibility and order of writes made
by that invocation are well-defined.
However, the relative order of reads and writes to a single shared memory
address from multiple separate shader invocations is largely undefined.
Additionally, the order of accesses to multiple memory addresses performed
by a single shader invocation, as observed by other shader invocations, is
also undefined.

The memory barrier built-in functions can be used to order reads and writes
to variables stored in memory accessible to other shader invocations.
When called, these functions will wait for the completion of all reads and
writes previously performed by the caller that access selected variable
types, and then return with no other effect.

The built-in functions **memoryBarrierAtomicCounter**(),
**memoryBarrierBuffer**(), **memoryBarrierImage**(), and **memoryBarrierShared**()
wait for the completion of accesses to atomic counter, buffer, image, and
shared variables, respectively.
The built-in functions **memoryBarrier**() and **groupMemoryBarrier**() wait for
the completion of accesses to all of the above variable types.
The functions **memoryBarrierShared**() and **groupMemoryBarrier**() are
available only in compute shaders; the other functions are available in all
shader types.

When these functions return, the effects of any memory stores performed
using coherent variables prior to the call will be visible to any
future1 coherent access to the same memory performed by any other shader
invocation. In particular, the values written this way in one shader stage are
guaranteed to be visible to coherent memory accesses performed by shader
invocations in subsequent stages when those invocations were triggered by
the execution of the original shader invocation (e.g. fragment shader
invocations for a primitive resulting from a particular geometry
shader invocation).

1

An access is only a *future* access if a *happens-before* relation can
be established between the store and the load.

Additionally, memory barrier functions order stores performed by the calling
invocation, as observed by other shader invocations.
Without memory barriers, if one shader invocation performs two stores to
coherent variables, a second shader invocation might see the values written
by the second store prior to seeing those written by the first.
However, if the first shader invocation calls a memory barrier function
between the two stores, selected other shader invocations will never see the
results of the second store before seeing those of the first.
When using the functions **groupMemoryBarrier**() or **memoryBarrierShared**(),
this ordering guarantee applies only to other shader invocations in the same
compute shader workgroup; all other memory barrier functions provide the
guarantee to all other shader invocations.
No memory barrier is required to guarantee the order of memory stores as
observed by the invocation performing the stores; an invocation reading from
a variable that it previously wrote will always see the most recently
written value unless another shader invocation also wrote to the same
memory.

void memoryBarrier()

Control the ordering of memory transactions issued by a single shader invocation.

void memoryBarrierAtomicCounter()

Control the ordering of accesses to atomic-counter variables issued by a single shader invocation.

void memoryBarrierBuffer()

Control the ordering of memory transactions to buffer variables issued within a single shader invocation.

void memoryBarrierShared()

Control the ordering of memory transactions to shared variables issued within a single shader
invocation, as viewed by other invocations in the same workgroup.

Only available in compute shaders.

void memoryBarrierImage()

Control the ordering of memory transactions to images issued within a single shader invocation.

void groupMemoryBarrier()

Control the ordering of all memory transactions issued within a single shader invocation, as viewed
by other invocations in the same workgroup.

Only available in compute shaders.

Subpass-input functions are only available when targeting a Vulkan fragment stage.

Subpass inputs are read through the built-in functions below. The `g` is again
a placeholder for either nothing, `i`, or `u`, indicating either a floating-point,
signed integer, or unsigned integer, and these must match between argument type
and return type.

gvec4 subpassLoad(gsubpassInput subpass)
gvec4 subpassLoad(gsubpassInputMS subpass, int sample)

Read from a subpass input, from the implicit location *(x, y, layer)* of the current fragment
coordinate.

Implementations of the OpenGL Shading Language may optionally group multiple shader
invocations for a single shader stage into a single SIMD invocation group,
where invocations are assigned to groups in an undefined,
implementation-dependent manner.
Shader algorithms on such implementations may benefit from being able to
evaluate a composite of Boolean values over all active invocations in a
group.

For all of these functions, the same result is returned to all active
invocations in the group.

These functions may be called within conditionally executed code.
In groups where some invocations do not execute the function call, the value
returned by the function is not affected by any invocation not calling the
function, even when value is well-defined for that invocation.

Because these functions depend on the values of *value* in an undefined
group of invocations, the value returned by these functions is largely
undefined. However, **anyInvocation**() is guaranteed to return **true** if *value*
is **true**, and **allInvocations**() is guaranteed to return **false** if *value* is
**false**.

Because implementations are not required to combine invocations into groups,
simply returning *value* for **anyInvocation**() and **allInvocations**() and
returning true for **allInvocationsEqual**() is a legal implementation of
these functions.

For fragment shaders, invocations in a SIMD invocation group may include
invocations corresponding to pixels that are covered by a primitive being
rasterized, as well as invocations corresponding to neighboring pixels not
covered by the primitive.
*Helper invocations* (see “[Built-In Language Variables](builtins.html#built-in-language-variables)”) may be created and the value of *value* for such
helper-invocation pixels may affect the value returned by **anyInvocation**(),
**allInvocations**(), and **allInvocationsEqual**().

bool anyInvocation(bool value)

Returns **true** if and only if *value* is **true** for at least one active invocation in the group.

bool allInvocations(bool value)

Returns **true** if and only if *value* is **true** for all active invocations in the group.

bool allInvocationsEqual(bool value)

Returns **true** if *value* is the same for all active invocations in the group.
