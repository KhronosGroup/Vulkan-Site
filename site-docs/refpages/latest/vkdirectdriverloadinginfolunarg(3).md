# VkDirectDriverLoadingInfoLUNARG(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDirectDriverLoadingInfoLUNARG.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDirectDriverLoadingInfoLUNARG - Structure specifying the information required to load an additional driver

The `VkDirectDriverLoadingInfoLUNARG` structure is defined as:

// Provided by VK_LUNARG_direct_driver_loading
typedef struct VkDirectDriverLoadingInfoLUNARG {
    VkStructureType                     sType;
    void*                               pNext;
    VkDirectDriverLoadingFlagsLUNARG    flags;
    PFN_vkGetInstanceProcAddrLUNARG     pfnGetInstanceProcAddr;
} VkDirectDriverLoadingInfoLUNARG;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`pfnGetInstanceProcAddr` is a [PFN_vkGetInstanceProcAddrLUNARG](PFN_vkGetInstanceProcAddrLUNARG.html)
pointer to the driver [vkGetInstanceProcAddr](vkGetInstanceProcAddr.html) function.

Valid Usage (Implicit)

* 
[](#VUID-VkDirectDriverLoadingInfoLUNARG-sType-sType) VUID-VkDirectDriverLoadingInfoLUNARG-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_INFO_LUNARG](VkStructureType.html)

* 
[](#VUID-VkDirectDriverLoadingInfoLUNARG-flags-zerobitmask) VUID-VkDirectDriverLoadingInfoLUNARG-flags-zerobitmask

 `flags` **must** be `0`

[PFN_vkGetInstanceProcAddrLUNARG](PFN_vkGetInstanceProcAddrLUNARG.html), [VK_LUNARG_direct_driver_loading](VK_LUNARG_direct_driver_loading.html), [VkDirectDriverLoadingFlagsLUNARG](VkDirectDriverLoadingFlagsLUNARG.html), [VkDirectDriverLoadingListLUNARG](VkDirectDriverLoadingListLUNARG.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkDirectDriverLoadingInfoLUNARG).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
