# Resource Descriptors

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/descriptorsets.html

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
- [Mutable](#descriptors-mutable)
- [Storage Tensor](#descriptors-storagetensor)
- [Descriptor Sets](#descriptors-sets)
- [Descriptor Set Layout](#descriptors-setlayout)
- [Descriptor_Set_Layout](#descriptors-setlayout)
- [Pipeline Layouts](#descriptors-pipelinelayout)
- [Pipeline Layout Compatibility](#descriptors-compatibility)
- [Pipeline_Layout_Compatibility](#descriptors-compatibility)
- [Allocation of Descriptor Sets](#descriptors-allocation)
- [Allocation_of_Descriptor_Sets](#descriptors-allocation)
- [Descriptor Set Updates](#descriptors-sets-updates)
- [Descriptor_Set_Updates](#descriptors-sets-updates)
- [Descriptor Update Templates](#descriptors-sets-updates-with-template)
- [Descriptor_Update_Templates](#descriptors-sets-updates-with-template)
- [Descriptor Set Updates With Templates](#_descriptor_set_updates_with_templates)
- [Descriptor_Set_Updates_With_Templates](#_descriptor_set_updates_with_templates)
- [Descriptor Set Binding](#descriptors-binding)
- [Descriptor_Set_Binding](#descriptors-binding)
- [Push Descriptor Updates](#descriptors-push-descriptors)
- [Push_Descriptor_Updates](#descriptors-push-descriptors)
- [Push Descriptor Updates With Descriptor Update Templates](#_push_descriptor_updates_with_descriptor_update_templates)
- [Push_Descriptor_Updates_With_Descriptor_Update_Templates](#_push_descriptor_updates_with_descriptor_update_templates)
- [Push Constant Updates](#descriptors-push-constants)
- [Push_Constant_Updates](#descriptors-push-constants)
- [Physical Storage Buffer Access](#descriptors-physical-storage-buffer)
- [Physical_Storage_Buffer_Access](#descriptors-physical-storage-buffer)
- [Descriptor Buffers](#descriptorbuffers)
- [Putting Descriptors in Memory](#descriptorbuffers-puttingdescriptorsinmemory)
- [Putting_Descriptors_in_Memory](#descriptorbuffers-puttingdescriptorsinmemory)
- [Binding Descriptor Buffers](#descriptorbuffers-binding)
- [Binding_Descriptor_Buffers](#descriptorbuffers-binding)
- [Updating Descriptor Buffers](#descriptorbuffers-updates)
- [Updating_Descriptor_Buffers](#descriptorbuffers-updates)
- [Push Descriptors With Descriptor Buffers](#descriptorbuffers-push-descriptors)
- [Push_Descriptors_With_Descriptor_Buffers](#descriptorbuffers-push-descriptors)
- [Capture and Replay](#descriptorbuffers-capturereplay)
- [Capture_and_Replay](#descriptorbuffers-capturereplay)

## Content

A *descriptor* is an opaque data structure used to access shader resources
such as buffers, images, or samplers.
Rather than existing as distinct objects, descriptors are handled as opaque
data, which can be accessed by a shader through
[descriptor heaps](descriptorheaps.html#descriptorheaps),
[descriptor buffers](#descriptorbuffers),
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
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) specifies a [    descriptor of mutable type](#descriptors-mutable).

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
The base offset calculated by [VkDescriptorBufferInfo](#VkDescriptorBufferInfo) when initially
[updating a descriptor set](#descriptors-sets-updates) is added to a
[dynamic offset](#descriptors-binding-dynamicoffsets) when binding a
descriptor set.

A *dynamic storage buffer* ([VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType))
is almost identical to a [storage buffer](#descriptors-storagebuffer), and
differs only in how the offset into the buffer is specified.
This descriptor type is only valid when using descriptor sets.
The base offset calculated by [VkDescriptorBufferInfo](#VkDescriptorBufferInfo) when initially
[updating a descriptor set](#descriptors-sets-updates) is added to a
[dynamic offset](#descriptors-binding-dynamicoffsets) when binding a
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

A descriptor of *mutable* ([VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)) type
indicates that this descriptor **can** mutate to a number of different types.
This descriptor type is not valid when using descriptor heaps, as the
elements of a descriptor heap **can** be manually adjusted to hold different
descriptor types already.
When specified in a descriptor set layout, any of the descriptor types given
in the [VkMutableDescriptorTypeListEXT](#VkMutableDescriptorTypeListEXT)::`pDescriptorTypes` list of
descriptor types in the `pNext` chain of
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) for this binding.
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
[vkGetDescriptorSetLayoutSupport](#vkGetDescriptorSetLayoutSupport) with a
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) binding, with the list of descriptor
types to query in the
[VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT)::`pMutableDescriptorTypeLists`
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

Descriptors are grouped together into descriptor set objects.
A descriptor set object is an opaque object containing storage for a set of
descriptors, where the types and number of descriptors is defined by a
descriptor set layout.
The layout object **may** be used to define the association of each descriptor
binding with memory or other implementation resources.
The layout is used both for determining the resources that need to be
associated with the descriptor set, and determining the interface between
shader stages and shader resources.

|  | When available, applications can use [descriptor heaps](descriptorheaps.html#descriptorheaps)
| --- | --- |
as a powerful and flexible alternative to descriptor sets. |

A descriptor set layout object is defined by an array of zero or more
descriptor bindings.
Each individual descriptor binding is specified by a descriptor type, a
count (array size) of the number of descriptors in the binding, a set of
shader stages that **can** access the binding, and (if using immutable
samplers) an array of sampler descriptors.

Descriptor set layout objects are represented by `VkDescriptorSetLayout`
handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDescriptorSetLayout)

To create descriptor set layout objects, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateDescriptorSetLayout(
    VkDevice                                    device,
    const VkDescriptorSetLayoutCreateInfo*      pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDescriptorSetLayout*                      pSetLayout);

* 
`device` is the logical device that creates the descriptor set
layout.

* 
`pCreateInfo` is a pointer to a
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) structure specifying the state of
the descriptor set layout object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pSetLayout` is a pointer to a [VkDescriptorSetLayout](#VkDescriptorSetLayout) handle in
which the resulting descriptor set layout object is returned.

Valid Usage

* 
[](#VUID-vkCreateDescriptorSetLayout-support-09582) VUID-vkCreateDescriptorSetLayout-support-09582

If the descriptor layout exceeds the limits reported through the
[physical device limits](limits.html#limits), then
[vkGetDescriptorSetLayoutSupport](#vkGetDescriptorSetLayoutSupport) **must** have returned
[VkDescriptorSetLayoutSupport](#VkDescriptorSetLayoutSupport) with `support` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) for `pCreateInfo`

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDescriptorSetLayout-device-parameter) VUID-vkCreateDescriptorSetLayout-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateDescriptorSetLayout-pCreateInfo-parameter) VUID-vkCreateDescriptorSetLayout-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) structure

* 
[](#VUID-vkCreateDescriptorSetLayout-pAllocator-parameter) VUID-vkCreateDescriptorSetLayout-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDescriptorSetLayout-pSetLayout-parameter) VUID-vkCreateDescriptorSetLayout-pSetLayout-parameter

 `pSetLayout` **must** be a valid pointer to a [VkDescriptorSetLayout](#VkDescriptorSetLayout) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the descriptor set layout is passed in a
`VkDescriptorSetLayoutCreateInfo` structure:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorSetLayoutCreateInfo {
    VkStructureType                        sType;
    const void*                            pNext;
    VkDescriptorSetLayoutCreateFlags       flags;
    uint32_t                               bindingCount;
    const VkDescriptorSetLayoutBinding*    pBindings;
} VkDescriptorSetLayoutCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask
of [VkDescriptorSetLayoutCreateFlagBits](#VkDescriptorSetLayoutCreateFlagBits)
specifying options for descriptor set layout creation.

* 
`bindingCount` is the number of elements in `pBindings`.

* 
`pBindings` is a pointer to an array of
[VkDescriptorSetLayoutBinding](#VkDescriptorSetLayoutBinding) structures.

Valid Usage

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-binding-00279) VUID-VkDescriptorSetLayoutCreateInfo-binding-00279

If the [`perStageDescriptorSet`](features.html#features-perStageDescriptorSet)
feature is not enabled, or `flags` does not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](#VkDescriptorSetLayoutCreateFlagBits), then the
[VkDescriptorSetLayoutBinding](#VkDescriptorSetLayoutBinding)::`binding` members of the
elements of the `pBindings` array **must** each have different values

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-10354) VUID-VkDescriptorSetLayoutCreateInfo-flags-10354

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits),
and the [VK_KHR_push_descriptor](../appendices/extensions.html#VK_KHR_push_descriptor) extension is not enabled,
[`pushDescriptor`](features.html#features-pushDescriptor) **must** be enabled

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-00280) VUID-VkDescriptorSetLayoutCreateInfo-flags-00280

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits), then all
elements of `pBindings` **must** not have a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-02208) VUID-VkDescriptorSetLayoutCreateInfo-flags-02208

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits), then all
elements of `pBindings` **must** not have a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-00281) VUID-VkDescriptorSetLayoutCreateInfo-flags-00281

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits), then the
total number of elements of all bindings **must** be less than or equal to
[VkPhysicalDevicePushDescriptorProperties](limits.html#VkPhysicalDevicePushDescriptorProperties)::`maxPushDescriptors`

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-04590) VUID-VkDescriptorSetLayoutCreateInfo-flags-04590

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits), `flags`
**must** not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-04591) VUID-VkDescriptorSetLayoutCreateInfo-flags-04591

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits),
`pBindings` **must** not have a `descriptorType` of
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-03000) VUID-VkDescriptorSetLayoutCreateInfo-flags-03000

If any binding has the [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)
bit set, `flags` **must** include
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-descriptorType-03001) VUID-VkDescriptorSetLayoutCreateInfo-descriptorType-03001

If any binding has the [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)
bit set, then all bindings **must** not have `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-04592) VUID-VkDescriptorSetLayoutCreateInfo-flags-04592

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits),
`flags` **must** not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-pBindings-07303) VUID-VkDescriptorSetLayoutCreateInfo-pBindings-07303

If any element `pBindings`[i] has a `descriptorType` of
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), then the `pNext` chain **must**
include a [VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT) structure, and
`mutableDescriptorTypeListCount` **must** be greater than i

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-descriptorType-04594) VUID-VkDescriptorSetLayoutCreateInfo-descriptorType-04594

If a binding has a `descriptorType` value of
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), then `pImmutableSamplers`
**must** be `NULL`

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-mutableDescriptorType-04595) VUID-VkDescriptorSetLayoutCreateInfo-mutableDescriptorType-04595

If
[VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](features.html#VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT)::`mutableDescriptorType`
is not enabled, `pBindings` **must** not contain a `descriptorType`
of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-04596) VUID-VkDescriptorSetLayoutCreateInfo-flags-04596

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits),
[VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](features.html#VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT)::`mutableDescriptorType`
**must** be enabled

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-08000) VUID-VkDescriptorSetLayoutCreateInfo-flags-08000

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits), then
all elements of `pBindings` **must** not have a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-08001) VUID-VkDescriptorSetLayoutCreateInfo-flags-08001

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits),
`flags` **must** also contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-08002) VUID-VkDescriptorSetLayoutCreateInfo-flags-08002

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits), then
`flags` **must** not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-08003) VUID-VkDescriptorSetLayoutCreateInfo-flags-08003

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits), then
`flags` **must** not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-09463) VUID-VkDescriptorSetLayoutCreateInfo-flags-09463

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](#VkDescriptorSetLayoutCreateFlagBits), then
[`perStageDescriptorSet`](features.html#features-perStageDescriptorSet) **must** be
enabled

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-09464) VUID-VkDescriptorSetLayoutCreateInfo-flags-09464

If `flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](#VkDescriptorSetLayoutCreateFlagBits), then there **must**
not be any two elements of the `pBindings` array with the same
[VkDescriptorSetLayoutBinding](#VkDescriptorSetLayoutBinding)::`binding` value and their
[VkDescriptorSetLayoutBinding](#VkDescriptorSetLayoutBinding)::`stageFlags` containing the same
bit

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-sType-sType) VUID-VkDescriptorSetLayoutCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-pNext-pNext) VUID-VkDescriptorSetLayoutCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDescriptorSetLayoutBindingFlagsCreateInfo](#VkDescriptorSetLayoutBindingFlagsCreateInfo) or [VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT)

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-sType-unique) VUID-VkDescriptorSetLayoutCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-flags-parameter) VUID-VkDescriptorSetLayoutCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkDescriptorSetLayoutCreateFlagBits](#VkDescriptorSetLayoutCreateFlagBits) values

* 
[](#VUID-VkDescriptorSetLayoutCreateInfo-pBindings-parameter) VUID-VkDescriptorSetLayoutCreateInfo-pBindings-parameter

 If `bindingCount` is not `0`, `pBindings` **must** be a valid pointer to an array of `bindingCount` valid [VkDescriptorSetLayoutBinding](#VkDescriptorSetLayoutBinding) structures

If the `pNext` chain of a [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) or
[VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo) structure includes a
[VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT) structure, then that structure
specifies Information about the possible descriptor types for mutable
descriptor types.

The `VkMutableDescriptorTypeCreateInfoEXT` structure is defined as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_mutable_descriptor_type
typedef struct VkMutableDescriptorTypeCreateInfoEXT {
    VkStructureType                          sType;
    const void*                              pNext;
    uint32_t                                 mutableDescriptorTypeListCount;
    const VkMutableDescriptorTypeListEXT*    pMutableDescriptorTypeLists;
} VkMutableDescriptorTypeCreateInfoEXT;

// Provided by VK_VALVE_mutable_descriptor_type
// Equivalent to VkMutableDescriptorTypeCreateInfoEXT
typedef VkMutableDescriptorTypeCreateInfoEXT VkMutableDescriptorTypeCreateInfoVALVE;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mutableDescriptorTypeListCount` is the number of elements in
`pMutableDescriptorTypeLists`.

* 
`pMutableDescriptorTypeLists` is a pointer to an array of
`VkMutableDescriptorTypeListEXT` structures.

If `mutableDescriptorTypeListCount` is zero or if this structure is not
included in the `pNext` chain, the [VkMutableDescriptorTypeListEXT](#VkMutableDescriptorTypeListEXT)
for each element is considered to be zero or `NULL` for each member.
Otherwise, the descriptor set layout binding at
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`pBindings`[i] uses the
descriptor type lists in
[VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT)::`pMutableDescriptorTypeLists`[i].

Valid Usage (Implicit)

* 
[](#VUID-VkMutableDescriptorTypeCreateInfoEXT-sType-sType) VUID-VkMutableDescriptorTypeCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MUTABLE_DESCRIPTOR_TYPE_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMutableDescriptorTypeCreateInfoEXT-pMutableDescriptorTypeLists-parameter) VUID-VkMutableDescriptorTypeCreateInfoEXT-pMutableDescriptorTypeLists-parameter

 If `mutableDescriptorTypeListCount` is not `0`, `pMutableDescriptorTypeLists` **must** be a valid pointer to an array of `mutableDescriptorTypeListCount` valid [VkMutableDescriptorTypeListEXT](#VkMutableDescriptorTypeListEXT) structures

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)

* 
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)

The list of potential descriptor types a given mutable descriptor **can**
mutate to is passed in a `VkMutableDescriptorTypeListEXT` structure.

The `VkMutableDescriptorTypeListEXT` structure is defined as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_mutable_descriptor_type
typedef struct VkMutableDescriptorTypeListEXT {
    uint32_t                   descriptorTypeCount;
    const VkDescriptorType*    pDescriptorTypes;
} VkMutableDescriptorTypeListEXT;

// Provided by VK_VALVE_mutable_descriptor_type
// Equivalent to VkMutableDescriptorTypeListEXT
typedef VkMutableDescriptorTypeListEXT VkMutableDescriptorTypeListVALVE;

* 
`descriptorTypeCount` is the number of elements in
`pDescriptorTypes`.

* 
`pDescriptorTypes` is `NULL` or a pointer to an array of
`descriptorTypeCount` [VkDescriptorType](#VkDescriptorType) values defining which
descriptor types a given binding may mutate to.

Valid Usage

* 
[](#VUID-VkMutableDescriptorTypeListEXT-descriptorTypeCount-04597) VUID-VkMutableDescriptorTypeListEXT-descriptorTypeCount-04597

`descriptorTypeCount` **must** not be `0` if the corresponding binding
is of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04598) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04598

`pDescriptorTypes` **must** be a valid pointer to an array of
`descriptorTypeCount` valid, unique [VkDescriptorType](#VkDescriptorType) values if
the given binding is of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) type

* 
[](#VUID-VkMutableDescriptorTypeListEXT-descriptorTypeCount-04599) VUID-VkMutableDescriptorTypeListEXT-descriptorTypeCount-04599

`descriptorTypeCount` **must** be `0` if the corresponding binding is
not of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04600) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04600

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04601) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04601

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04602) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04602

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04603) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-04603

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-09696) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-09696

`pDescriptorTypes` **must** not contain
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType)

Valid Usage (Implicit)

* 
[](#VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-parameter) VUID-VkMutableDescriptorTypeListEXT-pDescriptorTypes-parameter

 If `descriptorTypeCount` is not `0`, `pDescriptorTypes` **must** be a valid pointer to an array of `descriptorTypeCount` valid [VkDescriptorType](#VkDescriptorType) values

Bits which **can** be set in
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`flags`, specifying options for
descriptor set layout, are:

// Provided by VK_VERSION_1_0
typedef enum VkDescriptorSetLayoutCreateFlagBits {
  // Provided by VK_VERSION_1_2
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT = 0x00000002,
  // Provided by VK_VERSION_1_4
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT = 0x00000001,
  // Provided by VK_EXT_descriptor_buffer
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT = 0x00000010,
  // Provided by VK_EXT_descriptor_buffer
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT = 0x00000020,
  // Provided by VK_NV_device_generated_commands_compute
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_INDIRECT_BINDABLE_BIT_NV = 0x00000080,
  // Provided by VK_EXT_mutable_descriptor_type
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT = 0x00000004,
  // Provided by VK_NV_per_stage_descriptor_set
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV = 0x00000040,
  // Provided by VK_KHR_push_descriptor
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT_KHR = VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT,
  // Provided by VK_EXT_descriptor_indexing
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT_EXT = VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT,
  // Provided by VK_VALVE_mutable_descriptor_type
    VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_VALVE = VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT,
} VkDescriptorSetLayoutCreateFlagBits;

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits) specifies that
descriptor sets **must** not be allocated using this layout, and
descriptors are instead pushed by [vkCmdPushDescriptorSet](#vkCmdPushDescriptorSet).

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits)
specifies that descriptor sets using this layout **must** be allocated from
a descriptor pool created with the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits) bit set.
Descriptor set layouts created with this bit set have alternate limits
for the maximum number of descriptors per-stage and per-pipeline layout.
The non-UpdateAfterBind limits only count descriptors in sets created
without this flag.
The UpdateAfterBind limits count all descriptors, but the limits **may** be
higher than the non-UpdateAfterBind limits.

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_INDIRECT_BINDABLE_BIT_NV](#VkDescriptorSetLayoutCreateFlagBits) specifies
that descriptor sets using this layout allows them to be bound with
compute pipelines that are created with
[VK_PIPELINE_CREATE_INDIRECT_BINDABLE_BIT_NV](pipelines.html#VkPipelineCreateFlagBits) flag set to be used in
[Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
specifies that this layout **must** only be used with descriptor buffers.

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
specifies that this is a layout only containing immutable samplers that
**can** be bound by [vkCmdBindDescriptorBufferEmbeddedSamplersEXT](#vkCmdBindDescriptorBufferEmbeddedSamplersEXT).
Unlike normal immutable samplers, embedded immutable samplers do not
require the application to provide them in a descriptor buffer.

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) specifies
that descriptor sets using this layout **must** be allocated from a
descriptor pool created with the
[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](#VkDescriptorPoolCreateFlagBits) bit set.
Descriptor set layouts created with this bit have no expressible limit
for maximum number of descriptors per-stage.
Host descriptor sets are limited only by available host memory, but **may**
be limited for implementation specific reasons.
Implementations **may** limit the number of supported descriptors to
UpdateAfterBind limits or non-UpdateAfterBind limits, whichever is
larger.

* 
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](#VkDescriptorSetLayoutCreateFlagBits) specifies that
binding numbers in descriptor sets using this layout **may** represent
different resources and/or types of resources in each stage.

// Provided by VK_VERSION_1_0
typedef VkFlags VkDescriptorSetLayoutCreateFlags;

`VkDescriptorSetLayoutCreateFlags` is a bitmask type for setting a mask
of zero or more [VkDescriptorSetLayoutCreateFlagBits](#VkDescriptorSetLayoutCreateFlagBits).

The `VkDescriptorSetLayoutBinding` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorSetLayoutBinding {
    uint32_t              binding;
    VkDescriptorType      descriptorType;
    uint32_t              descriptorCount;
    VkShaderStageFlags    stageFlags;
    const VkSampler*      pImmutableSamplers;
} VkDescriptorSetLayoutBinding;

* 
`binding` is the binding number of this entry and corresponds to a
resource of the same binding number in the shader stages.

* 
`descriptorType` is a [VkDescriptorType](#VkDescriptorType) specifying which type
of resource descriptors are used for this binding.

* 
`descriptorCount` is the number of descriptors contained in the
binding, accessed in a shader as an
array, except if `descriptorType` is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) in which case
`descriptorCount` is the size in bytes of the inline uniform block.
If `descriptorCount` is zero this binding entry is reserved and the
resource **must** not be accessed from any stage via this binding within
any pipeline using the set layout.

* 
`stageFlags` member is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits)
specifying which pipeline shader stages **can** access a resource for this
binding.
[VK_SHADER_STAGE_ALL](pipelines.html#VkShaderStageFlagBits) is a shorthand specifying that all defined
shader stages, including any additional stages defined by extensions,
**can** access the resource.

If a shader stage is not included in `stageFlags`, then a resource **must**
not be accessed from that stage via this binding within any pipeline using
the set layout.
Other than input attachments which are limited to the fragment shader, there
are no limitations on what combinations of stages **can** use a descriptor
binding, and in particular a binding **can** be used by both graphics stages
and the compute stage.

* 
`pImmutableSamplers` affects initialization of samplers.
If `descriptorType` specifies a [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) type descriptor, then
`pImmutableSamplers` **can** be used to initialize a set of *immutable
samplers*.
Immutable samplers are permanently bound into the set layout and **must**
not be changed; updating a [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) descriptor
with immutable samplers is not allowed and updates to a
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) descriptor with
immutable samplers does not modify the samplers (the image views are
updated, but the sampler updates are ignored).
If `pImmutableSamplers` is not `NULL`, then it is a pointer to an
array of sampler handles that will be copied into the set layout and
used for the corresponding binding.
Only the sampler handles are copied; the sampler objects **must** not be
destroyed before the final use of the set layout and any descriptor
pools and sets created using it.
If `pImmutableSamplers` is `NULL`, then the sampler slots are
dynamic and sampler handles **must** be bound into descriptor sets using
this layout.
If `descriptorType` is not one of these descriptor types, then
`pImmutableSamplers` is ignored.

The above layout definition allows the descriptor bindings to be specified
sparsely such that not all binding numbers between 0 and the maximum binding
number need to be specified in the `pBindings` array.
Bindings that are not specified have a `descriptorCount` and
`stageFlags` of zero, and the value of `descriptorType` is
**undefined**.
However, all binding numbers between 0 and the maximum binding number in the
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`pBindings` array **may** consume
memory in the descriptor set layout even if not all descriptor bindings are
used, though it **should** not consume additional memory from the descriptor
pool.

|  | The maximum binding number specified **should** be as compact as possible to
| --- | --- |
avoid wasted memory. |

Valid Usage

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorType-00282) VUID-VkDescriptorSetLayoutBinding-descriptorType-00282

If `descriptorType` is [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), and
`descriptorCount` is not `0` and `pImmutableSamplers` is not
`NULL`, `pImmutableSamplers` **must** be a valid pointer to an array of
`descriptorCount` valid `VkSampler` handles

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorType-12200) VUID-VkDescriptorSetLayoutBinding-descriptorType-12200

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), and
`descriptorCount` is not `0` and `pImmutableSamplers` is not
`NULL`, either each element of `pImmutableSamplers` **must** be a
`VkSampler` that enables [sampler Y′CBCR    conversion](samplers.html#samplers-YCbCr-conversion) or none of them enable sampler Y′CBCR conversion

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorType-12215) VUID-VkDescriptorSetLayoutBinding-descriptorType-12215

If `descriptorType` is [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType), each
element of `pImmutableSamplers` **must** not be a `VkSampler`
object that enables [sampler Y′CBCR    conversion](samplers.html#samplers-YCbCr-conversion)

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorType-04604) VUID-VkDescriptorSetLayoutBinding-descriptorType-04604

If the [`inlineUniformBlock`](features.html#features-inlineUniformBlock) feature
is not enabled, `descriptorType` **must** not be
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorType-02209) VUID-VkDescriptorSetLayoutBinding-descriptorType-02209

If `descriptorType` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)
then `descriptorCount` **must** be a multiple of `4`

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorType-08004) VUID-VkDescriptorSetLayoutBinding-descriptorType-08004

If `descriptorType` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)
and [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`flags` does not contain
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
then `descriptorCount` **must** be less than or equal to
`VkPhysicalDeviceInlineUniformBlockProperties`::`maxInlineUniformBlockSize`

* 
[](#VUID-VkDescriptorSetLayoutBinding-flags-08005) VUID-VkDescriptorSetLayoutBinding-flags-08005

If [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits),
`descriptorType` **must** be [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType)

* 
[](#VUID-VkDescriptorSetLayoutBinding-flags-08006) VUID-VkDescriptorSetLayoutBinding-flags-08006

If [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits),
`descriptorCount` **must** be less than or equal to `1`

* 
[](#VUID-VkDescriptorSetLayoutBinding-flags-08007) VUID-VkDescriptorSetLayoutBinding-flags-08007

If [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits),
and `descriptorCount` is equal to `1`, `pImmutableSamplers`
**must** not be `NULL`

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorCount-09465) VUID-VkDescriptorSetLayoutBinding-descriptorCount-09465

If `descriptorCount` is not `0`, `stageFlags` **must** be
[VK_SHADER_STAGE_ALL](pipelines.html#VkShaderStageFlagBits) or a valid combination of other
[VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorType-01510) VUID-VkDescriptorSetLayoutBinding-descriptorType-01510

If `descriptorType` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType) and
`descriptorCount` is not `0`, then `stageFlags` **must** be `0` or
[VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits)

* 
[](#VUID-VkDescriptorSetLayoutBinding-pImmutableSamplers-04009) VUID-VkDescriptorSetLayoutBinding-pImmutableSamplers-04009

The sampler objects indicated by `pImmutableSamplers` **must** not have
a `borderColor` with one of the values
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor)

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorType-04605) VUID-VkDescriptorSetLayoutBinding-descriptorType-04605

If `descriptorType` is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), then
`pImmutableSamplers` **must** be `NULL`

* 
[](#VUID-VkDescriptorSetLayoutBinding-flags-09466) VUID-VkDescriptorSetLayoutBinding-flags-09466

If [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`flags` contains
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PER_STAGE_BIT_NV](#VkDescriptorSetLayoutCreateFlagBits), and
`descriptorCount` is not `0`, then `stageFlags` **must** be a valid
combination of [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_CONTROL_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_TESSELLATION_EVALUATION_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_GEOMETRY_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits)
and [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) values

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetLayoutBinding-descriptorType-parameter) VUID-VkDescriptorSetLayoutBinding-descriptorType-parameter

 `descriptorType` **must** be a valid [VkDescriptorType](#VkDescriptorType) value

If the `pNext` chain of a [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)
structure includes a [VkDescriptorSetLayoutBindingFlagsCreateInfo](#VkDescriptorSetLayoutBindingFlagsCreateInfo)
structure, then that structure includes an array of flags, one for each
descriptor set layout binding.

The [VkDescriptorSetLayoutBindingFlagsCreateInfo](#VkDescriptorSetLayoutBindingFlagsCreateInfo) structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkDescriptorSetLayoutBindingFlagsCreateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    uint32_t                           bindingCount;
    const VkDescriptorBindingFlags*    pBindingFlags;
} VkDescriptorSetLayoutBindingFlagsCreateInfo;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkDescriptorSetLayoutBindingFlagsCreateInfo
typedef VkDescriptorSetLayoutBindingFlagsCreateInfo VkDescriptorSetLayoutBindingFlagsCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`bindingCount` is zero or the number of elements in
`pBindingFlags`.

* 
`pBindingFlags` is a pointer to an array of
[VkDescriptorBindingFlags](#VkDescriptorBindingFlags) bitfields, one for each descriptor set
layout binding.

If `bindingCount` is zero or if this structure is not included in the
`pNext` chain, the [VkDescriptorBindingFlags](#VkDescriptorBindingFlags) for each descriptor
set layout binding is considered to be zero.
Otherwise, the descriptor set layout binding at
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`pBindings`[i] uses the flags in
`pBindingFlags`[i].

Valid Usage

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-bindingCount-03002) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-bindingCount-03002

If `bindingCount` is not zero, `bindingCount` **must** equal
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`bindingCount`

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-flags-03003) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-flags-03003

If [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`flags` includes
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits), then all
elements of `pBindingFlags` **must** not include
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT),
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](#VkDescriptorBindingFlagBitsEXT), or
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-03004) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-03004

If an element of `pBindingFlags` includes
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT), then it **must**
be the element with the highest `binding` number

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUniformBufferUpdateAfterBind-03005) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUniformBufferUpdateAfterBind-03005

If
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingUniformBufferUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingSampledImageUpdateAfterBind-03006) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingSampledImageUpdateAfterBind-03006

If
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingSampledImageUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageImageUpdateAfterBind-03007) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageImageUpdateAfterBind-03007

If
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingStorageImageUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageBufferUpdateAfterBind-03008) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageBufferUpdateAfterBind-03008

If
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingStorageBufferUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUniformTexelBufferUpdateAfterBind-03009) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUniformTexelBufferUpdateAfterBind-03009

If
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingUniformTexelBufferUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageTexelBufferUpdateAfterBind-03010) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageTexelBufferUpdateAfterBind-03010

If
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingStorageTexelBufferUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingInlineUniformBlockUpdateAfterBind-02211) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingInlineUniformBlockUpdateAfterBind-02211

If
[VkPhysicalDeviceInlineUniformBlockFeatures](features.html#VkPhysicalDeviceInlineUniformBlockFeatures)::`descriptorBindingInlineUniformBlockUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingAccelerationStructureUpdateAfterBind-03570) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingAccelerationStructureUpdateAfterBind-03570

If
[VkPhysicalDeviceAccelerationStructureFeaturesKHR](features.html#VkPhysicalDeviceAccelerationStructureFeaturesKHR)::`descriptorBindingAccelerationStructureUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-None-03011) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-None-03011

All bindings with descriptor type
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUpdateUnusedWhilePending-03012) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingUpdateUnusedWhilePending-03012

If
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingUpdateUnusedWhilePending`
is not enabled, all elements of `pBindingFlags` **must** not include
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingPartiallyBound-03013) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingPartiallyBound-03013

If
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingPartiallyBound`
is not enabled, all elements of `pBindingFlags` **must** not include
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingVariableDescriptorCount-03014) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingVariableDescriptorCount-03014

If
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingVariableDescriptorCount`
is not enabled, all elements of `pBindingFlags` **must** not include
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-03015) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-03015

If an element of `pBindingFlags` includes
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT), that
element’s `descriptorType` **must** not be
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageTensorUpdateAfterBind-09697) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-descriptorBindingStorageTensorUpdateAfterBind-09697

If
[VkPhysicalDeviceTensorFeaturesARM](features.html#VkPhysicalDeviceTensorFeaturesARM)::`descriptorBindingStorageTensorUpdateAfterBind`
is not enabled, all bindings with descriptor type
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType) **must** not use
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-sType-sType) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_BINDING_FLAGS_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-parameter) VUID-VkDescriptorSetLayoutBindingFlagsCreateInfo-pBindingFlags-parameter

 If `bindingCount` is not `0`, `pBindingFlags` **must** be a valid pointer to an array of `bindingCount` valid combinations of [VkDescriptorBindingFlagBits](#VkDescriptorBindingFlagBits) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)

Bits which **can** be set in each element of
[VkDescriptorSetLayoutBindingFlagsCreateInfo](#VkDescriptorSetLayoutBindingFlagsCreateInfo)::`pBindingFlags`,
specifying options for the corresponding descriptor set layout binding, are:

// Provided by VK_VERSION_1_2
typedef enum VkDescriptorBindingFlagBits {
    VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT = 0x00000001,
    VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT = 0x00000002,
    VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT = 0x00000004,
    VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT = 0x00000008,
  // Provided by VK_EXT_descriptor_indexing
    VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT_EXT = VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT,
  // Provided by VK_EXT_descriptor_indexing
    VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT_EXT = VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT,
  // Provided by VK_EXT_descriptor_indexing
    VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT_EXT = VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT,
  // Provided by VK_EXT_descriptor_indexing
    VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT_EXT = VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT,
} VkDescriptorBindingFlagBits;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkDescriptorBindingFlagBits
typedef VkDescriptorBindingFlagBits VkDescriptorBindingFlagBitsEXT;

* 
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT) specifies that if
descriptors in this binding are updated between when the descriptor set
is bound in a command buffer and when that command buffer is submitted
to a queue, then the submission will use the most recently set
descriptors for this binding and the updates do not invalidate the
command buffer.
Descriptor bindings created with this flag are also partially exempt
from the external synchronization requirement in
[vkUpdateDescriptorSetWithTemplateKHR](#vkUpdateDescriptorSetWithTemplateKHR) and
[vkUpdateDescriptorSets](#vkUpdateDescriptorSets).
Multiple descriptors with this flag set **can** be updated concurrently in
different threads, though the same descriptor **must** not be updated
concurrently by two threads.
Descriptors with this flag set **can** be updated concurrently with the set
being bound to a command buffer in another thread, but not concurrently
with the set being reset or freed.

* 
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](#VkDescriptorBindingFlagBitsEXT) specifies that
descriptors in this binding that are not *dynamically used* need not
contain valid descriptors at the time the descriptors are consumed.
A descriptor is dynamically used if any shader invocation executes an
instruction that performs any memory access using the descriptor.
If a descriptor is not dynamically used, any resource referenced by the
descriptor is not considered to be referenced during command execution.

* 
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](#VkDescriptorBindingFlagBitsEXT) specifies
that descriptors in this binding **can** be updated after a command buffer
has bound this descriptor set, or while a command buffer that uses this
descriptor set is pending execution, as long as the descriptors that are
updated are not used by those command buffers.
Descriptor bindings created with this flag are also partially exempt
from the external synchronization requirement in
[vkUpdateDescriptorSetWithTemplateKHR](#vkUpdateDescriptorSetWithTemplateKHR) and
[vkUpdateDescriptorSets](#vkUpdateDescriptorSets) in the same way as for
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT).
If [VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](#VkDescriptorBindingFlagBitsEXT) is also set, then
descriptors **can** be updated as long as they are not dynamically used by
any shader invocations.
If [VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](#VkDescriptorBindingFlagBitsEXT) is not set, then
descriptors **can** be updated as long as they are not statically used by
any shader invocations.

* 
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT) specifies that
    this is a *variable-sized descriptor binding* whose size will be
    specified when a descriptor set is allocated using this layout.
    The value of `descriptorCount` is treated as an upper bound on the
    size of the binding.
    This **must** only be used for the last binding in the descriptor set
    layout (i.e. the binding with the largest value of `binding`).
    For the purposes of counting against limits such as
    `maxDescriptorSet`* and `maxPerStageDescriptor`*, the full value
    of `descriptorCount` is
    counted, except for descriptor bindings with a descriptor type of
    [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), when
    [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`flags` does not contain
    [VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits).
    In this case, `descriptorCount` specifies the upper bound on the
    byte size of the binding; thus it counts against the
[`maxInlineUniformBlockSize`](devsandqueues.html#limits-maxInlineUniformBlockSize) and [`maxInlineUniformTotalSize`](devsandqueues.html#limits-maxInlineUniformTotalSize) limits
instead.

|  | Note that while [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT) and
| --- | --- |
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](#VkDescriptorBindingFlagBitsEXT) both involve
updates to descriptor sets after they are bound,
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](#VkDescriptorBindingFlagBitsEXT) is a weaker
requirement since it is only about descriptors that are not used, whereas
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT) requires the
implementation to observe updates to descriptors that are used. |

// Provided by VK_VERSION_1_2
typedef VkFlags VkDescriptorBindingFlags;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkDescriptorBindingFlags
typedef VkDescriptorBindingFlags VkDescriptorBindingFlagsEXT;

`VkDescriptorBindingFlags` is a bitmask type for setting a mask of zero
or more [VkDescriptorBindingFlagBits](#VkDescriptorBindingFlagBits).

To query information about whether a descriptor set layout **can** be created,
call:

// Provided by VK_VERSION_1_1
void vkGetDescriptorSetLayoutSupport(
    VkDevice                                    device,
    const VkDescriptorSetLayoutCreateInfo*      pCreateInfo,
    VkDescriptorSetLayoutSupport*               pSupport);

// Provided by VK_KHR_maintenance3
// Equivalent to vkGetDescriptorSetLayoutSupport
void vkGetDescriptorSetLayoutSupportKHR(
    VkDevice                                    device,
    const VkDescriptorSetLayoutCreateInfo*      pCreateInfo,
    VkDescriptorSetLayoutSupport*               pSupport);

* 
`device` is the logical device that would create the descriptor set
layout.

* 
`pCreateInfo` is a pointer to a
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) structure specifying the state of
the descriptor set layout object.

* 
`pSupport` is a pointer to a [VkDescriptorSetLayoutSupport](#VkDescriptorSetLayoutSupport)
structure, in which information about support for the descriptor set
layout object is returned.

Some implementations have limitations on what fits in a descriptor set which
are not easily expressible in terms of existing limits like
`maxDescriptorSet`*, for example if all descriptor types share a limited
space in memory but each descriptor is a different size or alignment.
This command returns information about whether a descriptor set satisfies
this limit.
If the descriptor set layout satisfies the
[VkPhysicalDeviceMaintenance3Properties](limits.html#VkPhysicalDeviceMaintenance3Properties)::`maxPerSetDescriptors`
limit, this command is guaranteed to return [VK_TRUE](fundamentals.html#VK_TRUE) in
[VkDescriptorSetLayoutSupport](#VkDescriptorSetLayoutSupport)::`supported`.
If the descriptor set layout exceeds the
[VkPhysicalDeviceMaintenance3Properties](limits.html#VkPhysicalDeviceMaintenance3Properties)::`maxPerSetDescriptors`
limit, whether the descriptor set layout is supported is
implementation-dependent and **may** depend on whether the descriptor sizes and
alignments cause the layout to exceed an internal limit.

This command does not consider other limits such as
`maxPerStageDescriptor`*, and so a descriptor set layout that is
supported according to this command **must** still satisfy the pipeline layout
limits such as `maxPerStageDescriptor`* in order to be used in a
pipeline layout.

|  | This is a `VkDevice` query rather than `VkPhysicalDevice` because
| --- | --- |
the answer **may** depend on enabled features. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetLayoutSupport-device-parameter) VUID-vkGetDescriptorSetLayoutSupport-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDescriptorSetLayoutSupport-pCreateInfo-parameter) VUID-vkGetDescriptorSetLayoutSupport-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) structure

* 
[](#VUID-vkGetDescriptorSetLayoutSupport-pSupport-parameter) VUID-vkGetDescriptorSetLayoutSupport-pSupport-parameter

 `pSupport` **must** be a valid pointer to a [VkDescriptorSetLayoutSupport](#VkDescriptorSetLayoutSupport) structure

Information about support for the descriptor set layout is returned in a
`VkDescriptorSetLayoutSupport` structure:

// Provided by VK_VERSION_1_1
typedef struct VkDescriptorSetLayoutSupport {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           supported;
} VkDescriptorSetLayoutSupport;

// Provided by VK_KHR_maintenance3
// Equivalent to VkDescriptorSetLayoutSupport
typedef VkDescriptorSetLayoutSupport VkDescriptorSetLayoutSupportKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`supported` specifies whether the descriptor set layout **can** be
created.

`supported` will be [VK_TRUE](fundamentals.html#VK_TRUE) if the descriptor set **can** be created,
or else [VK_FALSE](fundamentals.html#VK_FALSE).

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetLayoutSupport-sType-sType) VUID-VkDescriptorSetLayoutSupport-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_SUPPORT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorSetLayoutSupport-pNext-pNext) VUID-VkDescriptorSetLayoutSupport-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDescriptorSetVariableDescriptorCountLayoutSupport](#VkDescriptorSetVariableDescriptorCountLayoutSupport)

* 
[](#VUID-VkDescriptorSetLayoutSupport-sType-unique) VUID-VkDescriptorSetLayoutSupport-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

If the `pNext` chain of a [VkDescriptorSetLayoutSupport](#VkDescriptorSetLayoutSupport) structure
includes a `VkDescriptorSetVariableDescriptorCountLayoutSupport`
structure, then that structure returns additional information about whether
the descriptor set layout is supported.

// Provided by VK_VERSION_1_2
typedef struct VkDescriptorSetVariableDescriptorCountLayoutSupport {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVariableDescriptorCount;
} VkDescriptorSetVariableDescriptorCountLayoutSupport;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkDescriptorSetVariableDescriptorCountLayoutSupport
typedef VkDescriptorSetVariableDescriptorCountLayoutSupport VkDescriptorSetVariableDescriptorCountLayoutSupportEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxVariableDescriptorCount` indicates the maximum number of
descriptors supported in the highest numbered binding of the layout, if
that binding is variable-sized.
If the highest numbered binding of the layout has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then
`maxVariableDescriptorCount` indicates the maximum byte size
supported for the binding, if that binding is variable-sized.

If the [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) structure specified in
[vkGetDescriptorSetLayoutSupport](#vkGetDescriptorSetLayoutSupport)::`pCreateInfo` includes a
variable-sized descriptor, then `supported` is determined assuming the
requested size of the variable-sized descriptor, and
`maxVariableDescriptorCount` is the maximum size of that descriptor that
**can** be successfully created (which is greater than or equal to the
requested size passed in).
If the [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) structure does not include a
variable-sized descriptor, or if the
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures)::`descriptorBindingVariableDescriptorCount`
feature is not enabled, then `maxVariableDescriptorCount` is zero.
For the purposes of this command, a variable-sized descriptor binding with a
`descriptorCount` of zero is treated as having a `descriptorCount`
of
four if `descriptorType` is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), or one otherwise,
and thus the binding is not ignored and the maximum descriptor count will be
returned.
If the layout is not supported, then the value written to
`maxVariableDescriptorCount` is **undefined**.

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetVariableDescriptorCountLayoutSupport-sType-sType) VUID-VkDescriptorSetVariableDescriptorCountLayoutSupport-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_LAYOUT_SUPPORT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorSetLayoutSupport](#VkDescriptorSetLayoutSupport)

The following examples show a shader snippet using two descriptor sets, and
application code that creates corresponding descriptor set layouts.

GLSL Example

//
// binding to a single sampled image descriptor in set 0
//
layout (set=0, binding=0) uniform texture2D mySampledImage;

//
// binding to an array of sampled image descriptors in set 0
//
layout (set=0, binding=1) uniform texture2D myArrayOfSampledImages[12];

//
// binding to a single uniform buffer descriptor in set 1
//
layout (set=1, binding=0) uniform myUniformBuffer
{
    vec4 myElement[32];
};

SPIR-V Example

               ...
          %1 = OpExtInstImport "GLSL.std.450"
               ...
               OpName %9 "mySampledImage"
               OpName %14 "myArrayOfSampledImages"
               OpName %18 "myUniformBuffer"
               OpMemberName %18 0 "myElement"
               OpName %20 ""
               OpDecorate %9 DescriptorSet 0
               OpDecorate %9 Binding 0
               OpDecorate %14 DescriptorSet 0
               OpDecorate %14 Binding 1
               OpDecorate %17 ArrayStride 16
               OpMemberDecorate %18 0 Offset 0
               OpDecorate %18 Block
               OpDecorate %20 DescriptorSet 1
               OpDecorate %20 Binding 0
          %2 = OpTypeVoid
          %3 = OpTypeFunction %2
          %6 = OpTypeFloat 32
          %7 = OpTypeImage %6 2D 0 0 0 1 Unknown
          %8 = OpTypePointer UniformConstant %7
          %9 = OpVariable %8 UniformConstant
         %10 = OpTypeInt 32 0
         %11 = OpConstant %10 12
         %12 = OpTypeArray %7 %11
         %13 = OpTypePointer UniformConstant %12
         %14 = OpVariable %13 UniformConstant
         %15 = OpTypeVector %6 4
         %16 = OpConstant %10 32
         %17 = OpTypeArray %15 %16
         %18 = OpTypeStruct %17
         %19 = OpTypePointer Uniform %18
         %20 = OpVariable %19 Uniform
               ...

API Example

VkResult myResult;

const VkDescriptorSetLayoutBinding myDescriptorSetLayoutBinding[] =
{
    // binding to a single image descriptor
    {
        .binding = 0,
        .descriptorType = VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE,
        .descriptorCount = 1,
        .stageFlags = VK_SHADER_STAGE_FRAGMENT_BIT,
        .pImmutableSamplers = NULL
    },

    // binding to an array of image descriptors
    {
        .binding = 1,
        .descriptorType = VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE,
        .descriptorCount = 12,
        .stageFlags = VK_SHADER_STAGE_FRAGMENT_BIT,
        .pImmutableSamplers = NULL
    },

    // binding to a single uniform buffer descriptor
    {
        .binding = 0,
        .descriptorType = VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER,
        .descriptorCount = 1,
        .stageFlags = VK_SHADER_STAGE_FRAGMENT_BIT,
        .pImmutableSamplers = NULL
    }
};

const VkDescriptorSetLayoutCreateInfo myDescriptorSetLayoutCreateInfo[] =
{
    // Information for first descriptor set with two descriptor bindings
    {
        .sType = VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_CREATE_INFO,
        .pNext = NULL,
        .flags = 0,
        .bindingCount = 2,
        .pBindings = &myDescriptorSetLayoutBinding[0]
    },

    // Information for second descriptor set with one descriptor binding
    {
        .sType = VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_CREATE_INFO,
        .pNext = NULL,
        .flags = 0,
        .bindingCount = 1,
        .pBindings = &myDescriptorSetLayoutBinding[2]
    }
};

VkDescriptorSetLayout myDescriptorSetLayout[2];

//
// Create first descriptor set layout
//
myResult = vkCreateDescriptorSetLayout(
    myDevice,
    &myDescriptorSetLayoutCreateInfo[0],
    NULL,
    &myDescriptorSetLayout[0]);

//
// Create second descriptor set layout
//
myResult = vkCreateDescriptorSetLayout(
    myDevice,
    &myDescriptorSetLayoutCreateInfo[1],
    NULL,
    &myDescriptorSetLayout[1]);

To destroy a descriptor set layout, call:

// Provided by VK_VERSION_1_0
void vkDestroyDescriptorSetLayout(
    VkDevice                                    device,
    VkDescriptorSetLayout                       descriptorSetLayout,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the descriptor set
layout.

* 
`descriptorSetLayout` is the descriptor set layout to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-00284) VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-00284

If `VkAllocationCallbacks` were provided when
`descriptorSetLayout` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-00285) VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-00285

If no `VkAllocationCallbacks` were provided when
`descriptorSetLayout` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDescriptorSetLayout-device-parameter) VUID-vkDestroyDescriptorSetLayout-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-parameter) VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-parameter

 If `descriptorSetLayout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `descriptorSetLayout` **must** be a valid [VkDescriptorSetLayout](#VkDescriptorSetLayout) handle

* 
[](#VUID-vkDestroyDescriptorSetLayout-pAllocator-parameter) VUID-vkDestroyDescriptorSetLayout-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-parent) VUID-vkDestroyDescriptorSetLayout-descriptorSetLayout-parent

 If `descriptorSetLayout` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `descriptorSetLayout` **must** be externally synchronized

Access to descriptor sets from a pipeline is accomplished through a
*pipeline layout*.
Zero or more descriptor set layouts and zero or more push constant ranges
are combined to form a pipeline layout object describing the complete set of
resources that **can** be accessed by a pipeline.
The pipeline layout represents a sequence of descriptor sets with each
having a specific layout.
This sequence of layouts is used to determine the interface between shader
stages and shader resources.
Each pipeline is created using a pipeline layout.

Pipeline layout objects are represented by `VkPipelineLayout` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPipelineLayout)

To create a pipeline layout, call:

// Provided by VK_VERSION_1_0
VkResult vkCreatePipelineLayout(
    VkDevice                                    device,
    const VkPipelineLayoutCreateInfo*           pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPipelineLayout*                           pPipelineLayout);

* 
`device` is the logical device that creates the pipeline layout.

* 
`pCreateInfo` is a pointer to a [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)
structure specifying the state of the pipeline layout object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pPipelineLayout` is a pointer to a [VkPipelineLayout](#VkPipelineLayout) handle in
which the resulting pipeline layout object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreatePipelineLayout-device-parameter) VUID-vkCreatePipelineLayout-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreatePipelineLayout-pCreateInfo-parameter) VUID-vkCreatePipelineLayout-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) structure

* 
[](#VUID-vkCreatePipelineLayout-pAllocator-parameter) VUID-vkCreatePipelineLayout-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreatePipelineLayout-pPipelineLayout-parameter) VUID-vkCreatePipelineLayout-pPipelineLayout-parameter

 `pPipelineLayout` **must** be a valid pointer to a [VkPipelineLayout](#VkPipelineLayout) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineLayoutCreateInfo {
    VkStructureType                 sType;
    const void*                     pNext;
    VkPipelineLayoutCreateFlags     flags;
    uint32_t                        setLayoutCount;
    const VkDescriptorSetLayout*    pSetLayouts;
    uint32_t                        pushConstantRangeCount;
    const VkPushConstantRange*      pPushConstantRanges;
} VkPipelineLayoutCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineLayoutCreateFlagBits](#VkPipelineLayoutCreateFlagBits)
specifying options for pipeline layout creation.

* 
`setLayoutCount` is the number of descriptor sets included in the
pipeline layout.

* 
`pSetLayouts` is a pointer to an array of
`VkDescriptorSetLayout` objects.
The implementation **must** not access these objects outside of the
duration of the command this structure is passed to.

* 
`pushConstantRangeCount` is the number of push constant ranges
included in the pipeline layout.

* 
`pPushConstantRanges` is a pointer to an array of
[VkPushConstantRange](#VkPushConstantRange) structures defining a set of push constant
ranges for use in a single pipeline layout.
In addition to descriptor set layouts, a pipeline layout also describes
how many push constants **can** be accessed by each stage of the pipeline.

|  | Push constants represent a high speed path to modify constant data in
| --- | --- |
pipelines that is expected to outperform memory-backed resource updates. |

Valid Usage

* 
[](#VUID-VkPipelineLayoutCreateInfo-setLayoutCount-00286) VUID-VkPipelineLayoutCreateInfo-setLayoutCount-00286

`setLayoutCount` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxBoundDescriptorSets`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03016) VUID-VkPipelineLayoutCreateInfo-descriptorType-03016

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorSamplers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03017) VUID-VkPipelineLayoutCreateInfo-descriptorType-03017

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType)
and [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorUniformBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03018) VUID-VkPipelineLayoutCreateInfo-descriptorType-03018

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType)
and [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorStorageBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-06939) VUID-VkPipelineLayoutCreateInfo-descriptorType-06939

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](#VkDescriptorType),
and [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType), accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorSampledImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03020) VUID-VkPipelineLayoutCreateInfo-descriptorType-03020

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType),
and [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorStorageImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03021) VUID-VkPipelineLayoutCreateInfo-descriptorType-03021

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType)
accessible to any given shader stage across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPerStageDescriptorInputAttachments`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02214) VUID-VkPipelineLayoutCreateInfo-descriptorType-02214

The total number of bindings in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
and
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) accessible to any given
shader stage across all elements of `pSetLayouts`, **must** be less
than or equal to
`VkPhysicalDeviceInlineUniformBlockProperties`::`maxPerStageDescriptorInlineUniformBlocks`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03022) VUID-VkPipelineLayoutCreateInfo-descriptorType-03022

If the
[`descriptorBindingSampledImageUpdateAfterBind`](features.html#features-descriptorBindingSampledImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindSamplers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03023) VUID-VkPipelineLayoutCreateInfo-descriptorType-03023

If the
[`descriptorBindingUniformBufferUpdateAfterBind`](features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType) and
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindUniformBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03024) VUID-VkPipelineLayoutCreateInfo-descriptorType-03024

If the
[`descriptorBindingStorageBufferUpdateAfterBind`](features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType) and
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindStorageBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03025) VUID-VkPipelineLayoutCreateInfo-descriptorType-03025

If the
[`descriptorBindingSampledImageUpdateAfterBind`](features.html#features-descriptorBindingSampledImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), and
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindSampledImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03026) VUID-VkPipelineLayoutCreateInfo-descriptorType-03026

If the
[`descriptorBindingStorageImageUpdateAfterBind`](features.html#features-descriptorBindingStorageImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors with
a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), and
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType) accessible to any given
shader stage across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindStorageImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03027) VUID-VkPipelineLayoutCreateInfo-descriptorType-03027

If any element of `pSetLayouts` is created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit
set, the total number of descriptors with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType) accessible to any given shader
stage across all elements of `pSetLayouts` **must** be less than or
equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxPerStageDescriptorUpdateAfterBindInputAttachments`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02215) VUID-VkPipelineLayoutCreateInfo-descriptorType-02215

If the
[`descriptorBindingInlineUniformBlockUpdateAfterBind`](features.html#features-descriptorBindingInlineUniformBlockUpdateAfterBind)
feature is supported on the device, the total number of bindings with a
`descriptorType` of [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)
accessible to any given shader stage across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceInlineUniformBlockProperties`::`maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03028) VUID-VkPipelineLayoutCreateInfo-descriptorType-03028

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetSamplers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03029) VUID-VkPipelineLayoutCreateInfo-descriptorType-03029

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetUniformBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03030) VUID-VkPipelineLayoutCreateInfo-descriptorType-03030

If the [`maintenance7`](features.html#features-maintenance7) feature is not
enabled, the
total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetUniformBuffersDynamic`

* 
[](#VUID-VkPipelineLayoutCreateInfo-maintenance7-10003) VUID-VkPipelineLayoutCreateInfo-maintenance7-10003

If the [`maintenance7`](features.html#features-maintenance7) feature is enabled,
the total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to [    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetTotalUniformBuffersDynamic`](limits.html#limits-maxDescriptorSetTotalUniformBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03031) VUID-VkPipelineLayoutCreateInfo-descriptorType-03031

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetStorageBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03032) VUID-VkPipelineLayoutCreateInfo-descriptorType-03032

If the [`maintenance7`](features.html#features-maintenance7) feature is not
enabled, the
total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetStorageBuffersDynamic`

* 
[](#VUID-VkPipelineLayoutCreateInfo-maintenance7-10004) VUID-VkPipelineLayoutCreateInfo-maintenance7-10004

If the [`maintenance7`](features.html#features-maintenance7) feature is enabled,
the total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to [    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetTotalStorageBuffersDynamic`](limits.html#limits-maxDescriptorSetTotalStorageBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-None-10005) VUID-VkPipelineLayoutCreateInfo-None-10005

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to [    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetTotalBuffersDynamic`](limits.html#limits-maxDescriptorSetTotalBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-10006) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-10006

If either the
[`descriptorBindingStorageBufferUpdateAfterBind`](features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
or
[`descriptorBindingUniformBufferUpdateAfterBind`](features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
[    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetUpdateAfterBindTotalBuffersDynamic`](limits.html#limits-maxDescriptorSetUpdateAfterBindTotalBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03033) VUID-VkPipelineLayoutCreateInfo-descriptorType-03033

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), and
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetSampledImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03034) VUID-VkPipelineLayoutCreateInfo-descriptorType-03034

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType),
and [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetStorageImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03035) VUID-VkPipelineLayoutCreateInfo-descriptorType-03035

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetInputAttachments`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02216) VUID-VkPipelineLayoutCreateInfo-descriptorType-02216

The total number of bindings in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceInlineUniformBlockProperties`::`maxDescriptorSetInlineUniformBlocks`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03036) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03036

If the
[`descriptorBindingSampledImageUpdateAfterBind`](features.html#features-descriptorBindingSampledImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindSamplers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03037) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03037

If the
[`descriptorBindingUniformBufferUpdateAfterBind`](features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindUniformBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03038) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03038

If the
[`descriptorBindingUniformBufferUpdateAfterBind`](features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device,
and if the [`maintenance7`](features.html#features-maintenance7) feature is not
enabled,
the total number of descriptors of the type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetUpdateAfterBindUniformBuffersDynamic`

* 
[](#VUID-VkPipelineLayoutCreateInfo-maintenance7-10007) VUID-VkPipelineLayoutCreateInfo-maintenance7-10007

If the
[`descriptorBindingUniformBufferUpdateAfterBind`](features.html#features-descriptorBindingUniformBufferUpdateAfterBind)
feature is supported on the device, and the [    `maintenance7`](features.html#features-maintenance7) feature is enabled, the total number of descriptors
of the type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) accessible
across all shader stages and across all elements of `pSetLayouts`
**must** be less than or equal to
[    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic`](limits.html#limits-maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03039) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03039

If the
[`descriptorBindingStorageBufferUpdateAfterBind`](features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindStorageBuffers`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03040) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03040

If the
[`descriptorBindingStorageBufferUpdateAfterBind`](features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
feature is supported on the device,
and if the [`maintenance7`](features.html#features-maintenance7) feature is not
enabled,
the total number of descriptors of the type
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceLimits`::`maxDescriptorSetUpdateAfterBindStorageBuffersDynamic`

* 
[](#VUID-VkPipelineLayoutCreateInfo-maintenance7-10008) VUID-VkPipelineLayoutCreateInfo-maintenance7-10008

If the
[`descriptorBindingStorageBufferUpdateAfterBind`](features.html#features-descriptorBindingStorageBufferUpdateAfterBind)
feature is supported on the device, and if the [    `maintenance7`](features.html#features-maintenance7) feature is enabled, the total number of descriptors
of the type [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) accessible
across all shader stages and across all elements of `pSetLayouts`
**must** be less than or equal to
[    `VkPhysicalDeviceMaintenance7PropertiesKHR`::`maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic`](limits.html#limits-maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic)

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03041) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03041

If the
[`descriptorBindingSampledImageUpdateAfterBind`](features.html#features-descriptorBindingSampledImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), and
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindSampledImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03042) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03042

If the
[`descriptorBindingStorageImageUpdateAfterBind`](features.html#features-descriptorBindingStorageImageUpdateAfterBind)
feature is supported on the device, the total number of descriptors of
the type [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), and
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindStorageImages`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03043) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-03043

If any element of `pSetLayouts` is created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit
set, the total number of descriptors of the type
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType) accessible across all shader
stages and across all elements of `pSetLayouts` **must** be less than
or equal to
`VkPhysicalDeviceDescriptorIndexingProperties`::`maxDescriptorSetUpdateAfterBindInputAttachments`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02217) VUID-VkPipelineLayoutCreateInfo-descriptorType-02217

If the
[`descriptorBindingInlineUniformBlockUpdateAfterBind`](features.html#features-descriptorBindingInlineUniformBlockUpdateAfterBind)
feature is supported on the device, the total number of bindings with a
`descriptorType` of [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceInlineUniformBlockProperties`::`maxDescriptorSetUpdateAfterBindInlineUniformBlocks`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-06531) VUID-VkPipelineLayoutCreateInfo-descriptorType-06531

The total number of descriptors with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
`VkPhysicalDeviceVulkan13Properties`::`maxInlineUniformTotalSize`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pPushConstantRanges-00292) VUID-VkPipelineLayoutCreateInfo-pPushConstantRanges-00292

Any two elements of `pPushConstantRanges` **must** not include the same
stage in `stageFlags`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-00293) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-00293

`pSetLayouts` **must** not contain more than one descriptor set layout
that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits) set

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03571) VUID-VkPipelineLayoutCreateInfo-descriptorType-03571

The total number of bindings in descriptor set layouts created without
the [VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit
set with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxPerStageDescriptorAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03572) VUID-VkPipelineLayoutCreateInfo-descriptorType-03572

The total number of bindings with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType) accessible to any
given shader stage across all elements of `pSetLayouts` **must** be
less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxPerStageDescriptorUpdateAfterBindAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03573) VUID-VkPipelineLayoutCreateInfo-descriptorType-03573

The total number of bindings in descriptor set layouts created without
the [VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit
set with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType) accessible across
all shader stages and across all elements of `pSetLayouts` **must** be
less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxDescriptorSetAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-03574) VUID-VkPipelineLayoutCreateInfo-descriptorType-03574

The total number of bindings with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType) accessible across
all shader stages and across all elements of `pSetLayouts` **must** be
less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxDescriptorSetUpdateAfterBindAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-02381) VUID-VkPipelineLayoutCreateInfo-descriptorType-02381

The total number of bindings with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType) accessible across all
shader stages and across all elements of `pSetLayouts` **must** be less
than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](limits.html#VkPhysicalDeviceRayTracingPropertiesNV)::`maxDescriptorSetAccelerationStructures`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pImmutableSamplers-03566) VUID-VkPipelineLayoutCreateInfo-pImmutableSamplers-03566

The total number of `pImmutableSamplers` created with `flags`
containing [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) or
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) across
all shader stages and across all elements of `pSetLayouts` **must** be
less than or equal to [    `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT`::`maxDescriptorSetSubsampledSamplers`](limits.html#limits-maxDescriptorSetSubsampledSamplers)

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-04606) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-04606

Any element of `pSetLayouts` **must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-VkPipelineLayoutCreateInfo-graphicsPipelineLibrary-06753) VUID-VkPipelineLayoutCreateInfo-graphicsPipelineLibrary-06753

If the [    `graphicsPipelineLibrary`](features.html#features-graphicsPipelineLibrary) feature is not enabled, elements
of `pSetLayouts` **must** be valid [VkDescriptorSetLayout](#VkDescriptorSetLayout) objects

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-08008) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-08008

If any element of `pSetLayouts` was created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) bit set,
all elements of `pSetLayouts` **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09698) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09698

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType)
accessible to any given shader stage across all elements of
`pSetLayouts` **must** be less than or equal to
[VkPhysicalDeviceTensorPropertiesARM](limits.html#VkPhysicalDeviceTensorPropertiesARM)::`maxPerStageDescriptorSetStorageTensors`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09699) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09699

The total number of descriptors in descriptor set layouts
created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit set
with a `descriptorType` of [VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType)
accessible across all shader stages and across all elements of
`pSetLayouts` **must** be less than or equal to
[VkPhysicalDeviceTensorPropertiesARM](limits.html#VkPhysicalDeviceTensorPropertiesARM)::`maxDescriptorSetStorageTensors`

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09878) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-09878

The total number of descriptors of the type
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType) accessible across all shader stages
and across all elements of `pSetLayouts` **must** be less than or equal
to
[VkPhysicalDeviceTensorPropertiesARM](limits.html#VkPhysicalDeviceTensorPropertiesARM)::`maxDescriptorSetUpdateAfterBindStorageTensors`

* 
[](#VUID-VkPipelineLayoutCreateInfo-descriptorType-09879) VUID-VkPipelineLayoutCreateInfo-descriptorType-09879

The total number of descriptors with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType) accessible to any given shader stage
across all elements of `pSetLayouts` **must** be less than or equal to
`VkPhysicalDeviceTensorPropertiesARM`::`maxPerStageDescriptorUpdateAfterBindStorageTensors`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineLayoutCreateInfo-sType-sType) VUID-VkPipelineLayoutCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_LAYOUT_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPipelineLayoutCreateInfo-flags-parameter) VUID-VkPipelineLayoutCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineLayoutCreateFlagBits](#VkPipelineLayoutCreateFlagBits) values

* 
[](#VUID-VkPipelineLayoutCreateInfo-pSetLayouts-parameter) VUID-VkPipelineLayoutCreateInfo-pSetLayouts-parameter

 If `setLayoutCount` is not `0`, `pSetLayouts` **must** be a valid pointer to an array of `setLayoutCount` valid or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) [VkDescriptorSetLayout](#VkDescriptorSetLayout) handles

* 
[](#VUID-VkPipelineLayoutCreateInfo-pPushConstantRanges-parameter) VUID-VkPipelineLayoutCreateInfo-pPushConstantRanges-parameter

 If `pushConstantRangeCount` is not `0`, `pPushConstantRanges` **must** be a valid pointer to an array of `pushConstantRangeCount` valid [VkPushConstantRange](#VkPushConstantRange) structures

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindDescriptorBufferEmbeddedSamplersInfoEXT](#VkBindDescriptorBufferEmbeddedSamplersInfoEXT)

* 
[VkBindDescriptorSetsInfo](#VkBindDescriptorSetsInfo)

* 
[VkIndirectCommandsLayoutCreateInfoEXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoEXT)

* 
[VkPushConstantsInfo](#VkPushConstantsInfo)

* 
[VkPushDescriptorSetInfo](#VkPushDescriptorSetInfo)

* 
[VkPushDescriptorSetWithTemplateInfo](#VkPushDescriptorSetWithTemplateInfo)

* 
[VkSetDescriptorBufferOffsetsInfoEXT](#VkSetDescriptorBufferOffsetsInfoEXT)

// Provided by VK_VERSION_1_0, VK_EXT_graphics_pipeline_library
typedef enum VkPipelineLayoutCreateFlagBits {
  // Provided by VK_EXT_graphics_pipeline_library
    VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT = 0x00000002,
} VkPipelineLayoutCreateFlagBits;

* 
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](#VkPipelineLayoutCreateFlagBits) specifies that
implementations **must** ensure that the properties and/or absence of a
particular descriptor set do not influence any other properties of the
pipeline layout.
This allows pipelines libraries linked without
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits) to be created
with a subset of the total descriptor sets.

// Provided by VK_VERSION_1_0
typedef VkFlags VkPipelineLayoutCreateFlags;

`VkPipelineLayoutCreateFlags` is a bitmask type for setting a mask of
[VkPipelineLayoutCreateFlagBits](#VkPipelineLayoutCreateFlagBits).

The `VkPushConstantRange` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPushConstantRange {
    VkShaderStageFlags    stageFlags;
    uint32_t              offset;
    uint32_t              size;
} VkPushConstantRange;

* 
`stageFlags` is a set of stage flags describing the shader stages
that will access a range of push constants.
If a particular stage is not included in the range, then accessing
members of that range of push constants from the corresponding shader
stage will return **undefined** values.

* 
`offset` and `size` are the start offset and size, respectively,
consumed by the range.
Both `offset` and `size` are in units of bytes and **must** be a
multiple of 4.
The layout of the push constant variables is specified in the shader.

Valid Usage

* 
[](#VUID-VkPushConstantRange-offset-00294) VUID-VkPushConstantRange-offset-00294

`offset` **must** be less than
`VkPhysicalDeviceLimits`::`maxPushConstantsSize`

* 
[](#VUID-VkPushConstantRange-offset-00295) VUID-VkPushConstantRange-offset-00295

`offset` **must** be a multiple of `4`

* 
[](#VUID-VkPushConstantRange-size-00296) VUID-VkPushConstantRange-size-00296

`size` **must** be greater than `0`

* 
[](#VUID-VkPushConstantRange-size-00297) VUID-VkPushConstantRange-size-00297

`size` **must** be a multiple of `4`

* 
[](#VUID-VkPushConstantRange-size-00298) VUID-VkPushConstantRange-size-00298

`size` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPushConstantsSize` minus
`offset`

Valid Usage (Implicit)

* 
[](#VUID-VkPushConstantRange-stageFlags-parameter) VUID-VkPushConstantRange-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkPushConstantRange-stageFlags-requiredbitmask) VUID-VkPushConstantRange-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

Once created, pipeline layouts are used as part of pipeline creation (see
[Pipelines](pipelines.html#pipelines)), as part of binding descriptor sets (see
[Descriptor Set Binding](#descriptors-binding)), and as part of setting
push constants (see [Push Constant Updates](#descriptors-push-constants)).
Pipeline creation accepts a pipeline layout as input, and the layout **may** be
used to map (set, binding, arrayElement) tuples to implementation resources
or memory locations within a descriptor set.
The assignment of implementation resources depends only on the bindings
defined in the descriptor sets that comprise the pipeline layout, and not on
any shader source.

All resource variables [statically used](shaders.html#shaders-staticuse) in all shaders
in a pipeline **must** be declared with a (set, binding, arrayElement) that
exists in the corresponding descriptor set layout and is of an appropriate
descriptor type and includes the set of shader stages it is used by in
`stageFlags`.
The pipeline layout **can** include entries that are not used by a particular
pipeline.
The pipeline layout allows the application to provide a consistent set of
bindings across multiple pipeline compiles, which enables those pipelines to
be compiled in a way that the implementation **may** cheaply switch pipelines
without reprogramming the bindings.

Similarly, the push constant block declared in each shader (if present)
**must** only place variables at offsets that are each included in a push
constant range with `stageFlags` including the bit corresponding to the
shader stage that uses it.
The pipeline layout **can** include ranges or portions of ranges that are not
used by a particular pipeline.

There is a limit on the total number of resources of each type that **can** be
included in bindings in all descriptor set layouts in a pipeline layout as
shown in [Pipeline Layout Resource Limits](#descriptors-pipelinelayout-limits).
The “Total Resources Available” column gives the limit on the number of
each type of resource that **can** be included in bindings in all descriptor
sets in the pipeline layout.
Some resource types count against multiple limits.
Additionally, there are limits on the total number of each type of resource
that **can** be used in any pipeline stage as described in
[Shader Resource Limits](interfaces.html#interfaces-resources-limits).

| Total Resources Available | Resource Types |
| --- | --- |
| `maxDescriptorSetSamplers`
or `maxDescriptorSetUpdateAfterBindSamplers` | sampler |
| combined image sampler |
| `maxDescriptorSetSampledImages`
or `maxDescriptorSetUpdateAfterBindSampledImages` | sampled image |
| combined image sampler |
| uniform texel buffer |
| `maxDescriptorSetStorageImages`
or `maxDescriptorSetUpdateAfterBindStorageImages` | storage image |
| storage texel buffer |
| `maxDescriptorSetUniformBuffers`
or `maxDescriptorSetUpdateAfterBindUniformBuffers` | uniform buffer |
| uniform buffer dynamic |
| `maxDescriptorSetUniformBuffersDynamic`
or `maxDescriptorSetUpdateAfterBindUniformBuffersDynamic`
or `maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic` | uniform buffer dynamic |
| `maxDescriptorSetStorageBuffers`
or `maxDescriptorSetUpdateAfterBindStorageBuffers` | storage buffer |
| storage buffer dynamic |
| `maxDescriptorSetStorageBuffersDynamic`
or `maxDescriptorSetUpdateAfterBindStorageBuffersDynamic`
or `maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic` | storage buffer dynamic |
| `maxDescriptorSetInputAttachments`
or `maxDescriptorSetUpdateAfterBindInputAttachments` | input attachment |
| `maxDescriptorSetInlineUniformBlocks`
or `maxDescriptorSetUpdateAfterBindInlineUniformBlocks` | inline uniform block |
| `maxDescriptorSetAccelerationStructures`
or `maxDescriptorSetUpdateAfterBindAccelerationStructures` | acceleration structure |
| `maxDescriptorSetStorageTensors`
or `maxDescriptorSetUpdateAfterBindStorageTensors` | storage tensor |

To destroy a pipeline layout, call:

// Provided by VK_VERSION_1_0
void vkDestroyPipelineLayout(
    VkDevice                                    device,
    VkPipelineLayout                            pipelineLayout,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the pipeline layout.

* 
`pipelineLayout` is the pipeline layout to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyPipelineLayout-pipelineLayout-00299) VUID-vkDestroyPipelineLayout-pipelineLayout-00299

If `VkAllocationCallbacks` were provided when `pipelineLayout`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPipelineLayout-pipelineLayout-00300) VUID-vkDestroyPipelineLayout-pipelineLayout-00300

If no `VkAllocationCallbacks` were provided when
`pipelineLayout` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPipelineLayout-device-parameter) VUID-vkDestroyPipelineLayout-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyPipelineLayout-pipelineLayout-parameter) VUID-vkDestroyPipelineLayout-pipelineLayout-parameter

 If `pipelineLayout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `pipelineLayout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-vkDestroyPipelineLayout-pAllocator-parameter) VUID-vkDestroyPipelineLayout-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyPipelineLayout-pipelineLayout-parent) VUID-vkDestroyPipelineLayout-pipelineLayout-parent

 If `pipelineLayout` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `pipelineLayout` **must** be externally synchronized

Two pipeline layouts are defined to be “compatible for
[push constants](#descriptors-push-constants)” if they were created with
identical push constant ranges.
Two pipeline layouts are defined to be “compatible for set N” if they were
created with [identically defined](../appendices/glossary.html#glossary-identically-defined) descriptor
set layouts for sets zero through N,
if both of them either were or were not created with
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](#VkPipelineLayoutCreateFlagBits),
and if they were created with identical push constant ranges.

When binding a descriptor set (see [Descriptor Set Binding](#descriptors-binding)) to set number N, a previously bound descriptor set bound with
lower index M than N is disturbed if the pipeline layouts for set M and N
are not compatible for set M. Otherwise, the bound descriptor set in M is
not disturbed.

If, additionally, the previously bound descriptor set for set N was bound
using a pipeline layout not compatible for set N, then all bindings in sets
numbered greater than N are disturbed.

When binding a pipeline, the pipeline **can** correctly access any previously
bound descriptor set N if it was bound with compatible pipeline layout for
set N, and it was not disturbed.

Layout compatibility means that descriptor sets **can** be bound to a command
buffer for use by any pipeline created with a compatible pipeline layout,
and without having bound a particular pipeline first.
It also means that descriptor sets **can** remain valid across a pipeline
change, and the same resources will be accessible to the newly bound
pipeline.

When a descriptor set is disturbed by binding descriptor sets, the disturbed
set is considered to contain **undefined** descriptors bound with the same
pipeline layout as the disturbing descriptor set.

|  | Place the least frequently changing descriptor sets near the start of the
| --- | --- |
pipeline layout, and place the descriptor sets representing the most
frequently changing resources near the end.
When pipelines are switched, only the descriptor set bindings that have been
invalidated will need to be updated and the remainder of the descriptor set
bindings will remain in place. |

The maximum number of descriptor sets that **can** be bound to a pipeline
layout is queried from physical device properties (see
`maxBoundDescriptorSets` in [Limits](limits.html#limits)).

API Example

const VkDescriptorSetLayout layouts[] = { layout1, layout2 };

const VkPushConstantRange ranges[] =
{
    {
        .stageFlags = VK_SHADER_STAGE_VERTEX_BIT,
        .offset = 0,
        .size = 4
    },
    {
        .stageFlags = VK_SHADER_STAGE_FRAGMENT_BIT,
        .offset = 4,
        .size = 4
    },
};

const VkPipelineLayoutCreateInfo createInfo =
{
    .sType = VK_STRUCTURE_TYPE_PIPELINE_LAYOUT_CREATE_INFO,
    .pNext = NULL,
    .flags = 0,
    .setLayoutCount = 2,
    .pSetLayouts = layouts,
    .pushConstantRangeCount = 2,
    .pPushConstantRanges = ranges
};

VkPipelineLayout myPipelineLayout;
myResult = vkCreatePipelineLayout(
    myDevice,
    &createInfo,
    NULL,
    &myPipelineLayout);

A *descriptor pool* maintains a pool of descriptors, from which descriptor
sets are allocated.
Descriptor pools are externally synchronized, meaning that the application
**must** not allocate and/or free descriptor sets from the same pool in
multiple threads simultaneously.

Descriptor pools are represented by `VkDescriptorPool` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDescriptorPool)

To create a descriptor pool object, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateDescriptorPool(
    VkDevice                                    device,
    const VkDescriptorPoolCreateInfo*           pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDescriptorPool*                           pDescriptorPool);

* 
`device` is the logical device that creates the descriptor pool.

* 
`pCreateInfo` is a pointer to a [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)
structure specifying the state of the descriptor pool object.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pDescriptorPool` is a pointer to a [VkDescriptorPool](#VkDescriptorPool) handle in
which the resulting descriptor pool object is returned.

The created descriptor pool is returned in `pDescriptorPool`.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDescriptorPool-device-parameter) VUID-vkCreateDescriptorPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateDescriptorPool-pCreateInfo-parameter) VUID-vkCreateDescriptorPool-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo) structure

* 
[](#VUID-vkCreateDescriptorPool-pAllocator-parameter) VUID-vkCreateDescriptorPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDescriptorPool-pDescriptorPool-parameter) VUID-vkCreateDescriptorPool-pDescriptorPool-parameter

 `pDescriptorPool` **must** be a valid pointer to a [VkDescriptorPool](#VkDescriptorPool) handle

* 
[](#VUID-vkCreateDescriptorPool-device-queuecount) VUID-vkCreateDescriptorPool-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FRAGMENTATION_EXT](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Additional information about the pool is passed in a
`VkDescriptorPoolCreateInfo` structure:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorPoolCreateInfo {
    VkStructureType                sType;
    const void*                    pNext;
    VkDescriptorPoolCreateFlags    flags;
    uint32_t                       maxSets;
    uint32_t                       poolSizeCount;
    const VkDescriptorPoolSize*    pPoolSizes;
} VkDescriptorPoolCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDescriptorPoolCreateFlagBits](#VkDescriptorPoolCreateFlagBits)
specifying certain supported operations on the pool.

* 
`maxSets` is the maximum number of descriptor sets that **can** be
allocated from the pool.

* 
`poolSizeCount` is the number of elements in `pPoolSizes`.

* 
`pPoolSizes` is a pointer to an array of [VkDescriptorPoolSize](#VkDescriptorPoolSize)
structures, each containing a descriptor type and number of descriptors
of that type to be allocated in the pool.

If multiple `VkDescriptorPoolSize` structures containing the same
descriptor type appear in the `pPoolSizes` array then the pool will be
created with enough storage for the total number of descriptors of each
type.

Fragmentation of a descriptor pool is possible and **may** lead to descriptor
set allocation failures.
A failure due to fragmentation is defined as failing a descriptor set
allocation despite the sum of all outstanding descriptor set allocations
from the pool plus the requested allocation requiring no more than the total
number of descriptors requested at pool creation.
Implementations provide certain guarantees of when fragmentation **must** not
cause allocation failure, as described below.

If a descriptor pool has not had any descriptor sets freed since it was
created or most recently reset then fragmentation **must** not cause an
allocation failure (note that this is always the case for a pool created
without the [VK_DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT](#VkDescriptorPoolCreateFlagBits) bit
set).
Additionally, if all sets allocated from the pool since it was created or
most recently reset use the same number of descriptors (of each type) and
the requested allocation also uses that same number of descriptors (of each
type), then fragmentation **must** not cause an allocation failure.

If an allocation failure occurs due to fragmentation, an application **can**
create an additional descriptor pool to perform further descriptor set
allocations.

If `flags` has the [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits)
bit set, descriptor pool creation **may** fail with the error
[VK_ERROR_FRAGMENTATION](fundamentals.html#VkResult) if the total number of descriptors across all
pools (including this one) created with this bit set exceeds
`maxUpdateAfterBindDescriptorsInAllPools`, or if fragmentation of the
underlying hardware resources occurs.

If a `pPoolSizes`[i]::`type` is
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), a
[VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT) structure in the `pNext`
chain **can** be used to specify which mutable descriptor types **can** be
allocated from the pool.
If included in the `pNext` chain,
[VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT)::`pMutableDescriptorTypeLists`[i]
specifies which kind of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) descriptors
**can** be allocated from this pool entry.
If [VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT) does not exist in the
`pNext` chain, or
[VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT)::`pMutableDescriptorTypeLists`[i]
is out of range, the descriptor pool allocates enough memory to be able to
allocate a [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) descriptor with any
supported [VkDescriptorType](#VkDescriptorType) as a mutable descriptor.
A mutable descriptor **can** be allocated from a pool entry if the type list in
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) is a subset of the type list declared
in the descriptor pool, or if the pool entry is created without a descriptor
type list.
Multiple `pPoolSizes` entries with [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)
**can** be declared.
When multiple such pool entries are present in `pPoolSizes`, they
specify sets of supported descriptor types which either fully overlap,
partially overlap, or are disjoint.
Two sets fully overlap if the sets of supported descriptor types are equal.
If the sets are not disjoint they partially overlap.
A pool entry without a `VkMutableDescriptorTypeListEXT` assigned to it
is considered to partially overlap any other pool entry which has a
`VkMutableDescriptorTypeListEXT` assigned to it.
The application **must** ensure that partial overlap does not exist in
`pPoolSizes`.

|  | The requirement of no partial overlap is intended to resolve ambiguity for
| --- | --- |
validation as there is no confusion which `pPoolSizes` entries will be
allocated from.
An implementation is not expected to depend on this requirement. |

Valid Usage

* 
[](#VUID-VkDescriptorPoolCreateInfo-descriptorPoolOverallocation-09227) VUID-VkDescriptorPoolCreateInfo-descriptorPoolOverallocation-09227

If the [    `descriptorPoolOverallocation`](features.html#features-descriptorPoolOverallocation) feature is not enabled, or
`flags` does not have
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV](#VkDescriptorPoolCreateFlagBits) set,
`maxSets` **must** be greater than `0`

* 
[](#VUID-VkDescriptorPoolCreateInfo-flags-09228) VUID-VkDescriptorPoolCreateInfo-flags-09228

If `flags` has the
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV](#VkDescriptorPoolCreateFlagBits) or
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_POOLS_BIT_NV](#VkDescriptorPoolCreateFlagBits) bits
set, then [    `descriptorPoolOverallocation`](features.html#features-descriptorPoolOverallocation) **must** be enabled

* 
[](#VUID-VkDescriptorPoolCreateInfo-flags-04607) VUID-VkDescriptorPoolCreateInfo-flags-04607

If `flags` has the [VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](#VkDescriptorPoolCreateFlagBits)
bit set, then the [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits)
bit **must** not be set

* 
[](#VUID-VkDescriptorPoolCreateInfo-mutableDescriptorType-04608) VUID-VkDescriptorPoolCreateInfo-mutableDescriptorType-04608

If
[VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](features.html#VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT)::`mutableDescriptorType`
is not enabled, `pPoolSizes` **must** not contain a
`descriptorType` of [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)

* 
[](#VUID-VkDescriptorPoolCreateInfo-flags-04609) VUID-VkDescriptorPoolCreateInfo-flags-04609

If `flags` has the [VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](#VkDescriptorPoolCreateFlagBits)
bit set,
[VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](features.html#VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT)::`mutableDescriptorType`
**must** be enabled

* 
[](#VUID-VkDescriptorPoolCreateInfo-pPoolSizes-04787) VUID-VkDescriptorPoolCreateInfo-pPoolSizes-04787

If `pPoolSizes` contains a `descriptorType` of
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), any other
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) element in `pPoolSizes` **must**
not have sets of supported descriptor types which partially overlap

* 
[](#VUID-VkDescriptorPoolCreateInfo-pPoolSizes-09424) VUID-VkDescriptorPoolCreateInfo-pPoolSizes-09424

If `pPoolSizes` contains a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), the `pNext` chain
**must** include a [VkDescriptorPoolInlineUniformBlockCreateInfo](#VkDescriptorPoolInlineUniformBlockCreateInfo)
structure whose `maxInlineUniformBlockBindings` member is not zero

* 
[](#VUID-VkDescriptorPoolCreateInfo-pNext-09946) VUID-VkDescriptorPoolCreateInfo-pNext-09946

If a [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure is
included in the `pNext` chain, each member of
`pProcessingEngines` **must** be identical to an
[VkQueueFamilyDataGraphPropertiesARM](VK_ARM_data_graph/graphs.html#VkQueueFamilyDataGraphPropertiesARM)::`engine` retrieved from
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM) with the
`physicalDevice` that was used to create `device`

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorPoolCreateInfo-sType-sType) VUID-VkDescriptorPoolCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorPoolCreateInfo-pNext-pNext) VUID-VkDescriptorPoolCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM), [VkDescriptorPoolInlineUniformBlockCreateInfo](#VkDescriptorPoolInlineUniformBlockCreateInfo), or [VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT)

* 
[](#VUID-VkDescriptorPoolCreateInfo-sType-unique) VUID-VkDescriptorPoolCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorPoolCreateInfo-flags-parameter) VUID-VkDescriptorPoolCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkDescriptorPoolCreateFlagBits](#VkDescriptorPoolCreateFlagBits) values

* 
[](#VUID-VkDescriptorPoolCreateInfo-pPoolSizes-parameter) VUID-VkDescriptorPoolCreateInfo-pPoolSizes-parameter

 If `poolSizeCount` is not `0`, `pPoolSizes` **must** be a valid pointer to an array of `poolSizeCount` valid [VkDescriptorPoolSize](#VkDescriptorPoolSize) structures

In order to be able to allocate descriptor sets having
[inline uniform block](#descriptors-inlineuniformblock) bindings the
descriptor pool **must** be created with specifying the inline uniform block
binding capacity of the descriptor pool, in addition to the total inline
uniform data capacity in bytes which is specified through a
[VkDescriptorPoolSize](#VkDescriptorPoolSize) structure with a `descriptorType` value of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType).
This **can** be done by adding a
`VkDescriptorPoolInlineUniformBlockCreateInfo` structure to the
`pNext` chain of [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo).

The `VkDescriptorPoolInlineUniformBlockCreateInfo` structure is defined
as:

// Provided by VK_VERSION_1_3
typedef struct VkDescriptorPoolInlineUniformBlockCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           maxInlineUniformBlockBindings;
} VkDescriptorPoolInlineUniformBlockCreateInfo;

// Provided by VK_EXT_inline_uniform_block
// Equivalent to VkDescriptorPoolInlineUniformBlockCreateInfo
typedef VkDescriptorPoolInlineUniformBlockCreateInfo VkDescriptorPoolInlineUniformBlockCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxInlineUniformBlockBindings` is the number of inline uniform
block bindings to allocate.

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorPoolInlineUniformBlockCreateInfo-sType-sType) VUID-VkDescriptorPoolInlineUniformBlockCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_INLINE_UNIFORM_BLOCK_CREATE_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)

Bits which **can** be set in [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)::`flags`,
enabling operations on a descriptor pool, are:

// Provided by VK_VERSION_1_0
typedef enum VkDescriptorPoolCreateFlagBits {
    VK_DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT = 0x00000001,
  // Provided by VK_VERSION_1_2
    VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT = 0x00000002,
  // Provided by VK_EXT_mutable_descriptor_type
    VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT = 0x00000004,
  // Provided by VK_NV_descriptor_pool_overallocation
    VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV = 0x00000008,
  // Provided by VK_NV_descriptor_pool_overallocation
    VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_POOLS_BIT_NV = 0x00000010,
  // Provided by VK_EXT_descriptor_indexing
    VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT_EXT = VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT,
  // Provided by VK_VALVE_mutable_descriptor_type
    VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_VALVE = VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT,
} VkDescriptorPoolCreateFlagBits;

* 
[VK_DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT](#VkDescriptorPoolCreateFlagBits) specifies that
descriptor sets **can** return their individual allocations to the pool,
i.e. all of [vkAllocateDescriptorSets](#vkAllocateDescriptorSets), [vkFreeDescriptorSets](#vkFreeDescriptorSets),
and [vkResetDescriptorPool](#vkResetDescriptorPool) are allowed.
Otherwise, descriptor sets allocated from the pool **must** not be
individually freed back to the pool, i.e. only
[vkAllocateDescriptorSets](#vkAllocateDescriptorSets) and [vkResetDescriptorPool](#vkResetDescriptorPool) are
allowed.

* 
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits) specifies that
descriptor sets allocated from this pool **can** include bindings with the
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT) bit set.
It is valid to allocate descriptor sets that have bindings that do not
set the [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT) bit from a
pool that has [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits) set.

* 
[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](#VkDescriptorPoolCreateFlagBits) specifies that this
descriptor pool and the descriptor sets allocated from it reside
entirely in host memory and cannot be bound.
Similar to descriptor sets allocated without this flag, applications
**can** copy-from and copy-to descriptors sets allocated from this
descriptor pool.
Descriptor sets allocated from this pool are partially exempt from the
external synchronization requirement in
[vkUpdateDescriptorSetWithTemplateKHR](#vkUpdateDescriptorSetWithTemplateKHR) and
[vkUpdateDescriptorSets](#vkUpdateDescriptorSets).
Descriptor sets and their descriptors can be updated concurrently in
different threads, though the same descriptor **must** not be updated
concurrently by two threads.

* 
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_SETS_BIT_NV](#VkDescriptorPoolCreateFlagBits)
specifies that the implementation should allow the application to
allocate more than [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)::`maxSets`
descriptor set objects from the descriptor pool as available resources
allow.
The implementation **may** use the `maxSets` value to allocate the
initial available sets, but using zero is permitted.

* 
[VK_DESCRIPTOR_POOL_CREATE_ALLOW_OVERALLOCATION_POOLS_BIT_NV](#VkDescriptorPoolCreateFlagBits)
specifies that the implementation should allow the application to
allocate more descriptors from the pool than was specified by the
[VkDescriptorPoolSize](#VkDescriptorPoolSize)::`descriptorCount` for any descriptor
type as specified by
[VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)::`poolSizeCount` and
[VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)::`pPoolSizes`, as available
resources allow.
The implementation **may** use the `descriptorCount` for each
descriptor type to allocate the initial pool, but the application is
allowed to set the `poolSizeCount` to zero, or any of the
`descriptorCount` values in the `pPoolSizes` array to zero.

// Provided by VK_VERSION_1_0
typedef VkFlags VkDescriptorPoolCreateFlags;

`VkDescriptorPoolCreateFlags` is a bitmask type for setting a mask of
zero or more [VkDescriptorPoolCreateFlagBits](#VkDescriptorPoolCreateFlagBits).

The `VkDescriptorPoolSize` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorPoolSize {
    VkDescriptorType    type;
    uint32_t            descriptorCount;
} VkDescriptorPoolSize;

* 
`type` is the type of descriptor.

* 
`descriptorCount` is the number of descriptors of that type to
allocate.
If `type` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then
`descriptorCount` is the number of bytes to allocate for descriptors
of this type.

|  | When creating a descriptor pool that will contain descriptors for combined
| --- | --- |
image samplers of [multi-planar formats](formats.html#formats-multiplanar), an
application needs to account for non-trivial descriptor consumption when
choosing the `descriptorCount` value, as indicated by
[VkSamplerYcbcrConversionImageFormatProperties](capabilities.html#VkSamplerYcbcrConversionImageFormatProperties)::`combinedImageSamplerDescriptorCount`.

For simplicity the application **can** use the
[VkPhysicalDeviceMaintenance6Properties](limits.html#VkPhysicalDeviceMaintenance6Properties)::`maxCombinedImageSamplerDescriptorCount`
property, which is sized to accommodate any and all
[formats that require a sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the implementation. |

Valid Usage

* 
[](#VUID-VkDescriptorPoolSize-descriptorCount-00302) VUID-VkDescriptorPoolSize-descriptorCount-00302

`descriptorCount` **must** be greater than `0`

* 
[](#VUID-VkDescriptorPoolSize-type-02218) VUID-VkDescriptorPoolSize-type-02218

If `type` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then
`descriptorCount` **must** be a multiple of `4`

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorPoolSize-type-parameter) VUID-VkDescriptorPoolSize-type-parameter

 `type` **must** be a valid [VkDescriptorType](#VkDescriptorType) value

To destroy a descriptor pool, call:

// Provided by VK_VERSION_1_0
void vkDestroyDescriptorPool(
    VkDevice                                    device,
    VkDescriptorPool                            descriptorPool,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the descriptor pool.

* 
`descriptorPool` is the descriptor pool to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

When a pool is destroyed, all descriptor sets allocated from the pool are
implicitly freed and become invalid.
Descriptor sets allocated from a given pool do not need to be freed before
destroying that descriptor pool.

Valid Usage

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-00303) VUID-vkDestroyDescriptorPool-descriptorPool-00303

All submitted commands that refer to `descriptorPool` (via any
allocated descriptor sets) **must** have completed execution

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-00304) VUID-vkDestroyDescriptorPool-descriptorPool-00304

If `VkAllocationCallbacks` were provided when `descriptorPool`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-00305) VUID-vkDestroyDescriptorPool-descriptorPool-00305

If no `VkAllocationCallbacks` were provided when
`descriptorPool` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDescriptorPool-device-parameter) VUID-vkDestroyDescriptorPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-parameter) VUID-vkDestroyDescriptorPool-descriptorPool-parameter

 If `descriptorPool` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `descriptorPool` **must** be a valid [VkDescriptorPool](#VkDescriptorPool) handle

* 
[](#VUID-vkDestroyDescriptorPool-pAllocator-parameter) VUID-vkDestroyDescriptorPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-parent) VUID-vkDestroyDescriptorPool-descriptorPool-parent

 If `descriptorPool` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `descriptorPool` **must** be externally synchronized

Descriptor sets are allocated from descriptor pool objects, and are
represented by `VkDescriptorSet` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDescriptorSet)

To allocate descriptor sets from a descriptor pool, call:

// Provided by VK_VERSION_1_0
VkResult vkAllocateDescriptorSets(
    VkDevice                                    device,
    const VkDescriptorSetAllocateInfo*          pAllocateInfo,
    VkDescriptorSet*                            pDescriptorSets);

* 
`device` is the logical device that owns the descriptor pool.

* 
`pAllocateInfo` is a pointer to a [VkDescriptorSetAllocateInfo](#VkDescriptorSetAllocateInfo)
structure describing parameters of the allocation.

* 
`pDescriptorSets` is a pointer to an array of [VkDescriptorSet](#VkDescriptorSet)
handles in which the resulting descriptor set objects are returned.

The allocated descriptor sets are returned in `pDescriptorSets`.

When a descriptor set is allocated, the initial state is largely
uninitialized and all descriptors are **undefined**, with the exception that
samplers with a non-null `pImmutableSamplers` are initialized on
allocation.
Descriptors also become **undefined** if the underlying resource or view object
is destroyed.
Descriptor sets containing **undefined** descriptors **can** still be bound and
used, subject to the following conditions:

* 
For descriptor set bindings created with the
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](#VkDescriptorBindingFlagBitsEXT) bit set, all descriptors
in that binding that are dynamically used **must** have been populated
before the descriptor set is [consumed](#descriptors-binding).

* 
For descriptor set bindings created without the
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](#VkDescriptorBindingFlagBitsEXT) bit set, all descriptors
in that binding that are statically used **must** have been populated
before the descriptor set is [consumed](#descriptors-binding).

* 
Descriptor bindings with descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) **can** be **undefined** when
the descriptor set is [consumed](#descriptors-binding); though values in
that block will be **undefined**.

* 
Entries that are not used by a pipeline **can** have **undefined**
descriptors.

If a call to `vkAllocateDescriptorSets` would cause the total number of
descriptor sets allocated from the pool to exceed the value of
[VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)::`maxSets` used to create
`pAllocateInfo->descriptorPool`, then the allocation **may** fail due to
lack of space in the descriptor pool.
Similarly, the allocation **may** fail due to lack of space if the call to
`vkAllocateDescriptorSets` would cause the number of any given
descriptor type to exceed the sum of all the `descriptorCount` members
of each element of [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)::`pPoolSizes` with a
`type` equal to that type.

Additionally, the allocation **may** also fail if a call to
`vkAllocateDescriptorSets` would cause the total number of inline
uniform block bindings allocated from the pool to exceed the value of
[VkDescriptorPoolInlineUniformBlockCreateInfo](#VkDescriptorPoolInlineUniformBlockCreateInfo)::`maxInlineUniformBlockBindings`
used to create the descriptor pool.

If the allocation fails due to no more space in the descriptor pool, and not
because of system or device memory exhaustion, then
[VK_ERROR_OUT_OF_POOL_MEMORY](fundamentals.html#VkResult) **must** be returned.

`vkAllocateDescriptorSets` **can** be used to create multiple descriptor
sets.
If the creation of any of those descriptor sets fails, then the
implementation **must** destroy all successfully created descriptor set objects
from this command, set all entries of the `pDescriptorSets` array to
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and return the error.

Valid Usage (Implicit)

* 
[](#VUID-vkAllocateDescriptorSets-device-parameter) VUID-vkAllocateDescriptorSets-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkAllocateDescriptorSets-pAllocateInfo-parameter) VUID-vkAllocateDescriptorSets-pAllocateInfo-parameter

 `pAllocateInfo` **must** be a valid pointer to a valid [VkDescriptorSetAllocateInfo](#VkDescriptorSetAllocateInfo) structure

* 
[](#VUID-vkAllocateDescriptorSets-pDescriptorSets-parameter) VUID-vkAllocateDescriptorSets-pDescriptorSets-parameter

 `pDescriptorSets` **must** be a valid pointer to an array of `pAllocateInfo->descriptorSetCount` [VkDescriptorSet](#VkDescriptorSet) handles

* 
[](#VUID-vkAllocateDescriptorSets-device-queuecount) VUID-vkAllocateDescriptorSets-device-queuecount

 The device **must** have been created with at least `1` queue

* 
[](#VUID-vkAllocateDescriptorSets-pAllocateInfo::descriptorSetCount-arraylength) VUID-vkAllocateDescriptorSets-pAllocateInfo::descriptorSetCount-arraylength

 `pAllocateInfo->descriptorSetCount` **must** be greater than `0`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FRAGMENTED_POOL](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_POOL_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkDescriptorSetAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorSetAllocateInfo {
    VkStructureType                 sType;
    const void*                     pNext;
    VkDescriptorPool                descriptorPool;
    uint32_t                        descriptorSetCount;
    const VkDescriptorSetLayout*    pSetLayouts;
} VkDescriptorSetAllocateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorPool` is the pool which the sets will be allocated from.

* 
`descriptorSetCount` determines the number of descriptor sets to be
allocated from the pool.

* 
`pSetLayouts` is a pointer to an array of descriptor set layouts,
with each member specifying how the corresponding descriptor set is
allocated.

Valid Usage

* 
[](#VUID-VkDescriptorSetAllocateInfo-apiVersion-07895) VUID-VkDescriptorSetAllocateInfo-apiVersion-07895

If the [VK_KHR_maintenance1](../appendices/extensions.html#VK_KHR_maintenance1) extension is not enabled and
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than Vulkan
1.1,
`descriptorSetCount` **must** not be greater than the number of sets
that are currently available for allocation in `descriptorPool`

* 
[](#VUID-VkDescriptorSetAllocateInfo-apiVersion-07896) VUID-VkDescriptorSetAllocateInfo-apiVersion-07896

If the [VK_KHR_maintenance1](../appendices/extensions.html#VK_KHR_maintenance1) extension is not enabled and
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than Vulkan
1.1,
`descriptorPool` **must** have enough free descriptor capacity
remaining to allocate the descriptor sets of the specified layouts

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-00308) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-00308

Each element of `pSetLayouts` **must** not have been created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits) set

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-03044) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-03044

If any element of `pSetLayouts` was created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) bit
set, `descriptorPool` **must** have been created with the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits) flag set

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-09380) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-09380

If `pSetLayouts`[i] was created with an element of
`pBindingFlags` that includes
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT), and
[VkDescriptorSetVariableDescriptorCountAllocateInfo](#VkDescriptorSetVariableDescriptorCountAllocateInfo) is included in
the `pNext` chain, and
`VkDescriptorSetVariableDescriptorCountAllocateInfo`::`descriptorSetCount`
is not zero, then
[VkDescriptorSetVariableDescriptorCountAllocateInfo](#VkDescriptorSetVariableDescriptorCountAllocateInfo)::`pDescriptorCounts`[i]
**must** be less than or equal to
[VkDescriptorSetLayoutBinding](#VkDescriptorSetLayoutBinding)::`descriptorCount` for the
corresponding binding used to create `pSetLayouts`[i]

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-04610) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-04610

If any element of `pSetLayouts` was created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) bit set,
`descriptorPool` **must** have been created with the
[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](#VkDescriptorPoolCreateFlagBits) flag set

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-08009) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-08009

Each element of `pSetLayouts` **must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetAllocateInfo-sType-sType) VUID-VkDescriptorSetAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_ALLOCATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorSetAllocateInfo-pNext-pNext) VUID-VkDescriptorSetAllocateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDescriptorSetVariableDescriptorCountAllocateInfo](#VkDescriptorSetVariableDescriptorCountAllocateInfo)

* 
[](#VUID-VkDescriptorSetAllocateInfo-sType-unique) VUID-VkDescriptorSetAllocateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorSetAllocateInfo-descriptorPool-parameter) VUID-VkDescriptorSetAllocateInfo-descriptorPool-parameter

 `descriptorPool` **must** be a valid [VkDescriptorPool](#VkDescriptorPool) handle

* 
[](#VUID-VkDescriptorSetAllocateInfo-pSetLayouts-parameter) VUID-VkDescriptorSetAllocateInfo-pSetLayouts-parameter

 `pSetLayouts` **must** be a valid pointer to an array of `descriptorSetCount` valid [VkDescriptorSetLayout](#VkDescriptorSetLayout) handles

* 
[](#VUID-VkDescriptorSetAllocateInfo-descriptorSetCount-arraylength) VUID-VkDescriptorSetAllocateInfo-descriptorSetCount-arraylength

 `descriptorSetCount` **must** be greater than `0`

* 
[](#VUID-VkDescriptorSetAllocateInfo-commonparent) VUID-VkDescriptorSetAllocateInfo-commonparent

 Both of `descriptorPool`, and the elements of `pSetLayouts` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `descriptorPool` **must** be externally synchronized

If the `pNext` chain of a [VkDescriptorSetAllocateInfo](#VkDescriptorSetAllocateInfo) structure
includes a `VkDescriptorSetVariableDescriptorCountAllocateInfo`
structure, then that structure includes an array of descriptor counts for
variable-sized descriptor bindings, one for each descriptor set being
allocated.

The `VkDescriptorSetVariableDescriptorCountAllocateInfo` structure is
defined as:

// Provided by VK_VERSION_1_2
typedef struct VkDescriptorSetVariableDescriptorCountAllocateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           descriptorSetCount;
    const uint32_t*    pDescriptorCounts;
} VkDescriptorSetVariableDescriptorCountAllocateInfo;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkDescriptorSetVariableDescriptorCountAllocateInfo
typedef VkDescriptorSetVariableDescriptorCountAllocateInfo VkDescriptorSetVariableDescriptorCountAllocateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorSetCount` is zero or the number of elements in
`pDescriptorCounts`.

* 
`pDescriptorCounts` is a pointer to an array of descriptor counts,
with each member specifying the number of descriptors in a
variable-sized descriptor binding in the corresponding descriptor set
being allocated.

If `descriptorSetCount` is zero or this structure is not included in the
`pNext` chain, then the variable lengths are considered to be zero.
Otherwise, `pDescriptorCounts`[i] is the number of descriptors in the
variable-sized descriptor binding in the corresponding descriptor set
layout.
If the variable-sized descriptor binding in the corresponding descriptor set
layout has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then
`pDescriptorCounts`[i] specifies the binding’s capacity in bytes.
If [VkDescriptorSetAllocateInfo](#VkDescriptorSetAllocateInfo)::`pSetLayouts`[i] does not include
a variable-sized descriptor binding, then `pDescriptorCounts`[i] is
ignored.

Valid Usage

* 
[](#VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-descriptorSetCount-03045) VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-descriptorSetCount-03045

If `descriptorSetCount` is not zero, `descriptorSetCount` **must**
equal [VkDescriptorSetAllocateInfo](#VkDescriptorSetAllocateInfo)::`descriptorSetCount`

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-sType-sType) VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_ALLOCATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-pDescriptorCounts-parameter) VUID-VkDescriptorSetVariableDescriptorCountAllocateInfo-pDescriptorCounts-parameter

 If `descriptorSetCount` is not `0`, `pDescriptorCounts` **must** be a valid pointer to an array of `descriptorSetCount` `uint32_t` values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorSetAllocateInfo](#VkDescriptorSetAllocateInfo)

To free allocated descriptor sets, call:

// Provided by VK_VERSION_1_0
VkResult vkFreeDescriptorSets(
    VkDevice                                    device,
    VkDescriptorPool                            descriptorPool,
    uint32_t                                    descriptorSetCount,
    const VkDescriptorSet*                      pDescriptorSets);

* 
`device` is the logical device that owns the descriptor pool.

* 
`descriptorPool` is the descriptor pool from which the descriptor
sets were allocated.

* 
`descriptorSetCount` is the number of elements in the
`pDescriptorSets` array.

* 
`pDescriptorSets` is a pointer to an array of handles to
[VkDescriptorSet](#VkDescriptorSet) objects.

After calling `vkFreeDescriptorSets`, all descriptor sets in
`pDescriptorSets` are invalid.

Valid Usage

* 
[](#VUID-vkFreeDescriptorSets-pDescriptorSets-00309) VUID-vkFreeDescriptorSets-pDescriptorSets-00309

All submitted commands that refer to any element of
`pDescriptorSets` **must** have completed execution

* 
[](#VUID-vkFreeDescriptorSets-pDescriptorSets-00310) VUID-vkFreeDescriptorSets-pDescriptorSets-00310

`pDescriptorSets` **must** be a valid pointer to an array of
`descriptorSetCount` `VkDescriptorSet` handles, each element of
which **must** either be a valid handle or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkFreeDescriptorSets-descriptorPool-00312) VUID-vkFreeDescriptorSets-descriptorPool-00312

`descriptorPool` **must** have been created with the
[VK_DESCRIPTOR_POOL_CREATE_FREE_DESCRIPTOR_SET_BIT](#VkDescriptorPoolCreateFlagBits) flag

Valid Usage (Implicit)

* 
[](#VUID-vkFreeDescriptorSets-device-parameter) VUID-vkFreeDescriptorSets-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkFreeDescriptorSets-descriptorPool-parameter) VUID-vkFreeDescriptorSets-descriptorPool-parameter

 `descriptorPool` **must** be a valid [VkDescriptorPool](#VkDescriptorPool) handle

* 
[](#VUID-vkFreeDescriptorSets-descriptorSetCount-arraylength) VUID-vkFreeDescriptorSets-descriptorSetCount-arraylength

 `descriptorSetCount` **must** be greater than `0`

* 
[](#VUID-vkFreeDescriptorSets-descriptorPool-parent) VUID-vkFreeDescriptorSets-descriptorPool-parent

 `descriptorPool` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkFreeDescriptorSets-pDescriptorSets-parent) VUID-vkFreeDescriptorSets-pDescriptorSets-parent

 Each element of `pDescriptorSets` that is a valid handle **must** have been created, allocated, or retrieved from `descriptorPool`

Host Synchronization

* 
Host access to `descriptorPool` **must** be externally synchronized

* 
Host access to each member of `pDescriptorSets` **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To return all descriptor sets allocated from a given pool to the pool,
rather than freeing individual descriptor sets, call:

// Provided by VK_VERSION_1_0
VkResult vkResetDescriptorPool(
    VkDevice                                    device,
    VkDescriptorPool                            descriptorPool,
    VkDescriptorPoolResetFlags                  flags);

* 
`device` is the logical device that owns the descriptor pool.

* 
`descriptorPool` is the descriptor pool to be reset.

* 
`flags` is reserved for future use.

Resetting a descriptor pool recycles all of the resources from all of the
descriptor sets allocated from the descriptor pool back to the descriptor
pool, and the descriptor sets are implicitly freed.

Valid Usage

* 
[](#VUID-vkResetDescriptorPool-descriptorPool-00313) VUID-vkResetDescriptorPool-descriptorPool-00313

All uses of `descriptorPool` (via any allocated descriptor sets)
**must** have completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkResetDescriptorPool-device-parameter) VUID-vkResetDescriptorPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkResetDescriptorPool-descriptorPool-parameter) VUID-vkResetDescriptorPool-descriptorPool-parameter

 `descriptorPool` **must** be a valid [VkDescriptorPool](#VkDescriptorPool) handle

* 
[](#VUID-vkResetDescriptorPool-flags-zerobitmask) VUID-vkResetDescriptorPool-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-vkResetDescriptorPool-descriptorPool-parent) VUID-vkResetDescriptorPool-descriptorPool-parent

 `descriptorPool` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `descriptorPool` **must** be externally synchronized

* 
Host access to any `VkDescriptorSet` objects allocated from `descriptorPool` **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

// Provided by VK_VERSION_1_0
typedef VkFlags VkDescriptorPoolResetFlags;

`VkDescriptorPoolResetFlags` is a bitmask type for setting a mask, but
is currently reserved for future use.

Once allocated, descriptor sets **can** be updated with a combination of write
and copy operations.
To update descriptor sets, call:

// Provided by VK_VERSION_1_0
void vkUpdateDescriptorSets(
    VkDevice                                    device,
    uint32_t                                    descriptorWriteCount,
    const VkWriteDescriptorSet*                 pDescriptorWrites,
    uint32_t                                    descriptorCopyCount,
    const VkCopyDescriptorSet*                  pDescriptorCopies);

* 
`device` is the logical device that updates the descriptor sets.

* 
`descriptorWriteCount` is the number of elements in the
`pDescriptorWrites` array.

* 
`pDescriptorWrites` is a pointer to an array of
[VkWriteDescriptorSet](#VkWriteDescriptorSet) structures describing the descriptor sets to
write to.

* 
`descriptorCopyCount` is the number of elements in the
`pDescriptorCopies` array.

* 
`pDescriptorCopies` is a pointer to an array of
[VkCopyDescriptorSet](#VkCopyDescriptorSet) structures describing the descriptor sets to
copy between.

The operations described by `pDescriptorWrites` are performed first,
followed by the operations described by `pDescriptorCopies`.
Within each array, the operations are performed in the order they appear in
the array.

Each element in the `pDescriptorWrites` array describes an operation
updating the descriptor set using descriptors for resources specified in the
structure.

Each element in the `pDescriptorCopies` array is a
[VkCopyDescriptorSet](#VkCopyDescriptorSet) structure describing an operation copying
descriptors between sets.

If the `dstSet` member of any element of `pDescriptorWrites` or
`pDescriptorCopies` is bound, accessed, or modified by any command that
was recorded to a command buffer which is currently in the
[recording or executable state](cmdbuffers.html#commandbuffers-lifecycle),
and any of the descriptor bindings that are updated were not created with
the [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT) or
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](#VkDescriptorBindingFlagBitsEXT) bits set,
that command buffer becomes [invalid](cmdbuffers.html#commandbuffers-lifecycle).

Copying a descriptor from a descriptor set does not constitute a use of the
referenced resource or view, as it is the reference itself that is copied.
Applications **can** copy a descriptor referencing a destroyed resource, and it
**can** copy an **undefined** descriptor.
The destination descriptor becomes **undefined** in both cases.

Valid Usage

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-06236) VUID-vkUpdateDescriptorSets-pDescriptorWrites-06236

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType), elements of the
`pTexelBufferView` member of `pDescriptorWrites`[i] **must** have
been created on `device`

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-06237) VUID-vkUpdateDescriptorSets-pDescriptorWrites-06237

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType), the `buffer` member
of any element of the `pBufferInfo` member of
`pDescriptorWrites`[i] **must** have been created on `device`

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-06238) VUID-vkUpdateDescriptorSets-pDescriptorWrites-06238

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), and `dstSet` was
not allocated with a layout that included immutable samplers for
`dstBinding` with `descriptorType`, the `sampler` member of
any element of the `pImageInfo` member of `pDescriptorWrites`[i]
**must** have been created on `device`

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-06239) VUID-vkUpdateDescriptorSets-pDescriptorWrites-06239

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](#VkDescriptorType),
or [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) the `imageView`
member of any element of `pDescriptorWrites`[i] **must** have been
created on `device`

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-06240) VUID-vkUpdateDescriptorSets-pDescriptorWrites-06240

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType), elements of the
`pAccelerationStructures` member of a
[VkWriteDescriptorSetAccelerationStructureKHR](#VkWriteDescriptorSetAccelerationStructureKHR) structure in the
`pNext` chain of `pDescriptorWrites`[i] **must** have been created
on `device`

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-06241) VUID-vkUpdateDescriptorSets-pDescriptorWrites-06241

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType), elements of the
`pAccelerationStructures` member of a
[VkWriteDescriptorSetAccelerationStructureNV](#VkWriteDescriptorSetAccelerationStructureNV) structure in the
`pNext` chain of `pDescriptorWrites`[i] **must** have been created
on `device`

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-12324) VUID-vkUpdateDescriptorSets-pDescriptorWrites-12324

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType), elements of the `pTensorViews`
member of a [VkWriteDescriptorSetTensorARM](#VkWriteDescriptorSetTensorARM) structure in the
`pNext` chain of `pDescriptorWrites`[i] **must** have been created
on `device`

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-06493) VUID-vkUpdateDescriptorSets-pDescriptorWrites-06493

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](#VkDescriptorType),
or [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType),
`pDescriptorWrites`[i].`pImageInfo` **must** be a valid pointer to
an array of `pDescriptorWrites`[i].`descriptorCount` valid
`VkDescriptorImageInfo` structures

* 
[](#VUID-vkUpdateDescriptorSets-None-03047) VUID-vkUpdateDescriptorSets-None-03047

The `dstSet` member of each element of `pDescriptorWrites` or
`pDescriptorCopies`
for bindings which were created without the
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT) or
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](#VkDescriptorBindingFlagBitsEXT) bits set
**must** not be used by any command that was recorded to a command buffer
which is in the [pending state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-06993) VUID-vkUpdateDescriptorSets-pDescriptorWrites-06993

Host access to `pDescriptorWrites`[i].`dstSet` and
`pDescriptorCopies`[i].`dstSet` **must** be
[externally synchronized](fundamentals.html#fundamentals-threadingbehavior)
unless explicitly denoted otherwise for specific flags

Valid Usage (Implicit)

* 
[](#VUID-vkUpdateDescriptorSets-device-parameter) VUID-vkUpdateDescriptorSets-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorWrites-parameter) VUID-vkUpdateDescriptorSets-pDescriptorWrites-parameter

 If `descriptorWriteCount` is not `0`, `pDescriptorWrites` **must** be a valid pointer to an array of `descriptorWriteCount` valid [VkWriteDescriptorSet](#VkWriteDescriptorSet) structures

* 
[](#VUID-vkUpdateDescriptorSets-pDescriptorCopies-parameter) VUID-vkUpdateDescriptorSets-pDescriptorCopies-parameter

 If `descriptorCopyCount` is not `0`, `pDescriptorCopies` **must** be a valid pointer to an array of `descriptorCopyCount` valid [VkCopyDescriptorSet](#VkCopyDescriptorSet) structures

The `VkWriteDescriptorSet` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkWriteDescriptorSet {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDescriptorSet                  dstSet;
    uint32_t                         dstBinding;
    uint32_t                         dstArrayElement;
    uint32_t                         descriptorCount;
    VkDescriptorType                 descriptorType;
    const VkDescriptorImageInfo*     pImageInfo;
    const VkDescriptorBufferInfo*    pBufferInfo;
    const VkBufferView*              pTexelBufferView;
} VkWriteDescriptorSet;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dstSet` is the destination descriptor set to update.

* 
`dstBinding` is the descriptor binding within that set.

* 
`dstArrayElement` is the starting element in that array.
If the descriptor binding identified by `dstSet` and
`dstBinding` has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then `dstArrayElement`
specifies the starting byte offset within the binding.

* 
`descriptorCount` is the number of descriptors to update.
If the descriptor binding identified by `dstSet` and
`dstBinding` has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), then
`descriptorCount` specifies the number of bytes to update.
Otherwise,
`descriptorCount` is one of

the number of elements in `pImageInfo`

* 
the number of elements in `pBufferInfo`

* 
the number of elements in `pTexelBufferView`

* 
a value matching the `dataSize` member of a
[VkWriteDescriptorSetInlineUniformBlock](#VkWriteDescriptorSetInlineUniformBlock) structure in the
`pNext` chain

* 
a value matching the `accelerationStructureCount` of a
[VkWriteDescriptorSetAccelerationStructureKHR](#VkWriteDescriptorSetAccelerationStructureKHR)
or
[VkWriteDescriptorSetAccelerationStructureNV](#VkWriteDescriptorSetAccelerationStructureNV)
     structure in the `pNext` chain

* 
a value matching the `descriptorCount` of a
[VkWriteDescriptorSetTensorARM](#VkWriteDescriptorSetTensorARM) structure in the `pNext` chain

`descriptorType` is a [VkDescriptorType](#VkDescriptorType) specifying the type of
each descriptor in `pImageInfo`, `pBufferInfo`, or
`pTexelBufferView`, as described below.
If `VkDescriptorSetLayoutBinding` for `dstSet` at
`dstBinding` is not equal to [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType),
`descriptorType` **must**
be the same type as the `descriptorType` specified in
`VkDescriptorSetLayoutBinding` for `dstSet` at `dstBinding`.
The type of the descriptor also controls which array the descriptors are
taken from.

`pImageInfo` is a pointer to an array of [VkDescriptorImageInfo](#VkDescriptorImageInfo)
structures or is ignored, as described below.

`pBufferInfo` is a pointer to an array of
[VkDescriptorBufferInfo](#VkDescriptorBufferInfo) structures or is ignored, as described
below.

`pTexelBufferView` is a pointer to an array of [VkBufferView](resources.html#VkBufferView)
handles as described in the [Buffer Views](resources.html#resources-buffer-views)
section or is ignored, as described below.

Members of `pImageInfo`, `pBufferInfo` and `pTexelBufferView`
are only accessed by the implementation when they correspond to a descriptor
type being defined - otherwise they are ignored.
The members accessed are as follows for each descriptor type:

* 
For [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType), only the `sampler` member of
each element of [VkWriteDescriptorSet](#VkWriteDescriptorSet)::`pImageInfo` is
accessed.

* 
For [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType), only the `imageView` and
`imageLayout` members of each element of
[VkWriteDescriptorSet](#VkWriteDescriptorSet)::`pImageInfo` are accessed.

* 
For [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), all members of each
element of [VkWriteDescriptorSet](#VkWriteDescriptorSet)::`pImageInfo` are accessed.

* 
For [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType), all members of each
element of [VkWriteDescriptorSet](#VkWriteDescriptorSet)::`pBufferInfo` are accessed.

* 
For [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType), each element of
[VkWriteDescriptorSet](#VkWriteDescriptorSet)::`pTexelBufferView` is accessed.

When updating descriptor sets with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), none of the `pImageInfo`,
`pBufferInfo`, or `pTexelBufferView` members are accessed, instead
the source data of the descriptor update operation is taken from the
[VkWriteDescriptorSetInlineUniformBlock](#VkWriteDescriptorSetInlineUniformBlock) structure in the `pNext`
chain of `VkWriteDescriptorSet`.
When updating descriptor sets with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType), none of the
`pImageInfo`, `pBufferInfo`, or `pTexelBufferView` members are
accessed, instead the source data of the descriptor update operation is
taken from the [VkWriteDescriptorSetAccelerationStructureKHR](#VkWriteDescriptorSetAccelerationStructureKHR) structure
in the `pNext` chain of `VkWriteDescriptorSet`.
When updating descriptor sets with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType), none of the
`pImageInfo`, `pBufferInfo`, or `pTexelBufferView` members are
accessed, instead the source data of the descriptor update operation is
taken from the [VkWriteDescriptorSetAccelerationStructureNV](#VkWriteDescriptorSetAccelerationStructureNV) structure
in the `pNext` chain of `VkWriteDescriptorSet`.
When updating descriptor sets with a `descriptorType` of
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType), none of the `pImageInfo`,
`pBufferInfo`, or `pTexelBufferView` members are accessed, instead
the source data of the descriptor update operation is taken from the
instance of [VkWriteDescriptorSetTensorARM](#VkWriteDescriptorSetTensorARM) in the `pNext` chain of
[VkWriteDescriptorSet](#VkWriteDescriptorSet).

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
the buffer,
acceleration structure,
tensor,
imageView, or bufferView **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).
Loads from a null descriptor return zero values and stores and atomics to a
null descriptor are discarded.
A null acceleration structure descriptor results in the miss shader being
invoked.

If the destination descriptor is a mutable descriptor, the active descriptor
type for the destination descriptor becomes `descriptorType`.

Consecutive Binding Updates
If the `dstBinding` has fewer than `descriptorCount` array elements
remaining starting from `dstArrayElement`, then the remainder will be
used to update the subsequent binding - `dstBinding`+1 starting at
array element zero.
If a binding has a `descriptorCount` of zero, it is skipped.
This behavior applies recursively, with the update affecting consecutive
bindings as needed to update all `descriptorCount` descriptors.
Consecutive bindings **must** have identical [VkDescriptorType](#VkDescriptorType),
[VkShaderStageFlags](pipelines.html#VkShaderStageFlags),
[VkDescriptorBindingFlagBits](#VkDescriptorBindingFlagBits),
and immutable samplers references.
In addition, if the [VkDescriptorType](#VkDescriptorType) is
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), the supported descriptor types in
[VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT) **must** be equally defined.

|  | The same behavior applies to bindings with a descriptor type of
| --- | --- |
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) where `descriptorCount`
specifies the number of bytes to update while `dstArrayElement`
specifies the starting byte offset, thus in this case if the
`dstBinding` has a smaller byte size than the sum of
`dstArrayElement` and `descriptorCount`, then the remainder will be
used to update the subsequent binding - `dstBinding`+1 starting at
offset zero.
This falls out as a special case of the above rule. |

Valid Usage

* 
[](#VUID-VkWriteDescriptorSet-dstBinding-00315) VUID-VkWriteDescriptorSet-dstBinding-00315

`dstBinding` **must** be less than or equal to the maximum value of
`binding` of all [VkDescriptorSetLayoutBinding](#VkDescriptorSetLayoutBinding) structures
specified when `dstSet`’s descriptor set layout was created

* 
[](#VUID-VkWriteDescriptorSet-dstBinding-00316) VUID-VkWriteDescriptorSet-dstBinding-00316

`dstBinding` **must** be a binding with a non-zero
`descriptorCount`

* 
[](#VUID-VkWriteDescriptorSet-dstBinding-10009) VUID-VkWriteDescriptorSet-dstBinding-10009

`dstBinding` **must** be a binding with a non-zero
[VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo)::`bindingCount`

* 
[](#VUID-VkWriteDescriptorSet-descriptorCount-00317) VUID-VkWriteDescriptorSet-descriptorCount-00317

All consecutive bindings updated via a single `VkWriteDescriptorSet`
structure, except those with a `descriptorCount` of zero, **must** have
identical `descriptorType`

* 
[](#VUID-VkWriteDescriptorSet-descriptorCount-10776) VUID-VkWriteDescriptorSet-descriptorCount-10776

All consecutive bindings updated via a single `VkWriteDescriptorSet`
structure, except those with a `descriptorCount` of zero, **must** have
identical `stageFlags`

* 
[](#VUID-VkWriteDescriptorSet-descriptorCount-00318) VUID-VkWriteDescriptorSet-descriptorCount-00318

All consecutive bindings updated via a single `VkWriteDescriptorSet`
structure, except those with a `descriptorCount` of zero, **must** all
either use immutable samplers or **must** all not use immutable samplers

* 
[](#VUID-VkWriteDescriptorSet-descriptorCount-10777) VUID-VkWriteDescriptorSet-descriptorCount-10777

All consecutive bindings updated via a single `VkWriteDescriptorSet`
structure, except those with a `descriptorCount` of zero, **must** have
identical [VkDescriptorBindingFlagBits](#VkDescriptorBindingFlagBits)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00319) VUID-VkWriteDescriptorSet-descriptorType-00319

`descriptorType` **must** match the type of `dstBinding` within
`dstSet`

* 
[](#VUID-VkWriteDescriptorSet-dstSet-00320) VUID-VkWriteDescriptorSet-dstSet-00320

`dstSet` **must** be a valid [VkDescriptorSet](#VkDescriptorSet) handle

* 
[](#VUID-VkWriteDescriptorSet-dstArrayElement-00321) VUID-VkWriteDescriptorSet-dstArrayElement-00321

The sum of `dstArrayElement` and `descriptorCount` **must** be less
than or equal to the number of array elements in the descriptor set
binding specified by `dstBinding`, and all applicable
[consecutive bindings](#descriptors-sets-updates-consecutive)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02219) VUID-VkWriteDescriptorSet-descriptorType-02219

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), `dstArrayElement`
**must** be an integer multiple of `4`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02220) VUID-VkWriteDescriptorSet-descriptorType-02220

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), `descriptorCount`
**must** be an integer multiple of `4`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02994) VUID-VkWriteDescriptorSet-descriptorType-02994

If `descriptorType` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType)
or [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType), each element of
`pTexelBufferView` **must** be either a valid `VkBufferView` handle
or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02995) VUID-VkWriteDescriptorSet-descriptorType-02995

If `descriptorType` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType)
or [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType) and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, each element of `pTexelBufferView` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00324) VUID-VkWriteDescriptorSet-descriptorType-00324

If `descriptorType` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType), `pBufferInfo` **must**
be a valid pointer to an array of `descriptorCount` valid
`VkDescriptorBufferInfo` structures

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00325) VUID-VkWriteDescriptorSet-descriptorType-00325

If `descriptorType` is [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), and `dstSet` was
not allocated with a layout that included immutable samplers for
`dstBinding` with `descriptorType`, the `sampler` member of
each element of `pImageInfo` **must** be a valid `VkSampler` object

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02996) VUID-VkWriteDescriptorSet-descriptorType-02996

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), the `imageView` member of
each element of `pImageInfo` **must** be either a valid
`VkImageView` handle or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02997) VUID-VkWriteDescriptorSet-descriptorType-02997

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, the `imageView` member of each element of `pImageInfo`
**must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-07683) VUID-VkWriteDescriptorSet-descriptorType-07683

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType), then the `imageView`
member of each element of `pImageInfo` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02221) VUID-VkWriteDescriptorSet-descriptorType-02221

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), the `pNext` chain
**must** include a [VkWriteDescriptorSetInlineUniformBlock](#VkWriteDescriptorSetInlineUniformBlock) structure
whose `dataSize` member equals `descriptorCount`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02382) VUID-VkWriteDescriptorSet-descriptorType-02382

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType), the `pNext`
chain **must** include a [VkWriteDescriptorSetAccelerationStructureKHR](#VkWriteDescriptorSetAccelerationStructureKHR)
structure whose `accelerationStructureCount` member equals
`descriptorCount`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-03817) VUID-VkWriteDescriptorSet-descriptorType-03817

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType), the `pNext`
chain **must** include a [VkWriteDescriptorSetAccelerationStructureNV](#VkWriteDescriptorSetAccelerationStructureNV)
structure whose `accelerationStructureCount` member equals
`descriptorCount`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-09945) VUID-VkWriteDescriptorSet-descriptorType-09945

If `descriptorType` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType), the
`pNext` chain **must** include a [VkWriteDescriptorSetTensorARM](#VkWriteDescriptorSetTensorARM)
structure whose `tensorViewCount` member equals
`descriptorCount`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-01946) VUID-VkWriteDescriptorSet-descriptorType-01946

If `descriptorType` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), then
the `imageView` member of each `pImageInfo` element **must** have
been created without a `VkSamplerYcbcrConversionInfo` structure in
its `pNext` chain

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02738) VUID-VkWriteDescriptorSet-descriptorType-02738

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), and if any element of
`pImageInfo` has an `imageView` member that was created with a
`VkSamplerYcbcrConversionInfo` structure in its `pNext` chain,
then `dstSet` **must** have been allocated with a layout that included
immutable samplers for `dstBinding`, and the corresponding immutable
sampler **must** have been created with an
[identically defined](../appendices/glossary.html#glossary-identically-defined)
`VkSamplerYcbcrConversionInfo` object

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-01948) VUID-VkWriteDescriptorSet-descriptorType-01948

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), and `dstSet` was
allocated with a layout that included immutable samplers for
`dstBinding`, then the `imageView` member of each element of
`pImageInfo` which corresponds to an immutable sampler that enables
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) **must** have been
created with a `VkSamplerYcbcrConversionInfo` structure in its
`pNext` chain with an [identically    defined](../appendices/glossary.html#glossary-identically-defined) `VkSamplerYcbcrConversionInfo` to the corresponding
immutable sampler

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-09506) VUID-VkWriteDescriptorSet-descriptorType-09506

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), `dstSet` was
allocated with a layout that included immutable samplers for
`dstBinding`, and those samplers enable
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion), then
`imageView` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00327) VUID-VkWriteDescriptorSet-descriptorType-00327

If `descriptorType` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType), the `offset` member
of each element of `pBufferInfo` **must** be a multiple of
`VkPhysicalDeviceLimits`::`minUniformBufferOffsetAlignment`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00328) VUID-VkWriteDescriptorSet-descriptorType-00328

If `descriptorType` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType), the `offset` member
of each element of `pBufferInfo` **must** be a multiple of
`VkPhysicalDeviceLimits`::`minStorageBufferOffsetAlignment`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00329) VUID-VkWriteDescriptorSet-descriptorType-00329

If `descriptorType` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType), and the `buffer`
member of any element of `pBufferInfo` is the handle of a non-sparse
buffer, then that buffer **must** be bound completely and contiguously to a
single `VkDeviceMemory` object

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00330) VUID-VkWriteDescriptorSet-descriptorType-00330

If `descriptorType` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType), the `buffer` member
of each element of `pBufferInfo` **must** have been created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00331) VUID-VkWriteDescriptorSet-descriptorType-00331

If `descriptorType` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType), the `buffer` member
of each element of `pBufferInfo` **must** have been created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00332) VUID-VkWriteDescriptorSet-descriptorType-00332

If `descriptorType` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType), the `range` member
of each element of `pBufferInfo`, or the
[effective range](#buffer-info-effective-range) if `range` is
[VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxUniformBufferRange`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00333) VUID-VkWriteDescriptorSet-descriptorType-00333

If `descriptorType` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType),
and the [`shader64BitIndexing`](features.html#features-shader64BitIndexing)
feature is not enabled,
the `range` member of each element of `pBufferInfo`, or the
[effective range](#buffer-info-effective-range) if `range` is
[VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxStorageBufferRange`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-08765) VUID-VkWriteDescriptorSet-descriptorType-08765

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType), the
`pTexelBufferView` [buffer view    usage](resources.html#resources-buffer-views-usage) **must** include [VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-08766) VUID-VkWriteDescriptorSet-descriptorType-08766

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType), the
`pTexelBufferView` [buffer view    usage](resources.html#resources-buffer-views-usage) **must** include [VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00336) VUID-VkWriteDescriptorSet-descriptorType-00336

If `descriptorType` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType), the `imageView` member of
each element of `pImageInfo` **must** have been created with the
[identity swizzle](resources.html#resources-image-views-identity-mappings)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00337) VUID-VkWriteDescriptorSet-descriptorType-00337

If `descriptorType` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), the `imageView`
member of each element of `pImageInfo` **must** have been created with
the [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-04149) VUID-VkWriteDescriptorSet-descriptorType-04149

If `descriptorType` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType) the
`imageLayout` member of each element of `pImageInfo` **must** be a
member of the list given in [Sampled Image](#descriptors-sampledimage)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-04150) VUID-VkWriteDescriptorSet-descriptorType-04150

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) the `imageLayout`
member of each element of `pImageInfo` **must** be a member of the list
given in [Combined Image Sampler](#descriptors-combinedimagesampler)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-04151) VUID-VkWriteDescriptorSet-descriptorType-04151

If `descriptorType` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType) the
`imageLayout` member of each element of `pImageInfo` **must** be a
member of the list given in [Input    Attachment](#descriptors-inputattachment)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-04152) VUID-VkWriteDescriptorSet-descriptorType-04152

If `descriptorType` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType) the
`imageLayout` member of each element of `pImageInfo` **must** be a
member of the list given in [Storage Image](#descriptors-storageimage)

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00338) VUID-VkWriteDescriptorSet-descriptorType-00338

If `descriptorType` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType),
the `imageView` member of each element of `pImageInfo` **must**
have been created with the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)
usage flag set

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-00339) VUID-VkWriteDescriptorSet-descriptorType-00339

If `descriptorType` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), the
`imageView` member of each element of `pImageInfo` **must** have
been created with the [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-02752) VUID-VkWriteDescriptorSet-descriptorType-02752

If `descriptorType` is [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType), then
`dstSet` **must** not have been allocated with a layout that included
immutable samplers for `dstBinding`

* 
[](#VUID-VkWriteDescriptorSet-dstSet-04611) VUID-VkWriteDescriptorSet-dstSet-04611

If the `VkDescriptorSetLayoutBinding` for `dstSet` at
`dstBinding` is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), the new active
descriptor type `descriptorType` **must** exist in the corresponding
`pMutableDescriptorTypeLists` list for `dstBinding`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-06450) VUID-VkWriteDescriptorSet-descriptorType-06450

If `descriptorType` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType),
the `imageView` member of each element of `pImageInfo` **must**
have either been created without a [VkImageViewMinLodCreateInfoEXT](resources.html#VkImageViewMinLodCreateInfoEXT)
included in the `pNext` chain or with a
[VkImageViewMinLodCreateInfoEXT](resources.html#VkImageViewMinLodCreateInfoEXT)::`minLod` of `0.0`

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-06942) VUID-VkWriteDescriptorSet-descriptorType-06942

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](#VkDescriptorType), the `imageView`
member of each element of `pImageInfo` **must** have been created with
a view created with an `image` created with the
[VK_IMAGE_USAGE_SAMPLE_WEIGHT_BIT_QCOM](resources.html#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-06943) VUID-VkWriteDescriptorSet-descriptorType-06943

If `descriptorType` is
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](#VkDescriptorType), the `imageView`
member of each element of `pImageInfo` **must** have been created with
a view created with an `image` created with the
[VK_IMAGE_USAGE_SAMPLE_BLOCK_MATCH_BIT_QCOM](resources.html#VkImageUsageFlagBits) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSet-sType-sType) VUID-VkWriteDescriptorSet-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET](fundamentals.html#VkStructureType)

* 
[](#VUID-VkWriteDescriptorSet-pNext-pNext) VUID-VkWriteDescriptorSet-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkWriteDescriptorSetAccelerationStructureKHR](#VkWriteDescriptorSetAccelerationStructureKHR), [VkWriteDescriptorSetAccelerationStructureNV](#VkWriteDescriptorSetAccelerationStructureNV), [VkWriteDescriptorSetInlineUniformBlock](#VkWriteDescriptorSetInlineUniformBlock), [VkWriteDescriptorSetPartitionedAccelerationStructureNV](#VkWriteDescriptorSetPartitionedAccelerationStructureNV), or [VkWriteDescriptorSetTensorARM](#VkWriteDescriptorSetTensorARM)

* 
[](#VUID-VkWriteDescriptorSet-sType-unique) VUID-VkWriteDescriptorSet-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkWriteDescriptorSet-descriptorType-parameter) VUID-VkWriteDescriptorSet-descriptorType-parameter

 `descriptorType` **must** be a valid [VkDescriptorType](#VkDescriptorType) value

* 
[](#VUID-VkWriteDescriptorSet-descriptorCount-arraylength) VUID-VkWriteDescriptorSet-descriptorCount-arraylength

 `descriptorCount` **must** be greater than `0`

* 
[](#VUID-VkWriteDescriptorSet-commonparent) VUID-VkWriteDescriptorSet-commonparent

 Both of `dstSet`, and the elements of `pTexelBufferView` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The `VkDescriptorBufferInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorBufferInfo {
    VkBuffer        buffer;
    VkDeviceSize    offset;
    VkDeviceSize    range;
} VkDescriptorBufferInfo;

* 
`buffer` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or
the buffer resource.

* 
`offset` is the offset in bytes from the start of `buffer`.
Access to buffer memory via this descriptor uses addressing that is
relative to this starting offset.

* 
`range` is the size in bytes that is used for this descriptor
update, or [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) to use the range from `offset` to the
end of the buffer.

|  | When setting `range` to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), the
| --- | --- |
[effective range](#buffer-info-effective-range) **must** not be larger than
the maximum range for the descriptor type ([`maxUniformBufferRange`](limits.html#limits-maxUniformBufferRange) or [`maxStorageBufferRange`](limits.html#limits-maxStorageBufferRange)).
This means that [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) is not typically useful in the common
case where uniform buffer descriptors are suballocated from a buffer that is
much larger than `maxUniformBufferRange`. |

For [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) and
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) descriptor types,
`offset` is the base offset from which the dynamic offset is applied and
`range` is the static size used for all dynamic offsets.

When `range` is [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) the effective range is calculated at
[vkUpdateDescriptorSets](#vkUpdateDescriptorSets) is by taking the size of `buffer` minus the
`offset`.

Valid Usage

* 
[](#VUID-VkDescriptorBufferInfo-offset-00340) VUID-VkDescriptorBufferInfo-offset-00340

`offset` **must** be less than the size of `buffer`

* 
[](#VUID-VkDescriptorBufferInfo-range-00341) VUID-VkDescriptorBufferInfo-range-00341

If `range` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `range` **must** be
greater than `0`

* 
[](#VUID-VkDescriptorBufferInfo-range-00342) VUID-VkDescriptorBufferInfo-range-00342

If `range` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `range` **must** be
less than or equal to the size of `buffer` minus `offset`

* 
[](#VUID-VkDescriptorBufferInfo-buffer-02998) VUID-VkDescriptorBufferInfo-buffer-02998

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `buffer` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorBufferInfo-buffer-02999) VUID-VkDescriptorBufferInfo-buffer-02999

If `buffer` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `offset` **must** be zero and
`range` **must** be [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorBufferInfo-buffer-parameter) VUID-VkDescriptorBufferInfo-buffer-parameter

 If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

The `VkDescriptorImageInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorImageInfo {
    VkSampler        sampler;
    VkImageView      imageView;
    VkImageLayout    imageLayout;
} VkDescriptorImageInfo;

* 
`sampler` is a sampler handle, and is used in descriptor updates for
types [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) and
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) if the binding being
updated does not use immutable samplers.

* 
`imageView` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or
an image view handle, and is used in descriptor updates for types
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), and
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType).

* 
`imageLayout` is the layout that the image subresources accessible
from `imageView` will be in at the time this descriptor is accessed.
`imageLayout` is used in descriptor updates for types
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), and
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType).

Members of `VkDescriptorImageInfo` that are not used in an update (as
described above) are ignored.

Valid Usage

* 
[](#VUID-VkDescriptorImageInfo-imageView-06712) VUID-VkDescriptorImageInfo-imageView-06712

`imageView` **must** not be a 2D array image view created from a 3D
image

* 
[](#VUID-VkDescriptorImageInfo-imageView-07795) VUID-VkDescriptorImageInfo-imageView-07795

If `imageView` is a 2D view created from a 3D image, then
`descriptorType` **must** be [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType)

* 
[](#VUID-VkDescriptorImageInfo-imageView-07796) VUID-VkDescriptorImageInfo-imageView-07796

If `imageView` is a 2D view created from a 3D image, then the image
**must** have been created with
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](resources.html#VkImageCreateFlagBits) set

* 
[](#VUID-VkDescriptorImageInfo-descriptorType-06713) VUID-VkDescriptorImageInfo-descriptorType-06713

If the [`image2DViewOf3D`](features.html#features-image2DViewOf3D) feature is
not enabled or `descriptorType` is not
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType) then
`imageView` **must** not be a 2D view created from a 3D image

* 
[](#VUID-VkDescriptorImageInfo-descriptorType-06714) VUID-VkDescriptorImageInfo-descriptorType-06714

If the [`sampler2DViewOf3D`](features.html#features-sampler2DViewOf3D) feature
is not enabled or `descriptorType` is not
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) then
`imageView` **must** not be a 2D view created from a 3D image

* 
[](#VUID-VkDescriptorImageInfo-imageView-01976) VUID-VkDescriptorImageInfo-imageView-01976

If `imageView` is created from a depth/stencil image, the
`aspectMask` used to create the `imageView` **must** include either
[VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or [VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits) but
not both

* 
[](#VUID-VkDescriptorImageInfo-imageLayout-09425) VUID-VkDescriptorImageInfo-imageLayout-09425

If `imageLayout` is [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
then the `aspectMask` used to create `imageView` **must** not
include either [VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkDescriptorImageInfo-imageLayout-09426) VUID-VkDescriptorImageInfo-imageLayout-09426

If `imageLayout` is
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), then the
`aspectMask` used to create `imageView` **must** not include
[VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkDescriptorImageInfo-sampler-01564) VUID-VkDescriptorImageInfo-sampler-01564

If `sampler` is used and the [VkFormat](formats.html#VkFormat) of the image is a
[multi-planar format](formats.html#formats-multiplanar), the image **must** have been
created with [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](resources.html#VkImageCreateFlagBits), and the
`aspectMask` of the `imageView` **must** be a valid
[multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkDescriptorImageInfo-mutableComparisonSamplers-04450) VUID-VkDescriptorImageInfo-mutableComparisonSamplers-04450

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`mutableComparisonSamplers`
is [VK_FALSE](fundamentals.html#VK_FALSE), then `sampler` **must** have been created with
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)::`compareEnable` set to [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorImageInfo-commonparent) VUID-VkDescriptorImageInfo-commonparent

 Both of `imageView`, and `sampler` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

If the `descriptorType` member of [VkWriteDescriptorSet](#VkWriteDescriptorSet) is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then the data to write to the
descriptor set is specified through a
`VkWriteDescriptorSetInlineUniformBlock` structure included in the
`pNext` chain of `VkWriteDescriptorSet`.

The `VkWriteDescriptorSetInlineUniformBlock` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkWriteDescriptorSetInlineUniformBlock {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           dataSize;
    const void*        pData;
} VkWriteDescriptorSetInlineUniformBlock;

// Provided by VK_EXT_inline_uniform_block
// Equivalent to VkWriteDescriptorSetInlineUniformBlock
typedef VkWriteDescriptorSetInlineUniformBlock VkWriteDescriptorSetInlineUniformBlockEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dataSize` is the number of bytes of inline uniform block data
pointed to by `pData`.

* 
`pData` is a pointer to `dataSize` number of bytes of data to
write to the inline uniform block.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetInlineUniformBlock-dataSize-02222) VUID-VkWriteDescriptorSetInlineUniformBlock-dataSize-02222

`dataSize` **must** be an integer multiple of `4`

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetInlineUniformBlock-sType-sType) VUID-VkWriteDescriptorSetInlineUniformBlock-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_INLINE_UNIFORM_BLOCK](fundamentals.html#VkStructureType)

* 
[](#VUID-VkWriteDescriptorSetInlineUniformBlock-pData-parameter) VUID-VkWriteDescriptorSetInlineUniformBlock-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-VkWriteDescriptorSetInlineUniformBlock-dataSize-arraylength) VUID-VkWriteDescriptorSetInlineUniformBlock-dataSize-arraylength

 `dataSize` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](#VkWriteDescriptorSet)

The `VkWriteDescriptorSetAccelerationStructureKHR` structure is defined
as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkWriteDescriptorSetAccelerationStructureKHR {
    VkStructureType                      sType;
    const void*                          pNext;
    uint32_t                             accelerationStructureCount;
    const VkAccelerationStructureKHR*    pAccelerationStructures;
} VkWriteDescriptorSetAccelerationStructureKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructureCount` is the number of elements in
`pAccelerationStructures`.

* 
`pAccelerationStructures` is a pointer to an array of
[VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) structures specifying the acceleration
structures to update.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-03579) VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-03579

Each acceleration structure in `pAccelerationStructures` **must** have
been created with a `type` of
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV) or
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-03580) VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-03580

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, each element of `pAccelerationStructures` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-sType-sType) VUID-VkWriteDescriptorSetAccelerationStructureKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_ACCELERATION_STRUCTURE_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-parameter) VUID-VkWriteDescriptorSetAccelerationStructureKHR-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handles

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureKHR-accelerationStructureCount-arraylength) VUID-VkWriteDescriptorSetAccelerationStructureKHR-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](#VkWriteDescriptorSet)

If the `descriptorType` member of [VkWriteDescriptorSet](#VkWriteDescriptorSet) is
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](#VkDescriptorType), then the
data to write to the descriptor set is specified through a
`VkWriteDescriptorSetPartitionedAccelerationStructureNV` structure
included in the `pNext` chain of `VkWriteDescriptorSet`.

The `VkWriteDescriptorSetPartitionedAccelerationStructureNV` structure
is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkWriteDescriptorSetPartitionedAccelerationStructureNV {
    VkStructureType           sType;
    void*                     pNext;
    uint32_t                  accelerationStructureCount;
    const VkDeviceAddress*    pAccelerationStructures;
} VkWriteDescriptorSetPartitionedAccelerationStructureNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructureCount` is the number of elements in
`pAccelerationStructures`.

* 
`pAccelerationStructures` is a pointer to an array of
`accelerationStructureCount` device addresses pointing to previously
built PTLAS.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-accelerationStructureCount-10511) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-accelerationStructureCount-10511

`accelerationStructureCount` **must** be equal to `descriptorCount`
in the extended structure

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-pAccelerationStructures-10512) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-pAccelerationStructures-10512

Each entry in `pAccelerationStructures` **must** be a valid address of
a PTLAS

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-sType-sType) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_PARTITIONED_ACCELERATION_STRUCTURE_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-pAccelerationStructures-parameter) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) `VkDeviceAddress` values

* 
[](#VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-accelerationStructureCount-arraylength) VUID-VkWriteDescriptorSetPartitionedAccelerationStructureNV-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](#VkWriteDescriptorSet)

The `VkWriteDescriptorSetAccelerationStructureNV` structure is defined
as:

// Provided by VK_NV_ray_tracing
typedef struct VkWriteDescriptorSetAccelerationStructureNV {
    VkStructureType                     sType;
    const void*                         pNext;
    uint32_t                            accelerationStructureCount;
    const VkAccelerationStructureNV*    pAccelerationStructures;
} VkWriteDescriptorSetAccelerationStructureNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructureCount` is the number of elements in
`pAccelerationStructures`.

* 
`pAccelerationStructures` is a pointer to an array of
[VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) structures specifying the acceleration
structures to update.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-03748) VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-03748

Each acceleration structure in `pAccelerationStructures` **must** have
been created with [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](resources.html#VkAccelerationStructureTypeNV)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-03749) VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-03749

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, each member of `pAccelerationStructures` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-sType-sType) VUID-VkWriteDescriptorSetAccelerationStructureNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_ACCELERATION_STRUCTURE_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-parameter) VUID-VkWriteDescriptorSetAccelerationStructureNV-pAccelerationStructures-parameter

 `pAccelerationStructures` **must** be a valid pointer to an array of `accelerationStructureCount` valid or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handles

* 
[](#VUID-VkWriteDescriptorSetAccelerationStructureNV-accelerationStructureCount-arraylength) VUID-VkWriteDescriptorSetAccelerationStructureNV-accelerationStructureCount-arraylength

 `accelerationStructureCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](#VkWriteDescriptorSet)

The `VkWriteDescriptorSetTensorARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkWriteDescriptorSetTensorARM {
    VkStructureType           sType;
    const void*               pNext;
    uint32_t                  tensorViewCount;
    const VkTensorViewARM*    pTensorViews;
} VkWriteDescriptorSetTensorARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorViewCount` is the number of elements in `pTensorViews`.

* 
`pTensorViews` are the tensor views that will be used to update the
descriptor set.

Valid Usage

* 
[](#VUID-VkWriteDescriptorSetTensorARM-nullDescriptor-09898) VUID-VkWriteDescriptorSetTensorARM-nullDescriptor-09898

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, each element of `pTensorViews` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkWriteDescriptorSetTensorARM-sType-sType) VUID-VkWriteDescriptorSetTensorARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_TENSOR_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkWriteDescriptorSetTensorARM-pTensorViews-parameter) VUID-VkWriteDescriptorSetTensorARM-pTensorViews-parameter

 `pTensorViews` **must** be a valid pointer to an array of `tensorViewCount` valid or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) [VkTensorViewARM](resources.html#VkTensorViewARM) handles

* 
[](#VUID-VkWriteDescriptorSetTensorARM-tensorViewCount-arraylength) VUID-VkWriteDescriptorSetTensorARM-tensorViewCount-arraylength

 `tensorViewCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkWriteDescriptorSet](#VkWriteDescriptorSet)

The `VkCopyDescriptorSet` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkCopyDescriptorSet {
    VkStructureType    sType;
    const void*        pNext;
    VkDescriptorSet    srcSet;
    uint32_t           srcBinding;
    uint32_t           srcArrayElement;
    VkDescriptorSet    dstSet;
    uint32_t           dstBinding;
    uint32_t           dstArrayElement;
    uint32_t           descriptorCount;
} VkCopyDescriptorSet;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`srcSet`, `srcBinding`, and `srcArrayElement` are the source
set, binding, and array element, respectively.
If the descriptor binding identified by `srcSet` and
`srcBinding` has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then `srcArrayElement`
specifies the starting byte offset within the binding to copy from.

* 
`dstSet`, `dstBinding`, and `dstArrayElement` are the
destination set, binding, and array element, respectively.
If the descriptor binding identified by `dstSet` and
`dstBinding` has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then `dstArrayElement`
specifies the starting byte offset within the binding to copy to.

* 
`descriptorCount` is the number of descriptors to copy from the
source to destination.
If `descriptorCount` is greater than the number of remaining array
elements in the source or destination binding, those affect consecutive
bindings in a manner similar to [VkWriteDescriptorSet](#VkWriteDescriptorSet) above.
If the descriptor binding identified by `srcSet` and
`srcBinding` has a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then `descriptorCount`
specifies the number of bytes to copy and the remaining array elements
in the source or destination binding refer to the remaining number of
bytes in those.

If the `VkDescriptorSetLayoutBinding` for `dstBinding` is
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) and `srcBinding` is not
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), the new active descriptor type becomes
the descriptor type of `srcBinding`.
If both `VkDescriptorSetLayoutBinding` for `srcBinding` and
`dstBinding` are [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), the active
descriptor type in each source descriptor is copied into the corresponding
destination descriptor.
The active descriptor type **can** be different for each source descriptor.

|  | The intention is that copies to and from mutable descriptors is a simple
| --- | --- |
memcpy.
Copies between non-mutable and mutable descriptors are expected to require
one memcpy per descriptor to handle the difference in size, but this use
case with more than one `descriptorCount` is considered rare. |

Valid Usage

* 
[](#VUID-VkCopyDescriptorSet-srcBinding-00345) VUID-VkCopyDescriptorSet-srcBinding-00345

`srcBinding` **must** be a valid binding within `srcSet`

* 
[](#VUID-VkCopyDescriptorSet-srcArrayElement-00346) VUID-VkCopyDescriptorSet-srcArrayElement-00346

The sum of `srcArrayElement` and `descriptorCount` **must** be less
than or equal to the number of array elements in the descriptor set
binding specified by `srcBinding`, and all applicable
[consecutive bindings](#descriptors-sets-updates-consecutive)

* 
[](#VUID-VkCopyDescriptorSet-dstBinding-00347) VUID-VkCopyDescriptorSet-dstBinding-00347

`dstBinding` **must** be a valid binding within `dstSet`

* 
[](#VUID-VkCopyDescriptorSet-dstArrayElement-00348) VUID-VkCopyDescriptorSet-dstArrayElement-00348

The sum of `dstArrayElement` and `descriptorCount` **must** be less
than or equal to the number of array elements in the descriptor set
binding specified by `dstBinding`, and all applicable
[consecutive bindings](#descriptors-sets-updates-consecutive)

* 
[](#VUID-VkCopyDescriptorSet-dstBinding-02632) VUID-VkCopyDescriptorSet-dstBinding-02632

The type of `dstBinding` within `dstSet` **must** be equal to the
type of `srcBinding` within `srcSet`

* 
[](#VUID-VkCopyDescriptorSet-srcSet-00349) VUID-VkCopyDescriptorSet-srcSet-00349

If `srcSet` is equal to `dstSet`, then the source and
destination ranges of descriptors **must** not overlap, where the ranges
**may** include array elements from [    consecutive bindings](#descriptors-sets-updates-consecutive)

* 
[](#VUID-VkCopyDescriptorSet-srcBinding-02223) VUID-VkCopyDescriptorSet-srcBinding-02223

If the descriptor type of the descriptor set binding specified by
`srcBinding` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType),
`srcArrayElement` **must** be an integer multiple of `4`

* 
[](#VUID-VkCopyDescriptorSet-dstBinding-02224) VUID-VkCopyDescriptorSet-dstBinding-02224

If the descriptor type of the descriptor set binding specified by
`dstBinding` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType),
`dstArrayElement` **must** be an integer multiple of `4`

* 
[](#VUID-VkCopyDescriptorSet-srcBinding-02225) VUID-VkCopyDescriptorSet-srcBinding-02225

If the descriptor type of the descriptor set binding specified by either
`srcBinding` or `dstBinding` is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), `descriptorCount`
**must** be an integer multiple of `4`

* 
[](#VUID-VkCopyDescriptorSet-srcSet-01918) VUID-VkCopyDescriptorSet-srcSet-01918

If `srcSet`’s layout was created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) flag
set, then `dstSet`’s layout **must** also have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) flag
set

* 
[](#VUID-VkCopyDescriptorSet-srcSet-04885) VUID-VkCopyDescriptorSet-srcSet-04885

If `srcSet`’s layout was created without
either the [VK_DESCRIPTOR_SET_LAYOUT_CREATE_HOST_ONLY_POOL_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
flag or
the [VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits)
flag set, then `dstSet`’s layout **must** have been created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](#VkDescriptorSetLayoutCreateFlagBits) flag
set

* 
[](#VUID-VkCopyDescriptorSet-srcSet-01920) VUID-VkCopyDescriptorSet-srcSet-01920

If the descriptor pool from which `srcSet` was allocated was created
with the [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits) flag set,
then the descriptor pool from which `dstSet` was allocated **must**
also have been created with the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits) flag set

* 
[](#VUID-VkCopyDescriptorSet-srcSet-04887) VUID-VkCopyDescriptorSet-srcSet-04887

If the descriptor pool from which `srcSet` was allocated was created
without
either the [VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](#VkDescriptorPoolCreateFlagBits) flag or
the [VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits) flag set, then
the descriptor pool from which `dstSet` was allocated **must** have
been created without the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](#VkDescriptorPoolCreateFlagBits) flag set

* 
[](#VUID-VkCopyDescriptorSet-dstBinding-02753) VUID-VkCopyDescriptorSet-dstBinding-02753

If the descriptor type of the descriptor set binding specified by
`dstBinding` is [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType), then `dstSet`
**must** not have been allocated with a layout that included immutable
samplers for `dstBinding`

* 
[](#VUID-VkCopyDescriptorSet-dstSet-04612) VUID-VkCopyDescriptorSet-dstSet-04612

If `VkDescriptorSetLayoutBinding` for `dstSet` at
`dstBinding` is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), the new active
descriptor type **must** exist in the corresponding
`pMutableDescriptorTypeLists` list for `dstBinding` if the new
active descriptor type is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)

* 
[](#VUID-VkCopyDescriptorSet-srcSet-04613) VUID-VkCopyDescriptorSet-srcSet-04613

If `VkDescriptorSetLayoutBinding` for `srcSet` at
`srcBinding` is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType) and the
`VkDescriptorSetLayoutBinding` for `dstSet` at `dstBinding`
is not [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), the active descriptor type
for the source descriptor **must** match the descriptor type of
`dstBinding`

* 
[](#VUID-VkCopyDescriptorSet-dstSet-04614) VUID-VkCopyDescriptorSet-dstSet-04614

If `VkDescriptorSetLayoutBinding` for `dstSet` at
`dstBinding` is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), and the new
active descriptor type is [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType), the
`pMutableDescriptorTypeLists` for `srcBinding` and
`dstBinding` **must** match exactly

Valid Usage (Implicit)

* 
[](#VUID-VkCopyDescriptorSet-sType-sType) VUID-VkCopyDescriptorSet-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COPY_DESCRIPTOR_SET](fundamentals.html#VkStructureType)

* 
[](#VUID-VkCopyDescriptorSet-pNext-pNext) VUID-VkCopyDescriptorSet-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkCopyDescriptorSet-srcSet-parameter) VUID-VkCopyDescriptorSet-srcSet-parameter

 `srcSet` **must** be a valid [VkDescriptorSet](#VkDescriptorSet) handle

* 
[](#VUID-VkCopyDescriptorSet-dstSet-parameter) VUID-VkCopyDescriptorSet-dstSet-parameter

 `dstSet` **must** be a valid [VkDescriptorSet](#VkDescriptorSet) handle

* 
[](#VUID-VkCopyDescriptorSet-commonparent) VUID-VkCopyDescriptorSet-commonparent

 Both of `dstSet`, and `srcSet` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

A descriptor update template specifies a mapping from descriptor update
information in host memory to descriptors in a descriptor set.
It is designed to avoid passing redundant information to the driver when
frequently updating the same set of descriptors in descriptor sets.

Descriptor update template objects are represented by
`VkDescriptorUpdateTemplate` handles:

// Provided by VK_VERSION_1_1
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDescriptorUpdateTemplate)

// Provided by VK_KHR_descriptor_update_template
// Equivalent to VkDescriptorUpdateTemplate
typedef VkDescriptorUpdateTemplate VkDescriptorUpdateTemplateKHR;

Updating a large `VkDescriptorSet` array **can** be an expensive operation
since an application **must** specify one [VkWriteDescriptorSet](#VkWriteDescriptorSet) structure
for each descriptor or descriptor array to update, each of which
re-specifies the same state when updating the same descriptor in multiple
descriptor sets.
For cases when an application wishes to update the same set of descriptors
in multiple descriptor sets allocated using the same
`VkDescriptorSetLayout`, [vkUpdateDescriptorSetWithTemplate](#vkUpdateDescriptorSetWithTemplate) **can** be
used as a replacement for [vkUpdateDescriptorSets](#vkUpdateDescriptorSets).

`VkDescriptorUpdateTemplate` allows implementations to convert a set of
descriptor update operations on a single descriptor set to an internal
format.
In conjunction with
[vkCmdPushDescriptorSetWithTemplate](#vkCmdPushDescriptorSetWithTemplate) or
[vkUpdateDescriptorSetWithTemplate](#vkUpdateDescriptorSetWithTemplate), this **can** be more efficient
compared to calling
[vkCmdPushDescriptorSet](#vkCmdPushDescriptorSet) or
[vkUpdateDescriptorSets](#vkUpdateDescriptorSets).
The descriptors themselves are not specified in the
`VkDescriptorUpdateTemplate`, rather, offsets into an application
provided pointer to host memory are specified, which are combined with a
pointer passed to
[vkCmdPushDescriptorSetWithTemplate](#vkCmdPushDescriptorSetWithTemplate) or
[vkUpdateDescriptorSetWithTemplate](#vkUpdateDescriptorSetWithTemplate).
This allows large batches of updates to be executed without having to
convert application data structures into a strictly-defined Vulkan data
structure.

To create a descriptor update template, call:

// Provided by VK_VERSION_1_1
VkResult vkCreateDescriptorUpdateTemplate(
    VkDevice                                    device,
    const VkDescriptorUpdateTemplateCreateInfo* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDescriptorUpdateTemplate*                 pDescriptorUpdateTemplate);

// Provided by VK_KHR_descriptor_update_template
// Equivalent to vkCreateDescriptorUpdateTemplate
VkResult vkCreateDescriptorUpdateTemplateKHR(
    VkDevice                                    device,
    const VkDescriptorUpdateTemplateCreateInfo* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDescriptorUpdateTemplate*                 pDescriptorUpdateTemplate);

* 
`device` is the logical device that creates the descriptor update
template.

* 
`pCreateInfo` is a pointer to a
    [VkDescriptorUpdateTemplateCreateInfo](#VkDescriptorUpdateTemplateCreateInfo) structure specifying the set
    of descriptors to update with a single call to
[vkCmdPushDescriptorSetWithTemplate](#vkCmdPushDescriptorSetWithTemplate) or
    [vkUpdateDescriptorSetWithTemplate](#vkUpdateDescriptorSetWithTemplate).

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pDescriptorUpdateTemplate` is a pointer to a
`VkDescriptorUpdateTemplate` handle in which the resulting
descriptor update template object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-device-parameter) VUID-vkCreateDescriptorUpdateTemplate-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-pCreateInfo-parameter) VUID-vkCreateDescriptorUpdateTemplate-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDescriptorUpdateTemplateCreateInfo](#VkDescriptorUpdateTemplateCreateInfo) structure

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-pAllocator-parameter) VUID-vkCreateDescriptorUpdateTemplate-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-pDescriptorUpdateTemplate-parameter) VUID-vkCreateDescriptorUpdateTemplate-pDescriptorUpdateTemplate-parameter

 `pDescriptorUpdateTemplate` **must** be a valid pointer to a [VkDescriptorUpdateTemplate](#VkDescriptorUpdateTemplate) handle

* 
[](#VUID-vkCreateDescriptorUpdateTemplate-device-queuecount) VUID-vkCreateDescriptorUpdateTemplate-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The [VkDescriptorUpdateTemplateCreateInfo](#VkDescriptorUpdateTemplateCreateInfo) structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDescriptorUpdateTemplateCreateInfo {
    VkStructureType                           sType;
    const void*                               pNext;
    VkDescriptorUpdateTemplateCreateFlags     flags;
    uint32_t                                  descriptorUpdateEntryCount;
    const VkDescriptorUpdateTemplateEntry*    pDescriptorUpdateEntries;
    VkDescriptorUpdateTemplateType            templateType;
    VkDescriptorSetLayout                     descriptorSetLayout;
    VkPipelineBindPoint                       pipelineBindPoint;
    VkPipelineLayout                          pipelineLayout;
    uint32_t                                  set;
} VkDescriptorUpdateTemplateCreateInfo;

// Provided by VK_KHR_descriptor_update_template
// Equivalent to VkDescriptorUpdateTemplateCreateInfo
typedef VkDescriptorUpdateTemplateCreateInfo VkDescriptorUpdateTemplateCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`descriptorUpdateEntryCount` is the number of elements in the
`pDescriptorUpdateEntries` array.

* 
`pDescriptorUpdateEntries` is a pointer to an array of
[VkDescriptorUpdateTemplateEntry](#VkDescriptorUpdateTemplateEntry) structures describing the
descriptors to be updated by the descriptor update template.

* 
`templateType` Specifies the type of the descriptor update template.
If set to [VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET](#VkDescriptorUpdateTemplateTypeKHR) it
**can** only be used to update descriptor sets with a fixed
`descriptorSetLayout`.
If set to [VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR) it
**can** only be used to push descriptor sets using the provided
`pipelineBindPoint`, `pipelineLayout`, and `set` number.

* 
`descriptorSetLayout` is the descriptor set layout used to build the
descriptor update template.
All descriptor sets which are going to be updated through the newly
created descriptor update template **must** be created with a layout that
matches (is the same as, or defined identically to) this layout.
This parameter is ignored if `templateType` is not
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET](#VkDescriptorUpdateTemplateTypeKHR).
The implementation **must** not access this object outside of the duration
of the command this structure is passed to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) indicating the
type of the pipeline that will use the descriptors.
This parameter is ignored if `templateType` is not
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR)

* 
`pipelineLayout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program
the bindings.
This parameter is ignored if `templateType` is not
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR)

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.
This parameter is ignored if `templateType` is not
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR)

Valid Usage

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00350) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00350

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET](#VkDescriptorUpdateTemplateTypeKHR),
`descriptorSetLayout` **must** be a valid `VkDescriptorSetLayout`
handle

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-10355) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-10355

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR),
and the [VK_KHR_push_descriptor](../appendices/extensions.html#VK_KHR_push_descriptor) extension is not enabled,
[`pushDescriptor`](features.html#features-pushDescriptor) **must** be enabled

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00351) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00351

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR),
`pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00352) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00352

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR),
`pipelineLayout` **must** be a valid `VkPipelineLayout` handle

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00353) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-00353

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR), `set`
**must** be the unique set number in the pipeline layout that uses a
descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-04615) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-04615

If `templateType` is
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET](#VkDescriptorUpdateTemplateTypeKHR),
`descriptorSetLayout` **must** not contain a binding with type
[VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-sType-sType) VUID-VkDescriptorUpdateTemplateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-pNext-pNext) VUID-VkDescriptorUpdateTemplateCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-flags-zerobitmask) VUID-VkDescriptorUpdateTemplateCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-pDescriptorUpdateEntries-parameter) VUID-VkDescriptorUpdateTemplateCreateInfo-pDescriptorUpdateEntries-parameter

 `pDescriptorUpdateEntries` **must** be a valid pointer to an array of `descriptorUpdateEntryCount` valid [VkDescriptorUpdateTemplateEntry](#VkDescriptorUpdateTemplateEntry) structures

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-parameter) VUID-VkDescriptorUpdateTemplateCreateInfo-templateType-parameter

 `templateType` **must** be a valid [VkDescriptorUpdateTemplateType](#VkDescriptorUpdateTemplateType) value

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-descriptorUpdateEntryCount-arraylength) VUID-VkDescriptorUpdateTemplateCreateInfo-descriptorUpdateEntryCount-arraylength

 `descriptorUpdateEntryCount` **must** be greater than `0`

* 
[](#VUID-VkDescriptorUpdateTemplateCreateInfo-commonparent) VUID-VkDescriptorUpdateTemplateCreateInfo-commonparent

 Both of `descriptorSetLayout`, and `pipelineLayout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

// Provided by VK_VERSION_1_1
typedef VkFlags VkDescriptorUpdateTemplateCreateFlags;

// Provided by VK_KHR_descriptor_update_template
// Equivalent to VkDescriptorUpdateTemplateCreateFlags
typedef VkDescriptorUpdateTemplateCreateFlags VkDescriptorUpdateTemplateCreateFlagsKHR;

`VkDescriptorUpdateTemplateCreateFlags` is a bitmask type for setting a
mask, but is currently reserved for future use.

The descriptor update template type is determined by the
[VkDescriptorUpdateTemplateCreateInfo](#VkDescriptorUpdateTemplateCreateInfo)::`templateType` property,
which takes the following values:

// Provided by VK_VERSION_1_1
typedef enum VkDescriptorUpdateTemplateType {
    VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET = 0,
  // Provided by VK_VERSION_1_4
    VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS = 1,
  // Provided by VK_KHR_descriptor_update_template with VK_KHR_push_descriptor, VK_KHR_push_descriptor with VK_VERSION_1_1 or VK_KHR_descriptor_update_template
    VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS_KHR = VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS,
  // Provided by VK_KHR_descriptor_update_template
    VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET_KHR = VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET,
} VkDescriptorUpdateTemplateType;

// Provided by VK_KHR_descriptor_update_template
// Equivalent to VkDescriptorUpdateTemplateType
typedef VkDescriptorUpdateTemplateType VkDescriptorUpdateTemplateTypeKHR;

* 
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET](#VkDescriptorUpdateTemplateTypeKHR) specifies that
the descriptor update template will be used for descriptor set updates
only.

* 
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR) specifies that
the descriptor update template will be used for push descriptor updates
only.

The `VkDescriptorUpdateTemplateEntry` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDescriptorUpdateTemplateEntry {
    uint32_t            dstBinding;
    uint32_t            dstArrayElement;
    uint32_t            descriptorCount;
    VkDescriptorType    descriptorType;
    size_t              offset;
    size_t              stride;
} VkDescriptorUpdateTemplateEntry;

// Provided by VK_KHR_descriptor_update_template
// Equivalent to VkDescriptorUpdateTemplateEntry
typedef VkDescriptorUpdateTemplateEntry VkDescriptorUpdateTemplateEntryKHR;

* 
`dstBinding` is the descriptor binding to update when using this
descriptor update template.

* 
`dstArrayElement` is the starting element in the array belonging to
`dstBinding`.
If the descriptor binding identified by `dstBinding` has a
descriptor type of [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then
`dstArrayElement` specifies the starting byte offset to update.

* 
`descriptorCount` is the number of descriptors to update.
If `descriptorCount` is greater than the number of remaining array
elements in the destination binding, those affect consecutive bindings
in a manner similar to [VkWriteDescriptorSet](#VkWriteDescriptorSet) above.
If the descriptor binding identified by `dstBinding` has a
descriptor type of [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType) then
`descriptorCount` specifies the number of bytes to update and the
remaining array elements in the destination binding refer to the
remaining number of bytes in it.

* 
`descriptorType` is a [VkDescriptorType](#VkDescriptorType) specifying the type of
the descriptor.

* 
`offset` is the offset in bytes of the first binding in the raw data
structure.

* 
`stride` is the stride in bytes between two consecutive array
elements of the descriptor update information in the raw data structure.
The actual pointer ptr for each array element j of update entry i is
computed using the following formula:

    const char *ptr = (const char *)pData + pDescriptorUpdateEntries[i].offset + j * pDescriptorUpdateEntries[i].stride

The stride is useful in case the bindings are stored in structs along with
other data.
If `descriptorType` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)
then the value of `stride` is ignored and the stride is assumed to be
`1`, i.e. the descriptor update information for them is always specified as
a contiguous range.

Valid Usage

* 
[](#VUID-VkDescriptorUpdateTemplateEntry-dstBinding-00354) VUID-VkDescriptorUpdateTemplateEntry-dstBinding-00354

`dstBinding` **must** be a valid binding in the descriptor set layout
implicitly specified when using a descriptor update template to update
descriptors

* 
[](#VUID-VkDescriptorUpdateTemplateEntry-dstArrayElement-00355) VUID-VkDescriptorUpdateTemplateEntry-dstArrayElement-00355

`dstArrayElement` and `descriptorCount` **must** be less than or
equal to the number of array elements in the descriptor set binding
implicitly specified when using a descriptor update template to update
descriptors, and all applicable [    consecutive bindings](#descriptors-sets-updates-consecutive)

* 
[](#VUID-VkDescriptorUpdateTemplateEntry-descriptor-02226) VUID-VkDescriptorUpdateTemplateEntry-descriptor-02226

If `descriptor` type is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), `dstArrayElement`
**must** be an integer multiple of `4`

* 
[](#VUID-VkDescriptorUpdateTemplateEntry-descriptor-02227) VUID-VkDescriptorUpdateTemplateEntry-descriptor-02227

If `descriptor` type is
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType), `descriptorCount`
**must** be an integer multiple of `4`

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorUpdateTemplateEntry-descriptorType-parameter) VUID-VkDescriptorUpdateTemplateEntry-descriptorType-parameter

 `descriptorType` **must** be a valid [VkDescriptorType](#VkDescriptorType) value

To destroy a descriptor update template, call:

// Provided by VK_VERSION_1_1
void vkDestroyDescriptorUpdateTemplate(
    VkDevice                                    device,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    const VkAllocationCallbacks*                pAllocator);

// Provided by VK_KHR_descriptor_update_template
// Equivalent to vkDestroyDescriptorUpdateTemplate
void vkDestroyDescriptorUpdateTemplateKHR(
    VkDevice                                    device,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that has been used to create the
descriptor update template

* 
`descriptorUpdateTemplate` is the descriptor update template to
destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-descriptorSetLayout-00356) VUID-vkDestroyDescriptorUpdateTemplate-descriptorSetLayout-00356

If `VkAllocationCallbacks` were provided when
`descriptorUpdateTemplate` was created, a compatible set of
callbacks **must** be provided here

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-descriptorSetLayout-00357) VUID-vkDestroyDescriptorUpdateTemplate-descriptorSetLayout-00357

If no `VkAllocationCallbacks` were provided when
`descriptorUpdateTemplate` was created, `pAllocator` **must** be
`NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-device-parameter) VUID-vkDestroyDescriptorUpdateTemplate-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-descriptorUpdateTemplate-parameter) VUID-vkDestroyDescriptorUpdateTemplate-descriptorUpdateTemplate-parameter

 If `descriptorUpdateTemplate` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `descriptorUpdateTemplate` **must** be a valid [VkDescriptorUpdateTemplate](#VkDescriptorUpdateTemplate) handle

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-pAllocator-parameter) VUID-vkDestroyDescriptorUpdateTemplate-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyDescriptorUpdateTemplate-descriptorUpdateTemplate-parent) VUID-vkDestroyDescriptorUpdateTemplate-descriptorUpdateTemplate-parent

 If `descriptorUpdateTemplate` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `descriptorUpdateTemplate` **must** be externally synchronized

Once a `VkDescriptorUpdateTemplate` has been created, descriptor sets
**can** be updated by calling:

// Provided by VK_VERSION_1_1
void vkUpdateDescriptorSetWithTemplate(
    VkDevice                                    device,
    VkDescriptorSet                             descriptorSet,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    const void*                                 pData);

// Provided by VK_KHR_descriptor_update_template
// Equivalent to vkUpdateDescriptorSetWithTemplate
void vkUpdateDescriptorSetWithTemplateKHR(
    VkDevice                                    device,
    VkDescriptorSet                             descriptorSet,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    const void*                                 pData);

* 
`device` is the logical device that updates the descriptor set.

* 
`descriptorSet` is the descriptor set to update

* 
`descriptorUpdateTemplate` is a [VkDescriptorUpdateTemplate](#VkDescriptorUpdateTemplate)
object specifying the update mapping between `pData` and the
descriptor set to update.

* 
`pData` is a pointer to memory containing one or more
    [VkDescriptorImageInfo](#VkDescriptorImageInfo), [VkDescriptorBufferInfo](#VkDescriptorBufferInfo), or
    [VkBufferView](resources.html#VkBufferView) structures
or [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR)
or [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV)
handles
    used to write the descriptors.

Valid Usage

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-pData-01685) VUID-vkUpdateDescriptorSetWithTemplate-pData-01685

    `pData` **must** be a valid pointer to a memory containing one or more
    valid instances of
[VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handles,
[VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handles,
    [VkDescriptorImageInfo](#VkDescriptorImageInfo), [VkDescriptorBufferInfo](#VkDescriptorBufferInfo), or
    [VkBufferView](resources.html#VkBufferView) in a layout defined by `descriptorUpdateTemplate`
    when it was created with [vkCreateDescriptorUpdateTemplate](#vkCreateDescriptorUpdateTemplate)

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-06995) VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-06995

Host access to `descriptorSet` **must** be
[externally synchronized](fundamentals.html#fundamentals-threadingbehavior)
unless explicitly denoted otherwise for specific flags

Valid Usage (Implicit)

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-device-parameter) VUID-vkUpdateDescriptorSetWithTemplate-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-parameter) VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-parameter

 `descriptorSet` **must** be a valid [VkDescriptorSet](#VkDescriptorSet) handle

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorUpdateTemplate-parameter) VUID-vkUpdateDescriptorSetWithTemplate-descriptorUpdateTemplate-parameter

 `descriptorUpdateTemplate` **must** be a valid [VkDescriptorUpdateTemplate](#VkDescriptorUpdateTemplate) handle

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-parent) VUID-vkUpdateDescriptorSetWithTemplate-descriptorSet-parent

 `descriptorSet` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkUpdateDescriptorSetWithTemplate-descriptorUpdateTemplate-parent) VUID-vkUpdateDescriptorSetWithTemplate-descriptorUpdateTemplate-parent

 `descriptorUpdateTemplate` **must** have been created, allocated, or retrieved from `device`

API Example

struct AppBufferView {
    VkBufferView bufferView;
    uint32_t     applicationRelatedInformation;
};

struct AppDataStructure
{
    VkDescriptorImageInfo  imageInfo;          // a single image info
    VkDescriptorBufferInfo bufferInfoArray[3]; // 3 buffer infos in an array
    AppBufferView          bufferView[2];      // An application-defined structure containing a bufferView
    // ... some more application-related data
};

const VkDescriptorUpdateTemplateEntry descriptorUpdateTemplateEntries[] =
{
    // binding to a single image descriptor
    {
        .binding = 0,
        .dstArrayElement = 0,
        .descriptorCount = 1,
        .descriptorType = VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER,
        .offset = offsetof(AppDataStructure, imageInfo),
        .stride = 0         // stride not required if descriptorCount is 1
    },

    // binding to an array of buffer descriptors
    {
        .binding = 1,
        .dstArrayElement = 0,
        .descriptorCount = 3,
        .descriptorType = VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER,
        .offset = offsetof(AppDataStructure, bufferInfoArray),
        .stride = sizeof(VkDescriptorBufferInfo)    // descriptor buffer infos are compact
    },

    // binding to an array of buffer views
    {
        .binding = 2,
        .dstArrayElement = 0,
        .descriptorCount = 2,
        .descriptorType = VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER,
        .offset = offsetof(AppDataStructure, bufferView) +
                  offsetof(AppBufferView, bufferView),
        .stride = sizeof(AppBufferView)             // bufferViews do not have to be compact
    },
};

// create a descriptor update template for descriptor set updates
const VkDescriptorUpdateTemplateCreateInfo createInfo =
{
    .sType = VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO,
    .pNext = NULL,
    .flags = 0,
    .descriptorUpdateEntryCount = 3,
    .pDescriptorUpdateEntries = descriptorUpdateTemplateEntries,
    .templateType = VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_DESCRIPTOR_SET,
    .descriptorSetLayout = myLayout,
    .pipelineBindPoint = 0,     // ignored by given templateType
    .pipelineLayout = 0,        // ignored by given templateType
    .set = 0,                   // ignored by given templateType
};

VkDescriptorUpdateTemplate myDescriptorUpdateTemplate;
myResult = vkCreateDescriptorUpdateTemplate(
    myDevice,
    &createInfo,
    NULL,
    &myDescriptorUpdateTemplate);

AppDataStructure appData;

// fill appData here or cache it in your engine
vkUpdateDescriptorSetWithTemplate(myDevice, myDescriptorSet, myDescriptorUpdateTemplate, &appData);

To bind one or more descriptor sets to a command buffer, call:

// Provided by VK_VERSION_1_0
void vkCmdBindDescriptorSets(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    firstSet,
    uint32_t                                    descriptorSetCount,
    const VkDescriptorSet*                      pDescriptorSets,
    uint32_t                                    dynamicOffsetCount,
    const uint32_t*                             pDynamicOffsets);

* 
`commandBuffer` is the command buffer that the descriptor sets will
be bound to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) indicating the
type of the pipeline that will use the descriptors.
There is a separate set of bind points for each pipeline type, so
binding one does not disturb the others.

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.

* 
`firstSet` is the set number of the first descriptor set to be
bound.

* 
`descriptorSetCount` is the number of elements in the
`pDescriptorSets` array.

* 
`pDescriptorSets` is a pointer to an array of handles to
[VkDescriptorSet](#VkDescriptorSet) objects describing the descriptor sets to bind to.

* 
`dynamicOffsetCount` is the number of dynamic offsets in the
`pDynamicOffsets` array.

* 
`pDynamicOffsets` is a pointer to an array of `uint32_t` values
specifying dynamic offsets.

`vkCmdBindDescriptorSets` binds descriptor sets
`pDescriptorSets`[0..`descriptorSetCount`-1] to set numbers
[`firstSet`..`firstSet`+`descriptorSetCount`-1] for subsequent
[bound pipeline commands](pipelines.html#pipelines-bindpoint-commands) set by
`pipelineBindPoint`.
Any bindings that were previously applied via these sets
, or calls to [vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT) or
[vkCmdBindDescriptorBufferEmbeddedSamplersEXT](#vkCmdBindDescriptorBufferEmbeddedSamplersEXT),
are no longer valid.

Once bound, a descriptor set affects rendering of subsequent commands that
interact with the given pipeline type in the command buffer until either a
different set is bound to the same set number, or the set is disturbed as
described in [Pipeline Layout Compatibility](#descriptors-compatibility).

A compatible descriptor set **must** be bound for all set numbers that any
shaders in a pipeline access, at the time that a drawing or dispatching
command is recorded to execute using that pipeline.
However, if none of the shaders in a pipeline statically use any bindings
with a particular set number, then no descriptor set need be bound for that
set number, even if the pipeline layout includes a non-trivial descriptor
set layout for that set number.

When consuming a descriptor, a descriptor is considered valid if the
descriptor is not **undefined** as described by
[descriptor set allocation](#descriptor-set-initial-state).
If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
a null descriptor is also considered valid.
A descriptor that was disturbed by [Pipeline Layout Compatibility](#descriptors-compatibility), or was never bound by `vkCmdBindDescriptorSets`
is not considered valid.
For any given descriptor, [VkDescriptorBindingFlagBits](#VkDescriptorBindingFlagBits) and
[VkDescriptorSetLayoutCreateFlagBits](#VkDescriptorSetLayoutCreateFlagBits) determine if validity is defined
in terms of the descriptor being statically accessed, or dynamically
accessed.
If the descriptor is determined to be accessed by the appropriate
definition, the consuming descriptor type in the pipeline **must** match the
[VkDescriptorType](#VkDescriptorType) in [VkDescriptorSetLayoutCreateInfo](#VkDescriptorSetLayoutCreateInfo) for the
descriptor to be considered valid.
If a descriptor is a mutable descriptor, the consuming descriptor type in
the pipeline **must** match the active descriptor type for the descriptor to be
considered valid.

|  | Further validation may be carried out beyond validation for descriptor
| --- | --- |
types, e.g. [Texel Input Validation](textures.html#textures-input-validation). |

If any of the sets being bound include dynamic uniform or storage buffers,
then `pDynamicOffsets` includes one element for each array element in
each dynamic descriptor type binding in each set.
Values are taken from `pDynamicOffsets` in an order such that all
entries for set N come before set N+1; within a set, entries are ordered by
the binding numbers in the descriptor set layouts; and within a binding
array, elements are in order.
`dynamicOffsetCount` **must** equal the total number of dynamic descriptors
in the sets being bound.

The effective offset used for dynamic uniform and storage buffer bindings is
the sum of the relative offset taken from `pDynamicOffsets`, and the
base address of the buffer plus base offset in the descriptor set.
The range of the dynamic uniform and storage buffer bindings is the buffer
range as specified in the descriptor set.

Each of the `pDescriptorSets` **must** be compatible with the pipeline
layout specified by `layout`.
The layout used to program the bindings **must** also be compatible with the
pipeline used in subsequent [bound pipeline commands](pipelines.html#pipelines-bindpoint-commands) with that pipeline type, as defined in the
[Pipeline Layout Compatibility](#descriptors-compatibility) section.

The descriptor set contents bound by a call to `vkCmdBindDescriptorSets`
**may** be consumed at the following times:

* 
For descriptor bindings created with the
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT) bit set, the contents
**may** be consumed when the command buffer is submitted to a queue, or
during shader execution of the resulting draws and dispatches, or any
time in between.
Otherwise,

* 
during host execution of the command, or during shader execution of the
resulting draws and dispatches, or any time in between.

Thus, the contents of a descriptor set binding **must** not be altered
(overwritten by an update command, or freed) between the first point in time
that it **may** be consumed, and when the command completes executing on the
queue.

The contents of `pDynamicOffsets` are consumed immediately during
execution of `vkCmdBindDescriptorSets`.
Once all pending uses have completed, it is legal to update and reuse a
descriptor set.

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorSets-commandBuffer-11295) VUID-vkCmdBindDescriptorSets-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorSets-commandBuffer-11296) VUID-vkCmdBindDescriptorSets-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorSets-pDescriptorSets-00358) VUID-vkCmdBindDescriptorSets-pDescriptorSets-00358

    Each element of `pDescriptorSets`
that is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
    **must** have been allocated with a `VkDescriptorSetLayout` that
    matches (is the same as, or identically defined as) the
    `VkDescriptorSetLayout` at set *n* in `layout`, where *n* is the
    sum of `firstSet` and the index into `pDescriptorSets`

* 
[](#VUID-vkCmdBindDescriptorSets-dynamicOffsetCount-00359) VUID-vkCmdBindDescriptorSets-dynamicOffsetCount-00359

`dynamicOffsetCount` **must** be equal to the total number of dynamic
descriptors in `pDescriptorSets`

* 
[](#VUID-vkCmdBindDescriptorSets-firstSet-00360) VUID-vkCmdBindDescriptorSets-firstSet-00360

The sum of `firstSet` and `descriptorSetCount` **must** be less
than or equal to [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount`
provided when `layout` was created

* 
[](#VUID-vkCmdBindDescriptorSets-pDynamicOffsets-01971) VUID-vkCmdBindDescriptorSets-pDynamicOffsets-01971

Each element of `pDynamicOffsets` which corresponds to a descriptor
binding with type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) **must**
be a multiple of
`VkPhysicalDeviceLimits`::`minUniformBufferOffsetAlignment`

* 
[](#VUID-vkCmdBindDescriptorSets-pDynamicOffsets-01972) VUID-vkCmdBindDescriptorSets-pDynamicOffsets-01972

Each element of `pDynamicOffsets` which corresponds to a descriptor
binding with type [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) **must**
be a multiple of
`VkPhysicalDeviceLimits`::`minStorageBufferOffsetAlignment`

* 
[](#VUID-vkCmdBindDescriptorSets-pDescriptorSets-01979) VUID-vkCmdBindDescriptorSets-pDescriptorSets-01979

For each dynamic uniform or storage buffer binding in
`pDescriptorSets`, the sum of the [    effective offset](#dynamic-effective-offset) and the range of the binding **must** be less than or
equal to the size of the buffer

* 
[](#VUID-vkCmdBindDescriptorSets-pDescriptorSets-06715) VUID-vkCmdBindDescriptorSets-pDescriptorSets-06715

For each dynamic uniform or storage buffer binding in
`pDescriptorSets`, if the range was set with [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE)
then `pDynamicOffsets` which corresponds to the descriptor binding
**must** be 0

* 
[](#VUID-vkCmdBindDescriptorSets-pDescriptorSets-04616) VUID-vkCmdBindDescriptorSets-pDescriptorSets-04616

Each element of `pDescriptorSets` **must** not have been allocated from
a `VkDescriptorPool` with the
[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](#VkDescriptorPoolCreateFlagBits) flag set

* 
[](#VUID-vkCmdBindDescriptorSets-pDescriptorSets-06563) VUID-vkCmdBindDescriptorSets-pDescriptorSets-06563

If the [    `graphicsPipelineLibrary`](features.html#features-graphicsPipelineLibrary) feature is not enabled, each
element of `pDescriptorSets` **must** be a valid [VkDescriptorSet](#VkDescriptorSet)

* 
[](#VUID-vkCmdBindDescriptorSets-pDescriptorSets-08010) VUID-vkCmdBindDescriptorSets-pDescriptorSets-08010

Each element of `pDescriptorSets` **must** have been allocated with a
`VkDescriptorSetLayout` which was not created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-vkCmdBindDescriptorSets-pDescriptorSets-09914) VUID-vkCmdBindDescriptorSets-pDescriptorSets-09914

If any element of `pDescriptorSets` was allocated from a descriptor
pool created with a [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo) structure that had
a [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure specifying
foreign data processing engines in its `pNext` chain, then the
command pool from which `commandBuffer` was allocated **must** have
been created with a [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo) structure that had a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure in its
`pNext` chain specifying a superset of all the foreign data
processing engines specified when creating the descriptor pools from
which the elements of `pDescriptorSets` were allocated

* 
[](#VUID-vkCmdBindDescriptorSets-pDescriptorSets-09915) VUID-vkCmdBindDescriptorSets-pDescriptorSets-09915

If none of the elements of `pDescriptorSets` were allocated from a
descriptor pool created with a [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)
structure that had a [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM)
structure specifying foreign data processing engines in its `pNext`
chain, then the command pool from which `commandBuffer` was
allocated **must** not have been created with a
[VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo) structure that had a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure in its
`pNext` chain

* 
[](#VUID-vkCmdBindDescriptorSets-pipelineBindPoint-00361) VUID-vkCmdBindDescriptorSets-pipelineBindPoint-00361

`pipelineBindPoint` **must** be supported by the `commandBuffer`’s
parent `VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorSets-commandBuffer-parameter) VUID-vkCmdBindDescriptorSets-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindDescriptorSets-pipelineBindPoint-parameter) VUID-vkCmdBindDescriptorSets-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-vkCmdBindDescriptorSets-layout-parameter) VUID-vkCmdBindDescriptorSets-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-vkCmdBindDescriptorSets-pDescriptorSets-parameter) VUID-vkCmdBindDescriptorSets-pDescriptorSets-parameter

 `pDescriptorSets` **must** be a valid pointer to an array of `descriptorSetCount` valid or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) [VkDescriptorSet](#VkDescriptorSet) handles

* 
[](#VUID-vkCmdBindDescriptorSets-pDynamicOffsets-parameter) VUID-vkCmdBindDescriptorSets-pDynamicOffsets-parameter

 If `dynamicOffsetCount` is not `0`, `pDynamicOffsets` **must** be a valid pointer to an array of `dynamicOffsetCount` `uint32_t` values

* 
[](#VUID-vkCmdBindDescriptorSets-commandBuffer-recording) VUID-vkCmdBindDescriptorSets-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorSets-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorSets-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindDescriptorSets-videocoding) VUID-vkCmdBindDescriptorSets-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindDescriptorSets-descriptorSetCount-arraylength) VUID-vkCmdBindDescriptorSets-descriptorSetCount-arraylength

 `descriptorSetCount` **must** be greater than `0`

* 
[](#VUID-vkCmdBindDescriptorSets-commonparent) VUID-vkCmdBindDescriptorSets-commonparent

 Each of `commandBuffer`, `layout`, and the elements of `pDescriptorSets` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorSets is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To bind one or more descriptor sets to a command buffer, call:

// Provided by VK_VERSION_1_4
void vkCmdBindDescriptorSets2(
    VkCommandBuffer                             commandBuffer,
    const VkBindDescriptorSetsInfo*             pBindDescriptorSetsInfo);

// Provided by VK_KHR_maintenance6
// Equivalent to vkCmdBindDescriptorSets2
void vkCmdBindDescriptorSets2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkBindDescriptorSetsInfo*             pBindDescriptorSetsInfo);

* 
`commandBuffer` is the command buffer that the descriptor sets will
be bound to.

* 
`pBindDescriptorSetsInfo` is a pointer to a
`VkBindDescriptorSetsInfo` structure.

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-11295) VUID-vkCmdBindDescriptorSets2-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-11296) VUID-vkCmdBindDescriptorSets2-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorSets2-pBindDescriptorSetsInfo-09467) VUID-vkCmdBindDescriptorSets2-pBindDescriptorSetsInfo-09467

Each bit in `pBindDescriptorSetsInfo->stageFlags` **must** be a stage
supported by the `commandBuffer`’s parent `VkCommandPool`’s
queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-parameter) VUID-vkCmdBindDescriptorSets2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindDescriptorSets2-pBindDescriptorSetsInfo-parameter) VUID-vkCmdBindDescriptorSets2-pBindDescriptorSetsInfo-parameter

 `pBindDescriptorSetsInfo` **must** be a valid pointer to a valid [VkBindDescriptorSetsInfo](#VkBindDescriptorSetsInfo) structure

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-recording) VUID-vkCmdBindDescriptorSets2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorSets2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindDescriptorSets2-videocoding) VUID-vkCmdBindDescriptorSets2-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorSets2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkBindDescriptorSetsInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkBindDescriptorSetsInfo {
    VkStructureType           sType;
    const void*               pNext;
    VkShaderStageFlags        stageFlags;
    VkPipelineLayout          layout;
    uint32_t                  firstSet;
    uint32_t                  descriptorSetCount;
    const VkDescriptorSet*    pDescriptorSets;
    uint32_t                  dynamicOffsetCount;
    const uint32_t*           pDynamicOffsets;
} VkBindDescriptorSetsInfo;

// Provided by VK_KHR_maintenance6
// Equivalent to VkBindDescriptorSetsInfo
typedef VkBindDescriptorSetsInfo VkBindDescriptorSetsInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) specifying
the shader stages the descriptor sets will be bound to.

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.
If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the
layout **must** be specified by chaining the
[VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) structure off the `pNext`

* 
`firstSet` is the set number of the first descriptor set to be
bound.

* 
`descriptorSetCount` is the number of elements in the
`pDescriptorSets` array.

* 
`pDescriptorSets` is a pointer to an array of handles to
[VkDescriptorSet](#VkDescriptorSet) objects describing the descriptor sets to bind to.

* 
`dynamicOffsetCount` is the number of dynamic offsets in the
`pDynamicOffsets` array.

* 
`pDynamicOffsets` is a pointer to an array of `uint32_t` values
specifying dynamic offsets.

If `stageFlags` specifies a subset of all stages corresponding to one or
more pipeline bind points, the binding operation still affects all stages
corresponding to the given pipeline bind point(s) as if the equivalent
original version of this command had been called with the same parameters.
For example, specifying a `stageFlags` value of
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) | [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) |
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) is equivalent to calling the original
version of this command once with [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint) and
once with [VK_PIPELINE_BIND_POINT_COMPUTE](pipelines.html#VkPipelineBindPoint).

Valid Usage

* 
[](#VUID-VkBindDescriptorSetsInfo-pDescriptorSets-00358) VUID-VkBindDescriptorSetsInfo-pDescriptorSets-00358

    Each element of `pDescriptorSets`
that is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
    **must** have been allocated with a `VkDescriptorSetLayout` that
    matches (is the same as, or identically defined as) the
    `VkDescriptorSetLayout` at set *n* in `layout`, where *n* is the
    sum of `firstSet` and the index into `pDescriptorSets`

* 
[](#VUID-VkBindDescriptorSetsInfo-dynamicOffsetCount-00359) VUID-VkBindDescriptorSetsInfo-dynamicOffsetCount-00359

`dynamicOffsetCount` **must** be equal to the total number of dynamic
descriptors in `pDescriptorSets`

* 
[](#VUID-VkBindDescriptorSetsInfo-firstSet-00360) VUID-VkBindDescriptorSetsInfo-firstSet-00360

The sum of `firstSet` and `descriptorSetCount` **must** be less
than or equal to [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount`
provided when `layout` was created

* 
[](#VUID-VkBindDescriptorSetsInfo-pDynamicOffsets-01971) VUID-VkBindDescriptorSetsInfo-pDynamicOffsets-01971

Each element of `pDynamicOffsets` which corresponds to a descriptor
binding with type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType) **must**
be a multiple of
`VkPhysicalDeviceLimits`::`minUniformBufferOffsetAlignment`

* 
[](#VUID-VkBindDescriptorSetsInfo-pDynamicOffsets-01972) VUID-VkBindDescriptorSetsInfo-pDynamicOffsets-01972

Each element of `pDynamicOffsets` which corresponds to a descriptor
binding with type [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) **must**
be a multiple of
`VkPhysicalDeviceLimits`::`minStorageBufferOffsetAlignment`

* 
[](#VUID-VkBindDescriptorSetsInfo-pDescriptorSets-01979) VUID-VkBindDescriptorSetsInfo-pDescriptorSets-01979

For each dynamic uniform or storage buffer binding in
`pDescriptorSets`, the sum of the [    effective offset](#dynamic-effective-offset) and the range of the binding **must** be less than or
equal to the size of the buffer

* 
[](#VUID-VkBindDescriptorSetsInfo-pDescriptorSets-06715) VUID-VkBindDescriptorSetsInfo-pDescriptorSets-06715

For each dynamic uniform or storage buffer binding in
`pDescriptorSets`, if the range was set with [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE)
then `pDynamicOffsets` which corresponds to the descriptor binding
**must** be 0

* 
[](#VUID-VkBindDescriptorSetsInfo-pDescriptorSets-04616) VUID-VkBindDescriptorSetsInfo-pDescriptorSets-04616

Each element of `pDescriptorSets` **must** not have been allocated from
a `VkDescriptorPool` with the
[VK_DESCRIPTOR_POOL_CREATE_HOST_ONLY_BIT_EXT](#VkDescriptorPoolCreateFlagBits) flag set

* 
[](#VUID-VkBindDescriptorSetsInfo-pDescriptorSets-06563) VUID-VkBindDescriptorSetsInfo-pDescriptorSets-06563

If the [    `graphicsPipelineLibrary`](features.html#features-graphicsPipelineLibrary) feature is not enabled, each
element of `pDescriptorSets` **must** be a valid [VkDescriptorSet](#VkDescriptorSet)

* 
[](#VUID-VkBindDescriptorSetsInfo-pDescriptorSets-08010) VUID-VkBindDescriptorSetsInfo-pDescriptorSets-08010

Each element of `pDescriptorSets` **must** have been allocated with a
`VkDescriptorSetLayout` which was not created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkBindDescriptorSetsInfo-pDescriptorSets-09914) VUID-VkBindDescriptorSetsInfo-pDescriptorSets-09914

If any element of `pDescriptorSets` was allocated from a descriptor
pool created with a [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo) structure that had
a [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure specifying
foreign data processing engines in its `pNext` chain, then the
command pool from which `commandBuffer` was allocated **must** have
been created with a [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo) structure that had a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure in its
`pNext` chain specifying a superset of all the foreign data
processing engines specified when creating the descriptor pools from
which the elements of `pDescriptorSets` were allocated

* 
[](#VUID-VkBindDescriptorSetsInfo-pDescriptorSets-09915) VUID-VkBindDescriptorSetsInfo-pDescriptorSets-09915

If none of the elements of `pDescriptorSets` were allocated from a
descriptor pool created with a [VkDescriptorPoolCreateInfo](#VkDescriptorPoolCreateInfo)
structure that had a [VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM)
structure specifying foreign data processing engines in its `pNext`
chain, then the command pool from which `commandBuffer` was
allocated **must** not have been created with a
[VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo) structure that had a
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM) structure in its
`pNext` chain

* 
[](#VUID-VkBindDescriptorSetsInfo-None-09495) VUID-VkBindDescriptorSetsInfo-None-09495

If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkBindDescriptorSetsInfo-layout-09496) VUID-VkBindDescriptorSetsInfo-layout-09496

If `layout` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) structure

Valid Usage (Implicit)

* 
[](#VUID-VkBindDescriptorSetsInfo-sType-sType) VUID-VkBindDescriptorSetsInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_SETS_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindDescriptorSetsInfo-pNext-pNext) VUID-VkBindDescriptorSetsInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)

* 
[](#VUID-VkBindDescriptorSetsInfo-sType-unique) VUID-VkBindDescriptorSetsInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBindDescriptorSetsInfo-stageFlags-parameter) VUID-VkBindDescriptorSetsInfo-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkBindDescriptorSetsInfo-stageFlags-requiredbitmask) VUID-VkBindDescriptorSetsInfo-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkBindDescriptorSetsInfo-layout-parameter) VUID-VkBindDescriptorSetsInfo-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkBindDescriptorSetsInfo-pDescriptorSets-parameter) VUID-VkBindDescriptorSetsInfo-pDescriptorSets-parameter

 `pDescriptorSets` **must** be a valid pointer to an array of `descriptorSetCount` valid [VkDescriptorSet](#VkDescriptorSet) handles

* 
[](#VUID-VkBindDescriptorSetsInfo-pDynamicOffsets-parameter) VUID-VkBindDescriptorSetsInfo-pDynamicOffsets-parameter

 If `dynamicOffsetCount` is not `0`, and `pDynamicOffsets` is not `NULL`, `pDynamicOffsets` **must** be a valid pointer to an array of `dynamicOffsetCount` or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) `uint32_t` values

* 
[](#VUID-VkBindDescriptorSetsInfo-descriptorSetCount-arraylength) VUID-VkBindDescriptorSetsInfo-descriptorSetCount-arraylength

 `descriptorSetCount` **must** be greater than `0`

* 
[](#VUID-VkBindDescriptorSetsInfo-commonparent) VUID-VkBindDescriptorSetsInfo-commonparent

 Both of `layout`, and the elements of `pDescriptorSets` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

In addition to allocating descriptor sets and binding them to a command
buffer, an application **can** record descriptor updates into the command
buffer.

To push descriptor updates into a command buffer, call:

// Provided by VK_VERSION_1_4
void vkCmdPushDescriptorSet(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    set,
    uint32_t                                    descriptorWriteCount,
    const VkWriteDescriptorSet*                 pDescriptorWrites);

// Provided by VK_KHR_push_descriptor
// Equivalent to vkCmdPushDescriptorSet
void vkCmdPushDescriptorSetKHR(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    set,
    uint32_t                                    descriptorWriteCount,
    const VkWriteDescriptorSet*                 pDescriptorWrites);

* 
`commandBuffer` is the command buffer that the descriptors will be
recorded in.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) indicating the
type of the pipeline that will use the descriptors.
There is a separate set of push descriptor bindings for each pipeline
type, so binding one does not disturb the others.

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.

* 
`descriptorWriteCount` is the number of elements in the
`pDescriptorWrites` array.

* 
`pDescriptorWrites` is a pointer to an array of
[VkWriteDescriptorSet](#VkWriteDescriptorSet) structures describing the descriptors to be
updated.

*Push descriptors* are a small bank of descriptors whose storage is
internally managed by the command buffer rather than being written into a
descriptor set and later bound to a command buffer.
Push descriptors allow for incremental updates of descriptors without
managing the lifetime of descriptor sets.

When a command buffer begins recording, all push descriptors are **undefined**.
Push descriptors **can** be updated incrementally and cause shaders to use the
updated descriptors for subsequent [bound pipeline commands](pipelines.html#pipelines-bindpoint-commands) with the pipeline type set by `pipelineBindPoint`
until the descriptor is overwritten, or else until the set is disturbed as
described in [Pipeline Layout Compatibility](#descriptors-compatibility).
When the set is disturbed or push descriptors with a different descriptor
set layout are set, all push descriptors are **undefined**.

Push descriptors that are [statically used](shaders.html#shaders-staticuse) by a
pipeline **must** not be **undefined** at the time that a drawing or dispatching
command is recorded to execute using that pipeline.
This includes immutable sampler descriptors, which **must** be pushed before
they are accessed by a pipeline (the immutable samplers are pushed, rather
than the samplers in `pDescriptorWrites`).
Push descriptors that are not statically used **can** remain **undefined**.

Push descriptors do not use dynamic offsets.
Instead, the corresponding non-dynamic descriptor types **can** be used and the
`offset` member of [VkDescriptorBufferInfo](#VkDescriptorBufferInfo) **can** be changed each
time the descriptor is written.

Each element of `pDescriptorWrites` is interpreted as in
[VkWriteDescriptorSet](#VkWriteDescriptorSet), except the `dstSet` member is ignored.

To push an immutable sampler, use a [VkWriteDescriptorSet](#VkWriteDescriptorSet) with
`dstBinding` and `dstArrayElement` selecting the immutable sampler’s
binding.
If the descriptor type is [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType), the
`pImageInfo` parameter is ignored and the immutable sampler is taken
from the push descriptor set layout in the pipeline layout.
If the descriptor type is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
the `sampler` member of the `pImageInfo` parameter is ignored and
the immutable sampler is taken from the push descriptor set layout in the
pipeline layout.

Valid Usage

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-11295) VUID-vkCmdPushDescriptorSet-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-11296) VUID-vkCmdPushDescriptorSet-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSet-set-00364) VUID-vkCmdPushDescriptorSet-set-00364

`set` **must** be less than
[VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdPushDescriptorSet-set-00365) VUID-vkCmdPushDescriptorSet-set-00365

`set` **must** be the unique set number in the pipeline layout that
uses a descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-vkCmdPushDescriptorSet-pDescriptorWrites-06494) VUID-vkCmdPushDescriptorSet-pDescriptorWrites-06494

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType),
`pDescriptorWrites`[i].`pImageInfo` **must** be a valid pointer to
an array of `pDescriptorWrites`[i].`descriptorCount` valid
`VkDescriptorImageInfo` structures

* 
[](#VUID-vkCmdPushDescriptorSet-pipelineBindPoint-00363) VUID-vkCmdPushDescriptorSet-pipelineBindPoint-00363

`pipelineBindPoint` **must** be supported by the `commandBuffer`’s
parent `VkCommandPool`’s queue family

* 
[](#VUID-vkCmdPushDescriptorSet-None-10356) VUID-vkCmdPushDescriptorSet-None-10356

If the [VK_KHR_push_descriptor](../appendices/extensions.html#VK_KHR_push_descriptor) extension is not enabled,
[`pushDescriptor`](features.html#features-pushDescriptor) **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-parameter) VUID-vkCmdPushDescriptorSet-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPushDescriptorSet-pipelineBindPoint-parameter) VUID-vkCmdPushDescriptorSet-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-vkCmdPushDescriptorSet-layout-parameter) VUID-vkCmdPushDescriptorSet-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-vkCmdPushDescriptorSet-pDescriptorWrites-parameter) VUID-vkCmdPushDescriptorSet-pDescriptorWrites-parameter

 `pDescriptorWrites` **must** be a valid pointer to an array of `descriptorWriteCount` valid [VkWriteDescriptorSet](#VkWriteDescriptorSet) structures

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-recording) VUID-vkCmdPushDescriptorSet-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushDescriptorSet-commandBuffer-cmdpool) VUID-vkCmdPushDescriptorSet-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPushDescriptorSet-videocoding) VUID-vkCmdPushDescriptorSet-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdPushDescriptorSet-descriptorWriteCount-arraylength) VUID-vkCmdPushDescriptorSet-descriptorWriteCount-arraylength

 `descriptorWriteCount` **must** be greater than `0`

* 
[](#VUID-vkCmdPushDescriptorSet-commonparent) VUID-vkCmdPushDescriptorSet-commonparent

 Both of `commandBuffer`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdPushDescriptorSet is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To push descriptor updates into a command buffer, call:

// Provided by VK_VERSION_1_4
void vkCmdPushDescriptorSet2(
    VkCommandBuffer                             commandBuffer,
    const VkPushDescriptorSetInfo*              pPushDescriptorSetInfo);

// Provided by VK_KHR_maintenance6 with VK_KHR_push_descriptor
// Equivalent to vkCmdPushDescriptorSet2
void vkCmdPushDescriptorSet2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkPushDescriptorSetInfo*              pPushDescriptorSetInfo);

* 
`commandBuffer` is the command buffer that the descriptors will be
recorded in.

* 
`pPushDescriptorSetInfo` is a pointer to a
`VkPushDescriptorSetInfo` structure.

Valid Usage

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-11295) VUID-vkCmdPushDescriptorSet2-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-11296) VUID-vkCmdPushDescriptorSet2-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSet2-pPushDescriptorSetInfo-09468) VUID-vkCmdPushDescriptorSet2-pPushDescriptorSetInfo-09468

Each bit in `pPushDescriptorSetInfo->stageFlags` **must** be a stage
supported by the `commandBuffer`’s parent `VkCommandPool`’s
queue family

* 
[](#VUID-vkCmdPushDescriptorSet2-None-10357) VUID-vkCmdPushDescriptorSet2-None-10357

If the [VK_KHR_push_descriptor](../appendices/extensions.html#VK_KHR_push_descriptor) extension is not enabled,
[`pushDescriptor`](features.html#features-pushDescriptor) **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-parameter) VUID-vkCmdPushDescriptorSet2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPushDescriptorSet2-pPushDescriptorSetInfo-parameter) VUID-vkCmdPushDescriptorSet2-pPushDescriptorSetInfo-parameter

 `pPushDescriptorSetInfo` **must** be a valid pointer to a valid [VkPushDescriptorSetInfo](#VkPushDescriptorSetInfo) structure

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-recording) VUID-vkCmdPushDescriptorSet2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-cmdpool) VUID-vkCmdPushDescriptorSet2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPushDescriptorSet2-videocoding) VUID-vkCmdPushDescriptorSet2-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdPushDescriptorSet2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkPushDescriptorSetInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPushDescriptorSetInfo {
    VkStructureType                sType;
    const void*                    pNext;
    VkShaderStageFlags             stageFlags;
    VkPipelineLayout               layout;
    uint32_t                       set;
    uint32_t                       descriptorWriteCount;
    const VkWriteDescriptorSet*    pDescriptorWrites;
} VkPushDescriptorSetInfo;

// Provided by VK_KHR_maintenance6 with VK_KHR_push_descriptor
// Equivalent to VkPushDescriptorSetInfo
typedef VkPushDescriptorSetInfo VkPushDescriptorSetInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) specifying
the shader stages that will use the descriptors.

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.
If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)
structure off the `pNext`

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.

* 
`descriptorWriteCount` is the number of elements in the
`pDescriptorWrites` array.

* 
`pDescriptorWrites` is a pointer to an array of
[VkWriteDescriptorSet](#VkWriteDescriptorSet) structures describing the descriptors to be
updated.

If `stageFlags` specifies a subset of all stages corresponding to one or
more pipeline bind points, the binding operation still affects all stages
corresponding to the given pipeline bind point(s) as if the equivalent
original version of this command had been called with the same parameters.
For example, specifying a `stageFlags` value of
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) | [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) |
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) is equivalent to calling the original
version of this command once with [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint) and
once with [VK_PIPELINE_BIND_POINT_COMPUTE](pipelines.html#VkPipelineBindPoint).

Valid Usage

* 
[](#VUID-VkPushDescriptorSetInfo-set-00364) VUID-VkPushDescriptorSetInfo-set-00364

`set` **must** be less than
[VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-VkPushDescriptorSetInfo-set-00365) VUID-VkPushDescriptorSetInfo-set-00365

`set` **must** be the unique set number in the pipeline layout that
uses a descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkPushDescriptorSetInfo-pDescriptorWrites-06494) VUID-VkPushDescriptorSetInfo-pDescriptorWrites-06494

For each element i where
`pDescriptorWrites`[i].`descriptorType` is
[VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType),
`pDescriptorWrites`[i].`pImageInfo` **must** be a valid pointer to
an array of `pDescriptorWrites`[i].`descriptorCount` valid
`VkDescriptorImageInfo` structures

* 
[](#VUID-VkPushDescriptorSetInfo-None-09495) VUID-VkPushDescriptorSetInfo-None-09495

If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkPushDescriptorSetInfo-layout-09496) VUID-VkPushDescriptorSetInfo-layout-09496

If `layout` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) structure

Valid Usage (Implicit)

* 
[](#VUID-VkPushDescriptorSetInfo-sType-sType) VUID-VkPushDescriptorSetInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPushDescriptorSetInfo-pNext-pNext) VUID-VkPushDescriptorSetInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)

* 
[](#VUID-VkPushDescriptorSetInfo-sType-unique) VUID-VkPushDescriptorSetInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPushDescriptorSetInfo-stageFlags-parameter) VUID-VkPushDescriptorSetInfo-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkPushDescriptorSetInfo-stageFlags-requiredbitmask) VUID-VkPushDescriptorSetInfo-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkPushDescriptorSetInfo-layout-parameter) VUID-VkPushDescriptorSetInfo-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkPushDescriptorSetInfo-pDescriptorWrites-parameter) VUID-VkPushDescriptorSetInfo-pDescriptorWrites-parameter

 `pDescriptorWrites` **must** be a valid pointer to an array of `descriptorWriteCount` valid [VkWriteDescriptorSet](#VkWriteDescriptorSet) structures

* 
[](#VUID-VkPushDescriptorSetInfo-descriptorWriteCount-arraylength) VUID-VkPushDescriptorSetInfo-descriptorWriteCount-arraylength

 `descriptorWriteCount` **must** be greater than `0`

To use a descriptor update template to specify the push descriptors to
update in a command buffer, call:

// Provided by VK_VERSION_1_4
void vkCmdPushDescriptorSetWithTemplate(
    VkCommandBuffer                             commandBuffer,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    VkPipelineLayout                            layout,
    uint32_t                                    set,
    const void*                                 pData);

// Provided by VK_KHR_descriptor_update_template with VK_KHR_push_descriptor, VK_KHR_push_descriptor with VK_VERSION_1_1 or VK_KHR_descriptor_update_template
// Equivalent to vkCmdPushDescriptorSetWithTemplate
void vkCmdPushDescriptorSetWithTemplateKHR(
    VkCommandBuffer                             commandBuffer,
    VkDescriptorUpdateTemplate                  descriptorUpdateTemplate,
    VkPipelineLayout                            layout,
    uint32_t                                    set,
    const void*                                 pData);

* 
`commandBuffer` is the command buffer that the descriptors will be
recorded in.

* 
`descriptorUpdateTemplate` is a descriptor update template defining
how to interpret the descriptor information in `pData`.

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.
It **must** be compatible with the layout used to create the
`descriptorUpdateTemplate` handle.

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.
This **must** be the same number used to create the
`descriptorUpdateTemplate` handle.

* 
`pData` is a pointer to memory containing descriptors for the
templated update.

Valid Usage

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-11295) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-11296) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-00366) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-00366

The `pipelineBindPoint` specified during the creation of the
descriptor update template **must** be supported by the
`commandBuffer`’s parent `VkCommandPool`’s queue family

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-pData-01686) VUID-vkCmdPushDescriptorSetWithTemplate-pData-01686

`pData` **must** be a valid pointer to a memory containing one or more
valid instances of [VkDescriptorImageInfo](#VkDescriptorImageInfo),
[VkDescriptorBufferInfo](#VkDescriptorBufferInfo), or [VkBufferView](resources.html#VkBufferView) in a layout defined
by `descriptorUpdateTemplate` when it was created with
[vkCreateDescriptorUpdateTemplate](#vkCreateDescriptorUpdateTemplate)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-layout-07993) VUID-vkCmdPushDescriptorSetWithTemplate-layout-07993

`layout` **must** be compatible with the layout used to create
`descriptorUpdateTemplate`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-descriptorUpdateTemplate-07994) VUID-vkCmdPushDescriptorSetWithTemplate-descriptorUpdateTemplate-07994

`descriptorUpdateTemplate` **must** have been created with a
`templateType` of
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-set-07995) VUID-vkCmdPushDescriptorSetWithTemplate-set-07995

`set` **must** be the same value used to create
`descriptorUpdateTemplate`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-set-07304) VUID-vkCmdPushDescriptorSetWithTemplate-set-07304

`set` **must** be less than
[VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-set-11854) VUID-vkCmdPushDescriptorSetWithTemplate-set-11854

`set` **must** reference a valid [VkDescriptorSetLayout](#VkDescriptorSetLayout) handle in
`layout`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-set-07305) VUID-vkCmdPushDescriptorSetWithTemplate-set-07305

`set` **must** be the unique set number in the pipeline layout that
uses a descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-None-10358) VUID-vkCmdPushDescriptorSetWithTemplate-None-10358

If the [VK_KHR_push_descriptor](../appendices/extensions.html#VK_KHR_push_descriptor) extension is not enabled,
[`pushDescriptor`](features.html#features-pushDescriptor) **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-parameter) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-descriptorUpdateTemplate-parameter) VUID-vkCmdPushDescriptorSetWithTemplate-descriptorUpdateTemplate-parameter

 `descriptorUpdateTemplate` **must** be a valid [VkDescriptorUpdateTemplate](#VkDescriptorUpdateTemplate) handle

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-layout-parameter) VUID-vkCmdPushDescriptorSetWithTemplate-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-recording) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-cmdpool) VUID-vkCmdPushDescriptorSetWithTemplate-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-videocoding) VUID-vkCmdPushDescriptorSetWithTemplate-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate-commonparent) VUID-vkCmdPushDescriptorSetWithTemplate-commonparent

 Each of `commandBuffer`, `descriptorUpdateTemplate`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdPushDescriptorSetWithTemplate is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

API Example

struct AppDataStructure
{
    VkDescriptorImageInfo  imageInfo;          // a single image info
    // ... some more application-related data
};

const VkDescriptorUpdateTemplateEntry descriptorUpdateTemplateEntries[] =
{
    // binding to a single image descriptor
    {
        .binding = 0,
        .dstArrayElement = 0,
        .descriptorCount = 1,
        .descriptorType = VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER,
        .offset = offsetof(AppDataStructure, imageInfo),
        .stride = 0     // not required if descriptorCount is 1
    }
};

// create a descriptor update template for push descriptor set updates
const VkDescriptorUpdateTemplateCreateInfo createInfo =
{
    .sType = VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO,
    .pNext = NULL,
    .flags = 0,
    .descriptorUpdateEntryCount = 1,
    .pDescriptorUpdateEntries = descriptorUpdateTemplateEntries,
    .templateType = VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS,
    .descriptorSetLayout = 0,   // ignored by given templateType
    .pipelineBindPoint = VK_PIPELINE_BIND_POINT_GRAPHICS,
    .pipelineLayout = myPipelineLayout,
    .set = 0,
};

VkDescriptorUpdateTemplate myDescriptorUpdateTemplate;
myResult = vkCreateDescriptorUpdateTemplate(
    myDevice,
    &createInfo,
    NULL,
    &myDescriptorUpdateTemplate);

AppDataStructure appData;
// fill appData here or cache it in your engine
vkCmdPushDescriptorSetWithTemplate(myCmdBuffer, myDescriptorUpdateTemplate, myPipelineLayout, 0,&appData);

To use a descriptor update template to specify the push descriptors to
update in a command buffer, call:

// Provided by VK_VERSION_1_4
void vkCmdPushDescriptorSetWithTemplate2(
    VkCommandBuffer                             commandBuffer,
    const VkPushDescriptorSetWithTemplateInfo*  pPushDescriptorSetWithTemplateInfo);

// Provided by VK_KHR_maintenance6 with VK_KHR_push_descriptor
// Equivalent to vkCmdPushDescriptorSetWithTemplate2
void vkCmdPushDescriptorSetWithTemplate2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkPushDescriptorSetWithTemplateInfo*  pPushDescriptorSetWithTemplateInfo);

* 
`commandBuffer` is the command buffer that the descriptors will be
recorded in.

* 
`pPushDescriptorSetWithTemplateInfo` is a pointer to a
`VkPushDescriptorSetWithTemplateInfo` structure.

Valid Usage

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-11295) VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-11296) VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-parameter) VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate2-pPushDescriptorSetWithTemplateInfo-parameter) VUID-vkCmdPushDescriptorSetWithTemplate2-pPushDescriptorSetWithTemplateInfo-parameter

 `pPushDescriptorSetWithTemplateInfo` **must** be a valid pointer to a valid [VkPushDescriptorSetWithTemplateInfo](#VkPushDescriptorSetWithTemplateInfo) structure

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-recording) VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-cmdpool) VUID-vkCmdPushDescriptorSetWithTemplate2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPushDescriptorSetWithTemplate2-videocoding) VUID-vkCmdPushDescriptorSetWithTemplate2-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdPushDescriptorSetWithTemplate2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkPushDescriptorSetWithTemplateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPushDescriptorSetWithTemplateInfo {
    VkStructureType               sType;
    const void*                   pNext;
    VkDescriptorUpdateTemplate    descriptorUpdateTemplate;
    VkPipelineLayout              layout;
    uint32_t                      set;
    const void*                   pData;
} VkPushDescriptorSetWithTemplateInfo;

// Provided by VK_KHR_maintenance6 with VK_KHR_push_descriptor
// Equivalent to VkPushDescriptorSetWithTemplateInfo
typedef VkPushDescriptorSetWithTemplateInfo VkPushDescriptorSetWithTemplateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorUpdateTemplate` is a descriptor update template defining
how to interpret the descriptor information in `pData`.

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.
It **must** be compatible with the layout used to create the
`descriptorUpdateTemplate` handle.
If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)
structure off the `pNext`

* 
`set` is the set number of the descriptor set in the pipeline layout
that will be updated.
This **must** be the same number used to create the
`descriptorUpdateTemplate` handle.

* 
`pData` is a pointer to memory containing descriptors for the
templated update.

Valid Usage

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-commandBuffer-00366) VUID-VkPushDescriptorSetWithTemplateInfo-commandBuffer-00366

The `pipelineBindPoint` specified during the creation of the
descriptor update template **must** be supported by the
`commandBuffer`’s parent `VkCommandPool`’s queue family

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-pData-01686) VUID-VkPushDescriptorSetWithTemplateInfo-pData-01686

`pData` **must** be a valid pointer to a memory containing one or more
valid instances of [VkDescriptorImageInfo](#VkDescriptorImageInfo),
[VkDescriptorBufferInfo](#VkDescriptorBufferInfo), or [VkBufferView](resources.html#VkBufferView) in a layout defined
by `descriptorUpdateTemplate` when it was created with
[vkCreateDescriptorUpdateTemplate](#vkCreateDescriptorUpdateTemplate)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-layout-07993) VUID-VkPushDescriptorSetWithTemplateInfo-layout-07993

`layout` **must** be compatible with the layout used to create
`descriptorUpdateTemplate`

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-descriptorUpdateTemplate-07994) VUID-VkPushDescriptorSetWithTemplateInfo-descriptorUpdateTemplate-07994

`descriptorUpdateTemplate` **must** have been created with a
`templateType` of
[VK_DESCRIPTOR_UPDATE_TEMPLATE_TYPE_PUSH_DESCRIPTORS](#VkDescriptorUpdateTemplateTypeKHR)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-set-07995) VUID-VkPushDescriptorSetWithTemplateInfo-set-07995

`set` **must** be the same value used to create
`descriptorUpdateTemplate`

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-set-07304) VUID-VkPushDescriptorSetWithTemplateInfo-set-07304

`set` **must** be less than
[VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-set-11854) VUID-VkPushDescriptorSetWithTemplateInfo-set-11854

`set` **must** reference a valid [VkDescriptorSetLayout](#VkDescriptorSetLayout) handle in
`layout`

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-set-07305) VUID-VkPushDescriptorSetWithTemplateInfo-set-07305

`set` **must** be the unique set number in the pipeline layout that
uses a descriptor set layout that was created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-None-09495) VUID-VkPushDescriptorSetWithTemplateInfo-None-09495

If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-layout-09496) VUID-VkPushDescriptorSetWithTemplateInfo-layout-09496

If `layout` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) structure

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-None-10359) VUID-VkPushDescriptorSetWithTemplateInfo-None-10359

If the [VK_KHR_push_descriptor](../appendices/extensions.html#VK_KHR_push_descriptor) extension is not enabled,
[`pushDescriptor`](features.html#features-pushDescriptor) **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-sType-sType) VUID-VkPushDescriptorSetWithTemplateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_WITH_TEMPLATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-pNext-pNext) VUID-VkPushDescriptorSetWithTemplateInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-sType-unique) VUID-VkPushDescriptorSetWithTemplateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-descriptorUpdateTemplate-parameter) VUID-VkPushDescriptorSetWithTemplateInfo-descriptorUpdateTemplate-parameter

 `descriptorUpdateTemplate` **must** be a valid [VkDescriptorUpdateTemplate](#VkDescriptorUpdateTemplate) handle

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-layout-parameter) VUID-VkPushDescriptorSetWithTemplateInfo-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-pData-parameter) VUID-VkPushDescriptorSetWithTemplateInfo-pData-parameter

 `pData` **must** be a pointer value

* 
[](#VUID-VkPushDescriptorSetWithTemplateInfo-commonparent) VUID-VkPushDescriptorSetWithTemplateInfo-commonparent

 Both of `descriptorUpdateTemplate`, and `layout` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

As described above in section [Pipeline Layouts](#descriptors-pipelinelayout), the pipeline layout defines shader push constants which are
updated via Vulkan commands rather than via writes to memory or copy
commands.

|  | Push constants represent a high speed path to modify constant data in
| --- | --- |
pipelines that is expected to outperform memory-backed resource updates. |

To update push constants, call:

// Provided by VK_VERSION_1_0
void vkCmdPushConstants(
    VkCommandBuffer                             commandBuffer,
    VkPipelineLayout                            layout,
    VkShaderStageFlags                          stageFlags,
    uint32_t                                    offset,
    uint32_t                                    size,
    const void*                                 pValues);

* 
`commandBuffer` is the command buffer in which the push constant
update will be recorded.

* 
`layout` is the pipeline layout used to program the push constant
updates.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) specifying
the shader stages that will use the push constants in the updated range.

* 
`offset` is the start offset of the push constant range to update,
in units of bytes.

* 
`size` is the size of the push constant range to update, in units of
bytes.

* 
`pValues` is a pointer to an array of `size` bytes containing
the new push constant values.

When a command buffer begins recording, all push constant values are
**undefined**.
Reads of **undefined** push constant values by the executing shader return
**undefined** values.

Push constant values **can** be updated incrementally, causing shader stages in
`stageFlags` to read the new data from `pValues` for push constants
modified by this command, while still reading the previous data for push
constants not modified by this command.
When a [bound pipeline command](pipelines.html#pipelines-bindpoint-commands) is issued,
the bound pipeline’s layout **must** be compatible with the layouts used to set
the values of all push constants in the pipeline layout’s push constant
ranges, as described in [Pipeline Layout Compatibility](#descriptors-compatibility).
Binding a pipeline with a layout that is not compatible with the push
constant layout does not disturb the push constant values.

|  | As `stageFlags` needs to include all flags the relevant push constant
| --- | --- |
ranges were created with, any flags that are not supported by the queue
family that the [VkCommandPool](cmdbuffers.html#VkCommandPool) used to allocate `commandBuffer` was
created on are ignored. |

Valid Usage

* 
[](#VUID-vkCmdPushConstants-commandBuffer-11295) VUID-vkCmdPushConstants-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushConstants-commandBuffer-11296) VUID-vkCmdPushConstants-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushConstants-offset-01795) VUID-vkCmdPushConstants-offset-01795

For each byte in the range specified by `offset` and `size` and
for each shader stage in `stageFlags`, there **must** be a push
constant range in `layout` that includes that byte and that stage

* 
[](#VUID-vkCmdPushConstants-offset-01796) VUID-vkCmdPushConstants-offset-01796

For each byte in the range specified by `offset` and `size` and
for each push constant range that overlaps that byte, `stageFlags`
**must** include all stages in that push constant range’s
[VkPushConstantRange](#VkPushConstantRange)::`stageFlags`

* 
[](#VUID-vkCmdPushConstants-offset-00368) VUID-vkCmdPushConstants-offset-00368

`offset` **must** be a multiple of `4`

* 
[](#VUID-vkCmdPushConstants-size-00369) VUID-vkCmdPushConstants-size-00369

`size` **must** be a multiple of `4`

* 
[](#VUID-vkCmdPushConstants-offset-00370) VUID-vkCmdPushConstants-offset-00370

`offset` **must** be less than
`VkPhysicalDeviceLimits`::`maxPushConstantsSize`

* 
[](#VUID-vkCmdPushConstants-size-00371) VUID-vkCmdPushConstants-size-00371

`size` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPushConstantsSize` minus
`offset`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushConstants-commandBuffer-parameter) VUID-vkCmdPushConstants-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPushConstants-layout-parameter) VUID-vkCmdPushConstants-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-vkCmdPushConstants-stageFlags-parameter) VUID-vkCmdPushConstants-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-vkCmdPushConstants-stageFlags-requiredbitmask) VUID-vkCmdPushConstants-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-vkCmdPushConstants-pValues-parameter) VUID-vkCmdPushConstants-pValues-parameter

 `pValues` **must** be a valid pointer to an array of `size` bytes

* 
[](#VUID-vkCmdPushConstants-commandBuffer-recording) VUID-vkCmdPushConstants-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushConstants-commandBuffer-cmdpool) VUID-vkCmdPushConstants-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPushConstants-videocoding) VUID-vkCmdPushConstants-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdPushConstants-size-arraylength) VUID-vkCmdPushConstants-size-arraylength

 `size` **must** be greater than `0`

* 
[](#VUID-vkCmdPushConstants-commonparent) VUID-vkCmdPushConstants-commonparent

 Both of `commandBuffer`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdPushConstants is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To update push constants, call:

// Provided by VK_VERSION_1_4
void vkCmdPushConstants2(
    VkCommandBuffer                             commandBuffer,
    const VkPushConstantsInfo*                  pPushConstantsInfo);

// Provided by VK_KHR_maintenance6
// Equivalent to vkCmdPushConstants2
void vkCmdPushConstants2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkPushConstantsInfo*                  pPushConstantsInfo);

* 
`commandBuffer` is the command buffer in which the push constant
update will be recorded.

* 
`pPushConstantsInfo` is a pointer to a [VkPushConstantsInfo](#VkPushConstantsInfo)
structure.

Valid Usage

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-11295) VUID-vkCmdPushConstants2-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-11296) VUID-vkCmdPushConstants2-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-parameter) VUID-vkCmdPushConstants2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPushConstants2-pPushConstantsInfo-parameter) VUID-vkCmdPushConstants2-pPushConstantsInfo-parameter

 `pPushConstantsInfo` **must** be a valid pointer to a valid [VkPushConstantsInfo](#VkPushConstantsInfo) structure

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-recording) VUID-vkCmdPushConstants2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-cmdpool) VUID-vkCmdPushConstants2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPushConstants2-videocoding) VUID-vkCmdPushConstants2-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdPushConstants2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkPushConstantsInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPushConstantsInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkPipelineLayout      layout;
    VkShaderStageFlags    stageFlags;
    uint32_t              offset;
    uint32_t              size;
    const void*           pValues;
} VkPushConstantsInfo;

// Provided by VK_KHR_maintenance6
// Equivalent to VkPushConstantsInfo
typedef VkPushConstantsInfo VkPushConstantsInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`layout` is the pipeline layout used to program the push constant
updates.
If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)
structure off the `pNext`

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) specifying
the shader stages that will use the push constants in the updated range.

* 
`offset` is the start offset of the push constant range to update,
in units of bytes.

* 
`size` is the size of the push constant range to update, in units of
bytes.

* 
`pValues` is a pointer to an array of `size` bytes containing
the new push constant values.

Valid Usage

* 
[](#VUID-VkPushConstantsInfo-offset-01795) VUID-VkPushConstantsInfo-offset-01795

For each byte in the range specified by `offset` and `size` and
for each shader stage in `stageFlags`, there **must** be a push
constant range in `layout` that includes that byte and that stage

* 
[](#VUID-VkPushConstantsInfo-offset-01796) VUID-VkPushConstantsInfo-offset-01796

For each byte in the range specified by `offset` and `size` and
for each push constant range that overlaps that byte, `stageFlags`
**must** include all stages in that push constant range’s
[VkPushConstantRange](#VkPushConstantRange)::`stageFlags`

* 
[](#VUID-VkPushConstantsInfo-offset-00368) VUID-VkPushConstantsInfo-offset-00368

`offset` **must** be a multiple of `4`

* 
[](#VUID-VkPushConstantsInfo-size-00369) VUID-VkPushConstantsInfo-size-00369

`size` **must** be a multiple of `4`

* 
[](#VUID-VkPushConstantsInfo-offset-00370) VUID-VkPushConstantsInfo-offset-00370

`offset` **must** be less than
`VkPhysicalDeviceLimits`::`maxPushConstantsSize`

* 
[](#VUID-VkPushConstantsInfo-size-00371) VUID-VkPushConstantsInfo-size-00371

`size` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxPushConstantsSize` minus
`offset`

* 
[](#VUID-VkPushConstantsInfo-None-09495) VUID-VkPushConstantsInfo-None-09495

If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkPushConstantsInfo-layout-09496) VUID-VkPushConstantsInfo-layout-09496

If `layout` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) structure

Valid Usage (Implicit)

* 
[](#VUID-VkPushConstantsInfo-sType-sType) VUID-VkPushConstantsInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPushConstantsInfo-pNext-pNext) VUID-VkPushConstantsInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) or [VkPushConstantBankInfoNV](descriptorheaps.html#VkPushConstantBankInfoNV)

* 
[](#VUID-VkPushConstantsInfo-sType-unique) VUID-VkPushConstantsInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPushConstantsInfo-layout-parameter) VUID-VkPushConstantsInfo-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkPushConstantsInfo-stageFlags-parameter) VUID-VkPushConstantsInfo-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkPushConstantsInfo-stageFlags-requiredbitmask) VUID-VkPushConstantsInfo-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkPushConstantsInfo-pValues-parameter) VUID-VkPushConstantsInfo-pValues-parameter

 `pValues` **must** be a valid pointer to an array of `size` bytes

* 
[](#VUID-VkPushConstantsInfo-size-arraylength) VUID-VkPushConstantsInfo-size-arraylength

 `size` **must** be greater than `0`

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

If the [`descriptorBuffer`](features.html#features-descriptorBuffer) feature is
enabled, an alternative way to specify descriptor sets is via buffers,
rather than descriptor set objects.

Commands are provided to retrieve descriptor data, and also to locate where
in memory that data **must** be written to match the given descriptor set
layout.

To determine the amount of memory needed to store all descriptors with a
given layout, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkGetDescriptorSetLayoutSizeEXT(
    VkDevice                                    device,
    VkDescriptorSetLayout                       layout,
    VkDeviceSize*                               pLayoutSizeInBytes);

* 
`device` is the logical device that gets the size.

* 
`layout` is the descriptor set layout being queried.

* 
`pLayoutSizeInBytes` is a pointer to `VkDeviceSize` where the
size in bytes will be written.

The size of a descriptor set layout will be at least as large as the sum
total of the size of all descriptors in the layout, and **may** be larger.
This size represents the amount of memory that will be required to store all
of the descriptors for this layout in memory, when placed according to the
layout’s offsets as obtained by
[vkGetDescriptorSetLayoutBindingOffsetEXT](#vkGetDescriptorSetLayoutBindingOffsetEXT).

If any `binding` in `layout` is
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT), the returned size
includes space for the maximum `descriptorCount` descriptors as declared
for that `binding`.
To compute the required size of a descriptor set with a
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT):

size = offset + descriptorSize ×
variableDescriptorCount

where offset is obtained by
[vkGetDescriptorSetLayoutBindingOffsetEXT](#vkGetDescriptorSetLayoutBindingOffsetEXT) and descriptorSize is
the size of the relevant descriptor as obtained from
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT), and
variableDescriptorCount is the equivalent of
[VkDescriptorSetVariableDescriptorCountAllocateInfo](#VkDescriptorSetVariableDescriptorCountAllocateInfo)::`pDescriptorCounts`.
For [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType),
variableDescriptorCount is the size in bytes for the inline uniform
block, and descriptorSize is 1.

If
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`combinedImageSamplerDescriptorSingleArray`
is [VK_FALSE](fundamentals.html#VK_FALSE) and the variable descriptor type is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType),
variableDescriptorCount is always considered to be the upper bound.

Valid Usage

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-None-08011) VUID-vkGetDescriptorSetLayoutSizeEXT-None-08011

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-08012) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-08012

`layout` **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11811) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11811

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11812) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11812

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-device-parameter) VUID-vkGetDescriptorSetLayoutSizeEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parameter) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parameter

 `layout` **must** be a valid [VkDescriptorSetLayout](#VkDescriptorSetLayout) handle

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-pLayoutSizeInBytes-parameter) VUID-vkGetDescriptorSetLayoutSizeEXT-pLayoutSizeInBytes-parameter

 `pLayoutSizeInBytes` **must** be a valid pointer to a `VkDeviceSize` value

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parent) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parent

 `layout` **must** have been created, allocated, or retrieved from `device`

To get the offset of a binding within a descriptor set layout in memory,
call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkGetDescriptorSetLayoutBindingOffsetEXT(
    VkDevice                                    device,
    VkDescriptorSetLayout                       layout,
    uint32_t                                    binding,
    VkDeviceSize*                               pOffset);

* 
`device` is the logical device that gets the offset.

* 
`layout` is the descriptor set layout being queried.

* 
`binding` is the binding number being queried.

* 
`pOffset` is a pointer to `VkDeviceSize` where the byte
offset of the binding will be written.

Each binding in a descriptor set layout is assigned an offset in memory by
the implementation.
When a shader accesses a resource with that binding, it will access the
bound descriptor buffer from that offset to look for its descriptor.
This command provides an application with that offset, so that descriptors
can be placed in the correct locations.
The precise location accessed by a shader for a given descriptor is as
follows:

location = bufferAddress +  setOffset + 
descriptorOffset +  (arrayElement × descriptorSize)

where bufferAddress and setOffset are the base address and
offset for the identified descriptor set as specified by
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT) and
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT), descriptorOffset is the
offset for the binding returned by this command, arrayElement is the
index into the array specified in the shader, and descriptorSize is
the size of the relevant descriptor as obtained from
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT).
Applications are responsible for placing valid descriptors at the expected
location in order for a shader to access it.
The overall offset added to bufferAddress to calculate location
**must** be less than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxSamplerDescriptorBufferRange`
for samplers and
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxResourceDescriptorBufferRange`
for resources.

If any `binding` in `layout` is
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT), that
`binding` **must** have the largest offset of any `binding`.

A descriptor `binding` with type [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](#VkDescriptorType)
**can** be used.
Any potential types in
[VkMutableDescriptorTypeCreateInfoEXT](#VkMutableDescriptorTypeCreateInfoEXT)::`pDescriptorTypes` for
`binding` share the same offset.
If the size of the [mutable descriptor](#descriptors-mutable) is larger
than the size of a concrete descriptor type being accessed, the padding area
is ignored by the implementation.

Valid Usage

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-None-08013) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-None-08013

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-08014) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-08014

`layout` **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11813) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11813

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](#VkDescriptorSetLayoutCreateFlagBits) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11814) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11814

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-device-parameter) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parameter) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parameter

 `layout` **must** be a valid [VkDescriptorSetLayout](#VkDescriptorSetLayout) handle

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-pOffset-parameter) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-pOffset-parameter

 `pOffset` **must** be a valid pointer to a `VkDeviceSize` value

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parent) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parent

 `layout` **must** have been created, allocated, or retrieved from `device`

To get descriptor data to place in a buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkGetDescriptorEXT(
    VkDevice                                    device,
    const VkDescriptorGetInfoEXT*               pDescriptorInfo,
    size_t                                      dataSize,
    void*                                       pDescriptor);

* 
`device` is the logical device that gets the descriptor.

* 
`pDescriptorInfo` is a pointer to a [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)
structure specifying the parameters of the descriptor to get.

* 
`dataSize` is the amount of the descriptor data to get in bytes.

* 
`pDescriptor` is a pointer to an application-allocated buffer where
the descriptor will be written.

The size of the data for each descriptor type is determined by the value in
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT).
This value also defines the stride in bytes for arrays of that descriptor
type.

If the
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`combinedImageSamplerDescriptorSingleArray`
property is [VK_FALSE](fundamentals.html#VK_FALSE) the implementation requires an array of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) descriptors to be written
into a descriptor buffer as an array of image descriptors, immediately
followed by an array of sampler descriptors.
Applications **must** write the first
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`sampledImageDescriptorSize`
bytes of the data returned through `pDescriptor` to the first array, and
the remaining
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`samplerDescriptorSize`
bytes of the data to the second array.
For variable-sized descriptor bindings of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) descriptors, the two arrays
each have a size equal to the upper bound `descriptorCount` of that
binding.

A descriptor obtained by this command references the underlying
[VkImageView](resources.html#VkImageView) or [VkSampler](samplers.html#VkSampler), and these objects **must** not be
destroyed before the last time a descriptor is dynamically accessed.
For descriptor types which consume an address instead of an object, the
underlying [VkBuffer](resources.html#VkBuffer) is referenced instead.

Valid Usage

* 
[](#VUID-vkGetDescriptorEXT-None-08015) VUID-vkGetDescriptorEXT-None-08015

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkGetDescriptorEXT-dataSize-08125) VUID-vkGetDescriptorEXT-dataSize-08125

If `pDescriptorInfo->type` is not
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) or
`pDescriptorInfo->data.pCombinedImageSampler` has an `imageView`
member that was not created with a `VkSamplerYcbcrConversionInfo`
structure in its `pNext` chain,
`dataSize` **must** equal the size of a descriptor of type
[VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` determined by the value in
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)
, or determined by
[VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT)::`combinedImageSamplerDensityMapDescriptorSize`
if `pDescriptorInfo` specifies a
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) whose [VkSampler](samplers.html#VkSampler)
was created with [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) set

* 
[](#VUID-vkGetDescriptorEXT-descriptorType-09469) VUID-vkGetDescriptorEXT-descriptorType-09469

If `pDescriptorInfo->type` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) and
`pDescriptorInfo->data.pCombinedImageSampler` has an `imageView`
member that was created with a `VkSamplerYcbcrConversionInfo`
structure in its `pNext` chain, `dataSize` **must** equal the size
of
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`combinedImageSamplerDescriptorSize`
times
[VkSamplerYcbcrConversionImageFormatProperties](capabilities.html#VkSamplerYcbcrConversionImageFormatProperties)::`combinedImageSamplerDescriptorCount`

* 
[](#VUID-vkGetDescriptorEXT-pDescriptorInfo-09507) VUID-vkGetDescriptorEXT-pDescriptorInfo-09507

If `pDescriptorInfo->type` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) and it has a
`imageView` that is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then `dataSize` **must**
be equal to the size of
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`combinedImageSamplerDescriptorSize`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorEXT-device-parameter) VUID-vkGetDescriptorEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDescriptorEXT-pDescriptorInfo-parameter) VUID-vkGetDescriptorEXT-pDescriptorInfo-parameter

 `pDescriptorInfo` **must** be a valid pointer to a valid [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT) structure

* 
[](#VUID-vkGetDescriptorEXT-pDescriptor-parameter) VUID-vkGetDescriptorEXT-pDescriptor-parameter

 `pDescriptor` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetDescriptorEXT-dataSize-arraylength) VUID-vkGetDescriptorEXT-dataSize-arraylength

 `dataSize` **must** be greater than `0`

Information about the descriptor to get is passed in a
`VkDescriptorGetInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorGetInfoEXT {
    VkStructureType        sType;
    const void*            pNext;
    VkDescriptorType       type;
    VkDescriptorDataEXT    data;
} VkDescriptorGetInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the type of descriptor to get.

* 
`data` is a [VkDescriptorDataEXT](#VkDescriptorDataEXT) union containing the
information needed to get the descriptor.

Valid Usage

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08018) VUID-VkDescriptorGetInfoEXT-type-08018

`type` **must** not be [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](#VkDescriptorType)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08019) VUID-VkDescriptorGetInfoEXT-type-08019

If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), the
`pCombinedImageSampler->sampler` member of `data` **must** be a
[VkSampler](samplers.html#VkSampler) created on `device`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08020) VUID-VkDescriptorGetInfoEXT-type-08020

If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), the
`pCombinedImageSampler->imageView` member of `data` **must** be a
[VkImageView](resources.html#VkImageView) created on `device`, or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08021) VUID-VkDescriptorGetInfoEXT-type-08021

If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType), the
`pInputAttachmentImage->imageView` member of `data` **must** be a
[VkImageView](resources.html#VkImageView) created on `device`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08022) VUID-VkDescriptorGetInfoEXT-type-08022

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), and if
`pSampledImage` is not `NULL`, the `pSampledImage->imageView`
member of `data` **must** be a [VkImageView](resources.html#VkImageView) created on
`device`, or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08023) VUID-VkDescriptorGetInfoEXT-type-08023

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), and if
`pStorageImage` is not `NULL`, the `pStorageImage->imageView`
member of `data` **must** be a [VkImageView](resources.html#VkImageView) created on
`device`, or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-09427) VUID-VkDescriptorGetInfoEXT-type-09427

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType),
`pUniformBuffer` is not `NULL` , the number of texel buffer elements
given by (⌊`pUniformBuffer->range` / (texel block
size)⌋ × (texels per block)) where texel block size and
texels per block are as defined in the [    Compatible Formats](formats.html#formats-compatibility) table for `pUniformBuffer->format`, **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxTexelBufferElements`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-09428) VUID-VkDescriptorGetInfoEXT-type-09428

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType),
`pStorageBuffer` is not `NULL` , the number of texel buffer elements
given by (⌊`pStorageBuffer->range` / (texel block
size)⌋ × (texels per block)) where texel block size and
texels per block are as defined in the [    Compatible Formats](formats.html#formats-compatibility) table for `pStorageBuffer->format`, **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxTexelBufferElements`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08028) VUID-VkDescriptorGetInfoEXT-type-08028

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType) and
`accelerationStructure` is not `0`, `accelerationStructure`
**must** contain the address of a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) created
on `device`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08029) VUID-VkDescriptorGetInfoEXT-type-08029

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType) and
`accelerationStructure` is not `0`, `accelerationStructure`
**must** contain the handle of a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) created on
`device`, returned by [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-09701) VUID-VkDescriptorGetInfoEXT-type-09701

If `type` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType), a
[VkDescriptorGetTensorInfoARM](#VkDescriptorGetTensorInfoARM) structure **must** be included in the
`pNext` chain and `data` is ignored

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12216) VUID-VkDescriptorGetInfoEXT-type-12216

If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) and
`pCombinedImageSampler->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
`pCombinedImageSampler->imageView` member of `data` **must** have
been created with [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12217) VUID-VkDescriptorGetInfoEXT-type-12217

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType),
`pSampledImage` is not `NULL`, and `pSampledImage->imageView` is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pSampledImage->imageView` member of
`data` **must** have been created with [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits)
set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12218) VUID-VkDescriptorGetInfoEXT-type-12218

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType),
`pStorageImage` is not `NULL`, and `pStorageImage->imageView` is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pStorageImage->imageView` member of
`data` **must** have been created with [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits)
set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12219) VUID-VkDescriptorGetInfoEXT-type-12219

If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType), the
`pInputAttachmentImage->imageView` member of `data` **must** have
been created with [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12220) VUID-VkDescriptorGetInfoEXT-type-12220

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType),
`pUniformBuffer` is not `NULL` and `pUniformBuffer->address` is
not zero, `pUniformBuffer->address` **must** be a device address
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12221) VUID-VkDescriptorGetInfoEXT-type-12221

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType),
`pStorageBuffer` is not `NULL` and `pStorageBuffer->address` is
not zero, `pStorageBuffer->address` **must** be a device address
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12222) VUID-VkDescriptorGetInfoEXT-type-12222

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType),
`pUniformTexelBuffer` is not `NULL` and
`pUniformTexelBuffer->address` is not zero,
`pUniformTexelBuffer->address` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12223) VUID-VkDescriptorGetInfoEXT-type-12223

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType),
`pStorageTexelBuffer` is not `NULL` and
`pStorageTexelBuffer->address` is not zero,
`pStorageTexelBuffer->address` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12265) VUID-VkDescriptorGetInfoEXT-type-12265

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType) and
`pUniformBuffer` is not `NULL`, `pUniformBuffer->address` **must**
be aligned to
`VkPhysicalDeviceLimits`::`minUniformBufferOffsetAlignment`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12266) VUID-VkDescriptorGetInfoEXT-type-12266

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType) and
`pStorageBuffer` is not `NULL`, `pStorageBuffer->address` **must**
be aligned to
`VkPhysicalDeviceLimits`::`minStorageBufferOffsetAlignment`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12269) VUID-VkDescriptorGetInfoEXT-type-12269

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType), and
`pUniformTexelBuffer` is not `NULL`,
`pUniformTexelBuffer->address` **must** be a multiple of the effective
alignment requirement as determined by
[`minTexelBufferOffsetAlignment`](limits.html#limits-minTexelBufferOffsetAlignment)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12270) VUID-VkDescriptorGetInfoEXT-type-12270

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType), the and
`pStorageTexelBuffer` is not `NULL`,
`pStorageTexelBuffer->address` **must** be a multiple of the effective
alignment requirement as determined by
[`minTexelBufferOffsetAlignment`](limits.html#limits-minTexelBufferOffsetAlignment)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorGetInfoEXT-sType-sType) VUID-VkDescriptorGetInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_GET_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorGetInfoEXT-pNext-pNext) VUID-VkDescriptorGetInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDescriptorGetTensorInfoARM](#VkDescriptorGetTensorInfoARM)

* 
[](#VUID-VkDescriptorGetInfoEXT-sType-unique) VUID-VkDescriptorGetInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorGetInfoEXT-type-parameter) VUID-VkDescriptorGetInfoEXT-type-parameter

 `type` **must** be a valid [VkDescriptorType](#VkDescriptorType) value

* 
[](#VUID-VkDescriptorGetInfoEXT-pSampler-parameter) VUID-VkDescriptorGetInfoEXT-pSampler-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType), the `pSampler` member of `data` **must** be a valid pointer to a valid [VkSampler](samplers.html#VkSampler) handle

* 
[](#VUID-VkDescriptorGetInfoEXT-pCombinedImageSampler-parameter) VUID-VkDescriptorGetInfoEXT-pCombinedImageSampler-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), the `pCombinedImageSampler` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](#VkDescriptorImageInfo) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pInputAttachmentImage-parameter) VUID-VkDescriptorGetInfoEXT-pInputAttachmentImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType), the `pInputAttachmentImage` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](#VkDescriptorImageInfo) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pSampledImage-parameter) VUID-VkDescriptorGetInfoEXT-pSampledImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), and if `pSampledImage` is not `NULL`, the `pSampledImage` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](#VkDescriptorImageInfo) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pStorageImage-parameter) VUID-VkDescriptorGetInfoEXT-pStorageImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), and if `pStorageImage` is not `NULL`, the `pStorageImage` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](#VkDescriptorImageInfo) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pUniformTexelBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pUniformTexelBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType), and if `pUniformTexelBuffer` is not `NULL`, the `pUniformTexelBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pStorageTexelBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pStorageTexelBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType), and if `pStorageTexelBuffer` is not `NULL`, the `pStorageTexelBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pUniformBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pUniformBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType), and if `pUniformBuffer` is not `NULL`, the `pUniformBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pStorageBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pStorageBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType), and if `pStorageBuffer` is not `NULL`, the `pStorageBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-accelerationStructure-parameter) VUID-VkDescriptorGetInfoEXT-accelerationStructure-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType) or [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType), the `accelerationStructure` member of `data` **must** be a valid `VkDeviceAddress` value

Data describing the descriptor is passed in a `VkDescriptorDataEXT`
structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef union VkDescriptorDataEXT {
    const VkSampler*                     pSampler;
    const VkDescriptorImageInfo*         pCombinedImageSampler;
    const VkDescriptorImageInfo*         pInputAttachmentImage;
    const VkDescriptorImageInfo*         pSampledImage;
    const VkDescriptorImageInfo*         pStorageImage;
    const VkDescriptorAddressInfoEXT*    pUniformTexelBuffer;
    const VkDescriptorAddressInfoEXT*    pStorageTexelBuffer;
    const VkDescriptorAddressInfoEXT*    pUniformBuffer;
    const VkDescriptorAddressInfoEXT*    pStorageBuffer;
    VkDeviceAddress                      accelerationStructure;
} VkDescriptorDataEXT;

* 
`pSampler` is a pointer to a [VkSampler](samplers.html#VkSampler) handle specifying the
parameters of a [VK_DESCRIPTOR_TYPE_SAMPLER](#VkDescriptorType) descriptor.

* 
`pCombinedImageSampler` is a pointer to a
[VkDescriptorImageInfo](#VkDescriptorImageInfo) structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType) descriptor.

* 
`pInputAttachmentImage` is a pointer to a
[VkDescriptorImageInfo](#VkDescriptorImageInfo) structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](#VkDescriptorType) descriptor.

* 
`pSampledImage` is a pointer to a [VkDescriptorImageInfo](#VkDescriptorImageInfo)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType) descriptor.

* 
`pStorageImage` is a pointer to a [VkDescriptorImageInfo](#VkDescriptorImageInfo)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType) descriptor.

* 
`pUniformTexelBuffer` is a pointer to a
[VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure specifying the parameters of
a [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType) descriptor.

* 
`pStorageTexelBuffer` is a pointer to a
[VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure specifying the parameters of
a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType) descriptor.

* 
`pUniformBuffer` is a pointer to a [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType) descriptor.

* 
`pStorageBuffer` is a pointer to a [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType) descriptor.

* 
`accelerationStructure` is
     the address of a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) specifying the
     parameters of a [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType)
     descriptor
, or
    a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handle specifying the parameters of a
    [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType) descriptor.

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
`pSampledImage`, `pStorageImage`, `pUniformTexelBuffer`,
`pStorageTexelBuffer`, `pUniformBuffer`, and `pStorageBuffer`
**can** each be `NULL`.
Loads from a null descriptor return zero values and stores and atomics to a
null descriptor are discarded.

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
`accelerationStructure` **can** be `0`.
A null acceleration structure descriptor results in the miss shader being
invoked.

Valid Usage

* 
[](#VUID-VkDescriptorDataEXT-type-08034) VUID-VkDescriptorDataEXT-type-08034

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pCombinedImageSampler->imageView` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorDataEXT-type-08035) VUID-VkDescriptorDataEXT-type-08035

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pSampledImage` **must** not be `NULL` and
`pSampledImage->imageView` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorDataEXT-type-08036) VUID-VkDescriptorDataEXT-type-08036

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pStorageImage` **must** not be `NULL` and
`pStorageImage->imageView` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorDataEXT-type-08037) VUID-VkDescriptorDataEXT-type-08037

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pUniformTexelBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08038) VUID-VkDescriptorDataEXT-type-08038

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pStorageTexelBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08039) VUID-VkDescriptorDataEXT-type-08039

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pUniformBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08040) VUID-VkDescriptorDataEXT-type-08040

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pStorageBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08041) VUID-VkDescriptorDataEXT-type-08041

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `accelerationStructure` **must** not be `0`

* 
[](#VUID-VkDescriptorDataEXT-type-08042) VUID-VkDescriptorDataEXT-type-08042

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `accelerationStructure` **must** not be `0`

Data describing a [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType) descriptor is passed in a
`VkDescriptorAddressInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorAddressInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceAddress    address;
    VkDeviceSize       range;
    VkFormat           format;
} VkDescriptorAddressInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`address` is either `0` or a device address at an offset in a
buffer, where the base address can be queried from
[vkGetBufferDeviceAddress](resources.html#vkGetBufferDeviceAddress).

* 
`range` is the size in bytes of the buffer or buffer view used by
the descriptor.

* 
`format` is the format of the data elements in the buffer view and
is ignored for buffers.

Valid Usage

* 
[](#VUID-VkDescriptorAddressInfoEXT-None-09508) VUID-VkDescriptorAddressInfoEXT-None-09508

If
`address` is not zero, and
the descriptor is of type [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](#VkDescriptorType)
or [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](#VkDescriptorType), then `format`
**must** not be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkDescriptorAddressInfoEXT-address-08043) VUID-VkDescriptorAddressInfoEXT-address-08043

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled,
`address` **must** not be zero

* 
[](#VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08938) VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08938

If `address` is zero, `range` **must** be [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE)

* 
[](#VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08939) VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08939

If `address` is not zero,
`range` **must** not be [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE)

* 
[](#VUID-VkDescriptorAddressInfoEXT-range-08045) VUID-VkDescriptorAddressInfoEXT-range-08045

If `address` is not zero, then `range` **must** be less than or
equal to the size of the buffer containing `address` minus the
offset of `address` from the base address of the buffer

* 
[](#VUID-VkDescriptorAddressInfoEXT-range-08940) VUID-VkDescriptorAddressInfoEXT-range-08940

`range` **must** not be zero

* 
[](#VUID-VkDescriptorAddressInfoEXT-None-12271) VUID-VkDescriptorAddressInfoEXT-None-12271

    If
Vulkan 1.3 is not supported and
    the [`ycbcr2plane444Formats`](features.html#features-ycbcr2plane444Formats)
    feature is not enabled, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](formats.html#VkFormat),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](formats.html#VkFormat)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorAddressInfoEXT-sType-sType) VUID-VkDescriptorAddressInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_ADDRESS_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorAddressInfoEXT-pNext-pNext) VUID-VkDescriptorAddressInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDescriptorAddressInfoEXT-address-parameter) VUID-VkDescriptorAddressInfoEXT-address-parameter

 If `address` is not `0`, `address` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkDescriptorAddressInfoEXT-format-parameter) VUID-VkDescriptorAddressInfoEXT-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
`address` **can** be zero.
Loads from a null descriptor return zero values and stores and atomics to a
null descriptor are discarded.

Immutable samplers specified in a descriptor set layout through
`pImmutableSamplers` **must** be provided by applications when obtaining
descriptor data.
Immutable samplers written in a descriptor buffer **must** have identical
parameters to the immutable samplers in the descriptor set layout that
consumes the sampler.

|  | If the descriptor set layout was created with
| --- | --- |
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits),
there is no buffer backing for the immutable sampler, so this requirement
does not exist.
The implementation handles allocation of these descriptors internally. |

|  | As descriptors are now in regular memory, drivers cannot hide copies of
| --- | --- |
immutable samplers that end up in descriptor sets from the application.
As such, applications are required to provide these samplers as if they were
not provided immutably. |

The `VkDescriptorGetTensorInfoARM` is defined as:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkDescriptorGetTensorInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorViewARM    tensorView;
} VkDescriptorGetTensorInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorView` is a [VkTensorViewARM](resources.html#VkTensorViewARM) handle specifying the
parameters of a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](#VkDescriptorType) descriptor.

Valid Usage

* 
[](#VUID-VkDescriptorGetTensorInfoARM-nullDescriptor-09899) VUID-VkDescriptorGetTensorInfoARM-nullDescriptor-09899

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `tensorView` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorGetTensorInfoARM-sType-sType) VUID-VkDescriptorGetTensorInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_GET_TENSOR_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorGetTensorInfoARM-tensorView-parameter) VUID-VkDescriptorGetTensorInfoARM-tensorView-parameter

 If `tensorView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `tensorView` **must** be a valid [VkTensorViewARM](resources.html#VkTensorViewARM) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)

Descriptor buffers have their own separate binding point on the command
buffer, with buffers bound using [vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT).
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT) assigns pairs of buffer binding
indices and buffer offsets to the same binding point on the command buffer
as [vkCmdBindDescriptorSets](#vkCmdBindDescriptorSets), allowing subsequent
[bound pipeline commands](pipelines.html#pipelines-bindpoint-commands) to use the
specified descriptor buffers.
Bindings applied via [vkCmdBindDescriptorSets](#vkCmdBindDescriptorSets) **cannot** exist
simultaneously with those applied via calls to
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT) or
[vkCmdBindDescriptorBufferEmbeddedSamplersEXT](#vkCmdBindDescriptorBufferEmbeddedSamplersEXT), as calls to
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT) or
[vkCmdBindDescriptorBufferEmbeddedSamplersEXT](#vkCmdBindDescriptorBufferEmbeddedSamplersEXT) invalidate any bindings
by previous calls to [vkCmdBindDescriptorSets](#vkCmdBindDescriptorSets) and vice-versa.

To bind descriptor buffers to a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkCmdBindDescriptorBuffersEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    bufferCount,
    const VkDescriptorBufferBindingInfoEXT*     pBindingInfos);

* 
`commandBuffer` is the command buffer that the descriptor buffers
will be bound to.

* 
`bufferCount` is the number of elements in the `pBindingInfos`
array.

* 
`pBindingInfos` is a pointer to an array of
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT) structures.

`vkCmdBindDescriptorBuffersEXT` causes any offsets previously set by
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT) that use the bindings numbered
[`0`..
`bufferCount`-1] to be no longer valid for subsequent bound pipeline
commands.
Any previously bound buffers at binding points greater than or equal to
`bufferCount` are unbound.

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11295) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11296) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-None-08047) VUID-vkCmdBindDescriptorBuffersEXT-None-08047

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-maxSamplerDescriptorBufferBindings-08048) VUID-vkCmdBindDescriptorBuffersEXT-maxSamplerDescriptorBufferBindings-08048

There **must** be no more than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxSamplerDescriptorBufferBindings`
elements in `pBindingInfos` with
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT)::`usage` containing
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-maxResourceDescriptorBufferBindings-08049) VUID-vkCmdBindDescriptorBuffersEXT-maxResourceDescriptorBufferBindings-08049

There **must** be no more than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxResourceDescriptorBufferBindings`
elements in `pBindingInfos` with
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT)::`usage` containing
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-None-08050) VUID-vkCmdBindDescriptorBuffersEXT-None-08050

There **must** be no more than `1` element in `pBindingInfos` with
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT)::`usage` containing
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-08051) VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-08051

`bufferCount` **must** be less than or equal to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxDescriptorBufferBindings`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08053) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08053

For each element of `pBindingInfos`, the buffer from which
`address` was queried **must** have been created with the
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set
if it contains sampler descriptor data

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08054) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08054

For each element of `pBindingInfos`, the buffer from which
`address` was queried **must** have been created with the
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set
if it contains resource descriptor data

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08055) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08055

For each element of `pBindingInfos`, at least one buffer from which
`address` was queried must contain `usage`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-09947) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-09947

For all elements of `pBindingInfos`, the buffer from which
`address` was queried **must** have been created with the
[VK_BUFFER_USAGE_2_DATA_GRAPH_FOREIGN_DESCRIPTOR_BIT_ARM](resources.html#VkBufferUsageFlagBits2KHR) usage flag
set if the command pool from which `commandBuffer` was allocated
from was created with any element of
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM)::pProcessingEngines with
`isForeign` set to [VK_TRUE](fundamentals.html#VK_TRUE)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-parameter) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-parameter) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-parameter

 `pBindingInfos` **must** be a valid pointer to an array of `bufferCount` valid [VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT) structures

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-recording) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-videocoding) VUID-vkCmdBindDescriptorBuffersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-arraylength) VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-arraylength

 `bufferCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorBuffersEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Data describing a descriptor buffer binding is passed in a
`VkDescriptorBufferBindingInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorBufferBindingInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkDeviceAddress       address;
    VkBufferUsageFlags    usage;
} VkDescriptorBufferBindingInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`address` is a `VkDeviceAddress` specifying the device
address defining the descriptor buffer to be bound.

* 
`usage` is a bitmask of [VkBufferUsageFlagBits](resources.html#VkBufferUsageFlagBits) specifying the
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`usage` for the buffer from which
`address` was queried.
Usage flags other than
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), and
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) are
ignored.

If the `pNext` chain includes a [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo)
structure, [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo)::`usage` from that
structure is used instead of `usage` from this structure.

Valid Usage

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-None-09499) VUID-VkDescriptorBufferBindingInfoEXT-None-09499

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo) structure,
`usage` **must** be a valid combination of [VkBufferUsageFlagBits](resources.html#VkBufferUsageFlagBits)
values

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-None-09500) VUID-VkDescriptorBufferBindingInfoEXT-None-09500

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo) structure,
`usage` **must** not be 0

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-10998) VUID-VkDescriptorBufferBindingInfoEXT-usage-10998

The `usage` must include at least one of
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), or
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-bufferlessPushDescriptors-08056) VUID-VkDescriptorBufferBindingInfoEXT-bufferlessPushDescriptors-08056

If [    `VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](limits.html#limits-bufferlessPushDescriptors)
is [VK_FALSE](fundamentals.html#VK_FALSE), and `usage` contains
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), then
the `pNext` chain **must** include a
[VkDescriptorBufferBindingPushDescriptorBufferHandleEXT](#VkDescriptorBufferBindingPushDescriptorBufferHandleEXT) structure

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-address-08057) VUID-VkDescriptorBufferBindingInfoEXT-address-08057

`address` **must** be aligned to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`descriptorBufferOffsetAlignment`

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-08122) VUID-VkDescriptorBufferBindingInfoEXT-usage-08122

If `usage` includes
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), `address`
**must** be a device address allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)
usage flag set

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-08123) VUID-VkDescriptorBufferBindingInfoEXT-usage-08123

If `usage` includes
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), `address`
**must** be a device address allocated to the application from a buffer
created with the
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-08124) VUID-VkDescriptorBufferBindingInfoEXT-usage-08124

If `usage` includes
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`address` **must** be a device address allocated to the application
from a buffer created with the
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage
flag set

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-sType-sType) VUID-VkDescriptorBufferBindingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-pNext-pNext) VUID-VkDescriptorBufferBindingInfoEXT-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo) or [VkDescriptorBufferBindingPushDescriptorBufferHandleEXT](#VkDescriptorBufferBindingPushDescriptorBufferHandleEXT)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-sType-unique) VUID-VkDescriptorBufferBindingInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-address-parameter) VUID-VkDescriptorBufferBindingInfoEXT-address-parameter

 `address` **must** be a valid `VkDeviceAddress` value

When the [`VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](limits.html#limits-bufferlessPushDescriptors)
property is [VK_FALSE](fundamentals.html#VK_FALSE), the `VkBuffer` handle of the buffer for push
descriptors is passed in a
`VkDescriptorBufferBindingPushDescriptorBufferHandleEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorBufferBindingPushDescriptorBufferHandleEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
} VkDescriptorBufferBindingPushDescriptorBufferHandleEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the `VkBuffer` handle of the buffer for push
descriptors.

Valid Usage

* 
[](#VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-bufferlessPushDescriptors-08059) VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-bufferlessPushDescriptors-08059

[    `VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](limits.html#limits-bufferlessPushDescriptors)
**must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-sType-sType) VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_PUSH_DESCRIPTOR_BUFFER_HANDLE_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-buffer-parameter) VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT)

To set descriptor buffer offsets in a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkCmdSetDescriptorBufferOffsetsEXT(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    firstSet,
    uint32_t                                    setCount,
    const uint32_t*                             pBufferIndices,
    const VkDeviceSize*                         pOffsets);

* 
`commandBuffer` is the command buffer in which the descriptor buffer
offsets will be set.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) indicating the
type of the pipeline that will use the descriptors.

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.

* 
`firstSet` is the number of the first set to be bound.

* 
`setCount` is the number of elements in the `pBufferIndices` and
`pOffsets` arrays.

* 
`pBufferIndices` is a pointer to an array of indices into the
descriptor buffer binding points set by
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT).

* 
`pOffsets` is a pointer to an array of `VkDeviceSize` offsets
to apply to the bound descriptor buffers.

`vkCmdSetDescriptorBufferOffsetsEXT` binds `setCount` pairs of
descriptor buffers, specified by indices into the binding points bound using
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT), and buffer offsets to set numbers
[`firstSet`..`firstSet`+`setCount`-1] for subsequent
[bound pipeline commands](pipelines.html#pipelines-bindpoint-commands) set by
`pipelineBindPoint`.
Set [`firstSet` + i] is bound to the descriptor buffer at binding
`pBufferIndices`[i] at an offset of `pOffsets`[i].
Any bindings that were previously applied via these sets, or calls to
[vkCmdBindDescriptorSets](#vkCmdBindDescriptorSets), are no longer valid.
Other sets will also be invalidated upon calling this command if
`layout` differs from the pipeline layout used to bind those other sets,
as described in [Pipeline Layout Compatibility](#descriptors-compatibility).

After binding descriptors, applications **can** modify descriptor memory either
by performing writes on the host or with device commands.
When descriptor memory is updated with device commands, visibility for the
shader stage accessing a descriptor is ensured with the
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](synchronization.html#VkAccessFlagBits2KHR) access flag.
Implementations **must** not access resources referenced by these descriptors
unless they are dynamically accessed by shaders.
Descriptors bound with this call **can** be **undefined** if they are not
dynamically accessed by shaders.

Implementations **may** read descriptor data for any statically accessed
descriptor if the `binding` in `layout` is not declared with the
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT) flag.
If the `binding` in `layout` is declared with
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT), implementations
**must** not read descriptor data that is not dynamically accessed.

Applications **must** ensure that any descriptor which the implementation **may**
read **must** be in-bounds of the underlying descriptor buffer binding.

|  | Applications can freely decide how large a variable descriptor buffer
| --- | --- |
binding is, so it may not be safe to read such descriptor payloads
statically.
The intention of these rules is to allow implementations to speculatively
prefetch descriptor payloads where feasible. |

Dynamically accessing a resource through descriptor data from an unbound
region of a [sparse partially-resident buffer](sparsemem.html#sparsememory-partially-resident-buffers) will result in invalid descriptor data being
read, and therefore **undefined** behavior.

|  | For descriptors written by the host, visibility is implied through the
| --- | --- |
automatic visibility operation on queue submit, and there is no need to
consider `VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT`.
Explicit synchronization for descriptors is only required when descriptors
are updated on the device. |

|  | The requirements above imply that all descriptor bindings have been defined
| --- | --- |
with the equivalent of [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](#VkDescriptorBindingFlagBitsEXT),
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](#VkDescriptorBindingFlagBitsEXT) and
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](#VkDescriptorBindingFlagBitsEXT), but enabling those features
is not required to get this behavior. |

Valid Usage

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11295) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11296) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08061) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08061

The offsets in `pOffsets` **must** be aligned to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`descriptorBufferOffsetAlignment`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08063) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08063

The offsets in `pOffsets` **must** be small enough such that any
descriptor binding referenced by `layout`
without the [VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT)
flag
computes a valid address inside the underlying [VkBuffer](resources.html#VkBuffer)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08126) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08126

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a sampler descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxSamplerDescriptorBufferRange`
of the sampler descriptor buffer binding

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08127) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08127

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a resource descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxResourceDescriptorBufferRange`
of the resource descriptor buffer binding

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08064) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08064

Each element of `pBufferIndices` **must** be less than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxDescriptorBufferBindings`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08065) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08065

Each element of `pBufferIndices` **must** reference a valid descriptor
buffer binding set by a previous call to
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT) in `commandBuffer`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-08066) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-08066

The sum of `firstSet` and `setCount` **must** be less than or equal
to [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-09006) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-09006

The [VkDescriptorSetLayout](#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11803) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11803

The [VkDescriptorSetLayout](#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT_KHR](#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11804) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11804

The [VkDescriptorSetLayout](#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
bit set

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-None-08060) VUID-vkCmdSetDescriptorBufferOffsetsEXT-None-08060

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-08067) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-08067

`pipelineBindPoint` **must** be supported by the `commandBuffer`’s
parent `VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-layout-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-parameter

 `pBufferIndices` **must** be a valid pointer to an array of `setCount` `uint32_t` values

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `setCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-recording) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-cmdpool) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-videocoding) VUID-vkCmdSetDescriptorBufferOffsetsEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-setCount-arraylength) VUID-vkCmdSetDescriptorBufferOffsetsEXT-setCount-arraylength

 `setCount` **must** be greater than `0`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commonparent) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commonparent

 Both of `commandBuffer`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDescriptorBufferOffsetsEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To set descriptor buffer offsets in a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
void vkCmdSetDescriptorBufferOffsets2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkSetDescriptorBufferOffsetsInfoEXT*  pSetDescriptorBufferOffsetsInfo);

* 
`commandBuffer` is the command buffer in which the descriptor buffer
offsets will be set.

* 
`pSetDescriptorBufferOffsetsInfo` is a pointer to a
`VkSetDescriptorBufferOffsetsInfoEXT` structure.

Valid Usage

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11295) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11296) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-descriptorBuffer-09470) VUID-vkCmdSetDescriptorBufferOffsets2EXT-descriptorBuffer-09470

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-09471) VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-09471

Each bit in `pSetDescriptorBufferOffsetsInfo->stageFlags` **must** be a
stage supported by the `commandBuffer`’s parent
`VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-parameter) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-parameter) VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-parameter

 `pSetDescriptorBufferOffsetsInfo` **must** be a valid pointer to a valid [VkSetDescriptorBufferOffsetsInfoEXT](#VkSetDescriptorBufferOffsetsInfoEXT) structure

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-recording) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-cmdpool) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-videocoding) VUID-vkCmdSetDescriptorBufferOffsets2EXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDescriptorBufferOffsets2EXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkSetDescriptorBufferOffsetsInfoEXT` structure is defined as:

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
typedef struct VkSetDescriptorBufferOffsetsInfoEXT {
    VkStructureType        sType;
    const void*            pNext;
    VkShaderStageFlags     stageFlags;
    VkPipelineLayout       layout;
    uint32_t               firstSet;
    uint32_t               setCount;
    const uint32_t*        pBufferIndices;
    const VkDeviceSize*    pOffsets;
} VkSetDescriptorBufferOffsetsInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) specifying
the shader stages the descriptor sets will be bound to

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.
If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)
structure off the `pNext`

* 
`firstSet` is the number of the first set to be bound.

* 
`setCount` is the number of elements in the `pBufferIndices` and
`pOffsets` arrays.

* 
`pBufferIndices` is a pointer to an array of indices into the
descriptor buffer binding points set by
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT).

* 
`pOffsets` is a pointer to an array of `VkDeviceSize` offsets
to apply to the bound descriptor buffers.

If `stageFlags` specifies a subset of all stages corresponding to one or
more pipeline bind points, the binding operation still affects all stages
corresponding to the given pipeline bind point(s) as if the equivalent
original version of this command had been called with the same parameters.
For example, specifying a `stageFlags` value of
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) | [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) |
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) is equivalent to calling the original
version of this command once with [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint) and
once with [VK_PIPELINE_BIND_POINT_COMPUTE](pipelines.html#VkPipelineBindPoint).

Valid Usage

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08061) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08061

The offsets in `pOffsets` **must** be aligned to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`descriptorBufferOffsetAlignment`

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08063) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08063

The offsets in `pOffsets` **must** be small enough such that any
descriptor binding referenced by `layout`
without the [VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](#VkDescriptorBindingFlagBitsEXT)
flag
computes a valid address inside the underlying [VkBuffer](resources.html#VkBuffer)

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08126) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08126

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a sampler descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxSamplerDescriptorBufferRange`
of the sampler descriptor buffer binding

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08127) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08127

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a resource descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxResourceDescriptorBufferRange`
of the resource descriptor buffer binding

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-08064) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-08064

Each element of `pBufferIndices` **must** be less than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxDescriptorBufferBindings`

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-08065) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-08065

Each element of `pBufferIndices` **must** reference a valid descriptor
buffer binding set by a previous call to
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT) in `commandBuffer`

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-08066) VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-08066

The sum of `firstSet` and `setCount` **must** be less than or equal
to [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-09006) VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-09006

The [VkDescriptorSetLayout](#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-11803) VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-11803

The [VkDescriptorSetLayout](#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT_KHR](#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-11804) VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-11804

The [VkDescriptorSetLayout](#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
bit set

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-None-09495) VUID-VkSetDescriptorBufferOffsetsInfoEXT-None-09495

If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-layout-09496) VUID-VkSetDescriptorBufferOffsetsInfoEXT-layout-09496

If `layout` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) structure

Valid Usage (Implicit)

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-sType-sType) VUID-VkSetDescriptorBufferOffsetsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SET_DESCRIPTOR_BUFFER_OFFSETS_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pNext-pNext) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-sType-unique) VUID-VkSetDescriptorBufferOffsetsInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-stageFlags-parameter) VUID-VkSetDescriptorBufferOffsetsInfoEXT-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-stageFlags-requiredbitmask) VUID-VkSetDescriptorBufferOffsetsInfoEXT-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-layout-parameter) VUID-VkSetDescriptorBufferOffsetsInfoEXT-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-parameter) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-parameter

 `pBufferIndices` **must** be a valid pointer to an array of `setCount` `uint32_t` values

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-parameter) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `setCount` `VkDeviceSize` values

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-setCount-arraylength) VUID-VkSetDescriptorBufferOffsetsInfoEXT-setCount-arraylength

 `setCount` **must** be greater than `0`

