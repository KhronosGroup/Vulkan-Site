# VkMicromapBuildInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMicromapBuildInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMicromapBuildInfoEXT - Structure specifying the  data used to build a micromap

The `VkMicromapBuildInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapBuildInfoEXT {
    VkStructureType                     sType;
    const void*                         pNext;
    VkMicromapTypeEXT                   type;
    VkBuildMicromapFlagsEXT             flags;
    VkBuildMicromapModeEXT              mode;
    VkMicromapEXT                       dstMicromap;
    uint32_t                            usageCountsCount;
    const VkMicromapUsageEXT*           pUsageCounts;
    const VkMicromapUsageEXT* const*    ppUsageCounts;
    VkDeviceOrHostAddressConstKHR       data;
    VkDeviceOrHostAddressKHR            scratchData;
    VkDeviceOrHostAddressConstKHR       triangleArray;
    VkDeviceSize                        triangleArrayStride;
} VkMicromapBuildInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkMicromapTypeEXT](VkMicromapTypeEXT.html) value specifying the type of
micromap being built.

* 
`flags` is a bitmask of [VkBuildMicromapFlagBitsEXT](VkBuildMicromapFlagBitsEXT.html) specifying
additional parameters of the micromap.

* 
`mode` is a [VkBuildMicromapModeEXT](VkBuildMicromapModeEXT.html) value specifying the type
of operation to perform.

* 
`dstMicromap` is a pointer to the target micromap for the build.

* 
`usageCountsCount` specifies the number of usage counts structures
that will be used to determine the size of this micromap.

* 
`pUsageCounts` is a pointer to an array of [VkMicromapUsageEXT](VkMicromapUsageEXT.html)
structures.

* 
`ppUsageCounts` is a pointer to an array of pointers to
[VkMicromapUsageEXT](VkMicromapUsageEXT.html) structures.

* 
`data` is the device or host address of memory which contains the
data for the micromap.

* 
`scratchData` is the device or host address of memory that will be
used as scratch memory for the build.

* 
`triangleArray` is the device or host address of memory containing
the [VkMicromapTriangleEXT](VkMicromapTriangleEXT.html) data

* 
`triangleArrayStride` is the stride in bytes between each element of
`triangleArray`

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`.
The elements of the non-`NULL` array describe the total counts used to build
each micromap.
Each element contains a `count` which is the number of micromap
triangles of that `format` and `subdivisionLevel` contained in the
micromap.
Multiple elements with the same `format` and `subdivisionLevel` are
allowed and the total count for that `format` and `subdivisionLevel`
is the sum of the `count` for each element.

Each micromap triangle refers to one element in `triangleArray` which
contains the `format` and `subdivisionLevel` for that particular
triangle as well as a `dataOffset` in bytes which is the location
relative to `data` where that triangle’s micromap data begins.
The data at `triangleArray` is laid out as a 4 byte unsigned integer for
the `dataOffset` followed by a 2 byte unsigned integer for the
subdivision level then a 2 byte unsigned integer for the format.
In practice, compilers compile [VkMicromapTriangleEXT](VkMicromapTriangleEXT.html) to match this
pattern.

