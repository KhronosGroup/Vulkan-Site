# VkPhysicalDeviceRobustness2PropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceRobustness2PropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceRobustness2PropertiesKHR - Structure describing robust buffer access properties supported by an implementation

The `VkPhysicalDeviceRobustness2PropertiesKHR` structure is defined as:

// Provided by VK_KHR_robustness2
typedef struct VkPhysicalDeviceRobustness2PropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       robustStorageBufferAccessSizeAlignment;
    VkDeviceSize       robustUniformBufferAccessSizeAlignment;
} VkPhysicalDeviceRobustness2PropertiesKHR;

// Provided by VK_EXT_robustness2
// Equivalent to VkPhysicalDeviceRobustness2PropertiesKHR
typedef VkPhysicalDeviceRobustness2PropertiesKHR VkPhysicalDeviceRobustness2PropertiesEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`robustStorageBufferAccessSizeAlignment` is the number of bytes that
the range of a storage buffer descriptor is rounded up to when used for
bounds-checking when the [    `robustBufferAccess2`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess2) feature is enabled.
This value **must** be either 1 or 4.

* 

`robustUniformBufferAccessSizeAlignment` is the number of bytes that
the range of a uniform buffer descriptor is rounded up to when used for
bounds-checking when the [    `robustBufferAccess2`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess2) feature is enabled.
This value **must** be a power of two in the range [1, 256].

If the `VkPhysicalDeviceRobustness2PropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceRobustness2PropertiesKHR-sType-sType) VUID-VkPhysicalDeviceRobustness2PropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_robustness2](VK_EXT_robustness2.html), [VK_KHR_robustness2](VK_KHR_robustness2.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceRobustness2PropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
