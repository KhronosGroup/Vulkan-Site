# VkPhysicalDeviceSchedulingControlsFeaturesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSchedulingControlsFeaturesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSchedulingControlsFeaturesARM - Structure describing scheduling controls features that can be supported by an implementation

The `VkPhysicalDeviceSchedulingControlsFeaturesARM` structure is defined
as:

// Provided by VK_ARM_scheduling_controls
typedef struct VkPhysicalDeviceSchedulingControlsFeaturesARM {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           schedulingControls;
} VkPhysicalDeviceSchedulingControlsFeaturesARM;

This structure describes the following features:

* 
 `schedulingControls` indicates that
the implementation supports scheduling controls.

If the `VkPhysicalDeviceSchedulingControlsFeaturesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceSchedulingControlsFeaturesARM`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSchedulingControlsFeaturesARM-sType-sType) VUID-VkPhysicalDeviceSchedulingControlsFeaturesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_FEATURES_ARM](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_ARM_scheduling_controls](VK_ARM_scheduling_controls.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceSchedulingControlsFeaturesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
