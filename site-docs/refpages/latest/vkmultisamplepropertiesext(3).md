# VkMultisamplePropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMultisamplePropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMultisamplePropertiesEXT - Structure returning information about sample count specific additional multisampling capabilities

The `VkMultisamplePropertiesEXT` structure is defined as

// Provided by VK_EXT_sample_locations
typedef struct VkMultisamplePropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         maxSampleLocationGridSize;
} VkMultisamplePropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxSampleLocationGridSize` is the maximum size of the pixel grid in
which sample locations **can** vary.

Valid Usage (Implicit)

* 
[](#VUID-VkMultisamplePropertiesEXT-sType-sType) VUID-VkMultisamplePropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MULTISAMPLE_PROPERTIES_EXT](VkStructureType.html)

* 
[](#VUID-VkMultisamplePropertiesEXT-pNext-pNext) VUID-VkMultisamplePropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_sample_locations](VK_EXT_sample_locations.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceMultisamplePropertiesEXT](vkGetPhysicalDeviceMultisamplePropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkMultisamplePropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
