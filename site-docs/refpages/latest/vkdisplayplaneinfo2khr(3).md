# VkDisplayPlaneInfo2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayPlaneInfo2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayPlaneInfo2KHR - Structure defining the intended configuration of a display plane

The `VkDisplayPlaneInfo2KHR` structure is defined as:

// Provided by VK_KHR_get_display_properties2
typedef struct VkDisplayPlaneInfo2KHR {
    VkStructureType     sType;
    const void*         pNext;
    VkDisplayModeKHR    mode;
    uint32_t            planeIndex;
} VkDisplayPlaneInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mode` is the display mode the application intends to program when
using the specified plane.

|  | This parameter also implicitly specifies a display. |
| --- | --- |

* 
`planeIndex` is the plane which the application intends to use with
the display.

The members of `VkDisplayPlaneInfo2KHR` correspond to the arguments to
[vkGetDisplayPlaneCapabilitiesKHR](vkGetDisplayPlaneCapabilitiesKHR.html), with `sType` and `pNext`
added for extensibility.

Valid Usage (Implicit)

* 
[](#VUID-VkDisplayPlaneInfo2KHR-sType-sType) VUID-VkDisplayPlaneInfo2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DISPLAY_PLANE_INFO_2_KHR](VkStructureType.html)

* 
[](#VUID-VkDisplayPlaneInfo2KHR-pNext-pNext) VUID-VkDisplayPlaneInfo2KHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDisplayPlaneInfo2KHR-mode-parameter) VUID-VkDisplayPlaneInfo2KHR-mode-parameter

 `mode` **must** be a valid [VkDisplayModeKHR](VkDisplayModeKHR.html) handle

Host Synchronization

* 
Host access to `mode` **must** be externally synchronized

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html), [VkDisplayModeKHR](VkDisplayModeKHR.html), [VkStructureType](VkStructureType.html), [vkGetDisplayPlaneCapabilities2KHR](vkGetDisplayPlaneCapabilities2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayPlaneInfo2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
