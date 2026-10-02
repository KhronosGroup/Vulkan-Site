# VkPhysicalDeviceMaintenance5Features(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance5Features.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance5Features - Structure describing whether the implementation supports maintenance5 functionality

The `VkPhysicalDeviceMaintenance5Features` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceMaintenance5Features {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance5;
} VkPhysicalDeviceMaintenance5Features;

// Provided by VK_KHR_maintenance5
// Equivalent to VkPhysicalDeviceMaintenance5Features
typedef VkPhysicalDeviceMaintenance5Features VkPhysicalDeviceMaintenance5FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

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

If the `VkPhysicalDeviceMaintenance5Features` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMaintenance5Features`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance5Features-sType-sType) VUID-VkPhysicalDeviceMaintenance5Features-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_FEATURES](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_maintenance5](VK_KHR_maintenance5.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMaintenance5Features).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
