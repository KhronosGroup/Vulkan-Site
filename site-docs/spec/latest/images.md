# Images

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/images.html

## Table of Contents

- [Image Coordinate Validation](#images-coordinate-validation)
- [Image_Coordinate_Validation](#images-coordinate-validation)
- [Image Reads](#images-reads)
- [Texel Decode](#images-texel-decode)
- [Component Substitution](#images-component-substitution)
- [Numeric Encoding](#images-component-encoding)
- [Image Writes](#images-writes)
- [Texel Encode](#images-texel-encode)
- [SPIR-V Image Access](#images-spirv)
- [SPIR-V_Image_Access](#images-spirv)
- [SPIR-V Image Read Instructions](#images-spirv-reads)
- [SPIR-V_Image_Read_Instructions](#images-spirv-reads)
- [SPIR-V Image Write Instructions](#images-spirv-writes)
- [SPIR-V_Image_Write_Instructions](#images-spirv-writes)
- [SPIR-V Image Atomic Instructions](#images-spirv-atomics)
- [SPIR-V_Image_Atomic_Instructions](#images-spirv-atomics)
- [SPIR-V Image Query Instructions](#images-spirv-queries)
- [SPIR-V_Image_Query_Instructions](#images-spirv-queries)
- [SPIR-V Image Sampling Instructions](#images-spirv-sampling)
- [SPIR-V_Image_Sampling_Instructions](#images-spirv-sampling)

## Content

Images are specialized resources that have multi-dimensional access rather
than the typical linear access to memory.
These resources allow implementations to optimize the memory layout for
common access patterns, by mapping multi-dimensional coordinates to an
implementation-dependent offset in the underlying memory.

Additionally, images are homogeneous, with every discrete coordinate
associated with data that is in the same format as the data associated with
any other coordinate.
Each set of data associated with one of these coordinates is referred to in
this specification as a *texel*.
A texel can consist of up to 4 separate components, labeled as
(R,G,B,A) in this chapter.

|  | This terminology is historical; texel is a combination of the words
| --- | --- |
“**tex**ture” and “**el**ement”, and (R,G,B,A) are
abbreviations for **R**ed, **G**reen, **B**lue, and **A**lpha.
Early interactive computer graphics only supported operations that allowed
image data to be used to add color “texture” to rendered objects, which is
just a small subset of what the image operations on images described here
enable.
These terms are deeply embedded in the industry, and so are still used here
by convention, despite images being used in far more varied ways than they
were in the past. |

Some image formats identify components as D for **d**epth, S for
**s**tencil, or X for padding elements.
Image format components identified as D are treated as R, and
S components are treated as G for the purpose of image accesses.
X components are ignored when reading, and **may** be modified in
implementation-dependent ways when writing to that texel.

The coordinates used to identify a texel are six-dimensional, made up of the
following integer indices:

* 
x - The first spatial index

* 
y - The second spatial index

* 
z - The third spatial index

* 
layer - The array index for arrayed images

* 
sample - The sample index

* 
level - The detail level

Each image is constructed with a number of texels in each dimension, with
the integer size in each dimension for that image identified as:

* 
width - The number of x indices

* 
height - The number of y indices

* 
depth - The number of z indices

* 
layers - The number of layers

* 
samples - The number of samples

* 
levels - The number of detail levels

Of these sizes, the number of levels is somewhat unique - each further
level reduces the number of indices in each of the x, y, and
z dimensions by half, according to these formulae:

* 
widthlevel = max(1, ⌊width / 2level⌋)

* 
heightlevel = max(1, ⌊height / 2level⌋)

* 
depthlevel = max(1, ⌊depth / 2level⌋)

An image will have no more than one level where all of the above dimensions
are set to 1.
See [Image Mip Level Sizing](resources.html#resources-image-mip-level-sizing) for more
details.

The Vulkan specification allows the creation of resources with fewer
dimensions than this (e.g. texel buffers); these can be considered
equivalent to an image with all dimensions specified, with the missing
dimensions having a size of 1, and an implicit coordinate value of 0.

These parameters are set for an image during [image creation](resources.html#resources-images), and are adjusted when accessing an image through an
[image view](resources.html#resources-image-views).

When accessing an image, a set of (x,y,z,layer,sample,level)
coordinates are used to indicate which texel is accessed.
These coordinates are first checked to see if they refer to texels within
the image dimensions, according to the following equations:

* 
x level

* 
y level

* 
z level

* 
layer 

* 
sample 

* 
level 

If any of these equations evaluates to false, the coordinate is considered
[out of bounds](shaders.html#shaders-execution-memory-access-bounds), otherwise they
are *in bounds*.

Image reads use a set of (x,y,z,layer,sample,level) coordinates,
validated as per [Image Coordinate Validation](#images-coordinate-validation), and return a converted value for the texel at that coordinate.
If the coordinates are out of bounds, behavior of the read is as described
in [Shader Out-of-Bounds Memory Access](shaders.html#shaders-execution-memory-access-bounds).
If the coordinates are in bounds, but the texel is not backed by memory,
behavior of the read is as described in [Accessing Unbound Regions](sparsemem.html#sparsememory-accessing-unbound).
Otherwise, the read proceeds as follows.

The formatted value of the texel at the (x,y,z,layer,sample,level)
coordinate is read and decoded according to the procedures outlined in the
[Khronos Data Format Specification](introduction.html#data-format).

For sRGB formats, the (R,G,B,A) components are first converted as if
they are `UNORM` formats, and then sRGB to linear conversion is
performed on the converted (R,G,B) components, as described in the
“sRGB EOTF” section of the [Khronos Data Format Specification](introduction.html#data-format).

If after conversion, less than four of the (R,G,B,A) components are
present, missing components are substituted by the components of
(0,0,0,1) for missing (R,G,B,A) components, respectively.

The values are encoded according to the bit width and
[numeric format](formats.html#formats-numericformat) of each component:

* 
Components with a fixed-point numeric format or with a floating-point
numeric format and a bit width less than or equal to 32 are encoded into
the [IEEE-754](introduction.html#ieee-754) binary32 format.

* 
Components with a floating-point numeric format and a bit width greater
than 32 are encoded into the [IEEE-754](introduction.html#ieee-754) binary64 format.

* 
Components with an integer numeric format and a bit width less than or
equal to 32 are directly encoded as 32-bit integer values with the same
signedness.

* 
Components with an integer numeric format and a bit width greater than
32 are directly encoded as 64-bit integer values with the same
signedness.

These values are then returned as the result of the image read.

Image writes also use a set of (x,y,z,layer,sample,level) coordinates,
validated as per [Image Coordinate Validation](#images-coordinate-validation), and with a value to be written.
If the coordinates are out of bounds, behavior of the write is as described
in [Shader Out-of-Bounds Memory Access](shaders.html#shaders-execution-memory-access-bounds).
If the coordinates are in bounds, but the texel is not backed by memory, the
write is silently discarded.
Otherwise, an image write is performed as follows:

If the image format is sRGB, a linear to sRGB conversion is applied to the
(R,G,B) components of value as described in the “sRGB EOTF”
section of the [Khronos Data Format Specification](introduction.html#data-format).

The converted (R,G,B) and original A values are then encoded to
the image format according to the procedures outlined in the [Khronos Data Format Specification](introduction.html#data-format).
Components not present in the image format are discarded.

The final value is then written to the texel at
(x,y,z,layer,sample,level).

Images are represented in SPIR-V by variables with the
[OpTypeImage](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#OpTypeImage) type, and operated on by
[image instructions](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Image).

Images are mapped to a shader using image views, which define access to a
subset of the base image resource, specified by
[VkImageSubresourceRange](resources.html#VkImageSubresourceRange).

Texels **can** be [read from an image](#images-reads) using
[OpImageRead](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#OpImageRead) or
[OpImageSparseRead](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#OpImageSparseRead).
The elements of the *Coordinate* operand and the optional `Sample`
[image operand](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Image_Operands) map to
[image coordinates](#images-coordinate-validation), modified by the
parameters of the image view used, as:

* 
x = `u`

* 
y = `v`

* 
z = `w`

* 
layer = `array_layer`

* 
sample = `Sample`

* 
level = 0

Any index missing in the instruction is implicitly set to 0.

After the coordinates are validated, some indices are offset before
performing the access as follows:

* 
layer += [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseArrayLayer`

* 
level += [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel`

* 
z += [VkImageViewSlicedCreateInfoEXT](resources.html#VkImageViewSlicedCreateInfoEXT)::sliceOffset

Texels **can** be [written to an image](#images-writes) using
[OpImageWrite](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#OpImageWrite).
The elements of the *Coordinate* operand and the optional `Sample`
[image operand](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Image_Operands) map to
[image coordinates](#images-coordinate-validation), modified by the
parameters of the image view used, in the same ways as for
[image reads](#images-spirv-reads).

[SPIR-V atomic instructions](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Atomic) operate on pointers rather
than texels, but **can** be used with texels via
[OpImageTexelPointer](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#OpImageTexelPointer).
[OpImageTexelPointer](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#OpImageTexelPointer) **can** be used to obtain
a valid pointer to a specific texel in an image.
The elements of the *Coordinate* operand and the optional `Sample`
[image operand](https://registry.khronos.org/spir-v/specs/unified1/SPIRV.html#Image_Operands) map to
[image coordinates](#images-coordinate-validation), modified by the
parameters of the image view used, in the same ways as for
[image reads](#images-spirv-reads).
The resulting pointer **can** be used to access the identified texel, with
atomic operations potentially [reading](#images-reads) and [writing](#images-writes) to that texel.

Query operations return properties of an image, allowing the accessible size
of each dimension of an image to be queried from within a shader.
Query operations do not access any texels in the image.

* 
`OpImageQuerySizeLod` returns the values of widthlevel,
heightlevel, depthlevel, and layers for the image
at a specified level, where level is equal to the sum of the
`Level` `of` `Detail` operand and
[VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::baseMipLevel.
If the image is not a sampled image and
[VkImageViewSlicedCreateInfoEXT](resources.html#VkImageViewSlicedCreateInfoEXT)::`sliceCount` is not set to
[VK_REMAINING_3D_SLICES_EXT](resources.html#VK_REMAINING_3D_SLICES_EXT), `sliceCount` will be returned in
place of depthlevel.
If the image is not a sampled image and
[VkImageViewSlicedCreateInfoEXT](resources.html#VkImageViewSlicedCreateInfoEXT)::`sliceCount` is set to
[VK_REMAINING_3D_SLICES_EXT](resources.html#VK_REMAINING_3D_SLICES_EXT), the value returned will be equal to
depthlevel :minus:
[VkImageViewSlicedCreateInfoEXT](resources.html#VkImageViewSlicedCreateInfoEXT)::`sliceOffset`.
If `Level` `of` `Detail` is greater than
[VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`levelCount`, the result is
**undefined**.

* 
`OpImageQuerySize` is equivalent to `OpImageQuerySizeLod` with
level set to [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::baseMipLevel.

* 
`OpImageQueryLevels` returns the value of
[VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::levelCount specified for the image view
used.

* 
`OpImageQuerySamples` returns the value of samples for the
image.

|  | `OpImageQueryLod` is performed as a sampling operation, so is not
| --- | --- |
included here. |

If the descriptor bound to the image is a null descriptor, all values
returned by the above queries are replaced with 0.

If the image is a [weight image](textures.html#textures-weightimage), all values returned
by the above queries are **undefined**.

Sampling operations **can** also be performed on images, typically in
conjunction with a [sampler](samplers.html#samplers), as defined in the
[Sampling](textures.html#textures) chapter.
