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
validated as per [Image Coordinate Validation](#images-coordinate-validation), and a value to be written.
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
