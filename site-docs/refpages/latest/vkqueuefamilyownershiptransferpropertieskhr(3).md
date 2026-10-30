# VkQueueFamilyOwnershipTransferPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyOwnershipTransferPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyOwnershipTransferPropertiesKHR - Structure describing queue family ownership transfer properties

The [VkQueueFamilyOwnershipTransferPropertiesKHR](#) structure is defined
as:

// Provided by VK_KHR_maintenance9
typedef struct VkQueueFamilyOwnershipTransferPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           optimalImageTransferToQueueFamilies;
} VkQueueFamilyOwnershipTransferPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`optimalImageTransferToQueueFamilies` is a bitmask of queue family
indices that indicates which queue families belonging to the same
logical device support implicitly acquiring optimal image resources
owned by this queue family, without the resources' contents becoming
**undefined**.

If this structure is included in the `pNext` chain of the
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html) structure passed to
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html), then it is filled with the
queue family ownership properties for the specified queue family.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyOwnershipTransferPropertiesKHR-sType-sType) VUID-VkQueueFamilyOwnershipTransferPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_OWNERSHIP_TRANSFER_PROPERTIES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](VkQueueFamilyProperties2.html)

[VK_KHR_maintenance9](VK_KHR_maintenance9.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFamilyOwnershipTransferPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
