# VkPhysicalDeviceMaintenance7FeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMaintenance7FeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMaintenance7FeaturesKHR - Structure describing whether the implementation supports maintenance7 functionality

The `VkPhysicalDeviceMaintenance7FeaturesKHR` structure is defined as:

// Provided by VK_KHR_maintenance7
typedef struct VkPhysicalDeviceMaintenance7FeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           maintenance7;
} VkPhysicalDeviceMaintenance7FeaturesKHR;

This structure describes the following feature:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maintenance7` indicates that the
implementation supports the following:

The [VK_RENDERING_CONTENTS_INLINE_BIT_KHR](VkRenderingFlagBits.html) and
[VK_SUBPASS_CONTENTS_INLINE_AND_SECONDARY_COMMAND_BUFFERS_KHR](VkSubpassContents.html)
flags **can** be used to record commands in render pass instances both
inline and in secondary command buffers executed with
[vkCmdExecuteCommands](vkCmdExecuteCommands.html) for dynamic rendering and legacy render
passes respectively.

* 
Querying information regarding the underlying devices in environments
where the Vulkan implementation is provided through layered
implementations.
This is done by chaining
[VkPhysicalDeviceLayeredApiPropertiesListKHR](VkPhysicalDeviceLayeredApiPropertiesListKHR.html) to
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html).

* 
New limits which indicate the maximum total count of dynamic uniform
buffers and dynamic storage buffers that **can** be included in a pipeline
layout.

* 
32-bit timestamp queries **must** wrap on overflow

* 
A property that indicates whether a fragment shading rate attachment
can have a size that is too small to cover a specified render area.

* 
A property that indicates support for writing to one aspect of a
depth/stencil attachment without performing a read-modify-write
operation on the other aspect

If the `VkPhysicalDeviceMaintenance7FeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceMaintenance7FeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMaintenance7FeaturesKHR-sType-sType) VUID-VkPhysicalDeviceMaintenance7FeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_7_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_maintenance7](VK_KHR_maintenance7.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceMaintenance7FeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