To bind an embedded immutable sampler set to a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkCmdBindDescriptorBufferEmbeddedSamplersEXT(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    set);

* 
`commandBuffer` is the command buffer that the embedded immutable
samplers will be bound to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) indicating the
type of the pipeline that will use the embedded immutable samplers.

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.

* 
`set` is the number of the set to be bound.

`vkCmdBindDescriptorBufferEmbeddedSamplersEXT` binds the embedded immutable
samplers in `set` of `layout` to `set` for the command buffer
for subsequent [bound pipeline commands](pipelines.html#pipelines-bindpoint-commands) set
by `pipelineBindPoint`.
Any previous binding to this set by [vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT)
or this command is overwritten.
Any sets that were last bound by a call to [vkCmdBindDescriptorSets](#vkCmdBindDescriptorSets) are
invalidated upon calling this command.
Other sets will also be invalidated upon calling this command if
`layout` differs from the pipeline layout used to bind those other sets,
as described in [Pipeline Layout Compatibility](#descriptors-compatibility).

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11295) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11296) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08070) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08070

The [VkDescriptorSetLayout](#VkDescriptorSetLayout) at index `set` when `layout` was
created **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
bit set

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08071) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08071

`set` **must** be less than or equal to
[VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-None-08068) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-None-08068

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-08069) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-08069

