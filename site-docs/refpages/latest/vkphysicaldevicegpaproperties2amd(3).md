# VkPhysicalDeviceGpaProperties2AMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceGpaProperties2AMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceGpaProperties2AMD - Structure describing additional GPU performance API properties for a physical device

The `VkPhysicalDeviceGpaProperties2AMD` structure is defined as:

// Provided by VK_AMD_gpa_interface
typedef struct VkPhysicalDeviceGpaProperties2AMD {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           revisionId;
} VkPhysicalDeviceGpaProperties2AMD;

The members of the `VkPhysicalDeviceGpaProperties2AMD` structure
describe the following:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`revisionId` is the GPU product identifier that may be used to
classify its GPA behavior.

If the `VkPhysicalDeviceGpaProperties2AMD` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGpaProperties2AMD-sType-sType) VUID-VkPhysicalDeviceGpaProperties2AMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GPA_PROPERTIES_2_AMD](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_AMD_gpa_interface](VK_AMD_gpa_interface.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceGpaProperties2AMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
