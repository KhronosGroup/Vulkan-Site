# Limits

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/limits.html

## Table of Contents

- [Limit Requirements](#limits-minmax)
- [Additional Multisampling Capabilities](#limits-multisample)
- [Additional_Multisampling_Capabilities](#limits-multisample)
- [Milestone Limits](#milestone-limits)
- [Roadmap 2022](#milestone-limits-roadmap-2022)
- [Roadmap 2024](#milestone-limits-roadmap-2024)
- [Roadmap 2026](#milestone-limits-roadmap-2026)

## Content

*Limits* are implementation-dependent minimums, maximums, and other device
characteristics that an application **may** need to be aware of.

|  | Limits are reported via the basic [VkPhysicalDeviceLimits](#VkPhysicalDeviceLimits) structure as
| --- | --- |
well as the extensible structure `VkPhysicalDeviceProperties2`, which
was added in `[VK_KHR_get_physical_device_properties2](../appendices/extensions.html#VK_KHR_get_physical_device_properties2)` and included in
Vulkan 1.1.
When limits are added in future Vulkan versions or extensions, each
extension **should** introduce one new limit structure, if needed.
This structure **can** be added to the `pNext` chain of the
`VkPhysicalDeviceProperties2` structure. |

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
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties) structure which is returned from
[vkGetPhysicalDeviceProperties](devsandqueues.html#vkGetPhysicalDeviceProperties).

* 
 `maxImageDimension1D` is the largest
dimension (`width`) that is guaranteed to be supported for all
images created with an `imageType` of [VK_IMAGE_TYPE_1D](resources.html#VkImageType).
Some combinations of image parameters (format, usage, etc.) **may** allow
support for larger dimensions, which **can** be queried using
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties).

* 
 `maxImageDimension2D` is the largest
dimension (`width` or `height`) that is guaranteed to be
supported for all images created with an `imageType` of
[VK_IMAGE_TYPE_2D](resources.html#VkImageType) and without
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set in `flags`.
Some combinations of image parameters (format, usage, etc.) **may** allow
support for larger dimensions, which **can** be queried using
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties).

* 
 `maxImageDimension3D` is the largest
dimension (`width`, `height`, or `depth`) that is guaranteed
to be supported for all images created with an `imageType` of
[VK_IMAGE_TYPE_3D](resources.html#VkImageType).
Some combinations of image parameters (format, usage, etc.) **may** allow
support for larger dimensions, which **can** be queried using
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties).

* 
 `maxImageDimensionCube` is the
largest dimension (`width` or `height`) that is guaranteed to be
supported for all images created with an `imageType` of
[VK_IMAGE_TYPE_2D](resources.html#VkImageType) and with
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) set in `flags`.
Some combinations of image parameters (format, usage, etc.) **may** allow
support for larger dimensions, which **can** be queried using
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties).

* 
 `maxImageArrayLayers` is the maximum
number of layers (`arrayLayers`) for an image.

* 
 `maxTexelBufferElements` is the
maximum number of addressable texels for a buffer view created on a
buffer which was created with the
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) or
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set.

* 
 `maxUniformBufferRange` is the
maximum value that **can** be specified in the `range` member of a
[VkDescriptorBufferInfo](descriptorsets.html#VkDescriptorBufferInfo) structure passed to
[vkUpdateDescriptorSets](descriptorsets.html#vkUpdateDescriptorSets) for descriptors of type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType).

* 
 `maxStorageBufferRange` is the
maximum value that **can** be specified in the `range` member of a
[VkDescriptorBufferInfo](descriptorsets.html#VkDescriptorBufferInfo) structure passed to
[vkUpdateDescriptorSets](descriptorsets.html#vkUpdateDescriptorSets) for descriptors of type
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType).
If the [`shader64BitIndexing`](features.html#features-shader64BitIndexing)
feature is enabled, this limit does not apply.

* 
 `maxPushConstantsSize` is the
maximum size, in bytes, of the pool of push constant memory.
For each of the push constant ranges indicated by the
`pPushConstantRanges` member of the [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo)
structure, (`offset` +  `size`) **must** be less than or
equal to this limit.

* 
 `maxMemoryAllocationCount` is
the maximum number of device memory allocations, as created by
[vkAllocateMemory](memory.html#vkAllocateMemory), which **can** simultaneously exist.

* 
 `maxSamplerAllocationCount` is
the maximum number of sampler objects, as created by
[vkCreateSampler](samplers.html#vkCreateSampler), which **can** simultaneously exist on a device.
If the [`descriptorHeap`](features.html#features-descriptorHeap) feature is
enabled and the application intends to use embedded samplers, the number
advertised here is effectively reduced by the quotient of
[`minSamplerHeapReservedRangeWithEmbedded`](#limits-minSamplerHeapReservedRangeWithEmbedded)
divided by [`samplerDescriptorSize`](#limits-samplerDescriptorSize),
to provide storage for embedded samplers when switching to heaps.
If embedded samplers are not used, this can be ignored.

* 
 `bufferImageGranularity` is the
granularity, in bytes, at which buffer or linear image resources,
linear or optimal tensor resources,
and optimal image resources **can** be bound to adjacent offsets in the
same `VkDeviceMemory` object without aliasing.
See [Buffer-Image Granularity](resources.html#resources-bufferimagegranularity) for
more details.

* 
 `sparseAddressSpaceSize` is the
total amount of address space available, in bytes, for sparse memory
resources.
This is an upper bound on the sum of the sizes of all sparse resources,
regardless of whether any memory is bound to them.
If the [    `extendedSparseAddressSpace`](features.html#features-extendedSparseAddressSpace) feature is enabled, then the
difference between [    `extendedSparseAddressSpaceSize`](#limits-extendedSparseAddressSpaceSize) and `sparseAddressSpaceSize`
can also be used, by `VkImage` created with the `usage` member
of [VkImageCreateInfo](resources.html#VkImageCreateInfo) only containing bits in
[    `extendedSparseImageUsageFlags`](#limits-extendedSparseImageUsageFlags) and `VkBuffer` created with
the `usage` member of [VkBufferCreateInfo](resources.html#VkBufferCreateInfo) only containing bits
in [    `extendedSparseBufferUsageFlags`](#limits-extendedSparseBufferUsageFlags).

* 
 `maxBoundDescriptorSets` is the
maximum number of descriptor sets that **can** be simultaneously used by a
pipeline.
See [Descriptor Sets](descriptorsets.html#descriptors-sets).

* 

`maxPerStageDescriptorSamplers` is the maximum number of samplers
that **can** be accessible to a single shader stage in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_SAMPLER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
A descriptor is accessible to a shader stage when the `stageFlags`
member of the `VkDescriptorSetLayoutBinding` structure has the bit
for that shader stage set.
See [Sampler](descriptorsets.html#descriptors-sampler) and [Combined Image Sampler](descriptorsets.html#descriptors-combinedimagesampler).

* 

`maxPerStageDescriptorUniformBuffers` is the maximum number of
uniform buffers that **can** be accessible to a single shader stage in a
pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
A descriptor is accessible to a shader stage when the `stageFlags`
member of the `VkDescriptorSetLayoutBinding` structure has the bit
for that shader stage set.
See [Uniform Buffer](descriptorsets.html#descriptors-uniformbuffer) and
[Dynamic Uniform Buffer](descriptorsets.html#descriptors-uniformbufferdynamic).

* 

`maxPerStageDescriptorStorageBuffers` is the maximum number of
storage buffers that **can** be accessible to a single shader stage in a
pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
A descriptor is accessible to a pipeline shader stage when the
`stageFlags` member of the `VkDescriptorSetLayoutBinding`
structure has the bit for that shader stage set.
See [Storage Buffer](descriptorsets.html#descriptors-storagebuffer) and
[Dynamic Storage Buffer](descriptorsets.html#descriptors-storagebufferdynamic).

* 

`maxPerStageDescriptorSampledImages` is the maximum number of
sampled images that **can** be accessible to a single shader stage in a
pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
A descriptor is accessible to a pipeline shader stage when the
`stageFlags` member of the `VkDescriptorSetLayoutBinding`
structure has the bit for that shader stage set.
See [Combined Image Sampler](descriptorsets.html#descriptors-combinedimagesampler), [Sampled Image](descriptorsets.html#descriptors-sampledimage),
and [Uniform Texel Buffer](descriptorsets.html#descriptors-uniformtexelbuffer).

* 

`maxPerStageDescriptorStorageImages` is the maximum number of
storage images that **can** be accessible to a single shader stage in a
pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
A descriptor is accessible to a pipeline shader stage when the
`stageFlags` member of the `VkDescriptorSetLayoutBinding`
structure has the bit for that shader stage set.
See [Storage Image](descriptorsets.html#descriptors-storageimage), and
[Storage Texel Buffer](descriptorsets.html#descriptors-storagetexelbuffer).

* 

`maxPerStageDescriptorInputAttachments` is the maximum number of
input attachments that **can** be accessible to a single shader stage in a
pipeline layout, as well as the maximum usable input attachment index.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType)
count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
A descriptor is accessible to a pipeline shader stage when the
`stageFlags` member of the `VkDescriptorSetLayoutBinding`
structure has the bit for that shader stage set.
These are only supported for the fragment stage.
See [Input Attachment](descriptorsets.html#descriptors-inputattachment).

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
[VkRenderingInputAttachmentIndexInfo](interfaces.html#VkRenderingInputAttachmentIndexInfo) for dynamic rendering, or
splitting a subpass with too many input attachments into multiple subpasses. |

* 
 `maxPerStageResources` is the
maximum number of resources that **can** be accessible to a single shader
stage in a pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
For the fragment shader stage the framebuffer color attachments also
count against this limit.

* 
 `maxDescriptorSetSamplers` is
the maximum number of samplers that **can** be included in a pipeline
layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_SAMPLER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Sampler](descriptorsets.html#descriptors-sampler) and [Combined Image Sampler](descriptorsets.html#descriptors-combinedimagesampler).

* 

`maxDescriptorSetUniformBuffers` is the maximum number of uniform
buffers that **can** be included in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Uniform Buffer](descriptorsets.html#descriptors-uniformbuffer) and
[Dynamic Uniform Buffer](descriptorsets.html#descriptors-uniformbufferdynamic).

* 

`maxDescriptorSetUniformBuffersDynamic` is the maximum number of
dynamic uniform buffers that **can** be included in a pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Dynamic Uniform Buffer](descriptorsets.html#descriptors-uniformbufferdynamic).

* 

`maxDescriptorSetStorageBuffers` is the maximum number of storage
buffers that **can** be included in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Storage Buffer](descriptorsets.html#descriptors-storagebuffer) and
[Dynamic Storage Buffer](descriptorsets.html#descriptors-storagebufferdynamic).

* 

`maxDescriptorSetStorageBuffersDynamic` is the maximum number of
dynamic storage buffers that **can** be included in a pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Dynamic Storage Buffer](descriptorsets.html#descriptors-storagebufferdynamic).

* 

`maxDescriptorSetSampledImages` is the maximum number of sampled
images that **can** be included in a pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Combined Image Sampler](descriptorsets.html#descriptors-combinedimagesampler), [Sampled Image](descriptorsets.html#descriptors-sampledimage),
and [Uniform Texel Buffer](descriptorsets.html#descriptors-uniformtexelbuffer).

* 

`maxDescriptorSetStorageImages` is the maximum number of storage
images that **can** be included in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Storage Image](descriptorsets.html#descriptors-storageimage), and
[Storage Texel Buffer](descriptorsets.html#descriptors-storagetexelbuffer).

* 

`maxDescriptorSetInputAttachments` is the maximum number of input
attachments that **can** be included in a pipeline layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType)
count against this limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Input Attachment](descriptorsets.html#descriptors-inputattachment).

* 
 `maxVertexInputAttributes` is
the maximum number of vertex input attributes that **can** be specified for
a graphics pipeline.
These are described in the array of
`VkVertexInputAttributeDescription` structures that are provided at
graphics pipeline creation time via the
`pVertexAttributeDescriptions` member of the
[VkPipelineVertexInputStateCreateInfo](fxvertex.html#VkPipelineVertexInputStateCreateInfo) structure.
See [Vertex Attributes](fxvertex.html#fxvertex-attrib) and [Vertex Input Description](fxvertex.html#fxvertex-input).

* 
 `maxVertexInputBindings` is the
maximum number of vertex buffers that **can** be specified for providing
vertex attributes to a graphics pipeline.
These are described in the array of
`VkVertexInputBindingDescription` structures that are provided at
graphics pipeline creation time via the `pVertexBindingDescriptions`
member of the [VkPipelineVertexInputStateCreateInfo](fxvertex.html#VkPipelineVertexInputStateCreateInfo) structure.
The `binding` member of `VkVertexInputBindingDescription` **must**
be less than this limit.
See [Vertex Input Description](fxvertex.html#fxvertex-input).

* 

`maxVertexInputAttributeOffset` is the maximum vertex input
attribute offset that **can** be added to the vertex input binding stride.
The `offset` member of the `VkVertexInputAttributeDescription`
structure **must** be less than or equal to this limit.
See [Vertex Input Description](fxvertex.html#fxvertex-input).

* 
 `maxVertexInputBindingStride`
is the maximum vertex input binding stride that **can** be specified in a
vertex input binding.
The `stride` member of the `VkVertexInputBindingDescription`
structure **must** be less than or equal to this limit.
See [Vertex Input Description](fxvertex.html#fxvertex-input).

* 
 `maxVertexOutputComponents` is
the maximum number of components of output variables which **can** be
output by a vertex shader.
See [Vertex Shaders](shaders.html#shaders-vertex).

* 

`maxTessellationGenerationLevel` is the maximum tessellation
generation level supported by the fixed-function tessellation primitive
generator.
See [Tessellation](tessellation.html#tessellation).

* 
 `maxTessellationPatchSize` is
the maximum patch size, in vertices, of patches that **can** be processed
by the tessellation control shader and tessellation primitive generator.
The `patchControlPoints` member of the
[VkPipelineTessellationStateCreateInfo](tessellation.html#VkPipelineTessellationStateCreateInfo) structure specified at
pipeline creation time and the value provided in the `OutputVertices`
execution mode of shader modules **must** be less than or equal to this
limit.
See [Tessellation](tessellation.html#tessellation).

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
See [Geometry Shading](geometry.html#geometry).

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
See [Dual-Source Blending](framebuffer.html#framebuffer-dsb) and [    `dualSrcBlend`](features.html#features-dualSrcBlend).

* 

`maxFragmentCombinedOutputResources` is the total number of storage
buffers, storage images, and output `Location` decorated color
attachments (described in [Fragment Output    Interface](interfaces.html#interfaces-fragmentoutput)) which **can** be used in the fragment shader stage.

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
See [Dispatching Commands](dispatch.html#dispatch).

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
See [Rasterization](primsrast.html#primsrast).

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
See [`fullDrawIndexUint32`](features.html#features-fullDrawIndexUint32).

* 
 `maxDrawIndirectCount` is the
maximum draw count that is supported for indirect drawing calls.
See [`multiDrawIndirect`](features.html#features-multiDrawIndirect).

* 
 `maxSamplerLodBias` is the maximum
absolute sampler LOD bias.
The sum of the `mipLodBias` member of the [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)
structure and the `Bias` operand of image sampling operations in
shader modules (or 0 if no `Bias` operand is provided to an image
sampling operation) are clamped to the range
[-`maxSamplerLodBias`,+`maxSamplerLodBias`].
See [samplers-mipLodBias](samplers.html#samplers-mipLodBias).

* 
 `maxSamplerAnisotropy` is the
maximum degree of sampler anisotropy.
The maximum degree of anisotropic filtering used for an image sampling
operation is the minimum of the `maxAnisotropy` member of the
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) structure and this limit.
See [samplers-maxAnisotropy](samplers.html#samplers-maxAnisotropy).

* 
 `maxViewports` is the maximum number of
active viewports.
The `viewportCount` member of the
[VkPipelineViewportStateCreateInfo](vertexpostproc.html#VkPipelineViewportStateCreateInfo) structure that is provided at
pipeline creation **must** be less than or equal to this limit.

* 
 `maxViewportDimensions`[2] are the
maximum viewport dimensions in the X (width) and Y (height) dimensions,
respectively.
The maximum viewport dimensions **must** be greater than or equal to the
largest image which **can** be created and used as a framebuffer
attachment.
See [Controlling the Viewport](vertexpostproc.html#vertexpostproc-viewport).

* 
 `viewportBoundsRange`[2] is the
[minimum, maximum] range that the corners of a viewport **must** be
contained in.
This range **must** be at least [-2 × `size`, 2 ×
`size` - 1], where `size` =
max(`maxViewportDimensions`[0], `maxViewportDimensions`[1]).
See [Controlling the Viewport](vertexpostproc.html#vertexpostproc-viewport).

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
When mapping a memory allocation with [vkMapMemory](memory.html#vkMapMemory), subtracting
`offset` bytes from the returned pointer will always produce an
integer multiple of this limit.
See [Host Access to Device Memory Objects](memory.html#memory-device-hostaccess).
The value **must** be a power of two.

* 

`minTexelBufferOffsetAlignment` is the minimum **required** alignment,
in bytes, for the `offset` member of the
[VkBufferViewCreateInfo](resources.html#VkBufferViewCreateInfo) structure for texel buffers.
The value **must** be a power of two.
This limit is equivalent to the maximum of the
[    `uniformTexelBufferOffsetAlignmentBytes`](devsandqueues.html#limits-uniformTexelBufferOffsetAlignmentBytes) and
[    `storageTexelBufferOffsetAlignmentBytes`](devsandqueues.html#limits-storageTexelBufferOffsetAlignmentBytes) members of
[VkPhysicalDeviceTexelBufferAlignmentProperties](#VkPhysicalDeviceTexelBufferAlignmentProperties), but smaller
alignment is **optionally** allowed by
[    `storageTexelBufferOffsetSingleTexelAlignment`](devsandqueues.html#limits-storageTexelBufferOffsetSingleTexelAlignment) and
[    `uniformTexelBufferOffsetSingleTexelAlignment`](devsandqueues.html#limits-uniformTexelBufferOffsetSingleTexelAlignment).
For single texel alignment, a format has an alignment requirement which
is the size of a single component if the size of the format is a
multiple of three bytes, otherwise, it is the size of the format itself.
The effective alignment requirement is the minimum of the per-format
alignment and [    `uniformTexelBufferOffsetAlignmentBytes`](devsandqueues.html#limits-uniformTexelBufferOffsetAlignmentBytes) or
[    `storageTexelBufferOffsetAlignmentBytes`](devsandqueues.html#limits-storageTexelBufferOffsetAlignmentBytes) depending on the
descriptor type.
If the [`texelBufferAlignment`](features.html#features-texelBufferAlignment)
feature is not enabled, the effective alignment requirement for any
format is `minTexelBufferOffsetAlignment`.
[VkBufferViewCreateInfo](resources.html#VkBufferViewCreateInfo)::`offset` **must** be a multiple of this
value.

* 

`minUniformBufferOffsetAlignment` is the minimum **required**
alignment, in bytes, for the `offset` member of the
`VkDescriptorBufferInfo` structure for uniform buffers.
When a descriptor of type [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) is updated, the
`offset` **must** be an integer multiple of this limit.
Similarly, dynamic offsets for uniform buffers **must** be multiples of
this limit.
The value **must** be a power of two.

* 

`minStorageBufferOffsetAlignment` is the minimum **required**
alignment, in bytes, for the `offset` member of the
`VkDescriptorBufferInfo` structure for storage buffers.
When a descriptor of type [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) is updated, the
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
The `width` member of the [VkFramebufferCreateInfo](renderpass.html#VkFramebufferCreateInfo) structure
**must** be less than or equal to this limit.

* 
 `maxFramebufferHeight` is the
maximum height for a framebuffer.
The `height` member of the [VkFramebufferCreateInfo](renderpass.html#VkFramebufferCreateInfo) structure
**must** be less than or equal to this limit.

* 
 `maxFramebufferLayers` is the
maximum layer count for a layered framebuffer.
The `layers` member of the [VkFramebufferCreateInfo](renderpass.html#VkFramebufferCreateInfo) structure
**must** be less than or equal to this limit.

* 

`framebufferColorSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the color sample counts that are
supported for all framebuffer color attachments with floating- or
fixed-point formats.
For color attachments with integer formats, see
[    `framebufferIntegerColorSampleCounts`](devsandqueues.html#limits-framebufferIntegerColorSampleCounts).

* 

`framebufferDepthSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the supported depth sample counts
for all framebuffer depth/stencil attachments, when the format includes
a depth component.

* 

`framebufferStencilSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the supported stencil sample
counts for all framebuffer depth/stencil attachments, when the format
includes a stencil component.

* 

`framebufferNoAttachmentsSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the supported sample counts for a
[subpass which uses no attachments](renderpass.html#renderpass-noattachments).

* 
 `maxColorAttachments` is the maximum
number of color attachments that **can** be used by a subpass in a render
pass.
The `colorAttachmentCount` member of the `VkSubpassDescription`
or `VkSubpassDescription2`
structure **must** be less than or equal to this limit.

* 

`sampledImageColorSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the sample counts supported for
all 2D images created with [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling), the
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flag set, and a non-integer color
format.

* 

`sampledImageIntegerSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the sample counts supported for
all 2D images created with [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling), the
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flag set, and an integer color
format.

* 

`sampledImageDepthSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the sample counts supported for
all 2D images created with [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling), the
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flag set, and a depth format.

* 

`sampledImageStencilSampleCounts` is a bitmask1 of
[VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the sample counts supported for
all 2D images created with [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling), the
[VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flag set, and a stencil format.

* 
 `storageImageSampleCounts` is a
bitmask1 of [VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the sample counts
supported for all 2D images created with [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling),
and the [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits) usage flag set.

* 
 `maxSampleMaskWords` is the maximum
number of array elements of a variable decorated with the
`SampleMask` built-in decoration.

* 
 `timestampComputeAndGraphics`
specifies support for timestamps on all graphics and compute queues.
If this limit is [VK_TRUE](fundamentals.html#VK_TRUE), all queues that advertise the
[VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) in the
`VkQueueFamilyProperties`::`queueFlags` support
`VkQueueFamilyProperties`::`timestampValidBits` of at least 36.
See [Timestamp Queries](queries.html#queries-timestamps).

* 
 `timestampPeriod` is the number of
nanoseconds **required** for a timestamp query to be incremented by 1.
See [Timestamp Queries](queries.html#queries-timestamps).

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
[VkDeviceQueueCreateInfo](devsandqueues.html#VkDeviceQueueCreateInfo)::`pQueuePriorities`.
This **must** be at least 2, and levels **must** be spread evenly over the
range, with at least one level at 1.0, and another at 0.0.
See [Queue Priority](devsandqueues.html#devsandqueues-priority).

* 
 `pointSizeRange`[2] is the range
[`minimum`,`maximum`] of supported sizes for points.
Values written to variables decorated with the `PointSize` built-in
decoration are clamped to this range.

* 
 `lineWidthRange`[2] is the range
[`minimum`,`maximum`] of supported widths for lines.
Values specified by the `lineWidth` member of the
[VkPipelineRasterizationStateCreateInfo](primsrast.html#VkPipelineRasterizationStateCreateInfo) or the `lineWidth`
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
If set to [VK_FALSE](fundamentals.html#VK_FALSE), lines **may** be rasterized under a relaxed set
of rules.
If set to [VK_TRUE](fundamentals.html#VK_TRUE), lines are rasterized as per the strict
definition.
See [Basic Line Segment Rasterization](primsrast.html#primsrast-lines-basic).

* 
 `standardSampleLocations`
specifies whether rasterization uses the standard sample locations as
documented in [Multisampling](primsrast.html#primsrast-multisampling).
If set to [VK_TRUE](fundamentals.html#VK_TRUE), the implementation uses the documented sample
locations.
If set to [VK_FALSE](fundamentals.html#VK_FALSE), the implementation **may** use different sample
locations.

* 

`optimalBufferCopyOffsetAlignment` is the optimal buffer offset
alignment in bytes for
[vkCmdCopyBufferToImage2](copies.html#vkCmdCopyBufferToImage2), [vkCmdCopyBufferToImage](copies.html#vkCmdCopyBufferToImage),
[vkCmdCopyImageToBuffer2](copies.html#vkCmdCopyImageToBuffer2), and [vkCmdCopyImageToBuffer](copies.html#vkCmdCopyImageToBuffer).
This value is also the optimal host memory offset alignment in bytes for
[vkCopyMemoryToImage](copies.html#vkCopyMemoryToImage) and [vkCopyImageToMemory](copies.html#vkCopyImageToMemory).
The per texel alignment requirements are enforced, but applications
**should** use the optimal alignment for optimal performance and power use.
The value **must** be a power of two.

* 

`optimalBufferCopyRowPitchAlignment` is the optimal buffer row pitch
alignment in bytes for
[vkCmdCopyBufferToImage2](copies.html#vkCmdCopyBufferToImage2), [vkCmdCopyBufferToImage](copies.html#vkCmdCopyBufferToImage),
[vkCmdCopyImageToBuffer2](copies.html#vkCmdCopyImageToBuffer2), and [vkCmdCopyImageToBuffer](copies.html#vkCmdCopyImageToBuffer).
This value is also the optimal host memory row pitch alignment in bytes
for [vkCopyMemoryToImage](copies.html#vkCopyMemoryToImage) and [vkCopyImageToMemory](copies.html#vkCopyImageToMemory).
Row pitch is the number of bytes between texels with the same X
coordinate in adjacent rows (Y coordinates differ by one).
The per texel alignment requirements are enforced, but applications
**should** use the optimal alignment for optimal performance and power use.
The value **must** be a power of two.

* 
 `nonCoherentAtomSize` is the size and
alignment in bytes that bounds concurrent access to
[host-mapped device memory](memory.html#memory-device-hostaccess).
The value **must** be a power of two.

1

For all bitmasks of [VkSampleCountFlagBits](#VkSampleCountFlagBits), the sample count limits
defined above represent the minimum supported sample counts for each
image type.
Individual images **may** support additional sample counts, which are
queried using [vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties) as
described in [Supported Sample    Counts](capabilities.html#features-supported-sample-counts).

Bits which **may** be set in the sample count limits returned by
[VkPhysicalDeviceLimits](#VkPhysicalDeviceLimits), as well as in other queries and structures
representing image sample counts, are:

// Provided by VK_VERSION_1_0
typedef enum VkSampleCountFlagBits {
    VK_SAMPLE_COUNT_1_BIT = 0x00000001,
    VK_SAMPLE_COUNT_2_BIT = 0x00000002,
    VK_SAMPLE_COUNT_4_BIT = 0x00000004,
    VK_SAMPLE_COUNT_8_BIT = 0x00000008,
    VK_SAMPLE_COUNT_16_BIT = 0x00000010,
    VK_SAMPLE_COUNT_32_BIT = 0x00000020,
    VK_SAMPLE_COUNT_64_BIT = 0x00000040,
} VkSampleCountFlagBits;

* 
[VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) specifies an image with one sample per
pixel.

* 
[VK_SAMPLE_COUNT_2_BIT](#VkSampleCountFlagBits) specifies an image with 2 samples per pixel.

* 
[VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits) specifies an image with 4 samples per pixel.

* 
[VK_SAMPLE_COUNT_8_BIT](#VkSampleCountFlagBits) specifies an image with 8 samples per pixel.

* 
[VK_SAMPLE_COUNT_16_BIT](#VkSampleCountFlagBits) specifies an image with 16 samples per
pixel.

* 
[VK_SAMPLE_COUNT_32_BIT](#VkSampleCountFlagBits) specifies an image with 32 samples per
pixel.

* 
[VK_SAMPLE_COUNT_64_BIT](#VkSampleCountFlagBits) specifies an image with 64 samples per
pixel.

// Provided by VK_VERSION_1_0
typedef VkFlags VkSampleCountFlags;

`VkSampleCountFlags` is a bitmask type for setting a mask of zero or
more [VkSampleCountFlagBits](#VkSampleCountFlagBits).

The `VkPhysicalDevicePushDescriptorProperties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDevicePushDescriptorProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxPushDescriptors;
} VkPhysicalDevicePushDescriptorProperties;

// Provided by VK_KHR_push_descriptor
// Equivalent to VkPhysicalDevicePushDescriptorProperties
typedef VkPhysicalDevicePushDescriptorProperties VkPhysicalDevicePushDescriptorPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxPushDescriptors` is
the maximum number of descriptors that **can** be used in a descriptor set
layout created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) set.

If the `VkPhysicalDevicePushDescriptorProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePushDescriptorProperties-sType-sType) VUID-VkPhysicalDevicePushDescriptorProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_DESCRIPTOR_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMultiviewProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceMultiviewProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxMultiviewViewCount;
    uint32_t           maxMultiviewInstanceIndex;
} VkPhysicalDeviceMultiviewProperties;

// Provided by VK_KHR_multiview
// Equivalent to VkPhysicalDeviceMultiviewProperties
typedef VkPhysicalDeviceMultiviewProperties VkPhysicalDeviceMultiviewPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxMultiviewViewCount` is one greater than the maximum view index
that **can** be used in a subpass.

* 

`maxMultiviewInstanceIndex` is the maximum valid value of instance
index allowed to be generated by a drawing command recorded within a
subpass of a multiview render pass instance.

If the `VkPhysicalDeviceMultiviewProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiviewProperties-sType-sType) VUID-VkPhysicalDeviceMultiviewProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceFloatControlsProperties` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceFloatControlsProperties {
    VkStructureType                      sType;
    void*                                pNext;
    VkShaderFloatControlsIndependence    denormBehaviorIndependence;
    VkShaderFloatControlsIndependence    roundingModeIndependence;
    VkBool32                             shaderSignedZeroInfNanPreserveFloat16;
    VkBool32                             shaderSignedZeroInfNanPreserveFloat32;
    VkBool32                             shaderSignedZeroInfNanPreserveFloat64;
    VkBool32                             shaderDenormPreserveFloat16;
    VkBool32                             shaderDenormPreserveFloat32;
    VkBool32                             shaderDenormPreserveFloat64;
    VkBool32                             shaderDenormFlushToZeroFloat16;
    VkBool32                             shaderDenormFlushToZeroFloat32;
    VkBool32                             shaderDenormFlushToZeroFloat64;
    VkBool32                             shaderRoundingModeRTEFloat16;
    VkBool32                             shaderRoundingModeRTEFloat32;
    VkBool32                             shaderRoundingModeRTEFloat64;
    VkBool32                             shaderRoundingModeRTZFloat16;
    VkBool32                             shaderRoundingModeRTZFloat32;
    VkBool32                             shaderRoundingModeRTZFloat64;
} VkPhysicalDeviceFloatControlsProperties;

// Provided by VK_KHR_shader_float_controls
// Equivalent to VkPhysicalDeviceFloatControlsProperties
typedef VkPhysicalDeviceFloatControlsProperties VkPhysicalDeviceFloatControlsPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`denormBehaviorIndependence` is a
[VkShaderFloatControlsIndependence](#VkShaderFloatControlsIndependence) value indicating whether, and
how, denorm behavior can be set independently for different bit widths.

* 

`roundingModeIndependence` is a
[VkShaderFloatControlsIndependence](#VkShaderFloatControlsIndependence) value indicating whether, and
how, rounding modes can be set independently for different bit widths.

* 

`shaderSignedZeroInfNanPreserveFloat16` is a boolean value
indicating whether sign of a zero, Nans and
   **can** be preserved in 16-bit floating-point
computations.
It also indicates whether the `SignedZeroInfNanPreserve` execution
mode **can** be used for 16-bit floating-point types.

* 

`shaderSignedZeroInfNanPreserveFloat32` is a boolean value
indicating whether sign of a zero, Nans and
   **can** be preserved in 32-bit floating-point
computations.
It also indicates whether the `SignedZeroInfNanPreserve` execution
mode **can** be used for 32-bit floating-point types.

* 

`shaderSignedZeroInfNanPreserveFloat64` is a boolean value
indicating whether sign of a zero, Nans and
   **can** be preserved in 64-bit floating-point
computations.
It also indicates whether the `SignedZeroInfNanPreserve` execution
mode **can** be used for 64-bit floating-point types.

* 

`shaderDenormPreserveFloat16` is a boolean value indicating whether
denormals **can** be preserved in 16-bit floating-point computations.
It also indicates whether the `DenormPreserve` execution mode **can** be
used for 16-bit floating-point types.

* 

`shaderDenormPreserveFloat32` is a boolean value indicating whether
denormals **can** be preserved in 32-bit floating-point computations.
It also indicates whether the `DenormPreserve` execution mode **can** be
used for 32-bit floating-point types.

* 

`shaderDenormPreserveFloat64` is a boolean value indicating whether
denormals **can** be preserved in 64-bit floating-point computations.
It also indicates whether the `DenormPreserve` execution mode **can** be
used for 64-bit floating-point types.

* 

`shaderDenormFlushToZeroFloat16` is a boolean value indicating
whether denormals **can** be flushed to zero in 16-bit floating-point
computations.
It also indicates whether the `DenormFlushToZero` execution mode **can**
be used for 16-bit floating-point types.

* 

`shaderDenormFlushToZeroFloat32` is a boolean value indicating
whether denormals **can** be flushed to zero in 32-bit floating-point
computations.
It also indicates whether the `DenormFlushToZero` execution mode **can**
be used for 32-bit floating-point types.

* 

`shaderDenormFlushToZeroFloat64` is a boolean value indicating
whether denormals **can** be flushed to zero in 64-bit floating-point
computations.
It also indicates whether the `DenormFlushToZero` execution mode **can**
be used for 64-bit floating-point types.

* 

`shaderRoundingModeRTEFloat16` is a boolean value indicating whether
an implementation supports the round-to-nearest-even rounding mode for
16-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTE` execution mode **can**
be used for 16-bit floating-point types.

* 

`shaderRoundingModeRTEFloat32` is a boolean value indicating whether
an implementation supports the round-to-nearest-even rounding mode for
32-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTE` execution mode **can**
be used for 32-bit floating-point types.

* 

`shaderRoundingModeRTEFloat64` is a boolean value indicating whether
an implementation supports the round-to-nearest-even rounding mode for
64-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTE` execution mode **can**
be used for 64-bit floating-point types.

* 

`shaderRoundingModeRTZFloat16` is a boolean value indicating whether
an implementation supports the round-towards-zero rounding mode for
16-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTZ` execution mode **can**
be used for 16-bit floating-point types.

* 

`shaderRoundingModeRTZFloat32` is a boolean value indicating whether
an implementation supports the round-towards-zero rounding mode for
32-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTZ` execution mode **can**
be used for 32-bit floating-point types.

* 

`shaderRoundingModeRTZFloat64` is a boolean value indicating whether
an implementation supports the round-towards-zero rounding mode for
64-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTZ` execution mode **can**
be used for 64-bit floating-point types.

If the `VkPhysicalDeviceFloatControlsProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFloatControlsProperties-sType-sType) VUID-VkPhysicalDeviceFloatControlsProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT_CONTROLS_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

Values which **may** be returned in the `denormBehaviorIndependence` and
`roundingModeIndependence` fields of
`VkPhysicalDeviceFloatControlsProperties` are:

// Provided by VK_VERSION_1_2
typedef enum VkShaderFloatControlsIndependence {
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY = 0,
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_ALL = 1,
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE = 2,
  // Provided by VK_KHR_shader_float_controls
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY_KHR = VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY,
  // Provided by VK_KHR_shader_float_controls
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_ALL_KHR = VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_ALL,
  // Provided by VK_KHR_shader_float_controls
    VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE_KHR = VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE,
} VkShaderFloatControlsIndependence;

// Provided by VK_KHR_shader_float_controls
// Equivalent to VkShaderFloatControlsIndependence
typedef VkShaderFloatControlsIndependence VkShaderFloatControlsIndependenceKHR;

* 
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_32_BIT_ONLY](#VkShaderFloatControlsIndependenceKHR) specifies that
shader float controls for 32-bit floating-point **can** be set
independently; other bit widths **must** be set identically to each other.

* 
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_ALL](#VkShaderFloatControlsIndependenceKHR) specifies that shader
float controls for all bit widths **can** be set independently.

* 
[VK_SHADER_FLOAT_CONTROLS_INDEPENDENCE_NONE](#VkShaderFloatControlsIndependenceKHR) specifies that shader
float controls for all bit widths **must** be set identically.

The `VkPhysicalDeviceDiscardRectanglePropertiesEXT` structure is defined
as:

// Provided by VK_EXT_discard_rectangles
typedef struct VkPhysicalDeviceDiscardRectanglePropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxDiscardRectangles;
} VkPhysicalDeviceDiscardRectanglePropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxDiscardRectangles` is the
maximum number of active discard rectangles that **can** be specified.

If the `VkPhysicalDeviceDiscardRectanglePropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDiscardRectanglePropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDiscardRectanglePropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DISCARD_RECTANGLE_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceSampleLocationsPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_sample_locations
typedef struct VkPhysicalDeviceSampleLocationsPropertiesEXT {
    VkStructureType       sType;
    void*                 pNext;
    VkSampleCountFlags    sampleLocationSampleCounts;
    VkExtent2D            maxSampleLocationGridSize;
    float                 sampleLocationCoordinateRange[2];
    uint32_t              sampleLocationSubPixelBits;
    VkBool32              variableSampleLocations;
} VkPhysicalDeviceSampleLocationsPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `sampleLocationSampleCounts`
is a bitmask of [VkSampleCountFlagBits](#VkSampleCountFlagBits) indicating the sample counts
supporting custom sample locations.

* 
 `maxSampleLocationGridSize` is
the maximum size of the pixel grid in which sample locations **can** vary
that is supported for all sample counts in
`sampleLocationSampleCounts`.

* 

`sampleLocationCoordinateRange`[2] is the range of supported sample
location coordinates.

* 
 `sampleLocationSubPixelBits`
is the number of bits of subpixel precision for sample locations.

* 
 `variableSampleLocations`
specifies whether the sample locations used by all pipelines that will
be bound to a command buffer during a subpass **must** match.
If set to [VK_TRUE](fundamentals.html#VK_TRUE), the implementation supports variable sample
locations in a subpass.
If set to [VK_FALSE](fundamentals.html#VK_FALSE), then the sample locations **must** stay constant
in each subpass.

If the `VkPhysicalDeviceSampleLocationsPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSampleLocationsPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceSampleLocationsPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLE_LOCATIONS_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_legacy_vertex_attributes
typedef struct VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           nativeUnalignedPerformance;
} VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `nativeUnalignedPerformance`
specifies whether unaligned vertex fetches do not incur significant
performance penalties as compared to aligned fetches.

If the `VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](features.html#VkPhysicalDeviceFeatures2) structure passed to
[vkGetPhysicalDeviceFeatures2](features.html#vkGetPhysicalDeviceFeatures2), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](devsandqueues.html#VkDevice) with any features
described by `VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](fundamentals.html#VK_TRUE), to the `pNext`
chain of [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) when creating the [VkDevice](devsandqueues.html#VkDevice).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LEGACY_VERTEX_ATTRIBUTES_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceExternalMemoryHostPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_external_memory_host
typedef struct VkPhysicalDeviceExternalMemoryHostPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       minImportedHostPointerAlignment;
} VkPhysicalDeviceExternalMemoryHostPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`minImportedHostPointerAlignment` is the minimum **required**
alignment, in bytes, for the base address and size of host pointers that
**can** be imported to a Vulkan memory object.
The value **must** be a power of two.

If the `VkPhysicalDeviceExternalMemoryHostPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalMemoryHostPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceExternalMemoryHostPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_HOST_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX` structure
is defined as:

// Provided by VK_NVX_multiview_per_view_attributes
typedef struct VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           perViewPositionAllComponents;
} VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`perViewPositionAllComponents` is [VK_TRUE](fundamentals.html#VK_TRUE) if the
implementation supports per-view position values that differ in
components other than the X component.

If the `VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX-sType-sType) VUID-VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_ATTRIBUTES_PROPERTIES_NVX](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDevicePointClippingProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDevicePointClippingProperties {
    VkStructureType            sType;
    void*                      pNext;
    VkPointClippingBehavior    pointClippingBehavior;
} VkPhysicalDevicePointClippingProperties;

// Provided by VK_KHR_maintenance2
// Equivalent to VkPhysicalDevicePointClippingProperties
typedef VkPhysicalDevicePointClippingProperties VkPhysicalDevicePointClippingPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `pointClippingBehavior` is a
[VkPointClippingBehavior](vertexpostproc.html#VkPointClippingBehavior) value specifying the point clipping
behavior supported by the implementation.

If the `VkPhysicalDevicePointClippingProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePointClippingProperties-sType-sType) VUID-VkPhysicalDevicePointClippingProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_POINT_CLIPPING_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceSubgroupProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceSubgroupProperties {
    VkStructureType           sType;
    void*                     pNext;
    uint32_t                  subgroupSize;
    VkShaderStageFlags        supportedStages;
    VkSubgroupFeatureFlags    supportedOperations;
    VkBool32                  quadOperationsInAllStages;
} VkPhysicalDeviceSubgroupProperties;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `subgroupSize` is the default
number of invocations in each subgroup.
`subgroupSize` is at least 1 if any of the physical device’s queues
support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).
`subgroupSize` is a power-of-two.

* 

`supportedStages` is a bitfield of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits)
describing the shader stages that [group    operations](shaders.html#shaders-group-operations) with [subgroup scope](shaders.html#shaders-scope-subgroup) are
supported in.
`supportedStages` will have the [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)
bit set if any of the physical device’s queues support
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).

* 

`supportedOperations` is a bitmask of
[VkSubgroupFeatureFlagBits](#VkSubgroupFeatureFlagBits) specifying the sets of
[group operations](shaders.html#shaders-group-operations) with
[subgroup scope](shaders.html#shaders-scope-subgroup) supported on this device.
`supportedOperations` will have the
[VK_SUBGROUP_FEATURE_BASIC_BIT](#VkSubgroupFeatureFlagBits) bit set if any of the physical
device’s queues support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).

* 

`quadOperationsInAllStages` is a boolean specifying whether
[quad group operations](shaders.html#shaders-quad-operations) are available in all
stages, or are restricted to fragment and compute stages.

If the `VkPhysicalDeviceSubgroupProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

If `supportedOperations` includes [](#features-subgroup-quad)[VK_SUBGROUP_FEATURE_QUAD_BIT](#VkSubgroupFeatureFlagBits),
or the [`shaderSubgroupUniformControlFlow`](features.html#features-shaderSubgroupUniformControlFlow) feature is enabled,
`subgroupSize` **must** be greater than or equal to 4.

If the [`shaderQuadControl`](features.html#features-shaderQuadControl) feature is
supported, `supportedOperations` **must** include [](#features-subgroup-quad)[VK_SUBGROUP_FEATURE_QUAD_BIT](#VkSubgroupFeatureFlagBits).

If [VK_KHR_shader_subgroup_rotate](../appendices/extensions.html#VK_KHR_shader_subgroup_rotate) is supported, and the implementation
advertises support with a [VkExtensionProperties](extensions.html#VkExtensionProperties)::`specVersion`
greater than or equal to 2, and the [`shaderSubgroupRotate`](features.html#features-shaderSubgroupRotate) feature is supported,
[VK_SUBGROUP_FEATURE_ROTATE_BIT](#VkSubgroupFeatureFlagBits) **must** be returned in
[VkPhysicalDeviceVulkan11Properties](devsandqueues.html#VkPhysicalDeviceVulkan11Properties)::`subgroupSupportedOperations`
and
[VkPhysicalDeviceSubgroupProperties](#VkPhysicalDeviceSubgroupProperties)::`supportedOperations`.
If [VK_KHR_shader_subgroup_rotate](../appendices/extensions.html#VK_KHR_shader_subgroup_rotate) is supported, and the implementation
advertises support with a [VkExtensionProperties](extensions.html#VkExtensionProperties)::`specVersion`
greater than or equal to 2, and the
[`shaderSubgroupRotateClustered`](features.html#features-shaderSubgroupRotateClustered) feature is supported,
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](#VkSubgroupFeatureFlagBits) **must** be returned in
[VkPhysicalDeviceVulkan11Properties](devsandqueues.html#VkPhysicalDeviceVulkan11Properties)::`subgroupSupportedOperations`
and
[VkPhysicalDeviceSubgroupProperties](#VkPhysicalDeviceSubgroupProperties)::`supportedOperations`.

If Vulkan 1.4 is supported, [VK_SUBGROUP_FEATURE_ROTATE_BIT](#VkSubgroupFeatureFlagBits) and
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](#VkSubgroupFeatureFlagBits) **must** be returned in
[VkPhysicalDeviceSubgroupProperties](#VkPhysicalDeviceSubgroupProperties)::`supportedOperations` and
[VkPhysicalDeviceVulkan11Properties](devsandqueues.html#VkPhysicalDeviceVulkan11Properties)::`subgroupSupportedOperations`

|  | [VK_SUBGROUP_FEATURE_ROTATE_BIT](#VkSubgroupFeatureFlagBits) and
| --- | --- |
[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](#VkSubgroupFeatureFlagBits) were added in version 2 of
the [VK_KHR_shader_subgroup_rotate](../appendices/extensions.html#VK_KHR_shader_subgroup_rotate) extension, after the initial
release, so there are implementations that do not advertise these bits.
Applications should use the [`shaderSubgroupRotate`](features.html#features-shaderSubgroupRotate) and [`shaderSubgroupRotateClustered`](features.html#features-shaderSubgroupRotateClustered) features to determine and enable
support.
These bits are advertised here for consistency and for future dependencies. |

If the [`shaderSubgroupPartitioned`](features.html#features-shaderSubgroupPartitioned) feature is supported,
`supportedOperations` **must** include [](#features-subgroup-partitioned)[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT](#VkSubgroupFeatureFlagBits).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubgroupProperties-sType-sType) VUID-VkPhysicalDeviceSubgroupProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

Bits which **can** be set in
[VkPhysicalDeviceSubgroupProperties](#VkPhysicalDeviceSubgroupProperties)::`supportedOperations`
and
[VkPhysicalDeviceVulkan11Properties](devsandqueues.html#VkPhysicalDeviceVulkan11Properties)::`subgroupSupportedOperations`
to specify supported [group operations](shaders.html#shaders-group-operations) with
[subgroup scope](shaders.html#shaders-scope-subgroup) are:

// Provided by VK_VERSION_1_1
typedef enum VkSubgroupFeatureFlagBits {
    VK_SUBGROUP_FEATURE_BASIC_BIT = 0x00000001,
    VK_SUBGROUP_FEATURE_VOTE_BIT = 0x00000002,
    VK_SUBGROUP_FEATURE_ARITHMETIC_BIT = 0x00000004,
    VK_SUBGROUP_FEATURE_BALLOT_BIT = 0x00000008,
    VK_SUBGROUP_FEATURE_SHUFFLE_BIT = 0x00000010,
    VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT = 0x00000020,
    VK_SUBGROUP_FEATURE_CLUSTERED_BIT = 0x00000040,
    VK_SUBGROUP_FEATURE_QUAD_BIT = 0x00000080,
  // Provided by VK_VERSION_1_4
    VK_SUBGROUP_FEATURE_ROTATE_BIT = 0x00000200,
  // Provided by VK_VERSION_1_4
    VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT = 0x00000400,
  // Provided by VK_EXT_shader_subgroup_partitioned
    VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT = 0x00000100,
  // Provided by VK_NV_shader_subgroup_partitioned
    VK_SUBGROUP_FEATURE_PARTITIONED_BIT_NV = VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT,
  // Provided by VK_KHR_shader_subgroup_rotate
    VK_SUBGROUP_FEATURE_ROTATE_BIT_KHR = VK_SUBGROUP_FEATURE_ROTATE_BIT,
  // Provided by VK_KHR_shader_subgroup_rotate
    VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT_KHR = VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT,
} VkSubgroupFeatureFlagBits;

* 
 [VK_SUBGROUP_FEATURE_BASIC_BIT](#VkSubgroupFeatureFlagBits)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniform` capability.

* 
 [VK_SUBGROUP_FEATURE_VOTE_BIT](#VkSubgroupFeatureFlagBits) specifies
the device will accept SPIR-V shader modules containing the
`GroupNonUniformVote` capability.

* 

[VK_SUBGROUP_FEATURE_ARITHMETIC_BIT](#VkSubgroupFeatureFlagBits) specifies the device will
accept SPIR-V shader modules containing the
`GroupNonUniformArithmetic` capability.

* 
 [VK_SUBGROUP_FEATURE_BALLOT_BIT](#VkSubgroupFeatureFlagBits)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniformBallot` capability.

* 
 [VK_SUBGROUP_FEATURE_SHUFFLE_BIT](#VkSubgroupFeatureFlagBits)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniformShuffle` capability.

* 

[VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT](#VkSubgroupFeatureFlagBits) specifies the device will
accept SPIR-V shader modules containing the
`GroupNonUniformShuffleRelative` capability.

* 
 [VK_SUBGROUP_FEATURE_CLUSTERED_BIT](#VkSubgroupFeatureFlagBits)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniformClustered` capability.

* 
 [VK_SUBGROUP_FEATURE_QUAD_BIT](#VkSubgroupFeatureFlagBits) specifies
the device will accept SPIR-V shader modules containing the
`GroupNonUniformQuad` capability.

* 

[VK_SUBGROUP_FEATURE_PARTITIONED_BIT_EXT](#VkSubgroupFeatureFlagBits) specifies the device will
accept SPIR-V shader modules containing the
`GroupNonUniformPartitionedEXT` capability.

* 
 [VK_SUBGROUP_FEATURE_ROTATE_BIT](#VkSubgroupFeatureFlagBits)
specifies the device will accept SPIR-V shader modules containing the
`GroupNonUniformRotateKHR` capability.

* 

[VK_SUBGROUP_FEATURE_ROTATE_CLUSTERED_BIT](#VkSubgroupFeatureFlagBits) specifies the device will
accept SPIR-V shader modules that use the `ClusterSize` operand to
`OpGroupNonUniformRotateKHR`.

// Provided by VK_VERSION_1_1
typedef VkFlags VkSubgroupFeatureFlags;

`VkSubgroupFeatureFlags` is a bitmask type for setting a mask of zero or
more [VkSubgroupFeatureFlagBits](#VkSubgroupFeatureFlagBits).

The `VkPhysicalDeviceSubgroupSizeControlProperties` structure is defined
as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceSubgroupSizeControlProperties {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              minSubgroupSize;
    uint32_t              maxSubgroupSize;
    uint32_t              maxComputeWorkgroupSubgroups;
    VkShaderStageFlags    requiredSubgroupSizeStages;
} VkPhysicalDeviceSubgroupSizeControlProperties;

// Provided by VK_EXT_subgroup_size_control
// Equivalent to VkPhysicalDeviceSubgroupSizeControlProperties
typedef VkPhysicalDeviceSubgroupSizeControlProperties VkPhysicalDeviceSubgroupSizeControlPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `minSubgroupSize` is the
minimum subgroup size supported by this device.
`minSubgroupSize` is at least one if any of the physical device’s
queues support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).
`minSubgroupSize` is a power-of-two.
`minSubgroupSize` is less than or equal to `maxSubgroupSize`.
`minSubgroupSize` is less than or equal to [    `subgroupSize`](devsandqueues.html#limits-subgroupSize).

* 
 `maxSubgroupSize` is the
maximum subgroup size supported by this device.
`maxSubgroupSize` is at least one if any of the physical device’s
queues support [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) or
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).
`maxSubgroupSize` is a power-of-two.
`maxSubgroupSize` is greater than or equal to `minSubgroupSize`.
`maxSubgroupSize` is greater than or equal to [    `subgroupSize`](devsandqueues.html#limits-subgroupSize).

* 

`maxComputeWorkgroupSubgroups` is the maximum number of subgroups
supported by the implementation within a workgroup.

* 

`requiredSubgroupSizeStages` is a bitfield of what shader stages
support having a required subgroup size specified.

If the `VkPhysicalDeviceSubgroupSizeControlProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

If [VkPhysicalDeviceSubgroupProperties](#VkPhysicalDeviceSubgroupProperties)::`supportedOperations`
includes [](#features-subgroup-quad)[VK_SUBGROUP_FEATURE_QUAD_BIT](#VkSubgroupFeatureFlagBits),
`minSubgroupSize` **must** be greater than or equal to 4.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubgroupSizeControlProperties-sType-sType) VUID-VkPhysicalDeviceSubgroupSizeControlProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_blend_operation_advanced
typedef struct VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           advancedBlendMaxColorAttachments;
    VkBool32           advancedBlendIndependentBlend;
    VkBool32           advancedBlendNonPremultipliedSrcColor;
    VkBool32           advancedBlendNonPremultipliedDstColor;
    VkBool32           advancedBlendCorrelatedOverlap;
    VkBool32           advancedBlendAllOperations;
} VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`advancedBlendMaxColorAttachments` is one greater than the highest
color attachment index that **can** be used in a render pass instance, for
a pipeline that uses an [advanced blend    operation](framebuffer.html#framebuffer-blend-advanced).

* 

`advancedBlendIndependentBlend` specifies whether advanced blend
operations **can** vary per-attachment.

* 

`advancedBlendNonPremultipliedSrcColor` specifies whether the source
color **can** be treated as non-premultiplied.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](framebuffer.html#VkPipelineColorBlendAdvancedStateCreateInfoEXT)::`srcPremultiplied`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE).

* 

`advancedBlendNonPremultipliedDstColor` specifies whether the
destination color **can** be treated as non-premultiplied.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](framebuffer.html#VkPipelineColorBlendAdvancedStateCreateInfoEXT)::`dstPremultiplied`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE).

* 

`advancedBlendCorrelatedOverlap` specifies whether the overlap mode
**can** be treated as correlated.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then
[VkPipelineColorBlendAdvancedStateCreateInfoEXT](framebuffer.html#VkPipelineColorBlendAdvancedStateCreateInfoEXT)::`blendOverlap`
**must** be [VK_BLEND_OVERLAP_UNCORRELATED_EXT](framebuffer.html#VkBlendOverlapEXT).

* 
 `advancedBlendAllOperations`
specifies whether all advanced blend operation enums are supported.
See the valid usage of [VkPipelineColorBlendAttachmentState](framebuffer.html#VkPipelineColorBlendAttachmentState).

If the `VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BLEND_OPERATION_ADVANCED_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_vertex_attribute_divisor
typedef struct VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVertexAttribDivisor;
} VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxVertexAttribDivisor`
is the maximum value of the number of instances that will repeat the
value of vertex attribute data when instanced rendering is enabled.

If the `VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceVertexAttributeDivisorProperties` structure is
defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceVertexAttributeDivisorProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVertexAttribDivisor;
    VkBool32           supportsNonZeroFirstInstance;
} VkPhysicalDeviceVertexAttributeDivisorProperties;

// Provided by VK_KHR_vertex_attribute_divisor
// Equivalent to VkPhysicalDeviceVertexAttributeDivisorProperties
typedef VkPhysicalDeviceVertexAttributeDivisorProperties VkPhysicalDeviceVertexAttributeDivisorPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxVertexAttribDivisor` is the maximum value of the number of
instances that will repeat the value of vertex attribute data when
instanced rendering is enabled.

* 

`supportsNonZeroFirstInstance` specifies whether a non-zero value
for the `firstInstance` parameter of [drawing commands](drawing.html#drawing)
is supported when
[VkVertexInputBindingDivisorDescription](fxvertex.html#VkVertexInputBindingDivisorDescription)::`divisor` is not `1`.

If the `VkPhysicalDeviceVertexAttributeDivisorProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVertexAttributeDivisorProperties-sType-sType) VUID-VkPhysicalDeviceVertexAttributeDivisorProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceSamplerFilterMinmaxProperties` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceSamplerFilterMinmaxProperties {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           filterMinmaxSingleComponentFormats;
    VkBool32           filterMinmaxImageComponentMapping;
} VkPhysicalDeviceSamplerFilterMinmaxProperties;

// Provided by VK_EXT_sampler_filter_minmax
// Equivalent to VkPhysicalDeviceSamplerFilterMinmaxProperties
typedef VkPhysicalDeviceSamplerFilterMinmaxProperties VkPhysicalDeviceSamplerFilterMinmaxPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`filterMinmaxSingleComponentFormats` is a boolean value indicating
whether a minimum set of required formats support min/max filtering.

* 

`filterMinmaxImageComponentMapping` is a boolean value indicating
whether the implementation supports non-identity component mapping of
the image when doing min/max filtering.

If the `VkPhysicalDeviceSamplerFilterMinmaxProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

If `filterMinmaxSingleComponentFormats` is [VK_TRUE](fundamentals.html#VK_TRUE), the following
formats **must** support the
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_MINMAX_BIT](formats.html#VkFormatFeatureFlagBits) feature with
[VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling), if they support
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits):

* 
[VK_FORMAT_R8_UNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R8_SNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R16_UNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R16_SNORM](formats.html#VkFormat)

* 
[VK_FORMAT_R16_SFLOAT](formats.html#VkFormat)

* 
[VK_FORMAT_R32_SFLOAT](formats.html#VkFormat)

* 
[VK_FORMAT_D16_UNORM](formats.html#VkFormat)

* 
[VK_FORMAT_X8_D24_UNORM_PACK32](formats.html#VkFormat)

* 
[VK_FORMAT_D32_SFLOAT](formats.html#VkFormat)

* 
[VK_FORMAT_D16_UNORM_S8_UINT](formats.html#VkFormat)

* 
[VK_FORMAT_D24_UNORM_S8_UINT](formats.html#VkFormat)

* 
[VK_FORMAT_D32_SFLOAT_S8_UINT](formats.html#VkFormat)

If the format is a depth/stencil format, this bit only specifies that the
depth aspect (not the stencil aspect) of an image of this format supports
min/max filtering, and that min/max filtering of the depth aspect is
supported when depth compare is disabled in the sampler.

If `filterMinmaxImageComponentMapping` is [VK_FALSE](fundamentals.html#VK_FALSE) the component
mapping of the image view used with min/max filtering **must** have been
created with the `r` component set to the
[identity swizzle](resources.html#resources-image-views-identity-mappings).
Only the `r` component of the sampled image value is defined; reading
other component values results in poison.
If `filterMinmaxImageComponentMapping` is [VK_TRUE](fundamentals.html#VK_TRUE) this restriction
does not apply and image component mapping works as normal.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSamplerFilterMinmaxProperties-sType-sType) VUID-VkPhysicalDeviceSamplerFilterMinmaxProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_FILTER_MINMAX_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceProtectedMemoryProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceProtectedMemoryProperties {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           protectedNoFault;
} VkPhysicalDeviceProtectedMemoryProperties;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `protectedNoFault`
specifies how an implementation behaves when an application attempts to
write to unprotected memory in a protected queue operation, read from
protected memory in an unprotected queue operation, or perform a query
in a protected queue operation.
If this limit is [VK_TRUE](fundamentals.html#VK_TRUE), such writes will be discarded or have
**undefined** values written; reads and queries will return poison.
If this limit is [VK_FALSE](fundamentals.html#VK_FALSE), applications **must** not perform these
operations.
See [Protected Memory Access Rules](memory.html#memory-protected-access-rules) for more information.

If the `VkPhysicalDeviceProtectedMemoryProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceProtectedMemoryProperties-sType-sType) VUID-VkPhysicalDeviceProtectedMemoryProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROTECTED_MEMORY_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMaintenance3Properties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceMaintenance3Properties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxPerSetDescriptors;
    VkDeviceSize       maxMemoryAllocationSize;
} VkPhysicalDeviceMaintenance3Properties;

// Provided by VK_KHR_maintenance3
// Equivalent to VkPhysicalDeviceMaintenance3Properties
typedef VkPhysicalDeviceMaintenance3Properties VkPhysicalDeviceMaintenance3PropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxPerSetDescriptors` is a maximum number of descriptors (summed
over all descriptor types) in a single descriptor set that is guaranteed
to satisfy any implementation-dependent constraints on the size of a
descriptor set itself.
Applications **can** query whether a descriptor set that goes beyond this
limit is supported using [vkGetDescriptorSetLayoutSupport](descriptorsets.html#vkGetDescriptorSetLayoutSupport).

* 

`maxMemoryAllocationSize` is the maximum size of a memory allocation
that **can** be created, even if there is more space available in the heap.
If [VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo)::`allocationSize` is larger the error
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult) **may** be returned.

If the `VkPhysicalDeviceMaintenance3Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance3Properties-sType-sType) VUID-VkPhysicalDeviceMaintenance3Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_3_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMaintenance4Properties` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceMaintenance4Properties {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       maxBufferSize;
} VkPhysicalDeviceMaintenance4Properties;

// Provided by VK_KHR_maintenance4
// Equivalent to VkPhysicalDeviceMaintenance4Properties
typedef VkPhysicalDeviceMaintenance4Properties VkPhysicalDeviceMaintenance4PropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxBufferSize` is the
maximum size `VkBuffer` that **can** be created.

If the `VkPhysicalDeviceMaintenance4Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance4Properties-sType-sType) VUID-VkPhysicalDeviceMaintenance4Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMaintenance5Properties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceMaintenance5Properties {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           earlyFragmentMultisampleCoverageAfterSampleCounting;
    VkBool32           earlyFragmentSampleMaskTestBeforeSampleCounting;
    VkBool32           depthStencilSwizzleOneSupport;
    VkBool32           polygonModePointSize;
    VkBool32           nonStrictSinglePixelWideLinesUseParallelogram;
    VkBool32           nonStrictWideLinesUseParallelogram;
} VkPhysicalDeviceMaintenance5Properties;

// Provided by VK_KHR_maintenance5
// Equivalent to VkPhysicalDeviceMaintenance5Properties
typedef VkPhysicalDeviceMaintenance5Properties VkPhysicalDeviceMaintenance5PropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`earlyFragmentMultisampleCoverageAfterSampleCounting` is a boolean
value indicating whether the [fragment shading](fragops.html#fragops-shader) and
[multisample coverage](fragops.html#fragops-covg) operations are performed after
[sample counting](fragops.html#fragops-samplecount) for [fragment    shaders](fragops.html#fragops-shader) with `EarlyFragmentTests` execution mode.

* 
`earlyFragmentSampleMaskTestBeforeSampleCounting` is a boolean value
indicating whether the [sample mask test](fragops.html#fragops-samplemask) operation
is performed before [sample counting](fragops.html#fragops-samplecount) for
[fragment shaders](fragops.html#fragops-shader) using the `EarlyFragmentTests`
execution mode.

* 
`depthStencilSwizzleOneSupport` is a boolean indicating that
depth/stencil texturing operations with [VK_COMPONENT_SWIZZLE_ONE](resources.html#VkComponentSwizzle)
have defined behavior.

* 
`polygonModePointSize` is a boolean value indicating whether the
point size of the final rasterization of polygons with
[VK_POLYGON_MODE_POINT](primsrast.html#VkPolygonMode) is controlled by `PointSize`.

* 
`nonStrictSinglePixelWideLinesUseParallelogram` is a boolean value
indicating whether non-strict lines with a width of 1.0 are rasterized
as parallelograms or using Bresenham’s algorithm.

* 
`nonStrictWideLinesUseParallelogram` is a boolean value indicating
whether non-strict lines with a width greater than 1.0 are rasterized as
parallelograms or using Bresenham’s algorithm.

If the `VkPhysicalDeviceMaintenance5Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance5Properties-sType-sType) VUID-VkPhysicalDeviceMaintenance5Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMaintenance6Properties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceMaintenance6Properties {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           blockTexelViewCompatibleMultipleLayers;
    uint32_t           maxCombinedImageSamplerDescriptorCount;
    VkBool32           fragmentShadingRateClampCombinerInputs;
} VkPhysicalDeviceMaintenance6Properties;

// Provided by VK_KHR_maintenance6
// Equivalent to VkPhysicalDeviceMaintenance6Properties
typedef VkPhysicalDeviceMaintenance6Properties VkPhysicalDeviceMaintenance6PropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`blockTexelViewCompatibleMultipleLayers` is a boolean value
indicating that an implementation supports creating image views with
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) where the
`layerCount` member of `subresourceRange` is greater than `1`.

* 
`maxCombinedImageSamplerDescriptorCount` is the maximum number of
combined image sampler descriptors that the implementation uses to
access any of the [formats    that require a sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the
implementation.

* 
`fragmentShadingRateClampCombinerInputs` is a boolean value
indicating that an implementation clamps the inputs to
[combiner operations](primsrast.html#primsrast-fragment-shading-rate-combining).

If the `VkPhysicalDeviceMaintenance6Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance6Properties-sType-sType) VUID-VkPhysicalDeviceMaintenance6Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMaintenance7PropertiesKHR` structure is defined as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceMaintenance7PropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           robustFragmentShadingRateAttachmentAccess;
    VkBool32           separateDepthStencilAttachmentAccess;
    uint32_t           maxDescriptorSetTotalUniformBuffersDynamic;
    uint32_t           maxDescriptorSetTotalStorageBuffersDynamic;
    uint32_t           maxDescriptorSetTotalBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindTotalBuffersDynamic;
} VkPhysicalDeviceMaintenance7PropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`robustFragmentShadingRateAttachmentAccess` indicates whether the
scaled size of a fragment shading rate attachment **can** be less than the
size of the render area.
If `robustFragmentShadingRateAttachmentAccess` is [VK_FALSE](fundamentals.html#VK_FALSE),
the size of the attachment multiplied by the texel size **must** be greater
than or equal to the size of the render area.
If it is [VK_TRUE](fundamentals.html#VK_TRUE) and the fragment shading rate attachment was
created with [VkImageSubresourceRange](resources.html#VkImageSubresourceRange)::`baseMipLevel` equal to
0, the scaled size **can** be smaller than the render area, with missing
shading rates defined by [out    of bounds behavior](shaders.html#shaders-execution-memory-access-bounds).

* 

`separateDepthStencilAttachmentAccess` indicates support for writing
to one aspect of a depth/stencil attachment without performing
read-modify-write operations on the other aspect.
If this property is [VK_TRUE](fundamentals.html#VK_TRUE), writes to one aspect **must** not result
in read-modify-write operations on the other aspect.
If [VK_FALSE](fundamentals.html#VK_FALSE), writes to one aspect **may** result in writes to the
other aspect as defined by [render pass load    operations](renderpass.html#renderpass-load-operations), [render pass store    operations](renderpass.html#renderpass-store-operations) and [render pass resolve    operations](renderpass.html#renderpass-resolve-operations).

* 

`maxDescriptorSetTotalUniformBuffersDynamic` is the maximum total
count of dynamic uniform buffers that **can** be included in a pipeline
layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Dynamic Uniform Buffer](descriptorsets.html#descriptors-uniformbufferdynamic).

* 

`maxDescriptorSetTotalStorageBuffersDynamic` is the maximum total
count of dynamic storage buffers that **can** be included in a pipeline
layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.
See [Dynamic Storage Buffer](descriptorsets.html#descriptors-storagebufferdynamic).

* 

`maxDescriptorSetTotalBuffersDynamic` is the maximum total count of
dynamic uniform buffers and storage buffers that **can** be included in a
pipeline layout.
Descriptors with a type of
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptors in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.

* 

`maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic` is
similar to `maxDescriptorSetTotalUniformBuffersDynamic` but counts
descriptors from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic` is
similar to `maxDescriptorSetTotalStorageBuffersDynamic` but counts
descriptors from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindTotalBuffersDynamic` is similar to
`maxDescriptorSetTotalBuffersDynamic` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.
While an application **can** allocate dynamic storage buffer descriptors
from a pool created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits),
bindings for these descriptors **must** not be present in any descriptor
set layout that includes bindings created with
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT).

If the `VkPhysicalDeviceMaintenance7PropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance7PropertiesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance7PropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_7_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceLayeredApiPropertiesListKHR` structure is defined
as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceLayeredApiPropertiesListKHR {
    VkStructureType                             sType;
    void*                                       pNext;
    uint32_t                                    layeredApiCount;
    VkPhysicalDeviceLayeredApiPropertiesKHR*    pLayeredApis;
} VkPhysicalDeviceLayeredApiPropertiesListKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`layeredApiCount` is an integer related to the number of layered
implementations underneath the Vulkan physical device, as described
below.

* 
`pLayeredApis` is a pointer to an array of
[VkPhysicalDeviceLayeredApiPropertiesKHR](#VkPhysicalDeviceLayeredApiPropertiesKHR) in which information
regarding the layered implementations underneath the Vulkan physical
device are returned.

If `pLayeredApis` is `NULL`, then the number of layered implementations
that are underneath the top-most Vulkan physical device (i.e. the one
returned by [vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2)) is returned in
`layeredApiCount`.
Otherwise, `layeredApiCount` **must** be set by the application to the
number of elements in the `pLayeredApis` array, and on return is
overwritten with the number of values actually written to
`pLayeredApis`.
If the value of `layeredApiCount` is less than the number of layered
implementations underneath the Vulkan physical device, at most
`layeredApiCount` values will be written to `pLayeredApis`.
An implementation that is not a layer will return 0 in
`layeredApiCount`.

In the presence of multiple layered implementations, each element of
`pLayeredApis` corresponds to an API implementation that is implemented
on top of the API at the previous index.
If there are layered implementations underneath a non-Vulkan implementation,
they may not be visible in this query as the corresponding APIs may lack
such a query.

If the `VkPhysicalDeviceLayeredApiPropertiesListKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesListKHR-sType-sType) VUID-VkPhysicalDeviceLayeredApiPropertiesListKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_PROPERTIES_LIST_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesListKHR-pLayeredApis-parameter) VUID-VkPhysicalDeviceLayeredApiPropertiesListKHR-pLayeredApis-parameter

 If `layeredApiCount` is not `0`, and `pLayeredApis` is not `NULL`, `pLayeredApis` **must** be a valid pointer to an array of `layeredApiCount` [VkPhysicalDeviceLayeredApiPropertiesKHR](#VkPhysicalDeviceLayeredApiPropertiesKHR) structures

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceLayeredApiPropertiesKHR` structure is defined as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceLayeredApiPropertiesKHR {
    VkStructureType                  sType;
    void*                            pNext;
    uint32_t                         vendorID;
    uint32_t                         deviceID;
    VkPhysicalDeviceLayeredApiKHR    layeredAPI;
    char                             deviceName[VK_MAX_PHYSICAL_DEVICE_NAME_SIZE];
} VkPhysicalDeviceLayeredApiPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vendorID` is a unique identifier for the vendor of the layered
implementation.

* 
`deviceID` is a unique identifier for the layered implementation
among devices available from the vendor.

* 
`layeredAPI` is a [VkPhysicalDeviceLayeredApiKHR](#VkPhysicalDeviceLayeredApiKHR) specifying the
API implemented by the layered implementation.

* 
`deviceName` is an array of [VK_MAX_PHYSICAL_DEVICE_NAME_SIZE](devsandqueues.html#VK_MAX_PHYSICAL_DEVICE_NAME_SIZE)
`char` containing a null-terminated UTF-8 string which is the name of
the device.

If `layeredAPI` is [VK_PHYSICAL_DEVICE_LAYERED_API_VULKAN_KHR](#VkPhysicalDeviceLayeredApiKHR),
additional Vulkan-specific information can be queried by including the
[VkPhysicalDeviceLayeredApiVulkanPropertiesKHR](#VkPhysicalDeviceLayeredApiVulkanPropertiesKHR) structure in the
`pNext` chain.
Otherwise if such a structure is included in the `pNext` chain, it is
ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_PROPERTIES_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-pNext-pNext) VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPhysicalDeviceLayeredApiVulkanPropertiesKHR](#VkPhysicalDeviceLayeredApiVulkanPropertiesKHR)

* 
[](#VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-sType-unique) VUID-VkPhysicalDeviceLayeredApiPropertiesKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

The list of possible API implementations of a layered implementation
underneath the Vulkan physical device, as returned in
[VkPhysicalDeviceLayeredApiPropertiesKHR](#VkPhysicalDeviceLayeredApiPropertiesKHR)::`layeredAPI`, are:

// Provided by VK_KHR_maintenance7
typedef enum VkPhysicalDeviceLayeredApiKHR {
    VK_PHYSICAL_DEVICE_LAYERED_API_VULKAN_KHR = 0,
    VK_PHYSICAL_DEVICE_LAYERED_API_D3D12_KHR = 1,
    VK_PHYSICAL_DEVICE_LAYERED_API_METAL_KHR = 2,
    VK_PHYSICAL_DEVICE_LAYERED_API_OPENGL_KHR = 3,
    VK_PHYSICAL_DEVICE_LAYERED_API_OPENGLES_KHR = 4,
} VkPhysicalDeviceLayeredApiKHR;

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_VULKAN_KHR](#VkPhysicalDeviceLayeredApiKHR) - the device implements
the Vulkan API.

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_D3D12_KHR](#VkPhysicalDeviceLayeredApiKHR) - the device implements
the D3D12 API.

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_METAL_KHR](#VkPhysicalDeviceLayeredApiKHR) - the device implements
the Metal API.

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_OPENGL_KHR](#VkPhysicalDeviceLayeredApiKHR) - the device implements
the OpenGL API.

* 
[VK_PHYSICAL_DEVICE_LAYERED_API_OPENGLES_KHR](#VkPhysicalDeviceLayeredApiKHR) - the device
implements the OpenGL ES API.

The `VkPhysicalDeviceLayeredApiVulkanPropertiesKHR` structure is defined
as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceLayeredApiVulkanPropertiesKHR {
    VkStructureType                sType;
    void*                          pNext;
    VkPhysicalDeviceProperties2    properties;
} VkPhysicalDeviceLayeredApiVulkanPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`properties` is a [VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) in which
properties of the underlying layered Vulkan implementation are returned.

The implementation **must** zero-fill the contents of
`properties.properties.limits` and
`properties.properties.sparseProperties`.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceLayeredApiVulkanPropertiesKHR-pNext-10011) VUID-VkPhysicalDeviceLayeredApiVulkanPropertiesKHR-pNext-10011

Only [VkPhysicalDeviceDriverProperties](devsandqueues.html#VkPhysicalDeviceDriverProperties) and
[VkPhysicalDeviceIDProperties](devsandqueues.html#VkPhysicalDeviceIDProperties) are allowed in the `pNext` chain
of `properties`

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLayeredApiVulkanPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceLayeredApiVulkanPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_VULKAN_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceLayeredApiPropertiesKHR](#VkPhysicalDeviceLayeredApiPropertiesKHR)

The `VkPhysicalDeviceMaintenance9PropertiesKHR` structure is defined as:

// Provided by VK_KHR_maintenance9
typedef struct VkPhysicalDeviceMaintenance9PropertiesKHR {
    VkStructureType                     sType;
    void*                               pNext;
    VkBool32                            image2DViewOf3DSparse;
    VkDefaultVertexAttributeValueKHR    defaultVertexAttributeValue;
} VkPhysicalDeviceMaintenance9PropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 If the [    `image2DViewOf3D`](features.html#features-image2DViewOf3D) feature is enabled, `image2DViewOf3DSparse`
indicates whether the implementation supports binding a slice of a
sparse 3D image to a 2D image view.

* 
 `defaultVertexAttributeValue`
is a [VkDefaultVertexAttributeValueKHR](#VkDefaultVertexAttributeValueKHR) that indicates what value
the implementation will return when the vertex shader reads unbound
vertex attributes.
Unbound attributes are those that have no corresponding
[VkVertexInputAttributeDescription](fxvertex.html#VkVertexInputAttributeDescription)::`location` defined in the
bound graphics pipeline
or no corresponding
[VkVertexInputAttributeDescription2EXT](fxvertex.html#VkVertexInputAttributeDescription2EXT)::`location` set by the
most recent call to [vkCmdSetVertexInputEXT](fxvertex.html#vkCmdSetVertexInputEXT) when the state is
dynamic
.

If the `VkPhysicalDeviceMaintenance9PropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance9PropertiesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance9PropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_9_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The possible values returned by the implementation when the vertex shader
reads an unbound vertex attribute are:

// Provided by VK_KHR_maintenance9
typedef enum VkDefaultVertexAttributeValueKHR {
    VK_DEFAULT_VERTEX_ATTRIBUTE_VALUE_ZERO_ZERO_ZERO_ZERO_KHR = 0,
    VK_DEFAULT_VERTEX_ATTRIBUTE_VALUE_ZERO_ZERO_ZERO_ONE_KHR = 1,
} VkDefaultVertexAttributeValueKHR;

* 
[VK_DEFAULT_VERTEX_ATTRIBUTE_VALUE_ZERO_ZERO_ZERO_ZERO_KHR](#VkDefaultVertexAttributeValueKHR) - the
value read for an unbound vertex attribute is (0,0,0,0).

* 
[VK_DEFAULT_VERTEX_ATTRIBUTE_VALUE_ZERO_ZERO_ZERO_ONE_KHR](#VkDefaultVertexAttributeValueKHR) - the
value read for an unbound vertex attribute is (0,0,0,1).

The `VkPhysicalDeviceMaintenance10PropertiesKHR` structure is defined
as:

// Provided by VK_KHR_maintenance10
typedef struct VkPhysicalDeviceMaintenance10PropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           rgba4OpaqueBlackSwizzled;
    VkBool32           resolveSrgbFormatAppliesTransferFunction;
    VkBool32           resolveSrgbFormatSupportsTransferFunctionControl;
} VkPhysicalDeviceMaintenance10PropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `rgba4OpaqueBlackSwizzled`
indicates whether correct swizzling is applied to the opaque black
border color when using either the [VK_FORMAT_B4G4R4A4_UNORM_PACK16](formats.html#VkFormat)
or [VK_FORMAT_R4G4B4A4_UNORM_PACK16](formats.html#VkFormat) format.
If it is [VK_TRUE](fundamentals.html#VK_TRUE), the implementation will correctly produce an
opaque black border color with these formats.
If it is [VK_FALSE](fundamentals.html#VK_FALSE), the implementation **may** swap the first channel
with the alpha channel for the border color when sampling.

* 

`resolveSrgbFormatAppliesTransferFunction` indicates whether
resolving a multi-sampled sRGB format to single-sampled sRGB by a
weighted average converts the samples to linear before averaging.
This applies to both attachment resolves in a render pass and standalone
resolve commands.
If [VK_TRUE](fundamentals.html#VK_TRUE), implementation always converts to linear before
averaging unless overridden.
If [VK_FALSE](fundamentals.html#VK_FALSE), implementation never converts to linear before
averaging unless overridden.

* 

`resolveSrgbFormatSupportsTransferFunctionControl` indicates whether
the implementation supports overriding the default behavior in
`resolveSrgbFormatAppliesTransferFunction` in
render passes and [vkCmdResolveImage2](copies.html#vkCmdResolveImage2).

Implementations supporting [`maintenance10`](features.html#features-maintenance10)
**should** set `resolveSrgbFormatAppliesTransferFunction` to [VK_TRUE](fundamentals.html#VK_TRUE).

If the `VkPhysicalDeviceMaintenance10PropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance10PropertiesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance10PropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_10_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMeshShaderPropertiesNV` structure is defined as:

// Provided by VK_NV_mesh_shader
typedef struct VkPhysicalDeviceMeshShaderPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxDrawMeshTasksCount;
    uint32_t           maxTaskWorkGroupInvocations;
    uint32_t           maxTaskWorkGroupSize[3];
    uint32_t           maxTaskTotalMemorySize;
    uint32_t           maxTaskOutputCount;
    uint32_t           maxMeshWorkGroupInvocations;
    uint32_t           maxMeshWorkGroupSize[3];
    uint32_t           maxMeshTotalMemorySize;
    uint32_t           maxMeshOutputVertices;
    uint32_t           maxMeshOutputPrimitives;
    uint32_t           maxMeshMultiviewViewCount;
    uint32_t           meshOutputPerVertexGranularity;
    uint32_t           meshOutputPerPrimitiveGranularity;
} VkPhysicalDeviceMeshShaderPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxDrawMeshTasksCount` is the maximum number of local workgroups
that **can** be launched by a single draw mesh tasks command.
See [Programmable Mesh Shading](drawing.html#drawing-mesh-shading).

* 
`maxTaskWorkGroupInvocations` is the maximum total number of task
    shader invocations in a single local workgroup.
    The product of the X, Y, and Z sizes, as specified by the `LocalSize`
or `LocalSizeId`
    execution mode in shader modules or by the object decorated by the
    `WorkgroupSize` decoration, **must** be less than or equal to this
    limit.

* 
`maxTaskWorkGroupSize`[3] is the maximum size of a local task
    workgroup.
    These three values represent the maximum local workgroup size in the X,
    Y, and Z dimensions, respectively.
    The `x`, `y`, and `z` sizes, as specified by the
    `LocalSize`
or `LocalSizeId`
    execution mode or by the object decorated by the `WorkgroupSize`
    decoration in shader modules, **must** be less than or equal to the
    corresponding limit.

* 
`maxTaskTotalMemorySize` is the maximum number of bytes that the
task shader can use in total for shared and output memory combined.

* 
`maxTaskOutputCount` is the maximum number of output tasks a single
task shader workgroup can emit.

* 
`maxMeshWorkGroupInvocations` is the maximum total number of mesh
    shader invocations in a single local workgroup.
    The product of the X, Y, and Z sizes, as specified by the `LocalSize`
or `LocalSizeId`
    execution mode in shader modules or by the object decorated by the
    `WorkgroupSize` decoration, **must** be less than or equal to this
    limit.

* 
`maxMeshWorkGroupSize`[3] is the maximum size of a local mesh
    workgroup.
    These three values represent the maximum local workgroup size in the X,
    Y, and Z dimensions, respectively.
    The `x`, `y`, and `z` sizes, as specified by the
    `LocalSize`
or `LocalSizeId`
    execution mode or by the object decorated by the `WorkgroupSize`
    decoration in shader modules, **must** be less than or equal to the
    corresponding limit.

* 
`maxMeshTotalMemorySize` is the maximum number of bytes that the
mesh shader can use in total for shared and output memory combined.

* 
`maxMeshOutputVertices` is the maximum number of vertices a mesh
shader output can store.

* 
`maxMeshOutputPrimitives` is the maximum number of primitives a mesh
shader output can store.

* 
`maxMeshMultiviewViewCount` is the maximum number of multiview views
a mesh shader can use.

* 
`meshOutputPerVertexGranularity` is the granularity with which mesh
vertex outputs are allocated.
The value can be used to compute the memory size used by the mesh
shader, which **must** be less than or equal to
`maxMeshTotalMemorySize`.

* 
`meshOutputPerPrimitiveGranularity` is the granularity with which
mesh outputs qualified as per-primitive are allocated.
The value can be used to compute the memory size used by the mesh
shader, which **must** be less than or equal to
`maxMeshTotalMemorySize`.

If the `VkPhysicalDeviceMeshShaderPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMeshShaderPropertiesNV-sType-sType) VUID-VkPhysicalDeviceMeshShaderPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMeshShaderPropertiesEXT` structure is defined as:

// Provided by VK_EXT_mesh_shader
typedef struct VkPhysicalDeviceMeshShaderPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxTaskWorkGroupTotalCount;
    uint32_t           maxTaskWorkGroupCount[3];
    uint32_t           maxTaskWorkGroupInvocations;
    uint32_t           maxTaskWorkGroupSize[3];
    uint32_t           maxTaskPayloadSize;
    uint32_t           maxTaskSharedMemorySize;
    uint32_t           maxTaskPayloadAndSharedMemorySize;
    uint32_t           maxMeshWorkGroupTotalCount;
    uint32_t           maxMeshWorkGroupCount[3];
    uint32_t           maxMeshWorkGroupInvocations;
    uint32_t           maxMeshWorkGroupSize[3];
    uint32_t           maxMeshSharedMemorySize;
    uint32_t           maxMeshPayloadAndSharedMemorySize;
    uint32_t           maxMeshOutputMemorySize;
    uint32_t           maxMeshPayloadAndOutputMemorySize;
    uint32_t           maxMeshOutputComponents;
    uint32_t           maxMeshOutputVertices;
    uint32_t           maxMeshOutputPrimitives;
    uint32_t           maxMeshOutputLayers;
    uint32_t           maxMeshMultiviewViewCount;
    uint32_t           meshOutputPerVertexGranularity;
    uint32_t           meshOutputPerPrimitiveGranularity;
    uint32_t           maxPreferredTaskWorkGroupInvocations;
    uint32_t           maxPreferredMeshWorkGroupInvocations;
    VkBool32           prefersLocalInvocationVertexOutput;
    VkBool32           prefersLocalInvocationPrimitiveOutput;
    VkBool32           prefersCompactVertexOutput;
    VkBool32           prefersCompactPrimitiveOutput;
} VkPhysicalDeviceMeshShaderPropertiesEXT;

The members of the `VkPhysicalDeviceMeshShaderPropertiesEXT` structure
describe the following implementation-dependent limits:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxTaskWorkGroupTotalCount`
is the maximum number of local workgroups that **can** be launched for a
task shader by a [mesh tasks drawing command](drawing.html#drawing-mesh-shading).

* 
 `maxTaskWorkGroupCount`[3] is the
maximum number of local workgroups that **can** be launched for a task
shader in each dimension by a [mesh tasks drawing    command](drawing.html#drawing-mesh-shading).
These three values represent the maximum number of local workgroups for
the X, Y, and Z dimensions, respectively.
The workgroup count parameters to the drawing commands **must** be less
than or equal to the corresponding limit.
The product of these dimensions **must** be less than or equal to
`maxTaskWorkGroupTotalCount`.

* 
 `maxTaskWorkGroupInvocations`
    is the maximum total number of task shader invocations in a single local
    workgroup.
    The product of the X, Y, and Z sizes, as specified by the `LocalSize`
or `LocalSizeId`
    execution mode in shader modules or by the object decorated by the
    `WorkgroupSize` decoration, **must** be less than or equal to this
    limit.

* 
 `maxTaskWorkGroupSize`[3] is the
    maximum size of a local workgroup for a task shader in each dimension.
    These three values represent the maximum local workgroup size in the X,
    Y, and Z dimensions, respectively.
    The `x`, `y`, and `z` sizes, as specified by the
    `LocalSize`
or `LocalSizeId`
    execution mode or by the object decorated by the `WorkgroupSize`
    decoration in shader modules, **must** be less than or equal to the
    corresponding limit.

* 
 `maxTaskPayloadSize` is the maximum
total storage size, in bytes, available for variables declared with the
`TaskPayloadWorkgroupEXT` storage class in shader modules in the task
shader stage.

* 
 `maxTaskSharedMemorySize` is the
maximum total storage size, in bytes, available for variables declared
with the `Workgroup` storage class in shader modules in the task
shader stage.

* 

`maxTaskPayloadAndSharedMemorySize` is the maximum total storage
size, in bytes, available for variables that are declared with the
`TaskPayloadWorkgroupEXT` or `Workgroup` storage class, in shader
modules in the task shader stage.

* 
 `maxMeshWorkGroupTotalCount`
is the maximum number of local workgroups that **can** be launched for a
mesh shader, either directly by a [mesh tasks    drawing command](drawing.html#drawing-mesh-shading), or emitted by a single task shader workgroup.

* 
 `maxMeshWorkGroupCount`[3] is the
maximum number of local workgroups that **can** be launched for a mesh
shader in each dimension, either directly by a
[mesh tasks drawing command](drawing.html#drawing-mesh-shading), or emitted by a
single task shader workgroup.
These three values represent the maximum number of local output tasks
for the X, Y, and Z dimensions, respectively.
The workgroup count parameters to the `OpEmitMeshTasksEXT` **must** be
less than or equal to the corresponding limit.
The product of these dimensions **must** be less than or equal to
`maxMeshWorkGroupTotalCount`.

* 
 `maxMeshWorkGroupInvocations`
    is the maximum total number of mesh shader invocations in a single local
    workgroup.
    The product of the X, Y, and Z sizes, as specified by the `LocalSize`
or `LocalSizeId`
    execution mode in shader modules or by the object decorated by the
    `WorkgroupSize` decoration, **must** be less than or equal to this
    limit.

* 
 `maxMeshWorkGroupSize`[3] is the
    maximum size of a local workgroup for a mesh shader in each dimension.
    These three values represent the maximum local workgroup size in the X,
    Y, and Z dimensions, respectively.
    The `x`, `y`, and `z` sizes, as specified by the
    `LocalSize`
or `LocalSizeId`
    execution mode or by the object decorated by the `WorkgroupSize`
    decoration in shader modules, **must** be less than or equal to the
    corresponding limit.

* 
 `maxMeshSharedMemorySize` is the
maximum total storage size, in bytes, available for variables declared
with the `Workgroup` storage class in shader modules in the mesh
shader stage.

* 

`maxMeshPayloadAndSharedMemorySize` is the maximum total storage
size, in bytes, available for variables that are declared with the
`TaskPayloadWorkgroupEXT` or `Workgroup` storage class in shader
modules in the mesh shader stage.

* 
 `maxMeshOutputMemorySize` is the
maximum total storage size, in bytes, available for output variables in
shader modules in the mesh shader stage, according to the formula in
[Mesh Shader Output](VK_NV_mesh_shader/mesh.html#mesh-output).

* 

`maxMeshPayloadAndOutputMemorySize` is the maximum total storage
size, in bytes, available for variables that are declared with the
`TaskPayloadWorkgroupEXT` storage class, or output variables in
shader modules in the mesh shader stage, according to the formula in
[Mesh Shader Output](VK_NV_mesh_shader/mesh.html#mesh-output).

* 
 `maxMeshOutputComponents` is the
maximum number of components of output variables which **can** be output
from the mesh shader stage.

* 
 `maxMeshOutputVertices` is the
maximum number of vertices which **can** be emitted by a single mesh shader
workgroup.

* 
 `maxMeshOutputPrimitives` is the
maximum number of primitives which **can** be emitted by a single mesh
shader workgroup.

* 
 `maxMeshOutputLayers` is one greater
than the maximum layer index that **can** be output from the mesh shader
stage.

* 
 `maxMeshMultiviewViewCount` is
one greater than the maximum view index that **can** be used by any mesh
shader.

* 

`meshOutputPerVertexGranularity` is the granularity of vertex
allocation.
The number of output vertices allocated for the mesh shader stage is
padded to a multiple of this number.
The value can be used to calculate the required storage size for output
variables in shader modules in the mesh shader stage, which **must** be
less than or equal to `maxMeshOutputMemorySize`.

* 

`meshOutputPerPrimitiveGranularity` is the granularity of primitive
allocation.
The number of output primitives allocated for the mesh shader stage is
padded to a multiple of this number.
The value can be used to calculate the required storage size for output
variables in shader modules in the mesh shader stage, which **must** be
less than or equal to `maxMeshOutputMemorySize`.

* 

`maxPreferredTaskWorkGroupInvocations` is the maximum number of task
shader invocations in a single workgroup that is preferred by the
implementation for optimal performance.
The value is guaranteed to be a multiple of a supported subgroup size
for the task shader stage.

* 

`maxPreferredMeshWorkGroupInvocations` is the maximum number of mesh
shader invocations in a single workgroup that is preferred by the
implementation for optimal performance.
The value is guaranteed to be a multiple of a supported subgroup size
for the mesh shader stage.

* 

`prefersLocalInvocationVertexOutput` specifies whether writes to the
vertex output array in a mesh shader yield best performance when the
array index matches `LocalInvocationIndex`.

* 

`prefersLocalInvocationPrimitiveOutput` specifies whether writes to
the primitive output array in a mesh shader yield best performance when
the array index matches `LocalInvocationIndex`.

* 
 `prefersCompactVertexOutput`
specifies whether output vertices should be compacted after custom
culling in the mesh shader for best performance, otherwise keeping the
vertices at their original location may be better.

* 

`prefersCompactPrimitiveOutput` specifies whether output primitives
should be compacted after custom culling in the mesh shader for best
performance, otherwise the use of `CullPrimitiveEXT` may be better.

If the `VkPhysicalDeviceMeshShaderPropertiesEXT` structure is included
in the `pNext` chain of [VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2), it is filled
with the implementation-dependent limits.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMeshShaderPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceMeshShaderPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDescriptorIndexingProperties` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceDescriptorIndexingProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxUpdateAfterBindDescriptorsInAllPools;
    VkBool32           shaderUniformBufferArrayNonUniformIndexingNative;
    VkBool32           shaderSampledImageArrayNonUniformIndexingNative;
    VkBool32           shaderStorageBufferArrayNonUniformIndexingNative;
    VkBool32           shaderStorageImageArrayNonUniformIndexingNative;
    VkBool32           shaderInputAttachmentArrayNonUniformIndexingNative;
    VkBool32           robustBufferAccessUpdateAfterBind;
    VkBool32           quadDivergentImplicitLod;
    uint32_t           maxPerStageDescriptorUpdateAfterBindSamplers;
    uint32_t           maxPerStageDescriptorUpdateAfterBindUniformBuffers;
    uint32_t           maxPerStageDescriptorUpdateAfterBindStorageBuffers;
    uint32_t           maxPerStageDescriptorUpdateAfterBindSampledImages;
    uint32_t           maxPerStageDescriptorUpdateAfterBindStorageImages;
    uint32_t           maxPerStageDescriptorUpdateAfterBindInputAttachments;
    uint32_t           maxPerStageUpdateAfterBindResources;
    uint32_t           maxDescriptorSetUpdateAfterBindSamplers;
    uint32_t           maxDescriptorSetUpdateAfterBindUniformBuffers;
    uint32_t           maxDescriptorSetUpdateAfterBindUniformBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindStorageBuffers;
    uint32_t           maxDescriptorSetUpdateAfterBindStorageBuffersDynamic;
    uint32_t           maxDescriptorSetUpdateAfterBindSampledImages;
    uint32_t           maxDescriptorSetUpdateAfterBindStorageImages;
    uint32_t           maxDescriptorSetUpdateAfterBindInputAttachments;
} VkPhysicalDeviceDescriptorIndexingProperties;

// Provided by VK_EXT_descriptor_indexing
// Equivalent to VkPhysicalDeviceDescriptorIndexingProperties
typedef VkPhysicalDeviceDescriptorIndexingProperties VkPhysicalDeviceDescriptorIndexingPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxUpdateAfterBindDescriptorsInAllPools` is the maximum number of
descriptors (summed over all descriptor types) that **can** be created
across all pools that are created with the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorPoolCreateFlagBits) bit set.
Pool creation **may** fail when this limit is exceeded, or when the space
this limit represents is unable to satisfy a pool creation due to
fragmentation.

* 

`shaderUniformBufferArrayNonUniformIndexingNative` is a boolean
value indicating whether uniform buffer descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of uniform buffers **may**
execute multiple times in order to access all the descriptors.

* 

`shaderSampledImageArrayNonUniformIndexingNative` is a boolean value
indicating whether sampler and image descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of samplers or images
**may** execute multiple times in order to access all the descriptors.

* 

`shaderStorageBufferArrayNonUniformIndexingNative` is a boolean
value indicating whether storage buffer descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of storage buffers **may**
execute multiple times in order to access all the descriptors.

* 

`shaderStorageImageArrayNonUniformIndexingNative` is a boolean value
indicating whether storage image descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of storage images **may**
execute multiple times in order to access all the descriptors.

* 

`shaderInputAttachmentArrayNonUniformIndexingNative` is a boolean
value indicating whether input attachment descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of input attachments
**may** execute multiple times in order to access all the descriptors.

* 

`robustBufferAccessUpdateAfterBind` is a boolean value indicating
whether [`robustBufferAccess`](features.html#features-robustBufferAccess) **can**
be enabled on a device simultaneously with
`descriptorBindingUniformBufferUpdateAfterBind`,
`descriptorBindingStorageBufferUpdateAfterBind`,
`descriptorBindingUniformTexelBufferUpdateAfterBind`, and/or
`descriptorBindingStorageTexelBufferUpdateAfterBind`.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then either `robustBufferAccess` **must** be
disabled or all of these update-after-bind features **must** be disabled.
Similarly, if this property is [VK_FALSE](fundamentals.html#VK_FALSE), robustness **must** not be
enabled through the [VkPipelineRobustnessCreateInfo](pipelines.html#VkPipelineRobustnessCreateInfo) mechanism.

* 

`quadDivergentImplicitLod` is a boolean value indicating whether
implicit LOD calculations for image operations have well-defined results
when the image and/or sampler objects used for the instruction are not
uniform within a quad.
See [Derivative Image    Operations](textures.html#textures-derivative-image-operations).

* 

`maxPerStageDescriptorUpdateAfterBindSamplers` is similar to
`maxPerStageDescriptorSamplers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindUniformBuffers` is similar to
`maxPerStageDescriptorUniformBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindStorageBuffers` is similar to
`maxPerStageDescriptorStorageBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindSampledImages` is similar to
`maxPerStageDescriptorSampledImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindStorageImages` is similar to
`maxPerStageDescriptorStorageImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindInputAttachments` is similar to
`maxPerStageDescriptorInputAttachments` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageUpdateAfterBindResources` is similar to
`maxPerStageResources` but counts descriptors from descriptor sets
created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindSamplers` is similar to
`maxDescriptorSetSamplers` but counts descriptors from descriptor
sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindUniformBuffers` is similar to
`maxDescriptorSetUniformBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` is similar to
`maxDescriptorSetUniformBuffersDynamic` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.
While an application **can** allocate dynamic uniform buffer descriptors
from a pool created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits),
bindings for these descriptors **must** not be present in any descriptor
set layout that includes bindings created with
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT).

* 

`maxDescriptorSetUpdateAfterBindStorageBuffers` is similar to
`maxDescriptorSetStorageBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` is similar to
`maxDescriptorSetStorageBuffersDynamic` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.
While an application **can** allocate dynamic storage buffer descriptors
from a pool created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits),
bindings for these descriptors **must** not be present in any descriptor
set layout that includes bindings created with
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT).

* 

`maxDescriptorSetUpdateAfterBindSampledImages` is similar to
`maxDescriptorSetSampledImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindStorageImages` is similar to
`maxDescriptorSetStorageImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindInputAttachments` is similar to
`maxDescriptorSetInputAttachments` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

If the `VkPhysicalDeviceDescriptorIndexingProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorIndexingProperties-sType-sType) VUID-VkPhysicalDeviceDescriptorIndexingProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceInlineUniformBlockProperties` structure is defined
as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceInlineUniformBlockProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxInlineUniformBlockSize;
    uint32_t           maxPerStageDescriptorInlineUniformBlocks;
    uint32_t           maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks;
    uint32_t           maxDescriptorSetInlineUniformBlocks;
    uint32_t           maxDescriptorSetUpdateAfterBindInlineUniformBlocks;
} VkPhysicalDeviceInlineUniformBlockProperties;

// Provided by VK_EXT_inline_uniform_block
// Equivalent to VkPhysicalDeviceInlineUniformBlockProperties
typedef VkPhysicalDeviceInlineUniformBlockProperties VkPhysicalDeviceInlineUniformBlockPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxInlineUniformBlockSize` is the maximum size in bytes of an
[inline uniform block](descriptorsets.html#descriptors-inlineuniformblock) binding.

* 

`maxPerStageDescriptorInlineUniformBlocks` is the maximum number of
inline uniform block bindings that **can** be accessible to a single shader
stage in a pipeline layout.
Descriptor bindings with a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType) count against this limit.
Only descriptor bindings in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.

* 

`maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks`
is similar to `maxPerStageDescriptorInlineUniformBlocks` but counts
descriptor bindings from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetInlineUniformBlocks` is the maximum number of
inline uniform block bindings that **can** be included in descriptor
bindings in a pipeline layout across all pipeline shader stages and
descriptor set numbers.
Descriptor bindings with a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType) count against this limit.
Only descriptor bindings in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.

* 

`maxDescriptorSetUpdateAfterBindInlineUniformBlocks`
is similar to `maxDescriptorSetInlineUniformBlocks` but counts
descriptor bindings from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

If the `VkPhysicalDeviceInlineUniformBlockProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceInlineUniformBlockProperties-sType-sType) VUID-VkPhysicalDeviceInlineUniformBlockProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceConservativeRasterizationPropertiesEXT` structure
is defined as:

// Provided by VK_EXT_conservative_rasterization
typedef struct VkPhysicalDeviceConservativeRasterizationPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    float              primitiveOverestimationSize;
    float              maxExtraPrimitiveOverestimationSize;
    float              extraPrimitiveOverestimationSizeGranularity;
    VkBool32           primitiveUnderestimation;
    VkBool32           conservativePointAndLineRasterization;
    VkBool32           degenerateTrianglesRasterized;
    VkBool32           degenerateLinesRasterized;
    VkBool32           fullyCoveredFragmentShaderInputVariable;
    VkBool32           conservativeRasterizationPostDepthCoverage;
} VkPhysicalDeviceConservativeRasterizationPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `primitiveOverestimationSize`
is the size in pixels the generating primitive is increased at each of
its edges during conservative rasterization overestimation mode.
Even with a size of 0.0, conservative rasterization overestimation rules
still apply and if any part of the pixel rectangle is covered by the
generating primitive, fragments are generated for the entire pixel.
However implementations **may** make the pixel coverage area even more
conservative by increasing the size of the generating primitive.

* 

`maxExtraPrimitiveOverestimationSize` is the maximum size in pixels
of extra overestimation the implementation supports in the pipeline
state.
A value of 0.0 means the implementation does not support any additional
overestimation of the generating primitive during conservative
rasterization.
A value above 0.0 allows the application to further increase the size of
the generating primitive during conservative rasterization
overestimation.

* 

`extraPrimitiveOverestimationSizeGranularity` is the granularity of
extra overestimation that can be specified in the pipeline state between
0.0 and `maxExtraPrimitiveOverestimationSize` inclusive.
A value of 0.0 means the implementation can use the smallest
representable non-zero value in the screen space pixel fixed-point grid.

* 
 `primitiveUnderestimation` is
[VK_TRUE](fundamentals.html#VK_TRUE) if the implementation supports the
[VK_CONSERVATIVE_RASTERIZATION_MODE_UNDERESTIMATE_EXT](primsrast.html#VkConservativeRasterizationModeEXT) conservative
rasterization mode in addition to
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](primsrast.html#VkConservativeRasterizationModeEXT).
Otherwise the implementation only supports
[VK_CONSERVATIVE_RASTERIZATION_MODE_OVERESTIMATE_EXT](primsrast.html#VkConservativeRasterizationModeEXT).

* 

`conservativePointAndLineRasterization` is [VK_TRUE](fundamentals.html#VK_TRUE) if the
implementation supports conservative rasterization of point and line
primitives as well as triangle primitives.
Otherwise the implementation only supports triangle primitives.

* 

`degenerateTrianglesRasterized` is [VK_FALSE](fundamentals.html#VK_FALSE) if the
implementation culls primitives generated from triangles that become
zero area after they are quantized to the fixed-point rasterization
pixel grid.
`degenerateTrianglesRasterized` is [VK_TRUE](fundamentals.html#VK_TRUE) if these primitives
are not culled and the provoking vertex attributes and depth value are
used for the fragments.
The primitive area calculation is done on the primitive generated from
the clipped triangle if applicable.
Zero area primitives are backfacing and the application **can** enable
backface culling if desired.

* 
 `degenerateLinesRasterized` is
[VK_FALSE](fundamentals.html#VK_FALSE) if the implementation culls lines that become zero length
after they are quantized to the fixed-point rasterization pixel grid.
`degenerateLinesRasterized` is [VK_TRUE](fundamentals.html#VK_TRUE) if zero length lines
are not culled and the provoking vertex attributes and depth value are
used for the fragments.

* 

`fullyCoveredFragmentShaderInputVariable` is [VK_TRUE](fundamentals.html#VK_TRUE) if the
implementation supports the SPIR-V builtin fragment shader input
variable `FullyCoveredEXT` specifying that conservative rasterization
is enabled and the fragment area is fully covered by the generating
primitive.

* 

`conservativeRasterizationPostDepthCoverage` is [VK_TRUE](fundamentals.html#VK_TRUE) if the
implementation supports conservative rasterization with the
`PostDepthCoverage` execution mode enabled.
Otherwise the `PostDepthCoverage` execution mode **must** not be used
when conservative rasterization is enabled.

If the `VkPhysicalDeviceConservativeRasterizationPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceConservativeRasterizationPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceConservativeRasterizationPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CONSERVATIVE_RASTERIZATION_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceFragmentDensityMapPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map
typedef struct VkPhysicalDeviceFragmentDensityMapPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         minFragmentDensityTexelSize;
    VkExtent2D         maxFragmentDensityTexelSize;
    VkBool32           fragmentDensityInvocations;
} VkPhysicalDeviceFragmentDensityMapPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `minFragmentDensityTexelSize`
is the minimum [fragment density    texel size](../appendices/glossary.html#glossary-fragment-density-texel-size).

* 
 `maxFragmentDensityTexelSize`
is the maximum fragment density texel size.

* 
 `fragmentDensityInvocations`
specifies whether the implementation **may** invoke additional fragment
shader invocations for each covered sample.

If the `VkPhysicalDeviceFragmentDensityMapPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMapPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMapPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map2
typedef struct VkPhysicalDeviceFragmentDensityMap2PropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           subsampledLoads;
    VkBool32           subsampledCoarseReconstructionEarlyAccess;
    uint32_t           maxSubsampledArrayLayers;
    uint32_t           maxDescriptorSetSubsampledSamplers;
} VkPhysicalDeviceFragmentDensityMap2PropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `subsampledLoads` specifies if performing
image data read with load operations on subsampled attachments will be
resampled to the fragment density of the render pass

* 

`subsampledCoarseReconstructionEarlyAccess` specifies if performing
image data read with samplers created with `flags` containing
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) in
fragment shader will trigger additional reads during
[VK_PIPELINE_STAGE_VERTEX_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
 `maxSubsampledArrayLayers` is
the maximum number of [VkImageView](resources.html#VkImageView) array layers for usages
supporting subsampled samplers

* 

`maxDescriptorSetSubsampledSamplers` is the maximum number of
subsampled samplers that **can** be included in a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout)

If the `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMap2PropertiesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMap2PropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_2_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map_offset
typedef struct VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         fragmentDensityOffsetGranularity;
} VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT;

// Provided by VK_QCOM_fragment_density_map_offset
// Equivalent to VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT
typedef VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT VkPhysicalDeviceFragmentDensityMapOffsetPropertiesQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`fragmentDensityOffsetGranularity` is the granularity for
[fragment density offsets](renderpass.html#renderpass-fragmentdensitymapoffsets).

If the `VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE` structure
is defined as:

// Provided by VK_VALVE_fragment_density_map_layered
typedef struct VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxFragmentDensityMapLayers;
} VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxFragmentDensityMapLayers`
is the maximum number of layers to use with a layered fragment density
map.

If the `VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_LAYERED_PROPERTIES_VALVE](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceTileMemoryHeapPropertiesQCOM` structure is defined
as:

// Provided by VK_QCOM_tile_memory_heap
typedef struct VkPhysicalDeviceTileMemoryHeapPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           queueSubmitBoundary;
    VkBool32           tileBufferTransfers;
} VkPhysicalDeviceTileMemoryHeapPropertiesQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `queueSubmitBoundary` is a boolean
describing if tile memory becomes **undefined** at a queue submit boundary
instead of the default command buffer submission batch boundary.

* 
 `tileBufferTransfers` is a boolean
describing if buffers bound to tile memory support transfer operations.

If the `VkPhysicalDeviceTileMemoryHeapPropertiesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTileMemoryHeapPropertiesQCOM-sType-sType) VUID-VkPhysicalDeviceTileMemoryHeapPropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_MEMORY_HEAP_PROPERTIES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderCorePropertiesAMD` structure is defined as:

// Provided by VK_AMD_shader_core_properties
typedef struct VkPhysicalDeviceShaderCorePropertiesAMD {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           shaderEngineCount;
    uint32_t           shaderArraysPerEngineCount;
    uint32_t           computeUnitsPerShaderArray;
    uint32_t           simdPerComputeUnit;
    uint32_t           wavefrontsPerSimd;
    uint32_t           wavefrontSize;
    uint32_t           sgprsPerSimd;
    uint32_t           minSgprAllocation;
    uint32_t           maxSgprAllocation;
    uint32_t           sgprAllocationGranularity;
    uint32_t           vgprsPerSimd;
    uint32_t           minVgprAllocation;
    uint32_t           maxVgprAllocation;
    uint32_t           vgprAllocationGranularity;
} VkPhysicalDeviceShaderCorePropertiesAMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderEngineCount` is an unsigned
integer value indicating the number of shader engines found inside the
shader core of the physical device.

* 
 `shaderArraysPerEngineCount`
is an unsigned integer value indicating the number of shader arrays
inside a shader engine.
Each shader array has its own scan converter, set of compute units, and
a render back end (color and depth attachments).
Shader arrays within a shader engine share shader processor input (wave
launcher) and shader export (export buffer) units.
Currently, a shader engine can have one or two shader arrays.

* 
 `computeUnitsPerShaderArray`
is an unsigned integer value indicating the physical number of compute
units within a shader array.
The active number of compute units in a shader array **may** be lower.
A compute unit houses a set of SIMDs along with a sequencer module and a
local data store.

* 
 `simdPerComputeUnit` is an unsigned
integer value indicating the number of SIMDs inside a compute unit.
Each SIMD processes a single instruction at a time.

* 
 `wavefrontSize` is an unsigned integer
value indicating the maximum size of a subgroup.

* 
 `sgprsPerSimd` is an unsigned integer value
indicating the number of physical Scalar General-Purpose Registers
(SGPRs) per SIMD.

* 
 `minSgprAllocation` is an unsigned
integer value indicating the minimum number of SGPRs allocated for a
wave.

* 
 `maxSgprAllocation` is an unsigned
integer value indicating the maximum number of SGPRs allocated for a
wave.

* 
 `sgprAllocationGranularity` is
an unsigned integer value indicating the granularity of SGPR allocation
for a wave.

* 
 `vgprsPerSimd` is an unsigned integer value
indicating the number of physical Vector General-Purpose Registers
(VGPRs) per SIMD.

* 
 `minVgprAllocation` is an unsigned
integer value indicating the minimum number of VGPRs allocated for a
wave.

* 
 `maxVgprAllocation` is an unsigned
integer value indicating the maximum number of VGPRs allocated for a
wave.

* 
 `vgprAllocationGranularity` is
an unsigned integer value indicating the granularity of VGPR allocation
for a wave.

If the `VkPhysicalDeviceShaderCorePropertiesAMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderCorePropertiesAMD-sType-sType) VUID-VkPhysicalDeviceShaderCorePropertiesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_AMD](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderCoreProperties2AMD` structure is defined as:

// Provided by VK_AMD_shader_core_properties2
typedef struct VkPhysicalDeviceShaderCoreProperties2AMD {
    VkStructureType                   sType;
    void*                             pNext;
    VkShaderCorePropertiesFlagsAMD    shaderCoreFeatures;
    uint32_t                          activeComputeUnitCount;
} VkPhysicalDeviceShaderCoreProperties2AMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderCoreFeatures` is a bitmask of
[VkShaderCorePropertiesFlagBitsAMD](#VkShaderCorePropertiesFlagBitsAMD) indicating the set of features
supported by the shader core.

* 
 `activeComputeUnitCount` is an
unsigned integer value indicating the number of compute units that have
been enabled.

If the `VkPhysicalDeviceShaderCoreProperties2AMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderCoreProperties2AMD-sType-sType) VUID-VkPhysicalDeviceShaderCoreProperties2AMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_2_AMD](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

Bits for this type **may** be defined by future extensions, or new versions of
the `[VK_AMD_shader_core_properties2](../appendices/extensions.html#VK_AMD_shader_core_properties2)` extension.
Possible values of the `flags` member of
[VkShaderCorePropertiesFlagsAMD](#VkShaderCorePropertiesFlagsAMD) are:

// Provided by VK_AMD_shader_core_properties2
typedef enum VkShaderCorePropertiesFlagBitsAMD {
} VkShaderCorePropertiesFlagBitsAMD;

// Provided by VK_AMD_shader_core_properties2
typedef VkFlags VkShaderCorePropertiesFlagsAMD;

`VkShaderCorePropertiesFlagsAMD` is a bitmask type for providing zero or
more [VkShaderCorePropertiesFlagBitsAMD](#VkShaderCorePropertiesFlagBitsAMD).

The `VkPhysicalDeviceDepthStencilResolveProperties` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceDepthStencilResolveProperties {
    VkStructureType       sType;
    void*                 pNext;
    VkResolveModeFlags    supportedDepthResolveModes;
    VkResolveModeFlags    supportedStencilResolveModes;
    VkBool32              independentResolveNone;
    VkBool32              independentResolve;
} VkPhysicalDeviceDepthStencilResolveProperties;

// Provided by VK_KHR_depth_stencil_resolve
// Equivalent to VkPhysicalDeviceDepthStencilResolveProperties
typedef VkPhysicalDeviceDepthStencilResolveProperties VkPhysicalDeviceDepthStencilResolvePropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`supportedDepthResolveModes` is a bitmask of
[VkResolveModeFlagBits](renderpass.html#VkResolveModeFlagBits) indicating the set of supported depth
resolve modes.
[VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](renderpass.html#VkResolveModeFlagBitsKHR) **must** be included in the set but
implementations **may** support additional modes.

* 

`supportedStencilResolveModes` is a bitmask of
[VkResolveModeFlagBits](renderpass.html#VkResolveModeFlagBits) indicating the set of supported stencil
resolve modes.
[VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](renderpass.html#VkResolveModeFlagBitsKHR) **must** be included in the set but
implementations **may** support additional modes.
[VK_RESOLVE_MODE_AVERAGE_BIT](renderpass.html#VkResolveModeFlagBitsKHR) **must** not be included in the set.

* 

`independentResolveNone` is [VK_TRUE](fundamentals.html#VK_TRUE) if the implementation
supports setting the depth and stencil resolve modes to different values
when one of those modes is [VK_RESOLVE_MODE_NONE](renderpass.html#VkResolveModeFlagBitsKHR).
Otherwise the implementation only supports setting both modes to the
same value.

* 
 `independentResolve`
is [VK_TRUE](fundamentals.html#VK_TRUE) if the implementation supports all combinations of the
supported depth and stencil resolve modes, including setting either
depth or stencil resolve mode to [VK_RESOLVE_MODE_NONE](renderpass.html#VkResolveModeFlagBitsKHR).
An implementation that supports `independentResolve` **must** also
support `independentResolveNone`.

If the `VkPhysicalDeviceDepthStencilResolveProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDepthStencilResolveProperties-sType-sType) VUID-VkPhysicalDeviceDepthStencilResolveProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_STENCIL_RESOLVE_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDevicePerformanceQueryPropertiesKHR` structure is defined
as:

// Provided by VK_KHR_performance_query
typedef struct VkPhysicalDevicePerformanceQueryPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           allowCommandBufferQueryCopies;
} VkPhysicalDevicePerformanceQueryPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allowCommandBufferQueryCopies` is [VK_TRUE](fundamentals.html#VK_TRUE) if the performance
query pools are allowed to be used with [vkCmdCopyQueryPoolResults](queries.html#vkCmdCopyQueryPoolResults).

If the `VkPhysicalDevicePerformanceQueryPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePerformanceQueryPropertiesKHR-sType-sType) VUID-VkPhysicalDevicePerformanceQueryPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_QUERY_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShadingRateImagePropertiesNV` structure is defined
as:

// Provided by VK_NV_shading_rate_image
typedef struct VkPhysicalDeviceShadingRateImagePropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         shadingRateTexelSize;
    uint32_t           shadingRatePaletteSize;
    uint32_t           shadingRateMaxCoarseSamples;
} VkPhysicalDeviceShadingRateImagePropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shadingRateTexelSize` indicates the
width and height of the portion of the framebuffer corresponding to each
texel in the shading rate image.

* 
 `shadingRatePaletteSize` indicates
the maximum number of palette entries supported for the shading rate
image.

* 
 `shadingRateMaxCoarseSamples`
specifies the maximum number of coverage samples supported in a single
fragment.
If the product of the fragment size derived from the base shading rate
and the number of coverage samples per pixel exceeds this limit, the
final shading rate will be adjusted so that its product does not exceed
the limit.

If the `VkPhysicalDeviceShadingRateImagePropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These properties are related to the [shading rate image](primsrast.html#primsrast-shading-rate-image) feature.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShadingRateImagePropertiesNV-sType-sType) VUID-VkPhysicalDeviceShadingRateImagePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADING_RATE_IMAGE_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMemoryDecompressionPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_memory_decompression
typedef struct VkPhysicalDeviceMemoryDecompressionPropertiesEXT {
    VkStructureType                        sType;
    void*                                  pNext;
    VkMemoryDecompressionMethodFlagsEXT    decompressionMethods;
    uint64_t                               maxDecompressionIndirectCount;
} VkPhysicalDeviceMemoryDecompressionPropertiesEXT;

// Provided by VK_NV_memory_decompression
// Equivalent to VkPhysicalDeviceMemoryDecompressionPropertiesEXT
typedef VkPhysicalDeviceMemoryDecompressionPropertiesEXT VkPhysicalDeviceMemoryDecompressionPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`decompressionMethods` is a bitmask of
[VkMemoryDecompressionMethodFlagBitsEXT](memory_decompression.html#VkMemoryDecompressionMethodFlagBitsEXT) specifying memory
decompression methods supported by the implementation.

* 
`maxDecompressionIndirectCount` specifies the maximum supported
count value identified by either
[vkCmdDecompressMemoryIndirectCountEXT](memory_decompression.html#vkCmdDecompressMemoryIndirectCountEXT)::`maxDecompressionCount`
or the value specified in
[vkCmdDecompressMemoryIndirectCountEXT](memory_decompression.html#vkCmdDecompressMemoryIndirectCountEXT)::`indirectCommandsCountAddress`

If [`memoryDecompression`](features.html#features-memoryDecompression) feature is
supported, `decompressionMethods` **must** have at least one bit set.

If the `VkPhysicalDeviceMemoryDecompressionPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMemoryDecompressionPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceMemoryDecompressionPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceTransformFeedbackPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_transform_feedback
typedef struct VkPhysicalDeviceTransformFeedbackPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxTransformFeedbackStreams;
    uint32_t           maxTransformFeedbackBuffers;
    VkDeviceSize       maxTransformFeedbackBufferSize;
    uint32_t           maxTransformFeedbackStreamDataSize;
    uint32_t           maxTransformFeedbackBufferDataSize;
    uint32_t           maxTransformFeedbackBufferDataStride;
    VkBool32           transformFeedbackQueries;
    VkBool32           transformFeedbackStreamsLinesTriangles;
    VkBool32           transformFeedbackRasterizationStreamSelect;
    VkBool32           transformFeedbackDraw;
} VkPhysicalDeviceTransformFeedbackPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxTransformFeedbackStreams`
is the maximum number of vertex streams that can be output from geometry
shaders declared with the `GeometryStreams` capability.
If the implementation does not support
`VkPhysicalDeviceTransformFeedbackFeaturesEXT`::`geometryStreams`
then `maxTransformFeedbackStreams` **must** be `1`.

* 
 `maxTransformFeedbackBuffers`
is the maximum number of transform feedback buffers that can be bound
for capturing shader outputs from the last
[pre-rasterization shader    stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization).

* 

`maxTransformFeedbackBufferSize` is the maximum size that can be
specified when binding a buffer for transform feedback in
[vkCmdBindTransformFeedbackBuffersEXT](vertexpostproc.html#vkCmdBindTransformFeedbackBuffersEXT).

* 

`maxTransformFeedbackStreamDataSize` is the maximum amount of data
in bytes for each vertex that captured to one or more transform feedback
buffers associated with a specific vertex stream.

* 

`maxTransformFeedbackBufferDataSize` is the maximum amount of data
in bytes for each vertex that can be captured to a specific transform
feedback buffer.

* 

`maxTransformFeedbackBufferDataStride` is the maximum stride between
each capture of vertex data to the buffer.

* 
 `transformFeedbackQueries` is
[VK_TRUE](fundamentals.html#VK_TRUE) if the implementation supports the
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](queries.html#VkQueryType) query type.
`transformFeedbackQueries` is [VK_FALSE](fundamentals.html#VK_FALSE) if queries of this type
**cannot** be created.

* 

`transformFeedbackStreamsLinesTriangles` is [VK_TRUE](fundamentals.html#VK_TRUE) if the
implementation supports the geometry shader `OpExecutionMode` of
`OutputLineStrip` and `OutputTriangleStrip` in addition to
`OutputPoints` when more than one vertex stream is output.
If `transformFeedbackStreamsLinesTriangles` is [VK_FALSE](fundamentals.html#VK_FALSE) the
implementation only supports an `OpExecutionMode` of
`OutputPoints` when more than one vertex stream is output from the
geometry shader.

* 

`transformFeedbackRasterizationStreamSelect` is [VK_TRUE](fundamentals.html#VK_TRUE) if the
implementation supports the `GeometryStreams` SPIR-V capability and
the application can use
[VkPipelineRasterizationStateStreamCreateInfoEXT](primsrast.html#VkPipelineRasterizationStateStreamCreateInfoEXT) to modify which
vertex stream output is used for rasterization.
Otherwise vertex stream `0` **must** always be used for rasterization.

* 
 `transformFeedbackDraw` is
[VK_TRUE](fundamentals.html#VK_TRUE) if the implementation supports the
[vkCmdDrawIndirectByteCountEXT](drawing.html#vkCmdDrawIndirectByteCountEXT) function otherwise the function
**must** not be called.

If the `VkPhysicalDeviceTransformFeedbackPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTransformFeedbackPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceTransformFeedbackPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TRANSFORM_FEEDBACK_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceCopyMemoryIndirectPropertiesNV` structure is
defined as:

// Provided by VK_KHR_copy_memory_indirect
typedef struct VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkQueueFlags       supportedQueues;
} VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR;

// Provided by VK_NV_copy_memory_indirect
// Equivalent to VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR
typedef VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR VkPhysicalDeviceCopyMemoryIndirectPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`supportedQueues` is a bitmask of [VkQueueFlagBits](devsandqueues.html#VkQueueFlagBits) indicating
the types of queues on which [indirect copy commands](copies.html#indirect-copies)
are supported.
If a queue family supports any of the bits set in `supportedQueues`,
then it **must** support at least one [indirect copy    command](copies.html#indirect-copies).

If the [`indirectMemoryCopy`](features.html#features-indirectMemoryCopy) or
[`indirectMemoryToImageCopy`](features.html#features-indirectMemoryToImageCopy)
feature is supported, `supportedQueues` **must** return at least one
supported queue type.

If the `VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceRayTracingPropertiesNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkPhysicalDeviceRayTracingPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           shaderGroupHandleSize;
    uint32_t           maxRecursionDepth;
    uint32_t           maxShaderGroupStride;
    uint32_t           shaderGroupBaseAlignment;
    uint64_t           maxGeometryCount;
    uint64_t           maxInstanceCount;
    uint64_t           maxTriangleCount;
    uint32_t           maxDescriptorSetAccelerationStructures;
} VkPhysicalDeviceRayTracingPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderGroupHandleSize` is the size in bytes of the shader header.

* 
 `maxRecursionDepth` is the maximum
number of levels of recursion allowed in a trace command.

* 
`maxShaderGroupStride` is the maximum stride in bytes allowed
between shader groups in the shader binding table.

* 
`shaderGroupBaseAlignment` is the **required** alignment in bytes for
the base of the shader binding table.

* 
`maxGeometryCount` is the maximum number of geometries in the bottom
level acceleration structure.

* 
`maxInstanceCount` is the maximum number of instances in the top
level acceleration structure.

* 
`maxTriangleCount` is the maximum number of triangles in all
geometries in the bottom level acceleration structure.

* 
`maxDescriptorSetAccelerationStructures` is the maximum number of
acceleration structure descriptors that are allowed in a descriptor set.

Due to the fact that the geometry, instance, and triangle counts are
specified at acceleration structure creation as 32-bit values,
`maxGeometryCount`, `maxInstanceCount`, and `maxTriangleCount`
**must** not exceed 232-1.

If the `VkPhysicalDeviceRayTracingPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Limits specified by this structure **must** match those specified with the same
name in [VkPhysicalDeviceAccelerationStructurePropertiesKHR](#VkPhysicalDeviceAccelerationStructurePropertiesKHR) and
[VkPhysicalDeviceRayTracingPipelinePropertiesKHR](#VkPhysicalDeviceRayTracingPipelinePropertiesKHR).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingPropertiesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceAccelerationStructurePropertiesKHR` structure is
defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkPhysicalDeviceAccelerationStructurePropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           maxGeometryCount;
    uint64_t           maxInstanceCount;
    uint64_t           maxPrimitiveCount;
    uint32_t           maxPerStageDescriptorAccelerationStructures;
    uint32_t           maxPerStageDescriptorUpdateAfterBindAccelerationStructures;
    uint32_t           maxDescriptorSetAccelerationStructures;
    uint32_t           maxDescriptorSetUpdateAfterBindAccelerationStructures;
    uint32_t           minAccelerationStructureScratchOffsetAlignment;
} VkPhysicalDeviceAccelerationStructurePropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxGeometryCount` is the maximum number
of geometries in the bottom level acceleration structure.

* 
 `maxInstanceCount` is the maximum number
of instances in the top level acceleration structure.

* 
 `maxPrimitiveCount` is the maximum
number of triangles or AABBs in all geometries in the bottom level
acceleration structure.

* 

`maxPerStageDescriptorAccelerationStructures` is the maximum number
of acceleration structure bindings that **can** be accessible to a single
shader stage in a pipeline layout.
Descriptor bindings with a descriptor type of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptor bindings in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.

* 

`maxPerStageDescriptorUpdateAfterBindAccelerationStructures` is
similar to `maxPerStageDescriptorAccelerationStructures` but counts
descriptor bindings from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetAccelerationStructures` is the maximum number of
acceleration structure descriptors that **can** be included in descriptor
bindings in a pipeline layout across all pipeline shader stages and
descriptor set numbers.
Descriptor bindings with a descriptor type of
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptorsets.html#VkDescriptorType) count against this
limit.
Only descriptor bindings in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.

* 

`maxDescriptorSetUpdateAfterBindAccelerationStructures` is similar
to `maxDescriptorSetAccelerationStructures` but counts descriptor
bindings from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`minAccelerationStructureScratchOffsetAlignment` is the minimum
**required** alignment, in bytes, for scratch data passed in to an
acceleration structure build command.
The value **must** be a power of two.

Due to the fact that the geometry, instance, and primitive counts are
specified at acceleration structure creation as 32-bit values,
[`maxGeometryCount`](#limits-maxGeometryCount),
[`maxInstanceCount`](#limits-maxInstanceCount), and
[`maxPrimitiveCount`](#limits-maxPrimitiveCount) **must** not exceed
232-1.

If the `VkPhysicalDeviceAccelerationStructurePropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Limits specified by this structure **must** match those specified with the same
name in [VkPhysicalDeviceRayTracingPropertiesNV](#VkPhysicalDeviceRayTracingPropertiesNV).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceAccelerationStructurePropertiesKHR-sType-sType) VUID-VkPhysicalDeviceAccelerationStructurePropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ACCELERATION_STRUCTURE_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceRayTracingPipelinePropertiesKHR` structure is
defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkPhysicalDeviceRayTracingPipelinePropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           shaderGroupHandleSize;
    uint32_t           maxRayRecursionDepth;
    uint32_t           maxShaderGroupStride;
    uint32_t           shaderGroupBaseAlignment;
    uint32_t           shaderGroupHandleCaptureReplaySize;
    uint32_t           maxRayDispatchInvocationCount;
    uint32_t           shaderGroupHandleAlignment;
    uint32_t           maxRayHitAttributeSize;
} VkPhysicalDeviceRayTracingPipelinePropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderGroupHandleSize` is the size in bytes of the shader header.

* 
 `maxRayRecursionDepth` is the
maximum number of levels of ray recursion allowed in a trace command.

* 
 `maxShaderGroupStride` is the
maximum stride in bytes allowed between shader groups in the shader
binding table.

* 
`shaderGroupBaseAlignment` is the **required** alignment in bytes for
the base of the shader binding table.

* 
`shaderGroupHandleCaptureReplaySize` is the number of bytes for the
information required to do capture and replay for shader group handles.

* 
`maxRayDispatchInvocationCount` is the maximum number of ray
generation shader invocations which **may** be produced by a single
[vkCmdTraceRaysIndirectKHR](raytracing.html#vkCmdTraceRaysIndirectKHR) or [vkCmdTraceRaysKHR](raytracing.html#vkCmdTraceRaysKHR) command.

* 
`shaderGroupHandleAlignment` is the **required** alignment in bytes for
each entry in a shader binding table.
The value **must** be a power of two.

* 
`maxRayHitAttributeSize` is the maximum size in bytes for a ray
attribute structure

If the `VkPhysicalDeviceRayTracingPipelinePropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Limits specified by this structure **must** match those specified with the same
name in [VkPhysicalDeviceRayTracingPropertiesNV](#VkPhysicalDeviceRayTracingPropertiesNV).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingPipelinePropertiesKHR-sType-sType) VUID-VkPhysicalDeviceRayTracingPipelinePropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PIPELINE_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceCooperativeMatrixPropertiesNV` structure is defined
as:

// Provided by VK_NV_cooperative_matrix
typedef struct VkPhysicalDeviceCooperativeMatrixPropertiesNV {
    VkStructureType       sType;
    void*                 pNext;
    VkShaderStageFlags    cooperativeMatrixSupportedStages;
} VkPhysicalDeviceCooperativeMatrixPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeMatrixSupportedStages` is a bitfield of
[VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) describing the shader stages that
cooperative matrix instructions are supported in.
`cooperativeMatrixSupportedStages` will have the
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) bit set if any of the physical
device’s queues support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).

If the `VkPhysicalDeviceCooperativeMatrixPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixPropertiesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrixPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceCooperativeMatrixPropertiesKHR` structure is
defined as:

// Provided by VK_KHR_cooperative_matrix
typedef struct VkPhysicalDeviceCooperativeMatrixPropertiesKHR {
    VkStructureType       sType;
    void*                 pNext;
    VkShaderStageFlags    cooperativeMatrixSupportedStages;
} VkPhysicalDeviceCooperativeMatrixPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeMatrixSupportedStages` is a bitfield of
[VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) describing the shader stages that
cooperative matrix instructions are supported in.
`cooperativeMatrixSupportedStages` will have the
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) bit set if any of the physical
device’s queues support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).

`cooperativeMatrixSupportedStages` **must** not have any bits other than
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) set.

If the `VkPhysicalDeviceCooperativeMatrixPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrixPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrixPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceCooperativeMatrix2PropertiesNV` structure is
defined as:

// Provided by VK_NV_cooperative_matrix2
typedef struct VkPhysicalDeviceCooperativeMatrix2PropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           cooperativeMatrixWorkgroupScopeMaxWorkgroupSize;
    uint32_t           cooperativeMatrixFlexibleDimensionsMaxDimension;
    uint32_t           cooperativeMatrixWorkgroupScopeReservedSharedMemory;
} VkPhysicalDeviceCooperativeMatrix2PropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeMatrixWorkgroupScopeMaxWorkgroupSize` is the maximum
number of invocations in a workgroup when the module uses
`OpTypeCooperativeMatrixKHR` with `Scope` equal to `Workgroup`.

* 

`cooperativeMatrixFlexibleDimensionsMaxDimension` is the maximum
supported dimension for cooperative matrix types when the
[`cooperativeMatrixFlexibleDimensions`](features.html#features-cooperativeMatrixFlexibleDimensions)
feature is enabled.

* 

`cooperativeMatrixWorkgroupScopeReservedSharedMemory` is the number
of bytes of shared memory reserved for the implementation when the
module uses `OpTypeCooperativeMatrixKHR` with `Scope` equal to
`Workgroup`.

If the `VkPhysicalDeviceCooperativeMatrix2PropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeMatrix2PropertiesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeMatrix2PropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_2_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceCooperativeVectorPropertiesNV` structure is defined
as:

// Provided by VK_NV_cooperative_vector
typedef struct VkPhysicalDeviceCooperativeVectorPropertiesNV {
    VkStructureType       sType;
    void*                 pNext;
    VkShaderStageFlags    cooperativeVectorSupportedStages;
    VkBool32              cooperativeVectorTrainingFloat16Accumulation;
    VkBool32              cooperativeVectorTrainingFloat32Accumulation;
    uint32_t              maxCooperativeVectorComponents;
} VkPhysicalDeviceCooperativeVectorPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`cooperativeVectorSupportedStages` is a bitfield of
[VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) describing the shader stages that
cooperative vector instructions are supported in.
`cooperativeVectorSupportedStages` will have the
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) bit set if any of the physical
device’s queues support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).

* 

`cooperativeVectorTrainingFloat16Accumulation` is [VK_TRUE](fundamentals.html#VK_TRUE) if
the implementation supports cooperative vector training functions
accumulating 16-bit floating-point results.

* 

`cooperativeVectorTrainingFloat32Accumulation` is [VK_TRUE](fundamentals.html#VK_TRUE) if
the implementation supports cooperative vector training functions
accumulating 32-bit floating-point results.

* 

`maxCooperativeVectorComponents` indicates the maximum number of
components that **can** be in a cooperative vector.

If the `VkPhysicalDeviceCooperativeVectorPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCooperativeVectorPropertiesNV-sType-sType) VUID-VkPhysicalDeviceCooperativeVectorPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_VECTOR_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderLongVectorPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_shader_long_vector
typedef struct VkPhysicalDeviceShaderLongVectorPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVectorComponents;
} VkPhysicalDeviceShaderLongVectorPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxVectorComponents` indicates the
maximum number of components that **can** be in a vector type.

If the `VkPhysicalDeviceShaderLongVectorPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderLongVectorPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceShaderLongVectorPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_LONG_VECTOR_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderSMBuiltinsPropertiesNV` structure is defined
as:

// Provided by VK_NV_shader_sm_builtins
typedef struct VkPhysicalDeviceShaderSMBuiltinsPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           shaderSMCount;
    uint32_t           shaderWarpsPerSM;
} VkPhysicalDeviceShaderSMBuiltinsPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderSMCount` is the number of SMs on the
device.

* 
 `shaderWarpsPerSM` is the maximum number
of simultaneously executing warps on an SM.

If the `VkPhysicalDeviceShaderSMBuiltinsPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderSMBuiltinsPropertiesNV-sType-sType) VUID-VkPhysicalDeviceShaderSMBuiltinsPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SM_BUILTINS_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceTexelBufferAlignmentProperties` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceTexelBufferAlignmentProperties {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       storageTexelBufferOffsetAlignmentBytes;
    VkBool32           storageTexelBufferOffsetSingleTexelAlignment;
    VkDeviceSize       uniformTexelBufferOffsetAlignmentBytes;
    VkBool32           uniformTexelBufferOffsetSingleTexelAlignment;
} VkPhysicalDeviceTexelBufferAlignmentProperties;

// Provided by VK_EXT_texel_buffer_alignment
// Equivalent to VkPhysicalDeviceTexelBufferAlignmentProperties
typedef VkPhysicalDeviceTexelBufferAlignmentProperties VkPhysicalDeviceTexelBufferAlignmentPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`storageTexelBufferOffsetAlignmentBytes` is a byte alignment that is
sufficient for a storage texel buffer of any format.
The value **must** be a power of two.

* 

`storageTexelBufferOffsetSingleTexelAlignment` indicates whether
single texel alignment is sufficient for a storage texel buffer of any
format.

* 

`uniformTexelBufferOffsetAlignmentBytes` is a byte alignment that is
sufficient for a uniform texel buffer of any format.
The value **must** be a power of two.

* 

`uniformTexelBufferOffsetSingleTexelAlignment` indicates whether
single texel alignment is sufficient for a uniform texel buffer of any
format.

If the `VkPhysicalDeviceTexelBufferAlignmentProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

If the single texel alignment property is [VK_FALSE](fundamentals.html#VK_FALSE), then the buffer
view’s offset **must** be aligned to the corresponding byte alignment value.
If the single texel alignment property is [VK_TRUE](fundamentals.html#VK_TRUE), then the buffer
view’s offset **must** be aligned to the lesser of the corresponding byte
alignment value or the size of a single texel, based on
[VkBufferViewCreateInfo](resources.html#VkBufferViewCreateInfo)::`format`.
If the size of a single texel is a multiple of three bytes, then the size of
a single component of the format is used instead.

These limits **must** not advertise a larger alignment than the
[required](#limits-required) maximum minimum value of
[VkPhysicalDeviceLimits](#VkPhysicalDeviceLimits)::`minTexelBufferOffsetAlignment`, for any
format that supports use as a texel buffer.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTexelBufferAlignmentProperties-sType-sType) VUID-VkPhysicalDeviceTexelBufferAlignmentProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceTimelineSemaphoreProperties` structure is defined
as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceTimelineSemaphoreProperties {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           maxTimelineSemaphoreValueDifference;
} VkPhysicalDeviceTimelineSemaphoreProperties;

// Provided by VK_KHR_timeline_semaphore
// Equivalent to VkPhysicalDeviceTimelineSemaphoreProperties
typedef VkPhysicalDeviceTimelineSemaphoreProperties VkPhysicalDeviceTimelineSemaphorePropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxTimelineSemaphoreValueDifference` indicates the maximum
difference allowed by the implementation between the current value of a
timeline semaphore and any pending signal or wait operations.

If the `VkPhysicalDeviceTimelineSemaphoreProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTimelineSemaphoreProperties-sType-sType) VUID-VkPhysicalDeviceTimelineSemaphoreProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceLineRasterizationProperties` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceLineRasterizationProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           lineSubPixelPrecisionBits;
} VkPhysicalDeviceLineRasterizationProperties;

// Provided by VK_KHR_line_rasterization
// Equivalent to VkPhysicalDeviceLineRasterizationProperties
typedef VkPhysicalDeviceLineRasterizationProperties VkPhysicalDeviceLineRasterizationPropertiesKHR;

// Provided by VK_EXT_line_rasterization
// Equivalent to VkPhysicalDeviceLineRasterizationProperties
typedef VkPhysicalDeviceLineRasterizationProperties VkPhysicalDeviceLineRasterizationPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`lineSubPixelPrecisionBits` is the number of bits of subpixel
precision in framebuffer coordinates xf and yf when
rasterizing [line segments](primsrast.html#primsrast-lines).

If the `VkPhysicalDeviceLineRasterizationProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLineRasterizationProperties-sType-sType) VUID-VkPhysicalDeviceLineRasterizationProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceRobustness2PropertiesKHR` structure is defined as:

// Provided by VK_KHR_robustness2
typedef struct VkPhysicalDeviceRobustness2PropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       robustStorageBufferAccessSizeAlignment;
    VkDeviceSize       robustUniformBufferAccessSizeAlignment;
} VkPhysicalDeviceRobustness2PropertiesKHR;

// Provided by VK_EXT_robustness2
// Equivalent to VkPhysicalDeviceRobustness2PropertiesKHR
typedef VkPhysicalDeviceRobustness2PropertiesKHR VkPhysicalDeviceRobustness2PropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`robustStorageBufferAccessSizeAlignment` is the number of bytes that
the range of a storage buffer descriptor is rounded up to when used for
bounds-checking when the [    `robustBufferAccess2`](features.html#features-robustBufferAccess2) feature is enabled.
This value **must** be either 1 or 4.

* 

`robustUniformBufferAccessSizeAlignment` is the number of bytes that
the range of a uniform buffer descriptor is rounded up to when used for
bounds-checking when the [    `robustBufferAccess2`](features.html#features-robustBufferAccess2) feature is enabled.
This value **must** be a power of two in the range [1, 256].

If the `VkPhysicalDeviceRobustness2PropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRobustness2PropertiesKHR-sType-sType) VUID-VkPhysicalDeviceRobustness2PropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV` structure is
defined as:

// Provided by VK_NV_device_generated_commands
typedef struct VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxGraphicsShaderGroupCount;
    uint32_t           maxIndirectSequenceCount;
    uint32_t           maxIndirectCommandsTokenCount;
    uint32_t           maxIndirectCommandsStreamCount;
    uint32_t           maxIndirectCommandsTokenOffset;
    uint32_t           maxIndirectCommandsStreamStride;
    uint32_t           minSequencesCountBufferOffsetAlignment;
    uint32_t           minSequencesIndexBufferOffsetAlignment;
    uint32_t           minIndirectCommandsBufferOffsetAlignment;
} VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxGraphicsShaderGroupCount` is the maximum number of shader groups
in [VkGraphicsPipelineShaderGroupsCreateInfoNV](pipelines.html#VkGraphicsPipelineShaderGroupsCreateInfoNV).

* 
`maxIndirectSequenceCount` is the maximum number of sequences in
[VkGeneratedCommandsInfoNV](device_generated_commands/generatedcommands.html#VkGeneratedCommandsInfoNV) and in
[VkGeneratedCommandsMemoryRequirementsInfoNV](device_generated_commands/generatedcommands.html#VkGeneratedCommandsMemoryRequirementsInfoNV).

* 
`maxIndirectCommandsTokenCount` is the maximum number of tokens in
[VkIndirectCommandsLayoutCreateInfoNV](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoNV).

* 
`maxIndirectCommandsStreamCount` is the maximum number of streams in
[VkIndirectCommandsLayoutCreateInfoNV](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoNV).

* 
`maxIndirectCommandsTokenOffset` is the maximum offset in
[VkIndirectCommandsLayoutTokenNV](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutTokenNV).

* 
`maxIndirectCommandsStreamStride` is the maximum stream stride in
[VkIndirectCommandsLayoutCreateInfoNV](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoNV).

* 
`minSequencesCountBufferOffsetAlignment` is the minimum alignment
for memory addresses which **can** be used in
[VkGeneratedCommandsInfoNV](device_generated_commands/generatedcommands.html#VkGeneratedCommandsInfoNV).

* 
`minSequencesIndexBufferOffsetAlignment` is the minimum alignment
for memory addresses which **can** be used in
[VkGeneratedCommandsInfoNV](device_generated_commands/generatedcommands.html#VkGeneratedCommandsInfoNV).

* 
`minIndirectCommandsBufferOffsetAlignment` is the minimum alignment
for memory addresses used in [VkIndirectCommandsStreamNV](device_generated_commands/generatedcommands.html#VkIndirectCommandsStreamNV), and as
preprocess buffer in [VkGeneratedCommandsInfoNV](device_generated_commands/generatedcommands.html#VkGeneratedCommandsInfoNV).

If the `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV-sType-sType) VUID-VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_device_generated_commands
typedef struct VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT {
    VkStructureType                        sType;
    void*                                  pNext;
    uint32_t                               maxIndirectPipelineCount;
    uint32_t                               maxIndirectShaderObjectCount;
    uint32_t                               maxIndirectSequenceCount;
    uint32_t                               maxIndirectCommandsTokenCount;
    uint32_t                               maxIndirectCommandsTokenOffset;
    uint32_t                               maxIndirectCommandsIndirectStride;
    VkIndirectCommandsInputModeFlagsEXT    supportedIndirectCommandsInputModes;
    VkShaderStageFlags                     supportedIndirectCommandsShaderStages;
    VkShaderStageFlags                     supportedIndirectCommandsShaderStagesPipelineBinding;
    VkShaderStageFlags                     supportedIndirectCommandsShaderStagesShaderBinding;
    VkBool32                               deviceGeneratedCommandsTransformFeedback;
    VkBool32                               deviceGeneratedCommandsMultiDrawIndirectCount;
} VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxIndirectPipelineCount` is
the maximum number of pipelines passed to
[vkCreateIndirectExecutionSetEXT](device_generated_commands/generatedcommands.html#vkCreateIndirectExecutionSetEXT).

* 

`maxIndirectShaderObjectCount` is the maximum number of shader
objects passed to [vkCreateIndirectExecutionSetEXT](device_generated_commands/generatedcommands.html#vkCreateIndirectExecutionSetEXT).
If this value is zero, binding shader objects indirectly is not
supported.

* 
 `maxIndirectSequenceCount` is
the maximum number of sequences in [VkGeneratedCommandsInfoEXT](device_generated_commands/generatedcommands.html#VkGeneratedCommandsInfoEXT) and
in [VkGeneratedCommandsMemoryRequirementsInfoEXT](device_generated_commands/generatedcommands.html#VkGeneratedCommandsMemoryRequirementsInfoEXT).

* 

`maxIndirectCommandsTokenCount` is the maximum number of tokens in
[VkIndirectCommandsLayoutCreateInfoEXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoEXT).

* 

`maxIndirectCommandsTokenOffset` is the maximum offset in
[VkIndirectCommandsLayoutTokenEXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutTokenEXT).

* 

`maxIndirectCommandsIndirectStride` is the maximum stream stride in
[VkIndirectCommandsLayoutCreateInfoEXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutCreateInfoEXT).

* 

`supportedIndirectCommandsInputModes` indicates the supported input
modes.

* 

`supportedIndirectCommandsShaderStages` indicates the stages which
**can** be used to generate indirect commands.
Implementations are required to support, at minimum:
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits), [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits),
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits).

* 

`supportedIndirectCommandsShaderStagesPipelineBinding` indicates the
stages which **can** be used within indirect execution sets for indirectly
binding shader stages using pipelines.

* 

`supportedIndirectCommandsShaderStagesShaderBinding` indicates the
stages which **can** be used within indirect execution sets for indirectly
binding shader stages using shader objects.

* 

`deviceGeneratedCommandsTransformFeedback` indicates whether the
implementation supports interactions with
`[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` for pipelines not created with
[VK_PIPELINE_CREATE_2_INDIRECT_BINDABLE_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR).

* 

`deviceGeneratedCommandsMultiDrawIndirectCount` indicates whether
the implementation supports COUNT variants of multi-draw indirect
tokens.

If the `VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDevicePortabilitySubsetPropertiesKHR` structure is
defined as:

// Provided by VK_KHR_portability_subset
typedef struct VkPhysicalDevicePortabilitySubsetPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           minVertexInputBindingStrideAlignment;
} VkPhysicalDevicePortabilitySubsetPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`minVertexInputBindingStrideAlignment` indicates the minimum
alignment for vertex input strides.
[VkVertexInputBindingDescription](fxvertex.html#VkVertexInputBindingDescription)::`stride` **must** be a multiple
of, and at least as large as, this value.
The value **must** be a power of two.

If the `VkPhysicalDevicePortabilitySubsetPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePortabilitySubsetPropertiesKHR-sType-sType) VUID-VkPhysicalDevicePortabilitySubsetPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PORTABILITY_SUBSET_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV`
structure is defined as:

// Provided by VK_NV_partitioned_acceleration_structure
typedef struct VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxPartitionCount;
} VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxPartitionCount` indicates the
maximum number of partitions allowed in a partitioned acceleration
structure.

If the `VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV-sType-sType) VUID-VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PARTITIONED_ACCELERATION_STRUCTURE_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceClusterAccelerationStructurePropertiesNV` structure
is defined as:

// Provided by VK_NV_cluster_acceleration_structure
typedef struct VkPhysicalDeviceClusterAccelerationStructurePropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxVerticesPerCluster;
    uint32_t           maxTrianglesPerCluster;
    uint32_t           clusterScratchByteAlignment;
    uint32_t           clusterByteAlignment;
    uint32_t           clusterTemplateByteAlignment;
    uint32_t           clusterBottomLevelByteAlignment;
    uint32_t           clusterTemplateBoundsByteAlignment;
    uint32_t           maxClusterGeometryIndex;
} VkPhysicalDeviceClusterAccelerationStructurePropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxVerticesPerCluster` indicates
the maximum number of unique vertices that **can** be specified in the
index buffer for a cluster.

* 
 `maxTrianglesPerCluster` indicates
the maximum number of triangles in a cluster.

* 
 `clusterScratchByteAlignment`
indicates the alignment required for scratch memory used in building or
moving cluster acceleration structures.

* 
 `clusterByteAlignment` indicates the
alignment of buffers when building cluster acceleration structures.

* 

`clusterTemplateByteAlignment` indicates the alignment of buffers
when building cluster templates.

* 

`clusterBottomLevelByteAlignment` indicates the alignment of buffers
when building bottom level acceleration structures.

* 

`clusterTemplateBoundsByteAlignment` indicates the alignment of
[VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV](accelstructures.html#VkClusterAccelerationStructureBuildTriangleClusterTemplateInfoNV)::`instantiationBoundingBoxLimit`.

* 
 `maxClusterGeometryIndex`
indicates the maximum geometry index possible for a triangle in an
cluster acceleration structures.

If the `VkPhysicalDeviceClusterAccelerationStructurePropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceClusterAccelerationStructurePropertiesNV-sType-sType) VUID-VkPhysicalDeviceClusterAccelerationStructurePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_ACCELERATION_STRUCTURE_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceFragmentShadingRatePropertiesKHR` structure is
defined as:

// Provided by VK_KHR_fragment_shading_rate
typedef struct VkPhysicalDeviceFragmentShadingRatePropertiesKHR {
    VkStructureType          sType;
    void*                    pNext;
    VkExtent2D               minFragmentShadingRateAttachmentTexelSize;
    VkExtent2D               maxFragmentShadingRateAttachmentTexelSize;
    uint32_t                 maxFragmentShadingRateAttachmentTexelSizeAspectRatio;
    VkBool32                 primitiveFragmentShadingRateWithMultipleViewports;
    VkBool32                 layeredShadingRateAttachments;
    VkBool32                 fragmentShadingRateNonTrivialCombinerOps;
    VkExtent2D               maxFragmentSize;
    uint32_t                 maxFragmentSizeAspectRatio;
    uint32_t                 maxFragmentShadingRateCoverageSamples;
    VkSampleCountFlagBits    maxFragmentShadingRateRasterizationSamples;
    VkBool32                 fragmentShadingRateWithShaderDepthStencilWrites;
    VkBool32                 fragmentShadingRateWithSampleMask;
    VkBool32                 fragmentShadingRateWithShaderSampleMask;
    VkBool32                 fragmentShadingRateWithConservativeRasterization;
    VkBool32                 fragmentShadingRateWithFragmentShaderInterlock;
    VkBool32                 fragmentShadingRateWithCustomSampleLocations;
    VkBool32                 fragmentShadingRateStrictMultiplyCombiner;
} VkPhysicalDeviceFragmentShadingRatePropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`minFragmentShadingRateAttachmentTexelSize` indicates minimum
supported width and height of the portion of the framebuffer
corresponding to each texel in a fragment shading rate attachment.
Each value **must** be less than or equal to the values in
`maxFragmentShadingRateAttachmentTexelSize`.
Each value **must** be a power-of-two.
It **must** be (0,0) if the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is not supported.

* 

`maxFragmentShadingRateAttachmentTexelSize` indicates maximum
supported width and height of the portion of the framebuffer
corresponding to each texel in a fragment shading rate attachment.
Each value **must** be greater than or equal to the values in
`minFragmentShadingRateAttachmentTexelSize`.
Each value **must** be a power-of-two.
It **must** be (0,0) if the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is not supported.

* 

`maxFragmentShadingRateAttachmentTexelSizeAspectRatio` indicates the
maximum ratio between the width and height of the portion of the
framebuffer corresponding to each texel in a fragment shading rate
attachment.
`maxFragmentShadingRateAttachmentTexelSizeAspectRatio` **must** be a
power-of-two value, and **must** be less than or equal to
max(`maxFragmentShadingRateAttachmentTexelSize.width` /
`minFragmentShadingRateAttachmentTexelSize.height`,
`maxFragmentShadingRateAttachmentTexelSize.height` /
`minFragmentShadingRateAttachmentTexelSize.width`).
It **must** be 0 if the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is not supported.

* 

    `primitiveFragmentShadingRateWithMultipleViewports` specifies
    whether the [primitive    fragment shading rate](primsrast.html#primsrast-fragment-shading-rate-primitive) **can** be used when multiple viewports are used.
    If this value is [VK_FALSE](fundamentals.html#VK_FALSE), only a single viewport **must** be used,
    and applications **must** not write to the
    `ViewportMaskNV` or
    `ViewportIndex` built-in when setting `PrimitiveShadingRateKHR`.
    It **must** be [VK_FALSE](fundamentals.html#VK_FALSE) if
    the [    `shaderOutputViewportIndex`](features.html#features-shaderOutputViewportIndex) feature,
    the `[VK_EXT_shader_viewport_index_layer](../appendices/extensions.html#VK_EXT_shader_viewport_index_layer)` extension,
or
    the [`geometryShader`](features.html#features-geometryShader) feature is not
    supported, or if the [    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate) feature is not supported.

* 

    `layeredShadingRateAttachments` specifies whether a shading rate
    attachment image view **can** be created with multiple layers.
    If this value is [VK_FALSE](fundamentals.html#VK_FALSE), when creating an image view with a
    `usage` that includes
    [VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](resources.html#VkImageUsageFlagBits),
    `layerCount` **must** be `1`.
    It **must** be [VK_FALSE](fundamentals.html#VK_FALSE) if
    the [`multiview`](features.html#features-multiview) feature,
    the [    `shaderOutputViewportIndex`](features.html#features-shaderOutputViewportIndex) feature,
    the `[VK_EXT_shader_viewport_index_layer](../appendices/extensions.html#VK_EXT_shader_viewport_index_layer)` extension,
or
    the [`geometryShader`](features.html#features-geometryShader) feature is not
    supported, or if the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is not supported.

* 

`fragmentShadingRateNonTrivialCombinerOps` specifies whether
[VkFragmentShadingRateCombinerOpKHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) enums other than
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_KEEP_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) or
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_REPLACE_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) **can** be used.
It **must** be [VK_FALSE](fundamentals.html#VK_FALSE) unless either the
[    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate) or
[    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is supported.

* 
 `maxFragmentSize` indicates the maximum
supported width and height of a fragment.
Its `width` and `height` members **must** both be power-of-two
values.
This limit is purely informational, and is not validated.

* 
 `maxFragmentSizeAspectRatio`
indicates the maximum ratio between the width and height of a fragment.
`maxFragmentSizeAspectRatio` **must** be a power-of-two value, and
**must** be less than or equal to the maximum of the `width` and
`height` members of `maxFragmentSize`.
This limit is purely informational, and is not validated.

* 

`maxFragmentShadingRateCoverageSamples` specifies the maximum number
of coverage samples supported in a single fragment.
`maxFragmentShadingRateCoverageSamples` **must** be less than or equal
to the product of the `width` and `height` members of
`maxFragmentSize`, and the sample count reported by
`maxFragmentShadingRateRasterizationSamples`.
`maxFragmentShadingRateCoverageSamples` **must** be less than or equal
to `maxSampleMaskWords` × 32 if
`fragmentShadingRateWithShaderSampleMask` is supported.
This limit is purely informational, and is not validated.

* 

`maxFragmentShadingRateRasterizationSamples` is a
[VkSampleCountFlagBits](#VkSampleCountFlagBits) value specifying the maximum sample rate
supported when a fragment covers multiple pixels.
This limit is purely informational, and is not validated.

* 

`fragmentShadingRateWithShaderDepthStencilWrites` specifies whether
the implementation supports writing `FragDepth`
or `FragStencilRefEXT`
from a fragment shader for multi-pixel fragments.
If this value is [VK_FALSE](fundamentals.html#VK_FALSE), writing to those built-ins will clamp
the fragment shading rate to (1,1).

* 

`fragmentShadingRateWithSampleMask` specifies whether the
implementation supports setting valid bits of
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)::`pSampleMask` to `0` for
multi-pixel fragments.
If this value is [VK_FALSE](fundamentals.html#VK_FALSE), zeroing valid bits in the sample mask
will clamp the fragment shading rate to (1,1).

* 

`fragmentShadingRateWithShaderSampleMask` specifies whether the
implementation supports reading or writing `SampleMask` for
multi-pixel fragments.
If this value is [VK_FALSE](fundamentals.html#VK_FALSE), using that built-in will clamp the
fragment shading rate to (1,1).

* 

`fragmentShadingRateWithConservativeRasterization`
specifies whether [conservative    rasterization](primsrast.html#primsrast-conservativeraster) is supported for multi-pixel fragments.
It **must** be [VK_FALSE](fundamentals.html#VK_FALSE) if `[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)`
is not supported.
If this value is [VK_FALSE](fundamentals.html#VK_FALSE), using [    conservative rasterization](primsrast.html#primsrast-conservativeraster) will clamp the fragment shading rate to
(1,1).

* 

`fragmentShadingRateWithFragmentShaderInterlock`
specifies whether [fragment shader    interlock](fragops.html#fragops-shader-interlock) is supported for multi-pixel fragments.
It **must** be [VK_FALSE](fundamentals.html#VK_FALSE) if `[VK_EXT_fragment_shader_interlock](../appendices/extensions.html#VK_EXT_fragment_shader_interlock)`
is not supported.
If this value is [VK_FALSE](fundamentals.html#VK_FALSE), using [    fragment shader interlock](fragops.html#fragops-shader-interlock) will clamp the fragment shading rate to
(1,1).

* 

`fragmentShadingRateWithCustomSampleLocations`
specifies whether [custom sample locations](primsrast.html#primsrast-samplelocations)
are supported for multi-pixel fragments.
It **must** be [VK_FALSE](fundamentals.html#VK_FALSE) if `[VK_EXT_sample_locations](../appendices/extensions.html#VK_EXT_sample_locations)` is not
supported.
If this value is [VK_FALSE](fundamentals.html#VK_FALSE), using [    custom sample locations](primsrast.html#primsrast-samplelocations) will clamp the fragment shading rate to
(1,1).

* 

`fragmentShadingRateStrictMultiplyCombiner` specifies whether
[VK_FRAGMENT_SHADING_RATE_COMBINER_OP_MUL_KHR](primsrast.html#VkFragmentShadingRateCombinerOpKHR) accurately performs a
multiplication or not.
Implementations where this value is [VK_FALSE](fundamentals.html#VK_FALSE) will instead combine
rates with an addition.
If `fragmentShadingRateNonTrivialCombinerOps` is [VK_FALSE](fundamentals.html#VK_FALSE),
implementations **must** report this as [VK_FALSE](fundamentals.html#VK_FALSE).
If `fragmentShadingRateNonTrivialCombinerOps` is [VK_TRUE](fundamentals.html#VK_TRUE),
implementations **should** report this as [VK_TRUE](fundamentals.html#VK_TRUE).

|  | Multiplication of the combiner rates using the fragment width/height in
| --- | --- |
linear space is equivalent to an addition of those values in log2 space.
Some implementations inadvertently implemented an addition in linear space
due to unclear requirements originating outside of this specification.
This resulted in [`fragmentShadingRateStrictMultiplyCombiner`](#limits-fragmentShadingRateStrictMultiplyCombiner) being added.
Fortunately, this only affects situations where a rate of 1 in either
dimension is combined with another rate of 1.
All other combinations result in the exact same result as if multiplication
was performed in linear space due to the clamping logic, and the fact that
both the sum and product of 2 and 2 are equal.
In many cases, this limit will not affect the correct operation of
applications. |

If the `VkPhysicalDeviceFragmentShadingRatePropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These properties are related to [fragment shading rates](primsrast.html#primsrast-fragment-shading-rate).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRatePropertiesKHR-sType-sType) VUID-VkPhysicalDeviceFragmentShadingRatePropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV` structure is
defined as:

// Provided by VK_NV_fragment_shading_rate_enums
typedef struct VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV {
    VkStructureType          sType;
    void*                    pNext;
    VkSampleCountFlagBits    maxFragmentShadingRateInvocationCount;
} VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxFragmentShadingRateInvocationCount` is a
[VkSampleCountFlagBits](#VkSampleCountFlagBits) value indicating the maximum number of
fragment shader invocations per fragment supported in pipeline,
primitive, and attachment fragment shading rates.

If the `VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These properties are related to [fragment shading rates](primsrast.html#primsrast-fragment-shading-rate).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV-sType-sType) VUID-VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_ENUMS_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceCustomBorderColorPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_custom_border_color
typedef struct VkPhysicalDeviceCustomBorderColorPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxCustomBorderColorSamplers;
} VkPhysicalDeviceCustomBorderColorPropertiesEXT;

* 

`maxCustomBorderColorSamplers` indicates the maximum number of
samplers with custom border colors which **can** simultaneously exist on a
device.

If the `VkPhysicalDeviceCustomBorderColorPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCustomBorderColorPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceCustomBorderColorPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_BORDER_COLOR_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceProvokingVertexPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_provoking_vertex
typedef struct VkPhysicalDeviceProvokingVertexPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           provokingVertexModePerPipeline;
    VkBool32           transformFeedbackPreservesTriangleFanProvokingVertex;
} VkPhysicalDeviceProvokingVertexPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`provokingVertexModePerPipeline` indicates whether the
implementation supports graphics pipelines with different provoking
vertex modes within the same render pass instance.

* 

`transformFeedbackPreservesTriangleFanProvokingVertex` indicates
whether the implementation can preserve the provoking vertex order when
writing triangle fan vertices to transform feedback.

If the `VkPhysicalDeviceProvokingVertexPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceProvokingVertexPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceProvokingVertexPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROVOKING_VERTEX_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDescriptorBufferPropertiesEXT` structure is defined
as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkPhysicalDeviceDescriptorBufferPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           combinedImageSamplerDescriptorSingleArray;
    VkBool32           bufferlessPushDescriptors;
    VkBool32           allowSamplerImageViewPostSubmitCreation;
    VkDeviceSize       descriptorBufferOffsetAlignment;
    uint32_t           maxDescriptorBufferBindings;
    uint32_t           maxResourceDescriptorBufferBindings;
    uint32_t           maxSamplerDescriptorBufferBindings;
    uint32_t           maxEmbeddedImmutableSamplerBindings;
    uint32_t           maxEmbeddedImmutableSamplers;
    size_t             bufferCaptureReplayDescriptorDataSize;
    size_t             imageCaptureReplayDescriptorDataSize;
    size_t             imageViewCaptureReplayDescriptorDataSize;
    size_t             samplerCaptureReplayDescriptorDataSize;
    size_t             accelerationStructureCaptureReplayDescriptorDataSize;
    size_t             samplerDescriptorSize;
    size_t             combinedImageSamplerDescriptorSize;
    size_t             sampledImageDescriptorSize;
    size_t             storageImageDescriptorSize;
    size_t             uniformTexelBufferDescriptorSize;
    size_t             robustUniformTexelBufferDescriptorSize;
    size_t             storageTexelBufferDescriptorSize;
    size_t             robustStorageTexelBufferDescriptorSize;
    size_t             uniformBufferDescriptorSize;
    size_t             robustUniformBufferDescriptorSize;
    size_t             storageBufferDescriptorSize;
    size_t             robustStorageBufferDescriptorSize;
    size_t             inputAttachmentDescriptorSize;
    size_t             accelerationStructureDescriptorSize;
    VkDeviceSize       maxSamplerDescriptorBufferRange;
    VkDeviceSize       maxResourceDescriptorBufferRange;
    VkDeviceSize       samplerDescriptorBufferAddressSpaceSize;
    VkDeviceSize       resourceDescriptorBufferAddressSpaceSize;
    VkDeviceSize       descriptorBufferAddressSpaceSize;
} VkPhysicalDeviceDescriptorBufferPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`combinedImageSamplerDescriptorSingleArray` indicates that the
implementation does not require an array of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType) descriptors to be
written into a descriptor buffer as an array of image descriptors,
immediately followed by an array of sampler descriptors.

* 
 `bufferlessPushDescriptors`
indicates that the implementation does not require a buffer created with
the [VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)
usage flag set to be bound when using push descriptors.

* 

`allowSamplerImageViewPostSubmitCreation` indicates that the
implementation does not restrict when the [VkSampler](samplers.html#VkSampler) or
[VkImageView](resources.html#VkImageView) objects used to retrieve descriptor data **can** be
created in relation to command buffer submission.
If this value is [VK_FALSE](fundamentals.html#VK_FALSE), then the application **must** create any
[VkSampler](samplers.html#VkSampler) or [VkImageView](resources.html#VkImageView) objects whose descriptor data is
accessed during the execution of a command buffer, before the
[vkQueueSubmit](cmdbuffers.html#vkQueueSubmit)
, or [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2),
call that submits that command buffer.

* 

`descriptorBufferOffsetAlignment` indicates the **required** alignment
in bytes when setting offsets into the descriptor buffer.

* 
 `maxDescriptorBufferBindings`
indicates the maximum number of descriptor buffer bindings.

* 

`maxResourceDescriptorBufferBindings` indicates the maximum number
of descriptor buffer bindings with
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) that **can** be
used.

* 

`maxSamplerDescriptorBufferBindings` indicates the maximum number of
descriptor buffer bindings with
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) that **can** be
used.

* 

`maxEmbeddedImmutableSamplerBindings` indicates the maximum number
of embedded immutable sampler sets that **can** be bound.

* 

`maxEmbeddedImmutableSamplers` indicates the maximum number of
unique immutable samplers in descriptor set layouts created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits),
and pipeline layouts created from them, which **can** simultaneously exist
on a device.

* 

`bufferCaptureReplayDescriptorDataSize` indicates the maximum size
in bytes of the opaque data used for capture and replay with buffers.

* 

`imageCaptureReplayDescriptorDataSize` indicates the maximum size in
bytes of the opaque data used for capture and replay with images.

* 

`imageViewCaptureReplayDescriptorDataSize` indicates the maximum
size in bytes of the opaque data used for capture and replay with image
views.

* 

`samplerCaptureReplayDescriptorDataSize` indicates the maximum size
in bytes of the opaque data used for capture and replay with samplers.

* 

`accelerationStructureCaptureReplayDescriptorDataSize` indicates the
maximum size in bytes of the opaque data used for capture and replay
with acceleration structures.

* 
 `samplerDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_SAMPLER](descriptorsets.html#VkDescriptorType)
descriptor.

* 

`combinedImageSamplerDescriptorSize` indicates the size in bytes of
a [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType) descriptor.

* 
 `sampledImageDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType)
descriptor.

* 
 `storageImageDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType)
descriptor.

* 

`uniformTexelBufferDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor if the
[`robustBufferAccess`](features.html#features-robustBufferAccess) feature is not
enabled.

* 

`robustUniformTexelBufferDescriptorSize` indicates the size in bytes
of a [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor if the
[`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
enabled.

* 

`storageTexelBufferDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor if the
[`robustBufferAccess`](features.html#features-robustBufferAccess) feature is not
enabled.

* 

`robustStorageTexelBufferDescriptorSize` indicates the size in bytes
of a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) descriptor if the
[`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
enabled.

* 
 `uniformBufferDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType)
descriptor.

* 

`robustUniformBufferDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType) descriptor if the
[`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
enabled.

* 
 `storageBufferDescriptorSize`
indicates the size in bytes of a [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType)
descriptor.

* 

`robustStorageBufferDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType) descriptor if the
[`robustBufferAccess`](features.html#features-robustBufferAccess) feature is
enabled.

* 

`inputAttachmentDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType) descriptor.

* 

`accelerationStructureDescriptorSize` indicates the size in bytes of
a [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptorsets.html#VkDescriptorType) descriptor.

* 

`maxSamplerDescriptorBufferRange` indicates the maximum range in
bytes from the address of a sampler descriptor buffer binding that is
accessible to a shader.

* 

`maxResourceDescriptorBufferRange` indicates the maximum range in
bytes from the address of a resource descriptor buffer binding that is
accessible to a shader.

* 

`samplerDescriptorBufferAddressSpaceSize` indicates the total size
in bytes of the address space available for descriptor buffers created
with the [VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage
flag set.

* 

`resourceDescriptorBufferAddressSpaceSize` indicates the total size
in bytes of the address space available for descriptor buffers created
with the [VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage
flag set.

* 

`descriptorBufferAddressSpaceSize` indicates the total size in bytes
of the address space available for descriptor buffers created with both
the [VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) and
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flags
set.

A descriptor binding with type [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptorsets.html#VkDescriptorType) has a
descriptor size which is implied by the descriptor types included in the
[VkMutableDescriptorTypeCreateInfoEXT](descriptorsets.html#VkMutableDescriptorTypeCreateInfoEXT)::`pDescriptorTypes` list.
The descriptor size is equal to the maximum size of any descriptor type
included in the `pDescriptorTypes` list.

As there is no way to request robust and non-robust descriptors separately,
or specify robust/non-robust descriptors in the set layout, if the
[`robustBufferAccess`](features.html#features-robustBufferAccess) feature is enabled
then robust descriptors are always used.

If the `VkPhysicalDeviceDescriptorBufferPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorBufferPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDescriptorBufferPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT` structure
is defined as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    size_t             combinedImageSamplerDensityMapDescriptorSize;
} VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`combinedImageSamplerDensityMapDescriptorSize` indicates the size in
bytes of a [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType) descriptor
when creating the descriptor with
[VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) set.

If the `VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_DENSITY_MAP_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDescriptorBufferTensorPropertiesARM` structure is
defined as:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkPhysicalDeviceDescriptorBufferTensorPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    size_t             tensorCaptureReplayDescriptorDataSize;
    size_t             tensorViewCaptureReplayDescriptorDataSize;
    size_t             tensorDescriptorSize;
} VkPhysicalDeviceDescriptorBufferTensorPropertiesARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorCaptureReplayDescriptorDataSize` indicates the maximum size
in bytes of the opaque data used for capture and replay with tensors.

* 
`tensorViewCaptureReplayDescriptorDataSize` indicates the maximum
size in bytes of the opaque data used for capture and replay with tensor
views.

* 
`tensorDescriptorSize` indicates the size in bytes of a
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) descriptor.

If the `VkPhysicalDeviceDescriptorBufferTensorPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorBufferTensorPropertiesARM-sType-sType) VUID-VkPhysicalDeviceDescriptorBufferTensorPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_TENSOR_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceHostImageCopyProperties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceHostImageCopyProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           copySrcLayoutCount;
    VkImageLayout*     pCopySrcLayouts;
    uint32_t           copyDstLayoutCount;
    VkImageLayout*     pCopyDstLayouts;
    uint8_t            optimalTilingLayoutUUID[VK_UUID_SIZE];
    VkBool32           identicalMemoryTypeRequirements;
} VkPhysicalDeviceHostImageCopyProperties;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkPhysicalDeviceHostImageCopyProperties
typedef VkPhysicalDeviceHostImageCopyProperties VkPhysicalDeviceHostImageCopyPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`copySrcLayoutCount` is an integer related to the number of image
layouts for host copies from images available or queried, as described
below.

* 
`pCopySrcLayouts` is a pointer to an array of [VkImageLayout](resources.html#VkImageLayout) in
which supported image layouts for use with host copy operations from
images are returned.

* 
`copyDstLayoutCount` is an integer related to the number of image
layouts for host copies to images available or queried, as described
below.

* 
`pCopyDstLayouts` is a pointer to an array of [VkImageLayout](resources.html#VkImageLayout) in
which supported image layouts for use with host copy operations to
images are returned.

* 
`optimalTilingLayoutUUID` is an array of [VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE)
`uint8_t` values representing a universally unique identifier for the
implementation’s swizzling layout of images created with
[VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling).

* 
`identicalMemoryTypeRequirements` indicates that specifying the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits) flag in
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`usage` does not affect the memory type
requirements of the image.

If the `VkPhysicalDeviceHostImageCopyProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

If `pCopyDstLayouts` is `NULL`, then the number of image layouts that
are supported in [VkCopyMemoryToImageInfo](copies.html#VkCopyMemoryToImageInfo)::`dstImageLayout` and
[VkCopyImageToImageInfo](copies.html#VkCopyImageToImageInfo)::`dstImageLayout` is returned in
`copyDstLayoutCount`.
Otherwise, `copyDstLayoutCount` **must** be set by the application to the
number of elements in the `pCopyDstLayouts` array, and on return is
overwritten with the number of values actually written to
`pCopyDstLayouts`.
If the value of `copyDstLayoutCount` is less than the number of image
layouts that are supported, at most `copyDstLayoutCount` values will be
written to `pCopyDstLayouts`.
The implementation **must** include the [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) image
layout in `pCopyDstLayouts`.
If the [`unifiedImageLayouts`](features.html#features-unifiedImageLayouts) feature
is supported, the implementation **must** include all the image layouts that
are interchangeable with [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) in
`pCopyDstLayouts`.

If `pCopySrcLayouts` is `NULL`, then the number of image layouts that
are supported in [VkCopyImageToMemoryInfo](copies.html#VkCopyImageToMemoryInfo)::`srcImageLayout` and
[VkCopyImageToImageInfo](copies.html#VkCopyImageToImageInfo)::`srcImageLayout` is returned in
`copySrcLayoutCount`.
Otherwise, `copySrcLayoutCount` **must** be set by the application to the
number of elements in the `pCopySrcLayouts` array, and on return is
overwritten with the number of values actually written to
`pCopySrcLayouts`.
If the value of `copySrcLayoutCount` is less than the number of image
layouts that are supported, at most `copySrcLayoutCount` values will be
written to `pCopySrcLayouts`.
The implementation **must** include the [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) image
layout in `pCopySrcLayouts`.
If the [`unifiedImageLayouts`](features.html#features-unifiedImageLayouts) feature
is supported, the implementation **must** include all the image layouts that
are interchangeable with [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout) in
`pCopySrcLayouts`.

The `optimalTilingLayoutUUID` value can be used to ensure compatible
data layouts when using the [VK_HOST_IMAGE_COPY_MEMCPY_BIT](copies.html#VkHostImageCopyFlagBitsEXT) flag in
[vkCopyMemoryToImage](copies.html#vkCopyMemoryToImage) and [vkCopyImageToMemory](copies.html#vkCopyImageToMemory).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceHostImageCopyProperties-sType-sType) VUID-VkPhysicalDeviceHostImageCopyProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_PROPERTIES](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceHostImageCopyProperties-pCopySrcLayouts-parameter) VUID-VkPhysicalDeviceHostImageCopyProperties-pCopySrcLayouts-parameter

 If `copySrcLayoutCount` is not `0`, and `pCopySrcLayouts` is not `NULL`, `pCopySrcLayouts` **must** be a valid pointer to an array of `copySrcLayoutCount` [VkImageLayout](resources.html#VkImageLayout) values

* 
[](#VUID-VkPhysicalDeviceHostImageCopyProperties-pCopyDstLayouts-parameter) VUID-VkPhysicalDeviceHostImageCopyProperties-pCopyDstLayouts-parameter

 If `copyDstLayoutCount` is not `0`, and `pCopyDstLayouts` is not `NULL`, `pCopyDstLayouts` **must** be a valid pointer to an array of `copyDstLayoutCount` [VkImageLayout](resources.html#VkImageLayout) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceSubpassShadingPropertiesHUAWEI` structure is
defined as:

// Provided by VK_HUAWEI_subpass_shading
typedef struct VkPhysicalDeviceSubpassShadingPropertiesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxSubpassShadingWorkgroupSizeAspectRatio;
} VkPhysicalDeviceSubpassShadingPropertiesHUAWEI;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxSubpassShadingWorkgroupSizeAspectRatio` indicates the maximum
ratio between the width and height of the portion of the subpass shading
shader workgroup size.
`maxSubpassShadingWorkgroupSizeAspectRatio` **must** be a power-of-two
value, and **must** be less than or equal to max(`WorkgroupSize.x` /
`WorkgroupSize.y`, `WorkgroupSize.y` / `WorkgroupSize.x`).

If the `VkPhysicalDeviceSubpassShadingPropertiesHUAWEI` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSubpassShadingPropertiesHUAWEI-sType-sType) VUID-VkPhysicalDeviceSubpassShadingPropertiesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBPASS_SHADING_PROPERTIES_HUAWEI](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMultiDrawPropertiesEXT` structure is defined as:

// Provided by VK_EXT_multi_draw
typedef struct VkPhysicalDeviceMultiDrawPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxMultiDrawCount;
} VkPhysicalDeviceMultiDrawPropertiesEXT;

The members of the `VkPhysicalDeviceMultiDrawPropertiesEXT` structure
describe the following features:

* 
 `maxMultiDrawCount` indicates the
maximum number of draw calls which **can** be batched into a single
multidraw.

If the `VkPhysicalDeviceMultiDrawPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMultiDrawPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceMultiDrawPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTI_DRAW_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceNestedCommandBufferPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_nested_command_buffer
typedef struct VkPhysicalDeviceNestedCommandBufferPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxCommandBufferNestingLevel;
} VkPhysicalDeviceNestedCommandBufferPropertiesEXT;

The members of the `VkPhysicalDeviceNestedCommandBufferPropertiesEXT`
structure describe the following features:

* 

`maxCommandBufferNestingLevel` indicates the maximum nesting level
of calls to [vkCmdExecuteCommands](cmdbuffers.html#vkCmdExecuteCommands) from [Secondary    Command Buffers](../appendices/glossary.html#glossary).
A `maxCommandBufferNestingLevel` of `UINT32_MAX` means there is
no limit to the nesting level.

If the `VkPhysicalDeviceNestedCommandBufferPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceNestedCommandBufferPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceNestedCommandBufferPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NESTED_COMMAND_BUFFER_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_graphics_pipeline_library
typedef struct VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           graphicsPipelineLibraryFastLinking;
    VkBool32           graphicsPipelineLibraryIndependentInterpolationDecoration;
} VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT;

* 

`graphicsPipelineLibraryFastLinking` indicates whether fast linking
of graphics pipelines is supported.
If it is [VK_TRUE](fundamentals.html#VK_TRUE), creating a graphics pipeline entirely from
pipeline libraries without
[VK_PIPELINE_CREATE_LINK_TIME_OPTIMIZATION_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits) is comparable in
cost to recording a command in a command buffer.

* 

`graphicsPipelineLibraryIndependentInterpolationDecoration`
indicates whether `NoPerspective` and `Flat` interpolation
decorations in the last vertex processing stage and the fragment shader
are required to match when using graphics pipeline libraries.
If it is [VK_TRUE](fundamentals.html#VK_TRUE), the interpolation decorations do not need to
match.
If it is [VK_FALSE](fundamentals.html#VK_FALSE), these decorations **must** either be present in
both stages or neither stage in order for a given interface variable to
match.

If the `VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GRAPHICS_PIPELINE_LIBRARY_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR` structure
is defined as:

// Provided by VK_KHR_fragment_shader_barycentric
typedef struct VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           triStripVertexOrderIndependentOfProvokingVertex;
} VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR;

* 
 When the
[provoking vertex mode](vertexpostproc.html#vertexpostproc-flatshading) is
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](vertexpostproc.html#VkProvokingVertexModeEXT), and the primitive order
is odd in a triangle strip, the ordering of vertices is defined in
[last vertex table](primsrast.html#primsrast-barycentric-order-table-last-vertex).
`triStripVertexOrderIndependentOfProvokingVertex` equal to
[VK_TRUE](fundamentals.html#VK_TRUE) indicates that the implementation ignores this and uses
the vertex order defined by
[VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT](vertexpostproc.html#VkProvokingVertexModeEXT) instead.

If the `VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_shader_module_identifier
typedef struct VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint8_t            shaderModuleIdentifierAlgorithmUUID[VK_UUID_SIZE];
} VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT;

The members of the `VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT`
structure describe the following:

* 

`shaderModuleIdentifierAlgorithmUUID` is an array of
[VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE) `uint8_t` values which uniquely represents the
algorithm used to compute an identifier in
[vkGetShaderModuleIdentifierEXT](shaders.html#vkGetShaderModuleIdentifierEXT) and
[vkGetShaderModuleCreateInfoIdentifierEXT](shaders.html#vkGetShaderModuleCreateInfoIdentifierEXT).
Implementations **should** not change this value in different driver
versions if the algorithm used to compute an identifier is the same.

|  | The algorithm UUID may be the same in different ICDs if the algorithms are
| --- | --- |
guaranteed to produce the same results.
This may happen in driver stacks which support different kinds of hardware
with shared code.

Khronos' conformance testing can not guarantee that
`shaderModuleIdentifierAlgorithmUUID` values are actually unique, so
implementors should make their own best efforts to ensure that their UUID is
unlikely to conflict with other implementations which may use a different
algorithm.
In particular, hard-coded values which easily conflict, such as all-`0`
bits, **should** never be used.
Hard-coded values are acceptable if best effort is ensured that the value
will not accidentally conflict. |

If the `VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MODULE_IDENTIFIER_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDevicePipelineRobustnessProperties` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDevicePipelineRobustnessProperties {
    VkStructureType                       sType;
    void*                                 pNext;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessStorageBuffers;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessUniformBuffers;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessVertexInputs;
    VkPipelineRobustnessImageBehavior     defaultRobustnessImages;
} VkPhysicalDevicePipelineRobustnessProperties;

// Provided by VK_EXT_pipeline_robustness
// Equivalent to VkPhysicalDevicePipelineRobustnessProperties
typedef VkPhysicalDevicePipelineRobustnessProperties VkPhysicalDevicePipelineRobustnessPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`defaultRobustnessStorageBuffers` describes the behavior of out of
bounds accesses made to storage buffers when no robustness features are
enabled

* 
`defaultRobustnessUniformBuffers` describes the behavior of out of
bounds accesses made to uniform buffers when no robustness features are
enabled

* 
`defaultRobustnessVertexInputs` describes the behavior of out of
bounds accesses made to vertex input attributes when no robustness
features are enabled

* 
`defaultRobustnessImages` describes the behavior of out of bounds
accesses made to images when no robustness features are enabled

Some implementations of Vulkan may be able to guarantee that certain types
of accesses are always performed with robustness even when the Vulkan API’s
robustness features are not explicitly enabled.

Even when an implementation reports that accesses to a given resource type
are robust by default, it remains invalid to make an out of bounds access
without requesting the appropriate robustness feature.

If the `VkPhysicalDevicePipelineRobustnessProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineRobustnessProperties-sType-sType) VUID-VkPhysicalDevicePipelineRobustnessProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceExtendedDynamicState3PropertiesEXT` structure is
defined as:

// Provided by VK_EXT_extended_dynamic_state3
typedef struct VkPhysicalDeviceExtendedDynamicState3PropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           dynamicPrimitiveTopologyUnrestricted;
} VkPhysicalDeviceExtendedDynamicState3PropertiesEXT;

* 

`dynamicPrimitiveTopologyUnrestricted` indicates that the
implementation allows `vkCmdSetPrimitiveTopology` to use a different
[primitive topology class](drawing.html#drawing-primitive-topology-class) to the
one specified in the active graphics pipeline.

If the `VkPhysicalDeviceExtendedDynamicState3PropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedDynamicState3PropertiesEXT-sType-sType) VUID-VkPhysicalDeviceExtendedDynamicState3PropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_3_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceOpticalFlowPropertiesNV` structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkPhysicalDeviceOpticalFlowPropertiesNV {
    VkStructureType                 sType;
    void*                           pNext;
    VkOpticalFlowGridSizeFlagsNV    supportedOutputGridSizes;
    VkOpticalFlowGridSizeFlagsNV    supportedHintGridSizes;
    VkBool32                        hintSupported;
    VkBool32                        costSupported;
    VkBool32                        bidirectionalFlowSupported;
    VkBool32                        globalFlowSupported;
    uint32_t                        minWidth;
    uint32_t                        minHeight;
    uint32_t                        maxWidth;
    uint32_t                        maxHeight;
    uint32_t                        maxNumRegionsOfInterest;
} VkPhysicalDeviceOpticalFlowPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `supportedOutputGridSizes` are
the supported [VkOpticalFlowGridSizeFlagsNV](VK_NV_optical_flow/optical_flow.html#VkOpticalFlowGridSizeFlagsNV) which can be specified
in `VkOpticalFlowSessionCreateInfoNV`::`outputGridSize`.

* 
 `supportedHintGridSizes` are the
supported [VkOpticalFlowGridSizeFlagsNV](VK_NV_optical_flow/optical_flow.html#VkOpticalFlowGridSizeFlagsNV) which can be specified in
`VkOpticalFlowSessionCreateInfoNV`::`hintGridSize`.

* 
 `hintSupported` is a boolean describing
whether using hint flow vector map is supported in an optical flow
session.

* 
 `costSupported` is a boolean describing
whether cost map generation is supported in an optical flow session.

* 
 `bidirectionalFlowSupported`
is a boolean describing whether bi-directional flow generation is
supported in an optical flow session.

* 
 `globalFlowSupported` is a boolean
describing whether global flow vector map generation is supported in an
optical flow session.

* 
 `minWidth` is the minimum width in pixels for
images used in an optical flow session.

* 
 `minHeight` is the minimum height in pixels for
images used in an optical flow session.

* 
 `maxWidth` is the maximum width in pixels for
images used in an optical flow session.

* 
 `maxHeight` is the maximum height in pixels for
images used in an optical flow session.

* 
 `maxNumRegionsOfInterest` is the
maximum number of regions of interest which can be used in an optical
flow session.
If this `maxNumRegionsOfInterest` is 0, regions of interest are not
supported in an optical flow session.

If the `VkPhysicalDeviceOpticalFlowPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceOpticalFlowPropertiesNV-sType-sType) VUID-VkPhysicalDeviceOpticalFlowPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPTICAL_FLOW_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceOpacityMicromapPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkPhysicalDeviceOpacityMicromapPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxOpacity2StateSubdivisionLevel;
    uint32_t           maxOpacity4StateSubdivisionLevel;
} VkPhysicalDeviceOpacityMicromapPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxOpacity2StateSubdivisionLevel` is the maximum allowed
`subdivisionLevel` when `format` is
[VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](VK_EXT_opacity_micromap/micromaps.html#VkOpacityMicromapFormatEXT)

* 
`maxOpacity4StateSubdivisionLevel` is the maximum allowed
`subdivisionLevel` when `format` is
[VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](VK_EXT_opacity_micromap/micromaps.html#VkOpacityMicromapFormatEXT)

If the `VkPhysicalDeviceOpacityMicromapPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceOpacityMicromapPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceOpacityMicromapPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPACITY_MICROMAP_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDisplacementMicromapPropertiesNV` structure is
defined as:

// Provided by VK_NV_displacement_micromap
typedef struct VkPhysicalDeviceDisplacementMicromapPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxDisplacementMicromapSubdivisionLevel;
} VkPhysicalDeviceDisplacementMicromapPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxDisplacementMicromapSubdivisionLevel` is the maximum allowed
`subdivisionLevel` for displacement micromaps.

If the `VkPhysicalDeviceDisplacementMicromapPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDisplacementMicromapPropertiesNV-sType-sType) VUID-VkPhysicalDeviceDisplacementMicromapPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DISPLACEMENT_MICROMAP_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM` structure is
defined as:

// Provided by VK_ARM_shader_core_builtins
typedef struct VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           shaderCoreMask;
    uint32_t           shaderCoreCount;
    uint32_t           shaderWarpsPerCore;
} VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderCoreMask` is a bitfield where each
bit set represents the presence of a shader core whose ID is the bit
position.
The highest ID for any shader core on the device is the position of the
most significant bit set.

* 
 `shaderCoreCount` is the number of shader
cores on the device.

* 
 `shaderWarpsPerCore` is the maximum
number of simultaneously executing warps on a shader core.

If the `VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM-sType-sType) VUID-VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_BUILTINS_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

Values which **may** be returned in the
`rayTracingInvocationReorderReorderingHint` field of
`VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT`
or
`VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV`
are:

// Provided by VK_EXT_ray_tracing_invocation_reorder
typedef enum VkRayTracingInvocationReorderModeEXT {
    VK_RAY_TRACING_INVOCATION_REORDER_MODE_NONE_EXT = 0,
    VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_EXT = 1,
  // Provided by VK_NV_ray_tracing_invocation_reorder
    VK_RAY_TRACING_INVOCATION_REORDER_MODE_NONE_NV = VK_RAY_TRACING_INVOCATION_REORDER_MODE_NONE_EXT,
  // Provided by VK_NV_ray_tracing_invocation_reorder
    VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_NV = VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_EXT,
} VkRayTracingInvocationReorderModeEXT;

// Provided by VK_NV_ray_tracing_invocation_reorder
// Equivalent to VkRayTracingInvocationReorderModeEXT
typedef VkRayTracingInvocationReorderModeEXT VkRayTracingInvocationReorderModeNV;

* 
[VK_RAY_TRACING_INVOCATION_REORDER_MODE_NONE_EXT](#VkRayTracingInvocationReorderModeNV) specifies that the
implementation does not reorder at reorder calls.

* 
[VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_EXT](#VkRayTracingInvocationReorderModeNV) specifies that
the implementation **may** reorder at reorder calls.

The `VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT` structure
is defined as:

// Provided by VK_EXT_ray_tracing_invocation_reorder
typedef struct VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT {
    VkStructureType                         sType;
    void*                                   pNext;
    VkRayTracingInvocationReorderModeEXT    rayTracingInvocationReorderReorderingHint;
    uint32_t                                maxShaderBindingTableRecordIndex;
} VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`rayTracingInvocationReorderReorderingHint` is a hint indicating if
the implementation **may** reorder at the reorder calls.

* 
`maxShaderBindingTableRecordIndex` is the maximum shader binding
table record index allowed to be passed in to
`OpHitObjectSetShaderBindingTableRecordIndexEXT`

If `rayTracingInvocationReorderReorderingHint` is
[VK_RAY_TRACING_INVOCATION_REORDER_MODE_REORDER_EXT](#VkRayTracingInvocationReorderModeNV) there **must** exist
conditions under which the ordered set of invocations before a reorder
instruction is different than the ordered set of invocations after the
reorder instruction.
The ordering of a set of invocations is determined by the `SubgroupId` of
an invocation’s subgroup and the `SubGroupInvocationId` of an invocation
within that subgroup.

The reorder instructions are:

* 
`OpReorderThreadWithHintEXT`

* 
`OpReorderThreadWithHitObjectEXT`

* 
`OpHitObjectReorderExecuteShaderEXT`

* 
`OpHitObjectTraceReorderExecuteEXT`

* 
`OpHitObjectTraceMotionReorderExecuteEXT`

|  | Because the extension changes how hits are managed there is a compatibility
| --- | --- |
reason to expose the extension even when an implementation does not have
sorting active. |

If the `VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV` structure
is defined as:

// Provided by VK_NV_ray_tracing_invocation_reorder
typedef struct VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV {
    VkStructureType                         sType;
    void*                                   pNext;
    VkRayTracingInvocationReorderModeEXT    rayTracingInvocationReorderReorderingHint;
} VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`rayTracingInvocationReorderReorderingHint` is a hint indicating if
the implementation will actually reorder at the reorder calls.

|  | Because the extension changes how hits are managed there is a compatibility
| --- | --- |
reason to expose the extension even when an implementation does not have
sorting active. |

If the `VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV-sType-sType) VUID-VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI` structure is
defined as:

// Provided by VK_HUAWEI_cluster_culling_shader
typedef struct VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxWorkGroupCount[3];
    uint32_t           maxWorkGroupSize[3];
    uint32_t           maxOutputClusterCount;
    VkDeviceSize       indirectBufferOffsetAlignment;
} VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxWorkGroupCount`[3] is the maximum number of local workgroups
that can be launched by a single command.
These three value represent the maximum local workgroup count in the X,
Y, and Z dimensions, respectively.
In the current implementation, the values of Y and Z are both implicitly
set as one.
groupCountX of DrawCluster command **must** be less than or equal to
maxWorkGroupCount[0].

* 
`maxWorkGroupSize`[3] is the maximum size of a local workgroup.
    These three value represent the maximum local workgroup size in the X,
    Y, and Z dimensions, respectively.
    The x, y, and z sizes, as specified by the `LocalSize`
or `LocalSizeId`
    execution mode or by the object decorated by the WorkgroupSize
    decoration in shader modules, **must** be less than or equal to the
    corresponding limit.
    In the current implementation, the maximum workgroup size of the X
    dimension is 32, the others are 1.

* 
`maxOutputClusterCount` is the maximum number of output cluster a
single cluster culling shader workgroup can emit.

* 
`indirectBufferOffsetAlignment` indicates the alignment for cluster
drawing command buffer stride.
[vkCmdDrawClusterIndirectHUAWEI](drawing.html#vkCmdDrawClusterIndirectHUAWEI)::`offset` **must** be a multiple
of this value.

If the `VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI-sType-sType) VUID-VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_PROPERTIES_HUAWEI](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderCorePropertiesARM` structure is defined as:

// Provided by VK_ARM_shader_core_properties
typedef struct VkPhysicalDeviceShaderCorePropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           pixelRate;
    uint32_t           texelRate;
    uint32_t           fmaRate;
} VkPhysicalDeviceShaderCorePropertiesARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pixelRate` is an unsigned integer value indicating the maximum
number of pixels output per clock per shader core.

* 
`texelRate` is an unsigned integer value indicating the maximum
number of texels per clock per shader core.

* 
`fmaRate` is an unsigned integer value indicating the maximum number
of single-precision fused multiply-add operations per clock per shader
core.

If a throughput rate cannot be determined on the physical device, the value
`0` will be returned for that rate.

If the `VkPhysicalDeviceShaderCorePropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderCorePropertiesARM-sType-sType) VUID-VkPhysicalDeviceShaderCorePropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderObjectPropertiesEXT` structure is defined as:

// Provided by VK_EXT_shader_object
typedef struct VkPhysicalDeviceShaderObjectPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint8_t            shaderBinaryUUID[VK_UUID_SIZE];
    uint32_t           shaderBinaryVersion;
} VkPhysicalDeviceShaderObjectPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderBinaryUUID` is an array of
[VK_UUID_SIZE](devsandqueues.html#VK_UUID_SIZE) `uint8_t` values representing a universally unique
identifier for one or more implementations whose shader binaries are
guaranteed to be compatible with each other.

* 
 `shaderBinaryVersion` is an unsigned
integer incremented to represent backwards compatible differences
between implementations with the same `shaderBinaryUUID`.

The purpose and usage of the values of this structure are described in
greater detail in [Binary Shader Compatibility](shaders.html#shaders-objects-binary-compatibility).

If the `VkPhysicalDeviceShaderObjectPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderObjectPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceShaderObjectPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OBJECT_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderEnqueuePropertiesAMDX` structure is defined
as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkPhysicalDeviceShaderEnqueuePropertiesAMDX {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxExecutionGraphDepth;
    uint32_t           maxExecutionGraphShaderOutputNodes;
    uint32_t           maxExecutionGraphShaderPayloadSize;
    uint32_t           maxExecutionGraphShaderPayloadCount;
    uint32_t           executionGraphDispatchAddressAlignment;
    uint32_t           maxExecutionGraphWorkgroupCount[3];
    uint32_t           maxExecutionGraphWorkgroups;
} VkPhysicalDeviceShaderEnqueuePropertiesAMDX;

The members of the `VkPhysicalDeviceShaderEnqueuePropertiesAMDX`
structure describe the following limits:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxExecutionGraphDepth` defines
the maximum node chain depth in the graph.
The dispatched node is at depth 1 and the node enqueued by it is at
depth 2, and so on.
If a node enqueues itself, each recursive enqueue increases the depth by
1 as well.

* 

`maxExecutionGraphShaderOutputNodes` specifies the maximum number of
unique nodes that can be dispatched from a single shader, and **must** be
at least 256.

* 

`maxExecutionGraphShaderPayloadSize` specifies the maximum total
size of payload declarations in a shader.
For any payload declarations that share resources, indicated by
`NodeSharesPayloadLimitsWithAMDX` decorations, the maximum size of
each set of shared payload declarations is taken.
The sum of each shared set’s maximum size and the size of each unshared
payload is counted against this limit.

* 

`maxExecutionGraphShaderPayloadCount` specifies the maximum number
of output payloads that can be initialized in a single workgroup.

* 

`executionGraphDispatchAddressAlignment` specifies the alignment of
non-scratch `VkDeviceAddress` arguments consumed by graph
dispatch commands.

* 

`maxExecutionGraphWorkgroupCount`[3] is the maximum number of local
workgroups that a shader **can** be dispatched with in X, Y, and Z
dimensions, respectively.

* 
 `maxExecutionGraphWorkgroups`
is the total number of local workgroups that a shader **can** be dispatched
with.

If the `VkPhysicalDeviceShaderEnqueuePropertiesAMDX` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderEnqueuePropertiesAMDX-sType-sType) VUID-VkPhysicalDeviceShaderEnqueuePropertiesAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ENQUEUE_PROPERTIES_AMDX](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV` structure
is defined as:

// Provided by VK_NV_extended_sparse_address_space
typedef struct VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV {
    VkStructureType       sType;
    void*                 pNext;
    VkDeviceSize          extendedSparseAddressSpaceSize;
    VkImageUsageFlags     extendedSparseImageUsageFlags;
    VkBufferUsageFlags    extendedSparseBufferUsageFlags;
} VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`extendedSparseAddressSpaceSize` is the total amount of address
space available, in bytes, for sparse memory resources of all usages if
the [    `extendedSparseAddressSpace`](features.html#features-extendedSparseAddressSpace) feature is enabled.
This **must** be greater than or equal to
`VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`, and the
difference in space **must** only be used with usages allowed below.
This is an upper bound on the sum of the sizes of all sparse resources,
regardless of whether any memory is bound to them.

* 

`extendedSparseImageUsageFlags` is a bitmask of
[VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) of usages which **may** allow an implementation
to use the full `extendedSparseAddressSpaceSize` space.

* 

`extendedSparseBufferUsageFlags` is a bitmask of
[VkBufferUsageFlagBits](resources.html#VkBufferUsageFlagBits) of usages which **may** allow an implementation
to use the full `extendedSparseAddressSpaceSize` space.

If the `VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV-sType-sType) VUID-VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_SPARSE_ADDRESS_SPACE_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceCudaKernelLaunchPropertiesNV` structure is defined
as:

// Provided by VK_NV_cuda_kernel_launch
typedef struct VkPhysicalDeviceCudaKernelLaunchPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           computeCapabilityMinor;
    uint32_t           computeCapabilityMajor;
} VkPhysicalDeviceCudaKernelLaunchPropertiesNV;

The members of the `VkPhysicalDeviceCudaKernelLaunchPropertiesNV`
structure describe the following features:

* 
 `computeCapabilityMinor` indicates
the minor version number of the compute code.

* 
 `computeCapabilityMajor` indicates
the major version number of the compute code.

If the `VkPhysicalDeviceCudaKernelLaunchPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCudaKernelLaunchPropertiesNV-sType-sType) VUID-VkPhysicalDeviceCudaKernelLaunchPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUDA_KERNEL_LAUNCH_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDevicePushConstantBankPropertiesNV` structure is defined
as:

// Provided by VK_NV_push_constant_bank
typedef struct VkPhysicalDevicePushConstantBankPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxGraphicsPushConstantBanks;
    uint32_t           maxComputePushConstantBanks;
    uint32_t           maxGraphicsPushDataBanks;
    uint32_t           maxComputePushDataBanks;
} VkPhysicalDevicePushConstantBankPropertiesNV;

This structure describes the following implementation-dependent limits:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxGraphicsPushConstantBanks` indicates the maximum number of push
constant banks supported for graphics pipelines when used with
non-descriptor heap scenarios.

* 
`maxComputePushConstantBanks` indicates the maximum number of push
constant banks supported for compute pipelines when used with
non-descriptor heap scenarios.

* 
`maxGraphicsPushDataBanks` indicates the maximum number of push data
banks supported for graphics pipelines when using descriptor heaps.

* 
`maxComputePushDataBanks` indicates the maximum number of push data
banks supported for compute pipelines when using descriptor heaps.

If the `VkPhysicalDevicePushConstantBankPropertiesNV` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

|  | The number of banks available for descriptor heap usage
| --- | --- |
(`maxGraphicsPushDataBanks` and `maxComputePushDataBanks`) is equal
or greater than the number of banks available for non-descriptor heap usage
(`maxGraphicsPushConstantBanks` and `maxComputePushConstantBanks`).

For graphics shaders, both descriptor heap and non-descriptor heap limits
are greater than 1.
For compute shaders, the number of banks is equal to or greater than 1. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePushConstantBankPropertiesNV-sType-sType) VUID-VkPhysicalDevicePushConstantBankPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_CONSTANT_BANK_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceExternalFormatResolvePropertiesANDROID` structure
is defined as:

// Provided by VK_ANDROID_external_format_resolve
typedef struct VkPhysicalDeviceExternalFormatResolvePropertiesANDROID {
    VkStructureType     sType;
    void*               pNext;
    VkBool32            nullColorAttachmentWithExternalFormatResolve;
    VkChromaLocation    externalFormatResolveChromaOffsetX;
    VkChromaLocation    externalFormatResolveChromaOffsetY;
} VkPhysicalDeviceExternalFormatResolvePropertiesANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`nullColorAttachmentWithExternalFormatResolve` indicates that there
**must** be no color attachment image when performing external format
resolves if it is [VK_TRUE](fundamentals.html#VK_TRUE).

* 

`externalFormatResolveChromaOffsetX` indicates the
[VkChromaLocation](samplers.html#VkChromaLocation) that an implementation uses in the X axis for
accesses to an external format image as a resolve attachment.
This **must** be consistent between external format resolves and load
operations from external format resolve attachments to color attachments
when `nullColorAttachmentWithExternalFormatResolve` is
[VK_TRUE](fundamentals.html#VK_TRUE).

* 

`externalFormatResolveChromaOffsetY` indicates the
[VkChromaLocation](samplers.html#VkChromaLocation) that an implementation uses in the Y axis for
accesses to an external format image as a resolve attachment.
This **must** be consistent between external format resolves and load
operations from external format resolve attachments to color attachments
when `nullColorAttachmentWithExternalFormatResolve` is
[VK_TRUE](fundamentals.html#VK_TRUE).

If the `VkPhysicalDeviceExternalFormatResolvePropertiesANDROID` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalFormatResolvePropertiesANDROID-sType-sType) VUID-VkPhysicalDeviceExternalFormatResolvePropertiesANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FORMAT_RESOLVE_PROPERTIES_ANDROID](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDevicePipelineBinaryPropertiesKHR` structure is defined
as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPhysicalDevicePipelineBinaryPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           pipelineBinaryInternalCache;
    VkBool32           pipelineBinaryInternalCacheControl;
    VkBool32           pipelineBinaryPrefersInternalCache;
    VkBool32           pipelineBinaryPrecompiledInternalCache;
    VkBool32           pipelineBinaryCompressedData;
} VkPhysicalDevicePipelineBinaryPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `pipelineBinaryInternalCache`
specifies that the implementation maintains a pipeline cache internal to
the implementation.
If this is [VK_TRUE](fundamentals.html#VK_TRUE), applications **can** create pipeline binaries
with only a pipeline create info, and in this case, an implementation
**may** be able to create a pipeline binary directly without application
needing to capture the binary itself.

* 

`pipelineBinaryInternalCacheControl` specifies whether the driver’s
internal cache **can** be disabled.
If this property is [VK_TRUE](fundamentals.html#VK_TRUE)
[VkDevicePipelineBinaryInternalCacheControlKHR](devsandqueues.html#VkDevicePipelineBinaryInternalCacheControlKHR)::`disableInternalCache`
**can** be used to disable the driver’s internal cache, allowing an
application to take full control of both memory and disk usage.

* 

`pipelineBinaryPrefersInternalCache` specifies that the
implementation prefers to maintain an internal cache, and applications
**should** not store pipeline binaries in their own on-disk caches to avoid
increased on-disk storage requirements.
Applications are encouraged to only store pipeline keys instead, and aim
to create pipeline binaries from key alone on subsequent runs of the
application.

* 

`pipelineBinaryPrecompiledInternalCache` specifies that the
implementation **may** have pipeline binaries in its internal cache, which
is populated without the application ever having generated that pipeline
itself.
Applications **can** attempt to create binaries without extracting pipeline
binary data from the pipeline prior for a set of pipeline keys,
including from previous runs of the application.

* 

`pipelineBinaryCompressedData` specifies that the binary data is
already compressed and so applications **should** not attempt to compress
it.

|  | These properties tend to be platform specific and may change depending on
| --- | --- |
external configuration which is outside the scope of this specification.
These properties are intended to guide applications when implementations
have dedicated caching solutions available.
In particular, if the `pipelineBinaryPrefersInternalCache` limit is
exposed, relying on the internal cache may provide some advantage compared
to an application-specific solution.
An application with its own dedicated solution may still use its own caching
system even with this limit exposed. |

If the `VkPhysicalDevicePipelineBinaryPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePipelineBinaryPropertiesKHR-sType-sType) VUID-VkPhysicalDevicePipelineBinaryPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_BINARY_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceRenderPassStripedPropertiesARM` structure is
defined as:

// Provided by VK_ARM_render_pass_striped
typedef struct VkPhysicalDeviceRenderPassStripedPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         renderPassStripeGranularity;
    uint32_t           maxRenderPassStripes;
} VkPhysicalDeviceRenderPassStripedPropertiesARM;

The members of the `VkPhysicalDeviceRenderPassStripedPropertiesARM`
structure describe the following limits:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `renderPassStripeGranularity`
indicates the minimum supported granularity of striped render pass
regions.

* 
 `maxRenderPassStripes` indicates the
maximum number of stripes supported in striped rendering.

If the `VkPhysicalDeviceRenderPassStripedPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRenderPassStripedPropertiesARM-sType-sType) VUID-VkPhysicalDeviceRenderPassStripedPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RENDER_PASS_STRIPED_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR` structure is
defined as:

// Provided by VK_KHR_compute_shader_derivatives
typedef struct VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           meshAndTaskShaderDerivatives;
} VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR;

The members of the
`VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR` structure
describe the following:

* 

`meshAndTaskShaderDerivatives` indicates whether the mesh and task
shader stages support the `ComputeDerivativeGroupQuadsKHR` and
`ComputeDerivativeGroupLinearKHR` SPIR-V capabilities.

If the `VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR-sType-sType) VUID-VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceMapMemoryPlacedPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_map_memory_placed
typedef struct VkPhysicalDeviceMapMemoryPlacedPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       minPlacedMemoryMapAlignment;
} VkPhysicalDeviceMapMemoryPlacedPropertiesEXT;

The members of the `VkPhysicalDeviceMapMemoryPlacedPropertiesEXT`
structure describe the following:

* 
 `minPlacedMemoryMapAlignment`
is the minimum alignment required for memory object offsets and virtual
address ranges when using placed memory mapping.

If the `VkPhysicalDeviceMapMemoryPlacedPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMapMemoryPlacedPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceMapMemoryPlacedPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAP_MEMORY_PLACED_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceImageAlignmentControlPropertiesMESA` structure is
defined as:

// Provided by VK_MESA_image_alignment_control
typedef struct VkPhysicalDeviceImageAlignmentControlPropertiesMESA {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           supportedImageAlignmentMask;
} VkPhysicalDeviceImageAlignmentControlPropertiesMESA;

The members of the `VkPhysicalDeviceImageAlignmentControlPropertiesMESA`
structure describe the following:

* 
 `supportedImageAlignmentMask`
is a bitwise-or of all potentially supported image alignments for a
given physical device when using [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling).
If a given alignment is supported, the application **can** request an image
to have that alignment.
A given set of image creation parameters **may** support a subset of these
alignments.
To determine if a particular alignment is supported for a given set of
image creation parameters, check
[VkMemoryRequirements](resources.html#VkMemoryRequirements)::`alignment` after chaining in
[VkImageAlignmentControlCreateInfoMESA](resources.html#VkImageAlignmentControlCreateInfoMESA).

If the `VkPhysicalDeviceImageAlignmentControlPropertiesMESA` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageAlignmentControlPropertiesMESA-sType-sType) VUID-VkPhysicalDeviceImageAlignmentControlPropertiesMESA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ALIGNMENT_CONTROL_PROPERTIES_MESA](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceTileShadingPropertiesQCOM` structure is defined as:

// Provided by VK_QCOM_tile_shading
typedef struct VkPhysicalDeviceTileShadingPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxApronSize;
    VkBool32           preferNonCoherent;
    VkExtent2D         tileGranularity;
    VkExtent2D         maxTileShadingRate;
} VkPhysicalDeviceTileShadingPropertiesQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxApronSize` is the maximum value
supported which can be specified for
[VkRenderPassTileShadingCreateInfoQCOM](renderpass.html#VkRenderPassTileShadingCreateInfoQCOM)::`apronSize` or
`width` and `height`.

* 
 `preferNonCoherent` indicates that the
implementation prefers tile attachments declared in shaders with the
`NonCoherentTileAttachmentReadQCOM` decoration.
Use of the decoration **may** offer performance or power advantages.

* 
 `tileGranularity` provides a guarantee on
the granularity of each tile.
Each tile will have dimensions that are a multiple of this granularity
in width and height.

* 
 `maxTileShadingRate` is the maximum
value of `TileShadingRateQCOM` and **must** be a power of 2.

If the `VkPhysicalDeviceTileShadingPropertiesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTileShadingPropertiesQCOM-sType-sType) VUID-VkPhysicalDeviceTileShadingPropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_SHADING_PROPERTIES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceTensorPropertiesARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkPhysicalDeviceTensorPropertiesARM {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              maxTensorDimensionCount;
    uint64_t              maxTensorElements;
    uint64_t              maxPerDimensionTensorElements;
    int64_t               maxTensorStride;
    uint64_t              maxTensorSize;
    uint32_t              maxTensorShaderAccessArrayLength;
    uint32_t              maxTensorShaderAccessSize;
    uint32_t              maxDescriptorSetStorageTensors;
    uint32_t              maxPerStageDescriptorSetStorageTensors;
    uint32_t              maxDescriptorSetUpdateAfterBindStorageTensors;
    uint32_t              maxPerStageDescriptorUpdateAfterBindStorageTensors;
    VkBool32              shaderStorageTensorArrayNonUniformIndexingNative;
    VkShaderStageFlags    shaderTensorSupportedStages;
} VkPhysicalDeviceTensorPropertiesARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxTensorDimensionCount` is the
maximum number of dimensions that can be specified in the
`dimensionCount` member of [VkTensorDescriptionARM](resources.html#VkTensorDescriptionARM).

* 
 `maxTensorElements` is the maximum
number of data elements in a created tensor as specified in the
[VkTensorDescriptionARM](resources.html#VkTensorDescriptionARM) of [VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM).
The number of data elements in a tensor is computed as the product of
`pDimensions`[i] for all 0 ≤ i ≤
dimensionCount-1.

* 

`maxPerDimensionTensorElements` is the maximum number of data
elements alongside any dimension of a tensor.

* 
 `maxTensorStride` is the maximum value
for a tensor stride that can be used in
[VkTensorDescriptionARM](resources.html#VkTensorDescriptionARM)::`pStrides`.

* 
 `maxTensorSize` is the maximum size, in
bytes, of a tensor.

* 

`maxTensorShaderAccessArrayLength` is the maximum number of elements
in an array returned by `OpTensoReadARM` or consumed by
`OpTensorWriteARM`.

* 
 `maxTensorShaderAccessSize` is
the maximum size in bytes of the data that can be read from a tensor
with `OpTensorReadARM` or written to a tensor with
`OpTensorWriteARM`.

* 

`maxDescriptorSetStorageTensors` is the maximum number of tensors
that **can** be included in descriptor bindings in a pipeline layout across
all pipeline shader stages and descriptor set numbers.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) count
against this limit.

* 

`maxPerStageDescriptorSetStorageTensors` is the maximum number of
tensors that **can** be accessible to a single shader stage in a pipeline
layout.
Descriptors with a type of [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType) count
against this limit.
A descriptor is accessible to a pipeline shader stage when the
`stageFlags` member of the [VkDescriptorSetLayoutBinding](descriptorsets.html#VkDescriptorSetLayoutBinding)
structure has the bit for that shader stage set.

* 

`maxDescriptorSetUpdateAfterBindStorageTensors` is similar to
`maxDescriptorSetStorageTensors` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindStorageTensors` is similar to
`maxPerStageDescriptorSetStorageTensors` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`shaderStorageTensorArrayNonUniformIndexingNative` is a boolean
value indicating whether storage tensor descriptors natively support
nonuniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that nonuniformly indexes an array of storage buffers may
execute multiple times in order to access all the descriptors.

* 
 `shaderTensorSupportedStages`
is a bitfield of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) describing the shader
stages that **can** access tensor resources.
`shaderTensorSupportedStages` will have the
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) bit set if any of the physical
device’s queues support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits).

If the `VkPhysicalDeviceTensorPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceTensorPropertiesARM-sType-sType) VUID-VkPhysicalDeviceTensorPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TENSOR_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDevicePerformanceCountersByRegionPropertiesARM` structure
is defined as:

// Provided by VK_ARM_performance_counters_by_region
typedef struct VkPhysicalDevicePerformanceCountersByRegionPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxPerRegionPerformanceCounters;
    VkExtent2D         performanceCounterRegionSize;
    uint32_t           rowStrideAlignment;
    uint32_t           regionAlignment;
    VkBool32           identityTransformOrder;
} VkPhysicalDevicePerformanceCountersByRegionPropertiesARM;

The members of the
`VkPhysicalDevicePerformanceCountersByRegionPropertiesARM` structure
describe the following:

* 
`maxPerRegionPerformanceCounters` is the maximum number of
performance counters that **can** be captured per region.

* 
`performanceCounterRegionSize` is the width and height of each
region for which performance counters **can** be captured.

* 
`rowStrideAlignment` indicates the minimum row alignment for by
region counters.

* 
`regionAlignment` indicates the alignment between each region’s
counter values.

* 
`identityTransformOrder` is a boolean value indicating whether per
region counters are output in framebuffer-space order.

If the `VkPhysicalDevicePerformanceCountersByRegionPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePerformanceCountersByRegionPropertiesARM-sType-sType) VUID-VkPhysicalDevicePerformanceCountersByRegionPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_COUNTERS_BY_REGION_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDescriptorHeapPropertiesEXT` structure is defined
as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkPhysicalDeviceDescriptorHeapPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       samplerHeapAlignment;
    VkDeviceSize       resourceHeapAlignment;
    VkDeviceSize       maxSamplerHeapSize;
    VkDeviceSize       maxResourceHeapSize;
    VkDeviceSize       minSamplerHeapReservedRange;
    VkDeviceSize       minSamplerHeapReservedRangeWithEmbedded;
    VkDeviceSize       minResourceHeapReservedRange;
    VkDeviceSize       samplerDescriptorSize;
    VkDeviceSize       imageDescriptorSize;
    VkDeviceSize       bufferDescriptorSize;
    VkDeviceSize       samplerDescriptorAlignment;
    VkDeviceSize       imageDescriptorAlignment;
    VkDeviceSize       bufferDescriptorAlignment;
    VkDeviceSize       maxPushDataSize;
    size_t             imageCaptureReplayOpaqueDataSize;
    uint32_t           maxDescriptorHeapEmbeddedSamplers;
    uint32_t           samplerYcbcrConversionCount;
    VkBool32           sparseDescriptorHeaps;
    VkBool32           protectedDescriptorHeaps;
} VkPhysicalDeviceDescriptorHeapPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `samplerHeapAlignment` specifies the
required alignment of the `heapRange->address` member of
[VkBindHeapInfoEXT](descriptorheaps.html#VkBindHeapInfoEXT) for binding sampler heaps.
It must be a power-of-two value.

* 
 `resourceHeapAlignment` specifies
the required alignment of the `heapRange->address` member of
[VkBindHeapInfoEXT](descriptorheaps.html#VkBindHeapInfoEXT) for binding resource heaps.
It must be a power-of-two value.

* 
 `maxSamplerHeapSize` describes maximum
value of the `size` member of [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) for
binding sampler heaps, including the reservation, when embedded samplers
are used.

* 
 `maxResourceHeapSize` describes
maximum value of the `size` member of [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
for binding resource heaps, including the reservation.

* 
 `minSamplerHeapReservedRange`
specifies the minimum amount of data that the implementation needs to be
reserved within the bound sampler heap range when embedded samplers are
not used.

* 

`minSamplerHeapReservedRangeWithEmbedded` specifies the minimum
amount of data that the implementation needs to be reserved within the
bound sampler heap range when embedded samplers are used.

* 

`minResourceHeapReservedRange` specifies the minimum amount of data
that the implementation needs to be reserved within the bound resource
heap range.

* 
 `samplerDescriptorSize` specifies
the size of sampler descriptors written by
[vkWriteSamplerDescriptorsEXT](descriptorheaps.html#vkWriteSamplerDescriptorsEXT).
It **must** be a power-of-two value.

* 
 `imageDescriptorSize` specifies the
maximum size of image and texel buffer descriptors written by
[vkWriteResourceDescriptorsEXT](descriptorheaps.html#vkWriteResourceDescriptorsEXT).
It **must** be a power-of-two value.

* 
 `bufferDescriptorSize` specifies the
maximum size of unformatted buffer descriptors
or acceleration structures
written by [vkWriteResourceDescriptorsEXT](descriptorheaps.html#vkWriteResourceDescriptorsEXT).
It **must** be a power-of-two value.

* 
 `samplerDescriptorAlignment`
specifies the required alignment of sampler descriptors within a sampler
heap.
It must be a power-of-two value, and less than or equal to
`samplerDescriptorSize`.

* 
 `imageDescriptorAlignment`
specifies the required alignment of image descriptors within a resource
heap.
It must be a power-of-two value, and less than or equal to
`imageDescriptorSize`.

* 
 `bufferDescriptorAlignment`
specifies the required alignment of buffer descriptors within a resource
heap.
It must be a power-of-two value, and less than or equal to
`bufferDescriptorSize`.

* 
 `maxPushDataSize` specifies the maximum
total size of all push data.

* 

`imageCaptureReplayOpaqueDataSize` specifies the size of the opaque
capture/replay data for an image.

* 

`maxDescriptorHeapEmbeddedSamplers` specifies the maximum number of
unique embedded samplers across all pipelines.

* 
 `samplerYcbcrConversionCount`
specifies the number of sampler descriptors required for any sampler
using YCBCR conversion.

* 
 `sparseDescriptorHeaps` specifies
whether descriptor heaps can be backed by sparse memory or not.
If this value is [VK_FALSE](fundamentals.html#VK_FALSE), buffers cannot be specified as both
sparse and having descriptor heap usage.

* 
 `protectedDescriptorHeaps`
specifies whether descriptor heaps can be used with protected
submissions or not.
If this value is `VK_FALSE`, buffers cannot be specified as both
protected and having descriptor heap usage.

If the `VkPhysicalDeviceDescriptorHeapPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorHeapPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDescriptorHeapPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDescriptorHeapTensorPropertiesARM` structure is
defined as:

// Provided by VK_EXT_descriptor_heap with VK_ARM_tensors
typedef struct VkPhysicalDeviceDescriptorHeapTensorPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       tensorDescriptorSize;
    VkDeviceSize       tensorDescriptorAlignment;
    size_t             tensorCaptureReplayOpaqueDataSize;
} VkPhysicalDeviceDescriptorHeapTensorPropertiesARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `tensorDescriptorSize` specifies the
maximum size of tensor descriptors written by
[vkWriteResourceDescriptorsEXT](descriptorheaps.html#vkWriteResourceDescriptorsEXT).

* 
 `tensorDescriptorAlignment`
specifies the required alignment of tensor descriptors within a resource
heap.
It must be a power-of-two value, and less than or equal to
`tensorDescriptorSize`.

* 

`tensorCaptureReplayOpaqueDataSize` specifies the size of the opaque
capture/replay data for an tensor.

If the `VkPhysicalDeviceDescriptorHeapTensorPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDescriptorHeapTensorPropertiesARM-sType-sType) VUID-VkPhysicalDeviceDescriptorHeapTensorPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_TENSOR_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderInstrumentationPropertiesARM` structure is
defined as:

// Provided by VK_ARM_shader_instrumentation
typedef struct VkPhysicalDeviceShaderInstrumentationPropertiesARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           numMetrics;
    VkBool32           perBasicBlockGranularity;
} VkPhysicalDeviceShaderInstrumentationPropertiesARM;

The members of the `VkPhysicalDeviceShaderInstrumentationPropertiesARM`
structure describe the following:

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`numMetrics` is the number of shader instrumentation metrics
supported.

* 
`perBasicBlockGranularity` is a boolean value indicating whether
shader instrumentation metrics are returned per basic block.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then all metrics for the shader are reported
as basic block index `0`.

If the `VkPhysicalDeviceShaderInstrumentationPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](devsandqueues.html#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderInstrumentationPropertiesARM-sType-sType) VUID-VkPhysicalDeviceShaderInstrumentationPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INSTRUMENTATION_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](devsandqueues.html#VkPhysicalDeviceProperties2)

The following table specifies the **required** minimum/maximum for all Vulkan
graphics implementations.
Where a limit corresponds to a fine-grained device feature which is
**optional**, the feature name is listed with two **required** limits, one when
the feature is supported and one when it is not supported.
If an implementation supports a feature, the limits reported are the same
whether or not the feature is enabled.

| Type | Limit | Feature |
| --- | --- | --- |
| `uint32_t` | `maxImageDimension1D` | - |
| `uint32_t` | `maxImageDimension2D` | - |
| `uint32_t` | `maxImageDimension3D` | - |
| `uint32_t` | `maxImageDimensionCube` | - |
| `uint32_t` | `maxImageArrayLayers` | - |
| `uint32_t` | `maxTexelBufferElements` | - |
| `uint32_t` | `maxUniformBufferRange` | - |
| `uint32_t` | `maxStorageBufferRange` | - |
| `uint32_t` | `maxPushConstantsSize` | - |
| `uint32_t` | `maxMemoryAllocationCount` | - |
| `uint32_t` | `maxSamplerAllocationCount` | - |
| `VkDeviceSize` | `bufferImageGranularity` | - |
| `VkDeviceSize` | `sparseAddressSpaceSize` | `sparseBinding` |
| `uint32_t` | `maxBoundDescriptorSets` | - |
| `uint32_t` | `maxPerStageDescriptorSamplers` | - |
| `uint32_t` | `maxPerStageDescriptorUniformBuffers` | - |
| `uint32_t` | `maxPerStageDescriptorStorageBuffers` | - |
| `uint32_t` | `maxPerStageDescriptorSampledImages` | - |
| `uint32_t` | `maxPerStageDescriptorStorageImages` | - |
| `uint32_t` | `maxPerStageDescriptorInputAttachments` | - |
| `uint32_t` | `maxPerStageResources` | - |
| `uint32_t` | `maxDescriptorSetSamplers` | - |
| `uint32_t` | `maxDescriptorSetUniformBuffers` | - |
| `uint32_t` | `maxDescriptorSetUniformBuffersDynamic` | - |
| `uint32_t` | `maxDescriptorSetStorageBuffers` | - |
| `uint32_t` | `maxDescriptorSetStorageBuffersDynamic` | - |
| `uint32_t` | `maxDescriptorSetSampledImages` | - |
| `uint32_t` | `maxDescriptorSetStorageImages` | - |
| `uint32_t` | `maxDescriptorSetInputAttachments` | - |
| `uint32_t` | `maxVertexInputAttributes` | - |
| `uint32_t` | `maxVertexInputBindings` | - |
| `uint32_t` | `maxVertexInputAttributeOffset` | - |
| `uint32_t` | `maxVertexInputBindingStride` | - |
| `uint32_t` | `maxVertexOutputComponents` | - |
| `uint32_t` | `maxTessellationGenerationLevel` | `tessellationShader` |
| `uint32_t` | `maxTessellationPatchSize` | `tessellationShader` |
| `uint32_t` | `maxTessellationControlPerVertexInputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationControlPerVertexOutputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationControlPerPatchOutputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationControlTotalOutputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationEvaluationInputComponents` | `tessellationShader` |
| `uint32_t` | `maxTessellationEvaluationOutputComponents` | `tessellationShader` |
| `uint32_t` | `maxGeometryShaderInvocations` | `geometryShader` |
| `uint32_t` | `maxGeometryInputComponents` | `geometryShader` |
| `uint32_t` | `maxGeometryOutputComponents` | `geometryShader` |
| `uint32_t` | `maxGeometryOutputVertices` | `geometryShader` |
| `uint32_t` | `maxGeometryTotalOutputComponents` | `geometryShader` |
| `uint32_t` | `maxFragmentInputComponents` | - |
| `uint32_t` | `maxFragmentOutputAttachments` | - |
| `uint32_t` | `maxFragmentDualSrcAttachments` | `dualSrcBlend` |
| `uint32_t` | `maxFragmentCombinedOutputResources` | - |
| `uint32_t` | `maxComputeSharedMemorySize` | - |
| 3 × `uint32_t` | `maxComputeWorkGroupCount` | - |
| `uint32_t` | `maxComputeWorkGroupInvocations` | - |
| 3 × `uint32_t` | `maxComputeWorkGroupSize` | - |
| `uint32_t` | `subPixelPrecisionBits` | - |
| `uint32_t` | `subTexelPrecisionBits` | - |
| `uint32_t` | `mipmapPrecisionBits` | - |
| `uint32_t` | `maxDrawIndexedIndexValue` | `fullDrawIndexUint32` |
| `uint32_t` | `maxDrawIndirectCount` | `multiDrawIndirect` |
| `float` | `maxSamplerLodBias` | - |
| `float` | `maxSamplerAnisotropy` | `samplerAnisotropy` |
| `uint32_t` | `maxViewports` | `multiViewport` |
| 2 × `uint32_t` | `maxViewportDimensions` | - |
| 2 × `float` | `viewportBoundsRange` | - |
| `uint32_t` | `viewportSubPixelBits` | - |
| `size_t` | `minMemoryMapAlignment` | - |
| `VkDeviceSize` | `minTexelBufferOffsetAlignment` | - |
| `VkDeviceSize` | `minUniformBufferOffsetAlignment` | - |
| `VkDeviceSize` | `minStorageBufferOffsetAlignment` | - |
| `int32_t` | `minTexelOffset` | - |
| `uint32_t` | `maxTexelOffset` | - |
| `int32_t` | `minTexelGatherOffset` | `shaderImageGatherExtended` |
| `uint32_t` | `maxTexelGatherOffset` | `shaderImageGatherExtended` |
| `float` | `minInterpolationOffset` | `sampleRateShading` |
| `float` | `maxInterpolationOffset` | `sampleRateShading` |
| `uint32_t` | `subPixelInterpolationOffsetBits` | `sampleRateShading` |
| `uint32_t` | `maxFramebufferWidth` | - |
| `uint32_t` | `maxFramebufferHeight` | - |
| `uint32_t` | `maxFramebufferLayers` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `framebufferColorSampleCounts` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `framebufferIntegerColorSampleCounts` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `framebufferDepthSampleCounts` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `framebufferStencilSampleCounts` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `framebufferNoAttachmentsSampleCounts` | - |
| `uint32_t` | `maxColorAttachments` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `sampledImageColorSampleCounts` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `sampledImageIntegerSampleCounts` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `sampledImageDepthSampleCounts` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `sampledImageStencilSampleCounts` | - |
| [VkSampleCountFlags](#VkSampleCountFlags) | `storageImageSampleCounts` | `shaderStorageImageMultisample` |
| `uint32_t` | `maxSampleMaskWords` | - |
| `VkBool32` | `timestampComputeAndGraphics` | - |
| `float` | `timestampPeriod` | - |
| `uint32_t` | `maxClipDistances` | `shaderClipDistance` |
| `uint32_t` | `maxCullDistances` | `shaderCullDistance` |
| `uint32_t` | `maxCombinedClipAndCullDistances` | `shaderCullDistance` |
| `uint32_t` | `discreteQueuePriorities` | - |
| 2 × `float` | `pointSizeRange` | `largePoints` |
| 2 × `float` | `lineWidthRange` | `wideLines` |
| `float` | `pointSizeGranularity` | `largePoints` |
| `float` | `lineWidthGranularity` | `wideLines` |
| `VkBool32` | `strictLines` | - |
| `VkBool32` | `standardSampleLocations` | - |
| `VkDeviceSize` | `optimalBufferCopyOffsetAlignment` | - |
| `VkDeviceSize` | `optimalBufferCopyRowPitchAlignment` | - |
| `VkDeviceSize` | `nonCoherentAtomSize` | - |
| `uint32_t` | `maxDiscardRectangles` | `[VK_EXT_discard_rectangles](../appendices/extensions.html#VK_EXT_discard_rectangles)` |
| `VkBool32` | `filterMinmaxSingleComponentFormats` | `[samplerFilterMinmax`](features.html#features-samplerFilterMinmax)
`[VK_EXT_sampler_filter_minmax](../appendices/extensions.html#VK_EXT_sampler_filter_minmax)` |
| `VkBool32` | `filterMinmaxImageComponentMapping` | `[samplerFilterMinmax`](features.html#features-samplerFilterMinmax)
`[VK_EXT_sampler_filter_minmax](../appendices/extensions.html#VK_EXT_sampler_filter_minmax)` |
| `VkDeviceSize` | `maxBufferSize` | `[maintenance4`](features.html#features-maintenance4) |
| `float` | `primitiveOverestimationSize` | `[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` |
| `VkBool32` | `maxExtraPrimitiveOverestimationSize` | `[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` |
| `float` | `extraPrimitiveOverestimationSizeGranularity` | `[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` |
| `VkBool32` | `degenerateTriangleRasterized` | `[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` |
| `float` | `degenerateLinesRasterized` | `[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` |
| `VkBool32` | `fullyCoveredFragmentShaderInputVariable` | `[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` |
| `VkBool32` | `conservativeRasterizationPostDepthCoverage` | `[VK_EXT_conservative_rasterization](../appendices/extensions.html#VK_EXT_conservative_rasterization)` |
| `uint32_t` | `maxUpdateAfterBindDescriptorsInAllPools` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `VkBool32` | `shaderUniformBufferArrayNonUniformIndexingNative` | - |
| `VkBool32` | `shaderSampledImageArrayNonUniformIndexingNative` | - |
| `VkBool32` | `shaderStorageBufferArrayNonUniformIndexingNative` | - |
| `VkBool32` | `shaderStorageImageArrayNonUniformIndexingNative` | - |
| `VkBool32` | `shaderInputAttachmentArrayNonUniformIndexingNative` | - |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindSamplers` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindUniformBuffers` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindStorageBuffers` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindSampledImages` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindStorageImages` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindInputAttachments` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxPerStageUpdateAfterBindResources` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindSamplers` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindUniformBuffers` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindStorageBuffers` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindSampledImages` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindStorageImages` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindInputAttachments` | `[descriptorIndexing`](features.html#features-descriptorIndexing) |
| `uint32_t` | `maxInlineUniformBlockSize` | `[inlineUniformBlock`](features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxPerStageDescriptorInlineUniformBlocks` | `[inlineUniformBlock`](features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks` | `[inlineUniformBlock`](features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxDescriptorSetInlineUniformBlocks` | `[inlineUniformBlock`](features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindInlineUniformBlocks` | `[inlineUniformBlock`](features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxInlineUniformTotalSize` | `[inlineUniformBlock`](features.html#features-inlineUniformBlock) |
| `uint32_t` | `maxVertexAttribDivisor` | Vulkan 1.4, [VK_KHR_vertex_attribute_divisor](../appendices/extensions.html#VK_KHR_vertex_attribute_divisor), [VK_EXT_vertex_attribute_divisor](../appendices/extensions.html#VK_EXT_vertex_attribute_divisor) |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxDrawMeshTasksCount` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxTaskWorkGroupInvocations` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxTaskWorkGroupSize` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxTaskTotalMemorySize` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxTaskOutputCount` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshWorkGroupInvocations` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshWorkGroupSize` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshTotalMemorySize` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshOutputVertices` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshOutputPrimitives` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshMultiviewViewCount` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`meshOutputPerVertexGranularity` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`meshOutputPerPrimitiveGranularity` | `[VK_NV_mesh_shader](../appendices/extensions.html#VK_NV_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupTotalCount` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupCount` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupInvocations` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupSize` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskPayloadSize` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskSharedMemorySize` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskPayloadAndSharedMemorySize` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupTotalCount` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupCount` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupInvocations` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| 3 × `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupSize` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshSharedMemorySize` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshPayloadAndSharedMemorySize` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputMemorySize` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshPayloadAndOutputMemorySize` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputComponents` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputVertices` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputPrimitives` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputLayers` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshMultiviewViewCount` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`meshOutputPerVertexGranularity` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`meshOutputPerPrimitiveGranularity` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxPreferredTaskWorkGroupInvocations` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxPreferredMeshWorkGroupInvocations` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `VkBool32` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`prefersLocalInvocationVertexOutput` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `VkBool32` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`prefersLocalInvocationPrimitiveOutput` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `VkBool32` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`prefersCompactVertexOutput` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `VkBool32` | [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`prefersCompactPrimitiveOutput` | `[VK_EXT_mesh_shader](../appendices/extensions.html#VK_EXT_mesh_shader)` |
| `uint32_t` | `maxTransformFeedbackStreams` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| `uint32_t` | `maxTransformFeedbackBuffers` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| `VkDeviceSize` | `maxTransformFeedbackBufferSize` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| `uint32_t` | `maxTransformFeedbackStreamDataSize` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| `uint32_t` | `maxTransformFeedbackBufferDataSize` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| `uint32_t` | `maxTransformFeedbackBufferDataStride` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| `VkBool32` | `transformFeedbackQueries` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| `VkBool32` | `transformFeedbackStreamsLinesTriangles` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| `VkBool32` | `transformFeedbackRasterizationStreamSelect` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| `VkBool32` | `transformFeedbackDraw` | `[VK_EXT_transform_feedback](../appendices/extensions.html#VK_EXT_transform_feedback)` |
| [VkExtent2D](fundamentals.html#VkExtent2D) | `minFragmentDensityTexelSize` | `[fragmentDensityMap`](features.html#features-fragmentDensityMap) |
| [VkExtent2D](fundamentals.html#VkExtent2D) | `maxFragmentDensityTexelSize` | `[fragmentDensityMap`](features.html#features-fragmentDensityMap) |
| `VkBool32` | `fragmentDensityInvocations` | `[fragmentDensityMap`](features.html#features-fragmentDensityMap) |
| `VkBool32` | `subsampledLoads` | `[VK_EXT_fragment_density_map2](../appendices/extensions.html#VK_EXT_fragment_density_map2)` |
| `VkBool32` | `subsampledCoarseReconstructionEarlyAccess` | `[VK_EXT_fragment_density_map2](../appendices/extensions.html#VK_EXT_fragment_density_map2)` |
| `uint32_t` | `maxSubsampledArrayLayers` | `[VK_EXT_fragment_density_map2](../appendices/extensions.html#VK_EXT_fragment_density_map2)` |
| `uint32_t` | `maxDescriptorSetSubsampledSamplers` | `[VK_EXT_fragment_density_map2](../appendices/extensions.html#VK_EXT_fragment_density_map2)` |
| [VkExtent2D](fundamentals.html#VkExtent2D) | `fragmentDensityOffsetGranularity` | `[fragmentDensityMapOffset`](features.html#features-fragmentDensityMapOffset) |
| `uint32_t` | `maxFragmentDensityMapLayers` | `[fragmentDensityMapLayered`](features.html#features-fragmentDensityMapLayered) |
| `uint32_t` | `maxGeometryCount` | `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)`, `[VK_KHR_acceleration_structure](../appendices/extensions.html#VK_KHR_acceleration_structure)` |
| `uint32_t` | `maxInstanceCount` | `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)`, `[VK_KHR_acceleration_structure](../appendices/extensions.html#VK_KHR_acceleration_structure)` |
| `uint32_t` | `maxVerticesPerCluster` | `[clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `maxTrianglesPerCluster` | `[clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterScratchByteAlignment` | `[clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterByteAlignment` | `[clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterTemplateByteAlignment` | `[clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterBottomLevelByteAlignment` | `[clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `clusterTemplateBoundsByteAlignment` | `[clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `maxClusterGeometryIndex` | `[clusterAccelerationStructure`](features.html#features-clusterAccelerationStructure) |
| `uint32_t` | `shaderGroupHandleSize` | `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)`, `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` |
| `uint32_t` | `maxShaderGroupStride` | `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)`, `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` |
| `uint32_t` | `shaderGroupBaseAlignment` | `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)`, `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` |
| `uint32_t` | `maxRecursionDepth` | `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)` |
| `uint32_t` | `maxTriangleCount` | `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)` |
| `uint32_t` | `maxPerStageDescriptorAccelerationStructures` | `[VK_KHR_acceleration_structure](../appendices/extensions.html#VK_KHR_acceleration_structure)` |
| `uint32_t` | `maxPerStageDescriptorUpdateAfterBindAccelerationStructures` | `[VK_KHR_acceleration_structure](../appendices/extensions.html#VK_KHR_acceleration_structure)` |
| `uint32_t` | `maxDescriptorSetAccelerationStructures` | `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing)`, `[VK_KHR_acceleration_structure](../appendices/extensions.html#VK_KHR_acceleration_structure)` |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindAccelerationStructures` | `[VK_KHR_acceleration_structure](../appendices/extensions.html#VK_KHR_acceleration_structure)` |
| `uint32_t` | `minAccelerationStructureScratchOffsetAlignment` | `[VK_KHR_acceleration_structure](../appendices/extensions.html#VK_KHR_acceleration_structure)` |
| `uint32_t` | `maxRayRecursionDepth` | `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` |
| `uint32_t` | `shaderGroupHandleCaptureReplaySize` | `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` |
| `uint32_t` | `maxRayDispatchInvocationCount` | `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` |
| `uint32_t` | `shaderGroupHandleAlignment` | `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` |
| `uint32_t` | `maxRayHitAttributeSize` | `[VK_KHR_ray_tracing_pipeline](../appendices/extensions.html#VK_KHR_ray_tracing_pipeline)` |
| `uint32_t` | `maxPartitionCount` | `[partitionedAccelerationStructure`](features.html#features-partitionedAccelerationStructure) |
| `uint64_t` | `maxTimelineSemaphoreValueDifference` | `[timelineSemaphore`](features.html#features-timelineSemaphore) |
| `uint32_t` | `lineSubPixelPrecisionBits` | Vulkan 1.4, [VK_KHR_line_rasterization](../appendices/extensions.html#VK_KHR_line_rasterization), [VK_EXT_line_rasterization](../appendices/extensions.html#VK_EXT_line_rasterization) |
| `uint32_t` | `maxCustomBorderColorSamplers` | `[VK_EXT_custom_border_color](../appendices/extensions.html#VK_EXT_custom_border_color)` |
| `VkDeviceSize` | `robustStorageBufferAccessSizeAlignment` | `[VK_EXT_robustness2](../appendices/extensions.html#VK_EXT_robustness2)`, `[VK_KHR_robustness2](../appendices/extensions.html#VK_KHR_robustness2)` |
| `VkDeviceSize` | `robustUniformBufferAccessSizeAlignment` | `[VK_EXT_robustness2](../appendices/extensions.html#VK_EXT_robustness2)`, `[VK_KHR_robustness2](../appendices/extensions.html#VK_KHR_robustness2)` |
| 2 × `uint32_t` | `minFragmentShadingRateAttachmentTexelSize` | `[attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) |
| 2 × `uint32_t` | `maxFragmentShadingRateAttachmentTexelSize` | `[attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) |
| `uint32_t` | `maxFragmentShadingRateAttachmentTexelSizeAspectRatio` | `[attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) |
| `VkBool32` | `primitiveFragmentShadingRateWithMultipleViewports` | `[primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate) |
| `VkBool32` | `layeredShadingRateAttachments` | `[attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateNonTrivialCombinerOps` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| 2 × `uint32_t` | `maxFragmentSize` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| `uint32_t` | `maxFragmentSizeAspectRatio` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| `uint32_t` | `maxFragmentShadingRateCoverageSamples` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| [VkSampleCountFlagBits](#VkSampleCountFlagBits) | `maxFragmentShadingRateRasterizationSamples` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithShaderDepthStencilWrites` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithSampleMask` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithShaderSampleMask` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithConservativeRasterization` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithFragmentShaderInterlock` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateWithCustomSampleLocations` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| `VkBool32` | `fragmentShadingRateStrictMultiplyCombiner` | `[pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) |
| [VkSampleCountFlagBits](#VkSampleCountFlagBits) | `maxFragmentShadingRateInvocationCount` | `[supersampleFragmentShadingRates`](features.html#features-supersampleFragmentShadingRates) |
| `VkBool32` | `combinedImageSamplerDescriptorSingleArray` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkBool32` | `bufferlessPushDescriptors` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkBool32` | `allowSamplerImageViewPostSubmitCreation` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `descriptorBufferOffsetAlignment` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxDescriptorBufferBindings` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxResourceDescriptorBufferBindings` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxSamplerDescriptorBufferBindings` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxEmbeddedImmutableSamplerBindings` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxEmbeddedImmutableSamplers` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `bufferCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `imageCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `imageViewCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `samplerCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `accelerationStructureCaptureReplayDescriptorDataSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `samplerDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `combinedImageSamplerDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `sampledImageDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `storageImageDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `uniformTexelBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `robustUniformTexelBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `storageTexelBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `robustStorageTexelBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `uniformBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `robustUniformBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `storageBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `robustStorageBufferDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `inputAttachmentDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `accelerationStructureDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `maxSamplerDescriptorBufferRange` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `maxResourceDescriptorBufferRange` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `samplerDescriptorBufferAddressSpaceSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `resourceDescriptorBufferAddressSpaceSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `VkDeviceSize` | `descriptorBufferAddressSpaceSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `size_t` | `combinedImageSamplerDensityMapDescriptorSize` | `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)` |
| `uint32_t` | `maxSubpassShadingWorkgroupSizeAspectRatio` | `[subpassShading`](features.html#features-subpassShading) |
| `VkBool32` | `graphicsPipelineLibraryFastLinking` | `[graphicsPipelineLibrary`](features.html#features-graphicsPipelineLibrary) |
| `VkBool32` | `graphicsPipelineLibraryIndependentInterpolationDecoration` | `[graphicsPipelineLibrary`](features.html#features-graphicsPipelineLibrary) |
| `VkBool32` | `triStripVertexOrderIndependentOfProvokingVertex` | - |
| `uint32_t` | `maxWeightFilterPhases` | `[textureSampleWeighted`](features.html#features-textureSampleWeighted) |
| 2 × `uint32_t` | `maxWeightFilterDimension` | `[textureSampleWeighted`](features.html#features-textureSampleWeighted) |
| 2 × `uint32_t` | `maxBlockMatchRegion` | `[textureBlockMatch`](features.html#features-textureBlockMatch) |
| 2 × `uint32_t` | `maxBoxFilterBlockSize` | `[textureBoxFilter`](features.html#features-textureBoxFilter) |
| `VkBool32` | `dynamicPrimitiveTopologyUnrestricted` | `[VK_EXT_extended_dynamic_state3](../appendices/extensions.html#VK_EXT_extended_dynamic_state3)` |
| `uint32_t` | `maxOpacity2StateSubdivisionLevel` | `[VK_EXT_opacity_micromap](../appendices/extensions.html#VK_EXT_opacity_micromap)` |
| `uint32_t` | `maxOpacity4StateSubdivisionLevel` | `[VK_EXT_opacity_micromap](../appendices/extensions.html#VK_EXT_opacity_micromap)` |
| `uint64_t` | `maxDecompressionIndirectCount` | `[VK_NV_memory_decompression](../appendices/extensions.html#VK_NV_memory_decompression)`, `[VK_EXT_memory_decompression](../appendices/extensions.html#VK_EXT_memory_decompression)` |
| 3 × `uint32_t` | `maxWorkGroupCount` | `[VK_HUAWEI_cluster_culling_shader](../appendices/extensions.html#VK_HUAWEI_cluster_culling_shader)` |
| 3 × `uint32_t` | `maxWorkGroupSize` | `[VK_HUAWEI_cluster_culling_shader](../appendices/extensions.html#VK_HUAWEI_cluster_culling_shader)` |
| `uint32_t` | `maxOutputClusterCount` | `[VK_HUAWEI_cluster_culling_shader](../appendices/extensions.html#VK_HUAWEI_cluster_culling_shader)` |
| `VkDeviceSize` | `indirectBufferOffsetAlignment` | `[VK_HUAWEI_cluster_culling_shader](../appendices/extensions.html#VK_HUAWEI_cluster_culling_shader)` |
| `uint32_t` | `maxExecutionGraphDepth` | `[shaderEnqueue`](features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphShaderOutputNodes` | `[shaderEnqueue`](features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphShaderPayloadSize` | `[shaderEnqueue`](features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphShaderPayloadCount` | `[shaderEnqueue`](features.html#features-shaderEnqueue) |
| `uint32_t` | `executionGraphDispatchAddressAlignment` | `[shaderEnqueue`](features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphVertexBufferBindings` | `[shaderEnqueue`](features.html#features-shaderEnqueue) |
| 3 × `uint32_t` | `maxExecutionGraphWorkgroupCount` | `[shaderEnqueue`](features.html#features-shaderEnqueue) |
| `uint32_t` | `maxExecutionGraphWorkgroups` | `[shaderEnqueue`](features.html#features-shaderEnqueue) |
| `uint32_t` | `maxIndirectShaderObjectCount` | `[shaderObject`](features.html#features-shaderObject) |
| `VkDeviceSize` | `extendedSparseAddressSpaceSize` | `sparseBinding`, `[extendedSparseAddressSpace`](features.html#features-extendedSparseAddressSpace) |
| `uint32_t` | `supportedImageAlignmentMask` | `[imageAlignmentControl`](features.html#features-imageAlignmentControl) |
| `VkBool32` | `separateDepthStencilAttachmentAccess` | [`maintenance7`](features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetTotalUniformBuffersDynamic` | `[maintenance7`](features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetTotalStorageBuffersDynamic` | `[maintenance7`](features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetTotalBuffersDynamic` | `[maintenance7`](features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic` | `[maintenance7`](features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic` | `[maintenance7`](features.html#features-maintenance7) |
| `uint32_t` | `maxDescriptorSetUpdateAfterBindTotalBuffersDynamic` | `[maintenance7`](features.html#features-maintenance7) |
| `uint32_t` | `cooperativeMatrixWorkgroupScopeMaxWorkgroupSize` | `[cooperativeMatrixWorkgroupScope`](features.html#features-cooperativeMatrixWorkgroupScope) |
| `uint32_t` | `cooperativeMatrixFlexibleDimensionsMaxDimension` | `[cooperativeMatrixFlexibleDimensions`](features.html#features-cooperativeMatrixFlexibleDimensions) |
| `uint32_t` | `cooperativeMatrixWorkgroupScopeReservedSharedMemory` | `[cooperativeMatrixWorkgroupScope`](features.html#features-cooperativeMatrixWorkgroupScope) |
| `VkBool32` | `shaderSignedZeroInfNanPreserveFloat16` | `[shaderFloat16`](features.html#features-shaderFloat16) |
| `VkBool32` | `cooperativeVectorTrainingFloat16Accumulation` | - |
| `VkBool32` | `cooperativeVectorTrainingFloat32Accumulation` | - |
| `uint32_t` | `maxApronSize` | `[tileShadingApron`](features.html#features-tileShadingApron) |
| `VkBool32` | `preferNonCoherent` | `[tileShading`](features.html#features-tileShading) |
| 2 × `uint32_t` | `tileGranularity` | `[tileShading`](features.html#features-tileShading) |
| 2 × `uint32_t` | `maxTileShadingRate` | `[tileShadingDispatchTile`](features.html#features-tileShadingDispatchTile) |
| `uint32_t` | `maxShaderBindingTableRecordIndex` | `[VK_EXT_ray_tracing_invocation_reorder](../appendices/extensions.html#VK_EXT_ray_tracing_invocation_reorder)` |
| `VkBool32` | `resolveSrgbFormatAppliesTransferFunction` | `[maintenance10`](features.html#features-maintenance10) |
| `VkBool32` | `resolveSrgbFormatSupportsTransferFunctionControl` | `[maintenance10`](features.html#features-maintenance10) |
| `VkDeviceSize` | `samplerHeapAlignment` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `resourceHeapAlignment` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `maxSamplerHeapSize` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `maxResourceHeapSize` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `minSamplerHeapReservedRange` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `minSamplerHeapReservedRangeWithEmbedded` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `minResourceHeapReservedRange` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `samplerDescriptorSize` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `imageDescriptorSize` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `bufferDescriptorSize` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `samplerDescriptorAlignment` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `imageDescriptorAlignment` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `bufferDescriptorAlignment` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `VkDeviceSize` | `maxPushDataSize` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `size_t` | `imageCaptureReplayOpaqueDataSize` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `uint32_t` | `maxDescriptorHeapEmbeddedSamplers` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `uint32_t` | `samplerYcbcrConversionCount` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `uint32_t` | `sparseDescriptorHeaps` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `uint32_t` | `protectedDescriptorHeaps` | [`descriptorHeap`](features.html#features-descriptorHeap) |
| `uint32_t` | `numMetrics` | [`shaderInstrumentation`](features.html#features-shaderInstrumentation) |
| `VkBool32` | `perBasicBlockGranularity` | [`shaderInstrumentation`](features.html#features-shaderInstrumentation) |

| Limit | Unsupported Limit | Supported Limit | Limit Type1 |
| --- | --- | --- | --- |
| `maxImageDimension1D` | - | 4096 (Vulkan Core)

                                                   8192 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxImageDimension2D` | - | 4096 (Vulkan Core)

                                                   8192 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxImageDimension3D` | - | 256 (Vulkan Core)

                                                   512 (Vulkan 1.4) | min |
| `maxImageDimensionCube` | - | 4096 (Vulkan Core)

                                                   8192 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxImageArrayLayers` | - | 256 (Vulkan Core)

                                                   2048 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxTexelBufferElements` | - | 65536 | min |
| `maxUniformBufferRange` | - | 16384 (Vulkan Core)

                                                   65536 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxStorageBufferRange` | - | 227 | min |
| `maxPushConstantsSize` | - | 128 (Vulkan Core)

                                                   256 (Vulkan 1.4) | min |
| `maxMemoryAllocationCount` | - | 4096 | min |
| `maxSamplerAllocationCount` | - | 4000 | min |
| `bufferImageGranularity` | - | 131072 (Vulkan Core)

                                                   4096 (Vulkan Roadmap 2022, Vulkan 1.4) | max |
| `sparseAddressSpaceSize` | 0 | 231 | min |
| `maxBoundDescriptorSets` | - | 4 (Vulkan Core)

                                                   7 (Vulkan Roadmap 2024, Vulkan 1.4) | min |
| `maxPerStageDescriptorSamplers` | - | 16 (Vulkan Core)

                                                   64 (Vulkan Roadmap 2022) | min |
| `maxPerStageDescriptorUniformBuffers` | - | 12 (Vulkan Core)

                                                   15 (Vulkan Roadmap 2022, Vulkan 1.4)

                                                   200 (Vulkan Roadmap 2026) | min |
| `maxPerStageDescriptorStorageBuffers` | - | 4 (Vulkan Core)

                                                   30 (Vulkan Roadmap 2022)

                                                   200 (Vulkan Roadmap 2026) | min |
| `maxPerStageDescriptorSampledImages` | - | 16 (Vulkan Core)

                                                   200 (Vulkan Roadmap 2022) | min |
| `maxPerStageDescriptorStorageImages` | - | 4 (Vulkan Core)

                                                   144 (Vulkan Roadmap 2022) | min |
| `maxPerStageDescriptorInputAttachments` | - | 4

                                                   8 (Vulkan Roadmap 2026) | min |
| `maxPerStageResources` | - | 128 2 (Vulkan Core)

                                                   200 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxDescriptorSetSamplers` | - | 96 8 (Vulkan Core)

                                                   576 (Vulkan Roadmap 2022) | min, *n* × PerStage |
| `maxDescriptorSetUniformBuffers` | - | 72 8 (Vulkan Core)

                                                   90 (Vulkan Roadmap 2022, Vulkan 1.4)

                                                   1800 (Vulkan Roadmap 2026) | min, *n* × PerStage |
| `maxDescriptorSetUniformBuffersDynamic` | - | 8 | min |
| `maxDescriptorSetStorageBuffers` | - | 24 8 (Vulkan Core)

                                                   96 (Vulkan Roadmap 2022, Vulkan 1.4)

                                                   1800 (Vulkan Roadmap 2026) | min, *n* × PerStage |
| `maxDescriptorSetStorageBuffersDynamic` | - | 4 | min |
| `maxDescriptorSetTotalUniformBuffersDynamic` | - | `maxDescriptorSetUniformBuffersDynamic` | min |
| `maxDescriptorSetTotalStorageBuffersDynamic` | - | `maxDescriptorSetStorageBuffersDynamic` | min |
| `maxDescriptorSetTotalBuffersDynamic` | - | `maxDescriptorSetUniformBuffersDynamic` +  `maxDescriptorSetStorageBuffersDynamic` | min |
| `maxDescriptorSetSampledImages` | - | 96 8 (Vulkan Core)

                                                   1800 (Vulkan Roadmap 2022) | min, *n* × PerStage |
| `maxDescriptorSetStorageImages` | - | 24 8 (Vulkan Core)

                                                   144 (Vulkan Roadmap 2022, Vulkan 1.4) | min, *n* × PerStage |
| `maxDescriptorSetInputAttachments` | - | 4

                                                   8 (Vulkan Roadmap 2026) | min |
| `maxVertexInputAttributes` | - | 16 | min |
| `maxVertexInputBindings` | - | 16 10 | min |
| `maxVertexInputAttributeOffset` | - | 2047 | min |
| `maxVertexInputBindingStride` | - | 2048 | min |
| `maxVertexOutputComponents` | - | 64

                                                   124 (Vulkan Roadmap 2026) | min |
| `maxTessellationGenerationLevel` | 0 | 64 | min |
| `maxTessellationPatchSize` | 0 | 32 | min |
| `maxTessellationControlPerVertexInputComponents` | 0 | 64

                                                              128 (Vulkan Roadmap 2026) | min |
| `maxTessellationControlPerVertexOutputComponents` | 0 | 64

                                                              128 (Vulkan Roadmap 2026) | min |
| `maxTessellationControlPerPatchOutputComponents` | 0 | 120 | min |
| `maxTessellationControlTotalOutputComponents` | 0 | 2048

                                                              4096 (Vulkan Roadmap 2026) | min |
| `maxTessellationEvaluationInputComponents` | 0 | 64

                                                              128 (Vulkan Roadmap 2026) | min |
| `maxTessellationEvaluationOutputComponents` | 0 | 64

                                                              128 (Vulkan Roadmap 2026) | min |
| `maxGeometryShaderInvocations` | 0 | 32 | min |
| `maxGeometryInputComponents` | 0 | 64 | min |
| `maxGeometryOutputComponents` | 0 | 64

                                                   128 (Vulkan Roadmap 2026) | min |
| `maxGeometryOutputVertices` | 0 | 256 | min |
| `maxGeometryTotalOutputComponents` | 0 | 1024 | min |
| `maxFragmentInputComponents` | - | 64

                                                   112 (Vulkan Roadmap 2026) | min |
| `maxFragmentOutputAttachments` | - | 4

                                                   8 (Vulkan Roadmap 2026) | min |
| `maxFragmentDualSrcAttachments` | 0 | 1 | min |
| `maxFragmentCombinedOutputResources` | - | 4 (Vulkan Core)

                                                   16 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxComputeSharedMemorySize` | - | 16384

                                                   32768 (Vulkan Roadmap 2026) | min |
| `maxComputeWorkGroupCount` | - | (65535,65535,65535) | min |
| `maxComputeWorkGroupInvocations` | - | 128 (Vulkan Core)

                                                   256 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxComputeWorkGroupSize` | - | (128,128,64) (Vulkan Core)

                                                   (256,256,64) (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `subgroupSize` | - | 1/4 (Vulkan Core)

                                                   4 (Vulkan Roadmap 2022) | min |
| `subgroupSupportedStages` | - | [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) (Vulkan Core)

                                                   [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) \|

                                                   [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) (Vulkan Roadmap 2022) | bitfield |
| `subgroupSupportedOperations` | - | [VK_SUBGROUP_FEATURE_BASIC_BIT](#VkSubgroupFeatureFlagBits) (Vulkan Core)

                                                   [VK_SUBGROUP_FEATURE_BASIC_BIT](#VkSubgroupFeatureFlagBits) \|

                                                   [VK_SUBGROUP_FEATURE_VOTE_BIT](#VkSubgroupFeatureFlagBits) \|

                                                   [VK_SUBGROUP_FEATURE_ARITHMETIC_BIT](#VkSubgroupFeatureFlagBits) \|

                                                   [VK_SUBGROUP_FEATURE_BALLOT_BIT](#VkSubgroupFeatureFlagBits) \|

                                                   [VK_SUBGROUP_FEATURE_SHUFFLE_BIT](#VkSubgroupFeatureFlagBits) \|

                                                   [VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT](#VkSubgroupFeatureFlagBits) \|

                                                   [VK_SUBGROUP_FEATURE_QUAD_BIT](#VkSubgroupFeatureFlagBits) (Vulkan Roadmap 2022) | bitfield |
| `shaderSignedZeroInfNanPreserveFloat16` | - | - (Vulkan Core)

                                                    [VK_TRUE](fundamentals.html#VK_TRUE) (Vulkan Roadmap 2022, Vulkan 1.4) | Boolean |
| `shaderSignedZeroInfNanPreserveFloat32` | - | - (Vulkan Core)

                                                    [VK_TRUE](fundamentals.html#VK_TRUE) (Vulkan Roadmap 2022, Vulkan 1.4) | Boolean |
| `shaderRoundingModeRTEFloat16` | - | [VK_FALSE](fundamentals.html#VK_FALSE) (Vulkan Core)

                                                    [VK_TRUE](fundamentals.html#VK_TRUE) (Vulkan Roadmap 2024) | Boolean |
| `shaderRoundingModeRTEFloat32` | - | [VK_FALSE](fundamentals.html#VK_FALSE) (Vulkan Core)

                                                    [VK_TRUE](fundamentals.html#VK_TRUE) (Vulkan Roadmap 2024) | Boolean |
| `maxSubgroupSize` | - | - (Vulkan Core)

                                                   4 (Vulkan Roadmap 2022) | min |
| `subPixelPrecisionBits` | - | 4

                                                   8 (Vulkan Roadmap 2026) | min |
| `subTexelPrecisionBits` | - | 4 (Vulkan Core)

                                                   8 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `mipmapPrecisionBits` | - | 4 (Vulkan Core)

                                                   6 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxDrawIndexedIndexValue` | 224-1 | 232-1 | min |
| `maxDrawIndirectCount` | 1 | 216-1 | min |
| `maxSamplerLodBias` | - | 2 (Vulkan Core)

                                                   14 (Vulkan Roadmap 2022, Vulkan 1.4) | min |
| `maxSamplerAnisotropy` | 1 | 16 | min |
| `maxViewports` | 1 | 16 | min |
| `maxViewportDimensions` 3 | - | (4096,4096) (Vulkan Core)

                                                   (7680,7680) (Vulkan 1.4)

                                                   (8192,8192) (Vulkan Roadmap 2026) | min |
| `viewportBoundsRange` 4 | - | (-8192,8191) (Vulkan Core)

                                                   (-15360,15359) (Vulkan 1.4) | (max,min) |
| `viewportSubPixelBits` | - | 0 | min |
| `minMemoryMapAlignment` | - | 64 | min |
| `minTexelBufferOffsetAlignment` | - | 256 | max |
| `minUniformBufferOffsetAlignment` | - | 256 | max |
| `minStorageBufferOffsetAlignment` | - | 256 | max |
| `minTexelOffset` | - | -8 | max |
| `maxTexelOffset` | - | 7 | min |
| `minTexelGatherOffset` | 0 | -8 | max |
| `maxTexelGatherOffset` | 0 | 7 | min |
| `minInterpolationOffset` | 0.0 | -0.5 5 | max |
| `maxInterpolationOffset` | 0.0 | 0.5 - (1 ULP) 5 | min |
| `subPixelInterpolationOffsetBits` | 0 | 4 5 | min |
| `maxFramebufferWidth` | - | 4096 (Vulkan Core)

                                                   7680 (Vulkan 1.4)

                                                   8192 (Vulkan Roadmap 2026) | min |
| `maxFramebufferHeight` | - | 4096 (Vulkan Core)

                                                   7680 (Vulkan 1.4)

                                                   8192 (Vulkan Roadmap 2026) | min |
| `maxFramebufferLayers` | - | 256 | min |
| `framebufferColorSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits)) | min |
| `framebufferIntegerColorSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits)) | min |
| `framebufferDepthSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits)) | min |
| `framebufferStencilSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits)) | min |
| `framebufferNoAttachmentsSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits)) | min |
| `maxColorAttachments` | - | 4 (Vulkan Core)

                                                   7 (Vulkan Roadmap 2022)

                                                   8 (Vulkan Roadmap 2024, Vulkan 1.4) | min |
| `sampledImageColorSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits)) | min |
| `sampledImageIntegerSampleCounts` | - | [VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) | min |
| `sampledImageDepthSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits)) | min |
| `sampledImageStencilSampleCounts` | - | ([VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits)) | min |
| `storageImageSampleCounts` | [VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) | ([VK_SAMPLE_COUNT_1_BIT](#VkSampleCountFlagBits) \| [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits)) | min |
| `maxSampleMaskWords` | - | 1 | min |
| `timestampComputeAndGraphics` | - | - (Vulkan Core)

                                                   [VK_TRUE](fundamentals.html#VK_TRUE) (Vulkan Roadmap 2024, Vulkan 1.4) | Boolean |
| `timestampPeriod` | - | - | duration |
| `maxClipDistances` | 0 | 8 | min |
| `maxCullDistances` | 0 | 8 | min |
| `maxCombinedClipAndCullDistances` | 0 | 8 | min |
| `discreteQueuePriorities` | - | 2 | min |
| `pointSizeRange` | (1.0,1.0) | (1.0,64.0 - ULP) 6 (Vulkan Core)

                                                           (1.0,256.0 - `pointSizeGranularity`) (Vulkan 1.4) | (max,min) |
| `lineWidthRange` | (1.0,1.0) | (1.0,8.0 - ULP) 7 | (max,min) |
| `pointSizeGranularity` | 0.0 | 1.0 6 (Vulkan Core)

                                                      0.125 (Vulkan Roadmap 2022, Vulkan 1.4) | max, fixed point increment |
| `lineWidthGranularity` | 0.0 | 1.0 7 (Vulkan Core)

                                                      0.5 (Vulkan Roadmap 2022, Vulkan 1.4) | max, fixed point increment |
| `strictLines` | - | - | implementation-dependent |
| `standardSampleLocations` | - | - (Vulkan Core)

                                                   [VK_TRUE](fundamentals.html#VK_TRUE) (Vulkan Roadmap 2022, Vulkan 1.4) | Boolean |
| `optimalBufferCopyOffsetAlignment` | - | - | recommendation |
| `optimalBufferCopyRowPitchAlignment` | - | - | recommendation |
| `nonCoherentAtomSize` | - | 256 | max |
| `maxPushDescriptors` | - | 32 | min |
| `maxMultiviewViewCount` | - | 6 | min |
| `maxMultiviewInstanceIndex` | - | 227-1 | min |
| `maxDiscardRectangles` | 0 | 4 | min |
| `sampleLocationSampleCounts` | - | [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits) | min |
| `maxSampleLocationGridSize` | - | (1,1) | min |
| `sampleLocationCoordinateRange` | - | (0.0, 0.9375) | (max,min) |
| `sampleLocationSubPixelBits` | - | 4 | min |
| `variableSampleLocations` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `nativeUnalignedPerformance` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `minImportedHostPointerAlignment` | - | 65536 | max |
| `perViewPositionAllComponents` | - | - | implementation-dependent |
| `filterMinmaxSingleComponentFormats` | - | - | implementation-dependent |
| `filterMinmaxImageComponentMapping` | - | - | implementation-dependent |
| `advancedBlendMaxColorAttachments` | - | 1 | min |
| `advancedBlendIndependentBlend` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `advancedBlendNonPremultipliedSrcColor` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `advancedBlendNonPremultipliedDstColor` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `advancedBlendCorrelatedOverlap` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `advancedBlendAllOperations` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `maxPerSetDescriptors` | - | 1024 | min |
| `maxMemoryAllocationSize` | - | 230 | min |
| `maxBufferSize` | - | 230 | min |
| `primitiveOverestimationSize` | - | 0.0 | min |
| `maxExtraPrimitiveOverestimationSize` | - | 0.0 | min |
| `extraPrimitiveOverestimationSizeGranularity` | - | 0.0 | min |
| `primitiveUnderestimation` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `conservativePointAndLineRasterization` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `degenerateTrianglesRasterized` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `degenerateLinesRasterized` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `fullyCoveredFragmentShaderInputVariable` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `conservativeRasterizationPostDepthCoverage` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `maxUpdateAfterBindDescriptorsInAllPools` | 0 | 500000 | min |
| `shaderUniformBufferArrayNonUniformIndexingNative` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `shaderSampledImageArrayNonUniformIndexingNative` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `shaderStorageBufferArrayNonUniformIndexingNative` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `shaderStorageImageArrayNonUniformIndexingNative` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `shaderInputAttachmentArrayNonUniformIndexingNative` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `maxPerStageDescriptorUpdateAfterBindSamplers` | 0 9 | 500000 9 | min |
| `maxPerStageDescriptorUpdateAfterBindUniformBuffers` | 0 9 | 12 9 | min |
| `maxPerStageDescriptorUpdateAfterBindStorageBuffers` | 0 9 | 500000 9 | min |
| `maxPerStageDescriptorUpdateAfterBindSampledImages` | 0 9 | 500000 9 | min |
| `maxPerStageDescriptorUpdateAfterBindStorageImages` | 0 9 | 500000 9 | min |
| `maxPerStageDescriptorUpdateAfterBindInputAttachments` | 0 9 | 4 9 (Vulkan Core)

                                                                     7 (Vulkan Roadmap 2022) | min |
| `maxPerStageUpdateAfterBindResources` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindSamplers` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindUniformBuffers` | 0 9 | 72 8 9 | min, *n* × PerStage |
| `maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` | 0 9 | 8 9 | min |
| `maxDescriptorSetUpdateAfterBindStorageBuffers` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` | 0 9 | 4 9 | min |
| `maxDescriptorSetUpdateAfterBindTotalUniformBuffersDynamic` | 0 9 | `maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` | min |
| `maxDescriptorSetUpdateAfterBindTotalStorageBuffersDynamic` | 0 9 | `maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` | min |
| `maxDescriptorSetUpdateAfterBindTotalBuffersDynamic` | 0 9 | `maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` +  `maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` | min |
| `maxDescriptorSetUpdateAfterBindSampledImages` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindStorageImages` | 0 9 | 500000 9 | min |
| `maxDescriptorSetUpdateAfterBindInputAttachments` | 0 9 | 4 9 | min |
| `maxInlineUniformBlockSize` | - | 256 | min |
| `maxPerStageDescriptorInlineUniformBlocks` | - | 4 | min |
| `maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks` | - | 4 | min |
| `maxDescriptorSetInlineUniformBlocks` | - | 4 | min |
| `maxDescriptorSetUpdateAfterBindInlineUniformBlocks` | - | 4 | min |
| `maxInlineUniformTotalSize` | - | 256 | min |
| `maxVertexAttribDivisor` | - | 216-1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxDrawMeshTasksCount` | - | 216-1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxTaskWorkGroupInvocations` | - | 32 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxTaskWorkGroupSize` | - | (32,1,1) | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxTaskTotalMemorySize` | - | 16384 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxTaskOutputCount` | - | 216-1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshWorkGroupInvocations` | - | 32 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshWorkGroupSize` | - | (32,1,1) | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshTotalMemorySize` | - | 16384 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshOutputVertices` | - | 256 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshOutputPrimitives` | - | 256 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`maxMeshMultiviewViewCount` | - | 1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`meshOutputPerVertexGranularity` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesNV](#VkPhysicalDeviceMeshShaderPropertiesNV)::`meshOutputPerPrimitiveGranularity` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupTotalCount` | - | 2^22 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupCount` | - | (65535,65535,65535) | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupInvocations` | - | 128 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskWorkGroupSize` | - | (128,128,128) | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskPayloadSize` | - | 16384 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskSharedMemorySize` | - | 32768 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxTaskPayloadAndSharedMemorySize` | - | 32768 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupTotalCount` | - | 2^22 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupCount` | - | (65535,65535,65535) | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupInvocations` | - | 128 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshWorkGroupSize` | - | (128,128,128) | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshSharedMemorySize` | - | 28672 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshPayloadAndSharedMemorySize` | - | 28672 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputMemorySize` | - | 32768 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshPayloadAndOutputMemorySize` | - | 48128 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputComponents` | - | 128 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputVertices` | - | 256 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputPrimitives` | - | 256 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshOutputLayers` | - | 8 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxMeshMultiviewViewCount` | - | 1 | min |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`meshOutputPerVertexGranularity` | 0 | 32 | max |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`meshOutputPerPrimitiveGranularity` | 0 | 32 | max |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxPreferredTaskWorkGroupInvocations` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`maxPreferredMeshWorkGroupInvocations` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`prefersLocalInvocationVertexOutput` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`prefersLocalInvocationPrimitiveOutput` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`prefersCompactVertexOutput` | - | - | implementation-dependent |
| [VkPhysicalDeviceMeshShaderPropertiesEXT](#VkPhysicalDeviceMeshShaderPropertiesEXT)::`prefersCompactPrimitiveOutput` | - | - | implementation-dependent |
| `maxTransformFeedbackStreams` | - | 1 | min |
| `maxTransformFeedbackBuffers` | - | 1 | min |
| `maxTransformFeedbackBufferSize` | - | 227 | min |
| `maxTransformFeedbackStreamDataSize` | - | 512 | min |
| `maxTransformFeedbackBufferDataSize` | - | 512 | min |
| `maxTransformFeedbackBufferDataStride` | - | 512 | min |
| `transformFeedbackQueries` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `transformFeedbackStreamsLinesTriangles` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `transformFeedbackRasterizationStreamSelect` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `transformFeedbackDraw` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `minFragmentDensityTexelSize` | - | (1,1) | min |
| `maxFragmentDensityTexelSize` | - | (1,1) | min |
| `fragmentDensityInvocations` | - | - | implementation-dependent |
| `subsampledLoads` | [VK_TRUE](fundamentals.html#VK_TRUE) | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `subsampledCoarseReconstructionEarlyAccess` | [VK_FALSE](fundamentals.html#VK_FALSE) | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `maxSubsampledArrayLayers` | 2 | 2 | min |
| `maxDescriptorSetSubsampledSamplers` | 1 | 1 | min |
| `fragmentDensityOffsetGranularity` | - | (1024,1024) | max |
| `maxFragmentDensityMapLayers` | - | (2) | max |
| [VkPhysicalDeviceRayTracingPropertiesNV](#VkPhysicalDeviceRayTracingPropertiesNV)::`shaderGroupHandleSize` | - | 16 | min |
| [VkPhysicalDeviceRayTracingPropertiesNV](#VkPhysicalDeviceRayTracingPropertiesNV)::`maxRecursionDepth` | - | 31 | min |
| [VkPhysicalDeviceRayTracingPipelinePropertiesKHR](#VkPhysicalDeviceRayTracingPipelinePropertiesKHR)::`shaderGroupHandleSize` | - | 32 | exact |
| [VkPhysicalDeviceRayTracingPipelinePropertiesKHR](#VkPhysicalDeviceRayTracingPipelinePropertiesKHR)::`maxRayRecursionDepth` | - | 1 | min |
| `maxShaderGroupStride` | - | 4096 | min |
| `shaderGroupBaseAlignment` | - | 64 | max |
| `maxGeometryCount` | - | 224-1 | min |
| `maxInstanceCount` | - | 224-1 | min |
| `maxTriangleCount` | - | 229-1 | min |
| `maxPrimitiveCount` | - | 229-1 | min |
| `maxPerStageDescriptorAccelerationStructures` | - | 16 | min |
| `maxPerStageDescriptorUpdateAfterBindAccelerationStructures` | - | 500000 9 | min |
| `maxVerticesPerCluster` | - | 256 | min |
| `maxTrianglesPerCluster` | - | 256 | min |
| `clusterScratchByteAlignment` | - | 256 | max |
| `clusterByteAlignment` | - | 128 | max |
| `clusterTemplateByteAlignment` | - | 32 | max |
| `clusterBottomLevelByteAlignment` | - | 256 | max |
| `clusterTemplateBoundsByteAlignment` | - | 32 | max |
| `maxClusterGeometryIndex` | - | 224-1 | min |
| `maxDescriptorSetAccelerationStructures` | - | 16 | min |
| `maxDescriptorSetUpdateAfterBindAccelerationStructures` | - | 500000 9 | min |
| `minAccelerationStructureScratchOffsetAlignment` | - | 256 | max |
| `shaderGroupHandleCaptureReplaySize` | - | 64 | max |
| `maxRayDispatchInvocationCount` | - | 230 | min |
| `shaderGroupHandleAlignment` | - | 32 | max |
| `maxRayHitAttributeSize` | - | 32 | min |
| `maxPartitionCount` | - | 224-1 | min |
| `maxTimelineSemaphoreValueDifference` | - | 231-1 | min |
| `lineSubPixelPrecisionBits` | - | 4 | min |
| `maxGraphicsShaderGroupCount` | - | 212 | min |
| `maxIndirectCommandsStreamCount` +  (for NV extension) | - | 212 | min |
| `maxIndirectCommandsStreamStride` | - | 2048 | min |
| `minIndirectCommandsBufferOffsetAlignment` | - | 256 | max |
| `minSequencesCountBufferOffsetAlignment` | - | 256 | max |
| `minSequencesIndexBufferOffsetAlignment` | - | 256 | max |
| `maxIndirectSequenceCount` | - | 220 | min |
| `maxIndirectCommandsTokenCount` | - | 16 | min |
| `maxIndirectCommandsTokenOffset` | - | 2047 | min |
| `maxIndirectPipelineCount` | - | 212 | min |
| `deviceGeneratedCommandsTransformFeedback` | - | false | implementation-dependent |
| `deviceGeneratedCommandsMultiDrawIndirectCount` | - | false | implementation-dependent |
| `maxIndirectShaderObjectCount` | 0 | 212 | implementation-dependent |
| `maxIndirectCommandsIndirectStride` | - | 2048 | min |
| `supportedIndirectCommandsInputModes` | - | [VK_INDIRECT_COMMANDS_INPUT_MODE_VULKAN_INDEX_BUFFER_EXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsInputModeFlagBitsEXT) | min |
| `supportedIndirectCommandsShaderStages` | - | ([VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) \| [VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) \| [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits)) | min |
| `supportedIndirectCommandsShaderStagesPipelineBinding` | - | 0 | min |
| `supportedIndirectCommandsShaderStagesShaderBinding` | - | 0 | min |
| `maxCustomBorderColorSamplers` | - | 32 | min |
| `robustStorageBufferAccessSizeAlignment` | - | 4 | max |
| `robustUniformBufferAccessSizeAlignment` | - | 256 | max |
| `minFragmentShadingRateAttachmentTexelSize` | (0,0) | (32,32) | max |
| `maxFragmentShadingRateAttachmentTexelSize` | (0,0) | (8,8) | min |
| `maxFragmentShadingRateAttachmentTexelSizeAspectRatio` | 0 | 1 | min |
| `primitiveFragmentShadingRateWithMultipleViewports` | [VK_FALSE](fundamentals.html#VK_FALSE) | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `layeredShadingRateAttachments` | [VK_FALSE](fundamentals.html#VK_FALSE) | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `fragmentShadingRateNonTrivialCombinerOps` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `maxFragmentSize` | - | (2,2) | min |
| `maxFragmentSizeAspectRatio` | - | 2 | min |
| `maxFragmentShadingRateCoverageSamples` | - | 16 | min |
| `maxFragmentShadingRateRasterizationSamples` | - | [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits) | min |
| `fragmentShadingRateWithShaderDepthStencilWrites` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `fragmentShadingRateWithSampleMask` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `fragmentShadingRateWithShaderSampleMask` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `fragmentShadingRateWithConservativeRasterization` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `fragmentShadingRateWithFragmentShaderInterlock` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `fragmentShadingRateWithCustomSampleLocations` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `fragmentShadingRateStrictMultiplyCombiner` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `maxFragmentShadingRateInvocationCount` | - | [VK_SAMPLE_COUNT_4_BIT](#VkSampleCountFlagBits) | min |
| `combinedImageSamplerDescriptorSingleArray` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `bufferlessPushDescriptors` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `allowSamplerImageViewPostSubmitCreation` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `descriptorBufferOffsetAlignment` | - | 256 | max |
| `maxDescriptorBufferBindings` | - | 3 | min |
| `maxResourceDescriptorBufferBindings` | - | 1 | min |
| `maxSamplerDescriptorBufferBindings` | - | 1 | min |
| `maxEmbeddedImmutableSamplerBindings` | - | 1 | min |
| `maxEmbeddedImmutableSamplers` | - | 2032 | min |
| `bufferCaptureReplayDescriptorDataSize` | - | 64 | max |
| `imageCaptureReplayDescriptorDataSize` | - | 64 | max |
| `imageViewCaptureReplayDescriptorDataSize` | - | 64 | max |
| `samplerCaptureReplayDescriptorDataSize` | - | 64 | max |
| `accelerationStructureCaptureReplayDescriptorDataSize` | - | 64 | max |
| `samplerDescriptorSize` | - | 256 | max |
| `combinedImageSamplerDescriptorSize` | - | 256 | max |
| `sampledImageDescriptorSize` | - | 256 | max |
| `storageImageDescriptorSize` | - | 256 | max |
| `uniformTexelBufferDescriptorSize` | - | 256 | max |
| `robustUniformTexelBufferDescriptorSize` | - | 256 | max |
| `storageTexelBufferDescriptorSize` | - | 256 | max |
| `robustStorageTexelBufferDescriptorSize` | - | 256 | max |
| `uniformBufferDescriptorSize` | - | 256 | max |
| `robustUniformBufferDescriptorSize` | - | 256 | max |
| `storageBufferDescriptorSize` | - | 256 | max |
| `robustStorageBufferDescriptorSize` | - | 256 | max |
| `inputAttachmentDescriptorSize` | - | 256 | max |
| `accelerationStructureDescriptorSize` | - | 256 | max |
| `maxSamplerDescriptorBufferRange` | - | 211 × `samplerDescriptorSize` | min |
| `maxResourceDescriptorBufferRange` | - | (220 - 215) × `maxResourceDescriptorSize` 12 | min |
| `samplerDescriptorBufferAddressSpaceSize` | - | 227 | min |
| `resourceDescriptorBufferAddressSpaceSize` | - | 227 | min |
| `descriptorBufferAddressSpaceSize` | - | 227 | min |
| `combinedImageSamplerDensityMapDescriptorSize` | - | 256 | max |
| `maxSubpassShadingWorkgroupSizeAspectRatio` | 0 | 1 | min |
| `maxMultiDrawCount` | - | 1024 | min |
| `maxCommandBufferNestingLevel` | - | 1 | min |
| `graphicsPipelineLibraryFastLinking` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `graphicsPipelineLibraryIndependentInterpolationDecoration` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `triStripVertexOrderIndependentOfProvokingVertex` | - | [VK_FALSE](fundamentals.html#VK_FALSE) | implementation-dependent |
| `maxWeightFilterPhases` | - | 1024 | min |
| `maxWeightFilterDimension` | - | (64,64) | min |
| `maxBlockMatchRegion` | - | (64,64) | min |
| `maxBoxFilterBlockSize` | - | (64,64) | min |
| `dynamicPrimitiveTopologyUnrestricted` | - | - | implementation-dependent |
| `maxOpacity2StateSubdivisionLevel` | - | 3 | min |
| `maxOpacity4StateSubdivisionLevel` | - | 3 | min |
| `maxDecompressionIndirectCount` | 1 | 216-1 | min |
| `maxWorkGroupCount` | - | (65536,1,1) | min |
| `maxWorkGroupSize` | - | (32,1,1) | min |
| `maxOutputClusterCount` | - | 1024 | min |
| `indirectBufferOffsetAlignment` | - | - | implementation-dependent |
| `maxExecutionGraphDepth` | - | 32 | min |
| `maxExecutionGraphShaderOutputNodes` | - | 256 | min |
| `maxExecutionGraphShaderPayloadSize` | - | 32768 | min |
| `maxExecutionGraphShaderPayloadCount` | - | 256 | min |
| `executionGraphDispatchAddressAlignment` | - | 4 | max |
| `maxExecutionGraphVertexBufferBindings` | - | 1024 | min |
| `maxExecutionGraphWorkgroupCount` | - | (65535,65535,65535) | min |
| `maxExecutionGraphWorkgroups` | - | 224-1 | min |
| `extendedSparseAddressSpaceSize` | 0 | `sparseAddressSpaceSize` | min |
| `renderPassStripeGranularity` | - | (64,64) | max |
| `maxRenderPassStripes` | - | 32 | min |
| `minPlacedMemoryMapAlignment` | - | 65536 | max |
| `supportedImageAlignmentMask` | - | 1 | min |
| `separateDepthStencilAttachmentAccess` | [VK_FALSE](fundamentals.html#VK_FALSE) | - | implementation-dependent |
| `cooperativeMatrixWorkgroupScopeMaxWorkgroupSize` | - | subgroupSize × 2 | min |
| `cooperativeMatrixFlexibleDimensionsMaxDimension` | - | 256 | min |
| `cooperativeMatrixWorkgroupScopeReservedSharedMemory` | - | `maxComputeSharedMemorySize` / 2 | max |
| `maxCooperativeVectorComponents` | - | 128 | min |
| `maxVectorComponents` | - | 1024 | min |
| `maxApronSize` | - | 1 | min |
| `preferNonCoherent` | - | - | implementation-dependent |
| `tileGranularity` | - | (16,16) | min |
| `maxTileShadingRate` | - | (8,8) | min |
| `maxTensorDimensionCount` | - | 4 | min |
| `maxTensorElements` | - | 65536 | min |
| `maxPerDimensionTensorElements` | - | 65536 | min |
| `maxTensorStride` | - | 65536 | min |
| `maxTensorSize` | - | 65536 | min |
| `maxTensorShaderAccessArrayLength` | - | 4 | min |
| `maxTensorShaderAccessSize` | - | 4 | min |
| `maxDescriptorSetStorageTensors` | - | 16 | min |
| `maxPerStageDescriptorSetStorageTensors` | - | 16 | min |
| `maxDescriptorSetUpdateAfterBindStorageTensors` | 0 | 500000 | min |
| `maxPerStageDescriptorUpdateAfterBindStorageTensors` | 0 | 500000 | min |
| `shaderTensorSupportedStages` | - | [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) | bitfield |
| `maxShaderBindingTableRecordIndex` | - | 228-1 | min |
| `resolveSrgbFormatAppliesTransferFunction` | - | - | implementation-dependent |
| `resolveSrgbFormatSupportsTransferFunctionControl` | [VK_FALSE](fundamentals.html#VK_FALSE) | [VK_FALSE](fundamentals.html#VK_FALSE) | min |
| `samplerHeapAlignment` | - | 65536 | max |
| `resourceHeapAlignment` | - | 65536 | max |
| `maxSamplerHeapSize` | - | max(

                                                    4000 × `samplerDescriptorSize`
                                                    + `minSamplerHeapReservedRange`,

                                                    2048 × `samplerDescriptorSize`
                                                    + `minSamplerHeapReservedRangeWithEmbedded`) | min |
| `maxResourceHeapSize` | - | (220 - 215) × max(`imageDescriptorSize`,
                                                    `bufferDescriptorSize`)
                                                    + `minResourceHeapReservedRange` | min |
| `minSamplerHeapReservedRange` | - | 96 × `samplerDescriptorSize` | max |
| `minSamplerHeapReservedRangeWithEmbedded` | - | 2048 × `samplerDescriptorSize` | max |
| `minResourceHeapReservedRange` | - | 215 × max(`imageDescriptorSize`,
                                                       `bufferDescriptorSize`) | max |
| `samplerDescriptorSize` | - | 32 | max |
| `imageDescriptorSize` | - | 64 | max |
| `bufferDescriptorSize` | - | 128 | max |
| `samplerDescriptorAlignment` | - | 32 | max |
| `imageDescriptorAlignment` | - | 64 | max |
| `bufferDescriptorAlignment` | - | 128 | max |
| `maxPushDataSize` | - | 256 | min |
| `maxDescriptorHeapEmbeddedSamplers` | - | 2032 | min |
| `samplerYcbcrConversionCount` | - | 3 | max |
| `imageCaptureReplayOpaqueDataSize` | - | - | implementation-dependent |
| `numMetrics` | - | 1 | min |
| `perBasicBlockGranularity` | - | VK_FALSE | max |

1

The **Limit Type** column specifies the limit is either the minimum limit
all implementations **must** support, the maximum limit all implementations
**must** support, or the exact value all implementations **must** support.
For bitmasks a minimum limit is the least bits all implementations **must**
set, but they **may** have additional bits set beyond this minimum.

2

The `maxPerStageResources` **must** be at least the smallest of the
following:

* 
the sum of the `maxPerStageDescriptorUniformBuffers`,
`maxPerStageDescriptorStorageBuffers`,
`maxPerStageDescriptorSampledImages`,
`maxPerStageDescriptorStorageImages`,
`maxPerStageDescriptorInputAttachments`, `maxColorAttachments`
limits, or

* 
128.

It **may** not be possible to reach this limit in every stage.

3

See [`maxViewportDimensions`](#limits-maxViewportDimensions) for
the **required** relationship to other limits.

4

See [`viewportBoundsRange`](#limits-viewportboundsrange) for the
**required** relationship to other limits.

5

The values `minInterpolationOffset` and `maxInterpolationOffset`
describe the closed interval of supported interpolation offsets:
[`minInterpolationOffset`, `maxInterpolationOffset`].
The ULP is determined by `subPixelInterpolationOffsetBits`.
If `subPixelInterpolationOffsetBits` is 4, this provides increments
of (1/24) = 0.0625, and thus the range of supported interpolation
offsets would be [-0.5, 0.4375].

6

The point size ULP is determined by `pointSizeGranularity`.
If the `pointSizeGranularity` is 0.125, the range of supported point
sizes **must** be at least [1.0, 63.875].

7

The line width ULP is determined by `lineWidthGranularity`.
If the `lineWidthGranularity` is 0.0625, the range of supported line
widths **must** be at least [1.0, 7.9375].

8

The minimum `maxDescriptorSet*` limit is *n* times the corresponding
*specification* minimum `maxPerStageDescriptor*` limit, where *n* is
the number of shader stages supported by the [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice).
If all shader stages are supported, *n* = 6 (vertex, tessellation
control, tessellation evaluation, geometry, fragment, compute).

9

The `UpdateAfterBind` descriptor limits **must** each be greater than
or equal to the corresponding `non`-UpdateAfterBind limit.

10

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, the
required minimum value of `maxVertexInputBindings` is `8`.

12

`maxResourceDescriptorSize` is defined as the maximum value of
`storageImageDescriptorSize`, `sampledImageDescriptorSize`,
`robustUniformTexelBufferDescriptorSize`,
`robustStorageTexelBufferDescriptorSize`,
`robustUniformBufferDescriptorSize`,
`robustStorageBufferDescriptorSize`,
`inputAttachmentDescriptorSize`, and
`accelerationStructureDescriptorSize`.

To query additional multisampling capabilities which **may** be supported for a
specific sample count, beyond the minimum capabilities described for
[Limits](#limits) above, call:

// Provided by VK_EXT_sample_locations
void vkGetPhysicalDeviceMultisamplePropertiesEXT(
    VkPhysicalDevice                            physicalDevice,
    VkSampleCountFlagBits                       samples,
    VkMultisamplePropertiesEXT*                 pMultisampleProperties);

* 
`physicalDevice` is the physical device from which to query the
additional multisampling capabilities.

* 
`samples` is a [VkSampleCountFlagBits](#VkSampleCountFlagBits) value specifying the
sample count to query capabilities for.

* 
`pMultisampleProperties` is a pointer to a
[VkMultisamplePropertiesEXT](#VkMultisamplePropertiesEXT) structure in which information about
additional multisampling capabilities specific to the sample count is
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-samples-parameter) VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](#VkSampleCountFlagBits) value

* 
[](#VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-pMultisampleProperties-parameter) VUID-vkGetPhysicalDeviceMultisamplePropertiesEXT-pMultisampleProperties-parameter

 `pMultisampleProperties` **must** be a valid pointer to a [VkMultisamplePropertiesEXT](#VkMultisamplePropertiesEXT) structure

The `VkMultisamplePropertiesEXT` structure is defined as

// Provided by VK_EXT_sample_locations
typedef struct VkMultisamplePropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         maxSampleLocationGridSize;
} VkMultisamplePropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxSampleLocationGridSize` is the maximum size of the pixel grid in
which sample locations **can** vary.

Valid Usage (Implicit)

* 
[](#VUID-VkMultisamplePropertiesEXT-sType-sType) VUID-VkMultisamplePropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MULTISAMPLE_PROPERTIES_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMultisamplePropertiesEXT-pNext-pNext) VUID-VkMultisamplePropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

If the sample count for which additional multisampling capabilities are
requested using `vkGetPhysicalDeviceMultisamplePropertiesEXT` is set in
[`sampleLocationSampleCounts`](#limits-sampleLocationSampleCounts) the
`width` and `height` members of
`VkMultisamplePropertiesEXT`::`maxSampleLocationGridSize` **must** be
greater than or equal to the corresponding members of
[`maxSampleLocationGridSize`](#limits-maxSampleLocationGridSize),
respectively, otherwise both members **must** be `0`.

Implementations that claim support for the [Roadmap 2022](../appendices/roadmap.html#roadmap-2022)
milestone **must** satisfy the following additional limit requirements:

| Limit | Supported Limit | Limit Type1 |
| --- | --- | --- |
| `maxImageDimension1D` | 8192 | min |
| `maxImageDimension2D` | 8192 | min |
| `maxImageDimensionCube` | 8192 | min |
| `maxImageArrayLayers` | 2048 | min |
| `maxUniformBufferRange` | 65536 | min |
| `bufferImageGranularity` | 4096 | max |
| `maxPerStageDescriptorSamplers` | 64 | min |
| `maxPerStageDescriptorUniformBuffers` | 15 | min |
| `maxPerStageDescriptorStorageBuffers` | 30 | min |
| `maxPerStageDescriptorSampledImages` | 200 | min |
| `maxPerStageDescriptorStorageImages` | 16 | min |
| `maxPerStageResources` | 200 | min |
| `maxDescriptorSetSamplers` | 576 | min |
| `maxDescriptorSetUniformBuffers` | 90 | min |
| `maxDescriptorSetStorageBuffers` | 96 | min |
| `maxDescriptorSetSampledImages` | 1800 | min |
| `maxDescriptorSetStorageImages` | 144 | min |
| `maxFragmentCombinedOutputResources` | 16 | min |
| `maxComputeWorkGroupInvocations` | 256 | min |
| `maxComputeWorkGroupSize` | (256,256,64) | min |
| `subTexelPrecisionBits` | 8 | min |
| `mipmapPrecisionBits` | 6 | min |
| `maxSamplerLodBias` | 14 | min |
| `pointSizeGranularity` | 0.125 | max |
| `lineWidthGranularity` | 0.5 | max |
| `standardSampleLocations` | [VK_TRUE](fundamentals.html#VK_TRUE) | Boolean |
| `maxColorAttachments` | 7 | min |
| `subgroupSize` | 4 | min |
| `subgroupSupportedStages` | [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)

                                                [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) | bitfield |
| `subgroupSupportedOperations` | [VK_SUBGROUP_FEATURE_BASIC_BIT](#VkSubgroupFeatureFlagBits)

                                                [VK_SUBGROUP_FEATURE_VOTE_BIT](#VkSubgroupFeatureFlagBits)

                                                [VK_SUBGROUP_FEATURE_ARITHMETIC_BIT](#VkSubgroupFeatureFlagBits)

                                                [VK_SUBGROUP_FEATURE_BALLOT_BIT](#VkSubgroupFeatureFlagBits)

                                                [VK_SUBGROUP_FEATURE_SHUFFLE_BIT](#VkSubgroupFeatureFlagBits)

                                                [VK_SUBGROUP_FEATURE_SHUFFLE_RELATIVE_BIT](#VkSubgroupFeatureFlagBits)

                                                [VK_SUBGROUP_FEATURE_QUAD_BIT](#VkSubgroupFeatureFlagBits) | bitfield |
| `shaderSignedZeroInfNanPreserveFloat16` | [VK_TRUE](fundamentals.html#VK_TRUE) | Boolean |
| `shaderSignedZeroInfNanPreserveFloat32` | [VK_TRUE](fundamentals.html#VK_TRUE) | Boolean |
| `maxSubgroupSize` | 4 | min |
| `maxPerStageDescriptorUpdateAfterBindInputAttachments` | 7 | min |

Implementations that claim support for the [Roadmap 2024](../appendices/roadmap.html#roadmap-2024)
milestone **must** satisfy the following additional limit requirements:

| Limit | Supported Limit | Limit Type1 |
| --- | --- | --- |
| `shaderRoundingModeRTEFloat16` | [VK_TRUE](fundamentals.html#VK_TRUE) | Boolean |
| `shaderRoundingModeRTEFloat32` | [VK_TRUE](fundamentals.html#VK_TRUE) | Boolean |
| `timestampComputeAndGraphics` | [VK_TRUE](fundamentals.html#VK_TRUE) | Boolean |
| `maxColorAttachments` | 8 | min |
| `maxBoundDescriptorSets` | 7 | min |

Implementations that claim support for the [Roadmap 2026](../appendices/roadmap.html#roadmap-2026)
milestone **must** satisfy the following additional limit requirements:

| Limit | Supported Limit | Limit Type1 |
| --- | --- | --- |
| `maxPerStageDescriptorUniformBuffers` | 200 | min |
| `maxPerStageDescriptorStorageBuffers` | 200 | min |
| `maxPerStageDescriptorInputAttachments` | 8 | min |
| `maxDescriptorSetUniformBuffers` | 1800 | min |
| `maxDescriptorSetStorageBuffers` | 1800 | min |
| `maxDescriptorSetInputAttachments` | 8 | min |
| `maxVertexOutputComponents` | 124 | min |
| `maxTessellationControlPerVertexInputComponents` | 128 | min |
| `maxTessellationControlPerVertexOutputComponents` | 128 | min |
| `maxTessellationControlTotalOutputComponents` | 4096 | min |
| `maxTessellationEvaluationInputComponents` | 128 | min |
| `maxTessellationEvaluationOutputComponents` | 128 | min |
| `maxGeometryOutputComponents` | 128 | min |
| `maxFragmentInputComponents` | 112 | min |
| `maxFragmentOutputAttachments` | 8 | min |
| `maxComputeSharedMemorySize` | 32768 | min |
| `subPixelPrecisionBits` | 8 | min |
| `maxViewportDimensions.width` | 8192 | min |
| `maxViewportDimensions.height` | 8192 | min |
| `maxFramebufferWidth` | 8192 | min |
| `maxFramebufferHeight` | 8192 | min |