`pipelineBindPoint` **must** be supported by the `commandBuffer`’s
parent `VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-layout-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-recording) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-videocoding) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commonparent) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commonparent

 Both of `commandBuffer`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorBufferEmbeddedSamplersEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To bind an embedded immutable sampler set to a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
void vkCmdBindDescriptorBufferEmbeddedSamplers2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkBindDescriptorBufferEmbeddedSamplersInfoEXT* pBindDescriptorBufferEmbeddedSamplersInfo);

* 
`commandBuffer` is the command buffer that the embedded immutable
samplers will be bound to.

* 
`pBindDescriptorBufferEmbeddedSamplersInfo` is a pointer to a
`VkBindDescriptorBufferEmbeddedSamplersInfoEXT` structure.

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-11295) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-11296) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-descriptorBuffer-09472) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-descriptorBuffer-09472

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-pBindDescriptorBufferEmbeddedSamplersInfo-09473) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-pBindDescriptorBufferEmbeddedSamplersInfo-09473

Each bit in `pBindDescriptorBufferEmbeddedSamplersInfo->stageFlags`
**must** be a stage supported by the `commandBuffer`’s parent
`VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-pBindDescriptorBufferEmbeddedSamplersInfo-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-pBindDescriptorBufferEmbeddedSamplersInfo-parameter

 `pBindDescriptorBufferEmbeddedSamplersInfo` **must** be a valid pointer to a valid [VkBindDescriptorBufferEmbeddedSamplersInfoEXT](#VkBindDescriptorBufferEmbeddedSamplersInfoEXT) structure

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-recording) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-videocoding) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorBufferEmbeddedSamplers2EXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkBindDescriptorBufferEmbeddedSamplersInfoEXT` structure is defined
as:

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
typedef struct VkBindDescriptorBufferEmbeddedSamplersInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkShaderStageFlags    stageFlags;
    VkPipelineLayout      layout;
    uint32_t              set;
} VkBindDescriptorBufferEmbeddedSamplersInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) specifying
the shader stages that will use the embedded immutable samplers.

* 
`layout` is a [VkPipelineLayout](#VkPipelineLayout) object used to program the
bindings.
If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)
structure off the `pNext`

* 
`set` is the number of the set to be bound.

If `stageFlags` specifies a subset of all stages corresponding to one or
more pipeline bind points, the binding operation still affects all stages
corresponding to the given pipeline bind point(s) as if the equivalent
original version of this command had been called with the same parameters.
For example, specifying a `stageFlags` value of
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) | [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) |
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) is equivalent to calling the original
version of this command once with [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint) and
once with [VK_PIPELINE_BIND_POINT_COMPUTE](pipelines.html#VkPipelineBindPoint).

Valid Usage

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08070) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08070

The [VkDescriptorSetLayout](#VkDescriptorSetLayout) at index `set` when `layout` was
created **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](#VkDescriptorSetLayoutCreateFlagBits)
bit set

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08071) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08071

`set` **must** be less than or equal to
[VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-None-09495) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-None-09495

If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-09496) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-09496

If `layout` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo) structure

Valid Usage (Implicit)

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-sType) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_BUFFER_EMBEDDED_SAMPLERS_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-pNext-pNext) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](#VkPipelineLayoutCreateInfo)

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-unique) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-parameter) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-requiredbitmask) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-parameter) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](#VkPipelineLayout) handle

Updates to descriptor data in buffers **can** be performed by any operation on
either the host or device that **can** access memory.

Descriptor buffer reads **can** be synchronized using
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](synchronization.html#VkAccessFlagBits2KHR) in the relevant shader
stage.

If the [`descriptorBufferPushDescriptors`](features.html#features-descriptorBufferPushDescriptors) feature is enabled, push descriptors
**can** be used with descriptor buffers in the same way as with descriptor
sets.

The [`VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](limits.html#limits-bufferlessPushDescriptors)
property indicates whether the implementation requires a buffer to back push
descriptors.
If the property is [VK_FALSE](fundamentals.html#VK_FALSE) then before recording any push
descriptors, the application **must** bind exactly `1` descriptor buffer that
was created with the
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag
set.
When this buffer is bound, any previously recorded push descriptors that are
required for a subsequent command **must** be recorded again.

In a similar way to [`bufferDeviceAddressCaptureReplay`](features.html#features-bufferDeviceAddressCaptureReplay), the
[`descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature allows the creation of opaque
handles for objects at capture time that **can** be passed into object creation
calls in a future replay, causing descriptors to be created with the same
data.
The opaque memory address for any memory used by these resources **must** have
been captured using [vkGetDeviceMemoryOpaqueCaptureAddress](memory.html#vkGetDeviceMemoryOpaqueCaptureAddress) and be
replayed using [VkMemoryOpaqueCaptureAddressAllocateInfo](memory.html#VkMemoryOpaqueCaptureAddressAllocateInfo).

To get the opaque descriptor data for a buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetBufferOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkBufferCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a [VkBufferCaptureDescriptorDataInfoEXT](#VkBufferCaptureDescriptorDataInfoEXT)
structure specifying the buffer.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-None-08072) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-None-08072

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-08073) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-08073

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`bufferCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-08074) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-08074

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBufferCaptureDescriptorDataInfoEXT](#VkBufferCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the buffer to get descriptor buffer capture data for is
passed in a `VkBufferCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkBufferCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
} VkBufferCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the `VkBuffer` handle of the buffer to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-08075) VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-08075

`buffer` **must** have been created with
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkBufferCreateFlagBits) set in
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkBufferCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkBufferCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-parameter) VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

To get the opaque capture descriptor data for an image, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetImageOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkImageCaptureDescriptorDataInfoEXT*  pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a [VkImageCaptureDescriptorDataInfoEXT](#VkImageCaptureDescriptorDataInfoEXT)
structure specifying the image.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-None-08076) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-None-08076

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-08077) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-08077

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`imageCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-08078) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-08078

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageCaptureDescriptorDataInfoEXT](#VkImageCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the image to get descriptor buffer capture data for is
passed in a `VkImageCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkImageCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
} VkImageCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the `VkImage` handle of the image to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-image-08079) VUID-VkImageCaptureDescriptorDataInfoEXT-image-08079

`image` **must** have been created with
[VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkImageCreateFlagBits) set in
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkImageCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkImageCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-image-parameter) VUID-VkImageCaptureDescriptorDataInfoEXT-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

To get the opaque capture descriptor data for an image view, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetImageViewOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkImageViewCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkImageViewCaptureDescriptorDataInfoEXT](#VkImageViewCaptureDescriptorDataInfoEXT) structure specifying the
image view.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-None-08080) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-None-08080

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-08081) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-08081

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`imageViewCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-08082) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-08082

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageViewCaptureDescriptorDataInfoEXT](#VkImageViewCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the image view to get descriptor buffer capture data for
is passed in a `VkImageViewCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkImageViewCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImageView        imageView;
} VkImageViewCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the `VkImageView` handle of the image view to get
opaque capture data for.

Valid Usage

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-08083) VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-08083

`imageView` **must** have been created with
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkImageViewCreateFlagBits) set
in [VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkImageViewCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkImageViewCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-parameter) VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-parameter

 `imageView` **must** be a valid [VkImageView](resources.html#VkImageView) handle

To get the opaque capture descriptor data for a sampler, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetSamplerOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkSamplerCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkSamplerCaptureDescriptorDataInfoEXT](#VkSamplerCaptureDescriptorDataInfoEXT) structure specifying the
sampler.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-None-08084) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-None-08084

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pData-08085) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pData-08085

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`samplerCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-device-08086) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-device-08086

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkSamplerCaptureDescriptorDataInfoEXT](#VkSamplerCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the sampler to get descriptor buffer capture data for is
passed in a `VkSamplerCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkSamplerCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkSampler          sampler;
} VkSamplerCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampler` is the `VkSampler` handle of the sampler to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-08087) VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-08087

