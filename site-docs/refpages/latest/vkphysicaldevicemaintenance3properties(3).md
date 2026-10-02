# VkPhysicalDeviceMaintenance3Properties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance3Properties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance3Properties - Structure describing descriptor set properties

The `VkPhysicalDeviceMaintenance3Properties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceMaintenance3Properties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxPerSetDescriptors;
    VkDeviceSize       maxMemoryAllocationSize;
} VkPhysicalDeviceMaintenance3Properties;

// Provided by VK_KHR_maintenance3
// Equivalent to VkPhysicalDeviceMaintenance3Properties
typedef VkPhysicalDeviceMaintenance3Properties VkPhysicalDeviceMaintenance3PropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`maxPerSetDescriptors` is a maximum number of descriptors (summed
over all descriptor types) in a single descriptor set that is guaranteed
to satisfy any implementation-dependent constraints on the size of a
descriptor set itself.
Applications **can** query whether a descriptor set that goes beyond this
limit is supported using [vkGetDescriptorSetLayoutSupport](vkGetDescriptorSetLayoutSupport.html).

* 

`maxMemoryAllocationSize` is the maximum size of a memory allocation
that **can** be created, even if there is more space available in the heap.
If [VkMemoryAllocateInfo](VkMemoryAllocateInfo.html)::`allocationSize` is larger the error
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html) **may** be returned.

If the `VkPhysicalDeviceMaintenance3Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance3Properties-sType-sType) VUID-VkPhysicalDeviceMaintenance3Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_3_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_KHR_maintenance3](VK_KHR_maintenance3.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMaintenance3Properties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
