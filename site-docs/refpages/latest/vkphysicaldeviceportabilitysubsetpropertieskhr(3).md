# VkPhysicalDevicePortabilitySubsetPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDevicePortabilitySubsetPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDevicePortabilitySubsetPropertiesKHR - Structure describing additional properties supported by a portable implementation

The `VkPhysicalDevicePortabilitySubsetPropertiesKHR` structure is
defined as:

// Provided by VK_KHR_portability_subset
typedef struct VkPhysicalDevicePortabilitySubsetPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           minVertexInputBindingStrideAlignment;
} VkPhysicalDevicePortabilitySubsetPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`minVertexInputBindingStrideAlignment` indicates the minimum
alignment for vertex input strides.
[VkVertexInputBindingDescription](VkVertexInputBindingDescription.html)::`stride` **must** be a multiple
of, and at least as large as, this value.
The value **must** be a power of two.

If the `VkPhysicalDevicePortabilitySubsetPropertiesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePortabilitySubsetPropertiesKHR-sType-sType) VUID-VkPhysicalDevicePortabilitySubsetPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PORTABILITY_SUBSET_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_portability_subset](VK_KHR_portability_subset.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDevicePortabilitySubsetPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
