# VkPhysicalDeviceLimits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceLimits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceLimits - Structure reporting implementation-dependent physical device limits

The `VkPhysicalDeviceLimits` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPhysicalDeviceLimits {
    uint32_t              maxImageDimension1D;
    uint32_t              maxImageDimension2D;
    uint32_t              maxImageDimension3D;
    uint32_t              maxImageDimensionCube;
    uint32_t              maxImageArrayLayers;
    uint32_t              maxTexelBufferElements;
    uint32_t              maxUniformBufferRange;
    uint32_t              maxStorageBufferRange;
    uint32_t              maxPushConstantsSize;
    uint32_t              maxMemoryAllocationCount;
    uint32_t              maxSamplerAllocationCount;
    VkDeviceSize          bufferImageGranularity;
    VkDeviceSize          sparseAddressSpaceSize;
    uint32_t              maxBoundDescriptorSets;
    uint32_t              maxPerStageDescriptorSamplers;
    uint32_t              maxPerStageDescriptorUniformBuffers;
    uint32_t              maxPerStageDescriptorStorageBuffers;
    uint32_t              maxPerStageDescriptorSampledImages;
    uint32_t              maxPerStageDescriptorStorageImages;
    uint32_t              maxPerStageDescriptorInputAttachments;
    uint32_t              maxPerStageResources;
    uint32_t              maxDescriptorSetSamplers;
    uint32_t              maxDescriptorSetUniformBuffers;
    uint32_t              maxDescriptorSetUniformBuffersDynamic;
    uint32_t              maxDescriptorSetStorageBuffers;
    uint32_t              maxDescriptorSetStorageBuffersDynamic;
    uint32_t              maxDescriptorSetSampledImages;
    uint32_t              maxDescriptorSetStorageImages;
    uint32_t              maxDescriptorSetInputAttachments;
    uint32_t              maxVertexInputAttributes;
    uint32_t              maxVertexInputBindings;
    uint32_t              maxVertexInputAttributeOffset;
    uint32_t              maxVertexInputBindingStride;
    uint32_t              maxVertexOutputComponents;
    uint32_t              maxTessellationGenerationLevel;
    uint32_t              maxTessellationPatchSize;
    uint32_t              maxTessellationControlPerVertexInputComponents;
    uint32_t              maxTessellationControlPerVertexOutputComponents;
    uint32_t              maxTessellationControlPerPatchOutputComponents;
    uint32_t              maxTessellationControlTotalOutputComponents;
    uint32_t              maxTessellationEvaluationInputComponents;
    uint32_t              maxTessellationEvaluationOutputComponents;
    uint32_t              maxGeometryShaderInvocations;
    uint32_t              maxGeometryInputComponents;
    uint32_t              maxGeometryOutputComponents;
    uint32_t              maxGeometryOutputVertices;
    uint32_t              maxGeometryTotalOutputComponents;
    uint32_t              maxFragmentInputComponents;
    uint32_t              maxFragmentOutputAttachments;
    uint32_t              maxFragmentDualSrcAttachments;
    uint32_t              maxFragmentCombinedOutputResources;
    uint32_t              maxComputeSharedMemorySize;
    uint32_t              maxComputeWorkGroupCount[3];
    uint32_t              maxComputeWorkGroupInvocations;
    uint32_t              maxComputeWorkGroupSize[3];
    uint32_t              subPixelPrecisionBits;
    uint32_t              subTexelPrecisionBits;
    uint32_t              mipmapPrecisionBits;
    uint32_t              maxDrawIndexedIndexValue;
    uint32_t              maxDrawIndirectCount;
    float                 maxSamplerLodBias;
    float                 maxSamplerAnisotropy;
    uint32_t              maxViewports;
    uint32_t              maxViewportDimensions[2];
    float                 viewportBoundsRange[2];
    uint32_t              viewportSubPixelBits;
    size_t                minMemoryMapAlignment;
    VkDeviceSize          minTexelBufferOffsetAlignment;
    VkDeviceSize          minUniformBufferOffsetAlignment;
    VkDeviceSize          minStorageBufferOffsetAlignment;
    int32_t               minTexelOffset;
    uint32_t              maxTexelOffset;
    int32_t               minTexelGatherOffset;
    uint32_t              maxTexelGatherOffset;
    float                 minInterpolationOffset;
    float                 maxInterpolationOffset;
    uint32_t              subPixelInterpolationOffsetBits;
    uint32_t              maxFramebufferWidth;
    uint32_t              maxFramebufferHeight;
    uint32_t              maxFramebufferLayers;
    VkSampleCountFlags    framebufferColorSampleCounts;
    VkSampleCountFlags    framebufferDepthSampleCounts;
    VkSampleCountFlags    framebufferStencilSampleCounts;
    VkSampleCountFlags    framebufferNoAttachmentsSampleCounts;
    uint32_t              maxColorAttachments;
    VkSampleCountFlags    sampledImageColorSampleCounts;
    VkSampleCountFlags    sampledImageIntegerSampleCounts;
    VkSampleCountFlags    sampledImageDepthSampleCounts;
    VkSampleCountFlags    sampledImageStencilSampleCounts;
    VkSampleCountFlags    storageImageSampleCounts;
    uint32_t              maxSampleMaskWords;
    VkBool32              timestampComputeAndGraphics;
    float                 timestampPeriod;
    uint32_t              maxClipDistances;
    uint32_t              maxCullDistances;
    uint32_t              maxCombinedClipAndCullDistances;
    uint32_t              discreteQueuePriorities;
    float                 pointSizeRange[2];
    float                 lineWidthRange[2];
    float                 pointSizeGranularity;
    float                 lineWidthGranularity;
    VkBool32              strictLines;
    VkBool32              standardSampleLocations;
    VkDeviceSize          optimalBufferCopyOffsetAlignment;
    VkDeviceSize          optimalBufferCopyRowPitchAlignment;
    VkDeviceSize          nonCoherentAtomSize;
} VkPhysicalDeviceLimits;