For opacity micromaps, the data at `data` is packed as either one bit
per element for [VK_OPACITY_MICROMAP_FORMAT_2_STATE_EXT](VkOpacityMicromapFormatEXT.html) or two bits per
element for [VK_OPACITY_MICROMAP_FORMAT_4_STATE_EXT](VkOpacityMicromapFormatEXT.html) and is packed from
LSB to MSB in each byte.
The data at each index in those bytes is interpreted as discussed in
[Ray Opacity Micromap](../../../../spec/latest/chapters/raytraversal.html#ray-opacity-micromap).

For displacement micromaps, the data at `data` is interpreted as
discussed in [Displacement Micromap Encoding](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#displacement-micromap-encoding).

Valid Usage

* 
[](#VUID-VkMicromapBuildInfoEXT-pUsageCounts-07516) VUID-VkMicromapBuildInfoEXT-pUsageCounts-07516

Only one of `pUsageCounts` or `ppUsageCounts` **can** be a valid
pointer, the other **must** be `NULL`

* 
[](#VUID-VkMicromapBuildInfoEXT-type-07517) VUID-VkMicromapBuildInfoEXT-type-07517

If `type` is [VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](VkMicromapTypeEXT.html) the
`format` member of [VkMicromapUsageEXT](VkMicromapUsageEXT.html) **must** be a valid value
from [VkOpacityMicromapFormatEXT](VkOpacityMicromapFormatEXT.html)

* 
[](#VUID-VkMicromapBuildInfoEXT-type-07518) VUID-VkMicromapBuildInfoEXT-type-07518

If `type` is [VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](VkMicromapTypeEXT.html) the
`format` member of [VkMicromapTriangleEXT](VkMicromapTriangleEXT.html) **must** be a valid
value from [VkOpacityMicromapFormatEXT](VkOpacityMicromapFormatEXT.html)

* 
[](#VUID-VkMicromapBuildInfoEXT-type-08704) VUID-VkMicromapBuildInfoEXT-type-08704

If `type` is [VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](VkMicromapTypeEXT.html) the
`format` member of [VkMicromapUsageEXT](VkMicromapUsageEXT.html) **must** be a valid value
from [VkDisplacementMicromapFormatNV](VkDisplacementMicromapFormatNV.html)

* 
[](#VUID-VkMicromapBuildInfoEXT-type-08705) VUID-VkMicromapBuildInfoEXT-type-08705

If `type` is [VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](VkMicromapTypeEXT.html) the
`format` member of [VkMicromapTriangleEXT](VkMicromapTriangleEXT.html) **must** be a valid
value from [VkDisplacementMicromapFormatNV](VkDisplacementMicromapFormatNV.html)

Valid Usage (Implicit)

* 
[](#VUID-VkMicromapBuildInfoEXT-sType-sType) VUID-VkMicromapBuildInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MICROMAP_BUILD_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkMicromapBuildInfoEXT-pNext-pNext) VUID-VkMicromapBuildInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMicromapBuildInfoEXT-type-parameter) VUID-VkMicromapBuildInfoEXT-type-parameter

 `type` **must** be a valid [VkMicromapTypeEXT](VkMicromapTypeEXT.html) value

* 
[](#VUID-VkMicromapBuildInfoEXT-flags-parameter) VUID-VkMicromapBuildInfoEXT-flags-parameter

 `flags` **must** be a valid combination of [VkBuildMicromapFlagBitsEXT](VkBuildMicromapFlagBitsEXT.html) values

* 
[](#VUID-VkMicromapBuildInfoEXT-pUsageCounts-parameter) VUID-VkMicromapBuildInfoEXT-pUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `pUsageCounts` is not `NULL`, `pUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` [VkMicromapUsageEXT](VkMicromapUsageEXT.html) structures

* 
[](#VUID-VkMicromapBuildInfoEXT-ppUsageCounts-parameter) VUID-VkMicromapBuildInfoEXT-ppUsageCounts-parameter

 If `usageCountsCount` is not `0`, and `ppUsageCounts` is not `NULL`, `ppUsageCounts` **must** be a valid pointer to an array of `usageCountsCount` valid pointers to [VkMicromapUsageEXT](VkMicromapUsageEXT.html) structures

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkBuildMicromapFlagsEXT](VkBuildMicromapFlagsEXT.html), [VkBuildMicromapModeEXT](VkBuildMicromapModeEXT.html), [VkDeviceOrHostAddressConstKHR](VkDeviceOrHostAddressConstKHR.html), [VkDeviceOrHostAddressKHR](VkDeviceOrHostAddressKHR.html), `VkDeviceSize`, [VkMicromapEXT](VkMicromapEXT.html), [VkMicromapTypeEXT](VkMicromapTypeEXT.html), [VkMicromapUsageEXT](VkMicromapUsageEXT.html), [VkStructureType](VkStructureType.html), [vkBuildMicromapsEXT](vkBuildMicromapsEXT.html), [vkCmdBuildMicromapsEXT](vkCmdBuildMicromapsEXT.html), [vkGetMicromapBuildSizesEXT](vkGetMicromapBuildSizesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#VkMicromapBuildInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
