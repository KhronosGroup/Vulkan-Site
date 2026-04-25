# Resource Descriptors

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/descriptors.html

## Table of Contents

- [Descriptor Types](#descriptors-types)
- [Storage Image](#descriptors-storageimage)
- [Sampler](#descriptors-sampler)
- [Sampled Image](#descriptors-sampledimage)
- [Combined Image Sampler](#descriptors-combinedimagesampler)
- [Combined_Image_Sampler](#descriptors-combinedimagesampler)
- [Uniform Texel Buffer](#descriptors-uniformtexelbuffer)
- [Uniform_Texel_Buffer](#descriptors-uniformtexelbuffer)
- [Storage Texel Buffer](#descriptors-storagetexelbuffer)
- [Storage_Texel_Buffer](#descriptors-storagetexelbuffer)
- [Storage Buffer](#descriptors-storagebuffer)
- [Uniform Buffer](#descriptors-uniformbuffer)
- [Dynamic Uniform Buffer](#descriptors-uniformbufferdynamic)
- [Dynamic_Uniform_Buffer](#descriptors-uniformbufferdynamic)
- [Dynamic Storage Buffer](#descriptors-storagebufferdynamic)
- [Dynamic_Storage_Buffer](#descriptors-storagebufferdynamic)
- [Inline Uniform Block](#descriptors-inlineuniformblock)
- [Inline_Uniform_Block](#descriptors-inlineuniformblock)
- [Sample Weight Image](#descriptors-weightimage)
- [Sample_Weight_Image](#descriptors-weightimage)
- [Block Matching Image](#descriptors-blockmatch)
- [Block_Matching_Image](#descriptors-blockmatch)
- [Input Attachment](#descriptors-inputattachment)
- [Acceleration Structure](#descriptors-accelerationstructure)
- [Partitioned Acceleration Structure](#descriptors-partitionedaccelerationstructure)
- [Partitioned_Acceleration_Structure](#descriptors-partitionedaccelerationstructure)
- [Mutable](#descriptors-mutable)
- [Storage Tensor](#descriptors-storagetensor)
- [Physical Storage Buffer Access](#descriptors-physical-storage-buffer)
- [Physical_Storage_Buffer_Access](#descriptors-physical-storage-buffer)

## Content

A *descriptor* is an opaque data structure used to access shader resources
such as buffers, images, or samplers.
Rather than existing as distinct objects, descriptors are handled as opaque
data, which can be accessed by a shader through
[descriptor heaps](descriptorheaps.html#descriptorheaps),
[descriptor buffers](descriptorbuffers.html#descriptorbuffers),
or
[descriptor sets](#descriptors).

Shaders access descriptors via
the `ResourceHeapEXT` and `SamplerHeapEXT` built-ins, or through
variables decorated with `DescriptorSet` and `Binding` values linking
them to the API.
Details of the shader interface mapping are described in the
[Shader Resource Interface](interfaces.html#interfaces-resources) section.

|  | Shaders can also access buffers without going through descriptors by using
| --- | --- |
[Physical Storage Buffer Access](#descriptors-physical-storage-buffer) to
access them through 64-bit addresses. |

There are a number of different types of descriptor supported by Vulkan,
corresponding to different resources or usage.
The following sections describe the API definitions of each descriptor type.
The mapping of each type to SPIR-V is listed in the
[Shader Resource and Descriptor Type Correspondence](interfaces.html#interfaces-resources-correspondence) and [Shader Resource and Storage Class Correspondence](interfaces.html#interfaces-resources-storage-class-correspondence) tables in the
[Shader Interfaces](interfaces.html#interfaces) chapter.

Possible descriptor types are:

// Provided by VK_VERSION_1_0
typedef enum VkDescriptorType {
    VK_DESCRIPTOR_TYPE_SAMPLER = 0,
    VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER = 1,
    VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE = 2,
    VK_DESCRIPTOR_TYPE_STORAGE_IMAGE = 3,
    VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER = 4,
    VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER = 5,
    VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER = 6,
    VK_DESCRIPTOR_TYPE_STORAGE_BUFFER = 7,
    VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC = 8,
    VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC = 9,
    VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT = 10,
  // Provided by VK_VERSION_1_3
    VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK = 1000138000,
  // Provided by VK_KHR_acceleration_structure
    VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR = 1000150000,
  // Provided by VK_NV_ray_tracing
    VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV = 1000165000,
  // Provided by VK_QCOM_image_processing
    VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM = 1000440000,
  // Provided by VK_QCOM_image_processing
    VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM = 1000440001,
  // Provided by VK_ARM_tensors
    VK_DESCRIPTOR_TYPE_TENSOR_ARM = 1000460000,
  // Provided by VK_EXT_mutable_descriptor_type
    VK_DESCRIPTOR_TYPE_MUTABLE_EXT = 1000351000,
  // Provided by VK_NV_partitioned_acceleration_structure
    VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV = 1000570000,
  // Provided by VK_EXT_inline_uniform_block
    VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK_EXT = VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK,
  // Provided by VK_VALVE_mutable_descriptor_type
    VK_DESCRIPTOR_TYPE_MUTABLE_VALVE = VK_DESCRIPTOR_TYPE_MUTABLE_EXT,
} VkDescriptorType;

* 
[VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) specifies a [    sampler descriptor](#descriptors-sampler).

* 
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) specifies a
[combined image sampler descriptor](#descriptors-combinedimagesampler).

* 
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType) specifies a
[sampled image descriptor](#descriptors-sampledimage).

* 
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType) specifies a
[storage image descriptor](#descriptors-storageimage).

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType) specifies a
[uniform texel buffer descriptor](#descriptors-uniformtexelbuffer).

* 
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType) specifies a
[storage texel buffer descriptor](#descriptors-storagetexelbuffer).

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType) specifies a
[uniform buffer descriptor](#descriptors-uniformbuffer).

* 
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType) specifies a
[storage buffer descriptor](#descriptors-storagebuffer).

* 
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) specifies a
[dynamic uniform buffer descriptor](#descriptors-uniformbufferdynamic).

* 
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) specifies a
[dynamic storage buffer descriptor](#descriptors-storagebufferdynamic).

* 
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType) specifies an
[input attachment descriptor](#descriptors-inputattachment).

* 
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) specifies an
[inline uniform block](#descriptors-inlineuniformblock).

* 
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType) specifies an
[acceleration structure    descriptor](#descriptors-accelerationstructure).

* 
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType) specifies an
[acceleration structure    descriptor](#descriptors-accelerationstructure).

* 
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) specifies a [    descriptor of mutable type](#descriptors-mutable).

* 
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](#VkDescriptorType) specifies
a [partitioned    acceleration structure descriptor](#descriptors-partitionedaccelerationstructure).

* 
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](#VkDescriptorType) specifies a
[sampled weight image descriptor](#descriptors-weightimage).

* 
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](#VkDescriptorType) specifies a
[block matching image descriptor](#descriptors-blockmatch).

* 
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType) specifies a
[storage tensor descriptor](#descriptors-storagetensor).

A *storage image* ([VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType)) is a descriptor
type associated with an [image resource](resources.html#resources-images) via an
[image view](resources.html#resources-image-views) that load, store, and atomic
operations **can** be performed on.

Storage image loads are supported in all shader stages for image views whose
[format features](resources.html#resources-image-view-format-features) contain
[](formats.html#formats-properties)[VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits).

Stores to storage images are supported in
task, mesh and
compute shaders for image views whose
[format features](resources.html#resources-image-view-format-features) contain
[](formats.html#formats-properties)[VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits).

Atomic operations on storage images are supported in
task, mesh and
compute shaders for image views whose
[format features](resources.html#resources-image-view-format-features) contain
[](formats.html#formats-properties)[VK_FORMAT_FEATURE_STORAGE_IMAGE_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits).

When the [`fragmentStoresAndAtomics`](features.html#features-fragmentStoresAndAtomics) feature is enabled, stores and atomic
operations are also supported for storage images in fragment shaders with
the same set of image formats as supported in compute shaders.
When the [`vertexPipelineStoresAndAtomics`](features.html#features-vertexPipelineStoresAndAtomics) feature is enabled, stores and atomic
operations are also supported in vertex, tessellation, and geometry shaders
with the same set of image formats as supported in compute shaders.

The image subresources for a storage image **must** be in the
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) layout in order to access its data in a
shader.

When the [`tileShadingColorAttachments`](features.html#features-tileShadingColorAttachments) feature is enabled, loads using
`OpImageRead` or `OpImageSparseRead` are supported for color
[tile attachments](interfaces.html#interfaces-tile-attachment) in fragment and compute
shaders for image views whose [format features](resources.html#resources-image-view-format-features) contain [](formats.html#formats-properties)[VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits).
Additionally, when the [`tileShadingColorAttachments`](features.html#features-tileShadingColorAttachments) feature is enabled, stores using
`OpImageWrite` are supported for color attachments in compute shaders
with the same set of image formats as for loads.
When the [`tileShadingAtomicOps`](features.html#features-tileShadingAtomicOps)
feature is enabled, tile atomic operations are supported for color
attachments in compute shaders with the same set of image formats as for
loads.

When the [`tileShadingInputAttachments`](features.html#features-tileShadingInputAttachments) feature is enabled, loads using
`OpImageRead` are supported for input [tile attachments](interfaces.html#interfaces-tile-attachment) in fragment and compute shaders with the same set of image
formats as for color attachments.
Stores to input attachments are not supported.

When the [`tileShadingDepthAttachments`](features.html#features-tileShadingDepthAttachments) or
[`tileShadingStencilAttachments`](features.html#features-tileShadingStencilAttachments) feature is enabled, loads using
`OpImageRead` or `OpImageSparseRead` are supported for depth or
stencil aspects of a depth/stencil [tile attachment](interfaces.html#interfaces-tile-attachment) in fragment and compute shaders with the same set of image
formats as for color attachments.
Stores to depth/stencil attachments are not supported.

A *sampler descriptor* ([VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType)) is a descriptor
type associated with a [sampler](samplers.html#samplers) object, used to control the
behavior of [sampling operations](textures.html#textures) performed on a
[sampled image](#descriptors-sampledimage).

A *sampled image* ([VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType)) is a descriptor
type associated with an [image resource](resources.html#resources-images) via an
[image view](resources.html#resources-image-views) that [sampling operations](textures.html#textures)
**can** be performed on.

Shaders combine a sampled image variable and a sampler variable to perform
sampling operations.

Sampled images are supported in all shader stages for image views whose
[format features](resources.html#resources-image-view-format-features) contain
[](formats.html#formats-properties)[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits).

An image subresources for a sampled image **must** be in one of the following
layouts:

* 
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](resources.html#VkImageLayout)

A *combined image sampler* ([VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType))
is a single descriptor type associated with both a [sampler](samplers.html#samplers) and
an [image resource](resources.html#resources-images), combining both a
[sampler](#descriptors-sampler) and [sampled image](#descriptors-sampledimage) descriptor into a single descriptor.

If the descriptor refers to a sampler that performs
[Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) or samples a
[subsampled image](samplers.html#samplers-subsamplesampler),
the sampler **must** only be used to sample the image in the same descriptor.
Otherwise, the
sampler and image in this type of descriptor **can** be used freely with any
other samplers and images.

An image subresources for a combined image sampler **must** be in one of the
following layouts:

* 
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](resources.html#VkImageLayout)

|  | On some implementations, it **may** be more efficient to sample from an image
| --- | --- |
using a combination of sampler and sampled image that are stored together in
the descriptor set in a combined descriptor. |

A *uniform texel buffer* ([VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType)) is
a descriptor type associated with a [buffer resource](resources.html#resources-buffers)
via a [buffer view](resources.html#resources-buffer-views) that [image sampling operations](textures.html#textures) **can** be performed on.

Uniform texel buffers define a tightly-packed 1-dimensional linear array of
texels, with texels going through format conversion when read in a shader in
the same way as they are for an image.

Load operations from uniform texel buffers are supported in all shader
stages for buffer view formats which report
[format features](resources.html#resources-buffer-view-format-features) support for
[VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](formats.html#VkFormatFeatureFlagBits)

A *storage texel buffer* ([VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType)) is
a descriptor type associated with a [buffer resource](resources.html#resources-buffers)
via a [buffer view](resources.html#resources-buffer-views) that [image load, store, and atomic operations](textures.html#textures) **can** be performed on.

Storage texel buffers define a tightly-packed 1-dimensional linear array of
texels, with texels going through format conversion when read in a shader in
the same way as they are for an image.
Unlike [uniform texel buffers](#descriptors-uniformtexelbuffer), these
buffers can also be written to in the same way as for
[storage images](#descriptors-storageimage).

Storage texel buffer loads are supported in all shader stages for texel
buffer view formats which report
[format features](resources.html#resources-buffer-view-format-features) support for
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](formats.html#VkFormatFeatureFlagBits)

Stores to storage texel buffers are supported in
task, mesh and
compute shaders for texel buffer formats which report
[format features](resources.html#resources-buffer-view-format-features) support for
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](formats.html#VkFormatFeatureFlagBits)

Atomic operations on storage texel buffers are supported in
task, mesh and
compute shaders for texel buffer formats which report
[format features](resources.html#resources-buffer-view-format-features) support for
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_ATOMIC_BIT](formats.html#VkFormatFeatureFlagBits)

When the [`fragmentStoresAndAtomics`](features.html#features-fragmentStoresAndAtomics) feature is enabled, stores and atomic
operations are also supported for storage texel buffers in fragment shaders
with the same set of texel buffer formats as supported in compute shaders.
When the [`vertexPipelineStoresAndAtomics`](features.html#features-vertexPipelineStoresAndAtomics) feature is enabled, stores and atomic
operations are also supported in vertex, tessellation, and geometry shaders
with the same set of texel buffer formats as supported in compute shaders.

A *storage buffer* ([VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType)) is a descriptor
type associated with a [buffer resource](resources.html#resources-buffers) directly,
described in a shader as a structure with various members that load, store,
and atomic operations **can** be performed on.

|  | Atomic operations **can** only be performed on members of certain types as
| --- | --- |
defined in the [SPIR-V environment appendix](../appendices/spirvenv.html#spirvenv). |

A *uniform buffer* ([VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType)) is a descriptor
type associated with a [buffer resource](resources.html#resources-buffers) directly,
described in a shader as a structure with various members that load
operations **can** be performed on.

A *dynamic uniform buffer* ([VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType))
is almost identical to a [uniform buffer](#descriptors-uniformbuffer), and
differs only in how the offset into the buffer is specified.
This descriptor type is only valid when using descriptor sets.
The base offset calculated by [VkDescriptorBufferInfo](descriptorsets.html#VkDescriptorBufferInfo) when initially
[updating a descriptor set](descriptorsets.html#descriptors-sets-updates) is added to a
[dynamic offset](descriptorsets.html#descriptors-binding-dynamicoffsets) when binding a
descriptor set.

A *dynamic storage buffer* ([VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType))
is almost identical to a [storage buffer](#descriptors-storagebuffer), and
differs only in how the offset into the buffer is specified.
This descriptor type is only valid when using descriptor sets.
The base offset calculated by [VkDescriptorBufferInfo](descriptorsets.html#VkDescriptorBufferInfo) when initially
[updating a descriptor set](descriptorsets.html#descriptors-sets-updates) is added to a
[dynamic offset](descriptorsets.html#descriptors-binding-dynamicoffsets) when binding a
descriptor set.

An *inline uniform block* ([VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)) is
almost identical to a [uniform buffer](#descriptors-uniformbuffer) in how
it is accessed in the shader.
Where it differs is that its storage is taken directly from a containing
descriptor set
or descriptor buffer,
instead of being backed by a separate buffer object.
This descriptor type is not valid when using descriptor heaps; applications
**can** directly access the heap pointer in a shader or use the
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](descriptorheaps.html#VkDescriptorMappingSourceEXT) mapping.

Inline uniform blocks are typically used to access a small set of constant
data that does not require the additional flexibility provided by the
indirection enabled when using a uniform buffer where the descriptor and the
referenced buffer memory are decoupled.
Compared to push constants, they allow reusing the same set of constant data
across multiple disjoint sets of drawing and dispatching commands.

Inline uniform block descriptors **cannot** be aggregated into arrays.
Instead, the array size specified for an inline uniform block descriptor
binding specifies the binding’s capacity in bytes.

A *sample weight image* ([VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](#VkDescriptorType))
is a descriptor type associated with an [image resource](resources.html#resources-images)
via an [image view](resources.html#resources-image-views) that **can** be used in
[weight image sampling](textures.html#textures-weightimage).
The image view **must** have been created with
[VkImageViewSampleWeightCreateInfoQCOM](resources.html#VkImageViewSampleWeightCreateInfoQCOM).

Shaders **can** combine a weight image variable, a sampled image variable, and
a sampler variable to perform [weight image sampling](textures.html#textures-weightimage).

Weight image sampling is supported in all shader stages if the weight image
view specifies a format that supports
[format feature](resources.html#resources-image-view-format-features)
[](formats.html#formats-properties)[VK_FORMAT_FEATURE_2_WEIGHT_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR) and
the sampled image view specifies a format that supports
[format feature](resources.html#resources-image-view-format-features)
[](formats.html#formats-properties)[VK_FORMAT_FEATURE_2_WEIGHT_SAMPLED_IMAGE_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

The image subresources for the weight image **must** be in the
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) layout in order to access its data in a
shader.

A *block matching image* ([VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](#VkDescriptorType))
is a descriptor type associated with an [image resource](resources.html#resources-images)
via an [image view](resources.html#resources-image-views) that **can** be used in
[block matching](textures.html#textures-blockmatch).

Shaders **can** combine a target image variable, a reference image variable,
and a sampler variable to perform [block matching](textures.html#textures-blockmatch).

Block matching is supported in all shader stages for if both the target view
and reference view specifies a format that supports
[format feature](resources.html#resources-image-view-format-features)
[](formats.html#formats-properties)[VK_FORMAT_FEATURE_2_BLOCK_MATCHING_BIT_QCOM](formats.html#VkFormatFeatureFlagBits2KHR)

The image subresources for block matching **must** be in the
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), or
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) layout in order to access its data in a
shader.

An *input attachment* ([VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType)) is a
descriptor type associated with an [image resource](resources.html#resources-images) via
an [image view](resources.html#resources-image-views) that **can** be used for
[framebuffer local](synchronization.html#synchronization-framebuffer-regions) load operations in
fragment shaders.

All image formats that are supported for color attachments
([VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)
or [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)
) or depth/stencil attachments
([VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)) for a given image
tiling mode are also supported for input attachments.

An image view used as an input attachment **must** be in one of the following
layouts:

* 
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](resources.html#VkImageLayout)

An *acceleration structure* (
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType)
or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType)
) is a descriptor type that is used to retrieve scene geometry from within
shaders that are used for ray traversal.
Shaders have read-only access to the memory.

A *partitioned acceleration structure*
([VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](#VkDescriptorType)) is a
descriptor type that references a built partitioned top-level acceleration
structure (PTLAS), as defined in [Partitioned Top Level Acceleration Structures](accelstructures.html#partitioned-tlas).
It is used to retrieve scene geometry from within shaders that are used for
ray traversal.
From the perspective of ray tracing shaders, a PTLAS descriptor behaves
identically to a conventional top-level acceleration structure descriptor.
Shaders have read-only access to the memory.

A descriptor of *mutable* ([VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)) type
indicates that this descriptor **can** mutate to a number of different types.
This descriptor type is not valid when using descriptor heaps, as the
elements of a descriptor heap **can** be manually adjusted to hold different
descriptor types already.
When specified in a descriptor set layout, any of the descriptor types given
in the [VkMutableDescriptorTypeListEXT](descriptorsets.html#VkMutableDescriptorTypeListEXT)::`pDescriptorTypes` list of
descriptor types in the `pNext` chain of
[VkDescriptorSetLayoutCreateInfo](descriptorsets.html#VkDescriptorSetLayoutCreateInfo) for this binding.
At any point, each individual descriptor of mutable type has an active
descriptor type.
The active descriptor type **can** be any one of the declared types in
`pDescriptorTypes`.
Additionally, a mutable descriptor’s active descriptor type **can** be of the
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) type, which is the initial active
descriptor type.
The active descriptor type **can** change when the descriptor is updated.
When a descriptor is consumed by binding a descriptor
buffer or
set, the active descriptor type is considered, not
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType).

An active descriptor type of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) is
considered an **undefined** descriptor.
If a descriptor is consumed where the active descriptor type does not match
what the shader expects, the descriptor is considered an **undefined**
descriptor.

|  | To find which descriptor types are supported as
| --- | --- |
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), the application **can** use
[vkGetDescriptorSetLayoutSupport](descriptorsets.html#vkGetDescriptorSetLayoutSupport) with a
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) binding, with the list of descriptor
types to query in the
[VkMutableDescriptorTypeCreateInfoEXT](descriptorsets.html#VkMutableDescriptorTypeCreateInfoEXT)::`pMutableDescriptorTypeLists`
array for that binding. |

|  | The intention of a mutable descriptor type is that implementations allocate
| --- | --- |
N bytes per descriptor, where N is determined by the maximum descriptor size
for a given descriptor binding.
Implementations are not expected to keep track of the active descriptor
type, and it should be considered a C-like union type.

A mutable descriptor type is not considered as efficient in terms of runtime
performance as using a non-mutable descriptor type, and applications are not
encouraged to use them outside API layering efforts.
Mutable descriptor types can be more efficient if the alternative is using
many different descriptors to emulate mutable descriptor types. |

A *storage tensor* ([VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType)) is a descriptor
type associated with a [tensor resource](resources.html#resources-tensors) via a
[tensor view](resources.html#resources-tensor-views) that read and write operations **can**
be performed on.

Storage tensor reads and writes are supported in shaders for tensor views
whose [format features](resources.html#resources-tensor-view-format-features) contain
[](formats.html#formats-properties)[VK_FORMAT_FEATURE_2_TENSOR_SHADER_BIT_ARM](formats.html#VkFormatFeatureFlagBits2KHR).

Storage tensor reads and writes are supported in graph pipelines for tensor
views whose [format features](resources.html#resources-tensor-view-format-features)
contain
[](formats.html#formats-properties)[VK_FORMAT_FEATURE_2_TENSOR_DATA_GRAPH_BIT_ARM](formats.html#VkFormatFeatureFlagBits2KHR).

[Buffer device addresses](resources.html#resources-buffer-device-addresses) **can** also be
used to access buffer memory in a shader, using the
`SPV_KHR_physical_storage_buffer` extension
or the equivalent
`SPV_EXT_physical_storage_buffer` extension
and the `PhysicalStorageBuffer` storage class.
For example, this value **can** be stored in a uniform buffer, and the shader
**can** read the value from the uniform buffer and use it to do a dependent
read/write to this buffer.
All loads, stores, and atomics in a shader through
`PhysicalStorageBuffer` pointers **must** access addresses in the address
range of some buffer.
