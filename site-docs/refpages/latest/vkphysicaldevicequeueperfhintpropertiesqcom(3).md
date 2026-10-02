# VkPhysicalDeviceQueuePerfHintPropertiesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceQueuePerfHintPropertiesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceQueuePerfHintPropertiesQCOM - Structure describing queue perf hint properties for a physical device

The `VkPhysicalDeviceQueuePerfHintPropertiesQCOM` structure is defined
as:

// Provided by VK_QCOM_queue_perf_hint
typedef struct VkPhysicalDeviceQueuePerfHintPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkQueueFlags       supportedQueues;
} VkPhysicalDeviceQueuePerfHintPropertiesQCOM;

The members of the `VkPhysicalDeviceQueuePerfHintPropertiesQCOM`
structure describe the following:

* 
`supportedQueues` is a bitmask of [VkQueueFlagBits](VkQueueFlagBits.html) indicating
the types of queues on which [setting perf    hints](../../../../spec/latest/chapters/devsandqueues.html#devsandqueues-perfhint) are supported.

If the [`queuePerfHint`](../../../../spec/latest/chapters/features.html#features-queuePerfHint) feature is supported
by `physicalDevice`, `supportedQueues` **must** return at least one
supported queue type.

If the `VkPhysicalDeviceQueuePerfHintPropertiesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceQueuePerfHintPropertiesQCOM-sType-sType) VUID-VkPhysicalDeviceQueuePerfHintPropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_QUEUE_PERF_HINT_PROPERTIES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_QCOM_queue_perf_hint](VK_QCOM_queue_perf_hint.html), [VkQueueFlags](VkQueueFlags.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceQueuePerfHintPropertiesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
