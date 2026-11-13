# VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR - Structure indicating support for queues that are internally synchronized

The `VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR` structure
is defined as:

// Provided by VK_KHR_internally_synchronized_queues
typedef struct VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           internallySynchronizedQueues;
} VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`internallySynchronizedQueues` indicates that
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](VkDeviceQueueCreateFlagBits.html) can be used
to make queues internally synchronized.

If the `VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INTERNALLY_SYNCHRONIZED_QUEUES_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_internally_synchronized_queues](VK_KHR_internally_synchronized_queues.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
