# Sparse Resources

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/sparsemem.html

## Table of Contents

- [Sparse Resource Features](#sparsememory-sparseresourcefeatures)
- [Sparse_Resource_Features](#sparsememory-sparseresourcefeatures)
- [Sparse Buffers and Fully-Resident Images](#sparsememory-fully-resident)
- [Sparse_Buffers_and_Fully-Resident_Images](#sparsememory-fully-resident)
- [Sparse Buffer and Fully-Resident Image Block Size](#_sparse_buffer_and_fully_resident_image_block_size)
- [Sparse_Buffer_and_Fully-Resident_Image_Block_Size](#_sparse_buffer_and_fully_resident_image_block_size)
- [Sparse Partially-Resident Buffers](#sparsememory-partially-resident-buffers)
- [Sparse_Partially-Resident_Buffers](#sparsememory-partially-resident-buffers)
- [Sparse Partially-Resident Images](#sparsememory-partially-resident-images)
- [Sparse_Partially-Resident_Images](#sparsememory-partially-resident-images)
- [Accessing Unbound Regions](#sparsememory-accessing-unbound)
- [Accessing_Unbound_Regions](#sparsememory-accessing-unbound)
- [Mip Tail Regions](#sparsememory-miptail)
- [Mip_Tail_Regions](#sparsememory-miptail)
- [Standard Sparse Image Block Shapes](#sparsememory-standard-shapes)
- [Standard_Sparse_Image_Block_Shapes](#sparsememory-standard-shapes)
- [Custom Sparse Image Block Shapes](#sparsememory-custom-shapes)
- [Custom_Sparse_Image_Block_Shapes](#sparsememory-custom-shapes)
- [Multiple Aspects](#sparsememory-multiaspect)
- [Metadata](#_metadata)
- [Sparse Memory Aliasing](#sparsememory-sparse-memory-aliasing)
- [Sparse_Memory_Aliasing](#sparsememory-sparse-memory-aliasing)
- [Sparse Resource API](#sparsememory-resourceapi)
- [Sparse_Resource_API](#sparsememory-resourceapi)
- [Physical Device Features](#sparsememory-physicalfeatures)
- [Physical_Device_Features](#sparsememory-physicalfeatures)
- [Sparse Physical Device Features](#_sparse_physical_device_features)
- [Sparse_Physical_Device_Features](#_sparse_physical_device_features)
- [Physical Device Sparse Properties](#sparsememory-physicalprops)
- [Physical_Device_Sparse_Properties](#sparsememory-physicalprops)
- [Sparse Image Format Properties](#sparsememory-format-props)
- [Sparse_Image_Format_Properties](#sparsememory-format-props)
- [Sparse Image Format Properties API](#_sparse_image_format_properties_api)
- [Sparse_Image_Format_Properties_API](#_sparse_image_format_properties_api)
- [Sparse Resource Creation](#sparsememory-resource-creation)
- [Sparse_Resource_Creation](#sparsememory-resource-creation)
- [Sparse Resource Memory Requirements](#sparsememory-memory-requirements)
- [Sparse_Resource_Memory_Requirements](#sparsememory-memory-requirements)
- [Buffer and Fully-Resident Images](#sparsememory-memory-buffer-fully-resident)
- [Buffer_and_Fully-Resident_Images](#sparsememory-memory-buffer-fully-resident)
- [Partially Resident Images](#sparsememory-memory-partially-resident)
- [Partially_Resident_Images](#sparsememory-memory-partially-resident)
- [Sparse Image Memory Requirements](#_sparse_image_memory_requirements)
- [Sparse_Image_Memory_Requirements](#_sparse_image_memory_requirements)
- [Binding Resource Memory](#sparsememory-resource-binding)
- [Binding_Resource_Memory](#sparsememory-resource-binding)
- [Sparse Memory Binding Functions](#sparsemem-memory-binding)
- [Sparse_Memory_Binding_Functions](#sparsemem-memory-binding)

## Content

As documented in [Resource Memory Association](resources.html#resources-association),
`VkBuffer` and `VkImage` resources in Vulkan **must** be bound
completely and contiguously to a single `VkDeviceMemory` object.
This binding **must** be done before the resource is used, and the binding is
immutable for the lifetime of the resource.

*Sparse resources* relax these restrictions and provide these additional
features:

* 
Sparse resources **can** be bound non-contiguously to one or more
`VkDeviceMemory` allocations.

* 
Sparse resources **can** be re-bound to different memory allocations over
the lifetime of the resource.

* 
Sparse resources **can** have descriptors generated and used orthogonally
with memory binding commands.

Sparse resources have several features that **must** be enabled explicitly at
resource creation time.
The features are enabled by including bits in the `flags` parameter of
[VkImageCreateInfo](resources.html#VkImageCreateInfo) or [VkBufferCreateInfo](resources.html#VkBufferCreateInfo).
Each feature also has one or more corresponding feature enables specified in
[VkPhysicalDeviceFeatures](features.html#VkPhysicalDeviceFeatures).

* 
The [`sparseBinding`](features.html#features-sparseBinding) feature is the base,
and provides the following capabilities:

Resources **can** be bound at some defined (sparse block) granularity.

* 
The entire resource **must** be bound to memory before use regardless of
regions actually accessed.

* 
No specific mapping of image region to memory offset is defined, i.e.
the location that each texel corresponds to in memory is
implementation-dependent.

* 
Sparse buffers have a well-defined mapping of buffer range to memory
range, where an offset into a range of the buffer that is bound to a
single contiguous range of memory corresponds to an identical offset
within that range of memory.

* 
Requested via the [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits) and
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](resources.html#VkBufferCreateFlagBits) bits.

* 
A sparse image created using [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits)
(but not [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits)) supports all
formats that non-sparse usage supports, and supports both
[VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling) and [VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling) tiling.

*Sparse Residency* builds on (and requires) the
[`sparseBinding`](features.html#features-sparseBinding) feature.
It includes the following capabilities:

* 
Resources do not have to be completely bound to memory before use on
the device.

* 
Images have a prescribed sparse image block layout, allowing specific
rectangular regions of the image to be bound to specific offsets in
memory allocations.

* 
Consistency of access to unbound regions of the resource is defined by
the absence or presence of
`VkPhysicalDeviceSparseProperties`::`residencyNonResidentStrict`.
If this property is present, accesses to unbound regions of the
resource are well defined and behave as if the data bound is populated
with all zeros; writes are discarded.
When this property is absent, accesses are considered safe, but reads
will return **undefined** values.

* 
Requested via the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) and
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits) bits.

* 
 Sparse residency support is advertised on
a finer grain via the following features:

The [`sparseResidencyBuffer`](features.html#features-sparseResidencyBuffer)
feature provides support for creating `VkBuffer` objects with the
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits).

* 
The [`sparseResidencyImage2D`](features.html#features-sparseResidencyImage2D)
feature provides support for creating 2D single-sampled `VkImage`
objects with [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
The [`sparseResidencyImage3D`](features.html#features-sparseResidencyImage3D)
feature provides support for creating 3D `VkImage` objects with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
The [      `sparseResidency2Samples`](features.html#features-sparseResidency2Samples) feature provides support for creating
2D `VkImage` objects with 2 samples and
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
The [      `sparseResidency4Samples`](features.html#features-sparseResidency4Samples) feature provides support for creating
2D `VkImage` objects with 4 samples and
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
The [      `sparseResidency8Samples`](features.html#features-sparseResidency8Samples) feature provides support for creating
2D `VkImage` objects with 8 samples and
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
The [      `sparseResidency16Samples`](features.html#features-sparseResidency16Samples) feature provides support for creating
2D `VkImage` objects with 16 samples and
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

Implementations supporting `sparseResidencyImage2D` are only **required**
to support sparse 2D, single-sampled images.
Support for sparse 3D and MSAA images is **optional** and **can** be enabled via
`sparseResidencyImage3D`, `sparseResidency2Samples`,
`sparseResidency4Samples`, `sparseResidency8Samples`, and
`sparseResidency16Samples`.

A sparse image created using [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits)
supports all non-compressed color formats with power-of-two element
size that non-sparse usage supports.
Additional formats **may** also be supported and **can** be queried via
[vkGetPhysicalDeviceSparseImageFormatProperties](#vkGetPhysicalDeviceSparseImageFormatProperties).
[VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling) tiling is not supported.

The [`sparseResidencyAliased`](features.html#features-sparseResidencyAliased)
feature provides the following capability that **can** be enabled per
resource:

Allows physical memory ranges to be shared between multiple locations in the
same sparse resource or between multiple sparse resources, with each binding
of a memory location observing a consistent interpretation of the memory
contents.

See [Sparse Memory Aliasing](#sparsememory-sparse-memory-aliasing) for more
information.

Both `VkBuffer` and `VkImage` objects created with the
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits) or
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](resources.html#VkBufferCreateFlagBits) bits **can** be thought of as a
linear region of address space.
In the `VkImage` case if [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) is
not used, this linear region is entirely opaque, meaning that there is no
application-visible mapping between texel location and memory offset.

Unless [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) or
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits) are also used, the entire
resource **must** be bound to one or more `VkDeviceMemory` objects before
use.

The sparse block size in bytes for sparse buffers and fully-resident images
is reported as `VkMemoryRequirements`::`alignment`.
`alignment` represents both the memory alignment requirement and the
binding granularity (in bytes) for sparse resources.

`VkBuffer` objects created with the
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits) bit allow the buffer to be made
only partially resident.
Partially resident `VkBuffer` objects are allocated and bound
identically to `VkBuffer` objects using only the
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](resources.html#VkBufferCreateFlagBits) feature.
The only difference is the ability for some regions of the buffer to be
unbound during device use.
After creating a `VkBuffer` with
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits), the entire buffer region is
considered unbound.

`VkImage` objects created with the
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) bit allow specific rectangular
regions of the image called sparse image blocks to be bound to specific
ranges of memory.
This allows the application to manage residency at either image subresource
or sparse image block granularity.
Each image subresource (outside of the [mip tail](#sparsememory-miptail))
starts on a sparse block boundary and has dimensions that are integer
multiples of the corresponding dimensions of the sparse image block.
After creating a `VkImage` with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits), all image subresources are
considered unbound.

|  | Applications **can** use these types of images to control LOD based on total
| --- | --- |
memory consumption.
If memory pressure becomes an issue the application **can** unbind and disable
specific mipmap levels of images without having to recreate resources or
modify texel data of unaffected levels.

The application **can** also use this functionality to access subregions of the
image in a “megatexture” fashion.
The application **can** create a large image and only populate the region of
the image that is currently being used in the scene. |

The following member of `VkPhysicalDeviceSparseProperties` affects how
data in unbound regions of sparse resources are handled by the
implementation:

* 
`residencyNonResidentStrict`

If this property is not present, reads of unbound regions of the image will
return **undefined** values.
Both reads and writes are still considered *safe* and will not affect other
resources or populated regions of the image.

If this property is present, all reads of unbound regions of the image will
behave as if the region was bound to memory populated with all zeros; writes
will be discarded.

[Image operations](textures.html#textures) performed on unbound memory **may** still alter
some component values in the natural way for those accesses, e.g.
substituting a value of one for alpha in formats that do not have an alpha
component.

Example: Reading the alpha component of an unbacked [VK_FORMAT_R8_UNORM](formats.html#VkFormat)
image will return a value of 1.0f.

If a value was previously written to the same unbound sparse memory location
in the same shader invocation, that value **may** be returned instead; using
the `VolatileTexel` image operand, the `Volatile` memory semantic, or
the `Volatile` decoration to load the value will prevent prior stored
values from being returned.

|  | Getting the value of the previous store is possible as implementations are
| --- | --- |
free to optimize multiple accesses in the general case.
There are other ways this **can** be prevented, but using volatile loads is by
far the simplest. |

See [Physical Device Enumeration](devsandqueues.html#devsandqueues-physical-device-enumeration) for instructions for retrieving physical device properties.

Sparse images created using [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits)
(without also using [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits)) have no
specific mapping of image region or image subresource to memory offset
defined, so the entire image **can** be thought of as a linear opaque address
region.
However, images created with [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) do
have a prescribed sparse image block layout, and hence each image
subresource **must** start on a sparse block boundary.
Within each array layer, the set of mip levels that have a smaller size than
the sparse block size in bytes are grouped together into a *mip tail
region*.

If the [VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT](#VkSparseImageFormatFlagBits) flag is present in
the `flags` member of `VkSparseImageFormatProperties`, for the
image’s `format`, then any mip level which has dimensions that are not
integer multiples of the corresponding dimensions of the sparse image block,
and all subsequent mip levels, are also included in the mip tail region.

The following member of `VkPhysicalDeviceSparseProperties` **may** affect
how the implementation places mip levels in the mip tail region:

* 
`residencyAlignedMipSize`

Each mip tail region is bound to memory as an opaque region (i.e. **must** be
bound using a [VkSparseImageOpaqueMemoryBindInfo](#VkSparseImageOpaqueMemoryBindInfo) structure) and **may** be
of a size greater than or equal to the sparse block size in bytes.
This size is guaranteed to be an integer multiple of the sparse block size
in bytes.

An implementation **may** choose to allow each array-layer’s mip tail region to
be bound to memory independently or require that all array-layer’s mip tail
regions be treated as one.
This is dictated by [VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits) in
`VkSparseImageMemoryRequirements`::`flags`.

The following diagrams depict how
[VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT](#VkSparseImageFormatFlagBits) and
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits) alter memory usage and
requirements.

![sparseimage](../_images/sparseimage.svg)

Figure 1. Sparse Image

In the absence of [VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT](#VkSparseImageFormatFlagBits) and
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits), each array layer contains a
mip tail region containing texel data for all mip levels smaller than the
sparse image block in any dimension.

Mip levels that are as large or larger than a sparse image block in all
dimensions **can** be bound individually.
Right-edges and bottom-edges of each level are allowed to have partially
used sparse blocks.
Any bound partially-used-sparse-blocks **must** still have their full sparse
block size in bytes allocated in memory.

![sparseimage singlemiptail](../_images/sparseimage_singlemiptail.svg)

Figure 2. Sparse Image with Single Mip Tail

When [VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits) is present all array
layers will share a single mip tail region.

![sparseimage alignedmipsize](../_images/sparseimage_alignedmipsize.svg)

Figure 3. Sparse Image with Aligned Mip Size

|  | The mip tail regions are presented here in 2D arrays simply for figure size
| --- | --- |
reasons.
Each mip tail is logically a single array of sparse blocks with an
implementation-dependent mapping of texels or compressed texel blocks to
sparse blocks. |

When [VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT](#VkSparseImageFormatFlagBits) is present the first
mip level that would contain partially used sparse blocks begins the mip
tail region.
This level and all subsequent levels are placed in the mip tail.
Only the first N mip levels whose dimensions are an exact multiple of
the sparse image block dimensions **can** be bound and unbound on a sparse
block basis.

![sparseimage alignedmipsize singlemiptail](../_images/sparseimage_alignedmipsize_singlemiptail.svg)

Figure 4. Sparse Image with Aligned Mip Size and Single Mip Tail

|  | The mip tail region is presented here in a 2D array simply for figure size
| --- | --- |
reasons.
It is logically a single array of sparse blocks with an
implementation-dependent mapping of texels or compressed texel blocks to
sparse blocks. |

When both [VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT](#VkSparseImageFormatFlagBits) and
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits) are present the constraints
from each of these flags are in effect.

Standard sparse image block shapes define a standard set of dimensions for
sparse image blocks that depend on the format of the image.
Layout of texels or compressed texel blocks within a sparse image block is
implementation-dependent.
All currently defined standard sparse image block shapes are 64 KB in size.

For block-compressed formats (e.g. [VK_FORMAT_BC5_UNORM_BLOCK](formats.html#VkFormat)), the
texel size is the size of the compressed texel block (e.g. 128-bit for
`BC5`) thus the dimensions of the standard sparse image block shapes
apply in terms of compressed texel blocks.

|  | For block-compressed formats, the dimensions of a sparse image block in
| --- | --- |
terms of texels **can** be calculated by multiplying the sparse image block
dimensions by the compressed texel block dimensions. |

| TEXEL SIZE (bits) | Block Shape (2D) | Block Shape (3D) |
| --- | --- | --- |
| **8-Bit** | 256 × 256 × 1 | 64 × 32 × 32 |
| **16-Bit** | 256 × 128 × 1 | 32 × 32 × 32 |
| **32-Bit** | 128 × 128 × 1 | 32 × 32 × 16 |
| **64-Bit** | 128 × 64 × 1 | 32 × 16 × 16 |
| **128-Bit** | 64 × 64 × 1 | 16 × 16 × 16 |

| TEXEL SIZE (bits) | Block Shape (2X) | Block Shape (4X) | Block Shape (8X) | Block Shape (16X) |
| --- | --- | --- | --- | --- |
| **8-Bit** | 128 × 256 × 1 | 128 × 128 × 1 | 64 × 128 × 1 | 64 × 64 × 1 |
| **16-Bit** | 128 × 128 × 1 | 128 × 64 × 1 | 64 × 64 × 1 | 64 × 32 × 1 |
| **32-Bit** | 64 × 128 × 1 | 64 × 64 × 1 | 32 × 64 × 1 | 32 × 32 × 1 |
| **64-Bit** | 64 × 64 × 1 | 64 × 32 × 1 | 32 × 32 × 1 | 32 × 16 × 1 |
| **128-Bit** | 32 × 64 × 1 | 32 × 32 × 1 | 16 × 32 × 1 | 16 × 16 × 1 |

Implementations that support the standard sparse image block shape for all
formats listed in the [Standard Sparse Image Block Shapes (Single Sample)](#sparsememory-sparseblockshapessingle) and
[Standard Sparse Image Block Shapes (MSAA)](#sparsememory-sparseblockshapesmsaa) tables **may** advertise the following
`VkPhysicalDeviceSparseProperties`:

* 
`residencyStandard2DBlockShape`

* 
`residencyStandard2DMultisampleBlockShape`

* 
`residencyStandard3DBlockShape`

Reporting each of these features does *not* imply that all possible image
types are supported as sparse.
Instead, this indicates that no supported sparse image of the corresponding
type will use custom sparse image block dimensions for any formats that have
a corresponding standard sparse image block shape.

An implementation that does not support a standard image block shape for a
particular sparse partially-resident image **may** choose to support a custom
sparse image block shape for it instead.
The dimensions of such a custom sparse image block shape are reported in
`VkSparseImageFormatProperties`::`imageGranularity`.
As with standard sparse image block shapes, the size in bytes of the custom
sparse image block shape will be reported in
`VkMemoryRequirements`::`alignment`.

Custom sparse image block dimensions are reported through
`vkGetPhysicalDeviceSparseImageFormatProperties` and
`vkGetImageSparseMemoryRequirements`.

An implementation **must** not support both the standard sparse image block
shape and a custom sparse image block shape for the same image.
The standard sparse image block shape **must** be used if it is supported.

Partially resident images are allowed to report separate sparse properties
for different aspects of the image.
One example is for depth/stencil images where the implementation separates
the depth and stencil data into separate planes.
Another reason for multiple aspects is to allow the application to manage
memory allocation for implementation-private *metadata* associated with the
image.
See the figure below:

![sparseimage multiaspect](../_images/sparseimage_multiaspect.svg)

Figure 5. Multiple Aspect Sparse Image

|  | The mip tail regions are presented here in 2D arrays simply for figure size
| --- | --- |
reasons.
Each mip tail is logically a single array of sparse blocks with an
implementation-dependent mapping of texels or compressed texel blocks to
sparse blocks. |

In the figure above the depth, stencil, and metadata aspects all have unique
sparse properties.
The per-texel stencil data is ¼ the size of the depth data,
hence the stencil sparse blocks include 4 × the number of
texels.
The sparse block size in bytes for all of the aspects is identical and
defined by `VkMemoryRequirements`::`alignment`.

The metadata aspect of an image has the following constraints:

* 
All metadata is reported in the mip tail region of the metadata aspect.

* 
All metadata **must** be bound prior to device use of the sparse image.

By default sparse resources have the same aliasing rules as non-sparse
resources.
See [Memory Aliasing](resources.html#resources-memory-aliasing) for more information.

`VkDevice` objects that have the [`sparseResidencyAliased`](features.html#features-sparseResidencyAliased) feature enabled are able to use the
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](resources.html#VkBufferCreateFlagBits) and
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](resources.html#VkImageCreateFlagBits) flags for resource creation.
These flags allow resources to access physical memory bound into multiple
locations within one or more sparse resources in a *data consistent*
fashion.
This means that reading physical memory from multiple aliased locations will
return the same value.

Care **must** be taken when performing a write operation to aliased physical
memory.
Memory dependencies **must** be used to separate writes to one alias from reads
or writes to another alias.
Writes to aliased memory that are not properly guarded against accesses to
different aliases will have **undefined** results for all accesses to the
aliased memory.

Applications that wish to make use of data consistent sparse memory aliasing
**must** abide by the following guidelines:

* 
All sparse resources that are bound to aliased physical memory **must** be
created with the [VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](resources.html#VkBufferCreateFlagBits) /
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](resources.html#VkImageCreateFlagBits) flag.

* 
All resources that access aliased physical memory **must** interpret the
memory in the same way.
This implies the following:

Buffers and images **cannot** alias the same physical memory in a data
consistent fashion.
The physical memory ranges **must** be used exclusively by buffers or used
exclusively by images for data consistency to be guaranteed.

* 
Memory in sparse image mip tail regions **cannot** access aliased memory
in a data consistent fashion.

* 
Sparse images that alias the same physical memory **must** have compatible
formats and be using the same sparse image block shape in order to
access aliased memory in a data consistent fashion.

Failure to follow any of the above guidelines will require the application
to abide by the normal, non-sparse resource [aliasing rules](resources.html#resources-memory-aliasing).
In this case memory **cannot** be accessed in a data consistent fashion.

|  | Enabling sparse resource memory aliasing **can** be a way to lower physical
| --- | --- |
memory use, but it **may** reduce performance on some implementations.
An application developer **can** test on their target HW and balance the memory
/ performance trade-offs measured. |

The APIs related to sparse resources are grouped into the following
categories:

* 
[Physical Device Features](#sparsememory-physicalfeatures)

* 
[Physical Device Sparse Properties](#sparsememory-physicalprops)

* 
[Sparse Image Format Properties](#sparsememory-format-props)

* 
[Sparse Resource Creation](#sparsememory-resource-creation)

* 
[Sparse Resource Memory Requirements](#sparsememory-memory-requirements)

* 
[Binding Resource Memory](#sparsememory-resource-binding)

Some sparse-resource related features are reported and enabled in
`VkPhysicalDeviceFeatures`.
These features **must** be supported and enabled on the `VkDevice` object
before applications **can** use them.
See [Physical Device Features](features.html#features) for information on how to get and
set enabled device features, and for more detailed explanations of these
features.

* 
`sparseBinding`: Support for creating [VkBuffer](resources.html#VkBuffer) and
`VkImage` objects with the [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](resources.html#VkBufferCreateFlagBits)
and [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits) flags, respectively.

* 
`sparseResidencyBuffer`: Support for creating [VkBuffer](resources.html#VkBuffer) objects
with the [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits) flag.

* 
`sparseResidencyImage2D`: Support for creating 2D single-sampled
`VkImage` objects with [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
`sparseResidencyImage3D`: Support for creating 3D [VkImage](resources.html#VkImage)
objects with [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
`sparseResidency2Samples`: Support for creating 2D [VkImage](resources.html#VkImage)
objects with 2 samples and [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
`sparseResidency4Samples`: Support for creating 2D [VkImage](resources.html#VkImage)
objects with 4 samples and [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
`sparseResidency8Samples`: Support for creating 2D [VkImage](resources.html#VkImage)
objects with 8 samples and [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
`sparseResidency16Samples`: Support for creating 2D [VkImage](resources.html#VkImage)
objects with 16 samples and [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits).

* 
`sparseResidencyAliased`: Support for creating [VkBuffer](resources.html#VkBuffer) and
`VkImage` objects with the [VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](resources.html#VkBufferCreateFlagBits)
and [VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](resources.html#VkImageCreateFlagBits) flags, respectively.

Some features of the implementation are not possible to disable, and are
reported to allow applications to alter their sparse resource usage
accordingly.
These read-only capabilities are reported in the
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`sparseProperties` member, which is a
`VkPhysicalDeviceSparseProperties` structure.

The `VkPhysicalDeviceSparseProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPhysicalDeviceSparseProperties {
    VkBool32    residencyStandard2DBlockShape;
    VkBool32    residencyStandard2DMultisampleBlockShape;
    VkBool32    residencyStandard3DBlockShape;
    VkBool32    residencyAlignedMipSize;
    VkBool32    residencyNonResidentStrict;
} VkPhysicalDeviceSparseProperties;

* 
`residencyStandard2DBlockShape`
is [VK_TRUE](fundamentals.html#VK_TRUE) if the physical device will access all single-sample 2D
sparse resources using the standard sparse image block shapes (based on
image format), as described in the
[Standard Sparse Image Block    Shapes (Single Sample)](#sparsememory-sparseblockshapessingle) table.
If this property is not supported the value returned in the
`imageGranularity` member of the `VkSparseImageFormatProperties`
structure for single-sample 2D images is not **required** to match the
standard sparse image block dimensions listed in the table.

* 
`residencyStandard2DMultisampleBlockShape`
is [VK_TRUE](fundamentals.html#VK_TRUE) if the physical device will access all multisample 2D
sparse resources using the standard sparse image block shapes (based on
image format), as described in the
[Standard Sparse Image Block Shapes    (MSAA)](#sparsememory-sparseblockshapesmsaa) table.
If this property is not supported, the value returned in the
`imageGranularity` member of the `VkSparseImageFormatProperties`
structure for multisample 2D images is not **required** to match the
standard sparse image block dimensions listed in the table.

* 
`residencyStandard3DBlockShape`
is [VK_TRUE](fundamentals.html#VK_TRUE) if the physical device will access all 3D sparse
resources using the standard sparse image block shapes (based on image
format), as described in the
[Standard Sparse Image Block    Shapes (Single Sample)](#sparsememory-sparseblockshapessingle) table.
If this property is not supported, the value returned in the
`imageGranularity` member of the `VkSparseImageFormatProperties`
structure for 3D images is not **required** to match the standard sparse
image block dimensions listed in the table.

* 
`residencyAlignedMipSize`
is [VK_TRUE](fundamentals.html#VK_TRUE) if images with mip level dimensions that are not
integer multiples of the corresponding dimensions of the sparse image
block **may** be placed in the mip tail.
If this property is not reported, only mip levels with dimensions
smaller than the `imageGranularity` member of the
`VkSparseImageFormatProperties` structure will be placed in the mip
tail.
If this property is reported the implementation is allowed to return
[VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT](#VkSparseImageFormatFlagBits) in the `flags`
member of `VkSparseImageFormatProperties`, indicating that mip level
dimensions that are not integer multiples of the corresponding
dimensions of the sparse image block will be placed in the mip tail.

* 
`residencyNonResidentStrict`
specifies whether the physical device **can** consistently access
non-resident regions of a resource.
If this property is [VK_TRUE](fundamentals.html#VK_TRUE), access to non-resident regions of
resources will be guaranteed to return values as if the resource was
populated with 0; writes to non-resident regions will be discarded.

Given that certain aspects of sparse image support, including the sparse
image block dimensions, **may** be implementation-dependent,
[vkGetPhysicalDeviceSparseImageFormatProperties](#vkGetPhysicalDeviceSparseImageFormatProperties) **can** be used to query
for sparse image format properties prior to resource creation.
This command is used to check whether a given set of sparse image parameters
is supported and what the sparse image block shape will be.

The `VkSparseImageFormatProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageFormatProperties {
    VkImageAspectFlags          aspectMask;
    VkExtent3D                  imageGranularity;
    VkSparseImageFormatFlags    flags;
} VkSparseImageFormatProperties;

* 
`aspectMask` is a bitmask [VkImageAspectFlagBits](resources.html#VkImageAspectFlagBits) specifying
which aspects of the image the properties apply to.

* 
`imageGranularity` is the width, height, and depth of the sparse
image block in texels.

* 
`flags` is a bitmask of [VkSparseImageFormatFlagBits](#VkSparseImageFormatFlagBits) specifying
additional information about the sparse resource.

Bits which **may** be set in [VkSparseImageFormatProperties](#VkSparseImageFormatProperties)::`flags`,
specifying additional information about the sparse resource, are:

// Provided by VK_VERSION_1_0
typedef enum VkSparseImageFormatFlagBits {
    VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT = 0x00000001,
    VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT = 0x00000002,
    VK_SPARSE_IMAGE_FORMAT_NONSTANDARD_BLOCK_SIZE_BIT = 0x00000004,
} VkSparseImageFormatFlagBits;

* 
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits) specifies that the image
uses a single mip tail region for all array layers.

* 
[VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT](#VkSparseImageFormatFlagBits) specifies that the
first mip level whose dimensions are not integer multiples of the
corresponding dimensions of the sparse image block begins the mip tail
region.

* 
[VK_SPARSE_IMAGE_FORMAT_NONSTANDARD_BLOCK_SIZE_BIT](#VkSparseImageFormatFlagBits) specifies that
the image uses non-standard sparse image block dimensions, and the
`imageGranularity` values do not match the standard sparse image
block dimensions for the given format.

// Provided by VK_VERSION_1_0
typedef VkFlags VkSparseImageFormatFlags;

`VkSparseImageFormatFlags` is a bitmask type for setting a mask of zero
or more [VkSparseImageFormatFlagBits](#VkSparseImageFormatFlagBits).

`vkGetPhysicalDeviceSparseImageFormatProperties` returns an array of
[VkSparseImageFormatProperties](#VkSparseImageFormatProperties).
Each element describes properties for one set of image aspects that are
bound simultaneously for a `VkImage` created with the provided image
creation parameters.
This is usually one element for each aspect in the image, but for
interleaved depth/stencil images there is only one element describing the
combined aspects.

|  | This functionality is superseded by [vkGetPhysicalDeviceSparseImageFormatProperties2](#vkGetPhysicalDeviceSparseImageFormatProperties2). See [Legacy Functionality](../appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceSparseImageFormatProperties(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkImageType                                 type,
    VkSampleCountFlagBits                       samples,
    VkImageUsageFlags                           usage,
    VkImageTiling                               tiling,
    uint32_t*                                   pPropertyCount,
    VkSparseImageFormatProperties*              pProperties);

* 
`physicalDevice` is the physical device from which to query the
sparse image format properties.

* 
`format` is the image format.

* 
`type` is the dimensionality of the image.

* 
`samples` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value specifying the
number of samples per texel.

* 
`usage` is a bitmask describing the intended usage of the image.

* 
`tiling` is the tiling arrangement of the texel blocks in memory.

* 
`pPropertyCount` is a pointer to an integer related to the number of
sparse format properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkSparseImageFormatProperties](#VkSparseImageFormatProperties) structures.

If `pProperties` is `NULL`, then the number of sparse format properties
available is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If `pPropertyCount` is less than the number of sparse format properties
available, at most `pPropertyCount` structures will be written.

If [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) is not supported for the given
arguments, `pPropertyCount` will be zero upon return, and no data will
be written to `pProperties`.

Multiple aspects are returned for depth/stencil images that are implemented
as separate planes by the implementation.
The depth and stencil data planes each have unique
`VkSparseImageFormatProperties` data.

Depth/stencil images with depth and stencil data interleaved into a single
plane will return a single `VkSparseImageFormatProperties` structure
with the `aspectMask` set to [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) |
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits).

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-samples-01094) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-samples-01094

`samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value that is
set in `VkImageFormatProperties`::`sampleCounts` returned by
`vkGetPhysicalDeviceImageFormatProperties` with `format`,
`type`, `tiling`, and `usage` equal to those in this command

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-format-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-type-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-type-parameter

 `type` **must** be a valid [VkImageType](resources.html#VkImageType) value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-samples-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-usage-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) values

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-usage-requiredbitmask) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-tiling-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](resources.html#VkImageTiling) value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties-pProperties-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkSparseImageFormatProperties](#VkSparseImageFormatProperties) structures

`vkGetPhysicalDeviceSparseImageFormatProperties2` returns an array of
[VkSparseImageFormatProperties2](#VkSparseImageFormatProperties2).
Each element describes properties for one set of image aspects that are
bound simultaneously for a `VkImage` created with the provided image
creation parameters.
This is usually one element for each aspect in the image, but for
interleaved depth/stencil images there is only one element describing the
combined aspects.

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceSparseImageFormatProperties2(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSparseImageFormatInfo2* pFormatInfo,
    uint32_t*                                   pPropertyCount,
    VkSparseImageFormatProperties2*             pProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceSparseImageFormatProperties2
void vkGetPhysicalDeviceSparseImageFormatProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSparseImageFormatInfo2* pFormatInfo,
    uint32_t*                                   pPropertyCount,
    VkSparseImageFormatProperties2*             pProperties);

* 
`physicalDevice` is the physical device from which to query the
sparse image format properties.

* 
`pFormatInfo` is a pointer to a
[VkPhysicalDeviceSparseImageFormatInfo2](#VkPhysicalDeviceSparseImageFormatInfo2) structure containing input
parameters to the command.

* 
`pPropertyCount` is a pointer to an integer related to the number of
sparse format properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkSparseImageFormatProperties2](#VkSparseImageFormatProperties2) structures.

`vkGetPhysicalDeviceSparseImageFormatProperties2` behaves identically to
[vkGetPhysicalDeviceSparseImageFormatProperties](#vkGetPhysicalDeviceSparseImageFormatProperties), with the ability to
return extended information by adding extending structures to the
`pNext` chain of its `pProperties` parameter.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pFormatInfo-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pFormatInfo-parameter

 `pFormatInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSparseImageFormatInfo2](#VkPhysicalDeviceSparseImageFormatInfo2) structure

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pProperties-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkSparseImageFormatProperties2](#VkSparseImageFormatProperties2) structures

The `VkPhysicalDeviceSparseImageFormatInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceSparseImageFormatInfo2 {
    VkStructureType          sType;
    const void*              pNext;
    VkFormat                 format;
    VkImageType              type;
    VkSampleCountFlagBits    samples;
    VkImageUsageFlags        usage;
    VkImageTiling            tiling;
} VkPhysicalDeviceSparseImageFormatInfo2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkPhysicalDeviceSparseImageFormatInfo2
typedef VkPhysicalDeviceSparseImageFormatInfo2 VkPhysicalDeviceSparseImageFormatInfo2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the image format.

* 
`type` is the dimensionality of the image.

* 
`samples` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value specifying the
number of samples per texel.

* 
`usage` is a bitmask describing the intended usage of the image.

* 
`tiling` is the tiling arrangement of the texel blocks in memory.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-samples-01095) VUID-VkPhysicalDeviceSparseImageFormatInfo2-samples-01095

`samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value that is
set in `VkImageFormatProperties`::`sampleCounts` returned by
`vkGetPhysicalDeviceImageFormatProperties` with `format`,
`type`, `tiling`, and `usage` equal to those in this command

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-sType-sType) VUID-VkPhysicalDeviceSparseImageFormatInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SPARSE_IMAGE_FORMAT_INFO_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-pNext-pNext) VUID-VkPhysicalDeviceSparseImageFormatInfo2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-format-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-type-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-type-parameter

 `type` **must** be a valid [VkImageType](resources.html#VkImageType) value

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-samples-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-usage-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) values

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-usage-requiredbitmask) VUID-VkPhysicalDeviceSparseImageFormatInfo2-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-tiling-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](resources.html#VkImageTiling) value

The `VkSparseImageFormatProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkSparseImageFormatProperties2 {
    VkStructureType                  sType;
    void*                            pNext;
    VkSparseImageFormatProperties    properties;
} VkSparseImageFormatProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkSparseImageFormatProperties2
typedef VkSparseImageFormatProperties2 VkSparseImageFormatProperties2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`properties` is a [VkSparseImageFormatProperties](#VkSparseImageFormatProperties) structure
which is populated with the same values as in
[vkGetPhysicalDeviceSparseImageFormatProperties](#vkGetPhysicalDeviceSparseImageFormatProperties).

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageFormatProperties2-sType-sType) VUID-VkSparseImageFormatProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SPARSE_IMAGE_FORMAT_PROPERTIES_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSparseImageFormatProperties2-pNext-pNext) VUID-VkSparseImageFormatProperties2-pNext-pNext

 `pNext` **must** be `NULL`

Sparse resources require that one or more sparse feature flags be specified
(as part of the `VkPhysicalDeviceFeatures` structure described
previously in the [Physical Device Features](#sparsememory-physicalfeatures)
section) when calling [vkCreateDevice](devsandqueues.html#vkCreateDevice).
When the appropriate device features are enabled, the
`VK_BUFFER_CREATE_SPARSE_*` and `VK_IMAGE_CREATE_SPARSE_*` flags
**can** be used.
See [vkCreateBuffer](resources.html#vkCreateBuffer) and [vkCreateImage](resources.html#vkCreateImage) for details of the resource
creation APIs.

|  | Specifying [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkBufferCreateFlagBits) or
| --- | --- |
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) requires specifying
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](resources.html#VkBufferCreateFlagBits) or
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits), respectively, as well.
This means that resources **must** be created with the appropriate
`*_SPARSE_BINDING_BIT` to be used with the sparse binding command
(`vkQueueBindSparse`). |

Sparse resources have specific memory requirements related to binding sparse
memory.
These memory requirements are reported differently for `VkBuffer`
objects and `VkImage` objects.

Buffers (both fully and partially resident) and fully-resident images **can**
be bound to memory using only the data from `VkMemoryRequirements`.
For all sparse resources the `VkMemoryRequirements`::`alignment`
member specifies both the binding granularity in bytes and the **required**
alignment of `VkDeviceMemory`.

Partially resident images have a different method for binding memory.
As with buffers and fully resident images, the
`VkMemoryRequirements`::`alignment` field specifies the binding
granularity in bytes for the image.

Requesting sparse memory requirements for `VkImage` objects using
`vkGetImageSparseMemoryRequirements` will return an array of one or more
`VkSparseImageMemoryRequirements` structures.
Each structure describes the sparse memory requirements for a group of
aspects of the image.

The sparse image **must** have been created using the
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag to retrieve valid sparse
image memory requirements.

The `VkSparseImageMemoryRequirements` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageMemoryRequirements {
    VkSparseImageFormatProperties    formatProperties;
    uint32_t                         imageMipTailFirstLod;
    VkDeviceSize                     imageMipTailSize;
    VkDeviceSize                     imageMipTailOffset;
    VkDeviceSize                     imageMipTailStride;
} VkSparseImageMemoryRequirements;

* 
`formatProperties` is a [VkSparseImageFormatProperties](#VkSparseImageFormatProperties)
structure specifying properties of the image format.

* 
`imageMipTailFirstLod` is the first mip level at which image
subresources are included in the mip tail region.

* 
`imageMipTailSize` is the memory size (in bytes) of the mip tail
region.
If `formatProperties.flags` contains
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits), this is the size of the
whole mip tail, otherwise this is the size of the mip tail of a single
array layer.
This value is guaranteed to be a multiple of the sparse block size in
bytes.

* 
`imageMipTailOffset` is the opaque memory offset used with
[VkSparseImageOpaqueMemoryBindInfo](#VkSparseImageOpaqueMemoryBindInfo) to bind the mip tail region(s).

* 
`imageMipTailStride` is the offset stride between each array-layer’s
mip tail, if `formatProperties.flags` does not contain
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits) (otherwise the value is
**undefined**).

To query sparse memory requirements for an image, call:

// Provided by VK_VERSION_1_0
void vkGetImageSparseMemoryRequirements(
    VkDevice                                    device,
    VkImage                                     image,
    uint32_t*                                   pSparseMemoryRequirementCount,
    VkSparseImageMemoryRequirements*            pSparseMemoryRequirements);

* 
`device` is the logical device that owns the image.

* 
`image` is the [VkImage](resources.html#VkImage) object to get the memory requirements
for.

* 
`pSparseMemoryRequirementCount` is a pointer to an integer related
to the number of sparse memory requirements available or queried, as
described below.

* 
`pSparseMemoryRequirements` is either `NULL` or a pointer to an
array of `VkSparseImageMemoryRequirements` structures.

If `pSparseMemoryRequirements` is `NULL`, then the number of sparse
memory requirements available is returned in
`pSparseMemoryRequirementCount`.
Otherwise, `pSparseMemoryRequirementCount` **must** point to a variable set
by the application to the number of elements in the
`pSparseMemoryRequirements` array, and on return the variable is
overwritten with the number of structures actually written to
`pSparseMemoryRequirements`.
If `pSparseMemoryRequirementCount` is less than the number of sparse
memory requirements available, at most `pSparseMemoryRequirementCount`
structures will be written.

If the image was not created with [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits)
then `pSparseMemoryRequirementCount` will be zero and
`pSparseMemoryRequirements` will not be written to.

|  | It is legal for an implementation to report a larger value in
| --- | --- |
`VkMemoryRequirements`::`size` than would be obtained by adding
together memory sizes for all `VkSparseImageMemoryRequirements` returned
by `vkGetImageSparseMemoryRequirements`.
This **may** occur when the implementation requires unused padding in the
address range describing the resource. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageSparseMemoryRequirements-device-parameter) VUID-vkGetImageSparseMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageSparseMemoryRequirements-image-parameter) VUID-vkGetImageSparseMemoryRequirements-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-vkGetImageSparseMemoryRequirements-pSparseMemoryRequirementCount-parameter) VUID-vkGetImageSparseMemoryRequirements-pSparseMemoryRequirementCount-parameter

 `pSparseMemoryRequirementCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetImageSparseMemoryRequirements-pSparseMemoryRequirements-parameter) VUID-vkGetImageSparseMemoryRequirements-pSparseMemoryRequirements-parameter

 If the value referenced by `pSparseMemoryRequirementCount` is not `0`, and `pSparseMemoryRequirements` is not `NULL`, `pSparseMemoryRequirements` **must** be a valid pointer to an array of `pSparseMemoryRequirementCount` [VkSparseImageMemoryRequirements](#VkSparseImageMemoryRequirements) structures

* 
[](#VUID-vkGetImageSparseMemoryRequirements-image-parent) VUID-vkGetImageSparseMemoryRequirements-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

To query sparse memory requirements for an image, call:

// Provided by VK_VERSION_1_1
void vkGetImageSparseMemoryRequirements2(
    VkDevice                                    device,
    const VkImageSparseMemoryRequirementsInfo2* pInfo,
    uint32_t*                                   pSparseMemoryRequirementCount,
    VkSparseImageMemoryRequirements2*           pSparseMemoryRequirements);

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to vkGetImageSparseMemoryRequirements2
void vkGetImageSparseMemoryRequirements2KHR(
    VkDevice                                    device,
    const VkImageSparseMemoryRequirementsInfo2* pInfo,
    uint32_t*                                   pSparseMemoryRequirementCount,
    VkSparseImageMemoryRequirements2*           pSparseMemoryRequirements);

* 
`device` is the logical device that owns the image.

* 
`pInfo` is a pointer to a [VkImageSparseMemoryRequirementsInfo2](#VkImageSparseMemoryRequirementsInfo2)
structure containing parameters required for the memory requirements
query.

* 
`pSparseMemoryRequirementCount` is a pointer to an integer related
to the number of sparse memory requirements available or queried, as
described below.

* 
`pSparseMemoryRequirements` is either `NULL` or a pointer to an
array of `VkSparseImageMemoryRequirements2` structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageSparseMemoryRequirements2-device-parameter) VUID-vkGetImageSparseMemoryRequirements2-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageSparseMemoryRequirements2-pInfo-parameter) VUID-vkGetImageSparseMemoryRequirements2-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageSparseMemoryRequirementsInfo2](#VkImageSparseMemoryRequirementsInfo2) structure

* 
[](#VUID-vkGetImageSparseMemoryRequirements2-pSparseMemoryRequirementCount-parameter) VUID-vkGetImageSparseMemoryRequirements2-pSparseMemoryRequirementCount-parameter

 `pSparseMemoryRequirementCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetImageSparseMemoryRequirements2-pSparseMemoryRequirements-parameter) VUID-vkGetImageSparseMemoryRequirements2-pSparseMemoryRequirements-parameter

 If the value referenced by `pSparseMemoryRequirementCount` is not `0`, and `pSparseMemoryRequirements` is not `NULL`, `pSparseMemoryRequirements` **must** be a valid pointer to an array of `pSparseMemoryRequirementCount` [VkSparseImageMemoryRequirements2](#VkSparseImageMemoryRequirements2) structures

To determine the sparse memory requirements for an image resource without
creating an object, call:

// Provided by VK_VERSION_1_3
void vkGetDeviceImageSparseMemoryRequirements(
    VkDevice                                    device,
    const VkDeviceImageMemoryRequirements*      pInfo,
    uint32_t*                                   pSparseMemoryRequirementCount,
    VkSparseImageMemoryRequirements2*           pSparseMemoryRequirements);

// Provided by VK_KHR_maintenance4
// Equivalent to vkGetDeviceImageSparseMemoryRequirements
void vkGetDeviceImageSparseMemoryRequirementsKHR(
    VkDevice                                    device,
    const VkDeviceImageMemoryRequirements*      pInfo,
    uint32_t*                                   pSparseMemoryRequirementCount,
    VkSparseImageMemoryRequirements2*           pSparseMemoryRequirements);

* 
`device` is the logical device intended to own the image.

* 
`pInfo` is a pointer to a [VkDeviceImageMemoryRequirements](resources.html#VkDeviceImageMemoryRequirements)
structure containing parameters required for the memory requirements
query.

* 
`pSparseMemoryRequirementCount` is a pointer to an integer related
to the number of sparse memory requirements available or queried, as
described below.

* 
`pSparseMemoryRequirements` is either `NULL` or a pointer to an
array of `VkSparseImageMemoryRequirements2` structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceImageSparseMemoryRequirements-device-parameter) VUID-vkGetDeviceImageSparseMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceImageSparseMemoryRequirements-pInfo-parameter) VUID-vkGetDeviceImageSparseMemoryRequirements-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceImageMemoryRequirements](resources.html#VkDeviceImageMemoryRequirements) structure

* 
[](#VUID-vkGetDeviceImageSparseMemoryRequirements-pSparseMemoryRequirementCount-parameter) VUID-vkGetDeviceImageSparseMemoryRequirements-pSparseMemoryRequirementCount-parameter

 `pSparseMemoryRequirementCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDeviceImageSparseMemoryRequirements-pSparseMemoryRequirements-parameter) VUID-vkGetDeviceImageSparseMemoryRequirements-pSparseMemoryRequirements-parameter

 If the value referenced by `pSparseMemoryRequirementCount` is not `0`, and `pSparseMemoryRequirements` is not `NULL`, `pSparseMemoryRequirements` **must** be a valid pointer to an array of `pSparseMemoryRequirementCount` [VkSparseImageMemoryRequirements2](#VkSparseImageMemoryRequirements2) structures

The `VkImageSparseMemoryRequirementsInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImageSparseMemoryRequirementsInfo2 {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
} VkImageSparseMemoryRequirementsInfo2;

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to VkImageSparseMemoryRequirementsInfo2
typedef VkImageSparseMemoryRequirementsInfo2 VkImageSparseMemoryRequirementsInfo2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the image to query.

Valid Usage (Implicit)

* 
[](#VUID-VkImageSparseMemoryRequirementsInfo2-sType-sType) VUID-VkImageSparseMemoryRequirementsInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_SPARSE_MEMORY_REQUIREMENTS_INFO_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageSparseMemoryRequirementsInfo2-pNext-pNext) VUID-VkImageSparseMemoryRequirementsInfo2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageSparseMemoryRequirementsInfo2-image-parameter) VUID-VkImageSparseMemoryRequirementsInfo2-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

The `VkSparseImageMemoryRequirements2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkSparseImageMemoryRequirements2 {
    VkStructureType                    sType;
    void*                              pNext;
    VkSparseImageMemoryRequirements    memoryRequirements;
} VkSparseImageMemoryRequirements2;

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to VkSparseImageMemoryRequirements2
typedef VkSparseImageMemoryRequirements2 VkSparseImageMemoryRequirements2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryRequirements` is a [VkSparseImageMemoryRequirements](#VkSparseImageMemoryRequirements)
structure describing the memory requirements of the sparse image.

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageMemoryRequirements2-sType-sType) VUID-VkSparseImageMemoryRequirements2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SPARSE_IMAGE_MEMORY_REQUIREMENTS_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSparseImageMemoryRequirements2-pNext-pNext) VUID-VkSparseImageMemoryRequirements2-pNext-pNext

 `pNext` **must** be `NULL`

Non-sparse resources are backed by a single physical allocation prior to
device use (via `vkBindImageMemory` or `vkBindBufferMemory`), and
their backing **must** not be changed.
On the other hand, sparse resources **can** be bound to memory non-contiguously
and these bindings **can** be altered during the lifetime of the resource.

|  | It is important to note that freeing a `VkDeviceMemory` object with
| --- | --- |
`vkFreeMemory` will not cause resources (or resource regions) bound to
the memory object to become unbound.
Applications **must** not access resources bound to memory that has been freed. |

Sparse memory bindings execute on a queue that includes the
[VK_QUEUE_SPARSE_BINDING_BIT](devsandqueues.html#VkQueueFlagBits) bit.
Applications **must** use [synchronization primitives](synchronization.html#synchronization) to
guarantee that other queues do not access ranges of memory concurrently with
a binding change.
Applications **can** access other ranges of the same resource while a bind
operation is executing.

|  | Implementations **must** provide a guarantee that simultaneously binding sparse
| --- | --- |
blocks while another queue accesses those same sparse blocks via a sparse
resource **must** not access memory owned by another process or otherwise
corrupt the system. |

While some implementations **may** include [VK_QUEUE_SPARSE_BINDING_BIT](devsandqueues.html#VkQueueFlagBits)
support in queue families that also include graphics and compute support,
other implementations **may** only expose a
[VK_QUEUE_SPARSE_BINDING_BIT](devsandqueues.html#VkQueueFlagBits)-only queue family.
In either case, applications **must** use [synchronization primitives](synchronization.html#synchronization) to explicitly request any ordering dependencies between sparse
memory binding operations and other graphics/compute/transfer operations, as
sparse binding operations are not automatically ordered against command
buffer execution, even within a single queue.

When binding memory explicitly for the [VK_IMAGE_ASPECT_METADATA_BIT](resources.html#VkImageAspectFlagBits)
the application **must** use the [VK_SPARSE_MEMORY_BIND_METADATA_BIT](#VkSparseMemoryBindFlagBits) in
the `VkSparseMemoryBind`::`flags` field when binding memory.
Binding memory for metadata is done the same way as binding memory for the
mip tail, with the addition of the [VK_SPARSE_MEMORY_BIND_METADATA_BIT](#VkSparseMemoryBindFlagBits)
flag.

Binding the mip tail for any aspect **must** only be performed using
[VkSparseImageOpaqueMemoryBindInfo](#VkSparseImageOpaqueMemoryBindInfo).
If `formatProperties.flags` contains
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits), then it **can** be bound with
a single [VkSparseMemoryBind](#VkSparseMemoryBind) structure, with `resourceOffset` =
`imageMipTailOffset` and `size` = `imageMipTailSize`.

If `formatProperties.flags` does not contain
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits) then the offset for the mip
tail in each array layer is given as:

arrayMipTailOffset = imageMipTailOffset + arrayLayer * imageMipTailStride;

and the mip tail **can** be bound with `layerCount` [VkSparseMemoryBind](#VkSparseMemoryBind)
structures, each using `size` = `imageMipTailSize` and
`resourceOffset` = `arrayMipTailOffset` as defined above.

Sparse memory binding is handled by the following APIs and related data
structures.

The `VkSparseMemoryBind` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSparseMemoryBind {
    VkDeviceSize               resourceOffset;
    VkDeviceSize               size;
    VkDeviceMemory             memory;
    VkDeviceSize               memoryOffset;
    VkSparseMemoryBindFlags    flags;
} VkSparseMemoryBind;

* 
`resourceOffset` is the offset into the resource.

* 
`size` is the size of the memory region to be bound.

* 
`memory` is the [VkDeviceMemory](memory.html#VkDeviceMemory) object that the range of the
resource is bound to.
If `memory` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the range is unbound.

* 
`memoryOffset` is the offset into the [VkDeviceMemory](memory.html#VkDeviceMemory) object to
bind the resource range to.
If `memory` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), this value is ignored.

* 
`flags` is a bitmask of [VkSparseMemoryBindFlagBits](#VkSparseMemoryBindFlagBits) specifying
usage of the binding operation.

The *binding range* [`resourceOffset`, `resourceOffset` + 
`size`) has different constraints based on `flags`.
If `flags` contains [VK_SPARSE_MEMORY_BIND_METADATA_BIT](#VkSparseMemoryBindFlagBits), the
binding range **must** be within the mip tail region of the metadata aspect.
This metadata region is defined by:

metadataRegion = [base, base + 
`imageMipTailSize`)

base = `imageMipTailOffset` + 
`imageMipTailStride` × n

and `imageMipTailOffset`, `imageMipTailSize`, and
`imageMipTailStride` values are from the
[VkSparseImageMemoryRequirements](#VkSparseImageMemoryRequirements) corresponding to the metadata aspect
of the image, and n is a valid array layer index for the image,

`imageMipTailStride` is considered to be zero for aspects where
`VkSparseImageMemoryRequirements`::`formatProperties.flags` contains
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#VkSparseImageFormatFlagBits).

If `flags` does not contain [VK_SPARSE_MEMORY_BIND_METADATA_BIT](#VkSparseMemoryBindFlagBits),
the binding range **must** be within the range
[0,[VkMemoryRequirements](resources.html#VkMemoryRequirements)::`size`).

Valid Usage

* 
[](#VUID-VkSparseMemoryBind-memory-01096) VUID-VkSparseMemoryBind-memory-01096

If `memory` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `memory` and
`memoryOffset` **must** match the memory requirements of the resource,
as described in section [Resource Memory Association](resources.html#resources-association)

* 
[](#VUID-VkSparseMemoryBind-resourceOffset-09491) VUID-VkSparseMemoryBind-resourceOffset-09491

If the resource being bound is a `VkBuffer`, `resourceOffset`,
`memoryOffset` and `size` **must** be an integer multiple of the
`alignment` of the [VkMemoryRequirements](resources.html#VkMemoryRequirements) structure returned
from a call to [vkGetBufferMemoryRequirements](resources.html#vkGetBufferMemoryRequirements) with the buffer
resource

* 
[](#VUID-VkSparseMemoryBind-resourceOffset-09492) VUID-VkSparseMemoryBind-resourceOffset-09492

If the resource being bound is a `VkImage`, `resourceOffset` and
`memoryOffset` **must** be an integer multiple of the `alignment`
of the [VkMemoryRequirements](resources.html#VkMemoryRequirements) structure returned from a call to
[vkGetImageMemoryRequirements](resources.html#vkGetImageMemoryRequirements) with the image resource

* 
[](#VUID-VkSparseMemoryBind-memory-01097) VUID-VkSparseMemoryBind-memory-01097

If `memory` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `memory` **must** not have
been created with a memory type that reports
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](memory.html#VkMemoryPropertyFlagBits) bit set

* 
[](#VUID-VkSparseMemoryBind-size-01098) VUID-VkSparseMemoryBind-size-01098

`size` **must** be greater than `0`

* 
[](#VUID-VkSparseMemoryBind-resourceOffset-01099) VUID-VkSparseMemoryBind-resourceOffset-01099

`resourceOffset` **must** be less than the size of the resource

* 
[](#VUID-VkSparseMemoryBind-size-01100) VUID-VkSparseMemoryBind-size-01100

`size` **must** be less than or equal to the size of the resource minus
`resourceOffset`

* 
[](#VUID-VkSparseMemoryBind-memoryOffset-01101) VUID-VkSparseMemoryBind-memoryOffset-01101

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkSparseMemoryBind-size-01102) VUID-VkSparseMemoryBind-size-01102

`size` **must** be less than or equal to the size of `memory` minus
`memoryOffset`

* 
[](#VUID-VkSparseMemoryBind-memory-02730) VUID-VkSparseMemoryBind-memory-02730

If `memory` was created with
[VkExportMemoryAllocateInfo](memory.html#VkExportMemoryAllocateInfo)::`handleTypes` not equal to `0`, at
least one handle type it contained **must** also have been set in
[VkExternalMemoryBufferCreateInfo](resources.html#VkExternalMemoryBufferCreateInfo)::`handleTypes` or
[VkExternalMemoryImageCreateInfo](resources.html#VkExternalMemoryImageCreateInfo)::`handleTypes` when the
resource was created

* 
[](#VUID-VkSparseMemoryBind-memory-02731) VUID-VkSparseMemoryBind-memory-02731

If `memory` was created by a memory import operation, the external
handle type of the imported memory **must** also have been set in
[VkExternalMemoryBufferCreateInfo](resources.html#VkExternalMemoryBufferCreateInfo)::`handleTypes` or
[VkExternalMemoryImageCreateInfo](resources.html#VkExternalMemoryImageCreateInfo)::`handleTypes` when the
resource was created

Valid Usage (Implicit)

* 
[](#VUID-VkSparseMemoryBind-memory-parameter) VUID-VkSparseMemoryBind-memory-parameter

 If `memory` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `memory` **must** be a valid [VkDeviceMemory](memory.html#VkDeviceMemory) handle

* 
[](#VUID-VkSparseMemoryBind-flags-parameter) VUID-VkSparseMemoryBind-flags-parameter

 `flags` **must** be a valid combination of [VkSparseMemoryBindFlagBits](#VkSparseMemoryBindFlagBits) values

Bits which **can** be set in [VkSparseMemoryBind](#VkSparseMemoryBind)::`flags`, specifying
usage of a sparse memory binding operation, are:

// Provided by VK_VERSION_1_0
typedef enum VkSparseMemoryBindFlagBits {
    VK_SPARSE_MEMORY_BIND_METADATA_BIT = 0x00000001,
} VkSparseMemoryBindFlagBits;

* 
[VK_SPARSE_MEMORY_BIND_METADATA_BIT](#VkSparseMemoryBindFlagBits) specifies that the memory being
bound is only for the metadata aspect.

// Provided by VK_VERSION_1_0
typedef VkFlags VkSparseMemoryBindFlags;

`VkSparseMemoryBindFlags` is a bitmask type for setting a mask of zero
or more [VkSparseMemoryBindFlagBits](#VkSparseMemoryBindFlagBits).

Memory is bound to `VkBuffer` objects created with the
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](resources.html#VkBufferCreateFlagBits) flag using the following
structure:

// Provided by VK_VERSION_1_0
typedef struct VkSparseBufferMemoryBindInfo {
    VkBuffer                     buffer;
    uint32_t                     bindCount;
    const VkSparseMemoryBind*    pBinds;
} VkSparseBufferMemoryBindInfo;

* 
`buffer` is the [VkBuffer](resources.html#VkBuffer) object to be bound.

* 
`bindCount` is the number of [VkSparseMemoryBind](#VkSparseMemoryBind) structures in
the `pBinds` array.

* 
`pBinds` is a pointer to an array of [VkSparseMemoryBind](#VkSparseMemoryBind)
structures.

Valid Usage (Implicit)

* 
[](#VUID-VkSparseBufferMemoryBindInfo-buffer-parameter) VUID-VkSparseBufferMemoryBindInfo-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-VkSparseBufferMemoryBindInfo-pBinds-parameter) VUID-VkSparseBufferMemoryBindInfo-pBinds-parameter

 `pBinds` **must** be a valid pointer to an array of `bindCount` valid [VkSparseMemoryBind](#VkSparseMemoryBind) structures

* 
[](#VUID-VkSparseBufferMemoryBindInfo-bindCount-arraylength) VUID-VkSparseBufferMemoryBindInfo-bindCount-arraylength

 `bindCount` **must** be greater than `0`

Memory is bound to opaque regions of `VkImage` objects created with the
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits) flag using the following structure:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageOpaqueMemoryBindInfo {
    VkImage                      image;
    uint32_t                     bindCount;
    const VkSparseMemoryBind*    pBinds;
} VkSparseImageOpaqueMemoryBindInfo;

* 
`image` is the [VkImage](resources.html#VkImage) object to be bound.

* 
`bindCount` is the number of [VkSparseMemoryBind](#VkSparseMemoryBind) structures in
the `pBinds` array.

* 
`pBinds` is a pointer to an array of [VkSparseMemoryBind](#VkSparseMemoryBind)
structures.

|  | This structure is normally used to bind memory to fully-resident sparse
| --- | --- |
images or for mip tail regions of partially resident images.
However, it **can** also be used to bind memory for the entire binding range of
partially resident images.

If the `pBinds`[i].flags of an element *i* of `pBinds` does not
contain [VK_SPARSE_MEMORY_BIND_METADATA_BIT](#VkSparseMemoryBindFlagBits), the `resourceOffset`
is in the range [0, [VkMemoryRequirements](resources.html#VkMemoryRequirements)::`size`), This
range includes data from all aspects of the image, including metadata.
For most implementations this will probably mean that the
`resourceOffset` is a simple device address offset within the resource.
It is possible for an application to bind a range of memory that includes
both resource data and metadata.
However, the application would not know what part of the image the memory is
used for, or if any range is being used for metadata.

If the `pBinds`[i].flags of an element *i* of `pBinds` contains
[VK_SPARSE_MEMORY_BIND_METADATA_BIT](#VkSparseMemoryBindFlagBits), the binding range specified **must**
be within the mip tail region of the metadata aspect.
In this case the `resourceOffset` is not **required** to be a simple device
address offset within the resource.
However, it *is* defined to be within [`imageMipTailOffset`,
`imageMipTailOffset` +  `imageMipTailSize`) for the metadata
aspect.
See [VkSparseMemoryBind](#VkSparseMemoryBind) for the full constraints on binding region with
this flag present. |

Valid Usage

* 
[](#VUID-VkSparseImageOpaqueMemoryBindInfo-pBinds-01103) VUID-VkSparseImageOpaqueMemoryBindInfo-pBinds-01103

If the `flags` member of any element of `pBinds` contains
[VK_SPARSE_MEMORY_BIND_METADATA_BIT](#VkSparseMemoryBindFlagBits), the binding range defined
**must** be within the mip tail region of the metadata aspect of
`image`

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageOpaqueMemoryBindInfo-image-parameter) VUID-VkSparseImageOpaqueMemoryBindInfo-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-VkSparseImageOpaqueMemoryBindInfo-pBinds-parameter) VUID-VkSparseImageOpaqueMemoryBindInfo-pBinds-parameter

 `pBinds` **must** be a valid pointer to an array of `bindCount` valid [VkSparseMemoryBind](#VkSparseMemoryBind) structures

* 
[](#VUID-VkSparseImageOpaqueMemoryBindInfo-bindCount-arraylength) VUID-VkSparseImageOpaqueMemoryBindInfo-bindCount-arraylength

 `bindCount` **must** be greater than `0`

Memory **can** be bound to sparse image blocks of `VkImage` objects created
with the [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) flag using the following
structure:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageMemoryBindInfo {
    VkImage                           image;
    uint32_t                          bindCount;
    const VkSparseImageMemoryBind*    pBinds;
} VkSparseImageMemoryBindInfo;

* 
`image` is the [VkImage](resources.html#VkImage) object to be bound

* 
`bindCount` is the number of [VkSparseImageMemoryBind](#VkSparseImageMemoryBind)
structures in `pBinds` array

* 
`pBinds` is a pointer to an array of [VkSparseImageMemoryBind](#VkSparseImageMemoryBind)
structures

Valid Usage

* 
[](#VUID-VkSparseImageMemoryBindInfo-subresource-01722) VUID-VkSparseImageMemoryBindInfo-subresource-01722

The `subresource.mipLevel` member of each element of `pBinds`
**must** be less than the `mipLevels` specified in
[VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image` was created

* 
[](#VUID-VkSparseImageMemoryBindInfo-subresource-01723) VUID-VkSparseImageMemoryBindInfo-subresource-01723

The `subresource.arrayLayer` member of each element of `pBinds`
**must** be less than the `arrayLayers` specified in
[VkImageCreateInfo](resources.html#VkImageCreateInfo) when `image` was created

* 
[](#VUID-VkSparseImageMemoryBindInfo-subresource-01106) VUID-VkSparseImageMemoryBindInfo-subresource-01106

The `subresource.aspectMask` member of each element of `pBinds`
**must** be valid for the `format` specified in [VkImageCreateInfo](resources.html#VkImageCreateInfo)
when `image` was created

* 
[](#VUID-VkSparseImageMemoryBindInfo-image-02901) VUID-VkSparseImageMemoryBindInfo-image-02901

`image` **must** have been created with
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits) set

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageMemoryBindInfo-image-parameter) VUID-VkSparseImageMemoryBindInfo-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-VkSparseImageMemoryBindInfo-pBinds-parameter) VUID-VkSparseImageMemoryBindInfo-pBinds-parameter

 `pBinds` **must** be a valid pointer to an array of `bindCount` valid [VkSparseImageMemoryBind](#VkSparseImageMemoryBind) structures

* 
[](#VUID-VkSparseImageMemoryBindInfo-bindCount-arraylength) VUID-VkSparseImageMemoryBindInfo-bindCount-arraylength

 `bindCount` **must** be greater than `0`

The `VkSparseImageMemoryBind` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageMemoryBind {
    VkImageSubresource         subresource;
    VkOffset3D                 offset;
    VkExtent3D                 extent;
    VkDeviceMemory             memory;
    VkDeviceSize               memoryOffset;
    VkSparseMemoryBindFlags    flags;
} VkSparseImageMemoryBind;

* 
`subresource` is the image *aspect* and region of interest in the
image.

* 
`offset` are the coordinates of the first texel within the image
subresource to bind.

* 
`extent` is the size in texels of the region within the image
subresource to bind.
The extent **must** be a multiple of the sparse image block dimensions,
except when binding sparse image blocks along the edge of an image
subresource it **can** instead be such that any coordinate of
`offset` +  `extent` equals the corresponding
dimensions of the image subresource.

* 
`memory` is the [VkDeviceMemory](memory.html#VkDeviceMemory) object that the sparse image
blocks of the image are bound to.
If `memory` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the sparse image blocks are
unbound.

* 
`memoryOffset` is an offset into [VkDeviceMemory](memory.html#VkDeviceMemory) object.
If `memory` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), this value is ignored.

* 
`flags` are sparse memory binding flags.

Valid Usage

* 
[](#VUID-VkSparseImageMemoryBind-memory-01104) VUID-VkSparseImageMemoryBind-memory-01104

If the [`sparseResidencyAliased`](features.html#features-sparseResidencyAliased)
feature is not enabled, and if any other resources are bound to ranges
of `memory`, the range of `memory` being bound **must** not overlap
with those bound ranges

* 
[](#VUID-VkSparseImageMemoryBind-memory-01105) VUID-VkSparseImageMemoryBind-memory-01105

`memory` and `memoryOffset` **must** match the memory requirements
of the calling command’s `image`, as described in section
[Resource Memory Association](resources.html#resources-association)

* 
[](#VUID-VkSparseImageMemoryBind-offset-01107) VUID-VkSparseImageMemoryBind-offset-01107

`offset.x` **must** be a multiple of the sparse image block width
(`VkSparseImageFormatProperties`::`imageGranularity.width`) of
the image

* 
[](#VUID-VkSparseImageMemoryBind-extent-09388) VUID-VkSparseImageMemoryBind-extent-09388

`extent.width` **must** be greater than `0`

* 
[](#VUID-VkSparseImageMemoryBind-extent-01108) VUID-VkSparseImageMemoryBind-extent-01108

`extent.width` **must** either be a multiple of the sparse image block
width of the image, or else (`extent.width` + 
`offset.x`) **must** equal the width of the image subresource

* 
[](#VUID-VkSparseImageMemoryBind-offset-01109) VUID-VkSparseImageMemoryBind-offset-01109

`offset.y` **must** be a multiple of the sparse image block height
(`VkSparseImageFormatProperties`::`imageGranularity.height`) of
the image

* 
[](#VUID-VkSparseImageMemoryBind-extent-09389) VUID-VkSparseImageMemoryBind-extent-09389

`extent.height` **must** be greater than `0`

* 
[](#VUID-VkSparseImageMemoryBind-extent-01110) VUID-VkSparseImageMemoryBind-extent-01110

`extent.height` **must** either be a multiple of the sparse image block
height of the image, or else (`extent.height` + 
`offset.y`) **must** equal the height of the image subresource

* 
[](#VUID-VkSparseImageMemoryBind-offset-01111) VUID-VkSparseImageMemoryBind-offset-01111

`offset.z` **must** be a multiple of the sparse image block depth
(`VkSparseImageFormatProperties`::`imageGranularity.depth`) of
the image

* 
[](#VUID-VkSparseImageMemoryBind-extent-09390) VUID-VkSparseImageMemoryBind-extent-09390

`extent.depth` **must** be greater than `0`

* 
[](#VUID-VkSparseImageMemoryBind-extent-01112) VUID-VkSparseImageMemoryBind-extent-01112

`extent.depth` **must** either be a multiple of the sparse image block
depth of the image, or else (`extent.depth` + 
`offset.z`) **must** equal the depth of the image subresource

* 
[](#VUID-VkSparseImageMemoryBind-memory-02732) VUID-VkSparseImageMemoryBind-memory-02732

If `memory` was created with
[VkExportMemoryAllocateInfo](memory.html#VkExportMemoryAllocateInfo)::`handleTypes` not equal to `0`, at
least one handle type it contained **must** also have been set in
[VkExternalMemoryImageCreateInfo](resources.html#VkExternalMemoryImageCreateInfo)::`handleTypes` when the image
was created

* 
[](#VUID-VkSparseImageMemoryBind-memory-02733) VUID-VkSparseImageMemoryBind-memory-02733

If `memory` was created by a memory import operation, the external
handle type of the imported memory **must** also have been set in
[VkExternalMemoryImageCreateInfo](resources.html#VkExternalMemoryImageCreateInfo)::`handleTypes` when
`image` was created

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageMemoryBind-subresource-parameter) VUID-VkSparseImageMemoryBind-subresource-parameter

 `subresource` **must** be a valid [VkImageSubresource](resources.html#VkImageSubresource) structure

* 
[](#VUID-VkSparseImageMemoryBind-memory-parameter) VUID-VkSparseImageMemoryBind-memory-parameter

 If `memory` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `memory` **must** be a valid [VkDeviceMemory](memory.html#VkDeviceMemory) handle

* 
[](#VUID-VkSparseImageMemoryBind-flags-parameter) VUID-VkSparseImageMemoryBind-flags-parameter

 `flags` **must** be a valid combination of [VkSparseMemoryBindFlagBits](#VkSparseMemoryBindFlagBits) values

To submit sparse binding operations to a queue, call:

// Provided by VK_VERSION_1_0
VkResult vkQueueBindSparse(
    VkQueue                                     queue,
    uint32_t                                    bindInfoCount,
    const VkBindSparseInfo*                     pBindInfo,
    VkFence                                     fence);

* 
`queue` is the queue that the sparse binding operations will be
submitted to.

* 
`bindInfoCount` is the number of elements in the `pBindInfo`
array.

* 
`pBindInfo` is a pointer to an array of [VkBindSparseInfo](#VkBindSparseInfo)
structures, each specifying a sparse binding submission batch.

* 
`fence` is an **optional** handle to a fence to be signaled.
If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it defines a
[fence signal operation](synchronization.html#synchronization-fences-signaling).

`vkQueueBindSparse` is a [queue submission command](devsandqueues.html#devsandqueues-submission), with each batch defined by an element of `pBindInfo` as a
[VkBindSparseInfo](#VkBindSparseInfo) structure.
Batches begin execution in the order they appear in `pBindInfo`, but
**may** complete out of order.

Within a batch, a given range of a resource **must** not be bound more than
once.
Across batches, if a range is to be bound to one allocation and offset and
then to another allocation and offset, then the application **must** guarantee
(usually using semaphores) that the binding operations are executed in the
correct order, as well as to order binding operations against the execution
of command buffer submissions.

As no operation to [vkQueueBindSparse](#vkQueueBindSparse) causes any pipeline stage to
access memory, synchronization primitives used in this command effectively
only define execution dependencies.

Additional information about fence and semaphore operation is described in
[the synchronization chapter](synchronization.html#synchronization).

Valid Usage

* 
[](#VUID-vkQueueBindSparse-fence-01113) VUID-vkQueueBindSparse-fence-01113

If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be
unsignaled

* 
[](#VUID-vkQueueBindSparse-fence-01114) VUID-vkQueueBindSparse-fence-01114

If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** not be
associated with any other queue command that has not yet completed
execution on that queue

* 
[](#VUID-vkQueueBindSparse-pSignalSemaphores-01115) VUID-vkQueueBindSparse-pSignalSemaphores-01115

Each element of the `pSignalSemaphores` member of each element of
`pBindInfo` **must** be unsignaled when the semaphore signal operation
it defines is executed on the device

* 
[](#VUID-vkQueueBindSparse-pWaitSemaphores-01116) VUID-vkQueueBindSparse-pWaitSemaphores-01116

When a semaphore wait operation referring to a binary semaphore defined
by any element of the `pWaitSemaphores` member of any element of
`pBindInfo` executes on `queue`, there **must** be no other queues
waiting on the same semaphore

* 
[](#VUID-vkQueueBindSparse-pWaitSemaphores-03245) VUID-vkQueueBindSparse-pWaitSemaphores-03245

All elements of the `pWaitSemaphores` member of all elements of
`pBindInfo` referring to a semaphore
created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_BINARY](synchronization.html#VkSemaphoreTypeKHR)
**must** reference a semaphore signal operation that has been submitted for
execution and any [semaphore    signal operations](synchronization.html#synchronization-semaphores-signaling) on which it depends **must** have also been submitted
for execution

Valid Usage (Implicit)

* 
[](#VUID-vkQueueBindSparse-queue-parameter) VUID-vkQueueBindSparse-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkQueueBindSparse-pBindInfo-parameter) VUID-vkQueueBindSparse-pBindInfo-parameter

 If `bindInfoCount` is not `0`, `pBindInfo` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindSparseInfo](#VkBindSparseInfo) structures

* 
[](#VUID-vkQueueBindSparse-fence-parameter) VUID-vkQueueBindSparse-fence-parameter

 If `fence` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `fence` **must** be a valid [VkFence](synchronization.html#VkFence) handle

* 
[](#VUID-vkQueueBindSparse-queuetype) VUID-vkQueueBindSparse-queuetype

 The `queue` **must** support [VK_QUEUE_SPARSE_BINDING_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkQueueBindSparse-commonparent) VUID-vkQueueBindSparse-commonparent

 Both of `fence`, and `queue` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
Host access to `fence` **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | VK_QUEUE_SPARSE_BINDING_BIT | - |

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkBindSparseInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBindSparseInfo {
    VkStructureType                             sType;
    const void*                                 pNext;
    uint32_t                                    waitSemaphoreCount;
    const VkSemaphore*                          pWaitSemaphores;
    uint32_t                                    bufferBindCount;
    const VkSparseBufferMemoryBindInfo*         pBufferBinds;
    uint32_t                                    imageOpaqueBindCount;
    const VkSparseImageOpaqueMemoryBindInfo*    pImageOpaqueBinds;
    uint32_t                                    imageBindCount;
    const VkSparseImageMemoryBindInfo*          pImageBinds;
    uint32_t                                    signalSemaphoreCount;
    const VkSemaphore*                          pSignalSemaphores;
} VkBindSparseInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`waitSemaphoreCount` is the number of semaphores upon which to wait
before executing the sparse binding operations for the batch.

* 
`pWaitSemaphores` is a pointer to an array of semaphores upon which
to wait on before the sparse binding operations for this batch begin
execution.
If semaphores to wait on are provided, they define a
[semaphore wait operation](synchronization.html#synchronization-semaphores-waiting).

* 
`bufferBindCount` is the number of sparse buffer bindings to perform
in the batch.

* 
`pBufferBinds` is a pointer to an array of
[VkSparseBufferMemoryBindInfo](#VkSparseBufferMemoryBindInfo) structures.

* 
`imageOpaqueBindCount` is the number of opaque sparse image bindings
to perform.

* 
`pImageOpaqueBinds` is a pointer to an array of
[VkSparseImageOpaqueMemoryBindInfo](#VkSparseImageOpaqueMemoryBindInfo) structures, indicating opaque
sparse image bindings to perform.

* 
`imageBindCount` is the number of sparse image bindings to perform.

* 
`pImageBinds` is a pointer to an array of
[VkSparseImageMemoryBindInfo](#VkSparseImageMemoryBindInfo) structures, indicating sparse image
bindings to perform.

* 
`signalSemaphoreCount` is the number of semaphores to be signaled
once the sparse binding operations specified by the structure have
completed execution.

* 
`pSignalSemaphores` is a pointer to an array of semaphores which
will be signaled when the sparse binding operations for this batch have
completed execution.
If semaphores to be signaled are provided, they define a
[semaphore signal operation](synchronization.html#synchronization-semaphores-signaling).

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes) of
each [semaphore signal operation](synchronization.html#synchronization-semaphores-signaling)
defined by this structure includes all sparse binding operations defined by
this structure.

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes) of
each [semaphore wait operation](synchronization.html#synchronization-semaphores-waiting) defined
by this structure includes all sparse binding operations defined by this
structure.

Valid Usage

* 
[](#VUID-VkBindSparseInfo-pWaitSemaphores-03246) VUID-VkBindSparseInfo-pWaitSemaphores-03246

If any element of `pWaitSemaphores` or `pSignalSemaphores` was
created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR)
then the `pNext` chain **must** include a
[VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo) structure

* 
[](#VUID-VkBindSparseInfo-pNext-03247) VUID-VkBindSparseInfo-pNext-03247

If the `pNext` chain of this structure includes a
[VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo) structure and any element of
`pWaitSemaphores` was created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) then its `waitSemaphoreValueCount`
member **must** equal `waitSemaphoreCount`

* 
[](#VUID-VkBindSparseInfo-pNext-03248) VUID-VkBindSparseInfo-pNext-03248

If the `pNext` chain of this structure includes a
[VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo) structure and any element of
`pSignalSemaphores` was created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of
[VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) then its
`signalSemaphoreValueCount` member **must** equal
`signalSemaphoreCount`

* 
[](#VUID-VkBindSparseInfo-pSignalSemaphores-03249) VUID-VkBindSparseInfo-pSignalSemaphores-03249

For each element of `pSignalSemaphores` created with a
[VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo)::`pSignalSemaphoreValues` **must**
have a value greater than the current value of the semaphore when the
[semaphore signal operation](synchronization.html#synchronization-semaphores-signaling) is
executed

* 
[](#VUID-VkBindSparseInfo-pWaitSemaphores-03250) VUID-VkBindSparseInfo-pWaitSemaphores-03250

For each element of `pWaitSemaphores` created with a
[VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo)::`pWaitSemaphoreValues` **must**
have a value which does not differ from the current value of the
semaphore or from the value of any outstanding semaphore wait or signal
operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkBindSparseInfo-pSignalSemaphores-03251) VUID-VkBindSparseInfo-pSignalSemaphores-03251

For each element of `pSignalSemaphores` created with a
[VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR) the
corresponding element of
[VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo)::`pSignalSemaphoreValues` **must**
have a value which does not differ from the current value of the
semaphore or from the value of any outstanding semaphore wait or signal
operation on that semaphore by more than
[    `maxTimelineSemaphoreValueDifference`](devsandqueues.html#limits-maxTimelineSemaphoreValueDifference)

* 
[](#VUID-VkBindSparseInfo-pNext-09753) VUID-VkBindSparseInfo-pNext-09753

If the `pNext` chain of this structure includes a
[VkFrameBoundaryTensorsARM](debugging.html#VkFrameBoundaryTensorsARM) structure then it **must** also include a
[VkFrameBoundaryEXT](debugging.html#VkFrameBoundaryEXT) structure

Valid Usage (Implicit)

* 
[](#VUID-VkBindSparseInfo-sType-sType) VUID-VkBindSparseInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_SPARSE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindSparseInfo-pNext-pNext) VUID-VkBindSparseInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupBindSparseInfo](#VkDeviceGroupBindSparseInfo), [VkFrameBoundaryEXT](debugging.html#VkFrameBoundaryEXT), [VkFrameBoundaryTensorsARM](debugging.html#VkFrameBoundaryTensorsARM), or [VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo)

* 
[](#VUID-VkBindSparseInfo-sType-unique) VUID-VkBindSparseInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBindSparseInfo-pWaitSemaphores-parameter) VUID-VkBindSparseInfo-pWaitSemaphores-parameter

 If `waitSemaphoreCount` is not `0`, `pWaitSemaphores` **must** be a valid pointer to an array of `waitSemaphoreCount` valid [VkSemaphore](synchronization.html#VkSemaphore) handles

* 
[](#VUID-VkBindSparseInfo-pBufferBinds-parameter) VUID-VkBindSparseInfo-pBufferBinds-parameter

 If `bufferBindCount` is not `0`, `pBufferBinds` **must** be a valid pointer to an array of `bufferBindCount` valid [VkSparseBufferMemoryBindInfo](#VkSparseBufferMemoryBindInfo) structures

* 
[](#VUID-VkBindSparseInfo-pImageOpaqueBinds-parameter) VUID-VkBindSparseInfo-pImageOpaqueBinds-parameter

 If `imageOpaqueBindCount` is not `0`, `pImageOpaqueBinds` **must** be a valid pointer to an array of `imageOpaqueBindCount` valid [VkSparseImageOpaqueMemoryBindInfo](#VkSparseImageOpaqueMemoryBindInfo) structures

* 
[](#VUID-VkBindSparseInfo-pImageBinds-parameter) VUID-VkBindSparseInfo-pImageBinds-parameter

 If `imageBindCount` is not `0`, `pImageBinds` **must** be a valid pointer to an array of `imageBindCount` valid [VkSparseImageMemoryBindInfo](#VkSparseImageMemoryBindInfo) structures

* 
[](#VUID-VkBindSparseInfo-pSignalSemaphores-parameter) VUID-VkBindSparseInfo-pSignalSemaphores-parameter

 If `signalSemaphoreCount` is not `0`, `pSignalSemaphores` **must** be a valid pointer to an array of `signalSemaphoreCount` valid [VkSemaphore](synchronization.html#VkSemaphore) handles

* 
[](#VUID-VkBindSparseInfo-commonparent) VUID-VkBindSparseInfo-commonparent

 Both of the elements of `pSignalSemaphores`, and the elements of `pWaitSemaphores` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

To specify the values to use when waiting for and signaling semaphores
created with a [VkSemaphoreType](synchronization.html#VkSemaphoreType) of [VK_SEMAPHORE_TYPE_TIMELINE](synchronization.html#VkSemaphoreTypeKHR),
add a [VkTimelineSemaphoreSubmitInfo](cmdbuffers.html#VkTimelineSemaphoreSubmitInfo) structure to the `pNext` chain
of the [VkBindSparseInfo](#VkBindSparseInfo) structure.

If the `pNext` chain of [VkBindSparseInfo](#VkBindSparseInfo) includes a
`VkDeviceGroupBindSparseInfo` structure, then that structure includes
device indices specifying which instance of the resources and memory are
bound.

The `VkDeviceGroupBindSparseInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDeviceGroupBindSparseInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           resourceDeviceIndex;
    uint32_t           memoryDeviceIndex;
} VkDeviceGroupBindSparseInfo;

// Provided by VK_KHR_device_group
// Equivalent to VkDeviceGroupBindSparseInfo
typedef VkDeviceGroupBindSparseInfo VkDeviceGroupBindSparseInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`resourceDeviceIndex` is a device index indicating which instance of
the resource is bound.

* 
`memoryDeviceIndex` is a device index indicating which instance of
the memory the resource instance is bound to.

These device indices apply to all buffer and image memory binds included in
the batch pointing to this structure.
The semaphore waits and signals for the batch are executed only by the
physical device specified by the `resourceDeviceIndex`.

If this structure is not present, `resourceDeviceIndex` and
`memoryDeviceIndex` are assumed to be zero.

Valid Usage

* 
[](#VUID-VkDeviceGroupBindSparseInfo-resourceDeviceIndex-01118) VUID-VkDeviceGroupBindSparseInfo-resourceDeviceIndex-01118

`resourceDeviceIndex` and `memoryDeviceIndex` **must** both be
valid device indices

* 
[](#VUID-VkDeviceGroupBindSparseInfo-memoryDeviceIndex-01119) VUID-VkDeviceGroupBindSparseInfo-memoryDeviceIndex-01119

Each memory allocation bound in this batch **must** have allocated an
instance for `memoryDeviceIndex`

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupBindSparseInfo-sType-sType) VUID-VkDeviceGroupBindSparseInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_BIND_SPARSE_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindSparseInfo](#VkBindSparseInfo)
