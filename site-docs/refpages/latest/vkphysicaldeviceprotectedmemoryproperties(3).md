# VkPhysicalDeviceProtectedMemoryProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceProtectedMemoryProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceProtectedMemoryProperties - Structure describing protected memory properties that can be supported by an implementation

The `VkPhysicalDeviceProtectedMemoryProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceProtectedMemoryProperties {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           protectedNoFault;
} VkPhysicalDeviceProtectedMemoryProperties;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `protectedNoFault`
specifies how an implementation behaves when an application attempts to
write to unprotected memory in a protected queue operation, read from
protected memory in an unprotected queue operation, or perform a query
in a protected queue operation.
If this limit is [VK_TRUE](VK_TRUE.html), such writes will be discarded or have
**undefined** values written; reads and queries will return poison.
If this limit is [VK_FALSE](VK_FALSE.html), applications **must** not perform these
operations.
See [Protected Memory Access Rules](../../../../spec/latest/chapters/memory.html#memory-protected-access-rules) for more information.

If the `VkPhysicalDeviceProtectedMemoryProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceProtectedMemoryProperties-sType-sType) VUID-VkPhysicalDeviceProtectedMemoryProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROTECTED_MEMORY_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_VERSION_1_1](VK_VERSION_1_1.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceProtectedMemoryProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
