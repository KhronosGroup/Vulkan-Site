# VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT - Structure describing fragment density map offset properties that can be supported by an implementation

The `VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map_offset
typedef struct VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         fragmentDensityOffsetGranularity;
} VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT;

// Provided by VK_QCOM_fragment_density_map_offset
// Equivalent to VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT
typedef VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT VkPhysicalDeviceFragmentDensityMapOffsetPropertiesQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`fragmentDensityOffsetGranularity` is the granularity for
[fragment density offsets](../../../../spec/latest/chapters/renderpass.html#renderpass-fragmentdensitymapoffsets).

If the `VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_fragment_density_map_offset](VK_EXT_fragment_density_map_offset.html), [VK_QCOM_fragment_density_map_offset](VK_QCOM_fragment_density_map_offset.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
