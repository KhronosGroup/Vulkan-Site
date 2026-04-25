# VkPhysicalDeviceVulkan14Features(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceVulkan14Features.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceVulkan14Features - Structure describing the Vulkan 1.4 features that can be supported by an implementation

The `VkPhysicalDeviceVulkan14Features` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceVulkan14Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           globalPriorityQuery;
    VkBool32           shaderSubgroupRotate;
    VkBool32           shaderSubgroupRotateClustered;
    VkBool32           shaderFloatControls2;
    VkBool32           shaderExpectAssume;
    VkBool32           rectangularLines;
    VkBool32           bresenhamLines;
    VkBool32           smoothLines;
    VkBool32           stippledRectangularLines;
    VkBool32           stippledBresenhamLines;
    VkBool32           stippledSmoothLines;
    VkBool32           vertexAttributeInstanceRateDivisor;
    VkBool32           vertexAttributeInstanceRateZeroDivisor;
    VkBool32           indexTypeUint8;
    VkBool32           dynamicRenderingLocalRead;
    VkBool32           maintenance5;
    VkBool32           maintenance6;
    VkBool32           pipelineProtectedAccess;
    VkBool32           pipelineRobustness;
    VkBool32           hostImageCopy;
    VkBool32           pushDescriptor;
} VkPhysicalDeviceVulkan14Features;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`globalPriorityQuery` indicates whether the implementation supports
the ability to query global queue priorities.

* 

`shaderSubgroupRotate` specifies whether shader modules **can** declare
the `GroupNonUniformRotateKHR` capability.

* 

`shaderSubgroupRotateClustered` specifies whether shader modules
**can** use the `ClusterSize` operand to
`OpGroupNonUniformRotateKHR`.

* 

`shaderFloatControls2` specifies whether shader modules **can** declare
the `FloatControls2` capability.

* 
 `shaderExpectAssume`
specifies whether shader modules **can** declare the `ExpectAssumeKHR`
capability.

* 
 `rectangularLines`
indicates whether the implementation supports
[rectangular line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines).

* 
 `bresenhamLines`
indicates whether the implementation supports
[Bresenham-style line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-bresenham).

* 
 `smoothLines` indicates
whether the implementation supports [smooth line    rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-smooth).

* 

`stippledRectangularLines` indicates whether the implementation
supports [stippled line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](VkLineRasterizationMode.html) lines.

* 

`stippledBresenhamLines` indicates whether the implementation
supports [stippled line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](VkLineRasterizationMode.html) lines.

* 

`stippledSmoothLines` indicates whether the implementation supports
[stippled line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-stipple) with
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](VkLineRasterizationMode.html) lines.

* 

`vertexAttributeInstanceRateDivisor` specifies whether vertex
attribute fetching may be repeated in the case of instanced rendering.

* 

`vertexAttributeInstanceRateZeroDivisor` specifies whether a zero
value for [VkVertexInputBindingDivisorDescriptionEXT](VkVertexInputBindingDivisorDescription.html)::`divisor`
is supported.

* 
 `indexTypeUint8`
    indicates that [VK_INDEX_TYPE_UINT8](VkIndexType.html) can be used with
[vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html) and
    [vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html).

* 

`dynamicRenderingLocalRead` specifies that the implementation
supports local reads inside dynamic render pass instances using the
[vkCmdBeginRendering](vkCmdBeginRendering.html) command.

* 
 `maintenance5` indicates
that the implementation supports the following:

The ability to expose support for the optional format
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](VkFormat.html).

* 
The ability to expose support for the optional format
[VK_FORMAT_A8_UNORM](VkFormat.html).

* 
A property to indicate that multisample coverage operations are
performed after sample counting in EarlyFragmentTests mode.

* 
Creating a `VkBufferView` with a subset of the associated
`VkBuffer` usage using [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html).

* 
A new function [vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html), allowing a range of memory
to be bound as an index buffer.

* 
[vkGetDeviceProcAddr](vkGetDeviceProcAddr.html) will return `NULL` for function pointers of
core functions for versions higher than the version requested by the
application.

