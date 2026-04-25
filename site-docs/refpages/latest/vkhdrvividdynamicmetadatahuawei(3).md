# VkHdrVividDynamicMetadataHUAWEI(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHdrVividDynamicMetadataHUAWEI.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHdrVividDynamicMetadataHUAWEI - specify HDR Vivid dynamic metadata

When [`hdrVivid`](../../../../spec/latest/chapters/features.html#features-hdrVivid) feature is enabled, HDR Vivid
dynamic metadata **can** be set to control the reproduction of content by
including the `VkHdrVividDynamicMetadataHUAWEI` in the `pNext` chain
of [VkHdrMetadataEXT](VkHdrMetadataEXT.html).

The `VkHdrVividDynamicMetadataHUAWEI` structure is defined as:

// Provided by VK_HUAWEI_hdr_vivid
typedef struct VkHdrVividDynamicMetadataHUAWEI {
    VkStructureType    sType;
    const void*        pNext;
    size_t             dynamicMetadataSize;
    const void*        pDynamicMetadata;
} VkHdrVividDynamicMetadataHUAWEI;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dynamicMetadataSize` is the size in bytes of the dynamic metadata.

* 
`pDynamicMetadata` is a pointer to the dynamic metadata.

|  | The HDR Vivid metadata is intended to be used as defined in the T/UWA
| --- | --- |
005.1-2022 specification.
The validity and use of this data is outside the scope of Vulkan. |

Valid Usage (Implicit)

* 
[](#VUID-VkHdrVividDynamicMetadataHUAWEI-sType-sType) VUID-VkHdrVividDynamicMetadataHUAWEI-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HDR_VIVID_DYNAMIC_METADATA_HUAWEI](VkStructureType.html)

* 
[](#VUID-VkHdrVividDynamicMetadataHUAWEI-pDynamicMetadata-parameter) VUID-VkHdrVividDynamicMetadataHUAWEI-pDynamicMetadata-parameter

 `pDynamicMetadata` **must** be a valid pointer to an array of `dynamicMetadataSize` bytes

* 
[](#VUID-VkHdrVividDynamicMetadataHUAWEI-dynamicMetadataSize-arraylength) VUID-VkHdrVividDynamicMetadataHUAWEI-dynamicMetadataSize-arraylength

 `dynamicMetadataSize` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkHdrMetadataEXT](VkHdrMetadataEXT.html)

[VK_HUAWEI_hdr_vivid](VK_HUAWEI_hdr_vivid.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkHdrVividDynamicMetadataHUAWEI).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
