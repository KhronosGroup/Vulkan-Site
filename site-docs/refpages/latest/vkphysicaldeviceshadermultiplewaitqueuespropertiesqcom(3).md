# VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM - Structure describing shader multiple wait queues properties that can be supported by an implementation

The `VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM` structure
is defined as:

// Provided by VK_QCOM_shader_multiple_wait_queues
typedef struct VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxShaderWaitQueues;
} VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxShaderWaitQueues` is the maximum
number of wait queues that **can** be set for a `MultipleWaitQueuesQCOM`
loop control hint.

If the `VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM-sType-sType) VUID-VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MULTIPLE_WAIT_QUEUES_PROPERTIES_QCOM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_QCOM_shader_multiple_wait_queues](VK_QCOM_shader_multiple_wait_queues.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceShaderMultipleWaitQueuesPropertiesQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
