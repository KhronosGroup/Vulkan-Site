# Sampling

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/textures.html

## Table of Contents

- [Sampling Coordinate Systems](#textures-texel-coordinate-systems)
- [Sampling_Coordinate_Systems](#textures-texel-coordinate-systems)
- [Normalized Sampling Coordinates](#textures-sampling-coordinate-normalized)
- [Normalized_Sampling_Coordinates](#textures-sampling-coordinate-normalized)
- [Unnormalized Sampling Coordinates](#textures-sampling-coordinate-unnormalized)
- [Unnormalized_Sampling_Coordinates](#textures-sampling-coordinate-unnormalized)
- [Integer Sampling Coordinates](#textures-sampling-coordinate-integer)
- [Integer_Sampling_Coordinates](#textures-sampling-coordinate-integer)
- [Sampling Coordinate Diagrams](#textures-texel-coordinate-systems-diagrams)
- [Sampling_Coordinate_Diagrams](#textures-texel-coordinate-systems-diagrams)
- [Sampling Operations](#textures-input)
- [Texel Input Validation Operations](#textures-input-validation)
- [Texel_Input_Validation_Operations](#textures-input-validation)
- [Instruction/Sampler/Image View Validation](#textures-operation-validation)
- [Instruction/Sampler/Image_View_Validation](#textures-operation-validation)
- [Layout Validation](#textures-layout-validation)
- [Coordinate Validation](#textures-integer-coordinate-validation)
- [Cube Map Edge Handling](#textures-cubemapedge)
- [Cube_Map_Edge_Handling](#textures-cubemapedge)
- [Border Replacement](#textures-border-replacement)
- [Texel Reads](#textures-texel-reads)
- [Depth Compare Operation](#textures-depth-compare-operation)
- [Depth_Compare_Operation](#textures-depth-compare-operation)
- [Component Swizzle](#textures-component-swizzle)
- [Sparse Residency](#textures-sparse-residency)
- [Y′CBCR Degamma](#textures-YCbCr-degamma)
- [Chroma Reconstruction](#textures-chroma-reconstruction)
- [Explicit Reconstruction](#textures-explicit-reconstruction)
- [Implicit Reconstruction](#textures-implicit-reconstruction)
- [Sampler Y′CBCR Conversion](#textures-sampler-YCbCr-conversion)
- [Sampler_Y′CBCR_Conversion](#textures-sampler-YCbCr-conversion)
- [Sampler Y′CBCR Component Swizzle](#textures-sampler-YCbCr-component-swizzle)
- [Sampler_Y′CBCR_Component_Swizzle](#textures-sampler-YCbCr-component-swizzle)
- [Sampler Y′CBCR Range Expansion](#textures-sampler-YCbCr-conversion-rangeexpand)
- [Sampler_Y′CBCR_Range_Expansion](#textures-sampler-YCbCr-conversion-rangeexpand)
- [Sampler Y′CBCR Model Conversion](#textures-sampler-YCbCr-conversion-modelconversion)
- [Sampler_Y′CBCR_Model_Conversion](#textures-sampler-YCbCr-conversion-modelconversion)
- [Normalized Texel Coordinate Operations](#textures-normalized-operations)
- [Normalized_Texel_Coordinate_Operations](#textures-normalized-operations)
- [Projection Operation](#textures-projection)
- [Derivative Image Operations](#textures-derivative-image-operations)
- [Derivative_Image_Operations](#textures-derivative-image-operations)
- [Cube Map Face Selection and Transformations](#textures-cubemap-face-selection)
- [Cube_Map_Face_Selection_and_Transformations](#textures-cubemap-face-selection)
- [Cube Map Face Selection](#_cube_map_face_selection)
- [Cube_Map_Face_Selection](#_cube_map_face_selection)
- [Cube Map Coordinate Transformation](#textures-cube-map-coordinate-transform)
- [Cube_Map_Coordinate_Transformation](#textures-cube-map-coordinate-transform)
- [Cube Map Derivative Transformation](#_cube_map_derivative_transformation)
- [Cube_Map_Derivative_Transformation](#_cube_map_derivative_transformation)
- [Scale Factor Operation, LOD Operation and Image Level(s) Selection](#textures-lod-and-scale-factor)
- [Scale_Factor_Operation,_LOD_Operation_and_Image_Level(s)_Selection](#textures-lod-and-scale-factor)
- [Scale Factor Operation](#textures-scale-factor)
- [Scale_Factor_Operation](#textures-scale-factor)
- [LOD Operation](#textures-level-of-detail-operation)
- [Image Level(s) Selection](#textures-image-level-selection)
- [Image_Level(s)_Selection](#textures-image-level-selection)
- [(s,t,r,q,a) to (u,v,w,a) Transformation](#textures-normalized-to-unnormalized)
- [(s,t,r,q,a)_to_(u,v,w,a)_Transformation](#textures-normalized-to-unnormalized)
- [Unnormalized Texel Coordinate Operations](#textures-unnormalized-operations)
- [Unnormalized_Texel_Coordinate_Operations](#textures-unnormalized-operations)
- [(u,v,w,a) to (i,j,k,l,n) Transformation and Array Layer Selection](#textures-unnormalized-to-integer)
- [(u,v,w,a)_to_(i,j,k,l,n)_Transformation_and_Array_Layer_Selection](#textures-unnormalized-to-integer)
- [Integer Texel Coordinate Operations](#textures-integer-coordinate-operations)
- [Integer_Texel_Coordinate_Operations](#textures-integer-coordinate-operations)
- [Image Sample Operations](#textures-sample-operations)
- [Image_Sample_Operations](#textures-sample-operations)
- [Wrapping Operation](#textures-wrapping-operation)
- [Texel Gathering](#textures-gather)
- [Texel Filtering](#textures-texel-filtering)
- [Texel Nearest Filtering](#textures-texel-nearest-filtering)
- [Texel_Nearest_Filtering](#textures-texel-nearest-filtering)
- [Texel Linear Filtering](#textures-texel-linear-filtering)
- [Texel_Linear_Filtering](#textures-texel-linear-filtering)
- [Texel Cubic Filtering](#textures-texel-cubic-filtering)
- [Texel_Cubic_Filtering](#textures-texel-cubic-filtering)
- [Texel Range Clamp](#textures-texel-range-clamp)
- [Texel_Range_Clamp](#textures-texel-range-clamp)
- [Texel Mipmap Filtering](#textures-texel-mipmap-filtering)
- [Texel_Mipmap_Filtering](#textures-texel-mipmap-filtering)
- [Texel Anisotropic Filtering](#textures-texel-anisotropic-filtering)
- [Texel_Anisotropic_Filtering](#textures-texel-anisotropic-filtering)
- [Texel Footprint Evaluation](#textures-footprint)
- [Texel_Footprint_Evaluation](#textures-footprint)
- [Weight Image Sampling](#textures-weightimage)
- [Weight_Image_Sampling](#textures-weightimage)
- [Weight Image Layout](#textures-weightimage-layout)
- [Weight_Image_Layout](#textures-weightimage-layout)
- [2D Non-Separable Weight Filters](#_2d_non_separable_weight_filters)
- [2D_Non-Separable_Weight_Filters](#_2d_non_separable_weight_filters)
- [1D Separable Weight Filters](#_1d_separable_weight_filters)
- [1D_Separable_Weight_Filters](#_1d_separable_weight_filters)
- [Weight Sampling Phases](#textures-weightimage-filterphases)
- [Weight_Sampling_Phases](#textures-weightimage-filterphases)
- [Weight Sampler Parameters](#textures-weightimage-sampler)
- [Weight_Sampler_Parameters](#textures-weightimage-sampler)
- [Weight Sampling Operation](#textures-weightimage-filteroperation)
- [Weight_Sampling_Operation](#textures-weightimage-filteroperation)
- [Block Matching](#textures-blockmatch)
- [Block Matching Sampler Parameters](#textures-blockmatch-sampler)
- [Block_Matching_Sampler_Parameters](#textures-blockmatch-sampler)
- [Block Matching Operation](#textures-blockmatch-filteroperation)
- [Block_Matching_Operation](#textures-blockmatch-filteroperation)
- [Block Matching Window Operation](#textures-blockmatchwindow-filteroperation)
- [Block_Matching_Window_Operation](#textures-blockmatchwindow-filteroperation)
- [Block Matching Gather Operation](#textures-blockmatchgather-filteroperation)
- [Block_Matching_Gather_Operation](#textures-blockmatchgather-filteroperation)
- [Box Filter Sampling](#textures-boxfilter)
- [Box_Filter_Sampling](#textures-boxfilter)
- [Box Filter Sampler Parameters](#textures-boxfilter-sampler)
- [Box_Filter_Sampler_Parameters](#textures-boxfilter-sampler)
- [Box Filter Operation](#textures-boxfilter-filteroperation)
- [Box_Filter_Operation](#textures-boxfilter-filteroperation)
- [Image Operation Steps](#textures-instructions)
- [Image_Operation_Steps](#textures-instructions)
- [LOD Query](#textures-lod-query)

## Content

Sampling is performed on [images](images.html#images), typically in conjunction with a
sampler, to return a value based on a neighborhood of texels in an image.

Sampling instructions include the functionality of the following SPIR-V
Image Instructions:

* 
`OpImageSample*` and `OpImageSparseSample*` read one or more
neighboring texels of the image, and [filter](#textures-texel-filtering)
the texel values based on the state of the sampler.

Instructions with `ImplicitLod` in the name
[determine](#textures-level-of-detail-operation) the LOD used in the
sampling operation based on the coordinates used in neighboring
fragments.

* 
Instructions with `ExplicitLod` in the name
[determine](#textures-level-of-detail-operation) the LOD used in the
sampling operation based on additional coordinates.

* 
Instructions with `Proj` in the name apply homogeneous
[projection](#textures-projection) to the coordinates.

`OpImageFetch` and `OpImageSparseFetch` return a single texel of
the image.
No sampler is used.

`OpImage*Gather` and `OpImageSparse*Gather` read neighboring
texels and [return a single component](#textures-gather) of each.

`OpImageSampleFootprintNV` identifies and returns information about
the set of texels in the image that would be accessed by an equivalent
`OpImageSample*` instruction.

`OpImage*Dref*` instructions apply
[depth comparison](#textures-depth-compare-operation) on the texel
values.

`OpImageSparse*` instructions additionally return a
[sparse residency](#textures-sparse-residency) code.

`OpImageQueryLod` returns the LOD parameters that would be used in a
sample operation.
The actual operation is not performed.

`OpImageSampleWeightedQCOM` reads a 2D neighborhood of texels and
computes a weighted average using weight values from a separate weight
texture.

`opImageBlockMatchSADQCOM` and `opTextureBlockMatchSSD` compare 2D
neighborhoods of texels from two textures.

`OpImageBoxFilterQCOM` reads a 2D neighborhood of texels and computes
a weighted average of the texels.

`opImageBlockMatchWindowSADQCOM` and
`opImageBlockMatchWindowSSDQCOM` compare 2D neighborhoods of texels
from two textures with the comparison repeated across a window region in
the target texture.

`opImageBlockMatchGatherSADQCOM` and
`opImageBlockMatchWindowSSDQCOM` compares four 2D neighborhoods of
texels from a target texture with a single 2D neighborhood in the
reference texture.
The R component of each comparison is gathered and returned in the
output.

There are three sampling coordinate systems used in this chapter:

* 
[Normalized Sampling    Coordinates](#textures-sampling-coordinate-normalized)

* 
[Unnormalized Sampling    Coordinates](#textures-sampling-coordinate-unnormalized)

* 
[Integer Sampling Coordinates](#textures-sampling-coordinate-integer)

SPIR-V
`opImageBlockMatchSADQCOM`, `opImageBlockMatchSSDQCOM`,
`opImageBlockMatchWindowSADQCOM`, `opImageBlockMatchWindowSSDQCOM`,
`OpImageFetch`, and `OpImageSparseFetch` instructions use integer
sampling coordinates.

Other image instructions **can** use either normalized or unnormalized sampling
coordinates (selected by the `unnormalizedCoordinates` state of the
sampler used in the instruction), but there are
[limitations](samplers.html#samplers-unnormalizedCoordinates) on what operations, image
state, and sampler state is supported.
Normalized coordinates are logically
[converted](#textures-normalized-to-unnormalized) to unnormalized as part of
image operations, and [certain steps](#textures-normalized-operations) are
only performed on normalized coordinates.
The array layer coordinate is always treated as unnormalized even when other
coordinates are normalized.

Normalized sampling coordinates are referred to as (s,t,r,q,a), with
the coordinates having the following meanings:

* 
s: Coordinate in the first dimension of an image.

* 
t: Coordinate in the second dimension of an image.

* 
r: Coordinate in the third dimension of an image.

(s,t,r) are interpreted as a direction vector for Cube images.

q: Fourth coordinate, for homogeneous (projective) coordinates.

a: Coordinate for array layer.

The values s,t,r,q,a are all floating-point values.
Values of s,t,r in the normalized range [0.0,1.0] and a in
the range [0.0, layers - 1] correspond to locations in the image being
sampled, where layers is the dimension of the image with the same
name.
The value q is used as a divisor for each of s,t,r, rather than
directly corresponding to a location in an image.

The coordinates are extracted from the SPIR-V operand based on the
dimensionality of the image variable and type of instruction.
For `Proj` instructions, the components are in order (s, [t,] [r,]
q), with t and r being conditionally present based on the
`Dim` of the image.
For non-`Proj` instructions, the coordinates are (s [,t] [,r]
[,a]), with t and r being conditionally present based on the
`Dim` of the image and a being conditionally present based on the
`Arrayed` property of the image.
Projective image instructions are not supported on `Arrayed` images.

Unnormalized sampling coordinates are referred to as (u,v,w,a), with
the coordinates having the following meanings:

* 
u: Coordinate in the first dimension of an image.

* 
v: Coordinate in the second dimension of an image.

* 
w: Coordinate in the third dimension of an image.

* 
a: Coordinate for array layer.

The values u,v,w,a are all floating-point values, with values in the
ranges [0.0,width), [0.0, height), [0.0, depth), and
[0,layers-1] corresponding to locations in the image being sampled.
The values width, height, depth, and layers are the
dimensions of the accessed [image](images.html#images).

Only the u and v coordinates are directly extracted from the
SPIR-V operand, because only 1D and 2D (non-`Arrayed`) dimensionalities
support unnormalized coordinates.
The components are in order (u [,v]), with v being conditionally
present when the dimensionality is 2D.
When normalized coordinates are converted to unnormalized coordinates, all
four coordinates are used.

Integer sampling coordinates are referred to as (i,j,k,l,n), with the
coordinates having the following meanings:

* 
i: Coordinate in the first dimension of an image.

* 
j: Coordinate in the second dimension of an image.

* 
k: Coordinate in the third dimension of an image.

* 
l: Coordinate for array layer.

* 
n: Index of the sample within the texel.

The values i,j,k,l,n are all integer values, with values in the ranges
[0,width), [0, height), [0, depth), [0,layers), and
[0,samples) corresponding to locations in the image being sampled.
The values width, height, depth, layers, and
samples are the dimensions of the accessed [image](images.html#images).

They are extracted from the SPIR-V operand in order (i [,j] [,k] [,l]
[,n]), with j and k conditionally present based on the `Dim`
of the image, and l conditionally present based on the `Arrayed`
property of the image.
n is conditionally present and is taken from the `Sample` image
operand.

Integer coordinates are used as [image coordinates](images.html#images) to perform an
[image read](images.html#images-reads) after sampling calculations, directly
translating each coordinate as follows:

* 
i → x

* 
j → y

* 
k → z

* 
l → layer

* 
n → sample

level is calculated separately via the `Lod` image operand if
present, or is set to 0 otherwise.

Integer sampling coordinates are used as [image coordinates](images.html#images) to
perform an [image read](images.html#images-reads) after sampling calculations, directly
translating each coordinate as follows:

* 
x = i

* 
y = j

* 
z = k

* 
layer = l + [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::baseArrayLayer

* 
sample = n

The following diagrams illustrate the different sampling coordinate systems
for 2D images.

![vulkantexture0 ll](../_images/vulkantexture0-ll.svg)

Figure 1. Texel Coordinate Systems, Linear Filtering

The Texel Coordinate Systems - For the example shown of an 8×4 texel
two dimensional image.

* 
Normalized texel coordinates:

The s coordinate goes from 0.0 to 1.0.

* 
The t coordinate goes from 0.0 to 1.0.

Unnormalized texel coordinates:

* 
The u coordinate within the range 0.0 to 8.0 is within the image,
otherwise it is outside the image.

* 
The v coordinate within the range 0.0 to 4.0 is within the image,
otherwise it is outside the image.

Integer texel coordinates:

* 
The i coordinate within the range 0 to 7 addresses texels within
the image, otherwise it is outside the image.

* 
The j coordinate within the range 0 to 3 addresses texels within
the image, otherwise it is outside the image.

Also shown for linear filtering:

* 
Given the unnormalized coordinates (u,v), the four texels
selected are i0j0, i1j0, i0j1, and
i1j1.

* 
The fractions α and β.

* 
Given the offset Δi and Δj, the
four texels selected by the offset are i0j'0,
i1j'0, i0j'1, and i1j'1.

|  | For formats with reduced-resolution components, Δi and
| --- | --- |
Δj are relative to the resolution of the
highest-resolution component, and therefore may be divided by two relative
to the unnormalized coordinate space of the lower-resolution components. |

![vulkantexture1 ll](../_images/vulkantexture1-ll.svg)

Figure 2. Texel Coordinate Systems, Nearest Filtering

The Texel Coordinate Systems - For the example shown of an 8×4 texel
two dimensional image.

* 
Texel coordinates as above.
Also shown for nearest filtering:

Given the unnormalized coordinates (u,v), the texel selected is
ij.

* 
Given the offset Δi and Δj, the
texel selected by the offset is ij'.

For corner-sampled images, the texel samples are located at the grid
intersections instead of the texel centers.

![vulkantexture0 corner alternative a ll](../_images/vulkantexture0-corner-alternative-a-ll.svg)

Figure 3. Texel Coordinate Systems, Corner Sampling

*Sampling instructions* are SPIR-V image instructions that read from an
image with a sampler.
*Sampling operations* are a set of steps that are performed on state,
coordinates, and texel values while processing a sampling instruction, and
which are common to some or all sampling instructions.
They include the following steps, which are performed in the listed order:

* 
[Validation operations](#textures-input-validation)

[Instruction/Sampler/Image validation](#textures-operation-validation)

* 
[Coordinate validation](#textures-integer-coordinate-validation)

* 
[Layout validation](#textures-layout-validation)

* 
[Cube Map Edge Handling](#textures-cubemapedge)

[Border Replacement](#textures-border-replacement)

[Texel Reads](#textures-texel-reads)

[Depth comparison](#textures-depth-compare-operation)

[Component swizzle](#textures-component-swizzle)

[Y′CBCR degamma](#textures-YCbCr-degamma)

[Chroma reconstruction](#textures-chroma-reconstruction)

[Y′CBCR conversion](#textures-sampler-YCbCr-conversion)

For sampling instructions involving multiple texels (for sampling or
gathering), these steps are applied for each texel that is used in the
instruction.
Depending on the type of sampling instruction, other steps are conditionally
performed between these steps or involving multiple coordinate or texel
values.

If [Chroma Reconstruction](#textures-chroma-reconstruction) is implicit,
[Texel Filtering](#textures-texel-filtering) instead takes place during
chroma reconstruction, before [sampler Y′CBCR conversion](#textures-sampler-YCbCr-conversion) occurs.

The operations described in [block matching](#textures-blockmatch) are
performed before [Component Substitution](images.html#images-component-substitution) during
[texel read](#textures-texel-reads).

The operations described in [weight image sampling](#textures-weightimage)
are performed before [Component swizzle](#textures-component-swizzle).

*Texel input validation operations* inspect instruction/image/sampler state
or coordinates, and in certain circumstances cause the texel value to be
replaced or become **undefined**.
There are a series of validations that the texel undergoes.

There are a number of cases where a SPIR-V instruction **can** mismatch with
the sampler, the image view, or both, and a number of further cases where
the sampler **can** mismatch with the image view.
In such cases the value of the texel returned is poison.

These cases include:

* 
The sampler `borderColor` is an integer type and the image view
`format` is not one of the [VkFormat](formats.html#VkFormat) integer types or a stencil
component of a depth/stencil format.

* 
The sampler `borderColor` is a float type and the image view
`format` is not one of the [VkFormat](formats.html#VkFormat) float types or a depth
component of a depth/stencil format.

* 
The sampler `borderColor` is one of the opaque black colors
([VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_OPAQUE_BLACK](samplers.html#VkBorderColor)) and the image view
[VkComponentSwizzle](resources.html#VkComponentSwizzle) for any of the [VkComponentMapping](resources.html#VkComponentMapping)
components is not the [identity    swizzle](resources.html#resources-image-views-identity-mappings), and
[VkPhysicalDeviceBorderColorSwizzleFeaturesEXT](features.html#VkPhysicalDeviceBorderColorSwizzleFeaturesEXT)::`borderColorSwizzleFromImage`
feature is not enabled, and
[VkSamplerBorderColorComponentMappingCreateInfoEXT](samplers.html#VkSamplerBorderColorComponentMappingCreateInfoEXT) is not
specified.

* 
[VkSamplerBorderColorComponentMappingCreateInfoEXT](samplers.html#VkSamplerBorderColorComponentMappingCreateInfoEXT)::`components`,
if specified, has a component swizzle that does not match the component
swizzle of the image view, and either component swizzle is not a form of
identity swizzle.

* 
[VkSamplerBorderColorComponentMappingCreateInfoEXT](samplers.html#VkSamplerBorderColorComponentMappingCreateInfoEXT)::`srgb`, if
specified, does not match the sRGB encoding of the image view.

* 
The sampler `borderColor` is a custom color
([VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor)) and the supplied
[VkSamplerCustomBorderColorCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorCreateInfoEXT)::`customBorderColor`
is outside the bounds of the values representable in the image view’s
`format`.

* 
The sampler `borderColor` is a custom color
([VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor)) and the image view
[VkComponentSwizzle](resources.html#VkComponentSwizzle) for any of the [VkComponentMapping](resources.html#VkComponentMapping)
components is not the [identity    swizzle](resources.html#resources-image-views-identity-mappings), and
[VkPhysicalDeviceBorderColorSwizzleFeaturesEXT](features.html#VkPhysicalDeviceBorderColorSwizzleFeaturesEXT)::`borderColorSwizzleFromImage`
feature is not enabled, and
[VkSamplerBorderColorComponentMappingCreateInfoEXT](samplers.html#VkSamplerBorderColorComponentMappingCreateInfoEXT) is not
specified.

* 
The [VkImageLayout](resources.html#VkImageLayout) of any subresource in the image view does not
match the [VkDescriptorImageInfo](descriptorsets.html#VkDescriptorImageInfo)::`imageLayout` used to write
the image descriptor.

* 
The SPIR-V Image Format is not [compatible](../appendices/spirvenv.html#spirvenv-image-formats)
with the image view’s `format`.

* 
The sampler `unnormalizedCoordinates` is [VK_TRUE](fundamentals.html#VK_TRUE) and any of
the [limitations of unnormalized    coordinates](samplers.html#samplers-unnormalizedCoordinates) are violated.

* 
The sampler was created with `flags` containing
[VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) and the image was not created
with `flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits).

* 
The sampler was not created with `flags` containing
[VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) and the image was created
with `flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits).

* 
The sampler was created with `flags` containing
[VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) and is used with a function
that is not `OpImageSampleImplicitLod` or
`OpImageSampleExplicitLod`, or is used with operands `Offset` or
`ConstOffsets`.

* 
The SPIR-V instruction is one of the `OpImage*Dref*` instructions and
the sampler `compareEnable` is [VK_FALSE](fundamentals.html#VK_FALSE)

* 
The SPIR-V instruction is not one of the `OpImage*Dref*` instructions
and the sampler `compareEnable` is [VK_TRUE](fundamentals.html#VK_TRUE)

* 
The SPIR-V instruction is one of the `OpImage*Dref*` instructions,
the image view `format` is one of the depth/stencil formats, and the
image view aspect is not [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits).

* 
The SPIR-V instruction’s image variable’s properties are not compatible
with the image view:

If the image view’s `viewType` is one of
[VK_IMAGE_VIEW_TYPE_1D_ARRAY](resources.html#VkImageViewType), [VK_IMAGE_VIEW_TYPE_2D_ARRAY](resources.html#VkImageViewType),
or [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](resources.html#VkImageViewType) then the instruction **must** have
`Arrayed` = 1.
Otherwise the instruction **must** have `Arrayed` = 0.

* 
If the image was created with [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`samples`
equal to [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits), the instruction **must** have
`MS` = 0.

* 
If the image was created with [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`samples`
not equal to [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits), the instruction **must** have
`MS` = 1.

* 
If the `Sampled` `Type` of the `OpTypeImage` does not match
the [SPIR-V Type](../appendices/spirvenv.html#spirv-type).

* 
If the [signedness of any read or sample     operation](../appendices/spirvenv.html#spirvenv-image-signedness) does not match the signedness of the image’s format.

If the image was created with [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`
containing [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](resources.html#VkImageCreateFlagBits), the sampler
addressing modes **must** only use a [VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode).

The SPIR-V instruction is `OpImageSampleFootprintNV` with `Dim` =
2D and `addressModeU` or `addressModeV` in the sampler is not
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode).

The SPIR-V instruction is `OpImageSampleFootprintNV` with `Dim` =
3D and `addressModeU`, `addressModeV`, or `addressModeW` in
the sampler is not [VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode).

The sampler was created with a specified
[VkSamplerCustomBorderColorCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorCreateInfoEXT)::`format` which does
not match the [VkFormat](formats.html#VkFormat) of the image view(s) it is sampling.

The sampler is sampling an image view of
[VK_FORMAT_B4G4R4A4_UNORM_PACK16](formats.html#VkFormat),
[VK_FORMAT_B5G6R5_UNORM_PACK16](formats.html#VkFormat), or
[VK_FORMAT_B5G5R5A1_UNORM_PACK16](formats.html#VkFormat) format without a specified
[VkSamplerCustomBorderColorCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorCreateInfoEXT)::`format`.

If the underlying `VkImage` format has an X component in its format
description, **undefined** values are read from those bits.

|  | If the `VkImage` format and `VkImageView` format are the same, these
| --- | --- |
bits will be unused by format conversion and this will have no effect.
However, if the `VkImageView` format is different, then some bits of the
result may be **undefined**.
For example, when a [VK_FORMAT_R10X6_UNORM_PACK16](formats.html#VkFormat) `VkImage` is
sampled via a [VK_FORMAT_R16_UNORM](formats.html#VkFormat) `VkImageView`, the low 6 bits of
the value before format conversion are **undefined** and format conversion may
return a range of different values. |

|  | Some implementations will return **undefined** values in the case where a
| --- | --- |
sampler uses a [VkSamplerAddressMode](samplers.html#VkSamplerAddressMode) of
[VK_SAMPLER_ADDRESS_MODE_MIRRORED_REPEAT](samplers.html#VkSamplerAddressMode), the sampler is used with
operands `Offset`, `ConstOffset`, or `ConstOffsets`, and the value
of the offset is larger than or equal to the corresponding width, height, or
depth of any accessed image level.

This behavior was not tested prior to Vulkan conformance test suite version
1.3.8.0.
Affected implementations will have a conformance test waiver for this issue. |

If all planes of a *disjoint* *multi-planar* image are not in the same
[image layout](resources.html#resources-image-layouts), the image **must** not be sampled
with [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) enabled.

Once the [normalized](#textures-normalized-operations) or
[unnormalized coordinates](#textures-unnormalized-operations) have been
converted to integer image coordinates, the integer coordinates are
validated as image coordinates, as outlined in
[Image Coordinate Validation](images.html#images-coordinate-validation), converted as follows:

* 
x = i

* 
y = j

* 
z = k

* 
layer = l

* 
sample = n

* 
level = d

When sampling a cube map, if the image coordinates are out of bounds of the
[selected cube map face](#textures-cubemap-face-selection), the following
steps are performed.

|  | This does not occur when using [VK_FILTER_NEAREST](samplers.html#VkFilter) filtering within a
| --- | --- |
mip level, since [VK_FILTER_NEAREST](samplers.html#VkFilter) is treated as using
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode). |

* 
Cube Map Edge Texel

If the texel lies beyond the selected cube map face in either only
x or only y, then the coordinates (x,y,layer) are
transformed to select the adjacent texel from the appropriate
neighboring face.

Cube Map Corner Texel

* 
If the texel lies beyond the selected cube map face in both x and
     y, then there is no unique neighboring face from which to read
     that texel.
     The texel **should** be replaced by the average of the three values of the
     adjacent texels in each incident face.
     However, implementations **may** replace the cube map corner texel by
     other methods.
The methods are subject to the constraint that for linear filtering if the
three available texels have the same value, the resulting filtered texel
**must** have that value, and for cubic filtering if the twelve available
samples have the same value, the resulting filtered texel **must** have that
value.

If the sampler includes a border, out of bounds texels are replaced with a
value based on the image format and the `borderColor` of the sampler.
The border color is:

| Sampler `borderColor` | Corresponding Border Color |
| --- | --- |
| [VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK](samplers.html#VkBorderColor) | [Br, Bg, Bb, Ba] = [0.0, 0.0, 0.0, 0.0] |
| [VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK](samplers.html#VkBorderColor) | [Br, Bg, Bb, Ba] = [0.0, 0.0, 0.0, 1.0] |
| [VK_BORDER_COLOR_FLOAT_OPAQUE_WHITE](samplers.html#VkBorderColor) | [Br, Bg, Bb, Ba] = [1.0, 1.0, 1.0, 1.0] |
| [VK_BORDER_COLOR_INT_TRANSPARENT_BLACK](samplers.html#VkBorderColor) | [Br, Bg, Bb, Ba] = [0, 0, 0, 0] |
| [VK_BORDER_COLOR_INT_OPAQUE_BLACK](samplers.html#VkBorderColor) | [Br, Bg, Bb, Ba] = [0, 0, 0, 1] |
| [VK_BORDER_COLOR_INT_OPAQUE_WHITE](samplers.html#VkBorderColor) | [Br, Bg, Bb, Ba] = [1, 1, 1, 1] |
| [VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) | [Br, Bg, Bb, Ba] = [Ur, Ug, Ub, Ua] |
| [VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor) | [Br, Bg, Bb, Ba] = [Ur, Ug, Ub, Ua] |

The custom border color (U) **may** be rounded by implementations prior
to texel replacement, but the error introduced by such a rounding **must** not
exceed one ULP of the image’s `format`.

|  | The names `VK_BORDER_COLOR_*_TRANSPARENT_BLACK`,
| --- | --- |
`VK_BORDER_COLOR_*_OPAQUE_BLACK`, and
`VK_BORDER_COLOR_*_OPAQUE_WHITE` are meant to describe which components
are zeros and ones in the vocabulary of compositing, and are not meant to
imply that the numerical value of [VK_BORDER_COLOR_INT_OPAQUE_WHITE](samplers.html#VkBorderColor) is
a saturating value for integers. |

This is substituted for the texel value by replacing the number of
components in the image format

| Texel Aspect or Format | Component Assignment |
| --- | --- |
| Depth aspect | D                                     = Br |
| Stencil aspect | S                                     = Br† |
| One component color format | Colorr                              = Br |
| Two component color format | [Colorr,Colorg]                   = [Br,Bg] |
| Three component color format | [Colorr,Colorg,Colorb]          = [Br,Bg,Bb] |
| Four component color format | [Colorr,Colorg,Colorb,Colora] = [Br,Bg,Bb,Ba] |
| Single component alpha format | [Colorr,Colorg,Colorb, Colora] = [0,0,0,Ba] |

† S = Bg **may** be substituted as the replacement method by the
implementation when [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)::`borderColor` is
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor) and
[VkSamplerCustomBorderColorCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorCreateInfoEXT)::`format` is
[VK_FORMAT_UNDEFINED](formats.html#VkFormat).
Implementations **should** use S = Br as the replacement method.

If [`rgba4OpaqueBlackSwizzled`](limits.html#limits-rgba4OpaqueBlackSwizzled) is
[VK_FALSE](fundamentals.html#VK_FALSE), the implementation
**may** swap the blue and alpha channels when sampling non-custom border colors
with the [VK_FORMAT_B4G4R4A4_UNORM_PACK16](formats.html#VkFormat) format, or the red and alpha
channels with the [VK_FORMAT_R4G4B4A4_UNORM_PACK16](formats.html#VkFormat) format.

|  | As [VK_FORMAT_B4G4R4A4_UNORM_PACK16](formats.html#VkFormat) is required by Vulkan, support must
| --- | --- |
be advertised for this format.
Some Vulkan implementations on Apple hardware implement these formats
through a hardware format with a different channel order, swizzled to match
Vulkan’s expectations.
Unfortunately the swizzle cannot be readily applied to the fixed border
colors - resulting in the apparent channel swap.
For most standard border colors this does not result in a modification to
the sampled output.
However, `VK_BORDER_COLOR_*_OPAQUE_BLACK` will instead be sampled as
transparent red or blue.
If the [`customBorderColorWithoutFormat`](features.html#features-customBorderColorWithoutFormat) feature is supported and enabled,
this functionality is expected to work without issue, but this feature may
come with a performance cost. |

When border color replacement occurs, [texel reads](#textures-texel-reads)
are skipped, and the replaced color is used for ongoing operations instead.

A texel is read from an image, performed as outlined in [Image Reads](images.html#images-reads),
using the converted image coordinates.

The returned components of each texel are then processed by further input
operations.

If the image view has a depth/stencil format, the depth component is
selected by the `aspectMask`, and the operation is an `OpImage*Dref*`
instruction, a depth comparison is performed.
The result is 1.0 if the comparison evaluates to true, and
0.0 otherwise.
This value replaces the depth component D.

The compare operation is selected by the [VkCompareOp](samplers.html#VkCompareOp) value set by
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)::`compareOp`.
The reference value from the SPIR-V operand Dref and the texel depth
value Dtex are used as the *reference* and *test* values,
respectively, in that operation.

If the image being sampled has an unsigned normalized fixed-point format,
then Dref is clamped to [0,1] before the compare operation.

If the value of `magFilter` is [VK_FILTER_LINEAR](samplers.html#VkFilter), or the value of
`minFilter` is [VK_FILTER_LINEAR](samplers.html#VkFilter), then D may be computed in
an implementation-dependent manner which differs from the normal rules of
linear filtering.
The resulting value **must** be in the range [0,1] and should be
proportional to, or a weighted average of, the number of comparison passes
or failures.

All texel input instructions apply a *swizzle* based on:

* 
the [VkComponentSwizzle](resources.html#VkComponentSwizzle) enums in the `components` member of the
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo) structure for the image being read if
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) is not enabled,
and

* 
the [VkComponentSwizzle](resources.html#VkComponentSwizzle) enums in the `components` member of the
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo) structure for the
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) if sampler
Y′CBCR conversion is enabled.

The swizzle **can** rearrange the components of the texel, or substitute zero
or one for any components.
It is defined as follows for each color component:

  

  

where:

  

  

If the border color is one of the `VK_BORDER_COLOR_*_OPAQUE_BLACK` enums
and the [VkComponentSwizzle](resources.html#VkComponentSwizzle) is not the
[identity swizzle](resources.html#resources-image-views-identity-mappings) for all
components, the value of the texel after swizzle is **undefined**.

If the image view has a depth/stencil format and the
[VkComponentSwizzle](resources.html#VkComponentSwizzle) is [VK_COMPONENT_SWIZZLE_ONE](resources.html#VkComponentSwizzle), and
`VkPhysicalDeviceMaintenance5Properties`::`depthStencilSwizzleOneSupport`
is not [VK_TRUE](fundamentals.html#VK_TRUE), the value of the texel after swizzle is **undefined**.

`OpImageSparse*` instructions return a structure which includes a
*residency code* indicating whether any texels accessed by the instruction
are sparse unbound texels.
This code **can** be interpreted by the `OpImageSparseTexelsResident`
instruction which converts the residency code to a boolean value.

If
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](samplers.html#VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM)::`enableYDegamma`
is equal to [VK_TRUE](fundamentals.html#VK_TRUE), then sRGB to linear conversion is applied to the
G component of the sampled values as described in the “sRGB EOTF” section
of the [Khronos Data Format Specification](introduction.html#data-format).

If
[VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM](samplers.html#VkSamplerYcbcrConversionYcbcrDegammaCreateInfoQCOM)::`enableCbCrDegamma`
is equal to [VK_TRUE](fundamentals.html#VK_TRUE), then sRGB to linear conversion is applied to the
R and B components of the sampled values as described in the “sRGB EOTF”
section of the [Khronos Data Format Specification](introduction.html#data-format).

In some color models, the color representation is defined in terms of
monochromatic light intensity (often called “luma”) and color differences
relative to this intensity, often called “chroma”.
It is common for color models other than RGB to represent the chroma
components at lower spatial resolution than the luma component.
This approach is used to take advantage of the eye’s lower spatial
sensitivity to color compared with its sensitivity to brightness.
Less commonly, the same approach is used with additive color, since the
green component dominates the eye’s sensitivity to light intensity and the
spatial sensitivity to color introduced by red and blue is lower.

Lower-resolution components are “downsampled” by resizing them to a lower
spatial resolution than the component representing luminance.
This process is also commonly known as “chroma subsampling”.
There is one luminance sample in each texture texel, but each chrominance
sample may be shared among several texels in one or both texture dimensions.

* 
“`_444`” formats do not spatially downsample chroma values
compared with luma: there are unique chroma samples for each texel.

* 
“`_422`” formats have downsampling in the x dimension
(corresponding to *u* or *s* coordinates): they are sampled at half the
resolution of luma in that dimension.

* 
“`_420`” formats have downsampling in the x dimension
(corresponding to *u* or *s* coordinates) and the y dimension
(corresponding to *v* or *t* coordinates): they are sampled at half the
resolution of luma in both dimensions.

The process of reconstructing a full color value for texture access involves
accessing both chroma and luma values at the same location.
To generate the color accurately, the values of the lower-resolution
components at the location of the luma samples are reconstructed from the
lower-resolution sample locations, an operation known here as “chroma
reconstruction” irrespective of the actual color model.

The location of the chroma samples relative to the luma coordinates is
determined by the `xChromaOffset` and `yChromaOffset` members of the
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo) structure used to create the
sampler Y′CBCR conversion.

The following diagrams show the relationship between unnormalized (*u*,*v*)
coordinates and (*i*,*j*) integer texel positions in the luma component
(shown in black, with circles showing integer sample positions) and the
texel coordinates of reduced-resolution chroma components, shown as crosses
in red.

|  | If the chroma values are reconstructed at the locations of the luma samples
| --- | --- |
by means of interpolation, chroma samples from outside the image bounds are
needed; these are determined according to [Wrapping Operation](#textures-wrapping-operation).
These diagrams represent this by showing the bounds of the “chroma texel”
extending beyond the image bounds, and including additional chroma sample
positions where required for interpolation.
The limits of a sample for `NEAREST` sampling is shown as a grid. |

![chromasamples 422 cosited](../_images/chromasamples_422_cosited.svg)

Figure 4. 422 downsampling, xChromaOffset=COSITED_EVEN

![chromasamples 422 midpoint](../_images/chromasamples_422_midpoint.svg)

Figure 5. 422 downsampling, xChromaOffset=MIDPOINT

![chromasamples 420 xcosited ycosited](../_images/chromasamples_420_xcosited_ycosited.svg)

Figure 6. 420 downsampling, xChromaOffset=COSITED_EVEN, yChromaOffset=COSITED_EVEN

![chromasamples 420 xmidpoint ycosited](../_images/chromasamples_420_xmidpoint_ycosited.svg)

Figure 7. 420 downsampling, xChromaOffset=MIDPOINT, yChromaOffset=COSITED_EVEN

![chromasamples 420 xcosited ymidpoint](../_images/chromasamples_420_xcosited_ymidpoint.svg)

Figure 8. 420 downsampling, xChromaOffset=COSITED_EVEN, yChromaOffset=MIDPOINT

![chromasamples 420 xmidpoint ymidpoint](../_images/chromasamples_420_xmidpoint_ymidpoint.svg)

Figure 9. 420 downsampling, xChromaOffset=MIDPOINT, yChromaOffset=MIDPOINT

Reconstruction is implemented in one of two ways:

If the format of the image that is to be sampled sets
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](formats.html#VkFormatFeatureFlagBits),
or the [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)’s
`forceExplicitReconstruction` is [VK_TRUE](fundamentals.html#VK_TRUE), reconstruction is
performed as an explicit step independent of filtering, described in the
[Explicit Reconstruction](#textures-explicit-reconstruction) section.

If the format of the image that is to be sampled does not set
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_BIT](formats.html#VkFormatFeatureFlagBits)
and if the [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)’s
`forceExplicitReconstruction` is [VK_FALSE](fundamentals.html#VK_FALSE), reconstruction is
performed as an implicit part of filtering prior to color model conversion,
with no separate post-conversion texel filtering step, as described in the
[Implicit Reconstruction](#textures-implicit-reconstruction) section.

* 
If the `chromaFilter` member of the
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo) structure is
[VK_FILTER_NEAREST](samplers.html#VkFilter):

If the format’s R and B components are reduced in resolution in just
width by a factor of two relative to the G component (i.e. this is a
“`_422`” format), the    values
accessed by [texel filtering](#textures-texel-filtering) are
reconstructed as follows:

  

  

* 
If the format’s R and B components are reduced in resolution in width
and height by a factor of two relative to the G component (i.e. this is
a “`_420`” format), the    values
accessed by [texel filtering](#textures-texel-filtering) are
reconstructed as follows:

  

  

|  | `xChromaOffset` and `yChromaOffset` have no effect if
| --- | --- |
`chromaFilter` is [VK_FILTER_NEAREST](samplers.html#VkFilter) for explicit reconstruction. |

If the `chromaFilter` member of the
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo) structure is
[VK_FILTER_LINEAR](samplers.html#VkFilter):

* 
If the format’s R and B components are reduced in resolution in just
width by a factor of two relative to the G component (i.e. this is a
“`_422`” format):

If `xChromaOffset` is [VK_CHROMA_LOCATION_COSITED_EVEN](samplers.html#VkChromaLocationKHR):

  

  

* 
If `xChromaOffset` is [VK_CHROMA_LOCATION_MIDPOINT](samplers.html#VkChromaLocationKHR):

  

  

If the format’s R and B components are reduced in resolution in width
and height by a factor of two relative to the G component (i.e. this is
a “`_420`” format), a similar relationship applies.
Due to the number of options, these formulae are expressed more
concisely as follows:

  

  

  

  

|  | In the case where the texture itself is bilinearly interpolated as described
| --- | --- |
in [Texel Filtering](#textures-texel-filtering), thus requiring four
full-color samples for the filtering operation, and where the reconstruction
of these samples uses bilinear interpolation in the chroma components due to
`chromaFilter`=[VK_FILTER_LINEAR](samplers.html#VkFilter), up to nine chroma samples may be
required, depending on the sample location. |

Implicit reconstruction takes place by the samples being interpolated, as
required by the filter settings of the sampler, except that
`chromaFilter` takes precedence for the chroma samples.

If `chromaFilter` is [VK_FILTER_NEAREST](samplers.html#VkFilter), an implementation **may**
behave as if `xChromaOffset` and `yChromaOffset` were both
[VK_CHROMA_LOCATION_MIDPOINT](samplers.html#VkChromaLocationKHR), irrespective of the values set.

|  | This will not have any visible effect if the locations of the luma samples
| --- | --- |
coincide with the location of the samples used for rasterization. |

The sample coordinates are adjusted by the downsample factor of the
component (such that, for example, the sample coordinates are divided by two
if the component has a downsample factor of two relative to the luma
component):

  

  

Sampler Y′CBCR conversion performs the following operations on sampled
data, in order:

[Sampler Y′CBCR Component Swizzle](#textures-sampler-YCbCr-component-swizzle)

[Sampler Y′CBCR Range Expansion](#textures-sampler-YCbCr-conversion-rangeexpand)

[Sampler Y′CBCR Model Conversion](#textures-sampler-YCbCr-conversion-modelconversion)

An implementation **may** combine the range expansion and model conversion into
a single mathematical operation.

These operations are applied to color component values after
[sampling operations](#textures-input) which are not specific to sampler
Y′CBCR conversion have completed.

Rather than the [component swizzle performed as part of sampling](#textures-component-swizzle), which is banned for Y′CBCR image views used with
sampler Y′CBCR conversion, the component swizzle specified by
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)::`components` is applied to the
sampled data instead.
This is applied in the same way as the component swizzle usually performed
during sampling.

Sampler Y′CBCR range expansion is not applied if `ycbcrModel` is
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](samplers.html#VkSamplerYcbcrModelConversionKHR).

For other values of `ycbcrModel`, range expansion applies independently
to each component of the sampled data.
For the purposes of range expansion and Y′CBCR model conversion, the R and
B components contain color difference (chroma) values and the G component
contains luma.
The A component is not modified by sampler Y′CBCR range expansion.

The range expansion to be applied is defined by the `ycbcrRange` member
of the [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo) structure:

* 
If `ycbcrRange` is [VK_SAMPLER_YCBCR_RANGE_ITU_FULL](samplers.html#VkSamplerYcbcrRangeKHR), the
following transformations are applied:

  

  

|  | These formulae correspond to the “full range” encoding in the
| --- | --- |
“Quantization schemes” chapter of the [Khronos Data Format Specification](introduction.html#data-format).

Should any future amendments be made to the ITU specifications from which
these equations are derived, the formulae used by Vulkan **may** also be
updated to maintain parity. |

* 
If `ycbcrRange` is [VK_SAMPLER_YCBCR_RANGE_ITU_NARROW](samplers.html#VkSamplerYcbcrRangeKHR), the
following transformations are applied:

  

  

|  | These formulae correspond to the “narrow range” encoding in the
| --- | --- |
“Quantization schemes” chapter of the [Khronos Data Format Specification](introduction.html#data-format). |

* 
*n* is the bit-depth of the components in the format.

The precision of the operations performed during range expansion **must** be at
least that of the source format.

An implementation **may** clamp the results of these range expansion operations
such that Y′ falls in the range [0,1], and/or such that CB and CR
fall in the range [-0.5,0.5].

The range-expanded values are converted between color models, according to
the color model conversion specified in the `ycbcrModel` member:

[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](samplers.html#VkSamplerYcbcrModelConversionKHR)

The color components are not modified by the color model conversion
since they are assumed already to represent the desired color model in
which the shader is operating; Y′CBCR range expansion is also ignored.

[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY](samplers.html#VkSamplerYcbcrModelConversionKHR)

The color components are not modified by the color model conversion and
are assumed to be treated as though in Y′CBCR form both in memory and
in the shader; Y′CBCR range expansion is applied to the components as
for other Y′CBCR models, with the vector (CR,Y′,CB,A)
provided to the shader.

[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_709](samplers.html#VkSamplerYcbcrModelConversionKHR)

The color components are transformed from a Y′CBCR representation to an
R′G′B′ representation as described in the “BT.709 Y′CBCR
conversion” section of the [Khronos Data Format    Specification](introduction.html#data-format).

[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_601](samplers.html#VkSamplerYcbcrModelConversionKHR)

The color components are transformed from a Y′CBCR representation to an
R′G′B′ representation as described in the “BT.601 Y′CBCR
conversion” section of the [Khronos Data Format    Specification](introduction.html#data-format).

[VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_2020](samplers.html#VkSamplerYcbcrModelConversionKHR)

The color components are transformed from a Y′CBCR representation to an
R′G′B′ representation as described in the “BT.2020 Y′CBCR
conversion” section of the [Khronos Data Format    Specification](introduction.html#data-format).

In this operation, each output component is dependent on each input
component.

An implementation **may** clamp the R′G′B′ results of these conversions to
the range [0,1].

The precision of the operations performed during model conversion **must** be
at least that of the source format.

The alpha component is not modified by these model conversions.

|  | Sampling operations in a non-linear color space can introduce color and
| --- | --- |
intensity shifts at sharp transition boundaries.
To avoid this issue, the technically precise color correction sequence
described in the “Introduction to Color Conversions” chapter of the
[Khronos Data Format Specification](introduction.html#data-format) may be performed as
follows:

* 
Calculate the [unnormalized texel    coordinates](#textures-normalized-to-unnormalized) corresponding to the desired sample position.

* 
For a `minFilter` or `magFilter` of [VK_FILTER_NEAREST](samplers.html#VkFilter):

Calculate (*i*,*j*) for the sample location as described under the
“nearest filtering” formulae in [(u,v,w,a) to (i,j,k,l,n) Transformation and Array Layer Selection](#textures-unnormalized-to-integer)

* 
Calculate the normalized texel coordinates corresponding to these
integer coordinates.

* 
Sample using [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion)
at this location.

* 
For a `minFilter` or `magFilter` of [VK_FILTER_LINEAR](samplers.html#VkFilter):

Calculate (*i[0,1]*,*j[0,1]*) for the sample location as described
under the “linear filtering” formulae in
[(u,v,w,a) to (i,j,k,l,n) Transformation and Array Layer Selection](#textures-unnormalized-to-integer)

* 
Calculate the normalized texel coordinates corresponding to these
integer coordinates.

* 
Sample using [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion)
at each of these locations.

* 
Convert the non-linear A′R′G′B′ outputs of the Y′CBCR
conversions to linear ARGB values as described in the “Transfer
Functions” chapter of the [Khronos Data Format      Specification](introduction.html#data-format).

* 
Interpolate the linear ARGB values using the α and
β values described in the “linear filtering” section of
[(u,v,w,a) to (i,j,k,l,n) Transformation and Array Layer Selection](#textures-unnormalized-to-integer) and the equations in
[Texel Filtering](#textures-texel-filtering).

The additional calculations and, especially, additional number of sampling
operations in the [VK_FILTER_LINEAR](samplers.html#VkFilter) case can be expected to have a
performance impact compared with using the outputs directly.
Since the variations from “correct” results are subtle for most content,
the application author should determine whether a more costly implementation
is strictly necessary.

If `chromaFilter`, and `minFilter` or `magFilter` are both
[VK_FILTER_NEAREST](samplers.html#VkFilter), these operations are redundant and sampling using
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) at the desired
sample coordinates will produce the “correct” results without further
processing. |

If the image sampler instruction provides normalized texel coordinates, some
of the following operations are performed.

For `Proj` image operations, the normalized texel coordinates
(s,t,r,q,a) and (if present) the Dref coordinate are
transformed as follows:

  

  

Derivatives are used for LOD selection.
These derivatives are either implicit (in an `ImplicitLod` image
instruction in a
mesh, task,
compute, or
fragment shader) or explicit (provided explicitly by shader to the image
instruction in any shader).

For implicit derivatives image instructions, the derivatives of texel
coordinates are calculated in the same manner as
[derivative operations](shaders.html#shaders-derivative-operations).
That is:

  

  

Partial derivatives not defined above for certain image dimensionalities are
set to zero.

For explicit LOD image instructions, if the **optional** SPIR-V operand
`Grad` is provided, then the operand values are used for the derivatives.
The number of components present in each derivative for a given image
dimensionality matches the number of partial derivatives computed above.

If the **optional** SPIR-V operand `Lod` is provided, then derivatives are
set to zero, the cube map derivative transformation is skipped, and the
scale factor operation is skipped.
Instead, the floating-point scalar coordinate is directly assigned to
λbase as described in [LOD Operation](#textures-level-of-detail-operation).

If the image or sampler object used by an implicit derivative image
instruction is not uniform across the quad and
[`quadDivergentImplicitLod`](devsandqueues.html#limits-quadDivergentImplicitLod) is not
supported, then the derivative and LOD values are **undefined**.
Implicit derivatives are well-defined when the image and sampler and control
flow are uniform across the quad, even if they diverge between different
quads.

If [`quadDivergentImplicitLod`](devsandqueues.html#limits-quadDivergentImplicitLod) is
supported, then derivatives and implicit LOD values are well-defined even if
the image or sampler object are not uniform within a quad.
The derivatives are computed as specified above, and the implicit LOD
calculation proceeds for each shader invocation using its respective image
and sampler object.

For cube map image instructions, the (s,t,r) coordinates are treated
as a direction vector (rx,ry,rz).
The direction vector is used to select a cube map face.
The direction vector is transformed to a per-face texel coordinate system
(sface,tface), The direction vector is also used to transform the
derivatives to per-face derivatives.

The direction vector selects one of the cube map’s faces based on the
largest magnitude coordinate direction (the major axis direction).
Since two or more coordinates **can** have identical magnitude, the
implementation **must** have rules to disambiguate this situation.

The rules **should** have as the first rule that rz wins over
ry and rx, and the second rule that ry wins over
rx.
An implementation **may** choose other rules, but the rules **must** be
deterministic and depend only on (rx,ry,rz).

The layer number (corresponding to a cube map face), the coordinate
selections for sc, tc, rc, and the selection of
derivatives, are determined by the major axis direction as specified in the
following two tables.

| Major Axis Direction | Layer Number | Cube Map Face | sc | tc | rc |
| --- | --- | --- | --- | --- | --- |
| +rx | 0 | Positive X | -rz | -ry | rx |
| -rx | 1 | Negative X | +rz | -ry | rx |
| +ry | 2 | Positive Y | +rx | +rz | ry |
| -ry | 3 | Negative Y | +rx | -rz | ry |
| +rz | 4 | Positive Z | +rx | -ry | rz |
| -rz | 5 | Negative Z | -rx | -ry | rz |

| Major Axis Direction | ∂sc / ∂x | ∂sc / ∂y | ∂tc / ∂x | ∂tc / ∂y | ∂rc / ∂x | ∂rc / ∂y |
| --- | --- | --- | --- | --- | --- | --- |
| +rx | -∂rz / ∂x | -∂rz / ∂y | -∂ry / ∂x | -∂ry / ∂y | +∂rx / ∂x | +∂rx / ∂y |
| -rx | +∂rz / ∂x | +∂rz / ∂y | -∂ry / ∂x | -∂ry / ∂y | -∂rx / ∂x | -∂rx / ∂y |
| +ry | +∂rx / ∂x | +∂rx / ∂y | +∂rz / ∂x | +∂rz / ∂y | +∂ry / ∂x | +∂ry / ∂y |
| -ry | +∂rx / ∂x | +∂rx / ∂y | -∂rz / ∂x | -∂rz / ∂y | -∂ry / ∂x | -∂ry / ∂y |
| +rz | +∂rx / ∂x | +∂rx / ∂y | -∂ry / ∂x | -∂ry / ∂y | +∂rz / ∂x | +∂rz / ∂y |
| -rz | -∂rx / ∂x | -∂rx / ∂y | -∂ry / ∂x | -∂ry / ∂y | -∂rz / ∂x | -∂rz / ∂y |

  

  

The partial derivatives of the [Cube Map Coordinate Transformations](#textures-cube-map-coordinate-transform) can be computed as:

  

  

The other derivatives are simplified similarly, resulting in

  

  

LOD selection **can** be either explicit (provided explicitly by the image
instruction) or implicit (determined from a scale factor calculated from the
derivatives).
The LOD **must** be computed with `mipmapPrecisionBits` of accuracy.

The magnitude of the derivatives are calculated by:

mux = |∂s/∂x| × wbase

mvx = |∂t/∂x| × hbase

mwx = |∂r/∂x| × dbase

muy = |∂s/∂y| × wbase

mvy = |∂t/∂y| × hbase

mwy = |∂r/∂y| × dbase

where:

∂t/∂x = ∂t/∂y = 0 (for 1D
images)

∂r/∂x = ∂r/∂y = 0 (for 1D,
2D, or Cube images)

and:

wbase = image.w

hbase = image.h

dbase = image.d

(for the `baseMipLevel`, from the image descriptor).

For corner-sampled images, the wbase, hbase, and
dbase are instead:

wbase = image.w - 1

hbase = image.h - 1

dbase = image.d - 1

A point sampled in screen space has an elliptical footprint in texture
space.
The minimum and maximum scale factors (ρmin, ρmax) **should**
be the minor and major axes of this ellipse.

The *scale factors* ρx and ρy, calculated from the
magnitude of the derivatives in x and y, are used to compute the minimum and
maximum scale factors.

ρx and ρy **may** be approximated with functions
fx and fy, subject to the following constraints:

  

  

  

  

The minimum and maximum scale factors (ρmin,ρmax) are
determined by:

ρmax = max(ρx, ρy)

ρmin = min(ρx, ρy)

The ratio of anisotropy is determined by:

η = min(ρmax/ρmin, maxAniso)

where:

sampler.maxAniso = `maxAnisotropy` (from sampler
descriptor)

limits.maxAniso = `maxSamplerAnisotropy` (from
physical device limits)

maxAniso = min(sampler.maxAniso, limits.maxAniso)

If ρmax = ρmin = 0, then all the partial derivatives are
zero, the fragment’s footprint in texel space is a point, and η
**should** be treated as 1.
If ρmax ≠ 0 and ρmin = 0 then all partial
derivatives along one axis are zero, the fragment’s footprint in texel space
is a line segment, and η **should** be treated as maxAniso.
However, anytime the footprint is small in texel space the implementation
**may** use a smaller value of η, even when ρmin is zero
or close to zero.
If either [VkPhysicalDeviceFeatures](features.html#VkPhysicalDeviceFeatures)::`samplerAnisotropy` or
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)::`anisotropyEnable` are [VK_FALSE](fundamentals.html#VK_FALSE),
maxAniso is set to 1.

If η = 1, sampling is isotropic.
If η > 1, sampling is anisotropic.

The sampling rate (N) is derived as:

N = ⌈η⌉

An implementation **may** round N up to the nearest supported sampling
rate.
An implementation **may** use the value of N as an approximation of
η.

The LOD parameter λ is computed as follows:

  

  

where:

  

  

and maxSamplerLodBias is the value of the [VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)
feature [`maxSamplerLodBias`](limits.html#limits-maxSamplerLodBias).

The image level(s) d, dhi, and dlo which texels are
read from are determined by an image-level parameter dl, which is
computed based on the LOD parameter, as follows:

  

  

where:

  

  

  

  

and:

  

  

`baseMipLevel` and `levelCount` are taken from the
`subresourceRange` of the image view.

minLodimageView **must** be less or equal to levelbase + q.

If the sampler’s `mipmapMode` is [VK_SAMPLER_MIPMAP_MODE_NEAREST](samplers.html#VkSamplerMipmapMode),
then the level selected is d = dl.

If the sampler’s `mipmapMode` is [VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode),
two neighboring levels are selected:

  

  

δ is the fractional value, quantized to the number of
[mipmap precision bits](limits.html#limits-mipmapPrecisionBits), used for
[linear filtering](#textures-texel-filtering) between levels.

The normalized texel coordinates are scaled by the image level dimensions
and the array layer is selected.

This transformation is performed once for each level used in
[filtering](#textures-texel-filtering) (either d, or dhi and
dlo).

  

  

where:

widthscale = widthlevel

heightscale = heightlevel

depthscale = depthlevel

for conventional images, and:

widthscale = widthlevel - 1

heightscale = heightlevel - 1

depthscale = depthlevel - 1

for corner-sampled images.

and where (Δi, Δj, Δk) are
taken from the image instruction if it includes a `ConstOffset` or
`Offset` operand, otherwise they are taken to be zero.

Operations then proceed to Unnormalized Texel Coordinate Operations.

The unnormalized texel coordinates are transformed to integer texel
coordinates relative to the selected mipmap level.

The layer index l is computed as:

l = clamp(RNE(a), 0, `layerCount` - 1) + 
`baseArrayLayer`

where `layerCount` is the number of layers in the image subresource
range of the image view, `baseArrayLayer` is the first layer from the
subresource range, and where:

  

  

The sample index n is assigned the value 0.

Nearest filtering ([VK_FILTER_NEAREST](samplers.html#VkFilter)) computes the integer texel
coordinates that the unnormalized coordinates lie within:

  

  

where:

shift = 0.0

for conventional images, and:

shift = 0.5

for corner-sampled images.

Linear filtering ([VK_FILTER_LINEAR](samplers.html#VkFilter)) computes a set of neighboring
coordinates which bound the unnormalized coordinates.
The integer texel coordinates are combinations of i0 or i1,
j0 or j1, k0 or k1, as well as weights
α, β, and γ.

  

  

  

  

where:

shift = 0.5

for conventional images, and:

shift = 0.0

for corner-sampled images,
and where:

  

  

where the number of fraction bits retained is specified by
`VkPhysicalDeviceLimits`::`subTexelPrecisionBits`.

Cubic filtering ([VK_FILTER_CUBIC_EXT](samplers.html#VkFilter)) computes a set of neighboring
coordinates which bound the unnormalized coordinates.
The integer texel coordinates are combinations of i0, i1,
i2 or i3, j0, j1, j2 or j3,
k0, k1, k2 or k3, as well as weights
α, β, and γ.

  

  

  

  

where:

  

  

where the number of fraction bits retained is specified by
`VkPhysicalDeviceLimits`::`subTexelPrecisionBits`.

Integer texel coordinate operations **may** supply a LOD which texels are to be
read from or written to using the optional SPIR-V operand `Lod`.
If the `Lod` is provided then it **must** be an integer.

The image level selected is:

  

  

If d does not lie in the range [`baseMipLevel`,
`baseMipLevel` +  `levelCount`)
or d is less than minLodIntegerimageView,
then any values fetched are
zero if the [`robustImageAccess2`](features.html#features-robustImageAccess2)
feature is enabled, otherwise are
**undefined**, and any writes (if supported) are discarded.

If the used sampler was created without
[VK_SAMPLER_CREATE_NON_SEAMLESS_CUBE_MAP_BIT_EXT](samplers.html#VkSamplerCreateFlagBits),
`Cube` images ignore the wrap modes specified in the sampler.
Instead, if [VK_FILTER_NEAREST](samplers.html#VkFilter) is used within a mip level then
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode) is used, and if
[VK_FILTER_LINEAR](samplers.html#VkFilter) is used within a mip level then sampling at the edges
is performed as described earlier in the [Cube map edge handling](#textures-cubemapedge) section.

The first integer texel coordinate i is transformed based on the
`addressModeU` parameter of the sampler.

  

  

where:

  

  

j (for 2D and Cube image) and k (for 3D image) are similarly
transformed based on the `addressModeV` and `addressModeW`
parameters of the sampler, respectively.

SPIR-V instructions with `Gather` in the name return a vector derived
from 4 texels in the base level of the image view.
The rules for the [VK_FILTER_LINEAR](samplers.html#VkFilter) minification filter are applied to
identify the four selected texels.
Each texel is then converted to an RGBA value according to
[component substitution](images.html#images-component-substitution) and then
[swizzled](#textures-component-swizzle).
A four-component vector is then assembled by taking the component indicated
by the `Component` value in the instruction from the swizzled color value
of the four texels.
If the operation does not use the `ConstOffsets` image operand then the
four texels form the 2 × 2 rectangle used for texture filtering:

  

  

If the operation does use the `ConstOffsets` image operand then the
offsets allow a custom filter to be defined:

  

  

where:

  

  

`OpImage*Gather` **must** not be used on a sampled image with
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) enabled.

If levelbase imageView, then any values fetched are
zero if the [`robustImageAccess2`](features.html#features-robustImageAccess2)
feature is enabled.
Otherwise values are
**undefined**.

Texel filtering is first performed for each level (either d or
dhi and dlo).

If λ is less than or equal to zero, the texture is said to be
*magnified*, and the filter mode within a mip level is selected by the
`magFilter` in the sampler.
If λ is greater than zero, the texture is said to be
*minified*, and the filter mode within a mip level is selected by the
`minFilter` in the sampler.

Within a mip level, [VK_FILTER_NEAREST](samplers.html#VkFilter) filtering selects a single value
using the (i, j, k) texel coordinates, with all texels taken from
layer l.

  

  

Within a mip level, [VK_FILTER_LINEAR](samplers.html#VkFilter) filtering combines 8 (for 3D), 4
(for 2D or Cube), or 2 (for 1D) texel values, together with their linear
weights.
The linear weights are derived from the fractions computed earlier:

  

  

The values of multiple texels, together with their weights, are combined to
produce a filtered value.

The [VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` **can** control
the process by which multiple texels, together with their weights, are
combined to produce a filtered texture value.

When the `reductionMode` is set (explicitly or implicitly) to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT), a weighted average is
computed:

  

  

However, if the reduction mode is [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT), the process operates on the above set
of multiple texels, together with their weights, computing a component-wise
minimum or maximum, respectively, of the components of the set of texels
with non-zero weights.

Within a mip level, [VK_FILTER_CUBIC_EXT](samplers.html#VkFilter), filtering computes a weighted
average of
64 (for 3D),
16 (for 2D), or 4 (for 1D) texel values, together with their
Catmull-Rom, Zero Tangent Cardinal, B-Spline, or Mitchell-Netravali weights
as specified by [VkSamplerCubicWeightsCreateInfoQCOM](samplers.html#VkSamplerCubicWeightsCreateInfoQCOM).

Catmull-Rom weights
specified by [VK_CUBIC_FILTER_WEIGHTS_CATMULL_ROM_QCOM](samplers.html#VkCubicFilterWeightsQCOM)
are derived from the fractions computed earlier.

  

  

Zero Tangent Cardinal weights specified by
[VK_CUBIC_FILTER_WEIGHTS_ZERO_TANGENT_CARDINAL_QCOM](samplers.html#VkCubicFilterWeightsQCOM) are derived from
the fractions computed earlier.

  

  

B-Spline weights specified by [VK_CUBIC_FILTER_WEIGHTS_B_SPLINE_QCOM](samplers.html#VkCubicFilterWeightsQCOM)
are derived from the fractions computed earlier.

  

  

Mitchell-Netravali weights specified by
[VK_CUBIC_FILTER_WEIGHTS_MITCHELL_NETRAVALI_QCOM](samplers.html#VkCubicFilterWeightsQCOM) are derived from the
fractions computed earlier.

  

  

The values of multiple texels, together with their weights, are combined to
produce a filtered value.

The [VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` **can** control
the process by which multiple texels, together with their weights, are
combined to produce a filtered texture value.

When the `reductionMode` is set (explicitly or implicitly) to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT)
or [VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT)
, a weighted average is computed:

  

  

However, if the reduction mode is [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT), the process operates on the above set
of multiple texels, together with their weights, computing a component-wise
minimum or maximum, respectively, of the components of the set of texels
with non-zero weights.

When `reductionMode` is
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE_RANGECLAMP_QCOM](samplers.html#VkSamplerReductionModeEXT), the
weighted average is clamped to be within the component-wise minimum and
maximum of the set of texels with non-zero weights.

[VK_SAMPLER_MIPMAP_MODE_NEAREST](samplers.html#VkSamplerMipmapMode) filtering returns the value of a single
mipmap level,

τ = τ[d].

[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode) filtering combines the values of
multiple mipmap levels (τ[hi] and τ[lo]), together with their linear
weights.

The linear weights are derived from the fraction computed earlier:

  

  

The values of multiple mipmap levels, together with their weights, are
combined to produce a final filtered value.

The [VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` **can** control
the process by which multiple texels, together with their weights, are
combined to produce a filtered texture value.

When the `reductionMode` is set (explicitly or implicitly) to
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT), a weighted average is
computed:

  

  

However, if the reduction mode is [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT), the process operates on the above
values, together with their weights, computing a component-wise minimum or
maximum, respectively, of the components of the values with non-zero
weights.

Anisotropic filtering is enabled by the `anisotropyEnable` in the
sampler.
When enabled, the image filtering scheme accounts for a degree of
anisotropy.

The particular scheme for anisotropic texture filtering is
implementation-dependent.
Implementations **should** consider the `magFilter`, `minFilter` and
`mipmapMode` of the sampler to control the specifics of the anisotropic
filtering scheme used.
In addition, implementations **should** consider `minLod` and `maxLod`
of the sampler.

|  | For historical reasons, vendor implementations of anisotropic filtering
| --- | --- |
interpret these sampler parameters in different ways, particularly in corner
cases such as `magFilter`, `minFilter` of [VK_FILTER_NEAREST](samplers.html#VkFilter) or
`maxAnisotropy` equal to 1.0.
Applications should not expect consistent behavior in such cases, and should
use anisotropic filtering only with parameters which are expected to give a
quality improvement relative to `LINEAR` filtering.

The following describes one particular approach to implementing anisotropic
filtering for the 2D Image case; implementations **may** choose other methods:

Given a `magFilter`, `minFilter` of [VK_FILTER_LINEAR](samplers.html#VkFilter) and a
`mipmapMode` of [VK_SAMPLER_MIPMAP_MODE_NEAREST](samplers.html#VkSamplerMipmapMode):

Instead of a single isotropic sample, N isotropic samples are sampled within
the image footprint of the image level d to approximate an anisotropic
filter.
The sum τ2Daniso is defined using the single isotropic
τ2D(u,v) at level d.

  

  

When [VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` is
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT), the above summation is
used.
However, if the reduction mode is [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT), the process operates on the above
values, together with their weights, computing a component-wise minimum or
maximum, respectively, of the components of the values with non-zero
weights. |

The SPIR-V instruction `OpImageSampleFootprintNV` evaluates the set of
texels from a single mip level that would be accessed during a
[texel filtering](#textures-texel-filtering) operation.
In addition to the inputs that would be accepted by an equivalent
`OpImageSample*` instruction, `OpImageSampleFootprintNV` accepts two
additional inputs.
The `Granularity` input is an integer identifying the size of texel
groups used to evaluate the footprint.
Each bit in the returned footprint mask corresponds to an aligned block of
texels whose size is given by the following table:

| `Granularity` | `Dim` = 2D | `Dim` = 3D |
| --- | --- | --- |
| 0 | unsupported | unsupported |
| 1 | 2x2 | 2x2x2 |
| 2 | 4x2 | unsupported |
| 3 | 4x4 | 4x4x2 |
| 4 | 8x4 | unsupported |
| 5 | 8x8 | unsupported |
| 6 | 16x8 | unsupported |
| 7 | 16x16 | unsupported |
| 8 | unsupported | unsupported |
| 9 | unsupported | unsupported |
| 10 | unsupported | 16x16x16 |
| 11 | 64x64 | 32x16x16 |
| 12 | 128x64 | 32x32x16 |
| 13 | 128x128 | 32x32x32 |
| 14 | 256x128 | 64x32x32 |
| 15 | 256x256 | unsupported |

The `Coarse` input is used to select between the two mip levels that **may**
be accessed during texel filtering when using a `mipmapMode` of
[VK_SAMPLER_MIPMAP_MODE_LINEAR](samplers.html#VkSamplerMipmapMode).
When filtering between two mip levels, a `Coarse` value of `true`
requests the footprint in the lower-resolution mip level (higher level
number), while `false` requests the footprint in the higher-resolution
mip level.
If texel filtering would access only a single mip level, the footprint in
that level would be returned when `Coarse` is `false`; an empty
footprint would be returned when `Coarse` is `true`.

The footprint for `OpImageSampleFootprintNV` is returned in a structure
with six members:

* 
The first member is a boolean value that is true if the texel filtering
operation would access only a single mip level.

* 
The second member is a two- or three-component integer vector holding
the footprint anchor location.
For two-dimensional images, the returned components are in units of
eight texel groups.
For three-dimensional images, the returned components are in units of
four texel groups.

* 
The third member is a two- or three-component integer vector holding a
footprint offset relative to the anchor.
All returned components are in units of texel groups.

* 
The fourth member is a two-component integer vector mask, which holds a
bitfield identifying the set of texel groups in an 8x8 or 4x4x4
neighborhood relative to the anchor and offset.

* 
The fifth member is an integer identifying the mip level containing the
footprint identified by the anchor, offset, and mask.

* 
The sixth member is an integer identifying the granularity of the
returned footprint.

For footprints in two-dimensional images (`Dim2D`), the mask returned by
`OpImageSampleFootprintNV` indicates whether each texel group in a 8x8
local neighborhood of texel groups would have one or more texels accessed
during texel filtering.
In the mask, the texel group with local group coordinates
   is considered covered if and only if

  

  

where:

* 
   and   ; and

* 
   is the returned two-component mask.

The local group with coordinates    in the mask is
considered covered if and only if the texel filtering operation would access
one or more texels    in the returned mip level where:

  

  

and

* 
   and   ;

* 
   is a two-component vector holding the width and height
of the texel group identified by the granularity;

* 
   is the returned two-component anchor vector; and

* 
   is the returned two-component offset vector.

For footprints in three-dimensional images (`Dim3D`), the mask returned
by `OpImageSampleFootprintNV` indicates whether each texel group in a
4x4x4 local neighborhood of texel groups would have one or more texels
accessed during texel filtering.
In the mask, the texel group with local group coordinates
  , is considered covered if and only if:

  

  

where:

* 
  ,   , and \(0
\leq lgz    is the returned two-component mask.

The local group with coordinates    in the mask is
considered covered if and only if the texel filtering operation would access
one or more texels    in the returned mip level where:

  

  

and

* 
  ,   ,
  ;

* 
   is a three-component vector holding the width, height,
and depth of the texel group identified by the granularity;

* 
   is the returned three-component anchor vector; and

* 
   is the returned three-component offset vector.

If the sampler used by `OpImageSampleFootprintNV` enables anisotropic
texel filtering via `anisotropyEnable`, it is possible that the set of
texel groups accessed in a mip level may be too large to be expressed using
an 8x8 or 4x4x4 mask using the granularity requested in the instruction.
In this case, the implementation uses a texel group larger than the
requested granularity.
When a larger texel group size is used, `OpImageSampleFootprintNV`
returns an integer granularity value that **can** be interpreted in the same
manner as the granularity value provided to the instruction to determine the
texel group size used.
If anisotropic texel filtering is disabled in the sampler, or if an
anisotropic footprint can be represented as an 8x8 or 4x4x4 mask with the
requested granularity, `OpImageSampleFootprintNV` will use the requested
granularity as-is and return a granularity value of zero.

`OpImageSampleFootprintNV` supports only two- and three-dimensional image
accesses (`Dim2D` and `Dim3D`), and the footprint returned is
**undefined** if a sampler uses an addressing mode other than
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode).

The SPIR-V instruction `OpImageSampleWeightedQCOM` specifies a texture
sampling operation involving two images: the *sampled image* and the *weight
image*.
It is similar to bilinear filtering except more than 2x2 texels may
participate in the filter and the filter weights are application-specified
rather than computed by fixed-function hardware.
The weight image view defines a 2D kernel weights used during sampling.

The `OpImageSampleWeightedQCOM` support normalized or unnormalized texel
coordinates.
In addition to the inputs that would be accepted by an equivalent
`OpImageSample*` instruction, `OpImageSampleWeightedQCOM` accepts a
`weight` input that specifies the view of a sample weight image

The input `weight` **must** be a view of a 2D or 1D image with
`miplevels` equal to `1`, `samples` equal to
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits), created with an identity swizzle, and created
with the [VK_IMAGE_USAGE_SAMPLE_WEIGHT_BIT_QCOM](resources.html#VkImageUsageFlagBits) usage flag set.
The [VkImageViewSampleWeightCreateInfoQCOM](resources.html#VkImageViewSampleWeightCreateInfoQCOM) specifies additional
parameters of the view: `filterCenter`, `filterSize`, and
`numPhases`.
described in more detail below.

The `weight` input **must** be bound using a
[sample weight image](descriptors.html#descriptors-weightimage) descriptor type.
The `weight` view defines a filtering kernel that is a region of view’s
subresource range.
The kernel spans a region from integer texel coordinate (0,0) to
(`filterSize.x`-1, `filterSize.y`-1).
It is valid for the view’s subresource to have dimensions larger than the
kernel but the texels with integer coordinates greater than
(`filterSize.width`-1, `filterSize.height`-1) are ignored by
weight sampling.

`filterCenter` designates an integer texel coordinate within the filter
kernel as being the 'center' of the kernel.
The center **must** be in the range (0,0) to (`filterSize.x`-1,
`filterSize.y`-1).
`numPhases` describes the number of filter phases used to provide
sub-pixel filtering.
Both are described in more detail below.

The weight image specifies filtering kernel weight values.
A 2D image view can be used to specify a 2D matrix of filter weights.
For separable filters, a 1D image view can be used to specify the horizontal
and vertical weights.

A 2D image view defined with [VkImageViewSampleWeightCreateInfoQCOM](resources.html#VkImageViewSampleWeightCreateInfoQCOM)
describes a 2D matrix (`filterSize.width` ×
`filterSize.height`) of weight elements with filter’s center point at
`filterCenter`.
Note that `filterSize` can be smaller than the view’s subresource, but
the filter will always be located starting at integer texel coordinate
(0,0).

The following figure illustrates a 2D convolution filter having
`filterSize` of (4,3) and `filterCenter` at (1, 1).

![weight filter 2d](../_images/weight_filter_2d.svg)

Figure 10. 2D Convolution Filter

For a 2D weight filter, the phases are stored as layers of a 2D array image.
The width and height of the view’s subresource range **must** be less than or
equal to
[VkPhysicalDeviceImageProcessingPropertiesQCOM](devsandqueues.html#VkPhysicalDeviceImageProcessingPropertiesQCOM)::`maxWeightFilterDimension`.
The layers are stored in horizontal phase major order.
Expressed as a formula, the layer index for each filter phase is computed
as:

layerIndex(horizPhase,vertPhase,horizPhaseCount) = (vertPhase * horizPhaseCount) + horizPhase

A separable weight filter is a 2D filter that can be specified by two 1D
filters in the x and y directions such that their product yields
the 2D filter.
The following example shows a 2D filter and its associated separable 1D
horizontal and vertical filters.

![weight filter 1d separable](../_images/weight_filter_1d_separable.svg)

Figure 11. Separable 2D Convolution Filter

A 1D array image view defined with
[VkImageViewSampleWeightCreateInfoQCOM](resources.html#VkImageViewSampleWeightCreateInfoQCOM) and with `layerCount` equal
to '2' describes a separable weight filter.
The horizontal weights are specified in slice '0' and the vertical weights
in slice '1'.
The `filterSize` and `filterCenter` specify the size and origin of
the of the horizontal and vertical filters.
For many use cases, 1D separable filters can offer a performance advantage
over 2D filters.

For a 1D separable weight filter, the phases are arranged into a 1D array
image with two layers.
The horizontal weights are stored in layer 0 and the vertical weights in
layer 1.
Within each layer of the 1D array image, the weights are arranged into
groups of 4, and then arranged by phase.
Expressed as a formula, the 1D texel offset for each weight within each
layer is computed as:

// Let horizontal weights have a weightIndex of [0, filterSize.width - 1]
// Let vertical weights have a weightIndex of [0, filterSize.height - 1]
// Let phaseCount be the number of phases in either the vertical or horizontal direction.

texelOffset(phaseIndex,weightIndex,phaseCount) = (phaseCount * 4 * (weightIndex / 4)) + (phaseIndex * 4) + (weightIndex % 4)

When using weight image sampling, the texture coordinates may not align with
a texel center in the sampled image.
In this case, the filter weights can be adjusted based on the subpixel
location.
This is termed “subpixel filtering” to indicate that the origin of the
filter lies at a subpixel location other than the texel center.
Conceptually, this means that the weight filter is positioned such that
filter taps do not align with sampled texels exactly.
In such a case, modified filter weights may be needed to adjust for the
off-center filter taps.
Unlike bilinear filtering where the subpixel weights are computed by the
implementation, subpixel weight image sampling requires that the per-phase
filter weights are pre-computed by the application and stored in an array
where each slice of the array is a “filter phase”.
The array is indexed by the implementation based on subpixel positioning.
Rather than a single 2D kernel of filter weights, the application provides
an array of kernels, one set of filter weights per phase.

The number of phases are restricted by following requirements, which apply
to both separable and non-separable filters:

* 
The number of phases in the vertical direction, phaseCountvert,
**must** be a power of two (i.e., 1, 2, 4, etc.).

* 
The number of phases in the horizontal direction
phaseCounthoriz, **must** equal phaseCountvert.

* 
The total number of phases, phaseCountvert ×
phaseCounthoriz, **must** be less than or equal to
[VkPhysicalDeviceImageProcessingPropertiesQCOM](devsandqueues.html#VkPhysicalDeviceImageProcessingPropertiesQCOM)::`maxWeightFilterPhases`.

Weight sampling requires `VkSamplerCreateInfo` `addressModeU` and
`addressModeV` **must** be [VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode) or
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](samplers.html#VkSamplerAddressMode).
If [VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](samplers.html#VkSamplerAddressMode) is used, then the border
color **must** be [VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK](samplers.html#VkBorderColor).

The 2D unnormalized texel coordinates    are transformed by
   to specify coordinates   .

  

  

where    is specified by
[VkImageViewSampleWeightCreateInfoQCOM](resources.html#VkImageViewSampleWeightCreateInfoQCOM)::`filterCenter`.

Two sets of neighboring integer 2D texel coordinates are generated.
The first set is used for selecting texels from the sampled image
   and the second set used for selecting texels from the
weight image   .
The first set of neighboring coordinates are combinations of
   to    and    to
  .
The second set of neighboring coordinates are combinations of
   to    and    to
  .
The first and second sets each contain \((filterWidth \times
filterHeight)\) of pairs of    and   
coordinates respectively.

  

  

where    and    are specified by
[VkImageViewSampleWeightCreateInfoQCOM](resources.html#VkImageViewSampleWeightCreateInfoQCOM)::`filterSize`.

Each of the generated integer coordinates    is
transformed by [texture wrapping operation](#textures-wrapping-operation),
followed by [integer texel coordinate validation](#textures-integer-coordinate-validation), If any coordinate fails coordinate validation, it
is a Border Texel and [border replacement](#textures-border-replacement) is
performed.

The phase index    is computed from the fraction bits of the
unnormalized 2D texel coordinates:

  

  

where the number of fraction bits retained is
   specified by
[VkImageViewSampleWeightCreateInfoQCOM](resources.html#VkImageViewSampleWeightCreateInfoQCOM)::`numPhases`

Each pair of texel coordinates    in the first set selects a
single texel value    from the sampled image.
Each pair of texel coordinates    in the second set, combined
with phaseIndex   , selects a single weight from the weight
image    .

  

  

If    is a 2D array view, then non-separable filtering is
specified, and integer coordinates    are used to select
texels from layer    of   .
If    is a 1D array view, then separable filtering is specified
and integer coordinates    are transformed to
  , and used to select horizontal weight
   and vertical weight    texels
from layer 0 and layer 1 of    respectively.

  

  

Where    refers to the integer modulo operator.

Each selected texel is read with the operations specified in
[Texel Reads](#textures-texel-reads), and their values are combined to produce a
filtered value.

  

  

When [VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` is
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT), the above summation is
used.
However, if the reduction mode is [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT), the process operates on the above
values, computing a component-wise minimum or maximum of the texels with
non-zero weights.
If the reduction mode is [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT), each    weight
**must** be equal to 0.0 or 1.0, otherwise the **undefined** values are returned.

Finally, the operations described in [Component swizzle](#textures-component-swizzle) are performed and the final result is returned to the shader.

The SPIR-V instruction `opImageBlockMatchSAD` and
`opImageBlockMatchSSD` specify texture block matching operations where a
block or region of texels within a *target image* is compared with a
same-sized region in a *reference image*.
The instructions make use of two image views: the *target view* and the
*reference view*.
The target view and reference view can be the same view, allowing block
matching of two blocks within a single image.

Similar to an equivalent `OpImageFetch` instruction,
`opImageBlockMatchSAD` and `opImageBlockMatchSAD` specify an
`image` and an integer texel `coordinate` which describes the
bottom-left texel of the target block.
There are three additional inputs.
The `reference` and `refCoodinate` specifies bottom-left texel of the
reference block.
The `blockSize` specifies the integer width and height of the target and
reference blocks to be compared, and **must** not be greater than
[VkPhysicalDeviceImageProcessingPropertiesQCOM](devsandqueues.html#VkPhysicalDeviceImageProcessingPropertiesQCOM).`maxBlockMatchRegion`.
If `blockSize` is specified with either dimension `0`, `Result` will
return an **undefined** value.

`opImageBlockMatchWindowSAD` and `opImageBlockMatchWindowSAD` take the
same input parameters as the corresponding non-window instructions.
The block matching comparison is performed for all pixel values within a 2D
window whose dimensions are specified in the sampler.

For `opImageBlockMatchSAD` and `opImageBlockMatchSSD`, the input
`sampler` **must** be created with `addressModeU` and `addressModeV`,
equal to [VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode), or
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](samplers.html#VkSamplerAddressMode) with
[VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK](samplers.html#VkBorderColor).
The input `sampler` **must** be created with `unnormalizedCoordinates`
equal to [VK_TRUE](fundamentals.html#VK_TRUE).
The input `sampler` **must** be created with `components` equal to
[VK_COMPONENT_SWIZZLE_IDENTITY](resources.html#VkComponentSwizzle).

For `opImageBlockMatchWindowSAD` and `opImageBlockMatchWindowSSD`
instructions, the `target` sampler **must** have been created with
[VkSamplerBlockMatchWindowCreateInfoQCOM](samplers.html#VkSamplerBlockMatchWindowCreateInfoQCOM) in the `pNext` chain.

For `opImageBlockMatchWindowSAD`, `opImageBlockMatchWindowSSD`,
`opImageBlockMatchGatherSAD`, or
`opImageBlockMatchGatherSSDinstructions`, the input `sampler` **must** be
created with `addressModeU` and `addressModeV`, equal to
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](samplers.html#VkSamplerAddressMode) with
[VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK](samplers.html#VkBorderColor).

Other sampler states are ignored.

Block matching SPIR-V instructions `opImageBlockMatchSAD` and
`opImageBlockMatchSSD` specify two sets of 2D integer texel coordinates:
target coordinates    and reference coordinates
  .

The coordinates define the bottom-left texel of the target block
   and the reference block \((k_{0},
l_{0})\).

  

  

For the target block, a set of neighboring integer texel coordinates are
generated.
The neighboring coordinates are combinations of    to
   and    to
  .
The set is of size   .

  

  

where    and    is specified by the
`blockSize` operand.

If any target integer texel coordinate    in the set fails
[integer texel coordinate validation](#textures-integer-coordinate-validation), then the texel is an invalid texel and
[border replacement](#textures-border-replacement) is performed.

Similarly for the reference block, a set of neighboring integer texel
coordinates are generated.

  

  

Each reference texel coordinate    in the set **must** not fail
[integer texel coordinate validation](#textures-integer-coordinate-validation).
To avoid **undefined** behavior, application shader should guarantee that the
reference block is fully within the bounds of the reference image.

Each pair of texel coordinates    in the set selects a single
texel from the target image   .
Each pair of texel coordinates    in the set selects a single
texel from the reference image   .

Each selected texel is read with the operations specified in
[Texel Reads](#textures-texel-reads), without performing
[Component Substitution](images.html#images-component-substitution).

The difference between target and reference texel values is summed to
compute a difference metric.
The `opTextureBlockMatchSAD` computes the sum of absolute differences.

  

  

The `opImageBlockMatchSSD` computes the sum of the squared differences.

  

  

When [VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` is
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT), the above summation is
used.
However, if the reduction mode is [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT), the process operates on the above
values, computing a component-wise minimum or maximum of
  , respectively.
For   , the minimum or maximum difference is computed
and for   , the square of the minimum or maximum is
computed.

Finally, the operations described in [Component Substitution](images.html#images-component-substitution) and
[Component swizzle](#textures-component-swizzle) are performed and the final
result is returned to the shader.
The component swizzle is specified by the *target image* descriptor; any
swizzle specified by the *reference image* descriptor is ignored.

Window block matching SPIR-V instructions `opImageBlockMatchWindowSAD`
and `opImageBlockMatchWindowSSD` specify two sets of 2D integer texel
coordinates: target coordinates    and reference coordinates
  .
The [block matching operation](#textures-blockmatch-filteroperation) is
performed repeatedly, for multiple sets of target integer coordinates within
the specified window.
These instructions effectively search a region or “window” within the
target texture and identify the window coordinates where the minimum or
maximum error metric is found.
These instructions only support single component image formats.

The target coordinates are combinations of coordinates from
   to   
where    and    are specified by
[VkSamplerBlockMatchWindowCreateInfoQCOM](samplers.html#VkSamplerBlockMatchWindowCreateInfoQCOM)::`windowExtent`.
At each target coordinate, a [block matching operation](#textures-blockmatch-filteroperation) is performed, resulting in a difference metric.
The reference coordinate    is fixed.
The block matching operation is repeated \(windowWidth \times
windowHeight\) times.

The resulting minimum or maximum error is returned in the R component of the
output.
The integer window coordinates    are returned in the G and B
components of the output.
The A component is 0.
The minimum or maximum behavior is selected by
[VkSamplerBlockMatchWindowCreateInfoQCOM](samplers.html#VkSamplerBlockMatchWindowCreateInfoQCOM)::`windowCompareMode`.

The following pseudocode describes the operation
`opImageBlockMatchWindowSAD`.
The pseudocode for `opImageBlockMatchWindowSSD` follows an identical
pattern.

vec4 opImageBlockMatchGatherSAD( sampler2D target,
                                 uvec2 targetCoord,
                                 sampler2D reference,
                                 uvec2 refCoord,
                                 uvec2 blocksize) {
    // Two parameters are sourced from the VkSampler associated with
    // `target`:
    //    compareMode  (which can be either `MIN` or `MAX`)
    //    uvec2 window (which defines the search window)

    minSAD = INF;
    maxSAD = -INF;
    uvec2 minCoord;
    uvec2 maxCoord;

    for (uint x=0, x maxSAD) {
                maxSAD = SAD;
                maxCoord = uvec2(x,y);
            }
        }
    }
    if (compareMode==MIN) {
        return vec4(minSAD, minCoord.x, minCoord.y, 0.0);
    } else {
        return vec4(maxSAD, maxCoord.x, maxCoord.y, 0.0);
    }
}

Block matching Gather SPIR-V instructions `opImageBlockMatchGatherSAD`
and `opImageBlockMatchGatherSSD` specify two sets of 2D integer texel
coordinates: target coordinates    and reference coordinates
  .

These instructions perform the [block matching operation](#textures-blockmatch-filteroperation) 4 times, using integer target coordinates
  ,   ,   , and
  .
The R component from each of those 4 operations is gathered and returned in
the R, G, B, and A components of the output respectively.
For each block match operation, the reference coordinate is
  .
For each block match operation, only the R component of the target and
reference images are compared.
The following pseudocode describes the operation opImageBlockMatchGatherSAD.
The pseudocode for opImageBlockMatchGatherSSD follows an identical pattern.

vec4 opImageBlockMatchGatherSAD(sampler2D target,
                                uvec2 targetCoord,
                                sampler2D reference,
                                uvec2 refCoord,
                                uvec2 blocksize) {
    vec4 out;
    for (uint x=0, x

The SPIR-V instruction `OpImageBoxFilterQCOM` specifies texture box
filtering operation where a weighted average of a region of texels is
computed, with the weights proportional to the coverage of each of the
texels.

In addition to the inputs that would be accepted by an equivalent
`OpImageSample*` instruction, `OpImageBoxFilterQCOM` accepts one
additional input, `boxSize` which specifies the width and height in
texels of the region to be averaged.

The figure below shows an example of using `OpImageBoxFilterQCOM` to
sample from a 8 × 4 texel two-dimensional image, with
unnormalized texture coordinates (4.125, 2.625) and `boxSize` of
(2.75, 2.25).
The filter will read 12 texel values and compute a weights based portion of
each texel covered by the box.

![vulkantexture boxFilter](../_images/vulkantexture_boxFilter.svg)

Figure 12. Box Filter Sampling Example

If `boxSize` has height and width both equal to 1.0, then this
instruction will behave as traditional bilinear filtering.
The `boxSize` parameter **must** be greater than or equal to 1.0 and **must**
not be greater than
[VkPhysicalDeviceImageProcessingPropertiesQCOM](devsandqueues.html#VkPhysicalDeviceImageProcessingPropertiesQCOM).`maxBoxFilterBlockSize`.

The input `sampler` **must** be created with `addressModeU` and
`addressModeV`, equal to [VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode), or
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_BORDER](samplers.html#VkSamplerAddressMode) with
[VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK](samplers.html#VkBorderColor).

The 2D unnormalized texel coordinates    are transformed by
   to specify integer texel coordinates \((i_{0},
j_{0})\) of the bottom left texel for the filter.

  

  

where    and    are specified by the
code:(x,y) components of the `boxSize` operand.

The filter dimensions    are
computed from the fractional portion of the    coordinates
and the   .

  

  

where the number of fraction bits retained by    is
specified by `VkPhysicalDeviceLimits`::`subTexelPrecisionBits`.

A set of neighboring integer texel coordinates are generated.
The neighboring coordinates are combinations of    to
   and    to
  , with    being the
top-left coordinate of this set.
The set is of size   .

  

  

Each of the generated integer coordinates    is
transformed by [texture wrapping operation](#textures-wrapping-operation),
followed by [integer texel coordinate validation](#textures-integer-coordinate-validation), If any coordinate fails coordinate validation, it
is a Border Texel and [border replacement](#textures-border-replacement) is
performed.

Horizontal weights    to
   and vertical weights
   to    are
computed.
Texels that are fully covered by the box will have a horizontal and vertical
weight of 1.
Texels partially covered by the box will have will have a reduced weights
proportional to the coverage.

  

  

  

  

The values of multiple texels, together with their horizontal and vertical
weights, are combined to produce a box filtered value.

  

  

When [VkSamplerReductionModeCreateInfo](samplers.html#VkSamplerReductionModeCreateInfo)::`reductionMode` is
[VK_SAMPLER_REDUCTION_MODE_WEIGHTED_AVERAGE](samplers.html#VkSamplerReductionModeEXT), the above summation is
used.
However, if the reduction mode is [VK_SAMPLER_REDUCTION_MODE_MIN](samplers.html#VkSamplerReductionModeEXT) or
[VK_SAMPLER_REDUCTION_MODE_MAX](samplers.html#VkSamplerReductionModeEXT), the process operates on the above
values, computing a component-wise minimum or maximum of the texels.

Each step described in this chapter is performed by a subset of the image
instructions:

* 
Texel Input Validation Operations, Format Conversion, Texel Replacement,
Conversion to RGBA, and Component Swizzle: Performed by all sampling
instructions.

* 
Depth Comparison: Performed by `OpImage*Dref` instructions.

* 
Projection: Performed by all `OpImage*Proj` instructions.

* 
Derivative Image Operations, Cube Map Operations, Scale Factor
Operation, LOD Operation and Image Level(s) Selection, and Texel
Anisotropic Filtering: Performed by all `OpImageSample*` and
`OpImageSparseSample*` instructions.

* 
(s,t,r,q,a) to (u,v,w,a) Transformation, Wrapping, and (u,v,w,a) to
(i,j,k,l,n) Transformation And Array Layer Selection: Performed by all
`OpImageSample`, `OpImageSparseSample`, and `OpImage*Gather`
instructions.

* 
Texel Gathering: Performed by `OpImage*Gather` instructions.

* 
Texel Footprint Evaluation: Performed by `OpImageSampleFootprint`
instructions.

* 
Texel Filtering: Performed by all `OpImageSample*` and
`OpImageSparseSample*` instructions.

* 
Sparse Residency: Performed by all `OpImageSparse*` instructions.

* 
(s,t,r,q,a) to (u,v,w,a) Transformation, Wrapping, and Weight Image
Sampling: Performed by `OpImageWeightedSample*` instructions.

* 
(s,t,r,q,a) to (u,v,w,a) Transformation, Wrapping, and Block Matching:
Performed by `opImageBlockMatch*` instructions.

* 
(s,t,r,q,a) to (u,v,w,a) Transformation, Wrapping, and Box Filter
Sampling: Performed by `OpImageBoxFilter*` instructions.

`OpImageQueryLod` returns the LOD parameters that would be used in a
sampling instruction with the given image and coordinates.
If the descriptor that would be accessed is a null descriptor then
(0,0) is returned.
Otherwise, the
steps described in this chapter are performed as if for
`OpImageSampleImplicitLod`, up to [Scale Factor Operation, LOD Operation and Image Level(s) Selection](#textures-lod-and-scale-factor).
The return value is the vector (λ', dl - levelbase).
These values **may** be subject to implementation-specific maxima and minima
for very large, out-of-range values.

If the image is a [weight image](#textures-weightimage), the value returned
by `OpImageQueryLod` is **undefined**.