The `VkPhysicalDeviceLimits` are properties of the physical device.
These are available in the `limits` member of the
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html) structure which is returned from
[vkGetPhysicalDeviceProperties](vkGetPhysicalDeviceProperties.html).

* 
 `maxImageDimension1D` is the largest
dimension (`width`) that is guaranteed to be supported for all
images created with an `imageType` of [VK_IMAGE_TYPE_1D](VkImageType.html).
Some combinations of image parameters (format, usage, etc.) **may** allow
support for larger dimensions, which **can** be queried using
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html).

* 
 `maxImageDimension2D` is the largest
dimension (`width` or `height`) that is guaranteed to be
supported for all images created with an `imageType` of
[VK_IMAGE_TYPE_2D](VkImageType.html) and without
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set in `flags`.
Some combinations of image parameters (format, usage, etc.) **may** allow
support for larger dimensions, which **can** be queried using
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html).

* 
 `maxImageDimension3D` is the largest
dimension (`width`, `height`, or `depth`) that is guaranteed
to be supported for all images created with an `imageType` of
[VK_IMAGE_TYPE_3D](VkImageType.html).
Some combinations of image parameters (format, usage, etc.) **may** allow
support for larger dimensions, which **can** be queried using
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html).

* 
 `maxImageDimensionCube` is the
largest dimension (`width` or `height`) that is guaranteed to be
supported for all images created with an `imageType` of
[VK_IMAGE_TYPE_2D](VkImageType.html) and with
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](VkImageCreateFlagBits.html) set in `flags`.
Some combinations of image parameters (format, usage, etc.) **may** allow
support for larger dimensions, which **can** be queried using
[vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html).

* 
 `maxImageArrayLayers` is the maximum
number of layers (`arrayLayers`) for an image.

* 
 `maxTexelBufferElements` is the
maximum number of addressable texels for a buffer view created on a
buffer which was created with the
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html) or
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set.

* 
 `maxUniformBufferRange` is the
maximum value that **can** be specified in the `range` member of a
[VkDescriptorBufferInfo](VkDescriptorBufferInfo.html) structure passed to
[vkUpdateDescriptorSets](vkUpdateDescriptorSets.html) for descriptors of type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html).

* 
 `maxStorageBufferRange` is the
