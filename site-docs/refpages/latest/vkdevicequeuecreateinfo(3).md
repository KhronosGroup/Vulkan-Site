# VkDeviceQueueCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceQueueCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceQueueCreateInfo - Structure specifying parameters of a newly created device queue

The `VkDeviceQueueCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDeviceQueueCreateInfo {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceQueueCreateFlags    flags;
    uint32_t                    queueFamilyIndex;
    uint32_t                    queueCount;
    const float*                pQueuePriorities;
} VkDeviceQueueCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask indicating behavior of the queues.

* 
`queueFamilyIndex` is an unsigned integer indicating the index of
the queue family in which to create the queues on this device.
This index corresponds to the index of an element of the
`pQueueFamilyProperties` array that was returned by
`vkGetPhysicalDeviceQueueFamilyProperties`.

* 
`queueCount` is an unsigned integer specifying the number of queues
to create in the queue family indicated by `queueFamilyIndex`, and
with the behavior specified by `flags`.

* 
`pQueuePriorities` is a pointer to an array of `queueCount`
normalized floating-point values, specifying priorities of work that
will be submitted to each created queue.
See [Queue Priority](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-priority) for more information.

Some queue families support functionality which requires a device feature or
extension to be enabled, as indicated by the
[VkQueueFamilyProperties](VkQueueFamilyProperties.html)::`queueFlags` member.
Applications **may** create such queues and submit [queue submission commands](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-submission) to them without enabling the corresponding
feature or extension, but **must** not utilize the specific functionality that
they did not enable.

For example, [sparse memory management operations](../../../../spec/latest/chapters/sparsemem.html#sparsememory) **can** be
performed on queues from queue families exposing the
[VK_QUEUE_SPARSE_BINDING_BIT](VkQueueFlagBits.html) bit, provided the
[sparseBinding](../../../../spec/latest/chapters/features.html#features-sparseBinding) feature is enabled.
If a queue family supports both the [VK_QUEUE_SPARSE_BINDING_BIT](VkQueueFlagBits.html) and
[VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) bits, applications **may** create a queue from this
family and issue transfer operations without enabling the
[sparseBinding](../../../../spec/latest/chapters/features.html#features-sparseBinding) feature.

Valid Usage

* 
[](#VUID-VkDeviceQueueCreateInfo-queueFamilyIndex-00381) VUID-VkDeviceQueueCreateInfo-queueFamilyIndex-00381

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties`

* 
[](#VUID-VkDeviceQueueCreateInfo-queueCount-00382) VUID-VkDeviceQueueCreateInfo-queueCount-00382

`queueCount` **must** be less than or equal to the `queueCount`
member of the `VkQueueFamilyProperties` structure, as returned by
`vkGetPhysicalDeviceQueueFamilyProperties` in the
`pQueueFamilyProperties`[queueFamilyIndex]

* 
[](#VUID-VkDeviceQueueCreateInfo-pQueuePriorities-00383) VUID-VkDeviceQueueCreateInfo-pQueuePriorities-00383

Each element of `pQueuePriorities` **must** be between `0.0` and `1.0`
inclusive

* 
[](#VUID-VkDeviceQueueCreateInfo-flags-02861) VUID-VkDeviceQueueCreateInfo-flags-02861

If the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is
not enabled, the [VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](VkDeviceQueueCreateFlagBits.html) bit of
`flags` **must** not be set

* 
[](#VUID-VkDeviceQueueCreateInfo-flags-06449) VUID-VkDeviceQueueCreateInfo-flags-06449

If `flags` includes [VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](VkDeviceQueueCreateFlagBits.html),
`queueFamilyIndex` **must** be the index of a queue family that
includes the [VK_QUEUE_PROTECTED_BIT](VkQueueFlagBits.html) capability

* 
[](#VUID-VkDeviceQueueCreateInfo-pNext-09398) VUID-VkDeviceQueueCreateInfo-pNext-09398

If the `pNext` chain includes a
[VkDeviceQueueShaderCoreControlCreateInfoARM](VkDeviceQueueShaderCoreControlCreateInfoARM.html) structure then
[VkPhysicalDeviceSchedulingControlsPropertiesARM](VkPhysicalDeviceSchedulingControlsPropertiesARM.html)::`schedulingControlsFlags`
**must** contain
[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_SHADER_CORE_COUNT_ARM](VkPhysicalDeviceSchedulingControlsFlagBitsARM.html)

* 
[](#VUID-VkDeviceQueueCreateInfo-internallySynchronizedQueues-12348) VUID-VkDeviceQueueCreateInfo-internallySynchronizedQueues-12348

If the [    `internallySynchronizedQueues`](../../../../spec/latest/chapters/features.html#features-internallySynchronizedQueues) feature is not enabled, `flags`
**must** not include
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](VkDeviceQueueCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceQueueCreateInfo-sType-sType) VUID-VkDeviceQueueCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_QUEUE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkDeviceQueueCreateInfo-pNext-pNext) VUID-VkDeviceQueueCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceQueueGlobalPriorityCreateInfo](VkDeviceQueueGlobalPriorityCreateInfo.html) or [VkDeviceQueueShaderCoreControlCreateInfoARM](VkDeviceQueueShaderCoreControlCreateInfoARM.html)

* 
[](#VUID-VkDeviceQueueCreateInfo-sType-unique) VUID-VkDeviceQueueCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDeviceQueueCreateInfo-flags-parameter) VUID-VkDeviceQueueCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkDeviceQueueCreateFlagBits](VkDeviceQueueCreateFlagBits.html) values

* 
[](#VUID-VkDeviceQueueCreateInfo-pQueuePriorities-parameter) VUID-VkDeviceQueueCreateInfo-pQueuePriorities-parameter

 `pQueuePriorities` **must** be a valid pointer to an array of `queueCount` `float` values

* 
[](#VUID-VkDeviceQueueCreateInfo-queueCount-arraylength) VUID-VkDeviceQueueCreateInfo-queueCount-arraylength

 `queueCount` **must** be greater than `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html), [VkDeviceQueueCreateFlags](VkDeviceQueueCreateFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceQueueCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
