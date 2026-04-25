# vkGetAccelerationStructureBuildSizesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetAccelerationStructureBuildSizesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetAccelerationStructureBuildSizesKHR - Retrieve the required size for an acceleration structure

To get the build sizes for an acceleration structure, call:

// Provided by VK_KHR_acceleration_structure
void vkGetAccelerationStructureBuildSizesKHR(
    VkDevice                                    device,
    VkAccelerationStructureBuildTypeKHR         buildType,
    const VkAccelerationStructureBuildGeometryInfoKHR* pBuildInfo,
    const uint32_t*                             pMaxPrimitiveCounts,
    VkAccelerationStructureBuildSizesInfoKHR*   pSizeInfo);

* 
`device` is the logical device that will be used for creating the
acceleration structure.

* 
`buildType` defines whether host or device operations (or both) are
being queried for.

* 
`pBuildInfo` is a pointer to a
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structure describing
parameters of a build operation.

* 
`pMaxPrimitiveCounts` is a pointer to an array of
`pBuildInfo->geometryCount` `uint32_t` values defining the number
of primitives built into each geometry.

* 
`pSizeInfo` is a pointer to a
[VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure which returns
the size required for an acceleration structure and the sizes required
for the scratch buffers, given the build parameters.
The size requirements for a scratch buffer **may** be zero.

The `srcAccelerationStructure`, `dstAccelerationStructure`, and
`mode` members of `pBuildInfo` are ignored.
Any [VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html) or [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html)
members of `pBuildInfo` are ignored by this command, except that the
`hostAddress` member of
[VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html)::`transformData`
will be examined to check if it is `NULL`.

An acceleration structure created with the `accelerationStructureSize`
returned by this command supports any build or update with a
[VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structure and array of
[VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) structures subject to the
following properties:

* 
The build command is a host build command, and `buildType` is
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_KHR](VkAccelerationStructureBuildTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](VkAccelerationStructureBuildTypeKHR.html)

* 
The build command is a device build command, and `buildType` is
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR](VkAccelerationStructureBuildTypeKHR.html) or
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](VkAccelerationStructureBuildTypeKHR.html)

* 
For [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html):

Its `type`, and `flags` members are equal to
`pBuildInfo->type` and `pBuildInfo->flags`, respectively.

* 
`geometryCount` is less than or equal to
`pBuildInfo->geometryCount`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, its `geometryType` member is equal to
`pBuildInfo->geometryType`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, its `flags` member is equal to the corresponding
member of the same element in `pBuildInfo`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), the `vertexFormat` and
`indexType` members of `geometry.triangles` are equal to the
corresponding members of the same element in `pBuildInfo`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), the `maxVertex` member of
`geometry.triangles` is less than or equal to the corresponding
member of the same element in `pBuildInfo`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if the applicable address in the
`transformData` member of `geometry.triangles` is not `NULL`,
the corresponding `transformData.hostAddress` parameter in
`pBuildInfo` is not `NULL`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`numTriangles` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)
structure in the `pNext` chain is less than or equal to the
corresponding member of the same element in `pBuildInfo`

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`numVertices` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)
structure in the `pNext` chain is less than or equal to the
corresponding member of the same element in `pBuildInfo`

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`maxPrimitiveIndex` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)
structure in the `pNext` chain is less than or equal to the
corresponding member of the same element in `pBuildInfo`

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`maxGeometryIndex` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)
structure in the `pNext` chain is less than or equal to the
corresponding member of the same element in `pBuildInfo`

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](VkGeometryTypeKHR.html), the
`format` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX.html)
structure in the `pNext` chain is equal to the corresponding member
of the same element in `pBuildInfo`

For each [VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) corresponding to
the [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html):

* 
Its `primitiveCount` member is less than or equal to the
corresponding element of `pMaxPrimitiveCounts`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if the `pNext` chain contains
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) the
corresponding member of `pBuildInfo` also contains
[VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html) and with an
equivalent `micromap`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](VkGeometryTypeKHR.html), if the `pNext` chain contains
[VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html) the
corresponding member of `pBuildInfo` also contains
[VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html) and with
an equivalent `micromap`.

For each [VkAccelerationStructureBuildRangeInfoKHR](VkAccelerationStructureBuildRangeInfoKHR.html) corresponding to
the [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html):

* 
Its `primitiveCount` member is less than or equal to the
corresponding element of `pMaxPrimitiveCounts`.

Similarly, the `updateScratchSize` value will support any build command
specifying the [VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](VkBuildAccelerationStructureModeKHR.html)
`mode` under the above conditions, and the `buildScratchSize` value
will support any build command specifying the
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](VkBuildAccelerationStructureModeKHR.html) `mode` under the
above conditions.

Valid Usage

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-accelerationStructure-08933) VUID-vkGetAccelerationStructureBuildSizesKHR-accelerationStructure-08933

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](../../../../spec/latest/chapters/features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-device-03618) VUID-vkGetAccelerationStructureBuildSizesKHR-device-03618

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-03619) VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-03619

If `pBuildInfo->geometryCount` is not `0`, `pMaxPrimitiveCounts`
**must** be a valid pointer to an array of `pBuildInfo->geometryCount`
`uint32_t` values

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-03785) VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-03785

If `pBuildInfo->pGeometries` or `pBuildInfo->ppGeometries` has a
`geometryType` of [VK_GEOMETRY_TYPE_INSTANCES_KHR](VkGeometryTypeKHR.html), each
`pMaxPrimitiveCounts`[i] **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](VkPhysicalDeviceAccelerationStructurePropertiesKHR.html)::`maxInstanceCount`

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-device-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-buildType-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-buildType-parameter

 `buildType` **must** be a valid [VkAccelerationStructureBuildTypeKHR](VkAccelerationStructureBuildTypeKHR.html) value

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-parameter

 `pBuildInfo` **must** be a valid pointer to a valid [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html) structure

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pMaxPrimitiveCounts-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-pMaxPrimitiveCounts-parameter

 If `pMaxPrimitiveCounts` is not `NULL`, `pMaxPrimitiveCounts` **must** be a valid pointer to an array of `pBuildInfo->geometryCount` `uint32_t` values

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pSizeInfo-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html) structure

[VK_KHR_acceleration_structure](VK_KHR_acceleration_structure.html), [VkAccelerationStructureBuildGeometryInfoKHR](VkAccelerationStructureBuildGeometryInfoKHR.html), [VkAccelerationStructureBuildSizesInfoKHR](VkAccelerationStructureBuildSizesInfoKHR.html), [VkAccelerationStructureBuildTypeKHR](VkAccelerationStructureBuildTypeKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetAccelerationStructureBuildSizesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
