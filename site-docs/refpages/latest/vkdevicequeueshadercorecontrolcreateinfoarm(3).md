# VkDeviceQueueShaderCoreControlCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDeviceQueueShaderCoreControlCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDeviceQueueShaderCoreControlCreateInfoARM - Control the number of shader cores used by queues

The number of shader cores used by a queue **can** be controlled by adding a
`VkDeviceQueueShaderCoreControlCreateInfoARM` structure to the
`pNext` chain of [VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html) structures.

The `VkDeviceQueueShaderCoreControlCreateInfoARM` structure is defined
as:

// Provided by VK_ARM_scheduling_controls
typedef struct VkDeviceQueueShaderCoreControlCreateInfoARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           shaderCoreCount;
} VkDeviceQueueShaderCoreControlCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderCoreCount` is the number of shader cores this queue uses.

Queues created without specifying
`VkDeviceQueueShaderCoreControlCreateInfoARM` will default to using all
the shader cores available.

Valid Usage

* 
[](#VUID-VkDeviceQueueShaderCoreControlCreateInfoARM-shaderCoreCount-09399) VUID-VkDeviceQueueShaderCoreControlCreateInfoARM-shaderCoreCount-09399

`shaderCoreCount` **must** be greater than 0 and less than or equal to
the total number of shader cores as reported via
[VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM](VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM.html)::`shaderCoreCount`

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceQueueShaderCoreControlCreateInfoARM-sType-sType) VUID-VkDeviceQueueShaderCoreControlCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_QUEUE_SHADER_CORE_CONTROL_CREATE_INFO_ARM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkDeviceQueueCreateInfo](VkDeviceQueueCreateInfo.html)

[VK_ARM_scheduling_controls](VK_ARM_scheduling_controls.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkDeviceQueueShaderCoreControlCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
