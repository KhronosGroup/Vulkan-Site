# vkGetMicromapBuildSizesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetMicromapBuildSizesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetMicromapBuildSizesEXT - Retrieve the required size for a micromap

To get the build sizes for a micromap, call:

// Provided by VK_EXT_opacity_micromap
void vkGetMicromapBuildSizesEXT(
    VkDevice                                    device,
    VkAccelerationStructureBuildTypeKHR         buildType,
    const VkMicromapBuildInfoEXT*               pBuildInfo,
    VkMicromapBuildSizesInfoEXT*                pSizeInfo);

* 
`device` is the logical device that will be used for creating the
micromap.

* 
`buildType` defines whether host or device operations (or both) are
being queried for.

* 
`pBuildInfo` is a pointer to a [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)
structure describing parameters of a build operation.

* 
`pSizeInfo` is a pointer to a [VkMicromapBuildSizesInfoEXT](VkMicromapBuildSizesInfoEXT.html)
structure which returns the size required for a micromap and the sizes
required for the scratch buffers, given the build parameters.
The size requirements for a scratch buffer **may** be zero.

The `dstMicromap` and `mode` members of `pBuildInfo` are
ignored.
Any [VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html) members of `pBuildInfo` are ignored
by this command.

A micromap created with the `micromapSize` returned by this command
supports any build with a [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html) structure subject to
the following properties:

* 
The build command is a host build command, and `buildType` is
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_KHR](VkAccelerationStructureBuildTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](VkAccelerationStructureBuildTypeKHR.html)

* 
The build command is a device build command, and `buildType` is
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR](VkAccelerationStructureBuildTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](VkAccelerationStructureBuildTypeKHR.html)

* 
For [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html):

Its `type`, and `flags` members are equal to
`pBuildInfo->type` and `pBuildInfo->flags`, respectively.

* 
The sum of usage information in either `pUsageCounts` or
`ppUsageCounts` is equal to the sum of usage information in either
`pBuildInfo->pUsageCounts` or `pBuildInfo->ppUsageCounts`.

Similarly, the `buildScratchSize` value will support any build command
specifying the [VK_BUILD_MICROMAP_MODE_BUILD_EXT](VkBuildMicromapModeEXT.html) `mode` under the
above conditions.

Valid Usage

* 
[](#VUID-vkGetMicromapBuildSizesEXT-dstMicromap-09180) VUID-vkGetMicromapBuildSizesEXT-dstMicromap-09180

[VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html)::`dstMicromap` **must** have been created
from `device`

* 
[](#VUID-vkGetMicromapBuildSizesEXT-micromap-07439) VUID-vkGetMicromapBuildSizesEXT-micromap-07439

The [`micromap`](../../../../spec/latest/chapters/features.html#features-micromap) feature **must** be enabled

* 
[](#VUID-vkGetMicromapBuildSizesEXT-device-07440) VUID-vkGetMicromapBuildSizesEXT-device-07440

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetMicromapBuildSizesEXT-device-parameter) VUID-vkGetMicromapBuildSizesEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetMicromapBuildSizesEXT-buildType-parameter) VUID-vkGetMicromapBuildSizesEXT-buildType-parameter

 `buildType` **must** be a valid [VkAccelerationStructureBuildTypeKHR](VkAccelerationStructureBuildTypeKHR.html) value

* 
[](#VUID-vkGetMicromapBuildSizesEXT-pBuildInfo-parameter) VUID-vkGetMicromapBuildSizesEXT-pBuildInfo-parameter

 `pBuildInfo` **must** be a valid pointer to a valid [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html) structure

* 
[](#VUID-vkGetMicromapBuildSizesEXT-pSizeInfo-parameter) VUID-vkGetMicromapBuildSizesEXT-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkMicromapBuildSizesInfoEXT](VkMicromapBuildSizesInfoEXT.html) structure

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkAccelerationStructureBuildTypeKHR](VkAccelerationStructureBuildTypeKHR.html), [VkDevice](VkDevice.html), [VkMicromapBuildInfoEXT](VkMicromapBuildInfoEXT.html), [VkMicromapBuildSizesInfoEXT](VkMicromapBuildSizesInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetMicromapBuildSizesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
