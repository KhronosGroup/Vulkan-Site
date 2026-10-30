# VkPhysicalDeviceSchedulingControlsPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSchedulingControlsPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSchedulingControlsPropertiesARM - Structure containing scheduling control properties of a physical device

The `VkPhysicalDeviceSchedulingControlsPropertiesARM` structure is
defined as:

// Provided by VK_ARM_scheduling_controls
typedef struct VkPhysicalDeviceSchedulingControlsPropertiesARM {
    VkStructureType                               sType;
    void*                                         pNext;
    VkPhysicalDeviceSchedulingControlsFlagsARM    schedulingControlsFlags;
} VkPhysicalDeviceSchedulingControlsPropertiesARM;

* 
`schedulingControlsFlags`
specifies the specific scheduling controls that a physical device
supports.

If the `VkPhysicalDeviceSchedulingControlsPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html) structure passed to
[vkGetPhysicalDeviceProperties2](vkGetPhysicalDeviceProperties2.html), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSchedulingControlsPropertiesARM-sType-sType) VUID-VkPhysicalDeviceSchedulingControlsPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_PROPERTIES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_ARM_scheduling_controls](VK_ARM_scheduling_controls.html), [VkPhysicalDeviceSchedulingControlsFlagsARM](VkPhysicalDeviceSchedulingControlsFlagsARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/devsandqueues.html#VkPhysicalDeviceSchedulingControlsPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
