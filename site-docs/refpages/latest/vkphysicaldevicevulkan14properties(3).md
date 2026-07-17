# VkPhysicalDeviceVulkan14Properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVulkan14Properties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVulkan14Properties - Structure specifying physical device properties for functionality promoted to Vulkan 1.4

The `VkPhysicalDeviceVulkan14Properties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceVulkan14Properties {
    VkStructureType                       sType;
    void*                                 pNext;
    uint32_t                              lineSubPixelPrecisionBits;
    uint32_t                              maxVertexAttribDivisor;
    VkBool32                              supportsNonZeroFirstInstance;
    uint32_t                              maxPushDescriptors;
    VkBool32                              dynamicRenderingLocalReadDepthStencilAttachments;
    VkBool32                              dynamicRenderingLocalReadMultisampledAttachments;
    VkBool32                              earlyFragmentMultisampleCoverageAfterSampleCounting;
    VkBool32                              earlyFragmentSampleMaskTestBeforeSampleCounting;
    VkBool32                              depthStencilSwizzleOneSupport;
    VkBool32                              polygonModePointSize;
    VkBool32                              nonStrictSinglePixelWideLinesUseParallelogram;
    VkBool32                              nonStrictWideLinesUseParallelogram;
    VkBool32                              blockTexelViewCompatibleMultipleLayers;
    uint32_t                              maxCombinedImageSamplerDescriptorCount;
    VkBool32                              fragmentShadingRateClampCombinerInputs;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessStorageBuffers;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessUniformBuffers;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessVertexInputs;
    VkPipelineRobustnessImageBehavior     defaultRobustnessImages;
    uint32_t                              copySrcLayoutCount;
    VkImageLayout*                        pCopySrcLayouts;
    uint32_t                              copyDstLayoutCount;
    VkImageLayout*                        pCopyDstLayouts;
    uint8_t                               optimalTilingLayoutUUID[VK_UUID_SIZE];
    VkBool32                              identicalMemoryTypeRequirements;
} VkPhysicalDeviceVulkan14Properties;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`lineSubPixelPrecisionBits` is the number of bits of subpixel
precision in framebuffer coordinates xf and yf when
rasterizing [line segments](../../../../spec/latest/chapters/primsrast.html#primsrast-lines).

* 

`maxVertexAttribDivisor` is the maximum value of the number of
instances that will repeat the value of vertex attribute data when
instanced rendering is enabled.

* 

`supportsNonZeroFirstInstance` specifies whether a non-zero value
for the `firstInstance` parameter of [drawing commands](../../../../spec/latest/chapters/drawing.html#drawing)
is supported when
[VkVertexInputBindingDivisorDescription](VkVertexInputBindingDivisorDescription.html)::`divisor` is not `1`.

* 
 `maxPushDescriptors` is
the maximum number of descriptors that **can** be used in a descriptor set
layout created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](VkDescriptorSetLayoutCreateFlagBits.html) set.

* 

`dynamicRenderingLocalReadDepthStencilAttachments` is [VK_TRUE](VK_TRUE.html)
if the implementation supports local reads of depth/stencil attachments,
[VK_FALSE](VK_FALSE.html) otherwise.

* 

`dynamicRenderingLocalReadMultisampledAttachments` is [VK_TRUE](VK_TRUE.html)
if the implementation supports local reads of multisampled attachments,
[VK_FALSE](VK_FALSE.html) otherwise.

* 
`earlyFragmentMultisampleCoverageAfterSampleCounting` is a boolean
value indicating whether the [fragment shading](../../../../spec/latest/chapters/fragops.html#fragops-shader) and
[multisample coverage](../../../../spec/latest/chapters/fragops.html#fragops-covg) operations are performed after
[sample counting](../../../../spec/latest/chapters/fragops.html#fragops-samplecount) for [fragment    shaders](../../../../spec/latest/chapters/fragops.html#fragops-shader) with `EarlyFragmentTests` execution mode.

* 
`earlyFragmentSampleMaskTestBeforeSampleCounting` is a boolean value
indicating whether the [sample mask test](../../../../spec/latest/chapters/fragops.html#fragops-samplemask) operation
is performed before [sample counting](../../../../spec/latest/chapters/fragops.html#fragops-samplecount) for
[fragment shaders](../../../../spec/latest/chapters/fragops.html#fragops-shader) using the `EarlyFragmentTests`
execution mode.

* 
`depthStencilSwizzleOneSupport` is a boolean indicating that
depth/stencil texturing operations with [VK_COMPONENT_SWIZZLE_ONE](VkComponentSwizzle.html)
have defined behavior.

* 
`polygonModePointSize` is a boolean value indicating whether the
point size of the final rasterization of polygons with
[VK_POLYGON_MODE_POINT](VkPolygonMode.html) is controlled by `PointSize`.

* 
`nonStrictSinglePixelWideLinesUseParallelogram` is a boolean value
indicating whether non-strict lines with a width of 1.0 are rasterized
as parallelograms or using Bresenham’s algorithm.

* 
`nonStrictWideLinesUseParallelogram` is a boolean value indicating
whether non-strict lines with a width greater than 1.0 are rasterized as
parallelograms or using Bresenham’s algorithm.

* 
`blockTexelViewCompatibleMultipleLayers` is a boolean value
indicating that an implementation supports creating image views with
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html) where the
`layerCount` member of `subresourceRange` is greater than `1`.

* 
`maxCombinedImageSamplerDescriptorCount` is the maximum number of
combined image sampler descriptors that the implementation uses to
access any of the [formats    that require a sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the
implementation.

* 
`fragmentShadingRateClampCombinerInputs` is a boolean value
indicating that an implementation clamps the inputs to
[combiner operations](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-combining).

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

* 
`copySrcLayoutCount` is an integer related to the number of image
layouts for host copies from images available or queried, as described
below.

* 
`pCopySrcLayouts` is a pointer to an array of [VkImageLayout](VkImageLayout.html) in
which supported image layouts for use with host copy operations from
images are returned.

* 
`copyDstLayoutCount` is an integer related to the number of image
layouts for host copies to images available or queried, as described
below.

* 
`pCopyDstLayouts` is a pointer to an array of [VkImageLayout](VkImageLayout.html) in
which supported image layouts for use with host copy operations to
images are returned.

* 
`optimalTilingLayoutUUID` is an array of [VK_UUID_SIZE](VK_UUID_SIZE.html)
`uint8_t` values representing a universally unique identifier for the
implementation’s swizzling layout of images created with
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html).

* 
`identicalMemoryTypeRequirements` indicates that specifying the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](VkImageUsageFlagBits.html) flag in
[VkImageCreateInfo](VkImageCreateInfo.html)::`usage` does not affect the memory type
requirements of the image.

If the `VkPhysicalDeviceVulkan14Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

These properties correspond to Vulkan 1.4 functionality.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan14Properties-sType-sType) VUID-VkPhysicalDeviceVulkan14Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkImageLayout](VkImageLayout.html), [VkPipelineRobustnessBufferBehavior](VkPipelineRobustnessBufferBehavior.html), [VkPipelineRobustnessImageBehavior](VkPipelineRobustnessImageBehavior.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceVulkan14Properties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
