# VkDisplayModePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDisplayModePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDisplayModePropertiesKHR - Structure describing display mode properties

The `VkDisplayModePropertiesKHR` structure is defined as:

// Provided by VK_KHR_display
typedef struct VkDisplayModePropertiesKHR {
    VkDisplayModeKHR              displayMode;
    VkDisplayModeParametersKHR    parameters;
} VkDisplayModePropertiesKHR;

* 
`displayMode` is a handle to the display mode described in this
structure.
This handle will be valid for the lifetime of the Vulkan instance.

* 
`parameters` is a [VkDisplayModeParametersKHR](VkDisplayModeParametersKHR.html) structure
describing the display parameters associated with `displayMode`.

[VK_KHR_display](VK_KHR_display.html), [VkDisplayModeKHR](VkDisplayModeKHR.html), [VkDisplayModeParametersKHR](VkDisplayModeParametersKHR.html), [VkDisplayModeProperties2KHR](VkDisplayModeProperties2KHR.html), [vkGetDisplayModePropertiesKHR](vkGetDisplayModePropertiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkDisplayModePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
