# VkPhysicalDeviceCustomBorderColorPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceCustomBorderColorPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceCustomBorderColorPropertiesEXT - Structure describing whether custom border colors can be supported by an implementation

The `VkPhysicalDeviceCustomBorderColorPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_custom_border_color
typedef struct VkPhysicalDeviceCustomBorderColorPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxCustomBorderColorSamplers;
} VkPhysicalDeviceCustomBorderColorPropertiesEXT;

* 

`maxCustomBorderColorSamplers` indicates the maximum number of
samplers with custom border colors which **can** simultaneously exist on a
device.

If the `VkPhysicalDeviceCustomBorderColorPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceCustomBorderColorPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceCustomBorderColorPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_BORDER_COLOR_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_custom_border_color](VK_EXT_custom_border_color.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceCustomBorderColorPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
