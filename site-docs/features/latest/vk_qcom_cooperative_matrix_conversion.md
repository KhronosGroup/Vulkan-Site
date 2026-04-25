# VK_QCOM_cooperative_matrix_conversion

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_QCOM_cooperative_matrix_conversion.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. OpBitCastArrayQCOM](#_opbitcastarrayqcom)
- [3.2. OpCompositeConstructCoopMatQCOM](#_opcompositeconstructcoopmatqcom)
- [3.2.1._gl_MatrixUseA](#_gl_matrixusea)
- [3.2.2._gl_MatrixUseB](#_gl_matrixuseb)
- [3.2.3._gl_MatrixUseAccumulator](#_gl_matrixuseaccumulator)
- [3.3. OpCompositeExtractCoopMatQCOM](#_opcompositeextractcoopmatqcom)
- [3.4. OpExtractSubArrayQCOM](#_opextractsubarrayqcom)
- [3.5. Features](#_features)
- [4. Examples](#coopmatconv-examples)
- [4.1. Convolution](#_convolution)
- [4.2. Neural Texture Decompression](#_neural_texture_decompression)
- [4.2._Neural_Texture_Decompression](#_neural_texture_decompression)
- [4.3. Layer Merging (Flash Attention)](#_layer_merging_flash_attention)
- [4.3._Layer_Merging_(Flash_Attention)](#_layer_merging_flash_attention)
- [4.4. Dequantization](#_dequantization)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. OpBitCastArrayQCOM](#_opbitcastarrayqcom)
[3.2. OpCompositeConstructCoopMatQCOM](#_opcompositeconstructcoopmatqcom)
[3.3. OpCompositeExtractCoopMatQCOM](#_opcompositeextractcoopmatqcom)
[3.4. OpExtractSubArrayQCOM](#_opextractsubarrayqcom)
[3.5. Features](#_features)

[4. Examples](#coopmatconv-examples)

[4.1. Convolution](#_convolution)
[4.2. Neural Texture Decompression](#_neural_texture_decompression)
[4.3. Layer Merging (Flash Attention)](#_layer_merging_flash_attention)
[4.4. Dequantization](#_dequantization)

This document proposes a new extension that adds additional shader
instructions for
[VK_KHR_cooperative_matrix](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_KHR_cooperative_matrix.html).

The baseline Cooperative Matrix extension achieves great performance
boost for simple matrix multiplication operations when data is loaded
to and from memory.

However, most use cases which leverage matrix
multiplication hardware, such as Convolution and Large Language Models,
require additional manipulation of input and output data which the opaque
cooperative matrix objects do not support directly.

The cooperative matrix extension explicitly requires staging data through
shared memory to perform these invocation-level manipulation operations.
An extension is needed that allows implementations
to create optimized data conversions between the invocation
and subgroup scope without explicitly going through shared memory.

An explicit conversion API allows the application to bypass staging
to shared memory.

This proposal exposes support for the
`SPV_QCOM_cooperative_matrix_conversion` SPIR-V extension. This extension
provides the following:

* 
Capabilities:

`CooperativeMatrixConversionQCOM`

Instructions:

* 
`OpBitCastArrayQCOM`

* 
`OpCompositeConstructCoopMatQCOM`

* 
`OpCompositeExtractCoopMatQCOM`

* 
`OpExtractSubArrayQCOM`

This extension is compatible with the GLSL extension
`GLSL_QCOM_cooperative_matrix_conversion`.

Unlike `GLSL_KHR_cooperative_matrix.txt`, these instructions permit
the per-invocation vectors to be located in private memory. Allowing
[workflows](#coopmatconv-examples) where shared memory staging
is not required. These can also enable applications to write
less vendor-dependent shaders, bypassing vendor required
loading constraints and shuffling of data.

`OpBitCastArrayQCOM` can be used to perform a bit-cast conversion between
compatible one-dimensional arrays. The GLSL equivalent is:

void bitcastQCOM(SrcTy srcArr[SrcLen], DstTy dstArr[DstLen]);

* 
The size in bytes of the source and destination arrays must be the same

* 
Valid types include `int32_t`, `uint32_t`, `float32_t`, `float16_t`

Examples:

uint32_t uvecA[8];
float    vecB[8];
bitcastQCOM(vecB, uvecA);

float16_t f16_vecB[16];
bitcastQCOM(f16_vecB, uvecA);

`OpCompositeConstructCoopMatQCOM` can be used to construct a cooperative matrix cooperatively
using a vector from each subgroup invocation. The GLSL equivalent is:

void vectorToCoopmatQCOM(SrcEltTy vec[SrcVecLen], coopmat cm);

* 
`CoopMatUse` determines the type of cooperative matrix and must be one of
`gl_MatrixUseA`, `gl_MatrixUseB`, and `gl_MatrixUseAccumulator`

When `CoopMatUse` type is `gl_MatrixUseA`, the per-invocation vectors fill in the rows of the matrix, where
the vector for `gl_SubgroupInvocationID == i` fills in row `i` of the matrix. Vectors belonging to invocations in
excess of `NumRows` are ignored and not copied.

The matrix `NumRows` must be a constant less than or equal to the `gl_SubgroupSize` and have a length in bytes
equal to 32. The permitted types of the matrix are `float32_t`, `float16_t`, `uint8_t`, and `int8_t`.

Both `NumRows` and `NumCols` are permitted to be specialization constants.

The source and destination element types must match with the length of the source vector equal to the number of
columns `NumCols` of the cooperative matrix.

However, a special case is allowed where the source type is `uint32_t` and length is 8, which defines an implicit
bit cast to `DstEltTy`. Applications may get better performance by packing source vector elements into
`uint32_t` over the float16 and 8-bit integer types.

coopmat si8_matA;
int8_t                                                   sivec[32];

// Load the 64 invocation vectors of int8[32] into each row of the 64x32 matrix
vectorToCoopmatQCOM(sivec, si8_matA);

// Alternative efficient packed upload case, with each element of uivec packed with 4 elements of matrix
uint32_t uivec[8];
vectorToCoopmatQCOM(uivec, si8_matA);

When `CoopMatUse` type is `gl_MatrixUseB`, it operates similar to `gl_MatrixUseA` except that the per-invocation
vectors fill in the columns of the matrix. The rules are the same with `NumRows` and `NumCols` swapped.

coopmat f32_matB;
float32_t                                                  fvec[8];

// Load the 64 invocation vectors of fp32[8] into each column of the 8x64 matrix
// Fp32 is already efficiently packed, so packing into uint32 is not necessary
vectorToCoopmatQCOM(fvec, f32_matB);

When `CoopMatUse` type is `gl_MatrixUseAccumulator`, it operates similar to `gl_MatrixUseA` except that
the constraints on the fields are different.

The rows of the matrix must be of length `gl_SubgroupSize`, `gl_SubgroupSize`/2, or `gl_SubgroupSize`/4
elements. The permitted types of the matrix are `float32_t`, `float16_t`, `uint32_t`, and `int32_t`.

The source and destination element types must match with the length of the source vector equal to the number of
columns `NumCols` of the cooperative matrix.

However, a special case is allowed where the source type is `uint32_t`, destination type is `float16_t`,
and length is `NumCols`/2, which defines an implicit bit cast. Applications may get better performance by
packing source vector elements into `uint32_t` over the float16 type.

coopmat fp16_matAcc;
float16_t                                                             fpvec[32];

// Load the 64 invocation vectors of float16_t[32] into each row of the 64x32 matrix
vectorToCoopmatQCOM(fpvec, fp16_matAcc);

// Alternative efficient packed upload case, with each element of uivec packed with 2 elements of matrix
uint32_t uivec[16];
vectorToCoopmatQCOM(uivec, fp16_matAcc);

`OpCompositeExtractCoopMatQCOM` can be used to concurrently extract rows or columns from
a cooperative matrix into per-invocation vectors. The GLSL equivalent is:

void coopmatToVectorQCOM(coopmat cm, DstEltTy vec[DstVecLen]);

This performs the inverse operation of `OpCompositeConstructCoopMatQCOM`.

`OpExtractSubArrayQCOM` can be used to slice an array into a sub-array. The GLSL equivalent is:

void extractSubArrayQCOM(EltTy srcArr[SrcLen], int start_index, EltTy dstArr[DstLen]);

Copies `DstLen` elements from `srcArr` starting at `start_index` into `dstArr`.

* 
`EltTy` must be one of `uint32_t`, `int32_t`, `float32_t`, or `float16_t`

* 
App must not specify a copy region out of bounds of the source array

* 
`SrcLen` must be equal to an enumerated `VkCooperativeMatrixPropertiesKHR`::`NSize` with `vkGetPhysicalDeviceCooperativeMatrixPropertiesKHR`

* 
`DstLen` must be equal to an enumerated `VkCooperativeMatrixPropertiesKHR`::`KSize`

* 
`start_index` must be a multiple an enumerated `VkCooperativeMatrixPropertiesKHR`::`KSize`

The `NSize` and `KSize` requirements do not need to be from the same enumerated `VkCooperativeMatrixPropertiesKHR` structure,
but the `KSize` requirements for the `DstLen` and `start_index` must be the same `KSize`.

float32_t uvecAcc[32];
float32_t uvecA[8];
extractSubArrayQCOM(uvecAcc, 3, uvecA);
…
extractSubArrayQCOM(uvecAcc, 24, uvecA);

The following feature structure is proposed:

typedef struct VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           cooperativeMatrixConversion;
} VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM;

* 
`cooperativeMatrixConversion` allows shaders to define the `CooperativeMatrixConversionQCOM`
capability

Uses the implicit im2col technique with a NHWC tensor:

for (uint32_t step = 0; step  matB;
            coopMatLoad(matB, inputB, subMatrixBStartInElements, FILTER_H * FILTER_W * strideBinElements, LAYOUT_K_FIRST);

            // load vecA input data as vectors using regular vector load
            float vecA[TILE_K];
            uint32_t input_row = STRIDE * out_row + DILATION * (filter_row - FILTER_H/2);
            uint32_t input_col = STRIDE * out_col + DILATION * (filter_col - FILTER_W/2);
            for (int i=0; i= INPUT_H) || (input_col = INPUT_W))
              for (int i=0; i matA;
            vectorToCoopmatQCOM(vecA, matA);
            matC = coopMatMulAdd(matA, matB, matC);

            subMatrixBStartInElements += strideBinElements;
        }
}

coopmat           matA0, matA1;
coopmat           matB0, matB1;
coopmat matC1, matC2;
matC1 = coopmat(0.0);
matC2 = coopmat(0.0);

// load matB0 and matB1 matrix input data using coopmat extension
coopMatLoad(matB0, inputB0, subMatrixBStartInElements, strideBinElements, LAYOUT_K_FIRST);
coopMatLoad(matB1, inputB1, subMatrixBStartInElements, strideBinElements, LAYOUT_K_FIRST);

// load vecA0 (input features) any way you like
float16_t vecA0[16];
for (int i=0; i

coopmat           matA;
coopmat           matB;
coopmat matC;
coopmat           matCtoA;
coopmat           matD;
coopmat matO;

for (uint stepN = 0; stepN 

4-bit weight dequantization (llama.cpp q4):

 coopmat            matA;
 coopmat            matB;
 coopmat  matC;

 float16_t vecAh_block[32], vecAh[TILE_K16], vecBh[TILE_K16];
 for (uint step = 0; step > 0) & 0x0F0F0F0F)) - 8.0f) * d;
             const vec4 v1 = (vec4(unpack8((vui >> 4) & 0x0F0F0F0F)) - 8.0f) * d;
             vecAh_block[4*i+ 0] = float16_t(v0.x);
             vecAh_block[4*i+ 1] = float16_t(v0.y);
             vecAh_block[4*i+ 2] = float16_t(v0.z);
             vecAh_block[4*i+ 3] = float16_t(v0.w);
             vecAh_block[4*i+16] = float16_t(v1.x);
             vecAh_block[4*i+17] = float16_t(v1.y);
             vecAh_block[4*i+18] = float16_t(v1.z);
             vecAh_block[4*i+19] = float16_t(v1.w);
         }
     }

     extractSubArrayQCOM(vecAh_block, step%32, vecAh); // extract first 16 or second 16 channels
     vectorToCoopmatQCOM(vecAh, matA);
     vectorToCoopmatQCOM(vecBh, matB);
     matC = coopMatMulAdd(matA, matB, matC);
}
