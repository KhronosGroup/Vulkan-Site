# VkDisplayModeCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayModeCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayModeCreateInfoKHR - Structure specifying parameters of a newly created display mode object

The `VkDisplayModeCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayModeCreateInfoKHR {
    VkStructureType                sType;
    const void*                    pNext;
    VkDisplayModeCreateFlagsKHR    flags;
    VkDisplayModeParametersKHR     parameters;
} VkDisplayModeCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use, and **must** be zero.

* 
`parameters` is a [VkDisplayModeParametersKHR](VkDisplayModeParametersKHR.html) structure
describing the display parameters to use in creating the new mode.
If the parameters are not compatible with the specified display, the
implementation **must** return [VK_ERROR_INITIALIZATION_FAILED](VkResult.html).

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayModeCreateInfoKHR-sType-sType) VUID-VkDisplayModeCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_MODE_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkDisplayModeCreateInfoKHR-pNext-pNext) VUID-VkDisplayModeCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDisplayModeCreateInfoKHR-flags-zerobitmask) VUID-VkDisplayModeCreateInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDisplayModeCreateInfoKHR-parameters-parameter) VUID-VkDisplayModeCreateInfoKHR-parameters-parameter

 `parameters` **must** be a valid [VkDisplayModeParametersKHR](VkDisplayModeParametersKHR.html) structure

[VK_KHR_display](VK_KHR_display.html), [VkDisplayModeCreateFlagsKHR](VkDisplayModeCreateFlagsKHR.html), [VkDisplayModeParametersKHR](VkDisplayModeParametersKHR.html), [VkStructureType](VkStructureType.html), [vkCreateDisplayModeKHR](vkCreateDisplayModeKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayModeCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
