# VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE - Structure describing fragment density map layered properties that can be supported by an implementation

The `VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE` structure
is defined as:

// Provided by VK_VALVE_fragment_density_map_layered
typedef struct VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxFragmentDensityMapLayers;
} VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxFragmentDensityMapLayers`
is the maximum number of layers to use with a layered fragment density
map.

If the `VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE-sType-sType) VUID-VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_LAYERED_PROPERTIES_VALVE](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_VALVE_fragment_density_map_layered](VK_VALVE_fragment_density_map_layered.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