maximum value that **can** be specified in the `range` member of a
[VkDescriptorBufferInfo](VkDescriptorBufferInfo.html) structure passed to
[vkUpdateDescriptorSets](vkUpdateDescriptorSets.html) for descriptors of type
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html).
If the [`shader64BitIndexing`](../../../../spec/latest/chapters/features.html#features-shader64BitIndexing)
feature is enabled, this limit does not apply.

* 
 `maxPushConstantsSize` is the
maximum size, in bytes, of the pool of push constant memory.
For each of the push constant ranges indicated by the
`pPushConstantRanges` member of the [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)
structure, (`offset` +  `size`) **must** be less than or
equal to this limit.

* 
 `maxMemoryAllocationCount` is
the maximum number of device memory allocations, as created by
[vkAllocateMemory](vkAllocateMemory.html), which **can** simultaneously exist.

* 
 `maxSamplerAllocationCount` is
the maximum number of sampler objects, as created by
[vkCreateSampler](vkCreateSampler.html), which **can** simultaneously exist on a device.
If the [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) feature is
enabled and the application intends to use embedded samplers, the number
advertised here is effectively reduced by the quotient of
[`minSamplerHeapReservedRangeWithEmbedded`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)
divided by [`samplerDescriptorSize`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorSize),
to provide storage for embedded samplers when switching to heaps.
If embedded samplers are not used, this can be ignored.

* 
 `bufferImageGranularity` is the
granularity, in bytes, at which buffer or linear image resources,
linear or optimal tensor resources,
and optimal image resources **can** be bound to adjacent offsets in the
same `VkDeviceMemory` object without aliasing.
See [Buffer-Image Granularity](../../../../spec/latest/chapters/resources.html#resources-bufferimagegranularity) for
more details.

* 
 `sparseAddressSpaceSize` is the
total amount of address space available, in bytes, for sparse memory
resources.
This is an upper bound on the sum of the sizes of all sparse resources,
regardless of whether any memory is bound to them.
If the [    `extendedSparseAddressSpace`](../../../../spec/latest/chapters/features.html#features-extendedSparseAddressSpace) feature is enabled, then the
difference between [    `extendedSparseAddressSpaceSize`](../../../../spec/latest/chapters/limits.html#limits-extendedSparseAddressSpaceSize) and `sparseAddressSpaceSize`
can also be used, by `VkImage` created with the `usage` member
of [VkImageCreateInfo](VkImageCreateInfo.html) only containing bits in
[    `extendedSparseImageUsageFlags`](../../../../spec/latest/chapters/limits.html#limits-extendedSparseImageUsageFlags) and `VkBuffer` created with
the `usage` member of [VkBufferCreateInfo](VkBufferCreateInfo.html) only containing bits
in [    `extendedSparseBufferUsageFlags`](../../../../spec/latest/chapters/limits.html#limits-extendedSparseBufferUsageFlags).

* 
 `maxBoundDescriptorSets` is the
maximum number of descriptor sets that **can** be simultaneously used by a
pipeline.
See [Descriptor Sets](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sets).

* 

`maxPerStageDescriptorSamplers` is the maximum number of samplers
that **can** be accessible to a single shader stage in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
A descriptor is accessible to a shader stage when the `stageFlags`
member of the `VkDescriptorSetLayoutBinding` structure has the bit
for that shader stage set.
See [Sampler](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sampler) and [Combined Image Sampler](../../../../spec/latest/chapters/descriptorsets.html#descriptors-combinedimagesampler).

* 

`maxPerStageDescriptorUniformBuffers` is the maximum number of
uniform buffers that **can** be accessible to a single shader stage in a
pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
A descriptor is accessible to a shader stage when the `stageFlags`
member of the `VkDescriptorSetLayoutBinding` structure has the bit
for that shader stage set.
See [Uniform Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-uniformbuffer) and
[Dynamic Uniform Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-uniformbufferdynamic).

* 

`maxPerStageDescriptorStorageBuffers` is the maximum number of
storage buffers that **can** be accessible to a single shader stage in a
pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
A descriptor is accessible to a pipeline shader stage when the
`stageFlags` member of the `VkDescriptorSetLayoutBinding`
structure has the bit for that shader stage set.
See [Storage Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storagebuffer) and
[Dynamic Storage Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storagebufferdynamic).

* 

`maxPerStageDescriptorSampledImages` is the maximum number of
sampled images that **can** be accessible to a single shader stage in a
pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
A descriptor is accessible to a pipeline shader stage when the
`stageFlags` member of the `VkDescriptorSetLayoutBinding`
structure has the bit for that shader stage set.
See [Combined Image Sampler](../../../../spec/latest/chapters/descriptorsets.html#descriptors-combinedimagesampler), [Sampled Image](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sampledimage),
and [Uniform Texel Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-uniformtexelbuffer).

* 

`maxPerStageDescriptorStorageImages` is the maximum number of
storage images that **can** be accessible to a single shader stage in a
pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
A descriptor is accessible to a pipeline shader stage when the
`stageFlags` member of the `VkDescriptorSetLayoutBinding`
structure has the bit for that shader stage set.
See [Storage Image](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storageimage), and
[Storage Texel Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storagetexelbuffer).

* 

`maxPerStageDescriptorInputAttachments` is the maximum number of
input attachments that **can** be accessible to a single shader stage in a
pipeline layout, as well as the maximum usable input attachment index.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html)
count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
A descriptor is accessible to a pipeline shader stage when the
`stageFlags` member of the `VkDescriptorSetLayoutBinding`
structure has the bit for that shader stage set.
These are only supported for the fragment stage.
See [Input Attachment](../../../../spec/latest/chapters/descriptorsets.html#descriptors-inputattachment).

|  | `maxPerStageDescriptorInputAttachments` was originally only intended to
| --- | --- |
limit the number of attachments per stage, not the number of available input
indices across all shaders in a render pass.
The input indices were allowed to be semi arbitrary for render pass objects,
or fully arbitrary for dynamic rendering,
however some implementations have fixed limits for them.
Applications already exist that exceed this limit, and they will continue to
work where they already did, but will fail to render on some platforms.
For forward looking applications, this can be worked around by
either making careful use of index remapping with
[VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html) for dynamic rendering, or
splitting a subpass with too many input attachments into multiple subpasses. |

* 
 `maxPerStageResources` is the
maximum number of resources that **can** be accessible to a single shader
stage in a pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
For the fragment shader stage the framebuffer color attachments also
count against this limit.

* 
 `maxDescriptorSetSamplers` is
the maximum number of samplers that **can** be included in a pipeline
layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Sampler](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sampler) and [Combined Image Sampler](../../../../spec/latest/chapters/descriptorsets.html#descriptors-combinedimagesampler).

* 

`maxDescriptorSetUniformBuffers` is the maximum number of uniform
buffers that **can** be included in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Uniform Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-uniformbuffer) and
[Dynamic Uniform Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-uniformbufferdynamic).

* 

`maxDescriptorSetUniformBuffersDynamic` is the maximum number of
dynamic uniform buffers that **can** be included in a pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Dynamic Uniform Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-uniformbufferdynamic).

* 

`maxDescriptorSetStorageBuffers` is the maximum number of storage
buffers that **can** be included in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Storage Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storagebuffer) and
[Dynamic Storage Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storagebufferdynamic).

* 

`maxDescriptorSetStorageBuffersDynamic` is the maximum number of
dynamic storage buffers that **can** be included in a pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Dynamic Storage Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storagebufferdynamic).

* 

`maxDescriptorSetSampledImages` is the maximum number of sampled
images that **can** be included in a pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Combined Image Sampler](../../../../spec/latest/chapters/descriptorsets.html#descriptors-combinedimagesampler), [Sampled Image](../../../../spec/latest/chapters/descriptorsets.html#descriptors-sampledimage),
and [Uniform Texel Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-uniformtexelbuffer).

* 

`maxDescriptorSetStorageImages` is the maximum number of storage
images that **can** be included in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Storage Image](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storageimage), and
[Storage Texel Buffer](../../../../spec/latest/chapters/descriptorsets.html#descriptors-storagetexelbuffer).

* 

`maxDescriptorSetInputAttachments` is the maximum number of input
attachments that **can** be included in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html)
count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](VkDescriptorSetLayoutCreateFlagBits.html) bit set
count against this limit.
See [Input Attachment](../../../../spec/latest/chapters/descriptorsets.html#descriptors-inputattachment).

* 
 `maxVertexInputAttributes` is
the maximum number of vertex input attributes that **can** be specified for
a graphics pipeline.
These are described in the array of
`VkVertexInputAttributeDescription` structures that are provided at
graphics pipeline creation time via the
`pVertexAttributeDescriptions` member of the
[VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html) structure.
See [Vertex Attributes](../../../../spec/latest/chapters/fxvertex.html#fxvertex-attrib) and [Vertex Input Description](../../../../spec/latest/chapters/fxvertex.html#fxvertex-input).

* 
 `maxVertexInputBindings` is the
maximum number of vertex buffers that **can** be specified for providing
vertex attributes to a graphics pipeline.
These are described in the array of
`VkVertexInputBindingDescription` structures that are provided at
graphics pipeline creation time via the `pVertexBindingDescriptions`
member of the [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html) structure.
The `binding` member of `VkVertexInputBindingDescription` **must**
be less than this limit.
See [Vertex Input Description](../../../../spec/latest/chapters/fxvertex.html#fxvertex-input).

* 

`maxVertexInputAttributeOffset` is the maximum vertex input
attribute offset that **can** be added to the vertex input binding stride.
The `offset` member of the `VkVertexInputAttributeDescription`
structure **must** be less than or equal to this limit.
See [Vertex Input Description](../../../../spec/latest/chapters/fxvertex.html#fxvertex-input).

* 
 `maxVertexInputBindingStride`
is the maximum vertex input binding stride that **can** be specified in a
vertex input binding.
The `stride` member of the `VkVertexInputBindingDescription`
structure **must** be less than or equal to this limit.
See [Vertex Input Description](../../../../spec/latest/chapters/fxvertex.html#fxvertex-input).

* 
 `maxVertexOutputComponents` is
the maximum number of components of output variables which **can** be
output by a vertex shader.
See [Vertex Shaders](../../../../spec/latest/chapters/shaders.html#shaders-vertex).

* 

`maxTessellationGenerationLevel` is the maximum tessellation
generation level supported by the fixed-function tessellation primitive
generator.
See [Tessellation](../../../../spec/latest/chapters/tessellation.html#tessellation).

* 
 `maxTessellationPatchSize` is
the maximum patch size, in vertices, of patches that **can** be processed
by the tessellation control shader and tessellation primitive generator.
The `patchControlPoints` member of the
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html) structure specified at
pipeline creation time and the value provided in the `OutputVertices`
execution mode of shader modules **must** be less than or equal to this
limit.
See [Tessellation](../../../../spec/latest/chapters/tessellation.html#tessellation).

* 

`maxTessellationControlPerVertexInputComponents` is the maximum
number of components of input variables which **can** be provided as
per-vertex inputs to the tessellation control shader stage.

* 

`maxTessellationControlPerVertexOutputComponents` is the maximum
number of components of per-vertex output variables which **can** be output
from the tessellation control shader stage.

* 

`maxTessellationControlPerPatchOutputComponents` is the maximum
number of components of per-patch output variables which **can** be output
from the tessellation control shader stage.

* 

`maxTessellationControlTotalOutputComponents` is the maximum total
number of components of per-vertex and per-patch output variables which
**can** be output from the tessellation control shader stage.

* 

`maxTessellationEvaluationInputComponents` is the maximum number of
components of input variables which **can** be provided as per-vertex
inputs to the tessellation evaluation shader stage.

* 

`maxTessellationEvaluationOutputComponents` is the maximum number of
components of per-vertex output variables which **can** be output from the
tessellation evaluation shader stage.

* 

`maxGeometryShaderInvocations` is the maximum invocation count
supported for instanced geometry shaders.
The value provided in the `Invocations` execution mode of shader
modules **must** be less than or equal to this limit.
See [Geometry Shading](../../../../spec/latest/chapters/geometry.html#geometry).

* 
 `maxGeometryInputComponents`
is the maximum number of components of input variables which **can** be
provided as inputs to the geometry shader stage.

* 
 `maxGeometryOutputComponents`
is the maximum number of components of output variables which **can** be
output from the geometry shader stage.

* 
 `maxGeometryOutputVertices` is
the maximum number of vertices which **can** be emitted by any geometry
shader.

* 

`maxGeometryTotalOutputComponents` is the maximum total number of
components of output variables, across all emitted vertices, which **can**
be output from the geometry shader stage.

* 
 `maxFragmentInputComponents`
is the maximum number of components of input variables which **can** be
provided as inputs to the fragment shader stage.

* 

`maxFragmentOutputAttachments` is the maximum number of output
attachments which **can** be written to by the fragment shader stage.

* 

`maxFragmentDualSrcAttachments` is the maximum number of output
attachments which **can** be written to by the fragment shader stage when
blending is enabled and one of the dual source blend modes is in use.
See [Dual-Source Blending](../../../../spec/latest/chapters/framebuffer.html#framebuffer-dsb) and [    `dualSrcBlend`](../../../../spec/latest/chapters/features.html#features-dualSrcBlend).

* 

`maxFragmentCombinedOutputResources` is the total number of storage
buffers, storage images, and output `Location` decorated color
attachments (described in [Fragment Output    Interface](../../../../spec/latest/chapters/interfaces.html#interfaces-fragmentoutput)) which **can** be used in the fragment shader stage.

* 
 `maxComputeSharedMemorySize`
is the maximum total storage size, in bytes, available for variables
declared with the `Workgroup` storage class in shader modules (or
with the `shared` storage qualifier in GLSL) in the compute shader
stage.

* 
 `maxComputeWorkGroupCount`[3] is
the maximum number of local workgroups that **can** be dispatched by a
single dispatching command.
These three values represent the maximum number of local workgroups for
the X, Y, and Z dimensions, respectively.
The workgroup count parameters to the dispatching commands **must** be less
than or equal to the corresponding limit.
See [Dispatching Commands](../../../../spec/latest/chapters/dispatch.html#dispatch).

* 

    `maxComputeWorkGroupInvocations` is the maximum total number of
    compute shader invocations in a single local workgroup.
    The product of the X, Y, and Z sizes, as specified by the `LocalSize`
or `LocalSizeId`
    execution mode in shader modules or by the object decorated by the
    `WorkgroupSize` decoration, **must** be less than or equal to this
    limit.

* 
 `maxComputeWorkGroupSize`[3] is
    the maximum size of a local compute workgroup, per dimension.
    These three values represent the maximum local workgroup size in the X,
    Y, and Z dimensions, respectively.
    The `x`, `y`, and `z` sizes, as specified by the
    `LocalSize`
or `LocalSizeId`
    execution mode or by the object decorated by the `WorkgroupSize`
    decoration in shader modules, **must** be less than or equal to the
    corresponding limit.

* 
 `subPixelPrecisionBits` is the
number of bits of subpixel precision in framebuffer coordinates
xf and yf.
See [Rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast).

* 
 `subTexelPrecisionBits` is the
number of bits of precision in the division along an axis of an image
used for minification and magnification filters.
2`subTexelPrecisionBits` is the actual number of divisions
along each axis of the image represented.
Sub-texel values calculated during image sampling will snap to these
locations when generating the filtered results.

* 
 `mipmapPrecisionBits` is the number
of bits of division that the LOD calculation for mipmap fetching get
snapped to when determining the contribution from each mip level to the
mip filtered results.
2`mipmapPrecisionBits` is the actual number of divisions.

* 
 `maxDrawIndexedIndexValue` is
the maximum index value that **can** be used for indexed draw calls when
using 32-bit indices.
This excludes the primitive restart index value of 0xFFFFFFFF.
See [`fullDrawIndexUint32`](../../../../spec/latest/chapters/features.html#features-fullDrawIndexUint32).

* 
 `maxDrawIndirectCount` is the
maximum draw count that is supported for indirect drawing calls.
See [`multiDrawIndirect`](../../../../spec/latest/chapters/features.html#features-multiDrawIndirect).

* 
 `maxSamplerLodBias` is the maximum
absolute sampler LOD bias.
The sum of the `mipLodBias` member of the [VkSamplerCreateInfo](VkSamplerCreateInfo.html)
structure and the `Bias` operand of image sampling operations in
shader modules (or 0 if no `Bias` operand is provided to an image
sampling operation) are clamped to the range
[-`maxSamplerLodBias`,+`maxSamplerLodBias`].
See [samplers-mipLodBias](../../../../spec/latest/chapters/samplers.html#samplers-mipLodBias).

* 
 `maxSamplerAnisotropy` is the
maximum degree of sampler anisotropy.
The maximum degree of anisotropic filtering used for an image sampling
operation is the minimum of the `maxAnisotropy` member of the
[VkSamplerCreateInfo](VkSamplerCreateInfo.html) structure and this limit.
See [samplers-maxAnisotropy](../../../../spec/latest/chapters/samplers.html#samplers-maxAnisotropy).

* 
 `maxViewports` is the maximum number of
active viewports.
The `viewportCount` member of the
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) structure that is provided at
pipeline creation **must** be less than or equal to this limit.

* 
 `maxViewportDimensions`[2] are the
maximum viewport dimensions in the X (width) and Y (height) dimensions,
respectively.
The maximum viewport dimensions **must** be greater than or equal to the
largest image which **can** be created and used as a framebuffer
attachment.
See [Controlling the Viewport](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-viewport).

* 
 `viewportBoundsRange`[2] is the
[minimum, maximum] range that the corners of a viewport **must** be
contained in.
This range **must** be at least [-2 × `size`, 2 ×
`size` - 1], where `size` =
max(`maxViewportDimensions`[0], `maxViewportDimensions`[1]).
See [Controlling the Viewport](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-viewport).

|  | The wide range of values required for `viewportBoundsRange` allows the
| --- | --- |
viewport to be arbitrarily shifted relative to the output render target
while still partially overlapping.
However, the minimum range required to achieve this would actually be
[-`size` +  1, 2 × `size` - 1].
As these limits in implementations are typically simple power-of-two values,
the specification reflects this convention, rounding the lower bound
accordingly. |

* 
 `viewportSubPixelBits` is the number
of bits of subpixel precision for viewport bounds.
The subpixel precision that floating-point viewport bounds are
interpreted at is given by this limit.

* 
 `minMemoryMapAlignment` is the
minimum **required** alignment, in bytes, of host visible memory
allocations within the host address space.
When mapping a memory allocation with [vkMapMemory](vkMapMemory.html), subtracting
`offset` bytes from the returned pointer will always produce an
integer multiple of this limit.
See [Host Access to Device Memory Objects](../../../../spec/latest/chapters/memory.html#memory-device-hostaccess).
The value **must** be a power of two.

* 

`minTexelBufferOffsetAlignment` is the minimum **required** alignment,
in bytes, for the `offset` member of the
[VkBufferViewCreateInfo](VkBufferViewCreateInfo.html) structure for texel buffers.
The value **must** be a power of two.
This limit is equivalent to the maximum of the
[    `uniformTexelBufferOffsetAlignmentBytes`](../../../../spec/latest/chapters/devsandqueues.html#limits-uniformTexelBufferOffsetAlignmentBytes) and
[    `storageTexelBufferOffsetAlignmentBytes`](../../../../spec/latest/chapters/devsandqueues.html#limits-storageTexelBufferOffsetAlignmentBytes) members of
[VkPhysicalDeviceTexelBufferAlignmentProperties](VkPhysicalDeviceTexelBufferAlignmentProperties.html), but smaller
alignment is **optionally** allowed by
[    `storageTexelBufferOffsetSingleTexelAlignment`](../../../../spec/latest/chapters/devsandqueues.html#limits-storageTexelBufferOffsetSingleTexelAlignment) and
[    `uniformTexelBufferOffsetSingleTexelAlignment`](../../../../spec/latest/chapters/devsandqueues.html#limits-uniformTexelBufferOffsetSingleTexelAlignment).
For single texel alignment, a format has an alignment requirement which
is the size of a single component if the size of the format is a
multiple of three bytes, otherwise, it is the size of the format itself.
The effective alignment requirement is the minimum of the per-format
alignment and [    `uniformTexelBufferOffsetAlignmentBytes`](../../../../spec/latest/chapters/devsandqueues.html#limits-uniformTexelBufferOffsetAlignmentBytes) or
[    `storageTexelBufferOffsetAlignmentBytes`](../../../../spec/latest/chapters/devsandqueues.html#limits-storageTexelBufferOffsetAlignmentBytes) depending on the
descriptor type.
If the [`texelBufferAlignment`](../../../../spec/latest/chapters/features.html#features-texelBufferAlignment)
feature is not enabled, the effective alignment requirement for any
format is `minTexelBufferOffsetAlignment`.
[VkBufferViewCreateInfo](VkBufferViewCreateInfo.html)::`offset` **must** be a multiple of this
value.

* 

`minUniformBufferOffsetAlignment` is the minimum **required**
alignment, in bytes, for the `offset` member of the
`VkDescriptorBufferInfo` structure for uniform buffers.
When a descriptor of type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html) is updated, the
`offset` **must** be an integer multiple of this limit.
Similarly, dynamic offsets for uniform buffers **must** be multiples of
this limit.
The value **must** be a power of two.

* 

`minStorageBufferOffsetAlignment` is the minimum **required**
alignment, in bytes, for the `offset` member of the
`VkDescriptorBufferInfo` structure for storage buffers.
When a descriptor of type [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) is updated, the
`offset` **must** be an integer multiple of this limit.
Similarly, dynamic offsets for storage buffers **must** be multiples of
this limit.
The value **must** be a power of two.

* 
 `minTexelOffset` is the minimum offset
    value for the
`Offset` or
    `ConstOffset` image operand of any of the `OpImageSample*` or
    `OpImageFetch*` image instructions.

* 
 `maxTexelOffset` is the maximum offset
    value for the
`Offset` or
    `ConstOffset` image operand of any of the `OpImageSample*` or
    `OpImageFetch*` image instructions.

* 
 `minTexelGatherOffset` is the
minimum offset value for the `Offset`, `ConstOffset`, or
`ConstOffsets` image operands of any of the `OpImage*Gather` image
instructions.

* 
 `maxTexelGatherOffset` is the
maximum offset value for the `Offset`, `ConstOffset`, or
`ConstOffsets` image operands of any of the `OpImage*Gather` image
instructions.

* 
 `minInterpolationOffset` is the
base minimum (inclusive) negative offset value for the `Offset`
operand of the `InterpolateAtOffset` extended instruction.

* 
 `maxInterpolationOffset` is the
base maximum (inclusive) positive offset value for the `Offset`
operand of the `InterpolateAtOffset` extended instruction.

* 

`subPixelInterpolationOffsetBits` is the number of fractional bits
that the `x` and `y` offsets to the `InterpolateAtOffset`
extended instruction **may** be rounded to as fixed-point values.

* 
 `maxFramebufferWidth` is the maximum
width for a framebuffer.
The `width` member of the [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html) structure
**must** be less than or equal to this limit.

* 
 `maxFramebufferHeight` is the
maximum height for a framebuffer.
The `height` member of the [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html) structure
**must** be less than or equal to this limit.

* 
 `maxFramebufferLayers` is the
maximum layer count for a layered framebuffer.
The `layers` member of the [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html) structure
**must** be less than or equal to this limit.

* 

`framebufferColorSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the color sample counts that are
supported for all framebuffer color attachments with floating- or
fixed-point formats.
For color attachments with integer formats, see
[    `framebufferIntegerColorSampleCounts`](../../../../spec/latest/chapters/devsandqueues.html#limits-framebufferIntegerColorSampleCounts).

* 

`framebufferDepthSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the supported depth sample counts
for all framebuffer depth/stencil attachments, when the format includes
a depth component.

* 

`framebufferStencilSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the supported stencil sample
counts for all framebuffer depth/stencil attachments, when the format
includes a stencil component.

* 

`framebufferNoAttachmentsSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the supported sample counts for a
[subpass which uses no attachments](../../../../spec/latest/chapters/renderpass.html#renderpass-noattachments).

* 
 `maxColorAttachments` is the maximum
number of color attachments that **can** be used by a subpass in a render
pass.
The `colorAttachmentCount` member of the `VkSubpassDescription`
or `VkSubpassDescription2`
structure **must** be less than or equal to this limit.

* 

`sampledImageColorSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the sample counts supported for
all 2D images created with [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), the
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flag set, and a non-integer color
format.

* 

`sampledImageIntegerSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the sample counts supported for
all 2D images created with [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), the
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flag set, and an integer color
format.

* 

`sampledImageDepthSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the sample counts supported for
all 2D images created with [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), the
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flag set, and a depth format.

* 

`sampledImageStencilSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the sample counts supported for
all 2D images created with [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), the
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flag set, and a stencil format.

* 
 `storageImageSampleCounts` is a
bitmask1 of [VkSampleCountFlagBits](VkSampleCountFlagBits.html) indicating the sample counts
supported for all 2D images created with [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html),
and the [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html) usage flag set.

* 
 `maxSampleMaskWords` is the maximum
number of array elements of a variable decorated with the
`SampleMask` built-in decoration.

* 
 `timestampComputeAndGraphics`
specifies support for timestamps on all graphics and compute queues.
If this limit is [VK_TRUE](VK_TRUE.html), all queues that advertise the
[VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) or [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) in the
`VkQueueFamilyProperties`::`queueFlags` support
`VkQueueFamilyProperties`::`timestampValidBits` of at least 36.
See [Timestamp Queries](../../../../spec/latest/chapters/queries.html#queries-timestamps).

* 
 `timestampPeriod` is the number of
nanoseconds **required** for a timestamp query to be incremented by 1.
See [Timestamp Queries](../../../../spec/latest/chapters/queries.html#queries-timestamps).

* 
 `maxClipDistances` is the maximum number
of clip distances that **can** be used in a single shader stage.
The size of any array declared with the `ClipDistance` built-in
decoration in a shader module **must** be less than or equal to this limit.

* 
 `maxCullDistances` is the maximum number
of cull distances that **can** be used in a single shader stage.
The size of any array declared with the `CullDistance` built-in
decoration in a shader module **must** be less than or equal to this limit.

* 

`maxCombinedClipAndCullDistances` is the maximum combined number of
clip and cull distances that **can** be used in a single shader stage.
The sum of the sizes of all arrays declared with the `ClipDistance`
and `CullDistance` built-in decoration used by a single shader stage
in a shader module **must** be less than or equal to this limit.

* 
 `discreteQueuePriorities` is the
number of discrete priorities that **can** be assigned to a queue based on
the value of each member of
[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html)::`pQueuePriorities`.
This **must** be at least 2, and levels **must** be spread evenly over the
range, with at least one level at 1.0, and another at 0.0.
See [Queue Priority](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-priority).

* 
 `pointSizeRange`[2] is the range
[`minimum`,`maximum`] of supported sizes for points.
Values written to variables decorated with the `PointSize` built-in
decoration are clamped to this range.

* 
 `lineWidthRange`[2] is the range
[`minimum`,`maximum`] of supported widths for lines.
Values specified by the `lineWidth` member of the
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html) or the `lineWidth`
parameter to `vkCmdSetLineWidth` are clamped to this range.

* 
 `pointSizeGranularity` is the
granularity of supported point sizes.
Not all point sizes in the range defined by `pointSizeRange` are
supported.
This limit specifies the granularity (or increment) between successive
supported point sizes.

* 
 `lineWidthGranularity` is the
granularity of supported line widths.
Not all line widths in the range defined by `lineWidthRange` are
supported.
This limit specifies the granularity (or increment) between successive
supported line widths.

* 
 `strictLines` specifies whether lines are
rasterized according to the preferred method of rasterization.
If set to [VK_FALSE](VK_FALSE.html), lines **may** be rasterized under a relaxed set
of rules.
If set to [VK_TRUE](VK_TRUE.html), lines are rasterized as per the strict
definition.
See [Basic Line Segment Rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-basic).

* 
 `standardSampleLocations`
specifies whether rasterization uses the standard sample locations as
documented in [Multisampling](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling).
If set to [VK_TRUE](VK_TRUE.html), the implementation uses the documented sample
locations.
If set to [VK_FALSE](VK_FALSE.html), the implementation **may** use different sample
locations.

* 

`optimalBufferCopyOffsetAlignment` is the optimal buffer offset
alignment in bytes for
[vkCmdCopyBufferToImage2](vkCmdCopyBufferToImage2.html), [vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html),
[vkCmdCopyImageToBuffer2](vkCmdCopyImageToBuffer2.html), and [vkCmdCopyImageToBuffer](vkCmdCopyImageToBuffer.html).
This value is also the optimal host memory offset alignment in bytes for
[vkCopyMemoryToImage](vkCopyMemoryToImage.html) and [vkCopyImageToMemory](vkCopyImageToMemory.html).
The per texel alignment requirements are enforced, but applications
**should** use the optimal alignment for optimal performance and power use.
The value **must** be a power of two.

* 

`optimalBufferCopyRowPitchAlignment` is the optimal buffer row pitch
alignment in bytes for
[vkCmdCopyBufferToImage2](vkCmdCopyBufferToImage2.html), [vkCmdCopyBufferToImage](vkCmdCopyBufferToImage.html),
[vkCmdCopyImageToBuffer2](vkCmdCopyImageToBuffer2.html), and [vkCmdCopyImageToBuffer](vkCmdCopyImageToBuffer.html).
This value is also the optimal host memory row pitch alignment in bytes
for [vkCopyMemoryToImage](vkCopyMemoryToImage.html) and [vkCopyImageToMemory](vkCopyImageToMemory.html).
Row pitch is the number of bytes between texels with the same X
coordinate in adjacent rows (Y coordinates differ by one).
The per texel alignment requirements are enforced, but applications
**should** use the optimal alignment for optimal performance and power use.
The value **must** be a power of two.

* 
 `nonCoherentAtomSize` is the size and
alignment in bytes that bounds concurrent access to
[host-mapped device memory](../../../../spec/latest/chapters/memory.html#memory-device-hostaccess).
The value **must** be a power of two.

1

For all bitmasks of [VkSampleCountFlagBits](VkSampleCountFlagBits.html), the sample count limits
defined above represent the minimum supported sample counts for each
image type.
Individual images **may** support additional sample counts, which are
queried using [vkGetPhysicalDeviceImageFormatProperties](vkGetPhysicalDeviceImageFormatProperties.html) as
described in [Supported Sample    Counts](../../../../spec/latest/chapters/capabilities.html#features-supported-sample-counts).

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, `VkDeviceSize`, [VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html), [VkSampleCountFlags](VkSampleCountFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceLimits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
