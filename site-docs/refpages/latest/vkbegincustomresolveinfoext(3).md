# VkBeginCustomResolveInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBeginCustomResolveInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBeginCustomResolveInfoEXT - Structure specifying shader resolve information

The `VkBeginCustomResolveInfoEXT` structure is defined as:

// Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
typedef struct VkBeginCustomResolveInfoEXT {
    VkStructureType    sType;
    void*              pNext;
} VkBeginCustomResolveInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage (Implicit)

* 
[](#VUID-VkBeginCustomResolveInfoEXT-sType-sType) VUID-VkBeginCustomResolveInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BEGIN_CUSTOM_RESOLVE_INFO_EXT](VkStructureType.html)

[VK_EXT_custom_resolve](VK_EXT_custom_resolve.html), [VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkStructureType](VkStructureType.html), [vkCmdBeginCustomResolveEXT](vkCmdBeginCustomResolveEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkBeginCustomResolveInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