* 
[vkCmdBindVertexBuffers2](vkCmdBindVertexBuffers2.html) supports using [VK_WHOLE_SIZE](VK_WHOLE_SIZE.html) in the
`pSizes` parameter.

* 
If `PointSize` is not written, a default value of `1.0` is used for
the size of points.

* 
[VkShaderModuleCreateInfo](VkShaderModuleCreateInfo.html) **can** be added as a chained structure to
pipeline creation via [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), rather
than having to create a shader module.

* 
A function [vkGetRenderingAreaGranularity](vkGetRenderingAreaGranularity.html) to query the optimal
render area for a dynamic rendering instance.

* 
A property to indicate that depth/stencil texturing operations with
[VK_COMPONENT_SWIZZLE_ONE](VkComponentSwizzle.html) have defined behavior.

* 
[vkGetDeviceImageSubresourceLayout](vkGetDeviceImageSubresourceLayout.html) allows an application to
perform a [vkGetImageSubresourceLayout](vkGetImageSubresourceLayout.html) query without having to
create an image.

* 
[VK_REMAINING_ARRAY_LAYERS](VK_REMAINING_ARRAY_LAYERS.html) as the `layerCount` member of
[VkImageSubresourceLayers](VkImageSubresourceLayers.html).

* 
A property to indicate whether `PointSize` controls the final
rasterization of polygons if [polygon mode](../../../../spec/latest/chapters/primsrast.html#primsrast-polygonmode) is
[VK_POLYGON_MODE_POINT](VkPolygonMode.html).

* 
Two properties to indicate the non-strict line rasterization algorithm
used.

* 
Two new flags words [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html) and
[VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html).

* 
Physical-device-level functions **can** now be called with any value in
the valid range for a type beyond the defined enumerants, such that
applications can avoid checking individual features, extensions, or
versions before querying supported properties of a particular
enumerant.

* 
Copies between images of any type are allowed, with 1D images treated
as 2D images with a height of `1`.

 `maintenance6` indicates
that the implementation supports the following:

* 
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **can** be used when binding an index buffer

* 
[VkBindMemoryStatus](VkBindMemoryStatus.html) **can** be included in the `pNext` chain of
the [VkBindBufferMemoryInfo](VkBindBufferMemoryInfo.html) and [VkBindImageMemoryInfo](VkBindImageMemoryInfo.html)
structures, enabling applications to retrieve [VkResult](VkResult.html) values for
individual memory binding operations.

* 
[VkPhysicalDeviceMaintenance6Properties](VkPhysicalDeviceMaintenance6Properties.html)::`blockTexelViewCompatibleMultipleLayers`
property to indicate that the implementation supports creating image
views with [VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](VkImageCreateFlagBits.html) where
the `layerCount` member of `subresourceRange` is greater than
`1`.

* 
[VkPhysicalDeviceMaintenance6Properties](VkPhysicalDeviceMaintenance6Properties.html)::`maxCombinedImageSamplerDescriptorCount`
property which indicates the maximum descriptor size required for any
[format that requires a     sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the implementation.

* 
A
[VkPhysicalDeviceMaintenance6Properties](VkPhysicalDeviceMaintenance6Properties.html)::`fragmentShadingRateClampCombinerInputs`
property which indicates whether the implementation clamps the inputs
to fragment shading rate combiner operations.

`pipelineProtectedAccess` indicates whether the implementation
supports specifying protected access on individual pipelines.

 `pipelineRobustness`
indicates that robustness **can** be requested on a per-pipeline-stage
granularity.

 `hostImageCopy` indicates
that the implementation supports copying from host memory to images
using the [vkCopyMemoryToImage](vkCopyMemoryToImage.html) command, copying from images to host
memory using the [vkCopyImageToMemory](vkCopyImageToMemory.html) command, and copying between
images using the [vkCopyImageToImage](vkCopyImageToImage.html) command.

 `pushDescriptor` indicates that the
implementation supports push descriptors.

If the `VkPhysicalDeviceVulkan14Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceVulkan14Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan14Features-sType-sType) VUID-VkPhysicalDeviceVulkan14Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceVulkan14Features).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
