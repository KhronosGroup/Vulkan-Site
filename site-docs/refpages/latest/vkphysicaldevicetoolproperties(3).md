# VkPhysicalDeviceToolProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceToolProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceToolProperties - Structure providing information about an active tool

The [VkPhysicalDeviceToolProperties](#) structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceToolProperties {
    VkStructureType       sType;
    void*                 pNext;
    char                  name[VK_MAX_EXTENSION_NAME_SIZE];
    char                  version[VK_MAX_EXTENSION_NAME_SIZE];
    VkToolPurposeFlags    purposes;
    char                  description[VK_MAX_DESCRIPTION_SIZE];
    char                  layer[VK_MAX_EXTENSION_NAME_SIZE];
} VkPhysicalDeviceToolProperties;

// Provided by VK_EXT_tooling_info
// Equivalent to VkPhysicalDeviceToolProperties
typedef VkPhysicalDeviceToolProperties VkPhysicalDeviceToolPropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`name` is a null-terminated UTF-8 string containing the name of the
tool.

* 
`version` is a null-terminated UTF-8 string containing the version
of the tool.

* 
`purposes` is a bitmask of [VkToolPurposeFlagBits](VkToolPurposeFlagBits.html) which is
populated with purposes supported by the tool.

* 
`description` is a null-terminated UTF-8 string containing a
description of the tool.

* 
`layer` is a null-terminated UTF-8 string containing the name of the
layer implementing the tool, if the tool is implemented in a layer -
otherwise it **may** be an empty string.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceToolProperties-sType-sType) VUID-VkPhysicalDeviceToolProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TOOL_PROPERTIES](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceToolProperties-pNext-pNext) VUID-VkPhysicalDeviceToolProperties-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_tooling_info](VK_EXT_tooling_info.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkStructureType](VkStructureType.html), [VkToolPurposeFlags](VkToolPurposeFlags.html), [vkGetPhysicalDeviceToolProperties](vkGetPhysicalDeviceToolProperties.html), [vkGetPhysicalDeviceToolProperties](vkGetPhysicalDeviceToolProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#VkPhysicalDeviceToolProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