`sampler` **must** have been created with
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) set in
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkSamplerCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkSamplerCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-parameter) VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-parameter

 `sampler` **must** be a valid [VkSampler](samplers.html#VkSampler) handle

To get the opaque capture descriptor data for an acceleration structure,
call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer with VK_KHR_acceleration_structure or VK_NV_ray_tracing
VkResult vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkAccelerationStructureCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkAccelerationStructureCaptureDescriptorDataInfoEXT](#VkAccelerationStructureCaptureDescriptorDataInfoEXT) structure
specifying the acceleration structure.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-None-08088) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-None-08088

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-08089) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-08089

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`accelerationStructureCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-08090) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-08090

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAccelerationStructureCaptureDescriptorDataInfoEXT](#VkAccelerationStructureCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the acceleration structure to get descriptor buffer
capture data for is passed in a
`VkAccelerationStructureCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer with VK_KHR_acceleration_structure or VK_NV_ray_tracing
typedef struct VkAccelerationStructureCaptureDescriptorDataInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    VkAccelerationStructureKHR    accelerationStructure;
    VkAccelerationStructureNV     accelerationStructureNV;
} VkAccelerationStructureCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructure` is the `VkAccelerationStructureKHR`
handle of the acceleration structure to get opaque capture data for.

* 
`accelerationStructureNV` is the `VkAccelerationStructureNV`
handle of the acceleration structure to get opaque capture data for.

Valid Usage

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08091) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08091

If `accelerationStructure` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then
`accelerationStructure` **must** have been created with
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkAccelerationStructureCreateFlagBitsKHR)
set in [VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`createFlags`

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08092) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08092

If `accelerationStructureNV` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then
`accelerationStructureNV` **must** have been created with
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkAccelerationStructureCreateFlagBitsKHR)
set in [VkAccelerationStructureCreateInfoNV](resources.html#VkAccelerationStructureCreateInfoNV)::`info.flags`

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08093) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08093

If `accelerationStructure` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then
`accelerationStructureNV` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08094) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08094

If `accelerationStructureNV` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then
`accelerationStructure` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-parameter) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-parameter

 If `accelerationStructure` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `accelerationStructure` **must** be a valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-parameter) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-parameter

 If `accelerationStructureNV` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `accelerationStructureNV` **must** be a valid [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handle

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-commonparent) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-commonparent

 Both of `accelerationStructure`, and `accelerationStructureNV` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The `VkOpaqueCaptureDescriptorDataCreateInfoEXT` structure is defined
as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkOpaqueCaptureDescriptorDataCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    const void*        opaqueCaptureDescriptorData;
} VkOpaqueCaptureDescriptorDataCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`opaqueCaptureDescriptorData` is a pointer to an
application-allocated buffer containing opaque capture data retrieved
using [vkGetBufferOpaqueCaptureDescriptorDataEXT](#vkGetBufferOpaqueCaptureDescriptorDataEXT),
[vkGetImageOpaqueCaptureDescriptorDataEXT](#vkGetImageOpaqueCaptureDescriptorDataEXT),
[vkGetImageViewOpaqueCaptureDescriptorDataEXT](#vkGetImageViewOpaqueCaptureDescriptorDataEXT),
[vkGetTensorOpaqueCaptureDescriptorDataARM](#vkGetTensorOpaqueCaptureDescriptorDataARM),
[vkGetTensorViewOpaqueCaptureDescriptorDataARM](#vkGetTensorViewOpaqueCaptureDescriptorDataARM),
[vkGetSamplerOpaqueCaptureDescriptorDataEXT](#vkGetSamplerOpaqueCaptureDescriptorDataEXT), or
[vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT](#vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT).

During replay, opaque descriptor capture data **can** be specified by adding a
`VkOpaqueCaptureDescriptorDataCreateInfoEXT` structure to the relevant
`pNext` chain of a [VkBufferCreateInfo](resources.html#VkBufferCreateInfo), [VkImageCreateInfo](resources.html#VkImageCreateInfo),
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo), [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo),
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM), [VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM),
[VkAccelerationStructureCreateInfoNV](resources.html#VkAccelerationStructureCreateInfoNV) or
[VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR) structure.

When providing opaque capture data for an image, if the `pNext` chain of
[VkImageCreateInfo](resources.html#VkImageCreateInfo)
or [VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)
contains an instance of both this structure and
[VkOpaqueCaptureDataCreateInfoEXT](resources.html#VkOpaqueCaptureDataCreateInfoEXT), they **should** both specify data from
the same original resource.
If they have capture data from different original resources, resource
creation is much more likely to fail.

Valid Usage (Implicit)

* 
[](#VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-sType-sType) VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPAQUE_CAPTURE_DESCRIPTOR_DATA_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-opaqueCaptureDescriptorData-parameter) VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-opaqueCaptureDescriptorData-parameter

 `opaqueCaptureDescriptorData` **must** be a pointer value

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureCreateInfo2KHR](resources.html#VkAccelerationStructureCreateInfo2KHR)

* 
[VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)

* 
[VkAccelerationStructureCreateInfoNV](resources.html#VkAccelerationStructureCreateInfoNV)

* 
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)

* 
[VkImageCreateInfo](resources.html#VkImageCreateInfo)

* 
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)

* 
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)

* 
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)

* 
[VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM)

To get the opaque capture descriptor data for a tensor, call:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
VkResult vkGetTensorOpaqueCaptureDescriptorDataARM(
    VkDevice                                    device,
    const VkTensorCaptureDescriptorDataInfoARM* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a [VkTensorCaptureDescriptorDataInfoARM](#VkTensorCaptureDescriptorDataInfoARM)
structure specifying the tensor.

* 
`pData` is a pointer to a user-allocated buffer where the data will
be written.

Valid Usage

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09702) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09702

The [`descriptorBufferCaptureReplay`](features.html#features-descriptorBuffer)
and [    `descriptorBufferTensorDescriptors`](features.html#features-descriptorBufferTensorDescriptors) features **must** be enabled

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-09703) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-09703

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferTensorPropertiesARM](limits.html#VkPhysicalDeviceDescriptorBufferTensorPropertiesARM)::`tensorCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-09704) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-09704

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-parameter) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pInfo-parameter) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkTensorCaptureDescriptorDataInfoARM](#VkTensorCaptureDescriptorDataInfoARM) structure

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-parameter) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the tensor to get descriptor buffer capture data for is
passed in a `VkTensorCaptureDescriptorDataInfoARM` structure:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkTensorCaptureDescriptorDataInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorARM        tensor;
} VkTensorCaptureDescriptorDataInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensor` is the `VkTensorARM` handle of the tensor to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-09705) VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-09705

If `tensor` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then `tensor` **must** have
been created with
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](resources.html#VkTensorCreateFlagBitsARM) set in
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-sType-sType) VUID-VkTensorCaptureDescriptorDataInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_CAPTURE_DESCRIPTOR_DATA_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-pNext-pNext) VUID-VkTensorCaptureDescriptorDataInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-parameter) VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](resources.html#VkTensorARM) handle

To get the opaque capture descriptor data for a tensor view, call:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
VkResult vkGetTensorViewOpaqueCaptureDescriptorDataARM(
    VkDevice                                    device,
    const VkTensorViewCaptureDescriptorDataInfoARM* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkTensorViewCaptureDescriptorDataInfoARM](#VkTensorViewCaptureDescriptorDataInfoARM) structure specifying the
tensor view.

* 
`pData` is a pointer to a user-allocated buffer where the data will
be written.

Valid Usage

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09706) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09706

The [`descriptorBufferCaptureReplay`](features.html#features-descriptorBuffer)
and [    `descriptorBufferTensorDescriptors`](features.html#features-descriptorBufferTensorDescriptors) features **must** be enabled

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pData-09707) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pData-09707

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferTensorPropertiesARM](limits.html#VkPhysicalDeviceDescriptorBufferTensorPropertiesARM)::`tensorViewCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-device-09708) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-device-09708

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-device-parameter) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pInfo-parameter) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkTensorViewCaptureDescriptorDataInfoARM](#VkTensorViewCaptureDescriptorDataInfoARM) structure

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pData-parameter) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the tensor view to get descriptor buffer capture data for
is passed in a `VkTensorViewCaptureDescriptorDataInfoARM` structure:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkTensorViewCaptureDescriptorDataInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorViewARM    tensorView;
} VkTensorViewCaptureDescriptorDataInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorView` is the `VkTensorViewARM` handle of the tensor view
to get opaque capture data for.

Valid Usage

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-09709) VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-09709

If `tensorView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then `tensorView`
**must** have been created with
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](resources.html#VkTensorViewCreateFlagBitsARM) set
in [VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-sType-sType) VUID-VkTensorViewCaptureDescriptorDataInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-pNext-pNext) VUID-VkTensorViewCaptureDescriptorDataInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-parameter) VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-parameter

 `tensorView` **must** be a valid [VkTensorViewARM](resources.html#VkTensorViewARM) handle
